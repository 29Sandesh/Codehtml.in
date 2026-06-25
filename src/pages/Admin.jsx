import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Link as LinkIcon,
  Globe,
  Settings,
  Eye,
  EyeOff,
  Users,
  FileText
} from 'lucide-react';

const DEFAULT_RESOURCES = [
  {
    id: '1',
    title: 'React 18 + Vite Starter Template',
    url: 'https://github.com/codehtml-in/react-vite-tailwind-boilerplate',
    category: 'Developer Tool',
    isGated: false
  },
  {
    id: '2',
    title: 'Custom Software Project Brief Template',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-project-brief-template.md',
    category: 'Client Workbook',
    isGated: false
  },
  {
    id: '3',
    title: 'Minimalist Developer Portfolio Layout',
    url: 'https://github.com/codehtml-in/minimalist-dev-portfolio',
    category: 'Design Template',
    isGated: false
  },
  {
    id: '4',
    title: 'Ultimate SEO Checklist & AEO Playbook',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-seo-aeo-playbook.txt',
    category: 'Growth Guide',
    isGated: true
  },
  {
    id: '5',
    title: 'Web Dev Cost & Timeline Estimation Sheet',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-budget-calculator.csv',
    category: 'Client Worksheet',
    isGated: true
  },
  {
    id: '6',
    title: 'SaaS Architecture & DB Schema Blueprint',
    url: 'https://raw.githubusercontent.com/codehtml-in/assets/main/codehtml-saas-db-blueprint.sql',
    category: 'Architecture Spec',
    isGated: true
  }
];

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('resources'); // resources | partners
  const [partners, setPartners] = useState([]);

  const [resources, setResources] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', url: '', category: '', isGated: false });
  const [newForm, setNewForm] = useState({ title: '', url: '', category: 'Developer Tool', isGated: false });
  const [showAddForm, setShowAddForm] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Check if password session exists
    const sessionAuth = sessionStorage.getItem('admin_authenticated');
    if (sessionAuth === 'true') {
      setIsAuthenticated(true);
    }
    
    // Load resources from LocalStorage
    const stored = localStorage.getItem('codehtml_resources');
    if (stored) {
      setResources(JSON.parse(stored));
    } else {
      setResources(DEFAULT_RESOURCES);
      localStorage.setItem('codehtml_resources', JSON.stringify(DEFAULT_RESOURCES));
    }

    // Load partners from LocalStorage
    const storedPartners = localStorage.getItem('codehtml_partners');
    if (storedPartners) {
      setPartners(JSON.parse(storedPartners));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin' || password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_authenticated', 'true');
      setAuthError('');
    } else {
      setAuthError('Incorrect admin password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  const saveToStorage = (updatedList) => {
    setResources(updatedList);
    localStorage.setItem('codehtml_resources', JSON.stringify(updatedList));
  };

  const showToast = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newForm.title.trim() || !newForm.url.trim()) return;
    
    const newResource = {
      id: Date.now().toString(),
      title: newForm.title,
      url: newForm.url,
      category: newForm.category,
      isGated: newForm.isGated
    };

    const updated = [newResource, ...resources];
    saveToStorage(updated);
    setNewForm({ title: '', url: '', category: 'Developer Tool', isGated: false });
    setShowAddForm(false);
    showToast('Resource added successfully!');
  };

  const handleStartEdit = (res) => {
    setEditingId(res.id);
    setEditForm({
      title: res.title,
      url: res.url,
      category: res.category,
      isGated: res.isGated
    });
  };

  const handleSaveEdit = (id) => {
    const updated = resources.map(res => {
      if (res.id === id) {
        return { ...res, ...editForm };
      }
      return res;
    });
    saveToStorage(updated);
    setEditingId(null);
    showToast('Resource updated successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      const updated = resources.filter(res => res.id !== id);
      saveToStorage(updated);
      showToast('Resource deleted.');
    }
  };

  const handleDeletePartner = (email) => {
    if (window.confirm('Are you sure you want to delete this partner? They will no longer be able to log in.')) {
      const updated = partners.filter(p => p.email !== email);
      setPartners(updated);
      localStorage.setItem('codehtml_partners', JSON.stringify(updated));
      showToast('Partner deleted.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('This will restore the original default links and wipe your changes. Continue?')) {
      saveToStorage(DEFAULT_RESOURCES);
      showToast('Restored defaults.');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="bg-black min-h-screen pt-36 pb-20 overflow-hidden relative text-white flex items-center justify-center selection:bg-vintage-gold selection:text-black">
        <SEO title="Admin Console Login | CodeHTML" noindex={true} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-vintage-gold/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="w-full max-w-sm bg-zinc-950/60 border border-white/10 rounded-2xl p-8 relative z-10 shadow-2xl backdrop-blur-md text-left">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-vintage-gold/10 border border-vintage-gold/30 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-vintage-gold" />
            </div>
            <h1 className="font-headline font-extrabold text-xl uppercase tracking-wider text-white">Admin Console</h1>
            <p className="font-body text-zinc-500 text-xs mt-1">Enter admin key to manage resources.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="pass" className="block font-body text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1.5">
                Admin Password
              </label>
              <input
                id="pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-zinc-900/40 border border-white/10 rounded-xl font-body text-sm text-white focus:outline-none focus:border-vintage-gold/50 focus:bg-zinc-900/80 transition-colors"
              />
            </div>

            {authError && (
              <p className="text-red-400 text-[11px] font-body text-center">{authError}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-vintage-gold text-white font-body font-bold text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-colors"
            >
              Sign In ➲
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black min-h-screen pt-24 pb-20 overflow-hidden relative text-white selection:bg-vintage-gold selection:text-black">
      <SEO title="Console Manager Panel | CodeHTML" noindex={true} />

      <div className="px-4 md:px-12 max-w-7xl mx-auto relative z-10 text-left">
        
        {/* Header bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-6 mb-6 gap-4">
          <div>
            <h1 className="font-headline font-extrabold text-2xl md:text-4xl text-white uppercase tracking-tight">
              CONSOLE MANAGER
            </h1>
          </div>

          <div className="flex gap-3">
            {activeTab === 'resources' && (
              <>
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-4 py-2 bg-vintage-gold hover:bg-white text-white hover:text-black font-body font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-lg"
                >
                  {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {showAddForm ? 'Close Drawer' : 'Add New Link'}
                </button>
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 bg-zinc-900 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 font-body font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 rounded-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Defaults
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-400 hover:text-white font-body font-bold text-xs uppercase tracking-wider transition-colors rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/5 pb-4 mb-8 gap-6">
          <button
            onClick={() => setActiveTab('resources')}
            className={`font-headline font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'resources' ? 'text-vintage-gold border-b-2 border-vintage-gold pb-2 -mb-[18px]' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <FileText className="w-4 h-4" /> Resources Hub
          </button>
          <button
            onClick={() => setActiveTab('partners')}
            className={`font-headline font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
              activeTab === 'partners' ? 'text-vintage-gold border-b-2 border-vintage-gold pb-2 -mb-[18px]' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Users className="w-4 h-4" /> B2B Partner Network
          </button>
        </div>

        {/* Success Alert toast */}
        {successMsg && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-body text-xs flex items-center gap-2">
            <Unlock className="w-4 h-4" /> {successMsg}
          </div>
        )}

        {/* TAB 1: RESOURCES SECTION */}
        {activeTab === 'resources' && (
          <>
            {/* Add Link Drawer Form */}
            {showAddForm && (
              <div className="bg-zinc-950/60 border border-vintage-gold/30 p-6 rounded-2xl mb-8">
                <h3 className="font-headline font-bold text-lg text-white mb-4 uppercase">Create New Resource Link</h3>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SEO Checklist PDF"
                      value={newForm.title}
                      onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-xs font-body text-white focus:outline-none focus:border-vintage-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Destination URL</label>
                    <input
                      type="url"
                      required
                      placeholder="e.g. https://drive.google.com/file..."
                      value={newForm.url}
                      onChange={(e) => setNewForm({ ...newForm, url: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-xs font-body text-white focus:outline-none focus:border-vintage-gold/40"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Category</label>
                    <select
                      value={newForm.category}
                      onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900/50 border border-white/10 rounded-lg text-xs font-body text-white focus:outline-none focus:border-vintage-gold/40"
                    >
                      <option value="Developer Tool">Developer Tool</option>
                      <option value="Client Workbook">Client Workbook</option>
                      <option value="Design Template">Design Template</option>
                      <option value="Growth Guide">Growth Guide</option>
                      <option value="Client Worksheet">Client Worksheet</option>
                      <option value="Architecture Spec">Architecture Spec</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 justify-between bg-zinc-900/30 p-2 rounded-lg border border-white/5 h-[38px]">
                    <span className="font-body text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Gate via Name & Email?</span>
                    <input
                      type="checkbox"
                      checked={newForm.isGated}
                      onChange={(e) => setNewForm({ ...newForm, isGated: e.target.checked })}
                      className="w-4 h-4 accent-vintage-gold bg-zinc-950 rounded border-white/10 focus:ring-0"
                    />
                  </div>
                  <div className="md:col-span-4 flex justify-end gap-2 mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-vintage-gold text-white font-body font-bold text-[10px] tracking-wider uppercase rounded-lg hover:bg-white hover:text-black transition-colors"
                    >
                      Add Resource Link
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Resources Management Table */}
            <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 uppercase font-body font-bold tracking-wider">
                      <th className="py-4 px-6">Title</th>
                      <th className="py-4 px-6">Category</th>
                      <th className="py-4 px-6">Target Link URL</th>
                      <th className="py-4 px-6 text-center">Gated</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-body">
                    {resources.map((res) => {
                      const isEditing = editingId === res.id;
                      return (
                        <tr key={res.id} className="hover:bg-zinc-900/20 transition-colors text-zinc-300">
                          {/* Title */}
                          <td className="py-4 px-6">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                className="bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-white w-full max-w-xs focus:outline-none"
                              />
                            ) : (
                              <span className="font-bold text-white uppercase">{res.title}</span>
                            )}
                          </td>

                          {/* Category */}
                          <td className="py-4 px-6">
                            {isEditing ? (
                              <select
                                value={editForm.category}
                                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                                className="bg-zinc-900 border border-white/10 rounded px-2 py-1 text-white focus:outline-none"
                              >
                                <option value="Developer Tool">Developer Tool</option>
                                <option value="Client Workbook">Client Workbook</option>
                                <option value="Design Template">Design Template</option>
                                <option value="Growth Guide">Growth Guide</option>
                                <option value="Client Worksheet">Client Worksheet</option>
                                <option value="Architecture Spec">Architecture Spec</option>
                              </select>
                            ) : (
                              <span className="bg-zinc-900 px-2 py-0.5 rounded border border-white/5 text-[9px] uppercase tracking-wider text-zinc-400">
                                {res.category}
                              </span>
                            )}
                          </td>

                          {/* URL */}
                          <td className="py-4 px-6 font-mono text-[10px] max-w-[200px] truncate">
                            {isEditing ? (
                              <input
                                type="url"
                                value={editForm.url}
                                onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                                className="bg-zinc-900 border border-white/10 rounded px-2.5 py-1.5 text-white w-full focus:outline-none"
                              />
                            ) : (
                              <a 
                                href={res.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="hover:text-vintage-gold hover:underline flex items-center gap-1 w-fit"
                              >
                                <LinkIcon className="w-3 h-3 flex-shrink-0" /> {res.url}
                              </a>
                            )}
                          </td>

                          {/* Gated status */}
                          <td className="py-4 px-6 text-center">
                            {isEditing ? (
                              <input
                                type="checkbox"
                                checked={editForm.isGated}
                                onChange={(e) => setEditForm({ ...editForm, isGated: e.target.checked })}
                                className="w-4 h-4 accent-vintage-gold bg-zinc-950 border-white/10"
                              />
                            ) : (
                              <div className="flex items-center justify-center">
                                {res.isGated ? (
                                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-vintage-gold/10 border border-vintage-gold/20 text-vintage-gold">
                                    <Lock className="w-2.5 h-2.5" /> Gated
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-500">
                                    <Unlock className="w-2.5 h-2.5" /> Open
                                  </span>
                                )}
                              </div>
                            )}
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            {isEditing ? (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleSaveEdit(res.id)}
                                  className="p-1.5 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:text-white text-emerald-400 rounded transition-colors"
                                  title="Save Changes"
                                >
                                  <Save className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => setEditingId(null)}
                                  className="p-1.5 bg-zinc-800 border border-white/5 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded transition-colors"
                                  title="Cancel Edit"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => handleStartEdit(res)}
                                  className="p-1.5 bg-zinc-900 border border-white/10 hover:border-vintage-gold/30 hover:bg-vintage-gold/5 text-zinc-400 hover:text-vintage-gold rounded transition-colors"
                                  title="Edit Resource"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(res.id)}
                                  className="p-1.5 bg-zinc-900 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 rounded transition-colors"
                                  title="Delete Link"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: PARTNERS SECTION */}
        {activeTab === 'partners' && (
          <div className="bg-zinc-950/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-white/5 bg-zinc-900/30 flex justify-between items-center">
              <span className="font-headline font-bold text-sm uppercase text-white">Registered B2B Partners</span>
              <span className="text-[10px] bg-vintage-gold/10 border border-vintage-gold/20 text-vintage-gold px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                Total Partners: {partners.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-zinc-900/50 text-zinc-400 uppercase font-body font-bold tracking-wider">
                    <th className="py-4 px-6">Name / Type</th>
                    <th className="py-4 px-6">Email / Phone</th>
                    <th className="py-4 px-6">Agency / City / Website</th>
                    <th className="py-4 px-6">Commission</th>
                    <th className="py-4 px-6">Referral Code</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Date Joined</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-body">
                  {partners.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-8 text-center text-zinc-500 font-body text-xs uppercase tracking-wider">
                        No B2B Partners registered yet.
                      </td>
                    </tr>
                  ) : (
                    partners.map((partner) => (
                      <tr key={partner.email} className="hover:bg-zinc-900/20 transition-colors text-zinc-300">
                        {/* Name / Type */}
                        <td className="py-4 px-6">
                          <span className="block font-bold text-white uppercase">{partner.name}</span>
                          <span className={`inline-block text-[9px] font-black uppercase px-1.5 py-0.5 rounded mt-1 ${
                            partner.partnerType === 'agency' 
                              ? 'bg-vintage-gold/10 border border-vintage-gold/20 text-vintage-gold' 
                              : 'bg-zinc-900 border border-white/5 text-zinc-400'
                          }`}>
                            {partner.partnerType === 'agency' ? 'Agency' : 'Solo'}
                          </span>
                        </td>
                        {/* Contact details */}
                        <td className="py-4 px-6">
                          <span className="block font-semibold text-zinc-300">{partner.email}</span>
                          <span className="block text-zinc-500 font-mono text-[10px] mt-0.5">{partner.phone}</span>
                        </td>
                        {/* Agency details */}
                        <td className="py-4 px-6">
                          <span className="block font-semibold text-zinc-300 uppercase">
                            {partner.partnerType === 'agency' ? (partner.agencyName || partner.agency || 'Agency Partner') : 'Solo Partner'}
                          </span>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-zinc-500 text-[10px] mt-0.5">
                            <span>{partner.city}</span>
                            {partner.partnerType === 'agency' && partner.agencySize && (
                              <>
                                <span>•</span>
                                <span>Size: {partner.agencySize}</span>
                              </>
                            )}
                            {partner.partnerType === 'agency' && partner.agencyWebsite && (
                              <>
                                <span>•</span>
                                <a 
                                  href={partner.agencyWebsite} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="text-vintage-gold hover:underline font-bold"
                                >
                                  Website
                                </a>
                              </>
                            )}
                          </div>
                        </td>
                        {/* Commission */}
                        <td className="py-4 px-6 font-bold text-white">
                          {partner.commissionRate || (partner.partnerType === 'agency' ? 15 : 10)}%
                        </td>
                        {/* Referral Code */}
                        <td className="py-4 px-6 font-mono text-xs font-bold text-vintage-gold select-all">
                          {partner.referralCode}
                        </td>
                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className={`inline-block text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            partner.verified 
                              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                              : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
                          }`}>
                            {partner.verified ? 'OTP Verified' : 'Unverified'}
                          </span>
                        </td>
                        {/* Date Joined */}
                        <td className="py-4 px-6 text-zinc-400">
                          {partner.dateJoined || 'N/A'}
                        </td>
                        {/* Actions */}
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDeletePartner(partner.email)}
                            className="p-1.5 bg-zinc-900 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 text-zinc-400 hover:text-red-400 rounded transition-colors"
                            title="Delete Partner"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default Admin;
