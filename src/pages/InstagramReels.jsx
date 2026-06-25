import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  X,
  Youtube,
  Instagram,
  Linkedin,
  Unlock,
  Lock,
  ArrowLeft
} from 'lucide-react';

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

const InstagramReels = () => {
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    // Read from localStorage
    const stored = localStorage.getItem('codehtml_resources');
    if (stored) {
      setResources(JSON.parse(stored));
    } else {
      setResources(DEFAULT_RESOURCES);
      localStorage.setItem('codehtml_resources', JSON.stringify(DEFAULT_RESOURCES));
    }

    // Check if social unlock was done
    const unlocked = localStorage.getItem('social_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
  }, []);

  const handleLinkClick = (e, res) => {
    e.preventDefault();
    setSelectedResource(res);
    
    if (isUnlocked || localStorage.getItem('social_unlocked') === 'true') {
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
    setIsUnlocked(false);
  };

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 overflow-hidden relative text-white selection:bg-vintage-gold selection:text-black">
      <SEO 
        title="Instagram Reels Exclusive Resources | CodeHTML"
        description="Follow CodeHTML on LinkedIn to unlock direct premium resources and layouts."
        noindex={true}
      />

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 md:px-12 max-w-xl mx-auto relative z-10 text-left">
        
        {/* Navigation back */}
        <div className="mb-8">
          <Link 
            to="/resources" 
            className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-vintage-gold transition-colors font-body text-xs font-bold uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>
        </div>

        {/* Header bar */}
        <div className="mb-8 border-b border-white/10 pb-4 flex justify-between items-end">
          <div>
            <h1 className="font-headline font-extrabold text-2xl text-white uppercase tracking-tight">
              REELS EXCLUSIVE BUNDLE
            </h1>
          </div>
          {isUnlocked && (
            <button 
              onClick={handleResetUnlock} 
              className="font-body text-[9px] text-zinc-600 hover:text-vintage-gold uppercase tracking-widest border border-white/5 px-2 py-1 rounded transition-colors"
            >
              Reset Unlock State
            </button>
          )}
        </div>

        {/* Simplified Stacked List */}
        <div className="divide-y divide-white/5 bg-zinc-950/40 border border-white/5 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm">
          {resources.map((res) => (
            <a
              key={res.id}
              href={res.url}
              onClick={(e) => handleLinkClick(e, res)}
              className="flex items-center justify-between p-5 hover:bg-zinc-900/30 transition-all font-body text-sm text-zinc-300 hover:text-white group"
            >
              <span className="font-headline font-bold text-base tracking-wide text-zinc-200 group-hover:text-vintage-gold transition-colors">
                {res.title}
              </span>
              <span className="text-zinc-600 group-hover:text-vintage-gold text-xs font-bold transition-all">
                ➲
              </span>
            </a>
          ))}
        </div>

      </div>

      {/* Pop-up follow unlock modal */}
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
                <h3 className="font-headline font-extrabold text-lg uppercase text-white tracking-wide">Follow to Unlock Link</h3>
                <p className="font-body text-zinc-400 text-xs mt-2 leading-relaxed">
                  To unlock the direct link for <strong className="text-vintage-gold">"{selectedResource?.title}"</strong>, please follow on LinkedIn:
                </p>
              </div>

              {/* Social Follow Links */}
              <div className="space-y-4 mb-6">
                {/* LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/company/codehtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 border border-[#0077B5]/30 hover:border-[#0077B5]/50 rounded-xl transition-all font-body text-sm text-white font-bold group"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-[#0077B5] group-hover:scale-110 transition-transform" />
                    <span>Follow on LinkedIn</span>
                  </div>
                  <span className="text-[10px] tracking-widest text-[#0077B5] uppercase font-mono">CODEHTML</span>
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

export default InstagramReels;
