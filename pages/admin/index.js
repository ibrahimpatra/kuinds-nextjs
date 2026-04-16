// pages/admin/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, getDocs, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import { Plus, Edit, Trash2, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

function formatDate(timestamp) {
  if (!timestamp) return '';
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function AdminDashboard() {
  const { isAdmin, logout } = useAuth();
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  useEffect(() => {
    if (!isAdmin) { router.push('/login'); return; }
    fetchBlogs();
  }, [isAdmin]);

  const fetchBlogs = async () => {
    try {
      const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setBlogs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      await deleteDoc(doc(db, 'blogs', id));
      showToast('Deleted successfully');
      fetchBlogs();
    } catch (err) {
      showToast('Error: ' + err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Blog Admin | Kuwait India Driving School</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-600" />
              </div>
              <h1 className="font-bold text-gray-900">Blog Admin</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link href="/" className="text-sm text-gray-500 hover:text-green-600 font-medium">← View Site</Link>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-500 hover:text-red-600 text-sm font-medium">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <p className="text-gray-500 mt-1">{blogs.length} posts published</p>
            </div>
            <Link href="/admin/editor" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-semibold transition-colors">
              <Plus className="w-5 h-5" />
              <span>New Post</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600" />
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
              <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-500">No blog posts yet</h3>
              <Link href="/admin/editor" className="inline-block mt-4 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
                Create First Post
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4">Title</th>
                    <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4 hidden sm:table-cell">Date</th>
                    <th className="text-left text-sm font-semibold text-gray-600 px-6 py-4 hidden md:table-cell">Author</th>
                    <th className="text-right text-sm font-semibold text-gray-600 px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, i) => (
                    <tr key={blog.id} className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{blog.title}</p>
                          {blog.excerpt && <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">{blog.excerpt}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell">{formatDate(blog.createdAt)}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 hidden md:table-cell">{blog.author || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/blog/${blog.slug}`} className="text-xs text-gray-500 hover:text-green-600 font-medium px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors">View</Link>
                          <Link href={`/admin/editor?id=${blog.id}`} className="flex items-center space-x-1 text-xs text-blue-600 font-medium px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                            <Edit className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </Link>
                          <button onClick={() => handleDelete(blog.id, blog.title)} className="flex items-center space-x-1 text-xs text-red-600 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50">{toast}</div>
      )}
    </>
  );
}
