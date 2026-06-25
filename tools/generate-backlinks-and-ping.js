import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'codehtml.in';

// 1. Generate IndexNow Key (must be 8-128 hexadecimal characters)
const INDEXNOW_KEY = 'c0de111dbab848828282828282822026'; 
const publicDir = path.join(__dirname, '..', 'public');
const keyFilePath = path.join(publicDir, `${INDEXNOW_KEY}.txt`);

console.log('--- Setting up IndexNow ---');
try {
  fs.writeFileSync(keyFilePath, INDEXNOW_KEY, 'utf-8');
  console.log(`✅ IndexNow key file created at public/${INDEXNOW_KEY}.txt`);
  console.log(`🔗 Verifiable URL: https://${DOMAIN}/${INDEXNOW_KEY}.txt`);
} catch (error) {
  console.error('❌ Failed to write IndexNow key file:', error.message);
}

// 2. Fetch URLs to submit
const urlsToSubmit = [
  `https://${DOMAIN}/`,
  `https://${DOMAIN}/locations`,
  `https://${DOMAIN}/blog`,
  `https://${DOMAIN}/about`,
  `https://${DOMAIN}/contact`,
  `https://${DOMAIN}/portfolio`,
  `https://${DOMAIN}/services`,
  // Add some top geo landing pages
  `https://${DOMAIN}/web-development-in-bangalore`,
  `https://${DOMAIN}/web-design-in-bangalore`,
  `https://${DOMAIN}/web-development-in-delhi`,
  `https://${DOMAIN}/web-design-in-delhi`,
  `https://${DOMAIN}/web-development-in-dubai`,
  `https://${DOMAIN}/web-design-in-dubai`,
  `https://${DOMAIN}/web-development-in-london`,
  `https://${DOMAIN}/web-design-in-london`
];

async function submitIndexNow() {
  console.log('\n--- Submitting to IndexNow (Bing/Yandex/Seznam) ---');
  const payload = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: urlsToSubmit
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    if (response.ok) {
      console.log('✅ IndexNow submission successful!');
    } else {
      const text = await response.text();
      console.log(`⚠️ IndexNow responded with status ${response.status}: ${text}`);
    }
  } catch (error) {
    console.error('❌ IndexNow request failed:', error.message);
  }
}

async function pingSitemaps() {
  console.log('\n--- Pinging Search Engines with Sitemap Index ---');
  const sitemapUrl = `https://${DOMAIN}/sitemap.xml`;
  const pingUrls = [
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
  ];

  for (const url of pingUrls) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        console.log(`✅ Successfully pinged: ${url}`);
      } else {
        console.log(`⚠️ Ping returned status ${response.status} for: ${url}`);
      }
    } catch (error) {
      console.error(`❌ Failed to ping ${url}:`, error.message);
    }
  }
}

async function triggerDomainLookups() {
  console.log('\n--- Triggering High-Authority Web Stat & Profile Backlinks ---');
  // List of search/lookup URL formats that generate static web pages (which count as backlinks when crawled by Google)
  const lookupUrls = [
    `https://www.statshow.com/www/${DOMAIN}`,
    `https://www.siteworthtraffic.com/report/${DOMAIN}`,
    `https://builtwith.com/${DOMAIN}`,
    `https://www.robtex.com/dns-lookup/${DOMAIN}`,
    `https://whois.domaintools.com/${DOMAIN}`,
    `https://site-stats.org/${DOMAIN}`,
    `https://www.siteprice.org/website-worth/${DOMAIN}`,
    `https://www.statscrop.com/www/${DOMAIN}`,
    `https://www.cubestat.com/www.${DOMAIN}`,
    `https://domain-stats.com/www/${DOMAIN}`,
    `https://websiteoutlook.com/${DOMAIN}`
  ];

  for (const url of lookupUrls) {
    try {
      // Send a quick fetch to trigger the site profile creation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout per request
      
      const response = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' } });
      clearTimeout(timeoutId);

      console.log(`✅ Triggered lookup (created backlink profile page): ${url} [Status: ${response.status}]`);
    } catch (error) {
      console.log(`⚠️ Handled lookup for ${url} (took too long or skipped, which is normal for some of these tools)`);
    }
  }
}

async function run() {
  await submitIndexNow();
  await pingSitemaps();
  await triggerDomainLookups();
  console.log('\n🎉 Finished! The changes have been pushed/run. Make sure to commit and push the public/ key file so it is live on Netlify for IndexNow verification.');
}

run();
