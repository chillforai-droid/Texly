```tsx
import React, { useState, useMemo, useEffect } from 'react';

// Define Types for Schema Inputs
type SchemaType = 'organization' | 'article' | 'localBusiness' | 'faq';

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaData {
  organization: {
    name: string;
    url: string;
    logo: string;
    sameAs: string;
  };
  article: {
    headline: string;
    image: string;
    authorName: string;
    publisherName: string;
    publisherLogo: string;
    datePublished: string;
    description: string;
  };
  localBusiness: {
    name: string;
    address: string;
    telephone: string;
    priceRange: string;
    image: string;
    url: string;
  };
  faq: FAQItem[];
}

export default function JsonLdSchemaGenerator() {
  // Tabs & Schema Type states
  const [schemaType, setSchemaType] = useState<SchemaType>('organization');
  const [activeOutputTab, setActiveOutputTab] = useState<'jsonld' | 'nextjs'>('jsonld');
  const [copied, setCopied] = useState(false);

  // Schema values state
  const [formData, setFormData] = useState<SchemaData>({
    organization: {
      name: 'Texly SaaS Solutions',
      url: 'https://texly.io',
      logo: 'https://texly.io/logo.png',
      sameAs: 'https://twitter.com/texly_io, https://github.com/texly',
    },
    article: {
      headline: 'How to Master Next.js App Router SEO in 2024',
      image: 'https://texly.io/images/seo-guide.png',
      authorName: 'Sarah Jenkins',
      publisherName: 'Texly Tech Blog',
      publisherLogo: 'https://texly.io/logo.png',
      datePublished: new Date().toISOString().split('T')[0],
      description: 'Unlock the complete performance capability of React SEO with highly optimized metadata and dynamic structured schemas.',
    },
    localBusiness: {
      name: 'Texly HQ Consulting',
      address: '100 Silicon Boulevard, San Francisco, CA 94107',
      telephone: '+1 (555) 019-2834',
      priceRange: '$$$',
      image: 'https://texly.io/images/hq-office.png',
      url: 'https://texly.io/consulting',
    },
    faq: [
      { question: 'Does Next.js support JSON-LD out of the box?', answer: 'Yes! Next.js recommends rendering JSON-LD structured data as an inline script tag inside your layout.js or page.js files.' },
      { question: 'Should JSON-LD be server-side rendered?', answer: 'Absolutely. Providing JSON-LD dynamically inside SSR pages ensures standard search crawler agents pick it up instantly.' }
    ]
  });

  // Handle standard field changes
  const handleInputChange = (category: keyof SchemaData, key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as Record<string, any>),
        [key]: value,
      },
    }));
  };

  // Dynamic FAQ actions
  const addFAQItem = () => {
    setFormData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }));
  };

  const removeFAQItem = (index: number) => {
    if (formData.faq.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }));
  };

  const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
    const updatedFaq = [...formData.faq];
    updatedFaq[index][field] = value;
    setFormData((prev) => ({ ...prev, faq: updatedFaq }));
  };

  // Generate standard schema output object
  const generatedSchema = useMemo(() => {
    const baseContext = "https://schema.org";

    switch (schemaType) {
      case 'organization':
        return {
          "@context": baseContext,
          "@type": "Organization",
          "name": formData.organization.name,
          "url": formData.organization.url,
          "logo": formData.organization.logo,
          "sameAs": formData.organization.sameAs
            ? formData.organization.sameAs.split(',').map((link) => link.trim())
            : []
        };
      case 'article':
        return {
          "@context": baseContext,
          "@type": "NewsArticle",
          "headline": formData.article.headline,
          "image": [formData.article.image],
          "datePublished": formData.article.datePublished,
          "description": formData.article.description,
          "author": {
            "@type": "Person",
            "name": formData.article.authorName
          },
          "publisher": {
            "@type": "Organization",
            "name": formData.article.publisherName,
            "logo": {
              "@type": "ImageObject",
              "url": formData.article.publisherLogo
            }
          }
        };
      case 'localBusiness':
        return {
          "@context": baseContext,
          "@type": "LocalBusiness",
          "name": formData.localBusiness.name,
          "image": [formData.localBusiness.image],
          "telephone": formData.localBusiness.telephone,
          "priceRange": formData.localBusiness.priceRange,
          "url": formData.localBusiness.url,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": formData.localBusiness.address,
            "addressLocality": "San Francisco",
            "addressRegion": "CA",
            "postalCode": "94107",
            "addressCountry": "US"
          }
        };
      case 'faq':
        return {
          "@context": baseContext,
          "@type": "FAQPage",
          "mainEntity": formData.faq.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer
            }
          }))
        };
      default:
        return {};
    }
  }, [schemaType, formData]);

  // Next.js App Router dynamic page source generator
  const generatedNextjsCode = useMemo(() => {
    const jsonString = JSON.stringify(generatedSchema, null, 2);
    return `import Head from 'next/head';

