import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2,
  LogOut, 
  User,
  LayoutDashboard, 
  FileText, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  Tag, 
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  X,
  ShieldCheck,
  Key,
  Code,
  Type
} from 'lucide-react';
import { BlogPost, BlogContentType } from '../data/blog';
import { getBlogs, saveBlog, deleteBlog, generateSlug, getExcerpt } from '../utils/blogStorage';
import { supabase } from '../lib/supabase';

const AdminPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // OTP States
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    author: '',
    tags: '',
    contentType: 'markdown' as 'markdown' | 'html' | 'text'
  });

  const fetchBlogs = async (userId: string) => {
    try {
      setIsLoading(true);
      const data = await getBlogs(userId);
      setBlogs(data);
      setError(null);
    } catch (err: any) {
      console.error('Failed to fetch blogs:', err);
      setError(err.message || 'Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!supabase) return;

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        // Use full_name from metadata if available, otherwise fallback to email prefix
        const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
        setFormData(prev => ({ ...prev, author: displayName }));
        fetchBlogs(user.id);
        
        // Check for action=new query param
        const params = new URLSearchParams(location.search);
        if (params.get('action') === 'new') {
          setIsAdding(true);
        }
      } else {
        navigate('/auth');
      }
    };

    checkUser();
  }, [location.search, navigate]);

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const handleDelete = async (id: string) => {
    if (!user?.email) return;
    
    setDeletingId(id);
    setOtpModalOpen(true);
    setOtpError(null);
    setOtpCode('');
    
    try {
      setOtpLoading(true);
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to send OTP');
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const verifyAndDelete = async () => {
    if (!user?.email || !deletingId || !otpCode) return;
    
    setOtpLoading(true);
    setOtpError(null);
    
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, otp: otpCode }),
      });
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.error || 'Invalid verification code');
      
      // If OTP is verified, proceed with deletion
      setIsLoading(true);
      const success = await deleteBlog(deletingId);
      if (success && user) {
        await fetchBlogs(user.id);
        setOtpModalOpen(false);
        setSuccessMessage('Article deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        throw new Error('Failed to delete article from database');
      }
    } catch (err: any) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
      setIsLoading(false);
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData({
      title: blog.title,
      content: blog.content,
      image: blog.image,
      category: blog.category,
      author: blog.author,
      tags: blog.tags.join(', '),
      contentType: blog.contentType || 'markdown'
    });
    setEditingId(blog.id);
    setIsEditing(true);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setEditingId(null);
    setFormData({ 
      title: '', 
      content: '', 
      image: '', 
      category: '', 
      author: user?.email?.split('@')[0] || 'User', 
      tags: '',
      contentType: 'markdown'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const blogData: BlogPost = {
      id: isEditing && editingId ? editingId : Date.now().toString(),
      title: formData.title,
      slug: generateSlug(formData.title),
      content: formData.content,
      excerpt: getExcerpt(formData.content),
      image: formData.image || 'https://picsum.photos/seed/blog/800/600',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: formData.author,
      category: formData.category || 'General',
      readTime: '5 min read',
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ''),
      contentType: formData.contentType
    };

    try {
      const success = await saveBlog(blogData);
      if (success && user) {
        await fetchBlogs(user.id);
        handleCancel();
        setSuccessMessage(isEditing ? 'Blog updated successfully!' : 'Blog published successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setError('Failed to save blog. Check console for details.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
              <LayoutDashboard className="w-10 h-10 text-blue-600" />
              My Dashboard
            </h1>
            <p className="text-slate-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Logged in as <span className="text-slate-900 font-bold">{user?.email}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => isAdding ? handleCancel() : setIsAdding(true)}
              className={`flex items-center gap-2 px-6 py-3 font-bold rounded-2xl transition-all shadow-lg ${
                isAdding 
                ? 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 shadow-slate-200/20' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
              }`}
            >
              {isAdding ? <><X className="w-5 h-5" /> Cancel</> : <><Plus className="w-5 h-5" /> New Article</>}
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
            >
              <User className="w-5 h-5" /> Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all shadow-sm"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>
        </div>

        {successMessage && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{successMessage}</p>
          </motion.div>
        )}

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 shadow-sm"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="font-medium">{error}</p>
          </motion.div>
        )}

        {isLoading && !isAdding && blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
            <div className="w-16 h-16 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <p className="text-slate-500 font-bold text-lg tracking-tight">Loading your workspace...</p>
          </div>
        ) : isAdding ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 mb-12"
          >
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <Plus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {isEditing ? 'Edit Article' : 'Create New Article'}
                </h2>
                <p className="text-slate-500 font-medium">
                  {isEditing ? 'Update your content' : 'Share your knowledge with the world'}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Article Title</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., The Future of AI in Content Creation"
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-lg font-bold placeholder:text-slate-300"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Content</label>
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      {(['markdown', 'html', 'text'] as const).map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, contentType: type })}
                          className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                            formData.contentType === type 
                            ? 'bg-white text-blue-600 shadow-sm' 
                            : 'text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    required
                    rows={15}
                    placeholder={
                      formData.contentType === 'markdown' ? "Write markdown here..." :
                      formData.contentType === 'html' ? "Write HTML here..." :
                      "Write plain text here..."
                    }
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-sm leading-relaxed placeholder:text-slate-300"
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cover Image URL</label>
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Category</label>
                    <div className="relative">
                      <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="e.g., Technology"
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Tags (Comma Separated)</label>
                    <input
                      type="text"
                      placeholder="AI, Future, Tech"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 disabled:opacity-50 text-lg"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <FileText className="w-6 h-6" />
                      {isEditing ? 'Update Article' : 'Publish Article'}
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {blogs.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-slate-100 flex flex-col items-center">
                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 mb-6">
                  <FileText className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">No Articles Yet</h3>
                <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto">
                  You haven't published any articles yet. Start sharing your thoughts!
                </p>
                <button
                  onClick={() => setIsAdding(true)}
                  className="px-8 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> Create First Article
                </button>
              </div>
            ) : (
              blogs.map((blog) => (
                <motion.div 
                  key={blog.id}
                  layout
                  className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-black text-slate-900 text-xl tracking-tight line-clamp-1 group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><Calendar className="w-3.5 h-3.5" /> {blog.date}</span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg text-blue-600"><Tag className="w-3.5 h-3.5" /> {blog.category}</span>
                        <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a 
                      href={`/blog/${blog.slug}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-xs font-black text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all flex items-center gap-2"
                    >
                      View <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Edit Article"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      title="Delete Article"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* OTP Verification Modal */}
        {otpModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
              
              <button 
                onClick={() => setOtpModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-blue-600 shadow-inner">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Security Verification</h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  We've sent a 6-digit code to <span className="text-slate-900 font-bold">{user?.email}</span>. Please enter it below to confirm deletion.
                </p>
              </div>

              {otpError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-2xl flex items-center gap-3 text-sm font-medium">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{otpError}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Verification Code</label>
                  <div className="relative">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000000"
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-center text-2xl font-black tracking-[10px] placeholder:tracking-normal placeholder:text-slate-200"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    />
                  </div>
                </div>

                <button
                  onClick={verifyAndDelete}
                  disabled={otpLoading || otpCode.length !== 6}
                  className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {otpLoading ? (
                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Confirm Deletion</>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-400 font-medium">
                  Didn't receive the code? <button onClick={() => deletingId && handleDelete(deletingId)} className="text-blue-600 font-bold hover:underline">Resend Code</button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
