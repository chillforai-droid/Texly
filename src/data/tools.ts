export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: 'cleaning' | 'converter' | 'analysis' | 'utility';
  description: string;
  shortDescription: string;
  icon: string;
  keywords: string[];
  example?: string;
  hook?: string;
  buttonText?: string;
  placeholder?: string;
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
    description: 'Remove extra spaces online for free. This tool helps you clean up messy text by removing double spaces, tabs, and trailing whitespace instantly.',
    icon: 'Space',
    keywords: ['remove extra spaces online', 'text cleaner tool free', 'trim whitespace'],
    example: 'This    is    a    text    with    too    many    spaces.',
    hook: 'Paste your messy text below and fix it instantly.',
    buttonText: 'Clean My Text',
    placeholder: 'Paste your text with extra spaces here...',
    process: (input) => input.replace(/\s+/g, ' ').trim(),
  },
  {
    id: 'remove-line-breaks',
    name: 'Remove Line Breaks',
    slug: 'remove-line-breaks-tool',
    category: 'cleaning',
    shortDescription: 'Instantly remove all line breaks from your text to make it a single line.',
    description: 'Remove line breaks tool for free. Perfect for cleaning up copied text from PDFs or emails and making it a single line.',
    icon: 'CornerDownLeft',
    keywords: ['remove line breaks tool', 'text to single line', 'newline remover'],
    example: 'This is a text\nwith multiple\nline breaks.',
    hook: 'Turn messy paragraphs into a single line in one click.',
    buttonText: 'Fix My Text',
    placeholder: 'Paste text with line breaks here...',
    process: (input) => input.replace(/[\r\n]+/g, ' '),
  },
  {
    id: 'remove-duplicate-lines',
    name: 'Remove Duplicate Lines',
    slug: 'remove-duplicate-lines-tool',
    category: 'cleaning',
    shortDescription: 'Find and remove all duplicate lines from your list or text.',
    description: 'Remove duplicate lines tool free. Clean up lists, logs, or any repetitive text data and keep only unique lines.',
    icon: 'CopyMinus',
    keywords: ['remove duplicate lines tool', 'deduplicate text', 'unique lines only'],
    example: 'Apple\nBanana\nApple\nOrange\nBanana',
    hook: 'Clean your list and remove all duplicates instantly.',
    buttonText: 'Clean My List',
    placeholder: 'Paste your list with duplicate lines here...',
    process: (input) => Array.from(new Set(input.split(/\r?\n/))).join('\n'),
  },
  {
    id: 'remove-empty-lines',
    name: 'Remove Empty Lines',
    slug: 'remove-empty-lines-online',
    category: 'cleaning',
    shortDescription: 'Quickly strip out all blank or empty lines from your text.',
    description: 'Remove empty lines online for free. This tool makes your text compact and clean by removing all blank or empty lines instantly.',
    icon: 'Rows',
    keywords: ['remove empty lines online', 'strip blank lines', 'text compactor'],
    example: 'Line 1\n\nLine 2\n\n\nLine 3',
    hook: 'Make your text clean and compact by removing empty lines.',
    buttonText: 'Clean My Text',
    placeholder: 'Paste text with empty lines here...',
    process: (input) => input.split(/\r?\n/).filter(line => line.trim() !== '').join('\n'),
  },
  {
    id: 'remove-numbers',
    name: 'Remove Numbers',
    slug: 'remove-numbers-from-text',
    category: 'cleaning',
    shortDescription: 'Strip all numerical digits from your text content.',
    description: 'Remove numbers from text easily for free. This tool is perfect for extracting only words from data sets or cleaning up text.',
    icon: 'Hash',
    keywords: ['remove numbers from text', 'strip digits', 'text only'],
    example: 'My phone number is 123-456-7890.',
    hook: 'Instantly remove all numbers from your text.',
    buttonText: 'Remove Numbers',
    placeholder: 'Paste text with numbers here...',
    process: (input) => input.replace(/[0-9]/g, ''),
  },
  {
    id: 'remove-special-characters',
    name: 'Remove Special Characters',
    slug: 'remove-special-characters-online',
    category: 'cleaning',
    shortDescription: 'Remove all symbols and special characters, leaving only letters and numbers.',
    description: 'Remove special characters online for free. Clean your text for filenames or database entries by leaving only letters and numbers.',
    icon: 'ShieldAlert',
    keywords: ['remove special characters online', 'alphanumeric only', 'clean text symbols'],
    example: 'Hello! How are you? (I am fine @ home).',
    hook: 'Clean your text by removing all special characters and symbols.',
    buttonText: 'Clean My Text',
    placeholder: 'Paste text with special characters here...',
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
    example: '<p>Visit <a href="https://texly.online">Texly</a> for free text tools.</p>',
    hook: 'Strip all HTML tags and keep only the plain text.',
    buttonText: 'Clean My HTML',
    placeholder: 'Paste HTML code here...',
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
    example: 'convert this text to uppercase',
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
    example: 'CONVERT THIS TEXT TO LOWERCASE',
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
    example: 'the quick brown fox jumps over the lazy dog',
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
    example: 'How to use Texly.online for free text tools',
    hook: 'Create SEO-friendly URL slugs for your blog or website instantly.',
    buttonText: 'Generate Slug',
    placeholder: 'Paste your title or phrase here...',
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
    example: '01001000 01100101 01101100 01101100 01101111',
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
    example: 'Hello',
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
    example: 'This is a sample text for word counting.',
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
    example: 'This is a sample text to estimate how long it takes to read.',
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
    example: 'Check out https://texly.online for more tools!',
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
    example: 'Repeat me!',
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
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
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
    example: 'The quick brown fox jumps over the lazy dog.',
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
    example: 'Zebra\nApple\nMonkey\nBanana',
    process: (input) => input.split(/\r?\n/).sort().join('\n'),
  },
];

