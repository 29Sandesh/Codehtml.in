import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const productsMenu = [
  {
    title: "Business Portals",
    links: [
      { name: "Customer Portal (Extranet)", path: "/products/customer-portal" },
      { name: "Supplier Portal (Extranet)", path: "/products/supplier-portal" },
      { name: "Employee Portal (Intranet)", path: "/products/employee-portal" },
      { name: "Partner Portal (Extranet)", path: "/products/partner-portal" }
    ]
  },
  {
    title: "Business Management Systems",
    links: [
      { name: "ERP System", path: "/products/erp-system" },
      { name: "CRM System", path: "/products/crm-system" },
      { name: "Hospital System", path: "/products/hospital-system" },
      { name: "School System", path: "/products/school-system" },
      { name: "Fleet Management", path: "/products/fleet-management" },
      { name: "Document Management", path: "/products/document-management" }
    ]
  },
  {
    title: "Online Stores & Marketplaces",
    links: [
      { name: "Online Store", path: "/products/online-store" },
      { name: "Multi-Vendor Marketplace", path: "/products/multi-vendor-marketplace" },
      { name: "B2B Store", path: "/products/b2b-store" },
      { name: "Booking System", path: "/products/booking-system" },
      { name: "POS System", path: "/products/pos-system" }
    ]
  }
];

const aiSolutionsMenu = [
  {
    title: "Profit Growth",
    links: [
      { name: "AI Sales Agent", path: "/ai-solutions/ai-sales-agent" },
      { name: "Revenue Automation", path: "/ai-solutions/revenue-automation" },
      { name: "AI Search & Lead Generation", path: "/ai-solutions/ai-search" },
      { name: "AI Voice & Chatbots", path: "/ai-solutions/ai-voice-chatbots" },
      { name: "AI Consultancy", path: "/ai-solutions/ai-consultancy" }
    ]
  },
  {
    title: "Automate Operations",
    links: [
      { name: "AI Customer Support Agent", path: "/ai-solutions/ai-customer-support-agent" },
      { name: "Agents & Workflow Automation", path: "/ai-solutions/agents-and-processes" },
      { name: "Client Portals & CRM", path: "/ai-solutions/client-control" },
      { name: "Finance & Business Intelligence", path: "/ai-solutions/finance-and-structure" }
    ]
  }
];

const getMoreCustomersMenu = [
  {
    title: "Search Intelligence",
    links: [
      { name: "GO Navigator", path: "/get-more-customers/go-navigator" },
      { name: "Website SEO", path: "/get-more-customers/website-seo" },
      { name: "Local SEO", path: "/get-more-customers/local-seo" },
      { name: "E-commerce SEO", path: "/get-more-customers/ecommerce-seo" },
      { name: "Email & SMS", path: "/get-more-customers/email-and-sms" }
    ]
  },
  {
    title: "Conversion & Growth",
    links: [
      { name: "AEO (Answer Engine Optimization)", path: "/get-more-customers/aeo" },
      { name: "AI-Friendly Websites", path: "/get-more-customers/ai-friendly-websites" },
      { name: "Conversion Optimization", path: "/get-more-customers/conversion-optimization" },
      { name: "Smart Content Services", path: "/get-more-customers/smart-content-services" },
      { name: "Smart Pop-ups", path: "/get-more-customers/smart-popups" },
      { name: "Lead Capture Forms", path: "/get-more-customers/lead-capture-forms" }
    ]
  },
  {
    title: "Reporting & Visibility",
    links: [
      { name: "Sales Dashboards", path: "/get-more-customers/sales-dashboards" },
      { name: "Smart Reports", path: "/get-more-customers/smart-reports" },
      { name: "Performance Analytics", path: "/get-more-customers/performance-analytics" }
    ]
  }
];

