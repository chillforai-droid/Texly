import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { ALL_TOOLS } from "../src/data/tools"; 

dotenv.config();

// Initialize Supabase for backend use
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const app = express();
app.use(express.json());

// Store OTPs temporarily (In a real app, use Redis or a DB)
// Note: On Vercel (serverless), this will only work for the current instance.
// For a production app on Vercel, use Supabase or Redis to store OTPs.
const otps = new Map<string, { code: string; expires: number }>();

// API Route to send OTP
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes

  otps.set(email, { code: otp, expires });

  // Setup nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Texly CMS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Article Deletion Verification Code",
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px; margin: auto;">
        <h2 style="color: #2563eb; text-align: center;">Texly Verification</h2>
        <p>You requested to delete an article. Please use the following 6-digit code to confirm this action:</p>
        <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 10px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #64748b; font-size: 14px;">This code will expire in 5 minutes. If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("OTP for", email, "is", otp, "(Email credentials not set)");
      return res.json({ success: true, message: "OTP generated (Check console since email credentials are not set)" });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send OTP email" });
  }
});

// API Route to verify OTP
app.post("/api/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const stored = otps.get(email);

  if (!stored) return res.status(400).json({ error: "No OTP found for this email" });
  if (Date.now() > stored.expires) {
    otps.delete(email);
    return res.status(400).json({ error: "OTP has expired" });
  }
  if (stored.code !== otp) return res.status(400).json({ error: "Invalid OTP" });

  otps.delete(email);
  res.json({ success: true });
});

// API Route for Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Texly Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Send to the owner's email
    replyTo: email, // Reply to the user who filled the form
    subject: `Contact Form: ${subject || "General Inquiry"}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject || "N/A"}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  };

  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log("Contact form from", email, "received (Email credentials not set)");
      return res.json({ success: true, message: "Form received (Email credentials not set)" });
    }

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Message sent successfully" });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

// Dynamic Sitemap Route
app.get("/sitemap.xml", async (req, res) => {
  const baseUrl = "https://texly.online";
  const staticPages = [
    "",
    "/tools",
    "/blog",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static pages
  const today = new Date().toISOString().split("T")[0];
  staticPages.forEach((page) => {
    xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`;
  });

  // Add tool pages
  ALL_TOOLS.forEach((tool) => {
    xml += `
  <url>
    <loc>${baseUrl}/tool/${tool.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  // Add blog posts from Supabase
  if (supabase) {
    try {
      const { data: articles } = await supabase
        .from("articles")
        .select("slug, created_at, updated_at")
        .order("created_at", { ascending: false });

      if (articles) {
        articles.forEach((article: any) => {
          const lastModDate = new Date(article.updated_at || article.created_at || Date.now())
            .toISOString()
            .split("T")[0];
          xml += `
  <url>
    <loc>${baseUrl}/blog/${article.slug}</loc>
    <lastmod>${lastModDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
        });
      }
    } catch (error) {
      console.error("Error fetching articles for sitemap:", error);
    }
  }

  xml += `
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

// Robots.txt Route
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /\n\nSitemap: https://texly.online/sitemap.xml");
});

export default app;
