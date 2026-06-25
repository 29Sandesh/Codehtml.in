import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOMAIN = 'codehtml.in';
const KEY_FILE_PATH = path.join(__dirname, '..', 'google-key.json');

// Helper to base64url encode
function base64url(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

// Generate JWT token for Google OAuth2
function generateJWT(clientEmail, privateKey) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: clientEmail,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaimSet = base64url(JSON.stringify(claimSet));

  const signatureInput = `${encodedHeader}.${encodedClaimSet}`;
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(signatureInput);
  const signature = sign.sign(privateKey, 'base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  return `${signatureInput}.${signature}`;
}

// Fetch Access Token
async function getAccessToken(clientEmail, privateKey) {
  const jwtToken = generateJWT(clientEmail, privateKey);
  const params = new URLSearchParams();
  params.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  params.append('assertion', jwtToken);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString()
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Google Auth failed: ${response.status} - ${text}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Submit URL to Google Indexing API
async function submitToGoogle(url, accessToken) {
  try {
    const response = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED'
      })
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok) {
        console.log(`✅ Success: ${url}`);
        return true;
      } else {
        console.error(`❌ Error for ${url}:`, JSON.stringify(data));
        return false;
      }
    } else {
      const text = await response.text();
      console.error(`❌ Non-JSON Error for ${url} (Status ${response.status}):`, text.substring(0, 500));
      return false;
    }
  } catch (err) {
    console.error(`❌ Request failed for ${url}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('--- Starting Google Indexing API Submission ---');

  if (!fs.existsSync(KEY_FILE_PATH)) {
    console.error(`❌ Error: google-key.json not found at ${KEY_FILE_PATH}`);
    process.exit(1);
  }

  const keyData = JSON.parse(fs.readFileSync(KEY_FILE_PATH, 'utf-8'));
  const clientEmail = keyData.client_email;
  const privateKey = keyData.private_key;

  if (!clientEmail || !privateKey) {
    console.error('❌ Error: google-key.json is missing client_email or private_key.');
    process.exit(1);
  }

  let accessToken;
  try {
    console.log('🔐 Authenticating with Google Service Account...');
    accessToken = await getAccessToken(clientEmail, privateKey);
    console.log('🔑 Access token received successfully!');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  // URLs to submit (up to 150)
  const urls = [
    `https://${DOMAIN}/`,
    `https://${DOMAIN}/locations`,
    `https://${DOMAIN}/blog`,
    `https://${DOMAIN}/about`,
    `https://${DOMAIN}/contact`,
    `https://${DOMAIN}/portfolio`,
    `https://${DOMAIN}/services`,
    // New Landing Pages & Guides
    `https://${DOMAIN}/restaurant-website-design-dubai`,
    `https://${DOMAIN}/clinic-website-design-dubai`,
    `https://${DOMAIN}/real-estate-website-design-dubai`,
    `https://${DOMAIN}/website-cost-in-dubai`,
    `https://${DOMAIN}/webcastle-alternative`,
    `https://${DOMAIN}/digital-gravity-alternative`,
    `https://${DOMAIN}/redspider-alternative`,
    `https://${DOMAIN}/web-development-dubai-guide`,
    `https://${DOMAIN}/tools`,
    `https://${DOMAIN}/tools/website-cost-calculator`,
    // Core tech regions/cities
    `https://${DOMAIN}/web-development-in-bangalore`,
    `https://${DOMAIN}/web-design-in-bangalore`,
    `https://${DOMAIN}/web-development-in-delhi`,
    `https://${DOMAIN}/web-design-in-delhi`,
    `https://${DOMAIN}/web-development-in-dubai`,
    `https://${DOMAIN}/web-design-in-dubai`,
    `https://${DOMAIN}/web-development-in-london`,
    `https://${DOMAIN}/web-design-in-london`,
    `https://${DOMAIN}/web-development-in-singapore`,
    `https://${DOMAIN}/web-design-in-singapore`,
    `https://${DOMAIN}/web-development-in-new-york`,
    `https://${DOMAIN}/web-design-in-new-york`,
    `https://${DOMAIN}/web-development-in-san-francisco`,
    `https://${DOMAIN}/web-design-in-san-francisco`,
    `https://${DOMAIN}/web-development-in-sydney`,
    `https://${DOMAIN}/web-design-in-sydney`
  ];

  console.log(`\n🚀 Submitting ${urls.length} URLs to Google Indexing API...`);
  
  let successCount = 0;
  for (const url of urls) {
    const success = await submitToGoogle(url, accessToken);
    if (success) successCount++;
    // Sleep 100ms between calls to avoid hitting rate limits
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n🎉 Submission complete! Submitted ${successCount}/${urls.length} URLs successfully.`);
}

run();
