import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Zap, Globe, Smartphone, Building2, Code, Layout, Server, ShoppingCart, Star, MessageCircle, Truck, GraduationCap, Heart, Factory, PenTool } from 'lucide-react';

const WebDevelopmentBirmingham = () => {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Web Development Birmingham', item: '/web-development-birmingham' }
  ];

  const faqList = [
    {
      q: "Can you work with Birmingham businesses remotely?",
      a: "Yes, absolutely. We serve Birmingham and West Midlands businesses remotely from our Dubai studio. Our remote workflow includes video calls, dedicated Slack channels, and daily progress updates. Whether you're in the Jewellery Quarter, Digbeth, or Solihull, we deliver the same quality and responsiveness as a local Birmingham agency — at significantly better value."
    },
    {
      q: "Is your work GDPR compliant for Birmingham businesses?",
      a: "Yes. Every UK project we undertake is built with GDPR compliance from the ground up. This includes cookie consent management, privacy policy frameworks, data subject access rights, secure data storage with encryption, and breach notification procedures. We also ensure compliance with UK-specific regulations including PECR for electronic marketing."
    },
    {
      q: "Do you have experience with manufacturing portals?",
      a: "Yes. We have built B2B portals, supplier dashboards, inventory management systems, and order tracking platforms for manufacturing and logistics businesses. Birmingham's manufacturing heritage — from the Jewellery Quarter to the Black Country — requires digital tools that handle complex workflows, multi-tier supplier relationships, and real-time production tracking. We understand these requirements and build platforms that streamline operations."
    },
    {
      q: "Can you build retail e-commerce for Birmingham shops?",
      a: "Absolutely. We build UK VAT-compliant e-commerce stores with Stripe UK, PayPal, Klarna, and GoCardless integration. Whether you're a Bullring retailer looking to expand online, a Jewellery Quarter artisan selling bespoke pieces, or a Digbeth independent brand, we create online stores that reflect your brand and handle UK tax, shipping, and payment requirements seamlessly."
    },
    {
      q: "Do you offer pricing in GBP for Birmingham businesses?",
      a: "Yes, all our Birmingham and West Midlands clients receive invoicing in GBP as standard. We also accept USD, EUR, and AED. Our pricing is transparent with no hidden fees, and we offer flexible milestone-based payment plans for larger projects. You get the cost advantage of a Dubai studio with the convenience of UK currency invoicing."
    }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHTML",
    "description": "Dubai-based web development studio serving Birmingham and West Midlands businesses remotely. Custom React websites, mobile apps, e-commerce. GBP pricing. GDPR compliant.",
    "url": "https://codehtml.in/web-development-birmingham",
    "telephone": "+91-93032-28082",
    "email": "Contact@Codehtml.in",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "postalCode": "00000",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.185",
      "longitude": "55.265"
    },
    "priceRange": "££",
    "currenciesAccepted": "GBP, USD, EUR, AED",
    "paymentAccepted": "Bank Transfer, Credit Card, PayPal, Stripe",
    "areaServed": {
      "@type": "City",
      "name": "Birmingham",
      "containedInPlace": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services for Birmingham",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development",
            "price": "150",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Business Website Development",
            "price": "850",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Development",
            "price": "2500",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile App Development",
            "price": "850",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SaaS Platform Development",
            "price": "3000",
            "priceCurrency": "GBP"
          }
        }
      ]
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO
        title="Web Development Birmingham | CodeHTML — Remote Web Development for Midlands"
        description="CodeHTML serves Birmingham and West Midlands businesses remotely. Custom React websites, mobile apps, e-commerce. GBP pricing. GDPR compliant. Free consultation from Dubai."
        schema={localBusinessSchema}
        faqList={faqList}
        breadcrumbs={breadcrumbs}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <MapPin size={14} className="text-brand-gold" />
            <span>Remote from Dubai · Serving Birmingham</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-8 leading-tight tracking-tight">
            Web Development for Birmingham & West Midlands
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Birmingham is the UK's second-largest city and a growing tech hub. From the Jewellery Quarter to the Bullring, Birmingham businesses need digital solutions that compete with London. CodeHTML delivers custom web development, e-commerce platforms, and mobile apps remotely from Dubai — with Midlands pricing, not London rates. GDPR compliant. GBP invoicing. Free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Birmingham."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              Get a Free Quote <ArrowRight size={18} />
            </a>
            <a href="mailto:Contact@Codehtml.in" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Mail size={18} /> Contact@Codehtml.in
            </a>
          </div>
        </div>
      </div>

      {/* Key Selling Points */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-outfit font-bold text-center mb-4">Why Birmingham Businesses Choose CodeHTML</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Midlands ambition, international execution. We understand Birmingham's business culture and deliver digital products that compete nationally.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Midlands Pricing, Not London Rates</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">We price fairly for Birmingham businesses. No London agency markup, no inflated day rates. Get elite development at prices that make sense for the Midlands market.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Factory className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Manufacturing Portal Expertise</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">B2B supplier portals, inventory dashboards, order tracking, and production workflow tools. We understand Birmingham's manufacturing heritage and build digital tools for it.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <ShoppingCart className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Retail E-commerce Specialists</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">From Bullring retailers to Jewellery Quarter artisans, we build online stores that handle UK VAT, multi-currency, and local delivery. Turn browsers into buyers.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <GraduationCap className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">University Partnerships</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">We work with Birmingham's academic ecosystem — Aston University, Birmingham City University, and University of Birmingham. Edtech, research portals, and student platforms.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Birmingham Context */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">We Understand Birmingham's Business Landscape</h2>
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Factory className="text-brand-gold" size={24} />
                Jewellery Quarter — Manufacturing & Craft Heritage
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                The Jewellery Quarter is Birmingham's historic manufacturing heart and one of Europe's largest clusters of jewellery and metalworking businesses. Today it's also home to creative agencies, architectural firms, and independent makers. We build B2B supplier portals, artisan e-commerce stores, and craft business websites that honour this heritage while embracing modern digital commerce. Our manufacturing clients benefit from inventory management, order tracking, and client portal features that streamline complex supply chains. For jewellery and craft businesses, we create elegant product showcases with zoom functionality, custom order forms, and secure checkout — all VAT-compliant and ready for UK retail.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <ShoppingCart className="text-brand-gold" size={24} />
                Bullring & Grand Central — Retail Excellence
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                The Bullring is one of the UK's premier shopping destinations, and Birmingham's retail sector spans from high street giants to independent Digbeth boutiques. We build e-commerce platforms that handle the complexities of UK retail: VAT calculations, multi-channel inventory, Click & Collect, Royal Mail and courier integrations, and returns management. Whether you're a Bullring brand expanding online or a Digbeth independent building a direct-to-consumer channel, we create shopping experiences that convert. Our retail platforms include abandoned cart recovery, customer accounts, wishlists, and analytics dashboards that help you understand your Birmingham customers.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Zap className="text-brand-gold" size={24} />
                Birmingham Science Park & Innovation Districts
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Birmingham Science Park, Aston University, and the planned Innovation Quarter are positioning Birmingham as a serious UK tech hub. Startups and scaleups in these districts need scalable digital infrastructure — SaaS platforms, API integrations, cloud architecture, and investor-ready demos. We build MVPs that secure funding, scale to handle growth, and integrate with the tools modern tech companies rely on: Stripe, Twilio, SendGrid, AWS, and more. Our Birmingham tech clients benefit from our experience with 118+ projects across fintech, healthtech, edtech, and SaaS.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <GraduationCap className="text-brand-gold" size={24} />
                Aston University & Birmingham City University
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Birmingham's universities produce world-class graduates and spinout companies. We work with academic institutions on research portals, student platforms, and edtech solutions. Our university clients benefit from accessibility compliance (WCAG 2.1 AA), multi-language support, and research data visualisation. For student startups and university spinouts, we offer special pricing and rapid MVP development to get your idea to market quickly. We understand the unique procurement and approval processes of academic institutions and can work within your frameworks.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <PenTool className="text-brand-gold" size={24} />
                Digbeth — Creative & Cultural District
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Digbeth is Birmingham's creative quarter — home to independent artists, musicians, event spaces, and cultural organisations. Businesses here need websites with personality, not generic corporate templates. We design with bold visual identity, expressive typography, and immersive storytelling. From event promotion platforms to artist portfolios, from independent brewery websites to creative agency showcases, we build digital experiences that capture Digbeth's distinctive energy and help Birmingham's creative economy thrive online.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Digital Services for Birmingham's Economy</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Manufacturing portals, retail e-commerce, healthcare platforms, and logistics tools — built for Birmingham's diverse industries.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Custom Website Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React and Next.js websites built for Birmingham's competitive market. Fast, SEO-optimised, and mobile-first. From professional services in Colmore Row to creative agencies in Digbeth.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Layout className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Web Application Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">B2B portals, CRM systems, and internal dashboards for Birmingham manufacturers, logistics companies, and professional services. Real-time data and role-based access.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Server className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">SaaS Platform Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Multi-tenant SaaS with subscription billing, user management, and custom APIs. Perfect for Birmingham's growing tech and innovation sectors around the Science Park and universities.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Mobile App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React Native apps for iOS and Android. One codebase, two platforms. Ideal for Birmingham's healthcare, logistics, retail, and consumer app businesses.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">E-commerce Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">UK VAT-compliant online stores with Stripe UK, PayPal, and Klarna. Multi-currency, Royal Mail integration, and inventory management for Birmingham retailers and manufacturers.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">AI & Automation</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">AI-powered chatbots, automated workflows, document processing, and predictive analytics. Help your Birmingham business compete with London without London overheads.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing in GBP */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">GBP Pricing for Birmingham & West Midlands</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Fair Midlands pricing. No London markup. Invoiced in GBP. 100% code ownership.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Startup Website</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">£150</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 5 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 5 pages</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Mobile responsive</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Contact form</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> GDPR cookie banner</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Business Website</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">£850</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 14 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 10+ pages</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Custom animations</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> SEO optimised</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Blog setup</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 border-brand-gold/30">
              <h3 className="text-lg font-bold mb-2">E-commerce</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">£2,500</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 21 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> UK VAT ready</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Stripe UK integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Product management</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Order dashboard</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Mobile App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">£850</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 14 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> iOS & Android</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> React Native</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> API integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Push notifications</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 border-brand-gold/30">
              <h3 className="text-lg font-bold mb-2">SaaS Platform</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">£3,000+</p>
              <p className="text-zinc-400 text-sm mb-4">Custom timeline</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Full-stack custom</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Scalable backend</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Subscription billing</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Dedicated support</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-zinc-400 mt-8 text-sm">All prices in GBP. No hidden fees. 100% code ownership. 12 months of support included.</p>
        </div>
      </div>

      {/* Birmingham Areas & Industries */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Birmingham Areas & Industries We Serve</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">From the Jewellery Quarter to Solihull, we understand Birmingham's geography and its economic diversity.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { area: 'Jewellery Quarter', desc: 'Manufacturing & Craft' },
              { area: 'Bullring', desc: 'Retail & E-commerce' },
              { area: 'Birmingham Science Park', desc: 'Tech & Innovation' },
              { area: 'Aston University', desc: 'Education & Research' },
              { area: 'Digbeth', desc: 'Creative & Cultural' },
              { area: 'Colmore Row', desc: 'Finance & Professional' }
            ].map((item) => (
              <div key={item.area} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center">
                <MapPin size={16} className="text-brand-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">{item.area}</p>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-4 text-center">Birmingham Industries We Specialise In</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Manufacturing', 'Retail', 'Education', 'Healthcare', 'Logistics', 'Automotive', 'Creative', 'Professional Services', 'Property', 'Hospitality'].map((industry) => (
                <span key={industry} className="px-4 py-2 rounded-full bg-zinc-800 border border-white/10 text-sm text-zinc-300 font-medium">
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Birmingham Business FAQs</h2>
          <div className="space-y-6">
            {faqList.map((faq, index) => (
              <div key={index} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-zinc-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Ready to Build Your Birmingham Digital Presence?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote within 24 hours. Whether you're a Jewellery Quarter manufacturer, a Bullring retailer, a Digbeth creative, or an Aston University spinout, CodeHTML delivers Birmingham-quality digital products at Dubai-efficient prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Birmingham."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> WhatsApp Us for UK Projects
            </a>
            <a href="mailto:Contact@Codehtml.in" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Mail size={18} /> Contact@Codehtml.in
            </a>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={14} className="text-brand-gold" /> <a href="tel:+919303228082" className="text-brand-gold hover:underline">+91 93032 28082</a></span>
            <span className="flex items-center gap-2"><Clock size={14} className="text-brand-gold" /> GMT-friendly meetings</span>
            <span className="flex items-center gap-2"><Globe size={14} className="text-brand-gold" /> Dubai-based, UK-serving</span>
          </div>
        </div>
      </div>

      {/* Trust & Footer Note */}
      <div className="py-12 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-500 text-sm leading-relaxed">
            CodeHTML is a Dubai-based web development studio serving Birmingham and the West Midlands remotely. We bring international expertise to Birmingham's growing digital economy. All UK projects include GDPR compliance, GBP invoicing, and timezone-friendly communication. We proudly serve businesses across the Jewellery Quarter, Bullring, Digbeth, Birmingham Science Park, Aston University, Birmingham City University, and throughout the West Midlands.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentBirmingham;
