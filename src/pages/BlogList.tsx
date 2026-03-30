import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../data/blog';
import { getBlogs } from '../utils/blogStorage';
import { Calendar, User, Clock, ArrowRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

const BlogList: React.FC = () => {
  const { t } = useLanguage();
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        
        // Fetch only approved blogs from Supabase
        const { data, error } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Transform data to match BlogPost structure if needed
        const formattedBlogs = data?.map(article => ({
          id: article.id,
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          content_type: article.content_type,
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
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch blogs:', err);
        setError(err.message || 'Failed to load blogs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pt-20 sm:pt-24 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 sm:mb-6">
              Texly <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
              {t.blog.subtitle}
            </p>
            <Link 
              to="/admin-9823hdjfsdf?action=new" 
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-blue-600 text-white font-bold sm:font-black rounded-xl sm:rounded-2xl hover:bg-blue-700 transition-all shadow-lg sm:shadow-xl shadow-blue-600/20 group text-sm sm:text-lg"
            >
              <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">पब्लिश Article</span>
              <span className="sm:hidden">पब्लिश</span>
            </Link>
          </motion.div>
        </header>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-12 sm:py-20 bg-red-50 rounded-2xl sm:rounded-3xl border border-red-100 mx-4 sm:mx-0">
            <p className="text-red-600 font-medium text-sm sm:text-base">Error: {error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-3 sm:mt-4 px-5 sm:px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors text-sm sm:text-base"
            >
              Retry
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-white rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 mx-4 sm:mx-0">
            <p className="text-slate-500 text-base sm:text-lg">No approved blog posts found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-0">
            {blogs.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                      <span className="px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 sm:p-6 lg:p-8">
                    <div className="flex items-center gap-3 sm:gap-4 text-xs text-slate-400 mb-3 sm:mb-4 font-medium uppercase tracking-widest">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                    </div>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 sm:mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h2>
                    
                    <p className="text-slate-500 text-xs sm:text-sm mb-4 sm:mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs sm:text-sm group-hover:gap-3 sm:group-hover:gap-4 transition-all">
                      {t.blog.readMore} <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
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
    </div>
  );
};

export default BlogList;
