/**
 * prerender-mega-pages.js
 * ============================================================
 * OPERATION TOTAL DOMINATION: High-speed static HTML prerenderer
 * Renders SEO landing pages directly to dist/{slug}/index.html.
 * Can be run with --limit=N to restrict the number of statically prerendered pages.
 * ============================================================
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_COUNTRIES } from '../data/megaCityDatabase.js';
import { ALL_KEYWORDS } from '../data/allKeywordsDatabase.js';
import { selectVariation, generateDynamicFAQs, SERVICE_INTROS, REGIONAL_WHY_CHOOSE, REGIONAL_CTA, getCityTier } from '../data/contentVariations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const DIST_DIR = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('❌ dist/index.html not found! Run: npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Parse arguments
const args = process.argv.slice(2);
let limit = null;
args.forEach(arg => {
  if (arg.startsWith('--limit=')) {
    limit = parseInt(arg.split('=')[1], 10);
  }
});

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
}

// Build page HTML and schema tags
function buildPage(keyword, serviceId, serviceName, city, country) {
  const h1 = `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} in ${city.name}`;
  const title = `${h1} | CodeHTML`;
  const desc = `Top-rated ${keyword} in ${city.name}, ${country.shortName}. CodeHTML delivers premium ${serviceName.toLowerCase()} — custom code, proven results. ${country.currencySymbol} ${country.priceStartup} starting price. Free consultation today.`;
  const slug = `${toSlug(keyword)}-in-${city.slug}`;

  const schemaMarkup = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://codehtml.in/${slug}/#service`,
    "name": h1,
    "description": desc,
    "provider": { "@type": "Organization", "name": "CodeHTML", "url": "https://codehtml.in", "telephone": "+91-93032-28082" },
    "areaServed": { "@type": "City", "name": city.name },
    "serviceType": serviceName,
    "offers": { "@type": "Offer", "price": country.priceStartup, "priceCurrency": country.currencySymbol },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Farhan Alaya" },
        "reviewBody": "CodeHTML built a custom property management web app for alayarealty.in that completely blew our expectations. Our site speed went from 5.4s to 0.7s, and the custom real-time inventory synchronization works flawlessly!",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "itemReviewed": {
          "@type": "Service",
          "@id": `https://codehtml.in/${slug}/#service`,
          "name": h1
        }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sandeep Verma" },
        "reviewBody": "The restaurant delivery portal and booking dashboard CodeHTML built for swigatoindia.in is incredibly fast. Order routing is instant and SEO traffic has grown by 300% since launch.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "itemReviewed": {
          "@type": "Service",
          "@id": `https://codehtml.in/${slug}/#service`,
          "name": h1
        }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rahul Sen" },
        "reviewBody": "We needed a real-time collaborative workspace for our SaaS documentation at thecircle.in. The sub-second markdown editor and syncing engine built by CodeHTML are engineering masterpieces.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "itemReviewed": {
          "@type": "Service",
          "@id": `https://codehtml.in/${slug}/#service`,
          "name": h1
        }
      }
    ]
  });

  const faqs = generateDynamicFAQs(keyword, serviceName, city, country);
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  });

  // Dynamic copy generation using Content Variations
  const introPara = selectVariation(slug, SERVICE_INTROS[serviceId]);
  const whyChoosePara = REGIONAL_WHY_CHOOSE[country.region].join(' ');
  const ctaLine = selectVariation(slug, REGIONAL_CTA[country.region]);
  
  const bullets = ALL_KEYWORDS.services[serviceId]?.bullets || ['Custom-coded React/Next.js — zero templates', 'Sub-1-second load times', 'SEO schema markup included'];
  const color = '#6366f1';
  const icon = '🌐';

  // Glassmorphic AI Summary Box
  const aiSummaryBox = `
  <div style="max-width:900px;margin:0 auto 28px;border:1px solid #2a2a4a;background:rgba(10,10,15,0.4);backdrop-filter:blur(12px);padding:18px;text-align:left;border-radius:8px;box-sizing:border-box;">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;color:#c5a880;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;">
      <span style="font-size:12px;">✦</span> AI Search Summary / TL;DR
    </div>
    <p style="font-size:13px;color:#a0a0b8;line-height:1.6;margin:0;">
      <strong>CodeHTML Overview:</strong> We deliver custom-coded, zero-template <strong style="color:#fff;font-weight:700;">${serviceName.toLowerCase()}</strong> in <strong style="color:#fff;font-weight:700;">${city.name}</strong> featuring sub-second Largest Contentful Paint (LCP) speeds, 100% intellectual property ownership, and zero ongoing builder fees. Professional setups starting from <strong style="color:#c5a880;font-weight:700;">${country.currencySymbol} ${country.priceStartup}</strong> with rapid 7-10 days delivery.
    </p>
  </div>
  `;

  const contentHtml = `<article style="background:#0a0a0f;color:#f1f1f1;font-family:'Inter',sans-serif;padding:0;margin:0;min-height:100vh;"><header style="background:linear-gradient(135deg,#0f0f1a 0%,#1a1a2e 60%,#0f0f1a 100%);padding:80px 20px 60px;text-align:center;border-bottom:1px solid #1e1e3a;"><div style="max-width:900px;margin:0 auto;"><div style="display:inline-block;background:${color}22;border:1px solid ${color}55;color:${color};font-size:11px;font-weight:700;letter-spacing:3px;padding:5px 14px;border-radius:100px;margin-bottom:20px;text-transform:uppercase;">${icon} ${serviceName}</div><h1 style="font-size:clamp(26px,5vw,50px);font-weight:800;line-height:1.15;margin:0 0 18px;color:#fff;">${h1}</h1><p style="font-size:17px;color:#a0a0b8;max-width:680px;margin:0 auto 28px;line-height:1.7;">${desc}</p>${aiSummaryBox}<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;"><a href="https://wa.me/919303228082?text=Hi%20CodeHTML%2C%20I%20need%20${encodeURIComponent(keyword)}%20in%20${encodeURIComponent(city.name)}" style="background:${color};color:#fff;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:700;font-size:14px;">Get Free Quote →</a><a href="/contact" style="background:#1e1e3a;color:#a0a0b8;padding:13px 26px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;border:1px solid #2a2a4a;">Schedule Call</a></div></div></header><section style="max-width:960px;margin:0 auto;padding:50px 20px;"><h2 style="font-size:24px;font-weight:700;margin-bottom:14px;color:#fff;">${serviceName} in ${city.name} — What We Deliver</h2><p style="color:#a0a0b8;font-size:15px;line-height:1.7;margin-bottom:28px;">${introPara} ${whyChoosePara}</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px;">${bullets.map(b => `<div style="background:#0f0f1a;border:1px solid #1e1e3a;border-left:3px solid ${color};padding:14px 18px;border-radius:8px;display:flex;gap:10px;align-items:flex-start;"><span style="color:${color};font-size:16px;">✓</span><span style="color:#d0d0e8;font-size:13px;line-height:1.5;">${b}</span></div>`).join('')}</div></section><section style="background:#0f0f1a;border-top:1px solid #1e1e3a;padding:50px 20px;"><div style="max-width:960px;margin:0 auto;"><h2 style="font-size:24px;font-weight:700;color:#fff;margin-bottom:32px;text-align:center;">${serviceName} Pricing in ${city.name}</h2><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;"><div style="background:#0a0a0f;border:1px solid #1e1e3a;border-radius:10px;padding:22px;"><div style="font-size:10px;font-weight:700;color:#606080;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">STARTUP</div><div style="font-size:26px;font-weight:800;color:#fff;">${country.currencySymbol} ${country.priceStartup}</div><div style="font-size:11px;color:#606080;margin-bottom:14px;">One-time flat rate</div><ul style="list-style:none;padding:0;margin:0;color:#9090a8;font-size:12px;line-height:2.2;"><li>✓ Custom design & development</li><li>✓ 7-10 day delivery</li><li>✓ SEO-ready foundation</li></ul></div><div style="background:linear-gradient(135deg,${color}15,#0a0a0f);border:1px solid ${color}44;border-radius:10px;padding:22px;position:relative;"><div style="position:absolute;top:-8px;right:14px;background:${color};color:#fff;font-size:9px;font-weight:700;padding:3px 8px;border-radius:100px;">POPULAR</div><div style="font-size:10px;font-weight:700;color:${color};letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">GROWTH</div><div style="font-size:26px;font-weight:800;color:#fff;">${country.currencySymbol} ${country.priceGrowth}</div><div style="font-size:11px;color:#606080;margin-bottom:14px;">One-time flat rate</div><ul style="list-style:none;padding:0;margin:0;color:#9090a8;font-size:12px;line-height:2.2;"><li>✓ Advanced architecture</li><li>✓ Payment integration</li><li>✓ 15-25 day delivery</li></ul></div><div style="background:#0a0a0f;border:1px solid #1e1e3a;border-radius:10px;padding:22px;"><div style="font-size:10px;font-weight:700;color:#606080;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">ENTERPRISE</div><div style="font-size:26px;font-weight:800;color:#fff;">${country.currencySymbol} ${country.priceEnterprise}</div><div style="font-size:11px;color:#606080;margin-bottom:14px;">Custom quote</div><ul style="list-style:none;padding:0;margin:0;color:#9090a8;font-size:12px;line-height:2.2;"><li>✓ Dedicated team</li><li>✓ Private server config</li><li>✓ Priority support</li></ul></div></div></div></section><section style="background:linear-gradient(135deg,${color}20 0%,#0a0a0f 100%);border-top:1px solid ${color}33;padding:70px 20px;text-align:center;"><div style="max-width:640px;margin:0 auto;"><h2 style="font-size:30px;font-weight:800;color:#fff;margin-bottom:14px;">Start Your Project in ${city.name} Today</h2><p style="color:#a0a0b8;font-size:15px;line-height:1.7;margin-bottom:28px;">${ctaLine}</p><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;"><a href="https://wa.me/919303228082" style="background:${color};color:#fff;padding:14px 30px;border-radius:10px;text-decoration:none;font-weight:800;font-size:15px;">WhatsApp Now →</a><a href="mailto:contact@codehtml.in" style="background:#1e1e3a;color:#a0a0b8;padding:14px 30px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;border:1px solid #2a2a4a;">Email Us</a></div></div></section></article>`;

  const schemaHtml = `<script type="application/ld+json">${schemaMarkup}</script><script type="application/ld+json">${faqSchema}</script>`;

  return { contentHtml, schemaHtml, title, desc, h1 };
}

function renderPage(urlPath, pageData) {
  let html = template;
  const { contentHtml, schemaHtml, title, desc, h1 } = pageData;
  const canonicalUrl = `https://codehtml.in${urlPath}`;

  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:title" content="${title}" />`);
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${desc}" />`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${desc}" />`);
  if (html.match(/<link\s+rel="canonical"/i)) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);

  html = html.replace('</head>', `${schemaHtml}\n</head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${contentHtml}</div>`);

  const fullDirPath = path.join(DIST_DIR, urlPath);
  fs.mkdirSync(fullDirPath, { recursive: true });
  fs.writeFileSync(path.join(fullDirPath, 'index.html'), html, 'utf8');
}

async function runPrerender() {
  console.log(`🚀 STARTING LIGHTNING PRERENDERER v2 (In-Memory)...`);
  if (limit) {
    console.log(`⚠️ Prerender limit enabled: Rendering top ${limit.toLocaleString()} pages only.`);
  }

  const slicedCountries = {
    uae: { ...ALL_COUNTRIES.uae, cities: ALL_COUNTRIES.uae.cities },
    singapore: { ...ALL_COUNTRIES.singapore, cities: ALL_COUNTRIES.singapore.cities },
    india: { ...ALL_COUNTRIES.india, cities: ALL_COUNTRIES.india.cities.slice(0, 4500) },
    uk: { ...ALL_COUNTRIES.uk, cities: ALL_COUNTRIES.uk.cities.slice(0, 1200) },
    usa: { ...ALL_COUNTRIES.usa, cities: ALL_COUNTRIES.usa.cities.slice(0, 2200) }
  };

  let totalRendered = 0;
  const startTime = Date.now();
  const seenSlugs = new Set();

  const TIERS = ['tier1', 'tier2', 'tier3', 'competitorGap', 'aeo'];

  // Helper to log progress
  const logProgress = () => {
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    const rate = Math.round(totalRendered / parseFloat(elapsed) || 0);
    console.log(`  ✅ Prerendered ${totalRendered.toLocaleString()} pages (${rate}/sec)...`);
  };

  // 1. Service × City Pages
  outerLoop1:
  for (const [countryKey, country] of Object.entries(slicedCountries)) {
    for (const city of country.cities) {
      for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
        for (const tierName of TIERS) {
          const keywords = service[tierName] || [];
          for (const keyword of keywords) {
            if (limit && totalRendered >= limit) {
              break outerLoop1;
            }

            const slug = `${toSlug(keyword)}-in-${city.slug}`;
            if (seenSlugs.has(slug)) continue;
            seenSlugs.add(slug);

            const serviceName = service.name;
            const pageData = buildPage(keyword, serviceId, serviceName, city, country);

            try {
              renderPage(`/${slug}`, pageData);
              totalRendered++;
            } catch (err) {
              // Skip
            }

            if (totalRendered % 10000 === 0) {
              logProgress();
            }
          }
        }
      }
    }
  }

  // 2. Industry × City Pages
  const industries = ['fintech', 'real-estate', 'healthtech', 'edtech', 'ecommerce', 'hospitality'];
  const industryCityCount = {
    uae: slicedCountries.uae.cities,
    singapore: slicedCountries.singapore.cities,
    india: slicedCountries.india.cities.slice(0, 300),
    uk: slicedCountries.uk.cities.slice(0, 150),
    usa: slicedCountries.usa.cities.slice(0, 200)
  };

  outerLoop2:
  for (const [countryKey, cities] of Object.entries(industryCityCount)) {
    const country = ALL_COUNTRIES[countryKey];
    for (const city of cities) {
      for (const ind of industries) {
        for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
          if (limit && totalRendered >= limit) {
            break outerLoop2;
          }

          const keyword = `${service.name.toLowerCase()} for ${ind}`;
          const slug = `${toSlug(keyword)}-in-${city.slug}`;
          if (seenSlugs.has(slug)) continue;
          seenSlugs.add(slug);

          const serviceName = service.name;
          const pageData = buildPage(keyword, serviceId, serviceName, city, country);

          try {
            renderPage(`/${slug}`, pageData);
            totalRendered++;
          } catch (err) {
            // Skip
          }

          if (totalRendered % 10000 === 0) {
            logProgress();
          }
        }
      }
    }
  }

  // 3. Tech Stack × City Pages
  const techStackCities = [
    ...slicedCountries.uae.cities.slice(0, 50),
    ...slicedCountries.singapore.cities.slice(0, 50),
    ...slicedCountries.india.cities.slice(0, 100),
    ...slicedCountries.uk.cities.slice(0, 50),
    ...slicedCountries.usa.cities.slice(0, 50)
  ];

  outerLoop3:
  for (const city of techStackCities) {
    const countryKey = city.state ? (slicedCountries.india.cities.some(c => c.slug === city.slug) ? 'india' : 'usa') : (city.area ? 'uae' : 'singapore');
    const country = slicedCountries[countryKey] || slicedCountries.india;

    for (const techKw of ALL_KEYWORDS.techStack) {
      if (limit && totalRendered >= limit) {
        break outerLoop3;
      }

      const slug = `${toSlug(techKw)}-in-${city.slug}`;
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const serviceId = techKw.includes('native') || techKw.includes('flutter') ? 'mobile-app-development' : 'website-development';
      const service = ALL_KEYWORDS.services[serviceId];
      const serviceName = service ? service.name : 'Web Development';
      const pageData = buildPage(techKw, serviceId, serviceName, city, country);

      try {
        renderPage(`/${slug}`, pageData);
        totalRendered++;
      } catch (err) {
        // Skip
      }

      if (totalRendered % 10000 === 0) {
        logProgress();
      }
    }
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n🎯 PRERENDER COMPLETE! ${totalRendered.toLocaleString()} pages prerendered in ${totalTime}s`);
}

runPrerender().catch(console.error);
