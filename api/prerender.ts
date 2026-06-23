/**
 * api/prerender.ts
 * Googlebot / social crawlers को server-rendered HTML देता है।
 *
 * Problem: Texly एक Vite + React SPA है।
 *   - Real users: JavaScript execute करते हैं → React renders full UI ✅
 *   - Googlebot:  HTML receive करता है → सिर्फ खाली <div id="root"></div> दिखता है ❌
 *
 * Solution: User-agent header check करके bots को pre-rendered HTML serve करो।
 *   vercel.json में bot user-agent वाले requests यहाँ route होते हैं।
 *
 * Strategy:
 *   1. URL path से page type detect करो
 *   2. उस page का meaningful static HTML बनाओ (title, description, h1, structured data)
 *   3. Full HTML document return करो जिसे Googlebot index कर सके
 *
 * Routes handled:
 *   /                          → Homepage
 *   /tools/:slug               → Tool/Hub page
 *   /tool/:slug                → Legacy tool page
 *   /blog/:slug                → Blog post (Supabase से fetch)
 *   /seo/:slug                 → SEO automation pages (pages.json से)
 *   /ai-tools                  → AI tools listing
 *   /about-us, /contact-us     → Static pages
 *   /* (fallback)              → Generic branded HTML
 */

import fs from "fs";
import path from "path";
import { ALL_TOOLS } from "../src/data/tools";
import { getSEOData } from "../src/data/seo";

// ── Escape text used inside HTML attributes / body to avoid breaking markup ─
function esc(str: string = ""): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ── Build unique, real per-tool metadata from tools.ts (+ seo.ts when available) ─
// This is the fix for the "Low value content" AdSense rejection: previously every
// /tool/:slug page that wasn't hand-mapped fell back to one generic templated
// sentence, so crawlers saw near-duplicate descriptions across dozens of pages.
// Now every tool pulls its own real, unique copy from the actual app data.
function getToolPageMeta(slug: string): {
  title: string;
  description: string;
  h1: string;
  intro?: string;
  howToUse?: string[];
  faqs?: { q: string; a: string }[];
  benefits?: string[];
  useCases?: string[];
} | null {
  const tool = ALL_TOOLS.find((t) => t.slug === slug);
  if (!tool) return null;

  const seo = getSEOData(tool.id);

  const title = seo?.title || tool.metaTitle || `${tool.name}`;
  const description =
    seo?.metaDescription ||
    tool.metaDescription ||
    tool.description ||
    tool.shortDescription;
  const h1 = seo?.h1 || tool.name.replace(/[⚡✨🔥]/g, "").trim();

  return {
    title,
    description,
    h1,
    intro: seo?.intro,
    howToUse: seo?.howToUse,
    faqs: seo?.faqs,
    benefits: seo?.benefits,
    useCases: seo?.useCases,
  };
}

// ── Render a tool's full unique body so the page isn't just one thin line ──
function buildToolBody(meta: NonNullable<ReturnType<typeof getToolPageMeta>>, baseUrl: string): string {
  let body = `<main>\n  <h1>${esc(meta.h1)}</h1>\n  <p>${esc(meta.description)}</p>\n`;

  if (meta.intro) {
    body += `  <section><p>${esc(meta.intro)}</p></section>\n`;
  }
  if (meta.howToUse?.length) {
    body += `  <section><h2>How to use ${esc(meta.h1)}</h2><ol>\n`;
    meta.howToUse.forEach((step) => {
      body += `    <li>${esc(step)}</li>\n`;
    });
    body += `  </ol></section>\n`;
  }
  if (meta.benefits?.length) {
    body += `  <section><h2>Benefits</h2><ul>\n`;
    meta.benefits.forEach((b) => {
      body += `    <li>${esc(b)}</li>\n`;
    });
    body += `  </ul></section>\n`;
  }
  if (meta.useCases?.length) {
    body += `  <section><h2>Use Cases</h2><ul>\n`;
    meta.useCases.forEach((u) => {
      body += `    <li>${esc(u)}</li>\n`;
    });
    body += `  </ul></section>\n`;
  }
  if (meta.faqs?.length) {
    body += `  <section><h2>Frequently Asked Questions</h2>\n`;
    meta.faqs.slice(0, 6).forEach((f) => {
      body += `    <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>\n`;
    });
    body += `  </section>\n`;
  }

  body += `  <p><a href="${baseUrl}">← Back to Texly — 100+ Free Online Tools</a></p>\n</main>`;
  return body;
}

