import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Globe, Code, ArrowRight, CheckCircle, Star, Users, Zap, Award, TrendingUp, Phone, Mail, MapPin, FileCode, Layers, Shield, Monitor, Smartphone, Cloud } from 'lucide-react';

const AboutCodeHTML = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodeHTML",
    "alternateName": "CodeHTML Technologies",
    "url": "https://codehtml.in",
    "logo": "https://codehtml.in/Codehtml.logo.png",
    "description": "Premium custom software and web development studio based in Dubai, UAE. Founded in 2024.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business Bay",
      "addressLocality": "Dubai",
      "addressRegion": "Dubai",
      "addressCountry": "AE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-93032-28082",
      "contactType": "sales",
      "availableLanguage": ["English", "Hindi", "Arabic"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/codehtml/",
      "https://www.instagram.com/codehtml.in/",
      "https://www.crunchbase.com/organization/codehtml",
      "https://clutch.co/profile/codehtml",
      "https://www.facebook.com/codehtml",
      "https://twitter.com/codehtml",
      "https://www.youtube.com/@codehtml",
      "https://www.medium.com/@codehtml"
    ]
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title="About CodeHTML — Premium Custom Software & Web Development Studio"
        description="CodeHTML is a Dubai-based digital engineering studio founded in 2024. We build custom React websites, SaaS platforms, and iOS/Android mobile apps. 118+ projects delivered. 100% code ownership."
        schema={orgSchema}
      />

      {/* Decorative Blur Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <Globe size={14} className="text-brand-gold" />
            <span>Dubai · UAE · 2024</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-black mb-8 leading-tight tracking-tight">
            CodeHTML — Premium Custom Software &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">
              Web Development Studio
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Founded in 2024 in Dubai, CodeHTML builds high-performance digital products for businesses across the UAE, India, Singapore, UK, and USA.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">118+</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Projects</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">99+</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Lighthouse Score</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">3-5</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Day Delivery</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">5</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Countries Served</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-8 text-white">Who We Are</h2>
          <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
            <p>
              CodeHTML is a premium custom software studio based in Business Bay, Dubai — not a template shop, not a WordPress agency, and not a middleman. We are a team of engineers, designers, and product thinkers who build digital assets from first principles. Every line of code is written by our in-house team, every interface is designed for conversion, and every project is delivered with 100% code ownership transferred to you.
            </p>
            <p>
              Since our founding in 2024, we have partnered with startups, real estate groups, restaurants, SaaS founders, and construction firms across five countries. Our reputation is built on a single promise: we do not use templates, we do not outsource, and we do not compromise on performance. When you hire CodeHTML, you hire a dedicated engineering team that treats your product as if it were our own.
            </p>
            <p>
              We specialize in React, Next.js, and React Native — the same technologies used by Netflix, Airbnb, and Uber. This modern stack ensures your website or app is fast, secure, scalable, and future-proof. Our Dubai headquarters gives us the timezone advantage to serve clients in the GCC, Europe, and Asia with real-time collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-white text-center">What We Do</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            End-to-end digital engineering from concept to deployment. No templates. No shortcuts. Just clean, high-performance code.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Globe className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Custom Website Development</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                React and Next.js websites engineered for speed, SEO, and conversion. We hand-code every component to ensure your site loads in under a second and ranks on Google.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Layers className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Web Application Development</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Custom CRM, ERP, and dashboard applications built with real-time data sync, role-based access, and enterprise-grade security. We handle complex business logic so you don't have to.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Cloud className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">SaaS Platform Development</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Multi-tenant SaaS platforms with subscription billing, user management, and API integrations. We architect systems that scale from 10 users to 10,000 without rewriting.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Smartphone className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Mobile App Development</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                React Native iOS and Android apps with offline-first architecture, push notifications, and deep linking. One codebase, two platforms, native performance.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">AI & Automation</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                WhatsApp chatbots, workflow automation, and AI-powered integrations that reduce manual work by 80%. We connect your tools so your team can focus on growth.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <TrendingUp className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">SEO & Digital Growth</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                AEO (Answer Engine Optimization), local SEO, and conversion rate optimization baked into every build. We engineer for discoverability, not just aesthetics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-8 text-white">Our Story</h2>
          <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
            <p>
              CodeHTML was founded in 2024 to solve a problem we saw everywhere: businesses were losing customers because of slow, generic websites. Dubai's market was flooded with agencies selling WordPress templates and page-builder solutions that looked identical, loaded in 5+ seconds, and broke on mobile. Companies were paying premium prices for digital products that actively hurt their brand.
            </p>
            <p>
              We started with a simple belief: every business deserves a website that is as unique as its mission. That meant no templates, no drag-and-drop builders, and no bloated plugins. It meant custom-coded, fast-loading, high-converting digital products built from scratch. Our first project — a real estate portal for a Dubai-based firm — loaded in 0.7 seconds and generated a 300% increase in qualified leads within 60 days. That set the standard for everything we do.
            </p>
            <p>
              Our three core principles guide every project: <span className="text-white font-semibold">Speed</span> — we optimize for sub-second load times; <span className="text-white font-semibold">Security</span> — static and serverless architectures eliminate database vulnerabilities; and <span className="text-white font-semibold">Ownership</span> — you receive 100% of the source code with no licensing fees or platform lock-in. These principles have helped us deliver 118+ projects across five countries in our first year.
            </p>
          </div>
        </div>
      </section>

      {/* Key Facts About CodeHTML */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Key Facts About CodeHTML</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-sm text-brand-gold font-semibold uppercase tracking-wider mb-2">Founded</div>
              <div className="text-2xl font-outfit font-bold text-white">2024</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-sm text-brand-gold font-semibold uppercase tracking-wider mb-2">Headquarters</div>
              <div className="text-2xl font-outfit font-bold text-white">Dubai, UAE</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-sm text-brand-gold font-semibold uppercase tracking-wider mb-2">Team</div>
              <div className="text-2xl font-outfit font-bold text-white">10+ Engineers</div>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
              <div className="text-sm text-brand-gold font-semibold uppercase tracking-wider mb-2">Clients</div>
              <div className="text-2xl font-outfit font-bold text-white">5+ Countries</div>
            </div>
          </div>
          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 max-w-3xl mx-auto">
            <h3 className="text-xl font-outfit font-bold mb-6 text-white">Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <MapPin className="text-brand-gold shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-sm text-zinc-400">Address</div>
                  <div className="text-white font-semibold">Business Bay, Dubai, UAE</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="text-brand-gold shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-sm text-zinc-400">Phone</div>
                  <a href="tel:+919303228082" className="text-white font-semibold hover:text-brand-gold transition-colors">+91 93032 28082</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="text-brand-gold shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-sm text-zinc-400">Email</div>
                  <a href="mailto:Contact@Codehtml.in" className="text-white font-semibold hover:text-brand-gold transition-colors">Contact@Codehtml.in</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Monitor className="text-brand-gold shrink-0 mt-1" size={20} />
                <div>
                  <div className="text-sm text-zinc-400">Business Hours</div>
                  <div className="text-white font-semibold">Sun–Thu, 9 AM – 6 PM GST</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notable Projects */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Notable Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Swigato</h3>
              <p className="text-sm text-zinc-400 mb-4">Multi-city food delivery platform with real-time order tracking and restaurant management.</p>
              <Link to="/case-study/swigato" className="inline-flex items-center gap-2 text-brand-gold font-semibold text-sm hover:text-white transition-colors">
                View Case Study <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Alaya Realty</h3>
              <p className="text-sm text-zinc-400 mb-4">Real estate portal with instant property search, 0.7s load time, and CRM integration.</p>
              <Link to="/case-study/alaya-realty" className="inline-flex items-center gap-2 text-brand-gold font-semibold text-sm hover:text-white transition-colors">
                View Case Study <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">SLCC</h3>
              <p className="text-sm text-zinc-400 mb-4">Construction portal with 3D blueprints, project timelines, and vendor coordination.</p>
              <Link to="/case-study/slcc" className="inline-flex items-center gap-2 text-brand-gold font-semibold text-sm hover:text-white transition-colors">
                View Case Study <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose CodeHTML? */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Why Choose CodeHTML?</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-outfit font-bold text-white mb-1">100% Code Ownership</h3>
                <p className="text-sm text-zinc-400">No licensing fees, no platform lock-in, and no recurring charges. You receive the complete source code and all intellectual property rights on delivery.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-outfit font-bold text-white mb-1">Custom-Built</h3>
                <p className="text-sm text-zinc-400">No templates, no WordPress, and no page builders. Every component is hand-coded to match your exact business requirements and brand identity.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-outfit font-bold text-white mb-1">3-5 Day Delivery</h3>
                <p className="text-sm text-zinc-400">Rapid MVP development for startups and businesses that need to move fast. Our streamlined process gets you to market without sacrificing quality.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-outfit font-bold text-white mb-1">99+ Performance Scores</h3>
                <p className="text-sm text-zinc-400">Lighthouse optimization is standard on every project. We engineer for Core Web Vitals, ensuring your site ranks higher and converts better.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <CheckCircle className="text-brand-gold shrink-0 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-outfit font-bold text-white mb-1">Dubai-Based</h3>
                <p className="text-sm text-zinc-400">Local team with face-to-face meetings available. We understand the GCC market, local business culture, and the urgency of Dubai's competitive landscape.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="text-brand-gold" size={28} />
              </div>
              <h3 className="text-xl font-outfit font-bold mb-4 text-white">Speed</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                We believe that speed is a competitive advantage. From project kickoff to deployment, we operate with urgency. Our websites load in under a second, our communication is real-time, and our delivery timelines are aggressive. In a market where every day of delay costs revenue, we move fast without breaking things.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-brand-gold" size={28} />
              </div>
              <h3 className="text-xl font-outfit font-bold mb-4 text-white">Quality</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Quality is not negotiable. Every pixel is intentional, every interaction is polished, and every line of code is reviewed. We do not ship mediocrity. Our benchmark is simple: would we be proud to put our name on this? If the answer is no, we keep working until it is yes. That is why our clients return.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center">
              <div className="w-14 h-14 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-brand-gold" size={28} />
              </div>
              <h3 className="text-xl font-outfit font-bold mb-4 text-white">Transparency</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                No hidden fees, no scope creep, no surprises. We quote fixed prices, deliver weekly progress updates, and give you direct access to the codebase from day one. Transparency builds trust, and trust is the foundation of every long-term partnership we have built since 2024.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-6 text-white">Work With CodeHTML</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Ready to build your custom platform? Let's discuss your project, timeline, and budget. We respond within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20discussing%20a%20custom%20project%20with%20your%20studio."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> Chat on WhatsApp
            </a>
            <a 
              href="mailto:Contact@Codehtml.in?subject=Project%20Inquiry%20-%20CodeHTML"
              className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
            >
              <Mail size={18} /> Send an Email
            </a>
          </div>
          <a href="tel:+919303228082" className="text-zinc-400 hover:text-brand-gold transition-colors text-sm">
            Or call us: +91 93032 28082
          </a>
        </div>
      </section>
    </div>
  );
};

export default AboutCodeHTML;
