import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * SEO Component — Codehtml.in
 * Handles: Meta tags, Canonical, Open Graph, Twitter, JSON-LD Schema
 */
const SEO = ({ 
  title, 
  description, 
  image = 'https://codehtml.in/hero-section-img.webp',
  imageAlt = 'CodeHTML — Premium Custom Software & Web Development Studio',
  type = 'website',
  schema,
  noindex = false,
  keywords = '',
  faqList = null,
  breadcrumbs = null
}) => {
  const location = useLocation();
  const normalizedPath = location.pathname === '/' ? '/' : location.pathname.replace(/\/$/, '');
  const url = `https://codehtml.in${normalizedPath}`;
  const isHomepage = normalizedPath === '/';

  // Keywords have been intentionally removed as per 2024 SEO guidelines.
  // Google ignores them, and Bing penalizes overuse (keyword stuffing).

  useEffect(() => {
    // ── 1. Title ──────────────────────────────────────────────────────────────
    if (title) document.title = title;

    // ── 2. Meta Helper ────────────────────────────────────────────────────────
    const setMeta = (property, content, attr = 'name') => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${property}"]`);
      if (el) {
        el.setAttribute('content', content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute(attr, property);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
      }
    };

    // ── 3. Standard Meta ──────────────────────────────────────────────────────
    if (description) setMeta('description', description);
    setMeta('robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );
    setMeta('googlebot',
      noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // ── 4. Open Graph ─────────────────────────────────────────────────────────
    if (title) setMeta('og:title', title, 'property');
    if (description) setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:image', image, 'property');
    setMeta('og:image:alt', imageAlt, 'property');
    setMeta('og:site_name', 'CodeHTML', 'property');
    setMeta('og:locale', 'en_AE', 'property');

    // ── 5. Twitter ────────────────────────────────────────────────────────────
    if (title) setMeta('twitter:title', title, 'name');
    if (description) setMeta('twitter:description', description, 'name');
    setMeta('twitter:url', url, 'name');
    setMeta('twitter:image', image, 'name');
    setMeta('twitter:image:alt', imageAlt, 'name');
    setMeta('twitter:card', 'summary_large_image', 'name');
    setMeta('twitter:site', '@codehtml', 'name');

    // ── 6. Canonical ──────────────────────────────────────────────────────────
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', url);
    } else {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }

    // ── 7. JSON-LD Schema ─────────────────────────────────────────────────────
    const removeScript = (id) => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
    removeScript('json-ld-schema');

    const graphElements = [];

    graphElements.push({
      "@type": "WebSite",
      "@id": "https://codehtml.in/#website",
      "url": "https://codehtml.in",
      "name": "CodeHTML",
      "description": "Premium custom software development, React web applications, custom SaaS platforms, and mobile apps studio.",
      "inLanguage": "en-US",
      "publisher": { "@id": "https://codehtml.in/#organization" }
    });

    graphElements.push({
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": title,
      "description": description,
      "isPartOf": { "@id": "https://codehtml.in/#website" },
      "inLanguage": "en-US"
    });

    // Pinned Organization only on homepage for E-E-A-T compliance
    if (isHomepage) {
      graphElements.push({
        "@type": ["Organization", "ProfessionalService", "LocalBusiness"],
        "@id": "https://codehtml.in/#organization",
        "name": "CodeHTML",
        "legalName": "CodeHTML Technologies",
        "alternateName": ["CodeHTML Studio", "CodeHTML Software Studio"],
        "url": "https://codehtml.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://codehtml.in/Codehtml.logo.png",
          "width": 200,
          "height": 60
        },
        "image": image,
        "description": "CodeHTML is a premium digital engineering studio. We build elite custom websites, web apps, custom SaaS platforms, and iOS & Android mobile applications.",
        "telephone": "+919303228082",
        "email": "Contact@Codehtml.in",
        "priceRange": "$$$",
        "currenciesAccepted": "AED, USD, INR, GBP, SGD",
        "paymentAccepted": "Bank Transfer, Credit Card, Crypto",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Business Bay",
          "addressLocality": "Dubai",
          "addressRegion": "Dubai",
          "postalCode": "00000",
          "addressCountry": "AE"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 25.1852,
          "longitude": 55.2728
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
            "opens": "09:00",
            "closes": "21:00"
          }
        ],
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": "10"
        },
        "foundingDate": "2024",
        "sameAs": [
          "https://codehtml.in",
          "https://www.linkedin.com/company/codehtml/",
          "https://www.instagram.com/codehtml.in/",
          "https://www.crunchbase.com/organization/codehtml",
          "https://clutch.co/profile/codehtml",
          "https://www.facebook.com/codehtml",
          "https://twitter.com/codehtml",
          "https://www.youtube.com/@codehtml",
          "https://www.medium.com/@codehtml"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        },
        "review": [
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Farhan Alaya" },
            "reviewBody": "CodeHTML built a custom property management web app for alayarealty.in that completely blew our expectations. Our site speed went from 5.4s to 0.7s, and the custom real-time inventory synchronization works flawlessly!",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "itemReviewed": {
              "@type": "LocalBusiness",
              "@id": "https://codehtml.in/#organization",
              "name": "CodeHTML",
              "image": "https://codehtml.in/Codehtml.logo.png",
              "telephone": "+919303228082",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Business Bay",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
              }
            }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Sandeep Verma" },
            "reviewBody": "The restaurant delivery portal and booking dashboard CodeHTML built for swigatoindia.in is incredibly fast. Order routing is instant and SEO traffic has grown by 300% since launch.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "itemReviewed": {
              "@type": "LocalBusiness",
              "@id": "https://codehtml.in/#organization",
              "name": "CodeHTML",
              "image": "https://codehtml.in/Codehtml.logo.png",
              "telephone": "+919303228082",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Business Bay",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
              }
            }
          },
          {
            "@type": "Review",
            "author": { "@type": "Person", "name": "Rahul Sen" },
            "reviewBody": "We needed a real-time collaborative workspace for our SaaS documentation at thecircle.in. The sub-second markdown editor and syncing engine built by CodeHTML are engineering masterpieces.",
            "reviewRating": { "@type": "Rating", "ratingValue": "5" },
            "itemReviewed": {
              "@type": "LocalBusiness",
              "@id": "https://codehtml.in/#organization",
              "name": "CodeHTML",
              "image": "https://codehtml.in/Codehtml.logo.png",
              "telephone": "+919303228082",
              "priceRange": "$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Business Bay",
                "addressLocality": "Dubai",
                "addressRegion": "Dubai",
                "postalCode": "00000",
                "addressCountry": "AE"
              }
            }
          }
        ]
      });
      
      // Services Schema
      const services = [
        "React Development", 
        "Custom Software Development", 
        "SaaS Development", 
        "Mobile App Development",
        "E-Commerce Development"
      ];
      services.forEach(svc => {
        graphElements.push({
          "@type": "Service",
          "name": svc,
          "provider": { "@id": "https://codehtml.in/#organization" }
        });
      });
    }

    if (breadcrumbs && Array.isArray(breadcrumbs)) {
      graphElements.push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((bc, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": bc.name,
          "item": bc.item.startsWith('http') ? bc.item : `https://codehtml.in${bc.item}`
        }))
      });
    }

    if (faqList && Array.isArray(faqList)) {
      graphElements.push({
        "@type": "FAQPage",
        "mainEntity": faqList.map(item => ({
          "@type": "Question",
          "name": item.q || item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a || item.answer
          }
        }))
      });
    }

    if (schema) {
      if (Array.isArray(schema)) {
        schema.forEach(s => graphElements.push(s));
      } else {
        graphElements.push(schema);
      }
    }

    const finalSchema = {
      "@context": "https://schema.org",
      "@graph": graphElements
    };

    const orgScript = document.createElement('script');
    orgScript.id = 'json-ld-schema';
    orgScript.type = 'application/ld+json';
    orgScript.text = JSON.stringify(finalSchema);
    document.head.appendChild(orgScript);

  }, [title, description, image, type, url, schema, noindex, faqList, breadcrumbs, isHomepage]);

  return null;
};

export default SEO;
