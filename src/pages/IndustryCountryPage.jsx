import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { INDUSTRY_PAGES } from '../../data/industryPages';
import { HelpCircle, ChevronDown, ChevronUp, CheckCircle2, ShieldCheck, ArrowLeft, MessageSquare, Briefcase } from 'lucide-react';

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

const IndustryCountryPage = () => {
  const { industry, country } = useParams();
  const [pageData, setPageData] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const slug = `${industry}-${country}`;
    const found = INDUSTRY_PAGES.find(p => p.slug === slug);
    setPageData(found || null);
    setLoading(false);
  }, [industry, country]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-vintage-gold">
        <div className="animate-pulse uppercase tracking-[0.2em] font-headline font-bold">LOADING INDUSTRY PROFILE...</div>
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
        keywords={`${pageData.industryName} in ${pageData.countryName}, ${pageData.industryName} custom software`}
        faqList={pageData.faqs}
      />

      {/* Decorative ambient spots */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-vintage-gold/25 bg-vintage-gold/5 text-vintage-gold font-headline font-bold text-[10px] tracking-widest uppercase mb-4">
            <Briefcase className="w-3.5 h-3.5" />
            Specialized B2B Industry Workflows
          </div>
          <h1 className="font-headline font-extrabold text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 uppercase">
            {pageData.h1}
          </h1>
          <p className="font-body text-zinc-400 text-sm md:text-lg max-w-3xl leading-relaxed border-l border-vintage-gold pl-4 md:pl-6">
            {pageData.intro}
          </p>
        </div>

        {/* Integration channels & workflows */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase">
            Targeted Tech Workflows
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageData.workflows.map((flow, idx) => (
              <div key={idx} className="bg-zinc-950/40 border border-white/5 p-6 rounded-2xl flex items-start gap-4">
                <span className="text-vintage-gold font-headline font-bold mt-0.5">➲</span>
                <p className="font-body text-xs md:text-sm text-zinc-300 font-semibold leading-relaxed">{flow}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="font-headline font-extrabold text-2xl md:text-4xl text-white mb-8 uppercase text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-vintage-gold" />
            Industry Compliance FAQs
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
            Deploy Custom {pageData.industryName} Systems
          </h2>
          <p className="font-body text-zinc-400 text-sm md:text-base max-w-lg mx-auto mb-8 font-medium">
            Let us design a high-performance custom coded portal or SaaS engine built to rank on search and comply with local requirements in {pageData.countryName}.
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

export default IndustryCountryPage;
