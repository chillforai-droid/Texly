import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ALL_TOOLS, Tool } from '../data/tools';
import { ArrowLeft, Sparkles, AlertCircle, Wrench, BookOpen } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import AdPlaceholder from '../components/AdPlaceholder';
import AIToolSEOContent from '../components/AIToolSEOContent';
import RatingSystem from '../components/RatingSystem';
import CommentSection from '../components/CommentSection';
import { getBlogs } from '../utils/blogStorage';
import { getRelatedBlogs } from '../utils/seoLinking';
import { BlogPost } from '../data/blog';

// Lazy load key category hubs
const TextCleaningHub = lazy(() => import('./tools/TextCleaningHub'));
const TextConverterHub = lazy(() => import('./tools/TextConverterHub'));
const TextAnalysisHub = lazy(() => import('./tools/TextAnalysisHub'));
const TextUtilityHub = lazy(() => import('./tools/TextUtilityHub'));
const PDFToolWorkspace = lazy(() => import('../components/PDFToolWorkspace').then(m => ({ default: m.PDFToolWorkspace })));
const GeneratorsHub = lazy(() => import('./tools/GeneratorsHub'));

// Lazy load the tool components
const FaceSwap = lazy(() => import('./tools/FaceSwap'));
const BackgroundRemover = lazy(() => import('./tools/BackgroundRemover'));
const ImageCompressor = lazy(() => import('./tools/ImageCompressor'));
const ImageUpscaleEnhancer = lazy(() => import('./tools/ImageUpscaleEnhancer'));
const ImageGenerator = lazy(() => import('./tools/ImageGenerator'));
const ImageFormatConverter = lazy(() => import('./tools/ImageFormatConverter'));
const RobotsTxtTester = lazy(() => import('./tools/RobotsTxtTester'));
const JsonPathFinder = lazy(() => import('./tools/JsonPathFinder'));
const RegexExplainer = lazy(() => import('./tools/RegexExplainer'));
const CronExpressionGenerator = lazy(() => import('./tools/CronExpressionGenerator'));
const RedirectChainChecker = lazy(() => import('./tools/RedirectChainChecker'));
const SnapchatTagGenerator = lazy(() => import('./tools/SnapchatTagGenerator'));
const InvisibleTextSuite = lazy(() => import('./tools/InvisibleTextSuite'));
const AITextSuite = lazy(() => import('./tools/AITextSuite'));
const TextToListConverter = lazy(() => import('./tools/TextToListConverter'));
const RemoveSpecialCharacters = lazy(() => import('./tools/RemoveSpecialCharacters'));
const WordCounterPage = lazy(() => import('./tools/WordCounterPage'));
const ImageSizeReducer = lazy(() => import('./tools/generated/image-size-reducer'));
const YouTubeToolsHub = lazy(() => import('./tools/YouTubeToolsHub'));
const YouTubeAnalyzer = lazy(() => import('./tools/YouTubeAnalyzer'));

