import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITY_PAGES } from './data/cityPages.js';
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

const DOMAIN = 'https://codehtml.in';
const lastModified = new Date().toISOString().slice(0, 10);

const staticRoutes = [
  '/',
  '/about',
  '/faq',
  '/partner',
  '/portfolio',
  '/blog',
  '/locations',
  '/privacy-policy',
  '/terms-conditions',
  '/refund-policy',
  '/pricing',
  '/resources',
  '/tools',
  '/restaurant-website-design-dubai',
  '/clinic-website-design-dubai',
  '/real-estate-website-design-dubai',
  '/web-development-dubai-guide',
  '/website-cost-in-dubai',
  // NEW HIGH-IMPACT SEO PAGES
  '/dubai-web-development',
  '/dubai-mobile-app-development',
  '/app-developer-near-me-dubai',
  '/about-codehtml',
  '/html-development-services',

  // Swigato-Style Dubai City Pages
  '/dubai-web-development-marina',
  '/dubai-web-development-jlt',
  '/dubai-web-development-difc',
  '/dubai-web-development-downtown',
  '/dubai-web-development-jumeirah',
  '/dubai-web-development-deira',
  '/dubai-web-development-internet-city',
  '/dubai-web-development-silicon-oasis',
  '/dubai-web-development-al-barsha',

  // Swigato-Style UK City Pages
  '/web-development-london',
  '/web-development-manchester',
  '/web-development-birmingham'
];

