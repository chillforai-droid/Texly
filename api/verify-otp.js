import { otpStore } from "./send-otp";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.status(200).json({ success: true });
  }

  return res.status(400).json({ error: "Invalid OTP" });
}
