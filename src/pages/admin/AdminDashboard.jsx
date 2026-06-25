import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '../../services/database';
import { 
  Target, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  Clock, 
  Award,
  Plus,
  Send,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalLeads: 0,
    activePartners: 0,
    totalRevenue: 0,
    pendingPayout: 0,
    blogCount: 0
  });
  const [recentLeads, setRecentLeads] = useState([]);
  const [recentPartners, setRecentPartners] = useState([]);
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const leads = await db.getLeads();
        const partners = await db.getPartners();
        const blogs = await db.getBlogs();

        // Calculate stats
        const activePartners = partners.filter(p => p.status === 'active').length;
        
        // Sum finalPrice for Won deals
        let totalRevenue = 0;
        let totalCommission = 0;
        
        leads.forEach(lead => {
          if (lead.status === 'Won' && lead.finalPrice) {
            totalRevenue += Number(lead.finalPrice);
            // Calculate commission
            const comm = Number(lead.finalPrice) * (Number(lead.commissionRate) / 100);
            totalCommission += comm;
          }
        });

        // Pending payout calculation: we can subtract simulated payments or just sum active unpaid commissions.
        // Let's assume paid status is tracked in leads notes or we can mock/simulate payout data.
        // In database.js, ref_1 is "Won" with finalPrice: 15000, commissionRate: 15. Comm = 2250.
        // Let's calculate pending payouts as unpaid commission (e.g. Won leads where payout hasn't been marked).
        // For simplicity: let's sum all Won leads commission.
        const pendingPayout = totalCommission;

        // Static count + custom CMS blogs count
        const blogCount = 3070 + blogs.length;

        setStats({
          totalLeads: leads.length,
          activePartners,
          totalRevenue,
          pendingPayout,
          blogCount
        });

        setRecentLeads(leads.slice(0, 5));
        setRecentPartners(partners.slice(0, 5));

        // Filter payouts
        const unpaidWon = leads.filter(l => l.status === 'Won');
        setPayouts(unpaidWon);

      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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


  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      
      {/* Welcome Banner */}
      <div className="bg-black rounded-3xl p-6 sm:p-8 border border-zinc-800 shadow-xl shadow-zinc-950/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Welcome back, Sandesh!
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl leading-relaxed">
            Here is a consolidated snapshot of the CodeHTML B2B network, sales pipeline, and dynamic editorial blog hub.
          </p>
        </div>
        <div className="flex items-center gap-3 z-10 shrink-0 w-full sm:w-auto">
          <Link
            to="/admin/leads"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl text-sm font-semibold border border-blue-500 transition shadow-lg shadow-blue-600/10 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>Add Lead</span>
          </Link>
          <Link
            to="/admin/blogs/new"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-zinc-200 rounded-xl text-sm font-semibold border border-zinc-800 transition cursor-pointer"
          >
            <FileText className="h-4 w-4 text-zinc-400" />
            <span>Publish Blog</span>
          </Link>
        </div>
      </div>

      {/* Overview Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Stats card: Total Leads */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-between hover:shadow-md transition-all duration-200 shadow-sm relative group">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Active Pipeline</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">{stats.totalLeads}</h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>Pipeline Leads</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <Target className="h-6 w-6" />
          </div>
        </div>

        {/* Stats card: Active Partners */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-between hover:shadow-md transition-all duration-200 shadow-sm relative group">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">B2B Partners</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">{stats.activePartners}</h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600">
              <Award className="h-3 w-3" />
              <span>Affiliates Active</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-500 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <Users className="h-6 w-6" />
          </div>
        </div>

        {/* Stats card: Total Revenue */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-between hover:shadow-md transition-all duration-200 shadow-sm relative group">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Won Revenue</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">
              {stats.totalRevenue > 0 ? formatCurrency(stats.totalRevenue) : '—'}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span>Confirmed Contracts</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <DollarSign className="h-6 w-6" />
          </div>
        </div>

        {/* Stats card: Pending Payout */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-between hover:shadow-md transition-all duration-200 shadow-sm relative group">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Commissions</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 leading-none">
              {stats.pendingPayout > 0 ? formatCurrency(stats.pendingPayout) : '—'}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-600">
              <Clock className="h-3 w-3" />
              <span>Partner Payouts</span>
            </div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <DollarSign className="h-6 w-6 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Main Grid: Recent Activity & Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Recent Leads Pipeline */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm lg:col-span-2 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Recent Leads</h3>
              <p className="text-slate-400 text-xs mt-0.5">Incoming requests from contact forms and B2B links</p>
            </div>
            <Link 
              to="/admin/leads"
              className="text-xs font-bold text-blue-600 hover:text-blue-500 flex items-center gap-1 hover:underline transition"
            >
              <span>View Pipeline</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          
          <div className="divide-y divide-slate-100 overflow-x-auto flex-1">
            {recentLeads.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Client / Scope</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {recentLeads.map((lead) => {
                    // Status styling maps
                    const statusColors = {
                      'Inquiry': 'bg-slate-100 text-slate-600 border-slate-200/60',
                      'Proposal': 'bg-amber-50 text-amber-700 border-amber-200/60',
                      'Negotiation': 'bg-violet-50 text-violet-700 border-violet-200/60',
                      'Active': 'bg-blue-50 text-blue-700 border-blue-200/60',
                      'Won': 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
                      'Lost': 'bg-rose-50 text-rose-700 border-rose-200/60'
                    };
                    
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/30 transition duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-700">{lead.name}</span>
                            <span className="text-xs text-slate-400 mt-0.5">{lead.projectType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-600">
                          {lead.finalPrice ? formatCurrency(lead.finalPrice) : lead.budget}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {lead.referralCode ? (
                            <span className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded border border-blue-100/50">
                              Partner: {lead.referralCode}
                            </span>
                          ) : (
                            <span className="inline-flex items-center text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-200/30">
                              Direct Lead
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[lead.status] || 'bg-slate-100 text-slate-600 border-slate-200/60'}`}>
                            {lead.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-slate-400 text-sm">
                No active leads found. Create a new lead to populate.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: B2B Partners / Quick Activities */}
        <div className="space-y-6">
          
          {/* Quick Actions Panel */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Quick Admin Panel</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => navigate('/admin/leads?action=new')}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/60 rounded-2xl text-center transition duration-150 gap-2 cursor-pointer"
              >
                <Plus className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-bold text-slate-700">Add Lead</span>
              </button>
              <button 
                onClick={() => navigate('/admin/blogs/new')}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/60 rounded-2xl text-center transition duration-150 gap-2 cursor-pointer"
              >
                <Plus className="h-5 w-5 text-indigo-600" />
                <span className="text-xs font-bold text-slate-700">New Blog</span>
              </button>
              <button 
                onClick={() => navigate('/admin/pricing')}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/60 rounded-2xl text-center transition duration-150 gap-2 cursor-pointer"
              >
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-700">Adjust Price</span>
              </button>
              <button 
                onClick={() => navigate('/admin/partners?action=invite')}
                className="flex flex-col items-center justify-center p-4 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/60 rounded-2xl text-center transition duration-150 gap-2 cursor-pointer"
              >
                <Send className="h-5 w-5 text-violet-600" />
                <span className="text-xs font-bold text-slate-700">Invite Partner</span>
              </button>
            </div>
          </div>

          {/* Recent Partner Signups */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Recent Partners</h3>
                <p className="text-slate-400 text-xs mt-0.5">Newly joined B2B referrers</p>
              </div>
              <Link 
                to="/admin/partners"
                className="text-xs font-bold text-blue-600 hover:text-blue-500 hover:underline transition"
              >
                View All
              </Link>
            </div>
            
            <div className="divide-y divide-slate-100 flex-1">
              {recentPartners.length > 0 ? (
                recentPartners.map((partner) => (
                  <div key={partner.email} className="p-4 hover:bg-slate-50/40 flex items-center justify-between transition duration-150">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-700 truncate">{partner.name}</p>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {partner.agencyName || 'Solo Consultant'} • {partner.city}
                      </p>
                    </div>
                    <span className={`ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                      partner.partnerType === 'agency' 
                        ? 'bg-blue-50 text-blue-600 border-blue-100/50' 
                        : 'bg-indigo-50 text-indigo-600 border-indigo-100/50'
                    }`}>
                      {partner.partnerType === 'agency' ? '15%' : '10%'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-400 text-sm">
                  No partners signed up yet.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
