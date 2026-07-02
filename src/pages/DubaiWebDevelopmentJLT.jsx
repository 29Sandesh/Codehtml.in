import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Zap, Globe, Smartphone, Building2, Code } from 'lucide-react';

const DubaiWebDevelopmentJLT = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in JLT | CodeHTML — Tech Startup Websites"
        description="CodeHTML builds custom websites for JLT tech startups and SaaS companies. React, Next.js, SaaS platforms. Based in Business Bay. 3-5 day delivery. 100% code ownership."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> JLT — Jumeirah Lake Towers
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">JLT</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            JLT is Dubai's startup hub, home to AstroLabs, WeWork, and hundreds of tech companies. Startups need fast, scalable websites that can grow with their business. We build them in 3-5 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20JLT" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free JLT Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why JLT Startups Choose CodeHTML</h2>
          <p className="text-zinc-400 leading-relaxed mb-6">JLT's tech ecosystem includes AstroLabs accelerator, WeWork co-working, and dozens of funded startups. These businesses need websites that can scale from MVP to enterprise without rebuilding.</p>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">0.7s Load Time</h3>
              <p className="text-zinc-400 text-sm">JLT's mobile-first workforce needs instant-loading sites. Our React stack delivers.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Globe className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Scalable Architecture</h3>
              <p className="text-zinc-400 text-sm">Built to grow from 100 users to 100,000 without rebuilding.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">SaaS-Ready</h3>
              <p className="text-zinc-400 text-sm">Multi-tenant, subscription billing, admin dashboards out of the box.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">JLT Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['SaaS & Cloud Platforms', 'Fintech & Payments', 'HealthTech & Telemedicine', 'EdTech & E-learning', 'E-commerce & Marketplaces', 'PropTech & Real Estate'].map(industry => (
              <div key={industry} className="flex items-center gap-3 bg-zinc-900/50 p-4 rounded-xl border border-white/5">
                <CheckCircle className="text-brand-gold shrink-0" size={20} />
                <span className="text-zinc-300">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">JLT Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 750</div>
              <div className="text-white font-bold mb-2">Startup Website</div>
              <div className="text-zinc-400 text-sm">Perfect for JLT pre-seed startups. 5 pages, basic SEO, mobile-first.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 4,000</div>
              <div className="text-white font-bold mb-2">Business Website</div>
              <div className="text-zinc-400 text-sm">For JLT Series A companies. 10 pages, CRM, analytics, blog.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 15,000</div>
              <div className="text-white font-bold mb-2">SaaS Platform</div>
              <div className="text-zinc-400 text-sm">Multi-tenant with subscriptions, user roles, admin panel.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near JLT We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Dubai Media City', 'Dubai Internet City', 'Barsha Heights', 'Al Sufouh', 'Dubai Marina', 'Knowledge Village', 'Greens', 'Springs'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — JLT</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you work with JLT startups?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we specialize in startup websites and SaaS platforms. We've built MVPs for fintech, healthtech, and edtech startups in JLT.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you build an MVP in 2 weeks?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, our rapid MVP package is designed for JLT startups. We deliver a functional prototype in 10-14 days so you can start testing with users immediately.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you integrate with Stripe and PayPal?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we integrate all major payment gateways including Stripe, PayPal, Telr, and Network International for UAE-specific payments.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">What's the best tech stack for a JLT startup?</dt>
              <dd className="text-zinc-400 leading-relaxed">We recommend React + Next.js + Node.js for scalability. This stack powers companies like Netflix, Airbnb, and Uber — and it's what we use for all our JLT clients.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your JLT Startup Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom React website built for your JLT startup. 3-5 day MVP delivery. 100% code ownership.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20JLT" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in JLT","description":"Custom web development for JLT startups and tech companies. React, Next.js, SaaS platforms.","url":"https://codehtml.in/dubai-web-development-jlt","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.0705","longitude":"55.1444"},"areaServed":{"@type":"City","name":"JLT"},"priceRange":"$$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"JLT","item":"https://codehtml.in/dubai-web-development-jlt"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you work with JLT startups?","acceptedAnswer":{"@type":"Answer","text":"Yes, we specialize in startup websites and SaaS platforms. We've built MVPs for fintech, healthtech, and edtech startups in JLT."}},{"@type":"Question","name":"Can you build an MVP in 2 weeks?","acceptedAnswer":{"@type":"Answer","text":"Yes, our rapid MVP package is designed for JLT startups. We deliver in 10-14 days."}},{"@type":"Question","name":"Do you integrate with Stripe and PayPal?","acceptedAnswer":{"@type":"Answer","text":"Yes, we integrate all major payment gateways including Stripe, PayPal, Telr, and Network International."}},{"@type":"Question","name":"What's the best tech stack for a JLT startup?","acceptedAnswer":{"@type":"Answer","text":"We recommend React + Next.js + Node.js for scalability. This stack powers Netflix, Airbnb, and Uber."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentJLT;
