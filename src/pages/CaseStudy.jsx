import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const CASE_STUDIES = {
  '01': {
    id: '01',
    name: 'Alaya Realty',
    url: '#',
    type: 'Real Estate Consultancy',
    tagline: 'REAL ESTATE CONSULTANCY // ALAYA REALTY',
    problem: 'Built a premium real estate consultancy platform with property showcasing, inquiry management, and high-performance architecture.',
    solution: 'We engineered a bespoke React-based property listings portal. The interface uses high-speed image rendering, community guide pages, and direct-to-broker WhatsApp routing.',
    result: 'Load speed reduced to 0.7s with property portal and listings system, built using 100% custom development.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Property Portal', 'Listings System'],
    images: ['/luxury_dubai_villa.webp'],
    metrics: [
      { label: 'LOAD SPEED', value: '0.7s' },
      { label: 'LISTINGS SYSTEM', value: 'Portal' },
      { label: 'DEVELOPMENT', value: '100% Custom' }
    ]
  },
  '02': {
    id: '02',
    name: 'SLCC Construction',
    url: '#',
    type: 'Construction Portal',
    tagline: 'CONSTRUCTION PORTAL // SLCC CONSTRUCTION',
    problem: 'Developed a custom construction portal with architectural blueprint visualization, project showcasing, and quote generation workflows.',
    solution: 'Engineered a state-of-the-art GPU-accelerated React platform featuring dynamic construction progress timelines, responsive digital blueprints, and a secure bidding intake routing system.',
    result: 'Response time lowered to 250ms with quote system lead automation and custom architecture.',
    tech: ['React.js', 'Vite', 'Framer Motion', 'Quote System', 'Lead Automation'],
    images: ['/slcc_construction.webp'],
    metrics: [
      { label: 'RESPONSE TIME', value: '250ms' },
      { label: 'LEAD AUTOMATION', value: 'Quote Sys' },
      { label: 'ARCHITECTURE', value: '100% Custom' }
    ]
  },
  '03': {
    id: '03',
    name: 'Swigato India',
    url: '#',
    type: 'Food License Platform',
    tagline: 'FOOD LICENSE PLATFORM // SWIGATO INDIA',
    problem: 'Built a multi-city food license and restaurant onboarding platform helping businesses streamline licensing, registrations, and compliance workflows.',
    solution: 'Designed and built a multi-city restaurant directory and onboarding system handling high compliance volumes and offering instant routing.',
    result: 'Multi-city platform coverage, fast search for instant discovery, and 100% custom built from scratch.',
    tech: ['React.js', 'Vite', 'Compliance API', 'Fast Search', 'Instant Discovery'],
    images: ['/SwigatoIndia.webp'],
    metrics: [
      { label: 'PLATFORM COVERAGE', value: 'Multi-City' },
      { label: 'INSTANT DISCOVERY', value: 'Fast Search' },
      { label: 'BUILT FROM SCRATCH', value: '100% Custom' }
    ]
  },
  '04': {
    id: '04',
    name: 'Elgamingo',
    url: '#',
    type: 'Online Gaming Store',
    tagline: 'ONLINE GAMING PLATFORM // ELGAMINGO',
    problem: 'Created an online gaming platform with digital product delivery, modern storefront design, and scalable commerce workflows.',
    solution: 'Developed a custom digital product delivery pipeline with instant voucher generation and secure payment integration.',
    result: 'E-commerce gaming store with instant access digital delivery and scalable architecture.',
    tech: ['React.js', 'Vite', 'E-Commerce', 'Digital Delivery', 'Scalable Arch'],
    images: ['/elgamingo.webp'],
    metrics: [
      { label: 'GAMING STORE', value: 'E-Commerce' },
      { label: 'DIGITAL DELIVERY', value: 'Instant Access' },
      { label: 'ARCHITECTURE', value: 'Scalable' }
    ]
  },
  '05': {
    id: '05',
    name: 'Crysta Media',
    url: '#',
    type: 'Digital Marketing Agency',
    tagline: 'DIGITAL MARKETING AGENCY // CRYSTA MEDIA',
    problem: 'Designed and developed a high-converting corporate website for a digital marketing agency focused on lead generation and premium positioning.',
    solution: 'Created a high-converting corporate website with optimized SEO, performance-focused layout, and premium design.',
    result: 'SEO ready optimized pages, fast load performance, and lead-focused conversion design.',
    tech: ['React.js', 'Vite', 'SEO Schema', 'Performance Optimization', 'Conversion Design'],
    images: ['/crystamedia_agency.webp'],
    metrics: [
      { label: 'OPTIMIZED PAGES', value: 'SEO Ready' },
      { label: 'PERFORMANCE', value: 'Fast Load' },
      { label: 'CONVERSION DESIGN', value: 'Lead Focused' }
    ]
  },
  '06': {
    id: '06',
    name: 'Cafe De Casa',
    url: '#',
    type: 'Cafe Website',
    tagline: 'CAFE WEBSITE // CAFE DE CASA',
    problem: 'Built a modern cafe website with menu experiences, brand storytelling, and customer-focused design for improved engagement.',
    solution: 'Designed and developed a responsive mobile-first UI with integrated digital menu QR code experiences.',
    result: 'Mobile first responsive UX with QR menu digital experience and fast load performance.',
    tech: ['React.js', 'Vite', 'Mobile First UX', 'QR Menu', 'Performance'],
    images: ['/cafedecasa.webp'],
    metrics: [
      { label: 'RESPONSIVE UX', value: 'Mobile First' },
      { label: 'DIGITAL EXPERIENCE', value: 'QR Menu' },
      { label: 'PERFORMANCE', value: 'Fast Load' }
    ]
  }
};

const CaseStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = CASE_STUDIES[id];
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (project) {
      window.scrollTo(0, 0);
    }
  }, [project]);

  if (!project) return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white selection:bg-vintage-gold selection:text-black">
      <h1 className="font-headline font-extrabold tracking-tight text-5xl md:text-7xl mb-6">CASE NOT FOUND</h1>
      <button 
        onClick={() => navigate('/')}
        className="btn-gold-solid mt-8 inline-flex"
      >
        GO BACK TO HOME ➲
      </button>
    </div>
  );

  const studySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${project.name} | Elite Case Study by CodeHTML`,
    "description": project.problem,
    "image": project.images[0],
    "author": {
      "@type": "Organization",
      "name": "CodeHTML"
    }
  };

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 text-white selection:bg-vintage-gold selection:text-black">
      <SEO 
        title={`${project.name} | Case Study | CodeHTML`} 
        description={project.tagline} 
        image={project.images[0]}
        keywords={`${project.name}, case study, web development portfolio, real estate tech case study, react website project, codehtml case study`}
        schema={studySchema}
      />
      {/* Hero Section */}
      <section className="px-4 md:px-12 mb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 font-headline font-black text-[12rem] md:text-[25rem] text-zinc-900 opacity-10 pointer-events-none select-none">
          {project.id}
        </div>
        
        <div className="max-w-[1600px] mx-auto relative z-10 text-left">
          <div className="flex flex-wrap items-center gap-4 mb-8">
             <Link to="/" className="btn-gold-outline px-4 py-2 text-[10px]">
                ← BACK TO HOME
             </Link>
             <span className="text-vintage-gold font-body font-bold text-[10px] tracking-widest px-4 py-2 border border-vintage-gold/30 rounded-full uppercase">CASE STUDY #{project.id}</span>
             <button
               onClick={handleShare}
               className={`font-body font-bold text-[8px] sm:text-[9px] tracking-widest px-4 py-2 border rounded-full uppercase transition-all duration-300 ${
                 copied 
                   ? 'bg-vintage-gold text-black border-vintage-gold shadow-lg shadow-vintage-gold/20 scale-95' 
                   : 'text-zinc-400 hover:text-white border-white/10 hover:border-vintage-gold/30'
               }`}
             >
               {copied ? '✓ LINK COPIED' : '⎘ SHARE LINK'}
             </button>
          </div>

          <h1 className="font-headline font-extrabold text-5xl md:text-8xl text-white leading-[0.8] mb-8 uppercase tracking-tighter">
            {project.name}
          </h1>
          <p className="font-body text-zinc-400 max-w-4xl text-sm md:text-2xl font-medium leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* High-Impact Visual */}
      <section className="px-4 md:px-12 mb-24 max-w-[1600px] mx-auto">
         <div className="aspect-[21/9] w-full border border-white/5 rounded-2xl overflow-hidden relative shadow-lg">
            <img 
               src={project.images[0]} 
               alt={`${project.name} - Custom ${project.type} developed by CodeHTML`} 
               className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
               loading="lazy"
               decoding="async"
            />
            <div className="absolute inset-0 bg-black/20 pointer-events-none transition-colors duration-1000 hover:bg-transparent"></div>
         </div>
      </section>

      {/* Metrics Row */}
      <section className="bg-zinc-950/40 backdrop-blur-md text-white border-y border-white/5 py-12 px-4 md:px-12 mb-24">
         <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {project.metrics.map((metric, idx) => (
               <div key={idx} className="flex flex-col md:border-r last:border-0 border-white/5 pr-8">
                  <span className="font-headline font-extrabold tracking-tight text-5xl md:text-7xl text-vintage-gold leading-none">{metric.value}</span>
                  <span className="font-body font-bold text-zinc-500 text-[10px] md:text-xs mt-3 tracking-widest uppercase">{metric.label}</span>
               </div>
            ))}
         </div>
      </section>

      {/* Analysis Grid */}
      <section className="px-4 md:px-12 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
         <div className="lg:col-span-8 flex flex-col gap-16 text-left">
            <div className="flex flex-col gap-6">
               <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white flex items-center gap-4 uppercase">
                  THE CHALLENGE
               </h2>
               <p className="font-body text-lg md:text-xl text-zinc-400 font-medium leading-relaxed border-l border-vintage-gold pl-6 md:pl-10 py-2">
                  {project.problem}
               </p>
            </div>

            <div className="flex flex-col gap-6">
               <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-white flex items-center gap-4 uppercase">
                  THE SOLUTION
               </h2>
               <p className="font-body text-lg md:text-xl text-zinc-300 font-medium leading-relaxed border-l border-vintage-gold pl-6 md:pl-10 py-2">
                  {project.solution}
               </p>
            </div>

            <div className="flex flex-col gap-6">
               <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-vintage-gold flex items-center gap-4 uppercase">
                  ARCHITECTURAL RESULT
               </h2>
               <p className="font-body text-lg md:text-xl text-white font-medium italic bg-zinc-950/40 backdrop-blur-md p-8 md:p-10 border border-white/5 rounded-2xl leading-relaxed shadow-lg">
                  {project.result}
               </p>
            </div>
         </div>

         <div className="lg:col-span-4 flex flex-col gap-12 text-left">
            <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-2xl relative shadow-lg">
               <h3 className="font-headline font-bold text-xl text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                  <span className="w-2 h-2 bg-vintage-gold rounded-full"></span>
                  TECH STACK
               </h3>
               <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                     <span key={idx} className="bg-black text-zinc-300 px-3 py-1.5 font-body font-bold tracking-widest text-[9px] border border-white/5 rounded-full uppercase">
                        {t}
                     </span>
                  ))}
               </div>
               
               <div className="mt-12 pt-8 border-t border-white/5">
                  <h3 className="font-headline font-bold text-xl text-white mb-6 uppercase tracking-wider flex items-center gap-3">
                     <span className="w-2 h-2 bg-vintage-gold rounded-full"></span>
                     ACTION
                  </h3>
                  <a 
                     href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%2520your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
                     target="_blank"
                     rel="noopener noreferrer"
                     className="btn-gold-solid w-full text-center py-4"
                  >
                     START YOUR BUILD ➲
                  </a>
               </div>
            </div>
         </div>
      </section>

      {/* Footer CTA */}
      <section className="px-4 md:px-12 max-w-[1600px] mx-auto text-center border-t border-white/5 pt-20">
         <h2 className="font-headline font-extrabold text-4xl md:text-6xl text-white mb-8 uppercase leading-tight">
            READY FOR <br /> SOMETHING <span className="font-elegant italic font-light text-vintage-gold">ELITE?</span>
         </h2>
         <a 
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-solid inline-flex px-10 py-5"
         >
            START YOUR BUILD ➲
         </a>
      </section>
    </main>
  );
};

export default CaseStudy;
