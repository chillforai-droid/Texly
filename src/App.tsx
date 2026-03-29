import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';

// Pages
import HomePage from './pages/Home';
import ToolPage from './pages/ToolDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import AdminPage from './pages/Admin';
import AuthPage from './pages/Auth';
import ProfilePage from './pages/Profile';
import PrivacyPolicy from './legal/PrivacyPolicy';
import TermsAndConditions from './legal/TermsAndConditions';
import AboutUs from './legal/AboutUs';
import ContactUs from './legal/ContactUs';

// Assets & Data
import { ALL_TOOLS, CATEGORIES } from './data/tools';
import { Github, Twitter, Mail, Zap, Languages, Check, Trash2, RefreshCw, BarChart3, Wrench, ArrowRight, Search, FileText } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Language } from './data/translations';

// 1. Supabase Client Setup
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Analytics Tracker Component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const track = async () => {
      try {
        await supabase.from('page_views').insert([
          { 
            path: location.pathname + location.search, 
            referrer: document.referrer || 'direct',
            browser: navigator.userAgent,
            timestamp: new Date().toISOString()
          }
        ]);
        console.log("Admin Analytics: Page tracked!");
      } catch (err) {
        console.error("Admin Analytics Error:", err);
      }
    };
    track();
  }, [location]);

  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
    { code: 'hn', name: 'Hinglish' },
  ];

  return (
    <nav aria-label="Global Navigation" className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" aria-label="Texly Home">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
            <Zap className="w-5 h-5 fill-current" aria-hidden="true" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-900">TEXLY</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">{t.navbar.home}</Link>
          <Link to="/blog" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">{t.navbar.blog}</Link>
          
          <div className="relative group">
            <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
              {t.navbar.tools}
            </button>
            <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 w-64 grid grid-cols-1 gap-2">
                {ALL_TOOLS.slice(0, 10).map(toolItem => (
                  <Link key={toolItem.id} to={`/tool/${toolItem.slug}`} className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                    {t.toolNames[toolItem.id] || toolItem.name}
                  </Link>
                ))}
                <Link to="/" className="text-xs font-bold text-center text-blue-600 mt-2 pt-2 border-t border-slate-100">{t.navbar.viewAll}</Link>
              </div>
            </div>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
            >
              <Languages className="w-4 h-4" />
              <span>{languages.find(l => l.code === language)?.name}</span>
            </button>
            
            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsLangOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-blue-50 transition-colors"
                    >
                      <span className={language === lang.code ? 'text-blue-600 font-bold' : 'text-slate-600'}>
                        {lang.name}
                      </span>
                      {language === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <a href="mailto:chillforai@gmail.com" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
            {t.navbar.contact}
          </a>
        </div>
      </div>
    </nav>
  );
}

function AppContent() {
  const { t } = useLanguage();
  const [directorySearch, setDirectorySearch] = useState('');
  const filteredTools = useMemo(() => {
    if (!directorySearch) return ALL_TOOLS;
    return ALL_TOOLS.filter(t => 
      t.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(directorySearch.toLowerCase())
    );
  }, [directorySearch]);

  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Texly ${t.directory.title}`,
    "description": t.directory.description,
    "itemListElement": ALL_TOOLS.map((tool, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://texly.online/tool/${tool.slug}`,
      "name": tool.name
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <script type="application/ld+json">
        {JSON.stringify(directorySchema)}
      </script>
      <AnalyticsTracker />
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tool/:slug" element={<ToolPage />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route 
            path="/admin-9823hdjfsdf" 
            element={<ProtectedRoute><AdminPage /></ProtectedRoute>} 
          />
          <Route 
            path="/profile" 
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>

      {/* Directory and Footer implementation remains identical to previous version but without spans */}
      {/* ... (Your rest of the UI code) ... */}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
