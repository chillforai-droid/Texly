import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    // 🔹 BLOG DATA (dynamic)
    const { data, error } = await supabase
      .from("articles")
      .select("slug, updated_at");

    if (error) throw error;

    // 🔹 STATIC PAGES
    const staticPages = [
      "",
      "blog",
      "about-us",
      "contact-us",
      "privacy-policy",
      "terms-and-conditions"
    ];

    // 🔹 TOOLS (तुम्हारे सारे tools)
    const tools = [
      "remove-extra-spaces-online",
      "remove-line-breaks-tool",
      "remove-duplicate-lines-tool",
      "remove-empty-lines-online",
      "remove-numbers-from-text",
      "remove-special-characters-online",
      "remove-html-tags-online",
      "upper-case-converter",
      "lower-case-converter",
      "title-case-converter",
      "word-counter-online-free",
      "character-counter-tool",
      "reading-time-calculator-online",
      "text-reverser-online",
      "text-repeater-tool",
      "lorem-ipsum-generator-online",
      "clean-text-online-free",
      "remove-accents-from-text",
      "remove-emojis-online",
      "remove-punctuation-tool",
      "remove-all-whitespace-online",
      "remove-duplicate-words-online",
      "trim-text-online",
      "whitespace-remover-online",
      "markdown-to-plain-text",
      "slug-generator-online-free",
      "binary-to-text-converter",
      "text-to-binary-converter",
      "camel-case-converter",
      "snake-case-converter",
      "kebab-case-converter",
      "pascal-case-converter",
      "constant-case-converter",
      "alternating-case-converter",
      "inverse-case-converter",
      "sentence-case-converter",
      "base64-encode-online",
      "base64-decode-online",
      "url-encode-online",
      "url-decode-online",
      "rot13-cipher-online",
      "morse-code-translator",
      "text-to-hex-converter",
      "hex-to-text-converter",
      "html-entity-encoder",
      "html-entity-decoder",
      "nato-phonetic-alphabet-translator",
      "text-case-converter-online",
      "braille-translator-online",
      "line-counter-online",
      "sentence-counter-online",
      "paragraph-counter-online",
      "text-density-analyzer",
      "case-distribution-analyzer",
      "extract-emails-from-text",
      "extract-urls-from-text",
      "character-frequency-counter",
      "word-length-statistics",
      "image-to-text-extractor",
      "jwt-decoder-online",
      "text-diff-checker-online",
      "find-and-replace-text-online",
      "sort-lines-alphabetically",
      "upside-down-text-generator",
      "mirror-text-generator",
      "text-to-list-converter",
      "add-prefix-suffix-to-lines",
      "random-string-generator-online",
      "json-formatter-online",
      "csv-to-json-converter",
      "zalgo-text-generator",
      "ascii-banner-generator",
      "text-to-json-converter-online",
      "json-to-text-converter",
      "pregnancy-due-date-calculator",
      "text-steganography-hidden-message",
      "password-generator-strength-meter",
      "sql-formatter-online",
      "json-to-csv-converter-online",
      "invisible-text-generator",
      "youtube-timestamp-generator",
      "fancy-text-generator-online"
    ];

    // 🔹 STATIC XML
    const staticXml = staticPages.map(
      (page) => `
      <url>
        <loc>https://www.texly.online/${page}</loc>
        <changefreq>weekly</changefreq>
        <priority>${page === "" ? "1.0" : "0.9"}</priority>
      </url>`
    );

    // 🔹 TOOLS XML
    const toolsXml = tools.map(
      (tool) => `
      <url>
        <loc>https://www.texly.online/tool/${tool}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`
    );

    // 🔹 BLOG XML (dynamic)
    const blogXml = (data || []).map(
  (item) => `
  <url>
    <loc>https://www.texly.online/blog/${item.slug}</loc>
    <lastmod>${item.updated_at 
      ? new Date(item.updated_at).toISOString() 
      : new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
);
    // 🔹 FINAL XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticXml.join("")}
      ${toolsXml.join("")}
      ${blogXml.join("")}
    </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xml);

  } catch (err) {
    res.status(500).send("ERROR: " + err.message);
  }
}
