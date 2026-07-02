import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Stethoscope, ShoppingCart, UtensilsCrossed } from 'lucide-react';

const DubaiWebDevelopmentAlBarsha = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Al Barsha | CodeHTML — Healthcare & Retail Websites"
        description="CodeHTML builds websites for Al Barsha healthcare clinics, retail stores, and restaurants. Custom React, mobile-first, Arabic support. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Al Barsha
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Al Barsha</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Al Barsha is one of Dubai's most diverse communities, home to the Mall of the Emirates, Dubai Miracle Garden, and hundreds of healthcare clinics, retail stores, and restaurants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Al%20Barsha" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free Al Barsha Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why Al Barsha Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Stethoscope className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Healthcare-Ready</h3>
              <p className="text-zinc-400 text-sm">DHA-compliant clinic websites with appointment booking and patient portals.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Retail E-commerce</h3>
              <p className="text-zinc-400 text-sm">Online stores with UAE payment gateways and Mall of the Emirates integration.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <UtensilsCrossed className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Restaurant Booking</h3>
              <p className="text-zinc-400 text-sm">Online reservations, menu integration, and delivery platform connectivity.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Al Barsha Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Healthcare & Clinics', 'Retail & Malls', 'Restaurants & Cafes', 'Education & Training', 'Fitness & Wellness', 'Real Estate'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Al Barsha Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 4,000</div>
              <div className="text-white font-bold mb-2">Clinic Website</div>
              <div className="text-zinc-400 text-sm">DHA-compliant with appointment booking and patient management.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 10,000</div>
              <div className="text-white font-bold mb-2">Retail E-commerce</div>
              <div className="text-zinc-400 text-sm">Online store with UAE payment gateways, VAT, and inventory management.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 3,500</div>
              <div className="text-white font-bold mb-2">Restaurant Website</div>
              <div className="text-zinc-400 text-sm">Online reservations, menu, and delivery platform integration.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near Al Barsha We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Barsha Heights', 'Tecom', 'Al Sufouh', 'Emirates Hills', 'Springs', 'Meadows', 'Jumeirah Islands', 'JVT'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — Al Barsha</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build websites for Al Barsha clinics?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build DHA-compliant healthcare websites with appointment booking, patient portals, and medical record integration.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you integrate with Mall of the Emirates directories?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we optimize for local discovery and integrate with mall directories, Google Maps, and local business listings.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build e-commerce for retail stores?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build online stores with UAE payment gateways, VAT compliance, and inventory management for Al Barsha retailers.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How quickly can you deliver for a restaurant?</dt>
              <dd className="text-zinc-400 leading-relaxed">Most restaurant websites are live in 7 days with online reservations, menu, and delivery integration.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your Al Barsha Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom website built for your Al Barsha business. Healthcare. Retail. Restaurants. Mobile-first.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Al%20Barsha" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Al Barsha","description":"Custom web development for Al Barsha healthcare, retail, and restaurants.","url":"https://codehtml.in/dubai-web-development-al-barsha","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.1105","longitude":"55.1935"},"areaServed":{"@type":"City","name":"Al Barsha"},"priceRange":"$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Al Barsha","item":"https://codehtml.in/dubai-web-development-al-barsha"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you build websites for Al Barsha clinics?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build DHA-compliant healthcare websites with appointment booking and patient portals."}},{"@type":"Question","name":"Can you integrate with Mall of the Emirates directories?","acceptedAnswer":{"@type":"Answer","text":"Yes, we optimize for local discovery and integrate with mall directories."}},{"@type":"Question","name":"Do you build e-commerce for retail stores?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build online stores with UAE payment gateways and VAT compliance."}},{"@type":"Question","name":"How quickly can you deliver for a restaurant?","acceptedAnswer":{"@type":"Answer","text":"Most restaurant websites are live in 7 days with online reservations and menu integration."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentAlBarsha;
