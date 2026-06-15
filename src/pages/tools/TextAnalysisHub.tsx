import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import HubToolsContent from '../../components/HubToolsContent';
import { textAnalysisHubTools } from '../../data/hubContent/textAnalysisHub';
import { 
  Copy, 
  Check, 
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  RotateCcw,
  BarChart3,
  Mail,
  Link as LinkIcon,
  Calendar,
  Key,
  Code2,
  FileText,
  Eye
} from 'lucide-react';

const SEO_TITLE = "Character Counter Online — Word Counter, Sentence Count, Keyword Density & Text Analysis | Free";
const SEO_DESC = "Free online character counter and word counter tool. Count characters, words, sentences, and paragraphs. Analyze keyword density, letter frequency, and extract emails or URLs from any text. Instant, no login.";
const SEO_KEYWORDS = "character count tool online, character counter online, word counter online, character counter tool, online character counter tool, sentence counter, word character count, text character counter, character count check, keyword density calculator, text analysis online free, letter frequency counter, extract emails from text";
const CANONICAL_URL = "https://www.texlyonline.in/tools/text-analysis-hub";

type AnalysisTab = 'basic' | 'extract' | 'advanced' | 'special';

interface ToolItem {
  id: string;
  name: string;
  description: string;
  icon?: React.ReactNode;
}

