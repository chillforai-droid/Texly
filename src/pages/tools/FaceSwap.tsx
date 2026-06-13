import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  UserCircle2,
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
  Play
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Client } from "@gradio/client";
import { addWatermarkToImage } from '../../utils/watermark';
import AIToolSEOContent from '../../components/AIToolSEOContent';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import SocialShare from '../../components/SocialShare';
import { useToolSuccess, useToolFailure } from '../../components/TexlyAI';
import FaceSwapSEORichContent from '../../components/seo/FaceSwapSEORichContent';

// ── Example GIF data ────────────────────────────────────────────────────────
// Using Picsum placeholder images to simulate before/after examples
const EXAMPLES = [
  {
    id: 1,
    label: 'Portrait Swap',
    tag: 'Most Popular',
    tagColor: 'bg-blue-500',
    gifUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    desc: 'Swap faces between two portraits seamlessly',
  },
  {
    id: 2,
    label: 'Group Photo',
    tag: 'New',
    tagColor: 'bg-emerald-500',
    gifUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
    desc: 'Works perfectly with group & family photos',
  },
  {
    id: 3,
    label: 'Celebrity Style',
    tag: 'Trending',
    tagColor: 'bg-purple-500',
    gifUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    beforeUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
    afterUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&q=80',
    desc: 'See yourself in any style or look',
  },
];

const STATS = [
  { value: '2M+', label: 'Faces Swapped' },
  { value: '< 10s', label: 'Processing Time' },
  { value: '4K', label: 'Max Resolution' },
  { value: '100%', label: 'Free to Use' },
];

