import React from 'react';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { ChevronRight, Building, Smartphone, Zap, Search, Key, MapPin } from 'lucide-react';


const RealEstateWebsiteDubai = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Real Estate Website Design Dubai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CodeHTML",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "description": "Premium real estate website design in Dubai. IDX/CRM integrations, interactive property maps, and sub-second loading property listings.",
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "offers": {
      "@type": "Offer",
      "price": "1000.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title="Real Estate Website Design Dubai | Property Portal Development"
        description="Elite real estate website design company in Dubai. We build high-speed property portals with CRM integration, interactive maps, and lead generation."
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12 max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-brand-gold/10 to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold font-semibold text-xs tracking-widest uppercase mb-8">
            <Building size={14} />
            <span>Dubai PropTech Solutions</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-outfit font-bold leading-[1.1] mb-6">
            Sell Properties. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">
              Capture Leads.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
            We build ultra-fast, visually stunning property portals for Dubai's top real estate brokers and agencies. Seamless CRM integration, interactive maps, and automated lead capture.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/919303228082" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-xl bg-brand-gold text-black font-bold text-lg hover:bg-white transition-colors flex items-center gap-2">
              Start Your Portal <ChevronRight size={20} />
            </a>
            <a href="#features" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors">
              Explore Features
            </a>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
            <img 
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop" 
              alt="Real estate website design Dubai" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Property Search</div>
                  <div className="text-brand-gold text-sm">Instant Filtering & Maps</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <MapPin size={20} className="text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-outfit font-bold mb-6">Engineered for Dubai Real Estate</h2>
          <p className="text-gray-400 text-lg">Stop losing high-value leads to slow websites. We build custom platforms that showcase luxury properties instantly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Key className="text-brand-gold" size={32} />,
              title: "CRM Integration",
              desc: "Seamless synchronization with Property Finder, Bayut, Salesforce, and custom CRM systems."
            },
            {
              icon: <Zap className="text-brand-gold" size={32} />,
              title: "Sub-Second Loading",
              desc: "High-resolution property galleries load instantly with Next.js advanced image optimization."
            },
            {
              icon: <Search className="text-brand-gold" size={32} />,
              title: "Advanced SEO",
              desc: "Rank above competitors for 'villas in palm jumeirah' with our technical SEO architecture."
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="mb-6 bg-black p-4 inline-block rounded-xl border border-white/10">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default RealEstateWebsiteDubai;
