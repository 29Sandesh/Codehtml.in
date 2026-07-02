import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, ShoppingCart, Truck, Store } from 'lucide-react';

const DubaiWebDevelopmentDeira = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Deira | CodeHTML — Traditional Business Digital Transformation"
        description="CodeHTML helps Deira traditional businesses go digital. Custom websites, e-commerce, online booking. Affordable pricing. Business Bay office. 3-5 day delivery."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Deira — Historic Dubai
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Deira</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Deira is Dubai's historic commercial heart — the Gold Souk, Spice Souk, and Naif Market. Traditional businesses here are discovering that going digital is no longer optional. We help Deira businesses build their online presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Deira" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free Deira Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why Deira Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Store className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Retail E-commerce</h3>
              <p className="text-zinc-400 text-sm">Take your Deira shop online with UAE payment gateways and Arabic support.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Truck className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Local Delivery Integration</h3>
              <p className="text-zinc-400 text-sm">Integrate with Talabat, Deliveroo, and Careem for local delivery.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingCart className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Affordable Pricing</h3>
              <p className="text-zinc-400 text-sm">Starting at AED 750. We understand small business budgets in Deira.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Deira Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Retail & Wholesale', 'Gold & Jewellery', 'Spice & Food Trading', 'Restaurants & Cafes', 'Logistics & Shipping', 'Textiles & Fashion'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Deira Web Development Pricing</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 750</div>
              <div className="text-white font-bold mb-2">Starter Website</div>
              <div className="text-zinc-400 text-sm">Perfect for small Deira shops. 5 pages, contact form, basic SEO.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 4,000</div>
              <div className="text-white font-bold mb-2">Business Website</div>
              <div className="text-zinc-400 text-sm">For established Deira businesses with multiple products and services.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">AED 8,000</div>
              <div className="text-white font-bold mb-2">E-commerce Store</div>
              <div className="text-zinc-400 text-sm">Online store with UAE payment gateways, VAT, and inventory management.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Areas Near Deira We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['Bur Dubai', 'Karama', 'Al Rigga', 'Al Muraqqabat', 'Hor Al Anz', 'Naif', 'Al Ras', 'Port Saeed'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — Deira</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you build an e-commerce site for a Deira shop?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we build e-commerce sites with UAE payment gateways (Telr, PayFort, Network International), Arabic support, and VAT compliance.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you understand the Deira market?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we've worked with Deira-based retailers and wholesalers. We understand the importance of bulk pricing, B2B portals, and multi-currency support.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How much does a website cost for a small Deira business?</dt>
              <dd className="text-zinc-400 leading-relaxed">Starting at AED 750 for a 5-page professional website. E-commerce stores start at AED 8,000. We offer flexible payment plans.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you integrate with local delivery services?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we integrate with Talabat, Deliveroo, Careem, and your own delivery fleet for seamless order management.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Take Your Deira Business Online?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom website built for your Deira business. E-commerce. Online booking. Local delivery. Affordable pricing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Deira" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development in Deira","description":"Custom web development for Deira traditional businesses, retail, and wholesale.","url":"https://codehtml.in/dubai-web-development-deira","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"geo":{"@type":"GeoCoordinates","latitude":"25.2653","longitude":"55.3276"},"areaServed":{"@type":"City","name":"Deira"},"priceRange":"$$","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Dubai Web Development","item":"https://codehtml.in/dubai-web-development"},{"@type":"ListItem","position":3,"name":"Deira","item":"https://codehtml.in/dubai-web-development-deira"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Can you build an e-commerce site for a Deira shop?","acceptedAnswer":{"@type":"Answer","text":"Yes, we build e-commerce sites with UAE payment gateways and Arabic support."}},{"@type":"Question","name":"Do you understand the Deira market?","acceptedAnswer":{"@type":"Answer","text":"Yes, we've worked with Deira retailers and wholesalers."}},{"@type":"Question","name":"How much does a website cost for a small Deira business?","acceptedAnswer":{"@type":"Answer","text":"Starting at AED 750 for a professional website."}},{"@type":"Question","name":"Can you integrate with local delivery services?","acceptedAnswer":{"@type":"Answer","text":"Yes, we integrate with Talabat, Deliveroo, and Careem."}}]}) }} />
    </div>
  );
};

export default DubaiWebDevelopmentDeira;
