import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Trash2, 
  RefreshCw, 
  BarChart3, 
  Sliders, 
  FileText, 
  Sparkles, 
  Binary, 
  Youtube,
  ArrowRight
} from 'lucide-react';

interface HubItem {
  path: string;
  title: string;
  hindiTitle: string;
  description: string;
  tag: string;
  color: string; // Tailwind color name like 'amber', 'blue', etc.
  icon: React.ComponentType<{ className?: string }>;
}

const HUBS: HubItem[] = [
  {
    path: '/tools/text-cleaning-hub',
    title: 'Text Cleaning Hub',
    hindiTitle: 'टेक्स्ट क्लीनिंग हब',
    description: 'Remove duplicate lines, extra whitespaces, HTML tags, emojis, accents, and sanitize unformatted drafts instantly.',
    tag: 'Sanitize',
    color: 'emerald',
    icon: Trash2,
  },
  {
    path: '/tools/text-converter-hub',
    title: 'Text Converter Hub',
    hindiTitle: 'कन्वर्टर हब',
    description: 'Toggle case styles (UPPERCASE, titleCase), encode/decode Base64 or URLs, translate Binary and Morse codes.',
    tag: 'Convert',
    color: 'blue',
    icon: RefreshCw,
  },
  {
    path: '/tools/text-analysis-hub',
    title: 'Text Analysis Hub',
    hindiTitle: 'एनालिसिस हब',
    description: 'Analyze word count, reading time, readability scores, text statistics, density averages, and syllable counts.',
    tag: 'Analyze',
    color: 'violet',
    icon: BarChart3,
  },
  {
    path: '/tools/text-utility-hub',
    title: 'Text Utility Hub',
    hindiTitle: 'यूटिलिटी टूलकिट',
    description: 'Find & replace text, repeat strings, append prefixes, sort alphabetical lists, format JSON/CSV arrays.',
    tag: 'Utility',
    color: 'amber',
    icon: Sliders,
  },
  {
    path: '/tools/pdf-tools-hub',
    title: 'PDF Tools Hub',
    hindiTitle: 'पीडीएफ टूल्स हब',
    description: 'Merge pages, convert images to PDF, split documents, extract text, and compress files securely in your browser.',
    tag: 'PDF Suite',
    color: 'rose',
    icon: FileText,
  },
  {
    path: '/tools/ai-tools-hub',
    title: 'AI Tools Hub',
    hindiTitle: 'एआई टूल्स हब',
    description: 'Generate copy, humanize AI texts, translate styles, create custom graphics, and perform high-speed face swaps.',
    tag: 'Smart AI',
    color: 'cyan',
    icon: Sparkles,
  },
  {
    path: '/tools/generators-hub',
    title: 'Generators Hub',
    hindiTitle: 'जनरेटर्स हब',
    description: 'Generate strong secure passwords, lorem ipsum placeholders, QR codes, robots.txt, or test cron schedules.',
    tag: 'Generators',
    color: 'indigo',
    icon: Binary,
  },
  {
    path: '/tools/youtube-tools-hub',
    title: 'YouTube Tools Hub',
    hindiTitle: 'यूट्यूब एसईओ हब',
    description: 'Extract tags, calculate growth, parse subtitles, audit video SEO metadata, and optimize thumbnails to boost CTR.',
    tag: 'Video SEO',
    color: 'red',
    icon: Youtube,
  },
];

export const AllHubsLinking: React.FC = () => {
  const location = useLocation();

  // Highlight color classes map for icons
  const colorMap: Record<string, { bg: string; hoverBg: string; border: string }> = {
    emerald: {
      bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      hoverBg: 'group-hover:bg-emerald-500 group-hover:text-white',
      border: 'hover:border-emerald-500/40',
    },
    blue: {
      bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      hoverBg: 'group-hover:bg-blue-500 group-hover:text-white',
      border: 'hover:border-blue-500/40',
    },
    violet: {
      bg: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
      hoverBg: 'group-hover:bg-violet-500 group-hover:text-white',
      border: 'hover:border-violet-500/40',
    },
    amber: {
      bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      hoverBg: 'group-hover:bg-amber-500 group-hover:text-white',
      border: 'hover:border-amber-500/40',
    },
    rose: {
      bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      hoverBg: 'group-hover:bg-rose-500 group-hover:text-white',
      border: 'hover:border-rose-500/40',
    },
    cyan: {
      bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      hoverBg: 'group-hover:bg-cyan-500 group-hover:text-white',
      border: 'hover:border-cyan-500/40',
    },
    indigo: {
      bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      hoverBg: 'group-hover:bg-indigo-500 group-hover:text-white',
      border: 'hover:border-indigo-500/40',
    },
    red: {
      bg: 'bg-red-500/10 text-red-600 dark:text-red-400',
      hoverBg: 'group-hover:bg-red-500 group-hover:text-white',
      border: 'hover:border-red-500/40',
    },
  };

  return (
    <section className="mt-16 mb-12" id="texly-all-hubs-directory">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-widest mb-3">
          📚 Texly Hub Ecosystem
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
          हमारे अन्य मुख्य टूल हब्स <span className="text-amber-500">(Other Tool Hubs)</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          सभी टूल सुइट्स 100% फ्री, ऑफलाइन-फर्स्ट और सुरक्षित हैं। बिना साइन-अप के तुरंत इस्तेमाल करें।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {HUBS.map((hub) => {
          const isCurrent = location.pathname === hub.path;
          const style = colorMap[hub.color];
          const Icon = hub.icon;

          return (
            <Link
              key={hub.path}
              to={hub.path}
              className={`group relative overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/80 p-5 sm:p-6 transition-all duration-300 ${
                isCurrent 
                  ? 'border-amber-500 ring-2 ring-amber-500/10' 
                  : `border-slate-200 dark:border-slate-800/80 ${style.border} hover:shadow-lg hover:-translate-y-1`
              }`}
            >
              {/* Highlight ribbon for current active hub page */}
              {isCurrent && (
                <span className="absolute top-0 right-0 rounded-bl-xl bg-amber-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                  Active
                </span>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className={`p-2.5 rounded-xl transition-all duration-300 ${style.bg} ${style.hoverBg}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {hub.tag}
                  </span>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white leading-tight mt-0.5 flex flex-col">
                    <span>{hub.title}</span>
                    <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">({hub.hindiTitle})</span>
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 min-h-[48px] line-clamp-3">
                {hub.description}
              </p>

              <div className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-amber-500 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                <span>Explore Suite</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AllHubsLinking;
