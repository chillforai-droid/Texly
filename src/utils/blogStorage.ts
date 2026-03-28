import { supabase } from '../lib/supabase';
import { BlogPost, BLOG_POSTS } from '../data/blog';

const STORAGE_KEY = 'texly_blogs';

// Helper to generate slug from title
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s\u0900-\u097F-]+/g, '') // Allow Hindi characters, word chars, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

// Helper to generate excerpt from content
export const getExcerpt = (content: string): string => {
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.slice(0, 160) + (plainText.length > 160 ? '...' : '');
};

// Map Supabase snake_case to BlogPost camelCase
const mapFromSupabase = (data: any): BlogPost => ({
  id: data.id,
  title: data.title || 'Untitled',
  slug: data.slug || '',
  excerpt: data.excerpt || '',
  content: data.content || '',
  // Use created_at for the date display
  date: new Date(data.created_at).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }),
  author: data.author || 'Texly',
  image: data.cover_image || 'https://picsum.photos/seed/blog/800/600',
  category: data.category || 'General',
  readTime: data.read_time || '5 min read',
  tags: data.tags || [],
  userId: data.user_id, // Track ownership
  contentType: data.content_type || 'markdown'
});

// Map BlogPost camelCase to Supabase snake_case
const mapToSupabase = (blog: BlogPost, userId?: string) => {
  // Only send columns that exist in your SQL schema to avoid errors
  const data: any = {
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    author: blog.author,
    cover_image: blog.image,
    category: blog.category,
    read_time: blog.readTime,
    tags: blog.tags,
    content_type: blog.contentType || 'markdown'
  };
  
  if (userId) {
    data.user_id = userId;
  }
  
  // If it's an existing post (UUID), include the ID for update
  if (blog.id && blog.id.includes('-')) {
    data.id = blog.id;
  }
  
  return data;
};

export const getBlogs = async (userId?: string): Promise<BlogPost[]> => {
  if (!supabase) {
    console.warn('Supabase not initialized, falling back to localStorage');
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : BLOG_POSTS;
  }

  let query = supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (userId) {
    query = query.eq('user_id', userId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Supabase Fetch Error:', error.message);
    throw error;
  }

  return (data || []).map(mapFromSupabase);
};

export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  if (!supabase) {
    const blogs = await getBlogs();
    return blogs.find(b => b.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      console.error('Supabase Fetch Error (Slug):', error.message);
      throw error;
    }

    return data ? mapFromSupabase(data) : null;
  } catch (err) {
    console.error('Unexpected error in getBlogBySlug:', err);
    throw err;
  }
};

export const saveBlog = async (blog: BlogPost): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase not initialized, saving to localStorage');
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

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('articles')
      .upsert(mapToSupabase(blog, user.id));

    if (error) {
      console.error('Supabase Save Error:', error.message, error.details, error.hint);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Unexpected error in saveBlog:', err);
    return false;
  }
};

export const deleteBlog = async (id: string): Promise<boolean> => {
  if (!supabase) {
    console.warn('Supabase not initialized, deleting from localStorage');
    const blogs = await getBlogs();
    const filtered = blogs.filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id); // Ensure user owns the blog

    if (error) {
      console.error('Supabase Delete Error:', error.message, error.details, error.hint);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Unexpected error in deleteBlog:', err);
    return false;
  }
};

