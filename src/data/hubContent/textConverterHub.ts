export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const textConverterHubTools: HubToolContent[] = [
  {
    id: "upper-case",
    name: "Upper Case Converter",
    description: "Ever typed something in a hurry and realized it should be shouting? That's where upper case comes in. This tool takes whatever text you throw at it and transforms every single letter into capitals. No more holding down shift or dealing with caps lock mishaps. Great for headings that need to stand out, acronyms that demand attention, or when you're just really excited about something and want the internet to know it. You paste your paragraph, hit convert, and boom - everything's in uppercase. Works with letters, numbers, and symbols stay exactly where they belong. Think of it as giving your words a megaphone.",
    howToUse: [
      "Paste or type your text into the input box on the left",
      "Click the 'Convert to Upper Case' button",
      "Copy the transformed text from the result field",
      "Use your now-shouting text wherever you need it"
    ],
    faq: { q: "Will upper case conversion affect numbers or special characters?", a: "Not at all. Only alphabetical characters get converted to uppercase. Numbers (1,2,3), punctuation marks like commas and periods, and special symbols such as @ or # remain exactly as you typed them. The tool only targets letters A through Z." },
    relatedToolIds: ["lower-case", "title-case", "sentence-case"]
  },
  {
    id: "lower-case",
    name: "Lower Case Converter",
    description: "Sometimes you need things to be quiet and understated. Lower case conversion strips away the emphasis and makes everything... well, normal and unassuming. Maybe you copied something from a website that was IN ALL CAPS (annoying, right?) and need it readable again. Or perhaps you're writing casually and want that relaxed vibe. This tool turns every letter into its smaller, humbler version. No judgment about whether you prefer shouting or whispering - just clean, consistent lower case text. I've used this countless times when dealing with badly formatted database exports or fixing user inputs that went a little overboard on the caps lock.",
    howToUse: [
      "Put your text into the input area - messy case is fine",
      "Select the 'Lower Case' conversion option",
      "Grab the result from the output box",
      "Paste your clean, lowercased text anywhere"
    ],
    faq: { q: "Does lower case conversion work with accented characters like É or Ü?", a: "Yes, it handles accented characters properly. É becomes é, Ü becomes ü, and so on. The tool respects international characters while converting them to their lower case forms, so your French or German text stays accurate." },
    relatedToolIds: ["upper-case", "sentence-case", "slug-generator"]
  },
  {
    id: "title-case",
    name: "Title Case Converter",
    description: "Writing headlines is hard enough without worrying about which words get capitalized. You know the rules - major words get capitals, small ones like 'and' or 'the' don't, unless they start the title. But remembering all that while trying to be creative? Frustrating. This converter studies your sentence and applies proper title case capitalization. It knows that 'The Lord of the Rings' needs that first 'The' capitalized but the second 'the' stays lower case. Perfect for blog post titles, YouTube video names, or any situation where you need to look like you understand proper formatting. Saves you from the embarrassment of inconsistent headline case.",
    howToUse: [
      "Write or paste your headline into the input field",
      "Hit the 'Title Case' button",
      "Review the properly capitalized result",
      "Copy it straight to your blog, video, or document"
    ],
    faq: { q: "Does title case follow AP style or Chicago style capitalization rules?", a: "This tool follows standard title case conventions where articles (a, an, the), conjunctions (and, but, or), and short prepositions (of, in, to, for) remain lower case unless they're the first or last word. For specific style guides like AP or Chicago, you might need manual adjustments, but this covers 95% of everyday title needs." },
    relatedToolIds: ["sentence-case", "upper-case", "pascal-case"]
  },
  {
    id: "sentence-case",
    name: "Sentence Case Converter",
    description: "You know how proper English works - first letter of a sentence gets capitalized, everything else stays normal. But when you're cleaning up messy text from emails, forums, or OCR scans, proper sentence case often gets destroyed. This tool intelligently figures out where sentences start and end. It looks for periods, question marks, and exclamation points, then capitalizes the following word. Multiple sentences? No problem. It handles paragraphs too. Finally a way to fix that friend who types EVERYTHING in lower case without remaking your entire keyboard. Great for proofreading drafts or formatting user-generated content before publishing.",
    howToUse: [
      "Drop your paragraph or multiple sentences into the tool",
      "Click 'Convert to Sentence Case'",
      "Check that periods and question marks triggered proper capitalization",
      "Export the cleaned text for your document"
    ],
    faq: { q: "What about abbreviations like U.S.A. or Dr. Smith - will it incorrectly capitalize after those periods?", a: "Good question. Common abbreviations with internal periods are handled intelligently - the tool recognizes patterns like U.S., Dr., Mr., Mrs., and a.m./p.m. so it doesn't break the sentence incorrectly. For edge cases, you might need a quick manual fix, but it handles most standard abbreviations well." },
    relatedToolIds: ["title-case", "lower-case", "upper-case"]
  },
  {
    id: "camel-case",
    name: "Camel Case Converter",
    description: "Programmers, this one's for you. Camel case is that weird naming convention where you smash words together and capitalize each one except the first - like 'getUserData' or 'parseXmlFile'. Trying to convert 'user profile settings' into 'userProfileSettings' manually gets old fast. This tool does the transformation automatically. It removes spaces, punctuation, and special characters, then capitalizes every word's first letter except the very first word. That's why it's called camel case - the humps are the capital letters in the middle. Perfect for variable names, function names, or when you're working with JavaScript objects and need consistent formatting without the repetitive typing.",
    howToUse: [
      "Type your spaced words like 'customer address line' into the input",
      "Click the camel case conversion button",
      "Watch as spaces disappear and capitals appear mid-word",
      "Copy 'customerAddressLine' directly into your code"
    ],
    faq: { q: "Does camel case conversion handle numbers inside words like 'version2'?", a: "Absolutely. Numbers stay where they are and don't trigger capitalization. 'order 123 details' becomes 'order123Details' - the number just sits there normally. Leading numbers work fine too, though most programming conventions prefer starting with a letter." },
    relatedToolIds: ["pascal-case", "snake-case", "kebab-case"]
  },
  {
    id: "snake-case",
    name: "Snake Case Converter",
    description: "Ever seen Python code or database column names with underscores between words? That's snake case - all lower case, words separated by underscores. 'user_id', 'first_name', 'created_at' - you get the idea. Converting 'Customer Email Address' to 'customer_email_address' by hand is boring and error-prone. This tool handles the transformation instantly. It lowercases everything, replaces spaces with underscores, and strips out any characters that don't belong. Great for API responses, JSON keys, or just keeping your variable names consistent across a project. Named snake case because the underscores look like snakes slithering between words? I don't know, but the name stuck.",
    howToUse: [
      "Enter your text with spaces or weird formatting",
      "Hit the snake case conversion option",
      "Get back clean underscores between every word",
      "Use the result for your database fields or variables"
    ],
    faq: { q: "What happens to existing underscores or hyphens in my text?", a: "The tool converts all separators (spaces, hyphens, existing underscores, even tabs) into single underscores. Multiple underscores get collapsed into one. So 'user--profile data' becomes 'user_profile_data' - nice and clean." },
    relatedToolIds: ["kebab-case", "constant-case", "camel-case"]
  },
  {
    id: "kebab-case",
    name: "Kebab Case Converter",
    description: "URLs love kebab case. You see it everywhere - 'my-cool-blog-post', 'best-pizza-in-town', 'how-to-make-coffee'. All lower case, hyphens instead of spaces. Why kebab? Because the hyphens look like the stick going through meat and veggies? Honestly, someone was hungry when they named it. This tool takes your messy text and turns it into clean, URL-ready kebab case. It removes special characters, converts spaces to hyphens, and makes everything lower case. Perfect for SEO-friendly slugs, CSS class names, or any situation where you need readable but spacer-free text. No more manually typing hyphens or wondering if 'aboutUs' or 'about_us' is better for your link structure.",
    howToUse: [
      "Paste your desired URL slug or text into the tool",
      "Select 'Kebab Case' conversion",
      "Copy the hyphenated, lower case result",
      "Paste it directly into your website's URL field"
    ],
    faq: { q: "Will kebab case remove or replace accented characters like São Paulo?", a: "Yes, it normalizes accented characters to their ASCII equivalents when possible - São becomes Sao, café becomes cafe. This ensures your URLs work correctly across all browsers and search engines, which can choke on special characters." },
    relatedToolIds: ["slug-generator", "snake-case", "lower-case"]
  },
  {
    id: "pascal-case",
    name: "Pascal Case Converter",
    description: "Pascal case is camel case's slightly more formal cousin. Instead of 'getUserData', you get 'GetUserData' - every word starts with a capital letter, no spaces or separators anywhere. Programming languages like C# and Java use this for class names. 'ShoppingCart', 'EmailValidator', 'DatabaseConnection' - see the pattern? This converter takes your regular spaced text and turns it into proper Pascal case automatically. Write 'customer order history' and get 'CustomerOrderHistory'. Saves you from manually capitalizing each word and deleting spaces. Named after the Pascal programming language where this convention became popular, though now it's everywhere in object-oriented programming.",
    howToUse: [
      "Input your spaced phrase like 'product category manager'",
      "Click the Pascal case button",
      "Review 'ProductCategoryManager' as your result",
      "Use it for your class names or type definitions"
    ],
    faq: { q: "Does Pascal case work with single letters or acronyms like XML or API?", a: "Acronyms are preserved as you type them - 'get XML data' becomes 'GetXMLData' with all letters in the acronym staying uppercase. If you prefer 'GetXmlData', you'd need to adjust manually since the tool doesn't guess acronym preferences." },
    relatedToolIds: ["camel-case", "constant-case", "upper-case"]
  },
  {
    id: "constant-case",
    name: "Constant Case Converter",
    description: "In programming, constants get special treatment - usually all caps with underscores. Think 'MAX_LIMIT', 'API_KEY', 'DEFAULT_TIMEOUT'. This screams 'don't change me!' to anyone reading your code. Converting 'maximum user count' to 'MAXIMUM_USER_COUNT' by hand is tedious, especially for longer phrases. This tool does it in one click. It uppercases everything, replaces spaces with underscores, and strips out punctuation. Perfect for environment variables, configuration constants, or any value that should stay fixed. Makes your code more readable because anyone instantly knows these aren't regular variables. Plus it looks kind of intense, which fits the 'constant' vibe.",
    howToUse: [
      "Type or paste your constant name idea like 'default timeout seconds'",
      "Hit the constant case conversion button",
      "Get 'DEFAULT_TIMEOUT_SECONDS' back instantly",
      "Drop it into your .env file or constants declaration"
    ],
    faq: { q: "Can constant case handle numbers inside the text like 'version2config'?", a: "Yes, numbers are preserved as-is. 'timeout 30 seconds' becomes 'TIMEOUT_30_SECONDS'. The tool doesn't modify numbers or their positions - only spaces and punctuation get converted to underscores." },
    relatedToolIds: ["upper-case", "snake-case", "pascal-case"]
  },
  {
    id: "alternating-case",
    name: "Alternating Case Converter",
    description: "This one's just for fun. Alternating case - or SpongeBob case as the internet calls it - makes your text look like tHiS. Every other letter randomly flips between upper and lower case. Why would anyone want this? Memes. Sarcasm. Mocking a bad take in a group chat. You know the vibe - 'oH yOu ThInK tHaT's A gOoD iDeA?' This tool creates that chaotic, mocking tone automatically. Just paste your serious sentence and watch it transform into something that drips with irony. Perfect for social media, Discord arguments, or just confusing your coworkers. No practical use whatsoever, but sometimes you need to be silly with text formatting. Texly Online doesn't judge your priorities.",
    howToUse: [
      "Enter any sentence or paragraph you want to mock",
      "Click 'Alternating Case' and watch the chaos",
      "Copy the result to your clipboard",
      "Paste it somewhere someone will find it mildly annoying"
    ],
    faq: { q: "Does alternating case always follow the same pattern or is it actually random?", a: "The pattern is consistent and predictable - first letter stays as-is, then every following letter alternates case regardless of spaces or punctuation. This means you'll get the same result every time with the same input, which is useful if you need reproducible chaos." },
    relatedToolIds: ["inverse-case", "upper-case", "lower-case"]
  },
  {
    id: "inverse-case",
    name: "Inverse Case Converter",
    description: "Ever typed something with caps lock on by accident? 'hELLO THERE' when you meant 'Hello there'? That's inverse case - everything that was lower becomes upper, everything upper becomes lower. This tool flips the case of every letter in your text. No guesswork about what should be capitalized - it just reverses whatever you have. Great for fixing caps lock disasters without retyping. 'tHIS IS SO ANNOYING' becomes 'This is so annoying' with one click. Also useful for creating obfuscated text or just messing with formatting conventions. Think of it as the negative image of your text - the light parts become dark, dark become light.",
    howToUse: [
      "Paste your caps-lock-mangled or oddly cased text",
      "Hit the 'Inverse Case' button",
      "Watch as case flips on every single letter",
      "Copy the corrected or transformed result"
    ],
    faq: { q: "What happens to numbers and symbols during inverse case conversion?", a: "Numbers (0-9), punctuation marks, spaces, and special characters like @#$% remain completely unchanged. Only A-Z and a-z characters get flipped. So 'Hello123!' becomes 'hELLO123!' - the numbers and exclamation stay put." },
    relatedToolIds: ["alternating-case", "upper-case", "lower-case"]
  },
  {
    id: "base64-encode-decode",
    name: "Base64 Encode & Decode",
    description: "Base64 is everywhere in web development. Email attachments, image data URLs, API tokens, even those weird strings in your browser's local storage. It converts binary data into text that won't break when transmitted. But manually encoding or decoding? That's a headache. This tool gives you both directions - turn regular text into garbled-looking Base64, or turn Base64 back into readable text. Super useful when you're debugging an API response that came back as gibberish, or when you need to embed a small image directly in your CSS. The encoded result looks like someone fell asleep on their keyboard, but it's actually just math. Trust the process.",
    howToUse: [
      "Choose 'Encode' or 'Decode' mode from the toggle",
      "Type or paste your text in the input area",
      "Click 'Convert' to see the transformation",
      "Copy the result for your API call or data URI"
    ],
    faq: { q: "Will Base64 decoding fail if I paste an invalid encoded string?", a: "Yes, the tool validates the input before attempting to decode. If you paste something that isn't valid Base64 (like regular English text or malformed data), it will show an error message instead of producing garbage output. This prevents confusion when you accidentally paste the wrong thing." },
    relatedToolIds: ["url-encode-decode", "hex-encode-decode", "html-encode-decode"]
  },
  {
    id: "url-encode-decode",
    name: "URL Encode & Decode",
    description: "Spaces aren't allowed in URLs. Neither are most symbols. That's why we have URL encoding - it turns 'hello world' into 'hello%20world'. The %20 means space. This tool handles both encoding (text to URL-safe format) and decoding (gibberish back to readable text). Ever clicked a link with %something in it and wondered what that meant? Now you can decode it to find out. Or maybe you're building a search query and need to encode user input so it doesn't break your URL structure. Either way, this saves you from memorizing ASCII codes. Just paste, convert, and move on with your life. No more 'why is my link broken?' debugging sessions.",
    howToUse: [
      "Select whether you need to encode or decode",
      "Paste your URL or text into the input field",
      "Click the convert button",
      "Use the safe URL string or decoded text as needed"
    ],
    faq: { q: "Does URL encoding handle non-English characters like Arabic or Chinese?", a: "Yes, it converts them to multi-byte percent-encoded sequences following UTF-8 standards. 'こんにちは' becomes a longer encoded string with multiple %XX patterns that browsers understand perfectly." },
    relatedToolIds: ["base64-encode-decode", "html-encode-decode", "slug-generator"]
  },
  {
    id: "hex-encode-decode",
    name: "Hex Encode & Decode",
    description: "Computers think in hexadecimal - base-16 numbers using 0-9 and A-F. Every character you type has a hex representation. 'A' is 41, space is 20, '!' is 21. This tool converts regular text into those hex pairs, or turns hex pairs back into readable text. Why would you want this? Debugging binary data, working with color values (which are hex), or analyzing file signatures. Security researchers use it constantly. Game modders use it to edit save files. Even web developers sometimes need to inspect encoded payloads. The hex output looks cryptic but it's actually just a different way of writing the same information. Think of it as translating English to Computer-ese and back again.",
    howToUse: [
      "Pick 'Encode' to turn text into hex or 'Decode' to go back",
      "Enter your string or hex pairs (with or without spaces)",
      "Hit convert and watch the transformation",
      "Copy the result for your debugging or analysis"
    ],
    faq: { q: "Can I decode hex that has no spaces between the pairs like 48656c6c6f?", a: "Absolutely. The tool handles both spaced pairs (48 65 6c 6c 6f) and continuous strings (48656c6c6f). It automatically groups every two characters as one byte, making it flexible for any hex format you encounter." },
    relatedToolIds: ["base64-encode-decode", "binary-to-text-converter", "url-encode-decode"]
  },
  {
    id: "html-encode-decode",
    name: "HTML Encode & Decode",
    description: "HTML has a problem - it uses characters like < and > for tags. So what happens when you want to actually display '<div>' on a webpage without the browser trying to render it? You encode it. '<' becomes '&lt;' and '>' becomes '&gt;'. This tool handles all HTML entities - quotes, ampersands, everything. Paste a block of HTML code and encode it for safe display in a blog post or forum comment. Or take encoded text from a website source and decode it back to readable HTML. Essential for anyone who writes technical documentation, runs a coding blog, or just wants to paste code examples without the platform eating their angle brackets. No more wrestling with your CMS's text editor.",
    howToUse: [
      "Switch between 'Encode' and 'Decode' based on your need",
      "Paste raw HTML or encoded entities into the input",
      "Click convert to get the transformed version",
      "Copy the result for safe display or actual HTML use"
    ],
    faq: { q: "Does HTML encoding also handle emojis and special Unicode characters?", a: "Yes, modern browsers and this tool handle emojis properly during encoding. 😀 becomes its numeric entity representation, ensuring it displays correctly across different platforms and older browsers that might not support emojis directly." },
    relatedToolIds: ["url-encode-decode", "base64-encode-decode", "hex-encode-decode"]
  },
  {
    id: "binary-to-text-converter",
    name: "Binary to Text Converter",
    description: "Computers run on 1s and 0s. That's it. Every letter, number, and symbol you see is actually a pattern of eight bits. '01001000 01101001' means 'Hi'. This converter translates binary back into readable text, or turns regular words into binary strings. Honestly, you probably won't need this daily. But when you do need it - like when you find an old encoded message, or you're learning how computers store text, or you want to feel like a hacker in a movie - it's invaluable. It handles both space-separated 8-bit chunks and continuous binary strings. Watch your 'hello' turn into a string of 40 bits, or decode that mysterious binary someone sent you. Educational and occasionally useful for actual troubleshooting.",
    howToUse: [
      "Select 'Binary to Text' or 'Text to Binary' mode",
      "Enter your binary (space between each 8 bits) or your text",
      "Click convert to see the translation",
      "Copy the result for learning or actual use"
    ],
    faq: { q: "Does this tool only work with 8-bit ASCII or can it handle Unicode characters?", a: "It primarily handles standard ASCII (0-255) which covers English letters, numbers, and common symbols. Extended Unicode characters require more than 8 bits, but for everyday text conversion, this covers what most people need. Emojis will convert to multiple bytes." },
    relatedToolIds: ["hex-encode-decode", "base64-encode-decode", "morse-code-translator"]
  },
  {
    id: "morse-code-translator",
    name: "Morse Code Translator",
    description: "Dit-dit-dah-dah-dit. That's Morse code - the original digital communication. Before texting, before email, before even telephones, people sent messages with dots and dashes. This translator converts regular text into Morse code (dots and dashes with spaces) and back again. 'SOS' becomes '... --- ...' instantly. Great for learning Morse, sending secret messages to friends, or just appreciating how people communicated before electricity was everywhere. The audio representation isn't here, but the text version works fine for writing or signaling with lights. Plus it's just fun to see your name in dots and dashes. Texly Online keeps this old-school tech alive for curious minds and retro enthusiasts.",
    howToUse: [
      "Type your message in English or paste Morse code",
      "Choose 'To Morse' or 'From Morse' mode",
      "Hit translate and see the conversion instantly",
      "Copy the dots and dashes or decoded message"
    ],
    faq: { q: "What symbol does the translator use to separate Morse code letters vs words?", a: "Letters are separated by single spaces, words are separated by forward slashes (/). For example, 'hello world' becomes '.... . .-.. .-.. --- / .-- --- .-. .-.. -..' so you can clearly see where word boundaries are." },
    relatedToolIds: ["binary-to-text-converter", "nato-phonetic-alphabet", "rot13-cipher"]
  },
  {
    id: "rot13-cipher",
    name: "ROT13 Cipher",
    description: "ROT13 is the simplest cipher in existence - it just shifts every letter by 13 positions. A becomes N, B becomes O, all the way around. Apply it twice and you get back to the original. That's the beauty - it's its own inverse. This translator encodes or decodes text using ROT13 instantly. Why use it? Hiding spoilers in forum posts. Obscuring punchlines in jokes. Creating a super basic layer of obfuscation that no one would use for anything serious. It's not encryption (don't use it for passwords, please), but it's perfect for online communities where you want to hide text behind a trivial puzzle. 'Why did the chicken cross the road?' becomes 'Jul qvq gur puvpxra pebff gur ebnq?' - technically unreadable but trivially reversible.",
    howToUse: [
      "Paste your text into the input box",
      "Click 'Apply ROT13' (works for both encoding and decoding)",
      "See the shifted result appear automatically",
      "Run it again to revert back to the original"
    ],
    faq: { q: "Does ROT13 affect numbers, punctuation, or spaces?", a: "No, only letters A-Z and a-z are affected. Numbers, spaces, punctuation marks, and special characters stay exactly where and what they are. 'Hello123!' becomes 'Uryyb123!' - the 123 and exclamation don't change." },
    relatedToolIds: ["morse-code-translator", "inverse-case", "alternating-case"]
  },
  {
    id: "nato-phonetic-alphabet",
    name: "NATO Phonetic Alphabet Converter",
    description: "Alpha, Bravo, Charlie, Delta - you've heard these in movies when pilots or military folks spell things out. That's the NATO phonetic alphabet, designed so letters sound distinct even over crackly radio transmissions. This converter turns regular words into their phonetic equivalents. 'Hello' becomes 'Hotel Echo Lima Lima Oscar'. Want to sound official when spelling your name over the phone? Use this. Working in customer service and tired of 'B as in boy, D as in dog' guesswork? This gives you the standardized version everyone understands. It also decodes - paste 'Sierra Echo Romeo' and get back 'SER'. Surprisingly useful for call centers, aviation enthusiasts, or just showing off at parties.",
    howToUse: [
      "Enter the word or phrase you want to spell phonetically",
      "Click 'Convert to NATO Alphabet'",
      "Copy the code word sequence for clear verbal spelling",
      "Use the decode mode to go from code words back to text"
    ],
    faq: { q: "Does the converter handle numbers in the text like 'Flight 247'?", a: "Yes, numbers have their own NATO code words as well - Zero, One, Two, Three, etc. '247' becomes 'Two Four Seven', and most people also accept 'Two, Four, Seven' without needing to say 'Zero' for nothing." },
    relatedToolIds: ["morse-code-translator", "rot13-cipher", "upper-case"]
  },
  {
    id: "slug-generator",
    name: "Slug Generator",
    description: "URL slugs - that part after your website name like '/best-coffee-shops' - need to be clean, readable, and SEO-friendly. This generator takes any title or phrase and turns it into a perfect URL slug. It lowercases everything, removes special characters, replaces spaces with hyphens, and handles multiple spaces intelligently. '10 Best Coffee Shops in NYC (2024 Edition)!' becomes '10-best-coffee-shops-in-nyc-2024-edition'. See? No punctuation, no weird capitalization, just clean hyphens. Search engines love this format, and humans can read it too. Great for bloggers, content managers, or anyone building a website who wants consistent, professional-looking URLs without manually editing every single one.",
    howToUse: [
      "Type your blog post title or page name",
      "Hit the 'Generate Slug' button",
      "Review the SEO-friendly URL slug in the result",
      "Copy it directly into your CMS or routing config"
    ],
    faq: { q: "Will the slug generator remove stop words like 'a', 'an', or 'the' to make URLs shorter?", a: "No, it preserves all words as you write them. Some SEO tools suggest removing stop words, but this generator keeps your slug identical to your title minus special characters. You can manually edit if you prefer shorter slugs." },
    relatedToolIds: ["kebab-case", "lower-case", "url-encode-decode"]
  },
  {
    id: "number-to-words",
    name: "Number to Words Converter",
    description: "Write 1,234 as 'one thousand two hundred thirty-four'. That's what this tool does. Turns digits into English words. Why would you need this? Writing checks (though who writes checks anymore?). Creating legal documents where numbers need to be spelled out. Generating invoices with proper English amounts. Teaching kids to read numbers. Or just avoiding the embarrassment of writing '1050' as 'one thousand and fifty' when you meant 'one thousand fifty'. This handles decimals too - 99.95 becomes 'ninety-nine and ninety-five hundredths'. It's one of those tools you don't think you need until suddenly you're manually typing out 'two million four hundred twelve thousand' and wondering why you're wasting five minutes.",
    howToUse: [
      "Enter any number (whole or with decimals) in the input",
      "Click 'Convert to Words'",
      "Read the properly formatted English version",
      "Copy it for your document, check, or invoice"
    ],
    faq: { q: "What's the maximum number this converter can handle?", a: "It handles up to 999 decillion - that's a 1 with 33 zeros. Far beyond any practical use case. For everyday numbers like millions or billions, it works perfectly. Even handles negative numbers with 'negative' at the start." },
    relatedToolIds: ["unit-converter", "upper-case", "title-case"]
  },
  {
    id: "braille-translator",
    name: "Braille Translator",
    description: "Braille isn't a language - it's a tactile writing system using raised dots. Each Braille cell has six dot positions, arranged in two columns of three. Different dot combinations represent letters, numbers, or punctuation. This translator converts regular text into Braille patterns (shown as Unicode Braille symbols like ⠓⠑⠇⠇⠕ for 'hello') and back again. Why use this? Learning Braille yourself. Creating accessible documents. Converting signs or labels. Or just understanding how visually impaired readers experience text. The output looks like random dots to the uninitiated, but each symbol maps directly to a letter. You can even paste Braille you find online to decode what it says. Accessibility matters, and this tool makes it easier to work with.",
    howToUse: [
      "Type your text in English to see Braille symbols",
      "Or paste existing Braille characters (Unicode symbols) to decode",
      "Click convert to see the translation either way",
      "Copy the Braille for printing or the text for reading"
    ],
    faq: { q: "Does this translator use Grade 1 or Grade 2 Braille (contractions)?", a: "This uses Grade 1 Braille, which has a direct one-to-one mapping between letters and Braille cells. Grade 2 Braille uses contractions for common words and letter combinations, but Grade 1 is more straightforward for learning and basic conversion needs." },
    relatedToolIds: ["morse-code-translator", "binary-to-text-converter", "number-to-words"]
  },
  {
    id: "hexcolor-converter",
    name: "Hex Color Converter",
    description: "Web designers live in hex colors - #FF5733 means a nice orange-red. But hex isn't the only way to describe colors. This converter translates between hex codes (like #FF5733), RGB (rgb(255, 87, 51)), and HSL (hsl(9, 100%, 60%)). Paste any format, get all the others back. Maybe you're a developer who got RGB values from a design tool but your CSS needs hex. Or you picked a hex color from a website but need to use it in a graphics program that wants RGB numbers. This saves you from doing the math yourself (255 to FF? No thanks). It even shows you what the color looks like so you can verify you've got the right one. Indispensable for frontend work, graphic design, or just picking colors that don't clash horribly.",
    howToUse: [
      "Enter a color in hex (#RRGGBB), RGB (rgb(0-255,0-255,0-255)), or HSL format",
      "Click convert to see all the equivalent representations",
      "Copy the format that matches your project's needs",
      "Use the visual preview to confirm it's the right color"
    ],
    faq: { q: "Does it support hex codes with alpha transparency like #RRGGBBAA?", a: "Yes, it supports 8-character hex codes including alpha channel (opacity). It will convert #FF573380 to the equivalent RGBA or HSLA values so you maintain transparency information across all formats." },
    relatedToolIds: ["unit-converter", "hex-encode-decode", "slug-generator"]
  },
  {
    id: "unit-converter",
    name: "Unit Converter",
    description: "How many centimeters in 6 feet? What's 100 degrees Fahrenheit in Celsius? How about 5 kilometers in miles? This converter handles all of it - length, temperature, weight, volume, and more. Pick your category, enter your number, choose the units you're converting from and to. Instant answer. No more typing 'convert 3.4 gallons to liters' into Google and digging through results. No more approximate mental math that gets you close but not quite right. Whether you're cooking with metric but your recipe uses imperial, traveling somewhere with a different measurement system, or just satisfying curiosity, this gets you the exact number. Even does currency-style conversions like 'how many meters in 2.5 kilometers' because honestly, who remembers that 1km is 1000m when you're in a hurry?",
    howToUse: [
      "Select the measurement category (length, weight, temperature, etc.)",
      "Enter the number you want to convert",
      "Choose 'From' unit and 'To' unit from the dropdowns",
      "Read the instant conversion result"
    ],
    faq: { q: "Does the unit converter handle complex conversions like square feet to acres or cubic meters to gallons?", a: "Yes, it supports area and volume conversions alongside basic length, weight, and temperature. Square feet to acres, cubic meters to gallons, even liters to cubic inches - all the common (and some uncommon) conversions you might need." },
    relatedToolIds: ["hexcolor-converter", "number-to-words", "binary-to-text-converter"]
  }
];