import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fromPath = (location.state as any)?.from?.pathname || '/admin-9823hdjfsdf';
  const fromSearch = (location.state as any)?.from?.search || '';
  const from = `${fromPath}${fromSearch}`;

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      setError('Supabase is not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your project settings.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        alert('Check your email for the confirmation link!');
      }
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  if (!supabase) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[2rem] shadow-2xl p-10 border border-red-100"
        >
          <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-red-600">
            <AlertCircle className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 text-center mb-4 tracking-tight">Supabase Not Configured</h1>
          <p className="text-slate-500 text-center mb-8 leading-relaxed">
            To enable authentication and the CMS, you need to add your Supabase credentials to the project settings.
          </p>
          
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
              <p className="text-sm text-slate-600 font-medium">Go to <b>Settings</b> in the top right menu.</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
              <p className="text-sm text-slate-600 font-medium">Add <b>VITE_SUPABASE_URL</b> and <b>VITE_SUPABASE_ANON_KEY</b>.</p>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
          >
            I've added them, Refresh Page
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-600/20">
            {isLogin ? <LogIn className="w-8 h-8" /> : <UserPlus className="w-8 h-8" />}
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-slate-500 mt-2">
            {isLogin ? 'Login to manage your articles' : 'Join Texly to start publishing'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <LogIn className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                {isLogin ? 'Login' : 'Sign Up'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 text-center">
          <p className="text-slate-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
