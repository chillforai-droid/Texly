import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Zap, Trash2, RefreshCw, BarChart3, Wrench, ArrowRight } from 'lucide-react';
import { ALL_TOOLS, CATEGORIES } from '../data/tools';
import { motion } from 'motion/react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    document.title = "Texly – Free Text Tools Online | Clean, Format & Analyze Text";
  }, []);

  const filteredTools = useMemo(() => {
    if (!searchQuery) return ALL_TOOLS;
    return ALL_TOOLS.filter(tool => 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const popularTools = ALL_TOOLS.slice(0, 6);

  const categoryIcons: any = {
    cleaning: <Trash2 className="w-5 h-5" />,
    converter: <RefreshCw className="w-5 h-5" />,
    analysis: <BarChart3 className="w-5 h-5" />,
    utility: <Wrench className="w-5 h-5" />,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
        >
          Free Text Tools Online – Clean, Format & Fix Text Instantly
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
        >
          50+ free, fast, and secure online text tools. Clean, convert, analyze, and manipulate your text instantly.
        </motion.p>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Find your text tool (e.g., word counter, slug generator)..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      {/* Categories */}
      {!searchQuery && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  {categoryIcons[cat.id]}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{cat.name}</h3>
                <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                <div className="space-y-2">
                  {ALL_TOOLS.filter(t => t.category === cat.id).slice(0, 3).map(t => (
                    <Link key={t.id} to={`/tool/${t.slug}`} className="block text-sm text-blue-600 hover:underline">
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">
          {searchQuery ? `Search Results (${filteredTools.length})` : 'Popular Tools'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(searchQuery ? filteredTools : popularTools).map((tool) => (
            <Link 
              key={tool.id} 
              to={`/tool/${tool.slug}`}
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-slate-50 text-slate-600 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <Zap className="w-5 h-5" />
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{tool.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{tool.shortDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO Footer Content */}
      <section className="mt-24 pt-12 border-t border-slate-100">
        <div className="prose prose-slate max-w-none">
          <h2>Why Choose Texly for Your Text Processing Needs?</h2>
          <p>
            Texly is the internet's most comprehensive hub for text tools. We understand that whether you're a developer 
            debugging code, a student writing an essay, or a marketer crafting the perfect social media post, 
            text formatting can be a tedious chore. That's why we built Texly—to provide a fast, free, and 
            privacy-focused solution for all your text manipulation needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h3>100% Free & Unlimited</h3>
              <p>No hidden costs, no premium tiers. Every single one of our 50+ tools is free to use as much as you want.</p>
            </div>
            <div>
              <h3>Privacy First</h3>
              <p>Your data stays with you. All processing happens in your browser, meaning your text is never sent to our servers.</p>
            </div>
            <div>
              <h3>Blazing Fast</h3>
              <p>Built with modern web technologies, our tools work instantly, even with large amounts of text.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
