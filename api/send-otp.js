import nodemailer from "nodemailer";

let otpStore = {}; // temporary memory

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = otp;

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
        <div style="font-family:sans-serif;text-align:center">
          <h2>🔐 Texly Verification</h2>
          <p>Your OTP code is:</p>
          <h1 style="letter-spacing:5px">${otp}</h1>
          <p>This code will expire soon.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "OTP send failed" });
  }
}

// ⚠️ IMPORTANT: same store export करना होगा
export { otpStore };
