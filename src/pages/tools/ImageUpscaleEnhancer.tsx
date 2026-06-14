import { useState, useCallback } from 'react';
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
  Maximize2,
  Wand2,
  Gauge,
  ScanLine,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Client } from '@gradio/client';
import { addWatermarkToImage } from '../../utils/watermark';
import AIToolSEOContent from '../../components/AIToolSEOContent';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import SocialShare from '../../components/SocialShare';
import { useToolSuccess, useToolFailure } from '../../components/TexlyAI';
import ImageUpscaleEnhancerSEORichContent from '../../components/seo/ImageUpscaleEnhancerSEORichContent';

type Mode = 'upscale' | 'enhance';

const EXAMPLES = [
  {
    id: 1,
    label: 'Old Family Photo',
    tag: '4x Sharper',
    tagColor: 'bg-blue-500',
    beforeUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=40',
    afterUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=90',
    desc: 'Restore detail lost in old, low-res scans',
  },
  {
    id: 2,
    label: 'Product Shot',
    tag: 'Studio Quality',
    tagColor: 'bg-emerald-500',
    beforeUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=40',
    afterUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90',
    desc: 'Crisp edges & textures, ready for e-commerce',
  },
  {
    id: 3,
    label: 'Portrait Cleanup',
    tag: 'Noise Free',
    tagColor: 'bg-purple-500',
    beforeUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=40',
    afterUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=90',
    desc: 'Removes grain while keeping natural skin texture',
  },
];

const STATS = [
  { value: '4x', label: 'Max Upscale' },
  { value: '< 30s', label: 'Avg Processing' },
  { value: '4K', label: 'Output Ready' },
  { value: '100%', label: 'Free to Use' },
];

