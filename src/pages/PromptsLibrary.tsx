import React, { useState, useEffect } from "react";
import { 
  Sparkles, Search, Copy, Check, Info, Database, Code, 
  BookOpen, Megaphone, Terminal, FileText, Briefcase, Award,
  ExternalLink, ListFilter, AlertCircle, RefreshCw, ChevronDown, ChevronUp,
  Youtube, Play
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "../lib/supabase";

// Category structure for the prompts library
interface PromptCategory {
  id: string;
  nameEn: string;
  nameHi: string;
  icon: React.ReactNode;
}

const CATEGORIES: PromptCategory[] = [
  { id: "all", nameEn: "All", nameHi: "सभी", icon: <ListFilter className="w-4 h-4" /> },
  { id: "writing", nameEn: "Writing & Content", nameHi: "लेखन और सामग्री", icon: <BookOpen className="w-4 h-4 text-amber-500" /> },
  { id: "coding", nameEn: "Programming & Code", nameHi: "कोडिंग और प्रोग्रामिंग", icon: <Code className="w-4 h-4 text-blue-500" /> },
  { id: "marketing", nameEn: "Marketing & SEO", nameHi: "मार्केटिंग और एसईओ", icon: <Megaphone className="w-4 h-4 text-emerald-500" /> },
  { id: "business", nameEn: "Business & Productivity", nameHi: "व्यापार और उत्पादकता", icon: <Briefcase className="w-4 h-4 text-purple-500" /> },
  { id: "design", nameEn: "Design & Creative", nameHi: "क्रिएटिव और डिजाइन", icon: <Sparkles className="w-4 h-4 text-pink-500" /> }
];

interface AIPrompt {
  id: string;
  title: string;
  description: string;
  prompt_text: string;
  category: string;
  tags?: string[];
  created_at?: string;
  youtube_url?: string;
}

// Helper to extract embeddable YouTube URL
function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url) return null;
  
  // Regular expressions to match standard YouTube video IDs
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  // Handle YouTube Shorts
  const shortsRegExp = /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/;
  const shortsMatch = url.match(shortsRegExp);
  if (shortsMatch && shortsMatch[1]) {
    return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  }

  return null;
}

