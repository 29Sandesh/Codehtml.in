import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../services/database';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink, 
  FileEdit, 
  Sparkles, 
  BookOpen,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AdminBlogs() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('editorial'); // 'editorial' | 'generated'
  
  // Editorial CMS Blogs
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Generated Blogs
  const [generatedBlogs, setGeneratedBlogs] = useState([]);
  const [loadingGenerated, setLoadingGenerated] = useState(false);
  const [generatedSearchQuery, setGeneratedSearchQuery] = useState('');
  const [generatedVisibleCount, setGeneratedVisibleCount] = useState(25);

  useEffect(() => {
    loadEditorialBlogs();
  }, []);

  const loadEditorialBlogs = async () => {
    try {
      setLoading(true);
      const data = await db.getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error("Failed to load editorial blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const loadGeneratedBlogs = async () => {
    if (generatedBlogs.length > 0) return;
    try {
      setLoadingGenerated(true);
      const res = await fetch('/data/blogList.json');
      if (res.ok) {
        const data = await res.json();
        setGeneratedBlogs(data);
      }
    } catch (err) {
      console.error("Failed to load generated blogs", err);
    } finally {
      setLoadingGenerated(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'generated') {
      loadGeneratedBlogs();
    }
  }, [activeTab]);

  const handleDeleteBlog = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete the blog post "${title}"?`)) return;
    try {
      await db.deleteBlog(slug);
      loadEditorialBlogs();
    } catch (err) {
      alert("Failed to delete blog: " + err.message);
    }
  };

  // Filter Editorial Blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter(b => 
      (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.category || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [blogs, searchQuery]);

  // Filter Generated Blogs
  const filteredGeneratedBlogs = useMemo(() => {
    return generatedBlogs.filter(b => 
      (b.title || '').toLowerCase().includes(generatedSearchQuery.toLowerCase()) ||
      (b.category && b.category.toLowerCase().includes(generatedSearchQuery.toLowerCase())) ||
      (b.slug && b.slug.toLowerCase().includes(generatedSearchQuery.toLowerCase()))
    );
  }, [generatedBlogs, generatedSearchQuery]);

  return (
    <div className="space-y-6 font-sans">
      
      {/* Upper header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Editorial CMS</h2>
          <p className="text-slate-400 text-xs mt-0.5">Publish thought leadership articles and manage SEO pages</p>
        </div>
        
        {activeTab === 'editorial' && (
          <button
            onClick={() => navigate('/admin/blogs/new')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 transition cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Article</span>
          </button>
        )}
      </div>

      {/* Tabs list */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('editorial')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'editorial' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileEdit className="h-4 w-4" />
          <span>Editorial Posts ({blogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('generated')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'generated' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Auto-Generated Locations (3,070)</span>
        </button>
      </div>

      {activeTab === 'editorial' ? (
        // Editorial CMS Listing
        <div className="space-y-4">
          <div className="flex items-center gap-3 bg-white border border-slate-200/80 px-4 py-3 rounded-2xl shadow-sm">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Search articles by title, category, or excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 text-xs font-semibold"
            />
          </div>

          {loading ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 flex justify-center items-center shadow-sm">
              <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-sm">
              <FileText className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Editorial Articles Found</h4>
              <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">Create a new blog post to share thought leadership content, case studies, or company updates.</p>
              <button
                onClick={() => navigate('/admin/blogs/new')}
                className="mt-4 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-blue-600 hover:bg-slate-100 transition cursor-pointer"
              >
                Publish Your First Article
              </button>
            </div>
          ) : (
            <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Author</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredBlogs.map((blog) => (
                      <tr key={blog.id} className="hover:bg-slate-50/50 transition">
                        <td className="px-6 py-4 max-w-xs">
                          <div className="font-bold text-slate-800 truncate">{blog.title}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">/blog/{blog.slug}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/60 rounded-md text-[10px] uppercase font-bold tracking-wider">
                            {blog.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{blog.author}</td>
                        <td className="px-6 py-4 text-slate-400">{blog.createdAt}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            blog.status === 'published' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${blog.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            <span className="capitalize">{blog.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                              title="Preview Article"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => navigate(`/admin/blogs/edit/${blog.slug}`)}
                              className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                              title="Edit Article"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog.slug, blog.title)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                              title="Delete Article"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Auto-Generated Static Location Pages Listing
        <div className="space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex gap-3 text-xs text-slate-500 shadow-sm leading-normal">
            <Sparkles className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-700">Auto-Generated Location Pages Database (Read-Only)</p>
              <p className="mt-1">These pages represent programmatically pre-generated, search-optimized city services landing configurations (e.g. custom-website-development-in-dubai-marina). They exist as static JSON maps and are read-only from the panel.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-200/80 px-4 py-3 rounded-2xl shadow-sm">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="Filter by keyword slug or city name (e.g., website-development, marina)..."
              value={generatedSearchQuery}
              onChange={(e) => {
                setGeneratedSearchQuery(e.target.value);
                setGeneratedVisibleCount(25); // Reset display window on query change
              }}
              className="w-full bg-transparent border-none focus:outline-none text-slate-700 placeholder-slate-400 text-xs font-semibold"
            />
          </div>

          {loadingGenerated ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 flex justify-center items-center shadow-sm">
              <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : filteredGeneratedBlogs.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center shadow-sm">
              <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Location Pages Found</h4>
              <p className="text-slate-400 text-xs mt-1 max-w-xs mx-auto">Try refining your search filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-xs">
                    <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4">Article Title</th>
                        <th className="px-6 py-4">URL Route</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Estimated Read</th>
                        <th className="px-6 py-4 text-right">Preview</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {filteredGeneratedBlogs.slice(0, generatedVisibleCount).map((blog) => (
                        <tr key={blog.id} className="hover:bg-slate-50/50 transition">
                          <td className="px-6 py-4 max-w-xs font-bold text-slate-800">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4 font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                            /blog/{blog.slug}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded-md text-[10px] uppercase font-bold tracking-wider">
                              {blog.category || 'LOCATION'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400">{blog.readTime || '6 MIN READ'}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}
                              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition inline-flex items-center gap-1 font-bold text-[10px]"
                            >
                              <span>Preview</span>
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {filteredGeneratedBlogs.length > generatedVisibleCount && (
                <div className="flex justify-center">
                  <button 
                    onClick={() => setGeneratedVisibleCount(prev => prev + 25)}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                  >
                    Load More Pages ({filteredGeneratedBlogs.length - generatedVisibleCount} remaining)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
