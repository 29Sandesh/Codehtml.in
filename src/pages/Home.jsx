import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Layers, Cpu, Smartphone, Sparkles, TrendingUp, Rocket, ArrowRight, ArrowLeft, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import GeoSEOBlock from '../components/GeoSEOBlock';
import LazyVideo from '../components/LazyVideo';
import Breadcrumbs from '../components/Breadcrumbs';

import { detectIfIndia, detectCountryName } from '../utils/region';
import { getNewServiceLink } from '../data/servicesDataNew';
import { db } from '../services/database';

// Helper component for count-up animation
const CountUp = ({ value, duration = 1.5 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, amount: 0.5 });

  const numMatch = value.match(/(\d+)/);
  const num = numMatch ? parseInt(numMatch[0]) : 0;
  const suffix = value.replace(/\d+/g, '');

  useEffect(() => {
    if (isInView) {
      let startTime;
      let animationFrame;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / (duration * 1000), 1);
        setDisplayValue(Math.floor(progress * num));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, num, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
};

const RotatingStatsComponent = ({ cityName }) => {
  const [idx, setIdx] = useState(0);

  const stats = [
    {
      value: '118+',
      label: 'COMPLETED PLATFORMS',
      sub: 'CUSTOM ENGAGED REACT SHIELD'
    },
    {
      value: '99+',
      label: 'LIGHTHOUSE SPEEDS',
      sub: 'SUB-SECOND SECURE RESPONSE'
    },
    {
      value: '3-5',
      label: 'DAYS RAPID DELIVERY',
      sub: 'ZERO TEMPLATE CODING'
    },
    {
      value: 'ACTIVE',
      label: cityName ? `DOMINANCE IN ${cityName.toUpperCase()}` : 'WORLD WIDE',
      sub: 'LOCAL AREA AUTHORITY'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full min-h-[44px] relative overflow-hidden">
      <div className="relative w-full h-[36px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute flex flex-col items-center justify-center w-full"
          >
            <span className="text-xl sm:text-2xl font-headline font-black text-zinc-900 tracking-tight leading-none mb-0.5">{stats[idx].value}</span>
            <span className="text-[8px] sm:text-[9px] font-body font-extrabold tracking-[0.1em] text-zinc-700 uppercase leading-tight">{stats[idx].label}</span>
            <span className="text-[7px] font-body text-zinc-500 tracking-wider uppercase leading-none">{stats[idx].sub}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};


const getServiceIcon = (slug) => {
  switch (slug) {
    case 'custom-website-development':
      return <Globe className="w-5 h-5" />;
    case 'web-application-development':
      return <Layers className="w-5 h-5" />;
    case 'saas-development':
      return <Cpu className="w-5 h-5" />;
    case 'mobile-app-development':
      return <Smartphone className="w-5 h-5" />;
    case 'ai-automation':
      return <Sparkles className="w-5 h-5" />;
    case 'growth-digital-presence':
      return <TrendingUp className="w-5 h-5" />;
    default:
      return <Globe className="w-5 h-5" />;
  }
};


const navCategories = [
  {
    id: 'products',
    title: 'PRODUCTS',
    bgImage: '/whatsapp_realty_mockup.webp',
    items: [
      { name: "Customer Portal", slug: "customer-portal", desc: "Secure external logins & data sharing portals for clients.", bgImage: "/customer-portal-generated.webp" },
      { name: "Supplier Portal", slug: "supplier-portal", desc: "Procurement, vendor tracking, and order dispatch pipelines.", bgImage: "/supplier-portal-generated.webp" },
      { name: "Employee Portal", slug: "employee-portal", desc: "Intranets, employee rosters, and shared company databases.", bgImage: "/employee-portal-generated.webp" },
      { name: "Partner Portal", slug: "partner-portal", desc: "B2B referral tracking, dashboards, and affiliate management." },
      { name: "ERP System", slug: "erp-system", desc: "Centralized enterprise resource planning and operations control." },
      { name: "CRM System", slug: "crm-system", desc: "Sales pipelines, leads management, and customer relations CRMs." },
      { name: "Online Store", slug: "online-store", desc: "High-speed headless e-commerce checkouts and catalog systems." },
      { name: "Multi-Vendor Marketplace", slug: "multi-vendor-marketplace", desc: "Decoupled multi-seller shopping checkouts and logistics." },
      { name: "B2B Store", slug: "b2b-store", desc: "Wholesale buyer bulk pricing, quotes, and tier ordering systems." },
      { name: "Booking System", slug: "booking-system", desc: "Real-time reservation engines and calendar slot selectors." }
    ]
  },
  {
    id: 'aiSolutions',
    title: 'AI SOLUTIONS',
    bgImage: '/crystamedia_agency.webp',
    items: [
      { name: "AI Voice & Chatbots", slug: "ai-voice-chatbots", desc: "Conversational WhatsApp voice & text automated support.", bgImage: "/whatsapp_realty_mockup.webp" },
      { name: "AI Consultancy", slug: "ai-consultancy", desc: "Workflow audits, prompt strategy, and roadmap workshops.", bgImage: "/assets/services/custom-software.webp" },
      { name: "AI Search", slug: "ai-search", desc: "Semantic search engine overlays and RAG database models.", bgImage: "/assets/services/react-app.webp" },
      { name: "AI Sales Agent", slug: "ai-sales-agent", desc: "Autonomous qualifiers that qualify and warm up leads." },
      { name: "Agents & Processes", slug: "agents-and-processes", desc: "Cron automations, custom n8n pipelines, and API integrations." },
      { name: "AI Support Agent", slug: "ai-customer-support-agent", desc: "Qualify and resolve up to 80% of support tickets automatically." },
      { name: "Revenue Automation", slug: "revenue-automation", desc: "Subscription analytics dashboards and automated Stripe flows." },
      { name: "Client Control", slug: "client-control", desc: "Automated digital quotes and approval tracking portals." }
    ]
  },
  {
    id: 'getMoreCustomers',
    title: 'GET MORE CUSTOMERS',
    bgImage: '/Everything-you-need.webp',
    items: [
      { name: "AEO Optimization", slug: "aeo-optimization", desc: "Rank on generative search engines like ChatGPT, Claude & Gemini.", bgImage: "/Everything-you-need.webp" },
      { name: "Local SEO Solutions", slug: "local-seo", desc: "Maps Pack citation authority, schema markups, and local reviews.", bgImage: "/dubai_hills_estate.webp" },
      { name: "Social Lead Generation", slug: "social-media-lead-generation", desc: "Automated social pathways and customized organic lead capture.", bgImage: "/Startup-competittion.webp" },
      { name: "Automated Funnels", slug: "automated-funnels", desc: "High-converting exit-intent slides and multi-step landing pages." },
      { name: "PPC Performance", slug: "ppc-performance-marketing", desc: "Conversion tracking, GA4 parameters mapping, and GTM setup." },
      { name: "Email & SMS Marketing", slug: "email-sms-marketing-automation", desc: "Spam-proof welcome flows, dunning sequences, and automations." },
      { name: "Conversion Rate Opt", slug: "conversion-rate-optimization", desc: "A/B testing, user session mapping, and checkout optimization." },
      { name: "B2B Leads Database", slug: "b2b-leads-database-scraping", desc: "Data extraction pipelines to feed outbound campaigns." }
    ]
  },
  {
    id: 'services',
    title: 'SERVICES',
    bgImage: '/dubai_hills_estate.webp',
    items: [
      { name: "Corporate Websites", slug: "corporate-websites", desc: "High-end corporate websites designed for speed and conversions.", bgImage: "/assets/services/web-design.webp" },
      { name: "Custom Web Apps", slug: "custom-web-applications", desc: "Bespoke database-driven dashboards, portals, and control panels.", bgImage: "/assets/services/saas-development.webp" },
      { name: "Responsive Design", slug: "responsive-design", desc: "Mobile-first interfaces with fluid touch layouts and gestures.", bgImage: "/assets/services/mobile-apps.webp" },
      { name: "WordPress & CMS Strategy", slug: "wordpress-and-cms", desc: "Clean React alternatives to bloated WordPress or builder setups." },
      { name: "Custom E-Commerce", slug: "custom-e-commerce", desc: "Tailored checkouts, shopping carts, and headless commerce platforms." },
      { name: "Shopify & Magento", slug: "shopify-and-magento", desc: "Custom integrations, webhooks, API layers, and themes." },
      { name: "iOS Native Apps", slug: "ios-native-apps", desc: "High-performance Swift native mobile apps for Apple devices." },
      { name: "Android Native Apps", slug: "android-native-apps", desc: "Kotlin native mobile apps optimized for Android devices." }
    ]
  }
];

const CategoryCarousel = ({ items, baseRoute }) => {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const card = containerRef.current.querySelector('.snap-start');
      const cardWidth = card ? card.clientWidth : 300;
      const scrollAmount = direction === 'left' ? -cardWidth - 16 : cardWidth + 16;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative w-full group/carousel">
      {/* Prev Button */}
      <button 
        type="button"
        onClick={() => scroll('left')}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:border-vintage-gold text-white hover:text-vintage-gold items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>

      {/* Next Button */}
      <button 
        type="button"
        onClick={() => scroll('right')}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/80 border border-white/10 hover:border-vintage-gold text-white hover:text-vintage-gold items-center justify-center transition-all opacity-85 hover:opacity-100 hover:scale-105 cursor-pointer shadow-lg"
      >
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Edge Fade overlays */}
      <div className="hidden sm:block absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none"></div>
      <div className="hidden sm:block absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none"></div>

      {/* Scrollable track / Grid on mobile */}
      <div 
        ref={containerRef}
        className="grid grid-cols-2 gap-2 sm:gap-4 py-4 px-1 sm:px-2 sm:flex sm:overflow-x-auto sm:snap-x sm:snap-mandatory scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, idx) => (
          <Link
            key={idx}
            to={`${baseRoute}/${item.slug}`}
            className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] shrink-0 sm:snap-start bg-zinc-950/60 border border-white/5 hover:border-vintage-gold/50 hover:bg-zinc-900/60 p-3 sm:p-6 flex flex-col justify-between transition-all duration-300 group rounded-none text-left min-h-[140px] sm:min-h-[190px]"
          >
            <div className="space-y-1.5 sm:space-y-3">
              <h3 className="font-headline font-black text-xs sm:text-xl text-white group-hover:text-vintage-gold transition-colors uppercase tracking-tight line-clamp-2">
                {item.name}
              </h3>
              <p className="font-body text-zinc-500 text-[10px] sm:text-xs leading-relaxed line-clamp-3">
                {item.desc}
              </p>
            </div>
            <div className="mt-2 sm:mt-4 bg-blue-600 border border-blue-500 px-2 py-1.5 sm:px-4 sm:py-2.5 flex items-center justify-between transition-all duration-300 group-hover:bg-blue-500">
              <span className="font-body font-bold text-[8px] sm:text-[9px] uppercase tracking-wider text-white">
                Explore Solution
              </span>
              <span className="text-white text-xs sm:text-sm font-black">
                ➲
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


const Home = ({ cityName = '', cityCategory = '', cityData = null }) => {
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [callRevealed, setCallRevealed] = useState(false);
  const [pricingOverrides, setPricingOverrides] = useState({});

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const overrides = await db.getPricingOverrides();
        setPricingOverrides(overrides);
      } catch (err) {
        console.error("Failed to load pricing overrides", err);
      }
    };
    fetchPricing();
  }, []);

  const getPriceVal = (catId, tierKey, baselineUsd, baselineInr) => {
    const override = pricingOverrides[catId]?.[tierKey];
    const usdVal = override !== undefined ? override : baselineUsd;
    
    let inrVal = baselineInr;
    if (override !== undefined) {
      const conversionMap = {
        600: 45000, 1200: 90000, 3000: 250000,
        400: 30000, 1000: 75000, 2500: 185000,
        300: 22000, 750: 55000, 1800: 135000,
        200: 15000, 500: 38000, 1500: 110000
      };
      inrVal = conversionMap[usdVal] || Math.round(usdVal * 83.5);
    }
    
    const inrStr = `₹${inrVal.toLocaleString('en-IN')}`;
    const usdStr = `$${usdVal.toLocaleString()}`;

    if (countryName === 'India') return inrStr;
    return usdStr;
  };

  const [contactData, setContactData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState('idle'); // idle | submitting | success | error
  const [openCategory, setOpenCategory] = useState('products');

  const handleContactChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value
    });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '91c45bc7-1cb5-43ac-aa1f-79627a8c7f04',
          subject: `New Lead from CodeHTML.in Contact Form: ${contactData.name}`,
          name: contactData.name,
          phone: contactData.phone,
          email: contactData.email,
          message: contactData.message
        })
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setContactStatus('success');
        setContactData({ name: '', phone: '', email: '', message: '' });
      } else {
        setContactStatus('error');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setContactStatus('error');
    }
  };

  const [openServiceIdx, setOpenServiceIdx] = useState(null);
  const [activeDeckIdx, setActiveDeckIdx] = useState(0);
  const [activeCities, setActiveCities] = useState([]);
  const [activePlanMobile, setActivePlanMobile] = useState(null);
  const [activeStandardMobile, setActiveStandardMobile] = useState(null);

  useEffect(() => {
    if (cityData || cityName) {
      fetch('/data/activeCities.json')
        .then(res => {
          if (res.ok) return res.json();
          return [];
        })
        .then(data => {
          setActiveCities(data);
        })
        .catch(err => console.error('Failed to load active cities', err));
    }
  }, [cityData, cityName]);

  const toSlug = (text) => {
    return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
  };

  const getKeywordSlug = (fullSlug) => {
    if (!fullSlug) return 'website-development';
    const match = fullSlug.match(/^(.+)-in-([a-z0-9-]+)$/);
    return match ? match[1] : 'website-development';
  };

  const getNearbyCities = (cData) => {
    if (!cData || activeCities.length === 0) return [];
    
    const citySlugPart = cData.slug?.split('-in-')[1] || '';
    const foundCityObj = activeCities.find(c => c.s === citySlugPart || c.n === cData.name);
    
    if (!foundCityObj) return [];
    
    const lat1 = foundCityObj.la;
    const lng1 = foundCityObj.lo;
    
    if (lat1 === undefined || lng1 === undefined) {
      return activeCities
        .filter(c => c.c === foundCityObj.c && c.n !== foundCityObj.n)
        .slice(0, 6)
        .map(c => ({ name: c.n, slug: c.s }));
    }
    
    const withDistance = activeCities
      .filter(c => c.c === foundCityObj.c && c.n !== foundCityObj.n && c.la !== undefined && c.lo !== undefined)
      .map(c => {
        const dist = Math.sqrt(Math.pow(c.la - lat1, 2) + Math.pow(c.lo - lng1, 2));
        return { city: c, dist };
      });
      
    withDistance.sort((a, b) => a.dist - b.dist);
    return withDistance.slice(0, 6).map(item => ({
      name: item.city.n,
      slug: item.city.s
    }));
  };

  const getRelatedServices = (fullSlug) => {
    if (!fullSlug) return [];
    const match = fullSlug.match(/^(.+)-in-([a-z0-9-]+)$/);
    const citySlug = match ? match[2] : fullSlug;
    
    const servicesList = [
      { id: 'website-development', name: 'Custom Website Design & Development', kw: 'website-development' },
      { id: 'web-app-development', name: 'Web Application Development', kw: 'web-app-development' },
      { id: 'saas-development', name: 'SaaS Platform Development', kw: 'saas-development' },
      { id: 'mobile-app-development', name: 'Mobile App Development (iOS & Android)', kw: 'mobile-app-development' },
      { id: 'ai-automation', name: 'AI Bots & Business Automation', kw: 'ai-automation' },
      { id: 'startup-launch', name: 'MVP Launch & Startup Services', kw: 'mvp-development' },
      { id: 'seo-growth', name: 'Search Engine Optimization (SEO)', kw: 'seo-services' }
    ];
    
    return servicesList.map(s => ({
      name: s.name,
      path: `/${s.kw}-in-${citySlug}`
    }));
  };

  const [isIndia] = useState(() => {
    if (cityData) return cityData.region === 'INDIA';
    return detectIfIndia();
  });
  const [countryName] = useState(() => {
    if (cityData) {
      return cityData.region === 'INDIA' ? 'India' : 'Dubai';
    }
    return detectCountryName();
  });
  const formatPrice = (usdPrice, inrPrice) => {
    if (countryName === 'India') return inrPrice;
    return usdPrice;
  };

  const servicesData = [
    {
      title: "1. Custom Website Development",
      slug: "custom-website-development",
      desc: "Tailored websites built for maximum speed, responsiveness, and conversion.",
      image: "/dubai_hills_estate.webp",
      span: "lg:col-span-6 md:col-span-6 col-span-12",
      subheadings: [
        "Business Websites",
        "Corporate Websites",
        "Landing Pages",
        "Portfolio Websites",
        "E-commerce Stores",
        "WordPress Development"
      ]
    },
    {
      title: "2. Web Application Development",
      slug: "web-application-development",
      desc: "Highly interactive web applications, secure administration modules, and portals.",
      image: "/slcc_construction.webp",
      span: "lg:col-span-6 md:col-span-6 col-span-12",
      subheadings: [
        "Custom Web Apps",
        "CRM Systems",
        "ERP Solutions",
        "Internal Business Tools",
        "Client Portals",
        "Dashboard Development"
      ]
    },
    {
      title: "3. SaaS Development",
      slug: "saas-development",
      desc: "Custom multi-tenant platforms, subscription logic, MVPs, and scaled applications.",
      image: "/dubai_business_bay.webp",
      span: "lg:col-span-4 md:col-span-6 col-span-12",
      subheadings: [
        "SaaS MVP Development",
        "Multi-Tenant SaaS Platforms",
        "Subscription Systems",
        "Admin Panels",
        "User Management Systems",
        "SaaS Product Scaling"
      ]
    },
    {
      title: "4. Mobile App Development",
      slug: "mobile-app-development",
      desc: "Native iOS & Android app development, custom frameworks, and store delivery.",
      image: "/whatsapp_realty_mockup.webp",
      span: "lg:col-span-8 md:col-span-6 col-span-12",
      subheadings: [
        "iOS App Development",
        "Android App Development",
        "React Native Apps",
        "Cross-Platform Apps",
        "App Maintenance & Support"
      ]
    },
    {
      title: "5. AI & Automation",
      slug: "ai-automation",
      desc: "Smart AI integration, automated chatbots, workflow automations, and pipelines.",
      image: "/crystamedia_agency.webp",
      span: "lg:col-span-8 md:col-span-6 col-span-12",
      subheadings: [
        "AI Chatbots",
        "WhatsApp Chatbots",
        "Customer Support Automation",
        "AI Integrations",
        "Lead Generation Automation",
        "Workflow Automation"
      ]
    },
    {
      title: "6. Startup Launch Services",
      slug: "startup-launch-services",
      desc: "MVP architecture, design roadmaps, UI/UX development, and launch strategy.",
      image: "/Startup-competittion.webp",
      span: "lg:col-span-4 md:col-span-6 col-span-12",
      subheadings: [
        "MVP Development",
        "Product Strategy",
        "UI/UX Design",
        "Technical Consulting",
        "Product Roadmapping",
        "Startup Tech Stack Setup"
      ]
    },
    {
      title: "7. Growth & Digital Presence",
      slug: "growth-digital-presence",
      desc: "Surgical search optimizations, page speed tuning, GBP optimization, and support.",
      image: "/Everything-you-need.webp",
      span: "lg:col-span-12 md:col-span-12 col-span-12",
      subheadings: [
        "SEO Optimization",
        "Google Business Profile Optimization",
        "Performance Optimization",
        "Website Maintenance",
        "Analytics Setup",
        "Conversion Optimization"
      ]
    }
  ];

  const getWhatsAppLink = (customText = '') => {
    let text = customText;
    if (!text) {
      text = cityData
        ? `Hi CodeHTML, I'm interested in your custom software or web services in ${cityName}.`
        : "Hi CodeHTML, I'm looking to build custom coded websites, web apps, or mobile apps in Dubai.";
    }
    return `https://wa.me/919303228082?text=${encodeURIComponent(text)}`;
  };
  const clientCases = [
    {
      name: "SWIGATO INDIA",
      category: "FOOD PLATFORM",
      url: "SWIGATOINDIA.IN",
      image: "/SwigatoIndia.webp",
      link: "/portfolio/03",
      metrics: [
        { value: "Multi-City", label: "Platform Coverage", description: "" },
        { value: "Fast Search", label: "Instant Discovery", description: "" },
        { value: "100% Custom", label: "Built From Scratch", description: "" }
      ],
      achievement: "Built a multi-city food license and restaurant onboarding platform helping businesses streamline licensing, registrations, and compliance workflows."
    },
    {
      name: "SLCC CONSTRUCTION",
      category: "CONSTRUCTION WEBSITE",
      url: "SLCC.IN",
      image: "/slcc_construction.webp",
      link: "/portfolio/02",
      metrics: [
        { value: "250ms", label: "Response Time", description: "" },
        { value: "Quote System", label: "Lead Automation", description: "" },
        { value: "100% Custom", label: "Architecture", description: "" }
      ],
      achievement: "Developed a custom construction portal with architectural blueprint visualization, project showcasing, and quote generation workflows."
    },
    {
      name: "CRYSTA MEDIA",
      category: "MARKETING AGENCY",
      url: "CRYSTAMEDIA.IN",
      image: "/crystamedia_agency.webp",
      link: "/portfolio/05",
      metrics: [
        { value: "SEO Ready", label: "Optimized Pages", description: "" },
        { value: "Fast Load", label: "Performance", description: "" },
        { value: "Lead Focused", label: "Conversion Design", description: "" }
      ],
      achievement: "Designed and developed a high-converting corporate website for a digital marketing agency focused on lead generation and premium positioning."
    },
    {
      name: "ALAYA REALTY",
      category: "REAL ESTATE PORTAL",
      url: "ALAYAREALTY.IN",
      image: "/luxury_dubai_villa.webp",
      link: "/portfolio/01",
      metrics: [
        { value: "0.7s", label: "Load Speed", description: "" },
        { value: "Property Portal", label: "Listings System", description: "" },
        { value: "100% Custom", label: "Development", description: "" }
      ],
      achievement: "Built a premium real estate consultancy platform with property showcasing, inquiry management, and high-performance architecture."
    },
    {
      name: "ELGAMINGO",
      category: "GAMING STORE",
      url: "ELGAMINGO.STORE",
      image: "/elgamingo.webp",
      link: "/portfolio/04",
      metrics: [
        { value: "E-Commerce", label: "Gaming Store", description: "" },
        { value: "Instant Access", label: "Digital Delivery", description: "" },
        { value: "Scalable", label: "Architecture", description: "" }
      ],
      achievement: "Created an online gaming platform with digital product delivery, modern storefront design, and scalable commerce workflows."
    },
    {
      name: "CAFE DE CASA",
      category: "CAFE WEBSITE",
      url: "CAFEDECASA.IN",
      image: "/cafedecasa.webp",
      link: "/portfolio/06",
      metrics: [
        { value: "Mobile First", label: "Responsive UX", description: "" },
        { value: "QR Menu", label: "Digital Experience", description: "" },
        { value: "Fast Load", label: "Performance", description: "" }
      ],
      achievement: "Built a modern cafe website with menu experiences, brand storytelling, and customer-focused design for improved engagement."
    }
  ];

  const getLocalizedGraphic = () => {
    const cSlug = cityData?.countrySlug || '';
    const cName = (countryName || '').toLowerCase();
    
    if (cSlug === 'india' || cName === 'india') {
      return {
        url: 'https://codehtml.in/india_tech_hub.webp',
        alt: 'CodeHTML Premium Custom Software & Web Development in India'
      };
    }
    if (cSlug === 'usa' || cName.includes('usa') || cName.includes('united states')) {
      return {
        url: 'https://codehtml.in/usa_tech_hub.webp',
        alt: 'CodeHTML Premium Custom Software & Web Development in the USA'
      };
    }
    if (cSlug === 'uk' || cName.includes('uk') || cName.includes('united kingdom') || cName.includes('london')) {
      return {
        url: 'https://codehtml.in/london_skyline.webp',
        alt: 'CodeHTML Premium Custom Software & Web Development in the UK'
      };
    }
    if (cSlug === 'singapore' || cName === 'singapore') {
      return {
        url: 'https://codehtml.in/singapore_skyline.webp',
        alt: 'CodeHTML Premium Custom Software & Web Development in Singapore'
      };
    }
    // Default to Dubai/UAE
    return {
      url: 'https://codehtml.in/dubai_skyline_dusk.webp',
      alt: 'CodeHTML Premium Custom Software & Web Development in Dubai'
    };
  };

  const isCityLanding = Boolean(cityData || cityName);
  const displayCategory = cityCategory || cityData?.category || '';
  const seoTitle = cityData?.metaTitle || (isCityLanding
    ? `${displayCategory} in ${cityName} | CodeHTML`
    : `CodeHTML | Premium Custom Software & Web Development Studio`);
  const seoDescription = cityData?.metaDesc || cityData?.intro || (isCityLanding
    ? `Professional ${displayCategory.toLowerCase()} and custom development built for elite businesses in ${cityName}.`
    : `CodeHTML is a premium custom website design and mobile app development company based in Dubai. We build high-performance business websites, online stores, Android/iOS mobile apps, and custom software systems. 118+ platforms delivered worldwide.`);
  
  const seoKeywords = isCityLanding
    ? [
        `${displayCategory.toLowerCase()} in ${cityName}`,
        `dubai ${displayCategory.toLowerCase()}`,
        `${cityName} website design company`,
        `codehtml ${cityName}`
      ]
    : [
        'website design company dubai',
        'website development company dubai',
        'ecommerce website development dubai',
        'mobile app development dubai',
        'software development company dubai'
      ];

  const marqueeItems = [
    { name: 'ALAYA REALTY PORTAL', quote: 'FAST BUSINESS PROPERTY PORTAL.' },
    { name: 'SLCC CONTRACT SYSTEMS', quote: 'INTERACTIVE CLIENT BIDDING HUB.' },
    { name: 'DIFC CORPORATE SYSTEMS', quote: 'SECURE ACCOUNT ACCESS LOGINS.' },
    { name: 'MARINA MOBILE APP', quote: 'OFFLINE-FIRST IOS & ANDROID APPS.' },
    { name: 'DUBAI FLEET SOFTWARE', quote: 'REAL-TIME RENTAL BOOKING GRID.' }
  ];

  const eliteBundles = cityData?.pricing || [
    {
      name: 'STARTUP ENGINE',
      price: getPriceVal('services', 'basic', 200, 15000),
      focus: 'WEBSITE & BASIC SEO',
      features: ['Custom Website Development', 'Basic Google SEO Setup', 'Professional Brand Logo', '100% Source Code Ownership']
    },
    {
      name: 'GROWTH SYSTEM',
      price: getPriceVal('services', 'mid', 1100, 85000),
      focus: 'ADVANCED DEVELOPMENT',
      features: ['Custom E-Commerce Store', 'Client Account Login Area', 'Secure Payments & Stripe Link', 'Advanced Local Search Schema', 'Interactive Admin Dashboard']
    },
    {
      name: 'ENTERPRISE PROTOCOL',
      price: getPriceVal('products', 'enterprise', 3000, 250000),
      focus: 'WEB APP WITH DASHBOARD',
      features: ['Web App with Admin Dashboard', 'Multiple User Panels & Access Matrix', 'Advanced Google SEO & Lead Engines', 'Secure Cloud Database Server', '24/7 Priority SLA Technical Support']
    }
  ];

  const coreServices = [
    { 
      title: 'WEBSITE DESIGN', 
      desc: 'Stunning custom layouts designed to look amazing and convert visitors into active leads.', 
      icon: '01',
      details: 'Custom designed websites featuring modern creative styling, mobile-first responsive layouts, and fast loading speeds.',
      pricing: [
        { name: 'STARTUP ENGINE', price: getPriceVal('services', 'basic', 200, 15000), features: ['Custom Website Design', 'Google SEO Setup', '7 Days Delivery'] },
        { name: 'ACCELERATION', price: getPriceVal('services', 'mid', 500, 38000), features: ['5-7 Designed Pages', 'Advanced SEO Schema', '14 Days Delivery'] }
      ]
    },
    { 
      title: 'WEBSITE DEVELOPMENT', 
      desc: 'Custom website development, client login portals, and internal business systems.', 
      icon: '02',
      details: 'Web systems with secure client login accounts, staff permissions, and direct database integrations.',
      pricing: [
        { name: 'BASIC PORTAL', price: getPriceVal('services', 'mid', 500, 38000), features: ['Secure Login Access', 'Database Records Grid', '21 Days Delivery'] },
        { name: 'BUSINESS ENGINE', price: getPriceVal('services', 'enterprise', 1500, 110000), features: ['Staff Permissions Matrix', 'Interactive Reports Panel', '35 Days Delivery'] }
      ]
    },
    { 
      title: 'E-COMMERCE DEVELOPMENT', 
      desc: 'High-performance online stores, secure credit card checkouts, and custom catalogs.', 
      icon: '03',
      details: 'Custom online stores, Stripe or local payment gateway setups, secure shopping carts, and inventory managers.',
      pricing: [
        { name: 'E-COMMERCE MVP', price: getPriceVal('products', 'basic', 600, 45000), features: ['Product Catalog Grid', 'Stripe Payments Setup', '30 Days Delivery'] },
        { name: 'ACCELERATED CORE', price: getPriceVal('products', 'mid', 1200, 90000), features: ['Customer Profile Accounts', 'Discount Coupon Manager', '45 Days Delivery'] }
      ]
    },
    { 
      title: 'MOBILE APP DEVELOPMENT', 
      desc: 'Bespoke iOS and Android mobile apps with push notifications and store setups.', 
      icon: '04',
      details: 'Custom mobile apps compatible with Apple iPhones and Android phones, Face ID logins, and push notifications.',
      pricing: [
        { name: 'MVP APP', price: getPriceVal('products', 'mid', 1200, 90000), features: ['Cross-platform App', 'Secure Profile Login', '30 Days Delivery'] },
        { name: 'PRO APP', price: getPriceVal('products', 'enterprise', 3000, 250000), features: ['Stripe Mobile Payments', 'Push Alert Notifications', '45 Days Delivery'] }
      ]
    },
    { 
      title: 'SOFTWARE DEVELOPMENT', 
      desc: 'Custom business software, scraping scripts, and business process automation.', 
      icon: '05',
      details: 'Custom software systems to automate manual spreadsheet tasks, connect database tables, and run background scripts.',
      pricing: [
        { name: 'BASIC PIPELINE', price: getPriceVal('ai-solutions', 'basic', 400, 30000), features: ['Bespoke Task Automation', 'Scheduled Data Syncs', '14 Days Delivery'] },
        { name: 'OPERATIONS CORE', price: getPriceVal('ai-solutions', 'mid', 1000, 75000), features: ['Internal CRM Software', 'Slack/Email Webhook Alerts', '30 Days Delivery'] }
      ]
    }
  ];

  const homeGeoSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": cityData ? `What services does CodeHTML provide in ${cityName}?` : "What services does CodeHTML provide in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": cityData ? `CodeHTML provides custom website design, website development, e-commerce online stores, mobile app development, and custom business software in ${cityName}.` : "CodeHTML provides custom website design, website development, e-commerce online stores, mobile app development, and custom business software."
        }
      },
      {
        "@type": "Question",
        "name": cityData ? `How much does a website or app cost in ${cityName}?` : "How much does a website or app cost in Dubai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isIndia
            ? "Our custom website design starts at ₹15,000, website development starts at ₹38,000, and online store or mobile app development starts at ₹45,000. All options include 100% intellectual property ownership."
            : "Our custom website design starts at $200, website development starts at $500, and online store or mobile app development starts at $600. All options include 100% intellectual property ownership."
        }
      },
      {
        "@type": "Question",
        "name": "Why choose hand-written code over WordPress or templates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Custom-coded platforms render in under a second, eliminate database security exposures, avoid monthly plugin licensing fees, and score 100/100 on Lighthouse SEO performance indexes."
        }
      }
    ]
  };

  const trustStats = [
    {
      value: '40+',
      label: cityData ? `${cityData.sector} BRANDS` : 'DUBAI BRANDS',
      sub: 'TRUSTED TECH PARTNER'
    },
    {
      value: '118+',
      label: 'COMPLETED PLATFORMS',
      sub: 'CUSTOM ENGAGED REACT SHIELD'
    },
    {
      value: '99+',
      label: 'LIGHTHOUSE SPEEDS',
      sub: 'SUB-SECOND SECURE RESPONSE'
    },
    {
      value: '3-5',
      label: 'DAYS RAPID DELIVERY',
      sub: 'ZERO TEMPLATE CODING'
    },
    {
      value: 'ACTIVE',
      label: cityName ? `DOMINANCE IN ${cityName.toUpperCase()}` : 'WORLD WIDE',
      sub: 'LOCAL AREA AUTHORITY'
    }
  ];

  const displayRoute = cityData?.countrySlug
    ? `/location/${cityData.countrySlug}/${cityData.slug}`
    : (cityData?.slug ? `/${cityData.slug.replace(/__/g, '/')}` : `/areas`);

  const breadcrumbSchema = isCityLanding ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://codehtml.in"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": cityName,
      "item": `https://codehtml.in${displayRoute}`
    }]
  } : null;

  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "CodeHTML Custom Coded Software & Web Apps Studio",
    "description": "High-performance websites, web apps, SaaS tools, and mobile apps for businesses in Dubai.",
    "thumbnailUrl": [
      "https://codehtml.in/hero-section-img.webp"
    ],
    "uploadDate": "2026-05-30T08:00:00+08:00",
    "contentUrl": "https://codehtml.in/stitch_v1_compressed.mp4",
    "embedUrl": "https://codehtml.in/stitch_v1_compressed.mp4",
    "duration": "PT0M15S"
  };

  const localServiceSchema = isCityLanding ? {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `CodeHTML - ${displayCategory} in ${cityName}`,
    "description": getCompactDescription(),
    "url": `https://codehtml.in${displayRoute}`,
    "logo": "https://codehtml.in/Codehtml.logo.png",
    "image": getLocalizedGraphic().url,
    "priceRange": isIndia ? "₹15,000 - ₹2,50,000" : "$200 - $3,000",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": cityName,
      "addressCountry": isIndia ? "IN" : "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.1852",
      "longitude": "55.2679"
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": cityName
    }
  } : null;

  const schemaArray = [homeGeoSchema, videoSchema];
  if (breadcrumbSchema) schemaArray.push(breadcrumbSchema);
  if (localServiceSchema) schemaArray.push(localServiceSchema);

  const getBundlePrice = (planName) => {
    if (countryName === 'India') {
      return planName === 'STARTUP ENGINE' ? '₹15,000' : (planName === 'GROWTH SYSTEM' ? '₹85,000' : '₹2,50,000');
    }
    return planName === 'STARTUP ENGINE' ? '$200' : (planName === 'GROWTH SYSTEM' ? '$1,100' : '$3,000');
  };

  const getServicePrice = (serviceTitle, planName) => {
    const isInd = countryName === 'India';
    if (serviceTitle === 'WEBSITES') {
      if (planName === 'SINGLE PAGE') return isInd ? '₹15,000' : '$200';
      if (planName === 'MULTI PAGE') return isInd ? '₹38,000' : '$500';
      return isInd ? '₹1,10,000+' : '$1,500+';
    } else if (serviceTitle === 'WHATSAPP BOT') {
      if (planName === 'SETUP') return isInd ? '₹38,000' : '$500';
      return isInd ? '₹1,10,000' : '$1,500';
    } else if (serviceTitle === 'LOCAL SEO') {
      if (planName === 'SETUP') return isInd ? '₹15,000' : '$200';
      return isInd ? '₹38,000' : '$500';
    }
    return '';
  };



  const getHeroBgImage = () => {
    return '/hero-tech-bg.webp';
  };

  const getHeroHeadline = () => {
    return (
      <>
        Premium Custom Web &amp; <br className="hidden sm:inline" />
        <span className="font-elegant italic font-light text-vintage-gold lowercase tracking-normal">app development studio</span>
      </>
    );
  };

  function getCompactDescription() {
    return "We build custom websites, web apps, SaaS platforms, mobile apps & custom tools. We hand-write all code to guarantee sub-second speeds, zero recurring license fees, and 100% IP ownership.";
  }

  return (
    <main className="min-h-screen bg-black overflow-x-hidden text-white relative">
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        image={getLocalizedGraphic().url}
        imageAlt={isCityLanding ? `${displayCategory} in ${cityName} - CodeHTML` : getLocalizedGraphic().alt}
        schema={schemaArray}
      />

      {isCityLanding && <Breadcrumbs />}

      {/* Modern Luxury Radial Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute top-[120vh] right-1/4 w-[600px] h-[600px] bg-vintage-gold/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[10vh] left-1/3 w-[500px] h-[500px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <section
        id="home"
        className="w-full min-h-screen lg:h-screen relative flex items-center overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16 bg-black"
      >
        <div className="max-w-[1600px] w-full mx-auto px-6 sm:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            {/* Top Pill Accent */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-1.5 sm:gap-2 border border-vintage-gold/30 bg-black/50 backdrop-blur-md px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-none mb-4 lg:mb-6 text-[8px] sm:text-xs font-body font-bold uppercase tracking-[0.2em] text-vintage-gold shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-vintage-gold animate-pulse"></span>
              #1 custom solutions Globally
            </motion.div>

            {/* Mobile-only Hero Image: positioned directly below the #1 badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block lg:hidden w-full max-w-2xl mx-auto mb-6 relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-vintage-gold/30 to-zinc-800/30 rounded-2xl blur-lg opacity-70"></div>
              <div className="relative bg-zinc-950/80 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <img 
                  src="/hero-img.webp" 
                  alt={isCityLanding ? `CodeHTML - Custom ${displayCategory} in ${cityName}` : "CodeHTML - Custom Software & Web Development Studio"} 
                  className="w-full h-auto object-cover rounded-xl"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  width={1536}
                  height={1024}
                />
              </div>
            </motion.div>

            {/* Dynamic Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl"
            >
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-zinc-900 mb-4 lg:mb-6 text-left">
                Build Faster. <br />
                <span className="font-elegant italic font-light text-vintage-gold">Scale Smarter.</span>
              </h1>
            </motion.div>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-sm sm:text-base md:text-lg max-w-2xl text-left leading-relaxed font-semibold mb-6 lg:mb-8 text-zinc-600"
            >
              Custom websites, SaaS platforms, mobile apps, and <br className="hidden sm:inline" /> AI solutions built for growth.
            </motion.p>

            {/* AI Summary Box for AEO Optimization */}
            {isCityLanding && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="w-full max-w-2xl mb-6 border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md p-4 flex flex-col gap-2 rounded-none text-left"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-vintage-gold" />
                  <span className="font-body font-bold text-[9px] tracking-[0.2em] text-vintage-gold uppercase">
                    AI Search Summary / TL;DR
                  </span>
                </div>
                <p className="font-body text-[11px] sm:text-xs text-zinc-400 leading-relaxed">
                  <strong>CodeHTML Overview:</strong> We deliver custom-coded, zero-template <span className="text-white font-bold">{displayCategory.toLowerCase()}</span> in <span className="text-white font-bold">{cityName}</span> featuring sub-second Largest Contentful Paint (LCP) speeds, 100% intellectual property ownership, and zero ongoing builder fees. Professional setups starting from <span className="text-vintage-gold font-bold">{cityData?.pricing?.[0]?.price || (countryName === 'India' ? '₹15,000' : '$200')}</span> with rapid 7-10 days delivery.
                </p>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-start gap-4 w-full sm:w-auto"
            >
              <Link
                to="/pricing"
                className="w-full sm:w-auto bg-vintage-gold hover:bg-zinc-900 font-body font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-vintage-gold/10 flex items-center justify-center text-force-white"
              >
                Start Project →
              </Link>
              <a
                href="#portfolio"
                className="w-full sm:w-auto bg-white hover:bg-zinc-200 border border-black font-body font-bold text-[10px] sm:text-xs tracking-[0.15em] uppercase px-6 sm:px-8 py-3 sm:py-3.5 rounded-none transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center text-black"
              >
                View Work
              </a>
            </motion.div>

            {/* Avatar Stack Trust Badging */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-3 mt-6 select-none"
            >
              <div className="flex flex-col text-left">
                <span className="text-[11px] sm:text-xs font-bold text-white uppercase tracking-wider leading-none">
                  // 300+ Clients
                </span>
                <span className="text-[9px] text-vintage-gold font-semibold uppercase tracking-wider mt-1 leading-none">
                  Trusted Custom Studio
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Hero Image Card (hidden on mobile, flex on desktop) */}
          <div className="hidden lg:flex lg:col-span-7 w-full justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-2xl lg:max-w-none"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-vintage-gold/30 to-zinc-800/30 rounded-2xl blur-lg opacity-70"></div>
              <div className="relative bg-zinc-950/80 border border-white/10 p-2 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                <img 
                  src="/hero-img.webp" 
                  alt={isCityLanding ? `CodeHTML - Custom ${displayCategory} Developer in ${cityName}` : "CodeHTML - Custom React Web App Developers"} 
                  className="w-full h-auto object-cover rounded-xl"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                  width={1536}
                  height={1024}
                />
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Premium Trust Stats - Redesigned to be a Compact Full-Width Strip */}
      <div className="w-full bg-white/95 backdrop-blur-md border-y border-zinc-200 py-2.5 sm:py-3 z-20 relative">
        <div className="max-w-[1600px] mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">
          
          {/* Checkmarks - Infinite Left-to-Right Scrolling Marquee */}
          <div className="flex-grow overflow-hidden relative w-full lg:max-w-[70%] py-1">
            <style>{`
              @keyframes marquee-ltr {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
              }
              .animate-marquee-ltr {
                display: flex;
                width: max-content;
                animation: marquee-ltr 30s linear infinite;
              }
            `}</style>
            
            {/* Fade masks for premium look */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="animate-marquee-ltr gap-3 text-[10px] sm:text-xs font-bold text-zinc-700 uppercase tracking-wider">
              {[
                "Custom Built Solutions",
                "Fast Delivery",
                "5+ Years Experience",
                "300+ Projects Completed",
                "Zero Template Coding",
                "90+ Lighthouse Score",
                "Premium UX/UI Design",
                "24/7 Dedicated Support",
                "Enterprise-Grade Security",
                "Elite SaaS Development",
                // Repeat for seamless scrolling loop
                "Custom Built Solutions",
                "Fast Delivery",
                "5+ Years Experience",
                "300+ Projects Completed",
                "Zero Template Coding",
                "90+ Lighthouse Score",
                "Premium UX/UI Design",
                "24/7 Dedicated Support",
                "Enterprise-Grade Security",
                "Elite SaaS Development"
              ].map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5 sm:gap-2 bg-zinc-100/80 px-3 sm:px-4 py-1.5 sm:py-2 border border-zinc-200 rounded-none shrink-0 whitespace-nowrap mr-3">
                  <span className="text-blue-600 font-extrabold text-xs sm:text-base">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Rotating Stats component - Compact */}
          <div className="flex-shrink-0 bg-zinc-50 border border-zinc-200 px-6 py-2 w-full lg:w-auto min-w-[280px] rounded-none">
             <RotatingStatsComponent cityName={cityName} />
          </div>

        </div>
      </div>

      {/* About Us Section */}
      <section id="about-us-summary" className="px-4 sm:px-6 py-12 sm:py-20 bg-black relative z-10 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Image with custom gold accents and shadow */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="relative w-full max-w-xl group">
              <div className="absolute -inset-1 bg-gradient-to-r from-vintage-gold/20 to-zinc-950/20 rounded-none blur-md opacity-60"></div>
              <div className="relative bg-zinc-950 p-2 border border-white/5 rounded-none shadow-2xl">
                <img 
                  src="/about-section-img.webp" 
                  alt={isCityLanding ? `Premium ${displayCategory} Studio in ${cityName} - CodeHTML` : "CodeHTML - Premium Web Development and Custom Software Studio"} 
                  className="w-full h-auto object-cover rounded-none"
                  loading="lazy"
                  decoding="async"
                  width={1570}
                  height={1001}
                />
              </div>
            </div>
          </div>

          {/* Right Column: About details */}
          <div className="lg:col-span-6 text-left space-y-6">
            <div>
              <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.25em] uppercase mb-3 block">
                ABOUT CODEHTML
              </span>
              <h2 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl text-white uppercase leading-tight">
                WE ARE A PREMIUM <br />
                <span className="font-elegant italic font-light text-vintage-gold">DIGITAL ENGINEERING</span> STUDIO
              </h2>
            </div>
            
            <p className="font-body text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
              We specialize in engineering high-performance custom React websites, robust SaaS systems, and bespoke mobile architectures from the ground up. By deliberately avoiding template themes and builders, we write every single line of code by hand. This ensures sub-second load times, flawless search engine optimization, and bulletproof security structures designed to scale your business.
            </p>


            <div className="pt-4">
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 bg-vintage-gold text-white font-body font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-none cursor-pointer border border-vintage-gold"
              >
                Discover Our DNA ➲
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="px-4 sm:px-6 pt-12 pb-16 sm:pb-24 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <header className="mb-12 text-left">
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-none uppercase mt-0">
              OUR SERVICES
            </h2>
          </header>

          <div className="space-y-6">
            {navCategories.map((category) => {
              const baseRoute = category.id === 'aiSolutions' 
                ? '/ai-solutions' 
                : category.id === 'getMoreCustomers'
                  ? '/get-more-customers'
                  : `/${category.id}`;

              // Get first 3 items
              const topServices = category.items.slice(0, 3);

              return (
                <div key={category.id} className="flex flex-col gap-3">
                  {/* Category Header */}
                  <div className="flex items-center gap-4 border-b border-white/5 pb-2">
                    <h3 className="font-headline font-extrabold text-base sm:text-lg text-vintage-gold tracking-wider uppercase">
                      {category.title}
                    </h3>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                    <Link 
                      to={baseRoute}
                      className="font-body text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1"
                    >
                      View All →
                    </Link>
                  </div>

                  {/* 3 Top Services Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {topServices.map((item) => (
                      <Link
                        key={item.slug}
                        to={`${baseRoute}/${item.slug}`}
                        className="group relative bg-zinc-950/25 border border-white/5 p-5 rounded-none transition-all duration-300 hover:border-vintage-gold/50 hover:bg-zinc-900/10 text-left flex flex-col justify-between min-h-[140px] overflow-hidden"
                      >
                        {/* Background Image Watermark */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center opacity-[0.08] group-hover:opacity-[0.16] transition-opacity duration-300 pointer-events-none z-0"
                          style={{ backgroundImage: `url(${item.bgImage || category.bgImage})` }}
                        ></div>
                        
                        <div className="relative z-10">
                          <h4 className="font-headline font-extrabold text-sm sm:text-base text-white group-hover:text-vintage-gold transition-colors uppercase tracking-wide">
                            {item.name}
                          </h4>
                          <p className="font-body text-xs text-zinc-400 mt-1 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <div className="relative z-10 font-body text-[9px] font-bold text-vintage-gold mt-3 uppercase tracking-widest flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Explore Solution ➲
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* Process Section (How We Work) - Refactored with generic copy & gold theme */}
      <section
        id="process"
        className="px-4 md:px-12 pt-8 pb-8 md:pt-12 md:pb-14 bg-[#050505] border-y border-white/5 text-white"
      >
        <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <h2 className="font-body font-semibold text-2xl sm:text-3xl md:text-4xl text-white whitespace-normal md:whitespace-nowrap">
            OUR PRODUCT DEVELOPMENT PROCESS
          </h2>
          <div className="h-1 flex-grow bg-white text-white shadow-[4px_4px_0px_0px_#2563eb] opacity-40"></div>
        </div>
        <p className="font-body text-[10px] md:text-lg text-zinc-100 mb-8 font-bold tracking-normal max-w-2xl">
          From discovery to deployment — here's how we build websites, apps, and software products that scale.
        </p>

        {/* Part 1: Side-By-Side (Video & Result) - COMPACT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-4">
          <div className="md:col-span-7">
            <div className="border border-zinc-900 rounded-none bg-black relative aspect-video overflow-hidden group">
              <LazyVideo
                src="/stitch_v1_compressed.mp4"
                className="w-full h-full object-cover opacity-100"
              >
                <track kind="captions" src="/captions/stitch_v1.en.vtt" srcLang="en" label="English" />
              </LazyVideo>
              <div className="absolute top-4 left-4 bg-zinc-950 p-2 border border-vintage-gold -rotate-2 rounded-none text-xs">
                <span className="font-body font-semibold text-vintage-gold">
                  DESIGN STREAM
                </span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-4">
            <h2 className="font-body font-semibold text-2xl text-vintage-gold leading-none text-left">
              THE RESULT /
            </h2>

            <a
              href="#"
              className="w-full border border-zinc-900 rounded-none transition-all group overflow-hidden bg-black relative"
            >
              <div className="relative h-[140px] md:h-[280px] w-full">
                <img
                  src="/SwigatoIndia.webp"
                  alt="Swigato India Food License and Restaurant Onboarding Portal built by CodeHTML"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                {/* Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center select-none pointer-events-none">
                  <div className="bg-black/60 border border-vintage-gold p-3 md:p-4 backdrop-blur-sm rounded-none">
                    <h3 className="font-body font-semibold text-xl md:text-3xl text-white leading-none mb-2">
                      SWIGATO INDIA
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className="h-[2px] w-8 bg-vintage-gold text-white shadow-[4px_4px_0px_0px_#333]"></span>
                      <span className="font-body font-semibold text-[10px] text-vintage-gold tracking-normal">
                        DEMO PORTFOLIO →
                      </span>
                      <span className="h-[2px] w-8 bg-vintage-gold text-white shadow-[4px_4px_0px_0px_#333]"></span>
                    </div>
                  </div>
                </div>
                {/* Subtle Corner Label */}
                <div className="absolute top-0 right-0 bg-vintage-gold text-black px-2 py-1 font-body font-semibold text-[8px]">
                  FOOD FRANCHISE PORTAL
                </div>
              </div>
            </a>

            <div className="text-left w-full mt-2 md:mt-0 text-white">
              <p className="font-body text-[10px] md:text-sm text-black font-bold mt-2">
                Pure performance → hand-written code engineered for absolute speed.
              </p>
              <div className="h-px w-full bg-blue-400 mt-4 opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Showcase - Custom Client Integrations */}
      <section id="portfolio" className="px-4 sm:px-6 py-12 md:py-16 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
            <div className="max-w-2xl text-left">
              <h2 className="font-headline font-extrabold text-3xl sm:text-5xl md:text-6xl text-white uppercase leading-none tracking-tight">
                OUR MOST RECENT CLIENTS
              </h2>
            </div>
            <p className="font-body text-zinc-400 text-sm md:text-lg max-w-sm font-medium leading-relaxed text-left">
              We design digital systems and lead engines exclusively for premier real estate, construction, and high-growth B2B brands.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-6 max-w-[1600px] mx-auto w-full">
            {/* Left Button */}
            <button 
              onClick={() => setActiveDeckIdx((prev) => (prev - 1 + 6) % 6)}
              className="hidden md:flex flex-shrink-0 p-3 border border-zinc-200 hover:border-blue-500 hover:text-blue-500 text-zinc-800 transition-all bg-white shadow-md rounded-none items-center justify-center font-bold text-sm select-none z-30 h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
              aria-label="Previous Project"
            >
              ◀
            </button>

            {/* Carousel Content */}
            <div className="w-full max-w-none overflow-hidden">
              {/* Desktop Layout - 3 Cards Side-by-Side */}
              <div className="hidden md:grid grid-cols-3 gap-8 text-left items-stretch">
                {[
                  (activeDeckIdx - 1 + 6) % 6,
                  activeDeckIdx,
                  (activeDeckIdx + 1) % 6
                ].map((origIdx) => {
                  const client = clientCases[origIdx];
                  const isCenter = origIdx === activeDeckIdx;
                  return (
                    <div
                      key={origIdx}
                      onClick={!isCenter ? () => setActiveDeckIdx(origIdx) : undefined}
                      className={`group relative overflow-hidden bg-zinc-950/40 backdrop-blur-md border border-white/5 hover:border-vintage-gold/30 hover:bg-zinc-900/30 flex flex-col shadow-2xl transition-all duration-500 rounded-none cursor-pointer ${
                        isCenter ? 'scale-100 opacity-100 z-10' : 'scale-[0.88] opacity-50 z-0'
                      }`}
                    >
                      {/* Visual Asset Container */}
                      <a 
                        href={isCenter ? `https://${client.url.toLowerCase()}` : undefined} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="h-[250px] sm:h-[300px] overflow-hidden relative block cursor-pointer"
                        onClick={!isCenter ? (e) => e.preventDefault() : undefined}
                      >
                        <img 
                          src={client.image} 
                          alt={`${client.name} - Custom ${client.category} Portal developed by CodeHTML`} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                        
                        {/* Clean Tag for Category */}
                        <span className="absolute top-4 left-4 bg-zinc-900/90 text-white border border-white/5 text-[8px] sm:text-[9px] font-body font-bold px-3 py-1 uppercase tracking-widest rounded z-20">
                          {client.category}
                        </span>
                        
                        <span className="absolute bottom-4 right-4 bg-zinc-900/90 text-white border border-white/5 text-[8px] sm:text-[9px] font-body font-bold px-3 py-1 uppercase tracking-widest rounded z-20">
                          {client.url}
                        </span>
                      </a>

                      {/* Achievement Summary Section */}
                      <div className="px-5 py-4 border-t border-white/5 bg-black/20 flex-grow">
                        <p className="font-body text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed line-clamp-3">
                          {client.achievement}
                        </p>
                      </div>

                      {/* Bottom CTA Button */}
                      <div className="p-4 border-t border-white/5 bg-black/40">
                        <a 
                          href={isCenter ? `https://${client.url.toLowerCase()}` : undefined}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full font-body font-bold text-xs uppercase tracking-wider py-3 text-center transition-all block select-none border ${
                            isCenter 
                              ? 'bg-vintage-gold hover:bg-white text-black border-vintage-gold hover:border-white cursor-pointer' 
                              : 'bg-zinc-900/50 text-zinc-500 border-zinc-900 cursor-default'
                          }`}
                          onClick={!isCenter ? (e) => e.preventDefault() : undefined}
                        >
                          VISIT WEBSITE ➲
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile Layout - 1 Active Card */}
              <div className="block md:hidden w-full max-w-md mx-auto text-left">
                {(() => {
                  const client = clientCases[activeDeckIdx];
                  return (
                    <div className="group relative overflow-hidden bg-zinc-950/40 backdrop-blur-md border border-white/5 hover:border-vintage-gold/30 hover:bg-zinc-900/30 flex flex-col shadow-2xl transition-all duration-500 rounded-none w-full">
                      {/* Visual Asset Container */}
                      <div className="relative h-[250px] sm:h-[300px] overflow-hidden">
                        <a 
                          href={`https://${client.url.toLowerCase()}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="w-full h-full block cursor-pointer"
                        >
                          <img 
                            src={client.image} 
                            alt={`${client.name} - Custom ${client.category} Portal developed by CodeHTML`} 
                            className="w-full h-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                          
                          {/* Clean Tag for Category */}
                          <span className="absolute top-4 left-4 bg-zinc-900/90 text-white border border-white/5 text-[8px] sm:text-[9px] font-body font-bold px-3 py-1 uppercase tracking-widest rounded z-20">
                            {client.category}
                          </span>
                          
                          <span className="absolute bottom-4 right-4 bg-zinc-900/90 text-white border border-white/5 text-[8px] sm:text-[9px] font-body font-bold px-3 py-1 uppercase tracking-widest rounded z-20">
                            {client.url}
                          </span>
                        </a>

                        {/* Mobile Left Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDeckIdx((prev) => (prev - 1 + 6) % 6);
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:border-vintage-gold text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                          aria-label="Previous Project"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Mobile Right Arrow */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setActiveDeckIdx((prev) => (prev + 1) % 6);
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-black/60 border border-white/10 hover:border-vintage-gold text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
                          aria-label="Next Project"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Achievement Summary Section */}
                      <div className="px-5 py-4 border-t border-white/5 bg-black/20 flex-grow">
                        <p className="font-body text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed line-clamp-3">
                          {client.achievement}
                        </p>
                      </div>

                      {/* Bottom CTA Button */}
                      <div className="p-4 border-t border-white/5 bg-black/40">
                        <a 
                          href={`https://${client.url.toLowerCase()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-vintage-gold hover:bg-white text-black font-body font-bold text-xs uppercase tracking-wider py-3 text-center transition-all block select-none border border-vintage-gold hover:border-white cursor-pointer"
                        >
                          VISIT WEBSITE ➲
                        </a>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Right Button */}
            <button 
              onClick={() => setActiveDeckIdx((prev) => (prev + 1) % 6)}
              className="hidden md:flex flex-shrink-0 p-3 border border-zinc-200 hover:border-blue-500 hover:text-blue-500 text-zinc-800 transition-all bg-white shadow-md rounded-none items-center justify-center font-bold text-sm select-none z-30 h-10 w-10 sm:h-12 sm:w-12 cursor-pointer"
              aria-label="Next Project"
            >
              ▶
            </button>
          </div>
        </div>
      </section>



      {/* Noir Elite Pricing Bundles */}
      <section id="pricing" className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-black relative border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-6 sm:mb-10">
            <h2 className="font-headline font-extrabold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white uppercase leading-none tracking-tight">
              INVESTMENT OPTIONS
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-start">
            {eliteBundles.map((plan, i) => {
              const isExpanded = activePlanMobile === i;
              return (
                <div 
                  key={i} 
                  className={`group bg-zinc-950/40 backdrop-blur-md border p-5 sm:p-6 rounded-xl sm:rounded-2xl flex flex-col justify-between md:min-h-[440px] relative transition-all duration-500 hover:bg-zinc-950/80 cursor-pointer md:cursor-default ${
                    i === 1 ? 'border-vintage-gold/50 shadow-lg shadow-vintage-gold/5' : 'border-white/5'
                  }`}
                  onClick={() => setActivePlanMobile(prev => prev === i ? null : i)}
                >
                  {i === 1 && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-vintage-gold text-black text-[9px] font-body font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </span>
                  )}
                  
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-headline font-extrabold text-lg sm:text-xl text-white uppercase tracking-tight">{plan.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="font-body font-bold text-[10px] text-zinc-600">0{i+1}</span>
                        {/* Mobile Expand/Collapse Indicator */}
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-vintage-gold transition-transform duration-300 md:hidden ${
                            isExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <span className="font-body text-zinc-500 text-[8px] font-bold tracking-widest uppercase block mb-1">STARTING FROM</span>
                      <p className="font-headline font-extrabold text-xl sm:text-3xl md:text-4xl text-white mb-1">{plan.price || getBundlePrice(plan.name)}</p>
                      <p className="font-body font-bold text-[9px] text-vintage-gold uppercase tracking-widest opacity-80">{plan.focus}</p>
                    </div>

                    {/* Desktop Content Block - Always Visible */}
                    <div className="hidden md:block">
                      <div className="h-px w-full bg-white/5 mb-4"></div>
                      <ul className="space-y-2 mb-6 text-left">
                        {plan.features.map((f, fi) => (
                          <li key={fi} className="flex items-start gap-2 text-xs md:text-sm text-zinc-400 font-medium">
                            <span className="text-vintage-gold mt-0.5">➲</span> 
                            <span className="group-hover:text-zinc-200 transition-colors uppercase font-bold text-[10px] md:text-xs">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mobile Content Block - Collapsable */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="features-mobile"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="md:hidden overflow-hidden w-full text-left"
                        >
                          <div className="h-px w-full bg-white/5 my-4"></div>
                          <ul className="space-y-2 mb-6">
                            {plan.features.map((f, fi) => (
                              <li key={fi} className="flex items-start gap-2 text-xs text-zinc-400 font-medium">
                                <span className="text-vintage-gold mt-0.5">➲</span> 
                                <span className="uppercase font-bold text-[10px]">{f}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Desktop CTA Button */}
                  <a 
                    href={getWhatsAppLink(`Hi CodeHTML, initiating protocol for the ${plan.name} package.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`hidden md:block w-full py-3 text-center font-body font-bold text-[10px] sm:text-xs rounded-xl sm:rounded-full transition-all duration-300 uppercase tracking-wider shadow-lg ${
                      i === 1 
                        ? 'bg-vintage-gold hover:bg-white text-black' 
                        : 'bg-white hover:bg-vintage-gold hover:text-black text-black'
                    }`}
                  >
                    Get Started ➲
                  </a>

                  {/* Mobile CTA Button - Collapsable */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        key="button-mobile"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden overflow-hidden w-full mt-4"
                      >
                        <a 
                          href={getWhatsAppLink(`Hi CodeHTML, initiating protocol for the ${plan.name} package.`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`w-full py-3 text-center font-body font-bold text-[10px] rounded-xl transition-all duration-350 uppercase tracking-wider block shadow-lg ${
                            i === 1 
                              ? 'bg-vintage-gold text-black' 
                              : 'bg-white text-black'
                          }`}
                        >
                          Get Started ➲
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Redesigned completely to a Split Layout with a Single Row Marquee */}
      <section id="testimonials" className="px-4 sm:px-6 py-8 sm:py-10 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-3 xl:col-span-2 text-left flex flex-col justify-center">
            <div>
              <span className="font-body font-bold text-blue-600 text-xs tracking-[0.25em] uppercase mb-3 block">
                CLIENT TRUST & VALIDATION
              </span>
              <h2 className="font-headline font-black text-3xl sm:text-5xl text-zinc-900 uppercase leading-none tracking-tight">
                WHAT OUR <br />
                <span className="font-elegant italic font-light text-blue-600 lowercase tracking-normal">clients</span> SAY
              </h2>
            </div>
          </div>

          {/* Right Column: Single Line Infinite Marquee Slider */}
          <div className="lg:col-span-9 xl:col-span-10 overflow-hidden relative select-none w-full py-4">
            {/* Fade overlays for premium blend */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 to-slate-50/0 z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 to-slate-50/0 z-20 pointer-events-none"></div>

            <div className="flex gap-6 animate-marquee-reverse w-[max-content]">
              {[
                {
                  quote: "CodeHTML built a custom property management web app for alayarealty.in that completely blew our expectations. Our site speed went from 5.4s to 0.7s, and the custom real-time inventory synchronization works flawlessly!",
                  name: "Farhan Alaya",
                  role: "FOUNDER, ALAYAREALTY.IN"
                },
                {
                  quote: "The restaurant delivery portal and booking dashboard CodeHTML built for swigatoindia.in is incredibly fast. Order routing is instant and SEO traffic has grown by 300% since launch.",
                  name: "Sandeep Verma",
                  role: "OPERATIONS LEAD, SWIGATOINDIA.IN"
                },
                {
                  quote: "We needed a real-time collaborative workspace for our SaaS documentation at thecircle.in. The sub-second markdown editor and syncing engine built by CodeHTML are engineering masterpieces.",
                  name: "Rahul Sen",
                  role: "TECH CO-FOUNDER, THECIRCLE.IN"
                },
                {
                  quote: "Managing corporate summit ticketing and sponsorship assets for crystamedia.in used to take hours. The automated booking pipeline CodeHTML developed is flawless.",
                  name: "Meera Sen",
                  role: "SUMMIT DIRECTOR, CRYSTAMEDIA.IN"
                },
                {
                  quote: "Our B2B construction bidding portal at slcc.in requires heavy architectural model rendering. The custom React frontend runs sub-second and lead conversions increased by 250%!",
                  name: "Siddharth Lakhani",
                  role: "CEO, SLCC.IN"
                }
              ].concat([
                {
                  quote: "CodeHTML built a custom property management web app for alayarealty.in that completely blew our expectations. Our site speed went from 5.4s to 0.7s, and the custom real-time inventory synchronization works flawlessly!",
                  name: "Farhan Alaya",
                  role: "FOUNDER, ALAYAREALTY.IN"
                },
                {
                  quote: "The restaurant delivery portal and booking dashboard CodeHTML built for swigatoindia.in is incredibly fast. Order routing is instant and SEO traffic has grown by 300% since launch.",
                  name: "Sandeep Verma",
                  role: "OPERATIONS LEAD, SWIGATOINDIA.IN"
                },
                {
                  quote: "We needed a real-time collaborative workspace for our SaaS documentation at thecircle.in. The sub-second markdown editor and syncing engine built by CodeHTML are engineering masterpieces.",
                  name: "Rahul Sen",
                  role: "TECH CO-FOUNDER, THECIRCLE.IN"
                },
                {
                  quote: "Managing corporate summit ticketing and sponsorship assets for crystamedia.in used to take hours. The automated booking pipeline CodeHTML developed is flawless.",
                  name: "Meera Sen",
                  role: "SUMMIT DIRECTOR, CRYSTAMEDIA.IN"
                },
                {
                  quote: "Our B2B construction bidding portal at slcc.in requires heavy architectural model rendering. The custom React frontend runs sub-second and lead conversions increased by 250%!",
                  name: "Siddharth Lakhani",
                  role: "CEO, SLCC.IN"
                }
              ]).map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-zinc-200 p-4 flex flex-col justify-between w-[280px] sm:w-[320px] min-h-[120px] flex-shrink-0 text-left rounded-none shadow-sm"
                >
                  <div>
                    <p className="font-body font-medium text-xs text-zinc-700 italic leading-normal line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>
                  
                  <div className="pt-2.5 border-t border-zinc-100 mt-2.5">
                    <h4 className="font-headline font-extrabold text-[10px] sm:text-xs text-zinc-900 leading-none mb-1 uppercase tracking-tight">
                      {item.name}
                    </h4>
                    <span className="font-body font-bold text-blue-600 text-[8px] tracking-widest uppercase">
                      {item.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Manifesto / The Standard */}
      <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-black border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 items-center">
            <div className="lg:col-span-5 text-left">
              <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-4 block">THE CODEHTML STANDARD</span>
              <h2 className="font-headline font-extrabold text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-none uppercase mb-4 sm:mb-8">
                {cityData ? `Why Choose CodeHTML in ${cityName}` : <>Why We <br /> <span className="font-elegant italic font-light text-vintage-gold">Stand Alone.</span></>}
              </h2>
              <p className="font-body text-zinc-400 text-xs sm:text-sm md:text-lg leading-relaxed mb-6 sm:mb-10 font-medium">
                Most agencies deliver slow templates and bloated builders. We write bespoke code optimized for high performance, guaranteed speeds, and automated lead capture.
              </p>
              <div className="flex gap-4 sm:gap-8 border-t border-white/5 pt-4 sm:pt-8">
                <div>
                  <span className="block text-vintage-gold font-headline font-extrabold text-xl sm:text-3xl md:text-4xl">&lt;1s</span>
                  <span className="text-zinc-500 font-body font-bold text-[9px] tracking-widest uppercase">LOAD TIME</span>
                </div>
                <div>
                  <span className="block text-white font-headline font-extrabold text-xl sm:text-3xl md:text-4xl">100%</span>
                  <span className="text-zinc-500 font-body font-bold text-[9px] tracking-widest uppercase">SEO SCORE</span>
                </div>
                <div>
                  <span className="block text-vintage-gold font-headline font-extrabold text-xl sm:text-3xl md:text-4xl">24/7</span>
                  <span className="text-zinc-500 font-body font-bold text-[9px] tracking-widest uppercase">AUTOMATION</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {[
                { title: 'Sub-Second Speeds', desc: 'Bespoke, custom-coded design makes your website load instantly, keeping customers engaged without frustrating delays.' },
                { title: 'Intellectual Property', desc: 'You get 100% full ownership of your clean source code with zero monthly fees, locking platform costs, or subscription traps.' },
                { title: 'AI & Organic SEO', desc: 'Directly map and optimize your pages for Google search and AI answer engines, driving organic customer leads to your brand.' }
              ].map((item, idx) => {
                const isExpanded = activeStandardMobile === idx;
                return (
                  <div 
                    key={idx} 
                    className="p-4 sm:p-6 bg-zinc-950/40 border border-white/5 rounded-xl sm:rounded-2xl cursor-pointer md:cursor-default"
                    onClick={() => setActiveStandardMobile(prev => prev === idx ? null : idx)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-headline font-bold text-sm sm:text-lg text-white uppercase">{item.title}</h3>
                      <ChevronDown 
                        className={`w-3.5 h-3.5 text-vintage-gold transition-transform duration-300 md:hidden ${
                          isExpanded ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </div>
                    
                    {/* Desktop Description - Always Visible */}
                    <p className="hidden md:block font-body text-zinc-400 text-xs md:text-sm font-medium leading-relaxed mt-2">{item.desc}</p>
                    
                    {/* Mobile Description - Collapsable */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="md:hidden overflow-hidden font-body text-zinc-400 text-[11px] font-medium leading-relaxed mt-2"
                        >
                          {item.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>



      {/* Dynamic City-Specific FAQs */}
      {cityData && cityData.faqs && cityData.faqs.length > 0 && (
        <section className="px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-black border-t border-white/5">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8 sm:mb-16 text-center md:text-left">
              <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-4 block">LOCAL KNOWLEDGE</span>
              <h2 className="font-headline font-extrabold text-xl sm:text-4xl md:text-5xl text-white uppercase leading-none">
                FREQUENTLY ASKED IN {cityName}
              </h2>
            </header>
            <div className="space-y-4 sm:space-y-6">
              {cityData.faqs.map((faq, idx) => (
                <div key={idx} className="bg-zinc-950/60 border border-white/5 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-left">
                  <h3 className="font-headline font-bold text-xs sm:text-lg text-white mb-2 sm:mb-3 flex items-start gap-2 sm:gap-3">
                    <span className="text-vintage-gold">Q.</span> <span>{faq.question}</span>
                  </h3>
                  <p className="font-body text-zinc-400 text-[11px] sm:text-xs md:text-sm font-medium leading-relaxed pl-5 sm:pl-7">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 py-10 sm:py-16 md:py-20 bg-[#050505] relative z-10 border-t border-white/5">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-6 text-left">
            <h2 className="font-headline font-extrabold text-3xl sm:text-6xl md:text-7xl text-white leading-none mb-6 uppercase">
              {cityData ? `Get a Free Quote in ${cityName}` : 'Get a Free Quote'}
            </h2>
            {cityData?.quoteSection && (
              <p className="font-body text-zinc-400 text-xs sm:text-sm md:text-lg leading-relaxed mb-8 font-medium max-w-xl text-left">
                {cityData.quoteSection}
              </p>
            )}

            <div className="space-y-4 max-w-md">
              {/* Email Card */}
              <div className="p-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 hover:border-[#D4AF37] rounded-none transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                <div>
                  <span className="block font-body text-[8px] font-bold text-[#D4AF37] tracking-widest uppercase mb-1">EMAIL ID</span>
                  <a href="mailto:Contact@Codehtml.in" className="font-headline font-extrabold text-sm sm:text-lg text-white group-hover:text-[#D4AF37] transition-colors break-all uppercase">
                    Contact@Codehtml.in
                  </a>
                </div>
                <button 
                  onClick={() => {
                    setEmailRevealed(true);
                    navigator.clipboard.writeText('Contact@Codehtml.in');
                    setTimeout(() => setEmailRevealed(false), 3000);
                  }}
                  className="bg-white text-black border border-black hover:bg-black hover:text-white font-body font-bold text-[9px] uppercase tracking-wider px-4 py-2 transition-all rounded-none self-stretch sm:self-auto text-center cursor-pointer"
                >
                  {emailRevealed ? 'Copied!' : 'Copy Email'}
                </button>
              </div>

              {/* WhatsApp Card */}
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-[#25D366]/5 border border-[#25D366]/20 hover:border-[#25D366] rounded-none transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group cursor-pointer"
              >
                <div>
                  <span className="block font-body text-[8px] font-bold text-[#25D366] tracking-widest uppercase mb-1">INLINE PROTOCOL</span>
                  <span className="font-headline font-extrabold text-sm sm:text-lg text-white group-hover:text-[#25D366] transition-colors uppercase">
                    WHATSAPP CHAT
                  </span>
                </div>
                <span className="bg-white text-black border border-black hover:bg-black hover:text-white font-body font-bold text-[9px] uppercase tracking-wider px-4 py-2 transition-all rounded-none self-stretch sm:self-auto text-center">
                  Chat Now ➲
                </span>
              </a>

              {/* LinkedIn Card */}
              <a 
                href="https://www.linkedin.com/company/codehtml"
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 bg-[#0077B5]/5 border border-[#0077B5]/20 hover:border-[#0077B5] rounded-none transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group cursor-pointer"
              >
                <div>
                  <span className="block font-body text-[8px] font-bold text-[#0077B5] tracking-widest uppercase mb-1">LINKEDIN CONNECT</span>
                  <span className="font-headline font-extrabold text-sm sm:text-lg text-white group-hover:text-[#0077B5] transition-colors uppercase">
                    CODEHTML
                  </span>
                </div>
                <span className="bg-white text-black border border-black hover:bg-black hover:text-white font-body font-bold text-[9px] uppercase tracking-wider px-4 py-2 transition-all rounded-none self-stretch sm:self-auto text-center">
                  Connect ➲
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Simple Contact Form */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 sm:p-10 relative overflow-hidden group rounded-none text-left shadow-lg">
              <h3 className="font-headline font-extrabold text-xl sm:text-2xl text-white leading-tight uppercase mb-6">
                SUBMIT A PROJECT BRIEF
              </h3>

              {contactStatus === 'success' ? (
                <div className="space-y-4 py-8 text-center">
                  <div className="w-12 h-12 bg-vintage-gold/10 border border-vintage-gold/30 flex items-center justify-center rounded-none mx-auto">
                    <span style={{ color: '#ffffff' }} className="text-xl">✓</span>
                  </div>
                  <h4 className="font-headline font-bold text-lg uppercase text-white">Transmission Received</h4>
                  <p className="font-body text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Our team has indexed your brief. We will establish contact with you shortly.
                  </p>
                  <button 
                    onClick={() => setContactStatus('idle')}
                    className="font-body text-[9px] font-bold text-vintage-gold uppercase tracking-[0.2em] border-b border-vintage-gold/20 hover:border-vintage-gold transition-colors pt-2"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-500 tracking-widest uppercase mb-1.5">FULL NAME</label>
                    <input 
                      type="text" 
                      name="name"
                      value={contactData.name}
                      onChange={handleContactChange}
                      required
                      placeholder="User"
                      className="w-full bg-black/60 border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 focus:ring-1 focus:ring-vintage-gold/20 transition-all font-body font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-[9px] font-bold text-zinc-500 tracking-widest uppercase mb-1.5">EMAIL ADDRESS</label>
                      <input 
                        type="email" 
                        name="email"
                        value={contactData.email}
                        onChange={handleContactChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-black/60 border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 focus:ring-1 focus:ring-vintage-gold/20 transition-all font-body font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-[9px] font-bold text-zinc-500 tracking-widest uppercase mb-1.5">PHONE NUMBER</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={contactData.phone}
                        onChange={handleContactChange}
                        placeholder="+91 Phone"
                        className="w-full bg-black/60 border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 focus:ring-1 focus:ring-vintage-gold/20 transition-all font-body font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-500 tracking-widest uppercase mb-1.5">PROJECT DETAILS</label>
                    <textarea 
                      name="message"
                      value={contactData.message}
                      onChange={handleContactChange}
                      required
                      rows="4"
                      placeholder="Outline your application features, design goals, and deployment deadlines..."
                      className="w-full bg-black/60 border border-white/10 rounded-none px-4 py-2.5 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-vintage-gold/50 focus:ring-1 focus:ring-vintage-gold/20 transition-all font-body font-medium resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    disabled={contactStatus === 'submitting'}
                    className="w-full text-center py-3.5 flex items-center justify-center gap-3 font-headline font-bold text-xs uppercase tracking-widest disabled:opacity-50 bg-vintage-gold hover:bg-white text-black transition-all cursor-pointer"
                  >
                    {contactStatus === 'submitting' ? 'TRANSMITTING BRIEF...' : 'SUBMIT BRIEF ➲'}
                  </button>

                  {contactStatus === 'error' && (
                    <p className="font-body text-[9px] text-red-500 uppercase tracking-wide text-center">
                      Transmission failed. Please email Contact@Codehtml.in directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>



      {/* Agency Partner Banner for City Landing Pages */}
      {isCityLanding && (
        <section className="py-16 bg-gradient-to-r from-black to-zinc-950 border-t border-white/5 relative z-10 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <span className="font-body font-bold text-vintage-gold text-[10px] tracking-[0.25em] uppercase mb-3 block">
              🤝 AGENCY PARTNERSHIP OPPORTUNITY IN {cityName.toUpperCase()}
            </span>
            <h3 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase mb-4">
              Are you a marketing or creative agency in {cityName}?
            </h3>
            <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mb-8 leading-relaxed">
              Partner with CodeHTML and expand your services. Deliver elite custom websites, SaaS platforms, and mobile apps to your clients under your own brand and earn on every referral.
            </p>
            <Link 
              to="/partner" 
              className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-vintage-gold border border-vintage-gold text-vintage-gold hover:text-black font-body font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all"
            >
              Learn More About Our Partner Program
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      {/* Localized SEO Search Targets */}
      {isCityLanding && (
        <section className="py-16 bg-black border-t border-white/5 relative z-10 text-left">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12">
            <span className="font-body font-bold text-vintage-gold text-[10px] tracking-[0.25em] uppercase mb-2 block">LOCAL SERVICE DIRECTORY</span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-3xl text-white uppercase leading-none mb-4">
              Local SEO &amp; Tech Hubs in {cityName}
            </h2>
            <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mb-8 leading-relaxed font-semibold">
              Explore our target engineering segments, custom web designs, and mobile app developments optimized for search indexing in {cityName}.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: `Web Development Company`, kw: 'website-development-company', desc: 'Bespoke high-performance React builds.' },
                { name: `Web Design Agency`, kw: 'web-design-agency', desc: 'Sleek luxury creative user experiences.' },
                { name: `Mobile App Development`, kw: 'mobile-app-development-company', desc: 'React Native iOS & Android applications.' },
                { name: `Software Development Company`, kw: 'software-development-company', desc: 'Custom database dashboards & SaaS platforms.' }
              ].map((item, idx) => {
                const citySlug = cityData?.slug?.includes('-in-') ? cityData.slug.split('-in-')[1] : (cityData?.slug || toSlug(cityName));
                return (
                  <Link
                    key={idx}
                    to={`/${item.kw}-in-${citySlug}`}
                    className="p-5 bg-zinc-950/40 border border-white/5 hover:border-vintage-gold/30 rounded-none transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <h4 className="font-headline font-bold text-sm text-white uppercase group-hover:text-vintage-gold transition-colors mb-2">
                        {item.name} in {cityName}
                      </h4>
                      <p className="font-body text-zinc-500 text-[10px] leading-relaxed font-medium mb-4">
                        {item.desc}
                      </p>
                    </div>
                    <span className="text-vintage-gold font-body font-bold text-[9px] uppercase tracking-wider group-hover:underline">
                      Explore Service ➲
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Nearby Cities Section */}
            {getNearbyCities(cityData).length > 0 && (
              <div className="mt-16 border-t border-white/5 pt-16">
                <span className="font-body font-bold text-vintage-gold text-[10px] tracking-[0.25em] uppercase mb-2 block">GEOGRAPHIC EXPANSION</span>
                <h3 className="font-headline font-extrabold text-2xl text-white uppercase mb-4">
                  Other Cities Near {cityName}
                </h3>
                <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mb-8 leading-relaxed font-semibold">
                  Explore our custom development, website design, and mobile app services in other areas near {cityName}.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {getNearbyCities(cityData).map((city, idx) => {
                    const kwSlug = getKeywordSlug(cityData.slug);
                    return (
                      <Link
                        key={idx}
                        to={`/${kwSlug}-in-${city.slug}`}
                        className="p-4 bg-zinc-950/40 border border-white/5 hover:border-vintage-gold/30 hover:bg-zinc-900/10 text-center transition-all group"
                      >
                        <h4 className="font-headline font-semibold text-xs sm:text-sm text-zinc-300 group-hover:text-vintage-gold transition-colors mb-1">
                          {cityData.keyword ? `${cityData.keyword.charAt(0).toUpperCase() + cityData.keyword.slice(1)} in ${city.name}` : city.name}
                        </h4>
                        <span className="text-vintage-gold/60 font-body font-bold text-[8px] uppercase tracking-wider group-hover:text-vintage-gold transition-colors">
                          View Service ➲
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </section>
      )}



      {cityName && <GeoSEOBlock cityName={cityName} />}
    </main>
  );
};

export default Home;