const FaceSwap = () => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [targetImage, setTargetImage] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [targetFile, setTargetFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeExample, setActiveExample] = useState<number | null>(null);
  const [progressLabel, setProgressLabel] = useState('Initializing...');
  const { celebrate } = useToolSuccess('face-swap');
  const { reportFailure } = useToolFailure('face-swap');

  const onDropSource = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { setError('File size must be less than 10MB'); return; }
      setSourceFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setSourceImage(e.target?.result as string);
      reader.readAsDataURL(file);
      setError(null);
    }
  }, []);

  const onDropTarget = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { setError('File size must be less than 10MB'); return; }
      setTargetFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setTargetImage(e.target?.result as string);
      reader.readAsDataURL(file);
      setError(null);
    }
  }, []);

  const { getRootProps: getSourceProps, getInputProps: getSourceInput, isDragActive: isSourceDrag } = useDropzone({ onDrop: onDropSource, accept: { 'image/*': [] }, multiple: false });
  const { getRootProps: getTargetProps, getInputProps: getTargetInput, isDragActive: isTargetDrag } = useDropzone({ onDrop: onDropTarget, accept: { 'image/*': [] }, multiple: false });

  const handleSwap = async () => {
    if (!sourceFile || !targetFile) return;
    setLoading(true); setError(null); setResultImage(null); setProgress(10);
    setProgressLabel('Connecting to AI server...');
    try {
      setProgress(25); setProgressLabel('Analyzing faces...');
      const client = await Client.connect("Mahendra0160/TextlyOnline");
      setProgress(50); setProgressLabel('Swapping faces with AI...');
      const result = await client.predict("/swap_faces", [sourceFile, targetFile]);
      setProgress(85); setProgressLabel('Enhancing result quality...');
      const resultData = result.data as any;
      if (resultData && resultData[0]) {
        const output = resultData[0];
        const finalImageUrl = typeof output === 'string' ? output : (output as any).url;
        if (finalImageUrl) {
          setResultImage(finalImageUrl); setProgress(100); setProgressLabel('Done!');
          celebrate();
        } else throw new Error("Could not extract image URL from API response");
      } else throw new Error("Invalid response from Face Swap API");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred"); reportFailure();
    } finally { setLoading(false); }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    try {
      const watermarkedBlob = await addWatermarkToImage(resultImage);
      const url = window.URL.createObjectURL(watermarkedBlob);
      const link = document.createElement('a');
      link.href = url; link.download = 'texly-face-swap.jpg';
      document.body.appendChild(link); link.click();
      document.body.removeChild(link); window.URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement('a');
      link.href = resultImage; link.download = 'texly-face-swap.jpg';
      link.target = '_blank'; link.click();
    }
  };

  const reset = () => {
    setSourceImage(null); setTargetImage(null);
    setSourceFile(null); setTargetFile(null);
    setResultImage(null); setError(null); setProgress(0); setActiveExample(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white pt-28 pb-20 transition-colors duration-300">
      <Helmet>
        <title>AI Face Swap Online — Free Face Swapper Tool | Texly</title>
        <meta name="description" content="Professional AI Face Swap tool. Swap faces between two images instantly using our advanced cloud-based AI. 100% free, high quality, and fast processing." />
        <meta name="keywords" content="ai face swap, face swapper online, free face swap, swap faces in photos, deepfake photo tool, texly ai" />
        <link rel="canonical" href="https://www.texlyonline.in/tools/face-swap" />
        <meta property="og:title" content="AI Face Swap Online — Free Face Swapper Tool | Texly" />
        <meta property="og:description" content="Swap faces between two images instantly using advanced AI. Professional results in seconds." />
        <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.texlyonline.in/tools/face-swap" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication", "name": "AI Face Swap", "description": "Professional AI Face Swap tool for swapping faces between two images instantly.", "applicationCategory": "MultimediaApplication", "operatingSystem": "All", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" } })}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">

        {/* ── Hero Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Cloud GPU · Instant Results · 100% Free
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight leading-none">
            AI <span className="bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">Face Swap</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
            Upload two photos — our AI seamlessly transplants any face in under 10 seconds. No watermarks on raw result. No signup.
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

        {/* ── Example Gallery ───────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">Live Examples — hover to see the swap</h2>
            <span className="text-xs text-slate-500">Click to load as input</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.id}
                onClick={() => setActiveExample(ex.id === activeExample ? null : ex.id)}
                className={`group relative rounded-3xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
                  activeExample === ex.id
                    ? 'border-violet-500 shadow-[0_0_30px_rgba(139,92,246,0.25)]'
                    : 'border-slate-200 dark:border-slate-800 hover:border-violet-500/50'
                }`}
              >
                {/* Animated before/after on hover */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Before */}
                  <img
                    src={ex.beforeUrl}
                    alt={`Before ${ex.label}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  {/* After */}
                  <img
                    src={ex.afterUrl}
                    alt={`After ${ex.label}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  {/* Hover play icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white fill-white" />
                    </div>
                  </div>
                  {/* Hover label */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                      <span className="text-slate-300">Before</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-violet-400">After</span>
                    </div>
                  </div>
                  {/* Tag */}
                  <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider ${ex.tagColor}`}>
                    {ex.tag}
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-900/80">
                  <div className="font-bold text-slate-900 dark:text-white text-sm mb-1">{ex.label}</div>
                  <div className="text-xs text-slate-500">{ex.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── How-to Steps ────────────────────────────────────────────── */}
        <div className="flex items-center justify-center gap-4 mb-14 flex-wrap">
          {['Upload Source Face', 'Upload Target Photo', 'Click Generate', 'Download Result'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-500 text-xs font-black flex items-center justify-center">
                  {i + 1}
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{step}</span>
              </div>
              {i < 3 && <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden sm:block" />}
            </div>
          ))}
        </div>

        {/* ── Main Tool Interface ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* LEFT: Upload Panel */}
          <div className="space-y-6">

            {/* Upload cards */}
            <div className="grid grid-cols-2 gap-5">
              {/* Source Face */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center font-black">1</span>
                    Source Face
                  </label>
                  {sourceImage && (
                    <button onClick={() => { setSourceImage(null); setSourceFile(null); }} className="text-slate-400 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div
                  {...getSourceProps()}
                  className={`aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative group ${
                    sourceImage
                      ? 'border-violet-500/60 shadow-[0_0_20px_rgba(139,92,246,0.15)]'
                      : isSourceDrag
                      ? 'border-violet-500 bg-violet-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-violet-500/50 bg-white dark:bg-slate-900/50'
                  }`}
                >
                  <input {...getSourceInput()} />
                  {sourceImage ? (
                    <>
                      <img src={sourceImage} alt="Source" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Change photo</span>
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-violet-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">Face ✓</div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${isSourceDrag ? 'bg-violet-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <UserCircle2 className={`w-7 h-7 ${isSourceDrag ? 'text-violet-500' : 'text-slate-400 dark:text-slate-500'}`} />
                      </div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-0.5">Drop face photo</p>
                      <p className="text-[10px] text-slate-400">JPG, PNG · Max 10MB</p>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 text-center">The face that will be placed</p>
              </div>

              {/* Target Image */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-black">2</span>
                    Target Photo
                  </label>
                  {targetImage && (
                    <button onClick={() => { setTargetImage(null); setTargetFile(null); }} className="text-slate-400 hover:text-red-400 transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div
                  {...getTargetProps()}
                  className={`aspect-square rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative group ${
                    targetImage
                      ? 'border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                      : isTargetDrag
                      ? 'border-blue-500 bg-blue-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-blue-500/50 bg-white dark:bg-slate-900/50'
                  }`}
                >
                  <input {...getTargetInput()} />
                  {targetImage ? (
                    <>
                      <img src={targetImage} alt="Target" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-xs font-bold">Change photo</span>
                      </div>
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-blue-500 text-white text-[9px] font-black rounded-full uppercase tracking-wider">Target ✓</div>
                    </>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${isTargetDrag ? 'bg-blue-500/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                        <Upload className={`w-7 h-7 ${isTargetDrag ? 'text-blue-500' : 'text-slate-400 dark:text-slate-500'}`} />
                      </div>
                      <p className="text-xs font-bold text-slate-600 dark:text-slate-300 mb-0.5">Drop target photo</p>
                      <p className="text-[10px] text-slate-400">The body to receive the face</p>
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 text-center">The photo to place the face onto</p>
              </div>
            </div>

            {/* Reference diagram */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <UserCircle2 className="w-5 h-5 text-violet-500" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-blue-500" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">Source face → placed onto → Target photo</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Best results: clear frontal face, good lighting, similar angle</p>
              </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Zap className="w-4 h-4 text-amber-500" />, tip: 'Clear frontal face works best', bg: 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20' },
                { icon: <Star className="w-4 h-4 text-violet-500" />, tip: 'Good lighting = better result', bg: 'bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/20' },
                { icon: <Shield className="w-4 h-4 text-emerald-500" />, tip: 'Images never stored on servers', bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20' },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center ${t.bg}`}>
                  <div className="flex justify-center mb-2">{t.icon}</div>
                  <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">{t.tip}</p>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleSwap}
              disabled={!sourceFile || !targetFile || loading}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                !sourceFile || !targetFile || loading
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white shadow-xl shadow-violet-500/25 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {progressLabel}
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Swap Faces Now
                  <ArrowRight className="w-5 h-5 ml-1" />
                </>
              )}
            </button>

            {/* Progress bar */}
            {loading && (
              <div className="space-y-2">
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-[10px] text-center text-slate-400">{progress}% complete — AI processing on cloud GPU</p>
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

          {/* RIGHT: Result Panel */}
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
                    <CheckCircle2 className="w-3 h-3" /> AI Success
                  </span>
                )}
              </div>

              {/* Result area */}
              <div className="aspect-[4/5] relative flex items-center justify-center">
                {resultImage ? (
                  <BeforeAfterSlider
                    beforeImage={targetImage || ''}
                    afterImage={resultImage}
                    className="w-full h-full"
                  />
                ) : loading ? (
                  <div className="flex flex-col items-center gap-6 p-10 text-center">
                    <div className="relative">
                      <div className="w-24 h-24 border-[3px] border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-violet-500 animate-pulse" />
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-xl mb-1">AI is working</p>
                      <p className="text-slate-400 text-sm">{progressLabel}</p>
                    </div>
                    <div className="w-56 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12">
                    {/* Animated placeholder showing before/after concept */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 animate-pulse" />
                      <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                        <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-400 dark:text-slate-500 mb-2">Before / After Preview</h3>
                    <p className="text-sm text-slate-400 dark:text-slate-600 max-w-[200px] mx-auto leading-relaxed">
                      Upload both photos and click "Swap Faces Now" to see the result here with an interactive slider.
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
                      className="py-3.5 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-500/20"
                    >
                      <Download className="w-4 h-4" />
                      Download
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
                      url="https://www.texlyonline.in/tools/face-swap"
                      title="I just swapped faces using Texly's Free AI Face Swap! ⚡"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slider hint */}
            {resultImage && (
              <p className="text-center text-[11px] text-slate-400 mt-3">
                ← Drag the slider to compare before & after →
              </p>
            )}
          </div>
        </div>

        {/* SEO Sections */}
        <div className="mt-24">
          <FaceSwapSEORichContent />
          <AIToolSEOContent toolId="face-swap" />
        </div>
      </div>
    </div>
  );
};

export default FaceSwap;
