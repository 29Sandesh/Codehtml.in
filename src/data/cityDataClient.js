import { selectVariation, generateDynamicFAQs, SERVICE_INTROS, REGIONAL_WHY_CHOOSE, REGIONAL_CTA } from '../../data/contentVariations.js';

const COUNTRY_MAP = {
  uae: {
    name: 'UAE', shortName: 'UAE', region: 'uae', currencySymbol: 'AED',
    priceStartup: '730', priceGrowth: '4,000', priceEnterprise: '11,000+'
  },
  singapore: {
    name: 'Singapore', shortName: 'Singapore', region: 'singapore', currencySymbol: 'SGD',
    priceStartup: '270', priceGrowth: '1,500', priceEnterprise: '4,000+'
  },
  india: {
    name: 'India', shortName: 'India', region: 'india', currencySymbol: '₹',
    priceStartup: '15,000', priceGrowth: '85,000', priceEnterprise: '2,50,000+'
  },
  uk: {
    name: 'United Kingdom', shortName: 'UK', region: 'uk', currencySymbol: '£',
    priceStartup: '160', priceGrowth: '900', priceEnterprise: '2,500+'
  },
  usa: {
    name: 'United States', shortName: 'USA', region: 'usa', currencySymbol: '$',
    priceStartup: '200', priceGrowth: '1,100', priceEnterprise: '3,000+'
  }
};

let cityListPromise;
let blogListPromise;
let growthListPromise;
let activeCitiesPromise;

export function getActiveCities() {
  if (!activeCitiesPromise) {
    activeCitiesPromise = fetch('/data/activeCities.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load active cities JSON: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        activeCitiesPromise = undefined;
        throw err;
      });
  }
  return activeCitiesPromise;
}

export function getCityPages() {
  if (!cityListPromise) {
    cityListPromise = fetch('/data/cityList.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load city list data: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        cityListPromise = undefined;
        throw err;
      });
  }
  return cityListPromise;
}

export async function findCityBySlug(slug) {
  try {
    const res = await fetch(`/data/cities/${slug}.json`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Ignore and proceed to fallback
  }

  // Fallback: Programmatic slug reconstruction in browser for 5.4M locations
  const match = slug.match(/^(.+)-in-([a-z0-9-]+)$/);
  if (!match) return null;

  const keywordSlug = match[1];
  const citySlug = match[2];

  let activeCities = [];
  try {
    activeCities = await getActiveCities();
  } catch (e) {
    console.error('Failed to load active cities JSON', e);
    return null;
  }

  let foundCityObj = activeCities.find(c => c.s === citySlug);
  let countryKey = '';

  if (!foundCityObj) {
    // Fallback 1: Dynamic import lookup in complete megaCityDatabase (since some cities got sliced from activeCities)
    try {
      const { ALL_COUNTRIES } = await import('../../data/megaCityDatabase.js');
      for (const [cKey, countryObj] of Object.entries(ALL_COUNTRIES)) {
        const found = countryObj.cities.find(c => c.slug === citySlug);
        if (found) {
          foundCityObj = {
            n: found.name,
            s: found.slug,
            c: cKey,
            st: found.state || found.area || '',
            la: found.lat,
            lo: found.lng
          };
          countryKey = cKey;
          break;
        }
      }
    } catch (err) {
      console.error('Failed to resolve city from megaCityDatabase fallback', err);
    }
  } else {
    countryKey = foundCityObj.c;
  }

  // Fallback 2: Direct dynamic parsing of city name from the slug if still not in database
  if (!foundCityObj) {
    const cityNameParsed = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    foundCityObj = {
      n: cityNameParsed,
      s: citySlug,
      c: 'india',
      st: '',
      la: undefined,
      lo: undefined
    };
    countryKey = 'india';
  }

  const country = COUNTRY_MAP[countryKey];
  if (!country) return null;

  const foundCity = {
    name: foundCityObj.n,
    slug: foundCityObj.s,
    state: foundCityObj.st,
    lat: foundCityObj.la,
    lng: foundCityObj.lo
  };

  const foundCountry = country;

  let serviceId = null;
  let serviceName = 'Web Development';
  const cleanKeyword = keywordSlug.replace(/-/g, ' ');

  // Resolve serviceId from keywordSlug
  const { ALL_KEYWORDS } = await import('../../data/allKeywordsDatabase.js');
  for (const [sId, service] of Object.entries(ALL_KEYWORDS.services)) {
    const allKws = [
      ...(service.tier1 || []),
      ...(service.tier2 || []),
      ...(service.tier3 || []),
      ...(service.competitorGap || []),
      ...(service.aeo || [])
    ].map(k => k.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/[\s-]+/g, '-'));

    if (allKws.includes(keywordSlug)) {
      serviceId = sId;
      serviceName = service.name;
      break;
    }
  }

  if (!serviceId) {
    serviceId = 'website-development';
  }

  const h1 = `${cleanKeyword.charAt(0).toUpperCase() + cleanKeyword.slice(1)} in ${foundCity.name}`;
  const metaTitle = `${h1} | CodeHTML`;
  const metaDesc = `Looking for ${cleanKeyword} in ${foundCity.name}? CodeHTML builds custom websites, e-commerce stores, and software platforms for local brands near ${foundCity.state || foundCity.area || 'CBD'}. Get a quote today.`;

  const intro = selectVariation(slug, SERVICE_INTROS[serviceId]);
  const whyChoose = REGIONAL_WHY_CHOOSE[foundCountry.region].join(' ');
  const ctaLine = selectVariation(slug, REGIONAL_CTA[foundCountry.region]);

  // Fetch related cities
  let relatedCities = [];
  try {
    const activeCities = await getActiveCities();
    // Filter cities by same country, exclude current, and pick random 10
    const sameCountryCities = activeCities.filter(c => c.c === foundCountry.region && c.s !== foundCityObj.s);
    const shuffled = sameCountryCities.sort(() => 0.5 - Math.random());
    relatedCities = shuffled.slice(0, 10).map(c => ({
      name: c.n,
      slug: c.s,
      url: `/${keywordSlug}-in-${c.s}`
    }));
  } catch (e) {
    console.error("Failed to load related cities", e);
  }

  const pricing = [
    {
      "name": "STARTUP ENGINE",
      "price": `${foundCountry.currencySymbol} ${foundCountry.priceStartup}`,
      "focus": `Bespoke ${serviceName} Setup`,
      "features": [
        `Tailored for ${foundCity.name} businesses`,
        "7-10 Days Rapid Delivery",
        "Complete Code & Design Ownership"
      ]
    },
    {
      "name": "GROWTH SYSTEM",
      "price": `${foundCountry.currencySymbol} ${foundCountry.priceGrowth}`,
      "focus": `Advanced ${serviceName} Engineering`,
      "features": [
        "Local compliance integration",
        "Secure Payment Gateways",
        "Priority Launch Support"
      ]
    },
    {
      "name": "ENTERPRISE PROTOCOL",
      "price": `${foundCountry.currencySymbol} ${foundCountry.priceEnterprise}`,
      "focus": "Enterprise Dynamic System",
      "features": [
        "High-capacity cloud optimization",
        "Dedicated Lead Architect",
        "24/7 Priority Support"
      ]
    }
  ];

  const faqs = generateDynamicFAQs(cleanKeyword, serviceName, foundCity, foundCountry);

  return {
    name: foundCity.name,
    slug,
    category: serviceName.toUpperCase(),
    sector: "TECHNOLOGY & B2B",
    metaTitle,
    metaDesc,
    h1,
    intro,
    servicesSection: `Our ${serviceName.toLowerCase()} services in ${foundCity.name} are designed to help your business grow online. We write clean, custom code that loads in under a second.`,
    whyChooseSection: whyChoose,
    workSection: `Our visual track record speaks for itself. We have engineered custom platforms like Alaya Realty and SLCC Construction.`,
    quoteSection: ctaLine,
    faqs,
    pricing,
    relatedCities,
    region: foundCountry.region.toUpperCase(),
    state: foundCity.state || foundCity.area || "",
    serviceType: serviceId
  };
}

