import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';
import { getNewServiceLink } from '../data/servicesDataNew';
import { detectCountryName, detectIfIndia } from '../utils/region';
import { useCurrency, formatPrice as globalFormatPrice } from '../utils/currency';
import { db } from '../services/database';
import { 
  Globe, 
  Layers, 
  Cpu, 
  Smartphone, 
  Sparkles, 
  Rocket, 
  TrendingUp, 
  Check, 
  ShieldCheck, 
  Info, 
  ArrowRight,
  DollarSign
} from 'lucide-react';

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useCurrency();
  const [countryName] = useState(() => detectCountryName());
  const [activeFaq, setActiveFaq] = useState(null);
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const data = await db.getPricingOverrides();
        setOverrides(data);
      } catch (err) {
        console.error("Failed to load custom pricing overrides", err);
      }
    };
    fetchPricing();
  }, []);

  // Helper to format currency symbol and value dynamically, supporting database overrides
  const getPriceVal = (catId, tierKey, baselineUsd) => {
    const override = overrides[catId]?.[tierKey];
    const finalUsd = override !== undefined ? override : baselineUsd;
    return globalFormatPrice(finalUsd, selectedCurrency);
  };

  const pricingData = [
    {
      id: 'products',
      title: 'Products',
      desc: 'Custom multi-tenant software platforms, supplier/client portals, custom CRM dashboards, and internal business databases.',
      icon: <Layers className="w-5 h-5 text-vintage-gold" />,
      tiers: [
        {
          name: 'BASIC PORTALS',
          price: getPriceVal('products', 'basic', 600),
          focus: 'CLIENT & USER PORTALS',
          delivery: '21 Days Delivery',
          features: [
            'Secure Login & Client Portals',
            'Basic Database Integration',
            'Custom Admin Dashboard',
            'Role-Based Access Control',
            '21 Days Rapid Delivery'
          ]
        },
        {
          name: 'BUSINESS PORTALS',
          price: getPriceVal('products', 'mid', 1200),
          focus: 'CUSTOM CRM & ERP SYSTEMS',
          delivery: '35 Days Delivery',
          popular: true,
          features: [
            'Multi-Tenant CRM/ERP Pipelines',
            'Automated Invoicing & Workflows',
            'API Integrations & Syncing',
            'Fuzzy Database Search Overlay',
            '35 Days Delivery'
          ]
        },
        {
          name: 'ENTERPRISE PROTOCOL',
          price: getPriceVal('products', 'enterprise', 3000),
          focus: 'COMPLETE CUSTOM PLATFORMS',
          delivery: '45 Days Delivery',
          features: [
            'Scale-Ready Custom Platforms',
            'Multi-User Role Access Matrix',
            'Stripe Connect Marketplace Engine',
            'Continuous Deployment Pipelines',
            'Priority SLA Support 24/7'
          ]
        }
      ]
    },
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      desc: 'Conversational AI WhatsApp voice & text automated customer support, n8n automated workflow pipelines, and custom prompt consultancies.',
      icon: <Sparkles className="w-5 h-5 text-vintage-gold" />,
      tiers: [
        {
          name: 'CONVERSATIONAL BOT',
          price: getPriceVal('ai-solutions', 'basic', 400),
          focus: 'WHATSAPP & WEB CHATBOTS',
          delivery: '14 Days Delivery',
          features: [
            'Single-Channel Automated Support',
            'WhatsApp / Web Chat Integration',
            'Custom AI Conversations Flow',
            'Lead Ingest Contact Creation',
            '14 Days Delivery Time'
          ]
        },
        {
          name: 'AI SALES AGENT',
          price: getPriceVal('ai-solutions', 'mid', 1000),
          focus: 'AUTONOMOUS QUALIFIER BOTS',
          delivery: '28 Days Delivery',
          popular: true,
          features: [
            'AI Voice & Text Conversations',
            'Database Search Integration',
            'Automated Stripe Payments Flow',
            'Lead Qualification Logic',
            '28 Days Delivery'
          ]
        },
        {
          name: 'ENTERPRISE AUTOMATION',
          price: getPriceVal('ai-solutions', 'enterprise', 2500),
          focus: 'n8n PIPELINES & AGENTS',
          delivery: '45 Days Delivery',
          features: [
            'Custom LLM Model Fine-Tuning',
            'Multi-Channel Autonomous Agents',
            'n8n Complex Pipeline Workflow',
            'Semantic Search Database RAG',
            'Priority SLA Support 24/7'
          ]
        }
      ]
    },
    {
      id: 'get-more-customers',
      title: 'Get More Customers',
      desc: 'Search Engine Optimization (SEO), Generative AI Engine Optimization (AEO), outbound leads databases, and high-converting marketing landing pages.',
      icon: <TrendingUp className="w-5 h-5 text-vintage-gold" />,
      tiers: [
        {
          name: 'LOCAL SEO ENGINE',
          price: getPriceVal('get-more-customers', 'basic', 300),
          focus: 'LOCAL CITATIONS & GA4 SETUP',
          delivery: '10 Days Delivery',
          features: [
            'Google Analytics 4 & Tag Manager',
            'Maps Pack Citation Authority',
            'Local Review Booster Engine',
            'Technical Schema.org Markup',
            '10 Days Delivery Time'
          ]
        },
        {
          name: 'AEO OPTIMIZER',
          price: getPriceVal('get-more-customers', 'mid', 750),
          focus: 'GENERATIVE AI INDEXING',
          delivery: '21 Days Delivery',
          popular: true,
          features: [
            'Rank on ChatGPT, Claude & Gemini',
            'High-Converting Exit-Intent Landing Page',
            'Outbound B2B Leads Databases',
            'Performance PPC Ads Campaign Audit',
            '21 Days Delivery'
          ]
        },
        {
          name: 'DOMINANCE SUITE',
          price: getPriceVal('get-more-customers', 'enterprise', 1800),
          focus: 'COMPLETE BRAND ACQUISITION',
          delivery: '35 Days Delivery',
          features: [
            'Monthly Site Speed Code Tuning',
            'Conversion Rate Optimization Plan',
            'Automated welcome & dunning campaigns',
            'Local Authority Acquisition Mappings',
            'Priority SLA Support 24/7'
          ]
        }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      desc: 'Hand-coded React corporate websites, custom database-driven dashboards, and native iOS/Android mobile applications.',
      icon: <Globe className="w-5 h-5 text-vintage-gold" />,
      tiers: [
        {
          name: 'CORPORATE SITE',
          price: getPriceVal('services', 'basic', 200),
          focus: 'HAND-CODED STATIC SITES',
          delivery: '10 Days Delivery',
          features: [
            'Responsive Mobile-First Interfaces',
            'Sub-second Loading Speed Optimization',
            'Contact Form Capture Sync',
            'React/Vite Core Framework',
            '10 Days Delivery Time'
          ]
        },
        {
          name: 'CUSTOM E-COMMERCE',
          price: getPriceVal('services', 'mid', 500),
          focus: 'HEADLESS ONLINE STORES',
          delivery: '21 Days Delivery',
          popular: true,
          features: [
            'Tailored Headless Shopping Cart',
            'Inventory Database Management Panel',
            'Apple Pay & Stripe Checkouts',
            'Shopify/Magento API Sync Layers',
            '21 Days Delivery'
          ]
        },
        {
          name: 'CROSS-PLATFORM APPS',
          price: getPriceVal('services', 'enterprise', 1500),
          focus: 'NATIVE IOS & ANDROID APPS',
          delivery: '45 Days Delivery',
          features: [
            'Native Swift & Kotlin Mobile Apps',
            'App Store Submissions Approval',
            'Biometric Authentication Sync',
            'Shared universal component libraries',
            'Continuous maintenance SLA support'
          ]
        }
      ]
    }
  ];

  const faqs = [
    {
      q: 'Do you charge monthly recurring platform or licensing fees?',
      a: 'Absolutely not. Because we build everything using custom hand-written code (React, Next.js, HTML5/CSS3) and plug in standard developer tools, you do not have to pay bloated monthly platform fees. You pay only for standard cloud server hosting and API usage directly to the providers (like AWS, Meta, or Stripe).'
    },
    {
      q: 'Do we get 100% intellectual property and code ownership?',
      a: 'Yes, 100%. Upon completion of the project and clearance of payments, the entire code repository, figma UI layouts, assets, and configurations are handed over to your control. We do not hold your assets hostage and ensure you have full, independent ownership of your technology.'
    },
    {
      q: 'How does localized dynamic pricing work?',
      a: 'We automatically detect your timezone and geographic location to show pricing in your local currency. You can also manually toggle between INR (rupees) or USD (dollars) using the currency switcher at the top of the pricing listings.'
    },
    {
      q: 'What is your payment structure for new development projects?',
      a: 'We typically split payments into standard milestone-based stages (e.g. 50% advance to initiate architecture, 50% upon final production validation and sign-off). For larger enterprise configurations, we can arrange multi-phase milestone payment schedules.'
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white relative selection:bg-vintage-gold selection:text-black pt-24 pb-16">
      <SEO 
        title="Transparent Custom Software & Web Development Pricing | CodeHTML"
        description="View clear, upfront tiered pricing plans for custom website development, SaaS platforms, native iOS/Android mobile apps, and custom business tools."
        keywords="web development pricing dubai, custom app developer cost, software project estimates india, transparent developer pricing uae"
      />

      {/* Decorative Blur Ambient Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-[20vh] right-1/4 w-[600px] h-[600px] bg-vintage-gold/5 blur-[150px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Page Header */}
        <div className="text-left mb-12 border-b border-white/5 pb-8">
          <div className="inline-flex items-center gap-2 border border-vintage-gold/30 bg-zinc-900/60 backdrop-blur-md px-4 py-2 rounded-none mb-6 text-[10px] sm:text-xs font-body font-bold uppercase tracking-[0.2em] text-vintage-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-vintage-gold animate-pulse"></span>
            TRANSPARENT ENGINEERING INVESTMENT
          </div>
          <h1 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase leading-none tracking-tight mb-6 text-left">
            DEVELOPMENT INVESTMENT <span className="font-elegant italic font-light text-vintage-gold lowercase tracking-normal">tiers</span>
          </h1>
          <p className="font-body text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed font-medium">
            Hand-written, custom engineering built from scratch. Zero bloated templates, zero monthly platform fees, and 100% intellectual property ownership. Choose your service category below to review development pricing.
          </p>

          {/* Currency Toggle Switch */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="font-body font-bold text-[10px] sm:text-xs tracking-widest text-zinc-500 uppercase flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-vintage-gold" /> SELECT CURRENCY LOCALIZATION:
            </span>
            <div className="inline-flex bg-zinc-900 border border-white/5 p-1 rounded-none">
              {['USD', 'INR'].map((curr) => (
                <button
                  key={curr}
                  onClick={() => setSelectedCurrency(curr)}
                  className={`px-4 py-1.5 text-[10px] sm:text-xs font-body font-bold tracking-widest uppercase transition-all rounded-none ${
                    selectedCurrency === curr
                      ? 'bg-vintage-gold text-black font-extrabold shadow-md'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Services Pricing Listings */}
        <div className="space-y-16">
          {pricingData.map((service, sIdx) => (
            <div 
              key={service.id} 
              id={service.id} 
              className="border-b border-white/5 pb-12 last:border-0 last:pb-0"
            >
              {/* Service header */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="max-w-3xl text-left">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-vintage-gold/15 border border-vintage-gold/20 rounded-lg">
                      {service.icon}
                    </div>
                  </div>
                  <h2 className="font-headline font-black text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight mb-2">
                    {service.title}
                  </h2>
                  <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-2xl leading-normal">
                    {service.desc}
                  </p>
                </div>

                <Link 
                  to={service.id === 'ai-solutions' ? '/ai-solutions' : service.id === 'get-more-customers' ? '/get-more-customers' : `/${service.id}`}
                  className="font-body font-bold text-[10px] tracking-widest text-vintage-gold hover:text-white transition-colors uppercase border border-vintage-gold/30 hover:border-white px-4 py-2 self-start flex items-center gap-1.5 rounded-lg"
                >
                  SERVICE DETAILS <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {service.tiers.map((tier, tIdx) => (
                  <div 
                    key={tIdx} 
                    className={`bg-zinc-950/40 backdrop-blur-md border p-5 flex flex-col justify-between relative transition-all duration-300 hover:border-vintage-gold/40 hover:bg-zinc-950/80 rounded-2xl text-left ${
                      tier.popular ? 'border-vintage-gold shadow-lg shadow-vintage-gold/10' : 'border-white/5'
                    }`}
                  >
                    {tier.popular && (
                      <span className="absolute -top-2.5 left-5 bg-vintage-gold text-black text-[9px] font-body font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                        Most Popular
                      </span>
                    )}

                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-headline font-black text-sm sm:text-base text-white uppercase tracking-tight">
                            {tier.name}
                          </h3>
                          <span className="font-body font-bold text-[9px] text-zinc-500 uppercase tracking-wider block mt-0.5">
                            {tier.delivery}
                          </span>
                        </div>
                        <span className="font-body font-extrabold text-[10px] text-zinc-700">0{tIdx + 1}</span>
                      </div>

                      <div className="mb-4">
                        <span className="font-body text-zinc-500 text-[8px] font-bold tracking-widest uppercase block mb-1">STARTING FROM</span>
                        <p className="font-headline font-black text-xl sm:text-2xl text-white mb-0.5">
                          {tier.price}
                        </p>
                        <p className="font-body font-bold text-[9px] text-vintage-gold uppercase tracking-wider">
                          {tier.focus}
                        </p>
                      </div>

                      <div className="h-px bg-white/5 mb-3"></div>

                      <ul className="space-y-1.5 mb-5">
                        {tier.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-zinc-400 font-medium">
                            <Check className="w-3.5 h-3.5 text-vintage-gold flex-shrink-0 mt-0.5" />
                            <span className="uppercase text-[9px] sm:text-[10px] font-bold tracking-tight leading-normal">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <a 
                      href={`https://wa.me/919303228082?text=${encodeURIComponent(`Hi CodeHTML, I'm interested in the ${service.title} - ${tier.name} package.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-2.5 text-center font-body font-black text-[9px] sm:text-[10px] transition-all duration-300 uppercase tracking-widest rounded-xl ${
                        tier.popular 
                          ? 'bg-vintage-gold hover:bg-white text-black' 
                          : 'bg-zinc-900 hover:bg-vintage-gold text-white hover:text-black border border-white/5 hover:border-vintage-gold'
                      }`}
                    >
                      Choose Service ➲
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing FAQs Accordion */}
        <section className="py-12 mt-12 border-t border-white/5">
          <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-10">
            <span className="font-body font-bold text-vintage-gold text-xs tracking-widest block mb-2 uppercase">PRICING ASSURANCE</span>
            <h2 className="font-headline font-extrabold text-2xl sm:text-4xl uppercase text-white leading-none tracking-tight">
              PRICING &amp; SETUP <span className="font-elegant italic font-light text-vintage-gold lowercase tracking-normal">guidelines</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-zinc-950/60 border border-white/5 rounded-none overflow-hidden text-left">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 font-headline font-bold text-sm md:text-lg text-white hover:text-vintage-gold transition-colors flex items-center justify-between gap-4 outline-none text-left"
                >
                  <span className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-vintage-gold flex-shrink-0 mt-0.5" />
                    <span>Q. {faq.q}</span>
                  </span>
                  <span className="text-vintage-gold text-xs">{activeFaq === idx ? '▲' : '▼'}</span>
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 pt-2 pl-14 font-body text-zinc-400 text-xs md:text-sm font-semibold leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 mt-8 text-center bg-zinc-950/40 border border-white/5 p-8 rounded-none">
          <h2 className="font-headline font-black text-xl sm:text-3xl text-white uppercase mb-3 tracking-tight">
            NEED A CUSTOM ENTERPRISE QUOTE?
          </h2>
          <p className="font-body text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            For large scale platforms, custom database systems, or custom mobile application integrations, we can provide a detailed scoped quote.
          </p>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I'm%20interested%20in%20obtaining%20a%20custom%20quoted%20software%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-solid px-8 py-4 text-xs font-body font-bold tracking-widest uppercase"
          >
            START DIALOGUE WITH AN ENGINEER ➲
          </a>
        </section>

        <ContactSection />
      </div>
    </main>
  );
};

export default Pricing;
