import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ALL_TOOLS, CATEGORIES } from '../data/tools';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const HomePage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = `Texly – ${t.home.heroTitle}`;
  }, [t.home.heroTitle]);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return ALL_TOOLS;
    return ALL_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const popularTools = ALL_TOOLS.slice(0, 6);

  // JSON-LD for Home
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": "https://texly.online",
    "name": "Texly",
    "description": "Free online text tools for cleaning, formatting, and analyzing text.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://texly.online/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const categoryIcons: any = {
    cleaning: <LucideIcons.Trash2 className="w-5 h-5" />,
    converter: <LucideIcons.RefreshCw className="w-5 h-5" />,
    analysis: <LucideIcons.BarChart3 className="w-5 h-5" />,
    utility: <LucideIcons.Wrench className="w-5 h-5" />,
  };

  return (
    <main className="relative min-h-screen">
      <script type="application/ld+json">
        {JSON.stringify(homeSchema)}
      </script>
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
      <section className="text-center mb-16" aria-labelledby="hero-title">
        <motion.h1 
          id="hero-title"
          key={t.home.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
        >
          {t.home.heroTitle}
        </motion.h1>
        <motion.p 
          key={t.home.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
        >
          {t.home.heroSubtitle}
        </motion.p>

        <div className="relative max-w-xl mx-auto group">
          <label htmlFor="tool-search" className="sr-only">{t.home.searchPlaceholder}</label>
          <LucideIcons.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" aria-hidden="true" />
          <input
            id="tool-search"
            type="text"
            placeholder={t.home.searchPlaceholder}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {ALL_TOOLS.slice(0, 4).map(tool => (
            <Link 
              key={tool.id} 
              to={`/tool/${tool.slug}`}
              className="px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:shadow-sm transition-all"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      {!searchQuery && (
        <section className="mb-20" aria-labelledby="categories-title">
          <h2 id="categories-title" className="text-2xl font-bold text-slate-900 mb-8">{t.home.browseCategory}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1" role="listitem">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4" aria-hidden="true">
                  {categoryIcons[cat.id]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{(t.categories as any)[cat.id]}</h3>
                <p className="text-sm text-slate-500 mb-4">{(t.categories as any)[`${cat.id}Desc`]}</p>
                <div className="space-y-2">
                  {ALL_TOOLS.filter(t => t.category === cat.id).slice(0, 3).map(t => (
                    <Link 
                      key={t.id} 
                      to={`/tool/${t.slug}`} 
                      className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-700 font-medium group/link"
                    >
                      <span>{t.name}</span>
                      <LucideIcons.ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section aria-labelledby="tools-title">
        <div className="flex items-center justify-between mb-8">
          <h2 id="tools-title" className="text-2xl font-bold text-slate-900">
            {searchQuery ? `${t.home.searchResults} (${filteredTools.length})` : t.home.popularTools}
          </h2>
          {!searchQuery && (
            <div className="flex items-center space-x-2 text-sm font-bold text-blue-600">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span>Trending Now</span>
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {(searchQuery ? filteredTools : popularTools).map((tool, idx) => (
            <Link 
              key={tool.id} 
              to={`/tool/${tool.slug}`}
              className={`group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all hover:-translate-y-1 flex flex-col h-full ${idx === 0 && !searchQuery ? 'sm:col-span-2 lg:col-span-1 bg-gradient-to-br from-white to-blue-50/30' : ''}`}
              role="listitem"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner" aria-hidden="true">
                  {(() => {
                    const Icon = (LucideIcons as any)[tool.icon];
                    return Icon ? <Icon className="w-7 h-7" /> : <LucideIcons.Zap className="w-7 h-7" />;
                  })()}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    Try Now
                  </div>
                  {idx < 3 && !searchQuery && (
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Popular</span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
              <p className="text-slate-500 line-clamp-2 mb-8 flex-grow leading-relaxed">{tool.shortDescription}</p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center text-blue-600 text-sm font-bold group-hover:gap-2 transition-all">
                  <span>Use Tool</span>
                  <LucideIcons.ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
                <span className="text-[10px] font-medium text-slate-400">Free & Secure</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="mt-24 pt-16 border-t border-slate-100" aria-labelledby="why-choose-title">
        <div className="prose prose-slate max-w-none">
          <h2 id="why-choose-title" className="text-3xl font-bold text-slate-900 mb-8 text-center">{t.home.whyChoose}</h2>
          <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-16">
            {t.home.whyChooseDesc}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
            <div className="text-center p-8 rounded-3xl bg-white border border-slate-50 shadow-sm">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <LucideIcons.Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.freeTitle}</h3>
              <p className="text-slate-500 leading-relaxed">{t.home.freeDesc}</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white border border-slate-50 shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <LucideIcons.RefreshCw className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.privacyTitle}</h3>
              <p className="text-slate-500 leading-relaxed">{t.home.privacyDesc}</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-white border border-slate-50 shadow-sm">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6" aria-hidden="true">
                <LucideIcons.BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{t.home.speedTitle}</h3>
              <p className="text-slate-500 leading-relaxed">{t.home.speedDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
  );
};

export default HomePage;