const ImageUpscaleEnhancer = () => {
  const [mode, setMode] = useState<Mode>('upscale');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState('Initializing...');
  const [info, setInfo] = useState<string | null>(null);

  const { celebrate } = useToolSuccess('image-upscaler-enhancer');
  const { reportFailure } = useToolFailure('image-upscaler-enhancer');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
      setError(null);
      setResultImage(null);
      setInfo(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleProcess = async () => {
    if (!imageFile) return;

    setLoading(true);
    setError(null);
    setResultImage(null);
    setInfo(null);
    setProgress(10);

    try {
      if (mode === 'upscale') {
        setProgress(20);
        setProgressLabel('Connecting to AI upscaler...');
        const client = await Client.connect('Mahendra0160/Image-Upscaler');
        setProgress(45);
        setProgressLabel('Reconstructing fine detail...');
        const result = await client.predict('/upscale_image', {
          input_image: imageFile,
        });
        setProgress(90);
        setProgressLabel('Finalizing output...');

        const resultData = result.data as any[];
        if (resultData && resultData[0]) {
          const output = resultData[0];
          const finalImageUrl = typeof output === 'string' ? output : (output as any).url;
          if (finalImageUrl) {
            setResultImage(finalImageUrl);
            setInfo(resultData[1] as string);
            setProgress(100);
            setProgressLabel('Done!');
            celebrate();
          } else {
            throw new Error('Could not extract image URL from API response');
          }
        } else {
          throw new Error('Invalid response structure from Image Upscaler API');
        }
      } else {
        setProgress(20);
        setProgressLabel('Connecting to AI enhancer...');
        const client = await Client.connect('Mahendra0160/texly-enhancer');
        setProgress(45);
        setProgressLabel('Removing noise & sharpening...');
        const result = await client.predict('/process', {
          image: imageFile,
        });
        setProgress(90);
        setProgressLabel('Finalizing output...');

        const resultData = result.data as any[];
        if (resultData && resultData[1]) {
          const output = resultData[1];
          const finalImageUrl = typeof output === 'string' ? output : (output as any).url;
          if (finalImageUrl) {
            setResultImage(finalImageUrl);
            setProgress(100);
            setProgressLabel('Done!');
            celebrate();
          } else {
            throw new Error('Could not extract image URL from API response');
          }
        } else {
          throw new Error('Invalid response structure from Image Enhancer API');
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred during processing');
      reportFailure();
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;
    const filename = mode === 'upscale' ? 'texly-upscaled.jpg' : 'texly-enhanced.jpg';
    try {
      const watermarkedBlob = await addWatermarkToImage(resultImage);
      const url = window.URL.createObjectURL(watermarkedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      const link = document.createElement('a');
      link.href = resultImage;
      link.download = filename;
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
    setInfo(null);
  };

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    reset();
  };

  const isUpscale = mode === 'upscale';
  const accent = isUpscale ? 'amber' : 'cyan';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white pt-28 pb-20 transition-colors duration-300">
      <Helmet>
        <title>AI Image Upscaler &amp; Enhancer Online — Upscale &amp; Fix Photos Free | Texly</title>
        <meta
          name="description"
          content="Free AI Image Upscaler &amp; Enhancer in one tool. Increase resolution up to 4x and fix blurry, noisy, low-quality photos instantly. No login, no watermark on raw result."
        />
        <meta
          name="keywords"
          content="ai image upscaler and enhancer, upscale and enhance photo online free, increase image resolution ai, fix blurry photo online, photo quality booster, texly ai"
        />
        <link rel="canonical" href="https://www.texlyonline.in/tools/image-upscaler-enhancer" />
        <meta property="og:title" content="AI Image Upscaler & Enhancer Online — Upscale & Fix Photos Free | Texly" />
        <meta
          property="og:description"
          content="One tool, two superpowers: upscale resolution up to 4x or enhance clarity, noise, and sharpness — all powered by AI, completely free."
        />
        <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.texlyonline.in/tools/image-upscaler-enhancer" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'AI Image Upscaler & Enhancer',
            description:
              'Free AI tool combining image upscaling (up to 4x resolution) and image enhancement (denoise, sharpen, clarity boost) in one interface.',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          })}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4">
        {/* ── Hero Header ──────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Wand2 className="w-3.5 h-3.5" />
            2-in-1 AI Tool · Cloud GPU · 100% Free
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight leading-none">
            AI Image{' '}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-cyan-400 bg-clip-text text-transparent">
              Upscaler &amp; Enhancer
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            One tool, two superpowers. <strong className="text-slate-700 dark:text-slate-200">Upscale</strong> low-res
            photos up to 4x, or <strong className="text-slate-700 dark:text-slate-200">Enhance</strong> blurry, noisy
            images for instant clarity — pick a mode and let our AI do the rest.
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

        {/* ── Mode Switcher ────────────────────────────────────────────── */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm gap-1">
            <button
              onClick={() => switchMode('upscale')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
                isUpscale
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Maximize2 className="w-4 h-4" />
              Upscale Resolution
            </button>
            <button
              onClick={() => switchMode('enhance')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
                !isUpscale
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ScanLine className="w-4 h-4" />
              Enhance Quality
            </button>
          </div>
        </div>

        {/* ── Example Gallery ───────────────────────────────────────────── */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
              Real Results — hover to compare
            </h2>
            <span className="text-xs text-slate-500">Before → After</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {EXAMPLES.map((ex) => (
              <div
                key={ex.id}
                className="group relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={ex.beforeUrl}
                    alt={`Before ${ex.label}`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <img
                    src={ex.afterUrl}
                    alt={`After ${ex.label}`}
                    className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-white text-xs font-bold">
                      <span className="text-slate-300">Before</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="text-amber-400">After</span>
                    </div>
                  </div>
                  <div
                    className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase tracking-wider ${ex.tagColor}`}
                  >
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
          {['Pick Upscale or Enhance', 'Upload Your Photo', 'Click Process', 'Download Result'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full border text-xs font-black flex items-center justify-center ${
                    isUpscale
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-500'
                  }`}
                >
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
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                  <span
                    className={`w-5 h-5 rounded-full text-white text-[10px] flex items-center justify-center font-black ${
                      isUpscale ? 'bg-amber-500' : 'bg-cyan-500'
                    }`}
                  >
                    1
                  </span>
                  {isUpscale ? 'Image to Upscale' : 'Image to Enhance'}
                </label>
                {image && (
                  <button onClick={reset} className="text-slate-400 hover:text-red-400 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div
                {...getRootProps()}
                className={`aspect-[4/3] rounded-2xl border-2 border-dashed transition-all cursor-pointer overflow-hidden relative group ${
                  image
                    ? isUpscale
                      ? 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                    : isDragActive
                    ? isUpscale
                      ? 'border-amber-500 bg-amber-500/5'
                      : 'border-cyan-500 bg-cyan-500/5'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/50'
                }`}
              >
                <input {...getInputProps()} />
                {image ? (
                  <>
                    <img src={image} alt="Source" className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Change photo</span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${
                        isDragActive
                          ? isUpscale
                            ? 'bg-amber-500/20'
                            : 'bg-cyan-500/20'
                          : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    >
                      <Upload
                        className={`w-7 h-7 ${
                          isDragActive
                            ? isUpscale
                              ? 'text-amber-500'
                              : 'text-cyan-500'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}
                      />
                    </div>
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mb-1">Drop image here</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">or click to browse · JPG, PNG · Max 10MB</p>
                  </div>
                )}
              </div>
            </div>

            {/* Mode-specific info card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  isUpscale ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-cyan-100 dark:bg-cyan-900/30'
                }`}
              >
                {isUpscale ? (
                  <Maximize2 className="w-5 h-5 text-amber-500" />
                ) : (
                  <ScanLine className="w-5 h-5 text-cyan-500" />
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  {isUpscale ? 'Resolution Boost (Super-Resolution AI)' : 'Clarity Boost (Denoise + Sharpen AI)'}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                  {isUpscale
                    ? 'Best for small, pixelated, or low-resolution images you want to enlarge without losing detail.'
                    : 'Best for blurry, grainy, or compressed photos that need sharper edges and cleaner texture.'}
                </p>
              </div>
            </div>

            {/* Tips */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  icon: <Zap className="w-4 h-4 text-amber-500" />,
                  tip: isUpscale ? 'Sharp source = sharper output' : 'Works great on noisy phone photos',
                  bg: 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/20',
                },
                {
                  icon: <Star className="w-4 h-4 text-violet-500" />,
                  tip: isUpscale ? 'Great for prints & large displays' : 'Removes JPEG artifacts & grain',
                  bg: 'bg-violet-50 dark:bg-violet-900/10 border-violet-100 dark:border-violet-900/20',
                },
                {
                  icon: <Shield className="w-4 h-4 text-emerald-500" />,
                  tip: 'Images never stored on servers',
                  bg: 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/20',
                },
              ].map((t, i) => (
                <div key={i} className={`p-3 rounded-xl border text-center ${t.bg}`}>
                  <div className="flex justify-center mb-2">{t.icon}</div>
                  <p className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 leading-tight">{t.tip}</p>
                </div>
              ))}
            </div>

            {/* Generate Button */}
            <button
              onClick={handleProcess}
              disabled={!imageFile || loading}
              className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-200 ${
                !imageFile || loading
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                  : isUpscale
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white shadow-xl shadow-amber-500/25 active:scale-[0.98]'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-xl shadow-cyan-500/25 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  {progressLabel}
                </>
              ) : (
                <>
                  {isUpscale ? <Maximize2 className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
                  {isUpscale ? 'Upscale Image Now' : 'Enhance Image Now'}
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
                      isUpscale ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                    }`}
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
                  <button onClick={reset} className="mt-2 text-xs font-bold underline">
                    Try again
                  </button>
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
                  <div
                    className={`w-2 h-2 rounded-full ${
                      resultImage ? 'bg-emerald-400 animate-pulse' : loading ? 'bg-amber-400 animate-pulse' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  />
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
                  <BeforeAfterSlider beforeImage={image || ''} afterImage={resultImage} className="w-full h-full" />
                ) : loading ? (
                  <div className="flex flex-col items-center gap-6 p-10 text-center">
                    <div className="relative">
                      <div
                        className={`w-24 h-24 border-[3px] rounded-full animate-spin ${
                          isUpscale ? 'border-amber-500/20 border-t-amber-500' : 'border-cyan-500/20 border-t-cyan-500'
                        }`}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {isUpscale ? (
                          <Maximize2 className="w-8 h-8 text-amber-500 animate-pulse" />
                        ) : (
                          <Sparkles className="w-8 h-8 text-cyan-500 animate-pulse" />
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-black text-xl mb-1">AI is working</p>
                      <p className="text-slate-400 text-sm">{progressLabel}</p>
                    </div>
                    <div className="w-56 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isUpscale ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-cyan-500 to-blue-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-12">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div
                        className={`absolute inset-0 rounded-2xl animate-pulse ${
                          isUpscale ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20' : 'bg-gradient-to-br from-cyan-500/20 to-blue-500/20'
                        }`}
                      />
                      <div className="w-full h-full rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                        {isUpscale ? (
                          <Maximize2 className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                        ) : (
                          <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                        )}
                      </div>
                    </div>
                    <h3 className="text-lg font-black text-slate-400 dark:text-slate-500 mb-2">
                      {isUpscale ? 'Upscaled Preview' : 'Enhanced Preview'}
                    </h3>
                    <p className="text-sm text-slate-400 dark:text-slate-600 max-w-[220px] mx-auto leading-relaxed">
                      Upload your photo and click "{isUpscale ? 'Upscale Image Now' : 'Enhance Image Now'}" to see the
                      result here with an interactive slider.
                    </p>
                  </div>
                )}
              </div>

              {/* Result actions */}
              {resultImage && (
                <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  {info && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-[11px] text-slate-500 font-mono border border-slate-100 dark:border-slate-800">
                      {info}
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleDownload}
                      className={`py-3.5 text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                        isUpscale
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 shadow-amber-500/20'
                          : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-cyan-500/20'
                      }`}
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
                      url="https://www.texlyonline.in/tools/image-upscaler-enhancer"
                      title={
                        isUpscale
                          ? "I just upscaled my photo's resolution using Texly's Free AI Image Upscaler & Enhancer! ⚡"
                          : "I just enhanced my photo's quality using Texly's Free AI Image Upscaler & Enhancer! ⚡"
                      }
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Slider hint */}
            {resultImage && (
              <p className="text-center text-[11px] text-slate-400 mt-3">← Drag the slider to compare before &amp; after →</p>
            )}

            {/* Switch mode suggestion */}
            {resultImage && (
              <button
                onClick={() => switchMode(isUpscale ? 'enhance' : 'upscale')}
                className="mt-4 w-full p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-left hover:border-slate-400 dark:hover:border-slate-600 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      !isUpscale ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-cyan-100 dark:bg-cyan-900/30'
                    }`}
                  >
                    {!isUpscale ? <Maximize2 className="w-4 h-4 text-amber-500" /> : <ScanLine className="w-4 h-4 text-cyan-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                      {!isUpscale ? 'Now try Upscaling this result' : 'Now try Enhancing this result'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {!isUpscale ? 'Increase resolution up to 4x' : 'Sharpen, denoise & boost clarity'}
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            )}
          </div>
        </div>

        {/* ── Why use both ────────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Maximize2 className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-black text-lg mb-2">When to use Upscale</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose Upscale when your image is too small — for printing, large displays, or e-commerce listings.
              Our AI adds plausible new pixels using super-resolution, increasing dimensions up to 4x while keeping
              edges, faces, and textures looking natural.
            </p>
          </div>
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
            <div className="w-11 h-11 rounded-2xl bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4">
              <ScanLine className="w-5 h-5 text-cyan-500" />
            </div>
            <h3 className="font-black text-lg mb-2">When to use Enhance</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Choose Enhance when your photo is already the right size but looks soft, grainy, or compressed. Our AI
              removes noise, sharpens fine detail, and corrects JPEG artifacts — perfect before posting on social
              media or printing at the current size.
            </p>
          </div>
        </div>

        {/* ── Gauge strip ─────────────────────────────────────────────── */}
        <div className="mt-6 p-5 rounded-2xl bg-slate-100 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 justify-center">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-500">Tip:</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            For the cleanest result on very low quality photos, run <strong>Enhance</strong> first to remove noise,
            then switch to <strong>Upscale</strong> to increase the resolution of the cleaned image.
          </p>
        </div>

        {/* SEO Sections */}
        <div className="mt-24">
          <ImageUpscaleEnhancerSEORichContent />
          <AIToolSEOContent toolId="image-upscaler-enhancer" />
        </div>
      </div>
    </div>
  );
};

export default ImageUpscaleEnhancer;
