// Central keyword store extracted from the Keyword Bible.
// Used by CountryCityHome, StateHome, CountryHome, and prerender.js.

// City-level keywords — dynamically generated from city name (27 keywords)
export function getCityKeywords(cityName) {
  return [
    `web development in ${cityName}`,
    `${cityName} web development`,
    `web design in ${cityName}`,
    `${cityName} web design`,
    `website development in ${cityName}`,
    `${cityName} website development`,
    `app development in ${cityName}`,
    `${cityName} app development`,
    `saas development in ${cityName}`,
    `${cityName} saas development`,
    `mobile app development in ${cityName}`,
    `${cityName} mobile app development`,
    `ai chatbot in ${cityName}`,
    `${cityName} ai chatbot`,
    `seo services in ${cityName}`,
    `${cityName} seo services`,
    `digital marketing in ${cityName}`,
    `web application development in ${cityName}`,
    `best web development company in ${cityName}`,
    `top web design agency ${cityName}`,
    `hire web developer ${cityName}`,
    `website design company ${cityName}`,
    `mobile app developer ${cityName}`,
    `seo company ${cityName}`,
    `digital agency ${cityName}`,
    `software development company ${cityName}`,
    `web development near me ${cityName}`,
  ];
}

// State-level keywords per state name (12 keywords)
export function getStateKeywords(stateName) {
  return [
    `custom website development company in ${stateName}`,
    `best custom website development agency ${stateName}`,
    `web application development company in ${stateName}`,
    `best web application development agency ${stateName}`,
    `saas development company in ${stateName}`,
    `best saas development agency ${stateName}`,
    `mobile app development company in ${stateName}`,
    `best mobile app development agency ${stateName}`,
    `web development ${stateName}`,
    `software company ${stateName}`,
    `mobile app development ${stateName}`,
    `digital agency ${stateName}`,
  ];
}

// AEO Questions per country (from Bible's AEO section)
export const COUNTRY_AEO_QUESTIONS = {
  uae: [
    { q: 'How much does website development cost in Dubai?', a: 'Website development in Dubai typically starts from AED 1,500 for a startup landing page to AED 12,000+ for enterprise-grade web applications. CodeHTML offers fixed-price packages with 100% IP handover.' },
    { q: 'How long does it take to build a website in UAE?', a: 'At CodeHTML, we deliver startup websites in 3–5 business days and full web applications in 2–6 weeks, depending on complexity.' },
    { q: 'Do I need an Arabic website for UAE business?', a: 'While not legally required, an Arabic version significantly improves local trust, SEO rankings in Arabic search queries, and client conversion for UAE-based businesses.' },
    { q: 'How to find a reliable web developer in Dubai?', a: 'Look for agencies with a verifiable portfolio (not template projects), transparent fixed pricing, NDA agreements, and proven post-launch support — like CodeHTML Tech Studio.' },
    { q: 'What is the best tech stack for a UAE business website?', a: 'For UAE clients, we recommend Next.js + React for performance, Vercel/AWS deployment for speed, and Stripe or PayTabs for payment processing.' },
  ],
  india: [
    { q: 'How much does website development cost in India?', a: 'Custom website development in India at CodeHTML starts from ₹25,000 for a startup package and goes to ₹2,00,000+ for SaaS or enterprise platforms with admin panels.' },
    { q: 'What is the best web development company in India?', a: 'CodeHTML Tech Studio, based in Indore, delivers premium React/Next.js websites, web applications, and SaaS platforms for clients across India, Dubai, UK, USA, and Singapore.' },
    { q: 'How long does a web development project take in India?', a: 'At CodeHTML, startup websites launch in 3–5 days. Full web applications and SaaS platforms are delivered in 2–8 weeks based on the feature scope.' },
    { q: 'Do Indian web development agencies work with UK and Dubai clients?', a: 'Yes. CodeHTML works with clients in Dubai, UK, USA, and Singapore from our base in India, offering timezone-compatible communication and fixed-price project models.' },
    { q: 'What industries does CodeHTML serve in India?', a: 'We serve Fintech, Edtech, Healthtech, Ecommerce, Agritech, and B2B SaaS companies across India.' },
  ],
  usa: [
    { q: 'How much does website development cost in the USA?', a: 'Premium custom web development in the USA typically costs $5,000–$50,000 for mid-tier agencies. CodeHTML offers India-quality engineering at 40–60% of US agency rates with full IP ownership.' },
    { q: 'How to choose a web development agency in New York?', a: 'Prioritize agencies with a custom-coded portfolio (not WordPress themes), clear milestone-based pricing, post-launch support, and signed NDAs. Ask to see Lighthouse scores.' },
    { q: 'What is ADA compliance in website development?', a: 'ADA compliance means your website meets the Americans with Disabilities Act standards — ensuring accessible design for users with visual, auditory, or motor impairments. CodeHTML builds WCAG 2.1 compliant websites.' },
    { q: 'Can I outsource my US web development project to India?', a: 'Yes. CodeHTML works with US startups and enterprises, offering US-standard code quality at significantly lower investment, with timezone flexibility and fixed-price contracts.' },
    { q: 'What tech stack should my US startup website use?', a: 'We recommend Next.js 14 App Router for speed and SEO, Node.js backend, MongoDB or PostgreSQL for data, and Stripe for billing — the modern full-stack for US startups.' },
  ],
  uk: [
    { q: 'How much does website development cost in the UK?', a: 'UK web agencies charge £3,000–£25,000 for custom websites. CodeHTML delivers the same code quality as top UK agencies at 40% lower cost, with GDPR compliance built in.' },
    { q: 'How to find a web development agency in London?', a: 'Look for agencies with verified Clutch profiles, transparent pricing, UK GDPR compliance experience, and custom-coded portfolios. CodeHTML serves UK clients from India with zero compromise on quality.' },
    { q: 'Is UK GDPR compliance required for my website?', a: 'Yes. Post-Brexit, UK GDPR requires all websites collecting UK user data to have a cookie consent system, privacy policy, data breach procedures, and legitimate interest assessments.' },
    { q: 'What are the best web development cities in the UK outside London?', a: 'Manchester, Birmingham, Leeds, Bristol, Edinburgh, and Glasgow have growing tech scenes with lower costs than London, making them ideal for scaling digital operations.' },
    { q: 'Can Indian web agencies work with UK businesses?', a: 'Yes. CodeHTML has successfully delivered projects for UK clients in finance, retail, and SaaS sectors with NDA protection, UK-aligned delivery timelines, and GDPR compliance.' },
  ],
  singapore: [
    { q: 'How much does website development cost in Singapore?', a: 'Website development in Singapore ranges from SGD 2,00,000 to custom enterprise quotes. Standard sites range SGD 2,000–15,000. CodeHTML provides premium engineering at 50% of Singapore agency rates with PSG grant eligibility documentation support.' },
    { q: 'Does Singapore offer grants for website development?', a: 'Yes. The Productivity Solutions Grant (PSG) covers up to 50% of pre-approved digital solutions for Singapore SMEs. CodeHTML can help document your project for PSG grant applications.' },
    { q: 'What are the best fintech web development agencies in Singapore?', a: 'Singapore is home to major fintech hubs like Fintech Festival SG. CodeHTML specialises in fintech-grade secure web applications, MAS compliance frameworks, and real-time payment integrations.' },
    { q: 'How to build a tech startup in Singapore?', a: 'Register at ACRA, apply for EntrePass or EP, set up a Stripe account, get a PSG grant, and partner with a reliable tech agency like CodeHTML for your MVP development.' },
    { q: 'What industries does CodeHTML serve in Singapore?', a: 'We serve Fintech, Logistics, Real Estate, Govtech, Healthtech, and Edtech companies in Singapore with custom web apps, SaaS platforms, and mobile applications.' },
  ],
};

