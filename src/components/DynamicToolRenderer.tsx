import React, { useRef, useEffect, useState, useCallback } from 'react';

interface DynamicToolRendererProps {
  componentCode: string;
  toolName: string;
}

const scriptCache: Record<string, string> = {};

async function fetchScript(url: string): Promise<string> {
  if (scriptCache[url]) return scriptCache[url];
  try {
    const res = await fetch(url);
    const text = await res.text();
    scriptCache[url] = text;
    return text;
  } catch (e) {
    return `/* Failed: ${url} */`;
  }
}

const CDNS = {
  react: 'https://unpkg.com/react@18/umd/react.production.min.js',
  reactDom: 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  babel: 'https://unpkg.com/@babel/standalone/babel.min.js',
};

let preloadPromise: Promise<Record<string, string>> | null = null;
function preloadScripts() {
  if (!preloadPromise) {
    preloadPromise = Promise.all(
      Object.entries(CDNS).map(async ([key, url]) => [key, await fetchScript(url)])
    ).then(Object.fromEntries);
  }
  return preloadPromise;
}
preloadScripts();

const DynamicToolRenderer: React.FC<DynamicToolRendererProps> = ({ componentCode, toolName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(500);
  const blobUrlRef = useRef<string | null>(null);

  const buildAndRender = useCallback(async () => {
    if (!componentCode) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const scripts = await preloadScripts();

    const cleanCode = componentCode
      .replace(/import\s+type\s+.*?from\s+['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s*\{[^}]*\}\s*from\s*['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s+\w+\s*from\s*['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/import\s+['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
      .replace(/export\s+default\s+(\w+)\s*;?\s*$/, '')
      .replace(/^export\s+(?!default)/gm, '');

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

    // ✅ KEY FIX: Babel.transform() use karo — type="text/babel" nahi
    // Pehle Babel se JSX → plain JS transform karo, phir inject karo
    const transformedCode = `
(function() {
  var _babelCode = ${JSON.stringify(cleanCode)};
  try {
    var _result = Babel.transform(_babelCode, {
      presets: ['react', 'env'],
      plugins: ['transform-class-properties'],
    });
    var _fn = new Function(
      'React','ReactDOM','useState','useEffect','useRef','useCallback',
      'useMemo','useReducer','useContext','createContext','forwardRef',
      'Fragment','memo','cn','clsx',
      _result.code + '\\n; return typeof ${componentName} !== "undefined" ? ${componentName} : null;'
    );
    var Comp = _fn(
      React, ReactDOM,
      React.useState, React.useEffect, React.useRef, React.useCallback,
      React.useMemo, React.useReducer, React.useContext, React.createContext,
      React.forwardRef, React.Fragment, React.memo,
      window.cn, window.clsx
    );
    if (typeof Comp === 'function') {
      dbg('✅ Component found: ${componentName}');
      var root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(Comp));
      dbg('✅ Render success');
    } else {
      throw new Error('Component "${componentName}" not found after transform');
    }
  } catch(err) {
    dbg('❌ ' + err.message);
    document.getElementById('root').innerHTML =
      '<div style="padding:16px;color:#dc2626;background:#fef2f2;border-radius:8px;font-size:13px;font-family:monospace;margin:8px">' +
      '<b>⚠️ Error</b><br/>' + err.message + '</div>';
  }

  function sendHeight() {
    var h = Math.max(400, document.documentElement.scrollHeight + 32);
    try { window.parent.postMessage({ type: 'iframeHeight', height: h }, '*'); } catch(e) {}
  }
  setTimeout(sendHeight, 300);
  setTimeout(sendHeight, 1000);
  new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true });
})();
`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${toolName.replace(/[<>"&]/g, '')}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; background: transparent; }
    #root { padding: 16px; }
    #debug { font-size: 11px; color: #888; padding: 6px 10px; background: #f9fafb; border-top: 1px solid #e5e7eb; font-family: monospace; white-space: pre-wrap; }
  </style>
</head>
<body>
  <div id="root"><p style="color:#aaa;padding:20px;text-align:center">Loading...</p></div>
  <div id="debug"></div>

  <script>
    function dbg(msg) {
      var el = document.getElementById('debug');
      if (el) el.textContent += msg + '\\n';
      try { window.parent.postMessage({ type: 'debug', msg: msg }, '*'); } catch(e) {}
    }
    dbg('Page loaded');

    // Icon shim
    var _Icon = function(p) {
      return React.createElement('span', {
        style: { display:'inline-flex', alignItems:'center', justifyContent:'center',
          width: p.size||16, height: p.size||16, background:'#cbd5e1', borderRadius:3 }
      });
    };
    ['ShieldCheck','Cpu','Zap','Sparkles','ChevronDown','ChevronUp','ChevronRight','ChevronLeft',
     'Check','X','Plus','Minus','ArrowRight','ArrowLeft','Upload','Download','Copy','Trash','Trash2',
     'Edit','Edit2','Search','Filter','Settings','Info','AlertCircle','AlertTriangle','Star','Heart',
     'Bookmark','Share','Link','ExternalLink','File','FileText','Folder','Image','Camera','Video',
     'User','Users','Mail','Phone','Globe','Calendar','Clock','Timer','RefreshCw','Loader','Loader2',
     'Eye','EyeOff','Lock','Unlock','Key','Shield','Home','Menu','Grid','List','Code','Terminal',
     'Database','Server','Play','Pause','BarChart','TrendingUp','Activity','Wrench','Wand','Wand2',
     'Layers','Palette','Pen','Scan','Monitor','Smartphone','DollarSign','CreditCard','Tag',
     'ThumbsUp','ThumbsDown','Smile','ImageIcon','Images','Compress','Maximize','Minimize',
     'Sliders','ToggleLeft','ToggleRight','Repeat','RotateCcw','RotateCw','ZoomIn','ZoomOut',
     'CheckCircle','XCircle','HelpCircle','MessageCircle','Send','Archive','Package','Box'
    ].forEach(function(n) { window[n] = _Icon; });
    window.LucideIcon = _Icon;

    var cn = function() {
      return Array.prototype.slice.call(arguments).flat().filter(Boolean).join(' ');
    };
    window.cn = cn; window.clsx = cn; window.classNames = cn;
  </script>

  <!-- React inline -->
  <script>${scripts.react}</script>
  <!-- ReactDOM inline -->
  <script>${scripts.reactDom}</script>
  <!-- Babel inline -->
  <script>${scripts.babel}</script>

  <script>
    dbg('React: ' + (typeof React !== 'undefined' ? '✅' : '❌'));
    dbg('ReactDOM: ' + (typeof ReactDOM !== 'undefined' ? '✅' : '❌'));
    dbg('Babel: ' + (typeof Babel !== 'undefined' ? '✅' : '❌'));
  </script>

  <!-- ✅ User component: Babel.transform() se runtime mein compile hoga -->
  <script>
    ${transformedCode}
  </script>

  <!-- Tailwind async (optional) -->
  <script>
    (function() {
      var s = document.createElement('script');
      s.src = 'https://cdn.tailwindcss.com';
      s.onload = function() { dbg('Tailwind ✅'); };
      s.onerror = function() { dbg('Tailwind ❌ (CDN unavailable)'); };
      document.head.appendChild(s);
    })();
  </script>
</body>
</html>`;

    if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    const blob = new Blob([html], { type: 'text/html' });
    blobUrlRef.current = URL.createObjectURL(blob);
    iframe.src = blobUrlRef.current;
  }, [componentCode, toolName]);

  useEffect(() => { buildAndRender(); }, [buildAndRender]);

  useEffect(() => {
    return () => { if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current); };
  }, []);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'iframeHeight') setIframeHeight(Math.max(400, e.data.height));
      if (e.data?.type === 'debug') console.log('[Tool]', e.data.msg);
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
    <div className="w-full">
      <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <iframe
          ref={iframeRef}
          title={toolName}
          className="w-full border-0 transition-all duration-300"
          style={{ height: `${iframeHeight}px`, minHeight: '400px' }}
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
};

export default DynamicToolRenderer;
