import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, Zap, Globe, Smartphone, Building2 } from 'lucide-react';

const DubaiWebDevelopmentDowntown = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Downtown Dubai | CodeHTML — Luxury Brand Websites"
        description="CodeHTML builds premium websites for Downtown Dubai luxury brands, hotels, and retail. High-end design, Arabic support, mobile-first. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Downtown Dubai
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Downtown Dubai</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Downtown Dubai is home to the Burj Khalifa, Dubai Mall, and the world's most prestigious luxury brands. Businesses here need websites that match their exclusivity and sophistication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Downtown%20Dubai" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why Downtown Dubai Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Luxury Design</h3>
              <p className="text-zinc-400 text-sm">Premium aesthetics that match Downtown Dubai's brand — clean, modern, high-converting.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Globe className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Arabic + English</h3>
              <p className="text-zinc-400 text-sm">Full RTL support for Arabic-speaking buyers and international tourists.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Mobile-First</h3>
              <p className="text-zinc-400 text-sm">Tourists browse on phones at Dubai Mall. Our sites are touch-optimized.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Downtown Dubai Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Luxury Retail', 'Hotels & Hospitality', 'Fine Dining Restaurants', 'Real Estate', 'Events & Entertainment', 'Jewellery & Watches'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Downtown Dubai Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 8,000</div>
              <div className="text-white font-bold mb-2">Luxury Website</div>
              <div className="text-zinc-400 text-sm">High-end design with animations, lookbooks, and premium typography.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 15,000</div>
              <div className="text-white font-bold mb-2">Hotel Website</div>
              <div className="text-zinc-400 text-sm">Booking engine, virtual tours, multilingual, spa integration.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 20,000</div>
              <div className="text-white font-bold mb-2">E-commerce Store</div>
              <div className="text-zinc-400 text-sm">Luxury retail with high-res galleries, AR try-on, and VIP checkout.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near Downtown Dubai We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Business Bay', 'DIFC', 'Jumeirah', 'Za\'abeel', 'City Walk', 'Al Wasl', 'Trade Centre', 'Financial Centre'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — Downtown Dubai</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you build luxury brand websites?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we specialize in high-end aesthetics with custom animations, premium typography, and lookbook-style galleries that match luxury brand standards.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you handle high traffic during Dubai Shopping Festival?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, our sites scale automatically with CDN and load balancing. We've handled traffic spikes for retail clients during peak seasons.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you offer multilingual websites?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, Arabic, English, French, Russian, and Chinese. Essential for Downtown Dubai's international tourist and buyer market.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do you ensure brand consistency?</dt>
              <dd className="text-zinc-400 leading-relaxed">We create custom design systems with style guides, component libraries, and brand guidelines that ensure consistency across all digital touchpoints.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your Downtown Dubai Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a premium website built for your Downtown Dubai business. Luxury design. Arabic support. Mobile-first.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Downtown%20Dubai" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Downtown Dubai","description":"Premium web development for Downtown Dubai luxury brands, hotels, and retail.","url":"https://codehtml.in/dubai-web-development-downtown","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.1972","longitude":"55.2744"},"areaServed":{"@type":"City","name":"Downtown Dubai"},"priceRange":"$$$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Downtown Dubai","item":"https://codehtml.in/dubai-web-development-downtown"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you build luxury brand websites?","acceptedAnswer":{"@type":"Answer","text":"Yes, we specialize in high-end aesthetics with custom animations and premium typography."}},{"@type":"Question","name":"Can you handle high traffic during Dubai Shopping Festival?","acceptedAnswer":{"@type":"Answer","text":"Yes, our sites scale automatically with CDN and load balancing."}},{"@type":"Question","name":"Do you offer multilingual websites?","acceptedAnswer":{"@type":"Answer","text":"Yes, Arabic, English, French, Russian, and Chinese."}},{"@type":"Question","name":"How do you ensure brand consistency?","acceptedAnswer":{"@type":"Answer","text":"We create custom design systems with style guides and component libraries."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentDowntown;
