import React from 'react';

const PageSkeleton = () => {
  return (
    <div className="w-full min-h-screen bg-black text-vintage-gold/80 px-6 md:px-12 pt-28 pb-12 flex flex-col justify-between animate-pulse">
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Accent Pill Placeholder */}
        <div className="h-6 w-56 bg-zinc-900 border border-vintage-gold/20 rounded-full mb-8"></div>
        
        {/* Title Placeholder */}
        <div className="h-16 w-3/4 bg-zinc-900 rounded-md mb-6 max-w-3xl"></div>
        <div className="h-16 w-1/2 bg-zinc-900 rounded-md mb-8 max-w-2xl"></div>
        
        {/* Subtitle Placeholder */}
        <div className="h-4 w-1/3 bg-zinc-900 rounded-md mb-6 max-w-md"></div>
        
        {/* Button Placeholder */}
        <div className="h-12 w-64 bg-zinc-900 border border-vintage-gold/30 rounded-none mb-16"></div>
        
        {/* Grid Section Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="h-48 bg-zinc-900/60 border border-white/5 rounded-none p-6"></div>
          <div className="h-48 bg-zinc-900/60 border border-white/5 rounded-none p-6"></div>
          <div className="h-48 bg-zinc-900/60 border border-white/5 rounded-none p-6"></div>
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
