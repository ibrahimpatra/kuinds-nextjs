// components/Contact.js
import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

const inputClass = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all bg-white text-gray-900 placeholder-gray-400';

const contactInfo = [
  { icon: Phone, title: 'Phone', value: '+965 55998579', link: 'tel:+96555998579', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: MapPin, title: 'Locations', value: 'Salmiya & Farwaniya', link: null, color: 'text-red-600', bg: 'bg-red-50' },
  { icon: Clock, title: 'Working Hours', value: '7 Days/Week, 7AM - 10PM', link: null, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { icon: Mail, title: 'Email', value: 'info@kuwaitindiadriving.com', link: 'mailto:info@kuwaitindiadriving.com', color: 'text-green-600', bg: 'bg-green-50' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `*New Inquiry from Website*%0A%0A*Name:* ${form.name}%0A*Email:* ${form.email}%0A*Phone:* ${form.phone}%0A*Message:* ${form.message}`;
    window.open(`https://wa.me/96555998579?text=${msg}`, '_blank');
    showToast('Redirecting to WhatsApp...');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Contact Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Get in <span className="text-red-600">Touch</span>
          </h2>
          <p className="text-lg text-gray-600">Ready to start driving? Contact us today for your free consultation.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map(({ icon: Icon, title, value, link, color, bg }) => (
              <div key={title} className="flex items-start space-x-4">
                <div className={`${bg} p-3 rounded-xl`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{title}</p>
                  {link ? (
                    <a href={link} className={`${color} hover:underline font-medium`}>{value}</a>
                  ) : (
                    <p className="text-gray-600">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://wa.me/96555998579?text=Hi!%20I%20would%20like%20to%20inquire%20about%20driving%20lessons."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 bg-green-500 hover:bg-green-600 text-white w-full py-4 rounded-xl font-bold text-lg transition-colors mt-4"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.847L0 24l6.335-1.508A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.893 0-3.668-.513-5.191-1.408l-.371-.22-3.862.919.961-3.766-.241-.387A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input required placeholder="Your Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
              <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
              <input placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} />
              <textarea required rows={4} placeholder="Your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} className={inputClass} />
              <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-bold transition-colors">
                <Send className="w-5 h-5" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>

        {/* Toast notification */}
        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg z-50">
            {toast}
          </div>
        )}
      </div>
    </section>
  );
}
