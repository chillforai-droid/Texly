import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blog';
import { getBlogs, getBlogBySlug } from '../utils/blogStorage';
import { Calendar, User, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

// Comments Component
function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("blog_slug", slug)
      .order("created_at", { ascending: false });

    setComments(data || []);
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !message) return alert("Fill all fields");

    await supabase.from("comments").insert([
      {
        blog_slug: slug,
        name,
        message,
      },
    ]);

    setName("");
    setMessage("");
    fetchComments();
  };

  return (
    <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-slate-100">
      <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 tracking-tight">Comments</h2>

      <form onSubmit={handleSubmit} className="mb-10 sm:mb-12 space-y-4">
        <div>
          <input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
          />
        </div>
        <div>
          <textarea
            placeholder="Your Comment"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all resize-none text-sm sm:text-base"
          />
        </div>
        <button 
          type="submit" 
          className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm sm:text-base"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-4 sm:space-y-6">
        {comments.length === 0 ? (
          <p className="text-slate-400 text-center py-6 sm:py-8 text-sm sm:text-base">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c) => (
            <div key={c.id} className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-100">
              <strong className="text-slate-900 font-bold block mb-2 text-sm sm:text-base">{c.name}</strong>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{c.message}</p>
              {c.created_at && (
                <p className="text-xs text-slate-400 mt-2 sm:mt-3">
                  {new Date(c.created_at).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const BlogDetail: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the specific post from Supabase with status filter
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'approved')
          .single();
        
        if (error) throw error;
        
        if (data) {
          // Transform to BlogPost format
          const formattedPost: BlogPost = {
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
          setPost(formattedPost);
        } else {
          setPost(null);
        }
        
        // Fetch other blogs for "Recent Posts" section (only approved ones)
        const { data: allArticles } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        const formattedBlogs = allArticles?.map(article => ({
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
        })) || [];
        
        setBlogs(formattedBlogs);
      } catch (err: any) {
        console.error('Failed to fetch blog post:', err);
        setError(err.message || 'Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Texly Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', post.excerpt);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
        <p className="text-red-600 font-bold mb-4 text-sm sm:text-base">Error: {error}</p>
        <Link to="/blog" className="px-5 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all text-sm sm:text-base">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="min-h-screen bg-white pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-400 hover:text-blue-600 mb-8 sm:mb-12 transition-all group"
        >
          <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" /> {t.blog.backToBlog}
        </Link>

        <header className="mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-4 sm:mb-6">
              <span>{post.category}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full hidden sm:inline-block"></span>
              <span className="hidden sm:inline">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 sm:mb-10 leading-[1.1] sm:leading-[0.95]">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 border-y border-slate-100 py-4 sm:py-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-bold text-slate-900">{post.author}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{post.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                  <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
                <button className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 sm:mb-16 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <article className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl sm:prose-img:rounded-3xl prose-img:shadow-xl">
          {post.contentType === 'html' ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : post.contentType === 'text' ? (
            <div className="whitespace-pre-wrap font-serif leading-relaxed sm:leading-loose text-slate-800 bg-slate-50/50 p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm text-base sm:text-xl">
              {post.content}
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Comments Section */}
        <Comments slug={slug || ''} />

        {/* Recent Posts Section */}
        <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 sm:mb-10 tracking-tight">{t.blog.recentArticles}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {blogs.filter(p => p.id !== post.id).slice(0, 2).map(recentPost => (
              <Link key={recentPost.id} to={`/blog/${recentPost.slug}`} className="group">
                <div className="aspect-video rounded-xl sm:rounded-2xl overflow-hidden mb-3 sm:mb-4">
                  <img 
                    src={recentPost.image} 
                    alt={recentPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm sm:text-base">
                  {recentPost.title}
                </h3>
              </Link>
            ))}
            {blogs.length <= 1 && (
              <div className="col-span-1 sm:col-span-2 text-center py-8 sm:py-12 bg-slate-50 rounded-2xl sm:rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium text-sm sm:text-base">More articles coming soon!</p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-slate-100">
          <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl sm:rounded-3xl text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4">{t.blog.newsletterTitle}</h3>
            <p className="text-slate-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base">{t.blog.newsletterDesc}</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t.blog.newsletterPlaceholder} 
                className="flex-grow px-4 sm:px-6 py-3 sm:py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm sm:text-base"
                required
              />
              <button 
                type="submit" 
                className="px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 text-sm sm:text-base"
              >
                {t.blog.subscribe}
              </button>
            </form>
          </div>
        </footer>
      </div>

      {/* Floating Action Button for All Users - Responsive */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50"
      >
        <Link
          to="/admin-9823hdjfsdf?action=new"
          className="flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-black rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl shadow-blue-600/40 hover:bg-blue-700 hover:scale-105 transition-all group text-sm sm:text-base"
        >
          <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
          <span className="hidden sm:inline">पब्लिश Article</span>
          <span className="sm:hidden">पब्लिश</span>
        </Link>
      </motion.div>
    </main>
  );
};

export default BlogDetail;
