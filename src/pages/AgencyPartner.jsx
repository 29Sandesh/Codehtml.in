import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/database';
import { 
  ArrowRight, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  MessageSquare, 
  Mail, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Laptop, 
  Shield 
} from 'lucide-react';
import SEO from '../components/SEO';
import { generateOTP, sendOTPEmail, validateOTP, clearOTP } from '../utils/emailOTP';

// Star Projects Data
const STAR_PROJECTS = [
  {
    name: 'Swigato India',
    tagline: 'Multi-city hyperlocal food ordering & delivery platform built for scale.',
    image: '/SwigatoIndia.webp',
    link: 'https://swigatoindia.in',
    stats: ['150k+ Active Users', '0.2s Load Time', 'Hyperlocal Geofencing']
  },
  {
    name: 'SLCC Construction',
    tagline: 'High-end corporate portfolio & resource management portal for industrial engineering.',
    image: '/slcc_construction.webp',
    link: 'https://slcc.in',
    stats: ['Enterprise CMS', 'Premium 3D Assets', 'Secure Client Portal']
  },
  {
    name: 'ElGamingo',
    tagline: 'Modern gaming e-commerce storefront with automated invoice & delivery channels.',
    image: '/elgamingo.webp',
    link: 'https://elgamingo.store',
    stats: ['Instant Key Delivery', 'Global Payments', 'Dynamic Inventory']
  }
];

// White-label Apps Screenshots
const CIRCLE_SCREENSHOTS = [
  { src: '/screenshots/circle-login.webp', label: 'Login Screen' },
  { src: '/screenshots/circle-dashboard.webp', label: 'Client Dashboard' },
  { src: '/screenshots/circle-tasks.webp', label: 'Kanban Task Board' },
  { src: '/screenshots/circle-hierarchy.webp', label: 'Company Hierarchy' }
];

const COFOUND_SCREENSHOTS = [
  { src: '/screenshots/cofound-landing.webp', label: 'Discover Matching UI' },
  { src: '/screenshots/cofound-onboarding.webp', label: 'Vetting Onboarding' },
  { src: '/screenshots/cofound-discover.webp', label: 'Job Board & Roles' }
];

