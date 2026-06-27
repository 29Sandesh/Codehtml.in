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
import { getCityKeywords } from './data/geoKeywordsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dubaiCommunities = JSON.parse(fs.readFileSync(path.join(__dirname, 'src/data/dubai_communities.json'), 'utf8'));

const DIST_DIR = path.join(__dirname, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('Error: dist/index.html template not found! Run npm run build first.');
  process.exit(1);
}

const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

// Custom Case Studies Metadata to match the new repositioning
const CASE_STUDIES = {
  '01': {
    name: 'Alaya Realty',
    tagline: 'REAL ESTATE CONSULTANCY // ALAYA REALTY',
    problem: 'Built a premium real estate consultancy platform with property showcasing, inquiry management, and high-performance architecture.',
    solution: 'We engineered a bespoke React-based property listings portal. The interface uses high-speed image rendering, community guide pages, and direct-to-broker WhatsApp routing.',
    result: 'Load speed reduced to 0.7s with property portal and listings system, built using 100% custom development.',
    tech: 'React.js, Vite, Tailwind CSS, Property Portal, Listings System'
  },
  '02': {
    name: 'SLCC Construction',
    tagline: 'CONSTRUCTION PORTAL // SLCC CONSTRUCTION',
    problem: 'Developed a custom construction portal with architectural blueprint visualization, project showcasing, and quote generation workflows.',
    solution: 'Engineered a state-of-the-art GPU-accelerated React platform featuring dynamic construction progress timelines, responsive digital blueprints, and a secure bidding intake routing system.',
    result: 'Response time lowered to 250ms with quote system lead automation and custom architecture.',
    tech: 'React.js, Vite, Framer Motion, Quote System, Lead Automation'
  },
  '03': {
    name: 'Swigato India',
    tagline: 'FOOD LICENSE PLATFORM // SWIGATO INDIA',
    problem: 'Built a multi-city food license and restaurant onboarding platform helping businesses streamline licensing, registrations, and compliance workflows.',
    solution: 'Designed and built a multi-city restaurant directory and onboarding system handling high compliance volumes and offering instant routing.',
    result: 'Multi-city platform coverage, fast search for instant discovery, and 100% custom built from scratch.',
    tech: 'React.js, Vite, Compliance API, Fast Search, Instant Discovery'
  },
  '04': {
    name: 'Elgamingo',
    tagline: 'ONLINE GAMING PLATFORM // ELGAMINGO',
    problem: 'Created an online gaming platform with digital product delivery, modern storefront design, and scalable commerce workflows.',
    solution: 'Developed a custom digital product delivery pipeline with instant voucher generation and secure payment integration.',
    result: 'E-commerce gaming store with instant access digital delivery and scalable architecture.',
    tech: 'React.js, Vite, E-Commerce, Digital Delivery, Scalable Arch'
  },
  '05': {
    name: 'Crysta Media',
    tagline: 'DIGITAL MARKETING AGENCY // CRYSTA MEDIA',
    problem: 'Designed and developed a high-converting corporate website for a digital marketing agency focused on lead generation and premium positioning.',
    solution: 'Created a high-converting corporate website with optimized SEO, performance-focused layout, and premium design.',
    result: 'SEO ready optimized pages, fast load performance, and lead-focused conversion design.',
    tech: 'React.js, Vite, SEO Schema, Performance Optimization, Conversion Design'
  },
  '06': {
    name: 'Cafe De Casa',
    tagline: 'CAFE WEBSITE // CAFE DE CASA',
    problem: 'Built a modern cafe website with menu experiences, brand storytelling, and customer-focused design for improved engagement.',
    solution: 'Designed and developed a responsive mobile-first UI with integrated digital menu QR code experiences.',
    result: 'Mobile first responsive UX with QR menu digital experience and fast load performance.',
    tech: 'React.js, Vite, Mobile First UX, QR Menu, Performance'
  }
};

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function getCoordinates(name, region) {
  const explicit = {
    'Dubai Marina': { lat: 25.0808, lon: 55.1403 },
    'Downtown Dubai': { lat: 25.1972, lon: 55.2744 },
    'Palm Jumeirah': { lat: 25.1124, lon: 55.1390 },
    'Business Bay': { lat: 25.1860, lon: 55.2720 },
    'Jumeirah Lake Towers': { lat: 25.0808, lon: 55.1403 },
    'Dubai Hills Estate': { lat: 25.1018, lon: 55.2785 }
  };
  
  if (explicit[name]) return explicit[name];
  
  const h = hashString(name);
  if (region === 'INDIA') {
    const lat = 10.0 + (h % 2200) / 100.0;
    const lon = 72.0 + ((h >> 2) % 2000) / 100.0;
    return { lat: parseFloat(lat.toFixed(4)), lon: parseFloat(lon.toFixed(4)) };
  } else {
    const lat = 24.95 + (h % 350) / 1000.0;
    const lon = 55.05 + ((h >> 2) % 400) / 1000.0;
    return { lat: parseFloat(lat.toFixed(4)), lon: parseFloat(lon.toFixed(4)) };
  }
}

function getCommunityLink(commName, serviceSlug) {
  // Try to find page for this community and serviceSlug
  let matched = CITY_PAGES.find(p => p.region === 'DUBAI' && p.name.toLowerCase() === commName.toLowerCase() && p.serviceType === serviceSlug);
  if (matched) return `/${matched.slug}`;
  
  // If not found, try to find any page for this community
  matched = CITY_PAGES.find(p => p.region === 'DUBAI' && p.name.toLowerCase() === commName.toLowerCase());
  if (matched) return `/${matched.slug}`;
  
  return null;
}

