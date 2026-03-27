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

// ✅ Supabase → Website mapping (FINAL FIXED)
const mapFromSupabase = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: data.content,

  // 🔥 IMPORTANT FIX
  date: data.created_at, // ✅ सही column
  author: data.author || 'Admin',
  image: data.cover_image, // ✅ सही column
  category: data.category || 'General',
  readTime: data.read_time || 5,
  tags: data.tags || []
});

// ✅ सभी blogs fetch
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  console.log("Fetched Blogs:", data); // 🔍 debug

  return data ? data.map(mapFromSupabase) : [];
};

// ✅ single blog fetch
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching blog:', error);
    return null;
  }

  return mapFromSupabase(data);
};
