import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Target, 
  Users, 
  FileText, 
  FolderGit2, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Bell 
} from 'lucide-react';
import SEO from '../../components/SEO';

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { path: '/admin/leads', label: 'Leads Pipeline', icon: Target },
  { path: '/admin/partners', label: 'B2B Partners', icon: Users },
  { path: '/admin/blogs', label: 'Blog CMS', icon: FileText },
  { path: '/admin/portfolio', label: 'Portfolio Mgr', icon: FolderGit2 },
  { path: '/admin/resources', label: 'Resources Hub', icon: FolderOpen },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // Find active item label for header title
  const currentNav = NAV_ITEMS.find(item => 
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const pageTitle = currentNav ? currentNav.label : 'Admin Portal';

  return (
    <>
      <SEO title={`${pageTitle} - CodeHTML Admin`} description="CodeHTML Admin Dashboard" noindex={true} />
      
      <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-800">
        
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-black border-r border-zinc-800 flex-shrink-0 relative z-30">
          {/* Logo Section */}
          <div className="h-16 flex items-center px-6 border-b border-zinc-800 bg-zinc-900/10 gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
              <Settings className="h-4 w-4 text-white animate-spin-slow" />
            </div>
            <span className="text-lg font-bold text-white tracking-wider">
              CodeHTML<span className="text-blue-500 font-medium">.in</span>
            </span>
            <span className="text-[10px] bg-blue-500/10 text-blue-400 font-semibold px-1.5 py-0.5 rounded border border-blue-500/20 ml-auto">
              ADMIN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 group
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 shadow-sm shadow-blue-500/5' 
                      : 'text-slate-400 hover:bg-zinc-900 hover:text-slate-200'}
                  `}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer User Profile & Logout */}
          <div className="p-4 border-t border-zinc-800 bg-zinc-900/15">
            <div className="flex items-center gap-3 px-2 py-2 mb-3">
              <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center text-slate-350 font-semibold border border-zinc-800/60 shadow">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Sandesh (Admin)'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email || 'admin@codehtml.in'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-zinc-800 transition duration-150 group shadow"
            >
              <LogOut className="h-3.5 w-3.5 text-slate-400 group-hover:text-white transition-colors" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MOBILE DRAWER MENU */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-zinc-950/40 backdrop-blur-sm lg:hidden transition-all duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        <aside className={`
          fixed top-0 bottom-0 left-0 z-50 w-64 bg-black border-r border-zinc-800 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out lg:hidden
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="h-16 flex items-center px-6 border-b border-zinc-800 bg-zinc-900/10 justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                <Settings className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-wider">
                CodeHTML<span className="text-blue-500 font-medium">.in</span>
              </span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-lg border border-zinc-800/80 bg-zinc-900/30"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive 
                      ? 'bg-blue-600/10 text-blue-400 border-r-2 border-blue-500 shadow shadow-blue-500/5' 
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}
                  `}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-800 bg-zinc-900/15">
            <div className="flex items-center gap-3 px-2 py-2 mb-3">
              <div className="h-9 w-9 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-300 font-semibold border border-zinc-800/60 shadow">
                <User className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">{user?.name || 'Sandesh (Admin)'}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email || 'admin@codehtml.in'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-zinc-300 hover:text-white rounded-xl text-xs font-semibold border border-zinc-850 transition duration-150 shadow"
            >
              <LogOut className="h-3.5 w-3.5 text-zinc-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTAINER */}
        <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
          
          {/* HEADER HEADER */}
          <header className="h-16 bg-white border-b border-slate-200/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 flex-shrink-0 sticky top-0 z-20 shadow-sm shadow-slate-100">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-200 bg-slate-50/50 lg:hidden shadow-sm"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
                {pageTitle}
              </h1>
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Notifications */}
              <button className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100/80 bg-slate-50/30 border border-slate-200/60 rounded-xl transition duration-150 relative shadow-sm">
                <Bell className="h-4.5 w-4.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
              </button>

              <div className="h-8 w-px bg-slate-200 hidden sm:block" />

              {/* User badge */}
              <div className="items-center gap-2.5 hidden sm:flex">
                <div className="h-8.5 w-8.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold border border-blue-500 shadow-sm shadow-blue-500/20">
                  SA
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold text-slate-700 leading-none">Sandesh (Admin)</p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Primary Owner</p>
                </div>
              </div>
            </div>
          </header>

          {/* PAGE CONTENT PANEL */}
          <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto">
            <Outlet />
          </main>
        </div>

      </div>
    </>
  );
}
