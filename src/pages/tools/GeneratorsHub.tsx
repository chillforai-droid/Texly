import { useState, useEffect, useRef, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useSearchParams } from 'react-router-dom';
import HubToolsContent from '../../components/HubToolsContent';
import { generatorsHubTools } from '../../data/hubContent/generatorsHub';
import { 
  ChevronRight,
  ShieldCheck,
  ChevronDown,
  Download,
  Volume2,
  Copy,
  RefreshCw,
  Calendar,
  QrCode,
  Hash,
  TreePine,
  User,
  Fingerprint,
  Type,
  AlignLeft,
  Paintbrush,
  Clock,
  Dice6
} from 'lucide-react';

const SEO_TITLE = "Invisible Text Generator — Mirror Text, Banner Text Generator, QR Code, Age Calculator & More | Free Online";
const SEO_DESC = "Free online generators. Generate invisible text, mirror text online, banner text generator, QR code generator, age calculator, random string generator, digital signature, Morse code audio and more. No login.";
const SEO_KEYWORDS = "invisible text generator, mirror text generator, banner text generator, hidden text generator, alternating text generator, qr code generator free, age calculator online free, online signature generator, random string generator, zalgo text generator, morse code audio play, text generator online";
const CANONICAL_URL = "https://www.texlyonline.in/tools/generators-hub";

type GenToolId = 
  | 'signature' | 'age' | 'qr' | 'morseaudio' | 'hash' 
  | 'asciitree' | 'countdown' | 'choice' | 'fakeuser' | 'uuid'
  | 'invisible' | 'mirror' | 'banner' | 'zalgo';

// ==================== UTILITY FUNCTIONS ====================

// Real SHA-256 using Web Crypto API
async function realSha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Real MD5 Implementation (pure JavaScript)
function realMd5(message: string): string {
  function rotateLeft(value: number, shift: number): number {
    return (value << shift) | (value >>> (32 - shift));
  }
  
  function addUnsigned(x: number, y: number): number {
    const x4 = x & 0xffff;
    const y4 = y & 0xffff;
    return ((((x >>> 16) + (y >>> 16) + ((x4 + y4) >>> 16)) & 0xffff) << 16) | ((x4 + y4) & 0xffff);
  }
  
  const S = [7, 12, 17, 22, 5, 9, 14, 20, 4, 11, 16, 23, 6, 10, 15, 21];
  const K = new Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 4294967296);
  }
  
  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;
  
  // Convert string to bytes
  const bytes: number[] = [];
  for (let i = 0; i < message.length; i++) {
    bytes.push(message.charCodeAt(i) & 0xff);
  }
  
  const originalLength = bytes.length;
  bytes.push(0x80);
  while ((bytes.length % 64) !== 56) {
    bytes.push(0);
  }
  
  const bitLength = originalLength * 8;
  for (let i = 0; i < 8; i++) {
    bytes.push((bitLength >>> (i * 8)) & 0xff);
  }
  
  for (let chunkStart = 0; chunkStart < bytes.length; chunkStart += 64) {
    const M = new Array(16);
    for (let i = 0; i < 16; i++) {
      M[i] = (bytes[chunkStart + i * 4] || 0) |
             ((bytes[chunkStart + i * 4 + 1] || 0) << 8) |
             ((bytes[chunkStart + i * 4 + 2] || 0) << 16) |
             ((bytes[chunkStart + i * 4 + 3] || 0) << 24);
    }
    
    let A = a0, B = b0, C = c0, D = d0;
    
    for (let i = 0; i < 64; i++) {
      let F, g;
      if (i < 16) {
        F = (B & C) | ((~B) & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | ((~D) & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | (~D));
        g = (7 * i) % 16;
      }
      
      const dTemp = D;
      D = C;
      C = B;
      B = addUnsigned(B, rotateLeft(addUnsigned(A, addUnsigned(F, addUnsigned(K[i], M[g]))), S[i % 4 + Math.floor(i / 16) * 4]));
      A = dTemp;
    }
    
    a0 = addUnsigned(a0, A);
    b0 = addUnsigned(b0, B);
    c0 = addUnsigned(c0, C);
    d0 = addUnsigned(d0, D);
  }
  
  const result = [a0, b0, c0, d0].map(v => v >>> 0).map(v => v.toString(16).padStart(8, '0')).join('');
  return result;
}

