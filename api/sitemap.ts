export default async function handler(req: any, res: any) {
  try {
    const baseUrl = process.env.BASE_URL || "https://www.texlyonline.in";
    const today = new Date().toISOString().split('T')[0];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // ── 1. Static Core Pages ──────────────────────────────────────────────────
    const staticPages = [
      { path: "/",                                    priority: "1.0",  changefreq: "daily"   },
      { path: "/blog",                                priority: "0.8",  changefreq: "daily"   },
      { path: "/about-us",                            priority: "0.5",  changefreq: "monthly" },
      { path: "/privacy-policy",                      priority: "0.3",  changefreq: "monthly" },
      { path: "/terms-and-conditions",                priority: "0.3",  changefreq: "monthly" },
      { path: "/contact-us",                          priority: "0.5",  changefreq: "monthly" },
      { path: "/remove-special-characters-online",   priority: "0.9",  changefreq: "weekly"  },
      { path: "/best-free-text-tools-online",         priority: "0.8",  changefreq: "monthly" },
      { path: "/ai-automation",                       priority: "0.6",  changefreq: "monthly" },
    ];

    // ── 2. Hub Pages — HIGHEST PRIORITY (these replace 120+ thin pages) ───────
    const hubPages = [
      { path: "/tools/text-analysis-hub",   priority: "1.0", changefreq: "weekly" },
      { path: "/tools/text-cleaning-hub",   priority: "1.0", changefreq: "weekly" },
      { path: "/tools/text-converter-hub",  priority: "1.0", changefreq: "weekly" },
      { path: "/tools/text-utility-hub",    priority: "1.0", changefreq: "weekly" },
      { path: "/tools/pdf-tools-hub",       priority: "1.0", changefreq: "weekly" },
      { path: "/tools/ai-tools-hub",        priority: "1.0", changefreq: "weekly" },
      { path: "/tools/generators-hub",      priority: "1.0", changefreq: "weekly" },
    ];

    // ── 3. AI / Special Tool Pages — standalone (high quality, keep indexed) ──
    const specialToolPages = [
      { path: "/tools/invisible-text-suite",          priority: "0.9", changefreq: "weekly" },
      { path: "/tools/ai-text-suite",                 priority: "0.9", changefreq: "weekly" },
      { path: "/tools/face-swap",                     priority: "0.9", changefreq: "weekly" },
      { path: "/tools/bg-remover",                    priority: "0.9", changefreq: "weekly" },
      { path: "/tools/enhancer",                      priority: "0.9", changefreq: "weekly" },
      { path: "/tools/compressor",                    priority: "0.9", changefreq: "weekly" },
      { path: "/tools/image-upscale",                 priority: "0.9", changefreq: "weekly" },
      { path: "/tools/image-generator",               priority: "0.9", changefreq: "weekly" },
      { path: "/tools/image-format-converter",        priority: "0.8", changefreq: "weekly" },
      { path: "/tools/snapchat-tag-generator",        priority: "0.8", changefreq: "weekly" },
      { path: "/tools/robots-txt-tester",             priority: "0.8", changefreq: "weekly" },
      { path: "/tools/json-path-finder",              priority: "0.8", changefreq: "weekly" },
      { path: "/tools/regex-explainer",               priority: "0.8", changefreq: "weekly" },
      { path: "/tools/cron-expression-generator",     priority: "0.8", changefreq: "weekly" },
      { path: "/tools/redirect-chain-checker",        priority: "0.8", changefreq: "weekly" },
    ];

    // ── NOTE: Old /tool/* slugs are intentionally NOT included ───────────────
    // All old /tool/* URLs now 301 redirect to hub pages (set in App.tsx).
    // Including them in sitemap would send Google to redirect chains.
    // Google will discover hub pages via redirects + direct sitemap entries above.

    // Add all static + hub + special pages
    [...staticPages, ...hubPages, ...specialToolPages].forEach(p => {
      xml += `\n  <url>\n    <loc>${baseUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`;
    });

    // ── 4. Dynamic Blog Posts from Supabase ───────────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

    if (supabaseUrl && supabaseAnonKey) {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        // Blog posts
        const { data: articles } = await supabase
          .from("articles")
          .select("slug, updated_at, created_at")
          .limit(1000);

        if (articles) {
          articles.forEach((article: any) => {
            const lastmod = new Date(article.updated_at || article.created_at || Date.now())
              .toISOString().split("T")[0];
            xml += `\n  <url>\n    <loc>${baseUrl}/blog/${article.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`;
          });
          console.log(`[SITEMAP] Blog posts: ${articles.length}`);
        }

        // Dynamic AI Tools (only new ones not in specialToolPages above)
        const knownSlugs = new Set(specialToolPages.map(p => p.path.replace("/tools/", "")));
        const { data: aiTools } = await supabase
          .from("ai_tools")
          .select("slug, updated_at, created_at")
          .eq("is_active", true)
          .limit(500);

        if (aiTools) {
          let added = 0;
          aiTools.forEach((tool: any) => {
            if (knownSlugs.has(tool.slug)) return; // skip duplicates
            const lastmod = tool.updated_at
              ? new Date(tool.updated_at).toISOString().split("T")[0]
              : today;
            xml += `\n  <url>\n    <loc>${baseUrl}/tools/${tool.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
            added++;
          });
          console.log(`[SITEMAP] Dynamic AI tools added: ${added}`);
        }
      } catch (dbErr) {
        console.error("[SITEMAP] Supabase error:", dbErr);
        // graceful degradation
      }
    }

    // ── 5. AI SEO Pages from GitHub pages.json ────────────────────────────────
    try {
      let githubRepo = process.env.SEO_GITHUB_REPO || "chillforai-droid/Texly";
      if (githubRepo.includes("github.com/")) {
        githubRepo = githubRepo.split("github.com/")[1].replace(/\.git$/, "").replace(/\/$/, "");
      }
      const githubToken = process.env.SEO_GITHUB_TOKEN || "";
      const rawUrl = `https://raw.githubusercontent.com/${githubRepo}/main/data/pages.json`;
      const headers: Record<string, string> = {
        "Accept": "application/vnd.github.v3.raw",
        "User-Agent": "texly-sitemap-bot"
      };
      if (githubToken) headers["Authorization"] = `token ${githubToken}`;

      const pagesRes = await fetch(rawUrl, { headers });
      if (pagesRes.ok) {
        const seoPages: Array<{ slug: string; updatedAt?: string; createdAt?: string }> =
          await pagesRes.json();
        seoPages.forEach(page => {
          const lastmod = page.updatedAt
            ? new Date(page.updatedAt).toISOString().split("T")[0]
            : today;
          xml += `\n  <url>\n    <loc>${baseUrl}/seo/${page.slug}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.75</priority>\n  </url>`;
        });
        console.log(`[SITEMAP] SEO pages: ${seoPages.length}`);
      }
    } catch (seoErr) {
      console.error("[SITEMAP] SEO pages fetch error:", seoErr);
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
