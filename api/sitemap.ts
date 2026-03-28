import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );

    const { data, error } = await supabase
      .from("articles")
      .select("slug");

    if (error) throw error;

    const urls = data.map(
      (item) => `
      <url>
        <loc>https://www.texly.online/${item.slug}</loc>
      </url>`
    );

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.texly.online/</loc>
      </url>
      ${urls.join("")}
    </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);

  } catch (err) {
    res.status(500).send("Error generating sitemap");
  }
}
