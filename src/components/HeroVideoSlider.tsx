import React, { useState, useEffect, useRef } from 'react';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Add / remove videos here — just paste any youtu.be or youtube.com link.
const HERO_VIDEOS = [
  { id: 'FloTD4tmP48', title: 'Texly Online — Free AI & Text Tools' },
  { id: 'OrW7ZciseE0', title: 'Texly Online — Tutorial' },
  { id: 'UOVbCq1t0oM', title: 'Texly Online — Feature Walkthrough' },
  { id: 'hUr1RXgTw1k', title: 'Texly Online — Demo' },
];

const AUTOPLAY_INTERVAL = 4000; // ms between slides

const HeroVideoSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused || openVideoId) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, AUTOPLAY_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, openVideoId]);

  // Close embed on Escape key
  useEffect(() => {
    if (!openVideoId) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenVideoId(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [openVideoId]);

  const goTo = (index: number) => {
    setActiveIndex(((index % HERO_VIDEOS.length) + HERO_VIDEOS.length) % HERO_VIDEOS.length);
  };

  const active = HERO_VIDEOS[activeIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 mt-10 sm:mt-14">
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-300/40 dark:shadow-black/40 bg-slate-900 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Active thumbnail */}
        <button
          onClick={() => setOpenVideoId(active.id)}
          className="relative block w-full aspect-video"
          aria-label={`Play video: ${active.title}`}
        >
          <img
            key={active.id}
            src={`https://img.youtube.com/vi/${active.id}/maxresdefault.jpg`}
            onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${active.id}/hqdefault.jpg`; }}
            alt={active.title}
            className="w-full h-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl transition-transform group-hover:scale-110">
              <Play className="w-7 h-7 sm:w-8 sm:h-8 text-red-600 fill-red-600 translate-x-0.5" />
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 text-left">
            <p className="text-white text-sm sm:text-base font-bold drop-shadow">{active.title}</p>
          </div>
        </button>

        {/* Prev / Next controls */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous video"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next video"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {HERO_VIDEOS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => goTo(i)}
            aria-label={`Show video ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'w-6 bg-blue-500' : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>

      {/* Inline thumbnail strip (optional quick-pick) */}
      <div className="hidden sm:flex items-center justify-center gap-3 mt-4">
        {HERO_VIDEOS.map((v, i) => (
          <button
            key={v.id}
            onClick={() => goTo(i)}
            className={`relative w-20 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
              i === activeIndex ? 'border-blue-500 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
            aria-label={`Select video: ${v.title}`}
          >
            <img src={`https://img.youtube.com/vi/${v.id}/default.jpg`} alt={v.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Embed popup player */}
      {openVideoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setOpenVideoId(null)}
        >
          <div
            className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpenVideoId(null)}
              aria-label="Close video"
              className="absolute -top-10 right-0 sm:top-2 sm:right-2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${openVideoId}?autoplay=1&rel=0`}
              title="Texly Online video"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVideoSlider;
