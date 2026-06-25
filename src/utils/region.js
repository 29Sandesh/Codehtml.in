export const detectIfIndia = () => {
  if (typeof window === 'undefined') return false;
  const queryParam = new URLSearchParams(window.location.search).get('region');
  if (queryParam === 'INDIA') return true;
  if (queryParam === 'DUBAI') return false;
  
  const lastRegion = sessionStorage.getItem('last_region');
  if (lastRegion === 'INDIA') return true;
  if (lastRegion === 'DUBAI') return false;
  
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' || tz.includes('Kolkata') || tz.includes('Calcutta')) return true;
  } catch (e) {}
  
  if (navigator.languages && navigator.languages.some(lang => lang.toLowerCase().includes('in'))) return true;
  
  return false;
};

export const detectCountryName = () => {
  if (typeof window === 'undefined') return 'Dubai';
  
  const queryParam = new URLSearchParams(window.location.search).get('country');
  if (queryParam) return queryParam;
  
  const regionParam = new URLSearchParams(window.location.search).get('region');
  if (regionParam === 'INDIA') return 'India';
  if (regionParam === 'DUBAI') return 'Dubai';

  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return 'Dubai';
    
    // Timezone mapping
    if (tz.includes('Kolkata') || tz.includes('Calcutta') || tz.includes('Asia/Kolkata') || tz.includes('Asia/Calcutta')) return 'India';
    if (tz.includes('Dubai') || tz.includes('Abu_Dhabi') || tz.includes('Muscat')) return 'the UAE';
    if (tz.includes('London') || tz.includes('Europe/London') || tz.includes('GB')) return 'the UK';
    if (tz.includes('Singapore')) return 'Singapore';
    if (tz.includes('Riyadh')) return 'Saudi Arabia';
    if (tz.includes('Qatar') || tz.includes('Doha')) return 'Qatar';
    if (tz.includes('Kuwait')) return 'Kuwait';
    if (tz.includes('Bahrain')) return 'Bahrain';
    if (tz.includes('Dublin')) return 'Ireland';
    if (tz.includes('Berlin') || tz.includes('Frankfurt') || tz.includes('Munich')) return 'Germany';
    if (tz.includes('Paris')) return 'France';
    if (tz.includes('Rome')) return 'Italy';
    if (tz.includes('Madrid')) return 'Spain';
    if (tz.includes('Amsterdam')) return 'Netherlands';
    if (tz.includes('Brussels')) return 'Belgium';
    if (tz.includes('Zurich')) return 'Switzerland';
    if (tz.includes('Vienna')) return 'Austria';
    if (tz.includes('Tokyo')) return 'Japan';
    if (tz.includes('Seoul')) return 'South Korea';
    if (tz.includes('Hong_Kong')) return 'Hong Kong';
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Brisbane') || tz.includes('Adelaide') || tz.includes('Perth') || tz.includes('Hobart') || tz.includes('Darwin')) return 'Australia';
    
    if (tz.includes('New_York') || tz.includes('Chicago') || tz.includes('Denver') || tz.includes('Los_Angeles') || tz.includes('Phoenix') || tz.includes('Anchorage') || tz.includes('Honolulu') || tz.includes('America/')) {
      if (tz.includes('Toronto') || tz.includes('Vancouver') || tz.includes('Montreal') || tz.includes('Edmonton') || tz.includes('Winnipeg') || tz.includes('Halifax')) {
        return 'Canada';
      }
      return 'the USA';
    }
  } catch (e) {}

  if (navigator.languages) {
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('in') || lang.toLowerCase().includes('hi'))) return 'India';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('ae') || lang.toLowerCase().includes('ar-ae'))) return 'the UAE';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('gb') || lang.toLowerCase().includes('en-gb'))) return 'the UK';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('us') || lang.toLowerCase().includes('en-us'))) return 'the USA';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('ca') || lang.toLowerCase().includes('en-ca') || lang.toLowerCase().includes('fr-ca'))) return 'Canada';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('au') || lang.toLowerCase().includes('en-au'))) return 'Australia';
    if (navigator.languages.some(lang => lang.toLowerCase().endsWith('sg') || lang.toLowerCase().includes('en-sg'))) return 'Singapore';
  }

  return 'Dubai';
};

export const detectCountryCode = () => {
  const country = detectCountryName();
  if (country === 'India') return 'IN';
  if (country === 'the UAE' || country === 'Dubai') return 'AE';
  if (country === 'the UK') return 'GB';
  if (country === 'the USA') return 'US';
  if (country === 'Singapore') return 'SG';
  return 'AE';
};

export const detectCountrySlug = () => {
  const code = detectCountryCode();
  if (code === 'IN') return 'india';
  if (code === 'AE') return 'dubai-uae';
  if (code === 'GB') return 'united-kingdom';
  if (code === 'US') return 'usa';
  if (code === 'SG') return 'singapore';
  return 'dubai-uae';
};

