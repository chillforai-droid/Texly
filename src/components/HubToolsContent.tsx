import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';

export interface HubToolContent {
  id: string;        // tool id used as ?tool= query param
  name: string;       // Display name, e.g. "Text Reverser"
  description: string; // 60-100 word unique description
  howToUse: string[]; // 3-5 steps
  faq: { q: string; a: string };
  relatedToolIds?: string[]; // ids of other tools in the SAME hub (for internal linking)
}

interface HubToolsContentProps {
  hubPath: string;       // e.g. "/tools/text-utility-hub"
  tools: HubToolContent[];
  heading?: string;
}

const HubToolsContent: React.FC<HubToolsContentProps> = ({ hubPath, tools, heading = 'All Tools in This Suite — Full Guide' }) => {
  const [openFaq, setOpenFaq] = useState<Record<string, boolean>>({});

  return (
    <section className="mb-16">
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.id}
            id={`tool-${tool.id}`}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6"
          >
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              {tool.description}
            </p>

            {tool.howToUse?.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">How to Use</p>
                <ol className="list-decimal pl-4 space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  {tool.howToUse.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {tool.faq && (
              <div className="mb-3 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq((p) => ({ ...p, [tool.id]: !p[tool.id] }))}
                  className="w-full text-left px-3 py-2 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30"
                >
                  <span>{tool.faq.q}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openFaq[tool.id] ? 'rotate-180' : ''}`} />
                </button>
                {openFaq[tool.id] && (
                  <div className="px-3 py-2 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    {tool.faq.a}
                  </div>
                )}
              </div>
            )}

            <Link
              to={`${hubPath}?tool=${tool.id}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:text-amber-700"
            >
              Open {tool.name} <ArrowRight className="w-3 h-3" />
            </Link>

            {tool.relatedToolIds && tool.relatedToolIds.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mr-1">Related:</span>
                {tool.relatedToolIds.map((rid) => {
                  const rt = tools.find((t) => t.id === rid);
                  if (!rt) return null;
                  return (
                    <a
                      key={rid}
                      href={`#tool-${rid}`}
                      className="text-[11px] px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-amber-100 dark:hover:bg-amber-900/30"
                    >
                      {rt.name}
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default HubToolsContent;
