import React, { useRef, useEffect, useState } from 'react';

interface DynamicToolRendererProps {
  componentCode: string;
  toolName: string;
}

const DynamicToolRenderer: React.FC<DynamicToolRendererProps> = ({ componentCode, toolName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(500);
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    if (!componentCode) {
      setDebugInfo('componentCode is empty or null');
      return;
    }
    setDebugInfo(`componentCode length: ${componentCode.length} chars`);

    const iframe = iframeRef.current;
    if (!iframe) {
      setDebugInfo('iframe ref is null');
      return;
    }

    // Sभी imports strip karo
    const cleanCode = componentCode
      .replace(/import\s+type\s+.*?from\s+['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s+\w+\s*from\s*['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s+['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
      .replace(/export\s+default\s+(\w+)\s*;?\s*$/, '')
      .replace(/^export\s+(?!default)/gm, '');

    // Component name detect karo
    const patterns = [
      /function\s+([A-Z]\w+)\s*\(/,
      /const\s+([A-Z]\w+)\s*=\s*(?:React\.memo\()?(?:\([^)]*\)|[^=])\s*=>/,
      /const\s+([A-Z]\w+)\s*=\s*\(/,
    ];
    let componentName = '';
    for (const p of patterns) {
      const m = cleanCode.match(p);
      if (m) { componentName = m[1]; break; }
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${toolName.replace(/[<>"&]/g, '')}</title>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html,body{margin:0;padding:0;font-family:system-ui,sans-serif;background:transparent}
    *{box-sizing:border-box}
    #root{padding:16px}
    #debug{font-size:11px;color:#666;padding:8px;background:#f9f9f9;border-top:1px solid #eee;font-family:monospace;white-space:pre-wrap;word-break:break-all}
  </style>
</head>
<body>
  <div id="root"><p style="color:#999;padding:20px">Loading...</p></div>
  <div id="debug"></div>
  <script>
    function dbg(msg) {
      document.getElementById('debug').textContent += msg + '\\n';
      window.parent.postMessage({type:'debug',msg:msg},'*');
    }
    dbg('Scripts loaded, starting render...');
    dbg('Component name to find: ${componentName}');

    // Lucide + common icon shim
    const _IconBase = (props) => React.createElement('span', {style:{display:'inline-block',width:props.size||20,height:props.size||20,opacity:0.5}}, '◈');
    const iconList = ['ShieldCheck','Cpu','Zap','Sparkles','ChevronDown','ChevronUp','ChevronRight','ChevronLeft','Check','X','Plus','Minus','ArrowRight','ArrowLeft','ArrowUp','ArrowDown','Upload','Download','Copy','Trash','Trash2','Edit','Edit2','Search','Filter','Settings','Info','AlertCircle','AlertTriangle','Star','Heart','Bookmark','Share','Link','ExternalLink','File','FileText','Folder','Image','Camera','Video','User','Users','Mail','Phone','Globe','Calendar','Clock','Timer','RefreshCw','Loader','Loader2','Eye','EyeOff','Lock','Unlock','Key','Shield','Home','Menu','Grid','List','Code','Terminal','Database','Server','Play','Pause','BarChart','TrendingUp','Activity','Wrench','Tool','Wand','Wand2','Layers','Palette','Paintbrush','Pen','Scan','QrCode','Monitor','Smartphone','Power','Battery','DollarSign','CreditCard','ShoppingCart','Tag','ThumbsUp','ThumbsDown','Smile','ImageIcon','Images','FileImage','Compress','Maximize','Minimize','Sliders','SlidersHorizontal','ToggleLeft','ToggleRight','Switch','Repeat','RotateCcw','RotateCw','ZoomIn','ZoomOut','Move','Crop','Scissors','Wand2','Magic','Sparkle','Flash','Lightning','Bolt','CheckCircle','XCircle','AlertOctagon','HelpCircle','MessageCircle','MessageSquare','Send','Inbox','Archive','Package','Box'];
    iconList.forEach(n => { window[n] = _IconBase; });
    window.LucideIcon = _IconBase;
    const cn = (...c) => c.filter(Boolean).join(' ');
    const clsx = cn;
    window.cn = cn;
    window.clsx = clsx;
  </script>
  <script type="text/babel" data-presets="react,env">
    const {useState,useEffect,useRef,useCallback,useMemo,useReducer,useContext,createContext,forwardRef,Fragment,memo} = React;

    try {
      // ---- USER COMPONENT CODE START ----
      ${cleanCode}
      // ---- USER COMPONENT CODE END ----

      const compName = '${componentName}';
      let Comp = null;

      // Try by name first
      try { Comp = eval(compName); } catch(e) { dbg('eval by name failed: ' + e.message); }

      // Fallback: find first uppercase function
      if (!Comp || typeof Comp !== 'function') {
        const allFns = Object.getOwnPropertyNames(window).filter(k => {
          try { return typeof window[k] === 'function' && /^[A-Z]/.test(k) && k !== 'React' && k !== 'ReactDOM'; } catch(e) { return false; }
        });
        dbg('Available components: ' + allFns.join(', '));
        for (const fn of allFns) {
          try {
            const f = window[fn];
            const testEl = f({});
            if (testEl && typeof testEl === 'object') { Comp = f; dbg('Using fallback: ' + fn); break; }
          } catch(e) {}
        }
      }

      if (typeof Comp === 'function') {
        dbg('Rendering: ' + compName);
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(Comp));
        dbg('Render called successfully');
      } else {
        throw new Error('No renderable component found. Name tried: ' + compName);
      }
    } catch(err) {
      dbg('FATAL ERROR: ' + err.message);
      document.getElementById('root').innerHTML =
        '<div style="padding:16px;color:#dc2626;background:#fef2f2;border-radius:8px;font-size:13px;font-family:monospace">' +
        '<strong>Render Error:</strong><br>' + err.message +
        '<br><br><small>Check #debug section below</small></div>';
    }

    // Auto height
    function sendHeight() {
      const h = Math.max(400, document.body.scrollHeight + 40);
      window.parent.postMessage({type:'iframeHeight',height:h},'*');
    }
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1500);
    new MutationObserver(sendHeight).observe(document.body,{childList:true,subtree:true,attributes:true});
  </script>
</body>
</html>`;

    iframe.srcdoc = html;
  }, [componentCode, toolName]);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'iframeHeight') {
        setIframeHeight(Math.max(400, e.data.height));
      }
      if (e.data?.type === 'debug') {
        console.log('[DynamicTool]', e.data.msg);
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!componentCode) {
    return (
      <div className="p-8 text-center border-2 border-dashed border-red-300 rounded-2xl bg-red-50">
        <p className="text-red-600 font-bold">⚠️ componentCode empty है</p>
        <p className="text-red-400 text-sm mt-1">Supabase से component_code नहीं मिला</p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {/* Debug bar - production में हटा देंगे */}
      <div className="text-xs text-slate-400 px-2">{debugInfo}</div>
      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <iframe
          ref={iframeRef}
          title={toolName}
          className="w-full border-0 transition-all duration-300"
          style={{ height: `${iframeHeight}px`, minHeight: '400px' }}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default DynamicToolRenderer;
