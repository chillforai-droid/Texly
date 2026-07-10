import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { X, ShieldAlert } from 'lucide-react';

const InterstitialAd: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [adKey, setAdKey] = useState<string>('');
  const [canClose, setCanClose] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(0);

  // Trigger interstitial ad on route navigation / back button
  useEffect(() => {
    // Avoid showing on first mount of home page to prevent annoying users immediately, 
    // but show on subsequent page changes/back navigation
    const hasLoadedBefore = sessionStorage.getItem('has_loaded_before');
    if (!hasLoadedBefore) {
      sessionStorage.setItem('has_loaded_before', 'true');
      return;
    }

    // Set a random ad key out of our active high-paying Adsterra options
    const adKeys = [
      { key: '9fd72db4284db38353edbfcbc5f73a2c', w: 300, h: 250 }, // Standard Medium Rectangle
      { key: '0815bb22af6fac0cb0113442b1174c0f', w: 160, h: 300 }  // Vertical Banner
    ];
    const selected = adKeys[Math.floor(Math.random() * adKeys.length)];
    setAdKey(selected.key);

    // Open the Interstitial ad overlay
    setIsOpen(true);
    setCanClose(true); // User can close immediately as requested ("यूजर हटाए तो ads हट जाये")
  }, [location.pathname, location.search]);

  if (!isOpen || !adKey) return null;

  // Render responsive size depending on selected format
  const isVertical = adKey === '0815bb22af6fac0cb0113442b1174c0f';
  const width = isVertical ? 160 : 300;
  const height = isVertical ? 300 : 250;

  const srcDoc = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            margin: 0 !important;
            padding: 0 !important;
            background: transparent;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            height: 100vh;
            width: 100vw;
          }
        </style>
      </head>
      <body>
        <script type="text/javascript">
          atOptions = {
            'key' : '${adKey}',
            'format' : 'iframe',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
      </body>
    </html>`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all duration-300 animate-fadeIn">
      <div 
        className="relative bg-white dark:bg-zinc-950 p-6 rounded-3xl border border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col items-center max-w-[90vw] mx-4 animate-scaleUp"
        style={{ width: `${width + 48}px` }}
      >
        {/* Header bar with Policy label and close button */}
        <div className="w-full flex items-center justify-between mb-4 border-b border-slate-100 dark:border-zinc-900 pb-2.5">
          <div className="flex items-center gap-1 text-slate-400 dark:text-zinc-500">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-widest uppercase font-bold select-none">
              Advertisement
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-300 transition-colors flex items-center gap-1 text-xs px-2.5 py-1 font-semibold"
            title="Close Ad"
          >
            <span>बंद करें</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Ad container with premium framing */}
        <div 
          className="flex justify-center items-center overflow-hidden rounded-xl bg-slate-50 dark:bg-zinc-900/40 border border-slate-100 dark:border-zinc-900/60 transition-all duration-300"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <iframe
            srcDoc={srcDoc}
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden', background: 'transparent' }}
            title="Interstitial Advertisement"
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>

        {/* Bottom micro notice */}
        <div className="mt-4 text-[9px] text-slate-400 dark:text-zinc-600 text-center select-none font-medium">
          Close this window to return back to your page
        </div>
      </div>
    </div>
  );
};

export default InterstitialAd;
