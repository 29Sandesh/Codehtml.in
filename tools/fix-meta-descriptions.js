import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CITY_PAGES_PATH = path.join(__dirname, '..', 'data', 'cityPages.js');

const TEMPLATES = [
  "Looking for the best {service} in {city}? CodeHTML delivers custom coding, premium layouts, and instant load times. Contact our local team today.",
  "Hire top-rated developers for {service} in {city}. CodeHTML builds scalable, fast, and SEO-optimized digital platforms for serious businesses.",
  "CodeHTML is the leading studio for {service} in {city}. We write clean custom code to help your business dominate local search and capture more leads.",
  "Need premium {service} in {city}? We engineer sub-second React platforms, custom mobile apps, and robust business software without slow templates.",
  "Get the fastest {service} in {city} with CodeHTML. We specialize in custom-coded solutions that outperform competitors and boost conversion rates.",
  "Looking to upgrade your digital presence? CodeHTML offers elite {service} in {city}, bringing top-tier engineering and performance to your brand.",
  "Transform your business with professional {service} in {city}. CodeHTML builds custom, enterprise-grade software and high-converting websites.",
  "CodeHTML provides premium {service} in {city}. Let our expert engineers build a tailored digital platform that loads instantly and drives sales.",
  "Your search for reliable {service} in {city} ends here. We deliver custom software, sleek designs, and unmatched performance for ambitious companies.",
  "We are CodeHTML, the premier choice for {service} in {city}. Partner with us for bespoke React development and powerful SEO-driven architectures."
];

function getRandomTemplate(city, service) {
  const tpl = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)];
  const serviceName = service ? service.replace(/-/g, ' ') : 'website design';
  return tpl.replace('{city}', city).replace('{service}', serviceName.toLowerCase());
}

async function fixMetaDescriptions() {
  const content = fs.readFileSync(CITY_PAGES_PATH, 'utf8');
  
  // A simple regex approach won't work well for a massive file with 1,100 objects if they span multiple lines.
  // Wait, the file is formatted as an array of objects.
  // Instead of parsing JSON (it's a JS export), we can replace "metaDesc": "..." using regex.
  
  let matchCount = 0;
  const updatedContent = content.replace(/"name":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",[\s\S]*?"metaDesc":\s*"([^"]+)"/g, (match, name, slug, oldDesc) => {
    matchCount++;
    // Extract service from slug: e.g., website-design-company-in-dubai-marina -> website design company
    const serviceMatch = slug.split('-in-')[0];
    const newDesc = getRandomTemplate(name, serviceMatch);
    
    // We only want to replace the metaDesc part within the match
    return match.replace(/"metaDesc":\s*"[^"]+"/, `"metaDesc": "${newDesc}"`);
  });

  fs.writeFileSync(CITY_PAGES_PATH, updatedContent, 'utf8');
  console.log(`✅ Fixed meta descriptions for ${matchCount} city pages!`);
}

fixMetaDescriptions();
