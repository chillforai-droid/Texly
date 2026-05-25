```tsx
import React, { useState, useEffect } from 'react';
import { 
  Copy, 
  Check, 
  Code, 
  FileJson, 
  Layers, 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  FileCode, 
  RefreshCw,
  Info,
  ExternalLink,
  BookOpen,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// --- TS Interfaces ---
interface SchemaField {
  key: string;
  label: string;
  type: 'text' | 'url' | 'date' | 'nested';
  placeholder: string;
  value: string;
  required: boolean;
  helpText?: string;
}

interface SchemaType {
  id: string;
  name: string;
  icon: string;
  description: string;
  fields: SchemaField[];
}

interface FAQ {
  question: string;
  answer: string;
}

export default function SchemaGenerator() {
  // --- Supported Schema Types ---
  const schemaTypes: SchemaType[] = [
    {
      id: 'article',
      name: 'Article',
      icon: '✍️',
      description: 'Optimized for news articles, blog posts, and tech write-ups.',
      fields: [
        { key: 'headline', label: 'Headline', type: 'text', placeholder: 'How to master Next.js App Router', value: '', required: true, helpText: 'Keep it descriptive, under 110 characters if possible.' },
        { key: 'author', label: 'Author Name', type: 'text', placeholder: 'Texly Expert Dev', value: '', required: true },
        { key: 'publisher', label: 'Publisher Name', type: 'text', placeholder: 'Texly SEO OS', value: '', required: true },
        { key: 'publisherLogo', label: 'Publisher Logo URL', type: 'url', placeholder: 'https://texly.co/logo.png', value: '', required: false },
        { key: 'datePublished', label: 'Published Date', type: 'date', placeholder: '', value: '', required: true },
        { key: 'dateModified', label: 'Modified Date', type: 'date', placeholder: '', value: '', required: false },
        { key: 'image', label: 'Featured Image URL', type: 'url', placeholder: 'https://texly.co/og-image.jpg', value: '', required: true },
        { key: 'description', label: 'Description', type: 'text', placeholder: 'A detailed step-by-step developer blueprint...', value: '', required: true }
      ]
    },
    {
      id: 'organization',
      name: 'Organization',
      icon: '🏢',
      description: 'Ideal for branding, company profiles, and brand identity SEO.',
      fields: [
        { key: 'name', label: 'Company Name', type: 'text', placeholder: 'Texly Inc.', value: '', required: true },
        { key: 'url', label: 'Official Website URL', type: 'url', placeholder: 'https://texly.co', value: '', required: true },
        { key: 'logo', label: 'Logo URL', type: 'url', placeholder: 'https://texly.co/logo.png', value: '', required: true },
        { key: 'sameAs', label: 'Social Profile URL (e.g., Twitter)', type: 'url', placeholder: 'https://twitter.com/texly_seo', value: '', required: false },
        { key: 'contactPhone', label: 'Support Phone Number', type: 'text', placeholder: '+1-555-0199', value: '', required: false },
        { key: 'contactType', label: 'Contact Type', type: 'text', placeholder: 'Customer Support', value: '', required: false }
      ]
    },
    {
      id: 'website',
      name: 'WebSite / SearchBox',
      icon: '🌐',
      description: 'Enables sitelinks searchbox and generic core sitename targeting.',
      fields: [
        { key: 'name', label: 'Website Name', type: 'text', placeholder: 'Texly', value: '', required: true },
        { key: 'url', label: 'Target URL', type: 'url', placeholder: 'https://texly.co', value: '', required: true },
        { key: 'searchTarget', label: 'Sitelinks Search Query Target', type: 'url', placeholder: 'https://texly.co/search?q={search_term_string}', value: '', required: false, helpText: 'Crucial for triggering the custom search field in Google Search Results.' }
      ]
    },
    {
      id: 'localbusiness',
      name: 'Local Business',
      icon: '📍',
      description: 'For physical brick-and-mortar storefronts and service locations.',
      fields: [
        { key: 'name', label: 'Business Name', type: 'text', placeholder: 'Texly Austin HQ', value: '', required: true },
        { key: 'image', label: 'Storefront Image URL', type: 'url', placeholder: 'https://texly.co/store.jpg', value: '', required: true },
        { key: 'streetAddress', label: 'Street Address', type: 'text', placeholder: '100 Congress Ave, Suite 2000', value: '', required: true },
        { key: 'addressLocality', label: 'City', type: 'text', placeholder: 'Austin', value: '', required: true },
        { key: 'addressRegion', label: 'State / Region (Code)', type: 'text', placeholder: 'TX', value: '', required: true },
        { key: 'postalCode', label: 'Postal Code', type: 'text', placeholder: '78701', value: '', required: true },
        { key: 'priceRange', label: 'Price Range', type: 'text', placeholder: '$$', value: '', required: false, helpText: '$, $$, $$$, or $$$$' },
        { key: 'telephone', label: 'Business Phone', type: 'text', placeholder: '+1-512-555-0143', value: '', required: true }
      ]
    }
  ];

  // --- React State Hooks ---
  const [selectedTypeId, setSelectedTypeId] = useState<string>('article');
  const [fieldsState, setFieldsState] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState<'nextjs' | 'jsonld'>('nextjs');
  const [copied, setCopied] = useState<boolean>(false);
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Initialize and Reset Fields State when Schema Type changes
  useEffect(() => {
    const activeSchema = schemaTypes.find(s => s.id === selectedTypeId);
    if (activeSchema) {
      const initialFields: { [key: string]: string } = {};
      activeSchema.fields.forEach(field => {
        initialFields[field.key] = field.value || '';
      });
      setFieldsState(initialFields);
    }
  }, [selectedTypeId]);

  // Handle Dynamic Form Updates
  const handleInputChange = (key: string, val: string) => {
    setFieldsState(prev => ({
      ...prev,
      [key]: val
    }));
  };

  // Populate Mock Data helper
  const loadMockData = () => {
    const activeSchema = schemaTypes.find(s => s.id === selectedTypeId);
    if (!activeSchema) return;

    const mockDataset: { [key: string]: string } = {
      headline: 'Next.js 14 App Router Dynamic SEO Mastery Blueprint',
      author: 'Guillermo Texly',
      publisher: 'Texly SEO OS Engine',
      publisherLogo: 'https://texly.co/assets/logo-brand.png',
      datePublished: new Date().toISOString().split('T')[0],
      dateModified: new Date().toISOString().split('T')[0],
      image: 'https://texly.co/cdn/nextjs-seo-blueprint.jpg',
      description: 'Master SEO schema in the Next.js App Router paradigm. Explore metadata orchestration, structured JSON-LD bindings, and rapid indexation strategies.',
      name: 'Texly Dev Studio Inc.',
      url: 'https://texly.co',
      logo: 'https://texly.co/assets/logo-brand.png',
      sameAs: 'https://github.com/texly-seo',
      contactPhone: '+1-800-555-TEXLY',
      contactType: 'SEO Support Team',
      searchTarget: 'https://texly.co/search?q={search_term_string}',
      streetAddress: '701 Brazos St Suite 1600',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      priceRange: '$$$',
      telephone: '+1-512-988-9221'
    };

    const loadedFields: { [key: string]: string } = {};
    activeSchema.fields.forEach(f => {
      loadedFields[f.key] = mockDataset[f.key] || '';
    });
    setFieldsState(loadedFields);
  };

  // Check verification state
  const activeSchema = schemaTypes.find(s => s.id === selectedTypeId);
  const missingRequiredFields = activeSchema
    ? activeSchema.fields.filter(f => f.required && !fieldsState[f.key])
    : [];

  // --- Generator Functions ---
  const generateJSONLDString = (): string => {
    if (!activeSchema) return '';

    let schemaObject: any = {
      '@context': 'https://schema.org',
      '@type': activeSchema.id === 'article' ? 'TechArticle' : activeSchema.id === 'organization' ? 'Organization' : activeSchema.id === 'website' ? 'WebSite' : 'LocalBusiness',
    };

    // Construct specific properties
    if (selectedTypeId === 'article') {
      schemaObject = {
        ...schemaObject,
        headline: fieldsState.headline || 'Undefined Headline',
        description: fieldsState.description || 'Undefined Description',
        image: fieldsState.image ? [fieldsState.image] : [],
        datePublished: fieldsState.datePublished || new Date().toISOString(),
        dateModified: fieldsState.dateModified || fieldsState.datePublished || new Date().toISOString(),
        author: {
          '@type': 'Person',
          name: fieldsState.author || 'Anonymous',
          url: 'https://texly.co'
        },
        publisher: {
          '@type': 'Organization',
          name: fieldsState.publisher || 'Texly OS',
          logo: {
            '@type': 'ImageObject',
            url: fieldsState.publisherLogo || 'https://texly.co/logo.png'
          }
        }
      };
    } else if (selectedTypeId === 'organization') {
      schemaObject = {
        ...schemaObject,
        name: fieldsState.name || 'Undefined Organization',
        url: fieldsState.url || 'https://texly.co',
        logo: fieldsState.logo || 'https://texly.co/logo.png',
        sameAs: fieldsState.sameAs ? [fieldsState.sameAs] : []
      };
      if (fieldsState.contactPhone) {
        schemaObject.contactPoint = {
          '@type': 'ContactPoint',
          telephone: fieldsState.contactPhone,
          contactType: fieldsState.contactType || 'Customer Service'
        };
      }
    } else if (selectedTypeId === 'website') {
      schemaObject = {
        ...schemaObject,
        name: fieldsState.name || 'WebSite',
        url: fieldsState.url || 'https://texly.co'
      };
      if (fieldsState.searchTarget) {
        schemaObject.potentialAction = {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: fieldsState.searchTarget
          },
          'query-input': 'required name=search_term_string'
        };
      }
    } else if (selectedTypeId === 'localbusiness') {
      schemaObject = {
        ...schemaObject,
        name: fieldsState.name || 'Local Business',
        image: fieldsState.image || 'https://texly.co/store.jpg',
        telephone: fieldsState.telephone || '',
        priceRange: fieldsState.priceRange || '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: fieldsState.streetAddress || '',
          addressLocality: fieldsState.addressLocality || '',
          addressRegion: fieldsState.addressRegion || '',
          postalCode: fieldsState.postalCode || '',
          addressCountry: 'US'
        }
      };
    }

    return JSON.stringify(schemaObject, null, 2);
  };

  const generateNextjsCode = (): string => {
    const jsonString = generateJSONLDString();
    return `import { Metadata } from 'next';

