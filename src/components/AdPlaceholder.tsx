import React from 'react';

interface AdPlaceholderProps {
  className?: string;
  slot?: string;
}

const AdPlaceholder: React.FC<AdPlaceholderProps> = ({ className = '', slot = 'General' }) => {
  // Ad slots are currently disabled as per user request
  return null;

  return (
    <div className={`bg-slate-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center p-8 text-center min-h-[250px] ${className}`} aria-hidden="true">
      <div className="bg-white px-3 py-1 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border border-slate-100 shadow-sm">
        Advertisement
      </div>
      <p className="text-slate-400 text-sm font-medium">
        Ad Slot: {slot}
      </p>
      <p className="text-slate-300 text-xs mt-2 max-w-[200px]">
        This space is reserved for AdSense content.
      </p>
    </div>
  );
};

export default AdPlaceholder;
