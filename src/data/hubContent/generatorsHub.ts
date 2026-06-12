export interface HubToolContent {
  id: string;
  name: string;
  description: string;
  howToUse: string[];
  faq: { q: string; a: string };
  relatedToolIds?: string[];
}

export const generatorsHubTools: HubToolContent[] = [
  {
    id: "signature-generator",
    name: "Signature Generator",
    description: "Ever needed a quick digital signature for a PDF, an email approval, or just to mock up something official-looking? This thing lets you draw, type, or upload your handwritten scribble, then saves it as a transparent PNG. No pens, no scanners, no printing nonsense. I built this because signing documents digitally usually means exporting from ten different apps or dealing with clunky PDF editors. Here? Just choose your style - mouse, touch, or even your finger on a phone. Pick a font if you want a typed version that looks like cursive, or go freestyle with your actual mouse movements. The output is clean, no watermarks, and you can reuse your saved signature across multiple docs. Yeah, it's that simple.",
    howToUse: [
      "Select input method: draw with mouse/touch, type your name, or upload a photo of your physical signature.",
      "Adjust pen thickness and color if you're drawing to match your usual signing style.",
      "Preview the signature on a virtual document background to see how it'll look.",
      "Click the download button to save as PNG with transparent background.",
      "Optionally copy directly to clipboard for pasting into emails or forms."
    ],
    faq: {
      q: "Is a signature made with this generator legally binding?",
      a: "Not automatically, no. This creates a visual representation of your signature, which can be used for internal approvals, mockups, or informal agreements. For legally binding e-signatures, you'd need a platform with audit trails and verification. Think of this as the visual part - handy for 'sign here' stickers on PDFs or team workflows where formality isn't critical."
    },
    relatedToolIds: ["qr-generator", "fake-user-generator"]
  },
  {
    id: "age-calculator",
    name: "Age Calculator",
    description: "You know those moments - someone asks 'how old will I be on this date next year?' or you need to figure out exactly how many days until a birthday, anniversary, or retirement. Your brain freezes for a second doing the month math. This calculator fixes that instantly. Pop in any birthdate, pick a target date (or leave it as today), and it tells you not just the age in years, but also months remaining until next birthday, total days lived, even a weirdly satisfying 'you're approximately X weeks old' stat. Works for past dates too - like calculating how old someone was when they accomplished something in 1995. No accounts, no data saved, just pure date math that actually accounts for leap years. Try it when you're filling out forms that ask for 'age as of' a specific date. Game changer.",
    howToUse: [
      "Enter the birth date using the date picker or type in DD/MM/YYYY format.",
      "Optionally set a 'as of' date - leave blank to calculate age as of today.",
      "Hit calculate and watch the breakdown appear: years, months, weeks, days.",
      "Check the extra stats like next birthday countdown or total days alive.",
      "Copy any result with one click for pasting into forms or messages."
    ],
    faq: {
      q: "Does the age calculator handle leap years and timezone differences correctly?",
      a: "Yes, it calculates based on UTC to avoid timezone headaches. Leap years are fully accounted for - someone born on February 29th will see their 'official' birthday calculated as March 1st in non-leap years. The tool uses calendar math, not just dividing days by 365, so you get accurate month boundaries too."
    },
    relatedToolIds: ["countdown-timer-generator", "random-choice-generator"]
  },
  {
    id: "qr-generator",
    name: "QR Code Generator",
    description: "Need a QR code for your WiFi password, a business card, a restaurant menu, or just to share a link without typing? This thing spits out high-res, customizable QR codes in seconds. What makes it different from the ten other QR generators out there? No tracking, no analytics crap, no 'sign up to download as SVG'. You type your text, pick a size and error correction level (handy if you're printing small or on a weird surface), add a logo in the center if you want, and boom - download as PNG or vector SVG. I use this whenever I'm setting up a temporary event page or sharing a Google Maps location with friends. The best part? Because it's all client-side, the data never leaves your browser. So if you're generating a QR for something sensitive like a private calendar invite or internal tool link, there's zero risk of some server logging it.",
    howToUse: [
      "Paste or type the content - URL, text, email, phone number, or WiFi credentials.",
      "Choose QR size (small for web, large for print) and error correction level.",
      "Optionally upload a logo to embed in the center of the QR code.",
      "Click generate and preview the code immediately on screen.",
      "Download as PNG for web use or SVG for scaling without quality loss."
    ],
    faq: {
      q: "Can I generate a QR code for WiFi that works on both Android and iPhone?",
      a: "Absolutely. Just format it as 'WIFI:S:YourNetworkName;T:WPA;P:YourPassword;;' and the generator handles the rest. Both operating systems recognize this standard format and will connect automatically when scanned - no need for them to type in passwords manually. Works for WPA, WEP, and open networks."
    },
    relatedToolIds: ["signature-generator", "hash-generator"]
  },
  {
    id: "morse-audio-generator",
    name: "Morse Audio Generator",
    description: "Ever wanted to hear your name in beeps? Or need to learn Morse code without staring at dots and dashes? This converts any text to actual audio - not just visual dots and dashes you have to decode yourself. Type a message, pick the speed (from painfully slow to 'are you a ham radio operator?' fast), choose between classic sine wave beeps or a softer tone, and press play. The generator also shows the visual representation if you're learning, with timing marks so you understand the rhythm. I built the audio part because reading Morse is one skill, but recognizing it by ear is completely different - and way more useful if you're into amateur radio or just want to impress friends with a secret beep language. You can even download the audio as an MP3 file to use as a custom notification sound. Imagine getting a text and your phone beeps your initials in Morse code. Yeah, that's nerdy but fun.",
    howToUse: [
      "Type or paste your text message in the input box (letters, numbers, basic punctuation only).",
      "Adjust the WPM speed - slower for learning, faster for realistic practice.",
      "Select tone frequency (higher pitch cuts through background noise better).",
      "Click play to hear the Morse audio while watching the visual同步.",
      "Download as MP3 file to use offline or set as a notification tone."
    ],
    faq: {
      q: "Can I generate Morse code for numbers and punctuation, or just letters?",
      a: "Yes, full support for numbers 0-9 and common punctuation like periods, commas, question marks, and slashes. The generator follows standard ITU Morse code, so a question mark becomes '..--..' and a period is '.-.-.-'. Just type normally and the tool handles the conversion - no need to learn the codes first."
    },
    relatedToolIds: ["random-choice-generator", "ascii-tree-generator"]
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    description: "If you've ever needed to verify a downloaded file's integrity, store passwords securely (for learning purposes - use proper libraries in production!), or just see what a hash looks like for different algorithms, this thing does it instantly. Type any text, drag in a small file, or paste a chunk of JSON - get outputs for MD5, SHA-1, SHA-256, SHA-512, plus a few others like CRC32 for quick checksums. Why would you need multiple algorithms? Different use cases: MD5 is fast but broken for security (still fine for duplicate detection), SHA-256 is what Git and blockchain use, CRC32 is for error checking in network protocols. The tool shows you hashes side by side so you can compare lengths and patterns. All processing happens locally, so if you're hashing something sensitive like a password or private key, nothing gets transmitted. Good for learning how hashing works too - change one letter and watch how completely different the output becomes. That's the avalanche effect in action.",
    howToUse: [
      "Enter text, upload a file, or paste content directly into the input area.",
      "Select which hash algorithms to generate (MD5, SHA-1, SHA-256, SHA-512, CRC32).",
      "Click generate to compute all selected hashes instantly.",
      "Copy any hash value by clicking on it.",
      "Compare outputs side-by-side to see how different algorithms produce different lengths."
    ],
    faq: {
      q: "Is SHA-256 really safe for password hashing, and can I use this for real user passwords?",
      a: "SHA-256 is secure for integrity checking but NOT recommended for password storage - you need algorithms like bcrypt or Argon2 that are intentionally slow and include salts. This tool is great for learning about hashing, verifying file downloads, or generating checksums. For actual password systems, use a proper authentication library."
    },
    relatedToolIds: ["uuid-generator", "fake-user-generator"]
  },
  {
    id: "uuid-generator",
    name: "UUID Generator",
    description: "Ever needed a unique identifier for a database record, an API request ID, or just a random token that will never collide with another one? Click a button, get a version 4 UUID. That's it. But wait - there's more. You can generate one at a time or batch up to 100 at once (useful for populating test data). You also get versions 1 (timestamp-based, sortable) and 7 (newer time-ordered variant that's better for database indexes). I added version 7 specifically because database people kept complaining that version 4 UUIDs are terrible for B-tree performance - random ordering kills insertion speed at scale. The tool shows you the difference: v4 looks like random gibberish, v1 and v7 have time components you can actually read. Copy as lowercase, uppercase, or even without hyphens for URLs. All generated on your machine, so if you're building something that needs IDs before talking to a server, you're covered. No API keys, no rate limits, just GUIDs on demand.",
    howToUse: [
      "Select UUID version: v4 (random), v1 (timestamp), or v7 (time-ordered).",
      "Choose output format: lowercase, uppercase, or no hyphens.",
      "Set quantity - generate 1 to 100 UUIDs at once.",
      "Click generate and watch IDs appear instantly.",
      "Copy individual UUIDs or copy all as a list for pasting into test data."
    ],
    faq: {
      q: "What's the actual chance of generating a duplicate UUID with version 4?",
      a: "Statistically, you'd need to generate billions per second for about 100 years to hit a 50% chance of one collision. Version 4 uses 122 random bits, so the probability is astronomically low. Version 1 uses timestamp and MAC address, making duplicates possible only if you generate many within the same clock tick. For almost everyone, either version is safe."
    },
    relatedToolIds: ["hash-generator", "fake-user-generator"]
  },
  {
    id: "ascii-tree-generator",
    name: "ASCII Tree Generator",
    description: "Need to visualize a folder structure for documentation? Or map out an org chart in plain text for a README file? Drawing those trees manually with pipes and dashes is mind-numbing - one wrong space and the whole thing breaks. This tool fixes that. Type indented text, paste a directory listing, or write a simple parent-child relationship, and it spits out beautiful ASCII trees. Think 'tree' command output but you control the styling. You can use different branch characters (├─, └─, even box-drawing characters from the old DOS days), decide whether to show empty directories, and sort alphabetically or by depth. I built this originally to document a project's folder structure for GitHub, then realized it's perfect for decision trees, family trees, or even mapping out plot points in a story. The output is copy-paste ready for any monospace environment - terminals, markdown code blocks, text files, you name it. Try feeding it a JSON structure and watch it turn nested data into readable hierarchy.",
    howToUse: [
      "Type or paste your hierarchy using indentation (spaces or tabs) to show nesting levels.",
      "Choose branch style: classic, box-drawing, or minimalist.",
      "Toggle options like show/hide empty folders or alphabetical sorting.",
      "Click generate to instantly see the ASCII tree.",
      "Copy the output directly to clipboard for documentation or README files."
    ],
    faq: {
      q: "Can I generate a tree from an actual directory on my computer?",
      a: "You can paste the output of the 'tree' command from your terminal directly into the tool for restyling, or manually type the structure. Due to browser security restrictions, the tool can't directly read your file system. But you can drag and drop a text file containing a directory listing - that works great."
    },
    relatedToolIds: ["morse-audio-generator", "random-choice-generator"]
  },
  {
    id: "countdown-timer-generator",
    name: "Countdown Timer Generator",
    description: "Need a visual countdown for an event page, a live stream, or just a personal deadline tracker? This creates a embeddable countdown timer - not a video, not a GIF, an actual live-updating timer you can share. Set a target date and time, choose colors and size, and generate HTML/JavaScript embed code or a shareable link. The timer shows days, hours, minutes, and seconds, and handles timezone conversion automatically based on the viewer's browser. I use this for product launches, exam countdowns, even a 'days until vacation' widget on my personal dashboard. Because it's pure browser tech, you can save the generated HTML and host it anywhere - no external dependencies, no tracking scripts phoning home. Want to put it on a digital signage screen? Works. Need it in an email? Most email clients don't run JavaScript, so generate an image snapshot instead. The tool gives you both options. Oh, and it'll optionally play a sound or redirect when zero hits - handy for gym timers or cooking.",
    howToUse: [
      "Pick the target date and time for your countdown using the datetime picker.",
      "Choose display format, colors, and size (small widget or full-page).",
      "Select end behavior: stop at zero, play sound, or redirect to URL.",
      "Generate the embed code or shareable link.",
      "Copy the code into any website that supports JavaScript."
    ],
    faq: {
      q: "Does the countdown show the same remaining time for people in different time zones?",
      a: "Yes - you set the target in a specific timezone (or UTC), and each viewer sees the remaining time based on their own device's clock. The timer calculates absolute milliseconds remaining, so everyone sees the same duration left, just expressed in their local time representation. Perfect for global product launches or international events."
    },
    relatedToolIds: ["age-calculator", "random-choice-generator"]
  },
  {
    id: "random-choice-generator",
    name: "Random Choice Generator",
    description: "Stuck between pizza or burgers? Need to pick a random winner from a list of 500 contest entries? Can't decide which movie to watch tonight? This is your digital coin flip on steroids. Paste a list - each item on a new line or separated by commas - click pick, and it randomly selects one. But that's too simple, right? So I added features: weighted choices (so some options are more likely than others), randomize the order of the whole list (for shuffling playlists or assigning tasks), and pick multiple unique items without replacement (like drawing names from a hat). You can even save lists as presets - like 'weeknight dinners' or 'team meeting icebreakers'. Everything stays in your browser, so you can use it for sensitive stuff like drawing lucky winners without anyone accusing you of rigging it. Show the animation of spinning through options for dramatic effect, or just get the answer instantly. Texly Online made sure this uses a cryptographically strong random generator, not the weak default Math.random() that can be predictable. Because when you're deciding who pays for lunch, that matters.",
    howToUse: [
      "Enter your options - one per line or comma-separated.",
      "Optionally assign weights to make some choices more probable.",
      "Choose how many unique items to pick (1 for single choice, more for multiple).",
      "Click 'pick random' and watch the selector animate or show instant result.",
      "Copy the selected item(s) or reroll as many times as you want."
    ],
    faq: {
      q: "Is the random selection truly random or just pseudo-random?",
      a: "It uses the browser's crypto.getRandomValues() API, which is cryptographically strong and suitable for gambling or drawing winners. That's more random than the standard Math.random() used by most online pickers. The seed comes from actual system-level entropy sources like hardware RNG where available."
    },
    relatedToolIds: ["morse-audio-generator", "ascii-tree-generator", "countdown-timer-generator"]
  },
  {
    id: "fake-user-generator",
    name: "Fake User Generator",
    description: "Testing a form, populating a database, or designing a UI that needs realistic-looking profiles? This spits out complete fake identities - names, emails, addresses, phone numbers, job titles, even avatars that don't belong to real people. Generate one at a time or batch 50 fake users for load testing. Every field is coherent: the email matches the name, the address uses real city/zip patterns for the selected locale (US, UK, India, Germany, France available), the phone number format fits the country. Why not just type 'John Doe' over and over? Because real testing catches edge cases: names with hyphens, international formats, Unicode characters. This tool respects those. You can specify gender distribution, include or exclude certain fields, and export as JSON, CSV, or copy-paste as a table. All data dies when you close the tab - no databases logging who you generated. Perfect for developers building user management systems, designers creating mockups with realistic content instead of lorem ipsum names, or QA folks who need fresh test data every run. Texly Online built this specifically for privacy - every fake user is generated on your device, not fetched from some API that might log your activity.",
    howToUse: [
      "Select locale (country) for realistic name, address, and phone formats.",
      "Choose fields to include: name, email, address, phone, job, avatar, birthday.",
      "Set quantity: 1 to 100 fake users at once.",
      "Click generate and review the preview table.",
      "Export as JSON, CSV, or copy individual user data to clipboard."
    ],
    faq: {
      q: "Can I generate fake but valid email addresses that won't accidentally spam real people?",
      a: "Absolutely - all emails use the @example.com domain (reserved by RFC 2606 specifically for documentation and testing) or you can set a custom domain like @test.local. No real email servers receive these, and they'll never correspond to actual inboxes. The generator also handles plus-addressing and alternate formats for thorough testing."
    },
    relatedToolIds: ["uuid-generator", "hash-generator", "signature-generator"]
  }
];