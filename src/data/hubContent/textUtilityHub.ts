export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const textUtilityHubTools: HubToolContent[] = [
  {
    id: "text-reverser",
    name: "Text Reverser",
    description: "Ever typed something backwards just for fun or needed to reverse a string for a coding challenge? This thing flips your entire text from last character to first. Great for creating puzzles, testing palindrome logic, or just messing with friends. Type \"hello\" and get \"olleh\" - simple as that. It handles spaces, punctuation, and line breaks without breaking a sweat. No uploads, no tracking, just reverse and copy.",
    howToUse: ["Paste or type your text into the input box", "Click the Reverse button", "Copy the flipped result from the output area"],
    faq: { q: "does text reverser work with emojis and special characters?", a: "Yes, it handles emojis, accented letters, and most Unicode characters correctly. Each character gets reversed in sequence, so your emojis stay intact but appear in reverse order." },
    relatedToolIds: ["mirror-text-generator", "upside-down-text-generator", "text-steganography"]
  },
  {
    id: "text-repeater",
    name: "Text Repeater",
    description: "Need to repeat a word 50 times for a test, generate placeholder content, or create a pattern? Specify how many copies you want and hit go. You can add custom separators too - spaces, commas, line breaks, whatever works. I use this when I'm testing how layouts handle repeated content or when I need a quick data sample. The repetition happens in your browser, so you can generate thousands of lines instantly without waiting on a server.",
    howToUse: ["Enter the text you want to repeat", "Set the number of repetitions (1 to 10,000)", "Choose a separator (space, comma, new line, or custom)", "Click Repeat and copy the result"],
    faq: { q: "what's the maximum number of repetitions allowed?", a: "You can go up to 10,000 repetitions at once. For extremely long repeats, the browser might slow down, so stick to a few thousand for best performance." },
    relatedToolIds: ["lorem-ipsum", "add-prefix-suffix-to-lines", "random-string-generator-online"]
  },
  {
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Designers and developers know the struggle - you need filler text that looks realistic but means nothing. This generator lets you create paragraphs, sentences, or words of classic placeholder text. Want 5 paragraphs? Done. Need 30 short snippets? Also fine. You can even tweak the length from super short to absurdly long. Unlike those fancy generators with a million options, this keeps it simple because most of us just need text that doesn't distract from the layout.",
    howToUse: ["Select the unit type (paragraphs, sentences, or words)", "Enter the quantity you need", "Adjust the length slider from short to long", "Generate and copy your placeholder text"],
    faq: { q: "can I generate lorem ipsum that starts with the classic 'Lorem ipsum dolor sit amet'?", a: "Yes, the first paragraph always starts with the traditional Latin opening. Subsequent paragraphs use the full standard lorem ipsum text that designers have relied on for decades." },
    relatedToolIds: ["text-repeater", "random-string-generator-online", "text-to-list"]
  },
  {
    id: "find-and-replace-text-online",
    name: "Find and Replace",
    description: "You've got a long document and need to swap every 'color' to 'colour' or fix a repeated typo across hundreds of lines. This tool does exactly that - find every instance of your search term and replace it with something else. Case sensitivity? Toggle it. Replace all at once or one by one? Your call. I built this for those moments when you're knee-deep in data and manual editing would take forever. It handles multiline text and preserves formatting, so you're not fixing one thing and breaking another.",
    howToUse: ["Paste your original text into the main box", "Enter the word or phrase to find", "Enter the replacement text", "Click Replace All or use Replace One to check each match", "Copy the cleaned-up result"],
    faq: { q: "does find and replace support regular expressions?", a: "Currently it handles plain text matching only. For regex patterns, you'd need a more advanced tool, but for 99% of everyday find-and-replace tasks, the simple text matching works perfectly." },
    relatedToolIds: ["add-prefix-suffix-to-lines", "text-to-json", "sql-formatter"]
  },
  {
    id: "sort-lines-alphabetically",
    name: "Sort Lines A to Z",
    description: "Got a messy list of names, email addresses, or inventory items? Drop them here and watch them snap into alphabetical order. It's like having a personal assistant who alphabetizes everything instantly. You can sort ascending (A to Z) or descending (Z to A). I use this constantly for cleaning up CSV exports, organizing to-do lists, or just making sense of random data dumps. The sorting is pure JavaScript running locally, so your data never leaves your computer.",
    howToUse: ["Paste your list (one item per line)", "Choose ascending or descending order", "Click Sort Lines", "Copy the organized list"],
    faq: { q: "does it handle numbers and special characters correctly?", a: "Yes, it sorts using standard string comparison. Numbers come before letters, and special characters follow Unicode ordering, which works for most real-world lists." },
    relatedToolIds: ["sort-lines-reverse", "text-to-list", "csv-to-json-converter"]
  },
  {
    id: "text-to-list",
    name: "Text to List Converter",
    description: "Raw text with spaces, commas, or custom separators needs to become a proper list. This tool splits your content into individual lines based on whatever delimiter you choose. Space-separated words become a vertical list. Comma-separated values become line-by-line items. You can even remove empty lines and trim extra whitespace automatically. Think of it as untangling a messy string into something you can actually work with, line by line.",
    howToUse: ["Paste your delimited text", "Select or type the delimiter (space, comma, semicolon, or custom)", "Check 'trim whitespace' if needed", "Convert and get your line-separated list"],
    faq: { q: "can I convert a paragraph into a list of individual words?", a: "Absolutely. Just set space as your delimiter, and every word becomes its own line. This is perfect for word frequency analysis or creating word lists from sentences." },
    relatedToolIds: ["add-prefix-suffix-to-lines", "sort-lines-alphabetically", "csv-to-json-converter"]
  },
  {
    id: "add-prefix-suffix-to-lines",
    name: "Add Prefix or Suffix to Lines",
    description: "Ever needed to add a bullet point to every line, or wrap each email address in quotes, or stick a comma at the end of 200 lines? This is your tool. Add anything before each line, after each line, or both. You can even skip empty lines so your formatting stays clean. I use this when generating SQL insert statements (add 'INSERT INTO table VALUES (' as prefix and ');' as suffix) or when formatting lists for markdown. Saves so much typing.",
    howToUse: ["Paste your list of lines", "Enter the prefix text (what goes before each line)", "Enter the suffix text (what goes after each line)", "Click Apply to all lines", "Copy the modified list"],
    faq: { q: "can I add different prefixes to different lines based on content?", a: "This version adds the same prefix and suffix to every line. For conditional prefixes, you'd need a more complex tool, but for bulk uniform additions, this works instantly." },
    relatedToolIds: ["text-repeater", "text-to-list", "find-and-replace-text-online"]
  },
  {
    id: "upside-down-text-generator",
    name: "Upside Down Text",
    description: "ʇxǝʇ uʍop ǝpᴉsdn pǝuɹnʇ ʇǝƃ noʎ ʎɐʍ sᴉɥʇ 'sᴉɥʇ ǝʞᴉl sʞool ʇxǝʇ uʍop ǝpᴉsdn ʇɐɥM - fun, right? This generator flips each character to its upside-down Unicode equivalent. Works great for social media bios, pranking friends, or just making your text stand out in a sea of boring horizontal words. Not every character has an upside-down version (numbers get a bit weird), but most letters work beautifully.",
    howToUse: ["Type or paste normal text in the input field", "Watch the upside-down version appear instantly", "Copy the flipped text and paste it anywhere that supports Unicode"],
    faq: { q: "why do some letters not flip correctly?", a: "Unicode doesn't define upside-down versions for every character, so rare letters and some symbols may show as question marks or original characters. Common A-Z letters work great though." },
    relatedToolIds: ["mirror-text-generator", "text-reverser", "zalgo-text-generator"]
  },
  {
    id: "mirror-text-generator",
    name: "Mirror Text Generator",
    description: "Ever seen those backwards signs on emergency vehicles? This does the same thing - it creates a mirror image of your text that reads properly when reflected. Type 'hello' and get 'ollǝɥ' - but it's not just reversed, characters get swapped for their mirrored Unicode equivalents. It's disorienting in the best way. Great for creative writing projects, puzzles, or when you want someone to do a double-take at your message.",
    howToUse: ["Enter your text in the input area", "The mirrored version generates automatically", "Copy the result and paste it anywhere"],
    faq: { q: "does mirror text work in all apps and websites?", a: "Most modern apps support the Unicode mirror characters this tool uses. Older systems might show blank boxes, but places like Twitter, Discord, and modern browsers handle it fine." },
    relatedToolIds: ["text-reverser", "upside-down-text-generator", "fancy-text-generator-online"]
  },
  {
    id: "fancy-text-generator-online",
    name: "Fancy Text Generator",
    description: "Bored of plain letters? Turn your normal text into dozens of stylized variants - bold, italic, script, double-struck, monospace, and those cool mathematical looking fonts. Each style uses special Unicode characters that look different but are still readable. I use this when I want a username that stands out or a social media post that isn't just the same old Arial. The best part? No font installation needed - the fancy characters work anywhere Unicode does.",
    howToUse: ["Type your text in the input box", "Browse through the available font style panels", "Click any style to copy it to your clipboard", "Paste directly into social media, games, or documents"],
    faq: { q: "will the fancy text still be readable on mobile devices?", a: "Yes, most smartphones include these Unicode character sets. The text might look slightly different between iOS and Android, but it remains recognizable and readable." },
    relatedToolIds: ["upside-down-text-generator", "zalgo-text-generator", "ascii-banner-generator"]
  },
  {
    id: "zalgo-text-generator",
    name: "Zalgo Text Generator",
    description: "H̤ͭ̔̅e̞̞̩̮̽ͧͤͧ̇ͫ ̘̕c̼͢o̷̺̬̯̫m̦̦͉̙̹̕e̛̙̬̠ͪ̂ͥ̊s͂ͪ͑̔. This adds those creepy diacritical marks above, below, and through your letters - the more intensity, the more chaos. Want mildly cursed text? Low intensity. Want something that looks like an eldritch horror wrote it? Crank it to max. Perfect for horror game comments, memes, or any time you need text that looks genuinely unsettling. The marks don't change the underlying letters, they just... corrupt them.",
    howToUse: ["Type or paste clean text", "Adjust the intensity slider (minimal, moderate, or maximum corruption)", "Click Generate to add the Zalgo marks", "Copy and unleash the chaos"],
    faq: { q: "why does zalgo text sometimes break layout or line height?", a: "The combining diacritical marks stack vertically, which can increase line height dramatically. Most apps handle it fine, but some may clip or overlap the corrupted text." },
    relatedToolIds: ["fancy-text-generator-online", "upside-down-text-generator", "mirror-text-generator"]
  },
  {
    id: "invisible-text",
    name: "Invisible Text Generator",
    description: "Need characters that take up space but show nothing? This creates invisible text using Unicode's hangul filler and zero-width space characters. Great for empty usernames on platforms that don't allow blanks, adding hidden comments in documents, or creating secret messages between visible text. Copy the invisible result and paste it somewhere - it looks empty but it's really there. Sneaky, right?",
    howToUse: ["Select the type of invisible character (space, filler, or zero-width)", "Choose how many characters you want", "Click Generate to create invisible text", "Copy the selection (it will look empty but it's selected)", "Paste into any text field"],
    faq: { q: "will websites detect invisible text as spam?", a: "Some platforms filter zero-width characters to prevent hidden spam. Use this tool for creative purposes, not for bypassing content filters or hiding malicious content." },
    relatedToolIds: ["text-steganography", "random-string-generator-online", "fancy-text-generator-online"]
  },
  {
    id: "text-steganography",
    name: "Text Steganography (Hide Text in Text)",
    description: "Want to hide a secret message inside a harmless-looking sentence? This tool encodes your secret using zero-width characters, then embeds it into any carrier text. Someone reading the carrier text just sees the normal message, but anyone who knows to decode it can extract your hidden words. I'm not talking spy-level encryption here, but it's a fun way to send hidden notes, create puzzles, or add invisible watermarks to your content. The encoded message survives copy-paste as long as zero-width characters aren't stripped.",
    howToUse: ["Write your secret message in the first box", "Write your innocent carrier text in the second box", "Click Encode to embed the secret", "Copy the combined text - it looks normal but contains your hidden message", "To decode, paste suspicious text and click Decode"],
    faq: { q: "can anyone decode my hidden message without a password?", a: "Yes, this method uses zero-width characters without encryption. Anyone with this tool can extract the message. For actual secrecy, you'd want proper encryption, not steganography alone." },
    relatedToolIds: ["invisible-text", "password-gen-strength", "random-string-generator-online"]
  },
  {
    id: "password-gen-strength",
    name: "Password Generator & Strength Checker",
    description: "Stop using 'password123' or your pet's name. This tool does two things: creates truly random passwords you can customize (length, uppercase, lowercase, numbers, symbols), then tells you how strong any password is. The strength checker actually analyzes patterns, not just length - it'll flag sequential characters, repeated letters, and common substitutions. I use the generator when I need a new account password, and I use the checker when I'm not sure if my 'clever' password is actually terrible. Everything runs locally, so your passwords never go anywhere.",
    howToUse: ["For generation: select character types and length, then click Generate", "Copy the password (preferably to a password manager)", "For strength check: type or paste a password, see instant score from Weak to Strong", "Read the feedback to understand why it's weak or strong"],
    faq: { q: "how does the strength checker detect weak patterns?", a: "It checks for dictionary words, sequential characters (abc, 123), repeated patterns, keyboard walks (qwerty), and common substitutions (pa$$word). Length matters, but predictability matters more." },
    relatedToolIds: ["random-string-generator-online", "text-steganography", "invisible-text"]
  },
  {
    id: "random-string-generator-online",
    name: "Random String Generator",
    description: "Need an API key, a session token, a unique ID, or just some random gibberish? This creates strings of whatever length you want using whatever character sets you pick - numbers only, lowercase, uppercase, alphanumeric, or all symbols. You can generate multiple strings at once too. I use this constantly for creating test data, unique identifiers, or just random usernames when I don't want to think. The randomness comes from your browser's crypto API, which is actually random enough for most practical uses.",
    howToUse: ["Choose the character set (numbers, letters, alphanumeric, or custom)", "Set the string length", "Choose how many strings to generate", "Click Generate and copy any or all results"],
    faq: { q: "is the random string generation cryptographically secure?", a: "Yes, it uses the browser's crypto.getRandomValues() method, which provides cryptographically strong randomness suitable for session IDs and tokens." },
    relatedToolIds: ["password-gen-strength", "lorem-ipsum", "text-repeater"]
  },
  {
    id: "whatsapp-text-formatter",
    name: "WhatsApp Text Formatter",
    description: "WhatsApp has secret formatting that most people don't know about. This tool helps you create bold, italic, strikethrough, and monospace text without memorizing the weird markdown rules. Type your message normally, select what you want to format, and get the exact syntax to paste into WhatsApp. You can even combine formats for bold-italic text. No more sending *asterisks* hoping they turn into formatting - this guarantees it works on WhatsApp Web and mobile.",
    howToUse: ["Type your message in the main box", "Select the text you want to format", "Click the formatting button (Bold, Italic, Strikethrough, or Monospace)", "Copy the formatted text with the correct symbols", "Paste directly into any WhatsApp chat"],
    faq: { q: "does this work on both WhatsApp mobile and web?", a: "Yes, the formatting symbols (*bold*, _italic_, ~strikethrough~, ```monospace```) work identically on WhatsApp mobile app, WhatsApp Web, and WhatsApp Desktop." },
    relatedToolIds: ["fancy-text-generator-online", "mirror-text-generator", "ascii-banner-generator"]
  },
  {
    id: "yt-timestamp-formatter",
    name: "YouTube Timestamp Formatter",
    description: "Ever wanted to share a YouTube video starting at a specific moment? This tool converts plain timestamps like '2:35' into clickable YouTube links or proper comment formatting. Paste a list of timestamps, choose your format (URL with t= parameter or the comment-friendly 2:35 format), and get ready-to-copy results. I use this when leaving detailed comments on long videos or when sending friends links that skip the boring intros. You can even generate multiple timestamps at once from a single video URL.",
    howToUse: ["Enter the YouTube video URL (or just the video ID)", "Add timestamps in MM:SS or HH:MM:SS format (one per line)", "Choose output format (URL parameters or text timestamps)", "Generate and copy the formatted timestamps"],
    faq: { q: "do YouTube timestamps work in mobile app links?", a: "Yes, the ?t=123s parameter works on both mobile and desktop YouTube apps. For live streams, timestamps only work after the stream has ended and been processed." },
    relatedToolIds: ["find-and-replace-text-online", "text-to-list", "add-prefix-suffix-to-lines"]
  },
  {
    id: "ascii-banner-generator",
    name: "ASCII Banner Generator",
    description: "Want to turn 'HELLO' into a giant banner made of # symbols or asterisks? This converts your text into big blocky ASCII art using several different fonts and character sets. Great for terminal headers, code comments, README files, or just impressing your friends in plain text environments. Each letter gets rendered as a grid of characters - pick from simple blocks, detailed FIGlet-style fonts, or minimal single-line styles. The output is pure text, so it works absolutely anywhere.",
    howToUse: ["Type your text (letters, numbers, and basic symbols only)", "Choose an ASCII font style from the dropdown", "Adjust width if the font supports scaling", "Click Generate to create your banner", "Copy the plain text banner"],
    faq: { q: "why do some letters look weird in ASCII banners?", a: "ASCII art fonts are limited to basic characters, so lowercase letters often get rendered as uppercase. Complex symbols may not have banner representations at all." },
    relatedToolIds: ["fancy-text-generator-online", "mirror-text-generator", "text-reverser"]
  },
  {
    id: "json-formatter-online",
    name: "JSON Formatter & Validator",
    description: "Raw JSON is unreadable - all squished together with no line breaks. Paste your minified JSON here and get perfectly indented, human-readable output. It also validates your syntax, highlighting exactly where you forgot a comma or left a quote unclosed. I deal with API responses daily, and this saves me from squinting at long strings of bracket-ridden chaos. You can even minify it back down if you need compact JSON for transmission. The formatting happens entirely in your browser, so sensitive API data never touches a server.",
    howToUse: ["Paste your JSON into the input area (minified or already formatted)", "Click Format to prettify with proper indentation", "Click Validate to check for syntax errors", "Copy the formatted result or use Minify to compress it"],
    faq: { q: "does the JSON formatter handle very large files?", a: "It can handle JSON up to several megabytes, but extremely large files (over 10MB) might slow your browser. For huge datasets, consider command-line tools instead." },
    relatedToolIds: ["json-to-csv", "text-to-json", "sql-formatter"]
  },
  {
    id: "csv-to-json-converter",
    name: "CSV to JSON Converter",
    description: "Spreadsheet data in CSV format needs to become JSON for APIs or JavaScript. This tool maps your CSV headers to JSON keys, turning rows into clean objects. You can even handle nested structures if your headers use dot notation like 'user.name'. I use this constantly when exporting data from Google Sheets and needing JSON for a web project. The converter auto-detects delimiters (comma, semicolon, tab) and handles quoted fields with internal commas correctly. No more writing custom parsers for every CSV file.",
    howToUse: ["Paste your CSV data (first row should be headers)", "Select the delimiter (auto-detect works for most cases)", "Choose output format (array of objects or array of arrays)", "Click Convert to JSON", "Copy the JSON output"],
    faq: { q: "what happens if my CSV has duplicate column headers?", a: "The converter appends numbers to duplicate headers (name, name_1, name_2) so no data gets overwritten. You'll get a warning about the duplicates." },
    relatedToolIds: ["json-to-csv", "text-to-list", "sort-lines-alphabetically"]
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV Converter",
    description: "Got an array of JSON objects and need a spreadsheet? This flattens your JSON into rows and columns. It handles nested objects by creating dot-notation headers (like 'address.city') and deals with missing values gracefully. I use this when API data needs to go into Excel for analysis or when a client wants a simple CSV export from a JSON database dump. The converter preserves data types and handles arrays of primitives by joining them with semicolons. Everything happens locally, so confidential JSON data stays private.",
    howToUse: ["Paste your JSON (must be an array of objects or a single object)", "Click Convert to CSV", "Review the generated CSV with proper headers", "Copy or download the CSV file"],
    faq: { q: "can it convert deeply nested JSON with arrays inside objects?", a: "Yes, but arrays of objects get flattened into multiple rows. For fully normalized CSV output, you'd need a more complex ETL tool. This works for most API responses." },
    relatedToolIds: ["csv-to-json-converter", "json-formatter-online", "sort-lines-alphabetically"]
  },
  {
    id: "text-to-json",
    name: "Text to JSON Converter",
    description: "Raw text lines become structured JSON - each line becomes an array element, or you can split by custom delimiters to create object arrays. Need a list of emails to become a JSON array? Done. Have a log file where each line is 'key=value' and want objects? Also doable. This tool bridges the gap between messy plain text and structured data. I use this when I'm given unstructured text and need valid JSON for a script. You can even add a root property name to wrap the whole thing.",
    howToUse: ["Paste your plain text (one item per line or delimited)", "Choose output structure (array of strings or array of objects)", "If using objects, specify how to split each line (e.g., comma, space)", "Click Convert to get valid JSON", "Copy the JSON output"],
    faq: { q: "what's the maximum number of lines it can convert?", a: "Browsers can handle up to about 100,000 lines before slowing down. For massive files over 50MB, consider using a command-line JSON tool instead." },
    relatedToolIds: ["json-to-text", "text-to-list", "find-and-replace-text-online"]
  },
  {
    id: "json-to-text",
    name: "JSON to Text Converter",
    description: "The opposite of text-to-json - take structured JSON and flatten it into readable text lines. Extract all values from a JSON array into a simple list, or pull specific properties from objects. I use this when I have API response data and need just the usernames or email addresses as plain text lines. You can even extract nested properties using dot notation like 'user.profile.name'. The output is clean, line-separated text ready for further processing or just human reading.",
    howToUse: ["Paste valid JSON in the input area", "If extracting specific fields, enter the property path (e.g., 'name' or 'user.email')", "If not extracting, choose to get all values or convert objects to formatted text", "Click Convert to Text", "Copy the line-separated results"],
    faq: { q: "what happens when I try to extract a property that doesn't exist?", a: "Missing properties become empty lines in the output, with a warning count displayed. You can choose to skip missing properties entirely." },
    relatedToolIds: ["text-to-json", "json-formatter-online", "csv-to-json-converter"]
  },
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    description: "Ever tried to debug a SQL query that's one giant line? This beautifier turns minified SQL into readable, indented statements. Keywords become uppercase (configurable), clauses get their own lines, and nested queries get proper indentation. It works with MySQL, PostgreSQL, SQL Server, and Oracle syntax. I use this whenever I inherit old code with 500-character-long queries or when I need to understand complex joins. The formatter also validates basic syntax - missing quotes, unbalanced parentheses, and stray commas get highlighted before you run anything.",
    howToUse: ["Paste your SQL query (minified or already formatted)", "Choose your SQL dialect (MySQL, PostgreSQL, etc.)", "Adjust formatting options (uppercase keywords, indent size)", "Click Format to beautify the query", "Copy the clean, readable SQL"],
    faq: { q: "will this break my SQL if it has syntax errors?", a: "The formatter attempts to parse your SQL and will show errors rather than incorrectly formatting invalid queries. Fix the errors first, then format." },
    relatedToolIds: ["json-formatter-online", "find-and-replace-text-online", "csv-to-json-converter"]
  },
  {
    id: "sort-lines-reverse",
    name: "Sort Lines Reverse Order",
    description: "Sometimes alphabetical order isn't what you need. This simply reverses the line order of your text - last line becomes first, first becomes last. Completely different from reverse alphabetical sorting. I use this when I have chronological data that needs to be flipped (newest first instead of oldest first) or when I'm creating countdown lists. It's stupid simple but incredibly handy when you need to reverse the flow of a document without changing anything else about the lines themselves.",
    howToUse: ["Paste your lines of text (one per line)", "Click Reverse Order", "Copy the list with lines in opposite order"],
    faq: { q: "is this the same as sorting descending?", a: "No. Descending sorting (Z to A) rearranges content alphabetically. Reverse order just flips the existing sequence without any sorting - line 5 becomes line 1, regardless of what's written." },
    relatedToolIds: ["sort-lines-alphabetically", "text-reverser", "text-to-list"]
  }
];