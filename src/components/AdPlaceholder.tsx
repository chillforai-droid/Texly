import React, { useEffect, useRef } from 'react';

interface AdPlaceholderProps {
  className?: string;
  slot?: string;
  adSlotId?: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// ⚠️  REAL ADSENSE SLOT IDs यहाँ डालें — AdSense dashboard → Ads → By ad unit
// Publisher ID पहले से सही है: ca-pub-5997708513500271
// Slot IDs AdSense के "Ad units" section में मिलेंगे (9-10 digit number)
const AD_SLOTS: Record<string, string> = {
  'Home Top':        'REPLACE_HOME_TOP_SLOT_ID',        // e.g. 1234567890
  'Home Bottom':     'REPLACE_HOME_BOTTOM_SLOT_ID',     // e.g. 9876543210
  'Top of Tool':     'REPLACE_TOP_OF_TOOL_SLOT_ID',     // e.g. 1122334455
  'Bottom of Tool':  'REPLACE_BOTTOM_OF_TOOL_SLOT_ID',  // e.g. 5544332211
  'General':         'REPLACE_GENERAL_SLOT_ID',          // e.g. 6677889900
};

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  className = '',
  slot = 'General',
  adSlotId,
  format = 'auto',
}) => {
  const adRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const resolvedSlotId = adSlotId || AD_SLOTS[slot] || AD_SLOTS['General'];

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // silently ignore
    }
  }, []);

  // CLS FIX: 'auto' format को 100px पर reserve करने से CLS आता था क्योंकि
  // AdSense auto-format ads mobile पर 250px तक expand होते हैं।
  // अब 250px reserve किया है — content नीचे नहीं खिसकेगा।
  const minHeightStyle: React.CSSProperties = {
    minHeight: format === 'horizontal' ? '90px' : '250px',
    display: 'block',
  };

  return (
    <div
      className={`overflow-hidden text-center ${className}`}
      aria-label="Advertisement"
      style={minHeightStyle}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 'inherit' }}
        data-ad-client="ca-pub-5997708513500271"
        data-ad-slot={resolvedSlotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdPlaceholder;
