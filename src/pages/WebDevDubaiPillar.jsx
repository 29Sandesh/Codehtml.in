import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Code, Server, Smartphone, Globe, Shield, ArrowRight } from 'lucide-react';

const WebDevDubaiPillar = () => {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title="Web Development Dubai: The Ultimate Guide 2025 | CodeHTML"
        description="Everything you need to know about custom web development in Dubai. From React/Next.js stacks to e-commerce, SEO, and choosing the right agency."
      />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <Globe size={14} className="text-brand-gold" />
            <span>Comprehensive Guide</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-outfit font-black mb-8 leading-tight tracking-tight">
            Web Development in Dubai: <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">The Ultimate Guide</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Dubai is a global tech hub demanding high-performance digital solutions. Learn why custom React/Next.js stacks are replacing WordPress, and how to scale your B2B brand in the UAE.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-16">
          
          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-outfit font-bold text-white mb-6">1. The State of Web Development in Dubai</h2>
            <p className="text-zinc-400">
              Dubai's hyper-competitive market means that off-the-shelf templates no longer cut it. With the rise of AI and strict Core Web Vitals algorithms, local businesses are pivoting from legacy CMS platforms to headless architectures.
            </p>
            <p className="text-zinc-400">
              Whether you are an established real estate firm in Business Bay or a healthcare clinic in Jumeirah, your website is your primary digital asset. Slow load times actively bleed revenue.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Code className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Frontend</h3>
              <p className="text-sm text-zinc-500">React, Next.js, and Tailwind CSS dominate the modern stack for instant loading and SEO.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Server className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Backend</h3>
              <p className="text-sm text-zinc-500">Node.js, edge computing, and serverless architectures provide infinite scalability.</p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <Shield className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-sm text-zinc-500">Static site generation eliminates database vulnerabilities commonly found in WordPress.</p>
            </div>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <h2 className="text-3xl font-outfit font-bold text-white mb-6">2. Why WordPress is Dying in 2025</h2>
            <p className="text-zinc-400">
              For years, agencies sold bloated WordPress sites with dozens of plugins. Today, these sites fail Google's Core Web Vitals, resulting in catastrophic drops in organic traffic. CodeHTML engineers <Link to="/wordpress-vs-custom-website" className="text-brand-gold hover:underline">custom React websites</Link> that score 100/100 on Lighthouse, guaranteeing superior SEO and conversion rates.
            </p>
          </div>

          <div className="bg-brand-gold/5 border border-brand-gold/20 p-8 rounded-2xl">
            <h2 className="text-2xl font-outfit font-bold text-white mb-4">Ready to build your digital presence?</h2>
            <p className="text-zinc-400 mb-8">
              Partner with CodeHTML, Dubai's premier custom web development agency. We build high-performance assets that dominate search rankings.
            </p>
            <a 
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              Get a Quote <ArrowRight size={18} />
            </a>
          </div>

        </div>
      </section>
    </div>
  );
};

export default WebDevDubaiPillar;
