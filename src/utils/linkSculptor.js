/**
 * Programmatic Link Sculptor — CodeHTML
 * Implements Tactic 09: Auto-sculpts exact-match anchor text links.
 * Uses placeholder-based compiler matching to prevent tag collision,
 * nested tag bugs, or matching text inside tag attributes.
 */
export function sculptLinks(htmlContent) {
  if (!htmlContent) return '';
  
  const mappings = [
    { phrase: 'website-cost-in-dubai', url: '/website-cost-in-dubai' },
    { phrase: 'website cost in dubai', url: '/website-cost-in-dubai' },
    { phrase: 'custom website development', url: '/service/custom-website-development' },
    { phrase: 'custom software development', url: '/services/custom-software-development' },
    { phrase: 'react development', url: '/service/custom-website-development' },
    { phrase: 'saas development', url: '/services/saas-development' },
    { phrase: 'mobile app development', url: '/services/mobile-app-development' },
    { phrase: 'website design company in dubai', url: '/web-design-in-dubai' },
    { phrase: 'web development company in dubai', url: '/web-development-in-dubai' },
    { phrase: 'web development dubai guide', url: '/web-development-dubai-guide' },
    { phrase: 'web-development-dubai-guide', url: '/web-development-dubai-guide' },
    { phrase: 'digital gravity alternative', url: '/digital-gravity-alternative' },
    { phrase: 'webcastle alternative', url: '/webcastle-alternative' },
    { phrase: 'redspider alternative', url: '/redspider-alternative' }
  ];

  // Sort by phrase length descending to match longer, more specific phrases first
  mappings.sort((a, b) => b.phrase.length - a.phrase.length);

  // Split the HTML content by tags to ensure we only touch raw text nodes
  const tokens = htmlContent.split(/(<\/?[^>]+>)/g);
  const placeholders = [];

  const processedTokens = tokens.map(token => {
    if (token.startsWith('<')) {
      return token; // Keep HTML tags completely untouched
    }

    let text = token;
    mappings.forEach(({ phrase, url }) => {
      // Regex matches word boundaries for the exact phrase
      const regex = new RegExp(`\\b(${phrase})\\b`, 'gi');
      
      text = text.replace(regex, (match) => {
        const placeholderId = `__LINK_PLACEHOLDER_${placeholders.length}__`;
        placeholders.push({
          id: placeholderId,
          html: `<a href="${url}" class="text-vintage-gold underline hover:text-white transition-colors font-semibold">${match}</a>`
        });
        return placeholderId;
      });
    });

    return text;
  });

  let joined = processedTokens.join('');

  // Re-inject the HTML link tags in place of placeholders
  placeholders.forEach(({ id, html }) => {
    joined = joined.replace(id, html);
  });

  return joined;
}
