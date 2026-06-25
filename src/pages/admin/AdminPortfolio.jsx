import React, { useState, useEffect } from 'react';
import { 
  FolderGit2, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Image as ImageIcon,
  RefreshCcw,
  Save
} from 'lucide-react';
import { db } from '../../services/database';

const DEFAULT_PROJECTS = [
  {
    id: '1',
    name: 'The Circle',
    category: 'SAAS PLATFORM',
    vertical: 'Collaborative Doc SaaS Workspace with Real-Time Sync',
    status: 'Live App',
    link: 'https://jition.vercel.app',
    bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '2',
    name: 'Co-Found',
    category: 'MOBILE & WEB PLATFORM',
    vertical: 'Founder Matchmaking & Networking Mobile/Web Platform',
    status: 'Under Progress',
    link: '',
    bgImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '3',
    name: 'SwigatoIndia.in',
    category: 'FOOD LICENCE PORTAL',
    vertical: 'Food Licence Website',
    status: 'Live App',
    link: 'https://swigatoindia.in',
    bgImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '4',
    name: 'Slcc.in',
    category: 'CONSTRUCTION PORTAL',
    vertical: 'Construction Company',
    status: 'Live App',
    link: 'https://slcc.in',
    bgImage: '/slcc_construction.webp'
  },
  {
    id: '5',
    name: 'crystamedia.in',
    category: 'MARKETING AGENCY',
    vertical: 'Digital Marketing Agency',
    status: 'Live App',
    link: 'https://crystamedia.in',
    bgImage: '/crystamedia_agency.webp'
  },
  {
    id: '6',
    name: 'AlayaRealty.in',
    category: 'REAL ESTATE PORTAL',
    vertical: 'Real Estate Consultancy',
    status: 'Live App',
    link: 'https://alayarealty.in',
    bgImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '7',
    name: 'Elgamingo.store',
    category: 'GAMING PORTAL',
    vertical: 'Online Games Platform',
    status: 'Live App',
    link: 'https://elgamingo.store',
    bgImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '8',
    name: 'LeadTool',
    category: 'DEVELOPER TOOL',
    vertical: 'Business Lead Extraction Map Integration Dashboard',
    status: 'Local Tool',
    link: '',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '9',
    name: 'Azude Hotel',
    category: 'HOSPITALITY PORTAL',
    vertical: 'Premium Resort Booking & Guest Loyalty Portal',
    status: 'Concept App',
    link: 'https://azudehotel.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '10',
    name: 'Tinkus-cafe',
    category: 'E-COMMERCE CONCEPT',
    vertical: 'Sweet Bakery, Shakes & Custom Cake Quote Tool',
    status: 'Concept App',
    link: 'https://tinkus-cafe.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '11',
    name: 'cafe-decasa',
    category: 'RETAIL CONCEPT',
    vertical: 'Cafe Website',
    status: 'Concept App',
    link: 'https://cafe-decasa.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '12',
    name: 'cutler-dining',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Contemporary Gastronomy & Tasting Rooms',
    status: 'Concept App',
    link: 'https://cutler-dining.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '13',
    name: 'Famous Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Elegant Sommelier Wine Bistro & Flight Builder',
    status: 'Concept App',
    link: 'https://famous-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '14',
    name: 'Fine Dine Restaurant',
    category: 'GASTRONOMY SHOWCASE',
    vertical: 'Ultra-Luxury Multi-Course Culinary Showcase',
    status: 'Concept App',
    link: 'https://finedine-restaurant.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '15',
    name: 'Lumina',
    category: 'FASHION EDITORIAL',
    vertical: 'High-Fashion Editorial Catalog (Mobile-First)',
    status: 'Concept App',
    link: 'https://lumina.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: '16',
    name: 'teamo-dating',
    category: 'AI DATING CONCEPT',
    vertical: 'AI-Driven Matchmaker & Swipe Dating Card Deck',
    status: 'Concept App',
    link: 'https://teamo-dating.netlify.app',
    bgImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80'
  }
];

