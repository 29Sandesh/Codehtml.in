import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { findBlogPostBySlug, getBlogPosts } from '../data/cityDataClient';
import SEO from '../components/SEO';
import { sculptLinks } from '../utils/linkSculptor';

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

const BlogPostDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadPostAndRelated = async () => {
      try {
        const foundPost = await findBlogPostBySlug(slug);
        if (!isMounted) return;

        if (foundPost) {
          setPost(foundPost);
          
          // Get related posts
          const list = await getBlogPosts();
          if (isMounted) {
            const sameCategory = list.filter(p => p.slug !== slug && p.category === foundPost.category);
            const otherCategories = list.filter(p => p.slug !== slug && p.category !== foundPost.category);
            const combined = [...sameCategory, ...otherCategories].slice(0, 3);
            setRelatedPosts(combined);
          }
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error('Failed to load blog post:', err);
        if (isMounted) setPost(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadPostAndRelated();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const postSchema = post ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Codehtml.in"
    },
    "mainEntityOfPage": `https://codehtml.in/blog/${post.slug}`,
    "datePublished": post.date
  } : null;

  if (loading) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center font-body font-bold text-lg animate-pulse uppercase tracking-wider text-vintage-gold">
          Opening intelligence transmission...
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="pt-20 pb-20 bg-black min-h-screen text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-headline font-black text-5xl md:text-7xl mb-6">POST NOT FOUND</h1>
          <button
            onClick={() => navigate('/blog')}
            className="btn-gold-solid px-8 py-4 font-headline font-bold tracking-widest"
          >
            BACK TO BLOG ➲
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 md:pt-32 pb-20 bg-black min-h-screen text-white selection:bg-vintage-gold selection:text-black">
      <SEO
        title={`${post.title} | Codehtml.in Blog`}
        description={post.excerpt}
        keywords={`${post.title}, ${post.category}, web development blog, seo insights, codehtml blog, ai automation, website performance`}
        schema={postSchema}
      />
      {/* Hero Section */}
      <header className="px-4 md:px-12 mb-12 md:mb-20 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-7xl mx-auto text-left"
        >
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="font-body font-bold text-vintage-gold text-xs uppercase tracking-widest underline decoration-2 underline-offset-4">
              {post.category}
            </span>
            <span className="font-body text-zinc-500 text-xs font-bold uppercase tracking-widest">
              {post.date}
            </span>
            <button
              onClick={handleShare}
              className={`font-body font-bold text-[8px] sm:text-[9px] tracking-widest px-3 py-1 border rounded-full uppercase transition-all duration-300 ${
                copied 
                  ? 'bg-vintage-gold text-black border-vintage-gold shadow-lg shadow-vintage-gold/20 scale-95' 
                  : 'text-zinc-400 hover:text-white border-white/10 hover:border-vintage-gold/30'
              }`}
            >
              {copied ? '✓ LINK COPIED' : '⎘ SHARE LINK'}
            </button>
          </div>

          <h1 className="font-headline font-extrabold text-5xl md:text-8xl text-white leading-[0.85] mb-10 uppercase">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-8 pb-10 border-b border-white/5">
            <div>
              <p className="font-body text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">BY</p>
              <p className="font-headline font-extrabold text-white text-xl uppercase italic">{post.author}</p>
            </div>
            <div>
              <p className="font-body text-zinc-500 text-[10px] font-bold tracking-widest uppercase mb-1">READ TIME</p>
              <p className="font-headline font-extrabold text-white text-xl uppercase italic">{post.readTime}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-[10px] font-bold tracking-widest text-vintage-gold border border-white/5 bg-zinc-900/30 px-3 py-1 uppercase rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </header>

      {/* Content */}
      <article className="px-4 md:px-12 max-w-5xl mx-auto mb-20 text-left">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="blog-content prose prose-invert max-w-none"
        >
          <style>{`
            .blog-content {
              font-family: inherit;
            }
            .blog-content h2 {
              font-family: var(--font-headline, system-ui);
              font-size: 2.5rem;
              font-weight: 800;
              color: white;
              text-transform: uppercase;
              margin-top: 4rem;
              margin-bottom: 2rem;
              line-height: 1.1;
              letter-spacing: -0.02em;
              border-left: 4px solid #2563eb;
              padding-left: 1.5rem;
            }
            @media (max-width: 768px) {
              .blog-content h2 {
                font-size: 1.75rem;
              }
            }
            .blog-content h3 {
              font-family: var(--font-headline, system-ui);
              font-size: 1.75rem;
              font-weight: 800;
              color: white;
              text-transform: uppercase;
              margin-top: 3rem;
              margin-bottom: 1.5rem;
              letter-spacing: -0.01em;
              font-style: italic;
            }
            .blog-content p {
              font-family: var(--font-body, system-ui);
              font-size: 1.125rem;
              line-height: 1.8;
              color: #a1a1aa;
              margin-bottom: 2rem;
              font-weight: 500;
            }
            .blog-content strong {
              color: white;
              font-weight: 800;
              text-decoration: underline;
              text-decoration-color: #2563eb;
            }
            .blog-content table {
              width: 100%;
              border-collapse: collapse;
              margin: 2rem 0;
            }
            .blog-content th, .blog-content td {
              border: 1px solid rgba(255,255,255,0.1);
              padding: 12px;
              text-align: left;
            }
            .blog-content th {
              background: #111;
              color: #2563eb;
            }
            .blog-content ul, .blog-content ol {
              margin: 2rem 0;
              padding-left: 1.5rem;
              color: #a1a1aa;
            }
            .blog-content li {
              margin-bottom: 1rem;
              line-height: 1.8;
              font-weight: 500;
            }
            .blog-content ol {
              list-style: decimal;
            }
            .blog-content ul {
              list-style: none;
            }
            .blog-content ul li::before {
              content: "➲";
              color: #2563eb;
              font-weight: 800;
              margin-right: 1rem;
            }
            .blog-content section {
              display: contents;
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: sculptLinks(post.content) }} />
        </motion.div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="px-4 md:px-12 mt-40 mb-20 max-w-7xl mx-auto">
          <h2 className="font-headline font-extrabold text-4xl md:text-7xl text-white leading-[0.85] mb-16 uppercase text-left">
            READ MORE <span className="font-elegant italic font-light text-vintage-gold">INTEL.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map((relPost) => {
              const thumbnail = getCategoryThumbnail(relPost.category);
              return (
                <motion.article
                  key={relPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="card-luxury relative cursor-pointer flex flex-col justify-between overflow-hidden group"
                  onClick={() => navigate(`/blog/${relPost.slug}`)}
                >
                  <div>
                    {/* Thumbnail Image Container */}
                    <div className="aspect-video w-full overflow-hidden mb-6 border border-white/5 relative bg-zinc-950">
                      <img 
                        src={thumbnail} 
                        alt={relPost.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div className="flex justify-between items-start mb-4 pb-4 border-b border-white/5">
                      <span className="font-body text-vintage-gold text-[10px] font-bold tracking-widest uppercase">{relPost.category}</span>
                      <span className="font-body text-zinc-500 text-[10px] font-bold tracking-widest uppercase">{relPost.date}</span>
                    </div>
                    <h3 className="font-headline font-extrabold text-xl md:text-2xl text-white group-hover:text-vintage-gold transition-colors leading-snug mb-4 uppercase text-left">
                      {relPost.title}
                    </h3>
                    <p className="font-body text-zinc-400 font-medium text-xs leading-relaxed mb-6 text-left">
                      {relPost.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <button className="btn-gold-solid px-6 py-3 text-[10px]">
                      READ INTEL ➲
                    </button>
                    <span className="font-body text-zinc-650 text-[10px] font-bold tracking-widest uppercase">{relPost.readTime}</span>
                  </div>
                  <span className="absolute -right-6 -bottom-6 font-headline font-black text-9xl text-white opacity-[0.01] pointer-events-none group-hover:scale-110 transition-transform">
                    /{relPost.id}
                  </span>
                </motion.article>
              );
            })}
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="px-4 md:px-12 text-center">
        <button
          onClick={() => navigate('/blog')}
          className="btn-gold-outline px-10 py-5 text-xs md:text-sm"
        >
          BACK TO ALL INTEL ➲
        </button>
      </section>
    </main>
  );
};

export default BlogPostDetail;
