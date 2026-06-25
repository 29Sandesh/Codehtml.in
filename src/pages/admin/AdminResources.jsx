import React, { useState, useEffect } from 'react';
import { db } from '../../services/database';
import { 
  FolderLock, 
  Plus, 
  Edit, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  RefreshCcw,
  Save
} from 'lucide-react';

export default function AdminResources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false); // false | 'new' | 'edit'
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Developer Tool');
  const [isGated, setIsGated] = useState(false);
  const [links, setLinks] = useState([]); // Dynamic list of { label: '', url: '' }

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setLoading(true);
      const data = await db.getResources();
      setResources(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleStartNew = () => {
    setIsEditing('new');
    setEditingId(null);
    setTitle('');
    setUrl('');
    setCategory('Developer Tool');
    setIsGated(false);
    setLinks([]);
  };

  const handleStartEdit = (res) => {
    setIsEditing('edit');
    setEditingId(res.id);
    setTitle(res.title);
    setUrl(res.url || '');
    setCategory(res.category);
    setIsGated(res.isGated);
    setLinks(res.links ? JSON.parse(JSON.stringify(res.links)) : []);
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the resource "${name}"?`)) return;
    try {
      await db.deleteResource(id);
      showToastMsg("Resource deleted successfully");
      loadResources();
    } catch (err) {
      alert("Failed to delete resource");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const hasSubLinks = links.length > 0;
    const finalUrl = url.trim();
    if (!finalUrl && !hasSubLinks) {
      alert("Please provide either a Main Download URL or add at least one subheading link.");
      return;
    }

    // Validate subheadings
    for (const link of links) {
      if (!link.label.trim() || !link.url.trim()) {
        alert("Please fill in both the subheading label and URL for all subheading links.");
        return;
      }
    }

    try {
      const resourceData = {
        title,
        url: finalUrl,
        category,
        isGated,
        links: links.map(l => ({ label: l.label.trim(), url: l.url.trim() }))
      };

      if (isEditing === 'new') {
        await db.addResource(resourceData);
        showToastMsg("New resource added successfully!");
      } else {
        await db.updateResource(editingId, resourceData);
        showToastMsg("Resource updated successfully!");
      }
      setIsEditing(false);
      loadResources();
    } catch (err) {
      alert("Failed to save resource: " + err.message);
    }
  };

  const handleRevertDefaults = async () => {
    if (!window.confirm("Discard all changes and reset resources to default template files?")) return;
    try {
      await db.resetResources();
      showToastMsg("Resources reset to default baselines.");
      loadResources();
    } catch (err) {
      alert("Failed to reset resources");
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
          <h2 className="text-xl font-bold text-slate-800">Resource Hub Hub</h2>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">Manage developer kits, B2B templates, and PDF guides</p>
        </div>
        
        {!isEditing && (
          <div className="flex items-center gap-2">
            <button 
              onClick={handleRevertDefaults}
              className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCcw className="h-3 w-3" />
              <span>Reset Templates</span>
            </button>
            <button
              onClick={handleStartNew}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Resource</span>
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        /* Edit or New Resource Form */
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-xl">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 mb-4">
            {isEditing === 'new' ? 'Add Digital Asset' : 'Edit Digital Asset'}
          </h3>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Resource Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. React 18 + Tailwind Boilerplate"
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Download / Link URL</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://github.com/... (optional if subheadings are added below)"
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
                >
                  <option value="Developer Tool">Developer Tool</option>
                  <option value="Client Workbook">Client Workbook</option>
                  <option value="Design Template">Design Template</option>
                  <option value="Growth Playbook">Growth Playbook</option>
                  <option value="Client Worksheet">Client Worksheet</option>
                  <option value="Architecture Spec">Architecture Spec</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Social Lock / Gate</label>
                <div className="flex items-center gap-3 h-10 px-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <input
                    type="checkbox"
                    id="gatedCheck"
                    checked={isGated}
                    onChange={(e) => setIsGated(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="gatedCheck" className="text-xs font-bold text-slate-600 cursor-pointer select-none">
                    Require LinkedIn Follow
                  </label>
                </div>
              </div>
            </div>

            {/* Subheading Links Section */}
            <div className="border-t border-slate-100 pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Subheading Links (Optional)
                </span>
                <button
                  type="button"
                  onClick={() => setLinks([...links, { label: '', url: '' }])}
                  className="px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" />
                  <span>Add Subheading</span>
                </button>
              </div>

              {links.length === 0 ? (
                <p className="text-[11px] text-slate-400 font-medium italic">
                  No subheadings added. This resource will display as a single clickable link.
                </p>
              ) : (
                <div className="space-y-3">
                  {links.map((link, idx) => (
                    <div key={idx} className="flex gap-2 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 relative group">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          required
                          value={link.label}
                          onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[idx].label = e.target.value;
                            setLinks(newLinks);
                          }}
                          placeholder="Subheading Label (e.g. Starter Boilerplate)"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                        <input
                          type="url"
                          required
                          value={link.url}
                          onChange={(e) => {
                            const newLinks = [...links];
                            newLinks[idx].url = e.target.value;
                            setLinks(newLinks);
                          }}
                          placeholder="Subheading Download URL"
                          className="block w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-medium text-[11px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setLinks(links.filter((_, lIdx) => lIdx !== idx))}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition self-center cursor-pointer"
                        title="Remove Sub-Link"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
                <span>Save Asset</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Resources List Table */
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : resources.length === 0 ? (
            <div className="p-12 text-center">
              <FolderLock className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <h4 className="text-sm font-bold text-slate-800">No Resources Found</h4>
              <p className="text-slate-400 text-xs mt-1">Add downloadable resources, project checklists or tools.</p>
              <button
                onClick={handleStartNew}
                className="mt-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl text-xs font-bold border border-blue-200 transition cursor-pointer"
              >
                Create Asset
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4">Title / Asset</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Link URL</th>
                    <th className="px-6 py-4">Lock Gated</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {resources.map((res) => (
                    <tr key={res.id} className="hover:bg-slate-50/50 transition">
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-800 block">{res.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {res.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 border border-slate-200/60 rounded-md text-[10px] uppercase font-bold tracking-wider">
                          {res.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs font-mono text-[10px] text-slate-400 truncate">
                        {res.links && res.links.length > 0 
                          ? `${res.links.length} subheading link(s)` 
                          : res.url
                        }
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          res.isGated 
                            ? 'bg-amber-50 text-amber-600 border border-amber-100' 
                            : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        }`}>
                          {res.isGated ? (
                            <>
                              <Lock className="h-3 w-3 text-amber-500" />
                              <span>Gated</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="h-3 w-3 text-emerald-500" />
                              <span>Free</span>
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => window.open(res.url, '_blank')}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition"
                            title="Visit Link"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleStartEdit(res)}
                            className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                            title="Edit Resource"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(res.id, res.title)}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                            title="Delete Resource"
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