export default function AdminPortfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  // Form states
  const [isEditing, setIsEditing] = useState(false); // false | 'new' | 'edit'
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('SAAS PLATFORM');
  const [vertical, setVertical] = useState('');
  const [status, setStatus] = useState('Live App');
  const [link, setLink] = useState('');
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await db.getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to load projects:", err);
      const stored = localStorage.getItem('codehtml_portfolio');
      if (stored) {
        setProjects(JSON.parse(stored));
      } else {
        setProjects(DEFAULT_PROJECTS);
      }
    }
    setLoading(false);
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStartNew = () => {
    setIsEditing('new');
    setEditId(null);
    setName('');
    setCategory('SAAS PLATFORM');
    setVertical('');
    setStatus('Live App');
    setLink('');
    setBgImage('');
  };

  const handleStartEdit = (proj) => {
    setIsEditing('edit');
    setEditId(proj.id);
    setName(proj.name);
    setCategory(proj.category);
    setVertical(proj.vertical);
    setStatus(proj.status);
    setLink(proj.link || '');
    setBgImage(proj.bgImage || '');
  };

  const handleDelete = async (id, projName) => {
    if (!window.confirm(`Are you sure you want to permanently delete project "${projName}"?`)) return;
    try {
      await db.deleteProject(id);
      showToastMsg("Project deleted");
      loadProjects();
    } catch (err) {
      console.error(err);
      showToastMsg("Delete failed");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (isEditing === 'new') {
        await db.addProject({
          name,
          category: category.toUpperCase(),
          vertical,
          status,
          link: link || null,
          bgImage: bgImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
        });
        showToastMsg("Project added successfully!");
      } else {
        await db.updateProject(editId, {
          name,
          category: category.toUpperCase(),
          vertical,
          status,
          link: link || null,
          bgImage: bgImage || undefined
        });
        showToastMsg("Project updated successfully!");
      }
      setIsEditing(false);
      loadProjects();
    } catch (err) {
      console.error(err);
      showToastMsg("Save failed");
    }
  };

  const handleRevertDefaults = async () => {
    if (!window.confirm("Discard all additions and revert portfolio list to the original 16 showcase items?")) return;
    try {
      await db.resetProjects();
      showToastMsg("Portfolio reset to default baselines.");
      loadProjects();
    } catch (err) {
      console.error(err);
      showToastMsg("Reset failed");
    }
  };

  return (
    <div className="space-y-6 font-sans relative text-left">
      
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Portfolio Manager</h2>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">Manage active client applications, B2B showcases, and concept designs</p>
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRevertDefaults}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCcw className="h-3 w-3" />
              <span>Reset Showcase</span>
            </button>
            <button
              onClick={handleStartNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        /* Edit or New Form */
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-xl">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4 font-headline uppercase tracking-wide">
            {isEditing === 'new' ? 'New Showcase Project' : 'Edit Showcase Project'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Project Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. SwigatoIndia.in"
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category Label</label>
                <input
                  type="text"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. SAAS PLATFORM"
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">App Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  <option value="Live App">Live App</option>
                  <option value="Under Progress">Under Progress</option>
                  <option value="Local Tool">Local Tool</option>
                  <option value="Concept App">Concept App</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Vertical / Short Tagline</label>
              <input
                type="text"
                required
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
                placeholder="e.g. Collaborative Doc SaaS Workspace with Real-Time Sync"
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Live Application Link (Optional)</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://..."
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Background Image URL</label>
              <input
                type="text"
                value={bgImage}
                onChange={(e) => setBgImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-500 cursor-pointer transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer transition"
              >
                <Save className="h-4 w-4" />
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Portfolio List Table */
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center">
              <FolderGit2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Projects Found</h4>
              <p className="text-slate-400 text-xs mt-1">Add showcase client items or conceptual models.</p>
              <button
                onClick={handleStartNew}
                className="mt-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold border border-blue-200 transition cursor-pointer"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Project Name</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Vertical Description</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 block">{proj.name}</span>
                        {proj.link && (
                          <a 
                            href={proj.link} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[10px] text-blue-500 font-medium flex items-center gap-0.5 mt-0.5 hover:underline"
                          >
                            <span>Visit site</span>
                            <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/60 rounded-md text-[10px] uppercase font-bold tracking-wider">
                          {proj.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs text-slate-500 font-medium leading-relaxed truncate">
                        {proj.vertical}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.status === 'Live App'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : proj.status === 'Under Progress'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            proj.status === 'Live App' ? 'bg-emerald-500' : proj.status === 'Under Progress' ? 'bg-blue-500' : 'bg-slate-400'
                          }`}></span>
                          <span>{proj.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(proj)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Project"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(proj.id, proj.name)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Project"
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
          )}
        </div>
      )}

    </div>
  );
}
