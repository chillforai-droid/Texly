import { supabase } from '../lib/supabase';
import { BlogPost } from '../data/blog';

// Get all blogs with status filter
export const getBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('status', 'approved')  // 👈 सिर्फ approved वाले दिखेंगे
      .order('created_at', { ascending: false });

    if (error) throw error;

    const blogs: BlogPost[] = (data || []).map((article: any) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      contentType: article.content_type || 'markdown',
      author: article.author,
      date: new Date(article.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: article.read_time,
      category: article.category,
      image: article.image_url,
      status: article.status
    }));

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
};

// Get single blog by slug with status filter
export const getBlogBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'approved')  // 👈 सिर्फ approved वाला दिखेगा
      .single();

    if (error) throw error;

    if (!data) return null;

    const blog: BlogPost = {
      id: data.id,
      slug: data.slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      contentType: data.content_type || 'markdown',
      author: data.author,
      date: new Date(data.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      readTime: data.read_time,
      category: data.category,
      image: data.image_url,
      status: data.status
    };

    return blog;
  } catch (error) {
    console.error('Error fetching blog by slug:', error);
    return null;
  }
};
