import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
  readTime: number;
  tags: string[];
}

// 🔥 FINAL PERFECT MAPPING (NO ERROR)
const mapFromSupabase = (data: any): BlogPost => {
  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,

    // ✅ EXACT MATCH WITH SUPABASE
    date: data.created_at,        // ❌ created_at_ नहीं
    author: data.author || 'Admin',
    image: data.cover_image,      // ❌ image नहीं
    category: data.category || 'General',
    readTime: data.read_time || 5,
    tags: data.tags || []
  };
};

// ✅ GET ALL BLOGS
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase Fetch Error:', error.message);
      return [];
    }

    console.log("✅ Supabase Data:", data);

    if (!data || data.length === 0) {
      console.warn("⚠️ No blogs found in database");
      return [];
    }

    return data.map((item) => mapFromSupabase(item));

  } catch (err) {
    console.error('❌ Unexpected Error:', err);
    return [];
  }
};

// ✅ GET SINGLE BLOG
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('❌ Blog Fetch Error:', error.message);
      return null;
    }

    return mapFromSupabase(data);

  } catch (err) {
    console.error('❌ Unexpected Error:', err);
    return null;
  }
};
