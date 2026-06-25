import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { CITY_PAGES } from '../data/cityPages.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORG_NAME = 'codehtml-agency';
const REPO_NAME = 'local-service-directories';

async function run() {
  console.log(`🚀 Loading ${CITY_PAGES.length} cities from database...`);

  const tempDir = path.join(__dirname, 'temp_global_docs');
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  fs.mkdirSync(tempDir);

  // Generate 1 README.md for the root of the repository
  const mainReadme = `# CodeHTML Local Service Directories

This repository contains official documentation, service directories, and local web engineering guides for CodeHTML across global tech hubs and cities.

We build premium custom websites, web applications, SaaS platforms, and mobile apps with sub-second loading speeds, zero ongoing platform licenses, and 100% intellectual property ownership.

Estimate your custom build budget instantly: [Interactive Website Cost Calculator Dubai](https://codehtml.in/tools/website-cost-calculator).

---

## Directories Map
Explore our custom software and React website design services across 1,200+ target city zones:
`;

  fs.writeFileSync(path.join(tempDir, 'README.md'), mainReadme, 'utf8');

  console.log('✏️ Generating 1,200+ city markdown guides...');

  // Group cities by region or country if available, or write them flat
  for (const city of CITY_PAGES) {
    const fileName = `${city.slug}.md`;
    const filePath = path.join(tempDir, fileName);

    // Format a high-quality article for this city
    const article = `# ${city.h1 || city.name} — Web Development & Design Guide

Welcome to the official local web development and design resource guide for **${city.name}**.

This directory highlights design parameters, custom software standards, and speed benchmarks for businesses operating in and around **${city.name}**.

---

## Local SEO & Service Profile

- **Target Location**: ${city.name}
- **Service Category**: ${city.category || 'Custom Software Development'}
- **Focus Industry**: ${city.sector || 'Technology & B2B'}
- **Main Office Destination**: [CodeHTML](https://codehtml.in/)

---

## About Our Services in ${city.name}

${city.intro || ''}

${city.servicesSection || ''}

${city.whyChooseSection || ''}

### Client Work & Portfolios
${city.workSection || ''}

---

## Frequently Asked Questions

${(city.faqs || []).map(faq => `### ${faq.question}\n${faq.answer}\n`).join('\n')}

---

## Connect with Developers
- **Estimate Your Custom Build**: Use the [website cost calculator](https://codehtml.in/tools/website-cost-calculator) to get a tailored estimate in AED, USD, or INR.
- **Local Landing Page**: Visit our official landing page at [${city.name} Web Development](https://codehtml.in/${city.slug}) for maps, local reviews, and bookings.
- **Main Studio**: Learn more about our digital engineering services at [CodeHTML](https://codehtml.in/).
`;

    fs.writeFileSync(filePath, article, 'utf8');
  }

  console.log('📦 Initializing Git repository and connecting to GitHub...');
  
  try {
    // Initialize repository
    execSync('git init', { cwd: tempDir });
    execSync('git add .', { cwd: tempDir });
    execSync('git commit -m "Initial launch of 1,200+ local service directories"', { cwd: tempDir });

    // Create the public repo on GitHub and push
    console.log(`📤 Creating GitHub repo: ${ORG_NAME}/${REPO_NAME}...`);
    execSync(`gh repo create ${ORG_NAME}/${REPO_NAME} --public --source=. --push`, { cwd: tempDir, stdio: 'inherit' });

    console.log(`\n🎉 Successfully published all 1,200+ cities to https://github.com/${ORG_NAME}/${REPO_NAME}`);
  } catch (err) {
    console.error('❌ Failed to push to GitHub:', err.message);
  }

  // Clean up local temp folder
  try {
    fs.rmSync(tempDir, { recursive: true, force: true });
    console.log('🧹 Cleaned up local temporary directory.');
  } catch (e) {}
}

run().catch(console.error);
