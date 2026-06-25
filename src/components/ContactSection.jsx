import React, { useState } from 'react';

const ContactSection = () => {
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <section id="contact" className="px-4 sm:px-6 py-6 sm:py-10 md:py-12 bg-[#050505] relative z-10 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="font-headline font-extrabold text-2xl sm:text-6xl md:text-7xl text-white leading-none mb-4 sm:mb-8 uppercase">
          Get a Free Quote
        </h2>
        <p className="font-body text-zinc-400 text-xs sm:text-sm md:text-xl leading-relaxed mb-6 sm:mb-12 font-medium max-w-2xl text-left">
          Contact us directly at <a href="mailto:Contact@Codehtml.in" className="text-vintage-gold underline hover:text-white transition-colors">Contact@Codehtml.in</a> to initiate your build.
        </p>

        <div className="flex flex-wrap gap-2.5 sm:gap-4">
          <button 
            onClick={() => {
              setEmailRevealed(true);
              navigator.clipboard.writeText('Contact@Codehtml.in');
              setTimeout(() => setEmailRevealed(false), 3000);
            }}
            className="bg-vintage-gold hover:bg-white text-black font-body font-bold text-[10px] sm:text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all border border-vintage-gold hover:border-white cursor-pointer"
          >
            {emailRevealed ? 'Email Copied!' : 'Copy Email ➲'}
          </button>
          
          <a 
            href="https://www.linkedin.com/company/codehtml" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="border border-white/10 hover:border-vintage-gold hover:text-vintage-gold bg-zinc-950/60 text-white font-body font-bold text-[10px] sm:text-xs uppercase tracking-wider px-6 py-4 rounded-full transition-all flex items-center justify-center"
          >
            LinkedIn Connect
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
