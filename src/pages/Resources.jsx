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
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLinkClick = (e, res) => {
    e.preventDefault();
    setSelectedResource(res);
    
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
    setIsUnlocked(false);
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

          {isUnlocked && (
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
                          {res.isGated && <Lock className="w-3 h-3 text-vintage-gold/80" />}
                          <span className="font-medium tracking-wide group-hover/sub:text-vintage-gold transition-colors">
                            {link.label}
                          </span>
                        </div>
                        <span className="text-zinc-600 group-hover/sub:text-vintage-gold text-[10px] font-bold transition-all">
                          ➲
                        </span>
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
                  {res.isGated && <Lock className="w-3.5 h-3.5 text-vintage-gold/80" />}
                  <span className="font-headline font-bold text-base tracking-wide text-zinc-200 group-hover:text-vintage-gold transition-colors">
                    {res.title}
                  </span>
                </div>
                <div className="flex items-center gap-3">
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

export default Resources;
