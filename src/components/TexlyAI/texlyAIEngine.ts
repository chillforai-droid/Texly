/**
 * texlyAIEngine.ts
 * =====================
 * Server-side AI proxy — Gemini + Groq
 *
 * Frontend se direct API call NAHI karta (keys expose hongi).
 * Sabhi calls /api/ai/text server route ke zariye jaati hain.
 * Server pe GROQ_API_KEY aur GEMINI_API_KEY (Vercel env vars) set honi chahiye.
 */

import { buildSystemPrompt, Lang } from './texlyPersonality';
import { supabase } from '../../lib/supabase';

export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

// Helper to decode username from the admin token
export function getUsername(): string {
  try {
    const token = localStorage.getItem("texly_admin_token");
    if (!token) return "guest";
    const decoded = atob(token);
    const [username] = decoded.split(":");
    return username || "guest";
  } catch {
    return "guest";
  }
}

// ─── Supabase storage integrations ──────────────────────────────────────────
export async function saveProfileToSupabase(profileData: any): Promise<void> {
  if (!supabase) return;
  const username = getUsername();
  const key = `u:${username}:profile`;
  try {
    const { error } = await supabase.from('texly_storage').upsert({
      key,
      data: profileData
    });
    if (error) console.error("Failed to save profile to Supabase:", error.message);
    else console.log("Profile successfully saved to Supabase!");
  } catch (err) {
    console.error("Supabase upsert error:", err);
  }
}

export async function loadProfileFromSupabase(): Promise<any | null> {
  if (!supabase) return null;
  const username = getUsername();
  const key = `u:${username}:profile`;
  try {
    const { data, error } = await supabase.from('texly_storage').select('data').eq('key', key).maybeSingle();
    if (!error && data) {
      return data.data;
    }
  } catch (err) {
    console.error("Supabase load profile error:", err);
  }
  return null;
}

export async function savePageAnalysisToSupabase(slug: string, analysis: string): Promise<void> {
  if (!supabase) return;
  const key = `analysis:page:${slug}`;
  try {
    const { error } = await supabase.from('texly_storage').upsert({
      key,
      data: { analysis, updated_at: Date.now() }
    });
    if (error) console.error("Failed to save page analysis to Supabase:", error.message);
    else console.log("Page analysis successfully saved to Supabase!");
  } catch (err) {
    console.error("Supabase upsert analysis error:", err);
  }
}

export async function loadPageAnalysisFromSupabase(slug: string): Promise<string | null> {
  if (!supabase) return null;
  const key = `analysis:page:${slug}`;
  try {
    const { data, error } = await supabase.from('texly_storage').select('data').eq('key', key).maybeSingle();
    if (!error && data && data.data) {
      return data.data.analysis;
    }
  } catch (err) {
    console.error("Supabase load page analysis error:", err);
  }
  return null;
}

// ─── Server-side proxy call ───────────────────────────────────────────────────
export async function callServerAI(
  prompt: string,
  systemPrompt: string,
  maxTokens = 400,
  signal?: AbortSignal
): Promise<string> {
  const res = await fetch('/api/ai/text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      toolId: 'custom',
      input: prompt,
      systemPrompt,
      maxTokens,
    }),
    signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || `Server error ${res.status}`);
  }

  const data = await res.json();
  if (!data.success) throw new Error(data.error || 'AI call failed');
  return data.result?.trim() || '';
}

// ─── Main AI call ─────────────────────────────────────────────────────────────
export async function callAI(
  userMessage: string,
  history: ChatMessage[],
  lang: Lang,
  toolSlug: string,
  toolName: string,
  signal?: AbortSignal,
  pageAnalysis?: string
): Promise<string> {
  let userProfileStr = '';
  try {
    const profile = localStorage.getItem('texly_user_profile');
    if (profile) {
      const parsed = JSON.parse(profile);
      userProfileStr = Object.entries(parsed)
        .filter(([k]) => k !== 'lastUpdated')
        .map(([k, v]) => `- ${k.toUpperCase()}: ${v}`)
        .join('\n');
    }
  } catch (err) {
    console.error("Failed to read user profile:", err);
  }

  let systemPrompt = buildSystemPrompt(lang, toolSlug, toolName, userProfileStr);

  if (pageAnalysis) {
    systemPrompt += `\n\n[CRITICAL SITE KNOWLEDGE - TECHNICAL PAGE AUDIT]:\nHere is your background expert technical analysis of the page the user is currently looking at ("${toolName}"): \n${pageAnalysis}\nUse this knowledge seamlessly to give incredibly smart, context-aware answers! Do NOT output that you read this from a background audit, keep it natural and professional.`;
  }

  // Build prompt with history context
  const historyText = history
    .slice(-6) // last 6 messages only for context
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  const fullPrompt = historyText
    ? `${historyText}\nUser: ${userMessage}`
    : userMessage;

  return callServerAI(fullPrompt, systemPrompt, 700, signal);
}

// ─── Text tool AI helper ──────────────────────────────────────────────────────
export async function aiDoTextWork(
  task: string,
  inputText: string,
  lang: Lang,
  signal?: AbortSignal
): Promise<string> {
  const systemPrompt = lang === 'hi'
    ? `Tu ek expert text processing AI hai. Sirf result return kar — koi explanation, koi intro nahi. Pure output do.`
    : `You are an expert text processing AI. Return ONLY the result — no explanation, no intro, just pure output.`;

  const prompt = lang === 'hi'
    ? `Kaam: ${task}\n\nText:\n${inputText}`
    : `Task: ${task}\n\nText:\n${inputText}`;

  return callServerAI(prompt, systemPrompt, 2000, signal);
}
