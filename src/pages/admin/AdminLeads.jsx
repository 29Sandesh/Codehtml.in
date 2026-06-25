import React, { useState, useEffect } from 'react';
import { db } from '../../services/database';
import { 
  Target, 
  List, 
  Kanban, 
  Search, 
  Filter, 
  X, 
  Plus, 
  Save, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

const STATUS_COLUMNS = ['Inquiry', 'Proposal', 'Negotiation', 'Active', 'Won', 'Lost'];

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('kanban'); // kanban | table
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');

  // Lead editing state
  const [detailsForm, setDetailsForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    finalPrice: '',
    referralCode: '',
    status: '',
    notes: ''
  });
  
  // Lead creation state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Custom Website',
    budget: '₹15,000',
    referralCode: '',
    status: 'Inquiry',
    notes: ''
  });

  const [toast, setToast] = useState('');

  useEffect(() => {
    loadLeads();
    
    // Check if redirect triggers new lead form
    const query = new URLSearchParams(window.location.search);
    if (query.get('action') === 'new') {
      setShowAddForm(true);
      // Clean query parameter
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await db.getLeads();
      setLeads(data);
    } catch (err) {
      console.error("Failed to load leads", err);
    } finally {
      setLoading(false);
    }
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (!leadId) return;

    try {
      const leadToUpdate = leads.find(l => l.id === leadId);
      if (!leadToUpdate) return;
      if (leadToUpdate.status === targetStatus) return;

      // Update locally first for instant feedback
      const updatedLeads = leads.map(l => {
        if (l.id === leadId) {
          const updated = { ...l, status: targetStatus };
          // If status is transitioning to Won, prompt for final price
          if (targetStatus === 'Won' && !l.finalPrice) {
            updated.finalPrice = l.budgetVal || 15000;
          }
          return updated;
        }
        return l;
      });
      setLeads(updatedLeads);

      const updates = { status: targetStatus };
      if (targetStatus === 'Won' && !leadToUpdate.finalPrice) {
        updates.finalPrice = leadToUpdate.budgetVal || 15000;
      }
      
      await db.updateLead(leadId, updates);
      showToastMsg(`Lead moved to ${targetStatus}`);
      
      // Auto open lead details for Won status to fill final price
      if (targetStatus === 'Won') {
        const fullLead = await db.getLead(leadId);
        openDetails(fullLead);
      }
    } catch (err) {
      console.error(err);
      loadLeads(); // rollback on error
    }
  };

  const openDetails = (lead) => {
    setSelectedLead(lead);
    setDetailsForm({
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      projectType: lead.projectType || '',
      budget: lead.budget || '',
      finalPrice: lead.finalPrice !== null && lead.finalPrice !== undefined ? lead.finalPrice : '',
      referralCode: lead.referralCode || '',
      status: lead.status || 'Inquiry',
      notes: lead.notes || ''
    });
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (!selectedLead) return;

    try {
      const updates = {
        name: detailsForm.name,
        email: detailsForm.email,
        phone: detailsForm.phone,
        projectType: detailsForm.projectType,
        budget: detailsForm.budget,
        finalPrice: detailsForm.status === 'Won' && detailsForm.finalPrice !== '' ? Number(detailsForm.finalPrice) : null,
        referralCode: detailsForm.referralCode || null,
        status: detailsForm.status,
        notes: detailsForm.notes
      };

      const updated = await db.updateLead(selectedLead.id, updates);
      setSelectedLead(updated);
      showToastMsg("Lead updated successfully!");
      loadLeads();
    } catch (err) {
      alert(err.message || "Failed to update lead details");
    }
  };

  const handleCreateLead = async (e) => {
    e.preventDefault();
    if (!newLeadForm.name || !newLeadForm.email) {
      alert("Name and Email are required");
      return;
    }

    try {
      await db.addLead({
        name: newLeadForm.name,
        email: newLeadForm.email,
        phone: newLeadForm.phone,
        projectType: newLeadForm.projectType,
        budget: newLeadForm.budget,
        referralCode: newLeadForm.referralCode || null,
        status: newLeadForm.status,
        notes: newLeadForm.notes
      });

      setShowAddForm(false);
      setNewLeadForm({
        name: '',
        email: '',
        phone: '',
        projectType: 'Custom Website',
        budget: '₹15,000',
        referralCode: '',
        status: 'Inquiry',
        notes: ''
      });
      showToastMsg("Lead added to pipeline!");
      loadLeads();
    } catch (err) {
      alert(err.message || "Failed to add lead");
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Are you sure you want to delete this lead? This action is permanent.")) return;
    try {
      await db.deleteLead(id);
      setSelectedLead(null);
      showToastMsg("Lead deleted.");
      loadLeads();
    } catch (err) {
      alert(err.message || "Failed to delete lead");
    }
  };

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.projectType && lead.projectType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (lead.referralCode && lead.referralCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesSource = 
      sourceFilter === 'All' || 
      (sourceFilter === 'Referrals' && lead.referralCode) || 
      (sourceFilter === 'Direct' && !lead.referralCode);

    return matchesSearch && matchesStatus && matchesSource;
  });

  const getLeadsByStatus = (status) => {
    return filteredLeads.filter(l => l.status === status);
  };

  // Format currency helper
  const formatCurrency = (val) => {
    try {
      const stored = localStorage.getItem('codehtml_settings');
      const currency = stored ? JSON.parse(stored).defaultCurrency || 'INR' : 'INR';
      if (currency === 'INR') {
        return `₹${val.toLocaleString('en-IN')}`;
      } else if (currency === 'USD') {
        return `$${val.toLocaleString('en-US')}`;
      } else if (currency === 'AED') {
        return `AED ${val.toLocaleString()}`;
      } else {
        return `${currency} ${val.toLocaleString()}`;
      }
    } catch (e) {
      return `₹${val.toLocaleString('en-IN')}`;
    }
  };


  return (
    <div className="space-y-6 font-sans relative">
      
      {/* Toast message alert */}
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-xs mt-0.5">Drag-and-drop to progress client inquiries, set prices, and award commissions.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* View Toggles */}
          <div className="flex rounded-xl bg-slate-200/60 p-1 border border-slate-200/20">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition ${
                viewMode === 'kanban' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Kanban className="h-3.5 w-3.5" />
              <span>Kanban</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg flex items-center gap-1.5 text-xs font-bold transition ${
                viewMode === 'table' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Create Lead</span>
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 rounded-xl shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 transition text-sm font-sans"
            placeholder="Search by client, email, service, referral code..."
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Status filter (Table mode only) */}
          {viewMode === 'table' && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 sm:flex-none py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 font-sans"
            >
              <option value="All">All Statuses</option>
              {STATUS_COLUMNS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          )}

          {/* Lead source filter */}
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="flex-1 sm:flex-none py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 font-sans"
          >
            <option value="All">All Sources</option>
            <option value="Referrals">Referred Leads</option>
            <option value="Direct">Direct Submissions</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : viewMode === 'kanban' ? (
        
        /* KANBAN BOARD */
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-[1200px] h-[550px] items-stretch">
            {STATUS_COLUMNS.map((column) => {
              const columnLeads = getLeadsByStatus(column);
              
              // Column header color mapping
              const headerColors = {
                'Inquiry': 'border-t-slate-400 bg-slate-50',
                'Proposal': 'border-t-amber-400 bg-amber-50/20',
                'Negotiation': 'border-t-violet-400 bg-violet-50/20',
                'Active': 'border-t-blue-400 bg-blue-50/20',
                'Won': 'border-t-emerald-400 bg-emerald-50/20',
                'Lost': 'border-t-rose-400 bg-rose-50/20'
              };

              return (
                <div
                  key={column}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column)}
                  className={`flex-1 flex flex-col rounded-2xl border-t-2 border-x border-b border-slate-200/70 p-3 overflow-y-auto ${headerColors[column] || 'bg-slate-50'}`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between mb-3 px-1.5">
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">{column}</span>
                    <span className="text-[10px] font-bold bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full">
                      {columnLeads.length}
                    </span>
                  </div>

                  {/* Column Cards Container */}
                  <div className="flex-1 space-y-3">
                    {columnLeads.map((lead) => (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead.id)}
                        onClick={() => openDetails(lead)}
                        className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing hover:border-slate-300 transition duration-150 relative group"
                      >
                        <h4 className="text-xs font-bold text-slate-800 leading-tight truncate group-hover:text-blue-600 transition-colors">
                          {lead.name}
                        </h4>
                        <p className="text-[10px] text-slate-500 mt-1 truncate">{lead.projectType}</p>
                        
                        {/* Values */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded">
                            {lead.finalPrice ? formatCurrency(lead.finalPrice) : lead.budget}
                          </span>
                          
                          {lead.referralCode && (
                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50/50 px-1.5 py-0.5 rounded border border-blue-100/50">
                              REF
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {columnLeads.length === 0 && (
                      <div className="border border-dashed border-slate-200 rounded-xl p-4 text-center text-[10px] text-slate-400/80 flex flex-col items-center justify-center h-20">
                        Drag leads here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        
        /* TABLE LIST VIEW */
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Client Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Project Scope</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Budget / Price</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Referral Code</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Commission</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Joined Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => {
                  const statusColors = {
                    'Inquiry': 'bg-slate-100 text-slate-600 border-slate-200/50',
                    'Proposal': 'bg-amber-50 text-amber-700 border-amber-200/50',
                    'Negotiation': 'bg-violet-50 text-violet-700 border-violet-200/50',
                    'Active': 'bg-blue-50 text-blue-700 border-blue-200/50',
                    'Won': 'bg-emerald-50 text-emerald-700 border-emerald-200/50',
                    'Lost': 'bg-rose-50 text-rose-700 border-rose-200/50'
                  };

                  const comm = lead.status === 'Won' && lead.finalPrice
                    ? formatCurrency(lead.finalPrice * (lead.commissionRate / 100))
                    : '—';

                  return (
                    <tr 
                      key={lead.id} 
                      onClick={() => openDetails(lead)}
                      className="hover:bg-slate-50/50 cursor-pointer transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{lead.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{lead.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-600 font-medium">
                        {lead.projectType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-700">
                        {lead.finalPrice ? formatCurrency(lead.finalPrice) : lead.budget}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {lead.referralCode ? (
                          <span className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100/50">
                            {lead.referralCode}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColors[lead.status]}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-emerald-600">
                        {comm}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-400 font-medium">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredLeads.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching leads found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* LEAD DETAILS DRAWER MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex justify-end">
          {/* Backdrop closing handle */}
          <div className="flex-grow cursor-pointer" onClick={() => setSelectedLead(null)} />
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded border border-slate-300/40 uppercase">
                  Lead Details
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1 truncate max-w-[280px]">
                  {selectedLead.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 bg-white shadow-sm"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSaveDetails} className="flex-grow overflow-y-auto p-6 space-y-5">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Client Name</label>
                  <input
                    type="text"
                    value={detailsForm.name}
                    onChange={(e) => setDetailsForm({ ...detailsForm, name: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                  <input
                    type="text"
                    value={detailsForm.phone}
                    onChange={(e) => setDetailsForm({ ...detailsForm, phone: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  value={detailsForm.email}
                  onChange={(e) => setDetailsForm({ ...detailsForm, email: e.target.value })}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Project Scope / Service</label>
                <input
                  type="text"
                  value={detailsForm.projectType}
                  onChange={(e) => setDetailsForm({ ...detailsForm, projectType: e.target.value })}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Original Budget</label>
                  <input
                    type="text"
                    value={detailsForm.budget}
                    onChange={(e) => setDetailsForm({ ...detailsForm, budget: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Referral Code</label>
                  <input
                    type="text"
                    value={detailsForm.referralCode}
                    onChange={(e) => setDetailsForm({ ...detailsForm, referralCode: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="None (Direct Lead)"
                  />
                </div>
              </div>

              <div className="border-t border-slate-100 my-4" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Pipeline Status</label>
                  <select
                    value={detailsForm.status}
                    onChange={(e) => setDetailsForm({ ...detailsForm, status: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
                  >
                    {STATUS_COLUMNS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                
                {/* Final Contract Price Entry */}
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Final Price {detailsForm.status === 'Won' ? <span className="text-red-500 font-bold">*</span> : ''}
                  </label>
                  <input
                    type="number"
                    value={detailsForm.finalPrice}
                    onChange={(e) => setDetailsForm({ ...detailsForm, finalPrice: e.target.value })}
                    disabled={detailsForm.status !== 'Won'}
                    className={`mt-1.5 block w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                      detailsForm.status === 'Won' 
                        ? 'bg-emerald-50/30 border-emerald-200 text-emerald-800 font-semibold' 
                        : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                    placeholder="Required if Won"
                  />
                </div>
              </div>

              {/* Dynamic commission feedback info box */}
              {detailsForm.status === 'Won' && detailsForm.finalPrice && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-slate-500 block uppercase tracking-wider text-[9px]">Calculated Commission</span>
                    <span className="text-slate-800 font-bold text-sm">
                      {formatCurrency(Number(detailsForm.finalPrice) * (selectedLead.commissionRate / 100))}
                    </span>
                  </div>
                  <span className="font-bold text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {selectedLead.commissionRate}% commission rate
                  </span>
                </div>
              )}

              {detailsForm.status === 'Won' && !detailsForm.finalPrice && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-2.5 text-xs text-amber-800">
                  <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                  <p className="leading-normal font-medium">Please enter a manual **Final Price** to calculate the referral commission for the partner.</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Internal Notes & History</label>
                <textarea
                  value={detailsForm.notes}
                  onChange={(e) => setDetailsForm({ ...detailsForm, notes: e.target.value })}
                  rows="4"
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
                  placeholder="Record customer meetings, next steps, contract terms..."
                />
              </div>

              <div className="border-t border-slate-100 py-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleDeleteLead(selectedLead.id)}
                  className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  Delete Lead
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CREATE LEAD MODAL */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Create Pipeline Lead</h3>
                <p className="text-slate-400 text-xs mt-0.5">Manually record a client proposal or incoming referral</p>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg border border-slate-100 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateLead} className="p-6 space-y-4 overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="Apex real estate"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                  <input
                    type="text"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="+91-9876543210"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newLeadForm.email}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="client@apex.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Project Type / Required Service</label>
                <input
                  type="text"
                  value={newLeadForm.projectType}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, projectType: e.target.value })}
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Web Application with Dashboard"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Estimated Budget</label>
                  <input
                    type="text"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="₹15,000"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Referral Code (Optional)</label>
                  <input
                    type="text"
                    value={newLeadForm.referralCode}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, referralCode: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    placeholder="AGENCY-XXXX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Pipeline Stage</label>
                  <select
                    value={newLeadForm.status}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, status: e.target.value })}
                    className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
                  >
                    {STATUS_COLUMNS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Notes</label>
                <textarea
                  value={newLeadForm.notes}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, notes: e.target.value })}
                  rows="3"
                  className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
                  placeholder="Client needs basic SEO, portfolio pages, and a contact page..."
                />
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Lead</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
