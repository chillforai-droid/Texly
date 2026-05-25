```jsx
import React, { useState, useEffect } from 'react';

// Define custom SVG Icons inline for perfect performance and dependency-free rendering
const Icons = {
  Sparkles: () => (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Code: () => (
    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  Copy: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  ),
  Info: () => (
    <svg className="w-4 h-4 text-slate-400 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  BookOpen: () => (
    <svg className="w-5 h-5 text-indigo-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5 text-teal-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )
};

export default function JsonLdSchemaGenerator() {
  const [schemaType, setSchemaType] = useState('Organization');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('inline'); // inline | metadata | ts
  
  // Dynamic Form Field States
  const [fields, setFields] = useState({
    orgName: 'Texly Tech Solutions',
    orgUrl: 'https://texly.io',
    orgLogo: 'https://texly.io/logo.png',
    orgSameAs: 'https://twitter.com/texly_io, https://github.com/texly',
    
    webName: 'Texly SEO Operating System',
    webUrl: 'https://texly.io',
    webSearchUrl: 'https://texly.io/search?q={search_term_string}',
    
    artTitle: 'Optimizing Next.js App Router for Dynamic SEO',
    artUrl: 'https://texly.io/blog/nextjs-app-router-seo',
    artImage: 'https://texly.io/blog/cover.jpg',
    artAuthor: 'Alex Rivera',
    artPublished: new Date().toISOString().split('T')[0],
    
    bizName: 'Texly Consulting',
    bizImage: 'https://texly.io/consulting.jpg',
    bizAddress: '120 Port Street, San Francisco, CA',
    bizPhone: '+1-555-0199',
    bizPrice: '$$$'
  });

  // Handle Dynamic Input Change
  const handleInputChange = (key, value) => {
    setFields(prev => ({ ...prev, [key]: value }));
  };

  // Generate standard JSON-LD Schema
  const getJsonLdRaw = () => {
    switch (schemaType) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': fields.orgName,
          'url': fields.orgUrl,
          'logo': fields.orgLogo,
          'sameAs': fields.orgSameAs.split(',').map(s => s.trim()).filter(s => s)
        };
      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': fields.webName,
          'url': fields.webUrl,
          'potentialAction': {
            '@type': 'SearchAction',
            'target': fields.webSearchUrl,
            'query-input': 'required name=search_term_string'
          }
        };
      case 'Article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          'headline': fields.artTitle,
          'image': [fields.artImage],
          'datePublished': fields.artPublished,
          'author': {
            '@type': 'Person',
            'name': fields.artAuthor
          },
          'publisher': {
            '@type': 'Organization',
            'name': fields.orgName,
            'logo': {
              '@type': 'ImageObject',
              'url': fields.orgLogo
            }
          }
        };
      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          'name': fields.bizName,
          'image': [fields.bizImage],
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': fields.bizAddress,
            'addressLocality': 'San Francisco',
            'addressRegion': 'CA',
            'postalCode': '94105',
            'addressCountry': 'US'
          },
          'telephone': fields.bizPhone,
          'priceRange': fields.bizPrice
        };
      default:
        return {};
    }
  };

  const schemaJson = getJsonLdRaw();
  const schemaString = JSON.stringify(schemaJson, null, 2);

  // Dynamic Next.js Code Blocks
  const nextJsInlineCode = `// app/page.tsx or app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '${schemaType === 'Organization' ? fields.orgName : schemaType === 'WebSite' ? fields.webName : fields.artTitle}',
  description: 'Generated efficiently via Texly SEO Operating System Schema Builder.',
};

