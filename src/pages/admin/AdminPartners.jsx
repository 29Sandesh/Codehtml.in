import React, { useState, useEffect } from 'react';
import { db } from '../../services/database';
import { 
  Users, 
  Search, 
  Plus, 
  X, 
  Save, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  CreditCard, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight,
  TrendingUp,
  DollarSign
} from 'lucide-react';

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPartner, setSelectedPartner] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerTypeFilter, setPartnerTypeFilter] = useState('All');

  // Forms
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    phone: '',
    city: '',
    commissionRate: '',
    status: 'active',
    upiId: '',
    agencyName: '',
    agencyWebsite: '',
    agencySize: ''
  });

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    partnerType: 'solo',
    agencyName: ''
  });

  const [copiedLink, setCopiedLink] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    loadData();

    // Check if redirect triggers invite modal
    const query = new URLSearchParams(window.location.search);
    if (query.get('action') === 'invite') {
      setShowInviteModal(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const partnerData = await db.getPartners();
      const leadData = await db.getLeads();
      setPartners(partnerData);
      setLeads(leadData);
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

  const handleOpenDetails = (partner) => {
    setSelectedPartner(partner);
    setPartnerForm({
      name: partner.name || '',
      phone: partner.phone || '',
      city: partner.city || '',
      commissionRate: partner.commissionRate || '',
      status: partner.status || 'active',
      upiId: partner.upiId || '',
      agencyName: partner.agencyName || '',
      agencyWebsite: partner.agencyWebsite || '',
      agencySize: partner.agencySize || ''
    });
  };

  const handleSavePartner = async (e) => {
    e.preventDefault();
    if (!selectedPartner) return;

    try {
      const updates = {
        name: partnerForm.name,
        phone: partnerForm.phone,
        city: partnerForm.city,
        commissionRate: Number(partnerForm.commissionRate),
        status: partnerForm.status,
        upiId: partnerForm.upiId,
        agencyName: selectedPartner.partnerType === 'agency' ? partnerForm.agencyName : null,
        agencyWebsite: selectedPartner.partnerType === 'agency' ? partnerForm.agencyWebsite : null,
        agencySize: selectedPartner.partnerType === 'agency' ? partnerForm.agencySize : null
      };

      const updated = await db.updatePartner(selectedPartner.email, updates);
      setSelectedPartner(updated);
      showToastMsg("Partner details updated!");
      loadData();
    } catch (err) {
      alert(err.message || "Failed to update partner");
    }
  };

  const handleDeletePartner = async (email) => {
    if (!window.confirm("Are you sure you want to delete this B2B partner? Their referral code will no longer attribute new leads.")) return;
    try {
      await db.deletePartner(email);
      setSelectedPartner(null);
      showToastMsg("Partner deleted.");
      loadData();
    } catch (err) {
      alert(err.message || "Failed to delete partner");
    }
  };

  const handleInvitePartner = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;

    // Simulate sending invitation and copy signup link to clipboard
    const onboardingLink = `${window.location.origin}/partner?inviteName=${encodeURIComponent(inviteForm.name)}&inviteEmail=${encodeURIComponent(inviteForm.email)}&inviteType=${inviteForm.partnerType}`;
    
    navigator.clipboard.writeText(onboardingLink);
    setCopiedLink(true);
    showToastMsg("Invitation signup link copied to clipboard!");
    
    setTimeout(() => {
      setCopiedLink(false);
      setShowInviteModal(false);
      setInviteForm({ name: '', email: '', partnerType: 'solo', agencyName: '' });
    }, 1500);
  };

  const handleMarkPaid = async (leadId) => {
    try {
      await db.updateLead(leadId, { payoutStatus: 'Paid' });
      showToastMsg("Commission marked as Paid!");
      loadData();
      
      // Update selectedPartner details
      if (selectedPartner) {
        const updatedLeads = await db.getLeads();
        setLeads(updatedLeads);
      }
    } catch (err) {
      alert("Failed to update payout status");
    }
  };

  // Get partner referrals
  const getPartnerReferrals = (code) => {
    if (!code) return [];
    return leads.filter(l => l.referralCode && l.referralCode.toUpperCase() === code.toUpperCase());
  };

  // Calculate earnings for a specific partner code
  const getPartnerEarnings = (code) => {
    const refs = getPartnerReferrals(code);
    let earned = 0;
    let paid = 0;
    let pending = 0;

    refs.forEach(ref => {
      if (ref.status === 'Won' && ref.finalPrice) {
        const comm = Number(ref.finalPrice) * (Number(ref.commissionRate || 10) / 100);
        earned += comm;
        if (ref.payoutStatus === 'Paid') {
          paid += comm;
        } else {
          pending += comm;
        }
      }
    });

    return { earned, paid, pending, refsCount: refs.length };
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


  // Filter partners list
  const filteredPartners = partners.filter(p => {
    const matchesSearch = 
      (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.agencyName && p.agencyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.referralCode && p.referralCode.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = partnerTypeFilter === 'All' || p.partnerType === partnerTypeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 font-sans relative">
      
      {toast && (
        <div className="fixed top-20 right-6 z-50 bg-black border border-zinc-800 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-xs mt-0.5">Manage B2B affiliates, adjust commission rates, and audit payout UPI pipelines.</p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer w-fit"
        >
          <Plus className="h-4 w-4" />
          <span>Invite Partner</span>
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Affiliates</p>
            <h4 className="text-xl font-extrabold text-slate-800 mt-1">{partners.length}</h4>
          </div>
          <Users className="h-8 w-8 text-blue-500/30" />
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Agencies (15% base)</p>
            <h4 className="text-xl font-extrabold text-slate-800 mt-1">
              {partners.filter(p => p.partnerType === 'agency').length}
            </h4>
          </div>
          <TrendingUp className="h-8 w-8 text-violet-500/30" />
        </div>
        <div className="bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Solo Consultants (10% base)</p>
            <h4 className="text-xl font-extrabold text-slate-800 mt-1">
              {partners.filter(p => p.partnerType === 'solo').length}
            </h4>
          </div>
          <Users className="h-8 w-8 text-emerald-500/30" />
        </div>
      </div>

      {/* Search and Filters */}
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
            placeholder="Search by name, email, agency, referral code..."
          />
        </div>

        <select
          value={partnerTypeFilter}
          onChange={(e) => setPartnerTypeFilter(e.target.value)}
          className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 font-semibold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/80 font-sans"
        >
          <option value="All">All Types</option>
          <option value="solo">Solo Consultants</option>
          <option value="agency">Agencies</option>
        </select>
      </div>

      {/* Partners Table */}
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <div className="bg-white border border-slate-200/80 shadow-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Partner Name</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Referral Code</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Rate</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Referrals</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Earned</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Payout</th>
                  <th className="px-6 py-3.5 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPartners.map((partner) => {
                  const finance = getPartnerEarnings(partner.referralCode);
                  
                  return (
                    <tr 
                      key={partner.email} 
                      onClick={() => handleOpenDetails(partner)}
                      className="hover:bg-slate-50/50 cursor-pointer transition duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{partner.name}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{partner.agencyName || 'Solo Consultant'} • {partner.city}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50 font-mono">
                          {partner.referralCode}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-600">
                        {partner.commissionRate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-500">
                        {finance.refsCount} clients
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-slate-800">
                        {finance.earned > 0 ? formatCurrency(finance.earned) : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-amber-600">
                        {finance.pending > 0 ? formatCurrency(finance.pending) : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${
                          partner.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                            : 'bg-rose-50 text-rose-700 border-rose-200/50'
                        }`}>
                          {partner.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredPartners.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-sm">
                No matching B2B partners found.
              </div>
            )}
          </div>
        </div>
      )}

      {/* PARTNER DETAIL DRAWER PANEL */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex justify-end">
          <div className="flex-grow cursor-pointer" onClick={() => setSelectedPartner(null)} />
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div>
                <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded border border-slate-300/40 uppercase">
                  Partner Overview
                </span>
                <h3 className="text-base font-bold text-slate-800 mt-1 truncate max-w-[280px]">
                  {selectedPartner.name}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedPartner(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 bg-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Form Scroll container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Ledger Summary */}
              {(() => {
                const finance = getPartnerEarnings(selectedPartner.referralCode);
                return (
                  <div className="grid grid-cols-3 gap-3 bg-black text-white rounded-2xl p-4 border border-zinc-800 shadow-md">
                    <div className="text-center border-r border-zinc-800">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase block tracking-wider">Earned</span>
                      <span className="text-xs sm:text-sm font-bold text-white block mt-1">
                        {finance.earned > 0 ? formatCurrency(finance.earned) : '—'}
                      </span>
                    </div>
                    <div className="text-center border-r border-zinc-800">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase block tracking-wider">Paid</span>
                      <span className="text-xs sm:text-sm font-bold text-emerald-400 block mt-1">
                        {finance.paid > 0 ? formatCurrency(finance.paid) : '—'}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-[9px] text-zinc-400 font-bold uppercase block tracking-wider">Pending</span>
                      <span className="text-xs sm:text-sm font-bold text-amber-400 block mt-1 animate-pulse">
                        {finance.pending > 0 ? formatCurrency(finance.pending) : '—'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <form onSubmit={handleSavePartner} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner Name</label>
                    <input
                      type="text"
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</label>
                    <input
                      type="text"
                      value={partnerForm.phone}
                      onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">City</label>
                    <input
                      type="text"
                      value={partnerForm.city}
                      onChange={(e) => setPartnerForm({ ...partnerForm, city: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Commission Rate (%)</label>
                    <input
                      type="number"
                      value={partnerForm.commissionRate}
                      onChange={(e) => setPartnerForm({ ...partnerForm, commissionRate: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {selectedPartner.partnerType === 'agency' && (
                  <div className="bg-slate-50/50 p-4 border border-slate-200/60 rounded-xl space-y-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Agency Details</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500">Agency Name</label>
                        <input
                          type="text"
                          value={partnerForm.agencyName}
                          onChange={(e) => setPartnerForm({ ...partnerForm, agencyName: e.target.value })}
                          className="mt-1 block w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-500">Agency Website</label>
                        <input
                          type="text"
                          value={partnerForm.agencyWebsite}
                          onChange={(e) => setPartnerForm({ ...partnerForm, agencyWebsite: e.target.value })}
                          className="mt-1 block w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner Status</label>
                    <select
                      value={partnerForm.status}
                      onChange={(e) => setPartnerForm({ ...partnerForm, status: e.target.value })}
                      className="mt-1.5 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
                    >
                      <option value="active">Active</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">UPI Address Payout</label>
                    <input
                      type="text"
                      value={partnerForm.upiId}
                      onChange={(e) => setPartnerForm({ ...partnerForm, upiId: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder="address@upi"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>Save Overview</span>
                  </button>
                </div>
              </form>

              <div className="border-t border-slate-100 my-4" />

              {/* Referrals ledger list */}
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Referrals History & Payouts</span>
                
                {(() => {
                  const partnerRefs = getPartnerReferrals(selectedPartner.referralCode);
                  if (partnerRefs.length === 0) {
                    return <p className="text-xs text-slate-400">No client referrals recorded yet.</p>;
                  }

                  return (
                    <div className="space-y-3">
                      {partnerRefs.map((ref) => {
                        const comm = ref.status === 'Won' && ref.finalPrice
                          ? ref.finalPrice * (ref.commissionRate / 100)
                          : null;

                        return (
                          <div 
                            key={ref.id}
                            className="bg-slate-50/50 border border-slate-200/60 rounded-xl p-3 flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="text-xs font-bold text-slate-700 leading-tight">{ref.name}</h4>
                                <span className="text-[10px] text-slate-400 block mt-0.5">{ref.projectType}</span>
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                ref.status === 'Won' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200/70 text-slate-600'
                              }`}>
                                {ref.status}
                              </span>
                            </div>

                            {ref.status === 'Won' && comm && (
                              <div className="flex items-center justify-between border-t border-slate-100/50 pt-2 mt-1">
                                <div className="text-left">
                                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Commission</span>
                                  <span className="text-xs font-bold text-slate-700">{formatCurrency(comm)}</span>
                                </div>

                                {/* Payout trigger */}
                                {ref.payoutStatus === 'Paid' ? (
                                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Paid
                                  </span>
                                ) : (
                                  <button
                                    onClick={() => handleMarkPaid(ref.id)}
                                    className="text-[10px] font-bold text-amber-800 bg-amber-100 hover:bg-amber-200 active:bg-amber-300 border border-amber-200/40 px-2.5 py-1 rounded-lg transition cursor-pointer"
                                  >
                                    Mark as Paid
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <button
                  onClick={() => handleDeletePartner(selectedPartner.email)}
                  className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  Delete Partner
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* INVITE PARTNER MODAL */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Invite B2B Partner</h3>
                <p className="text-slate-400 text-xs mt-0.5">Generate a personalized referral invitation link</p>
              </div>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg border border-slate-100 hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleInvitePartner} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Partner Name *</label>
                <input
                  type="text"
                  required
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Rahul Sen"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="rahul@partner.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Partner Class</label>
                  <select
                    value={inviteForm.partnerType}
                    onChange={(e) => setInviteForm({ ...inviteForm, partnerType: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
                  >
                    <option value="solo">Solo (10% commission)</option>
                    <option value="agency">Agency (15% commission)</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-4 py-2.5 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
                >
                  {copiedLink ? 'Link Copied!' : 'Copy Onboarding Link'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
