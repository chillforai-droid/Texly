import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Youtube,
  Search,
  TrendingUp,
  Eye,
  ThumbsUp,
  MessageSquare,
  Users,
  Zap,
  Sparkles,
  BarChart3,
  Hash,
  Clock,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Target,
  Lightbulb,
  Film,
  Star,
  ArrowRight,
  Copy,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';
import SocialShare from '../../components/SocialShare';
import RatingSystem from '../../components/RatingSystem';
import CommentSection from '../../components/CommentSection';
import YouTubeAnalyzerSEORichContent from '../../components/seo/YouTubeAnalyzerSEORichContent';

const API_KEY = (import.meta.env.VITE_YOUTUBE_API_KEY as string) || '';

// ─── Types ────────────────────────────────────────────────────────────────────
interface VideoData {
  id: string;
  title: string;
  views: number;
  likes: number;
  comments: number;
  publishedAt: string;
  duration: string;
  thumbnail: string;
  description: string;
  tags: string[];
  engagementRate: number;
}

interface ChannelData {
  id: string;
  name: string;
  subscribers: number;
  totalViews: number;
  totalVideos: number;
  description: string;
  thumbnail: string;
  country: string;
  createdAt: string;
  videos: VideoData[];
}

interface AIInsight {
  topKeywords: { keyword: string; score: number; competition: string }[];
  viralTips: string[];
  contentStrategy: string[];
  bestUploadTime: string;
  recommendedDuration: string;
  titleFormulas: string[];
  thumbnailTips: string[];
  categoryInsights: string;
  overallScore: number;
  channelStrengths: string[];
  improvements: string[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const extractChannelId = (url: string): string | null => {
  url = url.trim();
  url = url.split('?')[0];
  url = url.replace(/\/+$/, '');

  const patterns = [
    /youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})/,
    /youtube\.com\/@([a-zA-Z0-9_.-]+)/,
    /youtube\.com\/user\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/c\/([a-zA-Z0-9_-]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) {
      const parts = m[1].split('/');
      return parts[0];
    }
  }
  if (/^UC[a-zA-Z0-9_-]{22}$/.test(url)) return url;
  if (/^@/.test(url)) return url.slice(1);
  return url || null;
};

const formatNum = (n: number): string => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K';
  return n.toString();
};

const durationToSeconds = (iso: string): number => {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+(m[1] || 0)) * 3600 + (+(m[2] || 0)) * 60 + +(m[3] || 0);
};

const secondsToReadable = (s: number): string => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

// ─── API Calls ────────────────────────────────────────────────────────────────
async function fetchChannelData(input: string): Promise<ChannelData> {
  const identifier = extractChannelId(input) || input.trim();

  let channelId = identifier;

  // Handle @handle or username → resolve to channelId
  if (!identifier.startsWith('UC')) {
    const handleParam = identifier.startsWith('@') ? identifier : `@${identifier}`;
    const searchRes = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(handleParam)}&maxResults=1&key=${API_KEY}`
    );
    const searchData = await searchRes.json();
    if (searchData.error) throw new Error(searchData.error.message);
    const item = searchData.items?.[0];
    if (!item) throw new Error('Channel not found. Please check the URL or handle.');
    channelId = item.snippet.channelId;
  }

  // Fetch channel stats
  const chanRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,brandingSettings&id=${channelId}&key=${API_KEY}`
  );
  const chanData = await chanRes.json();
  if (chanData.error) throw new Error(chanData.error.message);
  const chan = chanData.items?.[0];
  if (!chan) throw new Error('Channel not found. Please verify the channel URL.');

  const snippet = chan.snippet;
  const stats = chan.statistics;

  // Fetch recent videos (up to 20)
  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=20&key=${API_KEY}`
  );
  const videosData = await videosRes.json();
  const videoItems = videosData.items || [];
  const videoIds = videoItems.map((v: any) => v.id.videoId).join(',');

  let videos: VideoData[] = [];

  if (videoIds) {
    // Fetch video details
    const detailsRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoIds}&key=${API_KEY}`
    );
    const detailsData = await detailsRes.json();

    videos = (detailsData.items || []).map((v: any): VideoData => {
      const vs = v.statistics;
      const views = +(vs.viewCount || 0);
      const likes = +(vs.likeCount || 0);
      const comments = +(vs.commentCount || 0);
      const subs = +(stats.subscriberCount || 1);
      const engagement = views > 0 ? ((likes + comments) / views) * 100 : 0;
      const dur = durationToSeconds(v.contentDetails.duration || 'PT0S');

      return {
        id: v.id,
        title: v.snippet.title,
        views,
        likes,
        comments,
        publishedAt: v.snippet.publishedAt,
        duration: secondsToReadable(dur),
        thumbnail: v.snippet.thumbnails?.medium?.url || '',
        description: v.snippet.description || '',
        tags: v.snippet.tags || [],
        engagementRate: parseFloat(engagement.toFixed(2)),
      };
    });
  }

  return {
    id: channelId,
    name: snippet.title,
    subscribers: +(stats.subscriberCount || 0),
    totalViews: +(stats.viewCount || 0),
    totalVideos: +(stats.videoCount || 0),
    description: snippet.description || '',
    thumbnail: snippet.thumbnails?.medium?.url || '',
    country: snippet.country || 'N/A',
    createdAt: snippet.publishedAt,
    videos,
  };
}

