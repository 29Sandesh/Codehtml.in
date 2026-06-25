import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Key, 
  Mail, 
  Users, 
  Bell, 
  Shield,
  MessageSquare,
  Lock,
  UserPlus
} from 'lucide-react';

const DEFAULT_SETTINGS = {
  companyName: 'CodeHTML.in',
  contactEmail: 'contact@codehtml.in',
  whatsappNumber: '+91 93032 28082',
  defaultCurrency: 'AED',
  defaultCommissionSolo: 10,
  defaultCommissionAgency: 15,
  notifyNewLeadEmail: true,
  notifyNewLeadWhatsApp: false,
  web3formsKey: 'e5b72186-mock-key-77812',
  emailjsServiceId: 'service_mock123',
  emailjsTemplateId: 'template_mock123'
};

const DEFAULT_TEAM = [
  { email: 'admin@codehtml.in', name: 'Sandesh (Owner)', role: 'Admin', status: 'Active' },
  { email: 'staff@codehtml.in', name: 'Alok Sharma', role: 'Staff', status: 'Active' }
];

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'integrations' | 'team'
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [toast, setToast] = useState('');
  
  // Team invite form state
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('Staff');

  useEffect(() => {
    // Load settings from localStorage
    const storedSettings = localStorage.getItem('codehtml_settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    } else {
      localStorage.setItem('codehtml_settings', JSON.stringify(DEFAULT_SETTINGS));
    }

    // Load team members
    const storedTeam = localStorage.getItem('codehtml_team');
    if (storedTeam) {
      setTeam(JSON.parse(storedTeam));
    } else {
      localStorage.setItem('codehtml_team', JSON.stringify(DEFAULT_TEAM));
    }
  }, []);

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('codehtml_settings', JSON.stringify(settings));
    showToastMsg("Configuration updated successfully!");
  };

  const handleAddTeamMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    const exists = team.some(t => t.email.toLowerCase() === newMemberEmail.toLowerCase());
    if (exists) {
      alert("This email is already added to the team.");
      return;
    }

    const updatedTeam = [
      ...team,
      {
        name: newMemberName,
        email: newMemberEmail.toLowerCase(),
        role: newMemberRole,
        status: 'Active'
      }
    ];

    setTeam(updatedTeam);
    localStorage.setItem('codehtml_team', JSON.stringify(updatedTeam));
    
    // Clear form
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('Staff');
    showToastMsg("New team member added successfully!");
  };

  const handleRemoveTeamMember = (email) => {
    if (email === 'admin@codehtml.in') {
      alert("Cannot remove the primary owner account.");
      return;
    }
    if (!window.confirm(`Are you sure you want to remove access for ${email}?`)) return;

    const updatedTeam = team.filter(t => t.email.toLowerCase() !== email.toLowerCase());
    setTeam(updatedTeam);
    localStorage.setItem('codehtml_team', JSON.stringify(updatedTeam));
    showToastMsg("Team member removed");
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
      <div>
        <h2 className="text-xl font-bold text-slate-800">System Settings</h2>
        <p className="text-slate-400 text-xs mt-0.5 font-medium">Configure global defaults, API integrations, and manage team permissions</p>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'general' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className="h-4 w-4" />
          <span>General Settings</span>
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'integrations' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Key className="h-4 w-4 text-indigo-500" />
          <span>Integrations & API</span>
        </button>
        <button
          onClick={() => setActiveTab('team')}
          className={`px-5 py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'team' 
              ? 'border-blue-600 text-blue-600' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="h-4 w-4 text-emerald-500" />
          <span>Team Roles ({team.length})</span>
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === 'general' && (
        <form onSubmit={handleSaveSettings} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2">Metadata Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Company Display Name</label>
                <input
                  type="text"
                  required
                  value={settings.companyName}
                  onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Default Currency</label>
                <select
                  value={settings.defaultCurrency}
                  onChange={(e) => setSettings({...settings, defaultCurrency: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                >
                  <option value="AED">AED (United Arab Emirates Dirham)</option>
                  <option value="INR">INR (Indian Rupee)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="SGD">SGD (Singapore Dollar)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Public Contact Email</label>
                <input
                  type="email"
                  required
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">WhatsApp Contact Number</label>
                <input
                  type="text"
                  required
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none"
                />
              </div>
            </div>

            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 pt-4 mb-2">B2B Partner Commissions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Default Solo Commission Rate (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={settings.defaultCommissionSolo}
                  onChange={(e) => setSettings({...settings, defaultCommissionSolo: Number(e.target.value)})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Default Agency Commission Rate (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={100}
                  value={settings.defaultCommissionAgency}
                  onChange={(e) => setSettings({...settings, defaultCommissionAgency: Number(e.target.value)})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Save Action */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>Save General Settings</span>
              </button>
            </div>

          </div>

          {/* Quick Notification Settings */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2 mb-2">
                <Bell className="h-4.5 w-4.5 text-blue-500" />
                <h3 className="text-sm font-bold text-slate-800">Alert Options</h3>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifyNewLeadEmail}
                    onChange={(e) => setSettings({...settings, notifyNewLeadEmail: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">Email Alerts</span>
                    <span className="text-[10px] text-slate-400 font-medium">Send copy of inquiries to {settings.contactEmail}</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.notifyNewLeadWhatsApp}
                    onChange={(e) => setSettings({...settings, notifyNewLeadWhatsApp: e.target.checked})}
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded cursor-pointer"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-700 block">WhatsApp Alerts</span>
                    <span className="text-[10px] text-slate-400 font-medium">Auto-push templates to admins on lead capture</span>
                  </div>
                </label>
              </div>

            </div>
          </div>
        </form>
      )}

      {activeTab === 'integrations' && (
        <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm max-w-2xl space-y-5">
          <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-2">
            <Mail className="h-4.5 w-4.5 text-indigo-500" />
            <h3 className="text-sm font-bold text-slate-800">Mail & Client Capture APIs</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Web3Forms Access Key</label>
              <input
                type="password"
                required
                value={settings.web3formsKey}
                onChange={(e) => setSettings({...settings, web3formsKey: e.target.value})}
                className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-xs focus:outline-none"
              />
              <span className="text-[10px] text-slate-400 font-medium mt-1.5 block">Used in public forms to forward capture copies straight to your email.</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">EmailJS Service ID</label>
                <input
                  type="text"
                  required
                  value={settings.emailjsServiceId}
                  onChange={(e) => setSettings({...settings, emailjsServiceId: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">EmailJS Template ID</label>
                <input
                  type="text"
                  required
                  value={settings.emailjsTemplateId}
                  onChange={(e) => setSettings({...settings, emailjsTemplateId: e.target.value})}
                  className="block w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-mono text-xs focus:outline-none"
                />
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 text-[11px] text-slate-500 leading-normal">
              <Lock className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-700">Client-Side Secure Dispatchers</p>
                <p className="mt-1">All public capture requests dispatch via tokenized REST envelopes to protect secret parameters. No raw password structures are exposed to client script trackers.</p>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer"
            >
              <Save className="h-4 w-4" />
              <span>Save Integrations</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Members List */}
          <div className="md:col-span-2 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-2 mb-2">Active Team Credentials</h3>
            
            <div className="divide-y divide-slate-100">
              {team.map((member) => (
                <div key={member.email} className="py-4 first:pt-0 flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-800 block text-xs">{member.name}</span>
                    <span className="font-mono text-[10px] text-slate-400 block">{member.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-md text-[10px] uppercase font-bold tracking-wider">
                      {member.role}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <span className="h-1 w-1 bg-emerald-500 rounded-full"></span>
                      <span>Active</span>
                    </span>
                    <button
                      type="button"
                      disabled={member.email === 'admin@codehtml.in'}
                      onClick={() => handleRemoveTeamMember(member.email)}
                      className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Member */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm h-fit">
            <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 mb-4">
              <UserPlus className="h-4.5 w-4.5 text-blue-500" />
              <h3 className="text-sm font-bold text-slate-800">Add Staff Account</h3>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Member Name</label>
                <input
                  type="text"
                  required
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Alok Sharma"
                  className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Member Email</label>
                <input
                  type="email"
                  required
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="staff@codehtml.in"
                  className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Security Role</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value)}
                  className="block w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-bold text-xs focus:outline-none cursor-pointer"
                >
                  <option value="Staff">Staff (View Pipeline + Leads)</option>
                  <option value="Admin">Admin (Full Edit Control)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/10 cursor-pointer transition"
              >
                <Plus className="h-4 w-4" />
                <span>Add Staff member</span>
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