// ── Tool metadata map (slug → title + description) ─────────────────────────
const TOOL_META: Record<string, { title: string; description: string; h1: string }> = {
  "text-analysis-hub":    { title: "Text Analysis Hub — Word Counter, Reading Time & More | Texly", h1: "Text Analysis Hub", description: "Free online text analysis tools: word counter, character counter, reading time calculator, sentence & paragraph counter, text density analyzer and more." },
  "text-cleaning-hub":    { title: "Text Cleaning Hub — Remove Spaces, Duplicates & More | Texly", h1: "Text Cleaning Hub", description: "Clean text online for free: remove extra spaces, line breaks, duplicate lines, empty lines, HTML tags, numbers, punctuation, emojis and more." },
  "text-converter-hub":   { title: "Text Converter Hub — Case, Base64, URL Encode & More | Texly", h1: "Text Converter Hub", description: "Convert text online: uppercase, lowercase, title case, camelCase, Base64 encode/decode, URL encode/decode, binary, hex, morse code and 20+ converters." },
  "text-utility-hub":     { title: "Text Utility Hub — Reverse, Sort, Find & Replace & More | Texly", h1: "Text Utility Hub", description: "Free text utilities: reverse text, sort lines, find & replace, add prefix/suffix, lorem ipsum generator, JSON formatter, password generator and more." },
  "pdf-tools-hub":        { title: "PDF Tools Hub — Convert, Merge, Split & Compress | Texly", h1: "PDF Tools Hub", description: "Free online PDF tools: merge PDFs, split, compress, convert PDF to Word/Excel/Image, add watermark, remove password and more. No signup required." },
  "ai-tools-hub":         { title: "AI Tools Hub — AI Writing, Rewrite & Content Tools | Texly", h1: "AI Tools Hub", description: "Free AI-powered text tools: AI writer, rewriter, summarizer, grammar checker, paraphraser and more. No signup, runs instantly in your browser." },
  "generators-hub":       { title: "Generators Hub — QR Code, Color Palette, Image to Text | Texly", h1: "Generators Hub", description: "Free online generators: QR code generator, color palette generator, image to text extractor (OCR), random string generator and more." },
  "invisible-text-suite": { title: "Invisible Text Generator — Copy & Paste Blank Characters | Texly", h1: "Invisible Text Generator", description: "Generate invisible text characters online. Copy blank Unicode characters for WhatsApp, Instagram, Twitter and more. Free, no signup required." },
  "ai-text-suite":        { title: "AI Text Suite — AI Writing, Rewrite & Summarize | Texly", h1: "AI Text Suite", description: "All-in-one AI text suite: write, rewrite, summarize, paraphrase and improve your content using AI. Free to use, no signup required." },
  "face-swap":            { title: "Face Swap Online — Free AI Face Swap Tool | Texly", h1: "AI Face Swap", description: "Free online AI face swap tool. Swap faces in photos instantly using AI. No watermark, no signup, runs in your browser." },
  "bg-remover":           { title: "Background Remover — Remove Image Background Free | Texly", h1: "Background Remover", description: "Remove image background online for free using AI. Instant transparent PNG output. No signup, no watermark." },
  "enhancer":             { title: "Image Enhancer — Enhance Photo Quality Online Free | Texly", h1: "Image Enhancer", description: "Enhance image quality online for free. Sharpen, denoise and upscale photos using AI. No signup required." },
  "compressor":           { title: "Image Compressor — Compress Images Online Free | Texly", h1: "Image Compressor", description: "Compress images online for free without losing quality. Reduce PNG, JPG, WebP file size instantly in your browser." },
  "image-upscale":        { title: "Image Upscaler — Upscale Images 2x 4x Online Free | Texly", h1: "AI Image Upscaler", description: "Upscale images 2x or 4x online using AI super-resolution. Free, no signup, no watermark. Supports JPG, PNG and WebP." },
  "image-generator":      { title: "AI Image Generator — Create Images from Text Free | Texly", h1: "AI Image Generator", description: "Generate images from text prompts using AI. Free AI art generator, no signup required. Create stunning images instantly." },
  "image-format-converter": { title: "Image Format Converter — Convert JPG PNG WebP Free | Texly", h1: "Image Format Converter", description: "Convert images between formats online: JPG, PNG, WebP, GIF, BMP and more. Free, fast, no signup required." },
  "snapchat-tag-generator": { title: "Snapchat Tag Generator — Create Snapcode Free | Texly", h1: "Snapchat Tag Generator", description: "Generate Snapchat tags and Snapcodes online for free. Create scannable Snapchat profile links instantly." },
  "robots-txt-tester":    { title: "Robots.txt Tester — Test & Validate robots.txt Online | Texly", h1: "Robots.txt Tester", description: "Test and validate your robots.txt file online. Check if Googlebot and other crawlers can access your pages. Free SEO tool." },
  "json-path-finder":     { title: "JSON Path Finder — Find JSONPath Expressions Online | Texly", h1: "JSON Path Finder", description: "Find JSONPath expressions interactively. Click on any JSON element to get its path. Free online JSON path finder tool." },
  "regex-explainer":      { title: "Regex Explainer — Understand & Test Regular Expressions | Texly", h1: "Regex Explainer", description: "Explain and test regular expressions online. Get plain English descriptions of your regex patterns. Free regex tester and explainer." },
  "cron-expression-generator": { title: "Cron Expression Generator — Build Cron Jobs Online | Texly", h1: "Cron Expression Generator", description: "Generate cron expressions easily with a visual builder. Build, test and explain cron job schedules online. Free cron expression tool." },
  "redirect-chain-checker": { title: "Redirect Chain Checker — Track URL Redirects Online | Texly", h1: "Redirect Chain Checker", description: "Check redirect chains for any URL. Trace 301, 302 redirects, detect loops and analyze redirect performance. Free SEO tool." },
  "word-counter-online-free": { title: "Word Counter Online — Count Words, Characters & More Free | Texly", h1: "Word Counter Online", description: "Free online word counter. Count words, characters, sentences, paragraphs and reading time instantly. No signup required." },
  "text-to-list-converter": { title: "Text to List Converter — Convert Text to Bullet List | Texly", h1: "Text to List Converter", description: "Convert text to a bulleted or numbered list online. Split by lines, commas, or custom separator. Free text to list tool." },
  "remove-special-characters-online": { title: "Remove Special Characters Online — Clean Text Free | Texly", h1: "Remove Special Characters Online", description: "Remove special characters from text online for free. Strip symbols, punctuation, or custom characters instantly. No signup required." },
};

