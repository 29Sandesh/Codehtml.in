/**
 * generate-mega-pages.js
 * ============================================================
 * OPERATION TOTAL DOMINATION: 5,000,000+ page metadata generator
 * Generates compact JSON chunks storing page metadata for all combinations of
 * 8,300+ cities × 680+ keywords across 7 services + universal/cross-country pages.
 * ============================================================
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_COUNTRIES } from '../data/megaCityDatabase.js';
import { ALL_KEYWORDS } from '../data/allKeywordsDatabase.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const DATA_DIR = path.join(ROOT, 'public', 'data');
const CHUNKS_DIR = path.join(DATA_DIR, 'mega-chunks');

function toSlug(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-').replace(/^-+|-+$/g, '');
}

async function generateMegaPages() {
  console.log('🚀 STARTING 5,000,000+ PAGE METADATA GENERATION...\n');
  
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(CHUNKS_DIR, { recursive: true });
  
  // Clean up any old chunks
  const oldFiles = fs.readdirSync(CHUNKS_DIR);
  oldFiles.forEach(file => {
    if (file.startsWith('mega-pages-') && file.endsWith('.json')) {
      fs.unlinkSync(path.join(CHUNKS_DIR, file));
    }
  });

  // Target city slicing
  const slicedCountries = {
    uae: { ...ALL_COUNTRIES.uae, cities: ALL_COUNTRIES.uae.cities }, // all 259
    singapore: { ...ALL_COUNTRIES.singapore, cities: ALL_COUNTRIES.singapore.cities }, // all 209
    india: { ...ALL_COUNTRIES.india, cities: ALL_COUNTRIES.india.cities.slice(0, 4500) }, // slice to 4,500
    uk: { ...ALL_COUNTRIES.uk, cities: ALL_COUNTRIES.uk.cities.slice(0, 1200) }, // slice to 1,200
    usa: { ...ALL_COUNTRIES.usa, cities: ALL_COUNTRIES.usa.cities.slice(0, 2200) } // slice to 2,200
  };

  let totalCities = 0;
  for (const [key, country] of Object.entries(slicedCountries)) {
    totalCities += country.cities.length;
    console.log(`  - ${country.name}: Sliced to ${country.cities.length} cities`);
  }
  console.log(`\n📊 Total sliced cities for page generation: ${totalCities}`);

  let totalCount = 0;
  let chunkIndex = 0;
  const CHUNK_SIZE = 5000;
  const chunkFiles = [];
  const seenSlugs = new Set();
  let skipped = 0;

  let currentChunk = [];

  function flushChunk(force = false) {
    if (currentChunk.length >= CHUNK_SIZE || (force && currentChunk.length > 0)) {
      const fname = `mega-pages-${chunkIndex}.json`;
      fs.writeFileSync(path.join(CHUNKS_DIR, fname), JSON.stringify(currentChunk), 'utf8');
      chunkFiles.push(`mega-chunks/${fname}`);
      totalCount += currentChunk.length;
      if (chunkIndex % 100 === 0 || force) {
        console.log(`  ✓ Written chunk ${chunkIndex}: ${totalCount.toLocaleString()} pages compiled...`);
      }
      chunkIndex++;
      currentChunk = [];
    }
  }

  const TIERS = ['tier1', 'tier2', 'tier3', 'competitorGap', 'aeo'];

  // 1. GENERATE SERVICE × CITY PAGES
  for (const [countryKey, country] of Object.entries(slicedCountries)) {
    for (const city of country.cities) {
      for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
        for (const tierName of TIERS) {
          const keywords = service[tierName] || [];
          for (const keyword of keywords) {
            const slug = `${toSlug(keyword)}-in-${city.slug}`;

            if (seenSlugs.has(slug)) {
              skipped++;
              continue;
            }
            seenSlugs.add(slug);

            currentChunk.push({
              slug,
              path: `/${slug}`,
              country: countryKey,
              cityName: city.name,
              citySlug: city.slug,
              state: city.state || city.area || '',
              serviceId,
              tier: tierName,
              keyword,
              type: 'service-city'
            });

            flushChunk();
          }
        }
      }
    }
  }

  // 2. GENERATE INDUSTRY × CITY PAGES (Top 500 cities of major countries, all UAE/SG)
  // We cross 7 services × 6 industries = 42 keywords per city
  const industries = ['fintech', 'real-estate', 'healthtech', 'edtech', 'ecommerce', 'hospitality'];
  const industryCityCount = {
    uae: slicedCountries.uae.cities,
    singapore: slicedCountries.singapore.cities,
    india: slicedCountries.india.cities.slice(0, 300),
    uk: slicedCountries.uk.cities.slice(0, 150),
    usa: slicedCountries.usa.cities.slice(0, 200)
  };

  for (const [countryKey, cities] of Object.entries(industryCityCount)) {
    const country = ALL_COUNTRIES[countryKey];
    for (const city of cities) {
      for (const ind of industries) {
        for (const [serviceId, service] of Object.entries(ALL_KEYWORDS.services)) {
          // e.g. "custom website development for fintech in mumbai"
          const keyword = `${service.name.toLowerCase()} for ${ind}`;
          const slug = `${toSlug(keyword)}-in-${city.slug}`;

          if (seenSlugs.has(slug)) { skipped++; continue; }
          seenSlugs.add(slug);

          currentChunk.push({
            slug,
            path: `/${slug}`,
            country: countryKey,
            cityName: city.name,
            citySlug: city.slug,
            state: city.state || city.area || '',
            serviceId,
            tier: 'tier2',
            keyword,
            type: 'industry-city'
          });

          flushChunk();
        }
      }
    }
  }

  // 3. GENERATE TECH STACK × CITY PAGES (Top 300 cities)
  const techStackCities = [
    ...slicedCountries.uae.cities.slice(0, 50),
    ...slicedCountries.singapore.cities.slice(0, 50),
    ...slicedCountries.india.cities.slice(0, 100),
    ...slicedCountries.uk.cities.slice(0, 50),
    ...slicedCountries.usa.cities.slice(0, 50)
  ];

  for (const city of techStackCities) {
    const countryKey = city.state ? (slicedCountries.india.cities.some(c => c.slug === city.slug) ? 'india' : 'usa') : (city.area ? 'uae' : 'singapore'); // approximate
    const country = slicedCountries[countryKey] || slicedCountries.india;
    
    for (const techKw of ALL_KEYWORDS.techStack) {
      const slug = `${toSlug(techKw)}-in-${city.slug}`;
      if (seenSlugs.has(slug)) { skipped++; continue; }
      seenSlugs.add(slug);

      currentChunk.push({
        slug,
        path: `/${slug}`,
        country: countryKey,
        cityName: city.name,
        citySlug: city.slug,
        state: city.state || city.area || '',
        serviceId: techKw.includes('native') || techKw.includes('flutter') ? 'mobile-app-development' : 'website-development',
        tier: 'tier2',
        keyword: techKw,
        type: 'tech-city'
      });

      flushChunk();
    }
  }

  // Flush any remaining pages in the last chunk
  flushChunk(true);

  // Write the master domination manifest
  const manifest = {
    totalPages: totalCount,
    chunks: chunkIndex,
    chunkFiles,
    type: 'mega-domination-pages',
    countries: Object.keys(slicedCountries),
    totalCities: totalCities,
    skippedDuplicates: skipped,
    generatedAt: new Date().toISOString()
  };

  fs.writeFileSync(path.join(DATA_DIR, 'mega-domination-manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');

  // Generate flat active cities list for client-side search/fallback
  const activeCitiesList = [];
  for (const [countryKey, country] of Object.entries(slicedCountries)) {
    for (const city of country.cities) {
      activeCitiesList.push({
        n: city.name,
        s: city.slug,
        c: countryKey,
        st: city.state || city.area || '',
        la: city.lat,
        lo: city.lng
      });
    }
  }
  fs.writeFileSync(path.join(DATA_DIR, 'activeCities.json'), JSON.stringify(activeCitiesList), 'utf8');
  console.log(`\n✅ Generated client activeCities.json directory: ${activeCitiesList.length} cities`);

  console.log(`\n🎯 METADATA GENERATION COMPLETE!`);
  console.log(`✅ Total pages generated: ${totalCount.toLocaleString()}`);
  console.log(`📦 Chunks: ${chunkIndex} JSON files (mega-chunks/mega-pages-*.json)`);
  console.log(`⚠️  Skipped duplicates: ${skipped}`);
  
  return manifest;
}

generateMegaPages().catch(console.error);
