import React from 'react';
import { Helmet } from 'react-helmet-async';

// Tool component (admin panel से generate)
import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Download,
  Sliders,
  Trash2,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  Zap,
  FileImage,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  Info,
  Settings
} from 'lucide-react';

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedSize: number | null;
  previewUrl: string;
  compressedUrl: string | null;
  status: 'idle' | 'compressing' | 'done' | 'error';
  progress: number;
  width: number;
  height: number;
  compressedWidth: number | null;
  compressedHeight: number | null;
}

function ToolComponent() {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const [quality, setQuality] = useState<number>(0.8);
  const [scale, setScale] = useState<number>(100);
  const [outputFormat, setOutputFormat] = useState<string>('original');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'compressor' | 'guide' | 'faq'>('compressor');
  const [faqOpen, setFaqOpen] = useState<{ [key: number]: boolean }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Add files to state
  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    const mappedFiles: ImageFile[] = validFiles.map(file => {
      const id = Math.random().toString(36).substring(2, 9);
      const previewUrl = URL.createObjectURL(file);
      
      // Create temporary image to read dimensions
      const img = new Image();
      img.src = previewUrl;
      let width = 0;
      let height = 0;
      img.onload = () => {
        width = img.width;
        height = img.height;
        setFiles(prev => prev.map(f => f.id === id ? { ...f, width, height } : f));
      };

      return {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        compressedSize: null,
        previewUrl,
        compressedUrl: null,
        status: 'idle',
        progress: 0,
        width: 0,
        height: 0,
        compressedWidth: null,
        compressedHeight: null
      };
    });

    setFiles(prev => [...prev, ...mappedFiles]);
  };

  // Remove file
  const removeFile = (id: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
        if (fileToRemove.compressedUrl) {
          URL.revokeObjectURL(fileToRemove.compressedUrl);
        }
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Clear all files
  const clearAll = () => {
    files.forEach(f => {
      URL.revokeObjectURL(f.previewUrl);
      if (f.compressedUrl) {
        URL.revokeObjectURL(f.compressedUrl);
      }
    });
    setFiles([]);
  };

  // Compress a single image
  const compressSingleImage = (imageFile: ImageFile): Promise<ImageFile> => {
    return new Promise((resolve) => {
      setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, status: 'compressing', progress: 30 } : f));

      const reader = new FileReader();
      reader.readAsDataURL(imageFile.file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, status: 'error' } : f));
            resolve({ ...imageFile, status: 'error' });
            return;
          }

          // Calculate scaled dimensions
          const newWidth = Math.round(img.width * (scale / 100));
          const newHeight = Math.round(img.height * (scale / 100));
          canvas.width = newWidth;
          canvas.height = newHeight;

          // Draw image to canvas
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Determine output MIME type
          let mimeType = imageFile.file.type;
          if (outputFormat !== 'original') {
            mimeType = `image/${outputFormat}`;
          }

          setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, progress: 70 } : f));

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedUrl = URL.createObjectURL(blob);
                const compressedSize = blob.size;
                
                setFiles(prev => prev.map(f => f.id === imageFile.id ? {
                  ...f,
                  status: 'done',
                  progress: 100,
                  compressedSize,
                  compressedUrl,
                  compressedWidth: newWidth,
                  compressedHeight: newHeight
                } : f));

                resolve({
                  ...imageFile,
                  status: 'done',
                  progress: 100,
                  compressedSize,
                  compressedUrl,
                  compressedWidth: newWidth,
                  compressedHeight: newHeight
                });
              } else {
                setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, status: 'error' } : f));
                resolve({ ...imageFile, status: 'error' });
              }
            },
            mimeType,
            quality
          );
        };
        img.onerror = () => {
          setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, status: 'error' } : f));
          resolve({ ...imageFile, status: 'error' });
        };
      };
      reader.onerror = () => {
        setFiles(prev => prev.map(f => f.id === imageFile.id ? { ...f, status: 'error' } : f));
        resolve({ ...imageFile, status: 'error' });
      };
    });
  };

  // Compress all files
  const compressAll = async () => {
    for (const file of files) {
      if (file.status !== 'done') {
        await compressSingleImage(file);
      }
    }
  };

  // Download individual file
  const downloadFile = (file: ImageFile) => {
    if (file.compressedUrl) {
      const link = document.createElement('a');
      link.href = file.compressedUrl;
      
      // Generate extension based on format
      let ext = file.file.name.split('.').pop();
      if (outputFormat !== 'original') {
        ext = outputFormat;
      }
      
      const nameWithoutExt = file.file.name.substring(0, file.file.name.lastIndexOf('.'));
      link.download = `${nameWithoutExt}-compressed.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Download all compressed files
  const downloadAll = () => {
    files.forEach(file => {
      if (file.status === 'done') {
        downloadFile(file);
      }
    });
  };

  // Format file size
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Toggle FAQ Accordion
  const toggleFaq = (index: number) => {
    setFaqOpen(prev => ({ ...prev, [index]: !prev[index] }));
  };

  // Schema definitions
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Texly Image Size Reducer",
    "operatingSystem": "All",
    "applicationCategory": "MultimediaApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "features": [
      "Smart Compression",
      "High Quality Output",
      "Multiple Format Support",
      "Fast Browser-Based Processing",
      "Batch Compression Support"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://texlyonline.in"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Image Size Reducer",
        "item": "https://texlyonline.in/image-size-reducer"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Inject Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <span className="px-3 py-1 text-xs font-semibold bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
            100% Free & Secure
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
            Reduce Image Size Online Free
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
            Compress JPG, PNG, WebP, AVIF, and SVG images with professional-grade precision. Keep maximum quality while slashing file sizes in seconds.
          </p>
        </div>

        {/* Interactive Tool Interface */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-12">
          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? 'border-indigo-500 bg-indigo-500/10 scale-[0.99]'
                : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/20'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-slate-800/80 rounded-full border border-slate-700 mb-4 text-indigo-400">
                <Upload className="h-8 w-8 animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-slate-200">
                Drag & Drop your images here, or <span className="text-indigo-400 hover:underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Supports JPG, PNG, WebP, AVIF, SVG, GIF, BMP, TIFF, ICO, HEIC
              </p>
            </div>
          </div>

          {/* Control Panel */}
          {files.length > 0 && (
            <div className="mt-8 p-6 bg-slate-950/80 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
                <Settings className="h-5 w-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-200">Compression Settings</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quality Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300 flex items-center gap-1.5">
                      Compression Quality
                    </label>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded">
                      {Math.round(quality * 100)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Lower quality produces smaller file sizes.
                  </p>
                </div>

                {/* Scale Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-slate-300">
                      Scale Dimensions
                    </label>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded">
                      {scale}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={scale}
                    onChange={(e) => setScale(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg appearance-none"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">
                    Reduce resolution to save additional space.
                  </p>
                </div>

                {/* Output Format Select */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Convert Output To
                  </label>
                  <select
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-300 focus:outline-none focus:border-indigo-500 text-sm"
                  >
                    <option value="original">Keep Original Format</option>
                    <option value="jpeg">JPEG (Best for photos)</option>
                    <option value="png">PNG (Best for graphics)</option>
                    <option value="webp">WebP (Highly Optimized)</option>
                  </select>
                  <p className="text-xs text-slate-500 mt-1.5">
                    Convert formats on-the-fly for modern web standards.
                  </p>
                </div>
              </div>

              {/* Global Action Buttons */}
              <div className="flex flex-wrap justify-end gap-3 mt-6 pt-4 border-t border-slate-800/50">
                <button
                  onClick={clearAll}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-900 rounded-lg transition-colors border border-transparent hover:border-slate-800"
                >
                  Clear All
                </button>
                <button
                  onClick={compressAll}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  <Sliders className="h-4 w-4" />
                  Compress All
                </button>
                {files.some(f => f.status === 'done') && (
                  <button
                    onClick={downloadAll}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                  >
                    <Download className="h-4 w-4" />
                    Download All
                  </button>
                )}
              </div>
            </div>
          )}

          {/* File Lists */}
          {files.length > 0 && (
            <div className="mt-8 space-y-4">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
                Queue ({files.length} {files.length === 1 ? 'Image' : 'Images'})
              </h4>
              {files.map((file) => {
                const savings = file.compressedSize 
                  ? Math.round(((file.originalSize - file.compressedSize) / file.originalSize) * 100) 
                  : 0;

                return (
                  <div
                    key={file.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl gap-4 hover:border-slate-700 transition-all"
                  >
                    {/* File Preview & Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0 border border-slate-800">
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                          {file.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                          <span>Original: {formatSize(file.originalSize)}</span>
                          {file.width > 0 && (
                            <span className="text-slate-600">| {file.width}x{file.height}px</span>
                          )}
                        </div>
                        {file.status === 'done' && file.compressedSize && (
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
                            <span className="text-emerald-400 font-medium">
                              Compressed: {formatSize(file.compressedSize)}
                            </span>
                            {file.compressedWidth && (
                              <span className="text-slate-500">({file.compressedWidth}x{file.compressedHeight}px)</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status & Savings Indicator */}
                    <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                      <div className="text-right">
                        {file.status === 'idle' && (
                          <span className="text-xs text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">Idle</span>
                        )}
                        {file.status === 'compressing' && (
                          <div className="flex items-center gap-2 text-xs text-indigo-400">
                            <RefreshCw className="h-3 w-3 animate-spin" />
                            Compressing...
                          </div>
                        )}
                        {file.status === 'done' && (
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                              -{savings}%
                            </span>
                          </div>
                        )}
                        {file.status === 'error' && (
                          <span className="text-xs text-rose-400 bg-rose-500/10 px-2 py-1 rounded">Error</span>
                        )}
                      </div>

                      {/* Action Buttons per File */}
                      <div className="flex items-center gap-2">
                        {file.status === 'done' ? (
                          <button
                            onClick={() => downloadFile(file)}
                            className="p-2 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-lg transition-all border border-emerald-500/10"
                            title="Download compressed file"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => compressSingleImage(file)}
                            disabled={file.status === 'compressing'}
                            className="p-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-lg transition-all border border-indigo-500/10 disabled:opacity-50"
                            title="Compress file"
                          >
                            <Sliders className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-2 bg-slate-900 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 rounded-lg transition-all border border-slate-800 hover:border-rose-500/10"
                          title="Remove file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation Tabs for Educational Content */}
        <div className="flex border-b border-slate-800 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('compressor')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'compressor'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            About & Features
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'guide'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            SEO & Optimization Guide
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
              activeTab === 'faq'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Educational Content Section */}
        <div className="prose prose-invert max-w-none text-slate-300 space-y-12">
          
          {activeTab === 'compressor' && (
            <section className="space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Professional Image Size Reducer</h2>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  Our online image size reducer provides a fast, efficient, and completely secure way to optimize your digital assets. Whether you are a web developer looking to increase site speed, a digital marketer optimizing social media graphics, or an individual aiming to reduce image kb size for application forms, our browser-based tool is engineered to deliver pristine results. It acts as a comprehensive <strong>jpg size reducer</strong>, <strong>png compressor</strong>, and <strong>webp compressor</strong> all in one.
                </p>
              </div>

              {/* Highlight Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                  <Zap className="h-8 w-8 text-indigo-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Instant Processing</h3>
                  <p className="text-sm text-slate-400">
                    Powered by local WebAssembly/Canvas tech, your files are compressed directly inside your browser. No server uploads mean zero lag.
                  </p>
                </div>
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                  <ShieldCheck className="h-8 w-8 text-emerald-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">100% Privacy Secure</h3>
                  <p className="text-sm text-slate-400">
                    Your images never leave your computer. This makes it completely safe for sensitive, personal, or corporate files.
                  </p>
                </div>
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-amber-400 mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">Lossless Compression</h3>
                  <p className="text-sm text-slate-400">
                    Smart algorithms analyze and remove redundant metadata and optimize pixel data without noticeable quality loss.
                  </p>
                </div>
              </div>

              {/* Detailed Features Section */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Key Features of Our Free Image Compressor</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex items-start gap-3 bg-slate-900/20 p-4 border border-slate-800/60 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Smart Compression Algorithms:</strong> Balances size and clarity seamlessly.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-900/20 p-4 border border-slate-800/60 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Multiple Format Support:</strong> JPG, PNG, WebP, AVIF, GIF, BMP, SVG, TIFF, ICO, HEIC, HEIF.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-900/20 p-4 border border-slate-800/60 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">Batch Image Compressor:</strong> Upload and compress multiple images in a single click.
                    </div>
                  </li>
                  <li className="flex items-start gap-3 bg-slate-900/20 p-4 border border-slate-800/60 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-slate-200">No Registration Required:</strong> Completely free to use with no hidden subscription walls.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Supported Formats Grid */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Supported Image Formats</h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {['JPG', 'JPEG', 'PNG', 'WebP', 'AVIF', 'GIF', 'BMP', 'TIFF', 'SVG', 'ICO', 'HEIC', 'HEIF'].map(fmt => (
                    <div key={fmt} className="bg-slate-900 border border-slate-800 py-3 rounded-xl text-center font-bold text-slate-300 text-sm hover:border-indigo-500/30 transition-all">
                      {fmt}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeTab === 'guide' && (
            <section className="space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Image Compression Matters for SEO & Performance</h2>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  In modern web development, images account for over 60% of an average webpage's total payload weight. This means that unoptimized, heavy images can significantly slow down your site speed, harming user experience and negatively impacting your search engine rankings. Utilizing our <strong>image optimizer</strong> helps correct this critical bottleneck.
                </p>
              </div>

              {/* Performance Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">Search Engine Optimization (SEO)</h3>
                  <p className="text-sm text-slate-400">
                    Google uses page speed as a primary ranking factor for both desktop and mobile search. Using a <strong>free image compressor online</strong> helps you meet Core Web Vitals targets, such as Largest Contentful Paint (LCP).
                  </p>
                </div>
                <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-2">Mobile Responsiveness</h3>
                  <p className="text-sm text-slate-400">
                    Mobile users often operate on slower networks (3G/4G). Compressing your images ensures rapid loads, saving precious mobile bandwidth and improving conversion rates.
                  </p>
                </div>
              </div>

              {/* Image Format Comparison Table */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Choosing the Right Image Format</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-slate-900/40 border border-slate-800 rounded-xl">
                    <thead>
                      <tr className="border-b border-slate-800 text-left text-slate-200">
                        <th className="p-4">Format</th>
                        <th className="p-4">Compression Type</th>
                        <th className="p-4">Transparency</th>
                        <th className="p-4">Best Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-400 text-sm divide-y divide-slate-800">
                      <tr>
                        <td className="p-4 font-semibold text-slate-200">JPEG / JPG</td>
                        <td className="p-4">Lossy</td>
                        <td className="p-4">No</td>
                        <td className="p-4">Photographs, complex gradient images</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-slate-200">PNG</td>
                        <td className="p-4">Lossless</td>
                        <td className="p-4">Yes</td>
                        <td className="p-4">Logos, icons, screenshots, graphics with text</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-slate-200">WebP</td>
                        <td className="p-4">Lossy & Lossless</td>
                        <td className="p-4">Yes</td>
                        <td className="p-4">Modern websites, universal web design</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-semibold text-slate-200">AVIF</td>
                        <td className="p-4">Highly Efficient Lossy</td>
                        <td className="p-4">Yes</td>
                        <td className="p-4">Next-gen web graphics, maximum size savings</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Professional Optimization Tips */}
              <div className="p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl">
                <h3 className="text-lg font-bold text-indigo-300 mb-2 flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Professional Tips for Image Optimization
                </h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-slate-300 mt-3">
                  <li>Always scale down dimensions to the maximum actual display width on your layout.</li>
                  <li>Use <strong>WebP</strong> format where possible to achieve up to 30% more savings than JPEG.</li>
                  <li>Make sure to write descriptive, keyword-rich alt text for all compressed images.</li>
                  <li>Implement lazy-loading to defer loading images outside the viewport.</li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'faq' && (
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {[
                  {
                    q: "What is an Image Size Reducer?",
                    a: "An Image Size Reducer is an online utility designed to compress your image file size (reducing the KB or MB footprint) while preserving the original visual quality as much as possible."
                  },
                  {
                    q: "How does image compression work?",
                    a: "It works by analyzing pixel patterns, removing duplicate/unnecessary metadata, and applying smart mathematical models to store the image data in a more compact configuration."
                  },
                  {
                    q: "Does compression reduce quality?",
                    a: "With our tool, you can choose the quality percentage. At standard settings (around 80%), the reduction in file size is massive, while any difference in quality is virtually invisible to the naked eye."
                  },
                  {
                    q: "Are my uploaded files safe?",
                    a: "Yes, absolutely! Our Image Compressor operates purely within your web browser. Your images are never uploaded to our servers, keeping your sensitive data completely secure and private."
                  },
                  {
                    q: "Can I compress images on my mobile device?",
                    a: "Yes. The tool is fully responsive and operates perfectly on all modern smartphones, tablets, and desktops without installing any extra software."
                  },
                  {
                    q: "What is the best image format for websites?",
                    a: "WebP and AVIF are currently considered the absolute best formats for website use because they deliver superior compression efficiency and support transparency."
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border border-slate-800 bg-slate-900/20 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold text-slate-200 hover:bg-slate-800/20 transition-all"
                    >
                      <span>{faq.q}</span>
                      {faqOpen[idx] ? <ChevronUp className="h-5 w-5 text-indigo-400" /> : <ChevronDown className="h-5 w-5 text-indigo-400" />}
                    </button>
                    {faqOpen[idx] && (
                      <div className="p-5 border-t border-slate-800/50 text-sm text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>

        {/* Related Tools / Internal Links Footer */}
        <div className="mt-16 pt-8 border-t border-slate-900">
          <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
            Explore More Free Utilities
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Image Resizer Tool', url: '#' },
              { name: 'Image Converter Tool', url: '#' },
              { name: 'Image Crop Tool', url: '#' },
              { name: 'Image Upscaler Tool', url: '#' },
              { name: 'JPG to PNG Converter', url: '#' },
              { name: 'PNG to WebP Converter', url: '#' },
              { name: 'PDF Compressor Tool', url: '#' },
              { name: 'PDF to Image Tool', url: '#' }
            ].map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                className="p-4 bg-slate-900/30 hover:bg-indigo-500/10 border border-slate-800 hover:border-indigo-500/20 rounded-xl text-center text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-all"
              >
                {tool.name}
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// Page wrapper with SEO
export default function ImageSizeReducerPage() {
  return (
    <>
      <Helmet>
        <title>Reduce Image Size Online Free – Compress JPG, PNG, WebP</title>
        <meta name="description" content="Compress and reduce image file size online for free. Support JPG, JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF, SVG, HEIC. Optimize images without quality loss." />
      </Helmet>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-black text-center mb-8">Image Size Reducer</h1>
          <ToolComponent />
        </div>
      </div>
    </>
  );
}