export default function ToolDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [tool, setTool] = useState<Tool | null>(null);
  const { t } = useLanguage();
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);

  // Lazy load SEO metadata
  const [seoModule, setSeoModule] = useState<any>(null);

  useEffect(() => {
    import('../data/seo').then((m) => setSeoModule(m)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (slug) {
      const foundTool = ALL_TOOLS.find((t) => t.slug === slug);
      setTool(foundTool || null);
    }
  }, [slug]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!tool) return;
      try {
        const blogs = await getBlogs();
        // Get up to 3 related blogs
        const related = getRelatedBlogs(tool.slug, blogs, 3);
        // If we don't have enough related blogs, pad with the latest blog posts so that we always have active links
        if (related.length < 3) {
          const remaining = blogs
            .filter(b => !related.some(r => r.id === b.id))
            .slice(0, 3 - related.length);
          setRelatedBlogs([...related, ...remaining]);
        } else {
          setRelatedBlogs(related);
        }
      } catch (err) {
        console.error('Failed to load related blogs:', err);
      }
    };
    fetchRelatedBlogs();
  }, [tool]);

  if (!tool) {
    return (
      <div className="min-height-[70vh] flex flex-col items-center justify-center p-8 text-center bg-[#0c0c12]">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h1 className="text-2xl font-black text-white mb-2">Tool Not Found</h1>
        <p className="text-sm text-zinc-400 mb-6 max-w-md">
          The tool you are looking for might have been moved or doesn't exist.
        </p>
        <Link to="/" className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  // Render the appropriate subcomponent dynamically
  const renderToolComponent = () => {
    switch (tool.id) {
      case 'face-swap': return <FaceSwap />;
      case 'bg-remover': return <BackgroundRemover />;
      case 'enhancer': return <Navigate to="/tools/image-upscaler-enhancer?mode=enhance" replace />;
      case 'compressor': return <ImageCompressor />;
      case 'image-upscale': return <Navigate to="/tools/image-upscaler-enhancer?mode=upscale" replace />;
      case 'image-upscaler-enhancer': return <ImageUpscaleEnhancer />;
      case 'image-generator': return <ImageGenerator />;
      case 'image-format-converter': return <ImageFormatConverter />;
      case 'robots-txt-tester': return <RobotsTxtTester />;
      case 'json-path-finder': return <JsonPathFinder />;
      case 'regex-explainer': return <RegexExplainer />;
      case 'cron-expression-generator': return <CronExpressionGenerator />;
      case 'redirect-chain-checker': return <RedirectChainChecker />;
      case 'snapchat-tag-generator': return <SnapchatTagGenerator />;
      case 'invisible-text-suite': return <InvisibleTextSuite />;
      case 'ai-text-suite': return <AITextSuite />;
      case 'text-to-list-converter': return <TextToListConverter />;
      case 'remove-special-characters': return <RemoveSpecialCharacters />;
      case 'word-counter': return <WordCounterPage />;
      case 'image-size-reducer': return <ImageSizeReducer />;
      case 'youtube-tools-hub': return <YouTubeToolsHub />;
      case 'youtube-analyzer': return <YouTubeAnalyzer />;
      default:
        // Render corresponding Category Hub dynamically with activeToolId passed as prop
        switch (tool.category) {
          case 'cleaning': return <TextCleaningHub activeToolId={tool.id} />;
          case 'converter': return <TextConverterHub activeToolId={tool.id} />;
          case 'analysis': return <TextAnalysisHub activeToolId={tool.id} />;
          case 'utility': return <TextUtilityHub activeToolId={tool.id} />;
          case 'pdf': return <PDFToolWorkspace toolId={tool.id} toolName={tool.name} />;
          case 'generator': return <GeneratorsHub activeToolId={tool.id} />;
          default:
            return (
              <div className="p-8 text-center bg-zinc-900 border border-zinc-800 rounded-2xl">
                <Wrench className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-lg font-black text-white mb-1">Standard Workspace</h3>
                <p className="text-zinc-400 text-xs mb-4">This tool loads within our advanced processing mainframe.</p>
              </div>
            );
        }
    }
  };

  // Find related tools (First same category, then pad with other popular tools to ensure perfect interlinking)
  const categoryRelated = ALL_TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id);
  const otherRelated = ALL_TOOLS.filter((t) => t.category !== tool.category && t.id !== tool.id);
  const relatedTools = [...categoryRelated, ...otherRelated].slice(0, 4);

  // Dynamic SEO meta attributes
  const seoData = seoModule ? seoModule.getSEOData(tool.id) : null;
  const siteTitle = seoData?.title || `${tool.name.split(' – ')[0]} – 100% Free & Fast Online Tool | Texly`;
  const siteDescription = seoData?.metaDescription || `Free online ${tool.name.toLowerCase()}. ${tool.description} Fast, secure, completely private browser-based tool.`;
  const keywords = seoData?.benefits || ['free text tools', tool.name.toLowerCase(), 'online offline converter'];

  // Retrieve dynamic JSON-LD structured schemas
  let schema: any = null;
  if (seoModule) {
    schema = seoModule.getJSONLD(
      tool.name.split(' – ')[0] || tool.name,
      tool.slug,
      tool.primaryKeyword || tool.name.toLowerCase(),
      t
    );
  }

  // Guard to prevent rendering the AIToolSEOContent twice
  const ALREADY_RENDERS_SEO = new Set([
    'face-swap', 'bg-remover', 'enhancer', 'image-upscale', 'compressor', 'snapchat-tag-generator'
  ]);
  const shouldRenderSEOGuide = !ALREADY_RENDERS_SEO.has(tool.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0c0c12] text-slate-800 dark:text-zinc-100 pb-16 transition-colors duration-300">
      <SEO 
        title={siteTitle}
        description={siteDescription}
        keywords={keywords}
        schema={schema}
        canonical={`/tool/${tool.slug}`}
      />

      {/* Hero Header */}
      <header className="border-b border-slate-200 dark:border-zinc-800/50 bg-white/60 dark:bg-[#0e0e16]/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>All Tools</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span className="text-[10px] uppercase font-black tracking-widest text-cyan-600 dark:text-cyan-400 px-2 py-0.5 bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/30 rounded-full">
              {tool.category === 'ai' ? 'AI Accelerated' : 'Client Safe'}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        {/* Tool Page Title area */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {tool.name.split(' – ')[0] || tool.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            {tool.description}
          </p>
        </div>

        {/* Spot 1: Top Responsive Banner */}
        <div className="mb-6">
          <AdPlaceholder slot="Sponsored Ad" format="auto" />
        </div>

        {/* Dynamic Tool Playground area */}
        <div className="mb-12">
          <Suspense fallback={
            <div className="min-h-[30vh] flex items-center justify-center bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-900 rounded-2xl">
              <div className="w-10 h-10 border-2 border-cyan-500/10 border-t-cyan-500 dark:border-t-cyan-400 rounded-full animate-spin" />
            </div>
          }>
            {renderToolComponent()}
          </Suspense>
        </div>

        {/* Spot 1.5: 160x300 Vertical Banner Ad (exactly below the tool buttons and inputs) */}
        <div className="my-8">
          <AdPlaceholder slot="Featured Sponsor" format="160x300" />
        </div>

        {/* Spot 2: Square Rectangle Banner Ad */}
        <div className="my-8">
          <AdPlaceholder slot="Advertisement" format="300x250" />
        </div>

        {/* Dynamic detailed SEO article/guides with schema validation */}
        {shouldRenderSEOGuide && (
          <div className="mb-12 border-t border-slate-200 dark:border-zinc-900 pt-12">
            <AIToolSEOContent toolId={tool.id} />
          </div>
        )}

        {/* Spot 3: Native Recommendation Widget */}
        <div className="my-8">
          <AdPlaceholder slot="Recommended Content" format="native" />
        </div>

        {/* Rating & Comments */}
        <div className="mb-12 border-t border-slate-200 dark:border-zinc-900 pt-12 space-y-6">
          <RatingSystem toolId={tool.id} theme={{ border: 'slate-200' }} />
          <CommentSection targetId={tool.id} targetType="tool" theme={{ border: 'slate-200' }} />
        </div>

        {/* Related Articles & Guides section */}
        {relatedBlogs.length > 0 && (
          <section className="border-t border-slate-200 dark:border-zinc-900 pt-12 mb-12">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Related Articles & Guides
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedBlogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.slug}`}
                  className="group relative flex flex-col h-full bg-white dark:bg-[#0e0e16] hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-200 dark:border-zinc-900/25 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-zinc-950">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[10px] font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-2 block">
                      {blog.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-grow">
                      {blog.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sister tools / Related items section */}
        {relatedTools.length > 0 && (
          <section className="border-t border-slate-200 dark:border-zinc-900 pt-12">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-cyan-600 dark:text-cyan-400" /> Related Sister Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedTools.map((t) => (
                <Link
                  key={t.id}
                  to={`/tool/${t.slug}`}
                  className="p-5 bg-white dark:bg-[#0e0e16] hover:bg-slate-100 dark:hover:bg-zinc-900/60 border border-slate-200 dark:border-zinc-900/25 rounded-2xl transition-all hover:-translate-y-1 group"
                >
                  <p className="text-sm font-black text-slate-800 dark:text-zinc-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-1.5">
                    {t.name.split(' – ')[0] || t.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-550 line-clamp-2 leading-relaxed">
                    {t.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
export type { Tool };