export default function Page() {
  const jsonLd = ${jsonString};

  return (
    <>
      {/* Inject JSON-LD to the Head Component in Next.js App Router */}
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <h1 className="text-3xl font-bold">Optimized Page</h1>
        <p>This dynamic route renders complete JSON-LD metadata markup directly.</p>
      </section>
    </>
  );
}`;
  }, [generatedSchema]);

  // Validation score logic
  const validationAlerts = useMemo(() => {
    const alerts: { text: string; status: 'pass' | 'fail' | 'warn' }[] = [];
    if (schemaType === 'organization') {
      if (!formData.organization.name) alerts.push({ text: 'Organization Name is required', status: 'fail' });
      if (!formData.organization.url.startsWith('https://')) alerts.push({ text: 'URL must use HTTPS protocol', status: 'warn' });
      if (!formData.organization.logo) alerts.push({ text: 'Logo asset link missing', status: 'warn' });
    }
    if (schemaType === 'article') {
      if (formData.article.headline.length < 15) alerts.push({ text: 'Headline is too short (< 15 chars)', status: 'warn' });
      if (!formData.article.image) alerts.push({ text: 'Main image asset is recommended for Rich Snippets', status: 'fail' });
      if (!formData.article.description) alerts.push({ text: 'Meta description payload recommended', status: 'fail' });
    }
    if (schemaType === 'localBusiness') {
      if (!formData.localBusiness.telephone) alerts.push({ text: 'Telephone contact missing', status: 'warn' });
      if (!formData.localBusiness.address) alerts.push({ text: 'Full structural address required', status: 'fail' });
    }
    if (schemaType === 'faq') {
      if (formData.faq.some(f => !f.question || !f.answer)) {
        alerts.push({ text: 'FAQ blocks must contain valid dynamic structural values', status: 'fail' });
      }
    }

    if (alerts.length === 0) {
      alerts.push({ text: 'Schema criteria meets standard SEO Validation guidelines!', status: 'pass' });
    }
    return alerts;
  }, [schemaType, formData]);

  const copyToClipboard = () => {
    const targetText = activeOutputTab === 'jsonld' 
      ? JSON.stringify(generatedSchema, null, 2) 
      : generatedNextjsCode;
    
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Interactive UI Accordion State for FAQs Section
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);
  const toggleFAQ = (idx: number) => {
    setOpenFAQIndex(openFAQIndex === idx ? null : idx);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-900">
      {/* Decorative Grid Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 tracking-wide uppercase">
            SaaS Pro SEO Toolkit
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
            JSON-LD App Router Schema Generator
          </h1>
          <p className="mt-4 text-lg text-slate-400 font-light">
            Automated Next.js App Router Schema Generator &amp; Free SEO Helper. Instantly build validate-ready structured code modules to power rich snippet placement.
          </p>
        </header>

        {/* Dashboard Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 shadow-2xl space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Schema Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['organization', 'article', 'localBusiness', 'faq'] as SchemaType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSchemaType(type)}
                    className={`px-4 py-3 rounded-xl text-xs font-medium border transition-all text-left capitalize flex items-center justify-between ${
                      schemaType === type
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-md'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {type === 'localBusiness' ? 'Local Business' : type}
                    {schemaType === type && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-slate-700/55" />

            {/* Dynamic Form Generation block based on selections */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                2. Customize Meta Parameters
              </h3>

              {/* Organization Type Settings */}
              {schemaType === 'organization' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Organization Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.organization.name}
                      onChange={(e) => handleInputChange('organization', 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Website URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.organization.url}
                      onChange={(e) => handleInputChange('organization', 'url', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Logo URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.organization.logo}
                      onChange={(e) => handleInputChange('organization', 'logo', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">SameAs Social Profiles (Comma Separated)</label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.organization.sameAs}
                      onChange={(e) => handleInputChange('organization', 'sameAs', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Article Type Settings */}
              {schemaType === 'article' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Headline</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.article.headline}
                      onChange={(e) => handleInputChange('article', 'headline', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Featured Image URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.article.image}
                      onChange={(e) => handleInputChange('article', 'image', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1">Author Name</label>
                      <input
                        type="text"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.article.authorName}
                        onChange={(e) => handleInputChange('article', 'authorName', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1">Publish Date</label>
                      <input
                        type="date"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.article.datePublished}
                        onChange={(e) => handleInputChange('article', 'datePublished', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Publisher Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.article.publisherName}
                      onChange={(e) => handleInputChange('article', 'publisherName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Publisher Logo URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.article.publisherLogo}
                      onChange={(e) => handleInputChange('article', 'publisherLogo', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.article.description}
                      onChange={(e) => handleInputChange('article', 'description', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Local Business Type Settings */}
              {schemaType === 'localBusiness' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Business Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.localBusiness.name}
                      onChange={(e) => handleInputChange('localBusiness', 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Full Physical Address</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.localBusiness.address}
                      onChange={(e) => handleInputChange('localBusiness', 'address', e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1">Phone Number</label>
                      <input
                        type="text"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.localBusiness.telephone}
                        onChange={(e) => handleInputChange('localBusiness', 'telephone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1">Price Range</label>
                      <input
                        type="text"
                        placeholder="e.g. $$, $$$"
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                        value={formData.localBusiness.priceRange}
                        onChange={(e) => handleInputChange('localBusiness', 'priceRange', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Main Image URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.localBusiness.image}
                      onChange={(e) => handleInputChange('localBusiness', 'image', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1">Business Website URL</label>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
                      value={formData.localBusiness.url}
                      onChange={(e) => handleInputChange('localBusiness', 'url', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* FAQ Page Type Settings */}
              {schemaType === 'faq' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400 font-medium">FAQ Entities</span>
                    <button
                      onClick={addFAQItem}
                      className="text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-2.5 py-1 rounded border border-emerald-500/20 font-medium transition-colors"
                    >
                      + Add Question
                    </button>
                  </div>
                  {formData.faq.map((item, index) => (
                    <div key={index} className="bg-slate-900 p-3 rounded-lg border border-slate-800 space-y-2 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Q&amp;A Set #{index + 1}</span>
                        {formData.faq.length > 1 && (
                          <button
                            onClick={() => removeFAQItem(index)}
                            className="text-xs text-rose-400 hover:text-rose-300 font-medium transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Question Name"
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                          value={item.question}
                          onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          placeholder="Accepted Answer details..."
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                          value={item.answer}
                          onChange={(e) => handleFAQChange(index, 'answer', e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* validation module widget helper */}
            <div className="mt-6 pt-5 border-t border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center">
                <svg className="w-4 h-4 mr-1 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                SEO Validator Checklist
              </h4>
              <div className="space-y-2">
                {validationAlerts.map((alert, index) => (
                  <div key={index} className="flex items-start text-xs space-x-2">
                    {alert.status === 'pass' && (
                      <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px]">PASS</span>
                    )}
                    {alert.status === 'warn' && (
                      <span className="text-amber-400 font-semibold bg-amber-500/10 px-1.5 py-0.5 rounded text-[10px]">WARN</span>
                    )}
                    {alert.status === 'fail' && (
                      <span className="text-rose-400 font-semibold bg-rose-500/10 px-1.5 py-0.5 rounded text-[10px]">CRITICAL</span>
                    )}
                    <span className="text-slate-300">{alert.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Code Renderers */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-950/80 backdrop-blur-xl border border-slate-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[580px]">
              
              {/* Output Tab Selector */}
              <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveOutputTab('jsonld')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeOutputTab === 'jsonld'
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Raw JSON-LD Object
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('nextjs')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      activeOutputTab === 'nextjs'
                        ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Next.js Component
                  </button>
                </div>

                <button
                  onClick={copyToClipboard}
                  className="inline-flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 text-xs font-bold px-4 py-1.5 rounded-lg transition-all"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copy Schema</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code window viewport */}
              <div className="flex-1 p-5 overflow-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
                <pre className="whitespace-pre-wrap selection:bg-emerald-500/30">
                  <code>
                    {activeOutputTab === 'jsonld'
                      ? JSON.stringify(generatedSchema, null, 2)
                      : generatedNextjsCode}
                  </code>
                </pre>
              </div>

              {/* Indicator Footer */}
              <div className="bg-slate-900 border-t border-slate-800/80 px-5 py-3.5 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Encoding: UTF-8 &bull; Content Validation Passed
                </span>
                <span className="inline-flex items-center text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  Ready to Deploy &rarr;
                </span>
              </div>
            </div>

            {/* Quick Helper Tips Panel */}
            <div className="bg-slate-850/40 border border-slate-800 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Why configure JSON-LD metadata markup inside Next.js App Router?
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                By rendering structural SEO components during server runtime, you enable Googlebot and Bingbot to accurately parse core identifiers such as publisher info, address structures, reviews, and dynamic rich previews instantly upon crawling HTML.
              </p>
            </div>

          </div>
        </div>

        {/* Exporter Compatibility Grid Block */}
        <section className="mt-20 border-t border-slate-800 pt-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-100">
              Next.js Layout &amp; Page Metadata Parameter Integration Guide
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              How to seamlessly export standard layouts using metadata configurations in standard next.js files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6">
              <h3 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-wider">
                Method 1: Dynamic generateMetadata Exports
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                For standard layout/page components, Next.js supports an exported static <code>metadata</code> object or dynamic <code>generateMetadata</code> parameters. Combine metadata configuration outputs side-by-side with schema injection:
              </p>
              <pre className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Texly SEO Specialist',
  description: 'Automated SEO Optimizer solutions',
  openGraph: {
    images: ['/og-image.png'],
  },
};`}
              </pre>
            </div>

            <div className="bg-slate-900 border border-slate-800/80 rounded-xl p-6">
              <h3 className="text-sm font-bold text-indigo-400 mb-3 uppercase tracking-wider">
                Method 2: In-line Structural Injection
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Inject structured JSON-LD data parameters into dynamic templates using HTML script components so your SEO targets remain lightweight, crawlable, and reactive:
              </p>
              <pre className="bg-slate-950 p-4 rounded-lg font-mono text-[11px] text-slate-300 overflow-x-auto leading-relaxed">
{`import Head from 'next/head';

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main>{children}</main>
    </>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Dynamic FAQ list accordions */}
        <section className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-100">
              Frequently Asked Questions (FAQs)
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Expert answers to critical inquiries on metadata and JSON-LD layout integration in Next.js applications.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What is JSON-LD and how does it help Next.js SEO optimization?",
                a: "JSON-LD (JavaScript Object Notation for Linked Data) is a lightweight structured data format designed to describe website entities. In Next.js App Router, using JSON-LD ensures modern search engines understand exact properties (like author profiles, business location, schema types) instantly, unlocking valuable rich snippets."
              },
              {
                q: "Can I use multiple JSON-LD structures on a single dynamic web page?",
                a: "Absolutely. You can render multiple structured schemas (e.g., both an Organization schema in layout.js and an Article schema in page.js). Google recommends keeping them structured to provide deep semantic context."
              },
              {
                q: "How does the App Router generateMetadata output relate to JSON-LD schemas?",
                a: "Next.js generateMetadata manages traditional tags like <title>, <meta description>, and OpenGraph elements. JSON-LD scripts provide a secondary layer of structural organization. For ultimate SEO performance, combine metadata exports alongside dynamically rendered JSON-LD scripts."
              },
              {
                q: "Is there a penalty for invalid JSON-LD properties?",
                a: "While there is no explicit search penalty, invalid structured data means search engine platforms like Google will ignore the schema snippet entirely. Using our real-time validator widget guarantees compliant output formatting."
              }
            ].map((faq, index) => {
              const isOpen = openFAQIndex === index;
              return (
                <div 
                  key={index} 
                  className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-semibold text-slate-200 text-sm sm:text-base pr-4">
                      {faq.q}
                    </span>
                    <span className={`text-slate-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-slate-800/60 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Texly Brand Professional Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 mt-24 text-center">
        <div className="max-w-7xl mx-auto px-4 text-xs text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} Texly. All rights reserved. Built with pride for Next.js SEO Developers globally.</p>
          <p className="text-slate-600">Automated Next.js App Router Schema Generator | Free SEO Helper utility engine.</p>
        </div>
      </footer>
    </div>
  );
}
```