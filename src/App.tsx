import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'; // नया इम्पोर्ट

// Pages
[span_2](start_span) import HomePage from './pages/Home';
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
[span_2](end_span) import { ALL_TOOLS, CATEGORIES } from './data/tools';
import { Github, Twitter, Mail, Zap, Languages, Check, Trash2, RefreshCw, BarChart3, Wrench, ArrowRight, Search, FileText } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Language } from './data/translations';

// 1. Supabase Client Setup (Vite के लिए) [नया सेटअप]
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Analytics Tracker Component [आपका नया कंपोनेंट]
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

[span_3](start_span) function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  [span_3](end_span) const [loading, setLoading] = useState(true);
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

  [span_4](start_span) if (loading) {
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
  [span_4](end_span) const [isLangOpen, setIsLangOpen] = useState(false);

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
          
          {/* Tools Dropdown */}
          <div className="relative group">
            <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" aria-haspopup="true">
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

          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
              aria-expanded={isLangOpen}
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
  [span_5](start_span) const filteredTools = useMemo(() => {
    if (!directorySearch) return ALL_TOOLS;
    return ALL_TOOLS.filter(t => 
      t.name.toLowerCase().includes(directorySearch.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(directorySearch.toLowerCase())
    );
  }, [directorySearch]);

  [span_5](end_span) const directorySchema = {
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
      <AnalyticsTracker /> {/* आपका नया ट्रैकर यहाँ लगा दिया गया है */}
      <Navbar />

      <main className="flex-grow">
        <Routes>
          [cite_start][cite: 37, 38, 39, 40] <Route path="/" element={<HomePage />} />
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

      {/* Tools Directory Section */}
      <section aria-labelledby="directory-heading" className="bg-white border-t border-slate-200 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 id="directory-heading" className="text-4xl font-black tracking-tight text-slate-900 mb-6">
              {t.directory.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              {t.directory.description}
            </p>

            <div className="relative max-w-md mx-auto group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text"
                placeholder={t.directory.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {CATEGORIES.map(category => {
              const categoryTools = filteredTools.filter(t => t.category === category.id);
              if (categoryTools.length === 0) return null;
              
              const CategoryIcon = {
                cleaning: Trash2,
                converter: RefreshCw,
                analysis: BarChart3,
                utility: Wrench
              }[category.id] || Zap;

              return (
                <div key={category.id} className="space-y-8">
                  <div className="flex items-center gap-3 pb-4 border-b-2 border-slate-100">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-black text-slate-900 text-xl uppercase tracking-widest">
                      {(t.categories as any)[category.id]}
                    </h3>
                  </div>
                  <ul className="space-y-6" role="list">
                    {categoryTools.map(toolItem => {
                      const ToolIcon = (LucideIcons as any)[toolItem.icon] || FileText;
                      return (
                        <li key={toolItem.id}>
                          <Link to={`/tool/${toolItem.slug}`} className="group block">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <ToolIcon className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                                  {t.toolNames[toolItem.id] || toolItem.name}
                                </span>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-600 transition-all" />
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed group-hover:text-slate-600 transition-colors pl-6">
                              {t.toolDescriptions[toolItem.id] || toolItem.shortDescription}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">TEXLY</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed">{t.footer.description}</p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t.footer.cleaning}</h4>
              <ul className="space-y-4">
                {ALL_TOOLS.filter(tool => tool.category === 'cleaning').slice(0, 5).map(tool => (
                  <li key={tool.id}><Link to={`/tool/${tool.slug}`} className="text-sm text-slate-500 hover:text-blue-600">{t.toolNames[tool.id] || tool.name}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t.footer.resources}</h4>
              <ul className="space-y-4">
                <li><Link to="/blog" className="text-sm text-slate-500 hover:text-blue-600">{t.navbar.blog}</Link></li>
                <li><Link to="/about-us" className="text-sm text-slate-500 hover:text-blue-600">{t.footer.aboutUs}</Link></li>
                <li><a href="/sitemap.xml" className="text-sm text-slate-500 hover:text-blue-600">Sitemap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">{t.footer.connect}</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Github className="w-5 h-5" /></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
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
