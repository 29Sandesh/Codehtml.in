import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Zap, Heart, Stethoscope, GraduationCap, UtensilsCrossed } from 'lucide-react';

const DubaiWebDevelopmentJumeirah = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Jumeirah | CodeHTML — Family Business Websites"
        description="CodeHTML builds websites for Jumeirah family businesses, clinics, schools, and local services. Custom React, mobile-first, Arabic support. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Jumeirah
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Jumeirah</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Jumeirah is Dubai's family-friendly community, known for its beaches, villas, and local businesses. From clinics to schools to restaurants, Jumeirah businesses need websites that connect with the local community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Jumeirah" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free Jumeirah Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why Jumeirah Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Heart className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Community-Focused</h3>
              <p className="text-zinc-400 text-sm">Websites that speak to Jumeirah's family-oriented community and local culture.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Local SEO</h3>
              <p className="text-zinc-400 text-sm">Optimized for "near me" searches so Jumeirah residents find you first.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Stethoscope className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Healthcare-Ready</h3>
              <p className="text-zinc-400 text-sm">DHA-compliant clinic websites with appointment booking and patient portals.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Jumeirah Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Healthcare & Clinics', 'Education & Schools', 'Restaurants & Cafes', 'Local Retail', 'Fitness & Wellness', 'Family Services'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Jumeirah Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 750</div>
              <div className="text-white font-bold mb-2">Startup Website</div>
              <div className="text-zinc-400 text-sm">Perfect for Jumeirah small businesses and family services.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 3,500</div>
              <div className="text-white font-bold mb-2">Business Website</div>
              <div className="text-zinc-400 text-sm">For established Jumeirah businesses with multiple services.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 5,000</div>
              <div className="text-white font-bold mb-2">Healthcare Website</div>
              <div className="text-zinc-400 text-sm">DHA-compliant with appointment booking and patient management.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near Jumeirah We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Umm Suqeim', 'Al Safa', 'Al Wasl', 'City Walk', 'Downtown Dubai', 'Jumeirah Beach', 'Jumeirah Village', 'La Mer'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — Jumeirah</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build websites for Jumeirah clinics?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build DHA-compliant healthcare websites with appointment booking, patient portals, and medical record integration.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you help with local SEO for Jumeirah?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we optimize for "near me" searches and Google Business Profile so Jumeirah residents find your clinic, school, or restaurant first.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you work with small family businesses?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, our startup package is perfect for small family businesses. We understand tight budgets and deliver professional results.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How quickly can you deliver?</dt>
              <dd className="text-zinc-400 leading-relaxed">Most Jumeirah business sites are live in 5-7 days. Healthcare and education sites take 10-14 days for compliance review.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your Jumeirah Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom website built for your Jumeirah business. Community-focused. Affordable. Mobile-first.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Jumeirah" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Jumeirah","description":"Custom web development for Jumeirah family businesses, clinics, and schools.","url":"https://codehtml.in/dubai-web-development-jumeirah","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.2048","longitude":"55.2708"},"areaServed":{"@type":"City","name":"Jumeirah"},"priceRange":"$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Jumeirah","item":"https://codehtml.in/dubai-web-development-jumeirah"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you build websites for Jumeirah clinics?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build DHA-compliant healthcare websites with appointment booking and patient portals."}},{"@type":"Question","name":"Can you help with local SEO for Jumeirah?","acceptedAnswer":{"@type":"Answer","text":"Yes, we optimize for near me searches and Google Business Profile."}},{"@type":"Question","name":"Do you work with small family businesses?","acceptedAnswer":{"@type":"Answer","text":"Yes, our startup package is perfect for small family businesses."}},{"@type":"Question","name":"How quickly can you deliver?","acceptedAnswer":{"@type":"Answer","text":"Most Jumeirah business sites are live in 5-7 days."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentJumeirah;
