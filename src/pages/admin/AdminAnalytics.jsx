import React, { useState, useEffect } from 'react';
import { db } from '../../services/database';
import { 
  TrendingUp, 
  Users, 
  BadgeDollarSign, 
  BarChart3, 
  PieChart, 
  FileDown, 
  Calendar,
  Layers,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export default function AdminAnalytics() {
  const [leads, setLeads] = useState([]);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timePeriod, setTimePeriod] = useState('all-time'); // 'all-time' | 'month'

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const fetchedLeads = await db.getLeads();
      const fetchedPartners = await db.getPartners();
      setLeads(fetchedLeads);
      setPartners(fetchedPartners);
    } catch (err) {
      console.error("Failed to load analytics data", err);
    } finally {
      setLoading(false);
    }
  };

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
      return `₹${val.toLocaleString()}`;
    }
  };

  // Calculations
  const metrics = React.useMemo(() => {
    // Filter by period if needed
    const filteredLeads = leads; 
    
    const totalCount = filteredLeads.length;
    const wonLeads = filteredLeads.filter(l => l.status === 'Won');
    const wonCount = wonLeads.length;
    const conversionRate = totalCount > 0 ? Math.round((wonCount / totalCount) * 100) : 0;

    // Total revenue in AED (normalize budgets/prices)
    let totalRevenue = 0;
    let pendingPayouts = 0;
    let paidPayouts = 0;

    wonLeads.forEach(l => {
      const price = l.finalPrice || l.budgetVal || 0;
      totalRevenue += price;
      
      const commRate = l.commissionRate || 10;
      const commission = (price * commRate) / 100;
      pendingPayouts += commission; // Mock payout tracking
    });

    // Funnel stages
    const funnel = {
      inquiry: filteredLeads.filter(l => l.status?.toLowerCase() === 'inquiry').length,
      proposal: filteredLeads.filter(l => l.status?.toLowerCase() === 'proposal').length,
      negotiation: filteredLeads.filter(l => l.status?.toLowerCase() === 'negotiation').length,
      won: wonCount,
      lost: filteredLeads.filter(l => l.status?.toLowerCase() === 'lost').length
    };

    // Category breakdown
    const categories = {};
    filteredLeads.forEach(l => {
      const cat = l.projectType || 'Other';
      categories[cat] = (categories[cat] || 0) + 1;
    });

    return {
      totalCount,
      wonCount,
      conversionRate,
      totalRevenue,
      pendingPayouts,
      funnel,
      categories
    };
  }, [leads]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg className="animate-spin h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans text-left">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Business intelligence</h2>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">Real-time revenue metrics, funnel conversion analytics, and B2B statistics</p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            className="block px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none cursor-pointer"
          >
            <option value="all-time">All-Time Period</option>
            <option value="month">Current Month</option>
          </select>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition cursor-pointer"
          >
            <FileDown className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Pipeline Revenue</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded-lg"><BadgeDollarSign className="h-4 w-4" /></span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{formatCurrency(metrics.totalRevenue)}</span>
            <span className="text-[10px] text-emerald-500 font-bold block mt-0.5">Won referrals contracts</span>
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Conversion Rate</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><TrendingUp className="h-4 w-4" /></span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{metrics.conversionRate}%</span>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">{metrics.wonCount} won of {metrics.totalCount} leads</span>
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Partners Network</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg"><Users className="h-4 w-4" /></span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{partners.length} active</span>
            <span className="text-[10px] text-slate-400 font-medium block mt-0.5">Solo and agency referrers</span>
          </div>
        </div>

        <div className="bg-white p-5 border border-slate-200/80 rounded-2xl shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Accrued Commissions</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg"><BarChart3 className="h-4 w-4" /></span>
          </div>
          <div>
            <span className="text-2xl font-black text-slate-800">{formatCurrency(metrics.pendingPayouts)}</span>
            <span className="text-[10px] text-amber-500 font-bold block mt-0.5">Affiliates payout ledger</span>
          </div>
        </div>
      </div>

      {/* Main Charts area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Lead Funnel visualizer */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Leads Acquisition Pipeline</h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">Conversion stages breakdown</p>
          </div>

          <div className="space-y-4">
            {/* Inquiry */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Inquiry ({metrics.funnel.inquiry})</span>
                <span>{metrics.totalCount > 0 ? Math.round((metrics.funnel.inquiry / metrics.totalCount) * 100) : 0}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${metrics.totalCount > 0 ? (metrics.funnel.inquiry / metrics.totalCount) * 100 : 0}%` }}
                  className="h-full bg-blue-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Proposal */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Proposal ({metrics.funnel.proposal})</span>
                <span>{metrics.totalCount > 0 ? Math.round((metrics.funnel.proposal / metrics.totalCount) * 100) : 0}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${metrics.totalCount > 0 ? (metrics.funnel.proposal / metrics.totalCount) * 100 : 0}%` }}
                  className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Negotiation */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Negotiation ({metrics.funnel.negotiation})</span>
                <span>{metrics.totalCount > 0 ? Math.round((metrics.funnel.negotiation / metrics.totalCount) * 100) : 0}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${metrics.totalCount > 0 ? (metrics.funnel.negotiation / metrics.totalCount) * 100 : 0}%` }}
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>

            {/* Won */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-1.5">
                <span>Won ({metrics.funnel.won})</span>
                <span>{metrics.totalCount > 0 ? Math.round((metrics.funnel.won / metrics.totalCount) * 100) : 0}%</span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  style={{ width: `${metrics.totalCount > 0 ? (metrics.funnel.won / metrics.totalCount) * 100 : 0}%` }}
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project category breakdown */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Product Categories</h3>
            <p className="text-slate-400 text-[11px] font-medium mt-0.5">Distribution of lead service types</p>
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {Object.entries(metrics.categories).map(([cat, count]) => {
              const percentage = metrics.totalCount > 0 ? Math.round((count / metrics.totalCount) * 100) : 0;
              return (
                <div key={cat} className="flex items-center justify-between text-xs border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                  <span className="font-bold text-slate-700 truncate max-w-[150px]">{cat}</span>
                  <div className="flex items-center gap-2 font-semibold">
                    <span className="text-slate-400">{count} leads</span>
                    <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{percentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