// Function to replace tags in the index template and write the generated file
function prerenderPage(urlPath, seoData, contentHtml) {
  let html = template;

  const title = seoData.title ? (seoData.title.includes('CodeHTML') ? seoData.title : `${seoData.title} | CodeHTML`) : "CodeHTML | Dubai's Premium Custom Software & Web Studio";
  const description = seoData.description || "CodeHTML is Dubai's premium custom software and web development studio. We build custom React websites, B2B dashboards, SaaS engines, mobile apps, and enterprise tools.";
  const keywords = seoData.keywords || 'web design, website development, saas development, mobile apps, custom software, dubai';
  const canonicalUrl = `https://codehtml.in${urlPath === '/' ? '' : urlPath}`;

  // 1. Titles
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:title" content="${title}" />`);
  html = html.replace(/<meta\s+property="twitter:title"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:title" content="${title}" />`);

  // 2. Descriptions
  html = html.replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i, `<meta name="description" content="${description}" />`);
  html = html.replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:description" content="${description}" />`);
  html = html.replace(/<meta\s+property="twitter:description"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:description" content="${description}" />`);

  // 3. Robots / Noindex
  if (seoData.noindex) {
    html = html.replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i, `<meta name="robots" content="noindex, nofollow" />`);
  }


  // 4. URLs
  if (html.match(/<link\s+rel="canonical"/i)) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonicalUrl}" />`);
  } else {
    html = html.replace('</head>', `<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta\s+property="twitter:url"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:url" content="${canonicalUrl}" />`);

  // 5. Image override if present
  if (seoData.image) {
    html = html.replace(/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="og:image" content="${seoData.image}" />`);
    html = html.replace(/<meta\s+property="twitter:image"\s+content="[^"]*"\s*\/?>/i, `<meta property="twitter:image" content="${seoData.image}" />`);
  }

  // 5.5 Inject JSON-LD Schema
  if (seoData.schemaHtml) {
    html = html.replace('</head>', `${seoData.schemaHtml}\n</head>`);
  }

  // 6. Inject HTML body into root div
  html = html.replace('<div id="root"></div>', `<div id="root">${contentHtml}</div>`);

  // Write index.html file
  const fullDirPath = path.join(DIST_DIR, urlPath);
  fs.mkdirSync(fullDirPath, { recursive: true });
  fs.writeFileSync(path.join(fullDirPath, 'index.html'), html, 'utf8');
}

console.log('🚀 Starting pre-rendering compilation...');

// ==========================================
// 1. Static Pages
// ==========================================
console.log('Generating static core pages...');

prerenderPage('/website-cost-in-dubai',
  {
    title: 'How Much Does a Website Cost in Dubai? (2026 Ultimate Guide + Calculator)',
    description: 'Get exact AED pricing for clinic, corporate, and real estate website design in Dubai. Use our interactive website cost calculator for an instant estimate.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>How Much Does a Website Cost in Dubai?</h1>
    <p>Use our interactive calculator to get a realistic, transparent estimate based on your exact business needs.</p>
  </main>
  `
);

prerenderPage('/about', 
  {
    title: 'About CodeHTML | Dubai\'s Custom Software & Web Studio',
    description: 'Learn about our founding engineering team, custom React architectures, and how we build sub-second web and mobile apps.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>About CodeHTML</h1>
    <p>We are Dubai's premium custom software studio. We write lightweight React code to build custom websites, dashboards, SaaS engines, and mobile apps.</p>
    <h2>Our Digital Architecture</h2>
    <p>Our platforms run on lightweight Vite and React Native setups, guaranteeing sub-second rendering. We grant 100% intellectual property ownership with zero licensing locks.</p>
  </main>
  `
);


prerenderPage('/tools', 
  {
    title: 'Developer Tools | CodeHTML',
    description: 'Access CodeHTML premium developer tools. Currently experiencing high traffic.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff; text-align: center;">
    <h1>System at Capacity</h1>
    <p>Due to high traffic volumes, our tools are temporarily paused. Please try again later.</p>
  </main>
  `
);


prerenderPage('/partner', 
  {
    title: 'Agency Partner Program | CodeHTML',
    description: 'Partner with CodeHTML. Expand your agency capabilities with white-label custom website, SaaS, and mobile app development. Earn commissions on every lead.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Agency Partner Program</h1>
    <p>Partner with CodeHTML to earn more from your custom software, web app, and mobile app development leads. We write clean, hand-coded software while you sell under your brand.</p>
    <h2>What We Build</h2>
    <ul>
      <li>Custom Website Development</li>
      <li>Complex SaaS Products & Dashboards</li>
      <li>Native & Cross-Platform Mobile Applications</li>
    </ul>
    <h2>Contact Us</h2>
    <p>Email: Contact@Codehtml.in | WhatsApp: +91 93032 28082</p>
  </main>
  `
);

prerenderPage('/portfolio', 
  {
    title: 'Project Portfolio | Live Production Apps & UX Concepts | CodeHTML',
    description: 'Explore live web applications, collaborative SaaS platforms, custom desktop tools, and premium UX/UI concepts designed and developed by CodeHTML.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>CodeHTML Project Portfolio</h1>
    <p>A curated catalog of live production portals, real-time SaaS workspaces, custom developer tools, and high-fidelity Netlify concept applications.</p>
    
    <h2>Production Applications & SaaS Systems</h2>
    <ul>
      <li><strong>The Circle</strong> - Collaborative Doc SaaS Workspace with Real-Time Sync (<a href="https://jition.vercel.app">Live App</a>)</li>
      <li><strong>Co-Found</strong> - Founder Matchmaking & Networking Mobile/Web Platform (Under Progress)</li>
      <li><strong>SwigatoIndia.in</strong> - Multi-City Restaurant Directory & Food Delivery Portal (<a href="https://swigatoindia.in">Live App</a>)</li>
      <li><strong>Codehtml.in</strong> - Tech Experiments & Reusable React Templates (<a href="https://codehtml.in">Live App</a>)</li>
      <li><strong>Slcc.in</strong> - Digital Architectural Blueprints & Quote Generator (<a href="https://slcc.in">Live App</a>)</li>
      <li><strong>crystamedia.in</strong> - Elite Corporate Events, Business Summits & Gala Awards (<a href="https://crystamedia.in">Live App</a>)</li>
      <li><strong>Friday AI Agent</strong> - Local Whisper Speech-to-Text & Ollama Desktop Voice Assistant (Local Tool)</li>
      <li><strong>LeadTool</strong> - Business Lead Extraction Map Integration Dashboard (Local Tool)</li>
    </ul>

    <h2>Premium UX/UI Netlify Concepts</h2>
    <ul>
      <li><strong>MoneyPays</strong> - Cyber-Luxury Fintech Platform & Dashboard (<a href="https://moenypays.netlify.app">Live App</a>)</li>
      <li><strong>Azude Hotel</strong> - Premium Resort Booking & Guest Loyalty Portal (<a href="https://azudehotel.netlify.app">Live App</a>)</li>
      <li><strong>Tinkus-cafe</strong> - Sweet Bakery, Shakes & Custom Cake Quote Tool (<a href="https://tinkus-cafe.netlify.app">Live App</a>)</li>
      <li><strong>cafe-decasa</strong> - Cozy Artisanal Coffee Shop & Roast Timeline (<a href="https://cafe-decasa.netlify.app">Live App</a>)</li>
      <li><strong>cutler-dining</strong> - Contemporary Gastronomy & Tasting Rooms (<a href="https://cutler-dining.netlify.app">Live App</a>)</li>
      <li><strong>el-gamingo</strong> - Cyberpunk Game Review & Discovery Library (<a href="https://el-gamingo.netlify.app">Live App</a>)</li>
      <li><strong>famond-restraunt</strong> - Elegant Sommelier Wine Bistro & Flight Builder (<a href="https://famond-restraunt.netlify.app">Live App</a>)</li>
      <li><strong>finedine-restraunt</strong> - Ultra-Luxury Multi-Course Culinary Showcase (<a href="https://finedine-restraunt.netlify.app">Live App</a>)</li>
      <li><strong>Lumina</strong> - High-Fashion Editorial Catalog Mobile-First (<a href="https://lumina.netlify.app">Live App</a>)</li>
      <li><strong>teamo-dating</strong> - AI-Driven Matchmaker & Swipe Dating Card Deck (<a href="https://teamo-dating.netlify.app">Live App</a>)</li>
    </ul>
  </main>
  `
);

prerenderPage('/blog', 
  {
    title: 'CodeHTML Blog | Custom Software, React Web Apps & Mobile Engineering',
    description: 'Read engineering breakdowns on database performance, React Native stores submissions, API integrations, and technical SEO in Dubai.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Intel Blog - Custom Software & Web Engineering</h1>
    <p>Discover high-performance code, AI integrations, and developer insights.</p>
    <ul>
      ${blogPosts.map(p => `<li><a href="/blog/${p.slug}">${p.title}</a> - ${p.excerpt}</li>`).join('')}
    </ul>
  </main>
  `
);

prerenderPage('/locations', 
  {
    title: 'Global Delivery & Operations Locations | CodeHTML',
    description: 'Explore our operational locations across UAE, India, Singapore, UK, and USA. Over 8,000 cities served with high-performance custom web and mobile development.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Our Global Delivery Locations</h1>
    <p>CodeHTML operates globally, delivering high-performance custom websites, web applications, SaaS platforms, and mobile apps across five major operational jurisdictions:</p>
    <ul>
      <li><strong>United Arab Emirates</strong> - Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah</li>
      <li><strong>India</strong> - Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Noida</li>
      <li><strong>Singapore</strong> - Singapore, Jurong East, Marina Bay, Tampines Estate, Woodlands, Bukit Timah</li>
      <li><strong>United Kingdom</strong> - York, Windsor, Wimbledon, Winchester, Wigan, City of Westminster</li>
      <li><strong>United States</strong> - Jacksonville, Nashville, Louisville, Madison, Oakland, Naples</li>
    </ul>
    <p>Search over 8,000+ local cities in our directory to find tailored service catalogs and local compliant software packages.</p>
  </main>
  `
);

prerenderPage('/pricing', 
  {
    title: 'Transparent Custom Software & Web Development Pricing | CodeHTML',
    description: 'View transparent, tiered pricing plans for custom website development, SaaS platforms, native iOS/Android mobile apps, and custom business tools.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Development Investment Tiers</h1>
    <p>Hand-written, custom engineering built from scratch. Choose your service category to review development pricing.</p>
    <h2>Custom Website Development</h2>
    <p>Basic Site: AED 1,500 | Business Site: AED 3,500 | Enterprise Web: AED 7,500</p>
    <h2>Web Application Development</h2>
    <p>Custom Web App: AED 6,500 | Management System: AED 12,500 | Enterprise Database: AED 25,000</p>
    <h2>SaaS Development</h2>
    <p>SaaS MVP: AED 8,500 | Scale Platform: AED 18,500 | Enterprise SaaS: AED 35,000</p>
    <h2>Mobile App Development</h2>
    <p>Cross-Platform MVP: AED 7,500 | Full Pro App: AED 15,000 | Enterprise Mobile: AED 28,000</p>
    <h2>AI & Automation</h2>
    <p>Workflow Automation: AED 2,500 | Intellectual AI Bot: AED 5,500 | Enterprise System: AED 12,000</p>
  </main>
  `
);

prerenderPage('/faq', 
  {
    title: 'Frequently Asked Questions | CodeHTML',
    description: 'Find answers to common questions about custom coding, code ownership, project pricing, and app development timeline.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Frequently Asked Questions</h1>
    <h2>Do you charge monthly recurring platform or licensing fees?</h2>
    <p>Absolutely not. Because we build everything using custom hand-written code, you do not have to pay bloated monthly platform fees. You pay only for standard cloud server hosting.</p>
    <h2>Do we get 100% intellectual property and code ownership?</h2>
    <p>Yes, 100%. Upon completion of the project and clearance of payments, the entire code repository is handed over to your control.</p>
  </main>
  `
);

prerenderPage('/privacy-policy', 
  {
    title: 'Privacy Policy | CodeHTML',
    description: 'Read the privacy policy of CodeHTML, detailing how we protect and manage your personal data.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Privacy Policy</h1>
    <p>Your privacy is important to us. This policy details how we handle user data and secure client information.</p>
  </main>
  `
);

prerenderPage('/terms-conditions', 
  {
    title: 'Terms & Conditions | CodeHTML',
    description: 'Read the terms and conditions of using CodeHTML services.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Terms & Conditions</h1>
    <p>These terms govern your use of the CodeHTML platform and custom development services.</p>
  </main>
  `
);

prerenderPage('/refund-policy', 
  {
    title: 'Refund Policy | CodeHTML',
    description: 'Read the refund and milestone cancellation policy of CodeHTML.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Refund Policy</h1>
    <p>We work on a milestone-based structure. Review details of our progress refunds and project cancellations.</p>
  </main>
  `
);

prerenderPage('/resources', 
  {
    title: 'Premium Engineering Resources & Guidelines | CodeHTML',
    description: 'Access developer resources, design templates, and guides published by the CodeHTML engineering studio.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Engineering Resources</h1>
    <p>Access guidelines and tools used by our custom software studio to deploy high-scale projects.</p>
  </main>
  `
);

prerenderPage('/restaurant-website-design-dubai', 
  {
    title: 'Custom Restaurant Website Design & Ordering Systems Dubai | CodeHTML',
    description: 'We design premium, high-speed custom websites and digital menus for restaurants in Dubai. Built-in SEO and WhatsApp ordering routing.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Restaurant Website Design Dubai</h1>
    <p>Delight your guests before they arrive. We code prestige restaurant showcases featuring digital menus, live reservation widgets, and WhatsApp-driven order pipelines.</p>
  </main>
  `
);

prerenderPage('/clinic-website-design-dubai', 
  {
    title: 'DHA-Compliant Medical Clinic Website Design Dubai | CodeHTML',
    description: 'Bespoke DHA-compliant website design and booking portals for medical clinics in Dubai. High security, fast loading speeds, and CRM integrations.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Clinic Website Design Dubai</h1>
    <p>Patient-first medical interfaces. We design premium DHA-compliant web apps and appointment portals that optimize clinic bookings and protect health records.</p>
  </main>
  `
);

prerenderPage('/real-estate-website-design-dubai', 
  {
    title: 'Premium Real Estate Portal & Website Design Dubai | CodeHTML',
    description: 'High-speed custom real estate portal design in Dubai. We build property listing platforms, CRM database synchs, and map APIs for luxury brokers.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Real Estate Website Design Dubai</h1>
    <p>Dominate the property market. We design custom listings databases and interactive map-driven broker portals with instant lead notifications.</p>
  </main>
  `
);

prerenderPage('/web-development-dubai-guide', 
  {
    title: 'The Blueprint: Custom Web Development in Dubai (2026) | CodeHTML',
    description: 'Read the comprehensive developer guide to custom web development in Dubai. Analyze technology stacks, DHA compliance, and code ownership rules.'
  },
  `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Custom Web Development Dubai Guide</h1>
    <p>A technical guide to web application architecture, API integrations, and legal code ownership for businesses operating in Dubai and the wider UAE.</p>
  </main>
  `
);

// ==========================================
// 1.5 Dynamic Products, AI Solutions, Customers & Services Landing Pages
// ==========================================
console.log('Generating restructured category overview pages...');

prerenderPage('/products', {
  title: "Bespoke Business Software & Systems Products | CodeHTML",
  description: "Deploy fully coded Customer Portals, ERP Systems, B2B Online Stores, and Booking Engines with zero recurring user license fees."
}, `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Business Software Products</h1>
    <p>Productize your workflows. We deploy fully coded, white-labeled extranets, CRMs, ERPs, and online stores built for growth.</p>
  </main>
`);

prerenderPage('/ai-solutions', {
  title: "Autonomous AI Agents & Automation Solutions | CodeHTML",
  description: "Deploy custom WhatsApp chatbots, AI sales agents, automated n8n databases sync scripts, and financial PL accounting tools."
}, `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Autonomous AI Solutions</h1>
    <p>Deploy custom-trained AI voice agents, WhatsApp support bots, and back-office API triggers to automate 80% of manual routines.</p>
  </main>
`);

prerenderPage('/get-more-customers', {
  title: "Website SEO & Answer Engine Optimization (AEO) | CodeHTML",
  description: "Optimize your codebase for Google Search rankings and AI answer engines. Build high-converting step forms, popups, and GA4 dashboards."
}, `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Get More Customers</h1>
    <p>Optimize your codebase to rank on Google search and AI engines. Capture, qualify, and convert more traffic into verified leads.</p>
  </main>
`);

prerenderPage('/services', {
  title: "Bespoke Web, Mobile & Consulting Development Services | CodeHTML",
  description: "From custom React websites to React Native iOS/Android mobile apps and technical roadmaps, we build standard software systems."
}, `
  <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
    <h1>Technical Software Services</h1>
    <p>Bespoke React development, hybrid app compiling, payment webhooks, and technology roadmapping for modern enterprises.</p>
  </main>
`);

console.log('Generating product-specific landing pages...');
Object.keys(PRODUCTS_DATA).forEach(slug => {
  const product = PRODUCTS_DATA[slug];
  const urlPath = `/products/${slug}`;
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.description,
    "provider": {
      "@type": "Organization",
      "name": "CodeHTML",
      "logo": "https://codehtml.in/Codehtml.logo.png"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": product.pricing.price.replace(/[^0-9]/g, '')
    }
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(productSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: `${product.title} | CodeHTML Products`,
      description: product.description,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${product.title}</h1>
      <p style="font-size: 1.25rem; color: #c5a880; font-weight: bold; margin-bottom: 20px;">${product.tagline}</p>
      <p>${product.description}</p>
      
      <h2>System Capabilities</h2>
      <ul>
        ${product.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h2>Optimized Communities</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 30px;">
        ${dubaiCommunities.map(comm => {
          const link = getCommunityLink(comm.name, slug);
          if (link) {
            return `<a href="${link}" style="color: #c5a880; text-decoration: none;">➲ ${comm.name}</a>`;
          }
          return '';
        }).filter(Boolean).join('')}
      </div>
    </main>
    `
  );
});

console.log('Generating AI solution-specific landing pages...');
Object.keys(AI_SOLUTIONS_DATA).forEach(slug => {
  const solution = AI_SOLUTIONS_DATA[slug];
  const urlPath = `/ai-solutions/${slug}`;
  
  prerenderPage(urlPath,
    {
      title: `${solution.title} AI Integration | CodeHTML`,
      description: solution.description
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${solution.title}</h1>
      <p style="font-size: 1.25rem; color: #c5a880; font-weight: bold; margin-bottom: 20px;">${solution.tagline}</p>
      <p>${solution.description}</p>
      
      <h2>Automation Workflows</h2>
      <ul>
        ${solution.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h2>Optimized Communities</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 30px;">
        ${dubaiCommunities.map(comm => {
          const link = getCommunityLink(comm.name, slug);
          if (link) {
            return `<a href="${link}" style="color: #c5a880; text-decoration: none;">➲ ${comm.name}</a>`;
          }
          return '';
        }).filter(Boolean).join('')}
      </div>
    </main>
    `
  );
});

console.log('Generating Get More Customers-specific landing pages...');
Object.keys(GET_MORE_CUSTOMERS_DATA).forEach(slug => {
  const marketing = GET_MORE_CUSTOMERS_DATA[slug];
  const urlPath = `/get-more-customers/${slug}`;
  
  prerenderPage(urlPath,
    {
      title: `${marketing.title} Optimization | CodeHTML`,
      description: marketing.description
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${marketing.title}</h1>
      <p style="font-size: 1.25rem; color: #c5a880; font-weight: bold; margin-bottom: 20px;">${marketing.tagline}</p>
      <p>${marketing.description}</p>
      
      <h2>Acquisition Deliverables</h2>
      <ul>
        ${marketing.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h2>Optimized Communities</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 30px;">
        ${dubaiCommunities.map(comm => {
          const link = getCommunityLink(comm.name, slug);
          if (link) {
            return `<a href="${link}" style="color: #c5a880; text-decoration: none;">➲ ${comm.name}</a>`;
          }
          return '';
        }).filter(Boolean).join('')}
      </div>
    </main>
    `
  );
});

console.log('Generating service-specific landing pages...');
Object.keys(SERVICES_DATA_NEW).forEach(slug => {
  const service = SERVICES_DATA_NEW[slug];
  const urlPath = `/services/${slug}`;
  
  prerenderPage(urlPath,
    {
      title: `${service.title} Web & Mobile Services | CodeHTML`,
      description: service.description
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${service.title}</h1>
      <p style="font-size: 1.25rem; color: #c5a880; font-weight: bold; margin-bottom: 20px;">${service.tagline}</p>
      <p>${service.description}</p>
      
      <h2>Service Capabilities</h2>
      <ul>
        ${service.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h2>Optimized Communities</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-top: 30px;">
        ${dubaiCommunities.map(comm => {
          const link = getCommunityLink(comm.name, slug);
          if (link) {
            return `<a href="${link}" style="color: #c5a880; text-decoration: none;">➲ ${comm.name}</a>`;
          }
          return '';
        }).filter(Boolean).join('')}
      </div>
    </main>
    `
  );
});

// ==========================================
// 2. City Pages (Dynamic Area pages)
// ==========================================
console.log(`Generating ${CITY_PAGES.length} city-specific neighborhood pages...`);

CITY_PAGES.forEach(city => {
  const slug = city.slug || '';
  const urlPath = `/${slug}`;

  const landmark = city.landmark || (city.region === 'DUBAI' ? 'Burj Khalifa' : 'prime commercial center');
  const coords = getCoordinates(city.name, city.region);
  const isDubai = city.region === 'DUBAI';
  const country = isDubai ? 'United Arab Emirates' : 'India';
  const regionName = isDubai ? 'Dubai' : (city.state || 'India');
  const priceLabel = city.pricing && city.pricing[0] ? city.pricing[0].price : (isDubai ? 'AED 1,500' : '₹25,000');

  // Schema generation
  const schemaObj = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `CodeHTML - ${city.category} Partner in ${city.name}`,
    "image": "https://codehtml.in/logo.png",
    "@id": `https://codehtml.in${urlPath}/#professional-service`,
    "url": `https://codehtml.in${urlPath}`,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `We service all ${city.sector ? city.sector.toLowerCase() : 'commercial'} offices in and around ${city.name}`,
      "addressLocality": city.name,
      "addressRegion": regionName,
      "addressCountry": country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": coords.lat,
      "longitude": coords.lon
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": city.name
    },
    "hasMap": `https://maps.google.com/?q=${coords.lat},${coords.lon}`,
    "description": `Premium digital technology, sub-second React platforms, and automated API workflows. Specially servicing brands operating in ${city.name} near ${landmark}. Fully integrated with local regulatory guidelines and ${regionName} standards.`,
    "knowsAbout": [
      "Web Design & Development",
      "SaaS Product Engineering",
      "Custom CRM & ERP",
      "Mobile App Development",
      "Custom software tools"
    ],
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
          "@type": "ProfessionalService",
          "@id": `https://codehtml.in${urlPath}/#professional-service`,
          "name": `CodeHTML - ${city.category} Partner in ${city.name}`,
          "image": "https://codehtml.in/logo.png",
          "telephone": "+919303228082",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `We service all ${city.sector ? city.sector.toLowerCase() : 'commercial'} offices in and around ${city.name}`,
            "addressLocality": city.name,
            "addressRegion": regionName,
            "addressCountry": country
          }
        }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Sandeep Verma" },
        "reviewBody": "The restaurant delivery portal and booking dashboard CodeHTML built for swigatoindia.in is incredibly fast. Order routing is instant and SEO traffic has grown by 300% since launch.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "itemReviewed": {
          "@type": "ProfessionalService",
          "@id": `https://codehtml.in${urlPath}/#professional-service`,
          "name": `CodeHTML - ${city.category} Partner in ${city.name}`,
          "image": "https://codehtml.in/logo.png",
          "telephone": "+919303228082",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `We service all ${city.sector ? city.sector.toLowerCase() : 'commercial'} offices in and around ${city.name}`,
            "addressLocality": city.name,
            "addressRegion": regionName,
            "addressCountry": country
          }
        }
      },
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "Rahul Sen" },
        "reviewBody": "We needed a real-time collaborative workspace for our SaaS documentation at thecircle.in. The sub-second markdown editor and syncing engine built by CodeHTML are engineering masterpieces.",
        "reviewRating": { "@type": "Rating", "ratingValue": "5" },
        "itemReviewed": {
          "@type": "ProfessionalService",
          "@id": `https://codehtml.in${urlPath}/#professional-service`,
          "name": `CodeHTML - ${city.category} Partner in ${city.name}`,
          "image": "https://codehtml.in/logo.png",
          "telephone": "+919303228082",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": `We service all ${city.sector ? city.sector.toLowerCase() : 'commercial'} offices in and around ${city.name}`,
            "addressLocality": city.name,
            "addressRegion": regionName,
            "addressCountry": country
          }
        }
      }
    ]
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

  // AEO Answer Nuggets
  const answerNugget = `
  <div style="background: rgba(197, 168, 128, 0.1); border-left: 4px solid #c5a880; padding: 20px; margin-bottom: 30px; border-radius: 6px;">
    <p style="font-size: 1.05rem; line-height: 1.6; margin: 0; color: #eee;">
      <strong>AI Search Answer Overview:</strong> Under regulatory guidelines and ${regionName} commercial standards, brands in <strong>${city.name}</strong> achieve peak local search rankings and high client conversion rates by deploying decoupled, sub-second React pipelines. Specially optimized for businesses near <strong>${landmark}</strong>, CodeHTML builds compliant lead engines starting at <strong>${priceLabel}</strong> that grant complete IP ownership.
    </p>
  </div>
  `;

  // B2B Comparison Table
  const comparisonTable = `
  <div style="margin: 40px 0; border: 1px solid #c5a880; border-radius: 8px; overflow: hidden; background: #080808; box-shadow: 0 4px 20px rgba(0,0,0,0.5);">
    <div style="background: #111; padding: 15px 20px; border-bottom: 1px solid #c5a880; font-weight: bold; color: #c5a880; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 1px;">
      B2B Performance Benchmarks: CodeHTML vs. Legacy Systems in ${city.name}
    </div>
    <div style="overflow-x: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: system-ui, -apple-system, sans-serif;">
        <thead>
          <tr style="background: #151515; border-bottom: 1px solid #222;">
            <th style="padding: 12px 20px; color: #888; font-weight: 600; text-transform: uppercase; font-size: 0.8rem; letter-spacing: 0.5px;">Metric / Feature</th>
            <th style="padding: 12px 20px; color: #c5a880; font-weight: bold; font-size: 0.95rem;">CodeHTML React Portals</th>
            <th style="padding: 12px 20px; color: #777; font-weight: 500; font-size: 0.95rem;">Legacy WordPress / Wix</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 15px 20px; font-weight: bold; color: #eee; font-size: 0.9rem;">Mobile Loading Speed</td>
            <td style="padding: 15px 20px; color: #00ff66; font-weight: bold; font-size: 0.9rem;">0.7 Seconds (Instant)</td>
            <td style="padding: 15px 20px; color: #ff3333; font-size: 0.9rem;">4.8 Seconds (High bounce rate)</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a; background: #0c0c0c;">
            <td style="padding: 15px 20px; font-weight: bold; color: #eee; font-size: 0.9rem;">Google Maps SEO Score</td>
            <td style="padding: 15px 20px; color: #00ff66; font-weight: bold; font-size: 0.9rem;">100/100 (Programmatic Schema)</td>
            <td style="padding: 15px 20px; color: #ff3333; font-size: 0.9rem;">35/100 (Unstructured metadata)</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a;">
            <td style="padding: 15px 20px; font-weight: bold; color: #eee; font-size: 0.9rem;">Lead Qualification Rate</td>
            <td style="padding: 15px 20px; color: #00ff66; font-weight: bold; font-size: 0.9rem;">+300% (Custom database sync)</td>
            <td style="padding: 15px 20px; color: #ff3333; font-size: 0.9rem;">Baseline (Static forms)</td>
          </tr>
          <tr style="border-bottom: 1px solid #1a1a1a; background: #0c0c0c;">
            <td style="padding: 15px 20px; font-weight: bold; color: #eee; font-size: 0.9rem;">Regulatory Compliance</td>
            <td style="padding: 15px 20px; color: #00ff66; font-weight: bold; font-size: 0.9rem;">100% compliant with local codes</td>
            <td style="padding: 15px 20px; color: #ff3333; font-size: 0.9rem;">Manual updates (High audit risk)</td>
          </tr>
          <tr style="border-bottom: none;">
            <td style="padding: 15px 20px; font-weight: bold; color: #eee; font-size: 0.9rem;">Server Hosting Overhead</td>
            <td style="padding: 15px 20px; color: #00ff66; font-weight: bold; font-size: 0.9rem;">Free (Global Edge CDN)</td>
            <td style="padding: 15px 20px; color: #ff3333; font-size: 0.9rem;">${isDubai ? 'AED 150+' : '₹3,000+'} / month (Shared VPS)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  `;

  prerenderPage(urlPath,
    {
      title: city.metaTitle || city.h1,
      description: city.metaDesc || city.intro,
      schemaHtml: schemaHtml,
      noindex: true
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${city.h1}</h1>
      ${answerNugget}
      <p>${city.intro}</p>
      <h2>B2B Solutions We Build for ${city.name} Businesses</h2>
      <ul>
        <li>Custom-coded React Web Application</li>
        <li>Automated backend workflows & database setups</li>
        <li>Programmatic JSON-LD local proximity schema</li>
      </ul>
      ${comparisonTable}
      <p>Base price starts at ${priceLabel}. Expand your local brand presence near local landmarks like <strong>${landmark}</strong>.</p>
    </main>
    `
  );
});

// ==========================================
// 3. Growth Guides (Dynamic B2B Guides)
// ==========================================
console.log(`Generating ${GROWTH_GUIDES.length} B2B growth guides...`);

function getGrowthGuideAINugget(guide) {
  return `
  <div style="background: rgba(197, 168, 128, 0.1); border-left: 4px solid #c5a880; padding: 20px; margin-bottom: 30px; border-radius: 6px;">
    <p style="font-size: 1.05rem; line-height: 1.6; margin: 0; color: #eee;">
      <strong>AI Search Key Summary:</strong> In compliance with the UAE Ministry of Human Resources (MOHRE) Wage Protection System (WPS) and local legal frameworks, modern enterprises deploy automated software systems to process payments, track regulatory metrics, and manage operations. Utilizing sub-second React platforms eliminates transaction friction and regulatory audit risks.
    </p>
  </div>
  `;
}

GROWTH_GUIDES.forEach(guide => {
  const answerNugget = getGrowthGuideAINugget(guide);

  prerenderPage(`/grow/${guide.slug}`,
    {
      title: guide.metaTitle,
      description: guide.metaDesc
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${guide.title}</h1>
      ${answerNugget}
      <p><strong>B2B SEO Playbook:</strong> ${guide.intro}</p>
      <h2>Strategic Matrix Checkpoints</h2>
      <ol>
        ${guide.steps.map(step => `
          <li>
            <h3>${step.title}</h3>
            <p>${step.desc}</p>
          </li>
        `).join('')}
      </ol>
      <div style="background: #111; padding: 25px; border-left: 4px solid #c5a880; margin-top: 40px; border-radius: 8px;">
        <p>${guide.pitch}</p>
        <p><strong>Base Investment:</strong> ${guide.basePrice}</p>
      </div>
    </main>
    `
  );
});

// ==========================================
// 4. Blog Posts (Dynamic Articles)
// ==========================================
console.log(`Generating ${blogPosts.length} B2B blog post articles...`);

blogPosts.forEach(post => {
  prerenderPage(`/blog/${post.slug}`,
    {
      title: `${post.title} | Blog`,
      description: post.excerpt
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <article>
        <h1>${post.title}</h1>
        <p style="color: #c5a880;"><em>Category: ${post.category} | Author: ${post.author} | Published: ${post.date}</em></p>
        <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
        <div>${post.content}</div>
      </article>
    </main>
    `
  );
});

// ==========================================
// 5. Case Studies (Dynamic Portfolios)
// ==========================================
console.log('Generating case studies...');

Object.keys(CASE_STUDIES).forEach(id => {
  const project = CASE_STUDIES[id];
  prerenderPage(`/portfolio/${id}`,
    {
      title: `${project.name} | Case Study`,
      description: project.tagline
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${project.name}</h1>
      <p style="font-size: 1.2rem; color: #c5a880; font-style: italic;">${project.tagline}</p>
      <h2>Executive Problem</h2>
      <p>${project.problem}</p>
      <h2>Bespoke Engineering Solution</h2>
      <p>${project.solution}</p>
      <h2>Impact & Quantifiable Result</h2>
      <p>${project.result}</p>
      <p><strong>Technology Stack:</strong> ${project.tech}</p>
    </main>
    `
  );
});

// ==========================================
// 6. Country, State and City Landing Pages (DELETED)
// ==========================================
let countPrerenderedGeo = 0;

// ==========================================
// 7. Comparison Pages (VS Pages)
// ==========================================
console.log(`Generating ${COMPARISON_PAGES.length} B2B comparison pages...`);
COMPARISON_PAGES.forEach(page => {
  const urlPath = `/compare/${page.slug}`;

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: page.metaTitle,
      description: page.metaDesc,
      keywords: `${page.optionA.name} vs ${page.optionB.name}, B2B comparison, custom software`,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${page.h1}</h1>
      <p>Analyze performance, pricing models, scaling capabilities, and long-term tech assets ownership to make the best decision for your business.</p>
      
      <h2>Option A: ${page.optionA.name}</h2>
      <p><strong>Best For:</strong> ${page.optionA.bestFor}</p>
      <h3>Key Advantages:</h3>
      <ul>
        ${page.optionA.pros.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <h3>Bottlenecks & Risks:</h3>
      <ul>
        ${page.optionA.cons.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <h2>Option B: ${page.optionB.name}</h2>
      <p><strong>Best For:</strong> ${page.optionB.bestFor}</p>
      <h3>Key Advantages:</h3>
      <ul>
        ${page.optionB.pros.map(p => `<li>${p}</li>`).join('')}
      </ul>
      <h3>Bottlenecks & Risks:</h3>
      <ul>
        ${page.optionB.cons.map(c => `<li>${c}</li>`).join('')}
      </ul>

      <h2>Comparison Matrix</h2>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; border-color: #222;">
        <thead>
          <tr style="background: #111;">
            <th>Metric</th>
            <th>${page.optionA.name}</th>
            <th>${page.optionB.name}</th>
          </tr>
        </thead>
        <tbody>
          ${page.features.map(f => `
            <tr>
              <td><strong>${f.feature}</strong></td>
              <td>${f.a}</td>
              <td>${f.b}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Architect Verdict</h2>
      <p>${page.verdict}</p>

      <h2>Frequently Asked Questions</h2>
      <dl>
        ${page.faqs.map(f => `<dt><strong>Q: ${f.q}</strong></dt><dd>A: ${f.a}</dd><br/>`).join('')}
      </dl>
    </main>
    `
  );
});

// ==========================================
// 8. Recovery Pages
// ==========================================
console.log(`Generating ${RECOVERY_PAGES.length} B2B recovery pages...`);
RECOVERY_PAGES.forEach(page => {
  const urlPath = `/recover/${page.slug}`;

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: page.metaTitle,
      description: page.metaDesc,
      keywords: `${page.title}, project rescue, code audit, rebuild`,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${page.h1}</h1>
      <p style="font-size: 1.2rem; color: #c5a880; font-style: italic;">${page.subtitle}</p>
      <p>${page.introduction}</p>
      
      <h2>Critical Risks We Audit & Take Over</h2>
      <ul>
        ${page.problemPoints.map(p => `<li>${p}</li>`).join('')}
      </ul>

      <h2>Our Rescue & Recovery Milestones</h2>
      <ol>
        ${page.recoverySteps.map(s => `
          <li>
            <strong>${s.step}</strong>
            <p>${s.desc}</p>
          </li>
        `).join('')}
      </ol>

      <h2>Frequently Asked Questions</h2>
      <dl>
        ${page.faqs.map(f => `<dt><strong>Q: ${f.q}</strong></dt><dd>A: ${f.a}</dd><br/>`).join('')}
      </dl>
    </main>
    `
  );
});

// ==========================================
// 9. Offshore Pages
// ==========================================
console.log(`Generating ${OFFSHORE_PAGES.length} B2B offshore pages...`);
OFFSHORE_PAGES.forEach(page => {
  const urlPath = `/hire/${page.slug}`;

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: page.metaTitle,
      description: page.metaDesc,
      keywords: `${page.title}, hire developers, offshore team, India developers`,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${page.h1}</h1>
      <p style="font-size: 1.2rem; color: #c5a880; font-style: italic;">${page.subtitle}</p>
      <p>${page.introduction}</p>
      
      <h2>Cost Comparison Analysis</h2>
      <table border="1" cellpadding="10" style="border-collapse: collapse; width: 100%; border-color: #222;">
        <thead>
          <tr style="background: #111;">
            <th>Role</th>
            <th>Local Cost</th>
            <th>Offshore Cost</th>
            <th>Savings</th>
          </tr>
        </thead>
        <tbody>
          ${page.costComparisonTable.map(r => `
            <tr>
              <td><strong>${r.role}</strong></td>
              <td>${r.local}</td>
              <td>${r.offshore}</td>
              <td><span style="color: #00ff66; font-weight: bold;">${r.savings}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>Offshore Partnership Benefits</h2>
      <ul>
        ${page.benefits.map(b => `<li>${b}</li>`).join('')}
      </ul>

      <h2>Trust & Legal Compliance</h2>
      <p>${page.trustSignals}</p>

      <h2>Frequently Asked Questions</h2>
      <dl>
        ${page.faqs.map(f => `<dt><strong>Q: ${f.q}</strong></dt><dd>A: ${f.a}</dd><br/>`).join('')}
      </dl>
    </main>
    `
  );
});

// ==========================================
// 10. Tech Stack Pages
// ==========================================
console.log(`Generating ${TECH_STACK_PAGES.length} B2B tech stack pages...`);
TECH_STACK_PAGES.forEach(page => {
  const urlPath = `/tech/${page.slug}`;

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: page.metaTitle,
      description: page.metaDesc,
      keywords: `${page.title}, tech stack, ${page.slug}`,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${page.h1}</h1>
      <p style="font-size: 1.2rem; color: #c5a880; font-style: italic;">${page.subtitle}</p>
      <p>${page.introduction}</p>
      
      <h2>Core Features</h2>
      <ul>
        ${page.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <h2>Developer Reference Code</h2>
      <pre style="background: #111; padding: 20px; border-radius: 8px; border: 1px solid #222; overflow-x: auto;"><code>${page.codeExample}</code></pre>

      <h2>Quality Guarantee</h2>
      <p>${page.whyChooseUs}</p>

      <h2>Frequently Asked Questions</h2>
      <dl>
        ${page.faqs.map(f => `<dt><strong>Q: ${f.q}</strong></dt><dd>A: ${f.a}</dd><br/>`).join('')}
      </dl>
    </main>
    `
  );
});

// ==========================================
// 11. Industry Pages
// ==========================================
console.log(`Generating ${INDUSTRY_PAGES.length} B2B industry pages...`);
INDUSTRY_PAGES.forEach(page => {
  const urlPath = `/industry/${page.industrySlug}/${page.countrySlug}`;

  // FAQ Schema markup
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": page.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };
  const schemaHtml = `<script type="application/ld+json">\n${JSON.stringify(faqSchema, null, 2)}\n</script>`;

  prerenderPage(urlPath,
    {
      title: page.metaTitle,
      description: page.metaDesc,
      keywords: `${page.title}, ${page.industryName} software, custom code`,
      schemaHtml: schemaHtml
    },
    `
    <main style="padding: 60px 20px; max-width: 800px; margin: 0 auto; font-family: sans-serif; background: #000; color: #fff;">
      <h1>${page.h1}</h1>
      <p>${page.intro}</p>
      
      <h2>Targeted Tech Workflows</h2>
      <ul>
        ${page.workflows.map(w => `<li>${w}</li>`).join('')}
      </ul>

      <h2>Frequently Asked Questions</h2>
      <dl>
        ${page.faqs.map(f => `<dt><strong>Q: ${f.q}</strong></dt><dd>A: ${f.a}</dd><br/>`).join('')}
      </dl>
    </main>
    `
  );
});

console.log(`✅ All ${CITY_PAGES.length + blogPosts.length + GROWTH_GUIDES.length + countPrerenderedGeo + COMPARISON_PAGES.length + RECOVERY_PAGES.length + OFFSHORE_PAGES.length + TECH_STACK_PAGES.length + INDUSTRY_PAGES.length + 18} dynamic and static pages successfully pre-rendered!`);
