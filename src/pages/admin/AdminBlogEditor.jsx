import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../services/database';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit3, 
  Bold, 
  Italic, 
  Heading1, 
  Heading2, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  List, 
  ListOrdered, 
  FileText,
  HelpCircle,
  Undo
} from 'lucide-react';

const CATEGORIES = ['TECHNOLOGY', 'AUTOMATION', 'SEO', 'CRM', 'LEADS'];

export default function AdminBlogEditor() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditMode = !!slug;

  const [title, setTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [category, setCategory] = useState('TECHNOLOGY');
  const [tags, setTags] = useState('');
  const [author, setAuthor] = useState('FOUNDING TEAM');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  
  const [previewMode, setPreviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const contentAreaRef = useRef(null);

  useEffect(() => {
    if (isEditMode) {
      loadBlogDetail();
    }
  }, [slug]);

  const loadBlogDetail = async () => {
    try {
      setLoading(true);
      const blog = await db.getBlog(slug);
      if (blog) {
        setTitle(blog.title);
        setBlogSlug(blog.slug);
        setCategory(blog.category);
        setTags(blog.tags.join(', '));
        setAuthor(blog.author);
        setExcerpt(blog.excerpt);
        setContent(blog.content);
        setFeaturedImage(blog.featuredImage);
        setStatus(blog.status);
        setMetaTitle(blog.metaTitle || '');
        setMetaDescription(blog.metaDescription || '');
      } else {
        alert("Blog post not found!");
        navigate('/admin/blogs');
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load blog details");
    } finally {
      setLoading(false);
    }
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditMode) {
      const generated = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with hyphens
        .replace(/-+/g, '-')          // replace multiple hyphens
        .trim();
      setBlogSlug(generated);
    }
  };

  const handleInsertHtml = (tagOpen, tagClose = '') => {
    const textarea = contentAreaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = textarea.value.substring(start, end);
    const before = textarea.value.substring(0, start);
    const after = textarea.value.substring(end);

    const replacement = tagOpen + (selection || 'text') + tagClose;
    setContent(before + replacement + after);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tagOpen.length, start + tagOpen.length + (selection || 'text').length);
    }, 50);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim() || !blogSlug.trim()) {
      alert("Title and Slug are required.");
      return;
    }

    const tagsArray = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const blogData = {
      title,
      slug: blogSlug,
      category,
      tags: tagsArray,
      author,
      excerpt,
      content,
      featuredImage: featuredImage || '/hero-section-img.webp',
      status,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
    };

    try {
      setLoading(true);
      if (isEditMode) {
        await db.updateBlog(slug, blogData);
      } else {
        await db.addBlog(blogData);
      }
      navigate('/admin/blogs');
    } catch (err) {
      alert(err.message || "Failed to save blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/blogs')}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 hover:text-slate-700 transition cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {isEditMode ? 'Edit Editorial Post' : 'New Thought Leadership'}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">
              {isEditMode ? `Updating ${blogSlug}` : 'Publish insights to front-end blog engine'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 transition cursor-pointer"
          >
            {previewMode ? (
              <>
                <Edit3 className="h-4 w-4" />
                <span>Return to Editor</span>
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                <span>Live Preview</span>
              </>
            )}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 transition cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>{isEditMode ? 'Update Post' : 'Publish Post'}</span>
          </button>
        </div>
      </div>

      {loading && !previewMode ? (
        <div className="flex justify-center items-center h-64">
          <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : previewMode ? (
        /* ==================== PREVIEW SCREEN ==================== */
        <div className="bg-black text-white border border-zinc-800 rounded-3xl p-8 max-w-4xl mx-auto space-y-6 text-left shadow-2xl">
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-4 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
              <span>{category}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">TODAY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase leading-none">
              {title || 'UNTITLED ARTICLE'}
            </h1>
            <div className="flex items-center gap-4 mt-6 text-xs text-slate-400">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">By</span>
                <span className="font-bold text-white uppercase italic">{author}</span>
              </div>
              <div className="h-6 border-l border-slate-800"></div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-mono block">Read Time</span>
                <span className="font-bold text-white uppercase italic">
                  {Math.max(2, Math.round(content.split(' ').length / 200))} MIN READ
                </span>
              </div>
            </div>
          </div>

          {/* Excerpt panel */}
          {excerpt && (
            <div className="border-l-2 border-blue-500 pl-4 py-1 text-slate-400 italic text-sm">
              {excerpt}
            </div>
          )}

          {/* Featured Image */}
          {featuredImage && (
            <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black">
              <img 
                src={featuredImage} 
                alt="Featured preview" 
                className="w-full h-full object-cover" 
                onError={(e) => { e.target.src = '/hero-section-img.webp'; }}
              />
            </div>
          )}

          {/* Styled HTML Output */}
          <div className="prose prose-invert max-w-none text-slate-350 text-sm md:text-base leading-relaxed space-y-4">
            <style>{`
              .preview-content h2 {
                font-size: 1.75rem;
                font-weight: 800;
                color: white;
                text-transform: uppercase;
                margin-top: 2.5rem;
                margin-bottom: 1rem;
                border-left: 4px solid #2563eb;
                padding-left: 1rem;
              }
              .preview-content h3 {
                font-size: 1.35rem;
                font-weight: 800;
                color: white;
                text-transform: uppercase;
                margin-top: 2rem;
                margin-bottom: 0.75rem;
                font-style: italic;
              }
              .preview-content p {
                margin-bottom: 1.25rem;
              }
              .preview-content strong {
                color: white;
                font-weight: bold;
                text-decoration: underline;
                text-decoration-color: #2563eb;
              }
              .preview-content ul {
                list-style: none;
                padding-left: 1rem;
                margin: 1rem 0;
              }
              .preview-content ul li {
                margin-bottom: 0.5rem;
              }
              .preview-content ul li::before {
                content: "➲";
                color: #2563eb;
                margin-right: 0.75rem;
              }
              .preview-content ol {
                list-style: decimal;
                padding-left: 1.5rem;
                margin: 1rem 0;
              }
              .preview-content ol li {
                margin-bottom: 0.5rem;
              }
            `}</style>
            <div 
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: content || '<p className="text-slate-500 italic">No content written yet.</p>' }} 
            />
          </div>
        </div>
      ) : (
        /* ==================== EDITOR SCREEN ==================== */
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
          
          {/* Main Editorial Fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Article Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="e.g. How We Engineered a 100% Free CRM Engine"
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">URL Route Slug</label>
                  <input
                    type="text"
                    required
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="how-we-engineered-crm"
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Summary / Short Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Write a catchy 1-2 sentence introduction summary of the article..."
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* Rich visual editorial content area */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Article Content (HTML)</label>
                  <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<strong>', '</strong>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Bold"
                    >
                      <Bold className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<em>', '</em>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Italic"
                    >
                      <Italic className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<h2>', '</h2>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Heading 2"
                    >
                      <Heading1 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<h3>', '</h3>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Heading 3"
                    >
                      <Heading2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<a href="https://example.com" target="_blank">', '</a>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Link"
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<img src="/hero-section-img.webp" alt="describe image" className="w-full h-auto rounded-xl my-4" />')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Image"
                    >
                      <ImageIcon className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<ul>\n  <li>', '</li>\n  <li>Item 2</li>\n</ul>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Unordered List"
                    >
                      <List className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleInsertHtml('<ol>\n  <li>', '</li>\n  <li>Item 2</li>\n</ol>')}
                      className="p-1 hover:bg-white text-slate-500 hover:text-slate-800 rounded transition"
                      title="Ordered List"
                    >
                      <ListOrdered className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                
                <textarea
                  ref={contentAreaRef}
                  rows={15}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="<p>Write your blog content here in HTML. You can use the helpers above to insert styled components like headings, bold text, links, lists, or custom image containers.</p>"
                  className="block w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 leading-relaxed"
                />
              </div>

            </div>
          </div>

          {/* Sidebar Metadata / SEO Configuration */}
          <div className="space-y-6">
            
            {/* Status & Settings */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2">Publish Settings</h3>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Publish Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStatus('published')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      status === 'published'
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatus('draft')}
                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                      status === 'draft'
                        ? 'bg-slate-50 text-slate-600 border-slate-300'
                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Draft Mode
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Author</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Featured Image URL</label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="/hero-section-img.webp"
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="React, SEO, CRM, Dubai"
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>
            </div>

            {/* SEO Optimization */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-slate-800 border-b border-slate-100 pb-2">
                <FileText className="h-4.5 w-4.5 text-blue-500" />
                <h3 className="text-sm font-bold">SEO Metadata</h3>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder={title || "SEO meta title overrides..."}
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Meta Description</label>
                <textarea
                  rows={3}
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder={excerpt || "SEO meta description overrides..."}
                  className="block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              {/* SERP Mock Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-1">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Google SERP Preview</span>
                <span className="text-xs font-bold text-blue-700 hover:underline block truncate">
                  {metaTitle || title || "Untitled Post"} | CodeHTML.in
                </span>
                <span className="text-[10px] text-emerald-700 block truncate">
                  https://codehtml.in/blog/{blogSlug || "post-url"}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                  {metaDescription || excerpt || "Write your article description metadata for search index crawlers."}
                </span>
              </div>

            </div>

          </div>

        </form>
      )}

    </div>
  );
}
