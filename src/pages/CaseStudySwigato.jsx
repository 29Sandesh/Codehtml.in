import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Smartphone, Globe, Zap, Clock, Users, Star, CheckCircle, TrendingUp, Code, Server, Shield } from 'lucide-react';

const CaseStudySwigato = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "Swigato India — Food Delivery Platform Built by CodeHTML Dubai",
    "description": "Swigato is a multi-city food delivery platform built by CodeHTML in Dubai. React + Node.js stack. 0.7s load time. See screenshots, tech stack, and metrics.",
    "image": "https://codehtml.in/SwigatoIndia.webp",
    "author": {
      "@type": "Organization",
      "name": "CodeHTML"
    }
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Case Studies", item: "/case-study/03" },
    { name: "Swigato India", item: "/case-study/swigato" }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO
        title="Swigato India — Food Delivery Platform Built by CodeHTML Dubai"
        description="Swigato is a multi-city food delivery platform built by CodeHTML in Dubai. React + Node.js stack. 0.7s load time. See screenshots, tech stack, and metrics."
        image="https://codehtml.in/SwigatoIndia.webp"
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      {/* Decorative blur blobs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-brand-gold font-bold text-xs tracking-widest px-4 py-2 border border-brand-gold/30 rounded-full uppercase">
              Case Study
            </span>
            <span className="text-zinc-500 text-xs tracking-widest uppercase">Client: Swigato India</span>
          </div>

          <h1 className="font-outfit font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
            Swigato India — <span className="text-brand-gold">Multi-City</span> Food Delivery Platform
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
            A full-stack food delivery solution built by CodeHTML for the Indian market. From customer ordering to restaurant management and real-time delivery tracking — engineered for speed, scale, and reliability.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Globe className="w-4 h-4 text-brand-gold" />
              <span>Live URL: <span className="text-white font-medium">swigatoindia.in</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Platform Type', value: 'Food Delivery', icon: Smartphone },
              { label: 'Cities', value: 'Multi-City', icon: Globe },
              { label: 'Timeline', value: '3 Weeks', icon: Clock },
              { label: 'Stack', value: 'React + Node.js', icon: Code },
            ].map((stat, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5">
                <stat.icon className="w-5 h-5 text-brand-gold mb-3" />
                <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                <div className="text-white font-bold text-sm md:text-base">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CLIENT OVERVIEW ─── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-6">Client Overview</h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Swigato India is a forward-thinking food delivery startup targeting tier-2 and tier-3 cities across India — markets traditionally underserved by giants like Swiggy and Zomato. The founders recognized a massive opportunity: millions of consumers in smaller cities wanted reliable food delivery, but existing platforms focused almost exclusively on metro areas. Swigato needed a technology partner who could build a scalable, cost-effective platform from scratch, one that could compete with established players on performance while operating within a startup budget. They approached CodeHTML with a clear vision and an aggressive timeline.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed mt-4">
            The platform needed to handle thousands of daily orders across multiple cities, support real-time order tracking, enable seamless restaurant onboarding with full menu management, and deliver a mobile-first experience that worked flawlessly on low-end Android devices common in their target markets. Payment integration was critical — UPI, wallets, and cards had to work seamlessly for Indian consumers.
          </p>
        </div>
      </section>

      {/* ─── CHALLENGE ─── */}
      <section className="py-20 px-6 lg:px-8 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-8">The Challenge</h2>
          <div className="space-y-5">
            {[
              'Existing solutions were too expensive for a startup budget — enterprise SaaS platforms charged lakhs per month in licensing fees.',
              'Need for real-time order tracking across multiple cities with varying infrastructure quality and intermittent connectivity.',
              'Complex restaurant onboarding with menu management, pricing tiers, availability toggles, and category structuring.',
              'Mobile-first audience requiring a responsive PWA that performs like a native app on low-end devices with limited RAM.',
              'Payment gateway integration for Indian UPI, wallets (Paytm, PhonePe, Google Pay), and credit/debit cards with robust failure handling.',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-brand-gold flex-shrink-0 mt-0.5" />
                <p className="text-zinc-400 text-lg leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-6">Our Solution</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8">
            CodeHTML engineered a complete food delivery ecosystem from the ground up, architecting every layer for performance, scalability, and maintainability. We built a custom React + Node.js platform that gives Swigato 100% code ownership — no licensing fees, no vendor lock-in, complete control over their destiny.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { title: 'Customer App (PWA)', desc: 'A progressive web app for ordering with lightning-fast load times, offline cart persistence, and smooth animations.' },
              { title: 'Restaurant Dashboard', desc: 'Real-time menu and order management with live order alerts, inventory tracking, and revenue analytics.' },
              { title: 'Delivery Partner App', desc: 'Real-time tracking, route optimization, earnings dashboard, and instant proof-of-delivery capture.' },
              { title: 'Admin Panel', desc: 'City-level analytics, commission management, user role controls, and dispute resolution workflows.' },
            ].map((card, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="font-outfit font-bold text-lg text-white mb-2">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-outfit font-bold text-xl mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['React', 'Node.js', 'MongoDB', 'Socket.io', 'AWS'].map((tech, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center">
                <Code className="w-5 h-5 text-brand-gold mx-auto mb-2" />
                <span className="text-sm font-bold text-white">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section className="py-20 px-6 lg:px-8 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-8">Results & Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { value: '0.7s', label: 'Load Time', icon: Zap },
              { value: 'Multi-City', label: 'Coverage', icon: Globe },
              { value: 'Real-Time', label: 'Tracking', icon: TrendingUp },
              { value: '100%', label: 'Code Ownership', icon: Shield },
            ].map((stat, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
                <stat.icon className="w-6 h-6 text-brand-gold mx-auto mb-3" />
                <div className="font-outfit font-extrabold text-2xl md:text-3xl text-white mb-1">{stat.value}</div>
                <div className="text-zinc-500 text-xs uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 relative">
            <div className="absolute -top-3 left-8 text-brand-gold text-4xl font-serif">"</div>
            <p className="text-zinc-300 text-lg leading-relaxed italic mt-2">
              CodeHTML delivered our platform in 3 weeks. The performance is exceptional and our customers love the speed. The team understood our market and built something that truly competes with the giants.
            </p>
            <p className="text-brand-gold font-bold mt-4">— Swigato Team</p>
          </div>
        </div>
      </section>

      {/* ─── TECH STACK GRID ─── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-8">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: 'React', role: 'Frontend Framework', icon: Code },
              { name: 'Node.js', role: 'Runtime Environment', icon: Server },
              { name: 'Express', role: 'Backend Framework', icon: Server },
              { name: 'MongoDB', role: 'Database', icon: Server },
              { name: 'Socket.io', role: 'Real-Time Communication', icon: Zap },
              { name: 'AWS', role: 'Cloud Infrastructure', icon: Globe },
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <div className="font-bold text-white">{item.name}</div>
                  <div className="text-zinc-500 text-xs">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section className="py-20 px-6 lg:px-8 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-8">Project Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '[Screenshot: Customer App Home]',
              '[Screenshot: Restaurant Dashboard]',
              '[Screenshot: Order Tracking]',
              '[Screenshot: Admin Panel]',
            ].map((label, idx) => (
              <div key={idx} className="bg-zinc-800 h-48 rounded-xl flex items-center justify-center text-zinc-500 font-medium text-sm">
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-4">Want a Similar Platform?</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            We build custom food delivery, logistics, and marketplace platforms tailored to your business model. From startup MVPs to enterprise-scale systems, we deliver speed, ownership, and results.
          </p>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20a%20food%20delivery%20platform%20like%20Swigato."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
          >
            <span>Discuss Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default CaseStudySwigato;
