import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // 🔥 Latest Blogs
    const { data: blogs } = await supabase
      .from("articles")
      .select("slug")
      .order("created_at", { ascending: false })
      .limit(5);

    // 🔥 Latest Tools
    const { data: tools } = await supabase
      .from("tools")
      .select("slug")
      .order("created_at", { ascending: false })
      .limit(5);

    // 🔗 URLs
    const blogUrls = (blogs || []).map(
      (b) => `https://texlyonline.in/blog/${b.slug}`
    );

    const toolUrls = (tools || []).map(
      (t) => `https://texlyonline.in/tool/${t.slug}`
    );

    const urls = [...blogUrls, ...toolUrls];

    // 🚀 IndexNow submit (Bing)
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: "texlyonline.in",
        key: "361153f80d9d453ca1331016d0af3805",
        keyLocation:
          "https://texlyonline.in/361153f80d9d453ca1331016d0af3805.txt",
        urlList: urls,
      }),
    });

    // 🚀 Google Ping (IMPORTANT)
    await fetch(
      "https://www.google.com/ping?sitemap=https://texlyonline.in/sitemap.xml"
    );

    return res.json({
      success: true,
      indexed: urls.length,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Auto index failed" });
  }
}