// Excellent, curated default local prompts to showcase immediate premium value
const DEFAULT_PROMPTS: AIPrompt[] = [
  {
    id: "def-writing-1",
    title: "Viral Blog Post Intro Generator",
    description: "Generates an engaging, hook-based introduction for any topic using the PAS (Problem-Agitate-Solve) copywriting framework.",
    prompt_text: "Act as an expert copywriter. Write a compelling blog post introduction on '[TOPIC]'. Use the PAS (Problem-Agitate-Solve) framework: start by highlighting a frustrating pain point the reader experiences, agitate that feeling so they want a solution, and then introduce my blog post as the ultimate solution. Keep it highly engaging, conversational, and under 150 words.",
    category: "writing",
    tags: ["blogging", "writing", "pas-framework"]
  },
  {
    id: "def-writing-2",
    title: "Rewrite Content with High Clarity",
    description: "Simplifies any complex text, making it clear, engaging, and easy to understand for beginners.",
    prompt_text: "Rewrite the following text to make it extremely clear, easy to read, and engaging. Maintain the original core message but simplify any complex jargon or long sentences. Use short paragraphs and active voice:\n\n\"[PASTE YOUR TEXT HERE]\"",
    category: "writing",
    tags: ["editing", "clarity", "simplifier"]
  },
  {
    id: "def-coding-1",
    title: "React Component Optimizer",
    description: "Analyzes React code to identify rendering bottlenecks, unused imports, or state issues, and provides an optimized version.",
    prompt_text: "Analyze the following React functional component for performance issues, redundant re-renders, or bad practices. Explain the issues you find in simple terms, and then provide an optimized, refactored version of the component using modern React hooks:\n\n```tsx\n[PASTE REACT COMPONENT HERE]\n```",
    category: "coding",
    tags: ["react", "performance", "clean-code"]
  },
  {
    id: "def-coding-2",
    title: "Explain Complex Code Like I'm Five",
    description: "Breaks down complex code blocks, algorithms, or system architectures into simple analogies.",
    prompt_text: "Act as a patient senior developer. Explain exactly what this code does in plain English. Use simple, everyday analogies so a beginner can understand it easily:\n\n```[LANGUAGE]\n[PASTE CODE HERE]\n```",
    category: "coding",
    tags: ["explanation", "learning", "debugging"]
  },
  {
    id: "def-marketing-1",
    title: "SEO Meta Title & Description Creator",
    description: "Generates 5 high-CTR meta titles and meta descriptions optimized for Google search results.",
    prompt_text: "Act as an SEO expert. Generate 5 unique variations of meta titles (under 60 characters) and meta descriptions (under 155 characters) for a webpage about '[TOPIC]'. Ensure they contain the primary keyword '[KEYWORD]', trigger emotional curiosity, have a clear call-to-action (CTA), and are structured to maximize organic click-through rate (CTR).",
    category: "marketing",
    tags: ["seo", "meta-tags", "ctr"]
  },
  {
    id: "def-marketing-2",
    title: "High-Converting Facebook / Instagram Ad Copy",
    description: "Drafts attention-grabbing social media advertisement copy designed to drive product sales or signups.",
    prompt_text: "Write high-converting Facebook ad copy for our product: '[PRODUCT/SERVICE DESCRIPTION]'. Target audience: [TARGET AUDIENCE]. Use the AIDA framework (Attention, Interest, Desire, Action). Include an eye-catching hook, bullet points of key benefits, a strong call-to-action with urgency, and 3 relevant emojis.",
    category: "marketing",
    tags: ["ads", "social-media", "facebook"]
  },
  {
    id: "def-business-1",
    title: "Professional Email Polisher & Tone Adjuster",
    description: "Transforms rough, casual drafts or angry messages into polite, assertive, and professional business communication.",
    prompt_text: "Convert this rough draft email into a highly professional, polite, and persuasive business message. Ensure the tone is warm but assertive, clear on next steps, and completely free of passive-aggressive phrasing:\n\nDraft:\n\"[PASTE DRAFT HERE]\"",
    category: "business",
    tags: ["email", "productivity", "professional"]
  },
  {
    id: "def-business-2",
    title: "SaaS Product Feature Prioritization Matrix",
    description: "Creates a structured evaluation model for feature requests based on effort vs. impact.",
    prompt_text: "Help me prioritize a list of features for my SaaS product. Here is the list of features: [FEATURES]. Analyze each feature using the ICE (Impact, Confidence, Ease) scoring model (scale 1-10). Provide a markdown table showing the calculated score for each feature and recommend which 3 features we should build first.",
    category: "business",
    tags: ["saas", "features", "ice-score"]
  },
  {
    id: "def-design-1",
    title: "Midjourney Cinematic Photorealistic Prompt Maker",
    description: "Creates extremely detailed, cinematic photorealistic prompt structures for AI image models.",
    prompt_text: "Generate 3 highly detailed, professional Midjourney prompts for: '[CONCEPT]'. Structure the prompts to include: subject description, cinematic lighting type (e.g., golden hour, volumetric haze), camera lens detail (e.g., 85mm, f/1.4), stylistic mood, and parameters like --ar 16:9 --v 6.0 --style raw.",
    category: "design",
    tags: ["midjourney", "images", "prompt-generation"]
  },
  {
    id: "def-design-2",
    title: "UI Design Color Palette & Aesthetic System",
    description: "Proposes modern hex-code color schemes, typography combinations, and UI styling ideas based on a theme.",
    prompt_text: "Act as a premium product designer. I am building a mobile app/website for '[APP IDEA]'. Propose 3 distinct visual aesthetic directions. For each direction, provide: 1. A name, 2. A 5-color palette (with hex codes), 3. Font recommendations (Google Fonts), and 4. A brief description of the visual mood, card borders, and overall vibe.",
    category: "design",
    tags: ["ui-ux", "colors", "aesthetic"]
  }
];

