import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { findGrowthGuideBySlug } from '../data/cityDataClient';

const GrowthGuide = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    findGrowthGuideBySlug(slug)
      .then(data => {
        if (isMounted) {
          setGuide(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Failed to load growth guide:', err);
        if (isMounted) {
          setGuide(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white selection:bg-vintage-gold selection:text-black">
        <div className="text-center font-body font-bold text-lg animate-pulse uppercase tracking-wider text-vintage-gold">
          Deciphering strategic blueprint...
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white selection:bg-vintage-gold selection:text-black">
        <h1 className="font-headline font-extrabold tracking-tight text-5xl md:text-7xl mb-6">GUIDE NOT FOUND</h1>
        <button 
          onClick={() => navigate('/')}
          className="btn-gold-solid mt-8 inline-flex"
        >
          GO BACK TO HOME ➲
        </button>
      </div>
    );
  }

  const guideSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": guide.title,
    "description": guide.metaDesc,
    "image": "https://codehtml.in/luxury_dubai_villa.webp",
    "author": {
      "@type": "Organization",
      "name": "CodeHTML",
      "logo": "https://codehtml.in/Codehtml.logo.png"
    }
  };

  return (
    <main className="bg-black min-h-screen pt-16 sm:pt-24 pb-12 sm:pb-20 text-white selection:bg-vintage-gold selection:text-black relative">
      <SEO 
        title={guide.metaTitle} 
        description={guide.metaDesc} 
        keywords={`${guide.category.toLowerCase()} guide, real estate growth hack, codehtml inbound seo, ${guide.slug.replace(/-/g, ' ')}`}
        schema={guideSchema}
      />

      {/* Modern Luxury Radial Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-vintage-gold/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20vh] right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-vintage-gold/5 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-left">
        {/* Navigation Breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-8">
           <Link to="/" className="btn-gold-outline px-3 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-[10px]">
              ← BACK TO HOME
           </Link>
           <span className="text-vintage-gold font-body font-bold text-[8px] sm:text-[10px] tracking-widest px-3 py-1.5 sm:px-4 sm:py-2 border border-vintage-gold/30 rounded-full uppercase">
             GROWTH RESOURCES // {guide.category}
           </span>
           <button
             onClick={handleShare}
             className={`font-body font-bold text-[8px] sm:text-[10px] tracking-widest px-3.5 py-1.5 sm:px-4 sm:py-2 border rounded-full uppercase transition-all duration-300 ${
               copied 
                 ? 'bg-vintage-gold text-black border-vintage-gold shadow-lg shadow-vintage-gold/20 scale-95' 
                 : 'text-zinc-400 hover:text-white border-white/10 hover:border-vintage-gold/30'
             }`}
           >
             {copied ? '✓ LINK COPIED' : '⎘ COPY SHARE LINK'}
           </button>
         </div>

        {/* Editorial Heading */}
        <header className="mb-6 sm:mb-12 border-b border-white/5 pb-4 sm:pb-8">
          <h1 className="font-headline font-extrabold text-2xl sm:text-5xl lg:text-6xl text-white leading-tight uppercase mb-4 sm:mb-6">
            {guide.title.split(':').map((part, index) => (
              <span key={index} className={index === 1 ? "block text-vintage-gold font-elegant italic font-light tracking-wide normal-case mt-1 sm:mt-2 text-sm sm:text-2xl" : ""}>
                {part}
              </span>
            ))}
          </h1>
          <p className="font-body text-zinc-400 text-xs sm:text-base leading-relaxed font-semibold uppercase tracking-wide border-l border-vintage-gold/50 pl-3 sm:pl-4">
            {guide.intro}
          </p>
        </header>

        {/* The 3-Step Strategy Section */}
        <section className="space-y-4 sm:space-y-8 mb-10 sm:mb-16">
          <h2 className="font-headline font-bold text-xs sm:text-lg text-vintage-gold tracking-widest uppercase mb-4 sm:mb-6">THE STRATEGIC MATRIX</h2>
          <div className="grid grid-cols-1 gap-4 sm:gap-6">
            {guide.steps && guide.steps.map((step, idx) => (
              <div 
                key={idx} 
                className="group bg-zinc-950/40 backdrop-blur-md border border-white/5 hover:border-vintage-gold/25 p-4 sm:p-8 rounded-xl sm:rounded-2xl flex flex-row gap-4 sm:gap-6 items-start transition-all duration-300"
              >
                <span className="font-headline font-extrabold text-2xl sm:text-4xl text-zinc-800 group-hover:text-vintage-gold transition-colors leading-none">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-headline font-bold text-sm sm:text-xl text-white mb-1.5 uppercase group-hover:text-vintage-gold transition-colors">
                    {step.title}
                  </h3>
                  <p className="font-body text-zinc-400 text-[11px] sm:text-sm font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Pitch / Call to Action Box */}
        <section className="relative overflow-hidden bg-gradient-to-br from-zinc-950 to-black border border-vintage-gold/30 p-5 sm:p-10 rounded-2xl sm:rounded-3xl shadow-[0_15px_40px_rgba(197,168,128,0.1)] mb-8 sm:mb-12">
          <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-vintage-gold/5 blur-[60px] sm:blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl">
              <span className="bg-vintage-gold text-black text-[8px] sm:text-[9px] font-body font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                CodeHTML Professional Tech Integrations
              </span>
              <h3 className="font-headline font-extrabold text-xl sm:text-3xl text-white uppercase leading-tight mb-2 sm:mb-4">
                WE CODE THIS FOR YOU.
              </h3>
              <p className="font-body text-zinc-400 text-[11px] sm:text-sm leading-relaxed mb-4 sm:mb-6 font-medium">
                {guide.pitch} Eliminate slow WordPress templates, capture high-ticket clients automatically, and rank on top.
              </p>
              <div className="flex gap-4 sm:gap-6 border-t border-white/5 pt-4 sm:pt-5">
                <div>
                  <span className="block text-vintage-gold font-headline font-extrabold text-lg sm:text-2xl">&lt;1s</span>
                  <span className="text-zinc-500 font-body font-bold text-[8px] tracking-widest uppercase">LOAD TIME</span>
                </div>
                <div>
                  <span className="block text-white font-headline font-extrabold text-lg sm:text-2xl">{guide.basePrice}</span>
                  <span className="text-zinc-500 font-body font-bold text-[8px] tracking-widest uppercase">BASE START</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <a 
                href={`https://wa.me/919303228082?text=${encodeURIComponent(guide.waMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto inline-flex items-center justify-center bg-vintage-gold hover:bg-white text-black font-body font-bold text-[10px] tracking-widest px-6 py-4 rounded-xl transition-all shadow-lg shadow-vintage-gold/10 text-center"
              >
                {guide.ctaText}
              </a>
            </div>
          </div>
        </section>

        {/* Navigation back helper */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-t border-white/5 pt-6 sm:pt-8">
          <Link to="/" className="font-body font-bold text-[9px] text-zinc-500 hover:text-vintage-gold tracking-widest uppercase transition-colors text-left">
            ➲ Return to Tech Systems
          </Link>
          <a 
            href={`https://wa.me/919303228082?text=Hi%20CodeHTML,%20I'm%2520interested%2520in%2520booking%2520a%2520digital%2520tech%2520consultation.`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-bold text-[9px] text-vintage-gold hover:text-white tracking-widest uppercase transition-colors text-left"
          >
            Direct Consulting Channel ➲
          </a>
        </div>
      </div>
    </main>
  );
};

export default GrowthGuide;
