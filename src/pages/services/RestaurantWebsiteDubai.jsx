import React from 'react';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { ChevronRight, Utensils, Smartphone, Zap, Search, Clock, CreditCard } from 'lucide-react';

import { useCurrency, formatPrice } from '../../utils/currency';

const RestaurantWebsiteDubai = () => {
  const [currency] = useCurrency();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Restaurant Website Design Dubai",
    "provider": {
      "@type": "LocalBusiness",
      "name": "CodeHTML",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressCountry": "AE"
      }
    },
    "description": "Premium restaurant website design and development in Dubai. Features digital QR menus, WhatsApp ordering, and lightning-fast load times.",
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    },
    "offers": {
      "@type": "Offer",
      "price": "400.00",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title={`Restaurant Website Design Dubai | Custom Cafe & Dining Websites (${formatPrice("AED 1,500", currency)}+)`}
        description="Top-rated restaurant website design company in Dubai. We build sub-second loading websites with digital QR menus, online reservations, and WhatsApp ordering."
        schema={JSON.stringify(schema)}
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
            <Utensils size={14} />
            <span>Dubai Hospitality Tech</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-outfit font-bold leading-[1.1] mb-6">
            Sell More Food. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-white">
              Zero Commissions.
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl">
            We engineer lightning-fast custom websites for Dubai's top restaurants, cafes, and cloud kitchens. Complete with QR menus, direct WhatsApp ordering, and zero monthly platform fees.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a href="https://wa.me/919303228082" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-xl bg-brand-gold text-black font-bold text-lg hover:bg-white transition-colors flex items-center gap-2">
              Start Your Project <ChevronRight size={20} />
            </a>
            <a href="#pricing" className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors">
              View Pricing
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
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
              alt="Restaurant website design Dubai" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Mobile Loading Speed</div>
                  <div className="text-brand-gold text-sm">Under 0.8 Seconds</div>
                </div>
                <div className="h-10 w-10 rounded-full bg-brand-gold/20 flex items-center justify-center">
                  <Zap size={20} className="text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-[#0a0a0f] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-outfit font-bold mb-6">Why Dubai Restaurants Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Stop paying 30% commissions to delivery aggregators. Take control of your customer data and profit margins with a custom-owned platform.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Smartphone className="text-brand-gold" size={32} />,
                title: "Digital QR Menus",
                desc: "Contactless dining made beautiful. Instantly update prices, hide sold-out items, and showcase high-res food photography."
              },
              {
                icon: <Zap className="text-brand-gold" size={32} />,
                title: "Instant Mobile Speeds",
                desc: "Built on custom React architecture. Your menu loads instantly even on slow mobile networks, reducing bounce rates."
              },
              {
                icon: <CreditCard className="text-brand-gold" size={32} />,
                title: "Direct Online Ordering",
                desc: "Integrate Stripe or local UAE payment gateways like Network International. Keep 100% of your delivery profits."
              },
              {
                icon: <Search className="text-brand-gold" size={32} />,
                title: "Local SEO Dominance",
                desc: "Programmatic JSON-LD schema helps you rank higher for 'restaurants near me' in Dubai Marina, JLT, or Business Bay."
              },
              {
                icon: <Clock className="text-brand-gold" size={32} />,
                title: "Table Reservations",
                desc: "Automated booking systems synced with your WhatsApp or email, making table management effortless."
              },
              {
                icon: <Utensils className="text-brand-gold" size={32} />,
                title: "Zero Monthly Fees",
                desc: "Unlike Shopify or Wix, you own the code. Pay once for the development, and never pay a platform subscription again."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-black border border-white/5 hover:border-brand-gold/30 transition-colors">
                <div className="h-16 w-16 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Pricing Packages */}
      <section className="py-24 px-6 bg-[#0a0a0f] border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-outfit font-bold mb-6">Transparent Pricing</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">No hidden costs. No monthly platform fees. 100% intellectual property ownership.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-black border border-white/5 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Cafe Starter</h3>
              <div className="text-4xl font-outfit font-bold text-brand-gold mb-6">{formatPrice("AED 1,500", currency)}</div>
              <ul className="space-y-4 mb-8 flex-1 text-gray-400">
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Custom Homepage Design</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Digital QR Menu (Static)</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> WhatsApp Booking Link</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Google Maps Integration</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Basic SEO Setup</li>
              </ul>
              <a href="https://wa.me/919303228082" className="w-full py-3 rounded-lg border border-white/10 text-center font-bold hover:bg-white/5 transition-colors">Select Plan</a>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-b from-brand-gold/10 to-black border border-brand-gold/30 flex flex-col relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-gold text-black text-xs font-bold px-3 py-1 rounded-full">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Growth Restaurant</h3>
              <div className="text-4xl font-outfit font-bold text-brand-gold mb-6">{formatPrice("AED 3,500", currency)}</div>
              <ul className="space-y-4 mb-8 flex-1 text-gray-400">
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Multi-page Custom Layout</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Dynamic QR Menu System</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Direct Online Ordering</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Advanced Local SEO Schema</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Fast Load Optimization</li>
              </ul>
              <a href="https://wa.me/919303228082" className="w-full py-3 rounded-lg bg-brand-gold text-black text-center font-bold hover:bg-white transition-colors">Select Plan</a>
            </div>

            <div className="p-8 rounded-2xl bg-black border border-white/5 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Enterprise Dining</h3>
              <div className="text-4xl font-outfit font-bold text-brand-gold mb-6">{formatPrice("AED 6,000", currency)}</div>
              <ul className="space-y-4 mb-8 flex-1 text-gray-400">
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Cloud Kitchen Architecture</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Delivery Fleet App Integration</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Payment Gateway Routing</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Multi-Branch Support</li>
                <li className="flex items-center gap-3"><ChevronRight size={16} className="text-brand-gold" /> Dedicated Server Setup</li>
              </ul>
              <a href="https://wa.me/919303228082" className="w-full py-3 rounded-lg border border-white/10 text-center font-bold hover:bg-white/5 transition-colors">Get Custom Quote</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default RestaurantWebsiteDubai;
