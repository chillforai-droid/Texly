import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const now = new Date();

  // 🚫 Rate limit (1 min)
  const { data: recent } = await supabase
    .from("otp_codes")
    .select("*")
    .eq("email", email)
    .order("created_at", { ascending: false })
    .limit(1);

  if (recent.length && (now - new Date(recent[0].created_at)) < 60000) {
    return res.status(429).json({ error: "Wait 1 minute before requesting again" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  // 💾 Save to DB
  await supabase.from("otp_codes").insert([
    {
      email,
      otp,
      expires_at: expiresAt,
    },
  ]);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Texly Verification" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Texly Verification Code",
      html: `
        <div style="text-align:center;font-family:sans-serif">
          <h2>Texly Verification</h2>
          <h1>${otp}</h1>
          <p>Expires in 5 minutes</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Email failed" });
  }
}
