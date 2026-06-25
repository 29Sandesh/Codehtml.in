import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: "CodeHTML built a custom property management web app for alayarealty.in that completely blew our expectations. Our site speed went from 5.4s to 0.7s, and the custom real-time inventory synchronization works flawlessly!",
    author: "FARHAN ALAYA",
    role: "FOUNDER OF ALAYAREALTY.IN",
    stars: 5,
    location: "DUBAI MARINA"
  },
  {
    quote: "As civil construction specialists at slcc.in, we required a platform that presented structural authority and corporate prestige. The custom React frontend and GPU-accelerated client bidding portal CodeHTML built for us are absolute masterpieces.",
    author: "SIDDHARTH LAKHANI",
    role: "CEO OF SLCC.IN",
    stars: 5,
    location: "BUSINESS BAY"
  },
  {
    quote: "We needed a custom B2B client onboarding tool and booking mobile application. CodeHTML delivered a high-performance React Native app in under 3 weeks. It runs offline-first and integrates Stripe payments seamlessly.",
    author: "ELENA ROSTOVA",
    role: "SAAS FOUNDER & PRODUCT DIRECTOR",
    stars: 5,
    location: "DIFC"
  }
];

const FloatingTestimonials = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const active = TESTIMONIALS[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-body select-none hidden md:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="w-[320px] sm:w-[360px] bg-black/95 backdrop-blur-xl border border-vintage-gold/30 p-6 rounded-2xl shadow-[0_20px_50px_rgba(197,168,128,0.15)] text-left mb-4 relative"
          >
            {/* Close trigger */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-white transition-colors"
              aria-label="Close Testimonial"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Glowing accent indicator */}
            <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-vintage-gold to-transparent"></div>

            {/* Stars row */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(active.stars)].map((_, i) => (
                <svg key={i} className="w-4.5 h-4.5 text-vintage-gold fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote content */}
            <motion.p
              key={currentIndex}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-zinc-300 font-medium text-xs sm:text-sm leading-relaxed mb-4 italic"
            >
              "{active.quote}"
            </motion.p>

            {/* Client detail footer */}
            <div className="flex justify-between items-end border-t border-white/5 pt-3">
              <div>
                <h4 className="font-headline font-black text-xs text-white tracking-wide uppercase leading-none mb-1">
                  {active.author}
                </h4>
                <span className="font-body font-bold text-vintage-gold text-[7px] sm:text-[8px] tracking-widest uppercase">
                  {active.role}
                </span>
              </div>
              <span className="bg-zinc-900 border border-white/10 text-zinc-500 font-body font-black text-[7px] px-2 py-0.5 uppercase tracking-widest rounded">
                {active.location}
              </span>
            </div>

            {/* Carousel navigation indicators */}
            <div className="flex justify-center gap-1.5 mt-4">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? 'w-4 bg-vintage-gold' : 'w-1.5 bg-zinc-700'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-black/40 backdrop-blur-xl border border-vintage-gold/50 text-white pl-4 pr-5 py-3 rounded-full shadow-[0_10px_30px_rgba(197,168,128,0.1)] hover:border-vintage-gold hover:bg-black/60 hover:shadow-[0_10px_40px_rgba(197,168,128,0.2)] transition-all cursor-pointer select-none"
      >
        <span className="relative flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vintage-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-vintage-gold"></span>
        </span>
        <span className="font-body font-bold text-[9px] sm:text-[10px] tracking-widest uppercase text-vintage-gold">
          {isOpen ? 'CLOSE REVIEWS' : 'CLIENT EXPERIENCES ✦'}
        </span>
      </motion.button>
    </div>
  );
};

export default FloatingTestimonials;
