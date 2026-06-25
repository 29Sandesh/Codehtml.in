import React from 'react';
import { Link } from 'react-router-dom';

const GeoSEOBlock = ({ cityName }) => {
  if (!cityName) return null;
  const slug = cityName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const services = [
    { path: `/area/${slug}`, name: `Website Development in ${cityName}` },
    { path: `/whatsapp-bot/${slug}`, name: `WhatsApp Automation in ${cityName}` },
    { path: `/local-seo/${slug}`, name: `Google Maps SEO in ${cityName}` },
  ];

  return (
    <div className="w-full bg-[#070708] border-t border-vintage-gold/10 py-10 px-6 sm:px-12 mt-16 text-left font-body text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div className="max-w-3xl">
          <h2 className="text-xs font-bold text-vintage-gold uppercase tracking-[0.15em] mb-3">Service Coverage // {cityName.toUpperCase()}</h2>
          <p className="text-[11px] sm:text-xs leading-relaxed text-zinc-500 font-medium">
            CodeHTML is the elite digital systems developer engineering custom React portfolios, 24/7 Voiceflow WhatsApp bots, and Map Pack Local SEO campaigns for premium property realtors, brokers, and developers operating across {cityName}. 
            We build sub-second loading websites that reflect true luxury, completely bypassing unoptimized WordPress templates and heavy builders.
          </p>
        </div>
        
        <nav aria-label={`Digital Tech and Leads Services in ${cityName}`} className="flex flex-col gap-2.5 min-w-[240px]">
          <span className="text-[9px] font-bold tracking-[0.2em] text-vintage-gold/60 uppercase">Local Services</span>
          <ul className="flex flex-col gap-2">
            {services.map((service, idx) => (
              <li key={idx}>
                <Link to={service.path} className="text-[11px] font-semibold hover:text-vintage-gold text-zinc-400 transition-colors flex items-center gap-1">
                  ➲ {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default GeoSEOBlock;
