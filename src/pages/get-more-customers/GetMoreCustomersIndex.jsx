import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GET_MORE_CUSTOMERS_DATA } from '../../data/getMoreCustomersData';
import { ArrowRight, Search, Zap, BarChart3 } from 'lucide-react';
import { useCurrency, formatPrice } from '../../utils/currency';

const GetMoreCustomersIndex = () => {
  const [currency] = useCurrency();
  const categories = [
    {
      title: "Traditional Search (SEO)",
      icon: Search,
      slugs: ['go-navigator', 'website-seo', 'local-seo', 'ecommerce-seo', 'email-and-sms']
    },
    {
      title: "AEO Search Optimization",
      icon: Zap,
      slugs: ['aeo', 'ai-friendly-websites', 'conversion-optimization', 'smart-content-services', 'smart-popups', 'lead-capture-forms']
    },
    {
      title: "Reports & Dashboards",
      icon: BarChart3,
      slugs: ['sales-dashboards', 'smart-reports', 'performance-analytics']
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
            ACQUISITION SYSTEMS
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight leading-none mb-6"
          >
            Get More <span className="text-vintage-gold">Customers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed"
          >
            Optimize your codebase for organic search Google ranking and AI answer engine crawls. Capture, qualify, and convert more traffic into leads.
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
                    const marketing = GET_MORE_CUSTOMERS_DATA[slug];
                    if (!marketing) return null;
                    return (
                      <Link
                        key={slug}
                        to={`/get-more-customers/${slug}`}
                        className="group p-5 rounded-2xl border border-white/5 bg-zinc-950/20 hover:bg-zinc-900/30 hover:border-vintage-gold/30 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-headline font-extrabold text-base text-white group-hover:text-vintage-gold transition-colors">
                              {marketing.title}
                            </span>
                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-vintage-gold group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="font-body text-[10px] text-vintage-gold/80 tracking-widest uppercase mb-2">
                            {marketing.tagline}
                          </p>
                          <p className="font-body text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                            {marketing.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center text-[10px]">
                          <span className="font-body text-zinc-400 font-bold uppercase">
                            STARTING FROM
                          </span>
                          <span className="font-headline font-bold text-vintage-gold">
                            {formatPrice(marketing.pricing.price, currency)}
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

export default GetMoreCustomersIndex;
