import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Youtube, RefreshCw } from 'lucide-react';

const CHANNEL_ID  = 'UCwCrRIa28XZ3QI3UOxKaNDw';
const API_KEY     = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const MAX_RESULTS = 12;
const AUTOPLAY_MS = 15000; // 15s per video then auto-next

const FALLBACK_VIDEOS = [
  { id: 'FloTD4tmP48', title: 'Texly Online — Free AI & Text Tools' },
  { id: 'OrW7ZciseE0', title: 'Texly Online — Tutorial' },
  { id: 'UOVbCq1t0oM', title: 'Texly Online — Feature Walkthrough' },
  { id: 'hUr1RXgTw1k', title: 'Texly Online — Demo' },
];

interface VideoItem { id: string; title: string; thumbnail: string; }

const HeroVideoSlider = () => {
  const [videos, setVideos]           = useState<VideoItem[]>([]);
  const [loading, setLoading]         = useState(true);
  const [apiError, setApiError]       = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);

  // Touch/swipe tracking
  const touchStartX = useRef<number>(0);
  const touchEndX   = useRef<number>(0);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Fetch videos ──────────────────────────────────────────────────────
  const fetchVideos = async () => {
    setLoading(true); setApiError(false);
    try {
      const res  = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}&type=video`
      );
      const data = await res.json();
      if (data.error || !data.items?.length) throw new Error();
      setVideos(data.items.map((item: any) => ({
        id        : item.id.videoId,
        title     : item.snippet.title,
        thumbnail : item.snippet.thumbnails?.high?.url || `https://img.youtube.com/vi/${item.id.videoId}/hqdefault.jpg`,
      })));
    } catch {
      setVideos(FALLBACK_VIDEOS.map(v => ({ ...v, thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg` })));
      setApiError(true);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchVideos(); }, []);

  // ── Auto-advance ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || videos.length === 0) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % videos.length);
    }, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, videos.length, activeIndex]);

  const goTo = useCallback((i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveIndex(((i % videos.length) + videos.length) % videos.length);
  }, [videos.length]);

  // ── Swipe handlers ────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) goTo(activeIndex + (diff > 0 ? 1 : -1));
  };

  // ── Loading skeleton ──────────────────────────────────────────────────
  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 mt-10 sm:mt-14">
      <div className="w-full aspect-video rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
        <Youtube className="w-12 h-12 text-slate-300 dark:text-slate-600" />
      </div>
    </div>
  );

  if (videos.length === 0) return null;
  const active = videos[activeIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 sm:mt-14 select-none">

      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Youtube className="w-5 h-5 text-red-500" />
          <span className="text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
            Latest Videos
          </span>
        </div>
        <div className="flex items-center gap-3">
          {apiError && (
            <button onClick={fetchVideos} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          )}
          <span className="text-xs font-bold text-slate-400">
            {activeIndex + 1} / {videos.length}
          </span>
        </div>
      </div>

      {/* Slider wrapper */}
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-300/30 dark:shadow-black/50 bg-black group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* YouTube embed — autoplay, muted so browser allows it */}
        <div className="w-full aspect-video">
          <iframe
            key={active.id}
            src={`https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&loop=0&enablejsapi=0`}
            title={active.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Progress bar (auto-advance timer) */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-10">
          <div
            key={`bar-${activeIndex}-${isPaused}`}
            className={`h-full bg-red-500 ${isPaused ? '' : 'animate-ytprogress'}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>

        {/* Prev button */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous video"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next button */}
        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next video"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Video title */}
      <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3 px-1 line-clamp-1">
        {active.title}
      </p>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Video ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-6 bg-red-500'
                : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="hidden sm:flex items-center gap-2 mt-4 overflow-x-auto pb-1 scrollbar-hide">
        {videos.map((v, i) => (
          <button
            key={v.id}
            onClick={() => goTo(i)}
            className={`relative shrink-0 w-24 aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === activeIndex
                ? 'border-red-500 scale-105 shadow-lg shadow-red-500/20'
                : 'border-transparent opacity-50 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-600'
            }`}
            aria-label={v.title}
          >
            <img src={v.thumbnail} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Subscribe CTA */}
      <div className="flex items-center justify-center mt-5">
        <a
          href="https://youtube.com/@mahendra-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-0.5"
        >
          <Youtube className="w-4 h-4" />
          Subscribe on YouTube
        </a>
      </div>

      <style>{`
        @keyframes ytprogress { from { width: 0% } to { width: 100% } }
        .animate-ytprogress { animation: ytprogress linear forwards; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default HeroVideoSlider;
