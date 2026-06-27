import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X,
  Sparkles,
  Youtube,
  Instagram,
  Linkedin,
  Unlock,
  Lock
} from 'lucide-react';
import { db } from '../services/database';

const DEFAULT_RESOURCES = [
  {
    id: '1',
    title: 'React 18 + Vite Starter Template',
    url: 'https://github.com/codehtml-in/react-vite-tailwind-boilerplate',
    category: 'Developer Tool',
    isGated: false
  },
  {
    id: '2',
    title: 'Custom Software Project Brief Template',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-project-brief-template.md',
    category: 'Client Workbook',
    isGated: false
  },
  {
    id: '3',
    title: 'Minimalist Developer Portfolio Layout',
    url: 'https://github.com/codehtml-in/minimalist-dev-portfolio',
    category: 'Design Template',
    isGated: false
  },
  {
    id: '4',
    title: 'Ultimate SEO Checklist & AEO Playbook',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-seo-aeo-playbook.txt',
    category: 'Growth Guide',
    isGated: true
  },
  {
    id: '5',
    title: 'Web Dev Cost & Timeline Estimation Sheet',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-budget-calculator.csv',
    category: 'Client Worksheet',
    isGated: true
  },
  {
    id: '6',
    title: 'SaaS Architecture & DB Schema Blueprint',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-saas-db-blueprint.sql',
    category: 'Architecture Spec',
    isGated: true
  }
];

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockedPaidIds, setUnlockedPaidIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchResources = async () => {
      try {
        const data = await db.getResources();
        if (isMounted) {
          setResources(data);
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Failed to load resources:", err);
        if (isMounted) {
          const stored = localStorage.getItem('codehtml_resources');
          if (stored) {
            setResources(JSON.parse(stored));
          } else {
            setResources(DEFAULT_RESOURCES);
          }
          setIsLoading(false);
        }
      }
    };

    fetchResources();

    // Check if social unlock was done
    const unlocked = localStorage.getItem('social_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }

    // Load unlocked paid resource IDs from localStorage
    try {
      const stored = localStorage.getItem('paid_unlocked_resources');
      if (stored) {
        setUnlockedPaidIds(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to read paid unlocks", err);
    }

    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      isMounted = false;
      document.body.removeChild(script);
    };
  }, []);

  const triggerRazorpayPayment = async (res) => {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_T6Z8WjCBVAQGvW';

    if (!window.Razorpay) {
      alert("Razorpay payment gateway is loading. Please try again in a few seconds.");
      return;
    }

    try {
      // 1. Create order on the backend (Netlify function)
      const amountPaise = Number(res.price || 0) * 100;
      if (amountPaise < 100) {
        alert("Minimum payment amount is 1 INR (100 paise).");
        return;
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amountPaise,
          receipt: `rcpt_${res.id}_${Date.now()}`
        })
      });

      if (!orderResponse.ok) {
        const errData = await orderResponse.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to create order on server');
      }

      const orderData = await orderResponse.json();

      // 2. Open Razorpay checkout modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.order_id,
        name: 'CodeHTML Resources',
        description: `Unlock ${res.title}`,
        image: 'https://codehtml.in/Codehtml.logo.png',
        handler: async function (response) {
          try {
            // 3. Verify signature on the backend (Netlify function)
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });

            if (!verifyResponse.ok) {
              const verifyErr = await verifyResponse.json().catch(() => ({}));
              throw new Error(verifyErr.error || 'Payment signature verification failed');
            }

            // Verification successful! Save unlock state
            const updatedList = [...unlockedPaidIds, res.id];
            setUnlockedPaidIds(updatedList);
            localStorage.setItem('paid_unlocked_resources', JSON.stringify(updatedList));

            alert('Payment successful! Resource unlocked.');
            window.open(res.url, '_blank');
          } catch (verifyErr) {
            console.error(verifyErr);
            alert(`Payment verification error: ${verifyErr.message}`);
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        theme: {
          color: '#d4af37' // Vintage gold theme
        },
        modal: {
          ondismiss: function () {
            console.log('Razorpay modal dismissed by user');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp) {
        alert(`Payment failed: ${resp.error.description}`);
      });
      rzp.open();
    } catch (orderErr) {
      console.error(orderErr);
      alert(`Razorpay checkout initialization failed: ${orderErr.message}`);
    }
  };

  const handleLinkClick = (e, res) => {
    e.preventDefault();
    setSelectedResource(res);
    
    // 1. If resource requires payment
    if (res.isPaid) {
      const isAlreadyUnlocked = unlockedPaidIds.includes(res.id);
      if (isAlreadyUnlocked) {
        window.open(res.url, '_blank');
      } else {
        triggerRazorpayPayment(res);
      }
      return;
    }

    // 2. If resource is social gated
    if (!res.isGated || isUnlocked || localStorage.getItem('social_unlocked') === 'true') {
      window.open(res.url, '_blank');
    } else {
      setShowModal(true);
    }
  };

  const handleUnlockConfirm = () => {
    localStorage.setItem('social_unlocked', 'true');
    setIsUnlocked(true);
    setShowModal(false);
    if (selectedResource) {
      window.open(selectedResource.url, '_blank');
    }
  };

  const handleResetUnlock = () => {
    localStorage.removeItem('social_unlocked');
    localStorage.removeItem('paid_unlocked_resources');
    setIsUnlocked(false);
    setUnlockedPaidIds([]);
  };

  return (
    <main className="bg-black min-h-screen pt-28 pb-20 overflow-hidden relative text-white selection:bg-vintage-gold selection:text-black">
      <SEO 
        title="Resources Hub | CodeHTML"
        description="Clean list of developer starter templates, client briefs, estimation tools, and growth playbooks."
      />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-4xl mx-auto relative z-10 text-left">
        
        {/* Header bar */}
        <div className="mb-12 border-b border-white/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-3xl md:text-5xl text-white uppercase tracking-tight">
              DIGITAL RESOURCES
            </h1>
            <p className="font-body text-zinc-500 text-xs mt-2">
              Click on any title below to download or access the direct resource link.
            </p>
          </div>

          {(isUnlocked || unlockedPaidIds.length > 0) && (
            <button 
              onClick={handleResetUnlock}
              className="text-[9px] font-body font-bold uppercase tracking-wider text-zinc-500 hover:text-vintage-gold px-2.5 py-1 border border-white/5 hover:border-vintage-gold/20 rounded transition-colors"
            >
              Reset Unlock State
            </button>
          )}
        </div>

        {/* Simplified Stacked Resource List */}
        <div className="divide-y divide-white/5 bg-zinc-950/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-sm shadow-xl">
          {resources.map((res) => {
            const hasSubLinks = res.links && res.links.length > 0;
            const isPaidLocked = res.isPaid && !unlockedPaidIds.includes(res.id);
            const isSocialGatedLocked = res.isGated && !isUnlocked && localStorage.getItem('social_unlocked') !== 'true';

            if (hasSubLinks) {
              return (
                <div key={res.id} className="p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-headline font-bold text-base tracking-wide text-zinc-200">
                      {res.title}
                    </span>
                    <span className="px-2.5 py-0.5 bg-zinc-900 border border-white/5 rounded-md text-[9px] uppercase font-bold tracking-wider text-zinc-400">
                      {res.category}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {res.links.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        onClick={(e) => handleLinkClick(e, { ...res, url: link.url, title: `${res.title} - ${link.label}` })}
                        className="flex items-center justify-between p-3.5 bg-zinc-900/30 hover:bg-zinc-900 border border-white/5 hover:border-vintage-gold/20 rounded-xl transition-all group/sub font-body text-xs text-zinc-350 hover:text-white"
                      >
                        <div className="flex items-center gap-2">
                          {isPaidLocked ? (
                            <Lock className="w-3 h-3 text-blue-400" />
                          ) : isSocialGatedLocked ? (
                            <Lock className="w-3 h-3 text-vintage-gold/80" />
                          ) : (res.isPaid || res.isGated) ? (
                            <Unlock className="w-3 h-3 text-emerald-500" />
                          ) : null}
                          <span className="font-medium tracking-wide group-hover/sub:text-vintage-gold transition-colors">
                            {link.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          {res.isPaid && (
                            <span className="px-1.5 py-0.5 bg-blue-950/40 border border-blue-900/30 rounded text-[8px] font-bold text-blue-400 tracking-wider">
                              {isPaidLocked ? `₹${res.price}` : 'PAID'}
                            </span>
                          )}
                          <span className="text-zinc-600 group-hover/sub:text-vintage-gold text-[10px] font-bold transition-all">
                            ➲
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <a
                key={res.id}
                href={res.url}
                onClick={(e) => handleLinkClick(e, res)}
                className="flex items-center justify-between p-5 hover:bg-zinc-900/30 transition-all group font-body text-sm text-zinc-200 hover:text-white"
              >
                <div className="flex items-center gap-3">
                  {isPaidLocked ? (
                    <Lock className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                  ) : isSocialGatedLocked ? (
                    <Lock className="w-3.5 h-3.5 text-vintage-gold/80" />
                  ) : (res.isPaid || res.isGated) ? (
                    <Unlock className="w-3.5 h-3.5 text-emerald-500" />
                  ) : null}
                  <span className="font-headline font-bold text-base tracking-wide text-zinc-200 group-hover:text-vintage-gold transition-colors">
                    {res.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {res.isPaid && (
                    <span className="px-2 py-0.5 bg-blue-950/40 border border-blue-900/30 rounded-md text-[9px] uppercase font-bold tracking-wider text-blue-400">
                      {isPaidLocked ? `₹${res.price}` : 'UNLOCKED'}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 bg-zinc-900/50 group-hover:bg-zinc-900 border border-white/5 rounded-md text-[9px] uppercase font-bold tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-all">
                    {res.category}
                  </span>
                  <span className="text-zinc-600 group-hover:text-vintage-gold text-xs font-bold transition-all">
                    ➲
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>

      {/* Pop-up modal to ask for YouTube & Instagram follow */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative z-10 text-left"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-vintage-gold/10 border border-vintage-gold/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-5 h-5 text-vintage-gold animate-bounce" />
                </div>
                <h3 className="font-headline font-extrabold text-lg uppercase text-white tracking-wide">Follow to Unlock</h3>
                <p className="font-body text-zinc-400 text-xs mt-2 leading-relaxed">
                  To unlock the direct link for <strong className="text-vintage-gold">"{selectedResource?.title}"</strong>, please connect with us on social media:
                </p>
              </div>

              {/* Social Follow Links */}
              <div className="space-y-3 mb-6">
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/company/codehtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/20 hover:border-[#0077B5]/40 rounded-xl transition-all font-body text-xs text-white font-bold group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-[#0077B5] group-hover:scale-110 transition-transform" />
                    <span>Follow on LinkedIn</span>
                  </div>
                  <span className="text-[9px] tracking-wider text-[#0077B5]/85 uppercase font-mono">CODEHTML</span>
                </a>

                {/* Instagram Link */}
                <a
                  href="https://www.instagram.com/sandesh29_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#E1306C]/10 hover:bg-[#E1306C]/20 border border-[#E1306C]/20 hover:border-[#E1306C]/40 rounded-xl transition-all font-body text-xs text-white font-bold group"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-[#E1306C] group-hover:scale-110 transition-transform" />
                    <span>Follow on Instagram</span>
                  </div>
                  <span className="text-[9px] tracking-wider text-[#E1306C]/85 uppercase font-mono">SANDESH29_</span>
                </a>

                {/* YouTube Link */}
                <a
                  href="https://www.youtube.com/@sandeshyaar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-[#FF0000]/10 hover:bg-[#FF0000]/20 border border-[#FF0000]/20 hover:border-[#FF0000]/40 rounded-xl transition-all font-body text-xs text-white font-bold group"
                >
                  <div className="flex items-center gap-2.5">
                    <Youtube className="w-4 h-4 text-[#FF0000] group-hover:scale-110 transition-transform" />
                    <span>Subscribe on YouTube</span>
                  </div>
                  <span className="text-[9px] tracking-wider text-[#FF0000]/85 uppercase font-mono">SANDESHYAAR</span>
                </a>
              </div>

              {/* Unlock Action button */}
              <button
                onClick={handleUnlockConfirm}
                className="w-full py-3.5 rounded-xl bg-vintage-gold hover:bg-white hover:text-black text-white font-body font-extrabold text-xs tracking-widest uppercase transition-all duration-300 inline-flex items-center justify-center gap-1.5 shadow-md shadow-vintage-gold/10"
              >
                Confirm Follow & Unlock <Unlock className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Resources;
