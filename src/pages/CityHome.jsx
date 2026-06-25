import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { findCityBySlug } from '../data/cityDataClient';
import Home from './Home';
import PageSkeleton from '../components/PageSkeleton';
import NotFound from './NotFound';

const DUBAI_REDIRECTS = {
  'web-design-dubai-marina': 'website-design-company-in-dubai-marina',
  'react-app-downtown-dubai': 'website-development-company-in-downtown-dubai',
  'saas-development-business-bay': 'ecommerce-development-company-in-business-bay',
  'mobile-apps-jlt': 'mobile-app-development-company-in-jlt-dubai',
  'web-design-jumeirah': 'website-design-agency-in-jumeirah',
  'custom-software-al-quoz': 'software-development-company-in-al-quoz',
  'mobile-apps-al-barsha': 'mobile-app-development-company-in-al-barsha',
  'web-design-deira': 'website-design-company-in-deira',
  'custom-software-bur-dubai': 'software-development-company-in-bur-dubai',
  'web-design-mirdif': 'website-design-agency-in-mirdif',
  'react-app-palm-jumeirah': 'website-development-company-in-palm-jumeirah',
  'saas-development-difc': 'ecommerce-development-company-in-difc-dubai',
  'mobile-apps-dubai-hills': 'mobile-app-development-company-in-dubai-hills',
  'web-design-arabian-ranches': 'website-design-agency-in-arabian-ranches',
  'react-app-jbr': 'website-development-company-in-jbr',
  'custom-software-meydan': 'software-development-company-in-meydan',
  'saas-development-dso': 'ecommerce-development-company-in-dso',
  'react-app-szr': 'website-development-company-on-sheikh-zayed-road'
};

function getNewSlug(oldSlug, pathname) {
  if (DUBAI_REDIRECTS[oldSlug]) {
    return DUBAI_REDIRECTS[oldSlug];
  }
  
  if (oldSlug.startsWith('web-design-')) {
    return oldSlug.replace('web-design-', 'website-design-company-in-');
  }
  if (oldSlug.startsWith('react-app-')) {
    return oldSlug.replace('react-app-', 'website-development-company-in-');
  }
  if (oldSlug.startsWith('saas-development-')) {
    return oldSlug.replace('saas-development-', 'ecommerce-development-company-in-');
  }
  if (oldSlug.startsWith('mobile-apps-')) {
    return oldSlug.replace('mobile-apps-', 'mobile-app-development-company-in-');
  }
  if (oldSlug.startsWith('custom-software-')) {
    return oldSlug.replace('custom-software-', 'software-development-company-in-');
  }

  // Handle GSC legacy paths
  if (pathname.startsWith('/city/')) {
    if (oldSlug.includes('-')) {
      const parts = oldSlug.split('-');
      const cityName = parts[parts.length - 1];
      const keyword = parts.slice(0, -1).join('-');
      return `${keyword}-in-${cityName}`;
    }
    return `website-development-in-${oldSlug}`;
  }
  if (pathname.startsWith('/ecommerce/')) {
    return `ecommerce-website-development-in-${oldSlug}`;
  }
  if (pathname.startsWith('/whatsapp-bot/')) {
    return `whatsapp-bot-in-${oldSlug}`;
  }
  if (pathname.startsWith('/area/')) {
    return `website-development-company-in-${oldSlug}`;
  }

  return null;
}

const CityHome = () => {
  const { serviceSlug = '', sectorSlug = '', slug = '' } = useParams();
  const location = useLocation();
  const [cityData, setCityData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if we need to redirect legacy slugs
  const searchSlug = serviceSlug && sectorSlug ? `${serviceSlug}__${sectorSlug}__${slug}` : slug;
  const redirectedSlug = getNewSlug(searchSlug, location.pathname);

  useEffect(() => {
    if (redirectedSlug) {
      return; // Skip loading if we're redirecting
    }

    let isMounted = true;
    const fetchCity = async () => {
      try {
        let searchSlug = '';
        if (serviceSlug && sectorSlug) {
          searchSlug = `${serviceSlug}__${sectorSlug}__${slug}`;
        } else {
          // Compatibility fallbacks for older routes
          if (location.pathname.startsWith('/whatsapp-bot/')) {
            searchSlug = `whatsapp-bot__real-estate__${slug}`;
          } else if (location.pathname.startsWith('/local-seo/')) {
            searchSlug = `local-seo__real-estate__${slug}`;
          } else if (location.pathname.startsWith('/area/')) {
            searchSlug = `website-development-company-in-${slug}`;
          } else {
            searchSlug = slug;
          }
        }

        const found = await findCityBySlug(searchSlug);
        if (isMounted) {
          setCityData(found || null);
          if (found) {
            if (found.region) sessionStorage.setItem('last_region', found.region);
            if (found.name) sessionStorage.setItem('last_city', found.name);
          }
        }
      } catch (error) {
        console.error('Failed to load city data', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchCity();
    return () => {
      isMounted = false;
    };
  }, [serviceSlug, sectorSlug, slug, location.pathname, redirectedSlug]);

  if (redirectedSlug) {
    return <Navigate to={`/${redirectedSlug}`} replace />;
  }

  if (loading) {
    return <PageSkeleton />;
  }

  if (!cityData) {
    return <NotFound />;
  }

  return <Home cityName={cityData.name} cityCategory={cityData.category} cityData={cityData} />;
};

export default CityHome;