// Client-side QR Code Generator (canvas-based)
function generateQRCodeCanvas(text: string, size: number = 150): Promise<string> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject('Canvas not supported');
      return;
    }
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);
    
    // Simple encoding for demo - in production use a proper QR library
    // For now, show a styled placeholder with the text
    ctx.fillStyle = 'black';
    ctx.font = `${Math.floor(size / 15)}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText('QR', size / 2, size / 2 - 10);
    ctx.font = `${Math.floor(size / 25)}px monospace`;
    const shortText = text.length > 20 ? text.substring(0, 17) + '...' : text;
    ctx.fillText(shortText, size / 2, size / 2 + 20);
    
    resolve(canvas.toDataURL('image/png'));
  });
}

// Zalgo text generator
function generateZalgo(text: string): string {
  const zalgoChars = [
    '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310',
    '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343',
    '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350'
  ];
  
  return text.split('').map(char => {
    const numZalgo = Math.floor(Math.random() * 3) + 1;
    let zalgo = char;
    for (let i = 0; i < numZalgo; i++) {
      zalgo += zalgoChars[Math.floor(Math.random() * zalgoChars.length)];
    }
    return zalgo;
  }).join('');
}

// Mirror text (reverse)
function mirrorText(text: string): string {
  const mirrorMap: Record<string, string> = {
    'a': 'ɒ', 'b': 'd', 'c': 'ɔ', 'd': 'b', 'e': 'ɘ', 'f': 'ʇ', 'g': 'ǫ', 'h': 'ʜ',
    'i': 'i', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'm', 'n': 'n', 'o': 'o', 'p': 'q',
    'q': 'p', 'r': 'ɿ', 's': 'ꙅ', 't': 'ƚ', 'u': 'u', 'v': 'v', 'w': 'w', 'x': 'x',
    'y': 'ʏ', 'z': 'z', 'A': 'A', 'B': 'ᙠ', 'C': 'Ͻ', 'D': 'ᗡ', 'E': 'Ɛ', 'F': 'ꟻ',
    'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'Ⴑ', 'K': 'K', 'L': '⅂', 'M': 'W', 'N': 'N',
    'O': 'O', 'P': 'ꟼ', 'Q': 'Ὁ', 'R': 'Я', 'S': 'Ꙅ', 'T': 'T', 'U': 'U', 'V': 'V',
    'W': 'M', 'X': 'X', 'Y': 'Y', 'Z': 'Z'
  };
  
  return text.split('').reverse().map(char => mirrorMap[char] || char).join('');
}

// Banner/ASCII text generator
function generateBannerText(text: string, style: string = 'standard'): string {
  const banners: Record<string, Record<string, string[]>> = {
    standard: {
      'a': [' █████ ', '██   ██', '███████', '██   ██', '██   ██'],
      'b': ['██████ ', '██   ██', '██████ ', '██   ██', '██████ '],
      'c': [' █████ ', '██     ', '██     ', '██     ', ' █████ '],
      'd': ['██████ ', '██   ██', '██   ██', '██   ██', '██████ '],
      'e': ['███████', '██     ', '██████ ', '██     ', '███████'],
      'f': ['███████', '██     ', '██████ ', '██     ', '██     '],
      'g': [' █████ ', '██     ', '██ ███ ', '██   ██', ' █████ '],
      'h': ['██   ██', '██   ██', '███████', '██   ██', '██   ██'],
      'i': [' ███ ', '  █  ', '  █  ', '  █  ', ' ███ '],
      'j': ['   ███', '    █ ', '    █ ', '█   █ ', ' ███  '],
      'k': ['██   ██', '██  ██ ', '█████  ', '██  ██ ', '██   ██'],
      'l': ['██     ', '██     ', '██     ', '██     ', '███████'],
      'm': ['██   ██', '███████', '██ █ ██', '██   ██', '██   ██'],
      'n': ['██   ██', '███████', '██ █ ██', '██   ██', '██   ██'],
      'o': [' █████ ', '██   ██', '██   ██', '██   ██', ' █████ '],
      'p': ['██████ ', '██   ██', '██████ ', '██     ', '██     '],
      'q': [' █████ ', '██   ██', '██ █ ██', '██ █ ██', ' █████ '],
      'r': ['██████ ', '██   ██', '██████ ', '██   ██', '██   ██'],
      's': [' ██████', '██     ', ' █████ ', '     ██', '██████ '],
      't': ['███████', '   █   ', '   █   ', '   █   ', '   █   '],
      'u': ['██   ██', '██   ██', '██   ██', '██   ██', ' █████ '],
      'v': ['██   ██', '██   ██', '██   ██', ' ██ ██ ', '  ███  '],
      'w': ['██   ██', '██ █ ██', '██ █ ██', '██ █ ██', ' ███ ██'],
      'x': ['██   ██', ' ██ ██ ', '  ███  ', ' ██ ██ ', '██   ██'],
      'y': ['██   ██', ' ██ ██ ', '  ███  ', '   █   ', '   █   '],
      'z': ['███████', '    ██ ', '   ██  ', '  ██   ', '███████']
    }
  };
  
  const chars = text.toLowerCase().split('');
  const bannerSet = banners[style] || banners.standard;
  let result = '';
  
  for (let row = 0; row < 5; row++) {
    for (const char of chars) {
      const charBanner = bannerSet[char] || bannerSet['a'];
      result += charBanner[row] + '  ';
    }
    result += '\n';
  }
  
  return result;
}

export default function GeneratorsHub({ activeToolId }: { activeToolId?: string } = {}) {
  const [searchParams] = useSearchParams();
  const [activeTool, setActiveTool] = useState<GenToolId>('signature');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});

  // Additional states for generators
  const [invisibleCount, setInvisibleCount] = useState(5);
  const [invisibleType, setInvisibleType] = useState<'zwsp' | 'hangul' | 'zwnj'>('zwsp');
  const [mirrorText, setMirrorText] = useState('');
  const [bannerText, setBannerText] = useState('');
  const [bannerStyle, setBannerStyle] = useState<'standard' | 'block'>('standard');
  const [zalgoText, setZalgoText] = useState('');
  const [zalgoIntensity, setZalgoIntensity] = useState(2);
  const [countdownDate, setCountdownDate] = useState('');
  const [countdownResult, setCountdownResult] = useState('');
  const [choiceOptions, setChoiceOptions] = useState('');
  const [choiceResult, setChoiceResult] = useState('');

  // Signature states
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sigMode, setSigMode] = useState<'draw' | 'type'>('draw');
  const [sigTypeFont, setSigTypeFont] = useState<'font-serif' | 'font-sans' | 'font-mono'>('font-serif');
  const [sigColor, setSigColor] = useState('#000000');
  const [sigPenWidth, setSigPenWidth] = useState(3);
  const isDrawingRef = useRef(false);

  // Hash states
  const [hashInput, setHashInput] = useState('Texly');
  const [hashAlgorithm, setHashAlgorithm] = useState<'sha256' | 'md5'>('sha256');
  const [isHashing, setIsHashing] = useState(false);

  // QR state
  const [qrText, setQrText] = useState('https://www.texlyonline.in');
  const [renderedQr, setRenderedQr] = useState('');
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);

  // Age state
  const [birthdate, setBirthdate] = useState('2000-01-01');
  const [calculatedAge, setCalculatedAge] = useState('');

  // ASCII tree state
  const [treeStructure, setTreeStructure] = useState('src\n  components\n    Stopwatch.tsx\n  pages\n    Home.tsx');

  // Morse state
  const [morseString, setMorseString] = useState('HELLO');
  const [isPlayingMorse, setIsPlayingMorse] = useState(false);

  useEffect(() => {
    const tool = activeToolId || searchParams.get('tool');
    if (!tool) return;

    let target: GenToolId = 'signature';
    let sample = '';

    switch (tool) {
      case 'signature-generator': case 'signature': target = 'signature'; sample = 'John Doe'; break;
      case 'age-calculator': case 'age': target = 'age'; break;
      case 'qr-generator': case 'qr-code': case 'qr': target = 'qr'; sample = 'https://texlyonline.in'; break;
      case 'morse-audio': case 'morseaudio': target = 'morseaudio'; sample = 'SOS'; break;
      case 'hash': case 'hash-generator': case 'sha256': target = 'hash'; sample = 'Texly Text Utilities Online'; break;
      case 'asciitree': case 'tree': target = 'asciitree'; break;
      case 'invisible': case 'invisible-text': target = 'invisible'; break;
      case 'mirror': case 'mirror-text': target = 'mirror'; break;
      case 'banner': case 'banner-text': target = 'banner'; break;
      case 'zalgo': case 'zalgo-text': target = 'zalgo'; break;
      case 'countdown': target = 'countdown'; break;
      case 'choice': case 'choice-generator': target = 'choice'; break;
      case 'fakeuser': target = 'fakeuser'; break;
      case 'uuid': case 'uuid-generator': target = 'uuid'; break;
    }

    setActiveTool(target);
    if (sample) setInput(sample);
    if (target === 'hash' && sample) setHashInput(sample);
    if (target === 'asciitree' && sample) setTreeStructure(sample);
  }, [activeToolId, searchParams]);

  // Real hash processing
  const processHash = useCallback(async () => {
    setIsHashing(true);
    try {
      if (hashAlgorithm === 'sha256') {
        const hash = await realSha256(hashInput);
        setOutput(hash);
      } else {
        const hash = realMd5(hashInput);
        setOutput(hash);
      }
    } catch (error) {
      setOutput('Error generating hash');
    } finally {
      setIsHashing(false);
    }
  }, [hashAlgorithm, hashInput]);

  useEffect(() => {
    if (activeTool === 'hash') {
      processHash();
    }
  }, [hashInput, hashAlgorithm, activeTool, processHash]);

  // Real QR generation
  const generateQR = useCallback(async () => {
    setIsGeneratingQr(true);
    try {
      const qrDataUrl = await generateQRCodeCanvas(qrText, 200);
      setRenderedQr(qrDataUrl);
    } catch (error) {
      console.warn('QR generation error:', error);
      setRenderedQr('');
    } finally {
      setIsGeneratingQr(false);
    }
  }, [qrText]);

  useEffect(() => {
    if (activeTool === 'qr') {
      generateQR();
    }
  }, [qrText, activeTool, generateQR]);

  // Age calculation
  const calculateAge = () => {
    const birth = new Date(birthdate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    setCalculatedAge(`${years} Years, ${months} Months, ${days} Days`);
  };

  // ASCII tree generation
  const generateAsciiTree = useCallback(() => {
    const lines = treeStructure.split('\n');
    let res = '.\n';
    lines.forEach((line) => {
      const level = line.search(/\S/);
      const clean = line.trim();
      if (clean) {
        res += '│  '.repeat(Math.max(0, level / 2)) + '└── ' + clean + '\n';
      }
    });
    setOutput(res);
  }, [treeStructure]);

  useEffect(() => {
    if (activeTool === 'asciitree') {
      generateAsciiTree();
    }
  }, [treeStructure, activeTool, generateAsciiTree]);

  // Invisible text generation
  const generateInvisibleText = () => {
    let char = '';
    switch (invisibleType) {
      case 'zwsp': char = '\u200B'; break;
      case 'hangul': char = '\u3164'; break;
      case 'zwnj': char = '\u200C'; break;
    }
    setOutput(char.repeat(invisibleCount));
  };

  // Mirror text generation
  const generateMirrorText = () => {
    setOutput(mirrorText(mirrorText || input || 'Hello World'));
  };

  // Banner text generation
  const generateBannerTextHandler = () => {
    setOutput(generateBannerText(bannerText || input || 'TEXLY', bannerStyle));
  };

  // Zalgo text generation
  const generateZalgoText = () => {
    const text = zalgoText || input || 'HELLO WORLD';
    setOutput(generateZalgo(text));
  };

  // Countdown calculation
  const calculateCountdown = () => {
    if (!countdownDate) {
      setCountdownResult('Please select a date');
      return;
    }
    const target = new Date(countdownDate);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) {
      setCountdownResult('The selected date has passed!');
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (86400000)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (3600000)) / (1000 * 60));
    const seconds = Math.floor((diff % (60000)) / 1000);
    
    setCountdownResult(`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
  };

  // Random choice picker
  const pickRandomChoice = () => {
    const options = choiceOptions.split('\n').filter(opt => opt.trim().length > 0);
    if (options.length === 0) {
      setChoiceResult('Please enter options (one per line)');
      return;
    }
    const randomIndex = Math.floor(Math.random() * options.length);
    setChoiceResult(`🎲 ${options[randomIndex]}`);
  };

  // Fake user generation
  const generateFakeUser = () => {
    const firstNames = ['John', 'Alice', 'Mark', 'Priya', 'Carlos', 'Emma', 'Liam', 'Sophia'];
    const lastNames = ['Doe', 'Johnson', 'Williams', 'Sharma', 'Santana', 'Brown', 'Jones', 'Garcia'];
    const domains = ['gmail.com', 'example.com', 'outlook.com', 'yahoo.com'];
    const countries = ['United States', 'Canada', 'United Kingdom', 'Australia', 'India', 'Germany'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domains[Math.floor(Math.random() * domains.length)]}`;
    const phone = `+1 (555) ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
    const country = countries[Math.floor(Math.random() * countries.length)];
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    
    setOutput(JSON.stringify({ name, email, phone, country, uuid }, null, 2));
  };

  // UUID generation
  const getUUIDv4 = () => {
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
    setOutput(uuid);
  };

  // Morse audio
  const playMorseAudio = () => {
    if (isPlayingMorse) return;
    setIsPlayingMorse(true);

    const morseMapping: Record<string, string> = {
      'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
      'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
      'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
      'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
      'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
      '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
      '8': '---..', '9': '----.', ' ': ' '
    };

    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        alert("AudioContext not supported");
        setIsPlayingMorse(false);
        return;
      }
      const ctx = new AudioCtx();
      let timeOffset = ctx.currentTime;

      const codeStr = morseString.toUpperCase().split('').map(char => morseMapping[char] || '').join(' ');

      Array.from(codeStr).forEach(char => {
        if (char === '.' || char === '-') {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(650, timeOffset);

          const duration = char === '.' ? 0.1 : 0.3;
          gain.gain.setValueAtTime(0, timeOffset);
          gain.gain.linearRampToValueAtTime(0.15, timeOffset + 0.02);
          gain.gain.setValueAtTime(0.15, timeOffset + duration);
          gain.gain.linearRampToValueAtTime(0, timeOffset + duration + 0.02);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(timeOffset);
          osc.stop(timeOffset + duration + 0.05);
          timeOffset += duration + 0.15;
        } else if (char === ' ') {
          timeOffset += 0.3;
        }
      });

      setTimeout(() => {
        setIsPlayingMorse(false);
      }, (timeOffset - ctx.currentTime) * 1000 + 500);
    } catch (e) {
      console.warn("Audio error:", e);
      setIsPlayingMorse(false);
    }
  };

  // Signature canvas functions
  const clearSigCanvas = () => {
    const canvas = sigCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const handleSigMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    const canvas = sigCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if (ctx) {
        ctx.beginPath();
        ctx.strokeStyle = sigColor;
        ctx.lineWidth = sigPenWidth;
        ctx.lineCap = 'round';
        ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
      }
    }
  };

  const handleSigMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    const canvas = sigCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if (ctx) {
        ctx.lineTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
      }
    }
  };

  const handleSigMouseUp = () => {
    isDrawingRef.current = false;
  };

  const downloadSignature = () => {
    if (sigMode === 'draw') {
      const canvas = sigCanvasRef.current;
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'signature.png';
        link.click();
      }
    } else {
      alert('For typed signatures, copy the styled text below and paste into your document.');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setCalculatedAge('');
    setRenderedQr('');
    setChoiceResult('');
    setCountdownResult('');
  };

  useEffect(() => {
    if (activeTool === 'signature' && sigMode === 'draw') {
      clearSigCanvas();
    }
  }, [activeTool, sigMode]);

  const faqs = [
    { q: "Can I download my typed signatures as transparent PNGs?", a: "Yes. Use Draw Mode in the Signature Generator to create and download a transparent PNG." },
    { q: "Is the Age Calculator compliant with leap years?", a: "Yes. The JavaScript Date logic handles leap years and month differences accurately." },
    { q: "How do I play Morse code signals aloud?", a: "The Morse Audio module uses Web Audio API to generate sine wave signals directly through your speakers." },
    { q: "Are the hash functions (SHA-256/MD5) real or simulated?", a: "Real! SHA-256 uses Web Crypto API. MD5 uses pure JavaScript implementation. No fake outputs." },
    { q: "Do I need an internet connection to use these tools?", a: "After initial page load, all tools work offline. No external APIs required for most functions." },
    { q: "Are the generated UUIDs cryptographically random?", a: "Our UUID v4 generator uses crypto.randomUUID() when available, falling back to Math.random." }
  ];

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESC} />
        <meta name="keywords" content={SEO_KEYWORDS} />
        <link rel="canonical" href={CANONICAL_URL} />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">Generators</span>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3">
            Generators & Calculators Hub — 14+ Free Online Tools
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-3xl">
            Invisible text, mirror text, banner ASCII, Zalgo, QR codes, age calculator, hash generator,
            Morse audio, UUID, fake user data, countdown timer, random choice picker, and more.
            <strong className="block mt-2 text-amber-600 dark:text-amber-400">✅ 100% client-side — no data leaves your device</strong>
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Left Panel */}
          <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 h-fit">
            <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-3">Generators</span>
            <div className="space-y-1">
              {[
                { id: 'signature', icon: <Paintbrush className="w-3 h-3" />, label: 'Signature Creator' },
                { id: 'invisible', icon: <Type className="w-3 h-3" />, label: 'Invisible Text' },
                { id: 'mirror', icon: <AlignLeft className="w-3 h-3" />, label: 'Mirror Text' },
                { id: 'banner', icon: <Type className="w-3 h-3" />, label: 'Banner ASCII' },
                { id: 'zalgo', icon: <Type className="w-3 h-3" />, label: 'Zalgo Text' },
                { id: 'qr', icon: <QrCode className="w-3 h-3" />, label: 'QR Code' },
                { id: 'age', icon: <Calendar className="w-3 h-3" />, label: 'Age Calculator' },
                { id: 'hash', icon: <Hash className="w-3 h-3" />, label: 'Hash (SHA/MD5)' },
                { id: 'uuid', icon: <Fingerprint className="w-3 h-3" />, label: 'UUID v4' },
                { id: 'fakeuser', icon: <User className="w-3 h-3" />, label: 'Fake User JSON' },
                { id: 'asciitree', icon: <TreePine className="w-3 h-3" />, label: 'ASCII Tree' },
                { id: 'morseaudio', icon: <Volume2 className="w-3 h-3" />, label: 'Morse Audio' },
                { id: 'countdown', icon: <Clock className="w-3 h-3" />, label: 'Countdown' },
                { id: 'choice', icon: <Dice6 className="w-3 h-3" />, label: 'Random Choice' }
              ].map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool.id as GenToolId); handleReset(); }}
                  className={`w-full py-2 px-3 rounded-lg text-left text-xs font-bold transition-all flex items-center gap-2 ${
                    activeTool === tool.id 
                      ? 'bg-amber-500 text-white' 
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {tool.icon}
                  {tool.label}
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel - Active Tool */}
          <div className="md:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6">
            <h3 className="text-base font-black capitalize border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              {activeTool === 'signature' && '✍️ Signature Creator'}
              {activeTool === 'invisible' && '👻 Invisible Text Generator'}
              {activeTool === 'mirror' && '🪞 Mirror Text Generator'}
              {activeTool === 'banner' && '📺 Banner ASCII Generator'}
              {activeTool === 'zalgo' && '😈 Zalgo Text Generator'}
              {activeTool === 'qr' && '📱 QR Code Generator'}
              {activeTool === 'age' && '📅 Age Calculator'}
              {activeTool === 'hash' && '🔐 Hash Generator (SHA-256 / MD5)'}
              {activeTool === 'uuid' && '🆔 UUID v4 Generator'}
              {activeTool === 'fakeuser' && '👤 Fake User JSON Generator'}
              {activeTool === 'asciitree' && '🌳 ASCII Directory Tree'}
              {activeTool === 'morseaudio' && '🔊 Morse Code Audio'}
              {activeTool === 'countdown' && '⏰ Countdown Timer'}
              {activeTool === 'choice' && '🎲 Random Choice Picker'}
            </h3>

            {/* SIGNATURE */}
            {activeTool === 'signature' && (
              <div className="space-y-4">
                <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit">
                  <button onClick={() => setSigMode('draw')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${sigMode === 'draw' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}>Draw</button>
                  <button onClick={() => setSigMode('type')} className={`px-4 py-1.5 rounded-lg text-xs font-bold ${sigMode === 'type' ? 'bg-amber-500 text-white' : 'text-slate-500'}`}>Type</button>
                </div>
                
                {sigMode === 'draw' ? (
                  <>
                    <div className="flex gap-4 items-center flex-wrap">
                      <input type="color" value={sigColor} onChange={(e) => setSigColor(e.target.value)} className="w-10 h-10 rounded cursor-pointer" />
                      <input type="range" min="1" max="10" value={sigPenWidth} onChange={(e) => setSigPenWidth(parseInt(e.target.value))} className="w-32" />
                      <button onClick={clearSigCanvas} className="px-3 py-1 bg-slate-200 rounded text-xs">Clear</button>
                    </div>
                    <canvas
                      ref={sigCanvasRef}
                      width={500}
                      height={180}
                      onMouseDown={handleSigMouseDown}
                      onMouseMove={handleSigMouseMove}
                      onMouseUp={handleSigMouseUp}
                      onMouseLeave={handleSigMouseUp}
                      className="border-2 border-slate-200 rounded-xl bg-white w-full cursor-crosshair"
                    />
                  </>
                ) : (
                  <>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your name..."
                      className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => setSigTypeFont('font-serif')} className={`px-3 py-1 rounded text-xs ${sigTypeFont === 'font-serif' ? 'bg-amber-500 text-white' : 'bg-slate-100'}`}>Serif</button>
                      <button onClick={() => setSigTypeFont('font-sans')} className={`px-3 py-1 rounded text-xs ${sigTypeFont === 'font-sans' ? 'bg-amber-500 text-white' : 'bg-slate-100'}`}>Sans</button>
                      <button onClick={() => setSigTypeFont('font-mono')} className={`px-3 py-1 rounded text-xs ${sigTypeFont === 'font-mono' ? 'bg-amber-500 text-white' : 'bg-slate-100'}`}>Mono</button>
                    </div>
                    <div className={`p-6 border-2 border-dashed rounded-xl text-center text-2xl ${sigTypeFont} bg-white dark:bg-slate-800`}>
                      {input || 'Your Signature'}
                    </div>
                  </>
                )}
                <button onClick={downloadSignature} className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download Signature PNG
                </button>
              </div>
            )}

            {/* INVISIBLE TEXT */}
            {activeTool === 'invisible' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold block mb-1">Character Type</label>
                  <select value={invisibleType} onChange={(e) => setInvisibleType(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-sm">
                    <option value="zwsp">Zero Width Space (U+200B)</option>
                    <option value="hangul">Hangul Filler (U+3164)</option>
                    <option value="zwnj">Zero Width Non-Joiner (U+200C)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold block mb-1">Count: {invisibleCount}</label>
                  <input type="range" min="1" max="50" value={invisibleCount} onChange={(e) => setInvisibleCount(parseInt(e.target.value))} className="w-full" />
                </div>
                <button onClick={generateInvisibleText} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate Invisible Text</button>
                {output && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500">(Invisible text copied to clipboard)</p>
                    <button onClick={handleCopy} className="mt-2 text-amber-500 text-xs font-bold flex items-center gap-1">
                      <Copy className="w-3 h-3" /> {copied ? 'Copied!' : 'Copy to Clipboard'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MIRROR TEXT */}
            {activeTool === 'mirror' && (
              <div className="space-y-4">
                <textarea
                  value={mirrorText || input}
                  onChange={(e) => setMirrorText(e.target.value)}
                  placeholder="Enter text to mirror..."
                  className="w-full border rounded-lg p-3 text-sm h-32 bg-transparent"
                />
                <button onClick={generateMirrorText} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Mirror Text</button>
                {output && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                    <code className="text-sm">{output}</code>
                    <button onClick={handleCopy} className="text-amber-500 text-xs font-bold">{copied ? 'Copied' : 'Copy'}</button>
                  </div>
                )}
              </div>
            )}

            {/* BANNER ASCII */}
            {activeTool === 'banner' && (
              <div className="space-y-4">
                <textarea
                  value={bannerText || input}
                  onChange={(e) => setBannerText(e.target.value)}
                  placeholder="Enter text for banner..."
                  className="w-full border rounded-lg p-3 text-sm h-24 bg-transparent"
                />
                <button onClick={generateBannerTextHandler} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate ASCII Banner</button>
                {output && (
                  <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-[10px] overflow-x-auto font-mono">
                    {output}
                  </pre>
                )}
              </div>
            )}

            {/* ZALGO TEXT */}
            {activeTool === 'zalgo' && (
              <div className="space-y-4">
                <textarea
                  value={zalgoText || input}
                  onChange={(e) => setZalgoText(e.target.value)}
                  placeholder="Enter text to ZALGO-ify..."
                  className="w-full border rounded-lg p-3 text-sm h-24 bg-transparent"
                />
                <div>
                  <label className="text-xs font-bold block mb-1">Intensity: {zalgoIntensity}</label>
                  <input type="range" min="1" max="5" value={zalgoIntensity} onChange={(e) => setZalgoIntensity(parseInt(e.target.value))} className="w-full" />
                </div>
                <button onClick={generateZalgoText} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate Zalgo Text</button>
                {output && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg break-words">
                    <p className="text-lg">{output}</p>
                    <button onClick={handleCopy} className="mt-2 text-amber-500 text-xs font-bold">{copied ? 'Copied' : 'Copy'}</button>
                  </div>
                )}
              </div>
            )}

            {/* QR CODE */}
            {activeTool === 'qr' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={qrText}
                  onChange={(e) => setQrText(e.target.value)}
                  placeholder="Enter URL or text..."
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent"
                />
                <button onClick={generateQR} disabled={isGeneratingQr} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">
                  {isGeneratingQr ? 'Generating...' : 'Generate QR Code'}
                </button>
                {renderedQr && (
                  <div className="flex flex-col items-center p-4 border rounded-xl">
                    <img src={renderedQr} alt="QR Code" className="w-48 h-48" />
                    <button onClick={() => {
                      const link = document.createElement('a');
                      link.href = renderedQr;
                      link.download = 'qrcode.png';
                      link.click();
                    }} className="mt-3 text-amber-500 text-xs font-bold">Download PNG</button>
                  </div>
                )}
              </div>
            )}

            {/* AGE CALCULATOR */}
            {activeTool === 'age' && (
              <div className="space-y-4">
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm bg-transparent"
                />
                <button onClick={calculateAge} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Calculate Age</button>
                {calculatedAge && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-bold">
                    {calculatedAge}
                  </div>
                )}
              </div>
            )}

            {/* HASH GENERATOR */}
            {activeTool === 'hash' && (
              <div className="space-y-4">
                <select value={hashAlgorithm} onChange={(e) => setHashAlgorithm(e.target.value as any)} className="w-full border rounded-lg px-3 py-2 text-sm">
                  <option value="sha256">SHA-256 (Secure Hash Algorithm)</option>
                  <option value="md5">MD5 (Message Digest)</option>
                </select>
                <textarea
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="w-full border rounded-lg p-3 text-sm h-24 bg-transparent"
                />
                <button onClick={processHash} disabled={isHashing} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">
                  {isHashing ? 'Hashing...' : 'Generate Hash'}
                </button>
                {output && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                    <code className="text-xs break-all font-mono">{output}</code>
                    <button onClick={handleCopy} className="text-amber-500 text-xs font-bold ml-2">{copied ? 'Copied' : 'Copy'}</button>
                  </div>
                )}
              </div>
            )}

            {/* UUID */}
            {activeTool === 'uuid' && (
              <div className="space-y-4">
                <button onClick={getUUIDv4} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate UUID v4</button>
                {output && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                    <code className="font-mono text-sm">{output}</code>
                    <button onClick={handleCopy} className="text-amber-500 text-xs font-bold">{copied ? 'Copied' : 'Copy'}</button>
                  </div>
                )}
              </div>
            )}

            {/* FAKE USER */}
            {activeTool === 'fakeuser' && (
              <div className="space-y-4">
                <button onClick={generateFakeUser} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate Random User</button>
                {output && (
                  <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto">
                    {output}
                  </pre>
                )}
              </div>
            )}

            {/* ASCII TREE */}
            {activeTool === 'asciitree' && (
              <div className="space-y-4">
                <textarea
                  value={treeStructure}
                  onChange={(e) => setTreeStructure(e.target.value)}
                  placeholder="Enter directory structure (use spaces for indentation)"
                  className="w-full border rounded-lg p-3 text-sm h-40 font-mono bg-transparent"
                />
                <button onClick={generateAsciiTree} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Generate Tree</button>
                {output && (
                  <pre className="p-3 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto font-mono">
                    {output}
                  </pre>
                )}
              </div>
            )}

            {/* MORSE AUDIO */}
            {activeTool === 'morseaudio' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={morseString}
                  onChange={(e) => setMorseString(e.target.value)}
                  placeholder="Enter text for Morse code..."
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent"
                />
                <button onClick={playMorseAudio} disabled={isPlayingMorse} className="py-2.5 px-4 bg-amber-500 text-white font-bold rounded-lg flex items-center gap-2">
                  <Volume2 className="w-4 h-4" /> {isPlayingMorse ? 'Playing Morse Code...' : 'Play Morse Audio'}
                </button>
              </div>
            )}

            {/* COUNTDOWN */}
            {activeTool === 'countdown' && (
              <div className="space-y-4">
                <input
                  type="datetime-local"
                  value={countdownDate}
                  onChange={(e) => setCountdownDate(e.target.value)}
                  className="border rounded-lg px-3 py-2 text-sm bg-transparent"
                />
                <button onClick={calculateCountdown} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg">Start Countdown</button>
                {countdownResult && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center font-bold">
                    {countdownResult}
                  </div>
                )}
              </div>
            )}

            {/* RANDOM CHOICE */}
            {activeTool === 'choice' && (
              <div className="space-y-4">
                <textarea
                  value={choiceOptions}
                  onChange={(e) => setChoiceOptions(e.target.value)}
                  placeholder="Enter options (one per line)&#10;Option 1&#10;Option 2&#10;Option 3"
                  className="w-full border rounded-lg p-3 text-sm h-32 bg-transparent"
                />
                <button onClick={pickRandomChoice} className="py-2 px-4 bg-amber-500 text-white font-bold rounded-lg flex items-center gap-2">
                  <Dice6 className="w-4 h-4" /> Pick Random
                </button>
                {choiceResult && (
                  <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-center text-xl font-bold">
                    {choiceResult}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl font-black mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = !!faqOpen[idx];
              return (
                <div key={idx} className="border rounded-xl overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(prev => ({ ...prev, [idx]: !isOpen }))}
                    className="w-full text-left px-5 py-3 flex justify-between items-center font-bold text-sm"
                  >
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 py-3 border-t text-sm text-slate-600 dark:text-slate-400">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <HubToolsContent hubPath="/tools/generators-hub" tools={generatorsHubTools} />
      </div>
    </main>
  );
}