const FAQ_ITEMS = [
  {
    question: "AI Prompts Library क्या है और इसका उपयोग कैसे करें?",
    answer: "AI Prompts Library चुनिंदा, उच्च-गुणवत्ता वाले रेडी-टू-यूज़ प्रॉम्ट्स और सिस्टम निर्देशों का एक मुफ़्त संग्रह है। यहाँ से आप ChatGPT, Google Gemini, और Claude के लिए अनुकूलित प्रॉम्ट्स खोज सकते हैं, अपनी ज़रूरत के अनुसार कॉपी कर सकते हैं और सीधे किसी भी एआई चैटबॉट में पेस्ट करके सर्वश्रेष्ठ और सटीक परिणाम प्राप्त कर सकते हैं।"
  },
  {
    question: "क्या ये प्रॉम्ट्स पूरी तरह से मुफ़्त हैं?",
    answer: "हाँ, Texly AI Prompts Library पूरी तरह से मुफ़्त है और इसके उपयोग के लिए किसी लॉगिन की आवश्यकता नहीं है। आप जितने चाहें उतने प्रॉम्ट्स स्वतंत्र रूप से कॉपी और कस्टमाइज़ कर सकते हैं।"
  },
  {
    question: "क्या मैं इस प्रॉम्ट लाइब्रेरी को अपने स्थानीय डेटाबेस (Supabase) से जोड़ सकता हूँ?",
    answer: "हाँ, यह प्लेटफॉर्म लाइव Supabase इंटीग्रेशन का समर्थन करता है। यदि आप अपने कस्टम एडमिन पैनल से लाइव प्रॉम्ट्स जोड़ना चाहते हैं, तो आप हमारे सरल SQL स्कीमा का उपयोग करके डेटाबेस कनेक्ट कर सकते हैं।"
  },
  {
    question: "एक बेहतरीन AI Prompt कैसे लिखें?",
    answer: "एक कुशल प्रॉम्ट लिखने के लिए हमेशा एआई को एक विशेष भूमिका (Role) दें, आवश्यक संदर्भ (Context) प्रदान करें, सटीक कार्य (Task) बताएं, और आवश्यक सीमाएं (Constraints) तय करें। उदाहरण के लिए, 'PAS कॉपीराइटर के रूप में ब्लॉग इंट्रोडक्शन लिखें...'"
  },
  {
    question: "सिस्टम प्रॉम्प्ट्स (System Prompts) और सामान्य प्रॉम्प्ट्स में क्या अंतर है?",
    answer: "सिस्टम प्रॉम्प्ट्स एआई के लिए मौलिक नियम, व्यवहार और व्यक्तित्व निर्धारित करते हैं जो पूरी बातचीत के दौरान स्थिर रहते हैं। जबकि सामान्य प्रॉम्प्ट्स किसी विशेष कार्य या प्रश्न के उत्तर के लिए होते हैं।"
  }
];