async function fetchAIInsights(channel: ChannelData): Promise<AIInsight> {
  const topVideos = [...channel.videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  const allTags = channel.videos.flatMap(v => v.tags);
  const tagFreq: Record<string, number> = {};
  allTags.forEach(t => { tagFreq[t] = (tagFreq[t] || 0) + 1; });

  const avgViews = channel.videos.length
    ? Math.round(channel.videos.reduce((s, v) => s + v.views, 0) / channel.videos.length)
    : 0;
  const avgEngagement = channel.videos.length
    ? (channel.videos.reduce((s, v) => s + v.engagementRate, 0) / channel.videos.length).toFixed(2)
    : '0';

  const prompt = `You are a YouTube growth expert and SEO strategist. Analyze this YouTube channel data and give ACTIONABLE, SPECIFIC insights.

CHANNEL: "${channel.name}"
Subscribers: ${formatNum(channel.subscribers)}
Total Views: ${formatNum(channel.totalViews)}
Total Videos: ${channel.totalVideos}
Country: ${channel.country}
Average Views per Video: ${formatNum(avgViews)}
Average Engagement Rate: ${avgEngagement}%

TOP 5 PERFORMING VIDEOS:
${topVideos.map((v, i) => `${i + 1}. "${v.title}" — ${formatNum(v.views)} views, ${v.engagementRate}% engagement`).join('\n')}

ALL RECENT VIDEO TITLES:
${channel.videos.slice(0, 10).map(v => `- "${v.title}"`).join('\n')}

TOP TAGS USED:
${Object.entries(tagFreq).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([t,c])=>`${t}(${c}x)`).join(', ')}

Respond ONLY with a valid JSON object (no markdown, no backticks, no explanation) with this exact structure:
{
  "topKeywords": [
    {"keyword": "keyword phrase", "score": 85, "competition": "Low/Medium/High"},
    ... (give 8 keywords)
  ],
  "viralTips": ["specific tip 1", "specific tip 2", "specific tip 3", "specific tip 4", "specific tip 5"],
  "contentStrategy": ["strategy 1", "strategy 2", "strategy 3", "strategy 4"],
  "bestUploadTime": "e.g. Tuesday & Thursday, 6–8 PM IST",
  "recommendedDuration": "e.g. 8–12 minutes",
  "titleFormulas": ["formula 1 with example", "formula 2 with example", "formula 3 with example"],
  "thumbnailTips": ["tip 1", "tip 2", "tip 3"],
  "categoryInsights": "2-3 sentence analysis of what content category/niche works best for this channel",
  "overallScore": 72,
  "channelStrengths": ["strength 1", "strength 2", "strength 3"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}`;

  const res = await fetch('/api/ai/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      toolId: 'custom',
      input: prompt,
      systemPrompt: 'You are a YouTube growth expert and SEO strategist. Return ONLY a valid JSON object matching the requested schema. Do not include any markdown styling, backticks (```), or explanations.'
    }),
  });

  const data = await res.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to analyze channel insights');
  }
  const text = data.result || '';
  const clean = text.replace(/```json|```/g, '').replace(/```/g, '').trim();
  return JSON.parse(clean) as AIInsight;
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) => (
  <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
    </div>
  </div>
);

const ScoreMeter = ({ score }: { score: number }) => {
  const color = score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444';
  const label = score >= 70 ? 'Strong Channel' : score >= 40 ? 'Growing Channel' : 'Needs Work';
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Channel Score</p>
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" className="dark:stroke-slate-800" />
          <circle
            cx="50" cy="50" r="40" fill="none"
            stroke={color} strokeWidth="10"
            strokeDasharray={`${score * 2.51} 251`}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-900 dark:text-white">{score}</span>
          <span className="text-xs text-slate-400">/100</span>
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color }}>{label}</span>
    </div>
  );
};

const KeywordBadge = ({ keyword, score, competition }: { keyword: string; score: number; competition: string }) => {
  const compColor = competition === 'Low' ? 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400'
    : competition === 'Medium' ? 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-400'
    : 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400';
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
        <Hash className="w-4 h-4 text-red-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">{keyword}</span>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${compColor}`}>{competition}</span>
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 rounded-full" style={{ width: `${score}%` }} />
        </div>
        <span className="text-xs font-bold text-slate-500 w-6 text-right">{score}</span>
        <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity p-1">
          {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
        </button>
      </div>
    </div>
  );
};

