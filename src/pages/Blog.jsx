import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogPosts } from '../data/cityDataClient';
import SEO from '../components/SEO';
import { db } from '../services/database';

const getCategoryThumbnail = (category) => {
  const cats = {
    'TECHNOLOGY': '/assets/services/react-app.webp',
    'AUTOMATION': '/Everything-you-need.webp',
    'SEO': '/hero-section-img.webp',
    'CRM': '/assets/services/custom-software.webp',
    'LEADS': '/Startup-competittion.webp',
  };
  return cats[category?.toUpperCase()] || '/hero-section-img.webp';
};

const Blog = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadAllBlogs = async () => {
      try {
        // 1. Fetch custom CMS blogs from DB
        const cmsBlogs = await db.getBlogs();
        const publishedCms = cmsBlogs.filter(b => b.status === 'published');
        
        // 2. Fetch static auto-generated blogs
        let staticBlogs = [];
        try {
          staticBlogs = await getBlogPosts();
        } catch (staticErr) {
          console.error("Failed to load static blogs:", staticErr);
        }

        if (isMounted) {
          // Merge CMS blogs (at the top) and static blogs
          setBlogPosts([...publishedCms, ...staticBlogs]);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Failed to load blogs:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadAllBlogs();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [blogPosts, searchTerm]);

  const displayedPosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  return (
    <main className="pt-24 md:pt-32 pb-10 md:pb-20 bg-black min-h-screen text-white selection:bg-vintage-gold selection:text-black">
      <SEO
        title="Blog | Web Development, SEO, AI Insights | Codehtml.in"
        description="Read Codehtml.in engineering insights on web performance, SEO strategy, mobile UX, and AI automation for growth-focused businesses in Dubai."
        keywords="web development blog, seo blog dubai, ai automation blog, website performance tips, react development blog, ecommerce seo insights"
      />
      <header className="px-4 md:px-12 mb-12 md:mb-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none select-none">
           <span className="font-headline font-black tracking-tighter text-[8rem] md:text-[15rem] leading-none text-white whitespace-nowrap">IDEAS // HUB</span>
         </div>
         <div className="relative z-10 max-w-[1600px] mx-auto text-left">
           <span className="font-body font-bold text-vintage-gold text-xs md:text-sm tracking-widest mb-4 block uppercase">
             INSIGHTS & INTEL
           </span>
           <h1 className="font-headline font-extrabold text-5xl sm:text-6xl md:text-8xl text-white leading-[0.85] max-w-4xl uppercase">
             ENGINEERING <span className="font-elegant italic font-light text-vintage-gold">INSIGHTS.</span>
           </h1>
           <p className="font-body text-base md:text-xl max-w-xl leading-relaxed text-zinc-400 font-medium border-l border-vintage-gold pl-4 md:pl-6 mt-6 md:mt-10 uppercase tracking-wide">
             WE SHARE OUR INTEL ON HIGH-PERFORMANCE CODE, AI SCALABILITY, AND MARKET DOMINANCE.
           </p>
         </div>
      </header>

      {/* Neighborhood & Keyword Search Filter */}
      <section className="px-4 md:px-12 mb-12 max-w-[1600px] mx-auto text-left">
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search blogs by neighborhood or topic (e.g. Marina, SEO)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(9); // Reset visible count on search
            }}
            className="w-full bg-zinc-950 border border-white/5 focus:border-vintage-gold/50 rounded-full px-8 py-4 outline-none transition-all text-sm md:text-base font-body font-semibold text-white placeholder-zinc-700"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="text-center py-20 text-zinc-500 font-body font-bold text-lg animate-pulse uppercase tracking-wider">
          Retrieving intelligence reports...
        </div>
      ) : (
        <section className="px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1600px] mx-auto">
          <AnimatePresence>
            {displayedPosts.map((post) => {
              const thumbnail = getCategoryThumbnail(post.category);
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="card-luxury relative cursor-pointer flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="aspect-video w-full overflow-hidden mb-6 border border-white/5 relative bg-zinc-950">
                      <img 
                        src={thumbnail} 
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    
                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                       <span className="font-body text-vintage-gold text-[10px] font-bold tracking-widest uppercase">{post.category}</span>
                       <span className="font-body text-zinc-500 text-[10px] font-bold tracking-widest uppercase">{post.date}</span>
                    </div>
                    
                    <h2 className="font-headline font-extrabold tracking-tight text-xl md:text-2xl text-white group-hover:text-vintage-gold transition-colors leading-snug mb-4 uppercase text-left">
                      {post.title}
                    </h2>
                    
                    <p className="font-body text-zinc-400 font-medium text-xs leading-relaxed mb-6 text-left">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <button className="btn-gold-solid px-6 py-3 text-[10px]">
                       READ INTEL ➲
                    </button>
                    <span className="font-body text-zinc-600 text-[10px] font-bold tracking-widest uppercase">{post.readTime}</span>
                  </div>
                  <span className="absolute -right-6 -bottom-6 font-headline font-black tracking-tighter text-9xl text-white opacity-[0.01] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                    {"/"}{post.id}
                  </span>
                </motion.article>
              );
            })}
        </AnimatePresence>
      </section>
      )}

      {!isLoading && filteredPosts.length > visibleCount && (
        <div className="flex justify-center mt-12 relative z-10">
          <button 
            onClick={() => setVisibleCount(prev => prev + 9)}
            className="btn-gold-solid px-8 py-4 text-xs md:text-sm"
          >
            LOAD MORE INTEL ➲
          </button>
        </div>
      )}

      <section className="px-4 md:px-12 mt-20 md:mt-40 max-w-[1600px] mx-auto">
        <div className="bg-zinc-950/40 backdrop-blur-md text-white border border-white/5 p-8 md:p-24 text-center rounded-2xl relative overflow-hidden">
           <div className="absolute w-[300px] h-[300px] bg-vintage-gold/5 rounded-full blur-[80px] -top-20 -right-20 pointer-events-none"></div>
           
           <h2 className="font-headline font-extrabold text-4xl md:text-7xl text-white mb-6 md:mb-8 leading-tight uppercase relative z-10">
             SUBSCRIBE TO <span className="font-elegant italic font-light text-vintage-gold">INTEL.</span>
           </h2>
           <p className="font-body text-zinc-400 font-medium tracking-wide text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto uppercase relative z-10">
             GET OUR LATEST ENGINEERING BREAKDOWNS AND MARKET INTEL DIRECTLY IN YOUR INBOX. NO SPAM. ONLY PURE ASSETS.
           </p>
           <form className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="bg-black border border-white/5 focus:border-vintage-gold/50 rounded-full px-6 py-4 font-body font-bold tracking-widest text-xs md:text-sm outline-none transition-all flex-grow text-white placeholder-zinc-700 uppercase"
              />
              <button className="btn-gold-solid px-8 py-4 text-xs md:text-sm whitespace-nowrap">
                JOIN INTEL ➲
              </button>
           </form>
        </div>
      </section>
    </main>
  );
};

export default Blog;
