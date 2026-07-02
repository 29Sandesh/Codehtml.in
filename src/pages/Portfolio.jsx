import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Check, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../services/database';

const projects = [
  {
    name: 'The Circle',
    category: 'SAAS PLATFORM',
    vertical: 'Collaborative Doc SaaS Workspace with Real-Time Sync',
    status: 'Live App',
    link: 'https://jition.vercel.app',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Co-Found',
    category: 'MOBILE & WEB PLATFORM',
    vertical: 'Founder Matchmaking & Networking Mobile/Web Platform',
    status: 'Under Progress',
    link: null,
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'SwigatoIndia.in',
    category: 'FOOD LICENCE PORTAL',
    vertical: 'Food Licence Website',
    status: 'Live App',
    link: 'https://swigatoindia.in',
    bgImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Slcc.in',
    category: 'CONSTRUCTION PORTAL',
    vertical: 'Construction Company',
    status: 'Live App',
    link: 'https://slcc.in',
    bgImage: '/slcc_construction.webp'
  },
  {
    name: 'crystamedia.in',
    category: 'MARKETING AGENCY',
    vertical: 'Digital Marketing Agency',
    status: 'Live App',
    link: 'https://crystamedia.in',
    bgImage: '/crystamedia_agency.webp'
  },
  {
    name: 'AlayaRealty.in',
    category: 'REAL ESTATE PORTAL',
    vertical: 'Real Estate Consultancy',
    status: 'Live App',
    link: 'https://alayarealty.in',
    bgImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Elgamingo.store',
    category: 'GAMING PORTAL',
    vertical: 'Online Games Platform',
    status: 'Live App',
    link: 'https://elgamingo.store',
    bgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'LeadTool',
    category: 'DEVELOPER TOOL',
    vertical: 'Business Lead Extraction Map Integration Dashboard',
    status: 'Local Tool',
    link: null,
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Azude Hotel',
    category: 'HOSPITALITY PORTAL',
    vertical: 'Premium Resort Booking & Guest Loyalty Portal',
    status: 'Concept App',
    link: 'https://azudehotel.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Tinkus-cafe',
    category: 'E-COMMERCE CONCEPT',
    vertical: 'Sweet Bakery, Shakes & Custom Cake Quote Tool',
    status: 'Concept App',
    link: 'https://tinkus-cafe.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'cafe-decasa',
    category: 'RETAIL CONCEPT',
    vertical: 'Cafe Website',
    status: 'Concept App',
    link: 'https://cafe-decasa.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'cutler-dining',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Contemporary Gastronomy & Tasting Rooms',
    status: 'Concept App',
    link: 'https://cutler-dining.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Famous Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Elegant Sommelier Wine Bistro & Flight Builder',
    status: 'Concept App',
    link: 'https://famous-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Fine Dine Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Ultra-Luxury Multi-Course Culinary Showcase',
    status: 'Concept App',
    link: 'https://finedine-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Lumina',
    category: 'FASHION EDITORIAL',
    vertical: 'High-Fashion Editorial Catalog (Mobile-First)',
    status: 'Concept App',
    link: 'https://lumina.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'teamo-dating',
    category: 'AI DATING CONCEPT',
    vertical: 'AI-Driven Matchmaker & Swipe Dating Card Deck',
    status: 'Concept App',
    link: 'https://teamo-dating.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80'
  }
];

const COFOUND_SCREENSHOTS = [
  { src: '/screenshots/cofound-landing.webp', label: 'Discover Matching UI' },
  { src: '/screenshots/cofound-onboarding.webp', label: 'Vetting Onboarding' },
  { src: '/screenshots/cofound-discover.webp', label: 'Job Board & Roles' }
];

const CIRCLE_SCREENSHOTS = [
  { src: '/screenshots/circle-login.webp', label: 'Login Screen' },
  { src: '/screenshots/circle-dashboard.webp', label: 'Client Dashboard' },
  { src: '/screenshots/circle-tasks.webp', label: 'Kanban Task Board' },
  { src: '/screenshots/circle-hierarchy.webp', label: 'Company Hierarchy' }
];

