import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_COUNTRIES } from './data/megaCityDatabase.js';
import { ALL_KEYWORDS } from './data/allKeywordsDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'https://codehtml.in';
const lastModified = new Date().toISOString().slice(0, 10);

const PUBLIC_DIR = path.resolve(__dirname, 'public');
const DIST_DIR = path.resolve(__dirname, 'dist');

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
}

function buildSitemapXml(urls) {
  const items = urls.map(url => `  <url>
    <loc>${DOMAIN}/${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
    <lastmod>${lastModified}</lastmod>
  </url>`).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</urlset>`;
}

function buildSitemapIndex(sitemaps) {
  const items = sitemaps.map(file => `  <sitemap>
    <loc>${DOMAIN}/${file}</loc>
    <lastmod>${lastModified}</lastmod>
  </sitemap>`).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items}
</sitemapindex>`;
}

async function run() {
  console.log('🚀 Starting massive in-memory sitemap generation for 5.4M pages...');
  
  const slicedCountries = {
    uae: { ...ALL_COUNTRIES.uae, cities: ALL_COUNTRIES.uae.cities },
    singapore: { ...ALL_COUNTRIES.singapore, cities: ALL_COUNTRIES.singapore.cities },
    india: { ...ALL_COUNTRIES.india, cities: ALL_COUNTRIES.india.cities.slice(0, 4500) },
    uk: { ...ALL_COUNTRIES.uk, cities: ALL_COUNTRIES.uk.cities.slice(0, 1200) },
    usa: { ...ALL_COUNTRIES.usa, cities: ALL_COUNTRIES.usa.cities.slice(0, 2200) }
  };

  const seenSlugs = new Set();
  const megaSitemapFiles = [];
  let currentUrls = [];
  let sitemapIndex = 0;

  const TIERS = ['tier1', 'tier2', 'tier3', 'competitorGap', 'aeo'];

  function writeSitemapBatch() {
    if (currentUrls.length === 0) return;
    const fileName = `sitemap-mega-${sitemapIndex}.xml`;
    const filePath = path.join(PUBLIC_DIR, fileName);
    
    console.log(`Writing ${fileName} with ${currentUrls.length.toLocaleString()} URLs...`);
    fs.writeFileSync(filePath, buildSitemapXml(currentUrls), 'utf8');
    if (fs.existsSync(DIST_DIR)) {
      fs.writeFileSync(path.join(DIST_DIR, fileName), buildSitemapXml(currentUrls), 'utf8');
    }
    megaSitemapFiles.push(fileName);
    sitemapIndex++;
    currentUrls = []; // Clear memory
  }

  // 1. Service × City Pages
  for (const [countryKey, country] of Object.entries(slicedCountries)) {
    for (const city of country.cities) {
      for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
        for (const tierName of TIERS) {
          const keywords = service[tierName] || [];
          for (const keyword of keywords) {
            const slug = `${toSlug(keyword)}-in-${city.slug}`;
            if (seenSlugs.has(slug)) continue;
            seenSlugs.add(slug);

            currentUrls.push(slug);
            if (currentUrls.length >= 50000) {
              writeSitemapBatch();
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

  for (const [countryKey, cities] of Object.entries(industryCityCount)) {
    for (const city of cities) {
      for (const ind of industries) {
        for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
          const keyword = `${service.name.toLowerCase()} for ${ind}`;
          const slug = `${toSlug(keyword)}-in-${city.slug}`;
          if (seenSlugs.has(slug)) continue;
          seenSlugs.add(slug);

          currentUrls.push(slug);
          if (currentUrls.length >= 50000) {
            writeSitemapBatch();
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

  for (const city of techStackCities) {
    for (const techKw of ALL_KEYWORDS.techStack) {
      const slug = `${toSlug(techKw)}-in-${city.slug}`;
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      currentUrls.push(slug);
      if (currentUrls.length >= 50000) {
        writeSitemapBatch();
      }
    }
  }

  // Write remaining URLs
  writeSitemapBatch();

  console.log(`\n✅ Generated ${megaSitemapFiles.length} mega sitemaps.`);
  
  // Update/Generate the master sitemap index containing static sitemaps + mega sitemaps
  const baseSitemaps = [
    'sitemap-static.xml',
    'sitemap-cities.xml',
    'sitemap-blog.xml',
    'sitemap-growth.xml',
    'sitemap-niche.xml'
  ];
  
  const allSitemaps = [...baseSitemaps, ...megaSitemapFiles];
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(indexPath, buildSitemapIndex(allSitemaps), 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), buildSitemapIndex(allSitemaps), 'utf8');
  }
  console.log(`✓ Master sitemap index updated at public/sitemap.xml and dist/sitemap.xml referencing ${allSitemaps.length} sitemaps.`);
  
  console.log('🏁 Sitemap generation complete!');
}

run().catch(console.error);
