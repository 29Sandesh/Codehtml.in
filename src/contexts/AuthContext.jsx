import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, supabase } from '../services/database';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'admin' | 'partner' | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for active sessions on load
    const checkSessions = async () => {
      try {
        const isAdmin = sessionStorage.getItem('admin_authenticated') === 'true';
        if (isAdmin) {
          setUser({ email: 'admin@codehtml.in', name: 'Sandesh (Admin)' });
          setRole('admin');
          setLoading(false);
          return;
        }

        if (supabase) {
          // Check for error in hash first (e.g. access denied from Google)
          const hash = window.location.hash;
          if (hash.includes('error=')) {
            const params = new URLSearchParams(hash.substring(1));
            const errorDesc = params.get('error_description') || params.get('error') || 'Authentication failed';
            window.location.href = `/partner?error=${encodeURIComponent(errorDesc)}`;
            return;
          }

          // Get current Supabase session
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session && session.user) {
            const googleUser = session.user;
            const email = googleUser.email.toLowerCase().trim();
            const name = googleUser.user_metadata?.full_name || googleUser.email;

            // Check if this is the authorized admin email
            if (email === '29sandesh.agrawal@gmail.com') {
              sessionStorage.setItem('admin_authenticated', 'true');
              setUser({ email, name: name || 'Sandesh (Admin)' });
              setRole('admin');
              setLoading(false);
              return;
            }

            // Check if partner exists in database
            let partner = await db.getPartner(email);

            if (!partner) {
              // Read pending signup details
              const pendingStr = localStorage.getItem('pending_partner_signup');
              const pendingData = pendingStr ? JSON.parse(pendingStr) : {};
              const partnerType = pendingData.partnerType || 'solo';

              const commissionRate = partnerType === 'agency' ? 15 : 10;
              const agencyName = partnerType === 'agency' ? (pendingData.agencyName || 'Google Partner Agency') : null;

              partner = {
                name,
                email,
                phone: pendingData.phone || '',
                city: pendingData.city || 'Global',
                partnerType,
                commissionRate,
                agencyName,
                agencySize: partnerType === 'agency' ? pendingData.agencySize || '2-5' : null,
                agencyWebsite: partnerType === 'agency' ? pendingData.agencyWebsite || '' : null,
                password: `GoogleAuth_${Date.now()}`, // secure placeholder
                termsAccepted: true,
                upiId: '',
                status: 'active',
                joinedDate: new Date().toISOString().split('T')[0]
              };

              // Add to database
              const added = await db.addPartner(partner);
              partner = added; // Contains generated referralCode

              // Web3Forms payload
              const web3Payload = {
                access_key: "91c45bc7-1cb5-43ac-aa1f-79627a8c7f04",
                subject: `New Partner Signup via Google (${partnerType.toUpperCase()}): ${partner.name}`,
                from_name: "CodeHTML Partner System",
                name: partner.name,
                email: partner.email,
                phone: partner.phone,
                partner_type: partner.partnerType,
                commission_rate: `${partner.commissionRate}%`,
                agency: partnerType === 'agency' ? partner.agencyName : 'Solo Partner',
                agency_size: partner.agencySize || 'N/A',
                agency_website: partner.agencyWebsite || 'N/A',
                city: partner.city,
                referral_code: partner.referralCode,
                message: `B2B ${partner.partnerType} partner successfully registered and verified via Google Sign-In. Referral code is ${partner.referralCode}.`
              };

              await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(web3Payload)
              });

              localStorage.removeItem('pending_partner_signup');
            }

            if (partner.status === 'active') {
              localStorage.setItem('active_partner_session', partner.email);
              setUser(partner);
              setRole('partner');
            } else {
              await supabase.auth.signOut();
              localStorage.removeItem('active_partner_session');
            }
            setLoading(false);
            return;
          } else if (window.location.hash.includes('access_token=') || window.location.hash.includes('id_token=')) {
            // Token was present but session is null -> exchange failed (e.g. invalid anon key)
            console.error("Token exchange failed. Check Supabase credentials.");
            window.location.href = `/partner?error=${encodeURIComponent('Failed to authenticate with Supabase. Please verify your Supabase URL and Anon Key configuration.')}`;
            return;
          }
        }

        // Fallback to local session (e.g. for mock/offline localstorage mode)
        const activePartnerEmail = localStorage.getItem('active_partner_session');
        if (activePartnerEmail) {
          const partner = await db.getPartner(activePartnerEmail);
          if (partner) {
            setUser(partner);
            setRole('partner');
          } else {
            localStorage.removeItem('active_partner_session');
          }
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setLoading(false);
      }
    };

    checkSessions();

    if (supabase) {
      // Subscribe to auth state updates
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          checkSessions();
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setRole(null);
          localStorage.removeItem('active_partner_session');
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, []);

  const loginAdmin = async (email) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (cleanEmail === '29sandesh.agrawal@gmail.com') {
      if (supabase) {
        try {
          const { error } = await supabase.auth.signInWithOtp({
            email: cleanEmail,
            options: {
              emailRedirectTo: window.location.origin + '/admin'
            }
          });
          if (error) throw error;
          return { success: true, message: 'Magic login link sent to your email! Please check your inbox.' };
        } catch (err) {
          console.error("Admin Magic Link request failed:", err);
          return { success: false, error: err.message || 'Failed to send login link.' };
        }
      } else {
        // Fallback for offline mode
        sessionStorage.setItem('admin_authenticated', 'true');
        const adminUser = { email: cleanEmail, name: 'Sandesh (Admin)' };
        setUser(adminUser);
        setRole('admin');
        return { success: true, offline: true, user: adminUser };
      }
    }
    return { success: false, error: 'Access Denied: This email is not registered as an administrator.' };
  };

  const loginAdminWithGoogle = async () => {
    if (!supabase) {
      sessionStorage.setItem('admin_authenticated', 'true');
      const adminUser = { email: '29sandesh.agrawal@gmail.com', name: 'Sandesh (Admin)' };
      setUser(adminUser);
      setRole('admin');
      return { success: true, offline: true };
    }
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/admin'
        }
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Admin Google login failed:", err);
      return { success: false, error: err.message || 'Google Auth failed.' };
    }
  };

  const loginPartner = async (email, password) => {
    try {
      const partner = await db.getPartner(email);
      if (!partner) {
        return { success: false, error: 'Partner email not registered.' };
      }
      if (partner.password !== password) {
        return { success: false, error: 'Incorrect password.' };
      }
      if (partner.status !== 'active') {
        return { success: false, error: 'Your account is suspended or pending.' };
      }

      localStorage.setItem('active_partner_session', partner.email);
      setUser(partner);
      setRole('partner');
      return { success: true, user: partner };
    } catch (err) {
      return { success: false, error: err.message || 'An error occurred during sign in.' };
    }
  };

  const loginPartnerWithGoogle = async (partnerType = 'solo', signupData = {}) => {
    if (!supabase) {
      return { success: false, error: 'Supabase is not initialized. Google Authentication is unavailable.' };
    }
    
    // Store pending signup details to be used on redirect return
    localStorage.setItem('pending_partner_signup', JSON.stringify({
      partnerType,
      phone: signupData.phone || '',
      signupCity: signupData.signupCity || signupData.city || 'Global',
      agencyName: partnerType === 'agency' ? signupData.agencyName : null,
      agencySize: partnerType === 'agency' ? signupData.agencySize : null,
      agencyWebsite: partnerType === 'agency' ? signupData.agencyWebsite : null
    }));

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/partner/dashboard'
        }
      });
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Google login failed:", err);
      return { success: false, error: err.message || 'An error occurred during Google sign in.' };
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('admin_authenticated');
    localStorage.removeItem('active_partner_session');
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setRole(null);
  };

  const refreshUser = async () => {
    if (role === 'partner' && user?.email) {
      const updated = await db.getPartner(user.email);
      if (updated) {
        setUser(updated);
      }
    }
  };

  const value = {
    user,
    role,
    loading,
    loginAdmin,
    loginAdminWithGoogle,
    loginPartner,
    loginPartnerWithGoogle,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
