import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const BIBLE_PATH = path.join(ROOT, 'CodeHTML_SEO_Keyword_Bible.txt');
const OUTPUT_PATH = path.join(ROOT, 'data', 'allKeywordsDatabase.js');

if (!fs.existsSync(BIBLE_PATH)) {
  console.error(`Bible not found at ${BIBLE_PATH}`);
  process.exit(1);
}

const lines = fs.readFileSync(BIBLE_PATH, 'utf8').split('\n');

const keywordsDB = {
  services: {},
  comparisons: [],
  techStack: [],
  trustSignals: [],
  offshore: [],
  negativeExperience: [],
  aeoTopics: []
};

// Map Bible titles to our service IDs
const SERVICE_MAPPINGS = {
  'Custom Website Development': 'website-development',
  'Web Application Development': 'web-app-development',
  'SaaS Development': 'saas-development',
  'Mobile App Development': 'mobile-app-development',
  'AI & Automation': 'ai-automation',
  'Startup Launch Services': 'startup-launch',
  'Growth & Digital Presence': 'seo-growth'
};

let currentService = null;
let currentTier = null;
let currentGlobalSection = null;
let part2Started = false;
let part3Started = false;

lines.forEach((line, index) => {
  const trimmed = line.trim();
  if (!trimmed) return;

  // Detect Part 2 start to suspend service-level keyword extraction
  if (trimmed.startsWith('PART 2')) {
    part2Started = true;
    currentService = null;
    currentTier = null;
    return;
  }

  // Detect Part 3 start to transition to global categories
  if (trimmed.startsWith('■ Universal & Cross-Country Keywords')) {
    part3Started = true;
    currentService = null;
    currentTier = null;
    currentGlobalSection = null;
    console.log(`[Line ${index + 1}] Found Part 3: Universal & Cross-Country Keywords`);
    return;
  }

  // Part 3 Section Detection
  if (part3Started) {
    if (trimmed.includes('OFFSHORE / INDIA-ORIGIN')) {
      currentGlobalSection = 'offshore';
      return;
    } else if (trimmed.includes('TRUST & QUALITY')) {
      currentGlobalSection = 'trustSignals';
      return;
    } else if (trimmed.includes('TECH STACK SPECIFIC')) {
      currentGlobalSection = 'techStack';
      return;
    } else if (trimmed.includes('COMPARISON / VS KEYWORDS')) {
      currentGlobalSection = 'comparisons';
      return;
    } else if (trimmed.includes('NEGATIVE EXPERIENCE KEYWORDS')) {
      currentGlobalSection = 'negativeExperience';
      return;
    } else if (trimmed.startsWith('■ Complete AEO & Blog') || trimmed.startsWith('■ Complete AEO')) {
      currentGlobalSection = 'aeoTopics';
      return;
    } else if (trimmed.startsWith('■ SEO Page Strategy Map')) {
      currentGlobalSection = null;
      return;
    }
  }

  // Detect service header in Part 1 (only if Part 2 hasn't started yet)
  if (!part2Started && (line.startsWith('■ ') || line.startsWith('■■ '))) {
    const serviceName = trimmed.replace(/^■+\s*/, '').trim();
    
    // Check if it's competitor gap or aeo sub-section instead of a service name!
    if (serviceName.includes('COMPETITOR GAP KEYWORDS')) {
      currentTier = 'competitorGap';
      return;
    } else if (serviceName.includes('AEO / AI ANSWER ENGINE')) {
      currentTier = 'aeo';
      return;
    }
    
    const serviceId = SERVICE_MAPPINGS[serviceName];
    if (serviceId) {
      currentService = serviceId;
      keywordsDB.services[currentService] = {
        name: serviceName,
        tier1: [],
        tier2: [],
        tier3: [],
        competitorGap: [],
        aeo: []
      };
      currentTier = null;
      console.log(`[Line ${index + 1}] Found Service: ${serviceName} -> ID: ${serviceId}`);
    } else {
      // It's some other non-service header, reset currentService
      currentService = null;
    }
    return;
  }

  // Detect tiers inside the current service
  if (currentService && !part2Started) {
    if (trimmed.includes('TIER 1 — BROAD')) {
      currentTier = 'tier1';
      return;
    } else if (trimmed.includes('TIER 2 — SPECIFIC')) {
      currentTier = 'tier2';
      return;
    } else if (trimmed.includes('TIER 3 — LONG-TAIL')) {
      currentTier = 'tier3';
      return;
    }
  }

  // Determine if this is a keyword line (has leading whitespace or starts with DEL/TAB)
  const isKeywordLine = line.startsWith('\x7f') || /^[\s\xa0\t]+/.test(line);

  if (isKeywordLine) {
    // Clean up DEL, CR, and leading/trailing whitespace
    const cleanKw = trimmed.replace(/[\x7f]/g, '').replace(/\r/g, '').trim();
    
    // Ignore page markers, use-on context instructions, table headers
    if (
      cleanKw.startsWith('---') ||
      cleanKw.toLowerCase().startsWith('use on:') ||
      cleanKw.toLowerCase().startsWith('based on:') ||
      cleanKw.toLowerCase().startsWith('in 2026,') ||
      cleanKw.toLowerCase().startsWith('which keywords') ||
      cleanKw.toLowerCase().startsWith('page type') ||
      cleanKw.toLowerCase().startsWith('homepage') ||
      cleanKw.toLowerCase().startsWith('service page') ||
      cleanKw.toLowerCase().startsWith('blog post') ||
      cleanKw.toLowerCase().startsWith('case study') ||
      cleanKw.toLowerCase().startsWith('faq page') ||
      cleanKw.toLowerCase().startsWith('contact page') ||
      cleanKw.toLowerCase().startsWith('about page')
    ) {
      return;
    }

    if (currentService && currentTier) {
      keywordsDB.services[currentService][currentTier].push(cleanKw);
    } else if (part3Started && currentGlobalSection) {
      keywordsDB[currentGlobalSection].push(cleanKw);
    }
  }
});

// Let's summarize the results
console.log('\n--- Extraction Summary ---');
let totalKws = 0;
for (const [sId, service] of Object.entries(keywordsDB.services)) {
  const sCount = service.tier1.length + service.tier2.length + service.tier3.length + service.competitorGap.length + service.aeo.length;
  totalKws += sCount;
  console.log(`Service [${sId}]: ${sCount} keywords (T1: ${service.tier1.length}, T2: ${service.tier2.length}, T3: ${service.tier3.length}, Gap: ${service.competitorGap.length}, AEO: ${service.aeo.length})`);
}

const globalCategories = ['comparisons', 'techStack', 'trustSignals', 'offshore', 'negativeExperience', 'aeoTopics'];
globalCategories.forEach(cat => {
  totalKws += keywordsDB[cat].length;
  console.log(`Category [${cat}]: ${keywordsDB[cat].length} keywords`);
});
console.log(`Total unique base keywords extracted: ${totalKws}`);

// Write output file
const fileContent = `/**
 * ALL KEYWORDS DATABASE (Auto-generated from CodeHTML_SEO_Keyword_Bible.txt)
 * Contains structured keyword arrays for all services and categories
 */

export const ALL_KEYWORDS = ${JSON.stringify(keywordsDB, null, 2)};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf8');
console.log(`\n✅ Structured Keyword Bible successfully saved to ${OUTPUT_PATH}`);
