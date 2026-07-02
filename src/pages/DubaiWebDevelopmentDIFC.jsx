import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Shield, Zap, Building2, Code, Globe } from 'lucide-react';

const DubaiWebDevelopmentDIFC = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in DIFC | CodeHTML — Fintech & Enterprise"
        description="CodeHTML builds custom websites and web applications for DIFC fintech and enterprise businesses. Regulatory-compliant, secure, scalable. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> DIFC — Dubai International Financial Centre
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">DIFC</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            DIFC is the Middle East's leading financial hub. Fintech startups, banks, and asset managers need websites that meet strict regulatory standards while delivering exceptional user experience. We build them with bank-grade security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20DIFC" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free DIFC Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why DIFC Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Shield className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Bank-Grade Security</h3>
              <p className="text-zinc-400 text-sm">OWASP compliance, penetration testing, encryption, and multi-factor authentication.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Regulatory Compliant</h3>
              <p className="text-zinc-400 text-sm">DIFC data protection, GDPR alignment, audit trails, and compliance reporting.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Building2 className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Enterprise Scale</h3>
              <p className="text-zinc-400 text-sm">Systems that handle thousands of concurrent users and millions of transactions.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DIFC Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Fintech & Banking', 'Asset Management', 'Insurance & Reinsurance', 'Legal Services', 'Wealth Management', 'Private Equity'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DIFC Compliance & Security</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">DIFC Data Protection Law compliance</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">GDPR alignment for international clients</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">Secure hosting with AWS or Azure UAE regions</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">Multi-factor authentication (MFA) for all admin access</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">Audit trails and activity logging</span></li>
            <li className="flex items-start gap-3"><CheckCircle className="text-brand-gold shrink-0 mt-1" size={18} /><span className="text-zinc-300">Penetration testing and vulnerability scanning</span></li>
          </ul>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DIFC Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 5,000</div>
              <div className="text-white font-bold mb-2">Corporate Website</div>
              <div className="text-zinc-400 text-sm">Professional 10-page site with CMS, careers portal, and investor relations.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 20,000</div>
              <div className="text-white font-bold mb-2">Fintech Platform</div>
              <div className="text-zinc-400 text-sm">Secure portal with KYC, transactions, dashboards, and compliance reporting.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 50,000+</div>
              <div className="text-white font-bold mb-2">Enterprise App</div>
              <div className="text-zinc-400 text-sm">Custom enterprise solution with SSO, ERP integration, and bespoke workflows.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near DIFC We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Business Bay', 'Downtown Dubai', 'JLT', 'Dubai Design District', 'City Walk', 'Za\'abeel', 'Al Wasl', 'Trade Centre'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — DIFC</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you understand DIFC regulatory requirements?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build compliant systems that meet DIFC Data Protection Law standards. We include audit trails, consent management, and data encryption by default.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you build a secure investor portal?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, with multi-factor authentication, role-based access control, encrypted document sharing, and real-time portfolio dashboards.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do you handle data privacy in DIFC?</dt>
              <dd className="text-zinc-400 leading-relaxed">Full compliance with DIFC data protection laws. We implement privacy by design, data minimization, and secure deletion protocols.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you offer enterprise support?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, SLA-based support with 24/7 monitoring, dedicated account manager, and quarterly security reviews for DIFC clients.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your DIFC Platform?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a secure, compliant web platform built for your DIFC business. Bank-grade security. Regulatory compliance. 3-5 day delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20DIFC" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in DIFC","description":"Custom web development for DIFC fintech and enterprise businesses. Secure, compliant, scalable.","url":"https://codehtml.in/dubai-web-development-difc","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.2115","longitude":"55.2758"},"areaServed":{"@type":"City","name":"DIFC"},"priceRange":"$$$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"DIFC","item":"https://codehtml.in/dubai-web-development-difc"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you understand DIFC regulatory requirements?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build compliant systems that meet DIFC Data Protection Law standards."}},{"@type":"Question","name":"Can you build a secure investor portal?","acceptedAnswer":{"@type":"Answer","text":"Yes, with multi-factor authentication, role-based access control, and encrypted document sharing."}},{"@type":"Question","name":"How do you handle data privacy in DIFC?","acceptedAnswer":{"@type":"Answer","text":"Full compliance with DIFC data protection laws. We implement privacy by design."}},{"@type":"Question","name":"Do you offer enterprise support?","acceptedAnswer":{"@type":"Answer","text":"Yes, SLA-based support with 24/7 monitoring and dedicated account manager."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentDIFC;