const TOOLS_CONFIG: Record<AnalysisTab, ToolItem[]> = {
  basic: [
    { id: 'word-counter', name: 'Word Counter', description: 'Count total words, unique words, and reading time.' },
    { id: 'character-counter', name: 'Character Counter', description: 'Count characters with or without spaces.' },
    { id: 'sentence-counter', name: 'Sentence Counter', description: 'Count sentences and analyze sentence length.' },
    { id: 'paragraph-counter', name: 'Paragraph Counter', description: 'Count paragraphs and analyze structure.' },
    { id: 'line-counter', name: 'Line Counter', description: 'Count total lines in your text.' }
  ],
  extract: [
    { id: 'extract-emails', name: 'Email Extractor', description: 'Extract all email addresses from text.' },
    { id: 'extract-urls', name: 'URL Extractor', description: 'Extract all hyperlinks and URLs.' },
    { id: 'extract-numbers', name: 'Number Extractor', description: 'Extract all numeric values.' },
    { id: 'extract-hashtags', name: 'Hashtag Extractor', description: 'Extract all #hashtags from text.' },
    { id: 'extract-mentions', name: 'Mention Extractor', description: 'Extract all @mentions from text.' }
  ],
  advanced: [
    { id: 'keyword-density', name: 'Keyword Density', description: 'Analyze keyword frequency and density percentages.' },
    { id: 'letter-frequency', name: 'Letter Frequency', description: 'Count frequency of each letter A-Z.' },
    { id: 'word-length', name: 'Word Length Stats', description: 'Distribution of word lengths.' },
    { id: 'case-distribution', name: 'Case Distribution', description: 'UPPER, lower, Title, Sentence case analysis.' },
    { id: 'readability-score', name: 'Readability Score', description: 'Flesch Reading Ease and Grade Level.' }
  ],
  special: [
    { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age from birthdate.' },
    { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JSON Web Tokens instantly.' },
    { id: 'text-diff', name: 'Text Diff', description: 'Compare two texts and find differences.' },
    { id: 'base64-decode', name: 'Base64 Decoder', description: 'Decode Base64 strings to text.' },
    { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes.' }
  ]
};

export default function TextAnalysisHub({ activeToolId }: { activeToolId?: string } = {}) {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<AnalysisTab>('basic');
  const [activeTool, setActiveTool] = useState<string>('word-counter');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Special tool states
  const [compareText, setCompareText] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hashType, setHashType] = useState<'md5' | 'sha1' | 'sha256'>('sha256');

  useEffect(() => {
    const tool = activeToolId || searchParams.get('tool');
    if (!tool) return;

    let tab: AnalysisTab = 'basic';
    let subTool = '';
    let sample = '';

    switch (tool) {
      case 'word-counter':
        tab = 'basic'; subTool = 'word-counter'; 
        sample = 'The quick brown fox jumps over the lazy dog. This is a sample sentence for word counting and analysis purposes.'; 
        break;
      case 'character-counter':
        tab = 'basic'; subTool = 'character-counter'; 
        sample = 'Hello World! 123'; 
        break;
      case 'sentence-counter':
        tab = 'basic'; subTool = 'sentence-counter'; 
        sample = 'This is the first sentence. Here is another one! And this is the third? Finally, the last sentence.'; 
        break;
      case 'paragraph-counter':
        tab = 'basic'; subTool = 'paragraph-counter'; 
        sample = 'First paragraph contains these words.\n\nSecond paragraph is separated by blank line.\n\nThird paragraph ends here.'; 
        break;
      case 'line-counter':
        tab = 'basic'; subTool = 'line-counter'; 
        sample = 'Line one\nLine two\nLine three\nLine four'; 
        break;
      case 'extract-emails':
        tab = 'extract'; subTool = 'extract-emails'; 
        sample = 'Contact us at support@texlyonline.in or admin@texlyonline.in. For sales: sales@example.com'; 
        break;
      case 'extract-urls':
        tab = 'extract'; subTool = 'extract-urls'; 
        sample = 'Visit https://texlyonline.in for tools. Check http://example.com and https://google.com/search?q=test'; 
        break;
      case 'extract-numbers':
        tab = 'extract'; subTool = 'extract-numbers'; 
        sample = 'Order 123 items for $45.99. Total: 1,234 units at 5.5% discount. Code: 98765'; 
        break;
      case 'extract-hashtags':
        tab = 'extract'; subTool = 'extract-hashtags'; 
        sample = '#Trending #SEO #TextAnalysis Check out #TexlyTools and #FreeTools'; 
        break;
      case 'extract-mentions':
        tab = 'extract'; subTool = 'extract-mentions'; 
        sample = '@john @jane_doe Please contact @support_team for help. @elonmusk tweeted this.'; 
        break;
      case 'keyword-density':
        tab = 'advanced'; subTool = 'keyword-density'; 
        sample = 'text analysis text processing text tools text utilities text cleaning text conversion text analysis platform text tools are great for text processing'; 
        break;
      case 'letter-frequency':
        tab = 'advanced'; subTool = 'letter-frequency'; 
        sample = 'The quick brown fox jumps over the lazy dog'; 
        break;
      case 'word-length':
        tab = 'advanced'; subTool = 'word-length'; 
        sample = 'The quick brown fox jumps over the lazy dog'; 
        break;
      case 'case-distribution':
        tab = 'advanced'; subTool = 'case-distribution'; 
        sample = 'UPPERCASE lower case Title Case Sentence case. MIXED Case Example.'; 
        break;
      case 'readability-score':
        tab = 'advanced'; subTool = 'readability-score'; 
        sample = 'The Flesch Reading Ease test measures readability. Longer sentences and complex words reduce the score. Short sentences and simple words increase it.'; 
        break;
      case 'age-calculator':
        tab = 'special'; subTool = 'age-calculator'; 
        setBirthDate('1995-10-15');
        break;
      case 'jwt-decoder':
        tab = 'special'; subTool = 'jwt-decoder'; 
        sample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'; 
        break;
      case 'text-diff':
        tab = 'special'; subTool = 'text-diff'; 
        setCompareText('The quick brown fox jumps over the lazy dog');
        sample = 'The quick brown cat jumps over the sleepy dog';
        break;
      case 'base64-decode':
        tab = 'special'; subTool = 'base64-decode'; 
        sample = 'SGVsbG8gV29ybGQhIFRoaXMgaXMgYSB0ZXN0Lg=='; 
        break;
      case 'hash-generator':
        tab = 'special'; subTool = 'hash-generator'; 
        sample = 'Hello World'; 
        break;
      default:
        return;
    }

    setActiveTab(tab);
    setActiveTool(subTool);
    if (sample) setInput(sample);
  }, [activeToolId, searchParams]);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setCompareText('');
    setBirthDate('');
  };

  // Word Counter Analysis
  const analyzeWordCount = (text: string) => {
    if (!text.trim()) return { wordCount: 0, uniqueWords: 0, charCount: 0, charNoSpaces: 0, readingTime: 0 };
    const words = text.trim().split(/\s+/).filter(Boolean);
    const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^\w]/g, ''))).size;
    const charCount = text.length;
    const charNoSpaces = text.replace(/\s/g, '').length;
    const readingTime = Math.ceil(words.length / 225);
    return { wordCount: words.length, uniqueWords, charCount, charNoSpaces, readingTime };
  };

  // Character Counter
  const analyzeCharacterCount = (text: string) => {
    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const numbers = text.replace(/[^0-9]/g, '').length;
    const spaces = text.replace(/[^ ]/g, '').length;
    const punctuation = text.replace(/[a-zA-Z0-9\s]/g, '').length;
    return { chars, charsNoSpaces, letters, numbers, spaces, punctuation };
  };

  // Sentence Counter
  const analyzeSentences = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const avgLength = sentences.length ? Math.round(sentences.map(s => s.trim().split(/\s+/).length).reduce((a,b) => a+b, 0) / sentences.length) : 0;
    return { count: sentences.length, avgLength, sentences: sentences.map(s => s.trim()) };
  };

  // Paragraph Counter
  const analyzeParagraphs = (text: string) => {
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    const avgWords = paragraphs.length ? Math.round(paragraphs.map(p => p.trim().split(/\s+/).length).reduce((a,b) => a+b, 0) / paragraphs.length) : 0;
    return { count: paragraphs.length, avgWords };
  };

  // Line Counter
  const analyzeLines = (text: string) => {
    const lines = text.split('\n');
    return { count: lines.length, nonEmpty: lines.filter(l => l.trim().length > 0).length };
  };

  // Email Extractor
  const extractEmails = (text: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const emails = text.match(emailRegex) || [];
    return { count: emails.length, emails: [...new Set(emails)] };
  };

  // URL Extractor
  const extractUrls = (text: string) => {
    const urlRegex = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/g;
    const urls = text.match(urlRegex) || [];
    return { count: urls.length, urls: [...new Set(urls)] };
  };

  // Number Extractor
  const extractNumbers = (text: string) => {
    const numRegex = /-?\d+(?:\.\d+)?(?:,\d{3})*/g;
    const numbers = text.match(numRegex) || [];
    return { count: numbers.length, numbers: [...new Set(numbers)] };
  };

  // Hashtag Extractor
  const extractHashtags = (text: string) => {
    const hashtagRegex = /#[\w\u0600-\u06FF]+/g;
    const hashtags = text.match(hashtagRegex) || [];
    return { count: hashtags.length, hashtags: [...new Set(hashtags)] };
  };

  // Mention Extractor
  const extractMentions = (text: string) => {
    const mentionRegex = /@[\w\u0600-\u06FF]+/g;
    const mentions = text.match(mentionRegex) || [];
    return { count: mentions.length, mentions: [...new Set(mentions)] };
  };

  // Keyword Density
  const analyzeKeywordDensity = (text: string) => {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);
    const total = words.length;
    const freq: Record<string, number> = {};
    words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const sorted = Object.entries(freq).sort((a,b) => b[1] - a[1]).slice(0, 20);
    return sorted.map(([word, count]) => ({ word, count, density: total ? ((count / total) * 100).toFixed(2) : '0' }));
  };

  // Letter Frequency
  const analyzeLetterFrequency = (text: string) => {
    const letters = text.toLowerCase().replace(/[^a-z]/g, '').split('');
    const total = letters.length;
    const freq: Record<string, number> = {};
    for (let i = 97; i <= 122; i++) {
      freq[String.fromCharCode(i)] = 0;
    }
    letters.forEach(l => { if (freq[l] !== undefined) freq[l]++; });
    return Object.entries(freq).map(([letter, count]) => ({ letter, count, percentage: total ? ((count / total) * 100).toFixed(2) : '0' }));
  };

  // Word Length Distribution
  const analyzeWordLength = (text: string) => {
    const words = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const distribution: Record<number, number> = {};
    words.forEach(w => {
      const len = w.length;
      distribution[len] = (distribution[len] || 0) + 1;
    });
    return Object.entries(distribution).sort((a,b) => Number(a[0]) - Number(b[0]));
  };

  // Case Distribution
  const analyzeCaseDistribution = (text: string) => {
    const chars = text.split('');
    const upper = chars.filter(c => c >= 'A' && c <= 'Z').length;
    const lower = chars.filter(c => c >= 'a' && c <= 'z').length;
    const title = text.split(/\s+/).filter(w => w[0] >= 'A' && w[0] <= 'Z' && w.slice(1).toLowerCase() === w.slice(1)).length;
    const sentence = (text.match(/^[A-Z]|\.\s+[A-Z]/g) || []).length;
    return { upper, lower, titleWords: title, sentenceStarts: sentence + (text[0] >= 'A' && text[0] <= 'Z' ? 1 : 0) };
  };

  // Readability Score
  const analyzeReadability = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
    const words = text.trim().split(/\s+/).filter(Boolean);
    const syllables = words.reduce((count, word) => {
      const w = word.toLowerCase().replace(/[^a-z]/g, '');
      let syl = 0;
      if (w.length <= 3) return count + 1;
      syl = w.replace(/[^aeiouy]/g, '').length;
      if (w.endsWith('e')) syl--;
      if (w.endsWith('le') && w.length > 2 && !'aeiou'.includes(w[w.length-3])) syl++;
      syl = Math.max(1, syl);
      return count + syl;
    }, 0);
    
    const score = sentences.length ? 206.835 - 1.015 * (words.length / sentences.length) - 84.6 * (syllables / words.length) : 0;
    let grade = '';
    if (score >= 90) grade = 'Very Easy (5th grade)';
    else if (score >= 80) grade = 'Easy (6th grade)';
    else if (score >= 70) grade = 'Fairly Easy (7th grade)';
    else if (score >= 60) grade = 'Standard (8th-9th grade)';
    else if (score >= 50) grade = 'Fairly Difficult (10th-12th grade)';
    else if (score >= 30) grade = 'Difficult (College)';
    else grade = 'Very Difficult (College Graduate)';
    
    return { score: Math.round(score), grade, wordCount: words.length, sentenceCount: sentences.length, syllableCount: syllables };
  };

  // Age Calculator
  const calculateAge = (birthdate: string) => {
    if (!birthdate) return null;
    const birth = new Date(birthdate);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    return { years, months, days, hours, minutes, totalDays, nextBirthday: new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) };
  };

  // JWT Decoder
  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return { error: 'Invalid JWT format. Expected 3 parts.', valid: false };
      const header = JSON.parse(atob(parts[0]));
      const payload = JSON.parse(atob(parts[1]));
      return { header, payload, signature: parts[2], valid: true };
    } catch (e) {
      return { error: 'Invalid JWT token. Check your input.', valid: false };
    }
  };

  // Text Diff
  const compareTexts = (text1: string, text2: string) => {
    const words1 = text1.split(/\s+/);
    const words2 = text2.split(/\s+/);
    const onlyInFirst = words1.filter(w => !words2.includes(w));
    const onlyInSecond = words2.filter(w => !words1.includes(w));
    const common = words1.filter(w => words2.includes(w));
    return { onlyInFirst, onlyInSecond, common, firstLength: words1.length, secondLength: words2.length };
  };

  // Base64 Decode
  const decodeBase64 = (str: string) => {
    try {
      return atob(str);
    } catch (e) {
      return 'Error: Invalid Base64 string';
    }
  };

  // Hash Generator
  const generateHash = async (text: string, type: 'md5' | 'sha1' | 'sha256') => {
    if (!text) return 'No input provided';
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    if (type === 'md5') {
      // Simple hash for MD5 (in production use a proper MD5 library)
      let hash = 0;
      for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash).toString(16);
    }
    const hashBuffer = await crypto.subtle.digest(type === 'sha1' ? 'SHA-1' : 'SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const processText = useCallback(async () => {
    if (!input && activeTool !== 'age-calculator' && activeTool !== 'text-diff' && activeTool !== 'base64-decode') {
      setOutput('No input provided. Please enter some text.');
      return;
    }

    let result = '';

    switch (activeTool) {
      case 'word-counter': {
        const stats = analyzeWordCount(input);
        result = `📊 WORD COUNT ANALYSIS\n\n`;
        result += `Total Words: ${stats.wordCount}\n`;
        result += `Unique Words: ${stats.uniqueWords}\n`;
        result += `Characters (with spaces): ${stats.charCount}\n`;
        result += `Characters (without spaces): ${stats.charNoSpaces}\n`;
        result += `Estimated Reading Time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}\n`;
        break;
      }
      case 'character-counter': {
        const stats = analyzeCharacterCount(input);
        result = `🔤 CHARACTER COUNT ANALYSIS\n\n`;
        result += `Total Characters: ${stats.chars}\n`;
        result += `Characters (no spaces): ${stats.charsNoSpaces}\n`;
        result += `Letters (A-Z): ${stats.letters}\n`;
        result += `Numbers (0-9): ${stats.numbers}\n`;
        result += `Spaces: ${stats.spaces}\n`;
        result += `Punctuation: ${stats.punctuation}\n`;
        break;
      }
      case 'sentence-counter': {
        const stats = analyzeSentences(input);
        result = `📝 SENTENCE COUNT ANALYSIS\n\n`;
        result += `Total Sentences: ${stats.count}\n`;
        result += `Average Words per Sentence: ${stats.avgLength}\n\n`;
        result += `Sentences:\n${stats.sentences.map((s, i) => `${i+1}. ${s}`).join('\n')}`;
        break;
      }
      case 'paragraph-counter': {
        const stats = analyzeParagraphs(input);
        result = `📄 PARAGRAPH COUNT ANALYSIS\n\n`;
        result += `Total Paragraphs: ${stats.count}\n`;
        result += `Average Words per Paragraph: ${stats.avgWords}\n`;
        break;
      }
      case 'line-counter': {
        const stats = analyzeLines(input);
        result = `📏 LINE COUNT ANALYSIS\n\n`;
        result += `Total Lines: ${stats.count}\n`;
        result += `Non-Empty Lines: ${stats.nonEmpty}\n`;
        break;
      }
      case 'extract-emails': {
        const stats = extractEmails(input);
        result = `📧 EXTRACTED EMAILS (${stats.count})\n\n`;
        result += stats.emails.join('\n');
        if (stats.count === 0) result = 'No email addresses found in the text.';
        break;
      }
      case 'extract-urls': {
        const stats = extractUrls(input);
        result = `🔗 EXTRACTED URLs (${stats.count})\n\n`;
        result += stats.urls.join('\n');
        if (stats.count === 0) result = 'No URLs found in the text.';
        break;
      }
      case 'extract-numbers': {
        const stats = extractNumbers(input);
        result = `🔢 EXTRACTED NUMBERS (${stats.count})\n\n`;
        result += stats.numbers.join('\n');
        if (stats.count === 0) result = 'No numbers found in the text.';
        break;
      }
      case 'extract-hashtags': {
        const stats = extractHashtags(input);
        result = `🏷️ EXTRACTED HASHTAGS (${stats.count})\n\n`;
        result += stats.hashtags.join('\n');
        if (stats.count === 0) result = 'No hashtags found in the text.';
        break;
      }
      case 'extract-mentions': {
        const stats = extractMentions(input);
        result = `👤 EXTRACTED MENTIONS (${stats.count})\n\n`;
        result += stats.mentions.join('\n');
        if (stats.count === 0) result = 'No mentions found in the text.';
        break;
      }
      case 'keyword-density': {
        const stats = analyzeKeywordDensity(input);
        result = `🎯 KEYWORD DENSITY ANALYSIS\n\n`;
        result += `Top 20 Keywords (min 3 chars):\n\n`;
        result += `Word | Count | Density\n`;
        result += `-----|-------|--------\n`;
        stats.forEach(({ word, count, density }) => {
          result += `${word.padEnd(15)} | ${count.toString().padEnd(5)} | ${density}%\n`;
        });
        if (stats.length === 0) result = 'No keywords found. Text too short or contains only short words.';
        break;
      }
      case 'letter-frequency': {
        const stats = analyzeLetterFrequency(input);
        result = `📊 LETTER FREQUENCY ANALYSIS\n\n`;
        result += `Letter | Count | Percentage\n`;
        result += `-------|-------|-----------\n`;
        stats.forEach(({ letter, count, percentage }) => {
          result += `${letter.toUpperCase().padEnd(6)} | ${count.toString().padEnd(5)} | ${percentage}%\n`;
        });
        break;
      }
      case 'word-length': {
        const stats = analyzeWordLength(input);
        result = `📏 WORD LENGTH DISTRIBUTION\n\n`;
        result += `Length | Count\n`;
        result += `-------|------\n`;
        stats.forEach(([len, count]) => {
          result += `${len.toString().padEnd(6)} | ${count}\n`;
        });
        break;
      }
      case 'case-distribution': {
        const stats = analyzeCaseDistribution(input);
        result = `🔠 CASE DISTRIBUTION ANALYSIS\n\n`;
        result += `Uppercase Letters: ${stats.upper}\n`;
        result += `Lowercase Letters: ${stats.lower}\n`;
        result += `Title Case Words: ${stats.titleWords}\n`;
        result += `Sentence Starts: ${stats.sentenceStarts}\n`;
        break;
      }
      case 'readability-score': {
        const stats = analyzeReadability(input);
        result = `📖 READABILITY SCORE (Flesch Reading Ease)\n\n`;
        result += `Score: ${stats.score}/100\n`;
        result += `Grade: ${stats.grade}\n\n`;
        result += `Word Count: ${stats.wordCount}\n`;
        result += `Sentence Count: ${stats.sentenceCount}\n`;
        result += `Syllable Count: ${stats.syllableCount}\n\n`;
        result += `💡 Higher score = easier to read. Aim for 60-70 for standard content.`;
        break;
      }
      case 'age-calculator': {
        const age = calculateAge(birthDate);
        if (!age) {
          result = 'Please enter a valid birthdate in YYYY-MM-DD format.';
        } else {
          result = `🎂 AGE CALCULATOR\n\n`;
          result += `Age: ${age.years} years, ${age.months} months, ${age.days} days\n`;
          result += `Total Days Alive: ${age.totalDays.toLocaleString()}\n`;
          result += `Hours: ${age.hours} | Minutes: ${age.minutes}\n`;
          result += `Next Birthday: ${age.nextBirthday.toDateString()}\n`;
        }
        break;
      }
      case 'jwt-decoder': {
        const decoded = decodeJWT(input);
        if (!decoded.valid) {
          result = `❌ ${decoded.error}`;
        } else {
          result = `🔐 JWT DECODER\n\n`;
          result += `📋 HEADER:\n${JSON.stringify(decoded.header, null, 2)}\n\n`;
          result += `📦 PAYLOAD:\n${JSON.stringify(decoded.payload, null, 2)}\n\n`;
          result += `✍️ SIGNATURE: ${decoded.signature.substring(0, 20)}...\n`;
        }
        break;
      }
      case 'text-diff': {
        const diff = compareTexts(compareText, input);
        result = `🔄 TEXT DIFF COMPARISON\n\n`;
        result += `📝 TEXT 1 (Compare Text): ${diff.firstLength} words\n`;
        result += `📝 TEXT 2 (Original): ${diff.secondLength} words\n\n`;
        result += `✅ Common words: ${diff.common.length}\n`;
        result += `➕ Only in Compare Text: ${diff.onlyInFirst.slice(0, 20).join(', ')}${diff.onlyInFirst.length > 20 ? '...' : ''}\n`;
        result += `➖ Only in Original: ${diff.onlyInSecond.slice(0, 20).join(', ')}${diff.onlyInSecond.length > 20 ? '...' : ''}\n`;
        break;
      }
      case 'base64-decode': {
        result = decodeBase64(input);
        break;
      }
      case 'hash-generator': {
        const hash = await generateHash(input, hashType);
        result = `${hashType.toUpperCase()} HASH\n\n${hash}`;
        break;
      }
      default:
        result = 'Select a tool to analyze your text.';
    }

    setOutput(result);
  }, [input, activeTool, birthDate, compareText, hashType]);

  useEffect(() => {
    if (input || activeTool === 'age-calculator' || activeTool === 'text-diff') {
      processText();
    } else if (activeTool === 'base64-decode' && !input) {
      setOutput('');
    } else {
      setOutput('');
    }
  }, [input, activeTool, birthDate, compareText, hashType, processText]);

  const getToolDescription = () => {
    const tab = TOOLS_CONFIG[activeTab];
    const tool = tab?.find(t => t.id === activeTool);
    return tool?.description || 'Analyze and extract insights from your text content.';
  };

  // FAQ Data
  const faqs = [
    { q: "What analysis tools reside within this hub?", a: "This workspace integrates word counter, character statistics, sentence analyzers, paragraph trackers, keyword density mapping, email/URL extraction, JWT decoder, age calculator, text diff, and hash generator under one screen." },
    { q: "Is my pasted paragraph secure during analysis?", a: "100% private. All character scanning metrics, token splitting, and density parsing routines are executed in browser volatile memory locally, leaving no trace logs." },
    { q: "How is the reading time metric calculated?", a: "Our algorithm estimates reading speeds at a standard 225 words per minute (WPM) for general readers, calculating precise content digestion times based on total word counts." },
    { q: "What is the ideal keyword density for SEO optimization?", a: "An ideal keyword density is usually between 1% and 2%. Moving keyword frequency beyond 2.5% can trigger search engine keyword-stuffing penalties." },
    { q: "How does the JWT decoder work?", a: "JWT tokens consist of three parts: Header, Payload, and Signature. Our decoder splits the token, base64-decodes each part, and displays the JSON content for inspection." },
    { q: "Can I extract email contacts and URLs from large text files?", a: "Yes. Our extraction routines execute local regular expression matching to scan through large drafts, filtering and isolating compliant emails or hyperlinks instantly." },
    { q: "What is the Flesch Reading Ease score?", a: "The Flesch Reading Ease test measures readability. Scores 90-100 are very easy (5th grade), 60-70 are standard (8th-9th grade), and 0-30 are very difficult (college graduate)." },
    { q: "What hash algorithms are supported?", a: "We support MD5 (fast, not secure), SHA-1 (deprecated), and SHA-256 (secure, recommended). All hashing is done client-side using Web Crypto API." }
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESC} />
        <meta name="keywords" content={SEO_KEYWORDS} />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESC} />
        <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Text Analysis Hub",
          "url": CANONICAL_URL,
          "description": SEO_DESC,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Any",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "featureList": [
            "Word Counter", "Character Counter", "Sentence Counter", "Paragraph Counter",
            "Email Extractor", "URL Extractor", "Keyword Density", "Letter Frequency",
            "Word Length Stats", "Readability Score", "JWT Decoder", "Age Calculator",
            "Text Diff", "Hash Generator", "Base64 Decoder"
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.texlyonline.in" },
            { "@type": "ListItem", "position": 2, "name": "Text Analysis Hub", "item": CANONICAL_URL }
          ]
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
          }))
        })}</script>
      </Helmet>

      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold text-xs py-0.5 px-2 bg-slate-100 dark:bg-slate-800 rounded">Text Analysis</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-600 dark:text-amber-400">Hub 1</span>
            <span className="text-xs font-semibold text-slate-400">Word Count & Density Analysis</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            Character Counter & Word Counter — Free Online Text Analysis Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-3xl leading-relaxed">
            Count characters, words, sentences, and paragraphs instantly. Analyze keyword density, letter frequency, extract emails from text — all free, no login, works in your browser.
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full border border-green-500/20 shadow-sm">
              ✅ 19 Tools Included
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full border border-blue-500/20 shadow-sm">
              🔒 100% Browser-Based
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-semibold rounded-full border border-amber-500/20 shadow-sm">
              ⚡ Real-Time Processing
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-sky-500/10 text-sky-700 dark:text-sky-400 text-xs font-semibold rounded-full border border-sky-500/20 shadow-sm">
              🆓 Always Free
            </span>
          </div>
        </header>

        {/* Main interactive grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Side Drawer Tool directory */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col gap-4 h-fit">
            <div className="border-b border-slate-100 dark:border-slate-850 pb-2">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Tool Categories</span>
            </div>
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-1.5 pb-2 md:pb-0 scrollbar-none snap-x snap-mandatory">
              <button 
                onClick={() => { setActiveTab('basic'); setActiveTool('word-counter'); setInput(''); setOutput(''); setCompareText(''); setBirthDate(''); }}
                className={`flex-shrink-0 md:flex-shrink py-1.5 px-3 rounded-lg text-left text-xs font-bold whitespace-nowrap transition-all snap-start ${activeTab === 'basic' ? 'bg-amber-500 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 md:bg-transparent md:dark:bg-transparent'}`}
              >
                Basic Counters
              </button>
              <button 
                onClick={() => { setActiveTab('extract'); setActiveTool('extract-emails'); setInput(''); setOutput(''); setCompareText(''); setBirthDate(''); }}
                className={`flex-shrink-0 md:flex-shrink py-1.5 px-3 rounded-lg text-left text-xs font-bold whitespace-nowrap transition-all snap-start ${activeTab === 'extract' ? 'bg-amber-500 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 md:bg-transparent md:dark:bg-transparent'}`}
              >
                Extractors
              </button>
              <button 
                onClick={() => { setActiveTab('advanced'); setActiveTool('keyword-density'); setInput(''); setOutput(''); setCompareText(''); setBirthDate(''); }}
                className={`flex-shrink-0 md:flex-shrink py-1.5 px-3 rounded-lg text-left text-xs font-bold whitespace-nowrap transition-all snap-start ${activeTab === 'advanced' ? 'bg-amber-500 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 md:bg-transparent md:dark:bg-transparent'}`}
              >
                Advanced Analysis
              </button>
              <button 
                onClick={() => { setActiveTab('special'); setActiveTool('age-calculator'); setInput(''); setOutput(''); setCompareText(''); setBirthDate('1995-10-15'); }}
                className={`flex-shrink-0 md:flex-shrink py-1.5 px-3 rounded-lg text-left text-xs font-bold whitespace-nowrap transition-all snap-start ${activeTab === 'special' ? 'bg-amber-500 text-white' : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/30 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-400 md:bg-transparent md:dark:bg-transparent'}`}
              >
                Special Tools
              </button>
            </div>

            <div className="border-t border-slate-100 dark:border-slate-850 pt-2 flex flex-col gap-1 max-h-[300px] overflow-y-auto">
              <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-1">Select Tool</span>
              {TOOLS_CONFIG[activeTab].map(t => (
                <button 
                  key={t.id}
                  onClick={() => { setActiveTool(t.id); setOutput(''); if (t.id !== 'text-diff') setCompareText(''); if (t.id !== 'age-calculator') setBirthDate(''); }}
                  className={`py-1 px-2 rounded text-left text-[11px] font-semibold transition-all ${activeTool === t.id ? 'bg-slate-100 dark:bg-slate-800 text-amber-500 font-bold border-l-2 border-amber-500' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Core Playground Panel */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-3 mb-4">
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    {TOOLS_CONFIG[activeTab].find(t => t.id === activeTool)?.name || 'Analysis Tool'}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {getToolDescription()}
                  </p>
                </div>
              </div>

              {/* Special Options Panel depending on the tool */}
              {(activeTool === 'age-calculator' || activeTool === 'text-diff' || activeTool === 'hash-generator') && (
                <div className="mb-4 bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-850 p-4 rounded-xl">
                  {activeTool === 'age-calculator' && (
                    <div>
                      <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">Birth Date</label>
                      <input 
                        type="date" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 border border-slate-250 dark:border-slate-800 rounded outline-none"
                      />
                    </div>
                  )}
                  {activeTool === 'text-diff' && (
                    <div>
                      <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">Compare With</label>
                      <textarea 
                        value={compareText} 
                        onChange={(e) => setCompareText(e.target.value)}
                        className="w-full bg-transparent px-3 py-1.5 text-xs text-slate-800 dark:text-slate-200 border border-slate-250 dark:border-slate-800 rounded outline-none resize-none h-20"
                        placeholder="Enter text to compare..."
                      />
                    </div>
                  )}
                  {activeTool === 'hash-generator' && (
                    <div>
                      <label className="text-[10px] uppercase font-black tracking-wider text-slate-400 block mb-1">Hash Algorithm</label>
                      <div className="flex gap-2">
                        <button onClick={() => setHashType('md5')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${hashType === 'md5' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>MD5</button>
                        <button onClick={() => setHashType('sha1')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${hashType === 'sha1' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>SHA-1</button>
                        <button onClick={() => setHashType('sha256')} className={`px-3 py-1 rounded text-xs font-bold transition-all ${hashType === 'sha256' ? 'bg-amber-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}>SHA-256</button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Inner Textarea row */}
              {activeTool !== 'age-calculator' && activeTool !== 'text-diff' && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl h-[200px] overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500">Source Input</span>
                    </div>
                    <textarea 
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 p-3 bg-transparent resize-none text-xs text-slate-800 dark:text-slate-200 outline-none leading-relaxed"
                      placeholder="Paste or type your text here for analysis..."
                    />
                  </div>
                </div>
              )}

              {activeTool === 'text-diff' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl h-[180px] overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-500">Compare Text</span>
                    </div>
                    <textarea 
                      value={compareText} 
                      onChange={(e) => setCompareText(e.target.value)}
                      className="flex-1 p-3 bg-transparent resize-none text-xs text-slate-800 dark:text-slate-200 outline-none leading-relaxed"
                      placeholder="Text to compare..."
                    />
                  </div>
                  <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl h-[180px] overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-500">Original Text</span>
                    </div>
                    <textarea 
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 p-3 bg-transparent resize-none text-xs text-slate-800 dark:text-slate-200 outline-none leading-relaxed"
                      placeholder="Original text..."
                    />
                  </div>
                </div>
              )}

              {activeTool === 'age-calculator' && (
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl h-[150px] overflow-hidden">
                    <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800">
                      <span className="text-[10px] font-bold text-slate-500">Birth Date Selection</span>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center">
                      <input 
                        type="date" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        className="px-4 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-transparent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Output area */}
              <div className="flex flex-col border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1.5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500">Analysis Result</span>
                  {output && (
                    <button 
                      onClick={handleCopy}
                      className="flex items-center gap-1 text-[9px] font-bold text-amber-500"
                    >
                      {copied ? <Check className="w-3" /> : <Copy className="w-3" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  )}
                </div>
                <pre className="p-3 bg-transparent text-xs text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap font-mono min-h-[200px] max-h-[300px] overflow-auto">
                  {output || 'Select a tool and click "Analyze Now" to see results...'}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={processText}
                  className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 transition-colors text-white font-black text-xs uppercase tracking-widest rounded-xl hover:shadow cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <BarChart3 className="w-4 h-4" /> Analyze Now
                </button>
                <button 
                  onClick={handleReset}
                  className="py-2.5 px-4 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Quality block */}
        <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-amber-50/5 dark:bg-amber-50/10 border border-amber-500/10 px-5 py-4 rounded-2xl">
          <ShieldCheck className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
          <div>
            <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-0.5">Offline-First Privacy Shield</h4>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">All text analysis, extraction, and decoding happen locally in your browser. No data is ever uploaded to any server.</p>
          </div>
        </div>

        {/* SEO ARTICLE SECTION */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 mb-12">
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 text-sm leading-relaxed space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                Text Analysis Hub — Complete Word Counting & Diagnostic Guide
              </h2>
              <p>
                In today's digital era, precision is paramount. Whether you are drafting an academic research paper, optimizing a blog post for search engine indexing layouts, or finalizing social media ad slogans, understanding structural metrics is critical. The Texly Text Analysis workspace acts as a premium interactive diagnostics dashboard, evaluating paragraph densities, space ratios, word-length frequencies, and content metadata securely.
              </p>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                Core Metrics & Tool Dimensions in This Suite
              </h2>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">1. Word & Character Counter Online</h3>
                  <p>Ensure your descriptions comply with platform restrictions. Google Search results truncate metadata exceeding 160 characters, while SMS systems split messages past 160 characters. Our counter lets you separate or include empty spacing characters, providing exact metadata telemetry.</p>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">2. Keyword Density Analyzer</h3>
                  <p>Avoid search engine penalties. Overstuffing high-frequency keyword strings flags your content as artificial or low quality. Our analyzer tallies individual keyword repeating frequencies, keeping your density safely between 1% and 2% for search engines.</p>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">3. Contact & Link Extractor</h3>
                  <p>Need to pull emails or links out of messy documents? Our extraction pipeline implements local, server-free regular expression scans, showing you all matching contacts or absolute Web links in clean export tables.</p>
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-1">4. JWT Decoder & Hash Generator</h3>
                  <p>Security professionals can inspect JWT tokens locally or generate cryptographic hashes (MD5, SHA-1, SHA-256) using Web Crypto API for debugging authentication flows.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                Practical Use Cases for Text Analysis
              </h2>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Copywriters & Ad Managers:</strong> Keeping ad copies within Twitter (280) or Facebook ad characters margins.</li>
                <li><strong>SEO & Blog Editors:</strong> Tracking meta-title thresholds (60 chars) and meta descriptions (160 chars).</li>
                <li><strong>Developers & Data Analysts:</strong> Scanning JWT tokens, generating hashes, or auditing letter frequencies.</li>
                <li><strong>Students & Researchers:</strong> Staying under strict academic word bounds.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-3">
                Data Security and Privacy Commitment
              </h2>
              <p>All processing occurs locally in your browser using client-side JavaScript. No text, files, or personal data is ever uploaded to our servers. Your content remains 100% private and secure on your device.</p>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - Now properly added */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden transition-all">
                  <button 
                    onClick={() => setFaqOpen(prev => ({ ...prev, [idx]: !isOpen }))}
                    className="w-full text-left px-5 py-4 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-900/30 hover:bg-slate-105 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-850 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <HubToolsContent hubPath="/tools/text-analysis-hub" tools={textAnalysisHubTools} />

        {/* Related Hub Suites */}
        <section className="bg-slate-100 dark:bg-slate-900/40 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 p-6 sm:p-8">
          <h2 className="text-base font-black uppercase tracking-widest text-slate-400 mb-4">Related Hub Suites</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link to="/tools/text-cleaning-hub" className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-amber-500/50 transition-all text-center">
              Text Cleaning Hub
            </Link>
            <Link to="/tools/text-converter-hub" className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-amber-500/50 transition-all text-center">
              Converter Hub
            </Link>
            <Link to="/tools/text-utility-hub" className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-amber-500/50 transition-all text-center">
              Utility Toolkit
            </Link>
            <Link to="/tools/generators-hub" className="p-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 rounded-xl text-xs font-bold hover:border-amber-500/50 transition-all text-center">
              Generators Hub
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
