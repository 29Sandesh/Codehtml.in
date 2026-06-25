import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVICES_DATA_NEW } from '../../data/servicesDataNew';
import { ArrowRight, Monitor, Smartphone, HelpCircle } from 'lucide-react';
import { useCurrency, formatPrice } from '../../utils/currency';

const ServicesIndex = () => {
  const [currency] = useCurrency();
  const categories = [
    {
      title: "Websites & Platforms",
      icon: Monitor,
      slugs: ['corporate-websites', 'custom-web-applications', 'responsive-design', 'wordpress-and-cms', 'payment-integration', 'shipping-integration']
    },
    {
      title: "Mobile Applications",
      icon: Smartphone,
      slugs: ['mobile-apps', 'hybrid-apps', 'progressive-web-apps', 'cross-platform']
    },
    {
      title: "Strategic Consulting",
      icon: HelpCircle,
      slugs: ['digital-transformation-strategy', 'ai-readiness-assessment', 'technology-roadmap-development', 'business-process-optimization']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-12">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-body font-bold text-vintage-gold tracking-widest uppercase block mb-3"
          >
            OUR TECHNICAL SERVICES
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-none mb-6"
          >
            Tailored Development <span className="text-vintage-gold">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            From high-speed corporate React websites to cross-platform mobile apps and cloud architectures, we design and build standard software ecosystems.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {categories.map((cat, catIdx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={catIdx}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * catIdx }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <div className="p-2 rounded-lg bg-zinc-950 border border-white/5 text-vintage-gold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="font-headline font-extrabold text-lg text-white uppercase tracking-wider">
                    {cat.title}
                  </h2>
                </div>

                <div className="flex flex-col gap-4">
                  {cat.slugs.map((slug) => {
                    const svc = SERVICES_DATA_NEW[slug];
                    if (!svc) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/services/${slug}`}
                        className="group p-5 rounded-2xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-900/30 hover:border-vintage-gold/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-headline font-extrabold text-base text-white group-hover:text-vintage-gold transition-colors">
                              {svc.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-vintage-gold group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="font-body text-[10px] text-vintage-gold/80 tracking-widest uppercase mb-2">
                            {svc.tagline}
                          </p>
                          <p className="font-body text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                            {svc.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                          <span className="font-body text-zinc-400 font-bold uppercase">
                            STARTING FROM
                          </span>
                          <span className="font-headline font-bold text-vintage-gold">
                            {formatPrice(svc.pricing.price, currency)}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesIndex;
