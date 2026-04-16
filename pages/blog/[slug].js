// pages/blog/[slug].js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Calendar, User, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogDetail() {
  const { slug } = useRouter().query;
  const router = useRouter();
  const { isAdmin } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, 'blogs'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) setBlog({ id: snap.docs[0].id, ...snap.docs[0].data() });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this blog post?')) return;
    try {
      await deleteDoc(doc(db, 'blogs', blog.id));
      showToast('Deleted successfully');
      setTimeout(() => router.push('/blog'), 1000);
    } catch (err) {
      showToast('Error: ' + err.message);
    }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    </>
  );

  if (!blog) return (
    <>
      <Navbar />
      <div className="text-center py-32">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-green-600 hover:underline font-semibold">← Back to Blog</Link>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Head>
        <title>{blog.title} | Kuwait India Driving School Blog</title>
        <meta name="description" content={blog.excerpt || blog.title} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || ''} />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
        <link rel="canonical" href={`https://kuwaitindiadriving.com/blog/${slug}`} />
      </Head>

      <Navbar />

      <article className="py-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Back link */}
          <Link href="/blog" className="inline-flex items-center space-x-2 text-gray-500 hover:text-green-600 mb-8 font-medium">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blog</span>
          </Link>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex space-x-3 mb-6">
              <Link href={`/admin/editor?id=${blog.id}`} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </Link>
              <button onClick={handleDelete} className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-8 pb-8 border-b border-gray-200">
            <span className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{formatDate(blog.createdAt)}</span></span>
            {blog.author && <span className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{blog.author}</span></span>}
          </div>

          {blog.imageUrl && (
            <img src={blog.imageUrl} alt={blog.title} className="w-full rounded-2xl mb-8 object-cover max-h-96" />
          )}

          {/* Blog content rendered as HTML */}
          <div
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </article>

      <Footer />

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50">{toast}</div>
      )}
    </>
  );
}
