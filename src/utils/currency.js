import { useState, useEffect } from 'react';
import { detectCountryCode } from './region';

// Conversion mappings from legacy AED values to USD and INR (for static js data files)
const EXACT_MAPPINGS_AED = {
  399: { USD: 110, INR: 7999 },
  799: { USD: 220, INR: 14999 },
  1299: { USD: 350, INR: 24999 },
  1599: { USD: 440, INR: 29999 },
  1899: { USD: 520, INR: 34999 },
  2499: { USD: 690, INR: 49999 },
  3999: { USD: 1100, INR: 79999 },
  4999: { USD: 1380, INR: 99999 },
  5499: { USD: 1499, INR: 119999 },
  7999: { USD: 2200, INR: 149999 },
  9999: { USD: 2750, INR: 199999 },
  1500: { USD: 400, INR: 35000 },
  2500: { USD: 700, INR: 55000 },
  3000: { USD: 800, INR: 68000 },
  3500: { USD: 950, INR: 80000 },
  4000: { USD: 1100, INR: 90000 },
  4500: { USD: 1250, INR: 100000 },
  5000: { USD: 1400, INR: 110000 },
  5500: { USD: 1500, INR: 125000 },
  6500: { USD: 1800, INR: 145000 },
  7500: { USD: 2000, INR: 170000 },
  11500: { USD: 3100, INR: 260000 },
  12500: { USD: 3400, INR: 280000 }
};

// Conversion mappings from new USD baseline points to INR (for admin pricing baseline overrides)
const EXACT_MAPPINGS = {
  // Services
  200: { INR: 15000 },
  500: { INR: 38000 },
  1500: { INR: 110000 },
  
  // Products
  600: { INR: 45000 },
  1200: { INR: 90000 },
  3000: { INR: 250000 },
  
  // AI Solutions
  400: { INR: 30000 },
  1000: { INR: 75000 },
  2500: { INR: 185000 },
  
  // Get More Customers
  300: { INR: 22000 },
  750: { INR: 55000 },
  1800: { INR: 135000 },

  // General mappings
  1100: { INR: 85000 }
};

// Available currencies
export const CURRENCIES = [
  { code: 'USD', symbol: '$', label: 'USD (🇺🇸)' },
  { code: 'INR', symbol: '₹', label: 'INR (🇮🇳)' }
];

// Helper to get default currency
export const getDefaultCurrency = () => {
  if (typeof window === 'undefined') return 'USD';
  const saved = localStorage.getItem('site_currency');
  if (saved) {
    if (saved === 'AED') return 'USD'; // Migrate AED users to USD
    return saved;
  }

  const countryCode = detectCountryCode();
  if (countryCode === 'IN') return 'INR';
  return 'USD'; // Default for Rest of World
};

// Global listeners registry to synchronize currency state across components
let currencyListeners = [];
let currentCurrency = getDefaultCurrency();

const setGlobalCurrency = (newCurrency) => {
  currentCurrency = newCurrency;
  if (typeof window !== 'undefined') {
    localStorage.setItem('site_currency', newCurrency);
  }
  currencyListeners.forEach(listener => listener(newCurrency));
};

export const useCurrency = () => {
  const [currency, setCurrency] = useState(currentCurrency);

  useEffect(() => {
    const listener = (newVal) => setCurrency(newVal);
    currencyListeners.push(listener);
    
    // Sync initial state in case it changed since mount
    if (currency !== currentCurrency) {
      setCurrency(currentCurrency);
    }
    
    return () => {
      currencyListeners = currencyListeners.filter(l => l !== listener);
    };
  }, [currency]);

  return [currency, setGlobalCurrency];
};

export const formatPrice = (priceStr, targetCurrency) => {
  if (!priceStr) return '';
  
  const priceStrClean = priceStr.toString().trim();
  const hasPlus = priceStrClean.endsWith('+');
  const isAed = priceStrClean.toUpperCase().startsWith('AED');
  const numericValue = parseInt(priceStrClean.replace(/[^0-9]/g, '')) || 0;
  if (!numericValue) return priceStr;

  let formatted = '';
  if (isAed) {
    // legacy AED sub-items conversions
    if (targetCurrency === 'USD') {
      if (EXACT_MAPPINGS_AED[numericValue]?.USD) {
        formatted = `$${EXACT_MAPPINGS_AED[numericValue].USD.toLocaleString('en-US')}`;
      } else {
        const usdVal = Math.round((numericValue / 3.67) / 50) * 50;
        formatted = `$${usdVal.toLocaleString('en-US')}`;
      }
    } else if (targetCurrency === 'INR') {
      if (EXACT_MAPPINGS_AED[numericValue]?.INR) {
        formatted = `₹${EXACT_MAPPINGS_AED[numericValue].INR.toLocaleString('en-IN')}`;
      } else {
        const inrVal = Math.round((numericValue * 22.7) / 1000) * 1000;
        formatted = `₹${inrVal.toLocaleString('en-IN')}`;
      }
    } else {
      formatted = `AED ${numericValue.toLocaleString('en-AE')}`;
    }
  } else {
    // USD baseline conversions
    if (targetCurrency === 'USD') {
      formatted = `$${numericValue.toLocaleString('en-US')}`;
    } else if (targetCurrency === 'INR') {
      if (EXACT_MAPPINGS[numericValue]?.INR) {
        formatted = `₹${EXACT_MAPPINGS[numericValue].INR.toLocaleString('en-IN')}`;
      } else {
        const inrVal = Math.round((numericValue * 83.5) / 100) * 100;
        formatted = `₹${inrVal.toLocaleString('en-IN')}`;
      }
    } else {
      formatted = `$${numericValue.toLocaleString('en-US')}`;
    }
  }

  return hasPlus ? `${formatted}+` : formatted;
};
