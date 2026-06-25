# CodeHTML.in → GO-Globe Style Restructure Plan

> **Goal**: Reorganize the entire site navigation and page structure to mirror GO-Globe.com's category model — Products, AI Solutions, Get More Customers, Services, Projects, Pricing, Company — while preserving all existing content and partner/company pages untouched.

---

## Table of Contents

1. [Current vs New Navigation](#1-current-vs-new-navigation)
2. [What Gets Removed / Renamed / Moved](#2-what-gets-removed--renamed--moved)
3. [New Navigation Structure (Full Breakdown)](#3-new-navigation-structure-full-breakdown)
4. [Complete New Pages Required](#4-complete-new-pages-required)
5. [Mapping Existing Content → New Structure](#5-mapping-existing-content--new-structure)
6. [Route Architecture](#6-route-architecture)
7. [Reusable Page Templates](#7-reusable-page-templates)
8. [MegaMenu Component Spec](#8-megamenu-component-spec)
9. [Implementation Phases](#9-implementation-phases)
10. [Files to Delete](#10-files-to-delete)
11. [Mobile Behavior](#11-mobile-behavior)
12. [SEO Migration Checklist](#12-seo-migration-checklist)

---

## 1. Current vs New Navigation

### Current Header (7 items + CTA)

| # | Item | Type | Dropdown Items |
|---|------|------|---------------|
| 1 | HOME | Direct link | — |
| 2 | SERVICES ▼ | Dropdown | 7 services |
| 3 | SECTORS ▼ | Dropdown | 8 sectors |
| 4 | PORTFOLIO | Direct link | — |
| 5 | ABOUT ▼ | Dropdown | Our Profile, FAQ, Blog, Resources |
| 6 | TOOLS | Direct link | — |
| 7 | PARTNER | Direct link | — |
| — | START YOUR PROJECT ➲ | CTA Button | → /contact |

### New Header (7 items + CTA)

| # | Item | Type | Dropdown Columns |
|---|------|------|-----------------|
| 1 | **PRODUCTS** ▼ | Mega dropdown | 3 columns (15 items) |
| 2 | **AI SOLUTIONS** ▼ | Mega dropdown | 2 columns (9 items) |
| 3 | **GET MORE CUSTOMERS** ▼ | Mega dropdown | 3 columns (13 items) |
| 4 | **SERVICES** ▼ | Mega dropdown | 3 columns (14 items) |
| 5 | **PROJECTS** | Direct link | — (renamed from Portfolio) |
| 6 | **PRICING** | Direct link | — (already exists) |
| 7 | **COMPANY** ▼ | Dropdown | Our Profile, FAQ, Blog, Resources, Partner |
| — | **START PROJECT ➲** | CTA Button | → /contact |

**Changes summary:**
- ❌ HOME — **removed** (logo click goes to `/`)
- ❌ SECTORS — **deleted entirely** (sector content absorbed into Products)
- ❌ TOOLS — **deleted entirely** (page was already a maintenance placeholder)
- 🔄 SERVICES → **PRODUCTS** (existing 7 services become base for 15 products)
- ➕ AI SOLUTIONS — **new** (9 pages)
- ➕ GET MORE CUSTOMERS — **new** (13 pages)
- ➕ SERVICES — **new restructured** (14 items across Websites, Mobile, Consulting)
- 🔄 PORTFOLIO → **PROJECTS** (label rename only)
- 🔄 ABOUT → **COMPANY** (label rename, dropdown unchanged + Partner added)
- 🔄 PARTNER → **moved into Company dropdown** (page untouched)

---

## 2. What Gets Removed / Renamed / Moved

### Removed from Header
| Item | Action | Reason |
|------|--------|--------|
| HOME | Remove nav item | Logo already links to `/`. GO-Globe doesn't have Home in nav either. |
| SECTORS | Remove entirely | Sector content gets absorbed into Product pages as industry context. Not a separate nav item. |
| TOOLS | Remove entirely | `Tools.jsx` is a maintenance placeholder page with `noindex`. Delete it. |

### Renamed
| Old | New | Code Change |
|-----|-----|-------------|
| SERVICES | PRODUCTS | Label + dropdown content change in `Navbar.jsx` |
| PORTFOLIO | PROJECTS | Label change only in `Navbar.jsx` |
| ABOUT | COMPANY | Label change only in `Navbar.jsx` |

### Moved
| Item | From | To |
|------|------|----|
| PARTNER | Top-level nav item | Nested inside COMPANY dropdown |

### Untouched (No changes)
- **PRICING** — stays as direct link
- **Company dropdown contents** — Our Profile, FAQ, Blog, Resources stay exactly as they are
- **Partner page & Partner Dashboard** — zero changes to functionality or content
- **CTA Button** — stays (text already says "START PROJECT ➲")

---

## 3. New Navigation Structure (Full Breakdown)

### 3.1 PRODUCTS ▼ (3 columns, 15 items)

Inspired by GO-Globe's Products dropdown. Routes: `/products/[slug]`

| Column: Business Portals | Column: Business Management Systems | Column: Online Stores & Marketplaces |
|--------------------------|-------------------------------------|--------------------------------------|
| Customer Portal (Extranet) | ERP System | Online Store |
| Supplier Portal (Extranet) | CRM System | Multi-Vendor Marketplace |
| Employee Portal (Intranet) | Hospital System | B2B Store |
| Partner Portal (Extranet) | School System | Booking System |
| | Fleet Management | POS System |
| | Document Management | |

---

### 3.2 AI SOLUTIONS ▼ (2 columns, 9 items)

Inspired by GO-Globe's AI Solutions dropdown. Routes: `/ai-solutions/[slug]`

| Column: Add AI to Your Profit | Column: Automate to Dominate |
|-------------------------------|------------------------------|
| AI Voice & Chatbots | Agents & Processes |
| AI Consultancy | AI Customer Support Agent |
| AI Search | Revenue Automation |
| AI Sales Agent | Client Control |
| | Finance & Structure |

---

### 3.3 GET MORE CUSTOMERS ▼ (3 columns, 13 items)

Inspired by GO-Globe's Get More Customers dropdown. Routes: `/get-more-customers/[slug]`

| Column: Traditional Google Search (SEO) | Column: AEO Search Optimization | Column: Reports & Dashboards |
|----------------------------------------|----------------------------------|------------------------------|
| Website SEO | AEO (Answer Engine Optimization) | Sales Dashboards |
| Local SEO | AI-Friendly Websites | Smart Reports |
| E-commerce SEO | Conversion Optimization | Performance Analytics |
| Email & SMS | Smart Content Services | |
| | Smart Pop-ups | |
| | Lead Capture Forms | |

---

### 3.4 SERVICES ▼ (3 columns, 14 items)

Inspired by GO-Globe's Services dropdown. Routes: `/services/[slug]`

| Column: Websites & Digital Platforms | Column: Mobile Apps | Column: Strategic Consulting |
|--------------------------------------|---------------------|------------------------------|
| Corporate Websites | Mobile Apps | Digital Transformation Strategy |
| Custom Web Applications | Hybrid Apps | AI Readiness Assessment |
| Responsive Design | Progressive Web Apps | Technology Roadmap Development |
| WordPress & CMS | Cross-Platform | Business Process Optimization |
| Payment Integration | | |
| Shipping Integration | | |

---

### 3.5 PROJECTS (Direct Link)

- Label change from "Portfolio" to "Projects"
- Route stays `/portfolio` (no URL change needed — avoids breaking existing links/SEO)
- Page content: **no changes**

---

### 3.6 PRICING (Direct Link)

- Already exists at `/pricing`
- **No changes**

---

### 3.7 COMPANY ▼ (Single column, 5 items)

| Item | Route | Notes |
|------|-------|-------|
| Our Profile | `/about` | Unchanged |
| FAQ | `/faq` | Unchanged |
| Blog | `/blog` | Unchanged |
| Resources | `/resources` | Unchanged |
| **Partner** | `/partner` | **Moved here from top-level** |

---

## 4. Complete New Pages Required

### Total count: ~51 new page routes

> **Strategy**: Build ONE reusable template component per category, then drive content from a data file — exactly like the current `ServiceDetail.jsx` + `servicesSectorsData.js` pattern.

### 4.1 Products — 15 pages

| # | Page | Slug | Existing Content to Reuse |
|---|------|------|--------------------------|
| 1 | Customer Portal | `/products/customer-portal` | The Circle project (portfolio) — white-label workspace SaaS |
| 2 | Supplier Portal | `/products/supplier-portal` | Web App Dev service content — portals & dashboards |
| 3 | Employee Portal | `/products/employee-portal` | Web App Dev service — internal tools, HR dashboards |
| 4 | Partner Portal | `/products/partner-portal` | Existing Partner Dashboard as reference build proof |
| 5 | ERP System | `/products/erp-system` | Web App Dev + SaaS Dev content overlap |
| 6 | CRM System | `/products/crm-system` | Web App Dev — CRM references in current service page |
| 7 | Hospital System | `/products/hospital-system` | Healthcare sector data + Clinic niche page content |
| 8 | School System | `/products/school-system` | **Fully new** — no existing content |
| 9 | Fleet Management | `/products/fleet-management` | Luxury Rentals sector — fleet galleries, booking |
| 10 | Document Management | `/products/document-management` | **Fully new** — no existing content |
| 11 | Online Store | `/products/online-store` | E-commerce sector data + Custom Website Dev |
| 12 | Multi-Vendor Marketplace | `/products/multi-vendor-marketplace` | **Partially new** — e-commerce sector mentions marketplaces |
| 13 | B2B Store | `/products/b2b-store` | **Fully new** — no existing content |
| 14 | Booking System | `/products/booking-system` | Hospitality sector — booking systems, yacht charters |
| 15 | POS System | `/products/pos-system` | Restaurant niche page — POS mentions |

### 4.2 AI Solutions — 9 pages

| # | Page | Slug | Existing Content to Reuse |
|---|------|------|--------------------------|
| 1 | AI Voice & Chatbots | `/ai-solutions/ai-voice-chatbots` | AIAutomation.jsx — WhatsApp bots, conversational AI |
| 2 | AI Consultancy | `/ai-solutions/ai-consultancy` | **Mostly new** — can pull from AI service intro |
| 3 | AI Search | `/ai-solutions/ai-search` | **Fully new** |
| 4 | AI Sales Agent | `/ai-solutions/ai-sales-agent` | **Fully new** |
| 5 | Agents & Processes | `/ai-solutions/agents-and-processes` | AIAutomation.jsx — API sync, data scraping, automation |
| 6 | AI Customer Support Agent | `/ai-solutions/ai-customer-support-agent` | **Mostly new** — can reference WhatsApp bot work |
| 7 | Revenue Automation | `/ai-solutions/revenue-automation` | **Fully new** |
| 8 | Client Control | `/ai-solutions/client-control` | **Fully new** |
| 9 | Finance & Structure | `/ai-solutions/finance-and-structure` | **Fully new** |

### 4.3 Get More Customers — 13 pages

| # | Page | Slug | Existing Content to Reuse |
|---|------|------|--------------------------|
| 1 | Website SEO | `/get-more-customers/website-seo` | GrowthDigitalPresence.jsx — SEO, analytics |
| 2 | Local SEO | `/get-more-customers/local-seo` | GrowthDigitalPresence.jsx — Google Business Optimization |
| 3 | E-commerce SEO | `/get-more-customers/ecommerce-seo` | **Mostly new** — some overlap with e-commerce sector |
| 4 | Email & SMS | `/get-more-customers/email-and-sms` | **Fully new** |
| 5 | AEO (Answer Engine Optimization) | `/get-more-customers/aeo` | FAQ has AEO content + Growth service mentions it |
| 6 | AI-Friendly Websites | `/get-more-customers/ai-friendly-websites` | **Fully new** |
| 7 | Conversion Optimization | `/get-more-customers/conversion-optimization` | **Fully new** |
| 8 | Smart Content Services | `/get-more-customers/smart-content-services` | **Fully new** |
| 9 | Smart Pop-ups | `/get-more-customers/smart-popups` | **Fully new** |
| 10 | Lead Capture Forms | `/get-more-customers/lead-capture-forms` | **Fully new** |
| 11 | Sales Dashboards | `/get-more-customers/sales-dashboards` | **Fully new** |
| 12 | Smart Reports | `/get-more-customers/smart-reports` | **Fully new** |
| 13 | Performance Analytics | `/get-more-customers/performance-analytics` | **Fully new** — can reference current analytics mentions |

### 4.4 Services — 14 pages

| # | Page | Slug | Existing Content to Reuse |
|---|------|------|--------------------------|
| 1 | Corporate Websites | `/services/corporate-websites` | CustomWebsiteDevelopment.jsx — business/corporate sites |
| 2 | Custom Web Applications | `/services/custom-web-applications` | WebApplicationDevelopment.jsx — CRM, ERP, dashboards |
| 3 | Responsive Design | `/services/responsive-design` | **Partially new** — referenced across all service pages |
| 4 | WordPress & CMS | `/services/wordpress-and-cms` | **New positioning needed** — current brand is anti-WordPress, but GO-Globe offers it. Decide: offer it or explain why custom is better |
| 5 | Payment Integration | `/services/payment-integration` | **Partially new** — Stripe billing mentioned in SaaS Dev |
| 6 | Shipping Integration | `/services/shipping-integration` | **Fully new** |
| 7 | Mobile Apps | `/services/mobile-apps` | MobileAppDevelopment.jsx — React Native iOS/Android |
| 8 | Hybrid Apps | `/services/hybrid-apps` | **Partially new** — React Native is hybrid by nature |
| 9 | Progressive Web Apps | `/services/progressive-web-apps` | **Mostly new** — can build from Web App Dev content |
| 10 | Cross-Platform | `/services/cross-platform` | **Partially new** — React Native is cross-platform |
| 11 | Digital Transformation Strategy | `/services/digital-transformation-strategy` | **Fully new** — consulting offering |
| 12 | AI Readiness Assessment | `/services/ai-readiness-assessment` | **Fully new** — consulting offering |
| 13 | Technology Roadmap Development | `/services/technology-roadmap-development` | **Fully new** — consulting offering |
| 14 | Business Process Optimization | `/services/business-process-optimization` | **Fully new** — consulting offering |

---

## 5. Mapping Existing Content → New Structure

### Existing Service Pages → Where They Go

| Current Service | Current Route | New Home | Action |
|----------------|--------------|----------|--------|
| Custom Website Development | `/service/custom-website-development` | `/services/corporate-websites` | Content migrates. Old route 301 redirects. |
| Web Application Development | `/service/web-application-development` | `/services/custom-web-applications` | Content migrates. Old route 301 redirects. |
| SaaS Development | `/service/saas-development` | Absorbed into Products (ERP, CRM, etc.) | Content split across product pages. Old route 301 redirects. |
| Mobile App Development | `/service/mobile-app-development` | `/services/mobile-apps` | Content migrates. Old route 301 redirects. |
| AI & Automation | `/service/ai-automation` | `/ai-solutions/ai-voice-chatbots` + others | Content split across AI Solutions pages. Old route 301 redirects. |
| Startup Launch Services | `/service/startup-launch-services` | Absorbed into Services (consulting) | Content distributed. Old route 301 redirects. |
| Growth & Digital Presence | `/service/growth-digital-presence` | `/get-more-customers/website-seo` + others | Content split across Get More Customers pages. Old route 301 redirects. |

### Existing Sector Pages → Where They Go

| Current Sector | Current Route | New Home | Action |
|---------------|--------------|----------|--------|
| Real Estate | `/sector/real-estate` | Context for Products (CRM, Online Store) | Content absorbed. 301 redirect to most relevant product. |
| Hospitality | `/sector/hospitality` | Context for Products (Booking System) | Content absorbed. 301 redirect. |
| Professional Services | `/sector/professional-services` | Context for Services (Corporate Websites) | Content absorbed. 301 redirect. |
| E-commerce | `/sector/e-commerce` | Context for Products (Online Store, Multi-Vendor) | Content absorbed. 301 redirect. |
| Healthcare | `/sector/healthcare` | Context for Products (Hospital System) | Content absorbed. 301 redirect. |
| Tech Startups | `/sector/tech-startups` | Context for Products (ERP, CRM) + Services | Content absorbed. 301 redirect. |
| Luxury Rentals | `/sector/luxury-rentals` | Context for Products (Fleet Management, Booking) | Content absorbed. 301 redirect. |
| Family Offices | `/sector/family-offices` | Context for Services (Corporate Websites) | Content absorbed. 301 redirect. |

### Existing Niche Pages → Keep As-Is

| Page | Route | Action |
|------|-------|--------|
| Restaurant Website Dubai | `/restaurant-website-design-dubai` | **Keep** — standalone SEO landing page |
| Clinic Website Dubai | `/clinic-website-design-dubai` | **Keep** — standalone SEO landing page |
| Real Estate Website Dubai | `/real-estate-website-design-dubai` | **Keep** — standalone SEO landing page |

These are geo-specific SEO pages, not nav items. They stay.

---

## 6. Route Architecture

### New Routes to Add in `App.jsx`

```
# Products (15 routes — one dynamic handler)
/products                             → ProductsIndex (overview page)
/products/:slug                       → ProductDetail (template page)

# AI Solutions (9 routes — one dynamic handler)
/ai-solutions                         → AISolutionsIndex (overview page)
/ai-solutions/:slug                   → AISolutionDetail (template page)

# Get More Customers (13 routes — one dynamic handler)
/get-more-customers                   → GetMoreCustomersIndex (overview page)
/get-more-customers/:slug             → GetMoreCustomersDetail (template page)

# Services (14 routes — one dynamic handler)  
/services                             → ServicesIndex (overview page)
/services/:slug                       → ServiceDetailNew (template page)
```

### Routes to Add 301 Redirects For

```
# Old service routes → new locations
/service/custom-website-development     → /services/corporate-websites
/service/web-application-development    → /services/custom-web-applications
/service/saas-development               → /products/erp-system
/service/mobile-app-development         → /services/mobile-apps
/service/ai-automation                  → /ai-solutions/ai-voice-chatbots
/service/startup-launch-services        → /services/digital-transformation-strategy
/service/growth-digital-presence        → /get-more-customers/website-seo

# Old sector routes → relevant product/service
/sector/real-estate                     → /products/crm-system
/sector/hospitality                     → /products/booking-system
/sector/professional-services           → /services/corporate-websites
/sector/e-commerce                      → /products/online-store
/sector/healthcare                      → /products/hospital-system
/sector/tech-startups                   → /products/erp-system
/sector/luxury-rentals                  → /products/fleet-management
/sector/family-offices                  → /services/corporate-websites

# Old misc routes
/tools                                 → /  (homepage, since Tools was a placeholder)
```

### Routes to Keep Unchanged

```
/                    → Home
/portfolio           → Portfolio (label changes to "Projects" in nav, URL stays)
/pricing             → Pricing
/about               → About
/faq                 → FAQ
/blog                → Blog
/blog/:slug          → BlogPostDetail
/contact             → Contact
/partner             → AgencyPartner
/partner/dashboard   → PartnerDashboard
/resources           → Resources
/privacy-policy      → Privacy
/terms-conditions    → Terms
/refund-policy       → Refund
# ... all city pages, growth guides, compare pages, etc. stay
```

---

## 7. Reusable Page Templates

### Strategy: 4 Template Components + 4 Data Files

Instead of creating 51 individual page files, build **4 reusable detail page templates** driven by data, plus **4 index/overview pages**:

### Template 1: `ProductDetail.jsx`
- Route: `/products/:slug`
- Data source: `productsData.js` → `PRODUCTS_DATA`
- Layout sections:
  - Hero with product name, tagline, key benefit pills
  - "What It Does" feature grid (icons + descriptions)
  - Screenshot/mockup showcase area
  - Industry use cases (absorb relevant sector content here)
  - Tech stack used
  - Pricing tiers (link to `/pricing` or inline)
  - FAQ accordion
  - CTA → Contact form

### Template 2: `AISolutionDetail.jsx`
- Route: `/ai-solutions/:slug`
- Data source: `aiSolutionsData.js` → `AI_SOLUTIONS_DATA`
- Layout sections:
  - Hero with AI-themed gradient/animation
  - Problem → Solution narrative
  - How it works (step-by-step flow)
  - Integration capabilities
  - ROI/metrics showcase
  - CTA → Contact form

### Template 3: `GetMoreCustomersDetail.jsx`
- Route: `/get-more-customers/:slug`
- Data source: `getMoreCustomersData.js` → `GET_MORE_CUSTOMERS_DATA`
- Layout sections:
  - Hero with marketing/growth theme
  - Service description
  - What's included (checklist)
  - Results/case studies
  - Process timeline
  - Pricing or "Get a Quote" CTA

### Template 4: `ServiceDetailNew.jsx`
- Route: `/services/:slug`
- Data source: `servicesDataNew.js` → `SERVICES_DATA_NEW`
- Layout sections:
  - Hero with service name + tagline
  - Capabilities breakdown
  - Tech stack
  - Portfolio references
  - Process/timeline
  - Pricing tiers
  - CTA → Contact form

### Index/Overview Pages (4 pages)

| Page | Route | Purpose |
|------|-------|---------|
| `ProductsIndex.jsx` | `/products` | Grid of all 15 products with categories |
| `AISolutionsIndex.jsx` | `/ai-solutions` | Grid of all 9 AI solutions |
| `GetMoreCustomersIndex.jsx` | `/get-more-customers` | Grid of all 13 marketing services |
| `ServicesIndex.jsx` | `/services` | Grid of all 14 services |

---

## 8. MegaMenu Component Spec

### Current State
- 3 separate dropdown implementations hardcoded in `Navbar.jsx`
- Services: `w-[600px]`, 2-column grid
- Sectors: `w-[680px]`, 3-column grid
- About: `w-[220px]`, single column

### New: Reusable `MegaMenu` Component

Build ONE `MegaMenu.jsx` component in `src/components/` that accepts:

```jsx
<MegaMenu
  columns={[
    {
      title: "Business Portals",
      items: [
        { name: "Customer Portal", slug: "customer-portal", desc: "External client dashboards" },
        // ...
      ]
    },
    // ... more columns
  ]}
  baseRoute="/products"
  width="wide"  // "wide" = 3-col (w-[780px]), "medium" = 2-col (w-[520px]), "narrow" = 1-col (w-[240px])
/>
```

**Key design rules (from GO-Globe observation):**
- Dark background (`bg-black/95 backdrop-blur-md`)
- Column headers in accent color (vintage-gold), uppercase, small tracking
- Items listed as simple text links (no cards, no descriptions in mega-menus — clean and dense)
- Hover state: text color change to vintage-gold
- Full-width panel on mobile → accordion

### Width Assignments

| Dropdown | Columns | Width Class |
|----------|---------|-------------|
| Products | 3 | `w-[780px]` |
| AI Solutions | 2 | `w-[520px]` |
| Get More Customers | 3 | `w-[780px]` |
| Services | 3 | `w-[780px]` |
| Company | 1 | `w-[240px]` |

---

## 9. Implementation Phases

### Phase 1: Data Files (No visual changes yet)
**Files to create:**
- [ ] `src/data/productsData.js` — 15 product entries with full content
- [ ] `src/data/aiSolutionsData.js` — 9 AI solution entries
- [ ] `src/data/getMoreCustomersData.js` — 13 marketing service entries
- [ ] `src/data/servicesDataNew.js` — 14 service entries

**Content strategy:**
- Pull relevant content from existing `servicesSectorsData.js` (7 services + 8 sectors)
- Rewrite and expand for each new page
- Each entry needs: `slug`, `title`, `tagline`, `description`, `features[]`, `techStack[]`, `faqs[]`, `pricing{}`, `relatedPages[]`

**Estimated effort:** 2-3 days (mostly content writing)

---

### Phase 2: Reusable Components
**Files to create:**
- [ ] `src/components/MegaMenu.jsx` — Reusable mega dropdown component
- [ ] `src/components/MegaMenuMobile.jsx` — Mobile accordion version (or integrate into MegaMenu)

**Estimated effort:** 1 day

---

### Phase 3: Template Pages
**Files to create:**
- [ ] `src/pages/products/ProductsIndex.jsx` — Products overview grid
- [ ] `src/pages/products/ProductDetail.jsx` — Individual product template
- [ ] `src/pages/ai-solutions/AISolutionsIndex.jsx` — AI overview grid
- [ ] `src/pages/ai-solutions/AISolutionDetail.jsx` — Individual AI solution template
- [ ] `src/pages/get-more-customers/GetMoreCustomersIndex.jsx` — Marketing overview grid
- [ ] `src/pages/get-more-customers/GetMoreCustomersDetail.jsx` — Individual marketing service template
- [ ] `src/pages/services-new/ServicesIndex.jsx` — Services overview grid
- [ ] `src/pages/services-new/ServiceDetailNew.jsx` — Individual service template

**Estimated effort:** 2-3 days

---

### Phase 4: Header Restructure
**Files to modify:**
- [ ] `src/components/Navbar.jsx` — Complete nav restructure:
  - Remove HOME link
  - Replace SERVICES dropdown → PRODUCTS mega dropdown
  - Remove SECTORS dropdown entirely
  - Add AI SOLUTIONS mega dropdown
  - Add GET MORE CUSTOMERS mega dropdown
  - Add new SERVICES mega dropdown
  - Rename PORTFOLIO → PROJECTS (keep same route)
  - PRICING stays
  - Rename ABOUT → COMPANY, add PARTNER to its dropdown
  - Remove TOOLS link
  - Remove PARTNER from top-level
  - Update mobile menu with accordion sections for all new dropdowns

**Estimated effort:** 1-2 days

---

### Phase 5: Routing & Redirects
**Files to modify:**
- [ ] `src/App.jsx` — Add new routes, add redirects for old routes
- [ ] `netlify.toml` — Add 301 redirect rules for old `/service/*` and `/sector/*` URLs

**New routes to add:**
```jsx
/products             → ProductsIndex
/products/:slug       → ProductDetail
/ai-solutions         → AISolutionsIndex
/ai-solutions/:slug   → AISolutionDetail
/get-more-customers   → GetMoreCustomersIndex
/get-more-customers/:slug → GetMoreCustomersDetail
/services             → ServicesIndex
/services/:slug       → ServiceDetailNew
```

**Redirect routes (render redirect components or use Netlify `_redirects`):**
```
/service/*  → corresponding new route
/sector/*   → corresponding new route
/tools      → /
```

**Estimated effort:** 1 day

---

### Phase 6: Footer Update
**Files to modify:**
- [ ] `src/components/Footer.jsx` — Update footer links to match new nav structure. Replace Services/Sectors columns with Products/AI Solutions/Services/Get More Customers.

**Estimated effort:** 0.5 days

---

### Phase 7: SEO & Sitemap
**Files to modify:**
- [ ] `generate-sitemap.js` / `generate-sitemap-massive.js` — Add new routes to sitemap
- [ ] `prerender.js` — Add new pages to pre-rendering pipeline
- [ ] `src/components/SEO.jsx` — Verify meta tags work for new page templates

**Estimated effort:** 0.5 days

---

### Phase 8: QA & Polish
- [ ] Test all mega-menu dropdowns on desktop (hover open/close, click-through)
- [ ] Test mobile accordion navigation (all 5 expandable sections)
- [ ] Verify all 301 redirects work
- [ ] Check that old bookmarked URLs still work
- [ ] Verify all new pages render with proper SEO meta
- [ ] Run production build and confirm all pages pre-render
- [ ] Test on Chrome, Safari, Firefox, Edge

**Estimated effort:** 1 day

---

### Total Estimated Effort: 9-12 days

| Phase | Days |
|-------|------|
| Phase 1: Data Files | 2-3 |
| Phase 2: MegaMenu Component | 1 |
| Phase 3: Template Pages | 2-3 |
| Phase 4: Header Restructure | 1-2 |
| Phase 5: Routing & Redirects | 1 |
| Phase 6: Footer Update | 0.5 |
| Phase 7: SEO & Sitemap | 0.5 |
| Phase 8: QA & Polish | 1 |

---

## 10. Files to Delete

| File | Reason |
|------|--------|
| `src/pages/Tools.jsx` | Maintenance placeholder with `noindex`. No real content. |
| `src/pages/SectorDetail.jsx` | Sectors absorbed into Products. Replaced by redirects. |

**Files to eventually deprecate** (after redirects are in place):
| File | Reason |
|------|--------|
| `src/pages/ServiceDetail.jsx` | Old dynamic service router. Replaced by new template pages. |
| Old service pages in `src/pages/services/` | Content migrated to new data files. Keep files until redirects are verified. |

---

## 11. Mobile Behavior

### Current Mobile Menu
- Full-screen overlay (`fixed inset-0 bg-black z-[100]`)
- 3 expandable accordion sections: Services, Sectors, About
- Direct links: Home, Portfolio, Tools, Partner

### New Mobile Menu
- Same overlay style
- **5 expandable accordion sections**: Products, AI Solutions, Get More Customers, Services, Company
- **Direct links**: Projects, Pricing
- Each accordion section shows column headers as sub-headers, with items listed below
- Company accordion includes: Our Profile, FAQ, Blog, Resources, Partner

---

## 12. SEO Migration Checklist

- [ ] Add `<meta name="robots" content="noindex">` to redirect pages during transition
- [ ] Configure 301 redirects in `netlify.toml` for all old URLs
- [ ] Update `sitemap.xml` to include all new URLs
- [ ] Remove old `/service/*` and `/sector/*` URLs from sitemap
- [ ] Verify canonical URLs on all new pages
- [ ] Update Google Search Console with new sitemap
- [ ] Monitor 404s in Google Search Console for 2 weeks after launch
- [ ] Update any internal links across all pages (Home.jsx hero CTAs, footer, etc.)
- [ ] Update schema.org structured data for new page types

---

## Summary

This restructure transforms CodeHTML.in from a service-centric flat navigation into a **product-led, multi-category navigation** matching the GO-Globe model. The key architectural decisions are:

1. **4 reusable templates** instead of 51 individual pages — maintainable and consistent
2. **Data-driven content** via JS data files — easy to add/remove items without touching components
3. **One MegaMenu component** — consistent dropdown behavior across all nav items
4. **301 redirects preserve SEO** — no traffic loss from URL changes
5. **Sector content absorbed**, not deleted — enriches Product pages with industry context
6. **Company & Partner untouched** — zero risk to existing partner ecosystem

> **Next step**: Get approval on this plan, then start with Phase 1 (data files) and Phase 2 (MegaMenu component).
