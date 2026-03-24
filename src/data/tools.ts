export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: 'cleaning' | 'converter' | 'analysis' | 'utility';
  description: string;
  shortDescription: string;
  icon: string;
  keywords: string[];
  process: (input: string, options?: any) => string;
}

export const CATEGORIES = [
  { id: 'cleaning', name: 'Text Cleaning', description: 'Remove unwanted characters, spaces, and formatting.' },
  { id: 'converter', name: 'Text Converter', description: 'Change text case and format instantly.' },
  { id: 'analysis', name: 'Text Analysis', description: 'Get detailed statistics and insights about your text.' },
  { id: 'utility', name: 'Text Utility', description: 'Useful tools for everyday text manipulation.' },
];

export const TOOLS: Tool[] = [
  // CLEANING
  {
    id: 'remove-extra-spaces',
    name: 'Remove Extra Spaces',
    slug: 'remove-extra-spaces-online',
    category: 'cleaning',
    shortDescription: 'Clean up your text by removing multiple spaces and trimming edges.',
    description: 'The ultimate tool to remove extra spaces online. It handles double spaces, tabs, and trailing whitespace effortlessly.',
    icon: 'Space',
    keywords: ['remove extra spaces online', 'text cleaner tool free', 'trim whitespace'],
    process: (input) => input.replace(/\s+/g, ' ').trim(),
  },
  {
    id: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    slug: 'remove-line-breaks-tool',
    category: 'cleaning',
    shortDescription: 'Instantly remove all line breaks from your text to make it a single line.',
    description: 'Remove line breaks tool for free. Perfect for cleaning up copied text from PDFs or emails.',
    icon: 'CornerDownLeft',
    keywords: ['remove line breaks tool', 'text to single line', 'newline remover'],
    process: (input) => input.replace(/[\r\n]+/g, ' '),
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines-tool',
    category: 'cleaning',
    shortDescription: 'Find and remove all duplicate lines from your list or text.',
    description: 'Remove duplicate lines tool free. Clean up lists, logs, or any repetitive text data.',
    icon: 'CopyMinus',
    keywords: ['remove duplicate lines tool', 'deduplicate text', 'unique lines only'],
    process: (input) => Array.from(new Set(input.split(/\r?\n/))).join('\n'),
  },
  {
    id: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    slug: 'remove-empty-lines-online',
    category: 'cleaning',
    shortDescription: 'Quickly strip out all blank or empty lines from your text.',
    description: 'Remove empty lines online for free. Make your text compact and clean.',
    icon: 'Rows',
    keywords: ['remove empty lines online', 'strip blank lines', 'text compactor'],
    process: (input) => input.split(/\r?\n/).filter(line => line.trim() !== '').join('\n'),
  },
  {
    id: 'remove-numbers',
    name: 'Remove Numbers',
    slug: 'remove-numbers-from-text',
    category: 'cleaning',
    shortDescription: 'Strip all numerical digits from your text content.',
    description: 'Remove numbers from text easily. Useful for extracting only words from data sets.',
    icon: 'Hash',
    keywords: ['remove numbers from text', 'strip digits', 'text only'],
    process: (input) => input.replace(/[0-9]/g, ''),
  },
  {
    id: 'remove-special-characters',
    name: 'Remove Special Characters',
    slug: 'remove-special-characters-online',
    category: 'cleaning',
    shortDescription: 'Remove all symbols and special characters, leaving only letters and numbers.',
    description: 'Remove special characters online. Clean your text for filenames or database entries.',
    icon: 'ShieldAlert',
    keywords: ['remove special characters online', 'alphanumeric only', 'clean text symbols'],
    process: (input) => input.replace(/[^a-zA-Z0-9\s]/g, ''),
  },
  {
    id: 'remove-html-tags',
    name: 'Remove HTML Tags',
    slug: 'remove-html-tags-online',
    category: 'cleaning',
    shortDescription: 'Strip all HTML tags from your code to get plain text.',
    description: 'Remove HTML tags online free. Convert HTML to plain text instantly.',
    icon: 'Code',
    keywords: ['remove html tags online', 'html to text converter', 'strip html'],
    process: (input) => input.replace(/<[^>]*>/g, ''),
  },

  // CONVERTERS
  {
    id: 'upper-case',
    name: 'Upper Case',
    slug: 'upper-case-converter',
    category: 'converter',
    shortDescription: 'Convert all your text to capital letters.',
    description: 'Upper case converter online. Make your text stand out with all caps.',
    icon: 'Type',
    keywords: ['upper case converter', 'all caps tool', 'capitalize text'],
    process: (input) => input.toUpperCase(),
  },
  {
    id: 'lower-case',
    name: 'Lower Case',
    slug: 'lower-case-converter',
    category: 'converter',
    shortDescription: 'Convert all your text to small letters.',
    description: 'Lower case converter online. Quickly change text to lowercase.',
    icon: 'Type',
    keywords: ['lower case converter', 'small letters tool', 'lowercase text'],
    process: (input) => input.toLowerCase(),
  },
  {
    id: 'title-case',
    name: 'Title Case',
    slug: 'title-case-converter',
    category: 'converter',
    shortDescription: 'Capitalize the first letter of every word.',
    description: 'Title case converter online. Perfect for headings and titles.',
    icon: 'Heading',
    keywords: ['title case converter', 'capitalize headings', 'proper case tool'],
    process: (input) => input.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
  },
  {
    id: 'slug-generator',
    name: 'Slug Generator',
    slug: 'slug-generator-online-free',
    category: 'converter',
    shortDescription: 'Create SEO-friendly URL slugs from any text.',
    description: 'Slug generator online free. Convert titles into clean, hyphenated URL paths.',
    icon: 'Link',
    keywords: ['slug generator online free', 'url slug creator', 'seo friendly urls'],
    process: (input) => input.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, ''),
  },
  {
    id: 'binary-to-text',
    name: 'Binary to Text',
    slug: 'binary-to-text-converter',
    category: 'converter',
    shortDescription: 'Decode binary code (0101) into readable text.',
    description: 'Binary to text converter online. Translate binary strings back to English.',
    icon: 'Binary',
    keywords: ['binary to text converter', 'decode binary', 'binary translator'],
    process: (input) => input.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join(''),
  },
  {
    id: 'text-to-binary',
    name: 'Text to Binary',
    slug: 'text-to-binary-converter',
    category: 'converter',
    shortDescription: 'Convert any text into binary code (0s and 1s).',
    description: 'Text to binary converter online. Encode your messages into binary format.',
    icon: 'Binary',
    keywords: ['text to binary converter', 'encode binary', 'binary encoder'],
    process: (input) => input.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' '),
  },

  // ANALYSIS
  {
    id: 'word-counter',
    name: 'Word Counter',
    slug: 'word-counter-online-free',
    category: 'analysis',
    shortDescription: 'Count words, characters, and sentences in your text.',
    description: 'Word counter online free. Get accurate word count and character statistics.',
    icon: 'FileText',
    keywords: ['word-counter-online-free', 'character counter', 'text statistics'],
    process: (input) => {
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;
      const chars = input.length;
      const lines = input.split(/\r?\n/).length;
      return `Words: ${words}\nCharacters: ${chars}\nLines: ${lines}`;
    },
  },
  {
    id: 'reading-time',
    name: 'Reading Time Calculator',
    slug: 'reading-time-calculator',
    category: 'analysis',
    shortDescription: 'Estimate how long it will take to read your text.',
    description: 'Reading time calculator online. Based on average reading speed (200-250 wpm).',
    icon: 'Clock',
    keywords: ['reading time calculator', 'estimate reading duration', 'wpm calculator'],
    process: (input) => {
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;
      const minutes = Math.ceil(words / 225);
      return `Estimated Reading Time: ${minutes} minute${minutes !== 1 ? 's' : ''} (at 225 wpm)`;
    },
  },

  // UTILITY
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    slug: 'text-reverser-online',
    category: 'utility',
    shortDescription: 'Flip your text backwards or reverse word order.',
    description: 'Text reverser online. Reverse characters or words for fun or puzzles.',
    icon: 'RotateCcw',
    keywords: ['text reverser online', 'backward text', 'reverse words'],
    process: (input) => input.split('').reverse().join(''),
  },
  {
    id: 'text-repeater',
    name: 'Text Repeater',
    slug: 'text-repeater-tool',
    category: 'utility',
    shortDescription: 'Repeat a piece of text as many times as you want.',
    description: 'Text repeater tool. Generate repetitive text for testing or spam (just kidding).',
    icon: 'Repeat',
    keywords: ['text repeater tool', 'duplicate text multiple times', 'text generator'],
    process: (input, options) => {
      const count = options?.count || 10;
      return new Array(Number(count)).fill(input).join('\n');
    },
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    slug: 'lorem-ipsum-generator-online',
    category: 'utility',
    shortDescription: 'Generate placeholder text for your designs and layouts.',
    description: 'Lorem ipsum generator online. Create dummy text in paragraphs or sentences.',
    icon: 'FileJson',
    keywords: ['lorem ipsum generator online', 'placeholder text', 'dummy text'],
    process: () => "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 'find-replace',
    name: 'Find and Replace',
    slug: 'find-and-replace-text-online',
    category: 'utility',
    shortDescription: 'Search for specific text and replace it with something else.',
    description: 'Find and replace text online. Bulk replace words or phrases in your content.',
    icon: 'Search',
    keywords: ['find and replace text online', 'bulk replace tool', 'text search and replace'],
    process: (input, options) => {
      if (!options?.find) return input;
      const regex = new RegExp(options.find, 'g');
      return input.replace(regex, options.replace || '');
    },
  },
  {
    id: 'sort-lines',
    name: 'Sort Lines',
    slug: 'sort-lines-alphabetically',
    category: 'utility',
    shortDescription: 'Sort your list or lines of text alphabetically (A-Z or Z-A).',
    description: 'Sort lines alphabetically online. Organize your lists instantly.',
    icon: 'SortAsc',
    keywords: ['sort lines alphabetically', 'alphabetize list', 'text sorter'],
    process: (input) => input.split(/\r?\n/).sort().join('\n'),
  },
];

