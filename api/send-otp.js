import nodemailer from "nodemailer";

let otpStore = {}; // temporary (memory)

export default async function handler(req, res) {
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
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is: ${otp}</h2>`,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "OTP send failed" });
  }
}