const STATIC_PAGE_META: Record<string, { title: string; description: string; h1: string }> = {
  "":           { title: "Texly — 100+ Free Online Text & AI Tools | No Signup", h1: "100+ Free Online Text & AI Tools", description: "Free online text tools: remove special characters, clean text, convert case, encode URLs, count words and 100+ more tools. No signup, 100% private." },
  "blog":       { title: "Texly Blog — Text Tools Tips, SEO & Developer Guides", h1: "Texly Blog", description: "Tips, tutorials and guides on text processing, SEO optimization, developer tools, and productivity from the Texly team." },
  "ai-tools":   { title: "AI Tools — Free AI Writing & Content Tools | Texly", h1: "Free AI Tools Online", description: "Free AI-powered tools: AI writer, text summarizer, paraphraser, grammar checker and more. No signup required." },
  "ai-automation": { title: "AI Automation — Bulk Content & SEO Automation | Texly", h1: "AI Automation Panel", description: "Automate content creation, SEO page generation, sitemap management and more with Texly's AI automation tools." },
  "best-free-text-tools-online": { title: "Best Free Text Tools Online — 100+ Free Utilities | Texly", h1: "Best Free Text Tools Online", description: "The best collection of free online text tools. 100+ utilities for cleaning, converting, analyzing and generating text. No signup needed." },
  "about-us":   { title: "About Texly — Free Online Text & AI Tools Platform", h1: "About Texly", description: "Texly is a free online platform offering 100+ text tools, AI writing assistants, PDF utilities and more. No signup, no ads, 100% private." },
  "contact-us": { title: "Contact Texly — Get in Touch", h1: "Contact Us", description: "Have a question or suggestion? Contact the Texly team. We'd love to hear from you." },
  "privacy-policy": { title: "Privacy Policy | Texly", h1: "Privacy Policy", description: "Read Texly's privacy policy. We don't collect personal data, sell information or use cookies for tracking." },
  "terms-and-conditions": { title: "Terms and Conditions | Texly", h1: "Terms and Conditions", description: "Read Texly's terms and conditions of service." },
  "download":   { title: "Download Texly — Free Desktop & Mobile App", h1: "Download Texly", description: "Download the Texly app for desktop and mobile. Get 100+ text tools offline on Windows, Mac, Android and iOS." },
};

