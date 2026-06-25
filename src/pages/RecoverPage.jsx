import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { RECOVERY_PAGES } from '../../data/nichePages';
import { AlertOctagon, CheckCircle2, ShieldAlert, ArrowLeft, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

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

const RecoverPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = RECOVERY_PAGES.find(p => p.slug === slug);
    setPageData(found || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-vintage-gold">
        <div className="animate-pulse uppercase tracking-[0.2em] font-headline font-bold">LOADING RESCUE PLAN...</div>
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
        keywords={`${pageData.title}, project rescue, code audit, rebuild`}
        faqList={pageData.faqs}
      />

      {/* Decorative ambient spots */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="px-6 md:px-12 max-w-[1600px] mx-auto relative z-10 text-left">
        
        {/* Back navigation */}
        <Link 
          to="/blog"
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-vintage-gold transition-colors text-xs font-headline font-bold uppercase tracking-wider mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Intel Blog
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/5 text-red-400 font-headline font-bold text-[10px] tracking-widest uppercase mb-4">
            <ShieldAlert className="w-3.5 h-3.5" />
            Project Rescue Protocols Active
          </div>
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 uppercase">
            {pageData.h1}
          </h1>
          <p className="font-headline font-bold text-vintage-gold text-sm sm:text-lg mb-4 uppercase tracking-wider">
            {pageData.subtitle}
          </p>
          <p className="font-body text-zinc-400 text-sm md:text-lg max-w-3xl leading-relaxed border-l border-vintage-gold pl-4 md:pl-6">
            {pageData.introduction}
          </p>
        </div>

        {/* Bottlenecks / Pain points */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase">
            Critical Risks We Take Over
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.problemPoints.map((point, idx) => (
              <div key={idx} className="bg-zinc-950/40 border border-red-500/10 p-6 rounded-2xl flex items-start gap-4">
                <AlertOctagon className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-zinc-300 font-medium leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rescue Steps Checklist */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase">
            CodeHTML Recovery Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pageData.recoverySteps.map((step, idx) => (
              <div key={idx} className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl flex flex-col justify-between hover:border-vintage-gold/30 transition-colors">
                <div>
                  <h3 className="font-headline font-extrabold text-lg text-vintage-gold mb-3 uppercase tracking-tight">
                    {step.step}
                  </h3>
                  <p className="font-body text-xs text-zinc-400 leading-relaxed font-semibold">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase text-center">
            Rescue & Recovery FAQs
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

        {/* Call To Action */}
        <section className="p-8 md:p-12 bg-zinc-950/60 border border-white/5 rounded-3xl text-center max-w-4xl mx-auto">
          <MessageSquare className="w-10 h-10 text-vintage-gold mx-auto mb-4" />
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-4 uppercase">
            Get a Free Technical Audit
          </h2>
          <p className="font-body text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
            Contact us today. Our senior developers will review your server configurations and code structure to map a recovery plan.
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

export default RecoverPage;
