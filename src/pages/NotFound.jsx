import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <main className="h-screen bg-black flex flex-col items-center justify-center px-4 text-center overflow-hidden relative selection:bg-vintage-red selection:text-white">
            <SEO 
                title="404 Page Not Found | Codehtml.in" 
                description="The page you are looking for has moved or does not exist. Explore our high-performance web development services and portfolio." 
                noindex={true}
            />
            
            <div className="absolute top-0 right-0 p-8 font-headline font-black tracking-tighter text-[15rem] md:text-[30rem] text-white opacity-[0.03] pointer-events-none select-none leading-none">
                404
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl">
                <div className="bg-vintage-red text-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] px-6 py-2 border border-zinc-800 font-body font-black text-[10px] md:text-xs tracking-[0.3em] uppercase mb-12 animate-pulse">
                    CRITICAL ERROR // NULL DETECTED
                </div>

                <h1 className="font-headline font-black text-6xl md:text-9xl text-white leading-[0.85] mb-8 uppercase">
                    WE LOST <br /> THE <span className="text-vintage-red italic">BRIDGE.</span>
                </h1>

                <p className="font-body text-lg md:text-2xl text-zinc-400 font-bold mb-14 max-w-2xl leading-tight uppercase tracking-wide">
                    THAT URL IS DEAD, BUT YOUR MISSION ISN'T. LET'S GET YOU BACK TO THE FRONT LINE.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                    <Link to="/" className="bg-white text-black px-8 py-5 border border-zinc-800 font-headline font-black text-sm md:text-lg tracking-widest uppercase rounded-none hover:bg-vintage-red hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
                        BACK TO HQ {'->'}
                    </Link>
                    <Link to="/portfolio" className="bg-zinc-900 text-white px-8 py-5 border border-zinc-800 font-headline font-black text-sm md:text-lg tracking-widest uppercase rounded-none hover:bg-vintage-red transition-all shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                        SQUAD WORK {'->'}
                    </Link>
                    <a href="/#services" className="bg-zinc-950 text-zinc-500 px-8 py-5 border border-zinc-800 font-headline font-black text-sm md:text-lg tracking-widest uppercase rounded-none hover:bg-vintage-red hover:text-white transition-all md:col-span-2">
                        EXPLORE SERVICES {'->'}
                    </a>
                </div>
                
                <div className="mt-20 pt-10 border-t border-zinc-800 w-full flex flex-wrap justify-center gap-6 md:gap-12 opacity-30 font-body font-black text-[8px] md:text-[10px] tracking-[0.2em] uppercase">
                    <span>STATUS: RECALIBRATING</span>
                    <span>COORDS: 0.0.0.0</span>
                    <span>INTEL: LOST</span>
                </div>
            </div>
        </main>
    );
};

export default NotFound;

