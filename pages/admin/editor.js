// pages/admin/editor.js
// Handles both NEW post and EDIT post in one file.
// New post: /admin/editor
// Edit post: /admin/editor?id=BLOG_ID
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { db } from '../../lib/firebase';
import { collection, addDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white text-gray-900 placeholder-gray-400';

function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now();
}

export default function BlogEditor() {
  const router = useRouter();
  const { id } = router.query;
  const { isAdmin } = useAuth();

  const [form, setForm] = useState({ title: '', content: '', excerpt: '', author: '', imageUrl: '', slug: '' });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  useEffect(() => {
    if (!isAdmin) { router.push('/login'); return; }
    if (id) {
      getDoc(doc(db, 'blogs', id)).then(snap => {
        if (snap.exists()) setForm(snap.data());
      });
    }
  }, [id, isAdmin]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, { method: 'POST', body: data });
      const json = await res.json();
      if (json.success) {
        set('imageUrl', json.data.url);
        showToast('Image uploaded!');
      } else throw new Error('Upload failed');
    } catch {
      showToast('Image upload failed. Use a direct URL instead.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.title || !form.content) { showToast('Title and content are required'); return; }
    setLoading(true);
    try {
      if (id) {
        await updateDoc(doc(db, 'blogs', id), { ...form, updatedAt: serverTimestamp() });
        showToast('Post updated!');
      } else {
        await addDoc(collection(db, 'blogs'), { ...form, slug: form.slug || generateSlug(form.title), createdAt: serverTimestamp() });
        showToast('Post published!');
        setTimeout(() => router.push('/admin'), 1000);
      }
    } catch (err) {
      showToast('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>{id ? 'Edit Post' : 'New Post'} | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/admin" className="flex items-center space-x-2 text-gray-500 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">Back</span>
              </Link>
              <span className="text-gray-300">|</span>
              <h1 className="font-bold text-gray-900">{id ? 'Edit Post' : 'New Post'}</h1>
            </div>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Publish'}</span>
            </button>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {/* Title */}
          <input
            placeholder="Post Title"
            value={form.title}
            onChange={e => { set('title', e.target.value); if (!id) set('slug', generateSlug(e.target.value)); }}
            className="w-full text-3xl font-bold px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          />

          {/* Excerpt */}
          <input placeholder="Short excerpt / summary (shown on blog list)" value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className={inputClass} />

          {/* Author */}
          <input placeholder="Author name" value={form.author} onChange={e => set('author', e.target.value)} className={inputClass} />

          {/* Image */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center space-x-2">
              <ImageIcon className="w-4 h-4" />
              <span>Featured Image</span>
            </label>
            <input type="url" placeholder="Paste image URL..." value={form.imageUrl} onChange={e => set('imageUrl', e.target.value)} className={inputClass + ' mb-3'} />
            <p className="text-sm text-gray-500 mb-3">— or upload —</p>
            <label className="cursor-pointer inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors">
              <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
            {form.imageUrl && (
              <img src={form.imageUrl} alt="Preview" className="mt-4 w-full max-h-48 object-cover rounded-lg" />
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content (HTML supported)</label>
            <textarea
              rows={20}
              placeholder="Write your blog post here... HTML tags like <h2>, <p>, <strong>, <ul><li> are supported."
              value={form.content}
              onChange={e => set('content', e.target.value)}
              className={inputClass + ' font-mono text-sm'}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
            <input placeholder="url-slug" value={form.slug} onChange={e => set('slug', e.target.value)} className={inputClass + ' font-mono text-sm'} />
            <p className="text-xs text-gray-400 mt-1">yoursite.com/blog/{form.slug || 'post-slug'}</p>
          </div>

          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : (id ? 'Update Post' : 'Publish Post')}</span>
          </button>
        </main>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50">{toast}</div>
      )}
    </>
  );
}
