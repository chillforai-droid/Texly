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

// ✅ Supabase data को website format में convert करने वाला function
const mapFromSupabase = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: data.content,

  // 🔥 FIXED FIELDS
  date: data.created_at, // पहले date था
  author: data.author || 'Admin',
  image: data.cover_image, // पहले image था
  category: data.category || 'General',
  readTime: data.read_time || 5,
  tags: data.tags || []
});

// ✅ सभी blogs fetch करना
export const getAllBlogs = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }

  return data.map(mapFromSupabase);
};

// ✅ slug से single blog fetch करना
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
