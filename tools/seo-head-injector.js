// tools/seo-head-injector.js
// Injects per-page SEO metadata into a prerendered HTML template's <head>.
// Strips any existing dynamic tags first, then appends a clean fresh set
// before </head> — so it works regardless of current attribute order/quoting.

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function injectHeadTags(html, page) {
  const {
    title,
    description,
    url,                                       // full canonical URL, e.g. https://codehtml.in/city/website-development-kannur
    image = 'https://codehtml.in/hero-section-img.webp',
    schemaHtml = '',
  } = page;

  // Strip existing dynamic tags (case-insensitive, order/quote-agnostic)
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]*name=["']description["'][^>]*>/i, '')
    .replace(/<link[^>]*rel=["']canonical["'][^>]*>/i, '')
    .replace(/<meta[^>]*(?:property|name)=["']og:(title|description|url|image|type|site_name)["'][^>]*>/gi, '')
    .replace(/<meta[^>]*(?:property|name)=["']twitter:(title|description|url|image|card)["'][^>]*>/gi, '')
    .replace(/<script[^>]*id=["']json-ld-schema["'][\s\S]*?<\/script>/i, '');

  const tags = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="CodeHTML" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  let headInsert = `  ${tags.join('\n  ')}`;
  if (schemaHtml) {
    headInsert += `\n  ${schemaHtml}`;
  }

  return html.replace('</head>', `${headInsert}\n</head>`);
}
