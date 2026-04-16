// components/WhatsAppFAB.js
import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WA_URL = 'https://wa.me/96555998579?text=Hi!%20I%20would%20like%20to%20inquire%20about%20driving%20lessons%20at%20Kuwait%20India%20Driving%20School.';

export default function WhatsAppFAB() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 group ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}
    >
      {/* Tooltip */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Chat on WhatsApp
      </span>

      {/* Button */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-40" />
        <div className="relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110">
          <MessageCircle className="w-8 h-8" />
        </div>
        {/* Online dot */}
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-4 border-white rounded-full" />
      </div>
    </a>
  );
}
