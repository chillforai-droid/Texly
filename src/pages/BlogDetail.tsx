import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blog';
import { getBlogs, getBlogBySlug } from '../utils/blogStorage';
import { Calendar, User, Clock, ArrowLeft, Share2, Twitter, Facebook, Linkedin, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { hybridLink } from '../utils/hybridLink';

const BlogDetail: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [linkedContent, setLinkedContent] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch the specific post
        const foundPost = await getBlogBySlug(slug);
        setPost(foundPost);
        
        // Fetch other blogs for "Recent Posts" section
        const allBlogs = await getBlogs();
        setBlogs(allBlogs);
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

  useEffect(() => {
    const runLinking = async () => {
      if (!post) return;

      const updated = await hybridLink(
        post.content,
        post.category || "text"
      );

      setLinkedContent(updated);
    };

    runLinking();
  }, [post]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center">
        <p className="text-red-600 font-bold mb-4">Error: {error}</p>
        <Link to="/blog" className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all">
          Back to Blog
        </Link>
      </div>
    );
  }

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <main className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 mb-12 transition-all group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t.blog.backToBlog}
        </Link>

        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 text-xs font-black text-blue-600 uppercase tracking-widest mb-6">
              <span>{post.category}</span>
              <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-10 leading-[0.95]">
              {post.title}
            </h1>

            <div className="flex items-center justify-between border-y border-slate-100 py-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{post.author}</p>
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">{post.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <article className="prose prose-slate prose-lg max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-3xl prose-img:shadow-xl">
          {post.contentType === 'html' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: linkedContent || post.content
              }}
            />
          ) : post.contentType === 'text' ? (
            <div className="whitespace-pre-wrap font-serif leading-loose text-slate-800 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm text-xl">
              {post.content}
            </div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Recent Posts Section */}
        <section className="mt-24 pt-16 border-t border-slate-100">
          <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">{t.blog.recentArticles}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogs.filter(p => p.id !== post.id).slice(0, 2).map(recentPost => (
              <Link key={recentPost.id} to={`/blog/${recentPost.slug}`} className="group">
                <div className="aspect-video rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={recentPost.image} 
                    alt={recentPost.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {recentPost.title}
                </h3>
              </Link>
            ))}
            {blogs.length <= 1 && (
              <div className="col-span-2 text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">More articles coming soon!</p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-24 pt-16 border-t border-slate-100">
          <div className="bg-slate-50 p-10 rounded-3xl text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-4">{t.blog.newsletterTitle}</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">{t.blog.newsletterDesc}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder={t.blog.newsletterPlaceholder} 
                className="flex-grow px-6 py-4 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
                required
              />
              <button 
                type="submit" 
                className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
              >
                {t.blog.subscribe}
              </button>
            </form>
          </div>
        </footer>
      </div>

      {/* Floating Action Button for All Users */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link
          to="/admin-9823hdjfsdf?action=new"
          className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-2xl shadow-blue-600/40 hover:bg-blue-700 hover:scale-105 transition-all group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
          <span>पब्लिश Article</span>
        </Link>
      </motion.div>
    </main>
  );
};

export default BlogDetail;