// Add more tools to reach 50+
const additionalTools: Tool[] = [
  { id: 'camel-case', name: 'Camel Case', slug: 'camel-case-converter', category: 'converter', shortDescription: 'Convert text to camelCase.', description: 'Camel case converter online. Transform your text into camelCase format, commonly used in programming for variable names.', icon: 'Type', keywords: ['camel case converter', 'camelcase tool', 'text to camelcase'], example: 'hello world', process: (s) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '') },
  { id: 'snake-case', name: 'Snake Case', slug: 'snake-case-converter', category: 'converter', shortDescription: 'Convert text to snake_case.', description: 'Snake case converter online. Transform your text into snake_case format, ideal for database fields and filenames.', icon: 'Type', keywords: ['snake case converter', 'snake_case tool', 'text to snake_case'], example: 'hello world', process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || '' },
  { id: 'kebab-case', name: 'Kebab Case', slug: 'kebab-case-converter', category: 'converter', shortDescription: 'Convert text to kebab-case.', description: 'Kebab case converter online. Transform your text into kebab-case format, perfect for SEO-friendly URLs.', icon: 'Type', keywords: ['kebab case converter', 'kebab-case tool', 'text to kebab-case'], example: 'hello world', process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('-') || '' },
  { id: 'pascal-case', name: 'Pascal Case', slug: 'pascal-case-converter', category: 'converter', shortDescription: 'Convert text to PascalCase.', description: 'Pascal case converter online. Transform your text into PascalCase format, often used for class names in programming.', icon: 'Type', keywords: ['pascal case converter', 'pascalcase tool', 'text to pascalcase'], example: 'hello world', process: (s) => s.replace(/(?:^\w|[A-Z]|\b\w)/g, (w) => w.toUpperCase()).replace(/\s+/g, '') },
  { id: 'constant-case', name: 'Constant Case', slug: 'constant-case-converter', category: 'converter', shortDescription: 'Convert text to CONSTANT_CASE.', description: 'Constant case converter online. Transform your text into CONSTANT_CASE format, used for constants in many programming languages.', icon: 'Type', keywords: ['constant case converter', 'constant_case tool', 'text to constant_case'], example: 'hello world', process: (s) => s.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toUpperCase()).join('_') || '' },
  { id: 'alternating-case', name: 'Alternating Case', slug: 'alternating-case-converter', category: 'converter', shortDescription: 'Convert text to AlTeRnAtInG CaSe.', description: 'Alternating case converter online. Create a fun AlTeRnAtInG CaSe effect for your text.', icon: 'Type', keywords: ['alternating case converter', 'sarcastic text generator', 'mocking sponge bob text'], example: 'hello world', process: (s) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'inverse-case', name: 'Inverse Case', slug: 'inverse-case-converter', category: 'converter', shortDescription: 'Invert the case of each character.', description: 'Inverse case converter online. Flip uppercase to lowercase and vice-versa for every character in your text.', icon: 'Type', keywords: ['inverse case converter', 'case flipper', 'invert text case'], example: 'Hello World', process: (s) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('') },
  { id: 'sentence-case', name: 'Sentence Case', slug: 'sentence-case-converter', category: 'converter', shortDescription: 'Capitalize the first letter of each sentence.', description: 'Sentence case converter online. Automatically capitalize the first letter of every sentence in your text.', icon: 'Type', keywords: ['sentence case converter', 'capitalize sentences', 'proper sentence case'], example: 'hello world. this is a test.', process: (s) => s.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase()) },
  { id: 'remove-accents', name: 'Remove Accents', slug: 'remove-accents-from-text', category: 'cleaning', shortDescription: 'Strip accents from characters.', description: 'Remove accents from text online. Convert accented characters like é, à, ö into their plain versions.', icon: 'Type', keywords: ['remove accents from text', 'strip diacritics', 'normalize text'], example: 'Crème brûlée', process: (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "") },
  { id: 'remove-emojis', name: 'Remove Emojis', slug: 'remove-emojis-online', category: 'cleaning', shortDescription: 'Strip all emojis from text.', description: 'Remove emojis online. Clean your text by removing all graphical emojis and symbols.', icon: 'Smile', keywords: ['remove emojis online', 'strip emojis', 'text only without emojis'], example: 'Hello 🌍! How are you? 😊', process: (s) => s.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD00-\uDDFF])/g, '') },
  { id: 'remove-punctuation', name: 'Remove Punctuation', slug: 'remove-punctuation-tool', category: 'cleaning', shortDescription: 'Strip all punctuation marks.', description: 'Remove punctuation tool online. Strip commas, periods, exclamation marks, and other symbols from your text.', icon: 'Type', keywords: ['remove punctuation tool', 'strip punctuation', 'text without symbols'], example: 'Hello, world! (This is a test.)', process: (s) => s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "") },
  { id: 'base64-encode', name: 'Base64 Encode', slug: 'base64-encode-online', category: 'converter', shortDescription: 'Encode text to Base64 format.', description: 'Base64 encode online. Convert plain text into Base64 encoded strings for data transmission.', icon: 'Shield', keywords: ['base64 encode online', 'text to base64', 'base64 encoder'], example: 'Hello World', process: (s) => btoa(s) },
  { id: 'base64-decode', name: 'Base64 Decode', slug: 'base64-decode-online', category: 'converter', shortDescription: 'Decode Base64 strings to text.', description: 'Base64 decode online. Convert Base64 encoded strings back into readable plain text.', icon: 'Shield', keywords: ['base64 decode online', 'base64 to text', 'base64 decoder'], example: 'SGVsbG8gV29ybGQ=', process: (s) => { try { return atob(s); } catch(e) { return "Invalid Base64"; } } },
  { id: 'url-encode', name: 'URL Encode', slug: 'url-encode-online', category: 'converter', shortDescription: 'Encode URL.', description: 'URL encoder online. Convert special characters in URLs into a format that can be transmitted over the internet.', icon: 'Globe', keywords: ['url encode online', 'percent encoding', 'url encoder'], example: 'https://texly.online/search?q=text tools', process: (s) => encodeURIComponent(s) },
  { id: 'url-decode', name: 'URL Decode', slug: 'url-decode-online', category: 'converter', shortDescription: 'Decode URL.', description: 'URL decoder online. Convert percent-encoded URLs back to readable text.', icon: 'Globe', keywords: ['url decode online', 'percent decoding decoder', 'url decoder'], example: 'https%3A%2F%2Ftexly.online%2Fsearch%3Fq%3Dtext%20tools', process: (s) => decodeURIComponent(s) },
  { id: 'rot13', name: 'ROT13 Cipher', slug: 'rot13-cipher-online', category: 'converter', shortDescription: 'Encode or decode text using ROT13.', description: 'ROT13 cipher online. A simple substitution cipher that replaces a letter with the 13th letter after it in the alphabet.', icon: 'Lock', keywords: ['rot13 cipher online', 'rot13 encoder', 'rot13 decoder'], example: 'Hello World', process: (s) => s.replace(/[a-zA-Z]/g, (c) => {
    const code = c.charCodeAt(0);
    const base = code <= 90 ? 65 : 97;
    return String.fromCharCode(((code - base + 13) % 26) + base);
  }) },
  { id: 'morse-code', name: 'Morse Code Translator', slug: 'morse-code-translator', category: 'converter', shortDescription: 'Translate text to Morse code.', description: 'Morse code translator online. Convert any text into international Morse code dots and dashes.', icon: 'Radio', keywords: ['morse code translator', 'text to morse', 'morse code encoder'], example: 'Hello', process: (s) => {
    const map: any = { 'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----', ' ': '/' };
    return s.toUpperCase().split('').map(c => map[c] || '').join(' ');
  }},
  { id: 'upside-down', name: 'Upside Down Text', slug: 'upside-down-text-generator', category: 'utility', shortDescription: 'Flip your text upside down.', description: 'Upside down text generator. Create flipped and reversed text for social media or fun messages.', icon: 'RotateCw', keywords: ['upside down text generator', 'flip text online', 'inverted text'], example: 'Hello World', process: (s) => {
    const map: any = { 'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ', 'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd', 'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x', 'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ', 'G': 'פ', 'H': 'H', 'I': 'I', 'J': 'ſ', 'K': 'ʞ', 'L': '˥', 'M': 'W', 'N': 'N', 'O': 'O', 'P': 'Ԁ', 'Q': 'Q', 'R': 'ᴚ', 'S': 'S', 'T': '┴', 'U': '∩', 'V': 'Λ', 'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'", "'": ',', '"': '„', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{', '<': '>', '>': '<', '&': '⅋', '_': '‾' };
    return s.split('').map(c => map[c] || c).reverse().join('');
  }},
  { id: 'mirror-text', name: 'Mirror Text', slug: 'mirror-text-generator', category: 'utility', shortDescription: 'Create a mirror image of your text.', description: 'Mirror text generator online. Flip your text horizontally to create a mirrored effect.', icon: 'Columns', keywords: ['mirror text generator', 'reverse text online', 'mirrored writing'], example: 'Hello World', process: (s) => s.split('').reverse().join('') },
  { id: 'line-counter', name: 'Line Counter', slug: 'line-counter-online', category: 'analysis', shortDescription: 'Count the number of lines in your text.', description: 'Line counter online. Quickly find out how many lines are in your document or list.', icon: 'List', keywords: ['line counter online', 'count lines in text', 'text line count'], example: 'Line 1\nLine 2\nLine 3', process: (s) => `Lines: ${s.split(/\r?\n/).length}` },
  { id: 'sentence-counter', name: 'Sentence Counter', slug: 'sentence-counter-online', category: 'analysis', shortDescription: 'Count the number of sentences.', description: 'Sentence counter online. Analyze your text to find the total number of sentences.', icon: 'Type', keywords: ['sentence counter online', 'count sentences in text', 'text analysis tool'], example: 'Hello world. This is a test! How are you?', process: (s) => `Sentences: ${s.split(/[\.\!\?]+/).filter(Boolean).length}` },
  { id: 'paragraph-counter', name: 'Paragraph Counter', slug: 'paragraph-counter-online', category: 'analysis', shortDescription: 'Count the number of paragraphs.', description: 'Paragraph counter online. Get an accurate count of paragraphs in your content.', icon: 'AlignLeft', keywords: ['paragraph counter online', 'count paragraphs in text', 'text structure analysis'], example: 'Paragraph 1\n\nParagraph 2', process: (s) => `Paragraphs: ${s.split(/\n\s*\n/).filter(Boolean).length}` },
  { id: 'text-to-list', name: 'Text to List', slug: 'text-to-list-converter', category: 'utility', shortDescription: 'Convert lines of text into a bulleted list.', description: 'Text to list converter. Automatically add bullet points to every line of your text.', icon: 'List', keywords: ['text to list converter', 'bullet point generator', 'list maker online'], example: 'Item 1\nItem 2\nItem 3', process: (s) => s.split(/\r?\n/).map(line => `• ${line}`).join('\n') },
  { id: 'add-prefix', name: 'Add Prefix/Suffix', slug: 'add-prefix-suffix-to-lines', category: 'utility', shortDescription: 'Add text to the beginning or end of each line.', description: 'Add prefix or suffix to lines online. Bulk add characters or words to the start or end of every line.', icon: 'Plus', keywords: ['add prefix to lines', 'add suffix to lines', 'bulk text adder'], example: 'Line 1\nLine 2', process: (s, opts) => s.split(/\r?\n/).map(line => `${opts?.prefix || ''}${line}${opts?.suffix || ''}`).join('\n') },
  { id: 'random-string', name: 'Random String Generator', slug: 'random-string-generator-online', category: 'utility', shortDescription: 'Generate a random string of characters.', description: 'Random string generator online. Create secure, random strings for passwords or testing.', icon: 'Shuffle', keywords: ['random string generator', 'password generator', 'random text creator'], example: 'Click generate to get a random string.', process: (_, opts) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const length = opts?.length || 16;
    for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
  }},
  { id: 'remove-all-whitespace', name: 'Remove All Whitespace', slug: 'remove-all-whitespace-online', category: 'cleaning', shortDescription: 'Remove all spaces and tabs from text.', description: 'Remove all whitespace online. Strip every single space, tab, and newline from your content.', icon: 'Minimize', keywords: ['remove all whitespace', 'strip all spaces', 'no space text'], example: 'This is a text with spaces.', process: (s) => s.replace(/\s/g, '') },
  { id: 'text-density', name: 'Text Density Analyzer', slug: 'text-density-analyzer', category: 'analysis', shortDescription: 'Analyze word frequency and density.', description: 'Text density analyzer online. Find the most frequently used words in your text for SEO analysis.', icon: 'BarChart', keywords: ['text density analyzer', 'word frequency counter', 'keyword density tool'], example: 'The quick brown fox jumps over the lazy dog. The dog was lazy.', process: (s) => {
    const words = s.toLowerCase().match(/\w+/g) || [];
    const freq: any = {};
    words.forEach(w => freq[w] = (freq[w] || 0) + 1);
    return Object.entries(freq).sort((a: any, b: any) => b[1] - a[1]).slice(0, 10).map(([w, f]) => `${w}: ${f}`).join('\n');
  }},
  { id: 'case-distribution', name: 'Case Distribution', slug: 'case-distribution-analyzer', category: 'analysis', shortDescription: 'Analyze the distribution of character cases.', description: 'Case distribution analyzer. Get statistics on uppercase, lowercase, and numeric characters in your text.', icon: 'PieChart', keywords: ['case distribution analyzer', 'text case stats', 'character analysis'], example: 'Hello World 123', process: (s) => {
    const upper = (s.match(/[A-Z]/g) || []).length;
    const lower = (s.match(/[a-z]/g) || []).length;
    const nums = (s.match(/[0-9]/g) || []).length;
    return `Uppercase: ${upper}\nLowercase: ${lower}\nNumbers: ${nums}`;
  }},
  { id: 'json-formatter', name: 'JSON Formatter', slug: 'json-formatter-online', category: 'utility', shortDescription: 'Format and prettify JSON code.', description: 'JSON formatter online. Prettify messy JSON strings into a readable, indented format.', icon: 'Braces', keywords: ['json formatter online', 'prettify json', 'json beautifier'], example: '{"name":"John","age":30,"city":"New York"}', process: (s) => { try { return JSON.stringify(JSON.parse(s), null, 2); } catch(e) { return "Invalid JSON"; } } },
  { id: 'csv-to-json', name: 'CSV to JSON', slug: 'csv-to-json-converter', category: 'utility', shortDescription: 'Convert CSV data to JSON format.', description: 'CSV to JSON converter online. Transform comma-separated values into structured JSON objects.', icon: 'Table', keywords: ['csv to json converter', 'csv to json online', 'data converter'], example: 'name,age,city\nJohn,30,New York\nJane,25,Los Angeles', process: (s) => {
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
  { id: 'extract-emails', name: 'Extract Emails', slug: 'extract-emails-from-text', category: 'analysis', shortDescription: 'Pull all email addresses.', description: 'Extract emails from text online. Find and list all email addresses from any content.', icon: 'Mail', keywords: ['extract emails from text', 'email extractor', 'find emails'], example: 'Contact us at support@texly.online or info@example.com', process: (s) => (s.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) || []).join('\n') },
  { id: 'extract-urls', name: 'Extract URLs', slug: 'extract-urls-from-text', category: 'analysis', shortDescription: 'Pull all website links.', description: 'Extract URLs from text online. Find and list all website links from any content.', icon: 'Link', keywords: ['extract urls from text', 'url extractor', 'find links'], example: 'Visit https://texly.online and http://google.com', process: (s) => (s.match(/https?:\/\/[^\s]+/g) || []).join('\n') },
  { id: 'hex-encode', name: 'Text to Hex', slug: 'text-to-hex-converter', category: 'converter', shortDescription: 'Convert plain text into hexadecimal format.', description: 'Text to hex converter online. Transform your text into its hexadecimal representation.', icon: 'Binary', keywords: ['text to hex converter', 'hex encoder', 'string to hex'], example: 'Hello', process: (s) => s.split('').map(c => c.charCodeAt(0).toString(16)).join(' ') },
  { id: 'hex-decode', name: 'Hex to Text', slug: 'hex-to-text-converter', category: 'converter', shortDescription: 'Convert hexadecimal code back to text.', description: 'Hex to text converter online. Decode hexadecimal strings back into readable plain text.', icon: 'Binary', keywords: ['hex to text converter', 'hex decoder', 'hex to string'], example: '48 65 6c 6c 6f', process: (s) => s.split(' ').map(h => String.fromCharCode(parseInt(h, 16))).join('') },
  { id: 'html-encode', name: 'HTML Entity Encoder', slug: 'html-entity-encoder', category: 'converter', shortDescription: 'Encode special characters into HTML entities.', description: 'HTML entity encoder. Convert special characters like <, >, and & into their HTML entity equivalents.', icon: 'Code', keywords: ['html entity encoder', 'html escape', 'encode html'], example: 'Hello & World < >', process: (s) => s.replace(/[\u00A0-\u9999<>\&]/g, (i) => '&#' + i.charCodeAt(0) + ';') },
  { id: 'html-decode', name: 'HTML Entity Decoder', slug: 'html-entity-decoder', category: 'converter', shortDescription: 'Decode HTML entities back to characters.', description: 'HTML entity decoder. Convert HTML entities like &#38; back into their original characters.', icon: 'Code', keywords: ['html entity decoder', 'html unescape', 'decode html'], example: 'Hello &#38; World &#60; &#62;', process: (s) => {
    const doc = new DOMParser().parseFromString(s, "text/html");
    return doc.documentElement.textContent || '';
  }},
  { id: 'remove-duplicate-words', name: 'Remove Duplicate Words', slug: 'remove-duplicate-words-online', category: 'cleaning', shortDescription: 'Remove repeating words from your text.', description: 'Remove duplicate words online. Clean up your sentences by removing consecutive or redundant words.', icon: 'Trash', keywords: ['remove duplicate words', 'deduplicate words', 'text cleaner'], example: 'This is is a a test test.', process: (s) => s.split(/\s+/).filter((w, i, a) => a.indexOf(w) === i).join(' ') },
  { id: 'zalgo-text', name: 'Zalgo Text Generator', slug: 'zalgo-text-generator', category: 'utility', shortDescription: 'Generate glitchy, distorted Zalgo text.', description: 'Zalgo text generator online. Create creepy, distorted, and glitchy text effects for fun.', icon: 'Zap', keywords: ['zalgo text generator', 'glitch text', 'creepy text creator'], example: 'Zalgo is coming', process: (s) => {
    const zalgo_up = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u033c', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'];
    return s.split('').map(c => {
      let res = c;
      for(let i=0; i<3; i++) res += zalgo_up[Math.floor(Math.random()*zalgo_up.length)];
      return res;
    }).join('');
  }},
  { id: 'nato-phonetic', name: 'NATO Phonetic Alphabet', slug: 'nato-phonetic-alphabet-translator', category: 'converter', shortDescription: 'Convert text to NATO phonetic alphabet.', description: 'NATO phonetic alphabet translator. Convert letters into their corresponding code words (Alpha, Bravo, Charlie...).', icon: 'Radio', keywords: ['nato phonetic alphabet', 'phonetic alphabet translator', 'spelling alphabet'], example: 'Hello', process: (s) => {
    const map: any = { 'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo', 'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliet', 'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar', 'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango', 'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee', 'Z': 'Zulu' };
    return s.toUpperCase().split('').map(c => map[c] || c).join(' ');
  }},
  { id: 'text-to-ascii-banner', name: 'ASCII Banner Generator', slug: 'ascii-banner-generator', category: 'utility', shortDescription: 'Create simple ASCII art banners.', description: 'ASCII banner generator online. Transform your text into large, stylized ASCII art banners.', icon: 'Layout', keywords: ['ascii banner generator', 'ascii art text', 'text to ascii'], example: 'Hello', process: (s) => s.split('').map(c => c.toUpperCase()).join('  ') },
  { id: 'remove-whitespace-trim', name: 'Trim Text', slug: 'trim-text-online', category: 'cleaning', shortDescription: 'Remove whitespace from both ends of text.', description: 'Trim text online. Quickly remove all leading and trailing spaces from your content.', icon: 'Scissors', keywords: ['trim text online', 'remove leading spaces', 'strip trailing whitespace'], example: '   Trim me   ', process: (s) => s.trim() },
  { id: 'char-frequency', name: 'Character Frequency', slug: 'character-frequency-counter', category: 'analysis', shortDescription: 'Count the frequency of each character.', description: 'Character frequency counter. Get a detailed breakdown of how many times each character appears in your text.', icon: 'BarChart', keywords: ['character frequency counter', 'char count stats', 'text analysis'], example: 'Hello World', process: (s) => {
    const freq: any = {};
    s.split('').forEach(c => freq[c] = (freq[c] || 0) + 1);
    return Object.entries(freq).sort((a: any, b: any) => b[1] - a[1]).map(([c, f]) => `'${c}': ${f}`).join('\n');
  }},
  { id: 'word-length-stats', name: 'Word Length Stats', slug: 'word-length-statistics', category: 'analysis', shortDescription: 'Calculate average word length and statistics.', description: 'Word length statistics tool. Analyze your text to find average word length and total word count.', icon: 'Activity', keywords: ['word length statistics', 'average word length', 'text stats'], example: 'The quick brown fox jumps over the lazy dog.', process: (s) => {
    const words = s.match(/\w+/g);
    if (!words || words.length === 0) return "No words found.";
    const total = words.reduce((acc: number, w: string) => acc + w.length, 0);
    return `Average Word Length: ${(total / words.length).toFixed(2)}\nTotal Words: ${words.length}`;
  }},
  { id: 'markdown-to-plain', name: 'Markdown to Plain Text', slug: 'markdown-to-plain-text', category: 'cleaning', shortDescription: 'Convert Markdown to plain text.', description: 'Markdown to plain text converter. Strip all markdown syntax (bold, italic, links) to get the raw text.', icon: 'FileText', keywords: ['markdown to plain text', 'strip markdown', 'markdown cleaner'], example: '# Heading\nThis is **bold** and *italic*. [Link](https://texly.online)', process: (s) => s.replace(/(\*\*|__)(.*?)\1/g, '$2').replace(/(\*|_)(.*?)\1/g, '$2').replace(/\[(.*?)\]\(.*?\)/g, '$1').replace(/^#+\s+/gm, '') },
  { id: 'image-to-text', name: 'Image to Text Extract', slug: 'image-to-text-extractor', category: 'analysis', shortDescription: 'Extract text from images using OCR.', description: 'Image to text extractor online. Upload an image and extract all readable text instantly using advanced OCR technology.', icon: 'Image', keywords: ['image to text extract', 'ocr online free', 'extract text from image'], example: 'Upload an image to see the extracted text here.', process: (s) => s },
];

export const ALL_TOOLS = [...TOOLS, ...additionalTools];