export function getBlogPosts() {
  if (!blogListPromise) {
    blogListPromise = fetch('/data/blogList.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load blog list data: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        blogListPromise = undefined;
        throw err;
      });
  }
  return blogListPromise;
}

export async function findBlogPostBySlug(slug) {
  try {
    const res = await fetch(`/data/blogs/${slug}.json`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`Failed to load blog post ${slug}:`, err);
    return null;
  }
}

export function getGrowthGuides() {
  if (!growthListPromise) {
    growthListPromise = fetch('/data/growthList.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load growth guides data: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        growthListPromise = undefined;
        throw err;
      });
  }
  return growthListPromise;
}

export async function findGrowthGuideBySlug(slug) {
  try {
    const res = await fetch(`/data/growth/${slug}.json`);
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (err) {
    console.error(`Failed to load growth guide ${slug}:`, err);
    return null;
  }
}

let countryListPromise;
export function getCountryList() {
  if (!countryListPromise) {
    countryListPromise = fetch('/data/countries/countryList.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load country list: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        countryListPromise = undefined;
        throw err;
      });
  }
  return countryListPromise;
}

const stateListPromises = {};
export function getStateList(countrySlug) {
  if (!stateListPromises[countrySlug]) {
    stateListPromises[countrySlug] = fetch(`/data/countries/${countrySlug}/stateList.json`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load state list for ${countrySlug}: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        stateListPromises[countrySlug] = undefined;
        throw err;
      });
  }
  return stateListPromises[countrySlug];
}

export async function findCountryCityBySlug(countrySlug, citySlug) {
  try {
    const res = await fetch(`/data/countries/${countrySlug}/cities/${citySlug}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed to load country city ${countrySlug}/${citySlug}:`, err);
    return null;
  }
}

export async function findCountryStateBySlug(countrySlug, stateSlug) {
  try {
    const res = await fetch(`/data/countries/${countrySlug}/states/${stateSlug}.json`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error(`Failed to load country state ${countrySlug}/${stateSlug}:`, err);
    return null;
  }
}
