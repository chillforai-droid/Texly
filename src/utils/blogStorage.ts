import { createClient } from '@supabase/supabase-js';
import { BlogPost, BLOG_POSTS } from '../data/blog';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidConfig = (url: string | undefined, key: string | undefined) => {
  if (!url || !key) return false;
  if (url.includes('your_supabase_url')) return false;
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export const supabase = isValidConfig(supabaseUrl, supabaseAnonKey)
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

const STORAGE_KEY = 'texly_blogs';

// ✅ FIXED MAPPING (IMPORTANT)
const mapFromSupabase = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: data.content,

  // 🔥 FINAL FIX
  date: data.created_at,
  author: data.author || 'Admin',
  image: data.cover_image,
  category: data.category || 'General',
  readTime: data.read_time || 5,
  tags: data.tags || []
});

// ❌ REMOVE OLD mapToSupabase (optional)
// (तुम admin panel से insert कर रहे हो)

// ✅ GET BLOGS
export const getBlogs = async (): Promise<BlogPost[]> => {
  if (!supabase) {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_POSTS));
      return BLOG_POSTS;
    }
    try {
      return JSON.parse(stored);
    } catch {
      return BLOG_POSTS;
    }
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false }); // ✅ FIXED

  if (error) {
    console.error('❌ Supabase Error:', error);
    return [];
  }

  console.log("✅ SUPABASE DATA:", data);

  return data ? data.map(mapFromSupabase) : [];
};

// ✅ DELETE BLOG (optional)
export const deleteBlog = async (id: string): Promise<boolean> => {
  if (!supabase) return false;

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Delete Error:', error);
    return false;
  }

  return true;
};
