import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Globe, Code, Smartphone, ArrowRight, MapPin, Phone, CheckCircle, Star, Briefcase, Shield, Zap, Users, ShoppingCart, Layout, Search, Monitor, PenTool, Server, Clock } from 'lucide-react';

const DubaiWebDevelopment = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHTML",
    "description": "Custom web development company in Dubai",
    "url": "https://codehtml.in/dubai-web-development",
    "telephone": "+91-93032-28082",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.185",
      "longitude": "55.265"
    },
    "priceRange": "$$$",
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO
        title="Web Development Company Dubai | CodeHTML — Custom React & Mobile Apps"
        description="CodeHTML is a Dubai-based web development company in Business Bay. We build custom React websites, SaaS platforms, and iOS/Android apps. 118+ projects. 100% code ownership. Get a quote in 24 hours."
        schema={localBusinessSchema}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <MapPin size={14} className="text-brand-gold" />
            <span>Business Bay, Dubai</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-8 leading-tight tracking-tight">
            Web Development Company in Dubai, UAE
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Dubai's premium custom software studio. We build high-performance React websites, Next.js web applications, and full-stack SaaS platforms tailored for the UAE market. Face-to-face meetings in Business Bay. 100% code ownership guaranteed.
          </p>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Dubai."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
          >
            Get a Free Quote <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Trust Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-outfit font-bold text-center mb-12">Trusted by Dubai Businesses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Briefcase className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">118+</h3>
              <p className="text-zinc-400">Projects Delivered</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">99+</h3>
              <p className="text-zinc-400">Lighthouse Score</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Clock className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">3-5</h3>
              <p className="text-zinc-400">Day Delivery</p>
            </div>
          </div>
          <p className="text-center text-zinc-400 mt-8 max-w-2xl mx-auto">
            Serving businesses across Business Bay, Dubai Marina, JLT, DIFC, Downtown Dubai, Jumeirah, and beyond. We understand the UAE market and deliver websites that convert.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Dubai Web Development Services</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Custom-built digital solutions for the UAE market. From landing pages to enterprise SaaS platforms.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Custom Website Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Hand-coded React and Next.js websites with 100/100 Lighthouse scores. No bloated templates. Lightning-fast load times that rank on Google.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Layout className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Web Application Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Custom CRM, ERP, and dashboard applications built for Dubai businesses. Real-time data, role-based access, and scalable architecture.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Server className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">SaaS Platform Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Multi-tenant SaaS platforms with subscription billing, user management, and custom APIs. From MVP to enterprise scale.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Mobile App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">React Native iOS and Android apps that complement your web platform. One codebase, two app stores, faster time to market.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">E-commerce Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">UAE VAT-compliant online stores with Arabic RTL support, local payment gateways (Telr, PayFort), and multi-currency pricing.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Search className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">SEO & Performance</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Technical SEO built into every project. Core Web Vitals optimization, structured data, and Arabic SEO for the UAE market.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Web Development Pricing in Dubai (AED)</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Transparent pricing. No hidden fees. 100% code ownership.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">Startup Website</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">750 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 5 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 5 pages</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Mobile responsive</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Contact form</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">Business Website</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">4,000 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 14 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 10+ pages</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Custom animations</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> SEO optimized</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">E-commerce Store</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">11,000 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 21 days</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> UAE VAT ready</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Arabic RTL</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Payment gateway</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 border-brand-gold/30">
              <h3 className="text-xl font-bold mb-2">Custom SaaS / Web App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">30,000+ AED</p>
              <p className="text-zinc-400 text-sm mb-4">Custom timeline</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Full-stack custom</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Scalable backend</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Dedicated support</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-zinc-400 mt-8 text-sm">No hidden fees. 100% code ownership. All prices include 12 months of support.</p>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Our Dubai Web Development Process</h2>
          <div className="grid md:grid-cols-5 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Search className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Discovery</h3>
              <p className="text-sm text-zinc-400">We understand your goals, audience, and competitive landscape in the Dubai market.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <PenTool className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Design</h3>
              <p className="text-sm text-zinc-400">Figma prototypes with Dubai-focused aesthetics, Arabic RTL support, and mobile-first design.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Code className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Development</h3>
              <p className="text-sm text-zinc-400">Custom React/Next.js code with clean architecture, reusable components, and 100% ownership.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Shield className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Testing</h3>
              <p className="text-sm text-zinc-400">Cross-browser testing, mobile validation, performance audits, and security hardening.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">Launch</h3>
              <p className="text-sm text-zinc-400">Production deployment, CDN configuration, DNS setup, and post-launch monitoring.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Locations Served */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">We Serve All Dubai Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Business Bay', 'Dubai Marina', 'JLT', 'DIFC', 'Downtown Dubai', 'Jumeirah', 'Deira', 'Al Barsha', 'Dubai Silicon Oasis', 'Dubai Internet City'].map((area) => (
              <div key={area} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center text-sm font-semibold text-zinc-300">
                <MapPin size={16} className="text-brand-gold mx-auto mb-2" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How much does a website cost in Dubai?</h3>
              <p className="text-zinc-400">Website development in Dubai ranges from 750 AED to 30,000+ AED depending on complexity. A basic 5-page business website starts at 750 AED, while a custom SaaS platform can exceed 30,000 AED. We provide transparent quotes with no hidden fees.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How long does it take to build a website in Dubai?</h3>
              <p className="text-zinc-400">Standard business websites take 5-14 days. Complex web applications and SaaS platforms require 30-60 days. We use agile development with weekly milestones so you see progress throughout the project.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Do you offer Arabic website development?</h3>
              <p className="text-zinc-400">Yes, we specialize in fully RTL-compatible Arabic websites with proper font rendering, Arabic SEO optimization, and culturally appropriate UI design. We support bilingual Arabic/English sites for the UAE market.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Are you based in Dubai?</h3>
              <p className="text-zinc-400">Yes, our office is located in Business Bay, Dubai. We offer face-to-face meetings for clients across the UAE, including Dubai Marina, JLT, DIFC, Downtown Dubai, and Jumeirah.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">What technologies do you use?</h3>
              <p className="text-zinc-400">We use React, Next.js, Node.js, React Native, and Tailwind CSS for most projects. For backends, we work with PostgreSQL, MongoDB, and Firebase. Every tech stack is chosen based on your specific project requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Ready to Build Your Dubai Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">Get a free consultation and quote within 24 hours. No obligation. No hidden fees. Just transparent, expert web development.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20web%20development%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> WhatsApp Us Now
            </a>
            <a href="mailto:Contact@Codehtml.in" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Globe size={18} /> Contact@Codehtml.in
            </a>
          </div>
          <p className="text-zinc-400 text-sm">
            Phone: <a href="tel:+919303228082" className="text-brand-gold hover:underline">+91 93032 28082</a> | Business Bay, Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  );
};

export default DubaiWebDevelopment;
