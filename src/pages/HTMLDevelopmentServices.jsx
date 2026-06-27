import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { Globe, Code, ArrowRight, CheckCircle, Star, Users, Zap, Award, TrendingUp, Phone, Mail, MapPin, FileCode, Layers, Shield, Monitor, Palette, Download, Mail as MailIcon } from 'lucide-react';

const HTMLDevelopmentServices = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "HTML Development Services",
    "provider": {
      "@type": "Organization",
      "name": "CodeHTML"
    },
    "description": "Professional HTML development services including PSD to HTML conversion, responsive email templates, and semantic markup.",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "priceRange": "$"
  };

  const faqList = [
    {
      q: "Do you convert Figma to HTML?",
      a: "Yes, we work with Figma, Adobe XD, Photoshop, and Sketch files. Our process includes asset extraction, semantic HTML5 markup, and pixel-perfect CSS implementation that matches your design down to the last pixel."
    },
    {
      q: "Are your email templates responsive?",
      a: "Yes, we test on Gmail, Outlook, Apple Mail, and mobile clients. Our email templates are built with table-based structures for maximum compatibility and inline CSS to ensure consistent rendering across all major email clients."
    },
    {
      q: "Do you follow accessibility standards?",
      a: "Yes, all markup meets WCAG 2.1 AA guidelines. We use semantic HTML elements, proper ARIA labels, keyboard navigation support, and color contrast ratios that comply with international accessibility standards."
    },
    {
      q: "Can you integrate with React/Next.js?",
      a: "Yes, we build component-based HTML ready for React integration. Our markup is modular, class-based, and structured to be dropped into JSX components with minimal refactoring required."
    },
    {
      q: "What is the revision policy?",
      a: "2 revision rounds are included in all packages. We deliver the initial HTML, you provide feedback, and we refine. Additional revisions are available at a flat hourly rate if needed."
    },
    {
      q: "Do you offer rush delivery?",
      a: "Yes, 24-hour delivery is available for single-page projects at a 50% surcharge. Rush delivery includes the same quality assurance and cross-browser testing as our standard timeline."
    }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-brand-gold/30">
      <SEO 
        title="HTML Development Services India | PSD to HTML, Email Templates"
        description="Professional HTML development services: PSD to HTML conversion, responsive email templates, HTML5 animations, semantic markup. 99+ Lighthouse scores. Start at $200. CodeHTML Dubai."
        schema={serviceSchema}
        faqList={faqList}
      />

      {/* Decorative Blur Ambient Blobs */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 font-semibold text-xs tracking-widest uppercase mb-8">
            <Code size={14} className="text-brand-gold" />
            <span>Professional Services</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-outfit font-black mb-8 leading-tight tracking-tight">
            HTML Development{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">
              Services
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Pixel-perfect HTML coding from design to deployment. PSD to HTML, email templates, HTML5 animations, and semantic markup that powers high-performing websites.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">99+</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Lighthouse</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">100%</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Hand-Coded</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">All</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Cross-Browser</div>
            </div>
            <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 text-center">
              <div className="text-3xl font-outfit font-black text-brand-gold mb-1">AA</div>
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">WCAG Compliant</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-4 text-white text-center">What We Offer</h2>
          <p className="text-zinc-400 text-center max-w-2xl mx-auto mb-12">
            From design files to production-ready HTML. We handle the complexity so your development team can focus on logic.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Palette className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">PSD to HTML Conversion</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Figma, Photoshop, and Sketch files converted to clean, semantic HTML5 and CSS3. We match your design pixel-for-pixel with optimized assets and responsive breakpoints.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <MailIcon className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Responsive Email Templates</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Outlook-compatible, mobile-optimized email templates built with table-based structures and inline CSS. Tested on Gmail, Apple Mail, Yahoo, and Outlook desktop.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <Zap className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">HTML5 Animation & Micro-interactions</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                CSS transitions, SVG animations, and Lottie integrations that bring your interfaces to life without sacrificing performance or battery life on mobile devices.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all md:col-span-2 lg:col-span-2">
              <Shield className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">Semantic HTML & Accessibility</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                WCAG 2.1 AA compliant markup with proper heading hierarchies, ARIA labels, keyboard navigation, and screen reader support. Accessibility is not an afterthought — it is built into every component from the first line of code. This ensures your product is usable by everyone and protects your brand from legal risk in regulated markets.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 hover:border-brand-gold/20 transition-all">
              <FileCode className="text-brand-gold mb-4" size={32} />
              <h3 className="text-xl font-outfit font-bold mb-2 text-white">HTML for React/Next.js</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Component-based architecture ready for React integration. Modular markup, CSS modules, and BEM naming that slots directly into your JSX workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our HTML Development Process */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Our HTML Development Process</h2>
          <div className="space-y-6">
            {[
              {
                step: "1",
                title: "Design Review & Asset Extraction",
                desc: "We analyze your design files, extract optimized assets, and identify component boundaries before writing a single line of code."
              },
              {
                step: "2",
                title: "Semantic HTML Structure Planning",
                desc: "We map out the document hierarchy, heading structure, and ARIA roles to ensure SEO-friendly and screen-reader accessible markup."
              },
              {
                step: "3",
                title: "CSS Architecture (BEM methodology)",
                desc: "Modular, maintainable CSS using BEM naming conventions. Scalable styles that won't break when your team adds new components."
              },
              {
                step: "4",
                title: "Cross-Browser Testing (Chrome, Safari, Firefox, Edge)",
                desc: "Rigorous testing across all major browsers and versions to ensure consistent rendering and behavior on every platform."
              },
              {
                step: "5",
                title: "Performance Optimization (Lighthouse 99+)",
                desc: "Asset compression, critical CSS inlining, and lazy loading to achieve perfect Lighthouse scores on every delivery."
              },
              {
                step: "6",
                title: "Accessibility Audit (screen readers, keyboard nav)",
                desc: "Full WCAG 2.1 AA audit with screen reader testing, keyboard navigation verification, and color contrast validation."
              },
              {
                step: "7",
                title: "Delivery & Documentation",
                desc: "Clean, organized file structure with component documentation, usage guidelines, and a handoff session for your development team."
              }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4 bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <div className="w-10 h-10 bg-brand-gold/10 rounded-full flex items-center justify-center shrink-0">
                  <CheckCircle className="text-brand-gold" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-outfit font-bold text-white mb-1">
                    <span className="text-brand-gold mr-2">{item.step}.</span>
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HTML Development Pricing */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">HTML Development Pricing</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900 border-b border-white/10">
                  <th className="py-4 px-6 text-sm font-outfit font-bold text-brand-gold uppercase tracking-wider">Service</th>
                  <th className="py-4 px-6 text-sm font-outfit font-bold text-brand-gold uppercase tracking-wider">Price</th>
                  <th className="py-4 px-6 text-sm font-outfit font-bold text-brand-gold uppercase tracking-wider">Timeline</th>
                </tr>
              </thead>
              <tbody className="text-zinc-300">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold">Single Page PSD to HTML</td>
                  <td className="py-4 px-6 text-brand-gold font-bold">$200</td>
                  <td className="py-4 px-6 text-zinc-400">3 days</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold">5-Page Website HTML</td>
                  <td className="py-4 px-6 text-brand-gold font-bold">$500</td>
                  <td className="py-4 px-6 text-zinc-400">7 days</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold">Email Template (3 variants)</td>
                  <td className="py-4 px-6 text-brand-gold font-bold">$150</td>
                  <td className="py-4 px-6 text-zinc-400">2 days</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold">HTML Component Library</td>
                  <td className="py-4 px-6 text-brand-gold font-bold">$1,000</td>
                  <td className="py-4 px-6 text-zinc-400">14 days</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-6 font-semibold">Full HTML/CSS Audit</td>
                  <td className="py-4 px-6 text-brand-gold font-bold">$300</td>
                  <td className="py-4 px-6 text-zinc-400">2 days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-500 mt-4 text-center">All prices include 2 revision rounds.</p>
        </div>
      </section>

      {/* Technologies We Use */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "HTML5", "CSS3", "Sass", "Tailwind CSS", "BEM",
              "Bootstrap", "MJML", "SVG", "Lottie", "ARIA"
            ].map((tech) => (
              <div key={tech} className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 text-center hover:border-brand-gold/20 transition-all">
                <div className="text-sm font-outfit font-bold text-white">{tech}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hand-Coded HTML Matters */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Why Hand-Coded HTML Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-outfit font-bold text-white mb-3">Performance</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Hand-coded HTML is 10x faster than bloated page builders. Wix and WordPress page builders inject hundreds of unnecessary divs, inline scripts, and third-party dependencies that crush your load times. Our custom HTML is lean, purpose-built, and optimized for Core Web Vitals from the ground up.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-outfit font-bold text-white mb-3">SEO</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Clean semantic markup ranks better than div soup. Search engines understand heading hierarchies, structured data, and semantic elements like article, section, and nav. Page builders output generic containers that confuse crawlers and dilute your topical authority.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-outfit font-bold text-white mb-3">Maintainability</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Structured code is easier to update and extend. Our BEM methodology and component-based architecture mean your internal team can modify styles, add new sections, and refactor layouts without breaking existing functionality. No digging through generated code or fighting with drag-and-drop limitations.
              </p>
            </div>
            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
              <h3 className="text-lg font-outfit font-bold text-white mb-3">Ownership</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                You own the code, not locked into a platform. When you build on Wix, Squarespace, or WordPress page builders, your site is trapped in their ecosystem. With hand-coded HTML, you own every asset. Host it anywhere, modify it freely, and never pay a platform subscription fee again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HTML Portfolio */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">HTML Portfolio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-zinc-800 h-48 rounded-xl flex items-center justify-center text-zinc-500 mb-4">
              <span className="font-outfit font-bold text-sm">[Email Template Design]</span>
            </div>
            <div className="bg-zinc-800 h-48 rounded-xl flex items-center justify-center text-zinc-500 mb-4">
              <span className="font-outfit font-bold text-sm">[Landing Page HTML]</span>
            </div>
            <div className="bg-zinc-800 h-48 rounded-xl flex items-center justify-center text-zinc-500 mb-4">
              <span className="font-outfit font-bold text-sm">[Component Library]</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-2">
            <div className="text-center">
              <h3 className="text-lg font-outfit font-bold text-white mb-1">Responsive Email for E-commerce</h3>
              <p className="text-sm text-zinc-400">Multi-client compatible email template with product grids and CTA blocks.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-outfit font-bold text-white mb-1">High-Converting Landing Page</h3>
              <p className="text-sm text-zinc-400">Animated landing page with scroll-triggered micro-interactions and form validation.</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-outfit font-bold text-white mb-1">SaaS Component Library</h3>
              <p className="text-sm text-zinc-400">Reusable HTML/CSS components for a SaaS platform design system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-12 text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqList.map((item, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="text-lg font-outfit font-bold text-white mb-2">Q: {item.q}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-8 border-t border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold mb-6 text-white">Need HTML Development?</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Get pixel-perfect HTML from your designs. Starting at $200 with 2 revision rounds included.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a 
              href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20need%20professional%20HTML%20development%20services.%20Can%20we%20discuss%20my%20project%20requirements?"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-gold text-black px-6 py-3 rounded-xl font-bold hover:bg-white transition-colors"
            >
              <Phone size={18} /> Start on WhatsApp
            </a>
            <a 
              href="mailto:Contact@Codehtml.in?subject=HTML%20Development%20Inquiry"
              className="inline-flex items-center gap-2 bg-zinc-900 border border-white/10 text-white px-6 py-3 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
            >
              <Mail size={18} /> Email Us
            </a>
          </div>
          <p className="text-zinc-500 text-sm">
            Typical response time: under 2 hours during business hours (Sun–Thu, 9 AM – 6 PM GST).
          </p>
        </div>
      </section>
    </div>
  );
};

export default HTMLDevelopmentServices;
