import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Eye, EyeOff, ShieldAlert, User } from 'lucide-react';
import SEO from '../../components/SEO';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adminId.trim() || !password.trim()) {
      setError('Both Admin ID and Password are required.');
      return;
    }

    setLoading(true);
    setError('');

    // Admin login is instant
    setTimeout(() => {
      const res = loginAdmin(adminId, password);
      setLoading(false);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Incorrect admin credentials.');
      }
    }, 400);
  };

  return (
    <>
      <SEO 
        title="Admin Security Gateway - CodeHTML" 
        description="Authorized personnel login gateway." 
        noindex={true}
      />
      <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Background Decorative Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[60%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Lock className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-wider">
              CodeHTML<span className="text-blue-500">.in</span>
            </span>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Security Gateway
          </h2>
          <p className="mt-2 text-center text-sm text-zinc-400">
            Authorized admin access only. Connection is encrypted.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4 sm:px-0">
          <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/60 py-8 px-6 shadow-2xl rounded-2xl sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label 
                  htmlFor="adminId" 
                  className="block text-sm font-medium text-zinc-300"
                >
                  Admin ID
                </label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="adminId"
                    name="adminId"
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="block w-full pl-10 py-3 bg-zinc-950 border border-zinc-800/60 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80 transition duration-150 sm:text-sm font-sans"
                    placeholder="Enter admin ID"
                  />
                </div>
              </div>

              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-zinc-300"
                >
                  Admin Key / Password
                </label>
                <div className="mt-2 relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 bg-zinc-950 border border-zinc-800/60 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/80 transition duration-150 sm:text-sm font-sans"
                    placeholder="Enter admin password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ShieldAlert className="h-5 w-5 text-red-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-400">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-950 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all duration-150"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Verifying...
                    </div>
                  ) : (
                    'Decrypt & Access'
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/partner')}
              className="text-xs text-zinc-500 hover:text-zinc-400 underline transition duration-150"
            >
              Are you a B2B Referral Partner? Go to Partner Portal
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
