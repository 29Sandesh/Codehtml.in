import puppeteer from 'puppeteer';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Data imports (same as generate-sitemap.js)
import { blogPosts } from './data/blogPosts.js';
import { PRODUCTS_DATA } from './src/data/productsData.js';
import { AI_SOLUTIONS_DATA } from './src/data/aiSolutionsData.js';
import { GET_MORE_CUSTOMERS_DATA } from './src/data/getMoreCustomersData.js';
import { SERVICES_DATA_NEW } from './src/data/servicesDataNew.js';
import { GROWTH_GUIDES } from './data/growthGuides.js';
import { COMPARISON_PAGES } from './data/comparisonPages.js';
import { RECOVERY_PAGES, OFFSHORE_PAGES, TECH_STACK_PAGES } from './data/nichePages.js';
import { INDUSTRY_PAGES } from './data/industryPages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, 'dist');
const PORT = 3456;

// ──────────────────────────────────────────────────────────────────────────
// Build the list of routes to prerender (skip thin city pages — noindexed)
// ──────────────────────────────────────────────────────────────────────────
const routes = [
  // Core static pages
  '/',
  '/about',
  '/faq',
  '/partner',
  '/portfolio',
  '/blog',
  '/pricing',
  '/contact',
  '/resources',
  '/locations',
  '/privacy-policy',
  '/terms-conditions',
  '/refund-policy',

  // Niche landing pages
  '/website-cost-in-dubai',
  '/restaurant-website-design-dubai',
  '/clinic-website-design-dubai',
  '/real-estate-website-design-dubai',
  '/web-development-dubai-guide',

  // Category overview pages
  '/products',
  '/ai-solutions',
  '/get-more-customers',
  '/services',
];

// Product detail pages
Object.keys(PRODUCTS_DATA).forEach(slug => routes.push(`/products/${slug}`));

// AI solution detail pages
Object.keys(AI_SOLUTIONS_DATA).forEach(slug => routes.push(`/ai-solutions/${slug}`));

// Get More Customers detail pages
Object.keys(GET_MORE_CUSTOMERS_DATA).forEach(slug => routes.push(`/get-more-customers/${slug}`));

// Service detail pages
Object.keys(SERVICES_DATA_NEW).forEach(slug => routes.push(`/services/${slug}`));

// Blog posts
if (blogPosts) {
  blogPosts.forEach(post => {
    routes.push(`/blog/${post.slug || post.title.toLowerCase().replace(/\s+/g, '-')}`);
  });
}

// Portfolio case studies
['01', '02', '03', '04', '05', '06'].forEach(id => routes.push(`/portfolio/${id}`));

// Growth guides
if (GROWTH_GUIDES) {
  GROWTH_GUIDES.forEach(guide => routes.push(`/grow/${guide.slug}`));
}

// Niche pages
if (COMPARISON_PAGES) {
  COMPARISON_PAGES.forEach(page => routes.push(`/compare/${page.slug}`));
}
if (RECOVERY_PAGES) {
  RECOVERY_PAGES.forEach(page => routes.push(`/recover/${page.slug}`));
}
if (OFFSHORE_PAGES) {
  OFFSHORE_PAGES.forEach(page => routes.push(`/hire/${page.slug}`));
}
if (TECH_STACK_PAGES) {
  TECH_STACK_PAGES.forEach(page => routes.push(`/tech/${page.slug}`));
}
if (INDUSTRY_PAGES) {
  INDUSTRY_PAGES.forEach(page => routes.push(`/industry/${page.industrySlug}/${page.countrySlug}`));
}

// ──────────────────────────────────────────────────────────────────────────
// Static server — serves dist/ with SPA fallback
// ──────────────────────────────────────────────────────────────────────────
function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    // SPA fallback: if no static file, serve the SPA shell
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.mjs': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff2': 'font/woff2',
      '.woff': 'font/woff',
    }[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  });

  return new Promise((resolve) => {
    server.listen(PORT, () => {
      console.log(`\n🖥  Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

// ──────────────────────────────────────────────────────────────────────────
// Real prerendering with Puppeteer (falls back to placeholder if unavailable)
// ──────────────────────────────────────────────────────────────────────────
async function prerender() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
      ],
    });
  } catch (launchErr) {
    console.warn('\n⚠️  Puppeteer could not launch a browser. Skipping real prerendering.');
    console.warn('   Reason:', launchErr.message);
    console.warn('   This is expected on environments without Chrome (e.g. some CI/CD).');
    console.warn('   Placeholder prerendering from prerender.js is still in place.\n');
    return;
  }

  console.log(`\n🎭 Rendering ${routes.length} routes with Puppeteer...\n`);

  const page = await browser.newPage();

  // Block images and fonts to speed up rendering
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const type = req.resourceType();
    if (type === 'image' || type === 'font' || type === 'media') {
      req.abort();
    } else {
      req.continue();
    }
  });

  let successCount = 0;
  let failCount = 0;

  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for React to render the root div
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        return root && root.children.length > 0;
      }, { timeout: 15000 });

      // Extra wait for lazy-loaded content / animations
      await page.waitForTimeout(800);

      const html = await page.content();

      const outputDir = path.join(DIST_DIR, route);
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(path.join(outputDir, 'index.html'), html, 'utf8');

      successCount++;
      process.stdout.write(`\r  ✓ ${successCount} rendered | ${failCount} failed | ${routes.length} total | current: ${route}`.padEnd(100));
    } catch (err) {
      failCount++;
      console.error(`\n  ✗ Failed: ${route} — ${err.message}`);
    }
  }

  await page.close();
  await browser.close();

  console.log(`\n\n✅ Real prerendering complete: ${successCount} success, ${failCount} failed`);
}

// ──────────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('❌ Error: dist/ folder not found. Run "npm run build" first.');
    process.exit(1);
  }

  const server = await startServer();
  await prerender();
  server.close();
  console.log('\n🏁 Done! All key pages now contain real rendered React HTML.\n');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