function buildSitemapXml(urls) {
  const items = urls.map(url => {
    let imgXml = '';
    if (url.images && Array.isArray(url.images)) {
      imgXml = '\n' + url.images.map(img => `    <image:image>
      <image:loc>${img.loc.startsWith('http') ? img.loc : DOMAIN + img.loc}</image:loc>
      <image:title>${img.title}</image:title>
      <image:caption>${img.caption}</image:caption>
    </image:image>`).join('\n');
    }
    return `  <url>
    <loc>${DOMAIN}${url.path}</loc>
    <changefreq>${url.changefreq || 'monthly'}</changefreq>
    <priority>${url.priority || '0.6'}</priority>
    <lastmod>${lastModified}</lastmod>${imgXml}
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
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

async function generate() {
  const publicDir = path.resolve(__dirname, 'public');
  
  // 1. Static Sitemap
  const staticUrls = staticRoutes.map(route => {
    const item = {
      path: route,
      priority: route === '/' ? '1.0' : '0.8',
      changefreq: 'weekly'
    };
    if (route === '/') {
      item.images = [
        { loc: '/hero-img.webp', title: 'CodeHTML Premium Custom Web & App Development Studio', caption: 'Premium custom coded software, React web apps, SaaS platforms, and mobile apps.' },
        { loc: '/about-section-img.webp', title: 'CodeHTML Studio Craftsmanship', caption: 'Engineers designing high performance software and clean coded systems.' }
      ];
    } else if (route === '/about') {
      item.images = [
        { loc: '/slcc_construction.webp', title: 'SLCC Construction custom portal blueprint model developed by CodeHTML', caption: 'Bespoke corporate architecture modeling.' },
        { loc: '/dubai_business_bay.webp', title: 'CodeHTML office skyline in Business Bay Dubai', caption: 'Premium collaborative workspace for digital engineering.' }
      ];
    }
    return item;
  });
  
  // 1. New Category Overview Indexes
  staticUrls.push({ path: `/products`, priority: '0.8', changefreq: 'monthly' });
  staticUrls.push({ path: `/ai-solutions`, priority: '0.8', changefreq: 'monthly' });
  staticUrls.push({ path: `/get-more-customers`, priority: '0.8', changefreq: 'monthly' });
  staticUrls.push({ path: `/services`, priority: '0.8', changefreq: 'monthly' });

  // 2. Individual Pages
  Object.keys(PRODUCTS_DATA).forEach(slug => {
    staticUrls.push({ path: `/products/${slug}`, priority: '0.85', changefreq: 'monthly' });
  });
  Object.keys(AI_SOLUTIONS_DATA).forEach(slug => {
    staticUrls.push({ path: `/ai-solutions/${slug}`, priority: '0.85', changefreq: 'monthly' });
  });
  Object.keys(GET_MORE_CUSTOMERS_DATA).forEach(slug => {
    staticUrls.push({ path: `/get-more-customers/${slug}`, priority: '0.85', changefreq: 'monthly' });
  });
  Object.keys(SERVICES_DATA_NEW).forEach(slug => {
    staticUrls.push({ path: `/services/${slug}`, priority: '0.85', changefreq: 'monthly' });
  });
  
  const portfolioImages = {
    '01': { loc: '/luxury_dubai_villa.webp', title: 'Alaya Realty Portal', caption: 'Premium real estate listings website developed by CodeHTML' },
    '02': { loc: '/slcc_construction.webp', title: 'SLCC Construction Portal', caption: 'Custom construction portal with blueprint rendering built by CodeHTML' },
    '03': { loc: '/SwigatoIndia.webp', title: 'Swigato India Portal', caption: 'Multi-city restaurant license and registration platform developed by CodeHTML' },
    '04': { loc: '/elgamingo.webp', title: 'Elgamingo Gaming Store', caption: 'Custom e-commerce gaming storefront and delivery system built by CodeHTML' },
    '05': { loc: '/crystamedia_agency.webp', title: 'Crysta Media Corporate Website', caption: 'SEO-optimized agency lead generation portal designed by CodeHTML' },
    '06': { loc: '/cafedecasa.webp', title: 'Cafe De Casa Website', caption: 'Modern brand storytelling cafe site with digital menu QR integration by CodeHTML' }
  };

  ['01', '02', '03', '04', '05', '06'].forEach((id) => {
    staticUrls.push({ 
      path: `/portfolio/${id}`, 
      priority: '0.6', 
      changefreq: 'monthly',
      images: [portfolioImages[id]]
    });
  });

  // NEW: Case Study Pages
  staticUrls.push({ path: '/case-study/swigato', priority: '0.85', changefreq: 'monthly' });
  staticUrls.push({ path: '/case-study/alaya-realty', priority: '0.85', changefreq: 'monthly' });
  staticUrls.push({ path: '/case-study/slcc', priority: '0.85', changefreq: 'monthly' });

  fs.writeFileSync(path.join(publicDir, 'sitemap-static.xml'), buildSitemapXml(staticUrls), 'utf8');
  console.log(`✓ Written public/sitemap-static.xml (${staticUrls.length} URLs)`);

  // 2. Cities Sitemap — DEPRECATED: thin city pages removed from indexing
  // All city pages now have noindex and are disallowed in robots.txt
  const cityUrls = [];
  fs.writeFileSync(path.join(publicDir, 'sitemap-cities.xml'), buildSitemapXml(cityUrls), 'utf8');
  console.log(`✓ Written public/sitemap-cities.xml (EMPTY — city pages de-indexed)`);


  // 3. Blog Sitemap — DEPRECATED: thin blog posts noindexed, do not submit to Google
  const blogUrls = [];
  fs.writeFileSync(path.join(publicDir, 'sitemap-blog.xml'), buildSitemapXml(blogUrls), 'utf8');
  console.log(`✓ Written public/sitemap-blog.xml (EMPTY — blog posts de-indexed)`);

  // 4. Growth Sitemap — DEPRECATED: thin growth guides noindexed, do not submit to Google
  const growthUrls = [];
  fs.writeFileSync(path.join(publicDir, 'sitemap-growth.xml'), buildSitemapXml(growthUrls), 'utf8');
  console.log(`✓ Written public/sitemap-growth.xml (EMPTY — growth guides de-indexed)`);

  // 5. Niche Sitemap
  const nicheUrls = [];
  if (COMPARISON_PAGES) {
    COMPARISON_PAGES.forEach(page => {
      nicheUrls.push({ path: `/compare/${page.slug}`, priority: '0.75', changefreq: 'monthly' });
    });
  }
  if (RECOVERY_PAGES) {
    RECOVERY_PAGES.forEach(page => {
      nicheUrls.push({ path: `/recover/${page.slug}`, priority: '0.8', changefreq: 'monthly' });
    });
  }
  if (OFFSHORE_PAGES) {
    OFFSHORE_PAGES.forEach(page => {
      nicheUrls.push({ path: `/hire/${page.slug}`, priority: '0.8', changefreq: 'monthly' });
    });
  }
  if (TECH_STACK_PAGES) {
    TECH_STACK_PAGES.forEach(page => {
      nicheUrls.push({ path: `/tech/${page.slug}`, priority: '0.85', changefreq: 'monthly' });
    });
  }
  if (INDUSTRY_PAGES) {
    INDUSTRY_PAGES.forEach(page => {
      nicheUrls.push({ path: `/industry/${page.industrySlug}/${page.countrySlug}`, priority: '0.8', changefreq: 'monthly' });
    });
  }
  fs.writeFileSync(path.join(publicDir, 'sitemap-niche.xml'), buildSitemapXml(nicheUrls), 'utf8');
  console.log(`✓ Written public/sitemap-niche.xml (${nicheUrls.length} URLs)`);

  // 6. Master Sitemap Index
  const sitemapFiles = [
    'sitemap-static.xml',
    'sitemap-blog.xml',
    'sitemap-growth.xml',
    'sitemap-niche.xml'
  ];
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), buildSitemapIndex(sitemapFiles), 'utf8');
  console.log(`✓ Written public/sitemap.xml (Sitemap Index referencing ${sitemapFiles.length} sitemaps)`);
}

generate().catch(console.error);
