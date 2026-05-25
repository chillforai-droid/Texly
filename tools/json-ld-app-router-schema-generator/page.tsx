```tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";

// --- Types & Constants ---
type SchemaType = "Article" | "Organization" | "Product" | "LocalBusiness" | "FAQPage";

interface FAQItem {
  question: string;
  answer: string;
}

interface SchemaData {
  article: {
    headline: string;
    description: string;
    image: string;
    authorName: string;
    publisherName: string;
    publisherLogo: string;
    datePublished: string;
    dateModified: string;
  };
  organization: {
    name: string;
    url: string;
    logo: string;
    sameAs: string; // Comma separated social links
    contactPhone: string;
    contactType: string;
  };
  product: {
    name: string;
    image: string;
    description: string;
    brand: string;
    sku: string;
    price: string;
    priceCurrency: string;
    availability: "InStock" | "OutOfStock" | "PreOrder";
    ratingValue: string;
    reviewCount: string;
  };
  localBusiness: {
    name: string;
    description: string;
    image: string;
    telephone: string;
    priceRange: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    latitude: string;
    longitude: string;
  };
  faq: FAQItem[];
}

const initialSchemaData: SchemaData = {
  article: {
    headline: "Next.js App Router Schema Guide",
    description: "Learn how to dynamically generate and inject structured JSON-LD schemas in Next.js 13, 14, and 15 layouts.",
    image: "https://texly.io/images/og-image.png",
    authorName: "Texly SEO Expert",
    publisherName: "Texly SEO OS",
    publisherLogo: "https://texly.io/logo.png",
    datePublished: new Date().toISOString().split("T")[0],
    dateModified: new Date().toISOString().split("T")[0],
  },
  organization: {
    name: "Texly SEO Operating System",
    url: "https://texly.io",
    logo: "https://texly.io/logo.png",
    sameAs: "https://twitter.com/texly,https://github.com/texly",
    contactPhone: "+1-800-555-0199",
    contactType: "Customer Support",
  },
  product: {
    name: "Texly Professional SEO OS Suite",
    image: "https://texly.io/images/product-suite.png",
    description: "The complete automated SEO toolchain designed specifically for modern headless frameworks and Next.js platforms.",
    brand: "Texly",
    sku: "TEX-SEO-OS-PRO",
    price: "49.00",
    priceCurrency: "USD",
    availability: "InStock",
    ratingValue: "4.9",
    reviewCount: "128",
  },
  localBusiness: {
    name: "Texly Headquartered Hub",
    description: "Enterprise SEO solutions and custom programmatic Next.js consultancy services.",
    image: "https://texly.io/images/hq-office.jpg",
    telephone: "+1-555-873-3000",
    priceRange: "$$$",
    streetAddress: "100 Pine Street, Suite 1200",
    addressLocality: "San Francisco",
    addressRegion: "CA",
    postalCode: "94111",
    addressCountry: "US",
    latitude: "37.7925",
    longitude: "-122.3999",
  },
  faq: [
    {
      question: "How do I add JSON-LD in Next.js App Router?",
      answer: "Inject the structured JSON-LD by returning a standard React script tag inside your layout.tsx or page.tsx containing dangerouslySetInnerHTML set to the stringified JSON schema.",
    },
    {
      question: "Can I generate JSON-LD schema dynamically based on database calls?",
      answer: "Yes! In Next.js Server Components, you can fetch your data dynamically from database or APIs inside the Server Component page, construct the JSON-LD object dynamically, and output it in the JSX response.",
    },
  ],
};

// --- Custom Icons ---
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376A8.965 8.965 0 0012 12.75a8.965 8.965 0 00-3.75-3.375m7.5 10.375a3.75 3.75 0 11-7.5 0M15.75 9.75H18.75c.621 0 1.125.504 1.125 1.125V18" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-emerald-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 111.083.984l-.04.02-.137.072m-.188 1.133l-.041.02a.75.75 0 111.083-.984l-.04.02-.137.072m1.5-12.452a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function JsonLdSchemaGenerator() {
  const [activeSchema, setActiveSchema] = useState<SchemaType>("Article");
  const [schemaData, setSchemaData] = useState<SchemaData>(initialSchemaData);
  const [outputTab, setOutputTab] = useState<"json" | "nextjs">("json");
  const [copied, setCopied] = useState(false);

  // FAQ Accordion State (for dynamic list below)
  const [faqOpenStates, setFaqOpenStates] = useState<{ [key: number]: boolean }>({
    0: true,
    1: false,
    2: false,
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const updateField = (category: keyof SchemaData, field: string, value: any) => {
    setSchemaData((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] as any),
        [field]: value,
      },
    }));
  };

  const handleFAQChange = (index: number, key: "question" | "answer", value: string) => {
    const updatedFaqs = [...schemaData.faq];
    updatedFaqs[index] = { ...updatedFaqs[index], [key]: value };
    setSchemaData((prev) => ({ ...prev, faq: updatedFaqs }));
  };

  const addFAQItem = () => {
    setSchemaData((prev) => ({
      ...prev,
      faq: [...prev.faq, { question: "", answer: "" }],
    }));
  };

  const removeFAQItem = (index: number) => {
    if (schemaData.faq.length <= 1) return;
    const updatedFaqs = schemaData.faq.filter((_, i) => i !== index);
    setSchemaData((prev) => ({ ...prev, faq: updatedFaqs }));
  };

  // --- Real-time Generated JSON-LD Objects ---
  const generatedJsonLd = useMemo(() => {
    const context = "https://schema.org";

    switch (activeSchema) {
      case "Article":
        return {
          "@context": context,
          "@type": "NewsArticle",
          "headline": schemaData.article.headline,
          "description": schemaData.article.description,
          "image": [schemaData.article.image].filter(Boolean),
          "datePublished": schemaData.article.datePublished,
          "dateModified": schemaData.article.dateModified || schemaData.article.datePublished,
          "author": {
            "@type": "Person",
            "name": schemaData.article.authorName,
          },
          "publisher": {
            "@type": "Organization",
            "name": schemaData.article.publisherName,
            "logo": {
              "@type": "ImageObject",
              "url": schemaData.article.publisherLogo,
            },
          },
        };

      case "Organization":
        return {
          "@context": context,
          "@type": "Organization",
          "name": schemaData.organization.name,
          "url": schemaData.organization.url,
          "logo": schemaData.organization.logo,
          "sameAs": schemaData.organization.sameAs.split(",").map((s) => s.trim()).filter(Boolean),
          "contactPoint": schemaData.organization.contactPhone
            ? {
                "@type": "ContactPoint",
                "telephone": schemaData.organization.contactPhone,
                "contactType": schemaData.organization.contactType,
              }
            : undefined,
        };

      case "Product":
        return {
          "@context": context,
          "@type": "Product",
          "name": schemaData.product.name,
          "image": [schemaData.product.image].filter(Boolean),
          "description": schemaData.product.description,
          "sku": schemaData.product.sku,
          "brand": {
            "@type": "Brand",
            "name": schemaData.product.brand,
          },
          "offers": {
            "@type": "Offer",
            "price": schemaData.product.price,
            "priceCurrency": schemaData.product.priceCurrency,
            "availability": `https://schema.org/${schemaData.product.availability}`,
          },
          "aggregateRating": schemaData.product.ratingValue
            ? {
                "@type": "AggregateRating",
                "ratingValue": schemaData.product.ratingValue,
                "reviewCount": schemaData.product.reviewCount || "1",
              }
            : undefined,
        };

      case "LocalBusiness":
        return {
          "@context": context,
          "@type": "LocalBusiness",
          "name": schemaData.localBusiness.name,
          "description": schemaData.localBusiness.description,
          "image": schemaData.localBusiness.image,
          "telephone": schemaData.localBusiness.telephone,
          "priceRange": schemaData.localBusiness.priceRange,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": schemaData.localBusiness.streetAddress,
            "addressLocality": schemaData.localBusiness.addressLocality,
            "addressRegion": schemaData.localBusiness.addressRegion,
            "postalCode": schemaData.localBusiness.postalCode,
            "addressCountry": schemaData.localBusiness.addressCountry,
          },
          "geo": schemaData.localBusiness.latitude && schemaData.localBusiness.longitude
            ? {
                "@type": "GeoCoordinates",
                "latitude": parseFloat(schemaData.localBusiness.latitude) || 0,
                "longitude": parseFloat(schemaData.localBusiness.longitude) || 0,
              }
            : undefined,
        };

      case "FAQPage":
        return {
          "@context": context,
          "@type": "FAQPage",
          "mainEntity": schemaData.faq.map((item) => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.answer,
            },
          })),
        };

      default:
        return {};
    }
  }, [activeSchema, schemaData]);

  const jsonLdString = useMemo(() => {
    return JSON.stringify(generatedJsonLd, null, 2);
  }, [generatedJsonLd]);

  // Next.js App Router compatible complete component code structure
  const nextJsOutputString = useMemo(() => {
    return `import type { Metadata } from 'next';

// 1. Optional Metadata Exporter (For App Router Head Parameters)
export const metadata: Metadata = {
  title: '${
    activeSchema === "Article"
      ? schemaData.article.headline
      : activeSchema === "Product"
      ? schemaData.product.name
      : activeSchema === "LocalBusiness"
      ? schemaData.localBusiness.name
      : activeSchema === "Organization"
      ? schemaData.organization.name
      : "Dynamic Schema Target Page"
  }',
  description: '${
    activeSchema === "Article"
      ? schemaData.article.description
      : activeSchema === "Product"
      ? schemaData.product.description
      : activeSchema === "LocalBusiness"
      ? schemaData.localBusiness.description
      : "Next.js JSON-LD Dynamic Structured Schema Integration"
  }',
};

// 2. Dynamic JSON-LD injection structure
export default function Page() {
  const jsonLd = ${jsonLdString.replace(/\n/g, "\n  ")};

  return (
    <>
      {/* Dynamic SEO schema markup injected into layout natively */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Injected Schema Page</h1>
        <p className="mt-2 text-slate-600">
          The ${activeSchema} JSON-LD Schema has been injected directly into this document body.
        </p>
      </main>
    </>
  );
}`;
  }, [activeSchema, jsonLdString, schemaData]);

  // Score Calculations (Simple dynamic completeness utility)
  const validationChecklist = useMemo(() => {
    const list: { check: string; satisfied: boolean }[] = [];
    if (activeSchema === "Article") {
      list.push({ check: "Has Headline (min 10 chars)", satisfied: schemaData.article.headline.length > 10 });
      list.push({ check: "Has Description", satisfied: !!schemaData.article.description });
      list.push({ check: "Has Image URL specified", satisfied: !!schemaData.article.image });
      list.push({ check: "Publisher name provided", satisfied: !!schemaData.article.publisherName });
    } else if (activeSchema === "Organization") {
      list.push({ check: "Has Corporate Name", satisfied: !!schemaData.organization.name });
      list.push({ check: "Has Corporate Web Address", satisfied: schemaData.organization.url.startsWith("http") });
      list.push({ check: "Has Social References (sameAs)", satisfied: schemaData.organization.sameAs.length > 5 });
    } else if (activeSchema === "Product") {
      list.push({ check: "Has SKU Number", satisfied: !!schemaData.product.sku });
      list.push({ check: "Has Defined Price Setup", satisfied: parseFloat(schemaData.product.price) > 0 });
      list.push({ check: "Has valid aggregative rating (1-5)", satisfied: parseFloat(schemaData.product.ratingValue) <= 5 && parseFloat(schemaData.product.ratingValue) >= 1 });
    } else if (activeSchema === "LocalBusiness") {
      list.push({ check: "Has Physical Street Address", satisfied: !!schemaData.localBusiness.streetAddress });
      list.push({ check: "Has Lat / Long Coordinates", satisfied: !!schemaData.localBusiness.latitude && !!schemaData.localBusiness.longitude });
    } else if (activeSchema === "FAQPage") {
      list.push({ check: "At least 2 FAQs defined", satisfied: schemaData.faq.length >= 2 });
      list.push({ check: "All Question & Answer fields completed", satisfied: schemaData.faq.every(f => f.question && f.answer) });
    }
    return list;
  }, [activeSchema, schemaData]);

  const scorePercentage = useMemo(() => {
    if (!validationChecklist.length) return 100;
    const itemsPassed = validationChecklist.filter(v => v.satisfied).length;
    return Math.round((itemsPassed / validationChecklist.length) * 100);
  }, [validationChecklist]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Header section */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25">
              T
            </span>
            <div className="flex flex-col">
              <span className="font-semibold text-white tracking-wide text-sm leading-none">TEXLY SEO OS</span>
              <span className="text-[10px] text-indigo-400 font-bold tracking-widest mt-0.5">APP ROUTER HELPER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Next.js 13, 14 & 15 Ready
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-10 border-b border-slate-900 bg-gradient-to-b from-slate-900/30 to-transparent">
        <div className="absolute inset-y-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.06),transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase bg-indigo-500/10 px-3 py-1 rounded-full">
              Automated JSON-LD App Router Schema Generator
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mt-4">
              Next.js Schema Generator
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed">
              Create high-fidelity, nested JSON-LD schema configurations for Next.js App Router.
              Avoid syntax errors, bypass hydration issues, and export ready-to-run layout modules with complete schema validations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Step 1: Selector Tabs */}
        <div className="mb-8">
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
            Select Schema Architecture
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
            {(["Article", "Organization", "Product", "LocalBusiness", "FAQPage"] as SchemaType[]).map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveSchema(type);
                  setCopied(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-250 ${
                  activeSchema === type
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {type === "FAQPage" ? "FAQ Page" : type === "LocalBusiness" ? "Local Business" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column - Configurations */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white flex items-center justify-between border-b border-slate-800 pb-4 mb-5">
                <span>Configure Properties</span>
                <span className="text-xs bg-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded">
                  {activeSchema}
                </span>
              </h2>

              {/* Dynamic Inputs Based on Schema Type Selection */}
              {activeSchema === "Article" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Headline</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.article.headline}
                      onChange={(e) => updateField("article", "headline", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      rows={3}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.article.description}
                      onChange={(e) => updateField("article", "description", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Image URL</label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.article.image}
                      onChange={(e) => updateField("article", "image", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Author Name</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.article.authorName}
                        onChange={(e) => updateField("article", "authorName", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Publisher</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.article.publisherName}
                        onChange={(e) => updateField("article", "publisherName", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Publisher Logo URL</label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.article.publisherLogo}
                      onChange={(e) => updateField("article", "publisherLogo", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Published Date</label>
                      <input
                        type="date"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.article.datePublished}
                        onChange={(e) => updateField("article", "datePublished", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Modified Date</label>
                      <input
                        type="date"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.article.dateModified}
                        onChange={(e) => updateField("article", "dateModified", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSchema === "Organization" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Organization Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.organization.name}
                      onChange={(e) => updateField("organization", "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Website URL</label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.organization.url}
                      onChange={(e) => updateField("organization", "url", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Logo URL</label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.organization.logo}
                      onChange={(e) => updateField("organization", "logo", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Social Profiles (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="https://facebook.com/brand, https://linkedin.com/brand"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.organization.sameAs}
                      onChange={(e) => updateField("organization", "sameAs", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Telephone</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.organization.contactPhone}
                        onChange={(e) => updateField("organization", "contactPhone", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Type</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.organization.contactType}
                        onChange={(e) => updateField("organization", "contactType", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSchema === "Product" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.product.name}
                      onChange={(e) => updateField("product", "name", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Image URL</label>
                    <input
                      type="url"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.product.image}
                      onChange={(e) => updateField("product", "image", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.product.description}
                      onChange={(e) => updateField("product", "description", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Brand</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.brand}
                        onChange={(e) => updateField("product", "brand", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">SKU / ID</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.sku}
                        onChange={(e) => updateField("product", "sku", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price</label>
                      <input
                        type="number"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.price}
                        onChange={(e) => updateField("product", "price", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Currency</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.priceCurrency}
                        onChange={(e) => updateField("product", "priceCurrency", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Stock</label>
                      <select
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-9"
                        value={schemaData.product.availability}
                        onChange={(e) => updateField("product", "availability", e.target.value as any)}
                      >
                        <option value="InStock">In Stock</option>
                        <option value="OutOfStock">Out of Stock</option>
                        <option value="PreOrder">Pre-order</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Rating (1-5)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.ratingValue}
                        onChange={(e) => updateField("product", "ratingValue", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Reviews Count</label>
                      <input
                        type="number"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.product.reviewCount}
                        onChange={(e) => updateField("product", "reviewCount", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSchema === "LocalBusiness" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.localBusiness.name}
                      onChange={(e) => updateField("localBusiness", "name", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Telephone</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.telephone}
                        onChange={(e) => updateField("localBusiness", "telephone", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Price Range</label>
                      <input
                        type="text"
                        placeholder="e.g. $$"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.priceRange}
                        onChange={(e) => updateField("localBusiness", "priceRange", e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Street Address</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={schemaData.localBusiness.streetAddress}
                      onChange={(e) => updateField("localBusiness", "streetAddress", e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">City / Locality</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.addressLocality}
                        onChange={(e) => updateField("localBusiness", "addressLocality", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">State / Region</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.addressRegion}
                        onChange={(e) => updateField("localBusiness", "addressRegion", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Postal / Zip Code</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.postalCode}
                        onChange={(e) => updateField("localBusiness", "postalCode", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Country Code</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.addressCountry}
                        onChange={(e) => updateField("localBusiness", "addressCountry", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Latitude</label>
                      <input
                        type="text"
                        placeholder="37.7925"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.latitude}
                        onChange={(e) => updateField("localBusiness", "latitude", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Longitude</label>
                      <input
                        type="text"
                        placeholder="-122.3999"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        value={schemaData.localBusiness.longitude}
                        onChange={(e) => updateField("localBusiness", "longitude", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeSchema === "FAQPage" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">FAQ Q&A Sets</span>
                    <button
                      type="button"
                      onClick={addFAQItem}
                      className="text-xs text-indigo-400 hover:text-white bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 transition-colors"
                    >
                      + Add Question
                    </button>
                  </div>
                  {schemaData.faq.map((item, index) => (
                    <div key={index} className="p-4 bg-slate-950 border border-slate-850 rounded-lg space-y-3 relative group">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400">Question #{index + 1}</span>
                        {schemaData.faq.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeFAQItem(index)}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="What is your question?"
                          className="w-full bg-slate-900 border border-slate-800 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          value={item.question}
                          onChange={(e) => handleFAQChange(index, "question", e.target.value)}
                        />
                      </div>
                      <div>
                        <textarea
                          rows={2}
                          placeholder="Provide the detailed answer matching user intent."
                          className="w-full bg-slate-900 border border-slate-800 rounded-md py-1.5 px-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                          value={item.answer}
                          onChange={(e) => handleFAQChange(index, "answer", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Live Validator / Score Tracker Widget */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Schema Optimizer Score</h3>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  scorePercentage === 100 ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400"
                }`}>
                  {scorePercentage}% Complete
                </span>
              </div>
              
              {/* Score Bar */}
              <div className="w-full bg-slate-950 rounded-full h-2 mb-4 overflow-hidden border border-slate-850">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${scorePercentage}%` }}
                />
              </div>

              {/* Dynamic checklist */}
              <ul className="space-y-2.5">
                {validationChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-400">
                    {item.satisfied ? (
                      <span className="h-4 w-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
                    ) : (
                      <span className="h-4 w-4 rounded-full bg-slate-800 text-slate-500 flex items-center justify-center text-[10px] font-bold">!</span>
                    )}
                    <span className={item.satisfied ? "text-slate-300" : "text-slate-500"}>
                      {item.check}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Code Outputs & Next.js Implementation preview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-xl overflow-hidden">
              {/* Output Tab Selection Header */}
              <div className="border-b border-slate-800 bg-slate-900/80 px-4 pt-4 pb-0 flex items-center justify-between">
                <div className="flex gap-1">
                  <button
                    onClick={() => setOutputTab("json")}
                    className={`pb-3 px-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${
                      outputTab === "json"
                        ? "border-indigo-500 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Raw JSON-LD
                  </button>
                  <button
                    onClick={() => setOutputTab("nextjs")}
                    className={`pb-3 px-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-all duration-200 ${
                      outputTab === "nextjs"
                        ? "border-indigo-500 text-white"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Next.js Layout Component
                  </button>
                </div>

                <button
                  onClick={() => handleCopy(outputTab === "json" ? jsonLdString : nextJsOutputString)}
                  className="mb-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/10"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                  {copied ? "Copied Structure!" : "Copy Code"}
                </button>
              </div>

              {/* Code Editor Panel */}
              <div className="p-4 sm:p-6 bg-slate-950 overflow-x-auto font-mono text-xs text-slate-300 leading-relaxed min-h-[460px] max-h-[640px] overflow-y-auto">
                {outputTab === "json" ? (
                  <pre className="text-emerald-400">
                    <code className="block whitespace-pre">
{`<script type="application/ld+json">
${jsonLdString}
</script>`}
                    </code>
                  </pre>
                ) : (
                  <pre className="text-indigo-300">
                    <code>{nextJsOutputString}</code>
                  </pre>
                )}
              </div>
            </div>

            {/* Implementation Quick Tips */}
            <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-5 flex items-start gap-4">
              <InfoIcon />
              <div>
                <h4 className="text-sm font-bold text-indigo-300">Next.js App Router Best Practice</h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  We recommend placing schemas inside a client or server page component directly. Next.js standardizes metadata exports via the 
                  <code className="text-indigo-300 bg-indigo-950/60 px-1 py-0.5 rounded mx-1">metadata</code> configuration object, while rich structured interactive cards like JSON-LD are fully supported by outputting raw script tags within layout scopes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Structured dynamic FAQs Section */}
      <section className="bg-slate-900/40 border-t border-slate-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-indigo-400 text-xs font-bold tracking-widest uppercase">FAQ KNOWLEDGE-BASE</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">Next.js Structured Schema FAQs</h2>
            <p className="mt-3 text-sm text-slate-400">
              Answers to technical queries about parsing and rendering dynamic JSON-LD inside React contexts and Next.js frameworks.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Why use structured data schemas in Next.js?",
                a: "Structured JSON-LD schemas explicitly instruct Google and other crawlers on page architecture. This improves rich snippets inclusion, star ratings, aggregate reviews display, and local map discovery for your application.",
              },
              {
                q: "Where does JSON-LD live in the HTML layout structure?",
                a: "JSON-LD elements can safely live anywhere in either the <head> or <body> tags. Standard practice suggests placing them inside layouts or pages directly so they populate as early as possible during semantic parsing.",
              },
              {
                q: "Does this generator support dynamic content hydration?",
                a: "Absolutely! The React logic generated provides standard React interpolation formatting. Simply map your dynamic database state or dynamic variables to the returned JSON-LD array.",
              },
            ].map((faq, index) => (
              <div 
                key={index} 
                className="bg-slate-900 border border-slate-800 rounded-xl transition-all duration-350 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setFaqOpenStates(prev => ({ ...prev, [index]: !prev[index] }))}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-850 transition-colors"
                >
                  <span className="font-bold text-slate-200 text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className="text-slate-400 shrink-0">
                    {faqOpenStates[index] ? "−" : "+"}
                  </span>
                </button>
                {faqOpenStates[index] && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 border-t border-slate-800/55 leading-relaxed bg-slate-900/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} Texly SEO Operating System. Professional Next.js Schema Engine. All rights reserved.</p>
      </footer>
    </div>
  );
}
```