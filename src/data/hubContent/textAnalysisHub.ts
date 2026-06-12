export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const textAnalysisHubTools: HubToolContent[] = [
  {
    id: "word-counter",
    name: "Word Counter",
    description: "Ever stared at a blank screen trying to hit exactly 500 words for a college essay? Or maybe you're polishing a blog post and need to know if it's long enough to rank on Google. Word counting sounds simple, but here's the thing – what counts as a word? Hyphenated terms? Numbers? URLs? I've seen plenty of counters get confused. This one doesn't. Paste your text, and you'll see the real word count in milliseconds. No signup, no sending your draft to some server. Everything stays in your browser. Freelancers use this to bill clients accurately. Students double-check their 2,000-word research papers. Even novel writers track daily progress. The best part? It ignores extra spaces and weird formatting that throw off other counters. Just clean, honest numbers.",
    howToUse: [
      "Type or paste your text into the large input area",
      "Watch the word count update automatically as you type",
      "Check the detailed breakdown including unique word statistics if needed",
      "Copy your corrected text or clear everything with one click"
    ],
    faq: { q: "Does hyphenated words like 'state-of-the-art' count as one word or multiple?", a: "Great question. In standard English and for most style guides including APA and MLA, hyphenated compounds count as one word. Our word counter follows that rule – 'state-of-the-art' registers as a single word, not three separate ones. Numbers and symbols attached to words (like '123abc') also count as one word." },
    relatedToolIds: ["character-counter", "sentence-counter", "reading-time-calculator"]
  },
  {
    id: "character-counter",
    name: "Character Counter",
    description: "Twitter used to be 140 characters. Now it's 280. But try explaining that to someone who just wrote the perfect tweet that's 281 characters long. Frustrating, right? Character counters save you from that last-minute panic. I use this constantly for meta descriptions – you've got roughly 155-160 characters before Google cuts you off with those annoying ellipses. Same thing with SMS messages, which max out at 160 characters before splitting into multiple texts. Write product titles for Amazon? They have strict limits too. This counter shows you both with spaces and without, because sometimes you need the raw count (like for programming variable names) and other times spaces matter (like for social posts). It even highlights emojis and special characters – those sneaky little guys take up multiple bytes but still count as single characters. Paste your headline, watch the number tick up, and breathe easy knowing you won't get cut off.",
    howToUse: [
      "Drop your text into the input box – it works with any language or symbols",
      "See two numbers instantly: total characters and characters without spaces",
      "Watch the live counter decrease if you're working backwards from a limit",
      "Use the highlight feature to spot exactly where you're going over the limit"
    ],
    faq: { q: "Do spaces count as characters in SEO meta descriptions?", a: "Yes, absolutely. When Google displays your meta description in search results, every space counts toward that 155-160 character limit. A space is still a character, even though it's blank. Our counter shows both counts so you can optimize for meta tags (where spaces matter) and also see pure character volume for other use cases like password fields." },
    relatedToolIds: ["word-counter", "letter-counter", "case-distribution-analyzer"]
  },
  {
    id: "letter-counter",
    name: "Letter Counter",
    description: "Here's a weird one – why would someone count only letters, ignoring numbers, punctuation, and spaces? I'll tell you. Teachers sometimes ask for '500 words excluding numbers and symbols.' Transcriptionists need to know raw alphabetical content. And my favorite use: acrostic poems, where you need exactly 26 letters to spell something vertically down the margin. This tool strips away everything that isn't A through Z (case doesn't matter – it counts both) and gives you that pure number. Ever written a constrained writing exercise like lipogram? You'll know exactly how many 'e's you've accidentally slipped in. It also helps when you're analyzing text complexity – some readability formulas look at letter-to-word ratios. Yeah, that's a real thing. Try pasting a paragraph of medical jargon versus a children's book. The difference in letter density is wild.",
    howToUse: [
      "Paste any text containing letters, numbers, and symbols",
      "The counter automatically filters out non-letter characters",
      "Check the live total that updates with every keystroke",
      "Toggle case sensitivity on if you want to separate uppercase from lowercase counts"
    ],
    faq: { q: "Does your letter counter include accented characters like é or ü as letters?", "a": "Yes, it does. The tool recognizes Unicode letters, not just standard English A-Z. So accented characters, letters from other alphabets like Cyrillic or Greek, and even extended Latin characters all count as legitimate letters. The only things excluded are numbers, punctuation, spaces, and symbols like @ or #." },
    relatedToolIds: ["character-counter", "char-frequency-counter", "word-length-stats"]
  },
  {
    id: "reading-time-calculator",
    name: "Reading Time Calculator",
    description: "Average adult reads about 238 words per minute. But here's the secret that bloggers and content strategists know: nobody actually reads at exactly that speed. Technical content slows people down. Listicles speed them up. So why use a standard calculator? Because readers appreciate knowing what they're getting into. I put reading times on every long-form article I write. '4 minute read' sets expectations. People commit when they know it won't take an hour. This calculator does more than simple division – it adjusts for sentence complexity (more periods mean faster reading, oddly enough) and even accounts for headings and lists that break up text visually. You'll get two numbers: average reading time and a slower 'careful reading' time for dense material. Product managers use this for onboarding guides. Teachers for homework assignments. And yes, it works in reverse – want a 10-minute read? You'll need roughly 2,400 words. Plan accordingly.",
    howToUse: [
      "Paste your draft or finished content into the field",
      "Select content complexity – light (blog), medium (news), or heavy (technical)",
      "Read the estimated minutes based on adjusted reading speed",
      "Aim for 5-7 minutes for most web content to keep engagement high"
    ],
    faq: { q: "Does reading time affect SEO rankings or just user experience?", a: "Both, actually. Google doesn't directly rank by reading time, but dwell time – how long someone stays on your page – is a strong indirect signal. A 10-minute read that someone finishes tells Google your content satisfied the query. But if you claim '5 minute read' and it takes 15, people bounce. Accurate estimates improve trust metrics, which can boost rankings over time." },
    relatedToolIds: ["word-counter", "sentence-counter", "paragraph-counter"]
  },
  {
    id: "line-counter",
    name: "Line Counter",
    description: "Programmers, poets, and playwrights – this one's for you. Ever tried to figure out how many lines of code you wrote today? Or whether your sonnet actually has fourteen lines like it's supposed to? Line counting sounds trivial until you realize different tools have different rules. Does an empty line count? What about a line that's just a closing brace? This tool counts every line break as a new line, but shows you the breakdown: lines with content, blank lines, and total lines. Screenwriters use this to estimate screen time (one page of script roughly equals one minute, but that's based on line count too). Poets check their structure. And developers? We use it for quick PR reviews – 'this file changed 47 lines' – before we even look at the diff. The counter also works with pasted code from any language. Python indentation issues become obvious when you see line counts misaligned.",
    howToUse: [
      "Paste text, code, or poetry into the main input box",
      "View the instant breakdown: total lines, non-empty lines, and blank lines",
      "Use the 'trim lines' option to ignore trailing whitespace that creates false empties",
      "Copy the line-numbered version if you need to reference specific lines later"
    ],
    faq: { q: "In code reviews, do comments count as empty lines or content lines?", a: "Content lines. Our counter treats any line with at least one non-whitespace character as content. That includes commented lines, even if they start with // or /*. If you want to exclude comments, you'd need a language-specific parser, but for general code reviews, counting comment lines as content gives a more accurate view of total file changes." },
    relatedToolIds: ["word-counter", "sentence-counter", "paragraph-counter"]
  },
  {
    id: "sentence-counter",
    name: "Sentence Counter",
    description: "Here's something that drives me crazy: how many sentences are in this paragraph? Most people guess wrong because they don't know what actually defines a sentence. Periods are obvious. But question marks? Exclamation points? What about abbreviations like 'Dr.' or 'e.g.' – those periods don't end sentences, but they confuse most counters. This one uses natural language detection to distinguish between real sentence boundaries and false positives. Why does it matter? Readability formulas depend heavily on sentence length. Short sentences feel punchy and fast. Long sentences feel academic and dense – sometimes too dense. I use this to break up my own writing. If I see a sentence over 40 words, I almost always split it. You'll see your average sentence length, longest sentence, and shortest sentence. Bloggers aiming for 8th-grade reading level target 15-20 words per sentence. Lawyers writing contracts? They push 40-50. Know your audience.",
    howToUse: [
      "Type or paste your text into the analyzer",
      "Review the sentence count and average length per sentence",
      "Spot unusually long sentences highlighted in yellow",
      "Rewrite overly complex sentences until the counter shows more even distribution"
    ],
    faq: { q: "How does your tool handle abbreviations like 'Mr.' or 'Inc.' without splitting sentences incorrectly?", a: "We maintain a small dictionary of common abbreviations that contain periods but don't end sentences. When the counter sees 'Mr.', 'Mrs.', 'Dr.', 'e.g.', 'i.e.', or 'Inc.' followed by a space and a lowercase letter, it knows to continue the sentence. For unknown abbreviations, we use capitalization detection – if the word after a period is lowercase, it's probably not a new sentence." },
    relatedToolIds: ["word-counter", "paragraph-counter", "reading-time-calculator"]
  },
  {
    id: "paragraph-counter",
    name: "Paragraph Counter",
    description: "I've edited thousands of blog posts, and the single biggest problem? Walls of text. You know the ones – you open an article and it's just… one giant paragraph. Nobody reads that. Paragraphs signal pauses, breaths, shifts in ideas. This counter tells you exactly how many you have and more importantly, how they're distributed. You'll see which paragraphs are too long (over 6 lines on desktop, or roughly 150 words) and which are too short (single sentences that maybe shouldn't be their own paragraph). Academic writers use this to check essay structure – an introduction paragraph, three body paragraphs, conclusion. That's five total. But if your counter shows eight? You probably drifted off topic. The tool also flags consecutive short paragraphs, which can make writing feel choppy. Perfect for editing your first draft before anyone else sees it.",
    howToUse: [
      "Paste your document into the counter – it respects double line breaks as paragraph markers",
      "See total paragraph count plus a visual heatmap of paragraph lengths",
      "Click on any flagged paragraph (too long or too short) to jump to it",
      "Adjust the 'max ideal words per paragraph' slider based on your publication"
    ],
    faq: { q: "What's the ideal paragraph length for online content versus print?", a: "For web content, aim for 2-3 sentences or 40-60 words max. Mobile screens make long paragraphs feel endless. Print can handle 5-7 sentences or 100-150 words because page width is wider. Our counter defaults to web standards but lets you customize the threshold based on your output medium." },
    relatedToolIds: ["sentence-counter", "word-counter", "line-counter"]
  },
  {
    id: "text-density-checker",
    name: "Text Density Checker",
    description: "SEO pros, this one will save you hours. Keyword density used to be everything – cram 'best coffee maker' into your article 47 times and rank #1. Google got smarter around 2011. Now it's about natural language, but density still matters for avoiding both under-optimization and the dreaded keyword stuffing penalty. This checker looks at how often each word appears as a percentage of total words. You want your primary keywords around 1-2%. Secondary keywords 0.5-1%. Anything over 3% starts looking suspicious. But here's what most tools miss: stop words and common terms like 'the' or 'and' should be filtered out, or they'll dominate your density report. We do that automatically. You'll also see phrase density for two and three-word phrases. Write a page about 'best running shoes for flat feet'? You'll know exactly how often that exact phrase appears versus variations. Content agencies use this before client delivery to prove they optimized correctly.",
    howToUse: [
      "Enter your webpage content or article draft",
      "Choose whether to ignore common stop words (recommended for SEO)",
      "Review the sorted list showing each word's frequency and density percentage",
      "Check the 'phrases' tab for 2-word and 3-word combinations"
    ],
    faq: { q: "What density percentage triggers Google's keyword stuffing penalty?", a: "There's no official threshold, but from testing hundreds of pages, anything above 3-4% for a single keyword raises flags. Below 2% is safe. Between 2-3% requires context – if your page is 500 words about 'blue widgets' and 'blue widgets' appears 12 times (2.4%), that's fine. If it appears 25 times (5%) and reads unnaturally, you're risking a penalty. Our checker flags any keyword exceeding 3%." },
    relatedToolIds: ["word-counter", "char-frequency-counter", "case-distribution-analyzer"]
  },
  {
    id: "case-distribution-analyzer",
    name: "Case Distribution Analyzer",
    description: "Ever gotten feedback that your writing 'shouts' too much? Or not enough proper nouns capitalized? This analyzer breaks down your text by letter case: uppercase letters, lowercase letters, title case words, and proper nouns. I find it fascinating to run on emails I've written. Am I using too much emphasis? (THAT'S SHOUTING). Or not enough? (this feels flat). For academic writing, case consistency matters – random capitalization looks unprofessional. For code comments, respecting case is crucial when variables are case-sensitive. The analyzer even catches things like 'iPhone' where the third letter is uppercase inside a word, or 'NASA' where everything's caps. Product marketers use this to check brand names – if you wrote 'nike' instead of 'Nike' fifty times, you'll see it instantly. The tool doesn't just count; it shows you percentages so you know if your writing is mostly lowercase (casual), mixed (standard), or heavy-uppercase (aggressive).",
    howToUse: [
      "Paste your text into the distribution analyzer",
      "View the pie chart showing uppercase, lowercase, and title case percentages",
      "Scroll through the word-by-word breakdown to spot incorrect casing",
      "Use the 'fix common issues' button to automatically correct obvious mistakes"
    ],
    faq: { q: "Does proper noun detection work for unusual brand names like 'eBay' or 'LinkedIn'?", a: "Yes, to some extent. Our analyzer knows common brand name patterns – capitalization in the middle of a word (camelCase), alternating case, and all-caps acronyms. For 'eBay', it recognizes lowercase-first brand patterns. That said, no automated tool catches every unique brand style. You'll still want to manually review brand names, but the analyzer highlights every word with mixed case so you can't miss them." },
    relatedToolIds: ["letter-counter", "character-counter", "text-density-checker"]
  },
  {
    id: "extract-emails",
    name: "Extract Emails",
    description: "Here's a scenario: you've got a giant text file with customer support transcripts, forum posts, or survey responses. Somewhere in there are email addresses, but finding them manually would take all day. This tool solves that problem instantly. It scans your text and pulls out anything that looks like an email address – username@domain.tld – even if it's mixed in with other words or weird formatting. I've used this to clean up mailing lists, pull leads from exported chat logs, and even find my own email addresses scattered across old hard drives. The regex behind it catches most standard formats (first.last@company.com, jdoe123@gmail.co.uk) while avoiding false positives like plain text with an @ symbol. Marketers use this to extract customer emails from feedback forms. Developers use it to parse log files. And recruiters? They love it for pulling contact info from messy resumes. Everything stays client-side, so you're not uploading sensitive email addresses to anyone else's server.",
    howToUse: [
      "Paste any block of text containing potential email addresses",
      "Click 'Extract' – the tool scans and displays every unique email found",
      "Review the list and copy individual emails or the entire batch",
      "Export as CSV if you need to import into an email client or CRM"
    ],
    faq: { q: "Will this extract emails that have plus signs like 'name+filter@gmail.com'?", a: "Absolutely. Plus-addressing is a valid email format (RFC 5322 compliant), and our extractor includes the full address including anything after the plus sign. We also catch newer TLDs like .io, .co, .app, and .xyz, not just traditional .com or .org addresses. The only emails we miss are intentionally obfuscated ones like 'name [at] domain [dot] com' – those require human interpretation." },
    relatedToolIds: ["extract-urls", "text-density-checker", "char-frequency-counter"]
  },
  {
    id: "extract-urls",
    name: "Extract URLs",
    description: "Have you ever copied an article from the web only to realize all the links are still there, but scattered? Or maybe you're doing competitor research and want to see every external link in their blog post. This tool grabs every http://, https://, and even www.-style URL from your text and lists them cleanly. No more manually copying link addresses one by one. I use this when migrating websites – I'll paste the old site's content, extract all internal URLs, and map them to new structures. SEO consultants run this on competitor pages to see their linking strategy. Security researchers pull malicious URLs from suspicious emails (without clicking them, obviously). The extractor also catches relative links like '/blog/post' and full anchor tags from HTML. It won't grab fake URLs like 'example.notarealtld' – only valid domain formats. And since everything runs in your browser, you're not sending your research to some third-party server that's probably logging everything.",
    howToUse: [
      "Paste raw text, HTML, or markdown containing URLs",
      "Hit extract – the tool finds and validates each URL structure",
      "Review the deduplicated list of all unique links",
      "Copy all URLs to clipboard or export as a clean list"
    ],
    faq: { q: "Can it extract URLs that are written without the https:// prefix, like 'texlyonline.in/tools'?", a: "Yes, it catches three common URL formats: full URLs with protocol (https://...), domain-only URLs (texlyonline.in), and partial paths (/tools/page). The only thing it can't extract are URLs split across line breaks or obfuscated with spaces – those would need manual cleanup first. We also filter out common false positives like 'http://localhost' or '192.168.x.x' IPs unless you toggle them on." },
    relatedToolIds: ["extract-emails", "text-density-checker", "word-counter"]
  },
  {
    id: "char-frequency-counter",
    name: "Character Frequency Counter",
    description: "This is the tool you never knew you needed until you're staring at an anagram puzzle or trying to prove someone used way too many commas. It counts every single character in your text – 'e' appears 47 times, spaces appear 203 times, commas appear 12 times. Why does that matter? Cryptography hobbyists use frequency analysis to break simple ciphers (English's most common letter is 'e', by the way). Writers use it to spot overused words or letters – if your 's' count is through the roof, maybe rethink all those plurals. I once used this to settle a bet about whether a poem used more vowels or consonants (vowels won by a landslide). The counter shows you a full breakdown, sorted from most to least frequent. You'll see percentages too, so you can compare your distribution against standard English. Code reviewers use it to check for consistent indentation (spaces vs tabs show up clearly). And linguists? They love running this on dialects to see regional differences in letter usage. It's simple but surprisingly addictive to play with.",
    howToUse: [
      "Paste any text into the frequency analyzer",
      "View the complete table showing every unique character and its count",
      "Sort by character, frequency, or alphabetically",
      "Filter to show only letters, only numbers, or only punctuation if needed"
    ],
    faq: { q: "Does the counter distinguish between uppercase 'E' and lowercase 'e' separately?", a: "Yes, by default it treats them as different characters because case matters in many contexts. But we include a 'case insensitive' toggle – flip that on, and 'E' and 'e' combine into a single count for that letter. This is especially useful for analyzing natural language where case differences are stylistic rather than meaningful." },
    relatedToolIds: ["letter-counter", "word-length-stats", "text-density-checker"]
  },
  {
    id: "word-length-stats",
    name: "Word Length Statistics",
    description: "Short words feel fast. Long words feel academic. This tool breaks down exactly how many 1-letter, 2-letter, 3-letter, and so on up to 20+ letter words you're using. I run every piece of content through this before publishing. If too many words are 6+ letters, the text becomes dense and harder to read. If everything's 2-3 letters, it feels choppy and simplistic. The sweet spot? Most English text averages 4-5 letters per word. You'll also see your shortest word (usually 'a' or 'I'), longest word (time to check if 'antidisestablishment' really belongs there), and a distribution chart. Technical writers use this to flag jargon – industry terms tend to be longer. Children's book authors ensure most words are 3-5 letters. And students? They use it to vary sentence rhythm. Try pasting a legal contract versus a Dr. Seuss book. The difference is hilarious. The tool even highlights unusually long words so you can decide if they're necessary or just showing off.",
    howToUse: [
      "Paste your text to generate an immediate length distribution",
      "Review the bar chart showing counts for each word length (1 char, 2 chars, etc.)",
      "Check the 'long words' list – anything over 10 characters appears separately",
      "Adjust the minimum length to ignore short common words if analyzing vocabulary richness"
    ],
    faq: { q: "What's a normal average word length for web content versus academic writing?", a: "Web content averages 4.2-4.8 characters per word. Academic writing pushes 5.5-6.2 characters because of technical vocabulary and Latin-derived terms. If your average exceeds 6 characters, you're probably using too much jargon or unnecessarily long words. Our stats tool flags averages above 5.5 as 'complex' so you can decide if that's intentional." },
    relatedToolIds: ["word-counter", "char-frequency-counter", "sentence-counter"]
  },
  {
    id: "text-diff-checker",
    name: "Text Diff Checker",
    description: "Two versions of the same document. You know there's a difference, but scanning line by line is mind-numbing. This tool does what your eyes can't – it compares two texts and highlights every single change. Additions show in green, deletions in red, and changed words get their own special highlight. I use this constantly for client revisions. They send 'final-v3-corrected-actually-final.doc' and I need to see what they changed without reading everything again. Editors love it for tracking changes when someone forgot to turn on Track Changes. Developers compare configuration files. Students check their essays against earlier drafts to see if they actually improved. The comparison happens at the character level, so even a single space change gets caught. But you can switch to word-level diff if character-level feels too granular. There's also a unified view that merges both texts with change markers, or a side-by-side view for longer documents. Unlike a certain word processor that shall remain nameless, this works entirely in your browser – no uploads, no privacy concerns, no 'your document has been saved to our cloud' nonsense.",
    howToUse: [
      "Paste your original text in the left box and revised text in the right box",
      "Click 'Compare' to instantly see all differences highlighted",
      "Toggle between character-level and word-level diff for appropriate precision",
      "Use the merge buttons to accept or reject changes one by one"
    ],
    faq: { q: "Can it compare two very large documents, like 50,000 words each?", a: "Yes, but there's a practical limit. The diff algorithm runs entirely in your browser's memory, so performance depends on your device. For 50,000 words, expect a 2-3 second wait on modern devices. For 200,000+ words, you might see a 10-15 second delay or browser warnings about slow scripts. For most essays, articles, and even book chapters (under 20,000 words), it's instantaneous. If you need to compare novels, consider splitting by chapter." },
    relatedToolIds: ["word-counter", "sentence-counter", "paragraph-counter"]
  }
];