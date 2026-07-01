import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { GET_MORE_CUSTOMERS_DATA } from '../../data/getMoreCustomersData';
import { CheckCircle2, ChevronDown, HelpCircle, Code, ShieldCheck, ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';
import { useCurrency, formatPrice } from '../../utils/currency';

const GetMoreCustomersDetail = () => {
  const { slug } = useParams();
  const marketing = GET_MORE_CUSTOMERS_DATA[slug];
  const [currency] = useCurrency();

  const [openFaq, setOpenFaq] = useState(null);

  if (!marketing) {
    return <Navigate to="/get-more-customers" replace />;
  }

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };



  return (
    <>
      <SEO 
        title={`${marketing.title} - Get More Customers`}
        description={marketing.description}
      />
      <div className="min-h-screen bg-black text-white pt-28 pb-20 px-4 sm:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Back Navigation */}
          <Link to="/get-more-customers" className="inline-flex items-center gap-2 text-zinc-500 hover:text-vintage-gold text-xs font-body font-bold tracking-wider uppercase mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Acquisition
          </Link>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16">
            <div className="lg:col-span-8">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-body font-bold text-vintage-gold tracking-widest uppercase block mb-3"
              >
                {marketing.tagline}
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-headline font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight leading-tight mb-6"
              >
                {marketing.title}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-body text-zinc-400 text-sm sm:text-base leading-relaxed mb-8"
              >
                {marketing.description}
              </motion.p>

              {/* Core Features list */}
              <div className="mb-10">
                <h2 className="font-headline font-extrabold text-lg text-white uppercase tracking-wider mb-5 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-vintage-gold" /> Deliverables & Frameworks
                </h2>
                <div className="flex flex-col gap-4">
                  {marketing.features.map((feat, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-4 h-4 text-vintage-gold mt-1 shrink-0" />
                      <span className="font-body text-zinc-300 text-xs sm:text-sm leading-normal">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack list */}
              <div>
                <h2 className="font-headline font-extrabold text-lg text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-vintage-gold" /> Integration & Code Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {marketing.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/5 font-body text-xs font-semibold text-zinc-400 hover:border-vintage-gold/30 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Pricing / CTA Card */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-8 rounded-3xl bg-zinc-950/40 border border-white/10 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-vintage-gold/5 rounded-full blur-3xl pointer-events-none" />

                <span className="text-[10px] font-body font-bold text-vintage-gold tracking-widest uppercase block mb-1">
                  STARTING FROM
                </span>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="font-headline font-extrabold text-3xl sm:text-4xl text-white">
                    {formatPrice(marketing.pricing.price, currency)}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 mb-6">
                  <span className="font-body font-bold text-[10px] text-zinc-400 uppercase block mb-1">
                    DELIVERY SPEC
                  </span>
                  <span className="font-headline text-xs text-white block mb-2 font-bold uppercase">
                    {marketing.pricing.focus}
                  </span>
                  <div className="flex flex-col gap-1.5 mt-2 border-t border-white/5 pt-2">
                    {marketing.pricing.features.map((item, idx) => (
                      <span key={idx} className="font-body text-[10px] text-zinc-500 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-vintage-gold" /> {item}
                      </span>
                    ))}
                  </div>
                </div>
                <Link 
                  to="/contact" 
                  className="btn-gold-solid w-full py-4 text-center justify-center text-xs font-bold uppercase tracking-widest block"
                >
                  START YOUR PROJECT ➲
                </Link>
                <span className="text-[9px] font-body text-zinc-500 text-center block mt-3 leading-normal">
                  All SEO campaigns adhere to clean white-hat practices. Code optimizations are permanent and self-hosted.
                </span>
              </motion.div>
            </div>
          </div>

          {/* 5-Step Process Section */}
          <div className="border-t border-white/10 pt-16 mt-16 text-left">
            <div className="inline-flex items-center gap-2 border border-vintage-gold/30 bg-zinc-900/60 px-4 py-2 text-[10px] sm:text-xs font-body font-bold uppercase tracking-[0.2em] text-vintage-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-vintage-gold animate-pulse"></span>
              PRODUCTION PIPELINE
            </div>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight leading-none mb-4">
              Our 5-Stage Engineering Workflow
            </h2>
            <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-2xl mb-12 leading-relaxed">
              We execute builds using strict operational phases to ensure zero bugs, sub-second compilation, and DHA/GDPR security compliance.
            </p>

            <div className="relative border-l border-white/10 pl-6 sm:pl-8 space-y-12 max-w-3xl ml-4">
              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 bg-zinc-950 border border-vintage-gold text-vintage-gold w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-headline font-extrabold text-[10px] sm:text-xs">
                  01
                </span>
                <h3 className="font-headline font-extrabold text-base sm:text-lg text-white uppercase mb-2">
                  System Architecture & Blueprint
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
                  We define all database schemas (ERDs), design secure user authentication frameworks, draft REST API endpoints, and plan complete delivery sprints.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 bg-zinc-950 border border-vintage-gold text-vintage-gold w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-headline font-extrabold text-[10px] sm:text-xs">
                  02
                </span>
                <h3 className="font-headline font-extrabold text-base sm:text-lg text-white uppercase mb-2">
                  Pixel-Perfect Figma UX/UI Design
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
                  Our UI/UX specialists craft high-fidelity visual mockups in Figma based on your company style guides, optimizing for premium typography and layout prestige.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 bg-zinc-950 border border-vintage-gold text-vintage-gold w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-headline font-extrabold text-[10px] sm:text-xs">
                  03
                </span>
                <h3 className="font-headline font-extrabold text-base sm:text-lg text-white uppercase mb-2">
                  Hand-Written React & Backend Code
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
                  Our engineers write lightweight, responsive React code. The backend runs on high-performance serverless Node.js functions connected to secure PostgreSQL tables.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 bg-zinc-950 border border-vintage-gold text-vintage-gold w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-headline font-extrabold text-[10px] sm:text-xs">
                  04
                </span>
                <h3 className="font-headline font-extrabold text-base sm:text-lg text-white uppercase mb-2">
                  Strict Security Audit & QA
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
                  We perform rigorous cross-device responsiveness checks and check SQL vulnerability scripts to ensure DHA-level protection.
                </p>
              </div>

              <div className="relative">
                <span className="absolute -left-[35px] sm:-left-[43px] top-1 bg-zinc-950 border border-vintage-gold text-vintage-gold w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-headline font-extrabold text-[10px] sm:text-xs">
                  05
                </span>
                <h3 className="font-headline font-extrabold text-base sm:text-lg text-white uppercase mb-2">
                  Netlify Edge Deployment & Hypercare
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm leading-relaxed font-semibold">
                  We launch the code on Netlify Edge networks for sub-second load times globally, followed by 30 days of free Hypercare support and direct tech handover.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Matrix */}
          <div className="border-t border-white/10 pt-16 mt-16 text-left">
            <div className="inline-flex items-center gap-2 border border-vintage-gold/30 bg-zinc-900/60 px-4 py-2 text-[10px] sm:text-xs font-body font-bold uppercase tracking-[0.2em] text-vintage-gold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-vintage-gold"></span>
              BENCHMARK COMPARISON
            </div>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight leading-none mb-4">
              Custom Coded React vs. Out-of-the-Box Templates
            </h2>
            <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-2xl mb-8 leading-relaxed">
              Pre-built templates (like WordPress or Shopify) appear fast at first, but fail under high traffic, lack relational security, and lock you into monthly licensing fees.
            </p>

            <div className="overflow-x-auto border border-white/5 rounded-2xl bg-zinc-950/20">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-white/10 bg-zinc-950/40">
                    <th className="p-4 sm:p-5 font-headline font-extrabold text-xs text-zinc-400 uppercase tracking-wider">Metrics</th>
                    <th className="p-4 sm:p-5 font-headline font-extrabold text-xs text-vintage-gold uppercase tracking-wider bg-vintage-gold/5">CodeHTML Custom</th>
                    <th className="p-4 sm:p-5 font-headline font-extrabold text-xs text-zinc-400 uppercase tracking-wider">WordPress / Templates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-body text-xs sm:text-sm font-semibold">
                  <tr>
                    <td className="p-4 sm:p-5 text-white">Load Speed (FCP)</td>
                    <td className="p-4 sm:p-5 text-vintage-gold bg-vintage-gold/5">Sub-0.8 seconds (Compiled HTML)</td>
                    <td className="p-4 sm:p-5 text-zinc-500">3.5+ seconds (heavy PHP databases)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white">Monthly Platform Fees</td>
                    <td className="p-4 sm:p-5 text-vintage-gold bg-vintage-gold/5">{formatPrice("AED 0", currency)} (Hosted on free Edge platforms)</td>
                    <td className="p-4 sm:p-5 text-zinc-500">{formatPrice("AED 500", currency)}+ (mandatory plugin license keys)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white">Database Row-Level Security</td>
                    <td className="p-4 sm:p-5 text-vintage-gold bg-vintage-gold/5">Secure OAuth & relational PostgreSQL encryption</td>
                    <td className="p-4 sm:p-5 text-zinc-500">Highly vulnerable to generic plugins SQL exploits</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white">Code & Asset Ownership</td>
                    <td className="p-4 sm:p-5 text-vintage-gold bg-vintage-gold/5">100% intellectual property transfer</td>
                    <td className="p-4 sm:p-5 text-zinc-500">0% (forever locked into builder platforms)</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 text-white">Unlimited Scaling</td>
                    <td className="p-4 sm:p-5 text-vintage-gold bg-vintage-gold/5">Handles millions of users via serverless routes</td>
                    <td className="p-4 sm:p-5 text-zinc-500">Server crashes under sudden traffic spikes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>



          {/* FAQs Accordion */}
          {marketing.faqs && marketing.faqs.length > 0 && (
            <div className="border-t border-white/10 pt-16">
              <h2 className="font-headline font-extrabold text-2xl text-white uppercase tracking-wider mb-8 flex items-center gap-2.5">
                <HelpCircle className="w-6 h-6 text-vintage-gold" /> Common Inquiries
              </h2>
              <div className="flex flex-col gap-4">
                {marketing.faqs.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className="border border-white/5 rounded-2xl bg-zinc-950/10 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 hover:bg-zinc-900/10 transition-colors"
                    >
                      <span className="font-headline font-extrabold text-sm sm:text-base text-white hover:text-vintage-gold transition-colors leading-snug">
                        {faq.q}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-300 ${
                          openFaq === idx ? 'rotate-180 text-vintage-gold' : ''
                        }`} 
                      />
                    </button>
                    <AnimatePresence>
                      {openFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 sm:px-6 sm:pb-7 font-body text-zinc-400 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-4 bg-zinc-950/20">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GetMoreCustomersDetail;
