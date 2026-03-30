import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  const baseUrl = "https://texlyonline.in";

  // 🟢 STATIC
  const staticPages = ["", "blog", "about-us", "contact-us"];

  const staticXml = staticPages.map((page) => `
    <url>
      <loc>${baseUrl}/${page}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    </url>
  `).join("");

  // 🟢 BLOG FETCH
  const { data: blogs } = await supabase
    .from("articles")
    .select("slug, updated_at")
    .eq("status", "approved");

  const blogXml = (blogs || []).map((blog) => `
    <url>
      <loc>${baseUrl}/blog/${blog.slug}</loc>
      <lastmod>${
        blog.updated_at
          ? new Date(blog.updated_at).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0]
      }</lastmod>
    </url>
  `).join("");

  // 🟢 🔥 TOOL FETCH (AUTO)
  const { data: tools } = await supabase
    .from("tools")
    .select("slug");

  const toolsXml = (tools || []).map((tool) => `
    <url>
      <loc>${baseUrl}/tool/${tool.slug}</loc>
      <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    </url>
  `).join("");

  // 🟢 FINAL XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticXml}
    ${blogXml}
    ${toolsXml}
  </urlset>`;

  res.setHeader("Content-Type", "text/xml");
  res.status(200).send(xml);
}
