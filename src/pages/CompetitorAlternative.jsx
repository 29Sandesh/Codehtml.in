import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { ShieldCheck, Zap, Code2, ArrowRight } from 'lucide-react';

const COMPETITORS = {
  'webcastle': {
    name: 'Webcastle Dubai',
    weakness: 'Slow WordPress templates & bloated plugins',
    ourStrength: 'Custom React code & sub-second loading',
    features: [
      { name: 'Load Speed', them: '3.5s - 5s', us: 'Under 0.8s' },
      { name: 'Tech Stack', them: 'WordPress/PHP', us: 'React/Next.js' },
      { name: 'Code Ownership', them: 'Tied to plugins', us: '100% Yours' },
      { name: 'Security', them: 'Vulnerable to SQLi', us: 'Bank-grade (Static)' }
    ]
  },
  'digital-gravity': {
    name: 'Digital Gravity Dubai',
    weakness: 'Expensive enterprise PHP setups and high recurring retainer costs',
    ourStrength: 'Bespoke sub-second React platforms with zero developer lock-in',
    features: [
      { name: 'Load Speed', them: '2.5s - 4s', us: 'Under 0.8s' },
      { name: 'Tech Stack', them: 'WordPress / Magento / Custom PHP', us: 'React / Next.js' },
      { name: 'Pricing Model', them: 'High monthly retainers & markup', us: 'Transparent milestone payments' },
      { name: 'Design Freedom', them: 'CMS page builder restrictions', us: '100% custom boutique layouts' }
    ]
  },
  'redspider': {
    name: 'RedSpider Dubai',
    weakness: 'Budget template sites, slow servers, and shared web hosting bottlenecks',
    ourStrength: 'Elite custom engineering, global edge CDN hosting, and maximum performance',
    features: [
      { name: 'Load Speed', them: '4.5s+', us: 'Under 0.8s' },
      { name: 'Tech Stack', them: 'WordPress templates', us: 'React / Next.js' },
      { name: 'Hosting Platform', them: 'Shared Apache servers', us: 'Global Edge CDNs (Netlify/Vercel)' },
      { name: 'Security Protocol', them: 'Vulnerable to CMS/plugin leaks', us: '100% static secure frontends' }
    ]
  },
  'elementor': {
    name: 'Elementor Agencies',
    weakness: 'Heavy page builders & poor SEO',
    ourStrength: 'Semantic HTML & 100/100 Lighthouse scores',
    features: [
      { name: 'Load Speed', them: '4s+', us: 'Under 0.8s' },
      { name: 'Tech Stack', them: 'WordPress + Elementor', us: 'React/Next.js' },
      { name: 'Code Ownership', them: 'Tied to Elementor', us: '100% Yours' },
      { name: 'SEO Structure', them: 'Div Soup (Poor)', us: 'Semantic HTML5 (Excellent)' }
    ]
  }
};

