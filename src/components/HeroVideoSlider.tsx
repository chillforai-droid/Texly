import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Youtube, RefreshCw, Play, Volume2, VolumeX, Pause } from 'lucide-react';

const CHANNEL_ID  = 'UCwCrRIa28XZ3QI3UOxKaNDw';
const API_KEY     = import.meta.env.VITE_YOUTUBE_API_KEY as string;
const MAX_RESULTS = 12;
const AUTOPLAY_MS = 20000;

const FALLBACK_VIDEOS = [
  { id: 'FloTD4tmP48', title: 'Texly Online — Free AI & Text Tools' },
  { id: 'OrW7ZciseE0', title: 'Texly Online — Tutorial' },
  { id: 'UOVbCq1t0oM', title: 'Texly Online — Feature Walkthrough' },
  { id: 'hUr1RXgTw1k', title: 'Texly Online — Demo' },
];

interface VideoItem { id: string; title: string; thumbnail: string; }

const HeroVideoSlider = () => {
  const [videos, setVideos]             = useState<VideoItem[]>([]);
  const [loading, setLoading]           = useState(true);
  const [apiError, setApiError]         = useState(false);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [isPaused, setIsPaused]         = useState(false);
  const [isMuted, setIsMuted]           = useState(true);
  const [iframeKey, setIframeKey]       = useState(0); 
  const [isPlaying, setIsPlaying]       = useState(false); // Lazy-load control

  const touchStartX  = useRef<number>(0);
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  // Helper to determine if a video is vertical (YouTube Shorts)
  const isShortsVideo = (title: string): boolean => {
    const t = title.toLowerCase();
    return t.includes('short') || t.includes('shorts') || t.includes('#shorts') || t.includes('reels') || t.includes('vertical');
  };

  // ── Fetch Videos ──────────────────────────────────────────────────────
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

  // ── Auto-advance Slider ───────────────────────────────────────────────
  useEffect(() => {
    if (isPaused || videos.length === 0 || isPlaying) return;
    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % videos.length);
    }, AUTOPLAY_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPaused, videos.length, activeIndex, isPlaying]);

  const goTo = useCallback((i: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false); // Reset playback state when switching slides
    setActiveIndex(((i % videos.length) + videos.length) % videos.length);
  }, [videos.length]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    setIframeKey(prev => prev + 1);
  };

  // ── Mobile Swipe gestures ─────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(activeIndex + (diff > 0 ? 1 : -1));
  };

  // ── Loading Placeholder ───────────────────────────────────────────────
  if (loading) return (
    <div className="max-w-2xl mx-auto px-4 mt-8 sm:mt-12">
      <div className="w-full aspect-video rounded-3xl bg-slate-100 dark:bg-slate-900/60 animate-pulse flex flex-col items-center justify-center gap-3 border border-slate-200/50 dark:border-slate-800/40">
        <Youtube className="w-12 h-12 text-red-500 animate-bounce" />
        <span className="text-xs font-bold text-slate-400">Loading videos...</span>
      </div>
    </div>
  );

  if (videos.length === 0) return null;
  const active = videos[activeIndex];
  const isCurrentShort = isShortsVideo(active.title);

  // Safe youtube embed URL (autoplays only after user clicks our Play button)
  const embedSrc = `https://www.youtube.com/embed/${active.id}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&controls=1&playsinline=1&enablejsapi=1`;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 sm:mt-12 select-none">

      {/* Header/Title row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest flex items-center gap-1">
            <Youtube className="w-4 h-4 text-red-600" /> Latest Tutorials & Updates
          </span>
        </div>
        <div className="flex items-center gap-3">
          {apiError && (
            <button onClick={fetchVideos} className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          )}
          <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/30 dark:border-slate-800/30">
            {activeIndex + 1} / {videos.length}
          </span>
        </div>
      </div>

      {/* Player Container */}
      <div 
        className={`relative mx-auto rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800/60 shadow-2xl bg-black group transition-all duration-500 ${
          isCurrentShort ? 'max-w-sm aspect-[9/16]' : 'max-w-3xl aspect-video'
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {isPlaying ? (
          /* Actual YouTube IFrame - Loaded dynamically ONLY when clicked to maximize PageSpeed */
          <iframe
            key={`${active.id}-${iframeKey}`}
            src={embedSrc}
            title={active.title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          /* High Performance Thumbnail Poster & Play CTA */
          <div 
            onClick={() => setIsPlaying(true)}
            className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden group/poster"
          >
            {/* Blurred background for a premium dark-room effect */}
            <div 
              className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
              style={{ backgroundImage: `url(${active.thumbnail})` }}
            />
            
            {/* Main sharp image */}
            <img 
              src={active.thumbnail} 
              alt={active.title} 
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover/poster:scale-102"
              loading="lazy"
              referrerPolicy="no-referrer"
            />

            {/* Premium Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />

            {/* Centered Pulsing Play Button */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover/poster:scale-110 group-hover/poster:rotate-6 active:scale-95 relative">
                {/* Ping rings */}
                <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-25" />
                <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-white ml-1 text-white" />
              </div>
            </div>

            {/* Shorts Badge Overlay */}
            {isCurrentShort && (
              <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1 z-10 animate-pulse">
                <Youtube className="w-3.5 h-3.5" /> YouTube Short
              </div>
            )}
          </div>
        )}

        {/* Mute / Unmute Overlay (Only shown when playing) */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
            className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-bold backdrop-blur-sm transition-all border border-white/10"
          >
            {isMuted
              ? <><VolumeX className="w-4 h-4" /> Unmute</>
              : <><Volume2 className="w-4 h-4" /> Mute</>
            }
          </button>
        )}

        {/* Carousel Navigation: Previous */}
        <button
          onClick={(e) => { e.stopPropagation(); goTo(activeIndex - 1); }}
          aria-label="Previous video"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/5 active:scale-90"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Carousel Navigation: Next */}
        <button
          onClick={(e) => { e.stopPropagation(); goTo(activeIndex + 1); }}
          aria-label="Next video"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 hover:bg-red-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20 backdrop-blur-sm border border-white/5 active:scale-90"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Auto-rotation Progress Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 z-10">
          <div
            key={`bar-${activeIndex}-${isPaused}-${isPlaying}`}
            className={`h-full bg-red-500 ${isPaused || isPlaying ? 'opacity-35' : 'animate-ytprogress'}`}
            style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
          />
        </div>
      </div>

      {/* Active Title */}
      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mt-4 px-2 line-clamp-2 leading-snug text-center max-w-2xl mx-auto">
        {active.title}
      </h3>

      {/* Carousel Navigation Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Video ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-red-500' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Responsive Thumbnail Strip */}
      <div className="flex items-center gap-3 mt-5 overflow-x-auto py-1 scrollbar-hide justify-start sm:justify-center">
        {videos.map((v, i) => {
          const thumbIsShort = isShortsVideo(v.title);
          return (
            <button
              key={v.id}
              onClick={() => goTo(i)}
              className={`relative shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-red-500 scale-105 shadow-lg shadow-red-500/30'
                  : 'border-transparent opacity-45 hover:opacity-100 hover:border-slate-300 dark:hover:border-slate-700'
              } ${thumbIsShort ? 'w-10 h-16' : 'w-20 h-11'}`}
              aria-label={v.title}
            >
              <img 
                src={v.thumbnail} 
                alt={v.title} 
                className="w-full h-full object-cover" 
                loading="lazy" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Red YouTube CTA Link */}
      <div className="flex items-center justify-center mt-6">
        <a
          href="https://youtube.com/@mahendra-ai"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-black rounded-xl transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/35 hover:-translate-y-0.5 active:translate-y-0"
        >
          <Youtube className="w-5 h-5 fill-white" />
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
