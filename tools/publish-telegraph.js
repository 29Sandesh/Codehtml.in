import fs from 'fs';

// Helper to convert simple HTML string to Telegraph Node objects
// Supports: p, h1, h2, h3, h4, ul, li, strong, a, br, hr
function htmlToNodes(html) {
  // A very basic HTML to Telegraph node structure parser
  const tokens = html.split(/(<\/?[^>]+>)/g);
  const stack = [{ tag: 'root', children: [] }];
  
  tokens.forEach(token => {
    if (!token) return;
    
    if (token.startsWith('<')) {
      const isClosing = token.startsWith('</');
      const tagName = token.replace(/[<>\/]/g, '').split(' ')[0].toLowerCase();
      
      if (isClosing) {
        if (stack.length > 1 && stack[stack.length - 1].tag === tagName) {
          const finished = stack.pop();
          stack[stack.length - 1].children.push(finished);
        }
      } else {
        // Self-closing tags
        if (tagName === 'br') {
          stack[stack.length - 1].children.push({ tag: 'br' });
        } else if (tagName === 'hr') {
          stack[stack.length - 1].children.push({ tag: 'hr' });
        } else {
          // Parse attributes for tags like <a>
          const node = { tag: tagName, children: [] };
          if (tagName === 'a') {
            const hrefMatch = token.match(/href="([^"]+)"/);
            if (hrefMatch) {
              node.attrs = { href: hrefMatch[1] };
            }
          }
          stack.push(node);
        }
      }
    } else {
      // Decode simple HTML entities if any, otherwise push string directly
      const text = token
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
      stack[stack.length - 1].children.push(text);
    }
  });

  return stack[0].children;
}

// Statically defined HTML content tailored for Telegra.ph nodes (no unsupported table tag)
const articleHtml = `
<p>If you are launching a business, startup, or real estate agency in Dubai, your first question is inevitably: <strong>How much does a website cost in Dubai?</strong></p>
<p>The short answer is: <strong>Website cost in Dubai ranges from AED 3,500 for a simple business site to AED 45,500+ for custom web portals and mobile apps.</strong></p>
<p>However, the real cost depends on whether you choose a cheap template or invest in custom engineering. In this guide, we break down the exact market rates for web development in Dubai for 2026.</p>
<hr />
<h2>Dubai Web Development Pricing Tiers (AED)</h2>
<ul>
  <li><strong>Startup Engine (Custom Business Site)</strong>: AED 3,500 – 6,000 (Timeline: 2–3 Weeks)</li>
  <li><strong>Growth System (Custom E-commerce / Portal)</strong>: AED 6,500 – 15,000 (Timeline: 4–5 Weeks)</li>
  <li><strong>Enterprise Portal (SaaS, Custom App with User Auth)</strong>: AED 16,000 – 45,000+ (Timeline: 6–8 Weeks)</li>
</ul>
<p>If you want to estimate your custom build budget instantly, you can use the interactive <a href="https://codehtml.in/tools/website-cost-calculator">website cost calculator</a> to get a tailored estimate in AED, USD, or INR.</p>
<hr />
<h2>WordPress Templates vs. Custom React Code: The Hidden Costs</h2>
<p>Many traditional agencies in Dubai sell template-based WordPress sites using builders like Elementor. While these seem cheaper upfront, they come with significant hidden costs:</p>
<ol>
  <li><strong>Page Load Speed</strong>: WordPress templates load average 4.5 seconds slower on mobile. This drops conversion rates and ruins SEO.</li>
  <li><strong>Plugin Subscriptions</strong>: Premium forms, security plugins, and caching engines can run up recurring bills of AED 1,500+ per year.</li>
  <li><strong>Security Vulnerabilities</strong>: Databases and plugins are open targets for SQL injections.</li>
</ol>
<p>Investing in <strong>custom React & Next.js code</strong> ensures sub-second speeds, zero recurring licensing fees, and 100% intellectual property ownership.</p>
<p>If you are looking to audit your requirements, check out the transparent comparison at <a href="https://codehtml.in/">CodeHTML</a> to understand how custom engineering stacks up against CMS site builders.</p>
`;

async function publish() {
  console.log('🚀 Authenticating with Telegraph API...');
  
  // 1. Create Telegraph Account
  const accountRes = await fetch('https://api.telegra.ph/createAccount?short_name=CodeHTML&author_name=CodeHTML+Studio&author_url=https://codehtml.in');
  const accountData = await accountRes.json();
  
  if (!accountRes.ok || !accountData.ok) {
    console.error('❌ Failed to create account:', accountData);
    process.exit(1);
  }
  
  const token = accountData.result.access_token;
  console.log('🔐 Session token acquired.');

  // 2. Parse HTML content into Telegraph node format
  console.log('✏️ Formatting article content...');
  const nodes = htmlToNodes(articleHtml);

  // 3. Create Telegraph Page
  console.log('📤 Submitting page payload...');
  const pageRes = await fetch('https://api.telegra.ph/createPage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_token: token,
      title: 'How Much Does a Website Cost in Dubai? (2026 Developer Pricing Guide)',
      author_name: 'CodeHTML Studio',
      author_url: 'https://codehtml.in',
      content: nodes,
      return_content: false
    })
  });

  const pageData = await pageRes.json();
  if (pageRes.ok && pageData.ok) {
    console.log('\n🎉 Telegraph Post Published Successfully!');
    console.log(`🔗 Link: ${pageData.result.url}`);
  } else {
    console.error('❌ Telegraph Publish Failed:', pageData);
  }
}

publish().catch(console.error);
