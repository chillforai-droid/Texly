export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const textCleaningHubTools: HubToolContent[] = [
  {
    id: "remove-extra-spaces",
    name: "Remove Extra Spaces",
    description: "You know that feeling when you paste something from a PDF or an email, and there are random double, triple, or even more spaces scattered everywhere? Drives me nuts too. This tool collapses all those extra spaces down to single spaces between words, and also strips out spaces at the very beginning or end of your text. It's perfect for cleaning up messy citations, fixing formatted text that went through a few copy-paste cycles, or just making a document look professional again. I use this constantly when I'm pulling quotes from web articles into my notes — one click and everything lines up neatly. No more manually backspacing through fifteen spaces.",
    howToUse: [
      "Paste your messy text into the input box on the left",
      "Click the 'Remove Extra Spaces' button",
      "Copy the cleaned result from the right side"
    ],
    faq: { q: "Will this remove line breaks or just spaces?", a: "It only targets space characters — regular spaces, multiple spaces, and leading/trailing spaces. Your line breaks stay exactly as they are, so paragraphs and line-based formatting remain intact." },
    relatedToolIds: ["remove-all-whitespace", "whitespace-remover"]
  },
  {
    id: "remove-line-breaks",
    name: "Remove Line Breaks",
    description: "Ever copied a paragraph from a PDF only to find it's been sliced into a dozen tiny lines, each ending with a hard break halfway through a sentence? Super annoying when you're trying to quote something or just read fluidly. This tool stitches everything back together by removing line breaks and replacing them with spaces, turning that fragmented mess into a single, readable block of text. Students love this when they're pulling research from academic PDFs that were scanned or poorly formatted. Writers use it to clean up exported notes from various apps. It's one of those things you didn't know you needed until you're staring at fifty broken lines and losing your mind.",
    howToUse: [
      "Drop your text with broken line breaks into the input area",
      "Hit the 'Remove Line Breaks' button",
      "Grab the now-joined text from the output field"
    ],
    faq: { q: "Does this remove paragraph breaks too?", a: "No — it distinguishes between single line breaks inside a paragraph and double line breaks that signal paragraph separation. Your paragraph structure stays preserved while the fragmented lines get reconnected." },
    relatedToolIds: ["remove-extra-spaces", "remove-empty-lines"]
  },
  {
    id: "remove-duplicate-lines",
    name: "Remove Duplicate Lines",
    description: "If you've ever built a list, managed a dataset, or cleaned up exported logs, you've seen the duplicate line nightmare. Same entry showing up twice, three times, sometimes ten times. This tool scans through your text line by line and removes duplicates while keeping the first occurrence of each unique line. It's a lifesaver for cleaning up email lists, removing repeated error messages from log files, deduplicating to-do items, or even just cleaning up a playlist export. What's nice is it preserves the original order, so you don't lose context. I helped a friend clean up a CSV of customer emails that had 40% duplicates — took two seconds with this.",
    howToUse: [
      "Paste your list or text into the tool",
      "Click 'Remove Duplicate Lines' to deduplicate",
      "Copy the cleaned list where each line appears only once"
    ],
    faq: { q: "Is it case-sensitive when comparing lines?", a: "Yes — 'Apple' and 'apple' are treated as different lines. If you need case-insensitive deduplication, run the text through a lowercase converter first on Texly Online." },
    relatedToolIds: ["remove-empty-lines", "remove-duplicate-words"]
  },
  {
    id: "remove-empty-lines",
    name: "Remove Empty Lines",
    description: "Blank lines are like clutter on your desk — not harmful on their own, but they make everything look messier than it needs to be. This tool zaps every line that contains nothing (or just whitespace) out of your text. It's fantastic when you've copied something from a code editor with weird spacing, cleaned up exported database records, or just want to condense a document for printing. Developers use this constantly to clean up log files before analysis. I once had a configuration file with 80 lines of actual content spread across 200 lines because of all the blanks — one click and it became readable again. No more scrolling past emptiness.",
    howToUse: [
      "Put your text with blank lines into the input box",
      "Press the 'Remove Empty Lines' button",
      "Get back a tighter, cleaner version of your content"
    ],
    faq: { q: "What about lines that only have spaces or tabs?", a: "Those count as empty — the tool removes lines containing only whitespace characters like spaces, tabs, or invisible characters, leaving only lines with actual visible text." },
    relatedToolIds: ["remove-duplicate-lines", "remove-extra-spaces"]
  },
  {
    id: "remove-numbers",
    name: "Remove Numbers",
    description: "Sometimes numbers just get in the way. Maybe you're cleaning up a transcript that has timestamps everywhere, or pulling text out of a document full of line numbers, reference numbers, or bullet list digits. This tool strips out every numeric character — 0 through 9 — from your text, leaving letters, punctuation, and spaces untouched. Perfect for when you've copied a legal document with paragraph numbers, cleaned up survey responses that had question numbers attached, or prepared text for a word cloud where numbers would just be noise. Just keep in mind this removes all numbers, so if you have dates or statistics you need, skip this one.",
    howToUse: [
      "Paste text containing unwanted numbers",
      "Click 'Remove Numbers'",
      "Get text with all digits completely removed"
    ],
    faq: { q: "Does it remove decimal points and commas in numbers too?", a: "No, only the digits themselves get removed. A number like '12.5' becomes '.', and '1,000' becomes ',' — so you might want to run punctuation removal afterward if those leftover symbols bother you." },
    relatedToolIds: ["remove-punctuation", "remove-special-characters"]
  },
  {
    id: "remove-special-characters",
    name: "Remove Special Characters",
    description: "You know those weird symbols that show up when you copy from a website — ©, ®, ™, bullets, arrows, or random Unicode dingbats? Or maybe you need text that's strictly letters, numbers, and basic punctuation for a database import or an API that chokes on symbols. This tool scrubs out anything that isn't a standard letter, number, or basic space. Think of it as a text sanitizer. People use it when migrating content between systems, cleaning up usernames, or preparing text for machine learning models that only want clean alphanumeric input. A developer friend of mine uses this daily to sanitize user-generated content before it hits his database.",
    howToUse: [
      "Copy text with special symbols into the tool",
      "Click 'Remove Special Characters'",
      "Receive clean text with only alphanumeric characters and basic spaces"
    ],
    faq: { q: "Will this remove punctuation like periods and commas?", a: "No, basic punctuation marks (. , ! ? ; : ' \" ) are preserved. This targets only symbols like ©, ®, ™, °, •, →, ★, and other non-standard characters." },
    relatedToolIds: ["remove-punctuation", "remove-html-tags"]
  },
  {
    id: "remove-html-tags",
    name: "Remove HTML Tags",
    description: "Ever copied something from a webpage and ended up with a mess of <div>, <span>, and <p class='something'> gibberish mixed in with your text? That's HTML, and it's useless if all you want is the readable content. This tool strips every HTML and XML tag out of your text, leaving only the actual words and punctuation. It's a godsend for web scrapers, bloggers who copy formatting from other sites, or anyone extracting content from email newsletters (the HTML kind). Just paste the source code, and you get plain text back. I use this whenever I'm saving articles for offline reading — no tags, just the good stuff.",
    howToUse: [
      "Paste HTML-encoded text or full webpage source",
      "Hit 'Remove HTML Tags' to strip all angle bracket content",
      "Copy the clean plain text result"
    ],
    faq: { q: "What about content inside script or style tags?", a: "Those get removed too — tags and everything between them disappear. You get just the visible text that a browser would show, without any hidden code or inline styling." },
    relatedToolIds: ["remove-special-characters", "markdown-to-plain"]
  },
  {
    id: "remove-accents",
    name: "Remove Accents",
    description: "Accents are beautiful in written language, but sometimes they cause problems. Database keys, URL slugs, and certain software just can't handle characters like é, ñ, ü, or ç. This tool converts accented characters to their plain ASCII equivalents — so 'café' becomes 'cafe', 'piñata' becomes 'pinata', and 'über' becomes 'uber'. It's essential when you're generating search-friendly URLs, preparing text for legacy systems, or standardizing names from international sources. I've seen so many database errors caused by a simple accent mark. Run this once and those errors disappear. It's fast, it's safe, and it keeps your text readable.",
    howToUse: [
      "Paste text containing accented letters",
      "Click 'Remove Accents' to normalize characters",
      "Get back text with all accents replaced by standard letters"
    ],
    faq: { q: "Does this work for all accented languages like French, Spanish, and German?", a: "Yes — it covers most Latin-based accents including acute, grave, umlaut, cedilla, tilde, and circumflex across Western European languages." },
    relatedToolIds: ["remove-special-characters", "remove-emojis"]
  },
  {
    id: "remove-emojis",
    name: "Remove Emojis",
    description: "Emojis are fun in chats, but they're a nightmare in professional documents, data exports, or any text that needs to be plain. This tool strips out every emoji and pictographic symbol from your text, leaving only standard letters, numbers, and punctuation. Perfect for cleaning up customer support tickets for analysis, preparing social media transcripts for reports, or just making a message look more formal. A marketing manager I know uses this before running sentiment analysis on customer comments — emojis just confuse the algorithms. One click and your text becomes boring (in a good, usable way).",
    howToUse: [
      "Copy text with emojis into the input area",
      "Press 'Remove Emojis' to delete all pictographic characters",
      "Take the clean, emoji-free text for your use"
    ],
    faq: { q: "Does this remove emoticons like :) or :( as well?", a: "No — only actual Unicode emoji characters. Text-based emoticons made of punctuation marks stay intact, so you won't lose :) or ;) unless you run punctuation removal separately." },
    relatedToolIds: ["remove-special-characters", "remove-accents"]
  },
  {
    id: "remove-punctuation",
    name: "Remove Punctuation",
    description: "Periods, commas, exclamation marks, question marks, semicolons, colons, apostrophes, quotation marks — sometimes you just want them all gone. Maybe you're preparing text for a word frequency analysis, building a search index, or cleaning up messy data where punctuation creates false 'unique' entries. This tool strips every punctuation character out of your text. 'Hello, world!' becomes 'Hello world'. 'What's up?' becomes 'Whats up'. It's aggressive but useful. I've used this when building simple NLP pipelines where punctuation adds noise, and for creating readability scores where only word length matters. Just don't use it on anything that needs to remain grammatically correct.",
    howToUse: [
      "Paste text full of punctuation marks",
      "Click 'Remove Punctuation' to strip them all out",
      "Get back text with only words, numbers, and spaces"
    ],
    faq: { q: "Does it remove apostrophes from contractions like 'don't'?", a: "Yes — the apostrophe gets removed, so 'don't' becomes 'dont'. Keep this in mind if you need to preserve word meanings for analysis later." },
    relatedToolIds: ["remove-numbers", "remove-special-characters"]
  },
  {
    id: "remove-all-whitespace",
    name: "Remove All Whitespace",
    description: "This is the nuclear option for spacing. Unlike the 'remove extra spaces' tool which keeps single spaces, this one annihilates every single whitespace character — spaces, tabs, line breaks, the works. 'Hello world' becomes 'Helloworld'. Every character gets squished together. When would you ever want this? Shortening URLs or file names, creating compact identifiers, removing formatting for certain data validation checks, or just seeing what your text looks like as one continuous string. It's a niche tool, but when you need it, nothing else will do. I've used it to debug encoding issues and to create single-line versions of multi-line addresses for certain forms.",
    howToUse: [
      "Put any text into the input box",
      "Press 'Remove All Whitespace' for complete space removal",
      "Copy the joined, space-free result"
    ],
    faq: { q: "Does this remove invisible characters like zero-width spaces too?", a: "It removes all Unicode whitespace characters including standard spaces, tabs, line breaks, and also zero-width spaces and non-breaking spaces — everything that creates visual or invisible gaps." },
    relatedToolIds: ["remove-extra-spaces", "whitespace-remover"]
  },
  {
    id: "remove-duplicate-words",
    name: "Remove Duplicate Words",
    description: "You ever type something and accidentally repeat a word twice in a row without noticing? 'The the document is ready.' Happens to all of us when typing fast or when voice transcription goes weird. This tool scans for adjacent duplicate words and removes the second occurrence. 'This this is a test test' becomes 'This is a test'. It's different from the duplicate lines tool — that works line-by-line, this works word-by-word within sentences. Editors and proofreaders love this for catching those tiny repeated-word errors that slip past human eyes. I run drafts through this before sending anything important — catches the embarrassing stuff.",
    howToUse: [
      "Paste text that might have repeated consecutive words",
      "Click 'Remove Duplicate Words' to clean them",
      "Get text with all adjacent duplicate words removed"
    ],
    faq: { q: "Does it remove non-consecutive duplicates like 'cat dog cat'?", a: "No — only consecutive duplicates like 'cat cat'. Non-adjacent repeats stay put, so 'the big the cat' remains unchanged because the 'the's aren't next to each other." },
    relatedToolIds: ["remove-duplicate-lines", "remove-extra-spaces"]
  },
  {
    id: "whitespace-remover",
    name: "Whitespace Remover",
    description: "Wait, another whitespace tool? Yes, but this one's different — it's specifically for removing all whitespace characters from the beginning and end of your text (trimming), plus converting any internal whitespace sequences (multiple spaces, tabs mixed with spaces) into single spaces. Think of it as the gentle version of whitespace cleaning. You get one space between words, no spaces at the edges, and everything else is gone. It's what most people actually want when they say 'clean my text.' Perfect for form inputs, CSV cleaning, or just making copied text look professionally formatted. All the Texly Online tools are client-side so your data never leaves your browser — privacy first, always.",
    howToUse: [
      "Drop messy text into the workspace",
      "Hit 'Whitespace Remover' for balanced cleaning",
      "Use the cleaned output wherever you need it"
    ],
    faq: { q: "How is this different from 'Remove Extra Spaces'?", a: "This also trims leading/trailing space AND normalizes tabs and mixed whitespace to single spaces. 'Remove Extra Spaces' focuses only on multiple spaces between words without trimming edges." },
    relatedToolIds: ["remove-extra-spaces", "remove-all-whitespace"]
  },
  {
    id: "markdown-to-plain",
    name: "Markdown to Plain Text",
    description: "Markdown is great for writing, terrible for reading raw. If you've ever opened a .md file and seen # headers, **bold** asterisks, [links](urls), and - list items everywhere, you know what I mean. This tool converts markdown syntax into clean, readable plain text. Headers lose their # symbols, bold and italic formatting turns into regular text, links become just the link text (not the URL), and lists get unbulleted. It's perfect when someone sends you a README file and you just want to read the content without the markup noise. Or when you're copying from a markdown editor into an email or document that doesn't support formatting. I use this constantly for documentation cleanup.",
    howToUse: [
      "Paste raw markdown text into the input box",
      "Click 'Markdown to Plain Text'",
      "Get back readable plain text without any markdown symbols"
    ],
    faq: { q: "Does it handle code blocks and images?", a: "Code blocks become plain indented text without the backticks, and images are stripped down to just their alt text if available — otherwise they're removed entirely." },
    relatedToolIds: ["remove-html-tags", "remove-special-characters"]
  }
];