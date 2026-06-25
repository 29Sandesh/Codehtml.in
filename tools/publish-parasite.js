import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Tokens
const DEVTO_API_KEY = 'pfRFv565mAMHri9gmViE6JBo';
// Set your Medium Token here once you find it under Settings -> Publishing
const MEDIUM_API_TOKEN = ''; 
// Set your Hashnode Token here once you generate it under Settings -> Developer
const HASHNODE_API_TOKEN = '13355e76-0b11-429f-97f8-7cbb6dd59c90';

// Article 1 (For Dev.to)
const devToArticle = {
  title: 'Why Dubai Startups are Ditching WordPress for Custom React Stack',
  published: true,
  tags: ['react', 'webdev', 'seo', 'dubai'],
  body_markdown: `For years, the default choice for launching a corporate website in Dubai was WordPress. It was fast to set up and cheap. 

But in 2026, the digital landscape in the UAE is highly competitive. Dubai startups, real estate brokerages, and SaaS groups are completely ditching template builders for custom React stacks. Here is why hiring a senior [react developer dubai](https://codehtml.in/web-development-in-dubai) has become a major competitive advantage.

### 1. Speed is a Ranking & Conversion Factor
Most Dubai corporate websites score 40–55 on mobile Google Lighthouse performance. With a custom React or Next.js build, pages compile to static HTML and load on Edge CDNs in **under 0.8 seconds**. This speed boost directly increases lead conversions by up to 300%.

### 2. High-Authority Schema Stacking
Google's search layout is dominated by rich snippets, stars, FAQs, and local business boxes. Custom React frontends allow you to inject precise, stacked JSON-LD schemas (\`Organization\` + \`LocalBusiness\` + \`FAQPage\` + \`Review\`) directly into the code, helping you win visual features on search engine result pages.

### 3. Escape the Template Trap
Many local builders deliver sites locked into elementor drag-and-drop systems. If you want a detailed side-by-side technical comparison of how custom engineering beats standard local agencies, look at the comparison guide on [Webcastle alternative](https://codehtml.in/webcastle-alternative).

If you are ready to build a high-performance digital asset, review the services at [custom website development dubai](https://codehtml.in/services/custom-software-development) to start planning your build.`
};

// Article 2 (For Medium)
const mediumArticle = {
  title: 'How Much Does a Website Cost in Dubai? (2026 Developer Pricing Guide)',
  contentFormat: 'markdown',
  publishStatus: 'public', // 'draft' or 'public'
  tags: ['Web Development', 'Dubai', 'Pricing', 'React'],
  content: `If you are launching a business, startup, or real estate agency in Dubai, your first question is inevitably: **How much does a website cost in Dubai?**

The short answer is: **Website cost in Dubai ranges from AED 3,500 for a simple business site to AED 45,500+ for custom web portals and mobile apps.**

However, the real cost depends on whether you choose a cheap template or invest in custom engineering. In this guide, we break down the exact market rates for web development in Dubai for 2026.

---

### Dubai Web Development Pricing Tiers (AED)

| Project Scope | Platform Type | Price Range (AED) | Timeline |
| :--- | :--- | :--- | :--- |
| **Startup Engine** | Custom Business Site (React) | AED 3,500 – 6,000 | 2–3 Weeks |
| **Growth System** | Custom E-commerce / Portal | AED 6,500 – 15,000 | 4–5 Weeks |
| **Enterprise Portal** | SaaS, Custom App with User Auth | AED 16,000 – 45,000+ | 6–8 Weeks |

If you want to estimate your custom build budget instantly, you can use the interactive [website cost calculator](https://codehtml.in/tools/website-cost-calculator) to get a tailored estimate in AED, USD, or INR.

---

### WordPress Templates vs. Custom React Code: The Hidden Costs

Many traditional agencies in Dubai sell template-based WordPress sites using builders like Elementor. While these seem cheaper upfront, they come with significant hidden costs:
1. **Page Load Speed**: WordPress templates load average 4.5 seconds slower on mobile. This drops conversion rates and ruins SEO.
2. **Plugin Subscriptions**: Premium forms, security plugins, and caching engines can run up recurring bills of AED 1,500+ per year.
3. **Security Vulnerabilities**: Databases and plugins are open targets for SQL injections.

Investing in **custom React & Next.js code** ensures sub-second speeds, zero recurring licensing fees, and 100% intellectual property ownership.

If you are looking to audit your requirements, check out the transparent comparison at [CodeHTML](https://codehtml.in/) to understand how custom engineering stacks up against CMS site builders.`
};

async function publishToDevTo() {
  console.log('\n🚀 Publishing to Dev.to Community...');
  try {
    const response = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'api-key': DEVTO_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ article: devToArticle })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`✅ Dev.to Post Published Successfully!`);
      console.log(`🔗 Link: ${data.url}`);
    } else {
      console.error(`❌ Dev.to Error:`, data);
    }
  } catch (err) {
    console.error(`❌ Request failed:`, err.message);
  }
}

async function publishToMedium() {
  if (!MEDIUM_API_TOKEN) {
    console.log('\n⚠️ Medium token missing. Skipping Medium submission.');
    return;
  }

  console.log('\n🚀 Publishing to Medium...');
  try {
    // 1. Get User Profile ID
    const userRes = await fetch('https://api.medium.com/v1/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MEDIUM_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const userData = await userRes.json();
    if (!userRes.ok) {
      console.error(`❌ Medium Auth Failed:`, userData);
      return;
    }

    const userId = userData.data.id;
    console.log(`🔐 Authenticated Medium User: ${userData.data.username}`);

    // 2. Publish Article
    const postRes = await fetch(`https://api.medium.com/v1/users/${userId}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MEDIUM_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(mediumArticle)
    });

    const postData = await postRes.json();
    if (postRes.ok) {
      console.log(`✅ Medium Post Published Successfully!`);
      console.log(`🔗 Link: ${postData.data.url}`);
    } else {
      console.error(`❌ Medium Publish Failed:`, postData);
    }
  } catch (err) {
    console.error(`❌ Medium request failed:`, err.message);
  }
}

async function publishToHashnode() {
  if (!HASHNODE_API_TOKEN) {
    console.log('\n⚠️ Hashnode token missing. Skipping Hashnode submission.');
    return;
  }

  console.log('\n🚀 Publishing to Hashnode...');
  try {
    // 1. Get User Publication ID
    const queryMe = {
      query: `
        query GetUserPublications {
          me {
            publications(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      `
    };

    const meRes = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HASHNODE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(queryMe)
    });

    const contentType = meRes.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await meRes.text();
      console.error(`❌ Hashnode non-JSON response (Status ${meRes.status}):`, text.substring(0, 500));
      return;
    }

    const meData = await meRes.json();
    if (!meRes.ok || meData.errors) {
      console.error('❌ Hashnode Auth/Query Failed:', meData.errors || meData);
      return;
    }

    const pubEdge = meData.data?.me?.publications?.edges?.[0];
    if (!pubEdge) {
      console.error('❌ No Hashnode publication found for this account. Create a blog on Hashnode first.');
      return;
    }

    const publicationId = pubEdge.node.id;
    console.log(`🔐 Authenticated Hashnode Publication: "${pubEdge.node.title}"`);

    // 2. Publish the Post
    const mutationPublish = {
      query: `
        mutation PublishPost($input: PublishPostInput!) {
          publishPost(input: $input) {
            post {
              id
              slug
              url
            }
          }
        }
      `,
      variables: {
        input: {
          publicationId: publicationId,
          title: 'How Much Does a Website Cost in Dubai? (2026 Developer Pricing Guide)',
          subtitle: 'An honest pricing breakdown of web development costs in Dubai.',
          contentMarkdown: `If you are launching a business, startup, or real estate agency in Dubai, your first question is inevitably: **How much does a website cost in Dubai?**

The short answer is: **Website cost in Dubai ranges from AED 3,500 for a simple business site to AED 45,500+ for custom web portals and mobile apps.**

However, the real cost depends on whether you choose a cheap template or invest in custom engineering. In this guide, we break down the exact market rates for web development in Dubai for 2026.

---

### Dubai Web Development Pricing Tiers (AED)

- **Startup Engine (Custom Business Site)**: AED 3,500 – 6,000 (Timeline: 2–3 Weeks)
- **Growth System (Custom E-commerce / Portal)**: AED 6,500 – 15,000 (Timeline: 4–5 Weeks)
- **Enterprise Portal (SaaS, Custom App with User Auth)**: AED 16,000 – 45,000+ (Timeline: 6–8 Weeks)

If you want to estimate your custom build budget instantly, you can use the interactive [website cost calculator](https://codehtml.in/tools/website-cost-calculator) to get a tailored estimate in AED, USD, or INR.

---

### WordPress Templates vs. Custom React Code: The Hidden Costs

Many traditional agencies in Dubai sell template-based WordPress sites using builders like Elementor. While these seem cheaper upfront, they come with significant hidden costs:
1. **Page Load Speed**: WordPress templates load average 4.5 seconds slower on mobile. This drops conversion rates and ruins SEO.
2. **Plugin Subscriptions**: Premium forms, security plugins, and caching engines can run up recurring bills of AED 1,500+ per year.
3. **Security Vulnerabilities**: Databases and plugins are open targets for SQL injections.

Investing in **custom React & Next.js code** ensures sub-second speeds, zero recurring licensing fees, and 100% intellectual property ownership.

If you are looking to audit your requirements, check out the transparent comparison at [CodeHTML](https://codehtml.in/) to understand how custom engineering stacks up against CMS site builders.`,
          tags: [
            { slug: 'web-development', name: 'Web Development' },
            { slug: 'dubai', name: 'Dubai' },
            { slug: 'reactjs', name: 'ReactJS' }
          ]
        }
      }
    };

    const publishRes = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HASHNODE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(mutationPublish)
    });

    const publishData = await publishRes.json();
    if (publishRes.ok && !publishData.errors) {
      console.log('✅ Hashnode Post Published Successfully!');
      console.log(`🔗 Link: ${publishData.data.publishPost.post.url}`);
    } else {
      console.error('❌ Hashnode Publish Failed:', publishData.errors || publishData);
    }
  } catch (err) {
    console.error('❌ Hashnode request failed:', err.message);
  }
}

async function run() {
  // Already published to Dev.to, commenting out to avoid duplicate
  // await publishToDevTo();
  await publishToMedium();
  await publishToHashnode();
  console.log('\n🎉 Automation Task Finished.');
}

run();
