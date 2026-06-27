import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Globe, Code, Smartphone, ArrowRight, MapPin, Phone, CheckCircle, Clock, Monitor } from 'lucide-react';

const AppDeveloperNearMeDubai = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHTML",
    "description": "Local app developer in Dubai, Business Bay",
    "url": "https://codehtml.in/app-developer-near-me-dubai",
    "telephone": "+91-93032-28082",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.185",
      "longitude": "55.265"
    },
    "priceRange": "$$$",
    "areaServed": {
      "@type": "City",
      "name": "Dubai"
    }
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO
        title="App Developer Near Me — Dubai | CodeHTML iOS & Android"
        description="Looking for an app developer near you? CodeHTML is a Dubai-based mobile app development company in Business Bay. iOS & Android apps built with React Native. Free consultation."
        schema={localBusinessSchema}
      />

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <MapPin size={14} className="text-brand-gold" />
            <span>Business Bay, Dubai</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-8 leading-tight tracking-tight">
            App Developer Near Me in Dubai
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-6">
            <strong className="text-white">Looking for a mobile app developer near you?</strong> CodeHTML is based in Business Bay, Dubai. We build iOS and Android apps with React Native for startups and enterprises across the UAE. Free consultation available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-zinc-400">
            <a href="tel:+919303228082" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Phone size={16} /> +91 93032 28082
            </a>
            <a href="mailto:Contact@Codehtml.in" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Globe size={16} /> Contact@Codehtml.in
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock size={16} className="text-brand-gold" /> Sun–Thu, 9:00 AM – 6:00 PM GST
            </span>
          </div>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20app%20development%20near%20me%20in%20Dubai."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
          >
            <Phone size={18} /> WhatsApp for Free Consultation
          </a>
        </div>
      </div>

      {/* Address Section */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-2xl text-center">
            <MapPin className="text-brand-gold mx-auto mb-4" size={40} />
            <h2 className="text-2xl font-outfit font-bold mb-4">Visit Our Dubai Office</h2>
            <address className="not-italic text-lg text-zinc-300 space-y-2">
              <p className="font-bold text-white text-xl">CodeHTML Technologies</p>
              <p>Business Bay, Dubai, UAE</p>
              <p>Phone: <a href="tel:+919303228082" className="text-brand-gold hover:underline">+91 93032 28082</a></p>
              <p>Email: <a href="mailto:Contact@Codehtml.in" className="text-brand-gold hover:underline">Contact@Codehtml.in</a></p>
              <p>Hours: Sun–Thu, 9:00 AM – 6:00 PM GST</p>
            </address>
            <div className="mt-6">
              <a
                href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20app%20development%20near%20me%20in%20Dubai."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
              >
                <Phone size={18} /> Book a Meeting
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Local */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Why Choose a Local App Developer in Dubai?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Face-to-Face Meetings</h3>
              <p className="text-zinc-400 text-sm">Walk into our Business Bay office for in-person project discussions, design reviews, and strategic planning. Nothing beats sitting across the table from your development team.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">UAE Timezone Support</h3>
              <p className="text-zinc-400 text-sm">We operate in GST and are available during UAE business hours. Get same-day responses, real-time updates, and synchronous collaboration without timezone delays.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Local Market Knowledge</h3>
              <p className="text-zinc-400 text-sm">We understand the Dubai market, UAE consumer behavior, and regional business practices. Your app will be built for the audience that actually lives and works here.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Arabic/English Bilingual Apps</h3>
              <p className="text-zinc-400 text-sm">Full RTL support for Arabic interfaces, bilingual content management, and culturally appropriate UX design that resonates with both expat and local UAE users.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Fast Delivery (3-5 Day MVP)</h3>
              <p className="text-zinc-400 text-sm">Proximity means faster communication and quicker decisions. We deliver MVP prototypes in 3-5 days so you can validate your idea before investing heavily.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Post-Launch Support</h3>
              <p className="text-zinc-400 text-sm">We are not going anywhere. Our local presence means reliable, ongoing support for updates, bug fixes, and feature enhancements whenever you need them.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Mobile App Development Services Near You</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Full-service mobile app development from your local Dubai team. Every platform, every industry.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Monitor className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">iOS App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Native Swift and React Native iOS apps built for iPhone and iPad. We publish directly to the App Store UAE with full compliance and ASO optimization.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Android App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Kotlin and React Native Android apps optimized for all devices. We handle Google Play publishing, store listing optimization, and ongoing maintenance.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">React Native Cross-Platform</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Build once, deploy everywhere. One codebase powers both iOS and Android, cutting development time and cost by up to 40% without sacrificing quality.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">App Development Pricing Near You (AED)</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Honest pricing from your local Dubai app developer. No surprises, no hidden fees.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">MVP App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">4,000 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 2 weeks</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Core features</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> One platform</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Basic UI/UX</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">Business App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">15,000 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 1 month</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Both platforms</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Custom backend</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Admin dashboard</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold mb-2">E-commerce App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">25,000 AED</p>
              <p className="text-zinc-400 text-sm mb-4">Delivery: 6 weeks</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Payment gateway</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Cart & checkout</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Order tracking</li>
              </ul>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 border-brand-gold/30">
              <h3 className="text-xl font-bold mb-2">Enterprise App</h3>
              <p className="text-3xl font-outfit font-black text-brand-gold mb-2">50,000+ AED</p>
              <p className="text-zinc-400 text-sm mb-4">Custom timeline</p>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Full custom build</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Enterprise security</li>
                <li className="flex items-center gap-2"><CheckCircle size={14} className="text-brand-gold" /> Dedicated team</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How do I find a reliable app developer near me in Dubai?</h3>
              <p className="text-zinc-400">Look for a developer with a local office, proven portfolio, and transparent pricing. CodeHTML is based in Business Bay with 118+ delivered projects, face-to-face consultation availability, and clear AED pricing. Visit our office, review our case studies, and speak directly with our development team before making a decision.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How much does app development cost in Dubai?</h3>
              <p className="text-zinc-400">App development costs in Dubai range from 4,000 AED for an MVP to 50,000+ AED for enterprise applications. The price depends on the number of platforms (iOS, Android, or both), features, backend requirements, and design complexity. We provide fixed-price quotes before starting any project.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How long does it take to build an app in Dubai?</h3>
              <p className="text-zinc-400">MVP prototypes take 2 weeks. Standard business apps take 1 month. E-commerce apps take 6 weeks. Complex enterprise applications with custom integrations can take 3-6 months. We use agile methodology with weekly milestones so you always know exactly where your project stands.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Do you offer face-to-face consultations?</h3>
              <p className="text-zinc-400">Yes, absolutely. Our office is in Business Bay, Dubai, and we welcome in-person meetings. We regularly meet clients from Dubai Marina, JLT, DIFC, Downtown Dubai, Jumeirah, and other areas. Schedule a visit to discuss your app idea, review wireframes, or plan your product roadmap.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">What areas of Dubai do you serve?</h3>
              <p className="text-zinc-400">We serve all Dubai communities including Business Bay, Dubai Marina, JLT, DIFC, Downtown Dubai, Jumeirah, Deira, Al Barsha, Dubai Silicon Oasis, and Dubai Internet City. We also work with clients across the UAE in Abu Dhabi, Sharjah, and Ajman.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Areas Served */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">We Serve All Dubai Communities</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Business Bay', 'Dubai Marina', 'JLT', 'DIFC', 'Downtown Dubai', 'Jumeirah', 'Deira', 'Al Barsha', 'Dubai Silicon Oasis', 'Dubai Internet City'].map((area) => (
              <div key={area} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center text-sm font-semibold text-zinc-300">
                <MapPin size={16} className="text-brand-gold mx-auto mb-2" />
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Get a Free App Development Consultation</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">Visit our Business Bay office or chat with us on WhatsApp. We will analyze your app idea, recommend the best tech stack, and provide a detailed quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20app%20development%20near%20me%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> WhatsApp Us Now
            </a>
            <a href="tel:+919303228082" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Phone size={18} /> Call +91 93032 28082
            </a>
          </div>
          <p className="text-zinc-400 text-sm">
            Email: <a href="mailto:Contact@Codehtml.in" className="text-brand-gold hover:underline">Contact@Codehtml.in</a> | Business Bay, Dubai, UAE | Sun–Thu, 9:00 AM – 6:00 PM GST
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppDeveloperNearMeDubai;
