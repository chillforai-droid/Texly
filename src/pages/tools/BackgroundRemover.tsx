import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ImageIcon,
  X,
  ArrowRight,
  Zap,
  Shield,
  Star,
  ChevronRight,
  Scissors,
  Play,
  Layers,
  Shirt,
  ShoppingBag,
  User,
  Clock,
  Zap as ZapIcon,
  Crown,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Client } from '@gradio/client';
import { addWatermarkToImage } from '../../utils/watermark';
import AIToolSEOContent from '../../components/AIToolSEOContent';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import SocialShare from '../../components/SocialShare';
import { useToolSuccess, useToolFailure } from '../../components/TexlyAI';
import BackgroundRemoverSEORichContent from '../../components/seo/BackgroundRemoverSEORichContent';
import RatingSystem from '../../components/RatingSystem';
import CommentSection from '../../components/CommentSection';
const EXAMPLES = [
  {
    id: 1,
    label: 'Product Photo',
    tag: 'Most Popular',
    tagColor: 'bg-blue-500',
    beforeUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    desc: 'Clean product shots for e-commerce listings',
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 2,
    label: 'Portrait / Headshot',
    tag: 'Trending',
    tagColor: 'bg-emerald-500',
    beforeUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    desc: 'Professional headshots with transparent background',
    icon: <User className="w-4 h-4" />,
  },
  {
    id: 3,
    label: 'Fashion & Apparel',
    tag: 'New',
    tagColor: 'bg-purple-500',
    beforeUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80',
    desc: 'Remove backgrounds from clothing and apparel',
    icon: <Shirt className="w-4 h-4" />,
  },
];

const STATS = [
  { value: '5M+', label: 'Backgrounds Removed' },
  { value: '< 5s', label: 'Fast Mode Speed' },
  { value: 'PNG', label: 'Transparent Output' },
  { value: '100%', label: 'Free to Use' },
];

