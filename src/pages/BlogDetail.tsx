import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blog';
import { getBlogs, getBlogBySlug } from '../utils/blogStorage';
import { Calendar, User, Clock, ArrowLeft, Twitter, Facebook, Linkedin, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { autoLinkContent } from '../utils/autoLink';

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
        
        const foundPost = await getBlogBySlug(slug);
        setPost(foundPost);
        
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            
            <div className="flex items-center gap-4 text-xs font-black text-blue-600 uppercase mb-6">
              <span>{post.category}</span>
              <span>{post.readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black mb-10">
              {post.title}
            </h1>

          </motion.div>
        </header>

        <img src={post.image} alt={post.title} className="mb-10 rounded-2xl" />

        {/* 🔥 SMART LINKING APPLIED HERE */}
        <article className="prose max-w-none">
          {post.contentType === 'html' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: autoLinkContent(post.content),
              }}
            />
          ) : post.contentType === 'text' ? (
            <div>{post.content}</div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Recent Posts */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          {blogs.filter(p => p.id !== post.id).slice(0, 2).map(b => (
            <Link key={b.id} to={`/blog/${b.slug}`} className="block mb-2 text-blue-600">
              {b.title}
            </Link>
          ))}
        </section>

      </div>

      {/* Floating Button */}
      <div className="fixed bottom-6 right-6">
        <Link to="/admin-9823hdjfsdf?action=new">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Publish
          </button>
        </Link>
      </div>

    </main>
  );
};

export default BlogDetail;
