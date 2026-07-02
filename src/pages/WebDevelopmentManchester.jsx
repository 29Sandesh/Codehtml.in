import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Zap, Globe, Smartphone, Building2, Code, Layout, Server, ShoppingCart, Star, MessageCircle, Music, Users, Briefcase, Monitor } from 'lucide-react';

const WebDevelopmentManchester = () => {
  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Web Development Manchester', item: '/web-development-manchester' }
  ];

  const faqList = [
    {
      q: "Can you work with Manchester businesses remotely?",
      a: "Yes, absolutely. We serve Manchester startups and businesses remotely from our Dubai studio. We use video calls, Slack, and project management tools to maintain seamless communication. Whether you're based in MediaCityUK, the Northern Quarter, or Spinningfields, our remote workflow ensures you receive the same quality and responsiveness as a local agency — without the Manchester agency price tag."
    },
    {
      q: "Is your work GDPR compliant for Manchester businesses?",
      a: "Yes. All our UK projects are built with full GDPR compliance from day one. This includes cookie consent management, privacy policy frameworks, data subject access request handling, secure encrypted storage, and breach notification procedures. We also ensure PECR compliance for any email marketing or SMS functionality your Manchester business requires."
    },
    {
      q: "How do timezone differences work for Manchester clients?",
      a: "Dubai is 3-4 hours ahead of Manchester, which creates a productive 'follow-the-sun' workflow. We work on your project during our morning (your early morning) and present progress by the time your Manchester team starts their day. We also schedule live video calls during GMT business hours (9 AM – 5 PM) whenever face-to-face discussion is needed."
    },
    {
      q: "Do you invoice in GBP for Manchester businesses?",
      a: "Yes, all Manchester clients receive invoices in GBP by default. We also accept USD, EUR, and AED if preferred. Our pricing is transparent with no hidden fees, and we offer milestone-based payment plans for larger projects. You get Dubai-level efficiency with UK-friendly billing."
    },
    {
      q: "Do you understand Manchester's tech and media ecosystem?",
      a: "We have worked with clients across the UK's creative and digital sectors. We understand MediaCityUK's broadcast and media requirements, the Northern Quarter's independent creative culture, and the academic innovation coming from Manchester and Salford universities. Our Manchester clients benefit from this contextual understanding combined with our international technical expertise."
    }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHTML",
    "description": "Dubai-based web development studio serving Manchester startups and businesses remotely. Custom React websites, SaaS platforms, and mobile apps.",
    "url": "https://codehtml.in/web-development-manchester",
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
      "name": "Manchester",
      "containedInPlace": {
        "@type": "Country",
        "name": "United Kingdom"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Services for Manchester",
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
        title="Web Development Manchester | CodeHTML — Remote Team for Manchester Startups"
        description="CodeHTML serves Manchester startups and businesses remotely from Dubai. Custom React websites, SaaS, mobile apps. Affordable GBP pricing. GDPR compliant. Free consultation."
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
            <span>Remote from Dubai · Serving Manchester</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-8 leading-tight tracking-tight">
            Web Development for Manchester Businesses
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Manchester's tech scene is booming — from MediaCityUK to the Northern Quarter. CodeHTML provides Manchester businesses with custom web development at Dubai prices, without sacrificing quality. We understand the city's creative energy, media heritage, and startup ambition. GDPR compliant. GBP pricing. Remote but responsive.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Manchester."
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
          <h2 className="text-3xl font-outfit font-bold text-center mb-4">Why Manchester Startups Choose CodeHTML</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Manchester prices, Dubai efficiency. We deliver the quality of a Deansgate agency at a fraction of the cost.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Manchester Prices, Dubai Overhead</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">40% savings compared to Manchester agencies. No Spinningfields office rent, no Northern Quarter studio costs. We invest in your project, not our postcode.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Monitor className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">MediaCityUK Experience</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">We understand media platforms, content management, broadcast workflows, and streaming integrations. Perfect for Manchester's creative industries.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <PenTool className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Northern Quarter Design Aesthetic</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Bold, independent, creative. We design with Manchester's unique visual culture in mind — not generic corporate templates. Your brand deserves personality.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <MessageCircle className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-xl font-bold mb-2">Same-Day Delivery Updates</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Daily progress reports, instant Slack responses, and transparent project management. You'll never wonder what's happening with your build.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Manchester Context */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">We Know Manchester's Digital Landscape</h2>
          <div className="space-y-8">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Monitor className="text-brand-gold" size={24} />
                MediaCityUK — The BBC, ITV & Creative Hub
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                MediaCityUK is one of Europe's largest creative and digital clusters. Home to the BBC, ITV, and hundreds of production companies, it demands digital platforms that can handle media workflows, content delivery, and high-traffic events. We've built video streaming integrations, content management systems, and media asset platforms that understand the unique demands of broadcast and digital media. Whether you need a talent portal, a production scheduling tool, or a content distribution platform, we understand the technical requirements of Manchester's media ecosystem.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <PenTool className="text-brand-gold" size={24} />
                Northern Quarter — Independent Creativity
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                The Northern Quarter is Manchester's creative soul. Independent shops, music venues, street art, and design studios define this neighbourhood. Businesses here need websites that reflect that independence — not generic corporate templates. We design with bold typography, expressive layouts, and authentic visual storytelling. From independent record labels in Afflecks Palace to design studios on Tariff Street, we create digital experiences that match the Northern Quarter's creative energy and refuse to blend in.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Building2 className="text-brand-gold" size={24} />
                Spinningfields — Business & Professional Services
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Spinningfields is Manchester's premier business district. Law firms, financial services, consultancies, and professional services firms need polished, trustworthy digital platforms that convey credibility and expertise. We build corporate websites with clean architecture, secure client portals, document management systems, and professional service automation. Our Spinningfields clients benefit from CRM integration, appointment scheduling, and automated onboarding workflows that save administrative time and impress potential clients.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <Users className="text-brand-gold" size={24} />
                Oxford Road & University Corridor
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Manchester's Oxford Road corridor is one of Europe's densest concentrations of universities and research institutions. The University of Manchester, Manchester Metropolitan University, and the Royal Northern College of Music produce a constant stream of innovation, spinouts, and student-led startups. We work with edtech platforms, research portals, student accommodation booking systems, and university spinout websites. Our academic clients benefit from our understanding of accessibility requirements, multi-language support, and research data visualisation.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                <MapPin className="text-brand-gold" size={24} />
                Airport City & Logistics
              </h3>
              <p className="text-zinc-400 leading-relaxed">
                Manchester Airport is a major international hub, and Airport City is one of the UK's largest regeneration projects. Logistics, freight, travel, and hospitality businesses in this area need robust booking systems, real-time tracking platforms, and B2B portals. We build logistics dashboards, freight management tools, and hospitality booking engines that handle high transaction volumes and complex business rules. Our experience with real-time data and API integrations makes us ideal for Manchester's logistics and travel tech sectors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Services for Manchester's Diverse Economy</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">From media platforms to music apps, we build digital products that match Manchester's creative and commercial ambitions.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Custom Website Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React and Next.js websites built for Manchester's competitive market. From Northern Quarter creatives to Spinningfields professionals, we deliver fast, SEO-optimised sites that convert visitors into clients.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Layout className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Web Application Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Custom CRM, project management, and internal tools for Manchester businesses. Real-time collaboration, role-based access, and scalable cloud architecture.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Server className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">SaaS Platform Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Multi-tenant SaaS platforms with subscription billing, user onboarding, and custom APIs. Perfect for Manchester's growing software startup ecosystem around Oxford Road and the city centre.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Mobile App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React Native apps for iOS and Android. One codebase, two platforms. Ideal for Manchester's music, media, sports tech, and consumer app startups.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">E-commerce Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">UK VAT-compliant stores with Stripe UK, PayPal, and Klarna. Multi-currency, Royal Mail integration, and inventory management for Manchester retailers.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">AI & Automation</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Chatbots, workflow automation, content generation, and predictive analytics. Help your Manchester business scale without proportionally scaling headcount.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing in GBP */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">GBP Pricing for Manchester Businesses</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Dubai efficiency, Manchester value. Transparent pricing with no hidden agency fees. Invoiced in GBP.</p>
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

      {/* Manchester Areas & Industries */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Manchester Areas & Industries We Serve</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">From MediaCity to the airport, we understand Manchester's geography and its business culture.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {[
              { area: 'MediaCityUK', desc: 'Broadcast & Media' },
              { area: 'Northern Quarter', desc: 'Creative & Independent' },
              { area: 'Spinningfields', desc: 'Finance & Professional' },
              { area: 'Oxford Road', desc: 'Education & Research' },
              { area: 'Airport City', desc: 'Logistics & Travel' },
              { area: 'Ancoats', desc: 'Tech & Innovation' }
            ].map((item) => (
              <div key={item.area} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center">
                <MapPin size={16} className="text-brand-gold mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">{item.area}</p>
                <p className="text-xs text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
            <h3 className="text-xl font-bold mb-4 text-center">Manchester Industries We Specialise In</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Media', 'Creative', 'E-commerce', 'Education', 'Sports Tech', 'Music', 'Fintech', 'Logistics', 'Hospitality', 'Healthcare'].map((industry) => (
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
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Manchester Business FAQs</h2>
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
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Ready to Build Your Manchester Digital Project?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get a free consultation and quote within 24 hours. Whether you're a MediaCity startup, a Northern Quarter creative, or a Spinningfields professional firm, CodeHTML delivers Manchester-quality digital products at Dubai-efficient prices.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Manchester."
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
            CodeHTML is a Dubai-based web development studio serving Manchester businesses remotely. We bring international expertise to Manchester's vibrant digital economy. All UK projects include GDPR compliance, GBP invoicing, and timezone-friendly communication. We proudly serve businesses across MediaCityUK, the Northern Quarter, Spinningfields, Oxford Road, Airport City, and every corner of Greater Manchester.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentManchester;
