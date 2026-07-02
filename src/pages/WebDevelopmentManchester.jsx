import React from 'react';
import SEO from '../components/SEO';
import { MapPin, Phone, Mail, Clock, CheckCircle, PoundSterling, Factory, ShoppingBag, GraduationCap } from 'lucide-react';

const WebDevelopmentManchester = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development Manchester | CodeHTML — Remote Team for Manchester Startups"
        description="CodeHTML serves Manchester startups and businesses remotely from Dubai. Custom React websites, SaaS, mobile apps. Affordable GBP pricing. GDPR compliant. Free consultation."
      />
      
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Remote from Dubai · Serving Manchester
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development for <span className="text-brand-gold">Manchester</span> Businesses
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Manchester's tech scene is booming — from MediaCityUK to the Northern Quarter. CodeHTML provides Manchester businesses with custom web development at Dubai prices, without sacrificing quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Manchester" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center">Get a Free Manchester Quote</a>
            <a href="tel:+919303228082" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center">Call +91 93032 28082</a>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Why Manchester Businesses Choose CodeHTML</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <PoundSterling className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Manchester Prices, Not London Rates</h3>
              <p className="text-zinc-400 text-sm">Get London-quality web development at Manchester-friendly prices. No London office overhead.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Factory className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Manufacturing Portal Expertise</h3>
              <p className="text-zinc-400 text-sm">Manchester's manufacturing heritage meets modern digital. B2B portals, inventory systems, and supplier management.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <ShoppingBag className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Retail E-commerce</h3>
              <p className="text-zinc-400 text-sm">From the Trafford Centre to the Northern Quarter, we build retail sites that convert.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <GraduationCap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">University Partnerships</h3>
              <p className="text-zinc-400 text-sm">We work with Manchester's universities and student startups. Edu-tech and research platforms.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Manchester Industries We Serve</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {['Media & Broadcasting', 'Creative Agencies', 'E-commerce', 'Education', 'Sports Tech', 'Music & Entertainment'].map(industry => (
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
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Manchester Web Development Pricing (GBP)</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£150</div>
              <div className="text-white font-bold mb-2">Startup Website</div>
              <div className="text-zinc-400 text-sm">Perfect for Manchester startups. 5 pages, basic SEO, mobile-first.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£850</div>
              <div className="text-white font-bold mb-2">Business Website</div>
              <div className="text-zinc-400 text-sm">For established Manchester businesses. 10 pages, CMS, analytics.</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="text-2xl font-bold text-brand-gold mb-2">£2,500</div>
              <div className="text-white font-bold mb-2">E-commerce Store</div>
              <div className="text-zinc-400 text-sm">Full online store with UK VAT, payment gateways, inventory.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Manchester Areas We Serve</h2>
          <div className="flex flex-wrap gap-3">
            {['MediaCityUK', 'Northern Quarter', 'Spinningfields', 'Oxford Road', 'Ancoats', 'Salford Quays', 'Didsbury', 'Chorlton'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">{area}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">Frequently Asked Questions — Manchester</h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you work with Manchester startups?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we love working with Manchester startups from MediaCityUK, the Northern Quarter, and university spin-offs. Our startup package is perfect for early-stage companies.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Can you build e-commerce for Manchester retailers?</dt>
              <dd className="text-zinc-400 leading-relaxed">Absolutely. From the Trafford Centre to independent Northern Quarter boutiques, we build retail sites with UK payment gateways, VAT, and click-and-collect.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">Do you understand the Manchester market?</dt>
              <dd className="text-zinc-400 leading-relaxed">Yes, we understand Manchester's unique blend of industrial heritage and modern tech. We build sites that speak to Manchester's creative, professional, and industrial sectors.</dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">How do Manchester meetings work remotely?</dt>
              <dd className="text-zinc-400 leading-relaxed">We schedule video calls during GMT business hours. For Manchester clients, we offer early morning calls (8 AM GMT) and late afternoon calls (4 PM GMT) to suit your schedule.</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">Ready to Build Your Manchester Website?</h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">Get a custom website built for your Manchester business. Remote from Dubai. GDPR compliant. GBP pricing. 3-5 day delivery.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Manchester" className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors">WhatsApp Us Now</a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">Email: Contact@Codehtml.in</a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Dubai-based, serving Manchester remotely</span>
            <span className="flex items-center gap-2"><Clock size={16} /> GMT-friendly meetings</span>
          </div>
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"CodeHTML - Web Development for Manchester Businesses","description":"Remote web development from Dubai for Manchester businesses. GDPR compliant, GBP pricing.","url":"https://codehtml.in/web-development-manchester","telephone":"+91-93032-28082","email":"Contact@Codehtml.in","address":{"@type":"PostalAddress","streetAddress":"Business Bay","addressLocality":"Dubai","addressRegion":"Dubai","addressCountry":"AE"},"areaServed":{"@type":"City","name":"Manchester"},"priceRange":"££","openingHours":"Su-Th 09:00-18:00"}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://codehtml.in"},{"@type":"ListItem","position":2,"name":"Web Development UK","item":"https://codehtml.in/uk-web-development"},{"@type":"ListItem","position":3,"name":"Manchester","item":"https://codehtml.in/web-development-manchester"}]}) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Do you work with Manchester startups?","acceptedAnswer":{"@type":"Answer","text":"Yes, we love working with Manchester startups from MediaCityUK and the Northern Quarter."}},{"@type":"Question","name":"Can you build e-commerce for Manchester retailers?","acceptedAnswer":{"@type":"Answer","text":"Absolutely. We build retail sites with UK payment gateways, VAT, and click-and-collect."}},{"@type":"Question","name":"Do you understand the Manchester market?","acceptedAnswer":{"@type":"Answer","text":"Yes, we understand Manchester's unique blend of industrial heritage and modern tech."}},{"@type":"Question","name":"How do Manchester meetings work remotely?","acceptedAnswer":{"@type":"Answer","text":"We schedule video calls during GMT business hours, with early morning and late afternoon options."}}]}) }} />
    </div>
  );
};

export default WebDevelopmentManchester;
