import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const footerSections = [
  {
    id: 'products',
    title: 'PRODUCTS',
    links: [
      { name: "Customer Portal", slug: "customer-portal" },
      { name: "Supplier Portal", slug: "supplier-portal" },
      { name: "Employee Portal", slug: "employee-portal" },
      { name: "Partner Portal", slug: "partner-portal" },
      { name: "ERP System", slug: "erp-system" },
      { name: "CRM System", slug: "crm-system" },
      { name: "Hospital System", slug: "hospital-system" },
      { name: "School System", slug: "school-system" },
      { name: "Fleet Management", slug: "fleet-management" },
      { name: "Online Store", slug: "online-store" },
      { name: "B2B Store", slug: "b2b-store" },
      { name: "Booking System", slug: "booking-system" },
      { name: "POS System", slug: "pos-system" },
      { name: "Multi-Vendor Marketplace", slug: "multi-vendor-marketplace" }
    ],
    getPath: (slug) => `/products/${slug}`
  },
  {
    id: 'ai-solutions',
    title: 'AI SOLUTIONS',
    links: [
      { name: "AI Voice & Chatbots", slug: "ai-voice-chatbots" },
      { name: "AI Consultancy", slug: "ai-consultancy" },
      { name: "AI Search Engine", slug: "ai-search" },
      { name: "AI Sales Agent", slug: "ai-sales-agent" },
      { name: "Agents & Processes", slug: "agents-and-processes" },
      { name: "AI Support Agent", slug: "ai-customer-support-agent" },
      { name: "Revenue Automation", slug: "revenue-automation" },
      { name: "Client Control Portal", slug: "client-control" },
      { name: "Finance Automation", slug: "finance-and-structure" }
    ],
    getPath: (slug) => `/ai-solutions/${slug}`
  },
  {
    id: 'acquisition',
    title: 'ACQUISITION',
    links: [
      { name: "AEO Optimization", slug: "aeo-optimization" },
      { name: "Local SEO Solutions", slug: "local-seo" },
      { name: "Social Lead Generation", slug: "social-media-lead-generation" },
      { name: "Automated Funnels", slug: "automated-funnels" },
      { name: "PPC Performance", slug: "ppc-performance-marketing" },
      { name: "Email & SMS Marketing", slug: "email-sms-marketing-automation" },
      { name: "Conversion Rate Opt", slug: "conversion-rate-optimization" },
      { name: "B2B Leads Database", slug: "b2b-leads-database-scraping" },
      { name: "WhatsApp Automation", slug: "whatsapp-marketing-automation" },
      { name: "Interactive Calculators", slug: "interactive-roi-calculators" },
      { name: "Analytics Dashboards", slug: "marketing-analytics-dashboards" },
      { name: "Reputation Manager", slug: "reputation-management-automation" }
    ],
    getPath: (slug) => `/get-more-customers/${slug}`
  },
  {
    id: 'services',
    title: 'SERVICES',
    links: [
      { name: "Corporate Websites", slug: "corporate-websites" },
      { name: "Custom Web Apps", slug: "custom-web-applications" },
      { name: "Responsive Web Design", slug: "responsive-design" },
      { name: "WordPress & CMS", slug: "wordpress-and-cms" },
      { name: "Custom E-Commerce", slug: "custom-e-commerce" },
      { name: "Shopify & Magento", slug: "shopify-and-magento" },
      { name: "Headless Commerce", slug: "headless-commerce" },
      { name: "iOS Native Apps", slug: "ios-native-apps" },
      { name: "Android Native Apps", slug: "android-native-apps" },
      { name: "Cross-Platform Apps", slug: "cross-platform-apps" },
      { name: "Progressive Web Apps", slug: "progressive-web-apps" },
      { name: "Digital Strategy", slug: "digital-transformation-strategy" },
      { name: "AI Readiness Audit", slug: "ai-readiness-assessment" },
      { name: "Technology Roadmaps", slug: "technology-roadmap-development" }
    ],
    getPath: (slug) => `/services/${slug}`
  },
  {
    id: 'company',
    title: 'COMPANY',
    links: [
      { name: 'Our Profile', slug: '/about' },
      { name: 'Projects / Work', slug: '/portfolio' },
      { name: 'Answers & FAQ', slug: '/faq' },
      { name: 'Intel Blog', slug: '/blog' },
      { name: 'Resources Hub', slug: '/resources' },
      { name: 'Partner Program', slug: '/partner', highlight: true }
    ],
    getPath: (slug) => slug
  },
  {
    id: 'connect-legal',
    title: 'CONNECT',
    links: [
      { name: "📧 Contact@Codehtml.in", slug: "mailto:Contact@Codehtml.in", isExternal: true },
      { name: "🔗 LinkedIn Connect", slug: "https://www.linkedin.com/company/codehtml", isExternal: true },
      { name: 'Privacy Policy', slug: '/privacy-policy' },
      { name: 'Terms & Conditions', slug: '/terms-conditions' },
      { name: 'Refund Policy', slug: '/refund-policy' }
    ],
    getPath: (slug) => slug
  }
];

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (sectionId) => {
    setOpenSection(prev => prev === sectionId ? null : sectionId);
  };

  const [callbackData, setCallbackData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [callbackStatus, setCallbackStatus] = useState('idle');

  const handleCallbackChange = (e) => {
    setCallbackData({
      ...callbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleCallbackSubmit = async (e) => {
    e.preventDefault();
    setCallbackStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '91c45bc7-1cb5-43ac-aa1f-79627a8c7f04', // Web3Forms access key
          subject: `Quick Callback Request: ${callbackData.name}`,
          name: callbackData.name,
          phone: callbackData.phone,
          email: callbackData.email,
          message: `Client requested a quick callback. Name: ${callbackData.name}, Phone: +91 ${callbackData.phone}, Email: ${callbackData.email}`
        })
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setCallbackStatus('success');
        setCallbackData({ name: '', phone: '', email: '' });
      } else {
        setCallbackStatus('error');
      }
    } catch (error) {
      console.error('Callback form error:', error);
      setCallbackStatus('error');
    }
  };

  return (
    <footer className="w-full bg-[#09090b] border-t border-vintage-gold/20 text-vintage-gold/80 px-6 md:px-12 pt-12 pb-6 mt-auto relative overflow-hidden">
      {/* Decorative Large Background Typography */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none select-none overflow-hidden">
        <span className="font-headline font-black text-[15rem] md:text-[25rem] text-vintage-gold absolute -right-10 -bottom-10 leading-none">
          CODEHTML
        </span>
      </div>

      {/* Get a Quick Call Back Form Section */}
      <div className="border-b border-white/10 pb-8 mb-10 text-left relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-force-white text-2xl sm:text-3xl">✓</span>
            <h3 className="text-force-white font-headline font-extrabold text-xl sm:text-2xl uppercase tracking-tight">
              Get a Quick Call Back
            </h3>
          </div>
          
          <form onSubmit={handleCallbackSubmit} className="flex flex-col sm:flex-row flex-grow w-full lg:w-auto items-stretch sm:items-center gap-3 max-w-4xl">
            <input 
              type="text" 
              name="name"
              placeholder="Your name"
              required
              value={callbackData.name}
              onChange={handleCallbackChange}
              className="bg-zinc-950 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 flex-grow rounded-none"
            />
            <input 
              type="tel" 
              name="phone"
              placeholder="+91 Phone"
              required
              value={callbackData.phone}
              onChange={handleCallbackChange}
              className="bg-zinc-950 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 flex-grow rounded-none"
            />
            <input 
              type="email" 
              name="email"
              placeholder="Email address"
              required
              value={callbackData.email}
              onChange={handleCallbackChange}
              className="bg-zinc-950 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 flex-grow rounded-none"
            />
            <button 
              type="submit"
              disabled={callbackStatus === 'submitting'}
              className="bg-vintage-gold hover:bg-white text-black font-body font-bold text-xs uppercase tracking-widest px-6 py-3 transition-all flex-shrink-0 disabled:opacity-50 rounded-none cursor-pointer"
            >
              {callbackStatus === 'submitting' ? 'Enquiring...' : 'Enquire Now ➲'}
            </button>
          </form>
        </div>
        {callbackStatus === 'success' && (
          <p className="text-[10px] text-emerald-400 font-body uppercase font-bold tracking-widest mt-3">✓ Callback request transmitted. We will contact you shortly.</p>
        )}
        {callbackStatus === 'error' && (
          <p className="text-[10px] text-red-500 font-body uppercase font-bold tracking-widest mt-3">Transmission failed. Please email Contact@Codehtml.in directly.</p>
        )}
      </div>

      {/* Detailed Columns Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12 mb-12 relative z-10 text-left">
        {footerSections.map((section) => {
          const isOpen = openSection === section.id;
          return (
            <div key={section.id} className="flex flex-col gap-4">
              <div 
                onClick={() => toggleSection(section.id)}
                className="flex justify-between items-center border-b border-white/5 pb-2 cursor-pointer md:cursor-default"
              >
                <span className="font-body font-bold text-[10px] text-vintage-gold/60 tracking-[0.25em] uppercase">
                  {section.title}
                </span>
                <ChevronDown 
                  className={`w-3.5 h-3.5 text-vintage-gold/60 transition-transform duration-300 md:hidden ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              
              {/* Desktop view */}
              <div className="hidden md:flex flex-col gap-2">
                {section.links.map((link, lIdx) => {
                  if (link.isExternal) {
                    return (
                      <a 
                        key={lIdx}
                        href={link.slug} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-body font-semibold text-[10px] text-[#a1a1aa] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 w-fit uppercase"
                      >
                        {link.name}
                      </a>
                    );
                  }
                  
                  // For Connect column subheadings
                  const isLegalHeader = section.id === 'connect-legal' && lIdx === 2;
                  
                  return (
                    <React.Fragment key={lIdx}>
                      {isLegalHeader && (
                        <span className="font-body font-bold text-[10px] text-vintage-gold/60 tracking-[0.25em] uppercase border-b border-white/5 pb-2 mt-4 mb-2">
                          LEGAL
                        </span>
                      )}
                      <Link
                        className={`font-body font-semibold text-[10px] hover:text-[#ffffff] transition-colors inline-block w-fit uppercase ${
                          link.highlight ? 'text-vintage-gold font-bold underline decoration-vintage-gold/30' : 'text-[#a1a1aa]'
                        }`}
                        to={section.getPath(link.slug)}
                      >
                        {link.name}
                      </Link>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Mobile view (Collapsable) */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="md:hidden overflow-hidden flex flex-col gap-2"
                  >
                    {section.links.map((link, lIdx) => {
                      if (link.isExternal) {
                        return (
                          <a 
                            key={lIdx}
                            href={link.slug} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="font-body font-semibold text-[10px] text-[#a1a1aa] hover:text-[#ffffff] transition-colors flex items-center gap-1.5 w-fit uppercase py-1"
                          >
                            {link.name}
                          </a>
                        );
                      }
                      
                      const isLegalHeader = section.id === 'connect-legal' && lIdx === 2;
                      
                      return (
                        <React.Fragment key={lIdx}>
                          {isLegalHeader && (
                            <span className="font-body font-bold text-[10px] text-vintage-gold/60 tracking-[0.25em] uppercase border-b border-white/5 pb-1 mt-3 mb-1">
                              LEGAL
                            </span>
                          )}
                          <Link
                            className={`font-body font-semibold text-[10px] hover:text-[#ffffff] transition-colors inline-block w-fit uppercase py-1 ${
                              link.highlight ? 'text-vintage-gold font-bold underline decoration-vintage-gold/30' : 'text-[#a1a1aa]'
                            }`}
                            to={section.getPath(link.slug)}
                          >
                            {link.name}
                          </Link>
                        </React.Fragment>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Footer Bottom Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 border-t border-vintage-gold/10 pt-6 text-xs text-vintage-gold/40 font-body">
        <p className="font-body font-bold text-[9px] md:text-[10px] tracking-[0.15em] uppercase text-center md:text-left">
          © {new Date().getFullYear()} CODEHTML // ALL SYSTEMS OPERATIONAL. //{' '}
          <a
            href="https://www.linkedin.com/company/codehtml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#ffffff] transition-colors font-black text-vintage-gold/60"
          >
            BY CODEHTML
          </a>
        </p>
        <div className="flex gap-4">
          <span className="font-body font-bold text-[9px] tracking-[0.1em] uppercase">SSL SECURED</span>
          <a
            href="https://www.linkedin.com/company/codehtml"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-bold text-[9px] tracking-[0.1em] uppercase hover:text-[#ffffff] transition-colors"
          >
            LINKEDIN CONNECT
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