const CompetitorAlternative = () => {
  const params = useParams();
  
  // Robustly extract the competitor slug from params or url path
  const rawSlug = params.slug || params['competitor-alternative'] || window.location.pathname.split('/').pop() || '';
  const competitorId = rawSlug.replace('-alternative', '');
  const competitor = COMPETITORS[competitorId] || {
    name: competitorId.charAt(0).toUpperCase() + competitorId.slice(1),
    weakness: 'Standard agency templates & slow delivery',
    ourStrength: 'Elite custom engineering & rapid deployment',
    features: [
      { name: 'Load Speed', them: 'Average (3s+)', us: 'Under 0.8s' },
      { name: 'Tech Stack', them: 'CMS / Templates', us: 'React/Next.js' },
      { name: 'Code Ownership', them: 'Limited', us: '100% Yours' },
      { name: 'Security', them: 'Standard', us: 'Bank-grade (Static)' }
    ]
  };

  // State for interactive slider percentage (0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const calculatePos = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offset = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offset / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e) => {
    calculatePos(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      calculatePos(e.touches[0].clientX);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30 pt-24 pb-20">
      <SEO 
        title={`Better Alternative to ${competitor.name} | CodeHTML Dubai`}
        description={`Looking for an alternative to ${competitor.name}? CodeHTML builds faster, more secure custom websites in Dubai. See the comparison.`}
      />
      
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-semibold text-xs tracking-widest uppercase mb-8">
            <Zap size={14} />
            <span>The Premium Choice</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-outfit font-bold mb-6 leading-tight">
            Looking for a better alternative to <br className="hidden md:block"/>
            <span className="text-zinc-500 line-through decoration-brand-gold decoration-4">{competitor.name}</span> ?
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Stop settling for {competitor.weakness.toLowerCase()}. Upgrade your brand with CodeHTML's {competitor.ourStrength.toLowerCase()}.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl">
            <div className="text-zinc-500 font-bold mb-6 text-xl">With {competitor.name}</div>
            <ul className="space-y-4">
              {competitor.features.map((f, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-400">{f.name}</span>
                  <span className="text-red-400 font-semibold">{f.them}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-brand-gold/5 border border-brand-gold/30 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Code2 size={100} />
            </div>
            <div className="text-brand-gold font-bold mb-6 text-xl flex items-center gap-2">
              <ShieldCheck className="text-brand-gold" />
              With CodeHTML
            </div>
            <ul className="space-y-4 relative z-10">
              {competitor.features.map((f, i) => (
                <li key={i} className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-gray-300">{f.name}</span>
                  <span className="text-white font-bold">{f.us}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Interactive Speed Comparison Slider */}
        <div className="mb-20 bg-zinc-950 border border-white/5 rounded-3xl p-6 sm:p-10 text-center">
          <h2 className="font-outfit font-black text-2xl sm:text-3xl text-white mb-2 uppercase">
            Speed Comparison Simulator
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Drag the slider to compare how {competitor.name}'s website loading speed compares side-by-side with CodeHTML's custom React stack.
          </p>
          
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative w-full aspect-[16/9] md:aspect-[2.4/1] rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize bg-zinc-900 shadow-2xl"
          >
            {/* Left side (Competitor - slow) */}
            <div className="absolute inset-0 w-full h-full bg-red-950/20 flex flex-col justify-center items-center text-center p-4">
              <div className="flex flex-col items-center gap-4">
                {/* Rotating Spinner */}
                <div className="w-12 h-12 border-4 border-zinc-700 border-t-red-500 rounded-full animate-spin"></div>
                <div className="text-red-500 font-outfit font-bold text-xs tracking-wider uppercase bg-red-950/40 border border-red-500/20 px-3 py-1 rounded-full">
                  PageSpeed Score: 42/100
                </div>
                <h4 className="text-2xl font-bold uppercase text-zinc-500 tracking-tight">
                  {competitor.name} Website
                </h4>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Render-blocking scripts & plugins delay loading. Users bounce before it renders.
                </p>
              </div>
            </div>

            {/* Right side (CodeHTML - fast) - clipped by slider position */}
            <div 
              style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-zinc-900 to-black flex flex-col justify-center items-center text-center p-4 transition-all duration-75"
            >
              <div className="flex flex-col items-center gap-4">
                {/* Green Score Badge */}
                <div className="w-16 h-16 rounded-full border-4 border-green-500/30 flex items-center justify-center bg-green-500/10 shadow-lg shadow-green-500/20 animate-pulse">
                  <span className="text-green-500 font-outfit font-black text-xl">100</span>
                </div>
                <div className="text-green-400 font-outfit font-bold text-xs tracking-wider uppercase bg-green-950/40 border border-green-500/20 px-3 py-1 rounded-full">
                  PageSpeed Score: 100/100
                </div>
                <h4 className="text-2xl font-bold uppercase text-brand-gold tracking-tight">
                  CodeHTML Custom React
                </h4>
                <p className="text-xs text-zinc-300 max-w-xs leading-relaxed">
                  Static assets served instantly from Edge CDNs. Zero render-blocking script bloat.
                </p>
              </div>
            </div>

            {/* Vertical Splitter line */}
            <div 
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 w-1 bg-brand-gold/60 pointer-events-none transition-all duration-75"
            >
              {/* Grab Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-gold border-4 border-black text-black flex items-center justify-center shadow-lg shadow-brand-gold/50 cursor-ew-resize">
                <span className="font-bold text-xs">↔</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between text-[10px] font-bold tracking-widest text-zinc-550 uppercase mt-4">
            <span>← Hover / Drag Left to see CodeHTML (100/100)</span>
            <span>Hover / Drag Right to see Competitor (42/100) →</span>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-gold text-black font-bold text-lg hover:bg-white transition-colors"
          >
            Start Your Custom Build <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompetitorAlternative;
