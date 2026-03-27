import { createClient } from '@supabase/supabase-js';
import { BlogPost, BLOG_POSTS } from '../data/blog';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Robust check for valid Supabase configuration
const isValidConfig = (url: string | undefined, key: string | undefined) => {
  if (!url || !key) return false;
  if (url.includes('your_supabase_url')) return false; // Check for placeholder
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

// Helper to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// Helper to generate excerpt from content
export const getExcerpt = (content: string): string => {
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
};

// Map Supabase snake_case to BlogPost camelCase
const mapFromSupabase = (data: any): BlogPost => ({
  id: data.id,
  title: data.title,
  slug: data.slug,
  excerpt: data.excerpt,
  content: data.content,
  date: data.date,
  author: data.author,
  image: data.image,
  category: data.category,
  readTime: data.read_time,
  tags: data.tags || []
});

// Map BlogPost camelCase to Supabase snake_case
const mapToSupabase = (blog: BlogPost) => ({
  id: blog.id,
  title: blog.title,
  slug: blog.slug,
  excerpt: blog.excerpt,
  content: blog.content,
  date: blog.date,
  author: blog.author,
  image: blog.image,
  category: blog.category,
  read_time: blog.readTime,
  tags: blog.tags
});

export const getBlogs = async (): Promise<BlogPost[]> => {
  if (!supabase) {
    // Fallback to localStorage if Supabase is not configured
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(BLOG_POSTS));
      return BLOG_POSTS;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error parsing blogs from localStorage', e);
      return BLOG_POSTS;
    }
  }

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blogs from Supabase:', error);
    return [];
  }

  return data.map(mapFromSupabase);
};

export const saveBlog = async (blog: BlogPost): Promise<boolean> => {
  if (!supabase) {
    const blogs = await getBlogs();
    const index = blogs.findIndex((b) => b.id === blog.id);
    if (index > -1) {
      blogs[index] = blog;
    } else {
      blogs.unshift(blog);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return true;
  }

  const { error } = await supabase
    .from('blogs')
    .upsert(mapToSupabase(blog));

  if (error) {
    console.error('Error saving blog to Supabase:', error);
    return false;
  }
  return true;
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  if (!supabase) {
    const blogs = await getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting blog from Supabase:', error);
    return false;
  }
  return true;
};