const USE_CASES = [
  { icon: <ShoppingBag className="w-5 h-5 text-blue-500" />, title: 'E-commerce', desc: 'White/transparent product shots that convert', bg: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20' },
  { icon: <User className="w-5 h-5 text-emerald-500" />, title: 'Profile Photos', desc: 'LinkedIn, resume & ID headshots instantly', bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' },
  { icon: <Layers className="w-5 h-5 text-violet-500" />, title: 'Graphic Design', desc: 'Cut out subjects for posters & thumbnails', bg: 'bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/20' },
];

type Mode = 'fast' | 'hd';

const BackgroundRemover = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Initializing...');
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [mode, setMode] = useState<Mode>('fast');
  const { celebrate } = useToolSuccess('bg-remover');
  const { reportFailure } = useToolFailure('bg-remover');

  // Fast Mode Rate Limit (5 images per 24 hours)
  const [requestsHistory, setRequestsHistory] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('texly_bg_remover_fast_requests');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
          return parsed.filter((t: number) => t > dayAgo);
        }
      }
    } catch (e) {
      console.warn("Failed to parse request history", e);
    }
    return [];
  });

  const remainingFastRequests = Math.max(0, 5 - requestsHistory.length);
  const isFastModeLimited = mode === 'fast' && remainingFastRequests === 0;

  // Save request to history (only for fast mode)
  const saveRequestToHistory = useCallback(() => {
    const now = Date.now();
    const dayAgo = now - 24 * 60 * 60 * 1000;
    const freshHistory = requestsHistory.filter(t => t > dayAgo);
    const updated = [...freshHistory, now];
    setRequestsHistory(updated);
    localStorage.setItem('texly_bg_remover_fast_requests', JSON.stringify(updated));
  }, [requestsHistory]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { setError('File size must be less than 10MB'); return; }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => { setImage(e.target?.result as string); setResultImage(null); setError(null); };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  // Fast Mode: remove.bg API
  const removeBackgroundFast = async (file: File): Promise<string> => {
    setProgress(20); setProgressLabel('Connecting to remove.bg API...');
    
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': import.meta.env.VITE_REMOVEBG_API_KEY || '',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (response.status === 402 || response.status === 401) {
        throw new Error('API key invalid or quota exceeded. Please use HD mode instead.');
      }
      throw new Error(`remove.bg API error: ${response.status}`);
    }

    setProgress(80); setProgressLabel('Processing image...');
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  };

  // HD Mode: Gradio (slower but high quality)
  const removeBackgroundHD = async (file: File): Promise<string> => {
    setProgress(10); setProgressLabel('Connecting to AI server...');
    
    const client = await Client.connect('Mahendra0160/RemoveBg');
    setProgress(40); setProgressLabel('Segmenting subject with AI...');
    const result = await client.predict('/remove_background', { image: file });
    setProgress(80); setProgressLabel('Generating transparent PNG...');
    
    const resultData = result.data as any;
    if (resultData && resultData[0]) {
      const output = resultData[0];
      const finalImageUrl = typeof output === 'string' ? output : (output as any).url;
      if (finalImageUrl) {
        return finalImageUrl;
      }
      throw new Error('Could not extract image URL from API response');
    }
    throw new Error('Invalid response from Background Remover API');
  };

  const handleRemoveBackground = async () => {
    if (!imageFile) return;
    
    // Check rate limit for fast mode
    if (mode === 'fast' && remainingFastRequests === 0) {
      setError(`Fast mode limit reached! You have used all 5 free requests for today. Please use HD mode (unlimited) or try again tomorrow.`);
      return;
    }

    setLoading(true);
    setError(null);
    setResultImage(null);
    setProgress(5);

    try {
      let resultUrl: string;
      
      if (mode === 'fast') {
        setProgressLabel('Fast mode: remove.bg API...');
        resultUrl = await removeBackgroundFast(imageFile);
        saveRequestToHistory(); // Deduct one request
      } else {
        setProgressLabel('HD mode: AI segmentation (may take longer)...');
        resultUrl = await removeBackgroundHD(imageFile);
      }
      
      setProgress(100);
      setProgressLabel('Done!');
      setResultImage(resultUrl);
      celebrate();
    } catch (err: any) {
      console.error('Background removal error:', err);
      setError(err.message || 'An unexpected error occurred');
      reportFailure();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    try {
      const watermarkedBlob = await addWatermarkToImage(resultImage);
      const url = window.URL.createObjectURL(watermarkedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `texly-bg-removed-${mode}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = `texly-bg-removed-${mode}.png`;
      link.target = '_blank';
      link.click();
    }
  };

  const reset = () => {
    setImage(null);
    setImageFile(null);
    setResultImage(null);
    setError(null);
    setProgress(0);
    setActiveExample(null);
  };

  // Get remaining time text for fast mode
  const getResetTimeText = () => {
    if (requestsHistory.length === 0) return null;
    const oldestRequest = Math.min(...requestsHistory);
    const resetTime = new Date(oldestRequest + 24 * 60 * 60 * 1000);
    const hoursLeft = Math.ceil((resetTime.getTime() - Date.now()) / (1000 * 60 * 60));
    if (hoursLeft > 0) {
      return `Reset in ${hoursLeft} hour${hoursLeft !== 1 ? 's' : ''}`;
    }
    return null;
  };

  const resetTimeText = getResetTimeText();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white pt-28 pb-20 transition-colors duration-300">
      <Helmet>
        <title>Free AI Background Remover Online — Transparent PNG Instantly | Texly</title>
        <meta name="description" content="Remove backgrounds from any image in seconds with AI. Get high-quality transparent PNGs for free — perfect for e-commerce, portraits, and design. No signup required." />
        <meta name="keywords" content="remove background online free, ai background remover, transparent png maker, bg remover, remove bg, background eraser, texly ai" />
        <link rel="canonical" href="https://www.texlyonline.in/tools/bg-remover" />
        <meta property="og:title" content="Free AI Background Remover Online — Transparent PNG | Texly" />
        <meta property="og:description" content="Remove backgrounds from any image in seconds with AI. 100% free, high precision transparent PNG output." />
        <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.texlyonline.in/tools/bg-remover" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "AI Background Remover", "description": "Remove backgrounds from any image instantly with AI. Get transparent PNG output for free.", "applicationCategory": "MultimediaApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } })}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Hero Header ─────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Cloud AI · Transparent PNG · 100% Free
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight leading-none">
            AI <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Background</span> Remover
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Upload any photo — our AI precisely cuts out the subject and delivers a clean transparent PNG. Choose between Fast or HD mode.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-widest mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mode Selector ──────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('fast')}
                className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all ${
                  mode === 'fast'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <ZapIcon className="w-4 h-4" />
                ⚡ Fast Mode
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${mode === 'fast' ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}>
                  &lt;5 sec
                </span>
              </button>
              <button
                onClick={() => setMode('hd')}
                className={`flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-sm transition-all ${
                  mode === 'hd'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <Crown className="w-4 h-4" />
                🎨 HD Mode
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${mode === 'hd' ? 'bg-white/20' : 'bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400'}`}>
                  Better Quality
                </span>
              </button>
            </div>
          </div>

          {/* Mode description */}
          <div className="text-center mt-3">
            {mode === 'fast' ? (
              <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                ⚡ Lightning fast results using remove.bg API
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  remainingFastRequests > 0 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                }`}>
                  {remainingFastRequests} / 5 remaining today
                </span>
                {resetTimeText && (
                  <span className="text-[10px] text-slate-400">({resetTimeText})</span>
                )}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                <Crown className="w-3.5 h-3.5 text-violet-500" />
                🎨 Premium quality with AI segmentation — Unlimited uses, no daily limit
              </div>
            )}
          </div>
        </div>

        {/* ── Example Gallery ── (same as before) ──────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Use Case Examples — hover to preview</h2>
            <span className="text-xs text-slate-500">Works on any subject</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.id}
                onClick={() => setActiveExample(ex.id === activeExample ? null : ex.id)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                  activeExample === ex.id
                    ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ex.beforeUrl}
                    alt={`${ex.label} original`}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'repeating-conic-gradient(#e2e8f0 0% 25%, #fff 0% 50%) 0 0 / 16px 16px' }} />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                      <span className="text-slate-300">Original</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-blue-400">Transparent PNG</span>
                    </div>
                  </div>
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider ${ex.tagColor}`}>
                    {ex.tag}
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/80">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm mb-1">
                    {ex.icon}
                    {ex.label}
                  </div>
                  <div className="text-xs text-slate-500">{ex.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How-to Steps ─────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 mb-14 flex-wrap">
          {['Upload Your Image', 'Choose Mode', 'AI Detects Subject', 'Download PNG'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-500 text-xs font-black flex items-center justify-center">
                  {i + 1}
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{step}</span>
              </div>
              {i < 3 && <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* ── Main Tool Interface ── (updated) ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: Upload Panel */}
          <div className="space-y-6">

            {/* Dropzone */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-black">1</span>
                  Upload Image
                </label>
                {image && (
                  <button onClick={reset} className="text-slate-400 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div
                {...getRootProps()}
                className={`aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative group ${
                  image
                    ? 'border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                    : isDragActive
                    ? 'border-blue-500 bg-blue-500/5'
                    : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50 bg-white dark:bg-slate-900/50'
                }`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <>
                    <img src={image} alt="Original" className="w-full h-full object-contain bg-slate-100 dark:bg-slate-900" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold bg-black/50 px-3 py-1.5 rounded-full">Change photo</span>
                    </div>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">Uploaded ✓</div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${isDragActive ? 'bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`} />
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">
                      {isDragActive ? 'Drop it here!' : 'Drag & drop or click to upload'}
                    </p>
                    <p className="text-xs text-slate-400">JPG, PNG, WEBP · Max 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Use Case tiles */}
            <div className="grid grid-cols-3 gap-3">
              {USE_CASES.map((uc, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center ${uc.bg}`}>
                  <div className="flex justify-center mb-2">{uc.icon}</div>
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 leading-tight mb-0.5">{uc.title}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{uc.desc}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: mode === 'fast' ? <Zap className="w-4 h-4 text-amber-500" /> : <Clock className="w-4 h-4 text-violet-500" />, tip: mode === 'fast' ? 'Under 5 seconds processing' : 'HD quality output', bg: mode === 'fast' ? 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20' : 'bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/20' },
                { icon: <Star className="w-4 h-4 text-blue-500" />, tip: 'Hair & fine edge precision', bg: 'bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20' },
                { icon: <Shield className="w-4 h-4 text-emerald-500" />, tip: 'Images never stored on servers', bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center ${t.bg}`}>
                  <div className="flex justify-center mb-2">{t.icon}</div>
                  <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">{t.tip}</p>
                </div>
              ))}
            </div>

            {/* Remove Background Button */}
            <button
              onClick={handleRemoveBackground}
              disabled={!image || loading || (mode === 'fast' && remainingFastRequests === 0)}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                !image || loading || isFastModeLimited
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : mode === 'fast'
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-xl shadow-blue-500/25 active:scale-[0.98]'
                    : 'bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white shadow-xl shadow-violet-500/25 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {progressLabel}
                </>
              ) : isFastModeLimited ? (
                <>
                  <Clock className="w-5 h-5" />
                  Fast Mode Limit Reached (5/day)
                </>
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  Remove Background ({mode === 'fast' ? 'Fast' : 'HD'} Mode)
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>

            {/* Progress bar */}
            {loading && (
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      mode === 'fast' 
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                        : 'bg-gradient-to-r from-violet-500 to-purple-400'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-center text-slate-400">{progress}% — {progressLabel}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm mb-1">Processing failed</p>
                  <p className="text-xs opacity-80 leading-relaxed">{error}</p>
                  <button onClick={reset} className="mt-2 text-xs font-bold underline">Try again</button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Result Panel (same as before) */}
          <div className="sticky top-28">
            <div className="rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">

              {/* Result header */}
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${resultImage ? 'bg-emerald-400 animate-pulse' : loading ? 'bg-amber-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'}`} />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    {resultImage ? 'Result Ready' : loading ? 'Processing...' : 'Awaiting Upload'}
                  </span>
                </div>
                {resultImage && (
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Background Removed ({mode === 'fast' ? 'Fast' : 'HD'})
                  </span>
                )}
              </div>

              {/* Result area */}
              <div className="aspect-[4/5] relative flex items-center justify-center"
                style={resultImage ? { backgroundImage: 'repeating-conic-gradient(#e2e8f0 0% 25%, #fff 0% 50%)', backgroundSize: '20px 20px' } : {}}>
                {resultImage ? (
                  <BeforeAfterSlider
                    beforeImage={image || ''}
                    afterImage={resultImage}
                    className="w-full h-full"
                  />
                ) : loading ? (
                  <div className="flex flex-col items-center gap-6 p-10 text-center">
                    <div className="relative">
                      <div className={`w-24 h-24 border-[3px] border-${mode === 'fast' ? 'blue' : 'violet'}-500/20 border-t-${mode === 'fast' ? 'blue' : 'violet'}-500 rounded-full animate-spin`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Scissors className={`w-8 h-8 ${mode === 'fast' ? 'text-blue-500' : 'text-violet-500'} animate-pulse`} />
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-xl mb-1">AI is working</p>
                      <p className="text-slate-400 text-sm">{progressLabel}</p>
                    </div>
                    <div className="w-56 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          mode === 'fast'
                            ? 'bg-gradient-to-r from-blue-500 to-cyan-400'
                            : 'bg-gradient-to-r from-violet-500 to-purple-400'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 animate-pulse" />
                      <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-400 dark:text-slate-500 mb-2">Before / After Preview</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-600 max-w-[200px] mx-auto leading-relaxed">
                      Upload a photo, select mode, and click "Remove Background" to see the transparent PNG result here.
                    </p>
                  </div>
                )}
              </div>

              {/* Result actions */}
              {resultImage && (
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleDownload}
                      className={`py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                        mode === 'fast'
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-500/20'
                          : 'bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white shadow-violet-500/20'
                      }`}
                    >
                      <Download className="w-4 h-4" />
                      Download PNG
                    </button>
                    <button
                      onClick={reset}
                      className="py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Start Over
                    </button>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <SocialShare
                      url="https://www.texlyonline.in/tools/bg-remover"
                      title="I just removed an image background instantly using Texly's Free AI BG Remover! ⚡"
                    />
                  </div>
                </div>
              )}
            </div>

            {resultImage && (
              <p className="text-center text-[11px] text-slate-400 mt-3">
                ← Drag the slider to compare original vs transparent →
              </p>
            )}
          </div>
        </div>

        {/* SEO Sections */}
        <div className="mt-24">
          <BackgroundRemoverSEORichContent />
          <AIToolSEOContent toolId="bg-remover" />
          <RatingSystem toolId="face-swap" theme={{ border: 'slate-200' }} />
          <CommentSection targetId="face-swap" targetType="tool" theme={{ border: 'slate-200' }} />
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
