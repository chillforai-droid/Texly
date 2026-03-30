import { supabase } from "../lib/supabase";

export async function hybridLink(content: string, category: string) {
  try {
    if (!content) return content;

    let result = content;
    let used: string[] = [];
    let count = 0;
    const MAX_LINKS = 5;

    // 🔥 tools fetch (category wise)
    const { data: tools, error } = await supabase
      .from("tools")
      .select("name, slug, category")
      .eq("category", category);

    if (error || !tools) {
      console.error("Supabase fetch error:", error);
      return content;
    }

    for (const tool of tools) {
      if (count >= MAX_LINKS) break;

      const keyword = tool.name?.toLowerCase();
      if (!keyword) continue;

      // ❌ duplicate रोकना
      if (used.includes(keyword)) continue;

      // 🔍 keyword detect
      const regex = new RegExp(`\\b(${keyword})\\b`, "i");

      if (regex.test(result)) {
        // 🔗 link replace (only first match)
        result = result.replace(
          regex,
          `<a href="/tool/${tool.slug}" class="text-blue-600 underline">${tool.name}</a>`
        );

        used.push(keyword);
        count++;
      }
    }

    return result;
  } catch (err) {
    console.error("Hybrid linking error:", err);
    return content;
  }
}
