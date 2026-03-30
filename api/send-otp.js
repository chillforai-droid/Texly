export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  return res.json({ success: true, otp });
}
