import { Translations } from './translations';

interface ToolContent {
  howToUse?: string[];
  faqs?: { q: string; a: string }[];
  benefits?: string[];
  useCases?: string[];
  extraInfo?: string;
}

const toolSpecificDetails: Record<string, ToolContent> = {
  'remove-extra-spaces': {
    howToUse: [
      'Copy the messy text that contains double or multiple spaces from any source.',
      'Paste it into the input area of our Remove Extra Spaces tool on Texly.',
      'Click the "Clean My Text" button to instantly remove all unnecessary whitespace and normalize your content.',
      'Review the cleaned text in the output box and click "Copy" to use it in your professional documents or code.'
    ],
    faqs: [
      { q: 'Does this tool remove single spaces between words?', a: 'No, it only removes extra spaces (double, triple, etc.) and keeps single spaces to ensure your text remains readable and correctly formatted.' },
      { q: 'Can it handle tabs and newlines?', a: 'Yes, our tool is designed to normalize all types of whitespace, including tabs, into single spaces if they are redundant, while preserving necessary structure.' },
      { q: 'Is there a limit to the text size?', a: 'You can process large documents up to several megabytes directly in your browser without any issues or slow-downs.' },
      { q: 'Why should I use this tool instead of manual editing?', a: 'Manual editing is prone to errors and extremely time-consuming. Our tool ensures 100% accuracy in milliseconds.' }
    ],
    benefits: [
      'Improves text readability instantly for better communication.',
      'Reduces file size by removing unnecessary characters and bloat.',
      'Perfect for cleaning up code, data logs, or scraped web content.',
      'Saves time compared to manual editing and ensures consistency.'
    ],
    useCases: [
      'Cleaning up text copied from PDFs where formatting is often broken.',
      'Formatting data for spreadsheets or databases that require clean strings.',
      'Preparing clean drafts for blog posts, emails, or social media updates.',
      'Fixing alignment issues in plain text documents and configuration files.'
    ]
  },
  'binary-to-text': {
    howToUse: [
      'Paste your binary code (0s and 1s) into the input field.',
      'Ensure the binary chunks are separated by spaces for better accuracy.',
      'The tool will automatically translate the binary into readable English text.',
      'Copy the decoded text instantly for your use.'
    ],
    faqs: [
      { q: 'What encoding does this tool use?', a: 'Our tool uses standard ASCII/UTF-8 encoding to translate binary sequences into characters.' },
      { q: 'Can it decode binary without spaces?', a: 'Yes, it can handle continuous binary strings, though space-separated chunks are preferred for clarity.' }
    ],
    benefits: [
      'Fast translation of machine code to human language.',
      'Educational tool for learning binary systems.',
      'No data sent to servers, ensuring private decoding.'
    ],
    useCases: [
      'Decoding hidden messages in CTF challenges.',
      'Understanding how computers store text data.',
      'Debugging low-level data streams.'
    ]
  },
  'lorem-ipsum': {
    howToUse: [
      'Select the number of paragraphs or words you need.',
      'Choose whether you want the text to start with "Lorem ipsum dolor sit amet".',
      'Click "Generate" to create your placeholder text.',
      'Copy the generated text for your design mockups.'
    ],
    faqs: [
      { q: 'What is Lorem Ipsum?', a: 'Lorem Ipsum is standard placeholder text used in the design and printing industry to demonstrate the visual form of a document.' },
      { q: 'Is the generated text unique?', a: 'It follows the classic Latin-style structure, providing a natural-looking distribution of letters.' }
    ],
    benefits: [
      'Helps designers focus on layout rather than content.',
      'Provides a realistic look for website mockups.',
      'Instant generation of any length of text.'
    ],
    useCases: [
      'Filling empty spaces in web design prototypes.',
      'Testing typography and font styles in layouts.',
      'Creating sample documents for templates.'
    ]
  },
  'remove-duplicate-lines': {
    howToUse: [
      'Paste your list or text into the input area.',
      'Choose whether to perform a case-sensitive or case-insensitive comparison.',
      'Click "Remove Duplicates" to instantly filter out repeating lines.',
      'Copy the unique list of lines to your clipboard.'
    ],
    faqs: [
      { q: 'Does it remove duplicates across the entire text?', a: 'Yes, it scans every line and keeps only the first occurrence of each unique line.' },
      { q: 'Can it handle empty lines?', a: 'You can choose to keep or remove empty lines during the duplicate removal process.' }
    ],
    benefits: [
      'Cleans up messy data lists instantly.',
      'Reduces file size by removing redundant information.',
      'Saves hours of manual searching and deleting.'
    ],
    useCases: [
      'Cleaning up email lists or contact databases.',
      'Removing duplicate keywords for SEO campaigns.',
      'Organizing code imports or configuration settings.'
    ]
  },
  'remove-empty-lines': {
    howToUse: [
      'Paste your text containing unwanted blank lines into the input.',
      'Click "Remove Empty Lines" to collapse the text.',
      'The tool will instantly remove all lines that contain no characters or only whitespace.',
      'Copy the condensed text for your use.'
    ],
    faqs: [
      { q: 'Does it remove lines with only spaces?', a: 'Yes, our tool identifies lines that are visually empty (including those with tabs or spaces) and removes them.' },
      { q: 'Can I keep some spacing?', a: 'This tool is designed to remove all empty lines. If you need specific spacing, you might need a custom formatting tool.' }
    ],
    benefits: [
      'Makes text more compact and readable.',
      'Fixes formatting issues from copied web content.',
      'Prepares clean data for processing or analysis.'
    ],
    useCases: [
      'Cleaning up text copied from websites or PDFs.',
      'Formatting code or logs for better visibility.',
      'Reducing the length of long documents for easier reading.'
    ]
  },
  'upper-case': {
    howToUse: [
      'Paste your text into the converter.',
      'Click the "UPPERCASE" button.',
      'Every letter in your text will be instantly converted to its capital form.',
      'Copy the transformed text to your clipboard.'
    ],
    faqs: [
      { q: 'Does it affect numbers or symbols?', a: 'No, only alphabetical characters are converted; numbers and symbols remain unchanged.' },
      { q: 'Can I undo the conversion?', a: 'You can easily convert it back to lowercase or another case using our other case conversion tools.' }
    ],
    benefits: [
      'Perfect for creating bold headings and emphasis.',
      'Ensures consistency in legal or formal documents.',
      'Saves time on manual re-typing with the Caps Lock key.'
    ],
    useCases: [
      'Creating eye-catching titles for blog posts.',
      'Formatting constants in programming (e.g., MY_CONSTANT).',
      'Emphasizing important warnings or instructions in manuals.'
    ]
  },
  'lower-case': {
    howToUse: [
      'Paste your text into the converter.',
      'Click the "lowercase" button.',
      'Every letter in your text will be instantly converted to its small form.',
      'Copy the transformed text to your clipboard.'
    ],
    faqs: [
      { q: 'Does it affect numbers or symbols?', a: 'No, only alphabetical characters are converted; numbers and symbols remain unchanged.' },
      { q: 'Can it handle large blocks of text?', a: 'Yes, you can convert entire articles or documents in milliseconds.' }
    ],
    benefits: [
      'Normalizes text for data processing and analysis.',
      'Fixes accidental "Caps Lock" typing errors instantly.',
      'Ensures a consistent, understated look for your content.'
    ],
    useCases: [
      'Cleaning up user-submitted data for databases.',
      'Formatting email addresses to ensure they are all lowercase.',
      'Preparing text for linguistic analysis or search indexing.'
    ]
  },
  'title-case': {
    howToUse: [
      'Paste your title or heading into the input box.',
      'Click "Title Case" to capitalize the first letter of each word.',
      'The tool intelligently handles common words like "and", "the", and "of" based on standard style guides.',
      'Copy the perfectly formatted title for your work.'
    ],
    faqs: [
      { q: 'Does it capitalize every single word?', a: 'It follows standard title case rules, which usually keep small prepositions and conjunctions in lowercase unless they start the title.' },
      { q: 'Can I use it for book titles?', a: 'Absolutely! It is perfect for book titles, blog headings, and professional document titles.' }
    ],
    benefits: [
      'Ensures professional and consistent formatting for headings.',
      'Saves time on manual capitalization.',
      'Follows recognized editorial style guides.'
    ],
    useCases: [
      'Formatting blog post titles for better SEO and readability.',
      'Creating professional headings for reports and presentations.',
      'Organizing chapter titles for manuscripts.'
    ]
  },
  'character-counter': {
    howToUse: [
      'Type or paste your text into the counter area.',
      'The tool will instantly display the total number of characters.',
      'You can see separate counts for characters with and without spaces.',
      'The count updates in real-time as you make changes.'
    ],
    faqs: [
      { q: 'Does it count emojis?', a: 'Yes, emojis are counted as characters, though their specific byte length may vary.' },
      { q: 'Is there a limit to the text length?', a: 'No, you can count characters in everything from a tweet to a full novel.' }
    ],
    benefits: [
      'Ensures you stay within character limits for social media or meta tags.',
      'Provides instant feedback for length-restricted fields.',
      'Helps in analyzing text density and length.'
    ],
    useCases: [
      'Writing SEO meta titles and descriptions (e.g., 60 and 160 characters).',
      'Drafting social media posts for platforms like Twitter or Instagram.',
      'Meeting character limits for online forms and applications.'
    ]
  },
  'text-cleaner': {
    howToUse: [
      'Paste your messy text into the cleaner.',
      'Select the cleaning options you need (remove extra spaces, fix line breaks, etc.).',
      'Click "Clean Text" to apply all selected filters at once.',
      'Copy the polished, professional-looking text.'
    ],
    faqs: [
      { q: 'What exactly does "cleaning" do?', a: 'It performs multiple operations like removing hidden characters, normalizing whitespace, and fixing common formatting errors.' },
      { q: 'Can I customize what gets cleaned?', a: 'Yes, you can toggle specific cleaning features to suit your particular text source.' }
    ],
    benefits: [
      'Instantly transforms "dirty" data into clean content.',
      'Saves time by combining multiple tools into one.',
      'Ensures your text is ready for professional publication.'
    ],
    useCases: [
      'Cleaning up text scraped from the web or old documents.',
      'Preparing data for import into spreadsheets or databases.',
      'Fixing formatting issues in text copied from emails or chat apps.'
    ]
  },
  'reading-time': {
    howToUse: [
      'Paste your article or document into the input field.',
      'The tool will instantly calculate the estimated reading time.',
      'It uses an average reading speed of 200-250 words per minute.',
      'The result is displayed in minutes and seconds.'
    ],
    faqs: [
      { q: 'How accurate is the reading time?', a: 'It is a highly accurate estimate based on standard human reading speeds.' },
      { q: 'Does it account for technical complexity?', a: 'It primarily uses word count, so very technical text might take slightly longer for a human to read.' }
    ],
    benefits: [
      'Helps readers know what to expect before starting an article.',
      'Improves user engagement on blogs and news sites.',
      'Allows content creators to optimize their post lengths.'
    ],
    useCases: [
      'Adding "X min read" labels to blog posts and articles.',
      'Estimating the length of a speech or presentation.',
      'Planning content for newsletters and marketing emails.'
    ]
  },
  'text-reverser': {
    howToUse: [
      'Type or paste your text into the input box.',
      'Click "Reverse Text" to flip the entire string backwards.',
      'The tool can reverse the entire text, word by word, or line by line.',
      'Copy the reversed text for your creative projects.'
    ],
    faqs: [
      { q: 'Can it reverse emojis?', a: 'Yes, it correctly handles Unicode characters including emojis and symbols.' },
      { q: 'Why would I need to reverse text?', a: 'It is often used for creative design, creating puzzles, or testing software logic.' }
    ],
    benefits: [
      'Quickly creates fun and unique text effects.',
      'Useful for testing palindromes and string manipulation code.',
      'No data sent to servers, ensuring private processing.'
    ],
    useCases: [
      'Creating puzzles or "secret" messages for games.',
      'Designing creative typography for posters or social media.',
      'Testing how software handles reversed data streams.'
    ]
  },
  'camel-case': {
    howToUse: [
      'Paste your phrase or variable name into the input.',
      'Click "camelCase" to convert it.',
      'The tool will remove spaces and capitalize the first letter of each word except the first.',
      'Copy the formatted variable name for your code.'
    ],
    faqs: [
      { q: 'What is camelCase?', a: 'It is a naming convention where the first letter of each word is capitalized except for the first word, with no spaces.' },
      { q: 'Why is it used?', a: 'It is a standard convention in many programming languages like JavaScript and Java for naming variables and functions.' }
    ],
    benefits: [
      'Ensures your code follows industry-standard naming conventions.',
      'Saves time on manual formatting of variable names.',
      'Improves code readability and maintainability.'
    ],
    useCases: [
      'Naming variables and functions in JavaScript, Java, or C#.',
      'Creating clean and consistent keys for JSON objects.',
      'Formatting IDs for HTML elements.'
    ]
  },
  'snake-case': {
    howToUse: [
      'Paste your text into the converter.',
      'Click "snake_case" to transform it.',
      'The tool will convert all letters to lowercase and replace spaces with underscores.',
      'Copy the resulting string for your database or code.'
    ],
    faqs: [
      { q: 'What is snake_case?', a: 'It is a naming convention where words are separated by underscores and all letters are lowercase.' },
      { q: 'Where is it commonly used?', a: 'It is the standard convention for naming variables in Python, Ruby, and for database column names.' }
    ],
    benefits: [
      'Ensures consistency in backend development and database design.',
      'Creates highly readable and search-friendly identifiers.',
      'Saves time on manual underscore insertion.'
    ],
    useCases: [
      'Naming variables in Python or Ruby scripts.',
      'Creating column names for SQL databases.',
      'Formatting configuration keys for environment variables.'
    ]
  },
  'kebab-case': {
    howToUse: [
      'Paste your text or title into the input field.',
      'Click "kebab-case" to convert it.',
      'The tool will convert all letters to lowercase and replace spaces with hyphens.',
      'Copy the formatted string for your URLs or CSS classes.'
    ],
    faqs: [
      { q: 'What is kebab-case?', a: 'It is a naming convention where words are separated by hyphens and all letters are lowercase.' },
      { q: 'Why is it called kebab-case?', a: 'Because the hyphens look like a skewer through the words, similar to a kebab.' }
    ],
    benefits: [
      'Creates clean, SEO-friendly URLs and CSS class names.',
      'Ensures consistency in frontend development.',
      'Saves time on manual hyphenation.'
    ],
    useCases: [
      'Creating URL slugs for blog posts and pages.',
      'Naming CSS classes and IDs in HTML.',
      'Formatting filenames for web assets.'
    ]
  },
  'pascal-case': {
    howToUse: [
      'Paste your phrase into the input box.',
      'Click "PascalCase" to transform it.',
      'The tool will remove spaces and capitalize the first letter of every word.',
      'Copy the formatted name for your classes or components.'
    ],
    faqs: [
      { q: 'What is PascalCase?', a: 'It is a naming convention where the first letter of every word is capitalized, with no spaces.' },
      { q: 'How is it different from camelCase?', a: 'In PascalCase, the very first letter is capitalized, whereas in camelCase, it is lowercase.' }
    ],
    benefits: [
      'Follows standard conventions for naming classes and components.',
      'Improves code organization and clarity.',
      'Saves time on manual capitalization.'
    ],
    useCases: [
      'Naming classes in C#, Java, or Python.',
      'Naming React or Vue components in frontend development.',
      'Creating consistent types and interfaces in TypeScript.'
    ]
  },
  'constant-case': {
    howToUse: [
      'Paste your variable name or phrase into the input.',
      'Click "CONSTANT_CASE" to convert it.',
      'The tool will convert all letters to uppercase and replace spaces with underscores.',
      'Copy the resulting string for your constants.'
    ],
    faqs: [
      { q: 'What is CONSTANT_CASE?', a: 'It is a naming convention where all letters are uppercase and words are separated by underscores.' },
      { q: 'Why use it?', a: 'It is the standard way to define global constants or environment variables in most programming languages.' }
    ],
    benefits: [
      'Makes global constants stand out in your code.',
      'Ensures your project follows standard coding styles.',
      'Saves time on manual uppercase and underscore typing.'
    ],
    useCases: [
      'Defining global constants in C, C++, or Java.',
      'Naming environment variables in `.env` files.',
      'Creating unique keys for configuration objects.'
    ]
  },
  'alternating-case': {
    howToUse: [
      'Type or paste your text into the input field.',
      'Click "aLtErNaTiNg cAsE" to transform it.',
      'The tool will alternate between uppercase and lowercase letters for a "mocking" or creative effect.',
      'Copy the fun text for your social media posts.'
    ],
    faqs: [
      { q: 'What is alternating case?', a: 'It is a style of writing where every other letter is capitalized, often used to convey a sarcastic or mocking tone online.' },
      { q: 'Does it work with symbols?', a: 'Symbols and numbers remain unchanged, while letters are toggled.' }
    ],
    benefits: [
      'Creates eye-catching and humorous social media content.',
      'Instantly generates the "SpongeBob mocking" meme style text.',
      'Saves time on manual shift-key toggling.'
    ],
    useCases: [
      'Creating funny comments or posts on social media.',
      'Designing creative digital art or posters.',
      'Sending playful messages to friends.'
    ]
  },
  'inverse-case': {
    howToUse: [
      'Paste your text into the inverse case tool.',
      'Click "iNVERSE cASE" to flip the case of every letter.',
      'Uppercase letters become lowercase, and lowercase letters become uppercase.',
      'Copy the resulting text for your use.'
    ],
    faqs: [
      { q: 'What is inverse case?', a: 'It is an operation that swaps the case of every character in a string.' },
      { q: 'Why would I use this?', a: 'It is useful for fixing accidental "Caps Lock" typing or for creative text effects.' }
    ],
    benefits: [
      'Instantly fixes text typed with the wrong case.',
      'Creates unique visual effects for digital content.',
      'Saves time on manual re-typing.'
    ],
    useCases: [
      'Correcting text typed with Caps Lock accidentally on.',
      'Creating unique passwords or identifiers.',
      'Designing creative typography for posters.'
    ]
  },
  'sentence-case': {
    howToUse: [
      'Paste your paragraph or text into the input area.',
      'Click "Sentence case" to format it.',
      'The tool will capitalize the first letter of each sentence and convert the rest to lowercase.',
      'Copy the clean, readable text for your documents.'
    ],
    faqs: [
      { q: 'Does it handle multiple sentences?', a: 'Yes, it identifies sentence boundaries (like periods, question marks, and exclamation points) and capitalizes the following word.' },
      { q: 'Can it handle proper nouns?', a: 'It primarily focuses on the start of sentences. For complex proper noun handling, manual review is recommended.' }
    ],
    benefits: [
      'Instantly fixes text that is all uppercase or lowercase.',
      'Ensures your paragraphs are readable and professional.',
      'Saves time on manual capitalization of sentence starts.'
    ],
    useCases: [
      'Cleaning up text copied from chat apps or social media.',
      'Formatting rough drafts into readable paragraphs.',
      'Fixing "all caps" emails or documents.'
    ]
  },
  'upside-down': {
    howToUse: [
      'Type your message into the input box.',
      'Watch as your text is instantly flipped upside down using Unicode characters.',
      'Copy the flipped text to your clipboard.',
      'Paste it into social media bios, comments, or messages for a fun effect.'
    ],
    faqs: [
      { q: 'Does this work on all devices?', a: 'Yes, it uses standard Unicode characters that are supported by almost all modern smartphones and computers.' },
      { q: 'Can I use this on Instagram or Twitter?', a: 'Absolutely! It is perfect for making your profile stand out or surprising your friends in comments.' }
    ],
    benefits: [
      'Creates eye-catching social media content.',
      'Fun and easy way to customize your digital presence.',
      'No special software or fonts required.'
    ],
    useCases: [
      'Creating unique social media bios.',
      'Sending "secret" or funny messages to friends.',
      'Designing creative digital art or posters.'
    ]
  },
  'hex-decode': {
    howToUse: [
      'Paste your hexadecimal code into the input field.',
      'The tool will instantly decode it back into plain text.',
      'The decoded text will be displayed in the output box.',
      'Copy the decoded text for your use.'
    ],
    faqs: [
      { q: 'Can it decode any hex string?', a: 'Yes, as long as the string is a valid hexadecimal encoded sequence.' },
      { q: 'What happens if the string is invalid?', a: 'The tool will display an error message if the input is not a valid hex string.' }
    ],
    benefits: [
      'Quickly decode hex strings to human-readable text.',
      'Ensures data integrity during transmission.',
      'No data sent to servers, ensuring private decoding.'
    ],
    useCases: [
      'Decoding data from binary files or logs.',
      'Viewing text data stored in hex format.',
      'Debugging hex encoded data streams.'
    ]
  },
  'html-encode': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly encode special characters into HTML entities.',
      'Characters like <, >, and & will be replaced with their entity codes.',
      'Copy the encoded text for use in your HTML code.'
    ],
    faqs: [
      { q: 'What are HTML entities?', a: 'HTML entities are codes used to represent special characters in HTML that would otherwise be interpreted as code.' },
      { q: 'Why is it necessary?', a: 'It prevents browsers from misinterpreting text as HTML tags or code.' }
    ],
    benefits: [
      'Ensures your text is displayed correctly in HTML.',
      'Prevents cross-site scripting (XSS) vulnerabilities.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Encoding user input for display on a web page.',
      'Creating clean and valid HTML code.',
      'Formatting data for use in a web application.'
    ]
  },
  'html-decode': {
    howToUse: [
      'Paste your text containing HTML entities into the input field.',
      'The tool will instantly decode the entities back into plain text.',
      'The decoded text will be displayed in the output box.',
      'Copy the decoded text for your use.'
    ],
    faqs: [
      { q: 'Can it decode any HTML entity?', a: 'Yes, it supports both named and numeric HTML entities.' },
      { q: 'What happens if the entity is invalid?', a: 'The tool will display the original text if the entity is not recognized.' }
    ],
    benefits: [
      'Quickly decode HTML entities to human-readable text.',
      'Ensures data integrity during transmission.',
      'No data sent to servers, ensuring private decoding.'
    ],
    useCases: [
      'Decoding text from a web page source code.',
      'Viewing text data stored in HTML format.',
      'Debugging HTML encoded data streams.'
    ]
  },
  'extract-emails': {
    howToUse: [
      'Paste your text containing email addresses into the input area.',
      'The tool will instantly scan the text and extract all valid email addresses.',
      'A list of unique email addresses will be displayed in the output.',
      'Copy the extracted emails for your use.'
    ],
    faqs: [
      { q: 'Can it extract emails from a large block of text?', a: 'Yes, it can handle large amounts of text and extract all unique email addresses instantly.' },
      { q: 'Does it remove duplicates?', a: 'Yes, our tool automatically removes duplicate email addresses from the final list.' }
    ],
    benefits: [
      'Quickly extract email addresses from messy text.',
      'Saves time on manual extraction.',
      'No data sent to servers, ensuring private extraction.'
    ],
    useCases: [
      'Extracting contact information from a document.',
      'Cleaning up a list of email addresses.',
      'Preparing a mailing list for professional use.'
    ]
  },
  'extract-urls': {
    howToUse: [
      'Paste your text containing URLs into the input area.',
      'The tool will instantly scan the text and extract all valid URLs.',
      'A list of unique URLs will be displayed in the output.',
      'Copy the extracted URLs for your use.'
    ],
    faqs: [
      { q: 'Can it extract URLs from a large block of text?', a: 'Yes, it can handle large amounts of text and extract all unique URLs instantly.' },
      { q: 'Does it remove duplicates?', a: 'Yes, our tool automatically removes duplicate URLs from the final list.' }
    ],
    benefits: [
      'Quickly extract URLs from messy text.',
      'Saves time on manual extraction.',
      'No data sent to servers, ensuring private extraction.'
    ],
    useCases: [
      'Extracting links from a document.',
      'Cleaning up a list of URLs.',
      'Preparing a list of resources for professional use.'
    ]
  },
  'hex-encode': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly convert each character into its hexadecimal representation.',
      'The hex code will be displayed with spaces between each byte for readability.',
      'Copy the hex code for your use.'
    ],
    faqs: [
      { q: 'How does text to hex work?', a: 'Each character is converted into its numeric ASCII/UTF-8 code, which is then represented in base-16 (hexadecimal).' },
      { q: 'Can I convert emojis to hex?', a: 'Yes, our tool supports full Unicode, so you can convert any character, including emojis, to hex.' }
    ],
    benefits: [
      'Quickly convert human language to hexadecimal code.',
      'Educational tool for learning hexadecimal systems.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Creating hidden messages in hex format.',
      'Understanding how computers store text data.',
      'Debugging low-level data streams.'
    ]
  },
  'case-distribution': {
    howToUse: [
      'Paste your text into the input field.',
      'The tool will instantly analyze the distribution of uppercase and lowercase letters.',
      'A breakdown of character counts and percentages will be displayed.',
      'Use the results to ensure consistent case usage in your documents.'
    ],
    faqs: [
      { q: 'What is case distribution?', a: 'Case distribution is the ratio of uppercase to lowercase letters in a given text.' },
      { q: 'Why is it important?', a: 'It helps in identifying formatting inconsistencies and ensures your text follows specific style guides.' }
    ],
    benefits: [
      'Quickly identify case inconsistencies in your text.',
      'Ensures your documents follow specific style guides.',
      'No data sent to servers, ensuring private analysis.'
    ],
    useCases: [
      'Checking for consistent case usage in a long document.',
      'Analyzing text for linguistic research.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'char-frequency': {
    howToUse: [
      'Paste your text into the input field.',
      'The tool will instantly count the frequency of each character.',
      'A list of characters and their counts will be displayed.',
      'Use the results to analyze character usage in your text.'
    ],
    faqs: [
      { q: 'What is character frequency?', a: 'Character frequency is the number of times each character appears in a given text.' },
      { q: 'Why is it useful?', a: 'It is useful for linguistic analysis, cryptography, and data compression.' }
    ],
    benefits: [
      'Quickly analyze character usage in your text.',
      'Provides insights into text structure and composition.',
      'No data sent to servers, ensuring private analysis.'
    ],
    useCases: [
      'Analyzing text for linguistic research.',
      'Creating simple puzzles or riddles.',
      'Debugging data streams for character usage.'
    ]
  },
  'word-length-stats': {
    howToUse: [
      'Paste your text into the input field.',
      'The tool will instantly calculate the length of each word.',
      'A breakdown of word lengths and their counts will be displayed.',
      'Use the results to analyze word usage in your text.'
    ],
    faqs: [
      { q: 'What are word length stats?', a: 'Word length stats are the distribution of word lengths in a given text.' },
      { q: 'Why is it important?', a: 'It helps in analyzing text readability and complexity.' }
    ],
    benefits: [
      'Quickly analyze word usage in your text.',
      'Provides insights into text readability and complexity.',
      'No data sent to servers, ensuring private analysis.'
    ],
    useCases: [
      'Analyzing text for linguistic research.',
      'Checking for word length consistency in a document.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'url-decode': {
    howToUse: [
      'Paste your percent-encoded URL or text into the input field.',
      'The tool will instantly decode it into plain text.',
      'The decoded text will be displayed in the output box.',
      'Copy the decoded text for your use.'
    ],
    faqs: [
      { q: 'Can it decode any URL string?', a: 'Yes, as long as the string is a valid percent-encoded sequence.' },
      { q: 'What happens if the string is invalid?', a: 'The tool will display an error message if the input is not a valid percent-encoded string.' }
    ],
    benefits: [
      'Quickly decode URL strings to human-readable text.',
      'Ensures data integrity during transmission.',
      'No data sent to servers, ensuring private decoding.'
    ],
    useCases: [
      'Decoding data from URLs or emails.',
      'Viewing binary data stored in text format.',
      'Debugging URL encoded data streams.'
    ]
  },
  'rot13': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly rotate each character by 13 positions in the alphabet.',
      'The encoded/decoded text will be displayed in the output box.',
      'Copy the ROT13 text for your use.'
    ],
    faqs: [
      { q: 'What is ROT13?', a: 'ROT13 is a simple substitution cipher that replaces a letter with the 13th letter after it in the alphabet.' },
      { q: 'Is it secure?', a: 'ROT13 is not a secure encryption method. It is a simple way to obscure text.' }
    ],
    benefits: [
      'Easily obscure text for simple use cases.',
      'Quickly decode ROT13 text to human-readable text.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Obscuring spoilers in online forums.',
      'Creating simple puzzles or riddles.',
      'Decoding ROT13 text from websites.'
    ]
  },
  'morse-code': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly translate it into Morse code.',
      'The Morse code will be displayed with spaces between each character.',
      'Copy the Morse code for your use.'
    ],
    faqs: [
      { q: 'How does Morse code work?', a: 'Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks.' },
      { q: 'Can I translate Morse code back to text?', a: 'Yes, our tool can also decode Morse code back into English text.' }
    ],
    benefits: [
      'Quickly translate human language to Morse code.',
      'Educational tool for learning Morse code.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Creating hidden messages in Morse code.',
      'Understanding how Morse code works.',
      'Debugging Morse code data streams.'
    ]
  },
  'base64-encode': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly encode it into Base64 format.',
      'The encoded string will be displayed in the output box.',
      'Copy the Base64 string for your use.'
    ],
    faqs: [
      { q: 'What is Base64 encoding?', a: 'Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.' },
      { q: 'Is it secure?', a: 'Base64 is not a form of encryption. It is a way to represent binary data in a text format.' }
    ],
    benefits: [
      'Easily encode binary data for text-based protocols.',
      'Ensures data integrity during transmission.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Encoding images for data URLs.',
      'Transmitting binary data over email.',
      'Storing binary data in text-based databases.'
    ]
  },
  'base64-decode': {
    howToUse: [
      'Paste your Base64 encoded string into the input field.',
      'The tool will instantly decode it back into plain text.',
      'The decoded text will be displayed in the output box.',
      'Copy the decoded text for your use.'
    ],
    faqs: [
      { q: 'Can it decode any Base64 string?', a: 'Yes, as long as the string is a valid Base64 encoded sequence.' },
      { q: 'What happens if the string is invalid?', a: 'The tool will display an error message if the input is not a valid Base64 string.' }
    ],
    benefits: [
      'Quickly decode Base64 strings to human-readable text.',
      'Ensures data integrity during transmission.',
      'No data sent to servers, ensuring private decoding.'
    ],
    useCases: [
      'Decoding data from URLs or emails.',
      'Viewing binary data stored in text format.',
      'Debugging Base64 encoded data streams.'
    ]
  },
  'url-encode': {
    howToUse: [
      'Type or paste your URL or text into the input field.',
      'The tool will instantly encode it for use in a URL.',
      'Special characters will be replaced with their percent-encoded equivalents.',
      'Copy the encoded URL for your use.'
    ],
    faqs: [
      { q: 'What is URL encoding?', a: 'URL encoding is a mechanism for encoding information in a Uniform Resource Identifier (URI).' },
      { q: 'Why is it necessary?', a: 'It ensures that special characters in a URL do not interfere with the URL structure.' }
    ],
    benefits: [
      'Ensures your URLs are valid and functional.',
      'Prevents errors when passing parameters in a URL.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Encoding query parameters for a URL.',
      'Creating clean and valid URLs for your website.',
      'Formatting data for use in a web request.'
    ]
  },
  'slug-generator': {
    howToUse: [
      'Paste your title or phrase into the input box.',
      'The tool will instantly convert it into a URL-friendly slug.',
      'It will remove special characters, convert to lowercase, and replace spaces with hyphens.',
      'Copy the generated slug for your URL or filename.'
    ],
    faqs: [
      { q: 'What is a URL slug?', a: 'A URL slug is the part of a URL that identifies a specific page in a human-readable format.' },
      { q: 'Is it SEO-friendly?', a: 'Yes, our tool creates slugs that are optimized for search engines and easy for users to read.' }
    ],
    benefits: [
      'Instantly creates search-engine-friendly URLs.',
      'Ensures consistent formatting for your website.',
      'Saves time on manual slug creation.'
    ],
    useCases: [
      'Creating URLs for blog posts or articles.',
      'Generating clean filenames for images or documents.',
      'Formatting IDs for database entries.'
    ]
  },
  'text-to-binary': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly convert each character into its 8-bit binary representation.',
      'The binary code will be displayed with spaces between each byte for readability.',
      'Copy the binary code for your use.'
    ],
    faqs: [
      { q: 'How does text to binary work?', a: 'Each character is converted into its numeric ASCII/UTF-8 code, which is then represented in base-2 (binary).' },
      { q: 'Can I convert emojis to binary?', a: 'Yes, our tool supports full Unicode, so you can convert any character, including emojis, to binary.' }
    ],
    benefits: [
      'Quickly convert human language to machine code.',
      'Educational tool for learning binary systems.',
      'No data sent to servers, ensuring private encoding.'
    ],
    useCases: [
      'Creating hidden messages in binary format.',
      'Understanding how computers store text data.',
      'Debugging low-level data streams.'
    ]
  },
  'remove-numbers': {
    howToUse: [
      'Paste your text containing numbers into the input field.',
      'The tool will instantly identify and remove all numeric characters (0-9).',
      'Copy the cleaned text without numbers for your use.',
      'Check the character count to see how many characters were removed.'
    ],
    faqs: [
      { q: 'Does it remove numbers within words?', a: 'Yes, it removes all numeric digits regardless of where they are in the text.' },
      { q: 'Can I keep some numbers?', a: 'This tool is designed to remove all numbers. If you need more control, you might need a regex tool.' }
    ],
    benefits: [
      'Quickly clean up data containing unwanted numbers.',
      'Prepare text for linguistic analysis without numeric noise.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up text copied from numbered lists.',
      'Removing timestamps or IDs from logs.',
      'Preparing clean drafts for creative writing.'
    ]
  },
  'remove-special-characters': {
    howToUse: [
      'Paste your text with symbols and special characters into the input.',
      'The tool will filter out all non-alphanumeric characters.',
      'You can choose to keep spaces or remove them as well.',
      'Copy the resulting clean text instantly.'
    ],
    faqs: [
      { q: 'What counts as a special character?', a: 'Any character that is not a letter (A-Z) or a number (0-9) is considered a special character.' },
      { q: 'Can I keep punctuation?', a: 'Our tool removes all symbols. If you want to keep specific punctuation, you might need a custom regex.' }
    ],
    benefits: [
      'Ensures text is compatible with systems that only accept alphanumeric input.',
      'Cleans up messy data from web scraping.',
      'Creates clean strings for filenames or IDs.'
    ],
    useCases: [
      'Preparing text for database entry.',
      'Cleaning up text for URL slug generation.',
      'Removing unwanted symbols from social media posts.'
    ]
  },
  'remove-html-tags': {
    howToUse: [
      'Paste your HTML code or text with tags into the input area.',
      'The tool will strip away all HTML tags (e.g., <div>, <p>, <a>).',
      'The content inside the tags will be preserved as plain text.',
      'Copy the clean plain text for your use.'
    ],
    faqs: [
      { q: 'Does it remove the content inside the tags?', a: 'No, it only removes the tags themselves. The text content remains intact.' },
      { q: 'Can it handle nested tags?', a: 'Yes, it accurately removes all levels of nested HTML tags.' }
    ],
    benefits: [
      'Instantly converts HTML to plain text.',
      'Cleans up text copied from web pages.',
      'Saves time on manual tag removal.'
    ],
    useCases: [
      'Extracting text from a web page source code.',
      'Cleaning up content for a plain text email.',
      'Preparing web content for a word processor.'
    ]
  },
  'text-repeater': {
    howToUse: [
      'Enter the text you want to repeat in the input box.',
      'Specify the number of times you want it to repeat.',
      'Choose whether to add a space, newline, or custom separator between repetitions.',
      'Click "Repeat" to generate the repeated text instantly.'
    ],
    faqs: [
      { q: 'Is there a limit to the number of repetitions?', a: 'You can repeat text thousands of times, but extremely high numbers might slow down your browser depending on your device memory.' },
      { q: 'Can I repeat emojis?', a: 'Yes, our tool fully supports Unicode, so you can repeat emojis, symbols, and special characters.' }
    ],
    benefits: [
      'Quickly generate large amounts of text for testing.',
      'Create repetitive patterns for design or social media.',
      'Saves time on manual copy-pasting.'
    ],
    useCases: [
      'Testing text overflow in web development.',
      'Creating repetitive social media posts or comments.',
      'Generating sample data for testing purposes.'
    ]
  },
  'find-replace': {
    howToUse: [
      'Paste your text into the main input area.',
      'Enter the word or phrase you want to find.',
      'Enter the replacement word or phrase.',
      'Choose whether to match case or replace all occurrences.',
      'Click "Replace" to update your text instantly.'
    ],
    faqs: [
      { q: 'Can I use regular expressions?', a: 'Currently, it supports plain text matching, but we are working on adding regex support for advanced users.' },
      { q: 'Does it replace all occurrences at once?', a: 'Yes, by default it replaces every instance of the search term in your text.' }
    ],
    benefits: [
      'Fast bulk editing of large documents.',
      'Ensures consistency when changing names or terms.',
      'Easy to use interface for complex replacements.'
    ],
    useCases: [
      'Updating names or dates in a long article.',
      'Fixing recurring typos in a document.',
      'Replacing placeholders in code or templates.'
    ]
  },
  'json-to-text': {
    howToUse: [
      'Paste your JSON object into the input field.',
      'The tool will convert the JSON data into a clean, human-readable text format.',
      'Copy the resulting text for your report or message.'
    ],
    faqs: [
      { q: 'How does it format the text?', a: 'It typically flattens the JSON structure and lists keys and values in a readable way, often used for summarizing data.' },
      { q: 'Can it handle nested JSON?', a: 'Yes, it can traverse nested objects and arrays to extract all the text data.' }
    ],
    benefits: [
      'Quickly turn complex data into a readable summary.',
      'Useful for non-technical users to understand JSON data.',
      'Saves time on manual data extraction.'
    ],
    useCases: [
      'Summarizing API responses for a report.',
      'Converting JSON configuration to a readable list.',
      'Extracting text content from a JSON data dump.'
    ]
  },
  'sort-lines': {
    howToUse: [
      'Paste your list of items (one per line) into the input.',
      'Choose your sorting order: Alphabetical (A-Z), Reverse (Z-A), or Random.',
      'Select whether to remove duplicate lines during sorting.',
      'Click "Sort" to organize your list instantly.'
    ],
    faqs: [
      { q: 'Can it sort numbers correctly?', a: 'Yes, it handles both alphabetical and numerical sorting to ensure your list is perfectly ordered.' },
      { q: 'Does it ignore case while sorting?', a: 'You can choose whether to perform a case-sensitive or case-insensitive sort based on your needs.' }
    ],
    benefits: [
      'Instantly organizes messy lists.',
      'Removes duplicates automatically if selected.',
      'Multiple sorting modes for maximum flexibility.'
    ],
    useCases: [
      'Organizing a list of names or email addresses.',
      'Sorting CSS properties or code variables.',
      'Cleaning up a list of keywords for SEO.'
    ]
  },
  'word-counter': {
    howToUse: [
      'Type or paste your content into the word counter.',
      'Watch the numbers update in real-time as you type.',
      'Check word count, character count, and even sentence count.',
      'Use the results to meet specific length requirements for assignments or posts.'
    ],
    faqs: [
      { q: 'Does it count spaces as characters?', a: 'Yes, we provide both "Characters with spaces" and "Characters without spaces" for complete accuracy.' },
      { q: 'Is there a word limit?', a: 'No, you can paste entire chapters or long articles to get an accurate count.' }
    ],
    benefits: [
      'Real-time updates as you type.',
      'Detailed statistics including reading time.',
      'Perfect for SEO meta descriptions and social media posts.'
    ]
  },
  'json-formatter': {
    howToUse: [
      'Paste your minified or messy JSON string into the input.',
      'Click "Format JSON" to prettify the code with proper indentation.',
      'Use the "Copy" button to get the clean, readable JSON.',
      'If your JSON is invalid, the tool will alert you to the error.'
    ],
    faqs: [
      { q: 'Does it validate JSON?', a: 'Yes, it will let you know if there are syntax errors in your JSON data.' },
      { q: 'Can it minify JSON too?', a: 'Yes, we have a separate mode or tool for minification if you need to reduce file size.' }
    ],
    benefits: [
      'Makes complex data structures readable.',
      'Helps in debugging API responses.',
      'Standardizes code formatting for teams.'
    ]
  },
  'sql-formatter': {
    howToUse: [
      'Paste your raw SQL query into the input field.',
      'Click "Format SQL" to apply standard indentation and capitalization.',
      'The tool will automatically detect keywords like SELECT, FROM, and WHERE.',
      'Copy the beautified SQL for use in your code or documentation.'
    ],
    faqs: [
      { q: 'Does it support different SQL dialects?', a: 'Yes, it works with standard SQL, MySQL, PostgreSQL, and SQL Server syntax.' },
      { q: 'Can it handle nested subqueries?', a: 'Absolutely! It will indent subqueries correctly to show the logical structure.' }
    ],
    benefits: [
      'Improves code maintainability.',
      'Makes complex queries easier to debug.',
      'Standardizes SQL style across your project.'
    ]
  },
  'jwt-decoder': {
    howToUse: [
      'Paste your encoded JWT string into the decoder.',
      'The tool will instantly split it into Header, Payload, and Signature.',
      'View the decoded JSON data in a readable format.',
      'Use the information to debug authentication issues or verify claims.'
    ],
    faqs: [
      { q: 'Is my JWT sent to a server?', a: 'No, the decoding happens entirely in your browser. Your sensitive tokens never leave your device.' },
      { q: 'Can it verify the signature?', a: 'This is a client-side decoder for viewing data. Signature verification usually requires a secret key on the server side.' }
    ],
    benefits: [
      'Instant decoding without server round-trips.',
      'Privacy-focused debugging.',
      'Clear visualization of token claims.'
    ]
  },
  'password-gen-strength': {
    howToUse: [
      'To check strength, paste your password into the field.',
      'To generate, select "Generate New" mode and choose your length.',
      'Review the entropy score and strength rating.',
      'Copy the secure password for use in your accounts.'
    ],
    faqs: [
      { q: 'What is entropy in passwords?', a: 'Entropy measures the randomness of a password. Higher entropy means it is much harder for hackers to guess or brute-force.' },
      { q: 'Are the generated passwords stored?', a: 'Never. They are generated locally and forgotten as soon as you close the page.' }
    ],
    benefits: [
      'Ensures your accounts are protected by strong passwords.',
      'Provides scientific feedback on password security.',
      'Fast and secure generation without server logs.'
    ]
  },
  'remove-line-breaks': {
    howToUse: [
      'Select the text block with unwanted line breaks.',
      'Paste it into the Remove Line Breaks tool input field.',
      'The tool will automatically merge the lines into a single paragraph.',
      'Copy the result and use it in your document or social media post.'
    ],
    faqs: [
      { q: 'Will it remove paragraph breaks too?', a: 'Yes, it removes all newline characters. If you want to keep paragraphs but remove single line breaks, you might need a different setting, but our default tool creates a single continuous line.' },
      { q: 'Is this useful for PDF text?', a: 'Absolutely! Copying from PDFs often results in broken lines. This tool fixes that instantly.' }
    ],
    benefits: [
      'Fixes broken formatting from PDF copies.',
      'Creates clean single-line strings for code or URLs.',
      'Makes text easier to re-format in word processors.'
    ]
  },
  'text-steganography': {
    howToUse: [
      'Enter your "Public Message" (the text everyone will see).',
      'Enter your "Secret Message" (the hidden text).',
      'Click "Hide Message" to generate the encoded text.',
      'To decode, paste the encoded text into the input and click "Reveal Message".'
    ],
    faqs: [
      { q: 'Can anyone see the hidden message?', a: 'No, the hidden message uses invisible Unicode characters. It looks like normal text to the naked eye.' },
      { q: 'Does it work on social media?', a: 'It works on most platforms that support Unicode, like Twitter, WhatsApp, and Telegram, but some platforms might strip invisible characters.' }
    ],
    extraInfo: 'Text steganography is a fascinating way to share private information within plain sight. It is often used for watermarking text or sending subtle hints without alerting casual observers.'
  },
  'remove-accents': {
    howToUse: [
      'Paste your text with accented characters (e.g., é, ö, ñ) into the input field.',
      'The tool will instantly replace them with their non-accented equivalents (e.g., e, o, n).',
      'Copy the resulting clean text for your use.'
    ],
    faqs: [
      { q: 'What languages are supported?', a: 'We support a wide range of languages, including Spanish, French, German, Portuguese, and more.' },
      { q: 'Does it handle special characters?', a: 'Yes, it specifically targets accented letters while preserving other special characters.' }
    ],
    benefits: [
      'Quickly clean up data for database imports.',
      'Prepare text for URL slugs or filenames.',
      'Saves time on manual replacement.'
    ],
    useCases: [
      'Cleaning up data for CSV files.',
      'Removing accents from social media posts.',
      'Preparing clean text for analysis.'
    ]
  },
  'remove-emojis': {
    howToUse: [
      'Paste your text containing emojis into the input field.',
      'The tool will instantly identify and remove all emoji characters.',
      'Copy the resulting clean text without emojis for your use.'
    ],
    faqs: [
      { q: 'Does it remove all types of emojis?', a: 'Yes, it removes all standard Unicode emojis, including skin tone variations.' },
      { q: 'Can I keep some emojis?', a: 'This tool is designed to remove all emojis. If you need more control, you might need a regex tool.' }
    ],
    benefits: [
      'Quickly clean up text for professional use.',
      'Prepare text for linguistic analysis without emoji noise.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up social media posts for reporting.',
      'Removing emojis from professional emails.',
      'Preparing clean drafts for creative writing.'
    ]
  },
  'remove-punctuation': {
    howToUse: [
      'Paste your text with punctuation into the input field.',
      'The tool will instantly identify and remove all punctuation marks.',
      'Copy the resulting clean text without punctuation for your use.'
    ],
    faqs: [
      { q: 'What punctuation marks are removed?', a: 'We remove all standard punctuation marks, including periods, commas, exclamation points, and more.' },
      { q: 'Can I keep some punctuation?', a: 'This tool is designed to remove all punctuation. If you need more control, you might need a regex tool.' }
    ],
    benefits: [
      'Quickly clean up text for linguistic analysis.',
      'Prepare text for database imports without punctuation noise.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up data for CSV files.',
      'Removing punctuation from social media posts.',
      'Preparing clean text for analysis.'
    ]
  },
  'mirror-text': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly mirror each character, making it look like it\'s reflected in a mirror.',
      'Copy the resulting mirrored text for your use.'
    ],
    faqs: [
      { q: 'How does it mirror the text?', a: 'It uses special Unicode characters that are mirrored versions of standard letters.' },
      { q: 'Can I mirror emojis?', a: 'Yes, our tool supports full Unicode, so you can mirror any character, including emojis.' }
    ],
    benefits: [
      'Quickly create unique and creative text effects.',
      'Design creative digital art or posters.',
      'Saves time on manual mirroring.'
    ],
    useCases: [
      'Creating unique social media posts.',
      'Designing creative digital art or posters.',
      'Preparing clean data for professional use.'
    ]
  },
  'line-counter': {
    howToUse: [
      'Paste your text into the input field.',
      'The tool will instantly display the total number of lines.',
      'You can also see character count and word count.'
    ],
    faqs: [
      { q: 'How are lines counted?', a: 'A line is defined as a sequence of characters followed by a newline character.' },
      { q: 'Does it count empty lines?', a: 'Yes, by default, it counts all lines, including empty ones.' }
    ],
    benefits: [
      'Quickly check the length of your documents.',
      'Ensure your content meets specific line count requirements.',
      'Saves time on manual counting.'
    ],
    useCases: [
      'Checking the length of a script or poem.',
      'Ensuring a document fits within line limits.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'sentence-counter': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly display the total number of sentences.',
      'You can also see character count and word count.'
    ],
    faqs: [
      { q: 'How are sentences counted?', a: 'A sentence is defined as a sequence of characters ending with a period, exclamation point, or question mark.' },
      { q: 'Does it handle abbreviations?', a: 'Yes, our tool is designed to correctly identify sentence boundaries even with abbreviations.' }
    ],
    benefits: [
      'Quickly check the length of your writing.',
      'Ensure your content meets specific sentence count requirements.',
      'Saves time on manual counting.'
    ],
    useCases: [
      'Checking the length of a blog post or article.',
      'Ensuring a social media post fits within sentence limits.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'paragraph-counter': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly display the total number of paragraphs.',
      'You can also see character count and word count.'
    ],
    faqs: [
      { q: 'How are paragraphs counted?', a: 'A paragraph is defined as a sequence of characters separated by one or more blank lines.' },
      { q: 'Does it count empty paragraphs?', a: 'No, it only counts paragraphs that contain text.' }
    ],
    benefits: [
      'Quickly check the structure of your writing.',
      'Ensure your content meets specific paragraph count requirements.',
      'Saves time on manual counting.'
    ],
    useCases: [
      'Checking the structure of a blog post or article.',
      'Ensuring a document fits within paragraph limits.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'text-to-list': {
    howToUse: [
      'Paste your text into the input field.',
      'Choose the separator (e.g., comma, newline, space) to split the text into list items.',
      'The tool will instantly generate a list based on your selection.'
    ],
    faqs: [
      { q: 'Can I use a custom separator?', a: 'Yes, you can specify any character or sequence of characters as a separator.' },
      { q: 'Does it handle empty items?', a: 'Yes, you can choose whether to include or exclude empty items from the list.' }
    ],
    benefits: [
      'Quickly convert plain text into a structured list.',
      'Prepare data for use in spreadsheets or databases.',
      'Saves time on manual list creation.'
    ],
    useCases: [
      'Converting a comma-separated list into a newline-separated list.',
      'Preparing data for a spreadsheet.',
      'Formatting text for professional use.'
    ]
  },
  'add-prefix': {
    howToUse: [
      'Paste your list of lines into the input field.',
      'Enter the prefix you want to add to the beginning of each line.',
      'The tool will instantly update each line with the prefix.'
    ],
    faqs: [
      { q: 'Can I add a suffix as well?', a: 'Yes, our tool also allows you to add a suffix to the end of each line.' },
      { q: 'Does it handle empty lines?', a: 'Yes, you can choose whether to add the prefix to empty lines or not.' }
    ],
    benefits: [
      'Quickly format a list of items.',
      'Prepare data for use in code or documentation.',
      'Saves time on manual editing.'
    ],
    useCases: [
      'Adding a bullet point to each line of a list.',
      'Formatting a list of variables for code.',
      'Preparing clean data for professional use.'
    ]
  },
  'random-string': {
    howToUse: [
      'Specify the length of the random string you want to generate.',
      'Choose the character sets to include (e.g., letters, numbers, symbols).',
      'The tool will instantly generate a random string based on your selection.'
    ],
    faqs: [
      { q: 'Is the string truly random?', a: 'Yes, it uses a cryptographically secure random number generator for maximum randomness.' },
      { q: 'Can I generate multiple strings?', a: 'Yes, you can specify the number of random strings you want to generate.' }
    ],
    benefits: [
      'Quickly generate secure random strings.',
      'Create unique identifiers for your data.',
      'Saves time on manual string creation.'
    ],
    useCases: [
      'Generating random passwords or API keys.',
      'Creating unique IDs for database entries.',
      'Preparing clean data for professional use.'
    ]
  },
  'remove-all-whitespace': {
    howToUse: [
      'Paste your text containing whitespace into the input field.',
      'The tool will instantly remove all spaces, tabs, and newlines.',
      'Copy the resulting clean text without whitespace for your use.'
    ],
    faqs: [
      { q: 'Does it remove all types of whitespace?', a: 'Yes, it removes spaces, tabs, carriage returns, and newlines.' },
      { q: 'Can I keep some whitespace?', a: 'This tool is designed to remove all whitespace. If you need more control, you might need a regex tool.' }
    ],
    benefits: [
      'Quickly clean up data for database imports.',
      'Prepare text for use in code or documentation.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up data for CSV files.',
      'Removing whitespace from social media posts.',
      'Preparing clean text for analysis.'
    ]
  },
  'text-density': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly analyze the density of each word.',
      'You can see a list of the most frequent words and their percentages.'
    ],
    faqs: [
      { q: 'How is density calculated?', a: 'Density is the number of times a word appears divided by the total number of words.' },
      { q: 'Does it exclude stop words?', a: 'Yes, you can choose to exclude common stop words like "the", "and", "is" from the analysis.' }
    ],
    benefits: [
      'Quickly analyze the keyword density of your content.',
      'Optimize your writing for search engines.',
      'Saves time on manual analysis.'
    ],
    useCases: [
      'Analyzing the keyword density of a blog post or article.',
      'Optimizing content for SEO.',
      'Preparing clean data for professional use.'
    ]
  },
  'csv-to-json': {
    howToUse: [
      'Paste your CSV data into the input field.',
      'The tool will instantly convert it into a JSON array of objects.',
      'You can choose the delimiter (e.g., comma, semicolon).'
    ],
    faqs: [
      { q: 'Can it handle headers?', a: 'Yes, the tool uses the first row of your CSV as the keys for the JSON objects.' },
      { q: 'Is my data safe?', a: 'Yes, all conversion is done locally in your browser, so your data is never sent to our servers.' }
    ],
    benefits: [
      'Quickly convert CSV data into a more flexible format.',
      'Prepare data for use in web applications or APIs.',
      'Saves time on manual conversion.'
    ],
    useCases: [
      'Converting a spreadsheet into a JSON file.',
      'Preparing data for a web application.',
      'Formatting text for professional use.'
    ]
  },
  'remove-duplicate-words': {
    howToUse: [
      'Paste your text containing duplicate words into the input field.',
      'The tool will instantly identify and remove all consecutive duplicate words.',
      'Copy the resulting clean text for your use.'
    ],
    faqs: [
      { q: 'Does it remove all duplicates or only consecutive ones?', a: 'By default, it removes consecutive duplicates, but you can choose to remove all duplicates.' },
      { q: 'Is it case-sensitive?', a: 'Yes, by default, it is case-sensitive, but you can toggle this option.' }
    ],
    benefits: [
      'Quickly clean up repetitive text.',
      'Improve the readability of your writing.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up social media posts.',
      'Removing duplicates from professional emails.',
      'Preparing clean drafts for creative writing.'
    ]
  },
  'zalgo-text': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly add "glitchy" Unicode characters to your text.',
      'You can adjust the intensity of the Zalgo effect.'
    ],
    faqs: [
      { q: 'How does it create the glitch effect?', a: 'It uses combining Unicode characters that stack on top of and below standard letters.' },
      { q: 'Can I use Zalgo text on social media?', a: 'Yes, most social media platforms support Zalgo text, though some may filter it.' }
    ],
    benefits: [
      'Quickly create unique and creative text effects.',
      'Design creative digital art or posters.',
      'Saves time on manual Zalgo creation.'
    ],
    useCases: [
      'Creating unique social media posts.',
      'Designing creative digital art or posters.',
      'Preparing clean data for professional use.'
    ]
  },
  'nato-phonetic': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly translate each letter into its NATO phonetic equivalent (e.g., Alpha, Bravo, Charlie).',
      'Copy the resulting phonetic text for your use.'
    ],
    faqs: [
      { q: 'What is the NATO phonetic alphabet?', a: 'It is a standardized alphabet used by military and aviation professionals to communicate clearly over radio.' },
      { q: 'Can I translate numbers?', a: 'Yes, the tool also supports phonetic equivalents for numbers (e.g., One, Two, Three).' }
    ],
    benefits: [
      'Quickly translate text into a clear and unambiguous format.',
      'Communicate clearly over radio or phone.',
      'Saves time on manual translation.'
    ],
    useCases: [
      'Communicating clearly over radio or phone.',
      'Preparing clean data for professional use.',
      'Designing creative digital art or posters.'
    ]
  },
  'text-to-ascii-banner': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly generate a large ASCII art banner based on your text.',
      'You can choose from different ASCII fonts and styles.'
    ],
    faqs: [
      { q: 'How does it create the banner?', a: 'It uses a library of ASCII fonts to represent each character as a large block of text.' },
      { q: 'Can I use ASCII banners in code?', a: 'Yes, many developers use ASCII banners in their code comments or terminal outputs.' }
    ],
    benefits: [
      'Quickly create unique and creative text effects.',
      'Design creative digital art or posters.',
      'Saves time on manual ASCII creation.'
    ],
    useCases: [
      'Creating unique social media posts.',
      'Designing creative digital art or posters.',
      'Preparing clean data for professional use.'
    ]
  },
  'remove-whitespace-trim': {
    howToUse: [
      'Paste your text containing whitespace into the input field.',
      'The tool will instantly remove all leading and trailing whitespace.',
      'Copy the resulting clean text for your use.'
    ],
    faqs: [
      { q: 'Does it remove whitespace within the text?', a: 'No, it only removes whitespace from the beginning and end of the text.' },
      { q: 'Can I remove all whitespace?', a: 'Yes, we have a separate tool for removing all whitespace if that\'s what you need.' }
    ],
    benefits: [
      'Quickly clean up data for database imports.',
      'Prepare text for use in code or documentation.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up data for CSV files.',
      'Removing whitespace from social media posts.',
      'Preparing clean text for analysis.'
    ]
  },
  'whitespace-remover': {
    howToUse: [
      'Paste your text containing whitespace into the input field.',
      'The tool will instantly remove all spaces, tabs, and newlines.',
      'Copy the resulting clean text without whitespace for your use.'
    ],
    faqs: [
      { q: 'Does it remove all types of whitespace?', a: 'Yes, it removes spaces, tabs, carriage returns, and newlines.' },
      { q: 'Can I keep some whitespace?', a: 'This tool is designed to remove all whitespace. If you need more control, you might need a regex tool.' }
    ],
    benefits: [
      'Quickly clean up data for database imports.',
      'Prepare text for use in code or documentation.',
      'Saves time on manual deletion.'
    ],
    useCases: [
      'Cleaning up data for CSV files.',
      'Removing whitespace from social media posts.',
      'Preparing clean text for analysis.'
    ]
  },
  'text-to-json': {
    howToUse: [
      'Paste your plain text into the input field.',
      'The tool will instantly wrap it in a JSON object or array.',
      'You can choose the format (e.g., single object, array of lines).'
    ],
    faqs: [
      { q: 'Can it handle complex text?', a: 'Yes, it can wrap any text into a JSON string, ensuring proper escaping of special characters.' },
      { q: 'Is my data safe?', a: 'Yes, all conversion is done locally in your browser, so your data is never sent to our servers.' }
    ],
    benefits: [
      'Quickly convert plain text into a more flexible format.',
      'Prepare data for use in web applications or APIs.',
      'Saves time on manual conversion.'
    ],
    useCases: [
      'Converting a list into a JSON array.',
      'Preparing data for a web application.',
      'Formatting text for professional use.'
    ]
  },
  'text-case-converter': {
    howToUse: [
      'Type or paste your text into the input field.',
      'Choose the desired case format (e.g., Upper Case, Lower Case, Title Case).',
      'The tool will instantly transform the text into the selected format.'
    ],
    faqs: [
      { q: 'What case formats are supported?', a: 'We support Upper Case, Lower Case, Title Case, Sentence Case, Camel Case, Snake Case, and more.' },
      { q: 'Does it handle special characters?', a: 'Yes, it preserves special characters while only changing the case of letters.' }
    ],
    benefits: [
      'Quickly format text for different purposes.',
      'Ensure consistency in your documents.',
      'Saves time on manual case changes.'
    ],
    useCases: [
      'Formatting titles for blog posts or articles.',
      'Cleaning up data for database imports.',
      'Preparing clean drafts for professional use.'
    ]
  },
  'markdown-to-plain': {
    howToUse: [
      'Paste your Markdown text into the input field.',
      'The tool will instantly strip all Markdown formatting, leaving only the plain text.',
      'Copy the resulting clean text for your use.'
    ],
    faqs: [
      { q: 'Does it remove the content inside Markdown tags?', a: 'No, it only removes the formatting (e.g., #, **, []), preserving the text content.' },
      { q: 'Can it handle complex Markdown?', a: 'Yes, it recursively removes all Markdown formatting regardless of complexity.' }
    ],
    benefits: [
      'Quickly extract plain text from Markdown documents.',
      'Clean up data for analysis or reporting.',
      'Saves time on manual formatting removal.'
    ],
    useCases: [
      'Extracting content from blog posts or articles.',
      'Cleaning up data from Markdown files.',
      'Preparing plain text versions of Markdown documents.'
    ]
  },
  'image-to-text': {
    howToUse: [
      'Upload an image containing text or paste an image URL.',
      'The tool will use OCR (Optical Character Recognition) to extract the text from the image.',
      'Copy the resulting plain text for your use.'
    ],
    faqs: [
      { q: 'How accurate is the OCR?', a: 'The accuracy depends on the quality of the image and the clarity of the text.' },
      { q: 'What image formats are supported?', a: 'We support most common image formats, including JPG, PNG, and GIF.' }
    ],
    benefits: [
      'Quickly extract text from images.',
      'Saves time on manual typing.',
      'Improve the accessibility of your content.'
    ],
    useCases: [
      'Extracting text from screenshots or photos.',
      'Converting printed documents into digital text.',
      'Preparing clean data for professional use.'
    ]
  },
  'pregnancy-due-date-calculator': {
    howToUse: [
      'Enter the first day of your last menstrual period (LMP).',
      'The tool will instantly calculate your estimated due date (EDD).',
      'You can also see your current week of pregnancy and other important milestones.'
    ],
    faqs: [
      { q: 'How is the due date calculated?', a: 'It uses Naegele\'s rule, which adds 280 days (40 weeks) to the first day of your LMP.' },
      { q: 'Is the due date accurate?', a: 'The EDD is an estimate; only about 5% of babies are born on their actual due date.' }
    ],
    benefits: [
      'Quickly calculate your estimated due date.',
      'Track your pregnancy progress and milestones.',
      'Saves time on manual calculation.'
    ],
    useCases: [
      'Calculating a pregnancy due date.',
      'Tracking pregnancy milestones.',
      'Preparing for a new arrival.'
    ]
  },
  'json-to-csv': {
    howToUse: [
      'Paste your JSON data into the input field.',
      'The tool will instantly convert it into a CSV format.',
      'You can choose the delimiter (e.g., comma, semicolon).'
    ],
    faqs: [
      { q: 'Can it handle nested JSON?', a: 'Yes, the tool will attempt to flatten nested JSON objects into CSV columns.' },
      { q: 'Is my data safe?', a: 'Yes, all conversion is done locally in your browser, so your data is never sent to our servers.' }
    ],
    benefits: [
      'Quickly convert JSON data into a more readable format.',
      'Prepare data for use in spreadsheets or databases.',
      'Saves time on manual conversion.'
    ],
    useCases: [
      'Converting a JSON file into a spreadsheet.',
      'Preparing data for a database import.',
      'Formatting text for professional use.'
    ]
  },
  'invisible-text': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly convert it into invisible characters.',
      'Copy the resulting "blank" text for your use.'
    ],
    faqs: [
      { q: 'How does it create invisible text?', a: 'It uses special Unicode characters that are invisible to the naked eye.' },
      { q: 'Can I use invisible text on social media?', a: 'Yes, most social media platforms support invisible text, though some may filter it.' }
    ],
    benefits: [
      'Quickly create unique and creative text effects.',
      'Design creative digital art or posters.',
      'Saves time on manual invisible text creation.'
    ],
    useCases: [
      'Creating unique social media posts.',
      'Designing creative digital art or posters.',
      'Preparing clean data for professional use.'
    ]
  },
  'yt-timestamp-formatter': {
    howToUse: [
      'Paste your YouTube timestamps into the input field.',
      'The tool will instantly format them into a clean and readable list.',
      'You can choose the format (e.g., 0:00 - Title, Title (0:00)).'
    ],
    faqs: [
      { q: 'What timestamp formats are supported?', a: 'We support most common YouTube timestamp formats, including 0:00, 00:00, and 0:00:00.' },
      { q: 'Can I add titles to the timestamps?', a: 'Yes, you can include titles along with the timestamps for better organization.' }
    ],
    benefits: [
      'Quickly format YouTube timestamps for your video descriptions.',
      'Improve the organization of your video content.',
      'Saves time on manual formatting.'
    ],
    useCases: [
      'Formatting timestamps for YouTube video descriptions.',
      'Organizing video content for viewers.',
      'Preparing clean data for professional use.'
    ]
  },
  'fancy-text': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly generate a variety of "fancy" text styles using Unicode characters.',
      'Choose the style you like best and copy it.'
    ],
    faqs: [
      { q: 'How does it create fancy text?', a: 'It uses special Unicode characters that look like stylized letters.' },
      { q: 'Can I use fancy text on social media?', a: 'Yes, most social media platforms support fancy text, though some may filter it.' }
    ],
    benefits: [
      'Quickly create unique and creative text effects.',
      'Design creative digital art or posters.',
      'Saves time on manual fancy text creation.'
    ],
    useCases: [
      'Creating unique social media posts.',
      'Designing creative digital art or posters.',
      'Preparing clean data for professional use.'
    ]
  },
  'braille-translator': {
    howToUse: [
      'Type or paste your text into the input field.',
      'The tool will instantly translate it into Braille characters.',
      'Copy the resulting Braille text for your use.'
    ],
    faqs: [
      { q: 'What is Braille?', a: 'Braille is a tactile writing system used by people who are visually impaired.' },
      { q: 'Can I translate numbers?', a: 'Yes, the tool also supports Braille equivalents for numbers.' }
    ],
    benefits: [
      'Quickly translate text into Braille.',
      'Improve the accessibility of your content.',
      'Saves time on manual translation.'
    ],
    useCases: [
      'Translating text for visually impaired individuals.',
      'Improving the accessibility of your content.',
      'Preparing clean data for professional use.'
    ]
  },
  'text-diff': {
    howToUse: [
      'Paste your original text into the first input field.',
      'Paste your modified text into the second input field.',
      'The tool will instantly highlight the differences between the two texts.'
    ],
    faqs: [
      { q: 'How are differences highlighted?', a: 'Additions are typically highlighted in green, deletions in red, and modifications in yellow.' },
      { q: 'Can it handle large texts?', a: 'Yes, our tool can compare even the largest texts with high accuracy.' }
    ],
    benefits: [
      'Quickly identify changes between two versions of a text.',
      'Debug code or content changes.',
      'Saves time on manual comparison.'
    ],
    useCases: [
      'Comparing two versions of a blog post or article.',
      'Debugging code changes.',
      'Preparing clean data for professional use.'
    ]
  }
};

