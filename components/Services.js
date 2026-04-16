// components/Services.js
import { GraduationCap, Award, Car, Languages, MapPin, UserCheck } from 'lucide-react';
import { services } from '../data/mockData';

const iconMap = { GraduationCap, Award, Car, Languages, MapPin, UserCheck };

const colors = [
  { bg: 'from-red-50 to-red-100', border: 'border-red-200', icon: 'text-red-600', iconBg: 'bg-red-100' },
  { bg: 'from-green-50 to-green-100', border: 'border-green-200', icon: 'text-green-600', iconBg: 'bg-green-100' },
  { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', icon: 'text-yellow-600', iconBg: 'bg-yellow-100' },
  { bg: 'from-red-50 to-red-100', border: 'border-red-200', icon: 'text-red-600', iconBg: 'bg-red-100' },
  { bg: 'from-green-50 to-green-100', border: 'border-green-200', icon: 'text-green-600', iconBg: 'bg-green-100' },
  { bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', icon: 'text-yellow-600', iconBg: 'bg-yellow-100' },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Our Services
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Complete <span className="text-yellow-600">Driving Solutions</span> for You
          </h2>
          <p className="text-lg text-gray-600">
            From beginner lessons to test preparation, we offer comprehensive driving instruction tailored to your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            const c = colors[i % 6];
            return (
              <div key={service.id} className={`group bg-gradient-to-br ${c.bg} border ${c.border} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                <div className={`${c.iconBg} w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-8 h-8 ${c.icon}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/96555998579?text=Hi!%20I%20want%20to%20know%20about%20driving%20lessons"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Enquire About Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