export default function PromptsLibrary() {
  const [prompts, setPrompts] = useState<AIPrompt[]>(DEFAULT_PROMPTS);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(" "); // starts with safe search
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSupabaseSource, setIsSupabaseSource] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showSqlGuide, setShowSqlGuide] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string>("");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    // Clear initial space
    setSearchQuery("");
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    setLoading(true);
    setDbError("");
    try {
      if (supabase) {
        // Try fetching from supabase table 'texly_prompts'
        const { data, error } = await supabase
          .from("texly_prompts")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setPrompts(data);
          setIsSupabaseSource(true);
        } else {
          // If table doesn't exist or is empty, fallback to local
          setPrompts(DEFAULT_PROMPTS);
          setIsSupabaseSource(false);
          if (error) {
            console.warn("Supabase fetch returned error (using fallback local prompts):", error.message);
            // Don't show scary error to end-user, but keep it in logs
          }
        }
      } else {
        setPrompts(DEFAULT_PROMPTS);
        setIsSupabaseSource(false);
      }
    } catch (err: any) {
      console.error("Error connecting to database. Using premium offline fallback prompts.", err);
      setPrompts(DEFAULT_PROMPTS);
      setIsSupabaseSource(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // Filter prompts by search input and category select
  const filteredPrompts = prompts.filter((prompt) => {
    const matchesCategory = selectedCategory === "all" || prompt.category === selectedCategory;
    const matchesSearch = 
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.tags && prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    
    return matchesCategory && matchesSearch;
  });

  const sqlCode = `-- Run this query inside your Supabase SQL Editor
-- This will create the 'texly_prompts' table and seed it with fallback data

CREATE TABLE IF NOT EXISTS public.texly_prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  prompt_text TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.texly_prompts ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow anonymous read access" ON public.texly_prompts
  FOR SELECT TO anon USING (true);

-- Allow authenticated insert/update/delete (or admin access)
CREATE POLICY "Allow all actions to authenticated users" ON public.texly_prompts
  FOR ALL TO authenticated USING (true);

-- Insert sample prompts
INSERT INTO public.texly_prompts (title, description, prompt_text, category, tags) VALUES
('Viral Blog Post Intro Generator', 'Generates an engaging introduction using the PAS framework.', 'Act as an expert copywriter. Write a compelling blog post introduction on ''[TOPIC]''...', 'writing', ARRAY['blogging', 'copywriting']),
('React Component Optimizer', 'Analyzes React code to identify rendering bottlenecks.', 'Analyze the following React functional component...', 'coding', ARRAY['react', 'coding']);
`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Helmet>
        <title>Free AI Prompts Library — Elite System Prompts & LLM Templates | Texly</title>
        <meta name="description" content="Access our ultimate collection of free system prompts and AI templates. Design, optimize, test, structure, and copy premium prompts for ChatGPT, Gemini, and Claude instantly." />
        <meta name="keywords" content="ai prompts library, free prompt templates, system prompt designer, llm custom instructions, prompt helper, chatgpt prompt generator, system instructions builder, copy paste prompts" />
        <link rel="canonical" href="https://www.texlyonline.in/tools/ai-prompts-library" />
        
        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free AI Prompts Library — Elite System Prompts & LLM Templates | Texly" />
        <meta property="og:description" content="Access our ultimate collection of free system prompts and AI templates. Design, optimize, test, structure, and copy premium prompts for ChatGPT, Gemini, and Claude instantly." />
        <meta property="og:url" content="https://www.texlyonline.in/tools/ai-prompts-library" />
        <meta property="og:site_name" content="Texly" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free AI Prompts Library — Elite System Prompts & LLM Templates | Texly" />
        <meta name="twitter:description" content="Access our ultimate collection of free system prompts and AI templates. Design, optimize, test, structure, and copy premium prompts for ChatGPT, Gemini, and Claude instantly." />

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/10 dark:bg-violet-400/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider border border-violet-200/50 dark:border-violet-900/40">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span>AI Prompts Library</span>
          </div>

          <h1 className="text-3.5xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Free AI Prompts <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">Library</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
            कॉपी करें सबसे बेहतरीन और चुनिंदा AI Prompts जिन्हें आप ChatGPT, Gemini, या Claude में इस्तेमाल करके सबसे बेस्ट रिजल्ट्स हासिल कर सकते हैं।
          </p>
        </div>
      </div>

      {/* Main Interactive Workspace */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Search & Category Tabs Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-5">
          {/* Search Box */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="प्रॉम्ट का नाम, विवरण या कीवर्ड खोजें (e.g. React, Facebook, Email)..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all font-semibold"
            />
          </div>

          {/* Responsive Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 shrink-0 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                    isActive
                      ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-transparent shadow-md scale-[1.02]"
                      : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.nameEn}</span>
                  <span className="text-[10px] font-medium opacity-65">({cat.nameHi})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Prompts Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-violet-500" />
            <p className="text-xs font-bold tracking-widest uppercase">Fetching prompts from source...</p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-4">
            <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold">कोई प्रॉम्ट नहीं मिला!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              आपकी खोज "<strong>{searchQuery}</strong>" के लिए इस कैटेगरी में कोई प्रॉम्ट नहीं मिला। कृपया दूसरा कीवर्ड खोजें।
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="bg-violet-600 hover:bg-violet-700 text-white text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPrompts.map((item) => {
              const isCopied = copiedId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-slate-200/40 dark:border-slate-700/40">
                          {item.category}
                        </span>
                        <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {item.description}
                    </p>

                    {/* Code Box */}
                    <div className="relative bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
                      <p className="text-xs text-slate-600 dark:text-slate-300 font-mono whitespace-pre-wrap select-all break-words leading-relaxed">
                        {item.prompt_text}
                      </p>
                    </div>

                    {/* Related Video Tutorial if present */}
                    {item.youtube_url && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/50">
                        <div className="flex items-center gap-1.5 mb-2.5 text-rose-600 dark:text-rose-400">
                          <Youtube className="w-4 h-4 text-rose-500 shrink-0" />
                          <span className="text-[10px] font-black uppercase tracking-widest">
                            {item.youtube_url.includes("shorts/") || item.youtube_url.includes("/shorts") 
                              ? "Related YouTube Short (शॉर्ट वीडियो)" 
                              : "Related Video Tutorial (ट्यूटोरियल वीडियो)"}
                          </span>
                        </div>
                        {(() => {
                          const embedUrl = getYouTubeEmbedUrl(item.youtube_url);
                          const isShort = item.youtube_url.includes("shorts/") || item.youtube_url.includes("/shorts");
                          if (embedUrl) {
                            return (
                              <div className={`relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 shadow-md ${
                                isShort 
                                  ? "aspect-[9/16] max-w-[260px] mx-auto w-full" 
                                  : "aspect-video w-full"
                              }`}>
                                <iframe
                                  src={embedUrl}
                                  title={`${item.title} Tutorial`}
                                  className="absolute inset-0 w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            );
                          } else {
                            return (
                              <a
                                href={item.youtube_url}
                                target="_blank"
                                rel="noreferrer"
                                referrerPolicy="no-referrer"
                                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800/80 hover:border-violet-300 dark:hover:border-violet-800 transition-all group/video"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                                  </div>
                                  <div className="text-left">
                                    <p className="text-[10px] font-black text-slate-800 dark:text-slate-200">Watch Tutorial Video</p>
                                    <p className="text-[8px] text-slate-400 font-bold">वीडियो ट्यूटोरियल देखें</p>
                                  </div>
                                </div>
                                <ExternalLink className="w-3 h-3 text-slate-400 group-hover/video:text-violet-500 transition-colors" />
                              </a>
                            );
                          }
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Footer - Tags & Prominent Copy Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags && item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-slate-100/50 dark:bg-slate-800/40 text-[9px] font-bold text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition-colors cursor-pointer"
                          onClick={() => setSearchQuery(tag)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleCopy(item.id, item.prompt_text)}
                      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                        isCopied
                          ? "bg-emerald-500 text-white shadow-emerald-500/10"
                          : "bg-violet-600 hover:bg-violet-700 text-white shadow-violet-500/10 active:scale-95"
                      }`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied! (कॉपी हो गया)</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Prompt</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Visual FAQ Section for SEO and Users ──────────────────────── */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FAQ — Expert Guide</span>
            </div>
            <h2 className="text-2xl md:text-3.5xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Frequently Asked Questions <span className="text-violet-600">(अक्सर पूछे जाने वाले सवाल)</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed font-semibold">
              AI Prompts और System Instructions के उपयोग के बारे में सबसे आम सवालों के त्वरित उत्तर प्राप्त करें ताकि आप बेहतरीन परिणाम प्राप्त कर सकें।
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 divide-y divide-slate-100 dark:divide-slate-800/60 pt-2">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = activeFaqIndex === index;
              return (
                <div key={index} className="pt-4 first:pt-0">
                  <button
                    onClick={() => setActiveFaqIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left py-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-xl"
                  >
                    <span className="text-sm md:text-base font-black text-slate-800 dark:text-slate-200 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors pr-4">
                      {faq.question}
                    </span>
                    <span className="shrink-0 p-1 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-lg group-hover:border-violet-300 transition-colors">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-violet-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-violet-500" />
                      )}
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-semibold leading-relaxed pl-1 pb-3">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
