// components/Footer.js
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-600" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-600" />
              </div>
              <h3 className="text-white font-bold text-lg">Kuwait India Driving School</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Kuwait's premier Indian driving school offering professional driving lessons in multiple languages. Get your license with confidence!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['about', 'services', 'testimonials', 'contact'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => scrollTo(e, id)} className="hover:text-green-400 transition-colors capitalize">
                    {id === 'about' ? 'About Us' : id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
              <li><a href="/blog" className="hover:text-green-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Beginner Lessons', 'Test Preparation', 'Manual Training', 'Automatic Training', 'Pickup & Drop', 'Private Classes'].map((s) => (
                <li key={s}><a href="#services" onClick={(e) => scrollTo(e, 'services')} className="hover:text-green-400 transition-colors">{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="tel:+96555998579" className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>+965 55998579</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@kuwaitindiadriving.com" className="flex items-center space-x-2 hover:text-green-400 transition-colors">
                  <Mail className="w-4 h-4 text-green-500" />
                  <span>info@kuwaitindiadriving.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Salmiya & Farwaniya, Kuwait</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Kuwait India Driving School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
