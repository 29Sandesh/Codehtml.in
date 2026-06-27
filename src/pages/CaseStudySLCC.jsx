import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Smartphone, Globe, Zap, Clock, Users, Star, CheckCircle, TrendingUp, Code, Server, Shield, Building2 } from 'lucide-react';

const CaseStudySLCC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "SLCC — Construction Portal with 3D Blueprints | CodeHTML Dubai",
    "description": "SLCC is a construction industry portal built by CodeHTML in Dubai. Features 3D blueprint rendering, project management, vendor marketplace. See the case study.",
    "image": "https://codehtml.in/slcc_construction.webp",
    "author": {
      "@type": "Organization",
      "name": "CodeHTML"
    }
  };

  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Case Studies", item: "/case-study/02" },
    { name: "SLCC", item: "/case-study/slcc" }
  ];

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      <SEO
        title="SLCC — Construction Portal with 3D Blueprints | CodeHTML Dubai"
        description="SLCC is a construction industry portal built by CodeHTML in Dubai. Features 3D blueprint rendering, project management, vendor marketplace. See the case study."
        image="https://codehtml.in/slcc_construction.webp"
        schema={schema}
        breadcrumbs={breadcrumbs}
      />

      {/* Decorative blur blobs */}
      <div className="absolute top-20 left-1/3 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-40 right-1/3 w-80 h-80 bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-brand-gold font-bold text-xs tracking-widest px-4 py-2 border border-brand-gold/30 rounded-full uppercase">
              Case Study
            </span>
            <span className="text-zinc-500 text-xs tracking-widest uppercase">Client: SLCC</span>
          </div>

          <h1 className="font-outfit font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-6">
            SLCC — <span className="text-brand-gold">Construction</span> Industry Portal
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
            A B2B construction platform with 3D blueprint visualization, project management, and a vendor marketplace — connecting builders, architects, and suppliers in one unified digital workspace.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Globe className="w-4 h-4 text-brand-gold" />
              <span>Live URL: <span className="text-white font-medium">slcc.in</span></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Platform Type', value: 'B2B Portal', icon: Building2 },
              { label: 'Industry', value: 'Construction', icon: Shield },
              { label: 'Timeline', value: '4 Weeks', icon: Clock },
              { label: 'Feature', value: '3D Blueprints', icon: Zap },
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
            SLCC (Sustainable Living & Construction Council) is a construction industry platform that serves as the digital backbone for a complex ecosystem of builders, architects, vendors, and material suppliers. Operating in a space where project coordination traditionally happens through fragmented emails, phone calls, and physical document exchanges, SLCC envisioned a unified portal that would bring every stakeholder onto a single platform.
          </p>
          <p className="text-zinc-400 text-lg leading-relaxed mt-4">
            They needed a digital portal capable of handling complex project workflows, enabling secure 3D blueprint sharing directly in the browser, managing vendor relationships through a structured marketplace, and providing mobile access for teams working on construction sites. The platform had to be robust enough for enterprise use while remaining intuitive for professionals who may not be technically inclined.
          </p>
        </div>
      </section>

      {/* ─── CHALLENGE ─── */}
      <section className="py-20 px-6 lg:px-8 border-y border-white/5 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-8">The Challenge</h2>
          <div className="space-y-5">
            {[
              'Complex B2B workflows with multiple user roles — builder, architect, vendor, and admin — each with distinct permissions and dashboards.',
              '3D blueprint file sharing and rendering directly in the browser without requiring specialized CAD software or heavy plugins.',
              'Project milestone tracking with Gantt-style timelines, dependency mapping, and automated progress notifications.',
              'Document management with version control for contracts, permits, blueprints, and compliance certificates.',
              'Mobile access for on-site teams working in environments with limited connectivity and varying device capabilities.',
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
            CodeHTML designed and built a comprehensive B2B portal that addresses every layer of the construction workflow. We started with a role-based access architecture that ensures each user type — builder, architect, vendor, or administrator — sees only the tools and data relevant to their responsibilities, while maintaining seamless collaboration across roles.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              { title: 'Role-Based Dashboard', desc: 'Custom React dashboards with tailored views for builders, architects, vendors, and administrators with granular permissions.' },
              { title: '3D Blueprint Viewer', desc: 'In-browser rendering with zoom, pan, rotate, and annotation tools — no external software required.' },
              { title: 'Project Timeline', desc: 'Milestone tracking with dependency chains, automated reminders, and progress visualization.' },
              { title: 'Vendor Marketplace', desc: 'Supplier listings with ratings, reviews, quote requests, and procurement history.' },
              { title: 'Document Repository', desc: 'Version-controlled file storage with audit trails, approval workflows, and secure access logs.' },
              { title: 'Mobile-Ready Field App', desc: 'Lightweight mobile interface for on-site updates, photo uploads, and offline form submission.' },
            ].map((card, idx) => (
              <div key={idx} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <h3 className="font-outfit font-bold text-lg text-white mb-2">{card.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-outfit font-bold text-xl mb-4">Technology Stack</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {['React', 'Node.js', 'Three.js', 'MongoDB', 'Express', 'AWS'].map((tech, idx) => (
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
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
            {[
              { value: '4', label: 'User Roles', icon: Users },
              { value: '3D', label: 'Blueprint Viewer', icon: Zap },
              { value: 'Project', label: 'Tracking', icon: TrendingUp },
              { value: 'Vendor', label: 'Marketplace', icon: Globe },
              { value: 'Mobile', label: 'Ready', icon: Smartphone },
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
              CodeHTML understood our complex B2B requirements and delivered a platform that our entire industry can use. The 3D blueprint viewer alone has transformed how we collaborate with architects and clients. This is not just software — it is infrastructure for our business.
            </p>
            <p className="text-brand-gold font-bold mt-4">— SLCC Team</p>
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
              { name: 'Node.js', role: 'Backend Runtime', icon: Server },
              { name: 'Three.js', role: '3D Rendering', icon: Zap },
              { name: 'MongoDB', role: 'Database', icon: Server },
              { name: 'Express', role: 'API Framework', icon: Server },
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
              '[Screenshot: Dashboard]',
              '[Screenshot: 3D Blueprint Viewer]',
              '[Screenshot: Project Timeline]',
              '[Screenshot: Vendor Marketplace]',
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
          <h2 className="font-outfit font-bold text-3xl md:text-4xl mb-4">Build a B2B Portal?</h2>
          <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            We specialize in complex B2B platforms with multi-role architectures, advanced visualizations, and enterprise-grade security. From construction to logistics to manufacturing, we build portals that become the operating system of your industry.
          </p>
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20a%20B2B%20portal%20like%20SLCC."
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

export default CaseStudySLCC;
