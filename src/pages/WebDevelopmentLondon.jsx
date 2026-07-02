import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, PoundSterling, Shield, Globe } from 'lucide-react';

const WebDevelopmentLondon = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development London | CodeHTML — Remote Dubai Team for UK Businesses"
        description="CodeHTML is a Dubai-based web development studio serving London businesses remotely. Custom React websites, SaaS platforms, mobile apps. GDPR compliant. GBP pricing. Free consultation."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Remote from Dubai · Serving London
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development for <span className="text-brand-gold">London</span> Businesses
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            CodeHTML is a Dubai-based development studio serving London businesses remotely. We build custom React websites, SaaS platforms, and mobile apps. GDPR compliant. GBP pricing. Timezone-friendly meetings.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20London" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free London Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why London Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <PoundSterling className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">40% Cost Savings</h3>
              <p className="text-zinc-400 text-sm">No London office overhead means better pricing for the same quality. Dubai rates, London standards.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Shield className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">GDPR Compliant</h3>
              <p className="text-zinc-400 text-sm">All UK projects are built with GDPR compliance from day one. Privacy by design, consent management, data encryption.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Globe className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">GMT-Friendly Meetings</h3>
              <p className="text-zinc-400 text-sm">We schedule video calls during UK business hours (9 AM – 5 PM GMT) and use async tools for daily updates.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Clock className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Same-Day Responses</h3>
              <p className="text-zinc-400 text-sm">Our Dubai team responds to Slack and email within hours. No waiting for the next business day.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">UK Compliance & Standards</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">GDPR compliance — data protection, consent management, right to erasure</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">UK Companies House integration — business registration, annual returns</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">UK VAT handling — 20% VAT, MTD-compatible invoicing</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">UK payment gateways — Stripe, PayPal, GoCardless, Worldpay</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">PECR compliance — cookie consent, electronic marketing rules</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">Accessibility — WCAG 2.1 AA compliance for UK public sector</span></li>
          </ul>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">London Areas We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Shoreditch', 'Canary Wharf', 'Soho', 'City of London', 'Camden', 'Kensington', 'Westminster', 'Southbank', 'Brixton', 'Hackney'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">London Web Development Pricing (GBP)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£150</div>
              <div className="text-white font-bold mb-2">Startup Website</div>
              <div className="text-zinc-400 text-sm">5-page custom React site. Perfect for London pre-seed startups.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£850</div>
              <div className="text-white font-bold mb-2">Business Website</div>
              <div className="text-zinc-400 text-sm">10-page site with CMS, analytics, and lead generation for London SMEs.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£2,500</div>
              <div className="text-white font-bold mb-2">E-commerce Store</div>
              <div className="text-zinc-400 text-sm">Full online store with UK VAT, payment gateways, and inventory management.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — London</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you work with London businesses remotely?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we serve UK clients remotely with video calls during GMT business hours and async communication via Slack and Notion.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Is your work GDPR compliant?</dt>
              <dd className="text-zinc-400 leading-relaxed">Absolutely. All UK projects include GDPR compliance by default: consent management, data encryption, right to erasure, and privacy policies.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do timezone differences work?</dt>
              <dd className="text-zinc-400 leading-relaxed">We schedule meetings during UK business hours (9 AM – 5 PM GMT). For urgent issues, our Dubai team is available until 6 PM GST (2 PM GMT).</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">What currencies do you accept?</dt>
              <dd className="text-zinc-400 leading-relaxed">GBP, USD, EUR, and AED. We invoice in your preferred currency with transparent pricing and no hidden fees.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your London Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom website built for your London business. Remote from Dubai. GDPR compliant. GBP pricing. 3-5 day delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20London" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Dubai-based, serving London remotely</span>
            <span className="flex items-center gap-2"><Clock size={16} /> GMT-friendly meetings</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development for London Businesses","description":"Remote web development from Dubai for London businesses. GDPR compliant, GBP pricing.","url":"https://codehtml.in/web-development-london","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"areaServed":{"@type":"City","name":"London"},"priceRange":"££","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Web Development UK","item":"https://codehtml.in/uk-web-development"},{"@type":"ListItem","position":3,"name":"London","item":"https://codehtml.in/web-development-london"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can you work with London businesses remotely?","acceptedAnswer":{"@type":"Answer","text":"Yes, we serve UK clients remotely with video calls during GMT business hours and async communication."}},{"@type":"Question","name":"Is your work GDPR compliant?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. All UK projects include GDPR compliance by default."}},{"@type":"Question","name":"How do timezone differences work?","acceptedAnswer":{"@type":"Answer","text":"We schedule meetings during UK business hours (9 AM – 5 PM GMT)."}},{"@type":"Question","name":"What currencies do you accept?","acceptedAnswer":{"@type":"Answer","text":"GBP, USD, EUR, and AED. We invoice in your preferred currency."}}]}) }} />
    </div>
  );
};

export default WebDevelopmentLondon;
