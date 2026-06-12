/**
 * toolStorage.ts
 * Supabase `ai_tools` table se dynamic tools fetch karne ke liye.
 * Ye ALL_TOOLS (hardcoded) ke saath merge karke ek complete list deta hai.
 * Agar Supabase available nahi hai toh sirf ALL_TOOLS return hoti hai.
 */

import { supabase } from '../lib/supabase';
import { ALL_TOOLS, Tool } from '../data/tools';

// ── In-memory cache: same slug ke liye bar-bar Supabase call nahi hogi ──────
// null = checked, tool nahi mila | Tool = found
const _slugCache = new Map<string, Tool | null>();

// Supabase ai_tools row ko Tool interface mein map karo
const mapFromSupabase = (row: any): Tool => ({
  id: row.slug, // slug hi unique id hai
  name: row.name,
  slug: row.slug,
  category: row.category || 'utility',
  description: row.description || '',
  shortDescription: row.short_description || row.description || '',
  icon: row.icon || 'Wrench',
  keywords: row.keywords || [],
  primaryKeyword: row.primary_keyword || '',
  secondaryKeywords: row.secondary_keywords || [],
  metaTitle: row.meta_title || '',
  metaDescription: row.meta_description || '',
  isAI: row.category === 'ai' || row.category === 'generator',
  // Dynamic tools ka process function - component_code se render hoga
  process: (_input: string) => '',
  isDynamic: true,
  componentCode: row.component_code || '',
});

/**
 * Slug ke basis par pehle hardcoded ALL_TOOLS mein dhundho,
 * phir Supabase ai_tools table mein dhundho.
 */
export const getToolBySlug = async (slug: string): Promise<Tool | null> => {
  // 1. Pehle hardcoded tools mein check karo (fast, no network)
  const hardcoded = ALL_TOOLS.find((t) => t.slug === slug);
  if (hardcoded) return hardcoded;

  // 2. In-memory cache check — agar pehle se check ho chuka hai toh Supabase skip karo
  if (_slugCache.has(slug)) return _slugCache.get(slug) ?? null;

  // 3. Agar nahi mila toh Supabase se dhundho
  if (!supabase) {
    _slugCache.set(slug, null);
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('[toolStorage] Supabase error:', error.message);
      _slugCache.set(slug, null);
      return null;
    }

    const result = data ? mapFromSupabase(data) : null;
    _slugCache.set(slug, result);
    return result;
  } catch (err) {
    console.error('[toolStorage] Unexpected error:', err);
    _slugCache.set(slug, null);
    return null;
  }
};

/**
 * Sabhi tools fetch karo - hardcoded + Supabase dynamic tools
 * (duplicate slugs mein Supabase wala override karta hai)
 */
export const getAllTools = async (): Promise<Tool[]> => {
  if (!supabase) return ALL_TOOLS;

  try {
    const { data, error } = await supabase
      .from('ai_tools')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error || !data) return ALL_TOOLS;

    const dynamicTools = data.map(mapFromSupabase);
    const dynamicSlugs = new Set(dynamicTools.map((t) => t.slug));

    // Hardcoded tools mein se woh hatao jo Supabase mein bhi hain
    const baseTools = ALL_TOOLS.filter((t) => !dynamicSlugs.has(t.slug));

    return [...baseTools, ...dynamicTools];
  } catch {
    return ALL_TOOLS;
  }
};
