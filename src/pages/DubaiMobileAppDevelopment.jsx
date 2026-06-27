import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Globe, Code, Smartphone, ArrowRight, MapPin, Phone, CheckCircle, Star, Briefcase, Shield, Zap, Users, Clock, Monitor, PenTool, Rocket, Search, Bug } from 'lucide-react';

const DubaiMobileAppDevelopment = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "CodeHTML",
    "description": "Mobile app development company in Dubai",
    "url": "https://codehtml.in/dubai-mobile-app-development",
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
        title="Mobile App Development Dubai | iOS & Android | CodeHTML"
        description="Dubai's mobile app development company. iOS & Android apps built with React Native. Face-to-face meetings in Business Bay. 3-5 day MVP delivery. Published on App Store UAE & Google Play."
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
            Mobile App Development Company in Dubai
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            We build iOS and Android apps using React Native for the UAE market. From MVPs to enterprise applications, we deliver face-to-face in Business Bay with 3-5 day MVP turnaround. Published on App Store UAE and Google Play.
          </p>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20mobile%20app%20development%20in%20Dubai."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
          >
            Get a Free Quote <ArrowRight size={18} />
          </a>
        </div>
      </div>

      {/* Trust Stats */}
      <div className="py-20 px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-outfit font-bold text-center mb-12">Trusted by Dubai App Founders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Smartphone className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">118+</h3>
              <p className="text-zinc-400">Apps & Platforms Delivered</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">99+</h3>
              <p className="text-zinc-400">Performance Score</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Clock className="text-brand-gold mx-auto mb-4" size={36} />
              <h3 className="text-4xl font-outfit font-black mb-2">3-5 Day</h3>
              <p className="text-zinc-400">MVP Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">Dubai Mobile App Development Services</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">End-to-end mobile app development for the UAE market. From concept to App Store publishing.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Monitor className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">iOS App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Native Swift and React Native iOS apps optimized for iPhone and iPad. We handle full App Store UAE publishing, TestFlight distribution, and App Store Optimization (ASO).</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Android App Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Kotlin and React Native Android apps built for performance on all devices. We publish directly to Google Play with proper store listing optimization and compliance.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">React Native Cross-Platform</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">One codebase, both iOS and Android. Save up to 40% on development costs while maintaining native performance and user experience for your Dubai audience.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <PenTool className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">App UI/UX Design</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Dubai-focused design standards with Arabic RTL layouts, culturally appropriate color palettes, and intuitive user flows that drive engagement and retention.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Shield className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">App Maintenance & Updates</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Ongoing support including iOS/Android OS updates, feature enhancements, bug fixes, performance monitoring, and security patches. We keep your app competitive.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">MVP Rapid Development</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">3-5 day prototype delivery to validate your idea with real users. Perfect for Dubai startups and investors who need to move fast and secure funding.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Local */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Why Choose a Dubai App Developer?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Users className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Face-to-Face Meetings</h3>
              <p className="text-zinc-400 text-sm">Visit our Business Bay office for in-person consultations, design reviews, and project planning. No timezone confusion, no miscommunication.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Clock className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">UAE Timezone Support</h3>
              <p className="text-zinc-400 text-sm">We work in GST (Gulf Standard Time) and are available during UAE business hours. Same-day responses and real-time collaboration.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Globe className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Arabic/English Bilingual</h3>
              <p className="text-zinc-400 text-sm">Full RTL support for Arabic interfaces with proper font rendering, bilingual content management, and culturally relevant UX patterns.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Shield className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Local Payment Integration</h3>
              <p className="text-zinc-400 text-sm">Integrated with Telr, PayFort, Network International, and Apple Pay UAE. Full compliance with UAE Central Bank regulations.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
              <p className="text-zinc-400 text-sm">3-5 day MVP prototypes to validate your concept. We move at the speed Dubai demands, with weekly milestones and transparent progress.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Star className="text-brand-gold mb-4" size={32} />
              <h3 className="text-lg font-bold mb-2">App Store Publishing</h3>
              <p className="text-zinc-400 text-sm">We handle the entire App Store UAE and Google Play publishing process, including developer account setup, store listings, screenshots, and compliance.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-4">App Development Pricing in Dubai (AED)</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">Transparent mobile app pricing. No hidden fees. Full source code included.</p>
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

      {/* Process Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-center mb-12">Our Dubai App Development Process</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Zap className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">1. Idea Validation</h3>
              <p className="text-sm text-zinc-400">We analyze your app concept, target market, and competition to validate the idea before writing a single line of code.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <PenTool className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">2. Wireframe</h3>
              <p className="text-sm text-zinc-400">Low-fidelity wireframes map out user flows and screen layouts to ensure intuitive navigation before visual design begins.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Monitor className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">3. Design</h3>
              <p className="text-sm text-zinc-400">High-fidelity UI design with interactive prototypes, Dubai-focused aesthetics, and Arabic RTL considerations.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Code className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">4. Development</h3>
              <p className="text-sm text-zinc-400">React Native or native development with clean architecture, reusable components, and API integration.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Bug className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">5. Testing</h3>
              <p className="text-sm text-zinc-400">Rigorous QA across devices, OS versions, and network conditions. Automated testing, performance profiling, and security audits.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <Rocket className="text-brand-gold mx-auto mb-4" size={32} />
              <h3 className="font-bold mb-2">6. Launch</h3>
              <p className="text-sm text-zinc-400">App Store and Google Play submission with optimized listings, screenshots, and ASO. We handle rejections and compliance.</p>
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
              <h3 className="text-lg font-bold mb-2">How much does app development cost in Dubai?</h3>
              <p className="text-zinc-400">Mobile app development in Dubai ranges from 4,000 AED for a basic MVP to 50,000+ AED for a custom enterprise application. The cost depends on platforms (iOS, Android, or both), features, backend complexity, and design requirements.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">How long does it take to build an app in Dubai?</h3>
              <p className="text-zinc-400">MVP apps take 2 weeks. Standard business apps take 1 month. E-commerce apps take 6 weeks. Complex enterprise apps can take 3-6 months depending on integrations and feature sets.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Do you publish on App Store UAE?</h3>
              <p className="text-zinc-400">Yes, we handle the full App Store and Google Play publishing process. This includes developer account setup, app store listing optimization, compliance documentation, screenshot creation, and submission management.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Can you build Arabic apps?</h3>
              <p className="text-zinc-400">Absolutely. We build fully RTL-compatible Arabic apps with proper font rendering, right-to-left layouts, bilingual content support, and Arabic keyboard optimization. All our Dubai apps support both Arabic and English.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-bold mb-2">Where is your office?</h3>
              <p className="text-zinc-400">Our office is located in Business Bay, Dubai. We welcome face-to-face consultations for clients across the UAE including Dubai Marina, JLT, DIFC, Downtown Dubai, and Jumeirah.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold mb-6">Ready to Launch Your Dubai App?</h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">Get a free app development consultation and detailed quote within 24 hours. We build apps that users love and investors fund.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20mobile%20app%20development%20in%20Dubai."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> WhatsApp Us Now
            </a>
            <a href="mailto:Contact@Codehtml.in" className="inline-flex items-center gap-2 text-brand-gold hover:underline">
              <Globe size={18} /> Contact@Codehtml.in
            </a>
          </div>
          <p className="text-zinc-400 text-sm">
            Phone: <a href="tel:+919303228082" className="text-brand-gold hover:underline">+91 93032 28082</a> | Business Bay, Dubai, UAE
          </p>
        </div>
      </div>
    </div>
  );
};

export default DubaiMobileAppDevelopment;
