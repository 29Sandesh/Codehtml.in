import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Server, Cloud, Lock, Code, Globe } from 'lucide-react';

const DubaiWebDevelopmentInternetCity = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Dubai Internet City | CodeHTML — Tech Company Websites"
        description="CodeHTML builds websites for Dubai Internet City tech companies. B2B platforms, SaaS, enterprise apps. Business Bay office. 3-5 day delivery. 100% code ownership."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Dubai Internet City
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Dubai Internet City</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Dubai Internet City (DIC) is the region's largest tech hub, hosting Microsoft, Google, Oracle, and 1,600+ tech companies. B2B platforms, enterprise software, and SaaS products are the standard here. We build them.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Internet%20City" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free DIC Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why DIC Tech Companies Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Server className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">B2B Expertise</h3>
              <p className="text-zinc-400 text-sm">Multi-tenant SaaS with admin dashboards, role-based access, and API integrations.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Cloud className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">API Integrations</h3>
              <p className="text-zinc-400 text-sm">REST and GraphQL APIs that connect with Salesforce, HubSpot, SAP, and custom systems.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Lock className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-zinc-400 text-sm">OWASP compliance, penetration testing, encryption, and SOC 2 readiness.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DIC Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['B2B SaaS', 'Enterprise Software', 'Cloud Services', 'Cybersecurity', 'AI & Machine Learning', 'Data Analytics'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DIC Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 6,000</div>
              <div className="text-white font-bold mb-2">B2B Website</div>
              <div className="text-zinc-400 text-sm">Professional B2B site with product pages, case studies, and lead generation.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 20,000</div>
              <div className="text-white font-bold mb-2">SaaS Platform</div>
              <div className="text-zinc-400 text-sm">Multi-tenant with subscriptions, user roles, admin panel, and analytics.</div>
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near DIC We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Dubai Media City', 'Knowledge Village', 'JLT', 'Barsha Heights', 'Dubai Silicon Oasis', 'Al Sufouh', 'Dubai Hills', 'Mirdif'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — DIC</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build B2B platforms?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we specialize in multi-tenant SaaS platforms with admin dashboards, role-based access control, and API-first architecture.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you integrate with existing enterprise systems?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we integrate with SAP, Salesforce, HubSpot, Microsoft Dynamics, and custom enterprise systems via REST APIs and webhooks.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you offer API development?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build REST and GraphQL APIs with OpenAPI documentation, rate limiting, and authentication (OAuth 2.0, JWT).</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do you handle security for tech companies?</dt>
              <dd className="text-zinc-400 leading-relaxed">We follow OWASP Top 10 guidelines, conduct penetration testing, implement encryption at rest and in transit, and ensure SOC 2 readiness.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your DIC Platform?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a B2B platform or enterprise app built for your Dubai Internet City company. API-first. Secure. Scalable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Internet%20City" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Dubai Internet City","description":"Custom B2B and enterprise web development for Dubai Internet City tech companies.","url":"https://codehtml.in/dubai-web-development-internet-city","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.0953","longitude":"55.1621"},"areaServed":{"@type":"City","name":"Dubai Internet City"},"priceRange":"$$$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Dubai Internet City","item":"https://codehtml.in/dubai-web-development-internet-city"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you build B2B platforms?","acceptedAnswer":{"@type":"Answer","text":"Yes, we specialize in multi-tenant SaaS platforms with admin dashboards and role-based access."}},{"@type":"Question","name":"Can you integrate with existing enterprise systems?","acceptedAnswer":{"@type":"Answer","text":"Yes, we integrate with SAP, Salesforce, HubSpot, and Microsoft Dynamics."}},{"@type":"Question","name":"Do you offer API development?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build REST and GraphQL APIs with OpenAPI documentation."}},{"@type":"Question","name":"How do you handle security for tech companies?","acceptedAnswer":{"@type":"Answer","text":"We follow OWASP guidelines, conduct penetration testing, and ensure SOC 2 readiness."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentInternetCity;
