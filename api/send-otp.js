import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const now = new Date();

    // ✅ Rate limit safe
    const { data: recent, error: recentError } = await supabase
      .from("otp_codes")
      .select("*")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);

    if (recentError) {
      return res.status(500).json({ error: "Database error" });
    }

    if (recent && recent.length > 0) {
      const lastTime = new Date(recent[0].created_at);
      if (now - lastTime < 60000) {
        return res.status(429).json({ error: "Wait 1 minute before requesting again" });
      }
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // ✅ Insert OTP
    const { error: insertError } = await supabase.from("otp_codes").insert([
      {
        email,
        otp,
        expires_at: expiresAt,
      },
    ]);

    if (insertError) {
      return res.status(500).json({ error: "Failed to save OTP" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

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
    console.error("SEND OTP ERROR:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
