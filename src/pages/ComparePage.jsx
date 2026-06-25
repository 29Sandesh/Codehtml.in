import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { COMPARISON_PAGES } from '../../data/comparisonPages';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, XCircle, ShieldCheck, ArrowLeft, MessageSquare } from 'lucide-react';

const getNewServiceLink = (slug) => {
  const mapping = {
    'custom-website-development': '/services/corporate-websites',
    'website-development': '/services/corporate-websites',
    'web-application-development': '/services/custom-web-applications',
    'web-app-development': '/services/custom-web-applications',
    'saas-development': '/products/erp-system',
    'mobile-app-development': '/services/mobile-apps',
    'ai-automation': '/ai-solutions/ai-voice-chatbots',
    'startup-launch-services': '/services/digital-transformation-strategy',
    'growth-digital-presence': '/get-more-customers/website-seo',
  };
  return mapping[slug] || '/services';
};

const ComparePage = () => {
  const { topic } = useParams();
  const [pageData, setPageData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the comparison page data based on route param slug
    const found = COMPARISON_PAGES.find(p => p.slug === topic);
    setPageData(found || null);
    setLoading(false);
  }, [topic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-vintage-gold">
        <div className="animate-pulse uppercase tracking-[0.2em] font-headline font-bold">LOADING COMPARISON...</div>
      </div>
    );
  }

  if (!pageData) {
    return <Navigate to="/blog" replace />;
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden relative pt-24 pb-16">
      <SEO 
        title={pageData.metaTitle}
        description={pageData.metaDesc}
        keywords={`${pageData.title} comparison, ${pageData.slug}`}
        faqList={pageData.faqs}
      />

      {/* Decorative ambient spots */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 text-left">
        
        {/* Back navigation */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-vintage-gold transition-colors text-xs font-headline font-bold uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Intel Blog
        </Link>

        {/* H1 Title */}
        <div className="mb-16">
          <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-4 block">B2B DEBATE & INTEL</span>
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 uppercase">
            {pageData.h1}
          </h1>
          <p className="font-body text-zinc-400 text-sm md:text-lg max-w-3xl leading-relaxed border-l border-vintage-gold pl-4 md:pl-6">
            Compare options side-by-side. Analyze performance, pricing model, scaling capabilities, and long-term tech assets ownership to make the best decision for your business.
          </p>
        </div>

        {/* Side-by-Side Pros/Cons Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Option A Card */}
          <div className="bg-zinc-950/40 border border-white/5 p-8 rounded-3xl flex flex-col justify-between">
            <div>
              <span className="font-body font-bold text-zinc-600 text-[10px] uppercase mb-4 block">OPTION A</span>
              <h3 className="font-headline font-extrabold text-2xl text-white mb-6 uppercase tracking-tight">{pageData.optionA.name}</h3>
              
              <div className="mb-6">
                <h4 className="font-headline font-bold text-xs text-green-500 uppercase tracking-wider mb-3">Key Advantages:</h4>
                <ul className="space-y-2">
                  {pageData.optionA.pros.map((pro, idx) => (
                    <li key={idx} className="font-body text-xs text-zinc-300 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-headline font-bold text-xs text-red-500 uppercase tracking-wider mb-3">Bottlenecks & Risks:</h4>
                <ul className="space-y-2">
                  {pageData.optionA.cons.map((con, idx) => (
                    <li key={idx} className="font-body text-xs text-zinc-400 font-medium flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500/60 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-6 mt-6">
              <span className="font-body font-bold text-zinc-500 text-[9px] uppercase tracking-wider block mb-1">BEST FOR:</span>
              <p className="font-body text-xs text-zinc-300 font-semibold">{pageData.optionA.bestFor}</p>
            </div>
          </div>

          {/* Option B Card */}
          <div className="bg-zinc-950/40 border border-vintage-gold p-8 rounded-3xl flex flex-col justify-between relative shadow-lg shadow-vintage-gold/5">
            <span className="absolute -top-3 left-6 bg-vintage-gold text-black font-headline font-bold text-[9px] tracking-widest px-3 py-1 rounded-full uppercase">CODEHTML FOCUS</span>
            <div>
              <span className="font-body font-bold text-vintage-gold/60 text-[10px] uppercase mb-4 block">OPTION B</span>
              <h3 className="font-headline font-extrabold text-2xl text-white mb-6 uppercase tracking-tight">{pageData.optionB.name}</h3>
              
              <div className="mb-6">
                <h4 className="font-headline font-bold text-xs text-green-500 uppercase tracking-wider mb-3">Key Advantages:</h4>
                <ul className="space-y-2">
                  {pageData.optionB.pros.map((pro, idx) => (
                    <li key={idx} className="font-body text-xs text-zinc-300 font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="font-headline font-bold text-xs text-red-500/80 uppercase tracking-wider mb-3">Bottlenecks & Risks:</h4>
                <ul className="space-y-2">
                  {pageData.optionB.cons.map((con, idx) => (
                    <li key={idx} className="font-body text-xs text-zinc-400 font-medium flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500/40 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/5 pt-6 mt-6">
              <span className="font-body font-bold text-zinc-500 text-[9px] uppercase tracking-wider block mb-1">BEST FOR:</span>
              <p className="font-body text-xs text-zinc-300 font-semibold">{pageData.optionB.bestFor}</p>
            </div>
          </div>

        </div>

        {/* Feature Comparison Table */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase">
            Feature Comparison Matrix
          </h2>
          
          <div className="border border-white/5 rounded-3xl overflow-hidden bg-zinc-950/20 shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-950 border-b border-white/10">
                  <th className="p-6 font-headline font-bold text-sm text-zinc-500 uppercase">Comparison Metric</th>
                  <th className="p-6 font-headline font-bold text-sm text-zinc-400 uppercase">{pageData.optionA.name}</th>
                  <th className="p-6 font-headline font-bold text-sm text-vintage-gold uppercase">{pageData.optionB.name}</th>
                </tr>
              </thead>
              <tbody>
                {pageData.features.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-6 font-headline font-bold text-sm text-white uppercase">{row.feature}</td>
                    <td className="p-6 font-body text-xs text-zinc-400 leading-relaxed font-semibold">{row.a}</td>
                    <td className="p-6 font-body text-xs text-zinc-300 leading-relaxed font-semibold">{row.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Verdict Callout */}
        <section className="mb-16 bg-zinc-950/60 border border-white/5 p-8 rounded-3xl flex flex-col md:flex-row gap-6 items-center">
          <ShieldCheck className="w-12 h-12 text-vintage-gold flex-shrink-0" />
          <div>
            <h3 className="font-headline font-bold text-lg text-white uppercase tracking-tight mb-2">CodeHTML Architect Verdict</h3>
            <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
              {pageData.verdict}
            </p>
          </div>
        </section>

        {/* FAQs list */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-vintage-gold" />
            Comparison FAQs
          </h2>
          <div className="max-w-4xl mx-auto space-y-3">
            {pageData.faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className="bg-zinc-950/40 border border-white/5 rounded-2xl overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <h2 className="font-headline font-bold text-sm md:text-base text-white uppercase tracking-tight pr-4">
                      {faq.q}
                    </h2>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-vintage-gold flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />}
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 border-t border-white/5">
                      <p className="font-body text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="p-8 md:p-12 bg-zinc-950/60 border border-white/5 rounded-3xl text-center max-w-4xl mx-auto">
          <MessageSquare className="w-10 h-10 text-vintage-gold mx-auto mb-4" />
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-4 uppercase">
            Still Unsure Which Option Fits?
          </h2>
          <p className="font-body text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
            Let our senior developers review your tech requirements brief and advise on database architecture, speed checkpoints, and cloud hosting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={getNewServiceLink(pageData.relatedService)}
              className="px-8 py-4 bg-white text-black font-headline font-bold uppercase rounded-xl transition-all hover:bg-zinc-200 text-center w-full sm:w-auto"
            >
              Explore Solutions ➲
            </Link>
            <a
              href="https://wa.me/919303228082"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/10 font-headline font-bold uppercase rounded-xl transition-all hover:bg-zinc-950 text-center w-full sm:w-auto text-white"
            >
              WhatsApp Developers
            </a>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ComparePage;