const VideoCard = ({ video }: { video: VideoData }) => (
  <div className="flex gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors">
    <div className="relative flex-shrink-0">
      <img src={video.thumbnail} alt={video.title} className="w-24 h-14 rounded-lg object-cover bg-slate-200 dark:bg-slate-700" />
      <span className="absolute bottom-1 right-1 text-xs bg-black/80 text-white rounded px-1 font-mono">{video.duration}</span>
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug mb-1">{video.title}</p>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatNum(video.views)}</span>
        <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" />{formatNum(video.likes)}</span>
        <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">{video.engagementRate}%</span>
      </div>
    </div>
  </div>
);

const Section = ({ title, icon: Icon, color, children }: {
  title: string; icon: React.ElementType; color: string; children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
            <Icon className="w-4 h-4" />
          </div>
          <span className="font-black text-slate-900 dark:text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const YouTubeAnalyzer: React.FC = () => {
  const [channelInput, setChannelInput] = useState('');
  const [loadingChannel, setLoadingChannel] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const [channel, setChannel] = useState<ChannelData | null>(null);
  const [insights, setInsights] = useState<AIInsight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'strategy' | 'videos'>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!channelInput.trim()) { setError('Please enter a YouTube channel URL or handle.'); return; }
    if (!API_KEY) {
      setError('YouTube API key is missing. Please contact administrator or configure VITE_YOUTUBE_API_KEY.');
      return;
    }

    setError(null);
    setChannel(null);
    setInsights(null);
    setLoadingChannel(true);

    try {
      const data = await fetchChannelData(channelInput);
      setChannel(data);
      setLoadingChannel(false);
      setLoadingAI(true);
      const ai = await fetchAIInsights(data);
      setInsights(ai);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Please check your channel URL/handle or try again later.');
    } finally {
      setLoadingChannel(false);
      setLoadingAI(false);
    }
  }, [channelInput]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'keywords', label: 'Keywords', icon: Hash },
    { id: 'strategy', label: 'AI Strategy', icon: Sparkles },
    { id: 'videos', label: 'Videos', icon: Film },
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12 transition-colors duration-300">
      <Helmet>
        <title>YouTube Channel Analyzer — AI-Powered Growth & Keyword Strategy | Texly</title>
        <meta name="description" content="Analyze any YouTube channel with AI. Get viral keyword opportunities, content strategy, upload time recommendations, title formulas, and growth insights — free." />
        <link rel="canonical" href="https://www.texlyonline.in/tools/youtube-analyzer" />
        <meta property="og:url" content="https://www.texlyonline.in/tools/youtube-analyzer" />
        <meta property="og:title" content="YouTube Channel Analyzer — AI Growth & Keyword Strategy | Texly" />
        <meta property="og:description" content="Analyze any YouTube channel with AI. Get viral keywords, content strategy, and growth insights — free." />
        <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ── */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold mb-6 border border-red-500/20">
            <Youtube className="w-4 h-4" />
            <span>AI-POWERED YOUTUBE ANALYTICS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            YouTube Channel{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">
              Analyzer
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            Paste any YouTube channel link → Get AI-powered keywords, viral strategies, content tips and detailed analytics.
          </p>
        </div>

        {/* ── Input Card ── */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none mb-8">
          <div className="space-y-5">

            {/* Channel URL */}
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                YouTube Channel URL or Handle
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  <input
                    type="text"
                    value={channelInput}
                    onChange={e => setChannelInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleAnalyze()}
                    placeholder="https://youtube.com/@channelname  or  @handle"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-red-500 outline-none transition-all text-slate-900 dark:text-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
              </div>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={loadingChannel || loadingAI}
              className="w-full py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-red-500/25 text-lg"
            >
              {loadingChannel ? (
                <><RefreshCw className="w-5 h-5 animate-spin" /> Channel data fetch हो रही है...</>
              ) : loadingAI ? (
                <><Sparkles className="w-5 h-5 animate-pulse" /> AI Analysis चल रही है...</>
              ) : (
                <><Search className="w-5 h-5" /> Channel Analyze करें</>
              )}
            </button>
          </div>
        </div>

        {/* ── Loading State ── */}
        {(loadingChannel || loadingAI) && (
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 border border-slate-200 dark:border-slate-800 text-center mb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
                {loadingChannel
                  ? <Youtube className="w-8 h-8 text-red-500 animate-pulse" />
                  : <Sparkles className="w-8 h-8 text-red-500 animate-pulse" />}
              </div>
              <div>
                <p className="text-lg font-black text-slate-900 dark:text-white">
                  {loadingChannel ? 'YouTube Data Fetch हो रही है...' : 'AI Analysis Generate हो रही है...'}
                </p>
                <p className="text-sm text-slate-500 mt-1">
                  {loadingChannel ? 'Channel stats और recent videos load हो रहे हैं' : 'Keywords, strategies और growth tips तैयार हो रहे हैं'}
                </p>
              </div>
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Results ── */}
        {channel && (
          <>
            {/* Channel Header */}
            <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-[2rem] p-6 mb-8 text-white">
              <div className="flex items-center gap-4">
                <img
                  src={channel.thumbnail}
                  alt={channel.name}
                  className="w-20 h-20 rounded-full border-4 border-white/30 flex-shrink-0"
                />
                <div className="min-w-0">
                  <h2 className="text-2xl font-black truncate">{channel.name}</h2>
                  <p className="text-red-100 text-sm mt-1 line-clamp-2">{channel.description.slice(0, 120)}{channel.description.length > 120 ? '...' : ''}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm font-bold text-red-100">
                    <span>🌍 {channel.country}</span>
                    <span>📅 {new Date(channel.createdAt).getFullYear()} से</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={Users} label="Subscribers" value={formatNum(channel.subscribers)} color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" />
              <StatCard icon={Eye} label="Total Views" value={formatNum(channel.totalViews)} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
              <StatCard icon={PlayCircle} label="Total Videos" value={formatNum(channel.totalVideos)} color="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" />
              <StatCard
                icon={TrendingUp}
                label="Avg. Views/Video"
                value={channel.videos.length ? formatNum(Math.round(channel.videos.reduce((s,v)=>s+v.views,0)/channel.videos.length)) : 'N/A'}
                color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
              />
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-red-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.id === 'strategy' && !insights && loadingAI && (
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">

              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 space-y-4">
                    {insights && (
                      <>
                        <Section title="Channel Strengths" icon={Star} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                          <ul className="space-y-2 mt-1">
                            {insights.channelStrengths.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </Section>
                        <Section title="What Improve करें" icon={Target} color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                          <ul className="space-y-2 mt-1">
                            {insights.improvements.map((s, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                                <ArrowRight className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </Section>
                        <Section title="Niche Analysis" icon={Lightbulb} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mt-1">{insights.categoryInsights}</p>
                          <div className="flex gap-4 mt-4 flex-wrap">
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <div>
                                <p className="text-xs text-slate-500 font-bold">Best Upload Time</p>
                                <p className="text-sm font-black text-slate-900 dark:text-white">{insights.bestUploadTime}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl">
                              <Film className="w-4 h-4 text-purple-500" />
                              <div>
                                <p className="text-xs text-slate-500 font-bold">Ideal Duration</p>
                                <p className="text-sm font-black text-slate-900 dark:text-white">{insights.recommendedDuration}</p>
                              </div>
                            </div>
                          </div>
                        </Section>
                      </>
                    )}
                    {!insights && !loadingAI && (
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 text-center text-slate-500">
                        <Sparkles className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                        <p className="text-sm">AI insights load हो रही हैं...</p>
                      </div>
                    )}
                  </div>

                  <div>
                    {insights && <ScoreMeter score={insights.overallScore} />}
                  </div>
                </div>
              )}

              {/* KEYWORDS TAB */}
              {activeTab === 'keywords' && (
                <div className="space-y-4">
                  {insights ? (
                    <>
                      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-4">
                          <Hash className="w-5 h-5 text-red-500" />
                          <h3 className="font-black text-slate-900 dark:text-white">Viral Keyword Opportunities</h3>
                          <span className="ml-auto text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Score = Viral Potential</span>
                        </div>
                        <div className="space-y-2">
                          {insights.topKeywords.map((kw, i) => (
                            <KeywordBadge key={i} {...kw} />
                          ))}
                        </div>
                      </div>

                      <Section title="Title Formulas जो Viral होते हैं" icon={Zap} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <div className="space-y-3 mt-1">
                          {insights.titleFormulas.map((f, i) => (
                            <div key={i} className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-200/50 dark:border-yellow-800/50">
                              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{f}</p>
                            </div>
                          ))}
                        </div>
                      </Section>

                      <Section title="Thumbnail Tips" icon={Target} color="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400">
                        <ul className="space-y-2 mt-1">
                          {insights.thumbnailTips.map((t, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                              <Star className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </Section>
                    </>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-slate-200 dark:border-slate-800 text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-red-400 animate-pulse" />
                      <p className="text-slate-500 text-sm">AI Keywords generate हो रहे हैं...</p>
                    </div>
                  )}
                </div>
              )}

              {/* STRATEGY TAB */}
              {activeTab === 'strategy' && (
                <div className="space-y-4">
                  {insights ? (
                    <>
                      <Section title="Video Viral करने के Tips" icon={TrendingUp} color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        <ul className="space-y-3 mt-1">
                          {insights.viralTips.map((tip, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <span className="w-6 h-6 rounded-full bg-red-500 text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{tip}</p>
                            </li>
                          ))}
                        </ul>
                      </Section>

                      <Section title="Content Strategy" icon={Lightbulb} color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <ul className="space-y-3 mt-1">
                          {insights.contentStrategy.map((s, i) => (
                            <li key={i} className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                              <Sparkles className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{s}</p>
                            </li>
                          ))}
                        </ul>
                      </Section>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2 mb-3">
                            <Clock className="w-5 h-5 text-blue-500" />
                            <h3 className="font-black text-slate-900 dark:text-white text-sm">Best Upload Time</h3>
                          </div>
                          <p className="text-lg font-black text-blue-600 dark:text-blue-400">{insights.bestUploadTime}</p>
                          <p className="text-xs text-slate-500 mt-1">इस time पर upload करने से views ज्यादा मिलते हैं</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2 mb-3">
                            <Film className="w-5 h-5 text-purple-500" />
                            <h3 className="font-black text-slate-900 dark:text-white text-sm">Ideal Video Length</h3>
                          </div>
                          <p className="text-lg font-black text-purple-600 dark:text-purple-400">{insights.recommendedDuration}</p>
                          <p className="text-xs text-slate-500 mt-1">इस duration में audience सबसे ज्यादा engage रहती है</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-slate-200 dark:border-slate-800 text-center">
                      <Sparkles className="w-8 h-8 mx-auto mb-2 text-red-400 animate-pulse" />
                      <p className="text-slate-500 text-sm">AI Strategy तैयार हो रही है...</p>
                    </div>
                  )}
                </div>
              )}

              {/* VIDEOS TAB */}
              {activeTab === 'videos' && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5 text-red-500" />
                      <h3 className="font-black text-slate-900 dark:text-white">Recent Videos ({channel.videos.length})</h3>
                    </div>
                    <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">% = Engagement Rate</span>
                  </div>
                  {channel.videos.length === 0 ? (
                    <p className="text-center text-slate-500 text-sm py-8">Videos नहीं मिले।</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {channel.videos.map(v => <VideoCard key={v.id} video={v} />)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Feature cards (shown before analysis) ── */}
        {!channel && !loadingChannel && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            {[
              { icon: Hash, title: 'Keyword Analysis', desc: 'Top viral keywords जो आपकी niche में rank हो सकते हैं', color: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
              { icon: TrendingUp, title: 'Viral Strategy', desc: 'AI-backed tips किस तरह videos viral हो सकती हैं', color: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' },
              { icon: BarChart3, title: 'Channel Score', desc: 'Channel की overall health और performance rating', color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' },
              { icon: Film, title: 'Video Insights', desc: 'Recent videos की views, likes और engagement rate', color: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20' },
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${f.color}`}>
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-black text-slate-900 dark:text-white text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Rating & Share (Always Visible) */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 px-2 py-6 border-t border-b border-slate-100 dark:border-slate-800">
          <RatingSystem toolId="youtube-analyzer" theme={{ border: 'slate-200' }} />
          <SocialShare
            url={window.location.href}
            title="YouTube Channel Analyzer — AI-powered growth & keyword insights | Texly ⚡"
          />
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-6">Frequently Asked Questions (FAQ)</h2>
          <div className="space-y-4">
            {[
              {
                q: 'यह YouTube Channel Analyzer कैसे काम करता है?',
                a: 'हमारा टूल सुरक्षित रूप से आधिकारिक YouTube Data API v3 का उपयोग करके किसी भी पब्लिक चैनल का डेटा जैसे सब्सक्राइबर, व्यूज और रीसेंट वीडियोस की जानकारी लाता है। इसके बाद, एडवांस AI मॉडल इस डेटा का विश्लेषण करके आपके चैनल के लिए वायरल कीवर्ड्स, बेस्ट पोस्टिंग टाइम और कस्टमाइज्ड ग्रोथ स्ट्रेटेजी तैयार करते हैं।'
              },
              {
                q: 'क्या मुझे इस टूल का उपयोग करने के लिए अपने YouTube अकाउंट से लॉग इन करना होगा?',
                a: 'बिल्कुल नहीं! हमारा YouTube Channel Analyzer पूरी तरह से सुरक्षित है। आपको अपना पासवर्ड या कोई पर्सनल क्रेडेंशियल साझा करने या लॉगिन करने की आवश्यकता नहीं है। बस किसी भी चैनल का लिंक या हैंडल दर्ज करें और तुरंत एनालिसिस प्राप्त करें।'
              },
              {
                q: 'क्या मैं किसी भी YouTube चैनल का विश्लेषण कर सकता हूँ?',
                a: 'हाँ, आप किसी भी सार्वजनिक (public) YouTube चैनल का विश्लेषण कर सकते हैं—चाहे वह आपका अपना हो, या आपके किसी पसंदीदा क्रिएटर या प्रतिस्पर्धी (competitor) का। यह आपके प्रतिस्पर्धियों की रणनीतियों को समझने के लिए एक बेहतरीन टूल है।'
              },
              {
                q: 'यह टूल किन मुख्य मैट्रिक्स का विश्लेषण करता है?',
                a: 'यह टूल चैनल के सब्सक्राइबर-टू-व्यू रेशियो, हालिया वीडियोस के लिए एवरेज एंगेजमेंट रेट (लाइक्स और कमेंट्स), वीडियो अपलोड फ्रीक्वेंसी, हैशटैग्स और कीवर्ड्स डेंसिटी, तथा वीडियो ड्यूरेशन का डिटेल एनालिसिस करता है।'
              },
              {
                q: 'क्या यह सेवा पूरी तरह से फ्री है?',
                a: 'हाँ, Texly का YouTube Channel Analyzer पूरी तरह से मुफ़्त है। इसके उपयोग की कोई छिपी हुई फीस या सीमा नहीं है।'
              }
            ].map((faq, i) => (
              <div key={i} className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left text-sm sm:text-base font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800 transition-colors"
                  aria-expanded={openFaq === i}
                >
                   <span>{faq.q}</span>
                   {openFaq === i ? (
                     <ChevronUp className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                   ) : (
                     <ChevronDown className="w-5 h-5 flex-shrink-0 text-slate-500 dark:text-slate-400" />
                   )}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100/50 dark:border-slate-800 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO & Comments Section */}
        <div className="mt-12">
          <YouTubeAnalyzerSEORichContent />
          <CommentSection targetId="youtube-analyzer" targetType="tool" theme={{ border: 'slate-200' }} />
        </div>
      </div>
    </div>
  );
};

export default YouTubeAnalyzer;