function buildHTML(opts: {
  title: string;
  description: string;
  h1: string;
  canonical: string;
  bodyContent: string;
  schemaJson?: string;
}): string {
  const schema = opts.schemaJson ?? JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": opts.title,
    "description": opts.description,
    "url": opts.canonical,
    "publisher": {
      "@type": "Organization",
      "name": "Texly",
      "url": "https://www.texlyonline.in"
    }
  });

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(opts.title)}</title>
  <meta name="description" content="${esc(opts.description)}" />
  <link rel="canonical" href="${opts.canonical}" />
  <meta property="og:title" content="${esc(opts.title)}" />
  <meta property="og:description" content="${esc(opts.description)}" />
  <meta property="og:url" content="${opts.canonical}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Texly" />
  <meta property="og:image" content="https://www.texlyonline.in/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(opts.title)}" />
  <meta name="twitter:description" content="${esc(opts.description)}" />
  <meta name="twitter:image" content="https://www.texlyonline.in/og-image.png" />
  <meta name="robots" content="index, follow" />
  <script type="application/ld+json">${schema}</script>
</head>
<body>
${opts.bodyContent}
</body>
</html>`;
}

export default async function handler(req: any, res: any): Promise<void> {
  const baseUrl = process.env.BASE_URL || "https://www.texlyonline.in";
  const urlPath: string = (req.url || "/").split("?")[0].replace(/\/$/, "") || "/";

  // ── Detect page type from path ────────────────────────────────────────────
  const blogMatch   = urlPath.match(/^\/blog\/(.+)$/);
  const seoMatch    = urlPath.match(/^\/seo\/(.+)$/);
  const toolsMatch  = urlPath.match(/^\/tools\/(.+)$/);
  const toolMatch   = urlPath.match(/^\/tool\/(.+)$/);
  const staticSlug  = urlPath.replace(/^\//, "");

  const canonical = `${baseUrl}${urlPath === "/" ? "" : urlPath}`;

  // ── 1. Blog post — fetch from Supabase ───────────────────────────────────
  if (blogMatch) {
    const slug = blogMatch[1];
    try {
      const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
      const anonKey     = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

      if (supabaseUrl && anonKey) {
        const apiUrl = `${supabaseUrl}/rest/v1/articles?slug=eq.${encodeURIComponent(slug)}&select=title,meta_description,content,author,created_at&limit=1`;
        const resp = await fetch(apiUrl, {
          headers: {
            "apikey": anonKey,
            "Authorization": `Bearer ${anonKey}`,
          },
        });

        if (resp.ok) {
          const rows = await resp.json();
          if (Array.isArray(rows) && rows.length > 0) {
            const art = rows[0];
            const title = `${art.title} | Texly Blog`;
            const description = art.meta_description || art.content?.slice(0, 160) || title;
            const datePublished = art.created_at ? new Date(art.created_at).toISOString().split("T")[0] : "";

            const schema = JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": art.title,
              "description": description,
              "url": canonical,
              "datePublished": datePublished,
              "publisher": { "@type": "Organization", "name": "Texly", "url": baseUrl }
            });

            const body = `<article>
  <h1>${art.title}</h1>
  <p>${description}</p>
  ${datePublished ? `<time datetime="${datePublished}">${datePublished}</time>` : ""}