const Portfolio = () => {
  const [showCoFoundModal, setShowCoFoundModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [circleIndex, setCircleIndex] = useState(0);
  const [cofoundIndex, setCofoundIndex] = useState(0);

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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        const data = await db.getProjects();
        if (isMounted) {
          setProjectsList(data);
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load projects:", err);
        if (isMounted) {
          const stored = localStorage.getItem('codehtml_portfolio');
          if (stored) {
            setProjectsList(JSON.parse(stored));
          } else {
            setProjectsList(projects);
          }
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      window.removeEventListener('resize', handleResize);
      isMounted = false;
    };
  }, []);

  const liveProjects = projectsList.filter(p => p.status !== 'Concept App');
  const conceptProjects = projectsList.filter(p => p.status === 'Concept App');

  const handlePrev = () => {
    if (liveProjects.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + liveProjects.length) % liveProjects.length);
  };

  const handleNext = () => {
    if (liveProjects.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % liveProjects.length);
  };

  const handleDragEnd = (event, info) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  const handleCardClick = (idx, diff) => {
    if (diff === -1) {
      handlePrev();
    } else if (diff === 1) {
      handleNext();
    }
  };

  const getDiff = (idx) => {
    const total = liveProjects.length;
    if (total === 0) return 0;
    let diff = idx - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  const getCardStyles = (diff) => {
    const isMobile = windowWidth < 768;
    const xOffset = isMobile ? 180 : (windowWidth < 1024 ? 260 : 340);
    
    if (diff === 0) {
      return {
        x: 0,
        scale: 1,
        opacity: 1,
        rotateY: 0,
        rotateZ: 0,
        zIndex: 30,
        cursor: 'auto',
        pointerEvents: 'auto'
      };
    } else if (diff === -1) {
      return {
        x: -xOffset,
        scale: 0.85,
        opacity: 0.4,
        rotateY: isMobile ? 15 : 30,
        rotateZ: isMobile ? -2 : -4,
        zIndex: 20,
        cursor: 'pointer',
        pointerEvents: 'auto'
      };
    } else if (diff === 1) {
      return {
        x: xOffset,
        scale: 0.85,
        opacity: 0.4,
        rotateY: isMobile ? -15 : -30,
        rotateZ: isMobile ? 2 : 4,
        zIndex: 20,
        cursor: 'pointer',
        pointerEvents: 'auto'
      };
    } else {
      return {
        x: diff < 0 ? -xOffset * 1.5 : xOffset * 1.5,
        scale: 0.7,
        opacity: 0,
        rotateY: diff < 0 ? 45 : -45,
        rotateZ: 0,
        zIndex: 10,
        cursor: 'default',
        pointerEvents: 'none'
      };
    }
  };

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'CodeHTML Elite Project Portfolio',
    description: 'Explore our production applications, SaaS platforms, developer tools, and operational white-label sites.',
    url: 'https://codehtml.in/portfolio',
    provider: {
      '@type': 'Organization',
      name: 'CodeHTML',
      logo: 'https://codehtml.in/Codehtml.logo.png'
    }
  };

  const nextScreenshot = () => {
    setModalIndex((prev) => (prev + 1) % COFOUND_SCREENSHOTS.length);
  };

  const prevScreenshot = () => {
    setModalIndex((prev) => (prev - 1 + COFOUND_SCREENSHOTS.length) % COFOUND_SCREENSHOTS.length);
  };

  return (
    <div className="bg-black min-h-screen text-white relative selection:bg-vintage-gold selection:text-black overflow-x-hidden">
      <SEO
        title="Projects | Production Apps & Premium UX Concepts | CodeHTML"
        description="Browse our portfolio of live production portals, collaborative SaaS platforms, custom desktop tools, and operational white-label sites built by our studio."
        keywords="developer portfolio, production portals, saas workspace, custom software, netlify react concepts, luxury ui ux"
        schema={schemaObj}
      />

      {/* Decorative Radials */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <main className="max-w-[1600px] mx-auto px-6 pt-32 pb-24 relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        


        {/* Deck Container */}
        <div className="relative w-full flex items-center justify-center h-[460px] md:h-[540px] overflow-visible" style={{ perspective: 1200 }}>
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 z-40 p-3 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md text-white hover:bg-vintage-gold hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-vintage-gold/20"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Cards Stack */}
          <div className="relative w-full flex items-center justify-center h-full">
            {liveProjects.map((project, idx) => {
              const diff = getDiff(idx);
              const isCenter = diff === 0;
              
              return (
                <motion.div
                  key={project.name}
                  initial={false}
                  animate={getCardStyles(diff)}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  drag={isCenter ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.6}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleCardClick(idx, diff)}
                  style={{ originX: 0.5, originY: 0.5 }}
                  className={`w-[290px] sm:w-[360px] md:w-[540px] h-[400px] md:h-[450px] absolute rounded-2xl overflow-hidden border border-white/10 bg-zinc-950/90 shadow-2xl flex flex-col justify-between select-none group transition-shadow duration-500 ${
                    isCenter ? 'shadow-vintage-gold/10 hover:shadow-vintage-gold/20' : 'shadow-black/50'
                  }`}
                >
                  {/* Top Image Banner */}
                  <div className="relative w-full h-44 md:h-56 overflow-hidden bg-zinc-900 border-b border-white/5 shrink-0">
                    <img
                      src={project.bgImage}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out pointer-events-none"
                    />
                    {/* Category Overlay */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="font-body font-bold text-[8px] text-zinc-900 tracking-widest uppercase border border-zinc-200 bg-white/90 backdrop-blur-md px-2.5 py-1 shadow-sm">
                        {project.category}
                      </span>
                    </div>
                    {/* Status Badge overlay */}
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-2.5 py-1 text-[8px] font-bold tracking-widest uppercase rounded-full border bg-zinc-950/80 backdrop-blur-md ${
                        project.status === 'Live App' ? 'text-emerald-400 border-emerald-500/20' :
                        project.status === 'Under Progress' ? 'text-amber-400 border-amber-500/20' :
                        project.status === 'Local Tool' ? 'text-blue-400 border-blue-500/20' :
                        'text-zinc-400 border-zinc-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Info Area */}
                  <div className="p-5 md:p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-headline font-black text-white text-xl md:text-2xl uppercase tracking-wide group-hover:text-vintage-gold transition-colors duration-300">
                        {project.name}
                      </h3>
                      <p className="font-body text-zinc-400 text-xs font-medium leading-relaxed mt-1.5 line-clamp-2 md:line-clamp-3">
                        {project.vertical}
                      </p>
                    </div>

                    <div className="mt-4">
                      {project.name === 'Co-Found' ? (
                        <button
                          onClick={(e) => {
                            if (!isCenter) return;
                            e.stopPropagation();
                            setModalIndex(0);
                            setShowCoFoundModal(true);
                          }}
                          className={`w-full text-center font-body font-extrabold text-[10px] tracking-[0.15em] py-3 uppercase block transition-all duration-300 rounded-lg ${
                            isCenter
                              ? 'bg-vintage-gold text-white hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md'
                              : 'bg-zinc-900/60 text-zinc-600 border border-white/5 cursor-default'
                          }`}
                        >
                          View Screenshots
                        </button>
                      ) : project.status === 'Under Progress' ? (
                        <div className="w-full text-center border border-white/5 text-zinc-600 font-body font-extrabold text-[9px] tracking-[0.15em] py-3 uppercase bg-zinc-900/30 rounded-lg cursor-default select-none">
                          Under Progress
                        </div>
                      ) : project.status === 'Local Tool' ? (
                        <div className="w-full text-center border border-white/5 text-zinc-600 font-body font-extrabold text-[9px] tracking-[0.15em] py-3 uppercase bg-zinc-900/30 rounded-lg cursor-default select-none">
                          Local Tool
                        </div>
                      ) : (
                        <a
                          href={project.link || '#'}
                          target={project.link ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (!isCenter || !project.link) {
                              e.preventDefault();
                              return;
                            }
                            e.stopPropagation();
                          }}
                          className={`w-full text-center font-body font-extrabold text-[10px] tracking-[0.15em] py-3 uppercase block transition-all duration-300 rounded-lg ${
                            isCenter
                              ? 'bg-vintage-gold text-white hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95 cursor-pointer shadow-md'
                              : 'bg-zinc-900/60 text-zinc-600 border border-white/5 cursor-default'
                          }`}
                        >
                          Visit Live Portal
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 z-40 p-3 rounded-full border border-white/10 bg-zinc-950/60 backdrop-blur-md text-white hover:bg-vintage-gold hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-vintage-gold/20"
            aria-label="Next Project"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

        </div>

        {/* Dot Indicators */}
        <div className="flex flex-col items-center mt-4 relative z-20">
          <div className="flex gap-2 max-w-[200px] flex-wrap justify-center">
            {liveProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex ? 'w-6 bg-vintage-gold' : 'w-1.5 bg-zinc-800 hover:bg-zinc-600'
                }`}
                aria-label={`Go to project ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Divider & Auto-Rotating Marquee Section */}
        <div className="w-full mt-24 relative z-20">
          <div className="text-center mb-10">
            <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-3 block">WHITE-LABEL BUILDS</span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-4xl uppercase mb-3 text-white">
              Operational <span className="font-elegant italic font-light text-vintage-gold normal-case">Concept Platforms.</span>
            </h3>
            <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Fully live premium SaaS and e-commerce pre-built layouts sold as white-label setups.
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Gradient masks for smooth fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First copy */}
              {conceptProjects.map((project, idx) => (
                <a
                  key={`marquee-1-${idx}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[280px] md:w-[320px] h-[210px] mx-4 rounded-xl overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-sm flex flex-col justify-between p-5 hover:border-vintage-gold/30 hover:bg-zinc-900/50 transition-all duration-300 group shrink-0 relative"
                >
                  {/* Background Image & Gradient */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src={project.bgImage}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
                  </div>

                  <div className="flex justify-between items-start relative z-10 w-full">
                    <span className="text-vintage-gold text-[8px] font-bold tracking-[0.2em] uppercase">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 text-[8px] font-bold tracking-widest uppercase border border-white/5 px-2 py-0.5 rounded-full">
                      Concept
                    </span>
                  </div>
                  
                  <div className="relative z-10 mt-6 mb-2">
                    <h4 className="font-headline font-black text-white text-base uppercase tracking-wide group-hover:text-vintage-gold transition-colors duration-300">
                      {project.name}
                    </h4>
                    <p className="font-body text-zinc-400 text-[11px] leading-relaxed mt-1 line-clamp-2">
                      {project.vertical}
                    </p>
                  </div>
                  
                  <span className="text-vintage-gold text-[9px] font-bold tracking-[0.15em] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform relative z-10">
                    Launch Concept →
                  </span>
                </a>
              ))}
              {/* Second copy for seamless looping */}
              {conceptProjects.map((project, idx) => (
                <a
                  key={`marquee-2-${idx}`}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[280px] md:w-[320px] h-[210px] mx-4 rounded-xl overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-sm flex flex-col justify-between p-5 hover:border-vintage-gold/30 hover:bg-zinc-900/50 transition-all duration-300 group shrink-0 relative"
                >
                  {/* Background Image & Gradient */}
                  <div className="absolute inset-0 z-0 pointer-events-none">
                    <img
                      src={project.bgImage}
                      alt={project.name}
                      className="w-full h-full object-cover opacity-10 group-hover:scale-105 group-hover:opacity-20 transition-all duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent"></div>
                  </div>

                  <div className="flex justify-between items-start relative z-10 w-full">
                    <span className="text-vintage-gold text-[8px] font-bold tracking-[0.2em] uppercase">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 text-[8px] font-bold tracking-widest uppercase border border-white/5 px-2 py-0.5 rounded-full">
                      Concept
                    </span>
                  </div>
                  
                  <div className="relative z-10 mt-6 mb-2">
                    <h4 className="font-headline font-black text-white text-base uppercase tracking-wide group-hover:text-vintage-gold transition-colors duration-300">
                      {project.name}
                    </h4>
                    <p className="font-body text-zinc-400 text-[11px] leading-relaxed mt-1 line-clamp-2">
                      {project.vertical}
                    </p>
                  </div>
                  
                  <span className="text-vintage-gold text-[9px] font-bold tracking-[0.15em] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform relative z-10">
                    Launch Concept →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* READY APPS WE BUILD & SELL SECTION */}
        <div className="w-full mt-32 border-t border-white/5 pt-20 relative z-20">
          <div className="text-center mb-16">
            <span className="text-vintage-gold font-body text-xs font-bold tracking-widest uppercase block mb-2">READY PRODUCT DEPLOYMENTS</span>
            <h2 className="font-headline font-extrabold text-3xl md:text-5xl uppercase">
              Apps We Build <span className="font-elegant italic font-light text-vintage-gold">& Sell.</span>
            </h2>
            <p className="max-w-xl mx-auto text-zinc-400 text-xs mt-3 leading-relaxed">
              Sell these pre-engineered elite software solutions directly to your enterprise clients as white-label platforms.
            </p>
          </div>

          <div className="flex flex-col gap-24 max-w-[1600px] mx-auto">
            {/* THE CIRCLE APP */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
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
                      className="w-full h-full relative"
                    >
                      <img 
                        src={CIRCLE_SCREENSHOTS[circleIndex].src} 
                        alt={CIRCLE_SCREENSHOTS[circleIndex].label} 
                        className="w-full h-full object-cover"
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
                    onClick={(e) => { e.stopPropagation(); prevCircle(); }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextCircle(); }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/15 hover:border-transparent flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
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
                          alt={COFOUND_SCREENSHOTS[cofoundIndex].label} 
                          className="w-full h-full object-cover"
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
                      onClick={(e) => { e.stopPropagation(); prevCofound(); }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/10 flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); nextCofound(); }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/10 flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="flex gap-1.5 mt-5 justify-center">
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
          </div>
        </div>

      </main>

      {/* COFOUND APP SCREENSHOTS MODAL */}
      <AnimatePresence>
        {showCoFoundModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10000] flex items-center justify-center p-4"
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-sm w-full bg-zinc-950 border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col items-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCoFoundModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer z-50 p-1 bg-zinc-900 border border-white/10 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-4">
                <span className="font-body font-bold text-vintage-gold text-[8px] tracking-[0.2em] uppercase">Co-Found Mobile UI</span>
                <h3 className="font-headline font-black text-white text-lg uppercase mt-1">App Screenshots</h3>
              </div>

              {/* Phone Frame Mockup */}
              <div className="relative w-full max-w-[250px] aspect-[9/19] bg-black rounded-[2rem] overflow-hidden border-[6px] border-zinc-800 shadow-2xl">
                <div className="w-full h-full relative">
                  <img
                    src={COFOUND_SCREENSHOTS[modalIndex].src}
                    alt={COFOUND_SCREENSHOTS[modalIndex].label}
                    className="w-full h-full object-cover"
                  />
                  {/* Label tag */}
                  <div className="absolute bottom-4 left-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 px-2 py-1 rounded text-center">
                    <span className="font-body font-bold text-[8px] text-vintage-gold tracking-widest uppercase">
                      {COFOUND_SCREENSHOTS[modalIndex].label}
                    </span>
                  </div>
                </div>

                {/* Carousel Arrow buttons */}
                <button
                  onClick={prevScreenshot}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/10 flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextScreenshot}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 hover:bg-vintage-gold border border-white/10 flex items-center justify-center text-white hover:text-black transition-all cursor-pointer z-30"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Indicators */}
              <div className="flex gap-1.5 mt-5">
                {COFOUND_SCREENSHOTS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setModalIndex(idx)}
                    className={`h-1 rounded-full transition-all cursor-pointer ${
                      idx === modalIndex ? 'w-4 bg-vintage-gold' : 'w-1 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;
