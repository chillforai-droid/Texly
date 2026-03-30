import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { email, otp } = req.body;

  const { data } = await supabase
    .from("otp_codes")
    .select("*")
    .eq("email", email)
    .eq("otp", otp)
    .order("created_at", { ascending: false })
    .limit(1);

  if (!data.length) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  const record = data[0];

  // ⏳ Expiry check
  if (new Date() > new Date(record.expires_at)) {
    return res.status(400).json({ error: "OTP expired" });
  }

  // 🗑️ Delete after use
  await supabase
    .from("otp_codes")
    .delete()
    .eq("id", record.id);

  return res.status(200).json({ success: true });
}
