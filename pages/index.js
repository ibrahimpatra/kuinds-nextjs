// pages/index.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import TrainerInfo from '../components/TrainerInfo';
import Locations from '../components/Locations';
import FAQs from '../components/FAQs';
import Footer from '../components/Footer';
import WhatsAppFAB from '../components/WhatsAppFAB';
import LoadingScreen from '../components/LoadingScreen';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

function formatDate(timestamp) {
  if (!timestamp) return '';
  try {
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}

function BlogPreviewSection() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const { db } = await import('../lib/firebase');
        if (!db) { setStatus('error'); return; }
        const { collection, getDocs, orderBy, query, limit } = await import('firebase/firestore');
        const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'), limit(3));
        const snap = await getDocs(q);
        if (cancelled) return;
        const data = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setBlogs(data);
        setStatus(data.length === 0 ? 'empty' : 'ok');
      } catch {
        if (!cancelled) setStatus('error');
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  if (status === 'loading') return null;

  if (status === 'empty' || status === 'error') {
    return (
      <section className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <BookOpen className="w-4 h-4" />
            <span>Driving Tips & Guides</span>
          </div>
          <p className="text-gray-600 text-lg mt-2">
            Check out our latest driving tips and Kuwait road guides —{' '}
            <Link href="/blog" className="text-green-600 hover:underline font-semibold">
              visit our Blog
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" />
              <span>Latest from our Blog</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900">
              Driving Tips &amp; <span className="text-green-600">Guides</span>
            </h2>
          </div>
          <Link href="/blog" className="hidden sm:inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold">
            <span>View all posts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col">
              {blog.imageUrl ? (
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-green-400" />
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                {blog.createdAt && (
                  <div className="flex items-center space-x-1 text-xs text-gray-400 mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 flex-1">{blog.title}</h3>
                {blog.excerpt && <p className="text-gray-500 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>}
                <Link href={`/blog/${blog.slug}`} className="inline-flex items-center space-x-1 text-green-600 hover:text-green-700 font-semibold text-sm mt-auto">
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

export default function Home() {
  // ✅ KEY FIX: Start as false on server so full page renders
  // Loading screen only shows on client after hydration
  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Only show loader on client, only on first visit
    const hasVisited = sessionStorage.getItem('visited');
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem('visited', 'true');
      const timer = setTimeout(() => setShowLoader(false), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Loading screen only on client-side first visit
  if (showLoader) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Kuwait India Driving School | Best Driving Lessons in Kuwait</title>
        <meta
          name="description"
          content="Kuwait India Driving School offers professional driving lessons in Kuwait. Expert instructors teaching in English, Arabic, Hindi, Telugu & Tamil. Pass your driving test on first try! Call +965 55998579"
        />
        <meta property="og:title" content="Kuwait India Driving School | Best Driving Lessons in Kuwait" />
        <meta
          property="og:description"
          content="Professional driving lessons in Kuwait. Expert instructors, multilingual teaching, 95% first-attempt pass rate. Call +965 55998579"
        />
        <meta property="og:url" content="https://kuwaitindiadrivingschool.com" />
        <link rel="canonical" href="https://kuwaitindiadrivingschool.com" />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <BlogPreviewSection />
        <Contact />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <TrainerInfo />
          <Locations />
        </div>
        <FAQs />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

// Forces Next.js to server-render — Google sees full HTML
export async function getServerSideProps() {
  return {
    props: {},
  };
}