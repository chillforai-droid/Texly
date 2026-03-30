import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { BlogPost } from '../data/blog';
import { getBlogs, getBlogBySlug } from '../utils/blogStorage';
import { Calendar, User, Clock, ArrowLeft, Twitter, Facebook, Linkedin, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { hybridLink } from '../utils/hybridLink';

const BlogDetail: React.FC = () => {
  const { t } = useLanguage();
  const { slug } = useParams<{ slug: string }>();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [linkedContent, setLinkedContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 Fetch Blog
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
        console.error('Fetch error:', err);
        setError(err.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // 🔥 Smart Linking
  useEffect(() => {
    const processLinking = async () => {
      if (!post) return;

      const updated = await hybridLink(
        post.content,
        post.category || "text"
      );

      setLinkedContent(updated);
    };

    processLinking();
  }, [post]);

  // 🔥 SEO Meta
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Texly Blog`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', post.excerpt);
    }
  }, [post]);

  // 🔄 Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  // ❌ Error
  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <main className="min-h-screen bg-white py-24 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <Link to="/blog" className="text-blue-600 mb-6 inline-flex items-center gap-2">
          <ArrowLeft /> {t.blog.backToBlog}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="text-blue-600 text-xs mb-2 uppercase">
            {post.category} • {post.readTime}
          </div>

          <h1 className="text-4xl font-bold mb-6">
            {post.title}
          </h1>

          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-gray-400">{post.date}</p>
            </div>

            <div className="flex gap-3">
              <Twitter />
              <Facebook />
              <Linkedin />
            </div>
          </div>
        </header>

        {/* Image */}
        <img
          src={post.image}
          alt={post.title}
          className="rounded-xl mb-10"
        />

        {/* 🔥 CONTENT */}
        <article className="prose max-w-none">
          {post.contentType === "html" ? (
            <div
              dangerouslySetInnerHTML={{
                __html: linkedContent || post.content
              }}
            />
          ) : post.contentType === "text" ? (
            <div>{post.content}</div>
          ) : (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          )}
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>

          {blogs
            .filter(b => b.slug !== post.slug)
            .slice(0, 2)
            .map(b => (
              <Link key={b.id} to={`/blog/${b.slug}`} className="block text-blue-600 mb-2">
                {b.title}
              </Link>
            ))}
        </section>

        {/* Newsletter */}
        <footer className="mt-16">
          <div className="bg-gray-100 p-6 rounded-xl text-center">
            <h3 className="text-xl font-bold mb-2">{t.blog.newsletterTitle}</h3>
            <p className="mb-4">{t.blog.newsletterDesc}</p>

            <input
              type="email"
              placeholder={t.blog.newsletterPlaceholder}
              className="border px-4 py-2 rounded mr-2"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              {t.blog.subscribe}
            </button>
          </div>
        </footer>

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