export const getSEOContent = (toolId: string, toolName: string, primaryKeyword: string, t: Translations, secondaryKeywords: string[] = []) => {
  const details = toolSpecificDetails[toolId] || {};
  const primary = primaryKeyword || toolName.toLowerCase();
  
  const howToUse = details.howToUse || [
    t.tool.defaultHook,
    t.home.useTool,
    t.tool.process,
    t.tool.copy
  ];

  const faqs = details.faqs || [
    { q: t.seo.isFree.replace('{toolName}', toolName), a: t.seo.isFreeAns.replace('{toolName}', toolName) },
    { q: t.seo.isSafe, a: t.seo.isSafeAns },
    { q: t.seo.mobileFriendly.replace('{toolName}', toolName), a: t.seo.mobileFriendlyAns.replace('{toolName}', toolName) },
    { q: t.seo.limitTitle, a: t.seo.limitAns }
  ];

  const benefits = details.benefits || [
    t.home.speedTitle,
    t.home.freeTitle,
    t.home.privacyTitle,
    t.tool.instantResult
  ];

  const useCases = details.useCases || [
    t.blog.recentArticles,
    t.categories.cleaning,
    t.categories.converter,
    t.categories.analysis
  ];

  // Dynamic content based on tool category or ID
  const introText = `${t.legal.aboutSubtitle} ${t.home.heroSubtitle}`;

  const detailedDescription = `${t.directory.whyDesc1} ${t.directory.whyDesc2}`;

  const privacySection = t.home.privacyDesc;

  const technicalInsight = t.directory.whyDesc1;

  const comparisonSection = t.home.whyChooseDesc;

  const privacySectionFull = t.home.privacyDesc;

  return `
    <article class="prose prose-slate max-w-none text-slate-700 leading-relaxed">
      <section class="mb-16">
        <h2 class="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">${t.seo.howToUseStep}: ${toolName}</h2>
        <p class="text-lg mb-6">${introText}</p>
        <p class="mb-6">${detailedDescription}</p>
        <p class="mb-6">${t.home.whyChooseDesc}</p>
      </section>

      <section class="mb-16 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">${t.seo.benefits} - ${toolName}</h2>
        <p class="mb-4">${t.home.whyChooseDesc}</p>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
          ${benefits.map(b => `<li class="flex items-start gap-3"><span class="text-blue-500 mt-1">✓</span> <span>${b}</span></li>`).join('')}
        </ul>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">${t.seo.howToUse} ${toolName} (${t.seo.howToUseStep})</h2>
        <p class="mb-6">${t.tool.defaultHook}</p>
        <div class="space-y-8">
          ${howToUse.map((step, i) => `
            <div class="flex gap-6">
              <div class="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md">${i + 1}</div>
              <div>
                <p class="text-lg font-semibold text-slate-900 mb-1">${t.seo.step} ${i + 1}</p>
                <p>${step}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <p class="mt-8 text-sm text-slate-500 italic">${t.seo.proTip}</p>
      </section>

      <section class="mb-16 bg-slate-900 text-slate-100 p-10 rounded-3xl shadow-xl">
        <h2 class="text-3xl font-bold mb-8 text-white">${t.seo.useCases} - ${toolName}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          ${useCases.map(uc => `
            <div class="border-l-2 border-blue-500 pl-6">
              <p class="text-white font-semibold mb-2">${uc.split(':')[0]}</p>
              <p class="text-slate-400 text-sm">${uc.includes(':') ? uc.split(':')[1] : t.home.whyChooseDesc}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">${t.seo.technicalDeepDive}: ${toolName}</h2>
        <p class="mb-4">${technicalInsight}</p>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-8">${t.seo.faqs}</h2>
        <div class="space-y-8">
          ${faqs.map(faq => `
            <div class="border-b border-slate-200 pb-6">
              <h3 class="text-lg font-bold text-slate-900 mb-3">${faq.q}</h3>
              <p class="text-slate-600">${faq.a}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">${t.seo.comparison}</h2>
        <p class="mb-4">${comparisonSection}</p>
      </section>

      <section class="mb-16">
        <h2 class="text-2xl font-bold text-slate-900 mb-6">${t.seo.privacyMatters}</h2>
        <p class="mb-4">${privacySectionFull}</p>
      </section>

      <section class="text-center bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-3xl text-white shadow-2xl">
        <h2 class="text-3xl font-bold mb-6">${t.seo.experienceTexly}</h2>
        <p class="text-xl mb-8 opacity-90">${t.home.heroSubtitle}</p>
        <div class="flex flex-col md:flex-row items-center justify-center gap-6 font-bold text-blue-200 uppercase tracking-widest text-sm">
          <span>${t.seo.fast}</span>
          <span class="hidden md:block">•</span>
          <span>${t.seo.secure}</span>
          <span class="hidden md:block">•</span>
          <span>${t.seo.free}</span>
        </div>
      </section>
    </article>
  `;
};

export const getJSONLD = (toolName: string, slug: string, keyword: string, t: Translations) => {
  const details = toolSpecificDetails[slug.replace('-online', '').replace('-tool', '')] || {};
  const faqs = details.faqs || [
    { q: t.seo.isFree.replace('{toolName}', toolName), a: t.seo.isFreeAns.replace('{toolName}', toolName) },
    { q: t.seo.isSafe, a: t.seo.isSafeAns }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": t.navbar.home,
        "item": "https://texly.online"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": toolName,
        "item": `https://texly.online/tool/${slug}`
      }
    ]
  };

  return [faqSchema, breadcrumbSchema];
};
