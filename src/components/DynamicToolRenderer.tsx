import React, { useRef, useEffect, useState } from 'react';

interface DynamicToolRendererProps {
  componentCode: string;
  toolName: string;
}

/**
 * Admin panel se generate hue React component code ko
 * srcdoc iframe mein safely render karta hai.
 * srcdoc approach: blob: URL avoid karta hai — CSP issue nahi hoti.
 */
const DynamicToolRenderer: React.FC<DynamicToolRendererProps> = ({ componentCode, toolName }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(500);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !componentCode) return;

    // Component name detect karo — export default FunctionName ya ArrowFunction
    const namedMatch = componentCode.match(/export\s+default\s+function\s+(\w+)/);
    const constMatch = componentCode.match(/export\s+default\s+(\w+)\s*[;=({]/);
    const componentName = (namedMatch?.[1] || constMatch?.[1] || '').trim();

    // export default ko remove karo taaki eval mein conflict na ho
    const cleanCode = componentCode
      .replace(/export\s+default\s+function\s+(\w+)/, 'function $1')
      .replace(/export\s+default\s+(\w+)\s*;/, '');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${toolName.replace(/"/g, '&quot;')}</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html, body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; background: transparent; }
    * { box-sizing: border-box; }
    #root { padding: 16px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react">
    const { useState, useEffect, useRef, useCallback, useMemo, useReducer } = React;

    ${cleanCode}

    const componentName = ${JSON.stringify(componentName)};

    try {
      const ComponentToRender = eval(componentName);
      if (typeof ComponentToRender === 'function') {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(ComponentToRender));
      } else {
        throw new Error('Component "' + componentName + '" is not a function');
      }
    } catch(err) {
      document.getElementById('root').innerHTML =
        '<div style="padding:20px;color:#ef4444;background:#fef2f2;border-radius:8px;font-family:monospace;font-size:13px">' +
        '<strong>Render Error:</strong><br>' + err.message + '</div>';
    }

    // Parent ko height bhejo auto-resize ke liye
    function sendHeight() {
      const h = document.body.scrollHeight;
      window.parent.postMessage({ type: 'iframeHeight', height: h }, '*');
    }
    window.addEventListener('load', sendHeight);
    new MutationObserver(sendHeight).observe(document.body, { childList: true, subtree: true, attributes: true });
    setTimeout(sendHeight, 500);
    setTimeout(sendHeight, 1500);
  </script>
</body>
</html>`;

    iframe.srcdoc = html;
  }, [componentCode, toolName]);

  // Parent mein height message listen karo
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'iframeHeight' && typeof e.data.height === 'number') {
        setIframeHeight(Math.max(400, e.data.height + 32));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);

  if (!componentCode) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <p>Tool component available nahi hai.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <iframe
        ref={iframeRef}
        title={toolName}
        className="w-full border-0 transition-all duration-300"
        style={{ height: `${iframeHeight}px`, minHeight: '400px' }}
        sandbox="allow-scripts"
      />
    </div>
  );
};

export default DynamicToolRenderer;
