import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Globe, Shield, Sparkles, Building, Code, Smartphone, Cpu, Check, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import { getNewServiceLink } from '../data/servicesDataNew';

const Locations = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Load active cities for search on mount
  useEffect(() => {
    fetch('/data/activeCities.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load active cities');
        return res.json();
      })
      .then((data) => {
        setCities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch cities database', err);
        setLoading(false);
      });
  }, []);

  const countries = [
    {
      id: 'uae',
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      currency: 'USD',
      tagline: 'Middle East Tech Hub',
      desc: 'Bespoke corporate, real estate, and high-performance SaaS platforms tailored for Dubai, Abu Dhabi, and the Northern Emirates.',
      cities: [
        { name: 'Dubai', slug: 'dubai' },
        { name: 'Abu Dhabi', slug: 'abu-dhabi' },
        { name: 'Sharjah', slug: 'sharjah' },
        { name: 'Ajman', slug: 'ajman' },
        { name: 'Ras Al Khaimah', slug: 'ras-al-khaimah' },
        { name: 'Fujairah', slug: 'fujairah' }
      ]
    },
    {
      id: 'india',
      name: 'India',
      flag: '🇮🇳',
      currency: 'INR',
      tagline: 'Global Development Center',
      desc: 'Rapid MVP engineering, B2B dashboards, and scalable mobile app developments for India\'s leading tech hubs and startups.',
      cities: [
        { name: 'Mumbai', slug: 'mumbai' },
        { name: 'Delhi', slug: 'delhi' },
        { name: 'Bengaluru', slug: 'bengaluru' },
        { name: 'Hyderabad', slug: 'hyderabad' },
        { name: 'Pune', slug: 'pune' },
        { name: 'Noida', slug: 'noida' }
      ]
    },
    {
      id: 'singapore',
      name: 'Singapore',
      flag: '🇸🇬',
      currency: 'SGD',
      tagline: 'Asia-Pacific Financial Core',
      desc: 'Compliance-centric web applications, corporate systems, and secure fintech platforms built for Singapore and international markets.',
      cities: [
        { name: 'Singapore', slug: 'singapore' },
        { name: 'Jurong East', slug: 'jurong-east' },
        { name: 'Marina Bay', slug: 'marina-bay' },
        { name: 'Tampines Estate', slug: 'tampines-estate' },
        { name: 'Woodlands', slug: 'woodlands' },
        { name: 'Bukit Timah', slug: 'bukit-timah' }
      ]
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      flag: '🇬🇧',
      currency: 'GBP',
      tagline: 'European Tech Gateway',
      desc: 'Sub-second custom coded website development, local service pages, and mobile platforms compliant with UK regulations.',
      cities: [
        { name: 'York', slug: 'york' },
        { name: 'Windsor', slug: 'windsor' },
        { name: 'Wimbledon', slug: 'wimbledon' },
        { name: 'Winchester', slug: 'winchester' },
        { name: 'Wigan', slug: 'wigan' },
        { name: 'City of Westminster', slug: 'city-of-westminster' }
      ]
    },
    {
      id: 'usa',
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      tagline: 'North American Operations',
      desc: 'High-end React applications, digital ecommerce storefronts, and automated workflows engineered for US startups and enterprises.',
      cities: [
        { name: 'Jacksonville', slug: 'jacksonville' },
        { name: 'Nashville', slug: 'nashville' },
        { name: 'Louisville', slug: 'louisville' },
        { name: 'Madison', slug: 'madison' },
        { name: 'Oakland', slug: 'oakland' },
        { name: 'Naples', slug: 'naples' }
      ]
    }
  ];

  const services = [
    { id: 'website-development', name: 'Web Development', icon: Code, desc: 'Bespoke static & dynamic business sites' },
    { id: 'web-app-development', name: 'Web Applications', icon: Building, desc: 'Interactive portals, CRMs, and ERPs' },
    { id: 'saas-development', name: 'SaaS Platforms', icon: Cpu, desc: 'Multi-tenant subscription architectures' },
    { id: 'mobile-app-development', name: 'Mobile Apps', icon: Smartphone, desc: 'Cross-platform iOS & Android engineering' },
    { id: 'ai-automation', name: 'AI & Automation', icon: Sparkles, desc: 'Intelligent workflow chatbots & bots' }
  ];

  // Client-side search matching logic
  const searchResults = useMemo(() => {
    if (!searchQuery.trim() || cities.length === 0) return [];
    
    const query = searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '');
    const matched = [];
    
    for (const city of cities) {
      if (
        city.n.toLowerCase().replace(/[^a-z0-9]/g, '').includes(query) ||
        city.s.toLowerCase().replace(/[^a-z0-9]/g, '').includes(query)
      ) {
        matched.push(city);
        if (matched.length >= 24) break; // Cap results for performance
      }
    }
    
    // Group by country
    const grouped = {};
    for (const city of matched) {
      if (!grouped[city.c]) grouped[city.c] = [];
      grouped[city.c].push(city);
    }
    
    return Object.entries(grouped).map(([countryKey, list]) => {
      const cInfo = countries.find(c => c.id === countryKey) || { name: countryKey.toUpperCase(), flag: '📍' };
      return {
        countryName: cInfo.name,
        flag: cInfo.flag,
        countryKey,
        cities: list
      };
    });
  }, [searchQuery, cities]);

  return (
    <main className="pt-28 md:pt-36 pb-24 bg-black min-h-screen text-white relative overflow-hidden">
      <SEO 
        title="Global Operations & Delivery Locations | CodeHTML" 
        description="Explore our primary delivery hubs across India, UAE, Singapore, UK, and USA. Over 5 million localized SEO landing pages for web, app, and custom software development."
        keywords="codehtml locations, web design locations, custom software hubs, dubai, mumbai, singapore, london, new york"
      />

      {/* Futuristic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-vintage-gold/5 blur-[160px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10 text-left">
        {/* Page Header */}
        <div className="border-b border-white/10 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-body font-bold text-vintage-gold text-[10px] tracking-[0.35em] uppercase mb-3 block">
              GLOBAL PRESENCE
            </span>
            <h1 className="font-headline font-black text-4xl md:text-6xl tracking-tight text-white mb-3">
              OUR LOCATIONS
            </h1>
            <p className="font-body text-zinc-400 text-sm md:text-base max-w-2xl leading-relaxed">
              We deliver elite custom-coded software, high-performance web applications, and mobile products to businesses globally across five primary operational jurisdictions.
            </p>
          </div>
          
          {/* Dynamic counter */}
          <div className="bg-zinc-950 border border-vintage-gold/20 p-4 min-w-[200px] rounded-none">
            <span className="font-headline font-black text-3xl text-vintage-gold block leading-none">
              8,368+
            </span>
            <span className="font-body text-[9px] text-zinc-500 font-bold uppercase tracking-wider mt-1 block">
              ACTIVE CITIES DOMINATED
            </span>
          </div>
        </div>

        {/* Dynamic Search Hub */}
        <div className="mb-16 bg-zinc-950/80 border border-white/5 p-6 md:p-8 rounded-none backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-vintage-gold/30 to-transparent"></div>
          
          <div className="max-w-2xl">
            <h2 className="font-headline font-extrabold text-lg sm:text-xl text-white uppercase mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-vintage-gold animate-spin-slow" />
              Interactive City Explorer
            </h2>
            <p className="font-body text-zinc-400 text-xs mb-6 leading-normal font-semibold">
              Search through our database of 8,000+ operational locations to explore customized software packages and local schema targets near you.
            </p>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search city, state or region (e.g. Mumbai, Dubai Marina, California...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/10 focus:border-vintage-gold/50 text-white font-body px-5 py-4 pl-12 rounded-none transition-all duration-300 outline-none text-sm placeholder:text-zinc-600 focus:shadow-[0_0_15px_rgba(212,175,55,0.05)]"
              />
              <Search className="w-5 h-5 text-zinc-600 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Search Results Display */}
          {searchQuery.trim() !== '' && (
            <div className="mt-8 border-t border-white/5 pt-6 text-left">
              {loading ? (
                <div className="text-zinc-500 font-body text-xs animate-pulse">Searching global registry database...</div>
              ) : searchResults.length === 0 ? (
                <div className="text-zinc-500 font-body text-xs">No active delivery locations found matching "{searchQuery}".</div>
              ) : (
                <div className="flex flex-col gap-6">
                  {searchResults.map((group) => (
                    <div key={group.countryKey} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm">{group.flag}</span>
                        <span className="font-headline font-bold text-xs uppercase tracking-wider text-vintage-gold">
                          {group.countryName}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {group.cities.map((city) => (
                          <div 
                            key={city.s} 
                            className="bg-black/40 border border-white/5 p-4 rounded-none hover:border-vintage-gold/20 transition-all flex flex-col justify-between"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-headline font-bold text-sm text-zinc-300">
                                {city.n}
                              </span>
                              <span className="text-[9px] font-body bg-zinc-900 text-zinc-500 px-2 py-0.5 uppercase tracking-wide">
                                {city.st || 'District'}
                              </span>
                            </div>
                            
                            {/* Service links */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2 border-t border-white/5 pt-2">
                              {services.slice(0, 3).map((srv) => (
                                <Link
                                  key={srv.id}
                                  to={`/${srv.id}-in-${city.s}`}
                                  className="text-[10px] font-body font-semibold text-zinc-500 hover:text-vintage-gold transition-colors flex items-center gap-0.5"
                                >
                                  {srv.name.split(' ')[0]} ➲
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Countries Grid & Top Cities */}
        <div className="flex flex-col gap-20">
          {countries.map((country) => (
            <section key={country.id} className="relative z-10 border-b border-white/5 pb-16 last:border-0 last:pb-0 text-left">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                
                {/* Left Panel: Country Info */}
                <div className="lg:col-span-4 sticky top-28 bg-zinc-950/40 border border-white/5 p-6 md:p-8 rounded-none">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl sm:text-4xl leading-none">{country.flag}</span>
                    <div>
                      <span className="font-body font-black text-vintage-gold text-[9px] tracking-[0.2em] uppercase block leading-none mb-1.5">
                        {country.tagline}
                      </span>
                      <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase mt-0">
                        {country.name}
                      </h2>
                    </div>
                  </div>
                  
                  <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6 font-semibold">
                    {country.desc}
                  </p>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5 text-xs font-body font-bold uppercase tracking-wider text-zinc-500">
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-vintage-gold" /> Sub-Second CDN Prerendering</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-vintage-gold" /> {country.currency} Local Pricing Packages</span>
                    <span className="flex items-center gap-2"><Check className="w-4 h-4 text-vintage-gold" /> 100% Tax &amp; IP Ownership</span>
                  </div>
                </div>

                {/* Right Panel: Top City Cards */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <h3 className="font-headline font-bold text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    PRIMARY REGIONAL HUBS &amp; SERVICE TARGETS
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {country.cities.map((city) => (
                      <div 
                        key={city.slug} 
                        className="bg-zinc-950/40 border border-white/5 hover:border-vintage-gold/20 hover:bg-zinc-950/70 p-5 rounded-none transition-all flex flex-col justify-between group"
                      >
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-vintage-gold" />
                            <h4 className="font-headline font-extrabold text-base text-white uppercase group-hover:text-vintage-gold transition-colors">
                              {city.name}
                            </h4>
                          </div>
                          <p className="font-body text-zinc-500 text-[10px] leading-relaxed font-semibold">
                            Full digital engineering catalog pre-rendered for crawl bots in {city.name}.
                          </p>
                        </div>
                        
                        {/* 5 Services linked per city card */}
                        <div className="flex flex-col gap-2 mt-4 border-t border-white/5 pt-4">
                          {services.map((srv) => (
                            <Link
                              key={srv.id}
                              to={`/${srv.id}-in-${city.slug}`}
                              className="flex items-center justify-between text-xs font-body text-zinc-400 hover:text-vintage-gold font-semibold transition-colors group/item py-1 border-b border-dashed border-white/5 last:border-0"
                            >
                              <span>{srv.name}</span>
                              <span className="text-[10px] text-zinc-600 group-hover/item:text-vintage-gold translate-x-1 group-hover/item:translate-x-0 transition-transform">
                                ➲
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </section>
          ))}
        </div>

        {/* Global SEO Directory Index Section */}
        <section className="mt-20 border-t border-white/10 pt-16 text-left">
          <span className="font-body font-bold text-vintage-gold text-[10px] tracking-[0.25em] uppercase mb-2 block">DIRECTORY MATRIX</span>
          <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase leading-none mb-6">
            Explore Services Globally
          </h2>
          <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mb-10 leading-relaxed font-semibold">
            Browse through our structured service matrices to find tailored options, tech stacks, and compliant software builds globally.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((srv, idx) => (
              <div 
                key={idx}
                className="bg-zinc-950/40 border border-white/5 p-5 rounded-none flex flex-col justify-between hover:border-vintage-gold/20 transition-all"
              >
                <div>
                  <div className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-vintage-gold mb-4">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-headline font-bold text-sm text-white uppercase mb-2">
                    {srv.name}
                  </h4>
                  <p className="font-body text-zinc-500 text-[10px] leading-relaxed font-semibold">
                    {srv.desc}
                  </p>
                </div>
                
                <Link
                  to={getNewServiceLink(srv.id)}
                  className="mt-6 font-body font-bold text-[9px] uppercase tracking-wider text-vintage-gold hover:underline flex items-center gap-1"
                >
                  Learn About Service
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Locations;
