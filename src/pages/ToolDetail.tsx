import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Copy, Check, ArrowLeft, Share2, Info } from 'lucide-react';
import { ALL_TOOLS } from '../data/tools';
import { getSEOContent } from '../data/seo';
import { motion } from 'framer-motion';

const ToolPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<any>({});

  const tool = ALL_TOOLS.find(t => t.slug === slug);

  useEffect(() => {
    if (!tool) {
      navigate('/');
      return;
    }
    document.title = `${tool.name} Tool – Texly`;
    // Reset state on tool change
    setInput('');
    setOutput('');
    setOptions({});
  }, [slug, tool, navigate]);

  if (!tool) return null;

  const handleProcess = () => {
    const result = tool.process(input, options);
    setOutput(result);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const relatedTools = ALL_TOOLS
    .filter(t => t.category === tool.category && t.id !== tool.id)
    .slice(0, 4);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to all tools
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider">
            {tool.category}
          </span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{tool.name}</h1>
        <p className="text-lg text-slate-600">{tool.shortDescription}</p>
      </header>

      {/* Tool Interface */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-16">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Info className="w-4 h-4" />
            Input Text
          </div>
          <button 
            onClick={() => setInput('')}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear Input
          </button>
        </div>
        
        <div className="p-6">
          <textarea
            className="w-full h-48 p-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none font-mono text-sm"
            placeholder="Paste your text here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {/* Tool Specific Options */}
          {tool.id === 'text-repeater' && (
            <div className="mt-4 flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700">Repeat Count:</label>
              <input 
                type="number" 
                className="w-24 p-2 border border-slate-200 rounded-lg"
                value={options.count || 10}
                onChange={(e) => setOptions({...options, count: e.target.value})}
              />
            </div>
          )}

          {tool.id === 'find-replace' && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Find:</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  value={options.find || ''}
                  onChange={(e) => setOptions({...options, find: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Replace with:</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-slate-200 rounded-lg"
                  value={options.replace || ''}
                  onChange={(e) => setOptions({...options, replace: e.target.value})}
                />
              </div>
            </div>
          )}

          <button
            onClick={handleProcess}
            className="w-full mt-6 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            Process Text
          </button>
        </div>

        {output && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-6 border-t border-slate-100 bg-blue-50/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-blue-900 uppercase tracking-tight">Result</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-all text-sm font-medium"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
            </div>
            <pre className="w-full max-h-64 overflow-auto p-4 bg-white border border-blue-100 rounded-xl font-mono text-sm text-slate-800 whitespace-pre-wrap">
              {output}
            </pre>
          </motion.div>
        )}
      </div>

      {/* SEO Content */}
      <div className="mb-24">
        <div dangerouslySetInnerHTML={{ __html: getSEOContent(tool.id, tool.name, tool.keywords[0] || tool.name.toLowerCase()) }} />
      </div>

      {/* Related Tools */}
      <section className="pt-12 border-t border-slate-100">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Related Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedTools.map(t => (
            <Link 
              key={t.id} 
              to={`/tool/${t.slug}`}
              className="p-4 bg-slate-50 rounded-xl border border-transparent hover:border-blue-200 hover:bg-white transition-all flex items-center justify-between group"
            >
              <span className="font-medium text-slate-700 group-hover:text-blue-600">{t.name}</span>
              <Share2 className="w-4 h-4 text-slate-300 group-hover:text-blue-400" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ToolPage;