const servicesMenu = [
  {
    title: "Websites & Digital Platforms",
    links: [
      { name: "Corporate Websites", path: "/services/corporate-websites" },
      { name: "Custom Web Applications", path: "/services/custom-web-applications" },
      { name: "Responsive Design", path: "/services/responsive-design" },
      { name: "WordPress & CMS", path: "/services/wordpress-and-cms" },
      { name: "Payment Integration", path: "/services/payment-integration" },
      { name: "Shipping Integration", path: "/services/shipping-integration" }
    ]
  },
  {
    title: "Mobile Apps",
    links: [
      { name: "Mobile Apps", path: "/services/mobile-apps" },
      { name: "Hybrid Apps", path: "/services/hybrid-apps" },
      { name: "Progressive Web Apps", path: "/services/progressive-web-apps" },
      { name: "Cross-Platform", path: "/services/cross-platform" }
    ]
  },
  {
    title: "Strategic Consulting",
    links: [
      { name: "Digital Transformation Strategy", path: "/services/digital-transformation-strategy" },
      { name: "AI Readiness Assessment", path: "/services/ai-readiness-assessment" },
      { name: "Technology Roadmap Development", path: "/services/technology-roadmap-development" },
      { name: "Business Process Optimization", path: "/services/business-process-optimization" }
    ]
  }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [mobileProductsOpen, setMobileProductsOpen] = React.useState(false);
  const [mobileAiSolutionsOpen, setMobileAiSolutionsOpen] = React.useState(false);
  const [mobileGetMoreCustomersOpen, setMobileGetMoreCustomersOpen] = React.useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = React.useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (id === 'home') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
      return;
    }

    if (location.pathname === '/' && id) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 80,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', `#${id}`);
      }
    } else if (id) {
      navigate(`/#${id}`);
    }
  };

  const waLink = "https://wa.me/919303228082?text=Hi%20CodeHTML,%20I'm%20looking%20to%20build%20custom%20coded%20websites,%20web%20apps,%20or%20mobile%20apps%20in%20Dubai.";

  const isHomePage = location.pathname === '/';

  return (
    <div className="w-full z-50 fixed top-0 left-0 right-0 transition-transform duration-300">
      {isHomePage && (
        <div className={`w-full bg-[#0d0714] text-center text-[10px] sm:text-xs font-semibold tracking-wide text-force-white transition-all duration-300 ease-in-out overflow-hidden ${
          scrolled ? 'max-h-0 py-0 border-b-0 opacity-0 pointer-events-none' : 'max-h-20 py-2.5 border-b border-purple-900/30'
        }`}>
          <span className="bg-purple-600 text-force-white text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-full uppercase mr-1.5 inline-block align-middle">NEW</span>
          <span className="text-force-white inline align-middle">See how CodeHTML delivers 10x faster rendering than traditional WordPress templates.</span>
          <Link to="/portfolio" className="text-force-white underline hover:text-purple-300 transition-colors font-bold ml-1.5 inline-block align-middle">See cases →</Link>
        </div>
      )}
      <nav 
        className="relative w-full flex justify-between items-center px-4 sm:px-12 py-2.5 sm:py-3.5 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-800 shadow-sm"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <Link 
          to="/" 
          onClick={(e) => handleLinkClick(e, 'home')} 
          onMouseEnter={() => setActiveDropdown(null)}
          className="flex items-center gap-2.5 sm:gap-3"
        >
          <img src="/Codehtml.logo.png" alt="Codehtml.in Logo" className="w-7 h-7 sm:w-8 sm:h-8 object-contain" />
          <div className="flex flex-row items-center gap-2 text-left">
            <span className="font-headline font-extrabold tracking-tight text-sm sm:text-lg md:text-xl leading-none uppercase text-black">
              CODEHTML
            </span>
          </div>
        </Link>

        <div 
          className="hidden md:flex gap-8 items-center"
          onMouseLeave={() => setActiveDropdown(null)}
        >
          {/* Products Dropdown Trigger */}
          <div 
            className="py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('products')}
          >
            <span className={`font-body transition-all flex items-center gap-1 ${
              activeDropdown === 'products' || location.pathname.startsWith('/products') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}>
              Products <span className="text-[8px] opacity-60">▼</span>
            </span>

            <AnimatePresence>
              {activeDropdown === 'products' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full w-full backdrop-blur-md border-b py-8 shadow-2xl z-50 text-left bg-white border-slate-200 shadow-slate-200/50"
                  onMouseEnter={() => setActiveDropdown('products')}
                >
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-12 grid grid-cols-3 gap-8">
                    {productsMenu.map((column) => (
                      <div key={column.title} className="flex flex-col gap-2">
                        <span className="font-headline font-extrabold text-[10px] tracking-wider uppercase border-b pb-2 mb-1 text-slate-400 border-slate-100">
                          {column.title}
                        </span>
                        <div className="flex flex-col gap-2">
                          {column.links.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className="font-body text-xs font-semibold hover:translate-x-0.5 transition-all block text-slate-700 hover:text-indigo-600"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* AI Solutions Dropdown Trigger */}
          <div 
            className="py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('ai-solutions')}
          >
            <span className={`font-body transition-all flex items-center gap-1 ${
              activeDropdown === 'ai-solutions' || location.pathname.startsWith('/ai-solutions') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}>
              AI Solutions <span className="text-[8px] opacity-60">▼</span>
            </span>

            <AnimatePresence>
              {activeDropdown === 'ai-solutions' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full w-full backdrop-blur-md border-b py-8 shadow-2xl z-50 text-left bg-white border-slate-200 shadow-slate-200/50"
                  onMouseEnter={() => setActiveDropdown('ai-solutions')}
                >
                  <div className="max-w-[1000px] mx-auto px-4 sm:px-12 grid grid-cols-2 gap-8">
                    {aiSolutionsMenu.map((column) => (
                      <div key={column.title} className="flex flex-col gap-2">
                        <span className="font-headline font-extrabold text-[10px] tracking-wider uppercase border-b pb-2 mb-1 text-slate-400 border-slate-100">
                          {column.title}
                        </span>
                        <div className="flex flex-col gap-2">
                          {column.links.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className="font-body text-xs font-semibold hover:translate-x-0.5 transition-all block text-slate-700 hover:text-indigo-600"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Get More Customers Dropdown Trigger */}
          <div 
            className="py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('get-more-customers')}
          >
            <span className={`font-body transition-all flex items-center gap-1 ${
              activeDropdown === 'get-more-customers' || location.pathname.startsWith('/get-more-customers') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}>
              Get More Customers <span className="text-[8px] opacity-60">▼</span>
            </span>

            <AnimatePresence>
              {activeDropdown === 'get-more-customers' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full w-full backdrop-blur-md border-b py-8 shadow-2xl z-50 text-left bg-white border-slate-200 shadow-slate-200/50"
                  onMouseEnter={() => setActiveDropdown('get-more-customers')}
                >
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-12 grid grid-cols-3 gap-8">
                    {getMoreCustomersMenu.map((column) => (
                      <div key={column.title} className="flex flex-col gap-2">
                        <span className="font-headline font-extrabold text-[10px] tracking-wider uppercase border-b pb-2 mb-1 text-slate-400 border-slate-100">
                          {column.title}
                        </span>
                        <div className="flex flex-col gap-2">
                          {column.links.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className="font-body text-xs font-semibold hover:translate-x-0.5 transition-all block text-slate-700 hover:text-indigo-600"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Services Dropdown Trigger */}
          <div 
            className="py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('services-new')}
          >
            <span className={`font-body transition-all flex items-center gap-1 ${
              activeDropdown === 'services-new' || location.pathname.startsWith('/services') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}>
              Services <span className="text-[8px] opacity-60">▼</span>
            </span>

            <AnimatePresence>
              {activeDropdown === 'services-new' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full w-full backdrop-blur-md border-b py-8 shadow-2xl z-50 text-left bg-white border-slate-200 shadow-slate-200/50"
                  onMouseEnter={() => setActiveDropdown('services-new')}
                >
                  <div className="max-w-[1400px] mx-auto px-4 sm:px-12 grid grid-cols-3 gap-8">
                    {servicesMenu.map((column) => (
                      <div key={column.title} className="flex flex-col gap-2">
                        <span className="font-headline font-extrabold text-[10px] tracking-wider uppercase border-b pb-2 mb-1 text-slate-400 border-slate-100">
                          {column.title}
                        </span>
                        <div className="flex flex-col gap-2">
                          {column.links.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              onClick={() => setActiveDropdown(null)}
                              className="font-body text-xs font-semibold hover:translate-x-0.5 transition-all block text-slate-700 hover:text-indigo-600"
                            >
                              {link.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/portfolio"
            className={`font-body transition-all relative group py-2 ${
              location.pathname.startsWith('/portfolio') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}
          >
            Projects
          </Link>

          {/* Company Dropdown Trigger */}
          <div 
            className="relative py-2 cursor-pointer"
            onMouseEnter={() => setActiveDropdown('company')}
          >
            <span className={`font-body transition-all flex items-center gap-1 ${
              activeDropdown === 'company' || location.pathname === '/about' || location.pathname === '/resources' || location.pathname === '/faq' || location.pathname.startsWith('/blog') 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}>
              Company <span className="text-[8px] opacity-60">▼</span>
            </span>

            <AnimatePresence>
              {activeDropdown === 'company' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-11 w-[220px] backdrop-blur-md border p-3 rounded-2xl flex flex-col gap-2 shadow-2xl z-50 text-left bg-white border-slate-200 shadow-slate-200/50"
                  onMouseEnter={() => setActiveDropdown('company')}
                >
                  <Link
                    to="/about"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl border border-transparent transition-all flex flex-col group/item hover:border-slate-200 hover:bg-slate-50"
                  >
                    <span className="font-headline font-extrabold text-xs transition-colors text-slate-900 group-hover/item:text-indigo-600">OUR PROFILE</span>
                    <span className="font-body text-[9px] mt-0.5 leading-normal text-slate-500">About our team and architecture</span>
                  </Link>

                  <Link
                    to="/blog"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl border border-transparent transition-all flex flex-col group/item hover:border-slate-200 hover:bg-slate-50"
                  >
                    <span className="font-headline font-extrabold text-xs transition-colors text-slate-900 group-hover/item:text-indigo-600">BLOG</span>
                    <span className="font-body text-[9px] mt-0.5 leading-normal text-slate-500">Engineering blog & insights</span>
                  </Link>

                  <Link
                    to="/resources"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl border border-transparent transition-all flex flex-col group/item hover:border-slate-200 hover:bg-slate-50"
                  >
                    <span className="font-headline font-extrabold text-xs transition-colors text-slate-900 group-hover/item:text-indigo-600">RESOURCES</span>
                    <span className="font-body text-[9px] mt-0.5 leading-normal text-slate-500">Guides, templates, and insights</span>
                  </Link>

                  <Link
                    to="/faq"
                    onClick={() => setActiveDropdown(null)}
                    className="p-2.5 rounded-xl border border-transparent transition-all flex flex-col group/item hover:border-slate-200 hover:bg-slate-50"
                  >
                    <span className="font-headline font-extrabold text-xs transition-colors text-slate-900 group-hover/item:text-indigo-600">ANSWERS & FAQ</span>
                    <span className="font-body text-[9px] mt-0.5 leading-normal text-slate-500">Frequently asked questions</span>
                  </Link>


                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/partner"
            className={`font-body transition-all relative group py-2 ${
              location.pathname === '/partner' 
                ? 'text-indigo-600 text-sm tracking-normal font-semibold' 
                : 'text-slate-600 hover:text-indigo-600 text-sm tracking-normal font-medium'
            }`}
          >
            Partner
          </Link>
        </div>

        <div className="flex items-center gap-6 relative z-[110]">
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#0f172a] hover:bg-[#8b5cf6] text-force-white hover:text-force-white font-body font-bold text-xs tracking-wider px-6 py-3 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hidden md:flex items-center gap-2 select-none cursor-pointer font-semibold"
          >
            Get started →
          </a>
          <button
            className="p-2 sm:p-2.5 rounded-full md:hidden transition-transform active:scale-95 border bg-slate-100 border-slate-200 text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-0 min-h-screen w-full z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] md:hidden flex flex-col p-6 pt-32 gap-8 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible translate-y-10'
          } bg-white text-slate-900`}
        >
          <div className="flex flex-col gap-6 relative z-10 w-full text-left overflow-y-auto max-h-[80vh] pr-2">
            {/* PRODUCTS Mobile Item */}
            <div>
              <button
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                className={`w-full text-left font-headline font-extrabold tracking-tight text-3xl flex justify-between items-center transition-all ${
                  location.pathname.startsWith('/products') ? 'text-indigo-600 hover:text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
                }`}
              >
                <span>PRODUCTS</span>
                <span className="text-xl">{mobileProductsOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {mobileProductsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-2 flex flex-col gap-3 border-l border-indigo-200"
                  >
                    {productsMenu.map(column => (
                      <div key={column.title} className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{column.title}</span>
                        {column.links.map(link => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-body text-xs font-semibold py-0.5 text-slate-600 hover:text-indigo-600"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* AI SOLUTIONS Mobile Item */}
            <div>
              <button
                onClick={() => setMobileAiSolutionsOpen(!mobileAiSolutionsOpen)}
                className={`w-full text-left font-headline font-extrabold tracking-tight text-3xl flex justify-between items-center transition-all ${
                  location.pathname.startsWith('/ai-solutions') ? 'text-indigo-600 hover:text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
                }`}
              >
                <span>AI SOLUTIONS</span>
                <span className="text-xl">{mobileAiSolutionsOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {mobileAiSolutionsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-2 flex flex-col gap-3 border-l border-indigo-200"
                  >
                    {aiSolutionsMenu.map(column => (
                      <div key={column.title} className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{column.title}</span>
                        {column.links.map(link => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-body text-xs font-semibold py-0.5 text-slate-600 hover:text-indigo-600"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* GET MORE CUSTOMERS Mobile Item */}
            <div>
              <button
                onClick={() => setMobileGetMoreCustomersOpen(!mobileGetMoreCustomersOpen)}
                className={`w-full text-left font-headline font-extrabold tracking-tight text-3xl flex justify-between items-center transition-all ${
                  location.pathname.startsWith('/get-more-customers') ? 'text-indigo-600 hover:text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
                }`}
              >
                <span>GET MORE CUSTOMERS</span>
                <span className="text-xl">{mobileGetMoreCustomersOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {mobileGetMoreCustomersOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-2 flex flex-col gap-3 border-l border-indigo-200"
                  >
                    {getMoreCustomersMenu.map(column => (
                      <div key={column.title} className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{column.title}</span>
                        {column.links.map(link => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-body text-xs font-semibold py-0.5 text-slate-600 hover:text-indigo-600"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* SERVICES Mobile Item */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`w-full text-left font-headline font-extrabold tracking-tight text-3xl flex justify-between items-center transition-all ${
                  location.pathname.startsWith('/services') ? 'text-indigo-600 hover:text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
                }`}
              >
                <span>SERVICES</span>
                <span className="text-xl">{mobileServicesOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-2 flex flex-col gap-3 border-l border-indigo-200"
                  >
                    {servicesMenu.map(column => (
                      <div key={column.title} className="flex flex-col gap-2 mt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{column.title}</span>
                        {column.links.map(link => (
                          <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-body text-xs font-semibold py-0.5 text-slate-600 hover:text-indigo-600"
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/portfolio"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-headline font-extrabold tracking-tight text-3xl transition-all ${
                location.pathname.startsWith('/portfolio') ? 'text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
              }`}
            >
              PROJECTS
            </Link>

            {/* COMPANY Mobile Item */}
            <div>
              <button
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className={`w-full text-left font-headline font-extrabold tracking-tight text-3xl flex justify-between items-center transition-all ${
                  location.pathname === '/about' || location.pathname === '/resources' || location.pathname === '/faq' || location.pathname.startsWith('/blog') ? 'text-indigo-600 hover:text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
                }`}
              >
                <span>COMPANY</span>
                <span className="text-xl">{mobileCompanyOpen ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {mobileCompanyOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden pl-4 mt-2 flex flex-col gap-3 border-l border-indigo-200"
                  >
                    <Link
                      to="/about"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-sm font-semibold uppercase tracking-wider py-1 text-slate-500 hover:text-indigo-600"
                    >
                      OUR PROFILE
                    </Link>

                    <Link
                      to="/blog"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-sm font-semibold uppercase tracking-wider py-1 text-slate-500 hover:text-indigo-600"
                    >
                      BLOG
                    </Link>

                    <Link
                      to="/resources"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-sm font-semibold uppercase tracking-wider py-1 text-slate-500 hover:text-indigo-600"
                    >
                      RESOURCES
                    </Link>

                    <Link
                      to="/faq"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-body text-sm font-semibold uppercase tracking-wider py-1 text-slate-500 hover:text-indigo-600"
                    >
                      ANSWERS & FAQ
                    </Link>


                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/partner"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-headline font-extrabold tracking-tight text-3xl transition-all ${
                location.pathname === '/partner' ? 'text-indigo-600' : 'text-slate-800 hover:text-indigo-600'
              }`}
            >
              PARTNER
            </Link>

            <div className="mt-8 pt-8 border-t flex flex-col gap-4 border-slate-100">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black hover:bg-[#8b5cf6] text-white text-center font-body font-bold text-sm uppercase tracking-wider p-5 rounded-full transition-all w-full shadow-md"
              >
                WHATSAPP US ➲
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
