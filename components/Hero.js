// components/Hero.js
import { useState, useEffect } from 'react';
import { Car, Award, Users, Phone } from 'lucide-react';

const images = [
  { url: 'https://customer-assets.emergentagent.com/job_learn-drive-kuwait/artifacts/os4f0zd1_Gemini_Generated_Image_s0cgogs0cgogs0cg.png', alt: 'Student learning to drive in Kuwait with instructor' },
  { url: 'https://customer-assets.emergentagent.com/job_learn-drive-kuwait/artifacts/x6kb1ea1_Gemini_Generated_Image_txwhvrtxwhvrtxwh.png', alt: 'Professional driving instruction on Kuwait roads' },
  { url: 'https://customer-assets.emergentagent.com/job_learn-drive-kuwait/artifacts/mdlze98g_Gemini_Generated_Image_dpdividpdividpdi.png', alt: 'Kuwait driving academy training' },
  { url: 'https://images.unsplash.com/photo-1667020854803-0305af085242', alt: 'Expert instructors teaching' },
  { url: 'https://images.pexels.com/photos/9518244/pexels-photo-9518244.jpeg', alt: 'Student learning to drive' },
];

const words = ['Professionally', 'Confidently', 'Perfectly', 'Successfully'];

const stats = [
  { icon: Award, label: '95% Pass Rate', color: 'text-yellow-400' },
  { icon: Users, label: '1000+ Students', color: 'text-green-400' },
  { icon: Car, label: '15-30 Yrs Experience', color: 'text-red-400' },
];

export default function Hero() {
  const [currentImg, setCurrentImg] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const imgTimer = setInterval(() => setCurrentImg((p) => (p + 1) % images.length), 4000);
    const wordTimer = setInterval(() => setCurrentWord((p) => (p + 1) % words.length), 2000);
    return () => { clearInterval(imgTimer); clearInterval(wordTimer); };
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === currentImg ? 1 : 0 }}
        >
          <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <span className="text-sm font-medium">Kuwait's #1 Indian Driving School</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-4 leading-tight">
          Learn to Drive
          <br />
          <span className="text-green-400 transition-all duration-500">{words[currentWord]}</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Professional driving lessons in Kuwait. Expert instructors teaching in
          <strong className="text-yellow-400"> English, Arabic, Hindi, Telugu & Tamil</strong>.
          Pass your test on the <strong className="text-green-400">first try!</strong>
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#contact"
            onClick={scrollToContact}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Book Free Consultation
          </a>
          <a
            href="tel:+96555998579"
            className="flex items-center justify-center space-x-2 border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
          >
            <Phone className="w-5 h-5" />
            <span>+965 55998579</span>
          </a>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map(({ icon: Icon, label, color }) => (
            <div key={label} className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/70 rounded-full" />
        </div>
      </div>
    </section>
  );
}
