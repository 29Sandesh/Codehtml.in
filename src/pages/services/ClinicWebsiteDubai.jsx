import React from 'react';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { ChevronRight, Stethoscope, Smartphone, Zap, Search, Calendar, ShieldCheck } from 'lucide-react';


const ClinicWebsiteDubai = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Clinic Website Design Dubai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CodeHTML",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "description": "Premium clinic and healthcare website design in Dubai. Secure patient portals, HIPAA-compliant booking systems, and rapid load times.",
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "offers": {
      "@type": "Offer",
      "price": "700.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title="Clinic Website Design Dubai | Healthcare Web Development"
        description="Top-rated healthcare website design company in Dubai. We build secure clinic websites with patient portals, appointment booking, and WhatsApp integration."
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
            <Stethoscope size={14} />
            <span>Dubai Healthcare Tech</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-outfit font-bold leading-[1.1] mb-6">
            More Patients. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">
              Secure Systems.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
            We engineer premium, lightning-fast websites for Dubai's top clinics and medical centers. Featuring WhatsApp appointment scheduling, secure patient portals, and high local SEO visibility.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/919303228082" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-xl bg-brand-gold text-black font-bold text-lg hover:bg-white transition-colors flex items-center gap-2">
              Book Consultation <ChevronRight size={20} />
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
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1000&auto=format&fit=crop" 
              alt="Clinic website design Dubai" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Data Security</div>
                  <div className="text-brand-gold text-sm">HIPAA & DHA Compliant</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <ShieldCheck size={20} className="text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6 lg:px-12 max-w-[1400px] mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-5xl font-outfit font-bold mb-6">Engineered for Medical Practices</h2>
          <p className="text-gray-400 text-lg">Stop relying on slow WordPress templates. We build custom React platforms that convert visitors into booked patients.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Calendar className="text-brand-gold" size={32} />,
              title: "Smart Booking",
              desc: "Automated WhatsApp appointment scheduling and calendar syncing to reduce no-shows."
            },
            {
              icon: <Search className="text-brand-gold" size={32} />,
              title: "Local SEO Dominance",
              desc: "Rank #1 for 'best clinic near me' with our proprietary technical SEO architecture."
            },
            {
              icon: <Smartphone className="text-brand-gold" size={32} />,
              title: "Mobile-First Patient Flow",
              desc: "85% of patients book via phone. We deliver sub-second mobile experiences."
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

export default ClinicWebsiteDubai;
