import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/Home';
import ToolPage from './pages/ToolDetail';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import TermsAndConditions from './pages/legal/TermsAndConditions';
import AboutUs from './pages/legal/AboutUs';
import ContactUs from './pages/legal/ContactUs';
import { ALL_TOOLS } from './data/tools';
import { Github, Twitter, Mail, Zap } from 'lucide-react';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
          {/* Navbar */}
          <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xl font-black tracking-tighter text-slate-900">TEXLY</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
                <div className="relative group">
                  <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Tools</button>
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="bg-white border border-slate-200 rounded-xl shadow-xl p-4 w-64 grid grid-cols-1 gap-2">
                      {ALL_TOOLS.slice(0, 10).map(t => (
                        <Link key={t.id} to={`/tool/${t.slug}`} className="text-sm text-slate-500 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all">
                          {t.name}
                        </Link>
                      ))}
                      <Link to="/" className="text-xs font-bold text-center text-blue-600 mt-2 pt-2 border-t border-slate-100">View All 50+ Tools</Link>
                    </div>
                  </div>
                </div>
                <a href="mailto:chillforai@gmail.com" className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tool/:slug" element={<ToolPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </main>

          {/* All Tools Directory */}
          <section className="bg-white border-t border-slate-200 py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">All Text Tools Directory</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-3">
                {ALL_TOOLS.map(tool => (
                  <Link 
                    key={tool.id} 
                    to={`/tool/${tool.slug}`} 
                    className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                  <Link to="/" className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                      <Zap className="w-5 h-5 fill-current" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-slate-900">TEXLY</span>
                  </Link>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    The ultimate text tools hub. 50+ free online tools for writers, developers, and data enthusiasts.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Cleaning</h4>
                  <ul className="space-y-4">
                    {ALL_TOOLS.filter(t => t.category === 'cleaning').slice(0, 5).map(t => (
                      <li key={t.id}><Link to={`/tool/${t.slug}`} className="text-sm text-slate-500 hover:text-blue-600">{t.name}</Link></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Converters</h4>
                  <ul className="space-y-4">
                    {ALL_TOOLS.filter(t => t.category === 'converter').slice(0, 5).map(t => (
                      <li key={t.id}><Link to={`/tool/${t.slug}`} className="text-sm text-slate-500 hover:text-blue-600">{t.name}</Link></li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h4>
                  <div className="flex gap-4 mb-6">
                    <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><Twitter className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Github className="w-5 h-5" /></a>
                    <a href="#" className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all"><Mail className="w-5 h-5" /></a>
                  </div>
                  <p className="text-xs text-slate-400">© 2026 Texly. All rights reserved.</p>
                </div>
              </div>
              
              <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex gap-6">
                  <Link to="/privacy-policy" className="text-xs text-slate-400 hover:text-slate-600">Privacy Policy</Link>
                  <Link to="/terms-and-conditions" className="text-xs text-slate-400 hover:text-slate-600">Terms of Service</Link>
                  <Link to="/about-us" className="text-xs text-slate-400 hover:text-slate-600">About Us</Link>
                  <Link to="/contact-us" className="text-xs text-slate-400 hover:text-slate-600">Contact Us</Link>
                  <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">Sitemap</Link>
                </div>
                <p className="text-xs text-slate-400 italic">Made with ❤️ for the open web.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
  );
}

export default App;
