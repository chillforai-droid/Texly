import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface AdPlaceholderProps {
  className?: string;
  slot?: string; // Descriptive label for the ad slot
  adSlotId?: string;
  format?: '728x90' | '468x60' | '320x50' | '300x250' | '160x300' | 'native' | 'auto';
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  className = '',
  slot = 'Advertisement',
  format = 'auto'
}) => {
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [adInstanceKey, setAdInstanceKey] = useState<string>(() => Math.random().toString(36).substring(7));

  // Update key to completely reload the ad iframe whenever the user navigates pages or goes back
  useEffect(() => {
    setAdInstanceKey(Math.random().toString(36).substring(7));
  }, [location.pathname, location.search]);

  // Measure container width to select the best banner size responsively
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    // Initial measure
    updateWidth();

    // Use ResizeObserver for accurate and performant container-level size changes
    const observer = new ResizeObserver(() => {
      updateWidth();
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Determine which ad format to load
  let adKey = '';
  let width = 300;
  let height = 250;
  let isNative = false;

  if (format === 'native') {
    isNative = true;
  } else if (format === '300x250') {
    adKey = '9fd72db4284db38353edbfcbc5f73a2c';
    width = 300;
    height = 250;
  } else if (format === '160x300') {
    adKey = '0815bb22af6fac0cb0113442b1174c0f';
    width = 160;
    height = 300;
  } else if (format === '728x90') {
    adKey = '73834bce0311a98acef876cd5d57c01b';
    width = 728;
    height = 90;
  } else if (format === '468x60') {
    adKey = 'd465040d81728bdde69a358e505676d7';
    width = 468;
    height = 60;
  } else if (format === '320x50') {
    adKey = 'fcf08596433ef9d8f9b2657315dfd9b2';
    width = 320;
    height = 50;
  } else {
    // 'auto' responsive detection based on width
    const targetWidth = containerWidth || (typeof window !== 'undefined' ? window.innerWidth : 1200);

    if (targetWidth >= 728) {
      adKey = '73834bce0311a98acef876cd5d57c01b';
      width = 728;
      height = 90;
    } else if (targetWidth >= 468) {
      adKey = 'd465040d81728bdde69a358e505676d7';
      width = 468;
      height = 60;
    } else {
      adKey = 'fcf08596433ef9d8f9b2657315dfd9b2';
      width = 320;
      height = 50;
    }
  }

  // Calculate proportional scaling factor for absolute container fitting on mobile
  const finalScale = !isNative && containerWidth && containerWidth < width 
    ? Math.max(0.3, (containerWidth - 8) / width) 
    : 1;

  // Construct iframe source. We insert a random uniqueId comment to prevent browser caching/de-duplication
  const srcDoc = isNative
    ? `<!DOCTYPE html>
       <html>
         <head>
           <meta charset="utf-8">
           <!-- Unique ID: ${adInstanceKey} -->
           <style>
             body {
               margin: 0 !important;
               padding: 0 !important;
               background: transparent;
               display: flex;
               justify-content: center;
               align-items: center;
               overflow: hidden;
             }
             #container-9e76900f3ce9f902d284e7431be4ac85 {
               width: 100% !important;
               max-width: 100% !important;
               margin: 0 auto !important;
             }
           </style>
         </head>
         <body>
           <div id="container-9e76900f3ce9f902d284e7431be4ac85"></div>
           <script async="async" data-cfasync="false" src="https://pl30301392.effectivecpmnetwork.com/9e76900f3ce9f902d284e7431be4ac85/invoke.js"></script>
         </body>
       </html>`
    : `<!DOCTYPE html>
       <html>
         <head>
           <meta charset="utf-8">
           <!-- Unique ID: ${adInstanceKey} -->
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
             iframe {
               max-width: 100% !important;
               max-height: 100% !important;
               margin: 0 auto !important;
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
    <div
      ref={containerRef}
      className={`mx-auto my-6 flex flex-col items-center justify-center transition-all duration-300 ${className}`}
      style={{ 
        maxWidth: isNative ? '100%' : `${width}px`,
        width: '100%'
      }}
    >
      {/* Elegantly small ADVERTISEMENT tag to look extremely professional like AdSense */}
      <span className="text-[10px] tracking-widest text-slate-400 dark:text-slate-500 uppercase font-bold mb-1.5 select-none text-center">
        {slot}
      </span>
      
      <div 
        className="flex justify-center items-center overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/40 dark:bg-slate-900/10 shadow-sm transition-all duration-300 w-full"
        style={{ 
          height: isNative ? 'auto' : `${height * finalScale}px`,
          minHeight: isNative ? '280px' : `${height * finalScale}px`,
        }}
      >
        <div
          style={{
            transform: finalScale < 1 ? `scale(${finalScale})` : 'none',
            transformOrigin: 'center center',
            width: isNative ? '100%' : `${width}px`,
            height: isNative ? '280px' : `${height}px`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <iframe
            key={adInstanceKey}
            srcDoc={srcDoc}
            width={isNative ? '100%' : `${width}`}
            height={isNative ? '280' : `${height}`}
            style={{ 
              border: 'none', 
              overflow: 'hidden', 
              background: 'transparent', 
              display: 'block', 
              width: isNative ? '100%' : `${width}px`,
              height: isNative ? '280px' : `${height}px` 
            }}
            title={`Adsterra Ad - ${slot}`}
            scrolling="no"
            sandbox="allow-scripts allow-same-origin allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default AdPlaceholder;