export default function AgencyPartner() {
  const navigate = useNavigate();
  const { user, role, loginPartner, loginPartnerWithGoogle } = useAuth();
  const [city, setCity] = useState('');
  const [circleIndex, setCircleIndex] = useState(0);
  const [cofoundIndex, setCofoundIndex] = useState(0);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Partner Form State
  const [isSignIn, setIsSignIn] = useState(false);
  const [partnerType, setPartnerType] = useState('agency'); // 'agency' or 'solo'
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    signupCity: '',
    agencyName: '',
    agencySize: '2-5',
    agencyWebsite: ''
  });
  const [signinForm, setSigninForm] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);



  // Auth popup states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [modalMode, setModalMode] = useState('signup'); // 'signup' or 'signin'
  const [signupStep, setSignupStep] = useState('choice'); // 'choice' or 'form'

  // OTP Verification flow states
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    // Seed test accounts if they do not exist
    const storedPartnersList = JSON.parse(localStorage.getItem('codehtml_partners') || '[]');
    let wasModified = false;

    if (!storedPartnersList.some(p => p.email.toLowerCase() === 'agencytest@gmail.com')) {
      storedPartnersList.push({
        name: 'Agency Test Partner',
        email: 'agencytest@gmail.com',
        password: 'Sad123',
        phone: '+91 93032 28082',
        city: 'Global',
        partnerType: 'agency',
        commissionRate: 15,
        agency: 'Agency Test Studio',
        agencyName: 'Agency Test Studio',
        agencySize: '2-5',
        agencyWebsite: 'https://testagency.com',
        referralCode: 'AGENCY-7M8K2',
        verified: true,
        dateJoined: new Date().toLocaleDateString()
      });
      wasModified = true;
    }

    if (!storedPartnersList.some(p => p.email.toLowerCase() === 'solotest@gmail.com')) {
      storedPartnersList.push({
        name: 'Solo Test Partner',
        email: 'solotest@gmail.com',
        password: 'Sad123',
        phone: '+91 93032 28082',
        city: 'Global',
        partnerType: 'solo',
        commissionRate: 10,
        agency: 'Solo Partner',
        agencyName: null,
        agencySize: null,
        agencyWebsite: null,
        referralCode: 'SOLO-9V2W4',
        verified: true,
        dateJoined: new Date().toLocaleDateString()
      });
      wasModified = true;
    }

    if (wasModified) {
      localStorage.setItem('codehtml_partners', JSON.stringify(storedPartnersList));
    }

    // Detect error in query params (e.g. from failed Google Auth)
    const params = new URLSearchParams(window.location.search);
    const errorParam = params.get('error');
    if (errorParam) {
      setErrorMsg(decodeURIComponent(errorParam));
      setShowAuthModal(true);
      // Clean query parameters from URL history
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Redirect if already authenticated
    if (user && role === 'partner') {
      navigate('/partner/dashboard');
    }

    // Detect if user came from a city-specific page
    const storedCity = sessionStorage.getItem('last_city');
    if (storedCity) {
      setCity(storedCity);
      setSignupForm(prev => ({ ...prev, signupCity: storedCity }));
    }
  }, [user, role, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const partners = JSON.parse(localStorage.getItem('codehtml_partners') || '[]');

      if (partners.some(p => p.email.toLowerCase() === signupForm.email.toLowerCase().trim())) {
        setErrorMsg('This email is already registered. Please sign in.');
        setSubmitting(false);
        return;
      }

      // Generate and Send OTP
      const otp = generateOTP();
      await sendOTPEmail(signupForm.email, otp, signupForm.name);
      
      setSuccessMsg('Verification code sent to your email.');
      setShowOtpScreen(true);
      setResendCooldown(60);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to send verification email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const otp = generateOTP();
      await sendOTPEmail(signupForm.email, otp, signupForm.name);
      setSuccessMsg('A new verification code has been sent.');
      setResendCooldown(60);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to resend verification email.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleOTPVerify = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const otpResult = validateOTP(otpCode);
      if (!otpResult.valid) {
        setErrorMsg(otpResult.error || 'Invalid verification code.');
        setSubmitting(false);
        return;
      }

      // OTP is valid, complete registration
      clearOTP();
      // Calculate commission based on partner type
      const commissionRate = partnerType === 'agency' ? 15 : 10;
      const agencyVal = partnerType === 'agency' ? signupForm.agencyName : 'Solo Partner';

      const newPartner = {
        name: signupForm.name,
        email: signupForm.email.toLowerCase().trim(),
        password: signupForm.password,
        phone: signupForm.phone,
        city: signupForm.signupCity || city || 'Global',
        partnerType,
        commissionRate,
        agency: agencyVal,
        agencyName: partnerType === 'agency' ? signupForm.agencyName : null,
        agencySize: partnerType === 'agency' ? signupForm.agencySize : null,
        agencyWebsite: partnerType === 'agency' ? signupForm.agencyWebsite : null,
        termsAccepted: false,
        upiId: '',
        status: 'active'
      };

      const added = await db.addPartner(newPartner);
      await loginPartner(added.email, added.password);

      // Submit lead to Web3Forms
      const web3Payload = {
        access_key: "91c45bc7-1cb5-43ac-aa1f-79627a8c7f04",
        subject: `New Partner Signup (${partnerType.toUpperCase()}): ${newPartner.name}`,
        from_name: "CodeHTML Partner System",
        name: newPartner.name,
        email: newPartner.email,
        phone: newPartner.phone,
        partner_type: newPartner.partnerType,
        commission_rate: `${newPartner.commissionRate}%`,
        agency: newPartner.agency,
        agency_size: newPartner.agencySize || 'N/A',
        agency_website: newPartner.agencyWebsite || 'N/A',
        city: newPartner.city,
        referral_code: newPartner.referralCode,
        message: `B2B ${newPartner.partnerType} partner successfully registered and verified via OTP. Referral code is ${newPartner.referralCode}.`
      };

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(web3Payload)
      });

      setSuccessMsg('Successfully verified and registered! Redirecting...');
      setTimeout(() => {
        navigate('/partner/dashboard');
      }, 1500);

    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process registration. Please check your network.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    const emailVal = signinForm.email.trim().toLowerCase();
    const passwordVal = signinForm.password.trim();
    if (!emailVal || !passwordVal) return;

    const res = await loginPartner(emailVal, passwordVal);
    if (res.success) {
      setSuccessMsg('Sign in successful! Redirecting...');
      setTimeout(() => {
        navigate('/partner/dashboard');
      }, 1000);
    } else {
      setErrorMsg(res.error || 'Incorrect password. Please try again.');
    }
  };

  const handleGoogleLogin = async (overrideType) => {
    const targetType = (typeof overrideType === 'string') ? overrideType : partnerType;

    setSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');
    
    try {
      const res = await loginPartnerWithGoogle(targetType, {
        phone: '',
        signupCity: signupForm.signupCity || city || 'Global',
        agencyName: null,
        agencySize: signupForm.agencySize,
        agencyWebsite: signupForm.agencyWebsite
      });
      
      if (res.success) {
        setSuccessMsg('Connecting to Google...');
      } else {
        setErrorMsg(res.error || 'Google Sign-In failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to process Google Authentication.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappMessage = `Hi! I work with a premium dev studio that builds custom websites & apps in 3-5 days. They've built platforms like Swigato India, SLCC Construction, and more. Check out their portfolio: https://codehtml.in/portfolio — I can set up a direct introduction if you want to build a website or app for your company.`;

  const emailSubject = `Premium Custom Software & Web Development Partner`;
  const emailBody = `Hi [Client Name],

I wanted to introduce you to our development partner, CodeHTML. They build premium custom websites, high-performing web applications, and mobile apps (iOS & Android) with rapid turnaround times (often 3-5 days).

You can review some of their flagship builds here:
- Swigato India (Food Delivery Platform): https://swigatoindia.in
- SLCC Construction (Enterprise Portal): https://slcc.in
- ElGamingo (E-commerce storefront): https://elgamingo.store

They specialize in clean React architectures, flawless Tailwind styling, and optimized SEO out of the box.

If you are planning any digital upgrades, custom portals, or mobile apps this quarter, let me know. I can set up a direct consultation with their head architect.

Best regards,
[Your Name]`;

  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const nextCircle = () => {
    setCircleIndex((prev) => (prev + 1) % CIRCLE_SCREENSHOTS.length);
  };
  const prevCircle = () => {
    setCircleIndex((prev) => (prev - 1 + CIRCLE_SCREENSHOTS.length) % CIRCLE_SCREENSHOTS.length);
  };

  const nextCofound = () => {
    setCofoundIndex((prev) => (prev + 1) % COFOUND_SCREENSHOTS.length);
  };
  const prevCofound = () => {
    setCofoundIndex((prev) => (prev - 1 + COFOUND_SCREENSHOTS.length) % COFOUND_SCREENSHOTS.length);
  };

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-vintage-gold selection:text-white overflow-x-hidden font-body">
      <SEO 
        title={city ? `White Label Web Development Partner in ${city} | CodeHTML` : "Partner Program | CodeHTML"}
        description={city ? `Partner with CodeHTML in ${city}. Sell premium web and app development under your brand. Download our partner kit.` : "Partner with CodeHTML. Expand your software and product capabilities with white-label web and mobile app development. Get instant commissions."}
        noindex={false}
      />

      {/* Decorative Grid / Accent light */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-vintage-gold/5 to-transparent pointer-events-none z-0" />

      {/* HERO SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 text-center pt-12 pb-16 md:py-24 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-4 block">
            PARTNER PROGRAM
          </span>
          <h1 className="font-headline font-extrabold tracking-tight text-4xl sm:text-6xl md:text-7xl mb-6 uppercase leading-[1.1]">
            WE BUILD. YOU SELL.<br />
            <span className="font-elegant italic font-light text-vintage-gold normal-case">Scale your software & product capabilities.</span>
          </h1>
          <p className="max-w-2xl mx-auto font-body text-zinc-400 text-sm md:text-base leading-relaxed mb-10">
            Offer premium custom websites, complex SaaS, and mobile apps to your clients in {city || 'your city'}. No overhead, no developer management, and zero headache. We do the heavy lifting under your brand or as your dedicated partner.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              type="button"
              onClick={() => {
                setModalMode('signup');
                setSignupStep('choice');
                setShowOtpScreen(false);
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-vintage-gold text-black font-body font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.25)] cursor-pointer"
            >
              Sign Up as Partner
            </button>
            <button 
              type="button"
              onClick={() => {
                setModalMode('signin');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 border border-white/10 bg-zinc-950/60 text-white font-body font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Sign In to Console
            </button>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-10 border-t border-zinc-900">
        <div className="text-center mb-16">
          <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-2">SIMPLE WORKFLOW</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase">
            How The Partnership <span className="font-elegant italic font-light text-vintage-gold">Works.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1 */}
          <div className="relative bg-zinc-950/40 border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all group">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-zinc-900 border border-white/10 text-vintage-gold text-xs font-black font-headline px-3 py-1 rounded-full">
              STEP 01
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-vintage-gold/10 border border-vintage-gold/20 flex items-center justify-center mb-6 text-vintage-gold group-hover:bg-vintage-gold group-hover:text-black transition-colors">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-extrabold text-lg uppercase mb-3 text-white">Client Needs Tech</h3>
              <p className="font-body text-zinc-400 text-xs leading-relaxed">
                Your client requests a custom website, internal software, or mobile app that goes beyond your in-house marketing capabilities.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-zinc-950/40 border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all group">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-zinc-900 border border-white/10 text-vintage-gold text-xs font-black font-headline px-3 py-1 rounded-full">
              STEP 02
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-vintage-gold/10 border border-vintage-gold/20 flex items-center justify-center mb-6 text-vintage-gold group-hover:bg-vintage-gold group-hover:text-black transition-colors">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-extrabold text-lg uppercase mb-3 text-white">We Build White-Label</h3>
              <p className="font-body text-zinc-400 text-xs leading-relaxed">
                We handle discovery, architecture, styling, and coding. You present our elite UI work and builds to your client under your own brand name.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-zinc-950/40 border border-white/5 p-8 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all group">
            <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-zinc-900 border border-white/10 text-vintage-gold text-xs font-black font-headline px-3 py-1 rounded-full">
              STEP 03
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-vintage-gold/10 border border-vintage-gold/20 flex items-center justify-center mb-6 text-vintage-gold group-hover:bg-vintage-gold group-hover:text-black transition-colors">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-headline font-extrabold text-lg uppercase mb-3 text-white">Earn and Retain</h3>
              <p className="font-body text-zinc-400 text-xs leading-relaxed">
                Add premium web development to your service portfolio, upsell existing clients, and secure massive payouts or recurrent referral commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STAR PROJECTS SHOWCASE */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-10 border-t border-zinc-900">
        <div className="text-center mb-16">
          <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-2">VALIDATED EXCELLENCE</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase">
            Flagship Builds To <span className="font-elegant italic font-light text-vintage-gold">Showcase.</span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-xs mt-3 leading-relaxed">
            Show these real, live platforms to your clients as live proof of the class-leading quality they will receive.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {STAR_PROJECTS.map((project, idx) => (
            <div key={idx} className="bg-zinc-950 border border-white/5 hover:border-vintage-gold/30 rounded-2xl overflow-hidden flex flex-col transition-all group">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={`${project.name} - Custom Coded Web Platform developed by CodeHTML`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-headline font-black text-xl uppercase tracking-tight text-white mb-2">
                    {project.name}
                  </h3>
                  <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                    {project.tagline}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stats.map((stat, sIdx) => (
                      <span key={sIdx} className="text-[10px] font-body font-bold text-vintage-gold bg-vintage-gold/5 border border-vintage-gold/10 px-2 py-1 rounded">
                        {stat}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-vintage-gold bg-zinc-900/40 text-white hover:text-vintage-gold font-body font-bold text-[10px] uppercase tracking-wider py-3 rounded-lg transition-all"
                  >
                    Visit Live Site <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHITE LABEL APPS SECTION */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-10 border-t border-zinc-900">
        <div className="text-center mb-16">
          <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-2">READY PRODUCT DEPLOYMENTS</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase">
            Apps We Build <span className="font-elegant italic font-light text-vintage-gold">& Sell.</span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-xs mt-3 leading-relaxed">
            Sell these pre-engineered elite software solutions directly to your enterprise clients as white-label platforms.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {/* THE CIRCLE APP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Carousel Column */}
            <div className="relative bg-zinc-950 border border-white/5 p-4 sm:p-6 rounded-2xl">
              <div className="relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={circleIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <img 
                      src={CIRCLE_SCREENSHOTS[circleIndex].src} 
                      alt={`${CIRCLE_SCREENSHOTS[circleIndex].label} - CodeHTML White-Label SaaS Demo`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-left">
                      <span className="font-body text-[10px] font-bold text-vintage-gold tracking-widest uppercase">
                        {CIRCLE_SCREENSHOTS[circleIndex].label}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Left/Right controls */}
                <button 
                  onClick={prevCircle}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextCircle}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {CIRCLE_SCREENSHOTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCircleIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === circleIndex ? 'w-6 bg-vintage-gold' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Info Column */}
            <div>
              <span className="text-vintage-gold font-body text-[10px] font-bold tracking-widest uppercase border border-vintage-gold/20 bg-vintage-gold/5 px-2.5 py-1 rounded mb-4 inline-block">
                WHITE-LABEL WORKSPACE SAAS
              </span>
              <h3 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
                THE CIRCLE APP
              </h3>
              <p className="font-body text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
                A premium team workspace platform featuring sprint velocity tracking, task allocation boards, nested hierarchy visualizers, and secure login modules. Fully responsive and customizable to your client's business workflows.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Interactive Kanban board & Sprint velocity monitors</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Dynamic company organizational chart visualizer</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Deploy under your client's logo and domain in under 48 hours</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20the%20white-label%20Circle%20app%20for%20a%20client.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-vintage-gold border border-vintage-gold text-vintage-gold hover:text-black font-body font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Inquire For White-Label Rates
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COFOUND APP */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
            {/* Info Column */}
            <div className="lg:order-2">
              <span className="text-vintage-gold font-body text-[10px] font-bold tracking-widest uppercase border border-vintage-gold/20 bg-vintage-gold/5 px-2.5 py-1 rounded mb-4 inline-block">
                WHITE-LABEL COLLABORATION PLATFORM
              </span>
              <h3 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-white mb-4">
                COFOUND PLATFORM
              </h3>
              <p className="font-body text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6">
                A matching application for entrepreneurs, co-founders, and investors. Features swipe-based matching cards, multi-step profile onboarding options, and custom discover feeds filtered by startup niche and roles.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Swipe card UI optimized for high engagement</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Role vetting and onboarding questionnaire flows</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-zinc-400">
                  <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                  <span>Ready to deploy for local startup communities or corporate incubators</span>
                </div>
              </div>

              <a 
                href={`https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20the%20white-label%20CoFound%20app%20for%20a%20client.`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-zinc-950 hover:bg-vintage-gold border border-vintage-gold text-vintage-gold hover:text-black font-body font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Inquire For White-Label Rates
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Carousel Column */}
            <div className="relative bg-zinc-950 border border-white/5 p-4 sm:p-6 rounded-2xl lg:order-1 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[280px] mx-auto">
                <div className="relative aspect-[9/19] bg-black rounded-[2.5rem] overflow-hidden border-[6px] border-zinc-800 shadow-2xl">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={cofoundIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full relative"
                    >
                      <img 
                        src={COFOUND_SCREENSHOTS[cofoundIndex].src} 
                        alt={`${COFOUND_SCREENSHOTS[cofoundIndex].label} - CodeHTML White-Label Mobile App Demo`} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute bottom-6 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg text-left z-10">
                        <span className="font-body text-[10px] font-bold text-vintage-gold tracking-widest uppercase">
                          {COFOUND_SCREENSHOTS[cofoundIndex].label}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Left/Right controls */}
                  <button 
                    onClick={prevCofound}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={nextCofound}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {COFOUND_SCREENSHOTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCofoundIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === cofoundIndex ? 'w-6 bg-vintage-gold' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COPY PASTE TEMPLATES */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-10 border-t border-zinc-900">
        <div className="text-center mb-16">
          <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-2">READY-TO-USE ASSETS</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase">
            Marketing Templates For <span className="font-elegant italic font-light text-vintage-gold">Partners.</span>
          </h2>
          <p className="max-w-xl mx-auto text-zinc-400 text-xs mt-3 leading-relaxed">
            Copy and paste these pre-formatted templates to forward leads or pitch capabilities directly to your clients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* WhatsApp Template */}
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-2xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-emerald-500 font-headline font-extrabold text-sm uppercase tracking-wider">
                  💬 WhatsApp Referral Message
                </span>
                <button
                  onClick={() => handleCopy(whatsappMessage, setCopiedWhatsapp)}
                  className="flex items-center gap-2 text-[10px] font-body font-bold text-vintage-gold hover:text-white transition-colors cursor-pointer"
                >
                  {copiedWhatsapp ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Template
                    </>
                  )}
                </button>
              </div>
              <div className="bg-black/50 border border-white/10 p-5 rounded-xl font-body text-zinc-300 text-xs leading-relaxed select-all">
                {whatsappMessage}
              </div>
            </div>
            <p className="font-body text-[10px] text-zinc-500 mt-6 leading-relaxed">
              * Ideal for forwarding to friendly agency owners or clients who ask you for trusted dev recommendations.
            </p>
          </div>

          {/* Email Template */}
          <div className="bg-zinc-950 border border-white/5 p-8 rounded-2xl relative flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-vintage-gold font-headline font-extrabold text-sm uppercase tracking-wider">
                  📧 Capabilities Email pitch
                </span>
                <button
                  onClick={() => handleCopy(`${emailSubject}\n\n${emailBody}`, setCopiedEmail)}
                  className="flex items-center gap-2 text-[10px] font-body font-bold text-vintage-gold hover:text-white transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Template
                    </>
                  )}
                </button>
              </div>
              <div className="bg-black/50 border border-white/10 p-5 rounded-xl font-body text-zinc-300 text-xs leading-relaxed max-h-[180px] overflow-y-auto select-all scrollbar-thin">
                <p className="font-bold border-b border-white/10 pb-2 mb-2 text-white text-[10px]">
                  Subject: {emailSubject}
                </p>
                <pre className="font-body whitespace-pre-wrap font-medium">{emailBody}</pre>
              </div>
            </div>
            <p className="font-body text-[10px] text-zinc-500 mt-6 leading-relaxed">
              * Perfect for emailing warm leads or active marketing clients who are planning to build custom portals.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING LINK CARD */}
      <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 z-10">
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-vintage-gold/20 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-vintage-gold/5 rounded-full blur-3xl" />
          <h3 className="font-headline font-black text-2xl md:text-3xl uppercase tracking-tight mb-3 text-white">
            Looking For Pricing?
          </h3>
          <p className="max-w-xl text-zinc-400 text-xs md:text-sm mb-8 leading-relaxed">
            We offer transparent rates for our development partners. View our live pricing details to calculate your margins and markup values.
          </p>
          <Link 
            to="/pricing"
            className="flex items-center gap-2 bg-white text-black font-body font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-vintage-gold hover:text-black transition-all shadow-lg cursor-pointer"
          >
            View Full Rate Card
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* PARTNERSHIP CTA SECTION */}
      <section id="partner-auth-section" className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 z-10 border-t border-zinc-900">
        <div className="bg-gradient-to-r from-zinc-950 to-zinc-900 border border-white/5 p-8 md:p-16 rounded-3xl text-center flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-vintage-gold/5 rounded-full blur-3xl" />
          
          <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-3">
            PARTNERSHIP INQUIRIES
          </span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase mb-6 leading-none text-white">
            Start Referring.<br />
            <span className="font-elegant italic font-light text-vintage-gold normal-case">Collect your commissions.</span>
          </h2>
          <p className="max-w-2xl text-zinc-400 text-xs md:text-sm mb-10 leading-relaxed">
            Ready to formalize your B2B partnership? Join our network of digital agencies and solo professionals. Get access to white-label marketing collateral, contracts, capabilities decks, and direct support lines.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 z-10">
            <button 
              onClick={() => {
                setModalMode('signup');
                setSignupStep('choice');
                setShowOtpScreen(false);
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto bg-vintage-gold text-black font-body font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Become a Partner
            </button>
            <button 
              onClick={() => {
                setModalMode('signin');
                setShowAuthModal(true);
              }}
              className="w-full sm:w-auto border border-white/10 bg-zinc-950/60 text-white font-body font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl transition-all cursor-pointer"
            >
              Access Partner Console
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 md:gap-12 border-t border-white/5 pt-8 w-full justify-center">
            <div className="flex items-center justify-center gap-3">
              <Mail className="w-4 h-4 text-vintage-gold" />
              <a href="mailto:Contact@Codehtml.in" className="text-zinc-400 hover:text-vintage-gold transition-colors font-headline font-bold text-xs uppercase">
                Contact@Codehtml.in
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MessageSquare className="w-4 h-4 text-vintage-gold" />
              <a href="https://wa.me/919303228082" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-vintage-gold transition-colors font-headline font-bold text-xs uppercase">
                +91 93032 28082
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* AUTH POPUP MODAL */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[150] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 relative shadow-2xl my-8 text-left"
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setShowAuthModal(false);
                  setErrorMsg('');
                  setSuccessMsg('');
                  setOtpCode('');
                }}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors cursor-pointer z-10"
              >
                ✕
              </button>

              <div className="text-center py-6">
                <h3 className="font-headline font-black text-2xl uppercase text-white mb-3">Partner Portal</h3>
                <p className="font-body text-zinc-400 text-xs leading-relaxed max-w-sm mx-auto mb-8">
                  Sign in or register instantly using your Google account to access your referral dashboard, marketing assets, and commission tracking.
                </p>

                {/* Notifications */}
                {successMsg && (
                  <div className="mb-6 p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-body text-xs text-center">
                    {successMsg}
                  </div>
                )}
                {errorMsg && (
                  <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl font-body text-xs text-center">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleGoogleLogin('solo')}
                  disabled={submitting}
                  className="w-full py-4 rounded-xl border border-white/10 hover:border-vintage-gold bg-zinc-950 hover:bg-zinc-900 text-white font-body font-bold text-xs tracking-wider uppercase transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shadow-lg hover:shadow-vintage-gold/5"
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Continue with Google
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


    </main>
  );
}
