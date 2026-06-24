import { HubToolContent } from './aiToolsHub';

export const youtubeToolsHubTools: HubToolContent[] = [
  {
    id: "thumbnail-downloader",
    name: "YouTube Thumbnail Downloader",
    description: "Need the cover art of a popular YouTube video? Whether you are analyzing graphic design layouts for your next video, collecting high-converting aesthetic inspiration, or referencing competitor style templates, this tool allows you to grab any YouTube thumbnail instantly. Enter any standard YouTube URL or video ID, and the downloader parses and fetches the highest available quality directly from YouTube's servers, including Full HD (1080p), High Definition (HQ), Medium, and Standard options. This is completely safe, does not require an API key, and guarantees original quality without compression artifacts. It is an indispensable asset for graphic designers, content editors, and digital marketers building mood boards.",
    howToUse: [
      "Paste any valid YouTube video URL or 11-character video ID into the search bar.",
      "Click the 'Extract' or search button to load the preview options.",
      "Browse the available dimensions (Max Resolution, High, Medium, or Standard).",
      "Click the 'Download' button next to your preferred resolution to save the image directly."
    ],
    faq: {
      q: "Can I download 4K or 1080p thumbnails for every video?",
      a: "Yes, provided the original creator uploaded a high-resolution custom thumbnail. If the creator uploaded a low-resolution thumbnail or a default frame grab, the system fetches the maximum available resolution automatically."
    },
    relatedToolIds: ["thumbnail-ideas", "seo-analyzer"]
  },
  {
    id: "stats-checker",
    name: "Video Stats Checker",
    description: "Ever wonder how a video achieved viral status, what its estimated ad revenue range is, or how its engagement rate stacks up against typical averages? This engagement audit module analyzes view counts, like counts, and comments to provide an in-depth health report on any public YouTube video. By tracking the ratio of likes-to-views and comments-to-views, it outputs an engagement percentage and estimates a CPM-based monetization value range. It also features a mock audience retention visualization to help you analyze optimal hooks and mid-roll drop-offs, making it perfect for competitor benchmarking and content strategy planning.",
    howToUse: [
      "Enter the URL of the YouTube video you wish to analyze in the stats audit input.",
      "Click 'Audit' to query the real-time engagement and metadata details.",
      "Inspect the metric bento boxes showing Views, Likes, Comments, Engagement Rate, and Estimated Earnings.",
      "Review the Audience Retention Curve graph to visualize typical video hook drop-offs."
    ],
    faq: {
      q: "Are the estimated earnings shown completely accurate?",
      a: "They are estimates based on standard global CPM ranges ($2.00 to $10.00 per 1,000 views). Real earnings vary heavily depending on target country, niche topic, viewer demographics, and video duration."
    },
    relatedToolIds: ["viral-finder", "competitor-tracker"]
  },
  {
    id: "tag-extractor",
    name: "Video Tags Extractor",
    description: "Keywords and semantic tags remain a major cornerstone of search engine indexation on YouTube. Instead of guessing which tags are driving traffic to popular videos, this tag extractor retrieves metadata tags from any public video in seconds. By copying these high-converting tags, you can integrate highly relevant semantic keywords into your own descriptions and metadata systems to gain visibility in the 'Suggested Videos' sidebar. The tool allows single-click copying of individual tags or bulk-copying of the entire set formatted with clean comma separators.",
    howToUse: [
      "Paste the YouTube video link from which you want to retrieve hidden tags.",
      "Click the 'Extract' button to query the video metadata structure.",
      "View the list of extracted tags alongside the count of discovered keywords.",
      "Click 'Copy All Tags' to save them to your clipboard or select individual tags to copy them."
    ],
    faq: {
      q: "Why do some popular YouTube videos have zero tags extracted?",
      a: "Some creators choose not to add specific tags to their videos, relying entirely on titles, descriptions, and video transcripts for search indexing. In these cases, focus on optimizing your own title and description using our AI Title Generator."
    },
    relatedToolIds: ["seo-analyzer", "title-generator"]
  },
  {
    id: "video-summarizer",
    name: "Video Summarizer AI",
    description: "Don't have time to watch a full 40-minute tutorial, tech review, or podcast? Our AI Video Summarizer parses transcripts or descriptions and generates structured summaries. It divides content into clear, logical chapters, extracts major key takeaways in high-impact bullet points, and formats critical key moment timestamps. This tool is a massive time-saver for students studying video lectures, professionals analyzing competitor webinars, and creators looking to summarize their own scripts for descriptions.",
    howToUse: [
      "Enter the video URL or paste raw transcript drafts directly into the optional text area.",
      "Click 'Generate AI Video Summary' to let the AI process the language structures.",
      "Review the structured output including executive summaries, bullet takeaways, and timestamps.",
      "Use the 'Copy Summary' button to export the generated details into your note-keeping app."
    ],
    faq: {
      q: "Do I need to paste a transcript for the summarizer to work?",
      a: "No, if you provide only the URL, the tool will analyze the public video data and chapters. If you want a granular breakdown of spoken content, pasting the raw transcript draft ensures maximum detail."
    },
    relatedToolIds: ["title-generator", "seo-analyzer"]
  },
  {
    id: "title-generator",
    name: "AI Title Generator",
    description: "Your thumbnail might get impressions, but your title is what seals the click. This AI Title Generator takes your video topic, target keywords, and content niche to generate high-CTR titles based on psychological triggers and viral structures. It generates lists categorized by hooks: CTR-optimized curiosity titles, question-based titles, number/listicle titles, and dramatic narrative setups. All titles are designed to fit under YouTube's 65-character cutoff to prevent cutoffs on mobile devices.",
    howToUse: [
      "Enter your primary video topic or raw draft title (e.g., 'how to grow tomatoes').",
      "Optionally enter your target keywords or select a specific niche and language style.",
      "Click the 'Generate Titles' button to trigger the click-through hook algorithms.",
      "Scan the categorized options (Curiosity, Question, Numbers, Dramatic) and copy your favorite."
    ],
    faq: {
      q: "Why are YouTube titles kept under 60-70 characters?",
      a: "YouTube truncates titles on search pages and mobile feeds after approximately 65 characters. Keeping titles punchy and within limits ensures that the core hook is always readable."
    },
    relatedToolIds: ["seo-analyzer", "video-summarizer"]
  },
  {
    id: "thumbnail-ideas",
    name: "Thumbnail Idea Creator",
    description: "Coming up with visual concepts can be incredibly tough. This creator assists your design process by generating detailed graphic composition blueprints. Feed it your video topic, and it returns visual suggestions including: framing and layout, foreground focal elements, background contrast themes, optimal custom text overlays, and emotion expression cues for your face. Stop starting with a blank canvas and get professional design direction instantly.",
    howToUse: [
      "Describe your video's core theme or enter a draft title in the input box.",
      "Click the generate button to create custom compositional blueprints.",
      "Read through the layout ideas, background contrasts, and recommended text overlay strategies.",
      "Hand the generated specifications to your graphic designer or use them to build your custom Canva templates."
    ],
    faq: {
      q: "Does this tool generate physical PNG image files?",
      a: "No, it generates descriptive compositional concepts, color guides, and positioning maps to guide your photography and editing. For physical image rendering, you can pair these guides with our main AI Image Generator."
    },
    relatedToolIds: ["thumbnail-downloader", "title-generator"]
  },
  {
    id: "viral-finder",
    name: "Viral Topic Finder",
    description: "Growth on YouTube happens when you align your content with high-interest, low-competition search waves. This analyzer acts as your trend radar. Enter your niche (e.g., 'React programming', 'vegan cooking', 'personal finance') and it scans high-opportunity topic clusters, viral thumbnail themes, and common click triggers. It maps current opportunities to help you build an editorial schedule that rides existing traffic waves.",
    howToUse: [
      "Enter your channel niche or target category into the trending search field.",
      "Click the query button to analyze viral clusters and topic gaps.",
      "Examine the trending topic cards, complete with difficulty scores and demand meters.",
      "Add these high-opportunity topics directly to your content production calendar."
    ],
    faq: {
      q: "How frequently are viral topics updated?",
      a: "The suggestions are based on evergreen viral patterns, high-interest seasonal query waves, and common competitor gaps, ensuring the ideas remain highly relevant throughout the year."
    },
    relatedToolIds: ["competitor-tracker", "stats-checker"]
  },
  {
    id: "competitor-tracker",
    name: "Competitor Tracker & Audit",
    description: "Keep an eye on what is working for other creators in your space. This spying utility helps you perform a SWOT analysis (Strengths, Weaknesses, Opportunities, Threats) on your top three competitors. Input your niche and competitor names, and the system drafts a detailed positioning matrix, identifying common content gaps, upload frequency opportunities, and audience pain points that you can capitalize on.",
    howToUse: [
      "Input your channel niche along with names or handles of prominent competitors.",
      "Click the competitor analysis button to run the comparative modeling.",
      "Review the comparative matrix mapping Content Gaps, Weaknesses, and Upload Cadence.",
      "Use these insights to build a unique content angle that stands out from the crowd."
    ],
    faq: {
      q: "Is this a paid competitor tracking system?",
      a: "No, this tracker is 100% free, runs client-side in your browser, and does not require complex subscriptions, API authentications, or scraper downloads."
    },
    relatedToolIds: ["viral-finder", "seo-analyzer"]
  },
  {
    id: "seo-analyzer",
    name: "YouTube SEO Analyzer",
    description: "Ensure your videos are optimized for search indexation and algorithm categorization before publishing. This comprehensive audit checklist calculates a real-time SEO score based on title length, description richness, tag presence, and keyword consistency. It provides a detailed checklist highlighting missing optimizations (such as call-to-actions, timestamp chapters, social handles, and primary search phrase matches) and details actionable fixes.",
    howToUse: [
      "Enter your proposed video title, description, and target keywords into the audit form.",
      "Click the 'Run SEO Audit' button to parse your content metrics.",
      "Inspect your calculated optimization percentage (0-100%).",
      "Read the detailed audit logs highlighting critical issues, warnings, and positive achievements to refine your metadata."
    ],
    faq: {
      q: "What is a good SEO score to aim for?",
      a: "We recommend aiming for a score of 85% or higher. This guarantees your video metadata has ideal lengths, contains key search phrases, and includes basic elements like chapters and social links."
    },
    relatedToolIds: ["title-generator", "tag-extractor"]
  }
];
