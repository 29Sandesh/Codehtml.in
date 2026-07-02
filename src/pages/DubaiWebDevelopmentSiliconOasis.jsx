import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Factory, Truck, ShoppingCart } from 'lucide-react';

const DubaiWebDevelopmentSiliconOasis = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Dubai Silicon Oasis | CodeHTML — Manufacturing & Tech"
        description="CodeHTML builds websites for Dubai Silicon Oasis manufacturing and tech companies. Industrial portals, B2B platforms, e-commerce. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Dubai Silicon Oasis
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Dubai Silicon Oasis</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Dubai Silicon Oasis (DSO) is a free zone technology park and a hub for manufacturing, electronics, and industrial tech. Companies here need robust B2B platforms and industrial portals that handle complex workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Silicon%20Oasis" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free DSO Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why DSO Companies Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Factory className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Industrial Portals</h3>
              <p className="text-zinc-400 text-sm">Inventory management, order tracking, supplier portals, and production dashboards.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Truck className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">B2B E-commerce</h3>
              <p className="text-zinc-400 text-sm">Wholesale pricing, bulk orders, RFQ systems, and procurement workflows.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Manufacturing Systems</h3>
              <p className="text-zinc-400 text-sm">ERP integration, IoT monitoring, real-time analytics, and quality control.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DSO Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Manufacturing', 'Electronics', 'Logistics & Warehousing', 'Industrial Automation', 'Hardware & Semiconductors', 'Renewable Energy'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">DSO Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 8,000</div>
              <div className="text-white font-bold mb-2">B2B Portal</div>
              <div className="text-zinc-400 text-sm">Supplier portal with RFQ, purchase orders, and document management.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 15,000</div>
              <div className="text-white font-bold mb-2">Manufacturing Dashboard</div>
              <div className="text-zinc-400 text-sm">Production monitoring, IoT integration, and real-time reporting.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 12,000</div>
              <div className="text-white font-bold mb-2">E-commerce Store</div>
              <div className="text-zinc-400 text-sm">B2B wholesale store with bulk pricing, MOQ, and trade account management.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near DSO We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Academic City', 'Dubai Industrial City', 'Al Aweer', 'Mirdif', 'Ras Al Khor', 'Warsan', 'International City', 'Al Khawaneej'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — DSO</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build manufacturing portals?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build portals with inventory management, order tracking, supplier management, and production scheduling.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you integrate with ERP systems?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we integrate with SAP, Oracle, Microsoft Dynamics, and custom ERP systems via APIs and middleware.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you handle B2B e-commerce?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build wholesale platforms with tiered pricing, bulk orders, RFQ workflows, and trade account management.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do you handle industrial data?</dt>
              <dd className="text-zinc-400 leading-relaxed">Secure databases, real-time analytics dashboards, IoT sensor integration, and automated reporting.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your DSO Platform?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get an industrial portal or B2B platform built for your Dubai Silicon Oasis company. Manufacturing-ready. ERP-integrated. Scalable.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Silicon%20Oasis" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Dubai Silicon Oasis","description":"Custom B2B and industrial web development for Dubai Silicon Oasis companies.","url":"https://codehtml.in/dubai-web-development-silicon-oasis","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.1224","longitude":"55.3911"},"areaServed":{"@type":"City","name":"Dubai Silicon Oasis"},"priceRange":"$$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Dubai Silicon Oasis","item":"https://codehtml.in/dubai-web-development-silicon-oasis"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you build manufacturing portals?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build portals with inventory management and order tracking."}},{"@type":"Question","name":"Can you integrate with ERP systems?","acceptedAnswer":{"@type":"Answer","text":"Yes, we integrate with SAP, Oracle, and Microsoft Dynamics."}},{"@type":"Question","name":"Do you handle B2B e-commerce?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build wholesale platforms with tiered pricing and bulk orders."}},{"@type":"Question","name":"How do you handle industrial data?","acceptedAnswer":{"@type":"Answer","text":"Secure databases, real-time analytics, and IoT sensor integration."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentSiliconOasis;
