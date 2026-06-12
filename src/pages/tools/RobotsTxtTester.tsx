import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Play, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  Wrench,
  Sparkles
} from 'lucide-react';
import AIToolSEOContent from '../../components/AIToolSEOContent';
import RatingSystem from '../../components/RatingSystem';
import CommentSection from '../../components/CommentSection';
import RobotsTxtTesterSEORichContent from '../../components/seo/RobotsTxtTesterSEORichContent';

export default function RobotsTxtTester() {
  const [robotsTxt, setRobotsTxt] = useState(
    'User-agent: *\nDisallow: /api/\nDisallow: /admin/\n\nUser-agent: Googlebot\nDisallow: /private/\nAllow: /'
  );
  const [testUrl, setTestUrl] = useState('/api/health');
  const [userAgent, setUserAgent] = useState('*');
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const [reason, setReason] = useState<string>('');

  const testRobotsTxt = () => {
    const lines = robotsTxt.split('\n');
    let currentAgent = '';
    let blocks: string[] = [];
    let allows: string[] = [];

    lines.forEach((line) => {
      const parts = line.trim().split(':');
      if (parts.length >= 2) {
        const key = parts[0].trim().toLowerCase();
        const value = parts.slice(1).join(':').trim();

        if (key === 'user-agent') {
          currentAgent = value;
        }

        // Only parse directives matching the current tested agent or wildcard '*'
        if (currentAgent.toLowerCase() === userAgent.toLowerCase() || currentAgent === '*') {
          if (key === 'disallow') {
            if (value) blocks.push(value);
          } else if (key === 'allow') {
            if (value) allows.push(value);
          }
        }
      }
    });

    // Check if URL matches any explicit Allows
    const matchedAllow = allows.some((rule) => {
      const reg = new RegExp('^' + rule.replace(/\*/g, '.*'));
      return reg.test(testUrl);
    });

    if (matchedAllow) {
      setIsAllowed(true);
      setReason('The path explicitly matches an "Allow" rule for this user-agent.');
      return;
    }

    // Check Disallows
    const matchedDisallow = blocks.some((rule) => {
      const reg = new RegExp('^' + rule.replace(/\*/g, '.*'));
      return reg.test(testUrl);
    });

    if (matchedDisallow) {
      setIsAllowed(false);
      setReason('The path matches a "Disallow" rule, blocking crawler execution.');
    } else {
      setIsAllowed(true);
      setReason('No explicit block found. Crawlers default to Allowed.');
    }
  };

  return (
    <>
    <Helmet>
      <title>Robots.txt Tester & SEO Validator — Test Crawl Rules Free Online | Texly</title>
      <meta name="description" content="Test your robots.txt rules against any URL and user-agent instantly. Validate crawlability, debug Googlebot access, and prevent accidental blocks before deploying. Free, no signup." />
      <link rel="canonical" href="https://www.texlyonline.in/tools/robots-txt-tester" />
      <meta property="og:url" content="https://www.texlyonline.in/tools/robots-txt-tester" />
      <meta property="og:title" content="Robots.txt Tester & SEO Validator — Free Online | Texly" />
      <meta property="og:description" content="Test robots.txt rules against any URL instantly. Validate Googlebot access and prevent accidental crawl blocks." />
      <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Robots.txt Tester — Free SEO Validator | Texly" />
      <meta name="twitter:description" content="Test robots.txt rules against any URL instantly. Validate Googlebot access and prevent accidental crawl blocks." />
      <meta name="twitter:image" content="https://www.texlyonline.in/og-image.png" />
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Robots.txt Tester & SEO Validator",
        "url": "https://www.texlyonline.in/tools/robots-txt-tester",
        "description": "Test your robots.txt rules against any URL and user-agent instantly. Validate crawlability and prevent accidental blocks.",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        "featureList": ["Robots.txt validation", "URL crawlability test", "Multi user-agent support", "Googlebot simulation", "Bingbot simulation", "Real-time results"]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.texlyonline.in" },
          { "@type": "ListItem", "position": 2, "name": "Robots.txt Tester", "item": "https://www.texlyonline.in/tools/robots-txt-tester" }
        ]
      })}</script>
      <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "What is a robots.txt file?", "acceptedAnswer": { "@type": "Answer", "text": "A robots.txt file tells search engine crawlers which pages or sections of your website they can or cannot access. It is placed at the root of your domain (e.g., https://example.com/robots.txt)." } },
          { "@type": "Question", "name": "How do I test if Googlebot can access a URL?", "acceptedAnswer": { "@type": "Answer", "text": "Paste your robots.txt content, select Googlebot as the user-agent, enter the URL path you want to test, and click Test. The tool will instantly show whether access is allowed or blocked." } },
          { "@type": "Question", "name": "Does this tool fetch my live robots.txt file?", "acceptedAnswer": { "@type": "Answer", "text": "No. You paste your robots.txt content directly into the tool. All testing happens locally in your browser with no external requests." } }
        ]
      })}</script>
    </Helmet>
    <div className="bg-white dark:bg-[#0e0e16] border border-slate-200 dark:border-zinc-900 rounded-3xl p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-zinc-850 pb-4">
        <Wrench className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
        <div>
          <h2 className="text-xl font-black text-slate-800 dark:text-white">Robots.txt Tester & SEO Validator</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Test crawlability rules and prevent index gaps before deploying changes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <div>
          <label className="text-xs uppercase font-black tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Robots.txt Content</label>
          <textarea
            value={robotsTxt}
            onChange={(e) => setRobotsTxt(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#09090f] border border-slate-200 dark:border-zinc-850 rounded-xl p-4 text-xs font-mono text-slate-800 dark:text-white focus:border-cyan-500/50 focus:outline-none min-h-[300px] leading-relaxed resize-y"
          />
        </div>

        <div className="flex flex-col gap-6 justify-between">
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase font-black tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Configure target User-Agent</label>
              <select
                value={userAgent}
                onChange={(e) => setUserAgent(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#09090f] border border-slate-200 dark:border-zinc-850 text-xs text-slate-800 dark:text-white p-3 rounded-xl focus:border-cyan-500/50 cursor-pointer"
              >
                <option value="*">All Crawlers Wildcard (*)</option>
                <option value="Googlebot">Googlebot (Google search indexer)</option>
                <option value="Bingbot">Bingbot (Microsoft Bing indexer)</option>
                <option value="Yandex">YandexBot (Yandex indexer)</option>
              </select>
            </div>

            <div>
              <label className="text-xs uppercase font-black tracking-wider text-slate-500 dark:text-zinc-400 block mb-2">Test URL path</label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="E.g. /private/dashboard"
                className="w-full bg-slate-50 dark:bg-[#09090f] border border-slate-200 dark:border-zinc-850 rounded-xl p-3 text-xs text-slate-800 dark:text-white focus:border-cyan-500/50 focus:outline-none"
              />
            </div>

            <button
              onClick={testRobotsTxt}
              className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase text-xs tracking-wider rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-500/10"
            >
              <span>Verify Path Crawlability</span>
              <Play className="w-3.5 h-3.5" />
            </button>
          </div>

          {isAllowed !== null && (
            <div className={`p-5 rounded-2xl border transition-all ${
              isAllowed 
                ? 'bg-emerald-50 dark:bg-emerald-950/15 border-emerald-250 dark:border-emerald-900/35 text-emerald-700 dark:text-emerald-400' 
                : 'bg-rose-50 dark:bg-rose-950/15 border-rose-250 dark:border-rose-900/35 text-rose-700 dark:text-rose-400'
            }`}>
              <div className="flex items-center gap-2.5 mb-2 font-black text-sm uppercase tracking-wide">
                {isAllowed ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Access Allowed</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5" />
                    <span>Access Blocked</span>
                  </>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-semibold">{reason}</p>
            </div>
          )}
        </div>
      </div>
    </div>

    {/* SEO Content */}
            <RobotsTxtTesterSEORichContent />
        <AIToolSEOContent toolId="robots-txt-tester" />

    {/* Rating & Comments */}
    <div className="max-w-4xl mx-auto mt-8 space-y-6">
      <RatingSystem toolId="robots-txt-tester" theme={{ border: 'slate-200' }} />
      <CommentSection targetId="robots-txt-tester" targetType="tool" theme={{ border: 'slate-200' }} />
    </div>
    </>
  );
}
