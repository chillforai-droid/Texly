let otpStore = {}; // same store (important)

export default async function handler(req, res) {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    delete otpStore[email];
    return res.json({ success: true });
  }

  return res.status(400).json({ error: "Invalid OTP" });
}