// Country-level Tier 1+2 keywords (from Bible Part 2)
export const COUNTRY_HERO_CONFIG = {
  uae: {
    heroImage: '/dubai_burj_khalifa.webp',
    heroHeadline: 'We Build Digital Products for Dubai Businesses',
    heroSubtext: 'Trusted by Real Estate & Hospitality companies across the UAE.',
    tier1Keywords: ['website development in Dubai', 'web design in UAE', 'web development UAE', 'mobile app development Dubai', 'saas development UAE', 'software development company Dubai', 'digital agency UAE', 'ai chatbot development Dubai'],
  },
  india: {
    heroImage: '/india_tech_hub.webp',
    heroHeadline: 'We Build Digital Products for India Businesses',
    heroSubtext: 'Trusted by Fintech & Edtech companies across India.',
    tier1Keywords: ['website development in India', 'web design India', 'web development India', 'mobile app development India', 'saas development India', 'software development company India', 'digital agency India', 'ai chatbot development India'],
  },
  usa: {
    heroImage: '/usa_tech_hub.webp',
    heroHeadline: 'We Build Digital Products for USA Businesses',
    heroSubtext: 'Trusted by SaaS & Fintech companies across the USA.',
    tier1Keywords: ['website development USA', 'web design USA', 'web development America', 'mobile app development USA', 'saas development USA', 'software development company USA', 'digital agency USA', 'ai chatbot development USA'],
  },
  uk: {
    heroImage: '/london_skyline.webp',
    heroHeadline: 'We Build Digital Products for UK Businesses',
    heroSubtext: 'Trusted by Finance & Media companies across the UK.',
    tier1Keywords: ['website development UK', 'web design UK', 'web development United Kingdom', 'mobile app development UK', 'saas development UK', 'software development company UK', 'digital agency UK', 'ai chatbot development UK'],
  },
  singapore: {
    heroImage: '/singapore_skyline.webp',
    heroHeadline: 'We Build Digital Products for Singapore Businesses',
    heroSubtext: 'Trusted by Fintech & Govtech companies across Singapore.',
    tier1Keywords: ['website development Singapore', 'web design Singapore', 'web development Singapore', 'mobile app development Singapore', 'saas development Singapore', 'software development Singapore', 'digital agency Singapore', 'ai chatbot development Singapore'],
  },
};

// Industry-specific focus per country (from Bible's industry section)
export const COUNTRY_INDUSTRIES = {
  uae: ['Real Estate', 'Hospitality', 'Retail', 'Fintech', 'Logistics', 'Tourism'],
  india: ['Fintech', 'Edtech', 'Healthtech', 'Ecommerce', 'Agritech', 'Logistics'],
  usa: ['SaaS', 'Fintech', 'Healthcare', 'E-Commerce', 'Real Estate', 'Legal Tech'],
  uk: ['Finance', 'Media & Creative', 'Retail', 'Healthcare', 'Property', 'Legal'],
  singapore: ['Fintech', 'Logistics', 'Real Estate', 'Govtech', 'Healthtech', 'Edtech'],
};