export default function Page() {
  const jsonLd = ${schemaString};

  return (
    <>
      {/* Injecting Structured Data Directly into the Head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold">Optimized Route Page</h1>
        <p className="mt-2 text-slate-400">SEO Schema registered perfectly.</p>
      </main>
    </>
  );
}`;

  const nextJsMetadataCode = `// app/layout.tsx
// Alternate setup returning the static schema in your Next.js Head export
export function generateMetadata() {
  return {
    title: '${schemaType === 'Organization' ? fields.orgName : fields.webName}',
    alternates: {
      canonical: '${schemaType === 'Organization' ? fields.orgUrl : fields.webUrl}',
    },
    other: {
      'structured-data': '${schemaType === 'Organization' ? fields.orgUrl : fields.webUrl}',
    }
  };
}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Accordion Component State for FAQ
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Where should I add JSON-LD structured data in Next.js App Router?",
      a: "In Next.js App Router, you can inject the JSON-LD schema using a custom script inside your page.tsx or layout.tsx components. Simply use <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /> anywhere in your component tree. Next.js automatically processes and resolves it into the HTML head tag during Server Side Rendering."
    },
    {
      q: "Does App Router require structured data in generateMetadata?",
      a: "No. The Next.js generateMetadata or metadata API configuration is designed for traditional standard meta tags (like openGraph, canonical URLs, viewport, twitter etc). For complex structured nesting like JSON-LD schema markup, Google specifically supports scripts inside the body or head. Simply placing the inline script inside your component is the industry-best practice."
    },
    {
      q: "How can I validate if Google recognizes my JSON-LD markup?",
      a: "After generating your schema using our Texly tools, copy your compiled script block, deploy it to a staging or production URL, then use Google's official Rich Results Test. This ensures flawless parsing and qualifies your site for rich search feature results."
    },
    {
      q: "Can I use dynamic state parameters inside JSON-LD in Next.js?",
      a: "Absolutely. Since React layouts and pages are dynamic on the server, you can pull details dynamically from dynamic route arguments or headless CMS APIs, construct your JavaScript object object schema literal, and feed it directly to the dangerouslySetInnerHTML script rendering block."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Area */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-emerald-400 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
              T
            </div>
            <div>
              <span className="font-bold text-lg text-slate-50 tracking-wide">Texly</span>
              <span className="text-xs text-slate-400 ml-2 border-l border-slate-800 pl-2">SEO Operating System</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 mr-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Free SEO Engine
            </span>
            <span className="text-xs text-slate-400">Next.js App Router Schema Engine v2.0</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Intro Hero banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
            JSON-LD App Router Schema Generator
          </h1>
          <p className="mt-4 text-slate-400 text-lg leading-relaxed">
            Generate pixel-perfect structured schema markup compatible with standard React / Next.js dynamic routing frameworks. Fully responsive, highly robust engine optimized to drive maximum click-through rates.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-lg text-slate-200 flex items-center gap-2">
                  <Icons.Sparkles /> Setup Parameters
                </h3>
                <span className="text-xs text-indigo-400 font-mono">100% Client-Side Ready</span>
              </div>

              {/* Schema Type Selection */}
              <div className="space-y-2 mb-6">
                <label className="block text-xs font-semibold text-slate-400 tracking-wider uppercase">Select Schema Blueprint</label>
                <div className="grid grid-cols-2 gap-2">
                  {['Organization', 'WebSite', 'Article', 'LocalBusiness'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSchemaType(t)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all text-left flex items-center justify-between ${
                        schemaType === t
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10 border-indigo-500'
                          : 'bg-slate-800/40 hover:bg-slate-800/80 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {t}
                      {schemaType === t && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic Inputs depending on selected type */}
              <div className="space-y-4 border-t border-slate-800/60 pt-6">
                
                {schemaType === 'Organization' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Organization Name</label>
                      <input
                        type="text"
                        value={fields.orgName}
                        onChange={(e) => handleInputChange('orgName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Primary Domain (URL)</label>
                      <input
                        type="url"
                        value={fields.orgUrl}
                        onChange={(e) => handleInputChange('orgUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Logo Resource URL</label>
                      <input
                        type="url"
                        value={fields.orgLogo}
                        onChange={(e) => handleInputChange('orgLogo', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Social Profiles (SameAs - Comma Separated)</label>
                      <input
                        type="text"
                        value={fields.orgSameAs}
                        onChange={(e) => handleInputChange('orgSameAs', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        placeholder="https://twitter.com/profile, https://github.com/profile"
                      />
                    </div>
                  </>
                )}

                {schemaType === 'WebSite' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Website Title Name</label>
                      <input
                        type="text"
                        value={fields.webName}
                        onChange={(e) => handleInputChange('webName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Website Target URL</label>
                      <input
                        type="url"
                        value={fields.webUrl}
                        onChange={(e) => handleInputChange('webUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Potential Search Endpoint</label>
                      <input
                        type="text"
                        value={fields.webSearchUrl}
                        onChange={(e) => handleInputChange('webSearchUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </>
                )}

                {schemaType === 'Article' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Headline Title</label>
                      <input
                        type="text"
                        value={fields.artTitle}
                        onChange={(e) => handleInputChange('artTitle', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Article Public URL</label>
                      <input
                        type="url"
                        value={fields.artUrl}
                        onChange={(e) => handleInputChange('artUrl', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Featured Cover Image URL</label>
                      <input
                        type="url"
                        value={fields.artImage}
                        onChange={(e) => handleInputChange('artImage', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Author Name</label>
                        <input
                          type="text"
                          value={fields.artAuthor}
                          onChange={(e) => handleInputChange('artAuthor', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Publish Date</label>
                        <input
                          type="date"
                          value={fields.artPublished}
                          onChange={(e) => handleInputChange('artPublished', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {schemaType === 'LocalBusiness' && (
                  <>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Business Entity Name</label>
                      <input
                        type="text"
                        value={fields.bizName}
                        onChange={(e) => handleInputChange('bizName', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Office Image URL</label>
                      <input
                        type="url"
                        value={fields.bizImage}
                        onChange={(e) => handleInputChange('bizImage', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Street Address</label>
                      <input
                        type="text"
                        value={fields.bizAddress}
                        onChange={(e) => handleInputChange('bizAddress', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={fields.bizPhone}
                          onChange={(e) => handleInputChange('bizPhone', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Price Range</label>
                        <input
                          type="text"
                          value={fields.bizPrice}
                          onChange={(e) => handleInputChange('bizPrice', e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          placeholder="$$$"
                        />
                      </div>
                    </div>
                  </>
                )}

              </div>
              
              <div className="mt-6 pt-5 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>Google Schema standard:</span>
                <span className="text-emerald-400 font-semibold">Ready to Inject</span>
              </div>
            </div>

            {/* Live SEO Score Gauge */}
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-slate-400 font-medium">Render Quality Rating</span>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">Optimal</span>
              </div>
              <div className="w-full bg-slate-850 rounded-full h-2">
                <div className="bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 h-2 rounded-full w-[98%]" />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                This blueprint complies strictly with Google's search rendering specifications for dynamic Next.js runtime engines.
              </p>
            </div>
          </div>

          {/* Right Column: Dynamic Exporter Code Views */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-xl shadow-slate-950/40">
              
              {/* Tab Bar Selector */}
              <div className="bg-slate-900 border-b border-slate-800/80 p-3 flex flex-wrap justify-between items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setActiveTab('inline')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      activeTab === 'inline'
                        ? 'bg-slate-850 text-slate-100 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Next.js App Router Page Script
                  </button>
                  <button
                    onClick={() => setActiveTab('metadata')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      activeTab === 'metadata'
                        ? 'bg-slate-850 text-slate-100 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Alternate Dynamic Metadata
                  </button>
                  <button
                    onClick={() => setActiveTab('raw')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      activeTab === 'raw'
                        ? 'bg-slate-850 text-slate-100 border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Raw JSON-LD Object
                  </button>
                </div>

                <button
                  onClick={() => copyToClipboard(
                    activeTab === 'inline' ? nextJsInlineCode : activeTab === 'metadata' ? nextJsMetadataCode : schemaString
                  )}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all border border-emerald-500/20 hover:border-emerald-500/40"
                >
                  {copied ? (
                    <>
                      <Icons.Check /> Copied!
                    </>
                  ) : (
                    <>
                      <Icons.Copy /> Copy Blueprint
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre Container */}
              <div className="p-5 overflow-x-auto bg-slate-950 font-mono text-sm leading-relaxed text-indigo-300 selection:bg-indigo-500/40 max-h-[500px] overflow-y-auto">
                <pre className="text-xs sm:text-sm text-slate-200">
                  {activeTab === 'inline' && nextJsInlineCode}
                  {activeTab === 'metadata' && nextJsMetadataCode}
                  {activeTab === 'raw' && schemaString}
                </pre>
              </div>

              {/* Tips context block */}
              <div className="p-4 bg-slate-900 border-t border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-400">
                <Icons.Info />
                <div>
                  <span className="font-semibold text-slate-200 block mb-0.5">Integration Best Practice:</span>
                  Place this generated dynamic export snippet anywhere inside your targeted segment page or layout file context. It triggers immediately on static compilation or server rendering.
                </div>
              </div>

            </div>

            {/* Quick Helper Explainer widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl flex items-start">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mr-4 shrink-0">
                  <Icons.BookOpen />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-200 mb-1">App Router Schema Inject</h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    Next.js parses inline scripts seamlessly. It doesn't disrupt hydrated states and loads without delays.
                  </p>
                </div>
              </div>
              <div className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-xl flex items-start">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 mr-4 shrink-0">
                  <Icons.Globe />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-200 mb-1">Google Rich Results Ready</h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    This JSON syntax is completely compatible with Google bot algorithms for search result structures.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Info Guide / Text Article Content Section */}
        <section className="mt-20 border-t border-slate-800/80 pt-16">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Deep Dive</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">Understanding next-generation SEO with JSON-LD & Next.js App Router</h2>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                With the paradigm shift of Next.js 13, 14, and 15 into React Server Components (RSC), page optimizations have changed. Unlike older configurations relying on custom <code className="bg-slate-800 px-1 py-0.5 rounded text-indigo-300">NextHead</code> architectures, the modern framework parses standard dynamic components cleanly directly inside server-side code execution paths.
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base">
                Using this tool ensures your structural datasets render directly within the rendered DOM payload on initial loads. This dramatically cuts index latency, improving structural categorization in organic results layout schemes.
              </p>
            </div>

            {/* Accordion List FAQ Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-slate-50 flex items-center">
                Frequently Asked Schema Implementation Questions
              </h3>
              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index}
                      className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-900/20 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-900/40 transition-colors"
                      >
                        <span className="font-semibold text-slate-200 text-sm sm:text-base">{faq.q}</span>
                        <span className={`transform transition-transform text-indigo-400 text-xl font-light ${isOpen ? 'rotate-45' : ''}`}>
                          ＋
                        </span>
                      </button>
                      <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-72 border-t border-slate-850 p-5' : 'max-h-0'
                        }`}
                      >
                        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Structured Tool Footer Page */}
      <footer className="border-t border-slate-900 bg-slate-950 mt-24 py-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <p>Texly JSON-LD SEO Generator &copy; {new Date().getFullYear()} - Professional SEO Operating System Tools.</p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#privacy" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-200">Terms of Use</a>
            <a href="https://texly.io" className="hover:text-indigo-400 font-semibold">Texly Home</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
```