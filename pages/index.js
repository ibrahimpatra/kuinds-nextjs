// pages/index.js
// Next.js renders this on the server — Google can read every word for SEO
import { useState, useEffect } from 'react';
import Head from 'next/head';
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

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Head>
        <title>Kuwait India Driving School | Best Driving Lessons in Kuwait | Learn to Drive</title>
        <meta name="description" content="Kuwait India Driving School offers professional driving lessons in Kuwait. Expert instructors teaching in English, Arabic, Hindi, Telugu & Tamil. Pass your driving test on first try! Call +965 55998579" />
        <meta property="og:title" content="Kuwait India Driving School | Best Driving Lessons in Kuwait" />
        <meta property="og:description" content="Professional driving lessons in Kuwait. Expert instructors, multilingual teaching, 95% first-attempt pass rate. Call +965 55998579" />
        <meta property="og:image" content="https://customer-assets.emergentagent.com/job_learn-drive-kuwait/artifacts/os4f0zd1_Gemini_Generated_Image_s0cgogs0cgogs0cg.png" />
        <meta property="og:url" content="https://kuwaitindiadriving.com" />
        <link rel="canonical" href="https://kuwaitindiadriving.com" />
      </Head>

      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
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
