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

export interface ChatMessage {
  role: 'user' | 'model' | 'assistant';
  content: string;
}

// ─── Server-side proxy call ───────────────────────────────────────────────────
async function callServerAI(
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
  signal?: AbortSignal
): Promise<string> {
  const systemPrompt = buildSystemPrompt(lang, toolSlug, toolName);

  // Build prompt with history context
  const historyText = history
    .slice(-6) // last 6 messages only for context
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n');

  const fullPrompt = historyText
    ? `${historyText}\nUser: ${userMessage}`
    : userMessage;

  return callServerAI(fullPrompt, systemPrompt, 400, signal);
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
