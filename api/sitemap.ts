export default async function handler(req: any, res: any) {
  try {
    const baseUrl = process.env.BASE_URL || "https://www.texlyonline.in";
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // ── Static / Landing Pages ─────────────────────────────────────────────────
    const staticPages = [
      { path: "/",                               priority: "1.0", changefreq: "daily"   },
      { path: "/blog",                           priority: "0.8", changefreq: "daily"   },
      { path: "/prompts",                        priority: "0.9", changefreq: "daily"   },
      { path: "/tools/ai-prompts-library",       priority: "0.9", changefreq: "daily"   },
      { path: "/ai-tools",                       priority: "0.8", changefreq: "weekly"  },
      { path: "/best-free-text-tools-online",    priority: "0.7", changefreq: "monthly" },
      { path: "/remove-special-characters-online", priority: "0.7", changefreq: "monthly" },
      { path: "/download",                       priority: "0.5", changefreq: "monthly" },
      { path: "/about-us",                       priority: "0.5", changefreq: "monthly" },
      { path: "/privacy-policy",                 priority: "0.3", changefreq: "monthly" },
      { path: "/terms-and-conditions",           priority: "0.3", changefreq: "monthly" },
      { path: "/contact-us",                     priority: "0.5", changefreq: "monthly" }
    ];

    staticPages.forEach(p => {
      xml += `\n  <url>\n    <loc>${baseUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
    });

    // ── AI / Dev Tools — dedicated standalone pages under /tools/{slug} ─────────
    // (image-generator hata diya gaya hai — ab list mein nahi hai)
    const standaloneToolSlugs = [
      "face-swap", "bg-remover", "enhancer", "compressor", "image-upscale",
      "image-upscaler-enhancer", "image-format-converter", "ai-text-suite",
      "snapchat-tag-generator", "invisible-text-suite", "robots-txt-tester",
      "json-path-finder", "regex-explainer", "cron-expression-generator",
      "redirect-chain-checker", "youtube-analyzer"
    ];

    standaloneToolSlugs.forEach(slug => {
      xml += `\n  <url>\n    <loc>${baseUrl}/tools/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });

    // ── Tool Suite Hub Pages — /tools/{hub} (sabhi text/PDF/generator tools yahi se accessible hain) ──
    const hubSlugs = [
      "text-cleaning-hub", "text-converter-hub", "text-analysis-hub",
      "text-utility-hub", "pdf-tools-hub", "ai-tools-hub", "generators-hub"
    ];

    hubSlugs.forEach(slug => {
      xml += `\n  <url>\n    <loc>${baseUrl}/tools/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`;
    });

    // ── Standalone /tool/{slug} pages (apna khud ka dedicated SEO landing page hai) ──
    const toolPathSlugs = [
      "word-counter-online-free",
      "remove-special-characters-online",
      "text-to-list-converter",
      "image-size-reducer"
    ];

    toolPathSlugs.forEach(slug => {
      xml += `\n  <url>\n    <loc>${baseUrl}/tool/${slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
    });

    // ── AI SEO Automation Pages (GitHub से) ──────────────────────────────────
    try {
      const githubRepo = process.env.SEO_GITHUB_REPO || "mahendragope/texlyonline.in";
      const githubToken = process.env.SEO_GITHUB_TOKEN || "";
      const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/main/data/pages.json`;

      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3.raw",
        "User-Agent": "texly-sitemap-bot"
      };
      if (githubToken) headers["Authorization"] = `token ${githubToken}`;

      const pagesRes = await fetch(rawUrl, { headers });

      if (pagesRes.ok) {
        const seoPages: Array<{ slug: string; updatedAt?: string; createdAt?: string }> = await pagesRes.json();
        seoPages.forEach((page) => {
          const lastmod = page.updatedAt
            ? new Date(page.updatedAt).toISOString().split("T")[0]
            : today;
          xml += `\n  <url>\n    <loc>${baseUrl}/seo/${page.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`;
        });
        console.log(`[SITEMAP] ✅ AI SEO pages: ${seoPages.length}`);
      } else {
        console.warn(`[SITEMAP] ⚠️ pages.json fetch failed (${pagesRes.status}) — skipping`);
      }
    } catch (seoErr) {
      console.error("[SITEMAP] AI SEO pages error:", seoErr);
    }

    // ── Supabase Blog Posts ───────────────────────────────────────────────────
    // VITE_ prefix wale env vars bhi check karo (Vercel mein dono set ho sakte hain)
    const supabaseUrl =
      process.env.SUPABASE_URL ||
      process.env.VITE_SUPABASE_URL ||
      "";
    const supabaseAnonKey =
      process.env.SUPABASE_ANON_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      "";

    if (supabaseUrl && supabaseAnonKey) {
      try {
        // Direct REST API call — @supabase/supabase-js import ki zaroorat nahi
        // Isse Vercel serverless function mein bundle size bhi kam hogi
        let allArticles: Array<{ slug: string; updated_at?: string; created_at?: string }> = [];
        let from = 0;
        const pageSize = 1000;

        while (true) {
          const apiUrl = `${supabaseUrl}/rest/v1/articles?select=slug,updated_at,created_at&order=created_at.desc&limit=${pageSize}&offset=${from}`;
          const resp = await fetch(apiUrl, {
            headers: {
              "apikey": supabaseAnonKey,
              "Authorization": `Bearer ${supabaseAnonKey}`,
              "Content-Type": "application/json"
            }
          });

          if (!resp.ok) {
            console.warn(`[SITEMAP] ⚠️ Supabase fetch failed: ${resp.status}`);
            break;
          }

          const batch = await resp.json();
          if (!Array.isArray(batch) || batch.length === 0) break;

          allArticles = allArticles.concat(batch);
          if (batch.length < pageSize) break; // last page
          from += pageSize;
        }

        allArticles.forEach((article) => {
          const lastmod = new Date(article.updated_at || article.created_at || Date.now())
            .toISOString()
            .split("T")[0];
          xml += `\n  <url>\n    <loc>${baseUrl}/blog/${article.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
        });

        console.log(`[SITEMAP] ✅ Supabase blog posts: ${allArticles.length}`);
      } catch (dbErr) {
        console.error("[SITEMAP] ❌ Supabase error:", dbErr);
      }
    } else {
      console.warn("[SITEMAP] ⚠️ Supabase env vars missing — blogs skipped. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel.");
    }

    xml += "\n</urlset>";

    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=59");
    res.status(200).send(xml);
  } catch (err) {
    console.error("[SITEMAP] Handler crash:", err);
    res.status(500).send("Error generating sitemap");
  }
}