</article>`;

            res.setHeader("Content-Type", "text/html; charset=utf-8");
            res.setHeader("X-Prerender", "1");
            res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=300");
            return res.status(200).send(buildHTML({ title, description, h1: art.title, canonical, bodyContent: body, schemaJson: schema }));
          }
        }
      }
    } catch (_err) { /* fall through */ }

    // Blog post not found fallback
    const title = "Blog | Texly";
    const description = "Texly blog — tips, tutorials and guides on text tools, SEO and developer productivity.";
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=600");
    return res.status(200).send(buildHTML({ title, description, h1: "Texly Blog", canonical, bodyContent: `<h1>Texly Blog</h1><p>${description}</p>` }));
  }

  // ── 2. SEO automation page — fetch from pages.json ───────────────────────
  if (seoMatch) {
    const slug = seoMatch[1];
    try {
      const localPaths = [
        path.join(process.cwd(), "data", "pages.json"),
        path.join(__dirname, "..", "data", "pages.json"),
      ];

      let pages: any[] | null = null;
      for (const lp of localPaths) {
        if (fs.existsSync(lp)) {
          pages = JSON.parse(fs.readFileSync(lp, "utf-8"));
          break;
        }
      }

      if (!pages) {
        // GitHub fallback
        const githubRepo  = process.env.SEO_GITHUB_REPO  || "chillforai-droid/Texly";
        const githubToken = process.env.SEO_GITHUB_TOKEN || "";
        const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/main/data/pages.json`;
        const headers: Record<string, string> = { "User-Agent": "texly-prerender-bot" };
        if (githubToken) headers["Authorization"] = `token ${githubToken}`;
        const resp = await fetch(rawUrl, { headers });
        if (resp.ok) pages = await resp.json();
      }

      if (pages && Array.isArray(pages)) {
        const page = pages.find((p: any) => p.slug === slug);
        if (page) {
          const title       = page.metaTitle       || `${page.h1 || slug} | Texly`;
          const description = page.metaDescription || page.intro || title;
          const h1          = page.h1              || slug;

          // Build structured body from page data
          let bodyContent = `<h1>${h1}</h1>\n<p>${description}</p>\n`;
          if (page.intro)    bodyContent += `<section><p>${page.intro}</p></section>\n`;
          if (page.sections?.length) {
            page.sections.slice(0, 5).forEach((s: any) => {
              if (s.heading) bodyContent += `<section><h2>${s.heading}</h2><p>${s.body || ""}</p></section>\n`;
            });
          }
          if (page.faqs?.length) {
            bodyContent += `<section><h2>Frequently Asked Questions</h2>\n`;
            page.faqs.slice(0, 5).forEach((f: any) => {
              bodyContent += `<details><summary>${f.question}</summary><p>${f.answer}</p></details>\n`;
            });
            bodyContent += `</section>\n`;
          }

          const schema = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": description,
            "url": canonical,
            "publisher": { "@type": "Organization", "name": "Texly", "url": baseUrl }
          });

          res.setHeader("Content-Type", "text/html; charset=utf-8");
          res.setHeader("X-Prerender", "1");
          res.setHeader("Cache-Control", "public, s-maxage=7200, stale-while-revalidate=300");
          return res.status(200).send(buildHTML({ title, description, h1, canonical, bodyContent, schemaJson: schema }));
        }
      }
    } catch (_err) { /* fall through */ }
  }

  // ── 3. Tools page (/tools/:slug) ─────────────────────────────────────────
  if (toolsMatch) {
    const slug = toolsMatch[1];
    const realMeta = getToolPageMeta(slug);
    const meta = TOOL_META[slug] || realMeta || {
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} | Texly`,
      h1:    slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase()),
      description: `Free online ${slug.replace(/-/g, " ")} tool. No signup required. Runs in your browser.`,
    };

    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": meta.title,
      "description": meta.description,
      "url": canonical,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
      "publisher": { "@type": "Organization", "name": "Texly", "url": baseUrl }
    });

    const body = "intro" in meta || "faqs" in meta
      ? buildToolBody(meta as NonNullable<ReturnType<typeof getToolPageMeta>>, baseUrl)
      : `<main>
  <h1>${esc(meta.h1)}</h1>
  <p>${esc(meta.description)}</p>
  <p><a href="${baseUrl}">← Back to Texly — 100+ Free Online Tools</a></p>
</main>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Prerender", "1");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=300");
    return res.status(200).send(buildHTML({ ...meta, canonical, bodyContent: body, schemaJson: schema }));
  }

  // ── 4. Legacy tool page (/tool/:slug) ────────────────────────────────────
  if (toolMatch) {
    const slug = toolMatch[1];
    const realMeta = getToolPageMeta(slug);

    // Real tool found in tools.ts → use its actual unique title/description/
    // intro/FAQs (this is what fixes duplicate "low value content" pages).
    if (realMeta) {
      const schema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": realMeta.title,
        "description": realMeta.description,
        "url": canonical,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
        ...(realMeta.faqs?.length
          ? {
              "mainEntity": realMeta.faqs.slice(0, 6).map((f) => ({
                "@type": "Question",
                "name": f.q,
                "acceptedAnswer": { "@type": "Answer", "text": f.a },
              })),
            }
          : {}),
        "publisher": { "@type": "Organization", "name": "Texly", "url": baseUrl },
      });

      const body = buildToolBody(realMeta, baseUrl);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.setHeader("X-Prerender", "1");
      res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=300");
      return res.status(200).send(
        buildHTML({ title: realMeta.title, description: realMeta.description, h1: realMeta.h1, canonical, bodyContent: body, schemaJson: schema })
      );
    }

    // Tool not found in tools.ts at all (shouldn't normally happen) — still
    // avoid the old single boilerplate sentence; at least vary it per-slug.
    const label = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    const meta = {
      title: `${label} — Free Online Tool | Texly`,
      h1: label,
      description: `${label} online, free and instant — part of Texly's text & utility toolset. No signup, no install, runs entirely in your browser.`,
    };

    const body = `<main>
  <h1>${esc(meta.h1)}</h1>
  <p>${esc(meta.description)}</p>
  <p><a href="${baseUrl}">← Back to Texly — 100+ Free Online Tools</a></p>
</main>`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("X-Prerender", "1");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=300");
    return res.status(200).send(buildHTML({ ...meta, canonical, bodyContent: body }));
  }

  // ── 5. Static pages (homepage, about, blog listing etc.) ─────────────────
  const staticMeta = STATIC_PAGE_META[staticSlug] || STATIC_PAGE_META[""];
  const body = `<main>
  <h1>${staticMeta.h1}</h1>
  <p>${staticMeta.description}</p>
  <nav aria-label="Popular Tools">
    <h2>Popular Tools</h2>
    <ul>
      <li><a href="${baseUrl}/tools/text-analysis-hub">Text Analysis Hub</a></li>
      <li><a href="${baseUrl}/tools/text-cleaning-hub">Text Cleaning Hub</a></li>
      <li><a href="${baseUrl}/tools/text-converter-hub">Text Converter Hub</a></li>
      <li><a href="${baseUrl}/tools/pdf-tools-hub">PDF Tools Hub</a></li>
      <li><a href="${baseUrl}/tools/ai-tools-hub">AI Tools Hub</a></li>
      <li><a href="${baseUrl}/tools/generators-hub">Generators Hub</a></li>
    </ul>
  </nav>
</main>`;

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("X-Prerender", "1");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=300");
  return res.status(200).send(buildHTML({ ...staticMeta, canonical, bodyContent: body }));
}
