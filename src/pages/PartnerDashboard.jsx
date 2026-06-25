import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Copy, 
  Check, 
  Download, 
  ExternalLink, 
  LogOut, 
  FileText, 
  MessageSquare, 
  Share2, 
  Sparkles,
  Award,
  Layers,
  Percent,
  ChevronLeft
} from 'lucide-react';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../services/database';

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

export default function PartnerDashboard() {
  const navigate = useNavigate();
  const { user: partner, refreshUser, logout } = useAuth();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [referrals, setReferrals] = useState([]);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [upiInput, setUpiInput] = useState('');

  // Onboarding / Complete Profile Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [agencyNameInput, setAgencyNameInput] = useState('');
  const [agencySizeInput, setAgencySizeInput] = useState('2-5');
  const [agencyWebsiteInput, setAgencyWebsiteInput] = useState('');
  const [acceptOnboardingTerms, setAcceptOnboardingTerms] = useState(false);

  useEffect(() => {
    if (!partner) return;
    setUpiInput(partner.upiId || '');
    setPhoneInput(partner.phone || '');
    setAgencyNameInput(partner.agencyName || '');
    setAgencySizeInput(partner.agencySize || '2-5');
    setAgencyWebsiteInput(partner.agencyWebsite || '');

    // Open complete profile modal if phone number is missing (e.g. Google Sign-up)
    // or if they are an agency and missing the agency name.
    if (!partner.phone || (partner.partnerType === 'agency' && !partner.agencyName)) {
      setShowProfileModal(true);
    } else if (!partner.termsAccepted) {
      setShowTermsModal(true);
    }

    const loadReferrals = async () => {
      try {
        const leads = await db.getLeads();
        const filtered = leads.filter(l => l.referralCode && l.referralCode.toUpperCase() === partner.referralCode.toUpperCase());
        setReferrals(filtered);
      } catch (err) {
        console.error("Failed to load referrals", err);
      }
    };

    loadReferrals();
  }, [partner]);

  const handleLogout = () => {
    logout();
    navigate('/partner');
  };

  const handleCopy = (text, setCopiedState) => {
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleAcceptTerms = async (e) => {
    e.preventDefault();
    if (!upiInput.trim()) return;

    try {
      await db.updatePartner(partner.email, {
        termsAccepted: true,
        upiId: upiInput.trim()
      });
      await refreshUser();
      setShowTermsModal(false);
    } catch (err) {
      alert("Failed to update profile settings");
    }
  };

  const handleCompleteProfileSubmit = async (e) => {
    e.preventDefault();
    if (!phoneInput.trim()) {
      alert("Mobile number is required.");
      return;
    }
    if (partner.partnerType === 'agency' && !agencyNameInput.trim()) {
      alert("Agency Name is required.");
      return;
    }
    if (!acceptOnboardingTerms) {
      alert("You must agree to the partnership terms.");
      return;
    }

    try {
      const updates = {
        phone: phoneInput.trim(),
        upiId: upiInput.trim(),
        termsAccepted: true
      };

      if (partner.partnerType === 'agency') {
        updates.agencyName = agencyNameInput.trim();
        updates.agencySize = agencySizeInput;
        updates.agencyWebsite = agencyWebsiteInput.trim();
      }

      await db.updatePartner(partner.email, updates);
      await refreshUser();
      setShowProfileModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to complete onboarding. Please try again.");
    }
  };

  if (!partner) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-t-2 border-vintage-gold border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  const referralLink = `${window.location.origin}/?ref=${partner.referralCode}`;
  const whatsappMessage = `Hi! I work with a premium dev studio that builds custom websites & apps in 3-5 days. They've built platforms like Swigato India, SLCC Construction, and more. Check out their portfolio & services via my referral link: ${referralLink} — if you inquire through my link, you will automatically get a 5% discount on your project. Let me know if you want a direct introduction!`;

  const emailSubject = `Premium Custom Software & Web Development Partner (5% Discount Link)`;
  const emailBody = `Hi [Client Name],

I wanted to introduce you to our development partner, CodeHTML. They build premium custom websites, high-performing web applications, and mobile apps (iOS & Android) with rapid turnaround times (often 3-5 days).

If you decide to work with them, you can use my referral link: ${referralLink} to automatically get a 5% discount on your initial project scope.

You can review some of their flagship builds here:
- Swigato India (Food Delivery Platform): https://swigatoindia.in
- SLCC Construction (Enterprise Portal): https://slcc.in
- ElGamingo (E-commerce storefront): https://elgamingo.store

They specialize in clean React architectures, flawless Tailwind styling, and optimized SEO out of the box.

If you are planning any digital upgrades, custom portals, or mobile apps this quarter, let me know. I can set up a direct consultation with their head architect.

Best regards,
[Your Name]`;

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-20 selection:bg-vintage-gold selection:text-white relative font-body text-left">
      <SEO title="Partner Console | CodeHTML" noindex={true} />
      
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-[350px] h-[350px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* TOP BAR / BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-900 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1.5">
              <Link to="/" className="hover:text-vintage-gold flex items-center gap-1 transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" /> Home
              </Link>
            </div>
            <h1 className="font-headline font-extrabold text-2xl md:text-4xl text-white uppercase tracking-tight flex items-center gap-2">
              Partner Console <Sparkles className="w-5 h-5 text-vintage-gold" />
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Signed In As</span>
              <span className="text-xs font-bold text-vintage-gold block">{partner.name}</span>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <span className="text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-zinc-900 border border-white/5 text-zinc-400">
                  {partner.partnerType === 'agency' ? 'Agency' : 'Solo'}
                </span>
                <span className="text-[10px] font-medium text-zinc-500 font-bold">
                  {partner.partnerType === 'agency' ? partner.agencyName : 'Freelancer'}
                </span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-zinc-900 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-zinc-400 hover:text-red-400 font-body font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* MAIN DASHBOARD LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
          
          {/* LEFT COLUMN: Commission Summary & Referred Clients list */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Referral Stats Summary Card (Commission Summary) */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <h2 className="font-headline font-black text-xl md:text-2xl uppercase text-white mb-2">
                  Commission Summary
                </h2>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                  Real-time status updates of referred clients and earnings overview.
                </p>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Total Referrals</span>
                    <span className="text-xl md:text-2xl font-headline font-extrabold text-white">{referrals.length}</span>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Confirmed Deals</span>
                    <span className="text-xl md:text-2xl font-headline font-extrabold text-emerald-400">
                      {referrals.filter(r => r.status === 'Won').length}
                    </span>
                  </div>
                  <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
                    <span className="block text-[8px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Total Earned</span>
                    <span className="text-xl md:text-2xl font-headline font-extrabold text-vintage-gold">
                      {(() => {
                        const total = referrals
                          .filter(r => r.status === 'Won')
                          .reduce((sum, r) => sum + (r.finalPrice || r.budgetVal || 0) * ((r.commissionRate || 10) / 100), 0);
                        if (total < 5000) {
                          return `$${total.toLocaleString('en-US')}`;
                        }
                        return `₹${total.toLocaleString('en-IN')}`;
                      })()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-[10px] text-zinc-500 font-body leading-relaxed border-t border-white/5 pt-4 mt-6">
                Only referrals with client status <strong className="text-emerald-400">Won</strong> are confirmed for payout commissions.
              </div>
              </div>

            {/* Agency Details Card */}
            {partner && partner.partnerType === 'agency' && (
              <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div>
                    <h3 className="font-headline font-black text-lg uppercase text-white mb-1">
                      Agency Profile Details
                    </h3>
                    <p className="font-body text-zinc-400 text-xs">
                      Verified B2B partnership tier organizational structure.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 sm:flex items-center gap-4 sm:gap-8 text-left">
                    <div>
                      <span className="block text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Agency Name</span>
                      <span className="text-xs font-bold text-vintage-gold">{partner.agencyName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Team Size</span>
                      <span className="text-xs font-bold text-white">{partner.agencySize ? `${partner.agencySize} members` : 'N/A'}</span>
                    </div>
                    {partner.agencyWebsite && (
                      <div className="col-span-2 sm:col-span-1">
                        <span className="block text-[9px] text-zinc-500 uppercase font-bold tracking-wider mb-0.5">Website</span>
                        <a 
                          href={partner.agencyWebsite} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs font-bold text-vintage-gold hover:underline inline-flex items-center gap-1"
                        >
                          {partner.agencyWebsite.replace(/^https?:\/\/(www\.)?/, '')}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Referral List Table */}
            <div className="bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/5 bg-zinc-900/20 flex justify-between items-center">
                <span className="font-headline font-bold text-sm uppercase text-white">Your Referred Clients list</span>
                <span className="text-[9px] bg-vintage-gold/10 border border-vintage-gold/20 text-vintage-gold px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  Live Status Tracker
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 uppercase font-body font-bold tracking-wider">
                      <th className="py-4 px-6">Client Company</th>
                      <th className="py-4 px-6">Date Referred</th>
                      <th className="py-4 px-6">Project Scope</th>
                      <th className="py-4 px-6">Project Value</th>
                      <th className="py-4 px-6">Client Status</th>
                      <th className="py-4 px-6 text-right">Your Commission</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-body">
                    {referrals.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-zinc-500 font-body text-xs uppercase tracking-wider">
                          No clients referred yet. Share your referral code to get started.
                        </td>
                      </tr>
                    ) : (
                      referrals.map((ref, rIdx) => {
                        const isWon = ref.status === 'Won';
                        const projectVal = ref.finalPrice || ref.budgetVal || 0;
                        const comm = isWon ? projectVal * ((ref.commissionRate || 10) / 100) : 0;
                        
                        // Format currency helper for display
                        const formatVal = (val) => {
                          if (!val) return '$0';
                          if (val < 5000) {
                            return `$${val.toLocaleString('en-US')}`;
                          }
                          return `₹${val.toLocaleString('en-IN')}`;
                        };

                        return (
                          <tr key={ref.id || rIdx} className="hover:bg-zinc-900/20 transition-colors text-zinc-300">
                            <td className="py-4 px-6 font-bold text-white uppercase">{ref.name}</td>
                            <td className="py-4 px-6 text-zinc-400">{new Date(ref.createdAt).toLocaleDateString()}</td>
                            <td className="py-4 px-6 text-zinc-400 font-medium">{ref.projectType}</td>
                            <td className="py-4 px-6 font-mono text-zinc-400 font-semibold">{formatVal(projectVal)}</td>
                            <td className="py-4 px-6">
                              <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                                isWon ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' :
                                ref.status === 'Active' ? 'bg-sky-500/10 border border-sky-500/20 text-sky-400' :
                                ref.status === 'Negotiation' ? 'bg-purple-500/10 border border-purple-500/20 text-purple-400' :
                                ref.status === 'Proposal' ? 'bg-amber-500/10 border border-amber-500/20 text-amber-400' :
                                'bg-zinc-800 border border-white/5 text-zinc-500'
                              }`}>
                                {isWon ? 'Done (Confirmed)' :
                                 ref.status === 'Active' ? 'Active Project' :
                                 ref.status === 'Negotiation' ? 'Negotiation' :
                                 ref.status === 'Proposal' ? 'Proposal Sent' :
                                 'Inquiry'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-right font-mono font-bold">
                              {isWon ? (
                                <span className="text-vintage-gold">{formatVal(comm)}</span>
                              ) : (
                                <span className="text-zinc-600">Pending</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Referral Code, Payout Settings & Partner Benefits */}
          <div className="space-y-8">
            
            {/* Card 1: Referral Link */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vintage-gold/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <h2 className="font-headline font-black text-xl md:text-2xl uppercase text-white mb-2">
                  Your Referral Link
                </h2>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                  Share this unique link with clients. They will automatically receive a <strong className="text-vintage-gold">5% discount</strong> on their development budget when they contact us.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => handleCopy(referralLink, setCopiedLink)}
                    className="bg-vintage-gold hover:bg-white text-black font-body font-bold text-xs uppercase tracking-wider w-full py-4 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4" />
                        Copy Referral Link
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex flex-col gap-1 text-[10px] font-body text-zinc-500 uppercase font-bold tracking-wider">
                <span>Referral Link:</span>
                <span className="font-mono text-zinc-400 truncate w-full">{referralLink}</span>
              </div>
            </div>

            {/* Payout Setup Card */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden flex flex-col justify-between">
              <div>
                <h3 className="font-headline font-black text-lg uppercase text-white mb-2 flex items-center gap-2">
                  <Percent className="w-5 h-5 text-vintage-gold" /> Payout Settings
                </h3>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-4">
                  Register your UPI ID to receive direct bank payouts automatically when your referred client's project gets closed.
                </p>
                
                <form onSubmit={handleAcceptTerms} className="space-y-3 mt-4">
                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">Your UPI ID</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. name@okaxis"
                        value={upiInput}
                        onChange={(e) => setUpiInput(e.target.value)}
                        className="flex-grow px-3 py-2 bg-black border border-white/10 rounded-xl font-body text-xs text-white focus:outline-none focus:border-vintage-gold/50 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-vintage-gold hover:bg-white text-black font-body font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="text-[10px] text-zinc-500 font-body leading-relaxed border-t border-white/5 pt-4 mt-6">
                * Payments are disbursed within **one week** of CodeHTML receiving payments from confirmed clients.
              </div>
            </div>

            {/* Card 2: Partner Benefits */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-vintage-gold/10 border border-vintage-gold/20 flex items-center justify-center mb-6 text-vintage-gold">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="font-headline font-black text-xl uppercase text-white mb-2">
                  Partner Benefits
                </h2>
                <ul className="space-y-3 font-body text-zinc-400 text-xs mt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                    <span><strong>{partner.commissionRate || 10}% Commission</strong> on referred projects closed by our team.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                    <span><strong>5% Client Discount</strong> to incentivize your prospects.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                    <span><strong>Dedicated Dev Line</strong> directly with our engineering architects.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-vintage-gold mt-0.5 flex-shrink-0" />
                    <span><strong>White-Label Delivery</strong> if you choose to resell under your brand.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* PITCH DOCUMENTS & ASSETS */}
        <section className="relative py-12 border-t border-zinc-900">
          <div className="mb-10 text-left">
            <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-1">PARTNER TOOLKIT</span>
            <h3 className="font-headline font-extrabold text-2xl uppercase">
              Sales & Pitch Materials
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Download capabilities decks or copy pre-made communication templates to close clients fast.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Asset 1: Capabilities Deck */}
            <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-4">
                  <FileText className="w-5 h-5" />
                </div>
                <h4 className="font-headline font-bold text-base uppercase text-white mb-2">Capabilities Deck</h4>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                  Premium portfolio PDF outlining our technologies, project milestones, and timeline metrics. Share this directly with clients.
                </p>
              </div>
              <a
                href="/Premium-Digital-Solutions-Capabilities.pdf"
                download="Premium-Digital-Solutions-Capabilities.pdf"
                className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-white hover:text-black font-body font-bold text-[10px] uppercase tracking-wider py-3 border border-white/5 hover:border-transparent rounded-lg transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download PDF Deck
              </a>
            </div>

            {/* Asset 2: Portfolio Showcase */}
            <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="font-headline font-bold text-base uppercase text-white mb-2">Live Builds Directory</h4>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                  Send clients to our live showcases to verify performance metrics, responsiveness, and aesthetic styles.
                </p>
              </div>
              <Link
                to="/portfolio"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-white hover:text-black font-body font-bold text-[10px] uppercase tracking-wider py-3 border border-white/5 hover:border-transparent rounded-lg transition-all cursor-pointer"
              >
                Open Portfolio <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Asset 3: Rate Card */}
            <div className="bg-zinc-950 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Percent className="w-5 h-5" />
                </div>
                <h4 className="font-headline font-bold text-base uppercase text-white mb-2">Services & Pricing</h4>
                <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                  Transparent rate card for custom websites, complex SaaS applications, mobile apps, and custom AI chatbot systems.
                </p>
              </div>
              <Link
                to="/pricing"
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-zinc-900 hover:bg-white hover:text-black font-body font-bold text-[10px] uppercase tracking-wider py-3 border border-white/5 hover:border-transparent rounded-lg transition-all cursor-pointer"
              >
                Rate Card <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

          {/* Copy-Paste Outreach Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {/* WhatsApp Outreach */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-emerald-500 font-headline font-extrabold text-xs uppercase tracking-wider">
                    💬 WhatsApp Referral Message
                  </span>
                  <button
                    onClick={() => handleCopy(whatsappMessage, setCopiedWhatsapp)}
                    className="flex items-center gap-1.5 text-[9px] font-body font-bold text-vintage-gold hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedWhatsapp ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy template
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl font-body text-zinc-400 text-xs leading-relaxed max-h-[140px] overflow-y-auto select-all">
                  {whatsappMessage}
                </div>
              </div>
            </div>

            {/* Email Pitch */}
            <div className="bg-zinc-950 border border-white/5 p-6 md:p-8 rounded-3xl relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-vintage-gold font-headline font-extrabold text-xs uppercase tracking-wider">
                    📧 Capabilities Email pitch
                  </span>
                  <button
                    onClick={() => handleCopy(`${emailSubject}\n\n${emailBody}`, setCopiedEmail)}
                    className="flex items-center gap-1.5 text-[9px] font-body font-bold text-vintage-gold hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Copy template
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-black/50 border border-white/10 p-4 rounded-xl font-body text-zinc-400 text-xs leading-relaxed max-h-[140px] overflow-y-auto select-all">
                  <p className="font-bold border-b border-white/10 pb-1 mb-1 text-white text-[9px]">
                    Subject: {emailSubject}
                  </p>
                  <pre className="font-body whitespace-pre-wrap font-medium">{emailBody}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FLAGSHIP SHOWCASE */}
        <section className="relative py-12 border-t border-zinc-900">
          <div className="text-left mb-10">
            <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-1">PORTFOLIO EXCELLENCE</span>
            <h3 className="font-headline font-extrabold text-2xl uppercase">
              Showcase Projects
            </h3>
            <p className="text-zinc-500 text-xs mt-1">
              Refer back to these live builds when pitching custom capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STAR_PROJECTS.map((project, idx) => (
              <div key={idx} className="bg-zinc-950 border border-white/5 hover:border-vintage-gold/30 rounded-2xl overflow-hidden flex flex-col transition-all group">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="font-headline font-black text-lg uppercase tracking-tight text-white mb-2">
                      {project.name}
                    </h3>
                    <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                      {project.tagline}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stats.map((stat, sIdx) => (
                        <span key={sIdx} className="text-[9px] font-body font-bold text-vintage-gold bg-vintage-gold/5 border border-vintage-gold/10 px-2 py-0.5 rounded">
                          {stat}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-vintage-gold bg-zinc-900/40 text-white hover:text-vintage-gold font-body font-bold text-[9px] uppercase tracking-wider py-2.5 rounded-lg transition-all"
                    >
                      Visit Live Site <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl z-10 text-left"
            >
              {/* Decorative gold/blue top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-vintage-gold/10 rounded-full blur-2xl pointer-events-none" />

              <h2 className="font-headline font-black text-xl md:text-2xl uppercase text-white mb-4 tracking-tight flex items-center gap-2">
                <FileText className="w-6 h-6 text-vintage-gold" /> Terms & Partnership Agreement
              </h2>

              <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                Welcome to the CodeHTML Partner Program. To activate your account and start earning, please review and accept our standard partnership terms below.
              </p>

              {/* Scrollable Terms Text */}
              <div className="bg-black/50 border border-white/5 rounded-2xl p-4 h-48 overflow-y-auto mb-6 text-xs text-zinc-400 space-y-4 font-body leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                <div>
                  <h4 className="font-bold text-white uppercase mb-1">1. Commission Eligibility</h4>
                  <p>Partners are only eligible for commission payouts on <strong>Confirmed Clients</strong> (indicated as client status "Done"). Inquiry, proposal, negotiation, or active development stages are not eligible for payouts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase mb-1">2. Payout Schedule</h4>
                  <p>Referral commissions are calculated based on the final contract budget of the closed project. Payments will be disbursed to your registered UPI address within <strong>one (1) week</strong> of CodeHTML receiving cleared payments from the client.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase mb-1">3. Direct UPI Disbursal</h4>
                  <p>All commission payments are sent directly to your registered UPI ID. It is your responsibility to maintain a valid, working UPI address in your dashboard settings. CodeHTML is not responsible for funds sent to an incorrect UPI ID provided by the partner.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white uppercase mb-1">4. Anti-Spam Policy</h4>
                  <p>Partners agree to conduct client outreach professionally. Spamming public channels, direct messaging without consent, or misrepresenting CodeHTML services is strictly prohibited and will result in immediate termination of the partnership.</p>
                </div>
              </div>

              {/* UPI and Checkbox form */}
              <form onSubmit={handleAcceptTerms} className="space-y-4">
                <div>
                  <label className="block font-body text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Enter Your UPI ID (For Direct Payments) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. yourname@okaxis"
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-mono text-sm text-white focus:outline-none focus:border-vintage-gold/50 placeholder:text-zinc-700"
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="acceptTermsCheckbox"
                    required
                    className="mt-1 accent-vintage-gold border-white/15 rounded bg-black cursor-pointer"
                  />
                  <label htmlFor="acceptTermsCheckbox" className="font-body text-[11px] text-zinc-400 leading-normal cursor-pointer select-none">
                    I agree to the terms and conditions. I understand that I am paid only on confirmed clients, and money will be sent via UPI within one week once CodeHTML receives payment from the client.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-vintage-gold hover:bg-white text-black font-body font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Agree & Activate Console
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Complete Profile Onboarding Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-zinc-950 border border-white/10 rounded-3xl p-6 md:p-8 overflow-y-auto max-h-[90vh] shadow-2xl z-10 text-left scrollbar-thin scrollbar-thumb-zinc-800"
            >
              {/* Decorative gold/blue top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-vintage-gold/10 rounded-full blur-2xl pointer-events-none" />

              <h2 className="font-headline font-black text-xl md:text-2xl uppercase text-white mb-4 tracking-tight flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-vintage-gold" /> Complete Onboarding
              </h2>

              <p className="font-body text-zinc-400 text-xs leading-relaxed mb-6">
                Thank you for signing in with Google! To activate your partner dashboard and enable referral payouts, please fill in your details below.
              </p>

              <form onSubmit={handleCompleteProfileSubmit} className="space-y-4">
                {/* Phone Number Field */}
                <div>
                  <label className="block font-body text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 93032..."
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-body text-xs text-white focus:outline-none focus:border-vintage-gold/50 placeholder:text-zinc-700"
                  />
                </div>

                {/* UPI ID Field */}
                <div>
                  <label className="block font-body text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                    UPI ID (For Commission Payouts)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. yourname@okaxis"
                    value={upiInput}
                    onChange={(e) => setUpiInput(e.target.value)}
                    className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-mono text-xs text-white focus:outline-none focus:border-vintage-gold/50 placeholder:text-zinc-700"
                  />
                </div>

                {/* Conditional Agency Fields */}
                {partner.partnerType === 'agency' && (
                  <div className="space-y-4 border-l border-vintage-gold/20 pl-3.5 my-3">
                    <div>
                      <label className="block font-body text-[10px] font-bold text-vintage-gold uppercase tracking-widest mb-1.5">
                        Agency Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required={partner.partnerType === 'agency'}
                        placeholder="e.g. Pixel Studio"
                        value={agencyNameInput}
                        onChange={(e) => setAgencyNameInput(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-vintage-gold/20 rounded-xl font-body text-xs text-white focus:outline-none focus:border-vintage-gold/50 placeholder:text-zinc-700"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-body text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                          Agency Size
                        </label>
                        <select
                          value={agencySizeInput}
                          onChange={(e) => setAgencySizeInput(e.target.value)}
                          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-body text-xs text-white focus:outline-none focus:border-vintage-gold/50 appearance-none cursor-pointer"
                        >
                          <option value="2-5">2-5 members</option>
                          <option value="6-15">6-15 members</option>
                          <option value="16-50">16-50 members</option>
                          <option value="50+">50+ members</option>
                        </select>
                      </div>
                      <div>
                        <label className="block font-body text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                          Agency Website
                        </label>
                        <input
                          type="url"
                          placeholder="e.g. https://agency.com"
                          value={agencyWebsiteInput}
                          onChange={(e) => setAgencyWebsiteInput(e.target.value)}
                          className="w-full px-4 py-3 bg-black border border-white/10 rounded-xl font-body text-xs text-white focus:outline-none focus:border-vintage-gold/50 placeholder:text-zinc-700"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms Agreement Scrollable Text */}
                <div className="bg-black/50 border border-white/5 rounded-2xl p-4 h-32 overflow-y-auto my-4 text-[10px] text-zinc-500 space-y-3 font-body leading-relaxed scrollbar-thin scrollbar-thumb-zinc-800">
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase mb-0.5">1. Commission Eligibility</h4>
                    <p>Partners are only eligible for commission payouts on Confirmed Clients (indicated as client status "Done"). Inquiry, proposal, negotiation, or active development stages are not eligible for payouts.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase mb-0.5">2. Payout Schedule</h4>
                    <p>Referral commissions are calculated based on the final contract budget of the closed project. Payments will be disbursed to your registered UPI address within one (1) week of CodeHTML receiving cleared payments from the client.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-400 uppercase mb-0.5">3. Direct UPI Disbursal</h4>
                    <p>All commission payments are sent directly to your registered UPI ID. It is your responsibility to maintain a valid, working UPI address in your dashboard settings.</p>
                  </div>
                </div>

                {/* Accept Terms Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="onboardingTermsCheckbox"
                    required
                    checked={acceptOnboardingTerms}
                    onChange={(e) => setAcceptOnboardingTerms(e.target.checked)}
                    className="mt-1 accent-vintage-gold border-white/15 rounded bg-black cursor-pointer"
                  />
                  <label htmlFor="onboardingTermsCheckbox" className="font-body text-[10px] text-zinc-400 leading-normal cursor-pointer select-none">
                    I agree to the terms and conditions. I understand that I am paid only on confirmed clients, and money will be sent via UPI within one week once CodeHTML receives payment from the client.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-vintage-gold hover:bg-white text-black font-body font-black text-xs uppercase tracking-wider py-4 rounded-xl transition-all flex items-center justify-center gap-2 mt-6 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Save & Activate Dashboard
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
