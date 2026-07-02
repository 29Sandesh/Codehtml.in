import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Zap, Globe, Code, Smartphone, Building2 } from 'lucide-react';

const DubaiWebDevelopmentMarina = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO 
        title="Web Development in Dubai Marina | CodeHTML — Custom React & Mobile Apps"
        description="CodeHTML builds custom React websites and mobile apps for Dubai Marina businesses. Real estate, hospitality, and luxury retail. Based in Business Bay. 3-5 day delivery."
      />
      
      {/* Hero */}
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-6 border border-brand-gold/20">
            <MapPin size={14} /> Dubai Marina
          </div>
          <h1 className="font-outfit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Web Development in <span className="text-brand-gold">Dubai Marina</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Dubai Marina is one of Dubai's most vibrant communities, home to over 200,000 residents and thousands of businesses. From waterfront restaurants on the Marina Walk to luxury real estate agencies in the Marina Towers, businesses here need websites that match the area's premium brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Marina"
              className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors text-center"
            >
              Get a Free Quote for Marina
            </a>
            <a 
              href="tel:+919303228082"
              className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors text-center"
            >
              Call +91 93032 28082
            </a>
          </div>
        </div>
      </div>

      {/* Why Marina */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            Why Dubai Marina Businesses Need Custom Websites
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Unlike Deira or Bur Dubai, Dubai Marina's clientele expects a certain standard. A generic template website won't cut it for a yacht charter company or a penthouse real estate agency. We've built websites for 5+ Dubai Marina businesses, delivering sub-second load times and mobile-first designs.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">0.7s Load Time</h3>
              <p className="text-zinc-400 text-sm">Marina's mobile-first audience (91% UAE mobile usage) demands instant loading. Our React sites deliver.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Globe className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Arabic + English</h3>
              <p className="text-zinc-400 text-sm">Full RTL support for Arabic-speaking buyers and investors in Marina's international market.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Mobile-First</h3>
              <p className="text-zinc-400 text-sm">Marina visitors browse on phones while walking the Marina Walk. Our sites are touch-optimized.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Building2 className="text-brand-gold mb-4" size={28} />
              <h3 className="font-outfit text-xl font-bold text-white mb-2">Luxury Design</h3>
              <p className="text-zinc-400 text-sm">Premium aesthetics that match Marina's brand — clean, modern, high-converting.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Real Estate Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            Real Estate Website Development in Dubai Marina
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Real estate is the biggest industry in Dubai Marina. Agencies need websites that handle high-resolution galleries, virtual tours, and complex property searches. Our Alaya Realty project (alayarealty.in) is a perfect example — a 0.7s loading real estate portal built for the Dubai market.
          </p>
          <ul className="space-y-3 mt-6">
            <li className="flex items-start gap-3">
              <CheckCircle className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <span className="text-zinc-300">High-resolution image galleries with lazy loading</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <span className="text-zinc-300">Arabic/English bilingual support for international buyers</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <span className="text-zinc-300">Virtual tour integration (Matterport, 3D views)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <span className="text-zinc-300">Property search with filters (price, bedrooms, view, building)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="text-brand-gold shrink-0 mt-0.5" size={18} />
              <span className="text-zinc-300">Lead capture forms that sync with CRM (HubSpot, Salesforce)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Restaurant Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            Restaurant & Hospitality Websites in Dubai Marina
          </h2>
          <p className="text-zinc-400 leading-relaxed mb-6">
            With 100+ restaurants along the Marina Walk, competition is fierce. A restaurant website needs more than a menu — it needs reservations, online ordering, and integration with Talabat, Deliveroo, and Careem.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5 text-center">
              <div className="text-2xl font-bold text-brand-gold mb-1">100+</div>
              <div className="text-zinc-400 text-sm">Restaurants on Marina Walk</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5 text-center">
              <div className="text-2xl font-bold text-brand-gold mb-1">200K+</div>
              <div className="text-zinc-400 text-sm">Residents in Marina</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-xl border border-white/5 text-center">
              <div className="text-2xl font-bold text-brand-gold mb-1">91%</div>
              <div className="text-zinc-400 text-sm">Mobile browsing in UAE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            What Dubai Marina Businesses Pay for Web Development
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-brand-gold" size={24} />
                <h3 className="font-outfit text-xl font-bold text-white">Real Estate Website</h3>
              </div>
              <div className="text-3xl font-bold text-brand-gold mb-2">AED 4,000</div>
              <div className="text-zinc-400 text-sm mb-4">Starting price</div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Property listings with search</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> High-res image galleries</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Lead capture forms</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 10-day delivery</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <Smartphone className="text-brand-gold" size={24} />
                <h3 className="font-outfit text-xl font-bold text-white">Restaurant Website</h3>
              </div>
              <div className="text-3xl font-bold text-brand-gold mb-2">AED 3,000</div>
              <div className="text-zinc-400 text-sm mb-4">Starting price</div>
              <ul className="space-y-2 text-sm text-zinc-300">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Online reservations</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Menu with photos</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Delivery integration</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> 7-day delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Nearby */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            Areas Near Dubai Marina We Serve
          </h2>
          <div className="flex flex-wrap gap-3">
            {['JBR', 'Jumeirah Beach Residence', 'Dubai Media City', 'Dubai Internet City', 'Al Sufouh', 'Barsha Heights', 'JLT', 'Palm Jumeirah'].map(area => (
              <span key={area} className="px-4 py-2 bg-zinc-900/50 rounded-full text-zinc-300 text-sm border border-white/5">
                {area}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit text-3xl font-bold text-white mb-8">
            Frequently Asked Questions — Dubai Marina
          </h2>
          <dl className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">
                Do you offer face-to-face meetings in Dubai Marina?
              </dt>
              <dd className="text-zinc-400 leading-relaxed">
                Yes, our Business Bay office is 15 minutes from Dubai Marina. We can also meet at your location or a co-working space in the area such as AstroLabs or WeWork JLT.
              </dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">
                Can you build a website for a yacht charter company in Dubai Marina?
              </dt>
              <dd className="text-zinc-400 leading-relaxed">
                Yes, we've built booking and rental platforms for hospitality and leisure businesses in Dubai. Our systems handle real-time availability, payment processing, and multi-language support for international tourists.
              </dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">
                How long does website development take for a Dubai Marina business?
              </dt>
              <dd className="text-zinc-400 leading-relaxed">
                Most business websites are delivered in 5-14 days. Complex web applications with custom features take 30-60 days. We offer rush delivery for urgent Marina launches.
              </dd>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <dt className="font-outfit text-lg font-bold text-white mb-3">
                Do you offer Arabic website development for Dubai Marina?
              </dt>
              <dd className="text-zinc-400 leading-relaxed">
                Yes, we build fully RTL-compatible Arabic websites with proper font rendering, translation-ready architecture, and Arabic SEO optimization. Essential for Marina's international buyer market.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit text-3xl font-bold text-white mb-4">
            Ready to Build Your Dubai Marina Website?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            Get a custom React website built for your Dubai Marina business. 3-5 day delivery. 100% code ownership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20web%20development%20in%20Dubai%20Marina"
              className="bg-brand-gold text-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-colors"
            >
              WhatsApp Us Now
            </a>
            <a href="mailto:Contact@Codehtml.in" className="px-8 py-4 rounded-xl font-bold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Email: Contact@Codehtml.in
            </a>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-400 text-sm">
            <span className="flex items-center gap-2"><Phone size={16} /> +91 93032 28082</span>
            <span className="flex items-center gap-2"><MapPin size={16} /> Business Bay, Dubai, UAE</span>
            <span className="flex items-center gap-2"><Clock size={16} /> Sun–Thu, 9 AM – 6 PM GST</span>
          </div>
        </div>
      </div>

      {/* LocalBusiness Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "CodeHTML - Web Development in Dubai Marina",
        "description": "Custom web development company serving Dubai Marina businesses. React, Next.js, mobile apps.",
        "url": "https://codehtml.in/dubai-web-development-marina",
        "telephone": "+91-93032-28082",
        "email": "Contact@Codehtml.in",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Business Bay",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "25.0772",
          "longitude": "55.1334"
        },
        "areaServed": {
          "@type": "City",
          "name": "Dubai Marina"
        },
        "priceRange": "$$$",
        "openingHours": "Su-Th 09:00-18:00"
      }) }} />

      {/* Breadcrumb Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://codehtml.in" },
          { "@type": "ListItem", "position": 2, "name": "Dubai Web Development", "item": "https://codehtml.in/dubai-web-development" },
          { "@type": "ListItem", "position": 3, "name": "Dubai Marina", "item": "https://codehtml.in/dubai-web-development-marina" }
        ]
      }) }} />

      {/* FAQPage Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "Do you offer face-to-face meetings in Dubai Marina?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, our Business Bay office is 15 minutes from Dubai Marina. We can also meet at your location or a co-working space in the area." } },
          { "@type": "Question", "name": "Can you build a website for a yacht charter company in Dubai Marina?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we've built booking and rental platforms for hospitality and leisure businesses in Dubai." } },
          { "@type": "Question", "name": "How long does website development take for a Dubai Marina business?", "acceptedAnswer": { "@type": "Answer", "text": "Most business websites are delivered in 5-14 days. Complex web applications take 30-60 days." } },
          { "@type": "Question", "name": "Do you offer Arabic website development for Dubai Marina?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we build fully RTL-compatible Arabic websites with proper font rendering and Arabic SEO optimization." } }
        ]
      }) }} />
    </div>
  );
};

export default DubaiWebDevelopmentMarina;
