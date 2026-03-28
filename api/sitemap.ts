export default function handler(req, res) {
  res.setHeader("Content-Type", "application/xml");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://www.texly.online/</loc>
    </url>
  </urlset>`;

  res.status(200).send(xml);
}
