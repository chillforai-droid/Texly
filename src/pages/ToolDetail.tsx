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
  Sparkles,
  Image as ImageIcon,
  Upload,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALL_TOOLS } from '../data/tools';
import { getSEOContent, getJSONLD } from '../data/seo';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenAI } from "@google/genai";

export const ToolPage: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const tool = ALL_TOOLS.find(t => t.slug === slug);
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOcr = async () => {
    if (!imagePreview) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const base64Data = imagePreview.split(',')[1];
      const mimeType = imagePreview.split(';')[0].split(':')[1];
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            parts: [
              { text: "Extract all text from this image. Return only the extracted text without any additional comments. If there is no text, say 'No text found'." },
              { inlineData: { mimeType: mimeType, data: base64Data } }
            ]
          }
        ]
      });
      setOutput(response.text || 'No text found.');
    } catch (error) {
      console.error('OCR Error:', error);
      setOutput('Error extracting text. Please ensure you have a valid API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = () => {
    if (tool.id === 'image-to-text') {
      handleOcr();
    } else {
      setOutput(tool.process(input, options));
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-blue-600">{t.navbar.home}</Link>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
          <span className="text-slate-900 font-medium" aria-current="page">{tool.name}</span>
        </nav>

        {/* Hook Section */}
        <div className="text-center mb-12">
          <motion.div
            key={tool.hook}
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
          
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600" role="list">
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm" role="listitem">
              <Heart className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span>{t.tool.freeForever}</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm" role="listitem">
              <ShieldCheck className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <span>{t.tool.noSignup}</span>
            </div>
            <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm" role="listitem">
              <Zap className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>{t.tool.instantResult}</span>
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
                  <label htmlFor="tool-input" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    {t.tool.input}
                  </label>
                  <div className="flex items-center space-x-2">
                    {tool.example && (
                      <button
                        onClick={handleLoadExample}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded-md hover:bg-blue-50 transition-colors"
                        aria-label={t.tool.loadExample}
                      >
                        {t.tool.loadExample}
                      </button>
                    )}
                    <button
                      onClick={handleClear}
                      className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1 rounded-md hover:bg-rose-50 transition-colors flex items-center space-x-1"
                      aria-label={t.tool.clear}
                    >
                      <Trash2 className="w-3 h-3" aria-hidden="true" />
                      <span>{t.tool.clear}</span>
                    </button>
                  </div>
                </div>
                
                {tool.id === 'image-to-text' ? (
                  <div className="space-y-4">
                    <div 
                      className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                        imagePreview ? 'border-blue-500 bg-blue-50/30' : 'border-slate-200 hover:border-blue-400 bg-slate-50'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        aria-label="Upload image"
                      />
                      <div className="flex flex-col items-center justify-center space-y-3 text-center">
                        {imagePreview ? (
                          <div className="relative w-full max-w-xs aspect-video rounded-lg overflow-hidden border border-blue-200 shadow-sm">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                          </div>
                        ) : (
                          <div className="p-4 bg-white rounded-full shadow-sm">
                            <Upload className="w-8 h-8 text-blue-600" />
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            {imagePreview ? 'Change Image' : 'Click or Drag Image to Upload'}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Supports PNG, JPG, WEBP up to 5MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <textarea
                    id="tool-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={tool.placeholder || 'Paste your text here...'}
                    className="w-full h-48 p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all resize-none font-mono text-slate-700"
                    aria-multiline="true"
                  />
                )}

                {/* Tool Specific Options */}
                {tool.id === 'text-repeater' && (
                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <label htmlFor="repeat-count" className="text-sm font-bold text-slate-700 uppercase tracking-wider">Repeat Count:</label>
                    <input 
                      id="repeat-count"
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
                      <label htmlFor="find-text" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Find:</label>
                      <input 
                        id="find-text"
                        type="text" 
                        className="w-full p-3 bg-white border border-slate-200 rounded-lg"
                        placeholder="Text to find..."
                        value={options.find || ''}
                        onChange={(e) => setOptions({...options, find: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="replace-text" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Replace with:</label>
                      <input 
                        id="replace-text"
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
                  onClick={handleProcess}
                  disabled={loading || (tool.id === 'image-to-text' ? !imagePreview : !input)}
                  className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                  <span>{loading ? 'Processing...' : (tool.buttonText || t.tool.process)}</span>
                  {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>

              {/* Output Section */}
              <AnimatePresence>
                {(output || loading) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <label htmlFor="tool-output" className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        {t.tool.result}
                      </label>
                      <button
                        onClick={handleCopy}
                        aria-live="polite"
                        className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                          copied 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                        }`}
                      >
                        {copied ? (
                          <>
                            <Check className="w-4 h-4" aria-hidden="true" />
                            <span>{t.tool.copied}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" aria-hidden="true" />
                            <span>{t.tool.copy}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="relative group">
                      <pre 
                        id="tool-output"
                        aria-live="polite"
                        className="w-full min-h-[100px] p-6 bg-blue-50/50 border-2 border-blue-100 rounded-2xl font-mono text-slate-700 whitespace-pre-wrap break-all overflow-auto"
                      >
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
              <span>{t.tool.relatedTools}</span>
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
            aria-label={t.tool.tryAnother}
          >
            <span>{t.tool.tryAnother}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ToolPage;
