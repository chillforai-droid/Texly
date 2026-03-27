export type Language = 'en' | 'hi' | 'hn'; // en: English, hi: Hindi, hn: Hinglish

export interface Translations {
  navbar: {
    home: string;
    tools: string;
    blog: string;
    contact: string;
    viewAll: string;
  };
  categories: {
    cleaning: string;
    converter: string;
    analysis: string;
    utility: string;
    cleaningDesc: string;
    converterDesc: string;
    analysisDesc: string;
    utilityDesc: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    browseCategory: string;
    popularTools: string;
    searchResults: string;
    whyChoose: string;
    whyChooseDesc: string;
    freeTitle: string;
    freeDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    speedTitle: string;
    speedDesc: string;
    trendingNow: string;
    tryNow: string;
    popular: string;
    useTool: string;
    freeAndSecure: string;
    featuredVideo: string;
    videoDesc: string;
  };
  tool: {
    backToAll: string;
    loadExample: string;
    clear: string;
    process: string;
    copy: string;
    copied: string;
    result: string;
    input: string;
    relatedTools: string;
    tryAnother: string;
    freeForever: string;
    noSignup: string;
    instantResult: string;
    toolNotFound: string;
    goBackHome: string;
    noTextFound: string;
    ocrError: string;
    defaultHook: string;
    freeOnlineTool: string;
    uploadImage: string;
    changeImage: string;
    clickOrDrag: string;
    imageSupport: string;
    defaultPlaceholder: string;
    processing: string;
  };
  directory: {
    title: string;
    description: string;
    searchPlaceholder: string;
    whyTitle: string;
    whyDesc1: string;
    whyDesc2: string;
    popularTools: string;
  };
  footer: {
    description: string;
    cleaning: string;
    converters: string;
    resources: string;
    connect: string;
    rights: string;
    madeWith: string;
    aboutUs: string;
    contactUs: string;
    privacyPolicy: string;
    termsOfService: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readMore: string;
    recentArticles: string;
    backToBlog: string;
    author: string;
    date: string;
    readTime: string;
    newsletterTitle: string;
    newsletterDesc: string;
    newsletterPlaceholder: string;
    subscribe: string;
  };
  legal: {
    aboutTitle: string;
    aboutSubtitle: string;
    missionTitle: string;
    missionDesc: string;
    fastTitle: string;
    fastDesc: string;
    privacyTitle: string;
    privacyDesc: string;
    storyTitle: string;
    storyDesc: string;
    whyTitle: string;
    whyList: string[];
    thanksTitle: string;
    thanksDesc: string;
    contactTitle: string;
    contactSubtitle: string;
    emailUs: string;
    emailDesc: string;
    otherWays: string;
    otherDesc: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formPlaceholderName: string;
    formPlaceholderEmail: string;
    formPlaceholderMessage: string;
    formSubmit: string;
    formSuccess: string;
    formSuccessDesc: string;
    sendAnother: string;
    privacyPolicyTitle: string;
    termsTitle: string;
    lastUpdated: string;
  };
  seo: {
    howToUse: string;
    faqs: string;
    benefits: string;
    useCases: string;
    technicalDeepDive: string;
    comparison: string;
    privacyMatters: string;
    experienceTexly: string;
    step: string;
    proTip: string;
    free: string;
    secure: string;
    fast: string;
    howToUseStep: string;
    isFree: string;
    isFreeAns: string;
    isSafe: string;
    isSafeAns: string;
    mobileFriendly: string;
    mobileFriendlyAns: string;
    limitTitle: string;
    limitAns: string;
  };
  toolNames: Record<string, string>;
  toolDescriptions: Record<string, string>;
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      tools: 'Tools',
      blog: 'Blog',
      contact: 'Contact',
      viewAll: 'View All 50+ Tools',
    },
    categories: {
      cleaning: 'Text Cleaning',
      converter: 'Text Converters',
      analysis: 'Text Analysis',
      utility: 'Text Utilities',
      cleaningDesc: 'Remove unwanted characters, spaces, and formatting.',
      converterDesc: 'Convert between different text formats and cases.',
      analysisDesc: 'Analyze your text for stats, frequency, and more.',
      utilityDesc: 'Useful tools for everyday text manipulation.',
    },
    home: {
      heroTitle: 'Free Text Tools Online – Clean, Format & Fix Text Instantly',
      heroSubtitle: '50+ free, fast, and secure online text tools. Clean, convert, analyze, and manipulate your text instantly.',
      searchPlaceholder: 'Find your text tool (e.g., word counter, slug generator)...',
      browseCategory: 'Browse by Category',
      popularTools: 'Popular Tools',
      searchResults: 'Search Results',
      whyChoose: 'Why Choose Texly for Your Text Processing Needs?',
      whyChooseDesc: 'Texly is the internet\'s most comprehensive hub for text tools. We provide a fast, free, and privacy-focused solution for all your text manipulation needs.',
      freeTitle: '100% Free & Unlimited',
      freeDesc: 'No hidden costs, no premium tiers. Every single one of our 50+ tools is free to use as much as you want.',
      privacyTitle: 'Privacy First',
      privacyDesc: 'Your data stays with you. All processing happens in your browser, meaning your text is never sent to our servers.',
      speedTitle: 'Blazing Fast',
      speedDesc: 'Built with modern web technologies, our tools work instantly, even with large amounts of text.',
      trendingNow: 'Trending Now',
      tryNow: 'Try Now',
      popular: 'Popular',
      useTool: 'Use Tool',
      freeAndSecure: 'Free & Secure',
      featuredVideo: 'Featured Video',
      videoDesc: 'Watch how Texly helps you process text faster and more efficiently.',
    },
    tool: {
      backToAll: 'Back to all tools',
      loadExample: 'Load Example',
      clear: 'Clear',
      process: 'Process Text',
      copy: 'Copy Result',
      copied: 'Copied!',
      result: 'Result',
      input: 'Your Input',
      relatedTools: 'Try Related Tools',
      tryAnother: 'Try another tool',
      freeForever: 'Free forever',
      noSignup: 'No signup',
      instantResult: 'Instant result',
      toolNotFound: 'Tool not found',
      goBackHome: 'Go back home',
      noTextFound: 'No text found.',
      ocrError: 'Error extracting text. Please try again with a clearer image.',
      defaultHook: 'Paste your messy text below and fix it instantly.',
      freeOnlineTool: 'Free Online Tool',
      uploadImage: 'Upload image',
      changeImage: 'Change Image',
      clickOrDrag: 'Click or Drag Image to Upload',
      imageSupport: 'Supports PNG, JPG, WEBP up to 5MB',
      defaultPlaceholder: 'Paste your text here...',
      processing: 'Processing...',
    },
    directory: {
      title: 'Free Online Text Tools Directory',
      description: 'Explore our comprehensive collection of 50+ free online text tools. Whether you need to clean messy text, convert formats, analyze word counts, or perform complex text manipulations, Texly has the right tool for you. All tools work instantly in your browser with 100% privacy. No signup, no installation, just pure utility.',
      searchPlaceholder: 'Search tools in directory...',
      whyTitle: 'Why Use Our Text Tools?',
      whyDesc1: 'Texly is built for speed and privacy. Every tool in this directory processes your data locally in your browser. This means your sensitive information never leaves your computer. Whether you are a developer cleaning logs, a writer formatting a manuscript, or a student organizing research notes, our tools provide professional-grade utility without the complexity.',
      whyDesc2: 'From Case Converters to Text Cleaners and Word Counters, we\'ve curated the most essential utilities for modern digital workflows. Bookmark this directory to have instant access to 50+ tools whenever you need them.',
      popularTools: 'Most Popular Tools',
    },
    footer: {
      description: 'The ultimate text tools hub. 50+ free online tools for writers, developers, and data enthusiasts.',
      cleaning: 'Cleaning',
      converters: 'Converters',
      resources: 'Resources',
      connect: 'Connect',
      rights: '© 2026 Texly. All rights reserved.',
      madeWith: 'Made with ❤️ for the open web.',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
    blog: {
      title: 'Texly Blog',
      subtitle: 'Expert guides, tips, and insights on text formatting, SEO, and productivity. Learn how to master your content with Texly.',
      readMore: 'Read Full Article',
      recentArticles: 'Recent Articles',
      backToBlog: 'Back to Blog',
      author: 'Author',
      date: 'Date',
      readTime: 'Read Time',
      newsletterTitle: 'Subscribe to our newsletter',
      newsletterDesc: 'Get the latest text tools, formatting tips, and productivity hacks delivered straight to your inbox.',
      newsletterPlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
    },
    legal: {
      aboutTitle: 'About Texly',
      aboutSubtitle: 'Texly is a free online platform dedicated to providing the most comprehensive and easy-to-use text manipulation tools on the web.',
      missionTitle: 'Our Mission',
      missionDesc: 'Our mission is simple: to save you time. Whether you\'re a developer, writer, or student, we believe that text processing shouldn\'t be a chore.',
      fastTitle: 'Fast & Efficient',
      fastDesc: 'All our tools are optimized for speed. Processing happens instantly in your browser.',
      privacyTitle: 'Privacy Focused',
      privacyDesc: 'Your data never leaves your computer. We process everything client-side.',
      storyTitle: 'Our Story',
      storyDesc: 'Texly started as a small side project. Over time, we\'ve expanded our library to over 60 tools.',
      whyTitle: 'Why Use Texly?',
      whyList: [
        '60+ Tools: A massive variety of tools in one place.',
        'No Sign-up Required: Use all our features without ever creating an account.',
        'Clean Interface: No distracting ads or cluttered layouts.',
        'Regular Updates: We\'re constantly adding new tools based on user feedback.'
      ],
      thanksTitle: 'Thank you for using Texly!',
      thanksDesc: 'We hope our tools help you work smarter and faster every day.',
      contactTitle: 'Contact Us',
      contactSubtitle: 'Have a question, feedback, or a tool suggestion? We\'d love to hear from you!',
      emailUs: 'Email Us',
      emailDesc: 'We\'ll get back to you within 24 hours.',
      otherWays: 'Other Ways to Connect',
      otherDesc: 'You can also find us on social media for quick updates.',
      formName: 'Name',
      formEmail: 'Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formPlaceholderName: 'Your Name',
      formPlaceholderEmail: 'your@email.com',
      formPlaceholderMessage: 'How can we help?',
      formSubmit: 'Send Message',
      formSuccess: 'Message Sent!',
      formSuccessDesc: 'Thank you for reaching out. We\'ll be in touch soon.',
      sendAnother: 'Send another message',
      privacyPolicyTitle: 'Privacy Policy',
      termsTitle: 'Terms and Conditions',
      lastUpdated: 'Last updated: March 24, 2026',
    },
    seo: {
      howToUse: 'How to Use',
      faqs: 'Frequently Asked Questions (FAQ)',
      benefits: 'Key Benefits',
      useCases: 'Versatile Use Cases',
      technicalDeepDive: 'Technical Deep Dive',
      comparison: 'Texly vs. The Competition',
      privacyMatters: 'Why Privacy Matters for Your Text',
      experienceTexly: 'Experience the Texly Difference',
      step: 'Step',
      proTip: 'Pro Tip: For the fastest experience, use keyboard shortcuts like Ctrl+A to select all and Ctrl+C to copy your results instantly!',
      free: 'Always Free',
      secure: 'Privacy Guaranteed',
      fast: 'Lightning Fast',
      howToUseStep: 'Step-by-Step Guide',
      isFree: 'Is the {toolName} free to use?',
      isFreeAns: 'Yes, our {toolName} is 100% free and requires no registration or subscription.',
      isSafe: 'Does this tool store my data?',
      isSafeAns: 'No, all processing happens locally in your browser. Your text never leaves your device.',
      mobileFriendly: 'Can I use the {toolName} on mobile?',
      mobileFriendlyAns: 'Absolutely! Our website is fully responsive and works perfectly on all smartphones and tablets.',
      limitTitle: 'Is there a limit to how much text I can process?',
      limitAns: 'There is no hard limit. You can process large amounts of text as long as your browser can handle it.',
    },
    toolNames: {
      'remove-extra-spaces': 'Remove Extra Spaces',
      'remove-line-breaks': 'Remove Line Breaks',
      'remove-duplicate-lines': 'Remove Duplicate Lines',
      'remove-empty-lines': 'Remove Empty Lines',
      'remove-numbers': 'Remove Numbers',
      'remove-special-characters': 'Remove Special Characters',
      'remove-html-tags': 'Remove HTML Tags',
      'upper-case': 'Upper Case',
      'lower-case': 'Lower Case',
      'title-case': 'Title Case',
      'slug-generator': 'Slug Generator',
      'binary-to-text': 'Binary to Text',
      'text-to-binary': 'Text to Binary',
      'word-counter': 'Word Counter',
      'character-counter': 'Character Counter',
      'text-cleaner': 'Text Cleaner',
      'reading-time': 'Reading Time Calculator',
      'text-reverser': 'Text Reverser',
      'text-repeater': 'Text Repeater',
      'lorem-ipsum': 'Lorem Ipsum Generator',
      'find-replace': 'Find and Replace',
      'sort-lines': 'Sort Lines',
      'image-to-text': 'Image to Text Extract',
      'text-steganography': 'Text Steganography',
      'password-gen-strength': 'Password Generator & Strength',
    },
    toolDescriptions: {
      'remove-extra-spaces': 'Remove extra spaces online free. Clean up your text by removing multiple spaces and trimming edges.',
      'remove-line-breaks': 'Remove line breaks online. Instantly remove all line breaks from your text to make it a single line.',
      'remove-duplicate-lines': 'Remove duplicate lines tool. Find and remove all duplicate lines from your list or text.',
      'remove-empty-lines': 'Remove empty lines online. Quickly strip out all blank or empty lines from your text.',
      'word-counter': 'Word counter online free. Count words, characters, and sentences in your text.',
      'image-to-text': 'Extract text from images using OCR online.',
    }
  },
  hi: {
    navbar: {
      home: 'होम',
      tools: 'टूल्स',
      blog: 'ब्लॉग',
      contact: 'संपर्क',
      viewAll: 'सभी 50+ टूल्स देखें',
    },
    categories: {
      cleaning: 'टेक्स्ट क्लीनिंग',
      converter: 'टेक्स्ट कन्वर्टर्स',
      analysis: 'टेक्स्ट एनालिसिस',
      utility: 'टेक्स्ट यूटिलिटीज',
      cleaningDesc: 'अवांछित कैरेक्टर्स, स्पेस और फॉर्मेटिंग हटाएं।',
      converterDesc: 'विभिन्न टेक्स्ट फॉर्मेट और केस के बीच बदलें।',
      analysisDesc: 'आंकड़ों, फ्रीक्वेंसी और बहुत कुछ के लिए अपने टेक्स्ट का विश्लेषण करें।',
      utilityDesc: 'रोजाना टेक्स्ट हेरफेर के लिए उपयोगी टूल्स।',
    },
    home: {
      heroTitle: 'मुफ़्त ऑनलाइन टेक्स्ट टूल्स - टेक्स्ट को तुरंत क्लीन और फॉर्मेट करें',
      heroSubtitle: '50+ मुफ़्त, तेज़ और सुरक्षित ऑनलाइन टेक्स्ट टूल्स। अपने टेक्स्ट को तुरंत क्लीन, कन्वर्ट और एनालाइज करें।',
      searchPlaceholder: 'अपना टेक्स्ट टूल खोजें (जैसे, वर्ड काउंटर, स्लग जनरेटर)...',
      browseCategory: 'कैटेगरी के अनुसार देखें',
      popularTools: 'लोकप्रिय टूल्स',
      searchResults: 'खोज परिणाम',
      whyChoose: 'अपनी टेक्स्ट प्रोसेसिंग जरूरतों के लिए Texly को क्यों चुनें?',
      whyChooseDesc: 'Texly टेक्स्ट टूल्स के लिए इंटरनेट का सबसे व्यापक हब है। हम आपकी सभी टेक्स्ट हेरफेर जरूरतों के लिए तेज़, मुफ़्त और प्राइवेसी-केंद्रित समाधान प्रदान करते हैं।',
      freeTitle: '100% मुफ़्त और अनलिमिटेड',
      freeDesc: 'कोई छिपी हुई लागत नहीं। हमारे सभी 50+ टूल्स जितना चाहें उतना उपयोग करने के लिए मुफ़्त हैं।',
      privacyTitle: 'प्राइवेसी सबसे पहले',
      privacyDesc: 'आपका डेटा आपके पास रहता है। सभी प्रोसेसिंग आपके ब्राउज़र में होती है, जिसका अर्थ है कि आपका टेक्स्ट कभी हमारे सर्वर पर नहीं भेजा जाता।',
      speedTitle: 'बेहद तेज़',
      speedDesc: 'आधुनिक वेब तकनीकों के साथ निर्मित, हमारे टूल्स बड़े टेक्स्ट के साथ भी तुरंत काम करते हैं।',
      trendingNow: 'अभी ट्रेंडिंग',
      tryNow: 'अभी आज़माएं',
      popular: 'लोकप्रिय',
      useTool: 'टूल का उपयोग करें',
      freeAndSecure: 'मुफ्त और सुरक्षित',
      featuredVideo: 'फीचर्ड वीडियो',
      videoDesc: 'देखें कि Texly आपको टेक्स्ट को तेज़ी से और कुशलता से प्रोसेस करने में कैसे मदद करता है।',
    },
    tool: {
      backToAll: 'सभी टूल्स पर वापस जाएं',
      loadExample: 'उदाहरण लोड करें',
      clear: 'साफ करें',
      process: 'टेक्स्ट प्रोसेस करें',
      copy: 'रिजल्ट कॉपी करें',
      copied: 'कॉपी हो गया!',
      result: 'परिणाम',
      input: 'आपका इनपुट',
      relatedTools: 'मिलते-जुलते टूल्स आज़माएं',
      tryAnother: 'दूसरा टूल आज़माएं',
      freeForever: 'हमेशा के लिए मुफ़्त',
      noSignup: 'कोई साइनअप नहीं',
      instantResult: 'तुरंत परिणाम',
      toolNotFound: 'टूल नहीं मिला',
      goBackHome: 'होम पेज पर वापस जाएं',
      noTextFound: 'कोई टेक्स्ट नहीं मिला।',
      ocrError: 'टेक्स्ट निकालने में त्रुटि। कृपया स्पष्ट छवि के साथ पुनः प्रयास करें।',
      defaultHook: 'नीचे अपना टेक्स्ट पेस्ट करें और इसे तुरंत ठीक करें।',
      freeOnlineTool: 'मुफ्त ऑनलाइन टूल',
      uploadImage: 'छवि अपलोड करें',
      changeImage: 'छवि बदलें',
      clickOrDrag: 'अपलोड करने के लिए छवि पर क्लिक करें या खींचें',
      imageSupport: 'PNG, JPG, WEBP 5MB तक सपोर्ट करता है',
      defaultPlaceholder: 'अपना टेक्स्ट यहाँ पेस्ट करें...',
      processing: 'प्रोसेसिंग...',
    },
    directory: {
      title: 'मुफ़्त ऑनलाइन टेक्स्ट टूल्स डायरेक्टरी',
      description: 'हमारे 50+ मुफ़्त ऑनलाइन टेक्स्ट टूल्स के व्यापक संग्रह को एक्सप्लोर करें। चाहे आपको टेक्स्ट क्लीन करना हो, फॉर्मेट बदलना हो, या वर्ड काउंट करना हो, Texly के पास आपके लिए सही टूल है। सभी टूल्स आपके ब्राउज़र में तुरंत काम करते हैं। कोई साइनअप नहीं, कोई इंस्टॉलेशन नहीं।',
      searchPlaceholder: 'डायरेक्टरी में टूल्स खोजें...',
      whyTitle: 'हमारे टेक्स्ट टूल्स का उपयोग क्यों करें?',
      whyDesc1: 'Texly को गति और प्राइवेसी के लिए बनाया गया है। इस डायरेक्टरी का हर टूल आपके डेटा को आपके ब्राउज़र में स्थानीय रूप से प्रोसेस करता है। इसका मतलब है कि आपकी संवेदनशील जानकारी कभी आपके कंप्यूटर से बाहर नहीं जाती है।',
      whyDesc2: 'केस कन्वर्टर्स से लेकर टेक्स्ट क्लीनर्स और वर्ड काउंटर्स तक, हमने आधुनिक डिजिटल वर्कफ़्लो के लिए सबसे आवश्यक यूटिलिटीज को चुना है। जब भी आपको उनकी आवश्यकता हो, 50+ टूल्स तक तुरंत पहुंच के लिए इस डायरेक्टरी को बुकमार्क करें।',
      popularTools: 'सबसे लोकप्रिय टूल्स',
    },
    footer: {
      description: 'अंतिम टेक्स्ट टूल्स हब। लेखकों, डेवलपर्स और डेटा उत्साही लोगों के लिए 50+ मुफ़्त ऑनलाइन टूल्स।',
      cleaning: 'क्लीनिंग',
      converters: 'कन्वर्टर्स',
      resources: 'संसाधन',
      connect: 'जुड़ें',
      rights: '© 2026 Texly. सर्वाधिकार सुरक्षित।',
      madeWith: 'ओपन वेब के लिए ❤️ के साथ बनाया गया।',
      aboutUs: 'हमारे बारे में',
      contactUs: 'संपर्क करें',
      privacyPolicy: 'प्राइवेसी पॉलिसी',
      termsOfService: 'सेवा की शर्तें',
    },
    blog: {
      title: 'Texly ब्लॉग',
      subtitle: 'टेक्स्ट फॉर्मेटिंग, SEO और प्रोडक्टिविटी पर एक्सपर्ट गाइड, टिप्स और अंतर्दृष्टि। Texly के साथ अपने कंटेंट में महारत हासिल करना सीखें।',
      readMore: 'पूरा लेख पढ़ें',
      recentArticles: 'हाल के लेख',
      backToBlog: 'ब्लॉग पर वापस जाएं',
      author: 'लेखक',
      date: 'तारीख',
      readTime: 'पढ़ने का समय',
      newsletterTitle: 'हमारे न्यूज़लेटर को सब्सक्राइब करें',
      newsletterDesc: 'सीधे अपने इनबॉक्स में नवीनतम टेक्स्ट टूल्स, फॉर्मेटिंग टिप्स और उत्पादकता हैक्स प्राप्त करें।',
      newsletterPlaceholder: 'अपना ईमेल दर्ज करें',
      subscribe: 'सब्सक्राइब करें',
    },
    legal: {
      aboutTitle: 'Texly के बारे में',
      aboutSubtitle: 'Texly एक मुफ्त ऑनलाइन प्लेटफॉर्म है जो वेब पर सबसे व्यापक और उपयोग में आसान टेक्स्ट हेरफेर टूल प्रदान करने के लिए समर्पित है।',
      missionTitle: 'हमारा मिशन',
      missionDesc: 'हमारा मिशन सरल है: आपका समय बचाना। चाहे आप एक डेवलपर हों या छात्र, हमारा मानना ​​है कि टेक्स्ट प्रोसेसिंग कोई कठिन काम नहीं होना चाहिए।',
      fastTitle: 'तेज और कुशल',
      fastDesc: 'हमारे सभी टूल गति के लिए अनुकूलित हैं। प्रोसेसिंग आपके ब्राउज़र में तुरंत होती है।',
      privacyTitle: 'गोपनीयता केंद्रित',
      privacyDesc: 'आपका डेटा आपके कंप्यूटर से कभी बाहर नहीं जाता है। हम सब कुछ क्लाइंट-साइड प्रोसेस करते हैं।',
      storyTitle: 'हमारी कहानी',
      storyDesc: 'Texly एक छोटे साइड प्रोजेक्ट के रूप में शुरू हुआ था। समय के साथ, हमने अपने पुस्तकालय को 60 से अधिक टूल तक बढ़ा दिया है।',
      whyTitle: 'Texly का उपयोग क्यों करें?',
      whyList: [
        '60+ टूल: एक ही स्थान पर टूल की एक विशाल विविधता।',
        'कोई साइन-अप आवश्यक नहीं: बिना खाता बनाए सभी सुविधाओं का उपयोग करें।',
        'स्वच्छ इंटरफ़ेस: कोई विचलित करने वाले विज्ञापन नहीं।',
        'नियमित अपडेट: हम लगातार नए टूल जोड़ रहे हैं।'
      ],
      thanksTitle: 'Texly का उपयोग करने के लिए धन्यवाद!',
      thanksDesc: 'हमें उम्मीद है कि हमारे टूल आपको हर दिन स्मार्ट और तेज़ी से काम करने में मदद करेंगे।',
      contactTitle: 'हमसे संपर्क करें',
      contactSubtitle: 'कोई प्रश्न, प्रतिक्रिया या टूल सुझाव है? हमें आपसे सुनना अच्छा लगेगा!',
      emailUs: 'हमें ईमेल करें',
      emailDesc: 'हम 24 घंटे के भीतर आपसे संपर्क करेंगे।',
      otherWays: 'जुड़ने के अन्य तरीके',
      otherDesc: 'त्वरित अपडेट के लिए आप हमें सोशल मीडिया पर भी पा सकते हैं।',
      formName: 'नाम',
      formEmail: 'ईमेल',
      formSubject: 'विषय',
      formMessage: 'संदेश',
      formPlaceholderName: 'आपका नाम',
      formPlaceholderEmail: 'aapka@email.com',
      formPlaceholderMessage: 'हम आपकी कैसे मदद कर सकते हैं?',
      formSubmit: 'संदेश भेजें',
      formSuccess: 'संदेश भेज दिया गया!',
      formSuccessDesc: 'संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।',
      sendAnother: 'एक और संदेश भेजें',
      privacyPolicyTitle: 'गोपनीयता नीति',
      termsTitle: 'नियम और शर्तें',
      lastUpdated: 'अंतिम अपडेट: 24 मार्च, 2026',
    },
    seo: {
      howToUse: 'उपयोग कैसे करें',
      faqs: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      benefits: 'मुख्य लाभ',
      useCases: 'उपयोग के विभिन्न मामले',
      technicalDeepDive: 'तकनीकी जानकारी',
      comparison: 'Texly बनाम अन्य',
      privacyMatters: 'आपके टेक्स्ट के लिए प्राइवेसी क्यों महत्वपूर्ण है',
      experienceTexly: 'Texly के अंतर का अनुभव करें',
      step: 'चरण',
      proTip: 'प्रो टिप: सबसे तेज़ अनुभव के लिए, सभी को चुनने के लिए Ctrl+A और अपने परिणामों को तुरंत कॉपी करने के लिए Ctrl+C जैसे कीबोर्ड शॉर्टकट का उपयोग करें!',
      free: 'हमेशा मुफ़्त',
      secure: 'प्राइवेसी की गारंटी',
      fast: 'बिजली की तरह तेज़',
      howToUseStep: 'स्टेप-बाय-स्टेप गाइड',
      isFree: 'क्या {toolName} उपयोग करने के लिए मुफ़्त है?',
      isFreeAns: 'हाँ, हमारा {toolName} 100% मुफ़्त है और इसके लिए किसी पंजीकरण या सदस्यता की आवश्यकता नहीं है।',
      isSafe: 'क्या यह टूल मेरा डेटा स्टोर करता है?',
      isSafeAns: 'नहीं, सभी प्रोसेसिंग आपके ब्राउज़र में स्थानीय रूप से होती है। आपका टेक्स्ट कभी आपके डिवाइस से बाहर नहीं जाता है।',
      mobileFriendly: 'क्या मैं मोबाइल पर {toolName} का उपयोग कर सकता हूँ?',
      mobileFriendlyAns: 'बिल्कुल! हमारी वेबसाइट पूरी तरह से रिस्पॉन्सिव है और सभी स्मार्टफोन और टैबलेट पर पूरी तरह से काम करती है।',
      limitTitle: 'क्या मैं कितना टेक्स्ट प्रोसेस कर सकता हूँ इसकी कोई सीमा है?',
      limitAns: 'कोई सख्त सीमा नहीं है। आप तब तक बड़ी मात्रा में टेक्स्ट प्रोसेस कर सकते हैं जब तक आपका ब्राउज़र इसे संभाल सकता है।',
    },
    toolNames: {
      'remove-extra-spaces': 'अतिरिक्त स्पेस हटाएं',
      'remove-line-breaks': 'लाइन ब्रेक हटाएं',
      'remove-duplicate-lines': 'डुप्लीकेट लाइनें हटाएं',
      'remove-empty-lines': 'खाली लाइनें हटाएं',
      'remove-numbers': 'नंबर हटाएं',
      'remove-special-characters': 'विशेष कैरेक्टर हटाएं',
      'remove-html-tags': 'HTML टैग हटाएं',
      'upper-case': 'अपर केस',
      'lower-case': 'लोअर केस',
      'title-case': 'टाइटल केस',
      'slug-generator': 'स्लग जनरेटर',
      'binary-to-text': 'बाइनरी से टेक्स्ट',
      'text-to-binary': 'टेक्स्ट से बाइनरी',
      'word-counter': 'वर्ड काउंटर',
      'character-counter': 'कैरेक्टर काउंटर',
      'text-cleaner': 'टेक्स्ट क्लीनर',
      'reading-time': 'रीडिंग टाइम कैलकुलेटर',
      'text-reverser': 'टेक्स्ट रिवर्सर',
      'text-repeater': 'टेक्स्ट रिपीटर',
      'lorem-ipsum': 'लोरेम इप्सम जनरेटर',
      'find-replace': 'खोजें और बदलें',
      'sort-lines': 'लाइनों को सॉर्ट करें',
      'image-to-text': 'इमेज से टेक्स्ट निकालें',
      'text-steganography': 'टेक्स्ट स्टेग्नोग्राफी',
      'password-gen-strength': 'पासवर्ड जनरेटर और स्ट्रेंथ',
    },
    toolDescriptions: {
      'remove-extra-spaces': 'मुफ्त में ऑनलाइन अतिरिक्त स्पेस हटाएं। कई स्पेस हटाकर और किनारों को ट्रिम करके अपने टेक्स्ट को साफ करें।',
      'remove-line-breaks': 'ऑनलाइन लाइन ब्रेक हटाएं। टेक्स्ट को एक लाइन बनाने के लिए तुरंत सभी लाइन ब्रेक हटा दें।',
      'remove-duplicate-lines': 'डुप्लीकेट लाइनें हटाने का टूल। अपनी सूची या टेक्स्ट से सभी डुप्लीकेट लाइनें खोजें और हटाएं।',
      'remove-empty-lines': 'ऑनलाइन खाली लाइनें हटाएं। अपने टेक्स्ट से सभी खाली लाइनों को तुरंत हटा दें।',
      'word-counter': 'मुफ्त ऑनलाइन वर्ड काउंटर। अपने टेक्स्ट में शब्दों, कैरेक्टर्स और वाक्यों को गिनें।',
      'image-to-text': 'ऑनलाइन OCR का उपयोग करके छवियों से टेक्स्ट निकालें।',
    }
  },
  hn: {
    navbar: {
      home: 'Home',
      tools: 'Tools',
      blog: 'Blog',
      contact: 'Contact',
      viewAll: 'Saare 50+ Tools Dekhein',
    },
    categories: {
      cleaning: 'Text Cleaning',
      converter: 'Text Converters',
      analysis: 'Text Analysis',
      utility: 'Text Utilities',
      cleaningDesc: 'Unwanted characters, spaces, aur formatting hatayein.',
      converterDesc: 'Different text formats aur cases mein badlein.',
      analysisDesc: 'Stats aur frequency ke liye text analyze karein.',
      utilityDesc: 'Daily text manipulation ke liye useful tools.',
    },
    home: {
      heroTitle: 'Free Text Tools Online – Text ko turant Clean aur Format karein',
      heroSubtitle: '50+ free, fast, aur secure online text tools. Apne text ko instantly clean, convert, aur analyze karein.',
      searchPlaceholder: 'Apna text tool dhundhein (jaise, word counter, slug generator)...',
      browseCategory: 'Category ke hisab se dekhein',
      popularTools: 'Popular Tools',
      searchResults: 'Search Results',
      whyChoose: 'Texly ko kyu chunein?',
      whyChooseDesc: 'Texly text tools ke liye sabse best platform hai. Hum fast, free, aur privacy-focused tools dete hain.',
      freeTitle: '100% Free & Unlimited',
      freeDesc: 'Koi hidden charges nahi. Saare tools bilkul free hain.',
      privacyTitle: 'Privacy Sabse Pehle',
      privacyDesc: 'Aapka data aapke paas hi rehta hai. Processing browser mein hoti hai, server pe nahi.',
      speedTitle: 'Super Fast',
      speedDesc: 'Modern tech se bana, hamare tools bade text pe bhi turant kaam karte hain.',
      trendingNow: 'Trending Now',
      tryNow: 'Try Now',
      popular: 'Popular',
      useTool: 'Use Tool',
      freeAndSecure: 'Free & Secure',
      featuredVideo: 'Featured Video',
      videoDesc: 'Dekhein kaise Texly aapki madad karta hai text ko fast aur efficiently process karne mein.',
    },
    tool: {
      backToAll: 'Saare tools pe wapas jayein',
      loadExample: 'Example Load Karein',
      clear: 'Clear',
      process: 'Text Process Karein',
      copy: 'Copy Result',
      copied: 'Copy ho gaya!',
      result: 'Result',
      input: 'Aapka Input',
      relatedTools: 'Related Tools Try Karein',
      tryAnother: 'Dusra tool try karein',
      freeForever: 'Hamesha free',
      noSignup: 'No signup',
      instantResult: 'Turant result',
      toolNotFound: 'Tool nahi mila',
      goBackHome: 'Home page par wapas jayein',
      noTextFound: 'Koi text nahi mila.',
      ocrError: 'Text nikalne mein error. Please clear image ke saath try karein.',
      defaultHook: 'Apna text niche paste karein aur instantly fix karein.',
      freeOnlineTool: 'Free Online Tool',
      uploadImage: 'Image upload karein',
      changeImage: 'Image badlein',
      clickOrDrag: 'Upload karne ke liye image click ya drag karein',
      imageSupport: 'PNG, JPG, WEBP 5MB tak support karta hai',
      defaultPlaceholder: 'Apna text yahan paste karein...',
      processing: 'Processing...',
    },
    directory: {
      title: 'Free Online Text Tools Directory',
      description: 'Hamare 50+ free online text tools ka collection dekhein. Text clean karna ho, format badalna ho, ya word count karna ho, Texly pe sab milega. Saare tools browser mein instantly kaam karte hain, 100% privacy ke saath.',
      searchPlaceholder: 'Directory mein tools search karein...',
      whyTitle: 'Hamare Text Tools kyu use karein?',
      whyDesc1: 'Texly speed aur privacy ke liye bana hai. Saare tools aapke browser mein hi kaam karte hain, data server pe nahi jata. Aapka sensitive data safe rehta hai.',
      whyDesc2: 'Case Converters se lekar Text Cleaners aur Word Counters tak, humne sabse important tools ek jagah kar diye hain. Inhe bookmark karein aur jab chahe use karein.',
      popularTools: 'Most Popular Tools',
    },
    footer: {
      description: 'The ultimate text tools hub. Writers, developers, aur data enthusiasts ke liye 50+ free online tools.',
      cleaning: 'Cleaning',
      converters: 'Converters',
      resources: 'Resources',
      connect: 'Connect',
      rights: '© 2026 Texly. All rights reserved.',
      madeWith: 'Open web ke liye ❤️ ke saath banaya gaya.',
      aboutUs: 'About Us',
      contactUs: 'Contact Us',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
    },
    blog: {
      title: 'Texly Blog',
      subtitle: 'Text formatting, SEO aur productivity pe expert guides, tips aur insights. Texly ke saath apna content master karein.',
      readMore: 'Pura Article Padhein',
      recentArticles: 'Recent Articles',
      backToBlog: 'Blog pe wapas jayein',
      author: 'Author',
      date: 'Date',
      readTime: 'Read Time',
      newsletterTitle: 'Newsletter subscribe karein',
      newsletterDesc: 'Latest tools aur tips apne inbox mein paayein.',
      newsletterPlaceholder: 'Email dalein',
      subscribe: 'Subscribe',
    },
    legal: {
      aboutTitle: 'Texly ke baare mein',
      aboutSubtitle: 'Texly ek free online platform hai jo text manipulation tools provide karta hai.',
      missionTitle: 'Humaara Mission',
      missionDesc: 'Humaara mission simple hai: aapka time bachana. Chahe aap developer ho ya student, text processing mushkil nahi honi chahiye.',
      fastTitle: 'Fast aur Efficient',
      fastDesc: 'Saare tools speed ke liye optimized hain. Processing browser mein instantly hoti hai.',
      privacyTitle: 'Privacy Focused',
      privacyDesc: 'Aapka data aapke computer se bahar nahi jata. Sab kuch client-side process hota hai.',
      storyTitle: 'Humaari Kahani',
      storyDesc: 'Texly ek chote side project se shuru hua tha. Aaj humaare paas 60+ tools hain.',
      whyTitle: 'Texly kyun use karein?',
      whyList: [
        '60+ Tools: Ek hi jagah par kaafi variety.',
        'No Sign-up: Bina account banaye use karein.',
        'Clean Interface: No ads, no clutter.',
        'Regular Updates: Naye tools add hote rehte hain.'
      ],
      thanksTitle: 'Texly use karne ke liye dhanyawad!',
      thanksDesc: 'Hum umeed karte hain ki humaare tools aapki madad karenge.',
      contactTitle: 'Humse Contact Karein',
      contactSubtitle: 'Koi sawal ya feedback hai? Humse baat karein!',
      emailUs: 'Humein Email Karein',
      emailDesc: 'Hum 24 ghante mein reply karenge.',
      otherWays: 'Connect karne ke aur tareeke',
      otherDesc: 'Humein social media par follow karein.',
      formName: 'Naam',
      formEmail: 'Email',
      formSubject: 'Subject',
      formMessage: 'Message',
      formPlaceholderName: 'Aapka Naam',
      formPlaceholderEmail: 'aapka@email.com',
      formPlaceholderMessage: 'Hum aapki kaise madad kar sakte hain?',
      formSubmit: 'Message Bhejein',
      formSuccess: 'Message Bhej Diya Gaya!',
      formSuccessDesc: 'Humse contact karne ke liye dhanyawad. Hum jald hi aapse baat karenge.',
      sendAnother: 'Ek aur message bhejein',
      privacyPolicyTitle: 'Privacy Policy',
      termsTitle: 'Terms and Conditions',
      lastUpdated: 'Last updated: 24 March, 2026',
    },
    seo: {
      howToUse: 'Kaise Use Karein',
      faqs: 'Frequently Asked Questions (FAQ)',
      benefits: 'Key Benefits',
      useCases: 'Use Cases',
      technicalDeepDive: 'Technical Deep Dive',
      comparison: 'Texly vs. Others',
      privacyMatters: 'Privacy kyu important hai',
      experienceTexly: 'Texly ka difference dekhein',
      step: 'Step',
      proTip: 'Pro Tip: Fast experience ke liye, Ctrl+A se select aur Ctrl+C se copy karein!',
      free: 'Hamesha Free',
      secure: 'Privacy Guaranteed',
      fast: 'Lightning Fast',
      howToUseStep: 'Step-by-Step Guide',
      isFree: 'Kya {toolName} free hai?',
      isFreeAns: 'Haan, humaara {toolName} 100% free hai aur koi signup nahi chahiye.',
      isSafe: 'Kya ye tool mera data store karta hai?',
      isSafeAns: 'Nahi, sab kuch aapke browser mein hota hai. Data safe hai.',
      mobileFriendly: 'Kya main mobile pe {toolName} use kar sakta hoon?',
      mobileFriendlyAns: 'Haan! Humaari website mobile aur tablet pe perfect chalti hai.',
      limitTitle: 'Kya text processing ki koi limit hai?',
      limitAns: 'Koi hard limit nahi hai. Aap jitna chahe text process kar sakte hain.',
    },
    toolNames: {
      'remove-extra-spaces': 'Extra Spaces Hatayein',
      'remove-line-breaks': 'Line Breaks Hatayein',
      'remove-duplicate-lines': 'Duplicate Lines Hatayein',
      'remove-empty-lines': 'Empty Lines Hatayein',
      'remove-numbers': 'Numbers Hatayein',
      'remove-special-characters': 'Special Characters Hatayein',
      'remove-html-tags': 'HTML Tags Hatayein',
      'upper-case': 'Upper Case',
      'lower-case': 'Lower Case',
      'title-case': 'Title Case',
      'slug-generator': 'Slug Generator',
      'binary-to-text': 'Binary to Text',
      'text-to-binary': 'Text to Binary',
      'word-counter': 'Word Counter',
      'character-counter': 'Character Counter',
      'text-cleaner': 'Text Cleaner',
      'reading-time': 'Reading Time Calculator',
      'text-reverser': 'Text Reverser',
      'text-repeater': 'Text Repeater',
      'lorem-ipsum': 'Lorem Ipsum Generator',
      'find-replace': 'Find and Replace',
      'sort-lines': 'Sort Lines',
      'image-to-text': 'Image se Text Nikalein',
      'text-steganography': 'Text Steganography',
      'password-gen-strength': 'Password Generator & Strength',
    },
    toolDescriptions: {
      'remove-extra-spaces': 'Free online extra spaces hatayein. Text ko clean karein multiple spaces hata kar.',
      'remove-line-breaks': 'Online line breaks hatayein. Text ko single line mein badlein.',
      'remove-duplicate-lines': 'Duplicate lines hatane ka tool. Apni list se repeated lines hatayein.',
      'remove-empty-lines': 'Online empty lines hatayein. Text se blank lines turant hatayein.',
      'word-counter': 'Free online word counter. Words, characters, aur sentences ginein.',
      'image-to-text': 'OCR use karke images se text nikalein.',
    }
  },
};