// 1. Static/Dynamic Metadata Exporter Config for Next.js App Router
export const metadata: Metadata = {
  title: '${fieldsState.headline || fieldsState.name || "App Router SEO Page"} | Texly SEO OS',
  description: '${fieldsState.description || "Generated via Texly JSON-LD App Router Schema Generator Engine."}',
  openGraph: {
    images: ['${fieldsState.image || fieldsState.logo || "https://texly.co/og-image.jpg"}'],
  },
};

// 2. Component Injecting Interactive Schema Structured Data
export default function SEOPage() {
  const jsonLd = ${jsonString.split('\n').map((line, idx) => (idx === 0 ? line : '  ' + line)).join('\n')};

  return (
    <>
      {/* JSON-LD Schema Engine Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          ${fieldsState.headline || fieldsState.name || "Optimized Schema Page Layout"}
        </h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          This layout is configured dynamically using Next.js App Router compliant microdata configurations.
        </p>
      </main>
    </>
  );
}`;
  };

  const handleCopy = () => {
    const codeToCopy = activeTab === 'nextjs' ? generateNextjsCode() : generateJSONLDString();
    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Dynamic FAQs ---
  const faqs: FAQ[] = [
    {
      question: "Why should I use structured JSON-LD in the Next.js App Router?",
      answer: "Next.js dynamic metadata APIs handle core tags like OpenGraph and general metadata, but structured JSON-LD schemas like TechArticle, Organization, and LocalBusiness must be injected via a script tag using dynamically serialized objects. This ensures instant parsing by search engines like Google, Bing, and Yandex, boosting rich snippet eligibility."
    },
    {
      question: "Where should I inject this generated JSON-LD schema?",
      answer: "In Next.js, place this code snippet directly inside your page.tsx or parent layout.tsx inside the app directory. Injecting a script element with type='application/ld+json' inside your react component body is highly efficient because Next.js automatically mounts and registers the header tags or handles inline script ingestion natively."
    },
    {
      question: "How do I validate the generated JSON-LD structure?",
      answer: "Once copied, you can check it using the official Schema.org Validator or Google Rich Results Test page. Our Texly compiler processes inputs to conform fully to standard schema.org properties."
    },
    {
      question: "Can I generate schemas for pages that dynamically load content?",
      answer: "Yes. In Next.js App Router, you can fetch data async within server components (e.g. generateMetadata) and seamlessly pass the fetched content straight into the jsonLd schema block returned within your JSX return block."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Header Engine */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                TEXLY SEO OS
              </span>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-indigo-400 bg-indigo-950/50 border border-indigo-900 rounded-full">
                V2.4 PRO
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/texly-seo" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white transition flex items-center gap-1.5"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Docs</span>
            </a>
            <span className="h-4 w-[1px] bg-slate-800"></span>
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              App Router Approved
            </span>
          </div>
        </div>
      </header>

      {/* Hero Core */}
      <div className="relative overflow-hidden bg-slate-950 pt-12 pb-16 border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Automated Next.js App Router Schema Generator | Free SEO Helper</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-none">
            JSON-LD App Router <br className="sm:hidden" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Schema Generator
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Eliminate validation errors. Instantly render JSON-LD structures ready for dynamic Next.js components and TS declarations with absolute semantic confidence.
          </p>
        </div>
      </div>

      {/* Workspace Wrapper */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Form Side */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Type Selector Panel */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  1. Choose Schema Type
                </span>
                <button
                  onClick={loadMockData}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition duration-150 flex items-center gap-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-lg border border-indigo-500/20"
                >
                  <RefreshCw className="w-3 h-3" />
                  Populate Demo Data
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {schemaTypes.map((type) => {
                  const isSelected = selectedTypeId === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedTypeId(type.id)}
                      className={`p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-indigo-600/15 border-indigo-500 text-white shadow-lg shadow-indigo-600/5' 
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1">
                        <span className="text-xl">{type.icon}</span>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>}
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-slate-200">{type.name}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{type.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field Forms panel */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl pointer-events-none rounded-full" />
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wide">
                    2. Schema Parameters Configuration
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Customize properties defined below</p>
                </div>
                {missingRequiredFields.length > 0 ? (
                  <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-medium">
                    {missingRequiredFields.length} pending required fields
                  </span>
                ) : (
                  <span className="text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                  </span>
                )}
              </div>

              <div className="space-y-4">
                {activeSchema?.fields.map((field) => (
                  <div key={field.key} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        {field.label}
                        {field.required && <span className="text-rose-400">*</span>}
                      </label>
                      {field.helpText && (
                        <div className="group relative">
                          <Info className="w-3.5 h-3.5 text-slate-500 hover:text-slate-400 cursor-help transition" />
                          <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block w-56 p-2 bg-slate-950 border border-slate-800 rounded-lg text-[10px] leading-normal text-slate-300 shadow-xl z-20">
                            {field.helpText}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <input
                      type={field.type === 'url' ? 'url' : field.type === 'date' ? 'date' : 'text'}
                      value={fieldsState[field.key] || ''}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className={`w-full bg-slate-900 border text-xs text-white rounded-lg px-3.5 py-2.5 transition focus:outline-none focus:ring-2 focus:ring-indigo-500/40 ${
                        field.required && !fieldsState[field.key] 
                          ? 'border-slate-800 hover:border-slate-700' 
                          : 'border-slate-800 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Interactive Preview Engine Display Side */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              
              {/* Output Tab Control headers */}
              <div className="bg-slate-950 border-b border-slate-800 px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-sm font-semibold text-white">Live Code output Workspace</span>
                </div>
                
                <div className="flex items-center space-x-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setActiveTab('nextjs')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'nextjs' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode className="w-3.5 h-3.5" />
                    Next.js Component
                  </button>
                  <button
                    onClick={() => setActiveTab('jsonld')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                      activeTab === 'jsonld' 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileJson className="w-3.5 h-3.5" />
                    Raw JSON-LD
                  </button>
                </div>
              </div>

              {/* Code display terminal */}
              <div className="relative p-5 bg-slate-950/80 font-mono text-xs overflow-x-auto max-h-[520px] min-h-[440px] text-indigo-200 leading-relaxed scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
                <div className="absolute top-4 right-4 z-10">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-lg transition text-xs shadow-lg font-sans font-medium"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied Code!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Snippet</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="text-slate-300">
                  {activeTab === 'nextjs' ? generateNextjsCode() : generateJSONLDString()}
                </pre>
              </div>

              {/* Footer status validation bar */}
              <div className="bg-slate-900 px-5 py-3 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Valid Next.js App Router Structure</span>
                </div>
                <span>React JSX Compliant</span>
              </div>
            </div>

            {/* Structured Schema Validator recommendation prompt */}
            <div className="bg-gradient-to-r from-indigo-950/50 to-slate-950/50 border border-indigo-500/10 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-indigo-300 tracking-wider uppercase">Validation Hint</h4>
                <p className="text-xs text-slate-400 leading-normal max-w-xl">
                  Once integrated, you can inspect structured layouts using Google Rich Results tool or the modern schema validation terminal to ensure search bots successfully render the markup.
                </p>
              </div>
              <a
                href="https://validator.schema.org"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition shrink-0 whitespace-nowrap group bg-indigo-500/10 hover:bg-indigo-500/20 px-3.5 py-2 rounded-lg"
              >
                <span>Schema Validator</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition" />
              </a>
            </div>

          </div>

        </div>

        {/* Dynamic Interactive FAQs section */}
        <section className="mt-20 border-t border-slate-800/80 pt-16">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold tracking-wider text-indigo-400 border border-slate-700">
                FAQS & RESOURCES
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-4">
                Structured Metadata Implementation Guides
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
                Discover modern Next.js 14 structured SEO configuration strategies.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFAQIndex === index;
                return (
                  <div 
                    key={index} 
                    className="bg-slate-950/40 border border-slate-800/80 rounded-xl overflow-hidden transition"
                  >
                    <button
                      onClick={() => setOpenFAQIndex(isOpen ? null : index)}
                      className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-slate-100 hover:text-white transition"
                    >
                      <span className="font-semibold text-sm">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-indigo-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/40">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

      </main>

      {/* Footer Branding Area */}
      <footer className="mt-24 border-t border-slate-800 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                <Layers className="w-5 h-5 text-indigo-500" />
              </div>
              <span className="font-bold text-sm tracking-widest text-white">TEXLY SEO OPERATING SYSTEM</span>
            </div>
            <div className="flex items-center space-x-6 text-xs text-slate-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <span className="text-slate-800">|</span>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <span className="text-slate-800">|</span>
              <span className="text-slate-500">© {new Date().getFullYear()} Texly. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
```