// Add more tools to reach 50+
const additionalTools: Tool[] = [
  { id: 'camel-case', name: 'Camel Case', slug: 'camel-case-converter', category: 'converter', shortDescription: 'camelCase', description: '', icon: 'Type', keywords: [], process: (s) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '') },
  { id: 'snake-case', name: 'Snake Case', slug: 'snake-case-converter', category: 'converter', shortDescription: 'snake_case', description: '', icon: 'Type', keywords: [], process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '' },
  { id: 'kebab-case', name: 'Kebab Case', slug: 'kebab-case-converter', category: 'converter', shortDescription: 'kebab-case', description: '', icon: 'Type', keywords: [], process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '' },
  { id: 'pascal-case', name: 'Pascal Case', slug: 'pascal-case-converter', category: 'converter', shortDescription: 'PascalCase', description: '', icon: 'Type', keywords: [], process: (s) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w) => w.toUpperCase()).replace(/\s+/g, '') },
  { id: 'constant-case', name: 'Constant Case', slug: 'constant-case-converter', category: 'converter', shortDescription: 'CONSTANT_CASE', description: '', icon: 'Type', keywords: [], process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('_') || '' },
  { id: 'alternating-case', name: 'Alternating Case', slug: 'alternating-case-converter', category: 'converter', shortDescription: 'AlTeRnAtInG CaSe', description: '', icon: 'Type', keywords: [], process: (s) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'inverse-case', name: 'Inverse Case', slug: 'inverse-case-converter', category: 'converter', shortDescription: 'iNVERSE cASE', description: '', icon: 'Type', keywords: [], process: (s) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'sentence-case', name: 'Sentence Case', slug: 'sentence-case-converter', category: 'converter', shortDescription: 'Sentence case.', description: '', icon: 'Type', keywords: [], process: (s) => s.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()) },
  { id: 'remove-accents', name: 'Remove Accents', slug: 'remove-accents-from-text', category: 'cleaning', shortDescription: 'Strip accents.', description: '', icon: 'Type', keywords: [], process: (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "") },
  { id: 'remove-emojis', name: 'Remove Emojis', slug: 'remove-emojis-online', category: 'cleaning', shortDescription: 'Strip emojis.', description: '', icon: 'Smile', keywords: [], process: (s) => s.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDDFF])/g, '') },
  { id: 'remove-punctuation', name: 'Remove Punctuation', slug: 'remove-punctuation-tool', category: 'cleaning', shortDescription: 'Strip punctuation.', description: '', icon: 'Type', keywords: [], process: (s) => s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") },
  { id: 'base64-encode', name: 'Base64 Encode', slug: 'base64-encode-online', category: 'converter', shortDescription: 'Encode to Base64.', description: '', icon: 'Shield', keywords: [], process: (s) => btoa(s) },
  { id: 'base64-decode', name: 'Base64 Decode', slug: 'base64-decode-online', category: 'converter', shortDescription: 'Decode from Base64.', description: '', icon: 'Shield', keywords: [], process: (s) => { try { return atob(s); } catch(e) { return "Invalid Base64"; } } },
  { id: 'url-encode', name: 'URL Encode', slug: 'url-encode-online', category: 'converter', shortDescription: 'Encode URL.', description: '', icon: 'Globe', keywords: [], process: (s) => encodeURIComponent(s) },
  { id: 'url-decode', name: 'URL Decode', slug: 'url-decode-online', category: 'converter', shortDescription: 'Decode URL.', description: '', icon: 'Globe', keywords: [], process: (s) => decodeURIComponent(s) },
  { id: 'rot13', name: 'ROT13 Cipher', slug: 'rot13-cipher-online', category: 'converter', shortDescription: 'ROT13 encryption.', description: '', icon: 'Lock', keywords: [], process: (s) => s.replace(/[a-zA-Z]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code <= 90 ? 65 : 97;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  }) },
  { id: 'morse-code', name: 'Morse Code Translator', slug: 'morse-code-translator', category: 'converter', shortDescription: 'Text to Morse.', description: '', icon: 'Radio', keywords: [], process: (s) => {
    const map: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
    return s.toUpperCase().split('').map(c => map[c] || '').join(' ');
  }},
  { id: 'upside-down', name: 'Upside Down Text', slug: 'upside-down-text-generator', category: 'utility', shortDescription: 'Flip text upside down.', description: '', icon: 'RotateCw', keywords: [], process: (s) => {
    const map: any = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", "'": ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾' };
    return s.split('').map(c => map[c] || c).reverse().join('');
  }},
  { id: 'mirror-text', name: 'Mirror Text', slug: 'mirror-text-generator', category: 'utility', shortDescription: 'Mirror your text.', description: '', icon: 'Columns', keywords: [], process: (s) => s.split('').reverse().join('') },
  { id: 'line-counter', name: 'Line Counter', slug: 'line-counter-online', category: 'analysis', shortDescription: 'Count lines.', description: '', icon: 'List', keywords: [], process: (s) => `Lines: ${s.split(/\r?\n/).length}` },
  { id: 'sentence-counter', name: 'Sentence Counter', slug: 'sentence-counter-online', category: 'analysis', shortDescription: 'Count sentences.', description: '', icon: 'Type', keywords: [], process: (s) => `Sentences: ${s.split(/[\.\!\?]+/).filter(Boolean).length}` },
  { id: 'paragraph-counter', name: 'Paragraph Counter', slug: 'paragraph-counter-online', category: 'analysis', shortDescription: 'Count paragraphs.', description: '', icon: 'AlignLeft', keywords: [], process: (s) => `Paragraphs: ${s.split(/\n\s*\n/).filter(Boolean).length}` },
  { id: 'text-to-list', name: 'Text to List', slug: 'text-to-list-converter', category: 'utility', shortDescription: 'Convert to bullet list.', description: '', icon: 'List', keywords: [], process: (s) => s.split(/\r?\n/).map(line => `• ${line}`).join('\n') },
  { id: 'add-prefix', name: 'Add Prefix/Suffix', slug: 'add-prefix-suffix-to-lines', category: 'utility', shortDescription: 'Add text to start/end.', description: '', icon: 'Plus', keywords: [], process: (s, opts) => s.split(/\r?\n/).map(line => `${opts?.prefix || ''}${line}${opts?.suffix || ''}`).join('\n') },
  { id: 'random-string', name: 'Random String Generator', slug: 'random-string-generator-online', category: 'utility', shortDescription: 'Generate random text.', description: '', icon: 'Shuffle', keywords: [], process: (_, opts) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = opts?.length || 16;
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  }},
  { id: 'remove-all-whitespace', name: 'Remove All Whitespace', slug: 'remove-all-whitespace-online', category: 'cleaning', shortDescription: 'Remove every space.', description: '', icon: 'Minimize', keywords: [], process: (s) => s.replace(/\s/g, '') },
  { id: 'text-density', name: 'Text Density Analyzer', slug: 'text-density-analyzer', category: 'analysis', shortDescription: 'Analyze word frequency.', description: '', icon: 'BarChart', keywords: [], process: (s) => {
    const words = s.toLowerCase().match(/\w+/g) || [];
    const freq: any = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a: any, b: any) => b[1] - a[1]).slice(0, 10).map(([w, f]) => `${w}: ${f}`).join('\n');
  }},
  { id: 'case-distribution', name: 'Case Distribution', slug: 'case-distribution-analyzer', category: 'analysis', shortDescription: 'Upper/Lower/Numbers split.', description: '', icon: 'PieChart', keywords: [], process: (s) => {
    const upper = (s.match(/[A-Z]/g) || []).length;
    const lower = (s.match(/[a-z]/g) || []).length;
    const nums = (s.match(/[0-9]/g) || []).length;
    return `Uppercase: ${upper}\nLowercase: ${lower}\nNumbers: ${nums}`;
  }},
  { id: 'json-formatter', name: 'JSON Formatter', slug: 'json-formatter-online', category: 'utility', shortDescription: 'Prettify JSON.', description: '', icon: 'Braces', keywords: [], process: (s) => { try { return JSON.stringify(JSON.parse(s), null, 2); } catch(e) { return "Invalid JSON"; } } },
  { id: 'csv-to-json', name: 'CSV to JSON', slug: 'csv-to-json-converter', category: 'utility', shortDescription: 'CSV to JSON.', description: '', icon: 'Table', keywords: [], process: (s) => {
    const lines = s.split('\n');
    const headers = lines[0].split(',');
    const result = lines.slice(1).map(line => {
      const data = line.split(',');
      return headers.reduce((obj: any, header, i) => {
        obj[header.trim()] = data[i]?.trim();
        return obj;
      }, {});
    });
    return JSON.stringify(result, null, 2);
  }},
  { id: 'extract-emails', name: 'Extract Emails', slug: 'extract-emails-from-text', category: 'analysis', shortDescription: 'Pull all email addresses.', description: '', icon: 'Mail', keywords: [], process: (s) => (s.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || []).join('\n') },
  { id: 'extract-urls', name: 'Extract URLs', slug: 'extract-urls-from-text', category: 'analysis', shortDescription: 'Pull all website links.', description: '', icon: 'Link', keywords: [], process: (s) => (s.match(/https?:\/\/[^\s]+/g) || []).join('\n') },
  { id: 'hex-encode', name: 'Text to Hex', slug: 'text-to-hex-converter', category: 'converter', shortDescription: 'Convert to Hexadecimal.', description: '', icon: 'Binary', keywords: [], process: (s) => s.split('').map(c => c.charCodeAt(0).toString(16)).join(' ') },
  { id: 'hex-decode', name: 'Hex to Text', slug: 'hex-to-text-converter', category: 'converter', shortDescription: 'Convert Hex to Text.', description: '', icon: 'Binary', keywords: [], process: (s) => s.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('') },
  { id: 'html-encode', name: 'HTML Entity Encoder', slug: 'html-entity-encoder', category: 'converter', shortDescription: 'Encode HTML entities.', description: '', icon: 'Code', keywords: [], process: (s) => s.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';') },
  { id: 'html-decode', name: 'HTML Entity Decoder', slug: 'html-entity-decoder', category: 'converter', shortDescription: 'Decode HTML entities.', description: '', icon: 'Code', keywords: [], process: (s) => {
    const doc = new DOMParser().parseFromString(s, "text/html");
    return doc.documentElement.textContent || '';
  }},
  { id: 'remove-duplicate-words', name: 'Remove Duplicate Words', slug: 'remove-duplicate-words-online', category: 'cleaning', shortDescription: 'Strip repeating words.', description: '', icon: 'Trash', keywords: [], process: (s) => s.split(/\s+/).filter((w, i, a) => a.indexOf(w) === i).join(' ') },
  { id: 'zalgo-text', name: 'Zalgo Text Generator', slug: 'zalgo-text-generator', category: 'utility', shortDescription: 'Glitchy text effect.', description: '', icon: 'Zap', keywords: [], process: (s) => {
    const zalgo_up = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u033c', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    return s.split('').map(c => {
      let res = c;
      for(let i=0; i<3; i++) res += zalgo_up[Math.floor(Math.random()*zalgo_up.length)];
      return res;
    }).join('');
  }},
  { id: 'nato-phonetic', name: 'NATO Phonetic Alphabet', slug: 'nato-phonetic-alphabet-translator', category: 'converter', shortDescription: 'Alpha, Bravo, Charlie...', description: '', icon: 'Radio', keywords: [], process: (s) => {
    const map: any = { 'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu' };
    return s.toUpperCase().split('').map(c => map[c] || c).join(' ');
  }},
  { id: 'text-to-ascii-banner', name: 'ASCII Banner Generator', slug: 'ascii-banner-generator', category: 'utility', shortDescription: 'Simple text banner.', description: '', icon: 'Layout', keywords: [], process: (s) => s.split('').map(c => c.toUpperCase()).join('  ') },
  { id: 'remove-whitespace-trim', name: 'Trim Text', slug: 'trim-text-online', category: 'cleaning', shortDescription: 'Remove start/end spaces.', description: '', icon: 'Scissors', keywords: [], process: (s) => s.trim() },
  { id: 'char-frequency', name: 'Character Frequency', slug: 'character-frequency-counter', category: 'analysis', shortDescription: 'Count each character.', description: '', icon: 'BarChart', keywords: [], process: (s) => {
    const freq: any = {};
    s.split('').forEach(c => freq[c] = (freq[c] || 0) + 1);
    return Object.entries(freq).sort((a: any, b: any) => b[1] - a[1]).map(([c, f]) => `'${c}': ${f}`).join('\n');
  }},
  { id: 'word-length-stats', name: 'Word Length Stats', slug: 'word-length-statistics', category: 'analysis', shortDescription: 'Average word length.', description: '', icon: 'Activity', keywords: [], process: (s) => {
    const words = s.match(/\w+/g);
    if (!words || words.length === 0) return "No words found.";
    const total = words.reduce((acc: number, w: string) => acc + w.length, 0);
    return `Average Word Length: ${(total / words.length).toFixed(2)}\nTotal Words: ${words.length}`;
  }},
  { id: 'markdown-to-plain', name: 'Markdown to Plain Text', slug: 'markdown-to-plain-text', category: 'cleaning', shortDescription: 'Strip markdown syntax.', description: '', icon: 'FileText', keywords: [], process: (s) => s.replace(/(\*\*|__)(.*?)\1/g, '$2').replace(/(\*|_)(.*?)\1/g, '$2').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/^#+\s+/gm, '') },
];

export const ALL_TOOLS = [...TOOLS, ...additionalTools];
