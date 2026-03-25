export type Language = 'en' | 'hi' | 'hn'; // en: English, hi: Hindi, hn: Hinglish

export interface Translations {
  navbar: {
    home: string;
    tools: string;
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
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    navbar: {
      home: 'Home',
      tools: 'Tools',
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
    },
  },
  hi: {
    navbar: {
      home: 'होम',
      tools: 'टूल्स',
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
    },
  },
  hn: {
    navbar: {
      home: 'Home',
      tools: 'Tools',
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
    },
  },
};
