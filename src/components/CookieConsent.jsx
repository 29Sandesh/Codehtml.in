import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowBanner(false);
    // Initialize Google Analytics if the helper exists
    if (typeof window.initGA === 'function') {
      window.initGA();
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md border border-vintage-gold/20 backdrop-blur-md p-5 rounded-xl shadow-2xl z-[9999] transition-all duration-300 ease-in-out text-force-white"
      style={{ backgroundColor: '#09090b', color: '#ffffff' }}
    >
      <div className="flex flex-col gap-4">
        <div>
          <h4 className="font-headline font-bold text-sm tracking-widest uppercase mb-1 text-force-white">
            Cookie Consent
          </h4>
          <p className="font-body text-xs leading-relaxed text-force-white">
            We use cookies to analyze site traffic and improve your browsing experience. By clicking "Accept", you consent to our use of Google Analytics. Learn more in our{' '}
            <Link 
              to="/privacy-policy" 
              className="underline transition-colors hover:text-white" 
              style={{ color: '#c5a880' }}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 font-body text-xs font-bold uppercase tracking-wider">
          <button
            onClick={handleDecline}
            className="px-4 py-2 border border-white/10 hover:border-white/30 rounded-lg transition-colors cursor-pointer text-zinc-400"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg transition-colors cursor-pointer text-black font-extrabold"
            style={{ backgroundColor: '#c5a880' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
