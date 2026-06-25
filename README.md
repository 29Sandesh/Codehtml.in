# CodeHTML.in — Complete Technical Documentation & 1 Lakh+ Page SEO Plan

> **For Gemini / AI Agents:** Read this entire file before making any changes. It contains the complete architecture, data flow, file map, and the exact 5-phase plan to achieve 1,00,000+ SEO pages. Do not skip any section.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Directory Structure — Every File Explained](#3-directory-structure--every-file-explained)
4. [How The Page System Works (Architecture)](#4-how-the-page-system-works-architecture)
5. [The URL Format — CRITICAL](#5-the-url-format--critical)
6. [Data Layer — All Key Files](#6-data-layer--all-key-files)
7. [How City Pages Render (CityHome Flow)](#7-how-city-pages-render-cityhome-flow)
8. [How The Prerender Build Works](#8-how-the-prerender-build-works)
9. [Current Page Count Status](#9-current-page-count-status)
10. [The 5-Phase 1 Lakh Page Plan](#10-the-5-phase-1-lakh-page-plan)
11. [Commands Reference](#11-commands-reference)
12. [Important Rules — DO NOT Break These](#12-important-rules--do-not-break-these)

---

## 1. Project Overview

**CodeHTML.in** is a premium web development agency website based in Indore, India, serving clients in UAE (Dubai), UK, USA, Singapore, and India. The site is built on React + Vite + TailwindCSS and deployed on Netlify as a fully static pre-rendered site.

**The primary SEO goal:** Generate 1,00,000+ (1 lakh+) unique, pre-rendered static HTML pages — one for every combination of (city × keyword × service) — so that the site ranks on Google for queries like:

- "saas development in mumbai"
- "website development in dubai"
- "mobile app development in london"
- "ai chatbot development in new york city"

Each page is a **complete copy of the Home page**, with dynamic text injected for the city name, service, and keyword. The page renders through `CityHome.jsx` which passes `cityData` as props to `Home.jsx`.

**Live site:** https://codehtml.in  
**Deployed on:** Netlify (static export, no SSR)  
**Contact:** +91 93032 28082 | contact@codehtml.in

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Styling | TailwindCSS + custom CSS |
| Routing | React Router DOM v6 |
| Build/Prerender | Node.js scripts (`prerender.js`, `tools/`) |
| Deployment | Netlify (static HTML, Edge CDN) |
| Data format | JS modules + JSON files in `public/data/` |
| Schema markup | JSON-LD injected during prerender |

---

## 3. Directory Structure — Every File Explained

```
codehtml.in/
│
├── README.md                    ← THIS FILE — Read before anything else
├── index.html                   ← Vite HTML entry point with all meta tags
├── vite.config.js               ← Vite build configuration
├── tailwind.config.js           ← TailwindCSS config with custom colors
├── postcss.config.js            ← PostCSS for Tailwind
├── package.json                 ← All npm scripts and dependencies
├── netlify.toml                 ← Netlify config (redirects, build command)
├── _redirects                   ← Netlify SPA redirect rule (/* → /index.html 200)
│
├── prerender.js                 ← MASTER BUILD SCRIPT — generates all static HTML files
│                                   Reads from data/, writes to dist/
│                                   Handles: city pages, blog, services, sectors, growth guides,
│                                   comparison pages, recovery pages, hire pages, tech pages
│
├── generate-sitemap.js          ← Generates sitemap.xml from all prerendered pages
│
├── data/                        ← SERVER-SIDE DATA (Node.js only, NOT imported by React)
│   ├── allCitiesDatabase.js     ← 1,500+ cities: UAE (50+), India (700+), USA (500+),
│   │                               UK (200+), Singapore (55). Used by prerender.js.
│   │                               Structure: ALL_COUNTRIES.uae.cities[], ALL_COUNTRIES.india.cities[], etc.
│   │                               Each city: { name, slug, area/state }
│   │
│   ├── allKeywordsDatabase.js   ← 680+ keywords across 7 services, 5 tiers each.
│   │                               Structure: ALL_KEYWORDS.services['website-development'].tier1[]
│   │                               Tiers: tier1 (core), tier2 (specific), tier3 (long-tail),
│   │                               competitorGap (trust), aeo (question-format)
│   │
│   ├── megaCityDatabase.js      ← EXPANDED city database with 8,300+ cities including
│   │                               lat/lng coordinates. Used by generate-mega-pages.js.
│   │                               Same structure as allCitiesDatabase but much larger.
│   │
│   ├── geoKeywordsData.js       ← City-level keyword templates (27 per city), state-level
│   │                               templates (12 per state), country hero configs, country
│   │                               AEO questions, country industry focus lists.
│   │
│   ├── cityPages.js             ← Pre-generated city page data objects (older batch, Dubai-heavy).
│   │                               Each entry: { slug, name, h1, metaTitle, metaDesc, intro,
│   │                               region, category, serviceType, pricing[], landmark }
│   │                               Used directly by prerender.js section 2 (City Pages).
│   │
│   ├── contentVariations.js     ← Text variation arrays for dynamic content injection.
│   │                               Exports: selectVariation(), generateDynamicFAQs(),
│   │                               SERVICE_INTROS{}, REGIONAL_WHY_CHOOSE{}, REGIONAL_CTA{}
│   │                               Used by cityDataClient.js fallback generator.
│   │
│   ├── blogPosts.js             ← All blog post data objects (8.7MB, many posts).
│   │                               Each: { slug, title, excerpt, content, category, author, date }
│   │
│   ├── growthGuides.js          ← B2B growth guide content (2.8MB).
│   │                               Each: { slug, title, metaTitle, metaDesc, intro, steps[], pitch, basePrice }
│   │
│   ├── comparisonPages.js       ← VS comparison pages (WordPress vs Custom, etc.)
│   │                               Each: { slug, h1, metaTitle, metaDesc, optionA, optionB,
│   │                               features[], verdict, faqs[] }
│   │
│   ├── nichePages.js            ← Recovery pages, offshore pages, tech stack pages.
│   │                               Exports: RECOVERY_PAGES[], OFFSHORE_PAGES[], TECH_STACK_PAGES[]
│   │
│   ├── industryPages.js         ← Industry x country landing pages.
│   │                               E.g., fintech-web-development-india, real-estate-dubai
│   │
│   ├── keywordPageSlugs.js      ← Pre-generated list of all keyword-city slug combinations (1.2MB).
│   │                               Used to feed prerender.js with the complete slug list.
│   │
│   ├── tierKeywordPageSlugs.js  ← Full tier-specific slug list (9MB!). All Tier1+Tier2+Tier3
│   │                               keyword slugs for all cities. Used by prerender-mega-pages.js
│   │
│   └── keywordPageSlugs.js      ← Duplicate/alternate version of slug list
│
├── public/                      ← Static files served directly by Netlify
│   ├── data/                    ← JSON data files fetched by browser (React) at runtime
│   │   ├── activeCities.json    ← Flat list of all active city slugs + coordinates.
│   │   │                           Generated by: node tools/generate-mega-pages.js
│   │   │                           Used by: cityDataClient.js fallback in browser
│   │   │
│   │   ├── cityList.json        ← Index of all prerendered city pages (for search).
│   │   ├── blogList.json        ← Index of all blog post slugs/titles.
│   │   ├── growthList.json      ← Index of all growth guide slugs/titles.
│   │   ├── countryList.json     ← Index of all country hub pages.
│   │   │
│   │   ├── cities/              ← Individual JSON files per keyword-city slug.
│   │   │   └── {slug}.json      ← E.g., saas-development-in-mumbai.json
│   │   │                           Fetched by cityDataClient.js at runtime.
│   │   │                           If this file exists, page loads instantly with rich data.
│   │   │                           If NOT found, cityDataClient falls back to activeCities.json lookup.
│   │   │
│   │   ├── blogs/               ← Individual JSON per blog post slug.
│   │   ├── growth/              ← Individual JSON per growth guide slug.
│   │   ├── countries/           ← Country/state/city hub page JSONs.
│   │   │   ├── countryList.json
│   │   │   ├── uae/             ← UAE state and city JSON files
│   │   │   ├── india/
│   │   │   ├── usa/
│   │   │   ├── uk/
│   │   │   └── singapore/
│   │   │
│   │   └── mega-chunks/         ← Chunked JSON output from generate-mega-pages.js
│   │       └── mega-pages-*.json ← Each chunk = 5,000 page metadata records
│   │
│   ├── Codehtml.logo.png        ← Main logo
│   ├── dubai_burj_khalifa.webp  ← UAE hero image
│   ├── india_tech_hub.webp      ← India hero image
│   ├── london_skyline.webp      ← UK hero image
│   ├── usa_tech_hub.webp        ← USA hero image
│   └── singapore_skyline.webp  ← Singapore hero image
│
├── src/                         ← React source code
│   ├── App.jsx                  ← Router configuration — ALL routes defined here
│   │
│   ├── components/
│   │   ├── Navbar.jsx           ← Navigation bar with service/sector dropdowns
│   │   ├── Footer.jsx           ← Footer with links (locations page link is here)
│   │   ├── WhatsAppPopup.jsx    ← Floating WhatsApp button
│   │   ├── CookieConsent.jsx    ← GDPR cookie consent bar
│   │   └── PageSkeleton.jsx     ← Loading skeleton shown during lazy load
│   │
│   ├── pages/
│   │   ├── Home.jsx             ← MASTER HOME PAGE COMPONENT
│   │   │                           Accepts props: cityName, cityCategory, cityData
│   │   │                           When cityData is provided → renders as geo city page
│   │   │                           When no props → renders as default home page
│   │   │                           This is the template for ALL 1 lakh+ pages.
│   │   │
│   │   ├── CityHome.jsx         ← GATEWAY for all geo city pages
│   │   │                           Route: /:slug (catches all flat URL slugs)
│   │   │                           1. Reads :slug from URL params
│   │   │                           2. Calls findCityBySlug(slug) from cityDataClient.js
│   │   │                           3. If found → renders <Home cityData={...} />
│   │   │                           4. If not found → renders <NotFound />
│   │   │                           Also handles legacy slug redirects (DUBAI_REDIRECTS map)
│   │   │
│   │   ├── Locations.jsx        ← /locations page — shows 5 countries (India, UAE, UK, USA, SG)
│   │   │                           Currently simple list. Needs expansion for full hub.
│   │   │
│   │   ├── CountryHome.jsx      ← Country-level hub pages (e.g. /location/uae)
│   │   ├── CountryCityHome.jsx  ← City within country pages
│   │   ├── About.jsx            ← /about page
│   │   ├── Contact.jsx          ← /contact page
│   │   ├── ServiceDetail.jsx    ← /service/:slug (e.g. /service/saas-development)
│   │   ├── SectorDetail.jsx     ← /sector/:slug (e.g. /sector/real-estate)
│   │   ├── Portfolio.jsx        ← /portfolio (project showcase)
│   │   ├── CaseStudy.jsx        ← /portfolio/:id (individual case study)
│   │   ├── Blog.jsx             ← /blog (blog listing)
│   │   ├── BlogPostDetail.jsx   ← /blog/:slug (individual post)
│   │   ├── GrowthGuide.jsx      ← /grow/:slug (B2B growth guides)
│   │   ├── ComparePage.jsx      ← /compare/:topic (VS comparison pages)
│   │   ├── RecoverPage.jsx      ← /recover/:slug (project recovery pages)
│   │   ├── HirePage.jsx         ← /hire/:slug (hire a developer pages)
│   │   ├── TechStackPage.jsx    ← /tech/:slug (technology specific pages)
│   │   ├── IndustryCountryPage.jsx ← /industry/:industry/:country
│   │   ├── FAQ.jsx              ← /faq
│   │   ├── Privacy.jsx          ← /privacy-policy
│   │   ├── Terms.jsx            ← /terms-conditions
│   │   ├── Refund.jsx           ← /refund-policy
│   │   ├── AgencyPartner.jsx    ← /partner
│   │   └── NotFound.jsx         ← 404 page
│   │
│   └── data/
│       ├── cityDataClient.js    ← CRITICAL: Data fetcher for city pages
│       │                           findCityBySlug(slug) — primary lookup from /data/cities/{slug}.json
│       │                           Fallback: reads /data/activeCities.json + allKeywordsDatabase.js
│       │                           to reconstruct city page data programmatically in browser.
│       │                           This fallback means pages work even without individual JSON files.
│       │
│       ├── servicesSectorsData.js ← SERVICES_DATA{} and SECTORS_DATA{} objects.
│       │                             Used by Navbar, ServiceDetail, SectorDetail, prerender.js
│       │
│       └── dubai_communities.json ← 56 Dubai community names for community link generation
│
├── tools/                       ← Node.js scripts (run from project root)
│   ├── generate-mega-pages.js   ← MAIN GENERATOR — creates public/data/mega-chunks/*.json
│   │                               and public/data/activeCities.json
│   │                               Uses megaCityDatabase.js (8,300+ cities) × allKeywordsDatabase.js
│   │                               Generates 3 page types:
│   │                               1. Service × City (core — all cities × all 5 tiers)
│   │                               2. Industry × City (fintech/real-estate/etc × top cities)
│   │                               3. Tech Stack × City (next.js/react/etc × top 300 cities)
│   │                               Output format per record: { slug, path, country, cityName,
│   │                               citySlug, state, serviceId, tier, keyword, type }
│   │
│   ├── prerender-mega-pages.js  ← Prerender script specifically for mega-page slugs.
│   │                               Reads tierKeywordPageSlugs.js and prerendering those pages.
│   │
│   ├── generate-city-database.js ← Script to build/update allCitiesDatabase.js or megaCityDatabase.js
│   │
│   ├── extract-bible-keywords.js ← Script to extract/process keywords from the SEO Keyword Bible
│   │
│   └── split-all-data.js        ← Splits large data files into smaller JSON chunks for public/data/
│
├── PAGES/                       ← Strategic planning documents (PDFs, Excel)
│   ├── CodeHTML_1Lakh_GeoPages (1).xlsx  ← Master spreadsheet for 1 lakh page plan
│   ├── CodeHTML_GeoPages_Implementation.pdf ← Full implementation guide
│   ├── CodeHTML_SEO_Keyword_Bible.pdf    ← All 680+ keywords across 7 services, 5 tiers
│   └── CodeHTML_SEO_Strategy.pdf        ← 90-day SEO action plan
│
└── dist/                        ← Build output (DO NOT edit manually — generated by npm run build)
    ├── index.html               ← Base HTML template
    ├── assets/                  ← Compiled JS/CSS bundles
    └── {page-slug}/
        └── index.html           ← Pre-rendered static HTML per page
```

---

## 4. How The Page System Works (Architecture)

The system has **two rendering modes**:

### Mode A — Pre-rendered Static HTML (for SEO bots and first load)
```
npm run build                    ← runs Vite build THEN prerender.js
    ↓
prerender.js runs               ← reads all data files
    ↓
Writes dist/{slug}/index.html   ← one static HTML file per page
    ↓
Netlify serves these files      ← instant load, Google can index them
```

### Mode B — Dynamic Client-Side Rendering (for URLs not pre-rendered)
```
User visits /saas-development-in-mumbai in browser
    ↓
Netlify serves dist/index.html  ← base React SPA template (_redirects rule)
    ↓
React Router: /:slug → CityHome.jsx
    ↓
CityHome calls findCityBySlug('saas-development-in-mumbai')
    ↓
cityDataClient.js: tries fetch('/data/cities/saas-development-in-mumbai.json')
    ↓
  [If JSON file exists] → returns rich pre-computed data → Home renders
  [If JSON file missing] → fallback: reads /data/activeCities.json
                            finds city by slug, matches keyword to service,
                            generates page data programmatically → Home renders
```

**Key insight:** Because of the fallback system in `cityDataClient.js`, ANY `/{keyword}-in-{city}` URL will render a valid page even WITHOUT a pre-rendered HTML or a dedicated JSON file — as long as:
- The city exists in `public/data/activeCities.json`  
- The keyword matches something in `allKeywordsDatabase.js`

---

## 5. The URL Format — CRITICAL

**Every geo city page uses a FLAT URL format:**

```
/{keyword-slug}-in-{city-slug}
```

**CORRECT examples:**
```
/website-development-in-mumbai
/saas-development-in-business-bay
/mobile-app-development-in-london
/ai-chatbot-development-in-new-york-city
/react-website-development-in-bengaluru
/custom-crm-software-development-in-dubai
/how-much-does-saas-development-cost-in-singapore
```

**WRONG — do NOT create these URL formats:**
```
/location/india/maharashtra/mumbai            ← WRONG, this is not the format
/location/india/maharashtra/mumbai/saas       ← WRONG
/india/mumbai/saas-development               ← WRONG
```

**Route in App.jsx:**
```jsx
<Route path="/:slug" element={<CityHome />} />
```
This single wildcard route catches ALL keyword-city pages. It works because specific routes like `/about`, `/service/:slug`, `/locations` are defined BEFORE the wildcard and take priority.

---

## 6. Data Layer — All Key Files

### 6.1 Services (7 Fixed Services)

| Service Name | Service ID | Tier 1 Example Keywords |
|---|---|---|
| Custom Website Development | `website-development` | website development, web design, web development |
| Web Application Development | `web-app-development` | web application development, crm development, custom erp |
| SaaS Development | `saas-development` | saas development, build a saas, saas product development |
| Mobile App Development | `mobile-app-development` | mobile app development, ios app development, react native |
| AI & Automation | `ai-automation` | ai chatbot development, whatsapp automation, ai for business |
| Startup Launch Services | `startup-launch` | mvp development, startup development, figma design |
| Growth & Digital Presence | `seo-growth` | seo services, search engine optimization, local seo |

### 6.2 Keyword Tiers (per service, from allKeywordsDatabase.js)

| Tier | Count per service | Purpose | Example |
|---|---|---|---|
| tier1 | 9–23 keywords | High volume, core | `website-development` |
| tier2 | 37–51 keywords | Specific, mid-tail | `custom-website-development` |
| tier3 | 21–34 keywords | Long-tail, niche | `website-development-for-real-estate-agency` |
| competitorGap | 5–8 keywords | Trust/authority | `clutch-top-web-development-company` |
| aeo | 8–10 keywords | Question format | `how-much-does-a-custom-website-cost` |

**Total across all 7 services: ~680+ unique keyword slugs**

### 6.3 Cities Database

| Country | File Source | Total Cities | Notes |
|---|---|---|---|
| UAE | megaCityDatabase.js | 259 areas | Full UAE coverage |
| India | megaCityDatabase.js | 4,500 cities | All states + UTs + tech hubs (sliced to 4,500 for mega) |
| USA | megaCityDatabase.js | 2,200 cities | All 50 states |
| UK | megaCityDatabase.js | 1,200 cities | England, Scotland, Wales, Northern Ireland |
| Singapore | megaCityDatabase.js | 209 areas | All 5 planning regions |
| **TOTAL (mega)** | megaCityDatabase.js | **8,368 cities** | Used by generate-mega-pages.js |

**ACTUAL CONFIRMED PAGE COUNTS (June 2026 run):**
- Metadata chunks generated: **54,13,632 page combinations** across 1,083 JSON chunk files
- Active cities JSON: 8,368 cities with lat/lng
- Duplicate combinations skipped: 358,268

### 6.4 Pricing Per Country

| Country | Currency | Startup | Growth | Enterprise |
|---|---|---|---|---|
| UAE | AED | 1,500 | 4,500 | 12,000+ |
| India | ₹ | 25,000 | 75,000 | 2,00,000+ |
| USA | $ | 500 (client) / 2,500 (mega) | 1,500 / 7,500 | 4,500+ / 25,000+ |
| UK | £ | 400 (client) / 2,000 (mega) | 1,200 / 6,000 | 3,500+ / 20,000+ |
| Singapore | SGD | 600 (client) / 3,500 (mega) | 1,800 / 9,500 | 5,000+ / 30,000+ |

---

## 7. How City Pages Render (CityHome Flow)

### Step 1: User hits URL
```
User visits: /mobile-app-development-in-austin
```

### Step 2: CityHome.jsx parses the slug
```jsx
// CityHome.jsx
const { slug } = useParams(); // "mobile-app-development-in-austin"
findCityBySlug(slug)          // calls cityDataClient.js
```

### Step 3: cityDataClient.js — Primary lookup
```javascript
// cityDataClient.js — findCityBySlug()
const res = await fetch('/data/cities/mobile-app-development-in-austin.json');
// If 200 OK → use this pre-computed rich data → done
// If 404 → go to fallback
```

### Step 4: cityDataClient.js — Fallback (programmatic generation)
```javascript
// Parse slug with regex: /^(.+)-in-([a-z0-9-]+)$/
const keywordSlug = "mobile-app-development";
const citySlug    = "austin";

// Load activeCities.json → find { n: "Austin", s: "austin", c: "usa", st: "Texas" }
// Load allKeywordsDatabase.js → match keyword to service "mobile-app-development"
// Build full page data object programmatically
// Return { name, h1, metaTitle, metaDesc, intro, pricing[], faqs[], ... }
```

### Step 5: CityHome passes data to Home.jsx
```jsx
// CityHome.jsx
return <Home cityName={cityData.name} cityCategory={cityData.category} cityData={cityData} />;
```

### Step 6: Home.jsx renders with city data
```jsx
// Home.jsx — hero section example
<h1>{cityData ? `${cityData.h1}` : "We Build Digital Products That Scale"}</h1>
<p>{cityData ? `${cityData.intro}` : "Default homepage text..."}</p>
```

**Result:** The Home page renders with city-specific H1, meta title, meta description, pricing, FAQs — but looks identical to the homepage design. This is the "1 lakh+ pages that look like a copy of home page with different text" as requested.

---

## 8. How The Prerender Build Works

### Build Command
```powershell
npm run build
# This runs: vite build && node prerender.js
```

### What prerender.js Does (in order)
1. **Static pages** → `/about`, `/contact`, `/portfolio`, `/blog`, `/partner`, etc.
2. **Service pages** → `/service/saas-development`, etc. (from servicesSectorsData.js)
3. **Sector pages** → `/sector/real-estate`, etc.
4. **City pages** → All entries from `data/cityPages.js` (the older Dubai-heavy batch)
5. **Growth guides** → `/grow/{slug}` (from growthGuides.js)
6. **Blog posts** → `/blog/{slug}` (from blogPosts.js)
7. **Case studies** → `/portfolio/{id}`
8. **Comparison pages** → `/compare/{topic}`
9. **Recovery pages** → `/recover/{slug}`
10. **Hire pages** → `/hire/{slug}`
11. **Tech stack pages** → `/tech/{slug}`
12. **Industry pages** → `/industry/{industry}/{country}`
13. **Keyword geo pages** → reads from `data/keywordPageSlugs.js` or `data/tierKeywordPageSlugs.js`

### What Each Pre-rendered Page Contains
- Correct `<title>`, `<meta name="description">`, `<meta name="keywords">`
- `<link rel="canonical">` and og/twitter meta tags
- JSON-LD LocalBusiness schema with city coordinates and service data
- AEO answer nugget paragraph for AI search snippets
- B2B performance comparison table
- Pricing section with city-specific currency
- All injected into the React root `<div>` so crawlers see real content

### Output
```
dist/
├── index.html                          ← base SPA
├── saas-development-in-mumbai/
│   └── index.html                      ← static pre-rendered city page
├── mobile-app-development-in-dubai/
│   └── index.html
├── about/
│   └── index.html
└── ... (thousands more)
```

---

## 9. Current Page Count Status

### Confirmed Build Output (June 2026)

| Step | Script | Output | Status |
|---|---|---|---|
| Standard build | `npm run build` (prerender.js) | **4,892 static pages** | ✅ Done |
| Mega metadata gen | `node tools/generate-mega-pages.js` | **54,13,632 page records** in 1,083 chunks | ✅ Done |
| Mega prerender | `npm run prerender:mega` | Stamping all 54L pages into dist/ | 🔄 Running (~4hrs) |
| Sitemap mega | `npm run sitemap:mega` | Sitemap covering all pages | ⏳ Next |

### Page Breakdown by Category (from prerender.js run)

| Category | Count |
|---|---|
| City-specific neighborhood pages | 1,239 |
| B2B blog posts | 2,071 |
| B2B growth guides | 1,500 |
| Comparison VS pages | 20 |
| Recovery/rescue pages | 5 |
| Offshore landing pages | 5 |
| Tech stack pages | 10 |
| Industry pages | 32 |
| Static core pages | 10 |
| **Subtotal (prerender.js)** | **4,892 pages** |
| **Mega geo pages (prerender:mega)** | **54,13,632 pages** |
| **GRAND TOTAL TARGET** | **~54,18,524 pages** |

> **Note:** Not all 54 lakh pages can be stored as individual HTML files on Netlify's free tier. Priority pages (UAE, India top cities, UK, USA, Singapore) will be pre-rendered. The rest are served dynamically via the `cityDataClient.js` fallback — they still work perfectly for users, just without pre-rendered HTML for crawlers. The sitemap will submit all URLs regardless.

---

## 10. The 5-Phase 1 Lakh Page Plan

### Page Count Math

```
~1,500 cities × Tier1 keywords per service (avg 12) × 7 services = ~126,000 combinations
~1,500 cities × Tier2 keywords per service (avg 40) × 7 services = ~420,000 combinations
Top 500 cities × Tier3 keywords (avg 28) × 7 services             = ~98,000 combinations

REALISTIC TARGET (accounting for overlaps and build limits):
Phase 1 + Phase 2 = ~78,000 prerendered pages
Phase 3 + Phase 4 = ~22,000 more pages
TOTAL = ~1,00,000+ pages
```

---

### PHASE 1 — Audit + Fix + Top 50 Priority Pages
**Goal:** Verify what already works, fix any broken data paths, prerender top 50 priority cities × all 7 services = ~350 priority pages.

#### Step 1.1 — Verify activeCities.json Exists
```powershell
# Check if the file was generated
dir public\data\activeCities.json
```
If it doesn't exist, run: `node tools/generate-mega-pages.js`

This creates `public/data/activeCities.json` — the list of all active city slugs with lat/lng.  
Without this file, the CityHome fallback cannot find city data and every page shows NotFound.

#### Step 1.2 — Test City Pages on Dev Server
```powershell
npm run dev
```
Visit these URLs on localhost:5173:
- http://localhost:5173/website-development-in-dubai
- http://localhost:5173/saas-development-in-mumbai
- http://localhost:5173/mobile-app-development-in-london
- http://localhost:5173/ai-chatbot-development-in-new-york-city

**Expected:** Full Home page renders with city name in the H1. If NotFound shows, the fallback is broken.

**How to debug if broken:**
1. Open browser DevTools → Network tab
2. Look for `/data/activeCities.json` request → must return 200
3. If 404 → run `node tools/generate-mega-pages.js` first
4. If 200 but page still NotFound → check cityDataClient.js regex match logic

#### Step 1.3 — Count Existing Prerendered Pages
```powershell
# Count all prerendered page directories in dist/
(Get-ChildItem -Path dist -Directory -Recurse | Where-Object { (Get-ChildItem $_.FullName -Filter "index.html").Count -gt 0 }).Count
```

#### Step 1.4 — Add Top 50 Priority Cities to prerender.js
Open `prerender.js` and find the section that generates keyword geo pages (around line 650+).  
Add explicit entries for the top 50 priority city × service combinations:

**Top Priority Cities:**
- UAE: dubai, business-bay, difc, abu-dhabi, sharjah
- India: mumbai, delhi, bengaluru, hyderabad, pune, chennai, ahmedabad, kolkata, indore, noida
- UK: london, manchester, birmingham, edinburgh, bristol
- USA: new-york-city, los-angeles, chicago, austin, san-francisco, seattle, miami
- Singapore: cbd-singapore, marina-bay, jurong-east

**Top 7 Services (slugs):** website-development, web-app-development, saas-development, mobile-app-development, ai-automation, startup-launch, seo-growth

Example addition to prerender.js:
```javascript
// Priority Geo Pages - Top Cities × All 7 Services
const PRIORITY_CITIES = [
  { name: 'Dubai', slug: 'dubai', country: 'uae', state: 'Dubai' },
  { name: 'Mumbai', slug: 'mumbai', country: 'india', state: 'Maharashtra' },
  { name: 'London', slug: 'london', country: 'uk', state: 'Greater London' },
  { name: 'New York City', slug: 'new-york-city', country: 'usa', state: 'New York' },
  // ... add all 50 cities
];

const PRIORITY_SERVICE_KEYWORDS = [
  'website-development', 'web-app-development', 'saas-development',
  'mobile-app-development', 'ai-chatbot-development', 'mvp-development', 'seo-services'
];

PRIORITY_CITIES.forEach(city => {
  PRIORITY_SERVICE_KEYWORDS.forEach(keyword => {
    const slug = `${keyword}-in-${city.slug}`;
    prerenderPage(`/${slug}`, { title: `...`, description: `...` }, `...html...`);
  });
});
```

#### Step 1.5 — Run Build and Verify
```powershell
npm run build
# Spot check the output
dir dist\website-development-in-dubai\index.html
dir dist\saas-development-in-mumbai\index.html
```

---

### PHASE 2 — Generate All ~78,000 Keyword-City Pages
**Goal:** Add ALL 1,500 cities × Tier 1 + Tier 2 keywords (all 7 services) to prerender.js output.

#### Step 2.1 — Understand keywordPageSlugs.js
```javascript
// data/keywordPageSlugs.js contains pre-computed slug arrays
// Check its structure:
import { KEYWORD_PAGE_SLUGS } from './data/keywordPageSlugs.js';
// It's likely: { dubai: ['website-development-in-dubai', ...], mumbai: [...], ... }
// Or: ['website-development-in-dubai', 'website-development-in-mumbai', ...]
```

Open `data/keywordPageSlugs.js` (first 50 lines) to understand the structure, then add to prerender.js:

```javascript
// In prerender.js — add this section after existing city pages
import { KEYWORD_PAGE_SLUGS } from './data/keywordPageSlugs.js';

console.log(`Generating ${KEYWORD_PAGE_SLUGS.length} keyword geo pages...`);

KEYWORD_PAGE_SLUGS.forEach(slug => {
  // Parse city name from slug for SEO data
  const match = slug.match(/^(.+)-in-([a-z0-9-]+)$/);
  if (!match) return;
  
  const keyword = match[1].replace(/-/g, ' ');
  const citySlug = match[2];
  const cityName = citySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  prerenderPage(`/${slug}`,
    {
      title: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} in ${cityName} | CodeHTML`,
      description: `Best ${keyword} in ${cityName}. CodeHTML builds custom websites, apps, and software for ${cityName} businesses. Get a free quote today.`,
      schemaHtml: `<script type="application/ld+json">${JSON.stringify({ "@context":"https://schema.org","@type":"ProfessionalService","name":`CodeHTML - ${keyword} in ${cityName}`,"url":`https://codehtml.in/${slug}`,"telephone":"+919303228082" })}</script>`
    },
    `<main style="padding:60px 20px;max-width:800px;margin:0 auto;font-family:sans-serif;background:#000;color:#fff;">
      <h1>${keyword.charAt(0).toUpperCase() + keyword.slice(1)} in ${cityName}</h1>
      <p>CodeHTML provides expert ${keyword} services in ${cityName}. We build custom, high-performance digital products for local businesses.</p>
      <p><strong>Get a free quote:</strong> WhatsApp +91 93032 28082 | contact@codehtml.in</p>
    </main>`
  );
});
```

#### Step 2.2 — Run the Full Build
```powershell
# This will take 15-60 minutes depending on page count
npm run build
```

Expected output count in dist/:
```
Total pages: ~78,000+
```

#### Step 2.3 — Deploy to Netlify
Upload the entire `dist/` folder to Netlify via drag-and-drop or Netlify CLI:
```powershell
npx netlify-cli deploy --dir=dist --prod
```

#### Step 2.4 — Spot Check Live Pages
Visit 10 random pages on the live domain:
- https://codehtml.in/saas-development-in-mumbai
- https://codehtml.in/mobile-app-development-in-austin
- https://codehtml.in/website-development-in-london
- https://codehtml.in/ai-chatbot-development-in-singapore

Each must return HTTP 200 (not 404) and show the full page.

---

### PHASE 3 — Locations Page Hub + Internal Linking
**Goal:** Make the `/locations` page a proper SEO hub that links to all country/state/city pages. Improve internal linking across all geo pages.

#### Step 3.1 — Expand Locations.jsx

Current state of `src/pages/Locations.jsx`: Shows just 5 country names.

New structure to implement:

```jsx
// src/pages/Locations.jsx

// Section 1: 5 Country Hub links
// Link each country name to its top keyword page:
// India    → /website-development-in-india
// UAE      → /website-development-in-dubai
// UK       → /website-development-in-london
// USA      → /website-development-in-new-york-city
// Singapore → /website-development-in-singapore

// Section 2: Top 30 Cities (6 per country)
// India: Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai
// UAE: Dubai, Business Bay, Abu Dhabi, Sharjah, DIFC, JLT
// UK: London, Manchester, Birmingham, Edinburgh, Bristol, Leeds
// USA: New York City, Los Angeles, Chicago, Austin, San Francisco, Seattle
// Singapore: CBD, Marina Bay, Jurong East, Tampines, Woodlands, Changi

// Section 3: Browse by Service (7 service pills)
// Each links to /{service}-in-{top city}
```

#### Step 3.2 — Add Breadcrumbs to CityHome.jsx

In `CityHome.jsx`, above the `<Home>` render, add a breadcrumb:
```jsx
// Home > Locations > {country} > {state} > {city} > {service}
<nav aria-label="breadcrumb">
  <a href="/">Home</a> &gt; 
  <a href="/locations">Locations</a> &gt; 
  <a href={`/website-development-in-${cityData.region}`}>{cityData.region}</a> &gt;
  <span>{cityData.name}</span>
</nav>
```

#### Step 3.3 — Add "More Cities" Section to CityHome.jsx

At the bottom of each city page, show nearby/related city links:
- For India cities: show 4 other cities in the same state
- For UAE: show other Dubai areas
- Link them to the same service keyword: `/{same-keyword}-in-{nearby-city-slug}`

#### Step 3.4 — Add Geo Links to Footer.jsx

In `src/components/Footer.jsx`, add a "Top Locations" column:
```
Top Locations:
Dubai | Mumbai | London | New York City
Bengaluru | Singapore | Austin | Manchester
Business Bay | Delhi | Hyderabad | San Francisco
```

Each links to `/website-development-in-{city-slug}`.

#### Step 3.5 — Pre-render the Locations Page

In `prerender.js`, add:
```javascript
prerenderPage('/locations',
  {
    title: 'Web Development Services Worldwide | CodeHTML Locations',
    description: 'CodeHTML delivers premium web development, SaaS, and mobile app services in India, UAE, UK, USA, and Singapore. Find your city.'
  },
  `<main>...locations hub HTML...</main>`
);
```

---

### PHASE 4 — Tier 3 + AEO Pages for Top 50 Cities
**Goal:** Add long-tail (Tier 3) and question-format (AEO) pages for priority cities to push count past 1 lakh.

#### Step 4.1 — Extract Tier 3 Slugs
In `data/tierKeywordPageSlugs.js` (9MB), Tier 3 slugs already exist.
Add them to prerender.js for the top 50 priority cities only:

```javascript
import { TIER3_PAGE_SLUGS } from './data/tierKeywordPageSlugs.js';

// Filter to only top 50 priority city slugs
const PRIORITY_CITY_SLUGS = ['dubai', 'mumbai', 'bengaluru', 'london', 'new-york-city', ...];

const tier3PriorityPages = TIER3_PAGE_SLUGS.filter(slug => {
  const match = slug.match(/^(.+)-in-([a-z0-9-]+)$/);
  return match && PRIORITY_CITY_SLUGS.includes(match[2]);
});
```

#### Step 4.2 — AEO Question Pages

AEO pages have question-format URLs. Examples:
- `/how-much-does-saas-development-cost-in-mumbai`
- `/how-long-does-it-take-to-build-a-website-in-dubai`
- `/what-is-the-best-mobile-app-development-company-in-london`

These already exist as AEO tier keywords in `allKeywordsDatabase.js`.
Generate them the same way as Tier 1/2 pages but with special FAQPage JSON-LD schema.

#### Step 4.3 — Page Count After Phase 4
```
Phase 2 base pages:    ~78,000
Tier 3 priority pages: ~9,800  (50 cities × 28 avg × 7 services)
AEO priority pages:    ~3,150  (50 cities × 9 avg × 7 services)
Hub + static pages:    ~500
───────────────────────────────
TOTAL:                 ~91,450+ pages
```

---

### PHASE 5 — Sitemap + Google Search Console Submission
**Goal:** Submit all pages to Google for indexing.

#### Step 5.1 — Generate Sitemap
```powershell
node generate-sitemap.js
```
This creates `sitemap.xml` in the project root. Verify it contains all URLs.

#### Step 5.2 — Copy Sitemap to dist/
```powershell
copy sitemap.xml dist\sitemap.xml
```

#### Step 5.3 — Submit to Google Search Console
1. Go to https://search.google.com/search-console
2. Select codehtml.in property
3. Go to Sitemaps in left menu
4. Click "Add a new sitemap"
5. Enter: `sitemap.xml`
6. Click Submit

#### Step 5.4 — Monitor Indexing
Check Google Search Console Coverage report daily:
- "Valid" pages count should increase week over week
- "Excluded" pages should decrease
- "Error" pages need immediate attention

---

## 11. Commands Reference

```powershell
# Start development server (hot reload)
npm run dev

# Build (Vite compile + prerender.js runs automatically)
npm run build

# Preview production build locally
npm run preview

# Generate mega page metadata chunks (5M+ combinations)
# Output: public/data/mega-chunks/*.json + public/data/activeCities.json
node tools/generate-mega-pages.js

# Generate sitemap.xml
node generate-sitemap.js

# Split large data files into smaller JSON chunks
node tools/split-all-data.js

# Deploy to Netlify (requires netlify CLI)
npx netlify deploy --dir=dist --prod
```

---

## 12. Important Rules — DO NOT Break These

### Rule 1: Never change the URL format
All geo pages MUST follow `/{keyword-slug}-in-{city-slug}`. Never use nested paths like `/location/india/...`.

### Rule 2: Never modify dist/ directly
The `dist/` folder is generated automatically by `npm run build`. Any manual edits will be overwritten on next build.

### Rule 3: Home.jsx is the master template
Every geo city page ultimately renders `<Home cityData={...} />`. The Home component must always support the `cityData` prop. Do not refactor Home.jsx to break this prop interface.

### Rule 4: cityDataClient.js fallback must stay working
The programmatic fallback in `cityDataClient.js` (lines 75–194) is what makes ALL 1 lakh+ pages work even without individual JSON files. Do not remove or break this fallback logic.

### Rule 5: prerender.js must run after Vite build
The npm run build command in package.json must be: `"build": "vite build && node prerender.js"`. The `&&` ensures prerender.js runs AFTER Vite finishes. Never change this order.

### Rule 6: activeCities.json must exist before pages can work
Run `node tools/generate-mega-pages.js` at least once to create `public/data/activeCities.json`. Without it, ALL city pages show NotFound in the browser.

### Rule 7: Keyword slugs come from allKeywordsDatabase.js
Never hard-code keyword slugs. Always reference them from `data/allKeywordsDatabase.js`. The slug format is: lowercase, spaces to hyphens, no special chars.

### Rule 8: City slugs come from allCitiesDatabase.js or megaCityDatabase.js
Never hard-code city slugs. Always reference the database files. The `area` field (for UAE) or `state` field (for India/USA/UK) is used for grouping.

### Rule 9: Do not change the 7 service IDs
The service IDs are fixed identifiers used throughout the entire codebase:
`website-development`, `web-app-development`, `saas-development`, `mobile-app-development`, `ai-automation`, `startup-launch`, `seo-growth`

### Rule 10: Always test locally before deploying
Before uploading to Netlify, always run `npm run dev` and test at least 5 random city pages to verify they render correctly.

---

## About the Business

**CodeHTML Tech Studio**  
Premium custom web & software development agency  
Founded by: Sandesh Agrawal  
Based in: Indore, Madhya Pradesh, India  
Serving: UAE (Dubai), UK, USA, Singapore, India  
Contact: +91 93032 28082  
Email: contact@codehtml.in  
WhatsApp: https://wa.me/919303228082

**Flagship Services:**
1. Custom Website Development (React/Next.js, not WordPress)
2. Web Application Development (CRM, ERP, dashboards)
3. SaaS Product Development (multi-tenant, subscription billing)
4. Mobile App Development (React Native, iOS + Android)
5. AI & Automation (WhatsApp bots, ChatGPT integration, workflow automation)
6. Startup Launch Services (MVP development, Figma design, technical co-founder)
7. Growth & Digital Presence (SEO, GA4, Core Web Vitals)

**USP:** 100% hand-coded, no WordPress/Wix, sub-second loading, 100% IP ownership, fixed-price packages, NDA protected.

---

*Last updated: June 2026 — Gemini AI Agents: Read this file fully before any code changes.*
