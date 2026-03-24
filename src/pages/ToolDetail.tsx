import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Copy, 
  Check, 
  Trash2, 
  Play, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_TOOLS } from '../data/tools';
import { getSEOContent, getJSONLD } from '../data/seo';

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const tool = ALL_TOOLS.find(t => t.slug === slug);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<any>({});

  // Related tools
  const relatedTools = useMemo(() => {
    if (!tool) return [];
    return ALL_TOOLS
      .filter(t => t.category === tool.category && t.id !== tool.id)
      .slice(0, 4);
  }, [tool]);

  // Live Preview Effect
  useEffect(() => {
    if (tool && input) {
      const result = tool.process(input, options);
      setOutput(result);
    } else {
      setOutput('');
    }
  }, [input, tool, options]);

  // SEO and Schema
  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} – Free Online Tool | Texly`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Simple and fast tool to ${tool.keywords[0]}. Free and no signup required.`);
      }

      // JSON-LD
      const schemas = getJSONLD(tool.name, tool.slug, tool.keywords[0]);
      const scriptId = 'json-ld-schema';
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(schemas);
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Tool not found</h1>
          <Link to="/" className="text-blue-600 hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleLoadExample = () => {
    if (tool.example) {
      setInput(tool.example);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 font-medium">{tool.name}</span>
        </nav>

        {/* Hook Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>{tool.hook || 'Paste your messy text below and fix it instantly.'}</span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {tool.name}
          </h1>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <Heart className="w-4 h-4 text-rose-500" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>No signup</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Instant result</span>
            </div>
          </div>
        </div>

        {/* Tool Workspace */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden mb-12">
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Your Input
                  </label>
                  <div className="flex items-center space-x-2">
                    {tool.example && (
                      <button
                        onClick={handleLoadExample}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Load Example
                      </button>
                    )}
                    <button
                      onClick={handleClear}
                      className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={tool.placeholder || 'Paste your text here...'}
                  className="w-full h-48 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all resize-none font-mono text-slate-700"
                />

                {/* Tool Specific Options */}
                {tool.id === 'text-repeater' && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Repeat Count:</label>
                    <input 
                      type="number" 
                      className="w-24 p-2 bg-white border border-slate-200 rounded-lg font-bold text-blue-600"
                      value={options.count || 10}
                      onChange={(e) => setOptions({...options, count: parseInt(e.target.value) || 1})}
                    />
                  </div>
                )}

                {tool.id === 'find-replace' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Find:</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg"
                        placeholder="Text to find..."
                        value={options.find || ''}
                        onChange={(e) => setOptions({...options, find: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Replace with:</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg"
                        placeholder="New text..."
                        value={options.replace || ''}
                        onChange={(e) => setOptions({...options, replace: e.target.value})}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => setOutput(tool.process(input, options))}
                  className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>{tool.buttonText || 'Clean My Text'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Output Section */}
              <AnimatePresence>
                {input && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Result
                      </label>
                      <button
                        onClick={handleCopy}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          copied 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Result</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative group">
                      <pre className="w-full min-h-[100px] p-6 bg-blue-50/50 border-2 border-blue-100 rounded-2xl font-mono text-slate-700 whitespace-pre-wrap break-all overflow-auto">
                        {output || 'Processing...'}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm mb-12">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: getSEOContent(tool.id, tool.name, tool.keywords[0] || tool.name.toLowerCase()) 
            }} 
          />
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <span>Try Related Tools</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  to={`/tool/${t.slug}`}
                  className="group p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {t.name}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                        {t.shortDescription}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-slate-500 hover:text-blue-600 font-medium transition-colors"
          >
            <span>Try another tool</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ToolPage;
