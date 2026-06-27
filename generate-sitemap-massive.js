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
  console.log('🚀 Skipping massive thin-page sitemap generation — city pages de-indexed.');
  console.log('   Generating clean master sitemap index with only high-quality pages...');
  
  // Clean up any old mega sitemap files
  const files = fs.readdirSync(PUBLIC_DIR);
  for (const file of files) {
    if (file.startsWith('sitemap-mega-')) {
      fs.unlinkSync(path.join(PUBLIC_DIR, file));
      console.log(`   Removed old ${file}`);
    }
  }
  if (fs.existsSync(DIST_DIR)) {
    const distFiles = fs.readdirSync(DIST_DIR);
    for (const file of distFiles) {
      if (file.startsWith('sitemap-mega-')) {
        fs.unlinkSync(path.join(DIST_DIR, file));
      }
    }
  }

  const baseSitemaps = [
    'sitemap-static.xml',
    'sitemap-blog.xml',
    'sitemap-growth.xml',
    'sitemap-niche.xml'
  ];
  
  const indexPath = path.join(PUBLIC_DIR, 'sitemap.xml');
  fs.writeFileSync(indexPath, buildSitemapIndex(baseSitemaps), 'utf8');
  if (fs.existsSync(DIST_DIR)) {
    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), buildSitemapIndex(baseSitemaps), 'utf8');
  }
  console.log(`✓ Master sitemap index updated at public/sitemap.xml and dist/sitemap.xml referencing ${baseSitemaps.length} sitemaps.`);
  
  console.log('🏁 Sitemap generation complete!');
}

run().catch(console.error);
