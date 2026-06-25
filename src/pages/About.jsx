import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Eye, Rocket, Code2 } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Lead Architect',
      role: 'FULL-STACK ENGINEER',
      detail: '10+ years of engineering high-performance React web apps and multi-tenant backends.',
    },
    {
      name: 'Creative Director',
      role: 'UI/UX STRATEGIST',
      detail: 'Focused on designing premium, custom digital interfaces with glassmorphic visual aesthetics.',
    },
    {
      name: 'Mobile/SaaS Engineer',
      role: 'APP & DATA SYSTEMS ENGINEER',
      detail: 'Specialized in React Native iOS/Android builds, cloud infrastructure, and custom tools.',
    },
  ];

  return (
    <main className="pt-24 md:pt-32 pb-16 bg-black min-h-screen text-white relative">
      <SEO 
        title="Company | Premium Custom Software & Web Studio" 
        description="Learn about CodeHTML, a premium custom software studio. We engineer high-performance websites, web apps, SaaS platforms, mobile apps, and custom enterprise tools."
        keywords="about codehtml, custom software development, react developers, mobile app development, saas studio, custom B2B tools"
      />

      {/* Decorative Blur Ambient Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vintage-gold/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Mega Header Section */}
      <section className="px-6 md:px-12 mb-20 relative z-10 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col justify-center text-left">
            <span className="font-body font-bold text-vintage-gold text-xs tracking-[0.3em] uppercase mb-4 block">OUR STORY</span>
            <h1 className="font-headline font-extrabold tracking-tight text-4xl sm:text-5xl md:text-7xl leading-[1.05] mb-6 text-white uppercase">
              Dream Big. <br /> Code <span className="font-elegant italic font-light text-vintage-gold">Gold.</span>
            </h1>
            <p className="font-body text-sm md:text-lg max-w-2xl leading-relaxed text-zinc-400 font-medium border-l border-vintage-gold pl-4 md:pl-6 mb-12">
              We build custom websites, client portals, online stores, mobile apps, and business software from scratch. We do not use ready-made templates, ensuring complete speed, security, and ownership.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                <h3 className="font-headline font-bold text-lg text-vintage-gold mb-3 uppercase tracking-tight">Our Story</h3>
                <p className="font-body text-xs text-zinc-400 leading-relaxed font-medium">
                  CodeHTML was founded to solve a common problem: businesses losing customers and sales due to slow, generic templates. We fix this by coding clean, fast-loading business websites and software tools.
                </p>
              </div>

              <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Rocket className="w-4 h-4 text-vintage-gold" aria-hidden="true" />
                  <h3 className="font-headline font-bold text-lg text-white uppercase tracking-tight">Our Mission</h3>
                </div>
                <p className="font-body text-xs text-zinc-400 leading-relaxed font-medium">
                  To provide business owners and growing companies with high-performance websites and custom mobile apps, with 100% ownership and zero monthly fees.
                </p>
              </div>

              <div className="bg-vintage-gold text-black p-6 rounded-2xl shadow-lg shadow-vintage-gold/5 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="w-4 h-4 text-black" aria-hidden="true" />
                  <h3 className="font-headline font-bold text-lg text-black uppercase tracking-tight">Our Vision</h3>
                </div>
                <p className="font-body text-xs text-black/85 leading-relaxed font-semibold">
                  To be a leading custom website design and mobile app development agency globally, serving as the trusted partner for business solutions.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <div className="relative group overflow-hidden border border-white/5 rounded-2xl h-full opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                className="w-full h-full object-cover transition-all duration-700 min-h-[400px]"
                src="/slcc_construction.webp"
                alt="SLCC Construction custom portal blueprint model developed by CodeHTML"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          </div>
        </div>
      </section>



      {/* Team Members */}
      <section className="px-6 md:px-12 mb-20 relative z-10 max-w-[1600px] mx-auto">
        <div className="text-left mb-12">
          <span className="font-body font-bold text-vintage-gold text-xs tracking-wider uppercase mb-2 block">COLLABORATION</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-white uppercase">
            Our Key Engineers
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="bg-zinc-950/40 backdrop-blur-md border border-white/5 p-6 rounded-2xl hover:border-vintage-gold/25 transition-all text-left"
            >
              <span className="font-body font-bold text-zinc-600 text-[10px] mb-4 block uppercase tracking-wider">
                MEMBER 0{idx + 1}
              </span>
              <h3 className="font-headline font-bold text-xl text-white mb-1 group-hover:text-vintage-gold transition-colors">
                {member.name}
              </h3>
              <p className="font-body font-bold text-vintage-gold text-[10px] tracking-wider mb-4 uppercase">
                {member.role}
              </p>
              <p className="font-body text-sm text-zinc-400 font-medium leading-relaxed">
                {member.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 md:px-12 mb-20 relative z-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <span className="font-body font-bold text-vintage-gold text-xs tracking-wider uppercase mb-2 block">ADVANTAGE</span>
          <h2 className="font-headline font-extrabold text-3xl md:text-5xl text-white mb-8 leading-none uppercase">
            Why We <br /> <span className="font-elegant italic font-light text-vintage-gold">Dominate.</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                t: 'Purist React & Vite Performance',
                d: 'We build exclusively using custom React.js, Vite, and tailwind. No slow WordPress databases, ready-made drag-and-drop themes, or bloated plugins.',
              },
              {
                t: 'Offline-First Mobile Apps & SaaS',
                d: 'Our team develops secure cross-platform mobile apps using React Native, and multi-tenant SaaS dashboards hosted on cloud CDNs.',
              },
              {
                t: 'Clean Code & 100% IP Ownership',
                d: 'You receive complete ownership of the source files. No licensing locks, zero recurring developer fees, and full control over your intellectual property.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start border-l border-vintage-gold pl-5 py-1"
              >
                <div>
                  <h4 className="font-headline font-bold text-lg text-white mb-1 uppercase tracking-tight">
                    {item.t}
                  </h4>
                  <p className="font-body text-xs md:text-sm text-zinc-400 font-medium leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-zinc-950 border border-white/5 p-4 rounded-2xl hidden lg:block shadow-lg">
          <img
            src="/dubai_business_bay.webp"
            alt="CodeHTML office skyline in Business Bay Dubai"
            className="w-full h-[360px] object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-500"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 md:px-12 text-center relative z-10 max-w-4xl mx-auto">
        <h2 className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-8 uppercase leading-tight">
          Ready to <span className="font-elegant italic font-light text-vintage-gold">Build?</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/919303228082?text=Hi%20CodeHTML,%20I%20am%20interested%20in%20your%20development%20services.%20I'd%20like%20to%20get%20started%20on%20discussing%20our%20custom%20project%20requirements."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold-solid inline-flex mx-auto animate-pulse"
          >
            HIRE OUR STUDIO ➲
          </a>
        </div>
      </section>
    </main>
  );
};

export default About;
