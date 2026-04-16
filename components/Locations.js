// components/Locations.js
import { MapPin } from 'lucide-react';

const locations = [
  {
    name: 'Salmiya',
    address: '3 Al Qatami St, Salmiya',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7252.817265625!2d48.05531!3d29.3263828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b35913f647b%3A0x4aab8e6869ab55fe!2sKuwait%20India%20Driving%20School!5e0!3m2!1sen!2s!4v1234567890',
    color: 'text-red-600',
    border: 'border-red-200',
  },
  {
    name: 'Farwaniya',
    address: 'Farwaniya, Kuwait',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3476.169374486392!2d47.9535446!3d29.272821!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9bae848a5247%3A0x5e0c411f9ea61ac5!2sDriving%20school%20farwaniya!5e0!3m2!1sen!2s!4v1234567890',
    color: 'text-green-600',
    border: 'border-green-200',
  },
];

export default function Locations() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {locations.map((loc) => (
        <div key={loc.name} className={`bg-white border-2 border-green-600 rounded-xl p-4 shadow-lg`}>
          <div className="flex items-center space-x-2 mb-3">
            <MapPin className={`w-5 h-5 ${loc.color}`} />
            <h4 className="font-bold text-gray-900">{loc.name}</h4>
          </div>
          <div className="rounded-lg overflow-hidden border-2 border-gray-200">
            <iframe
              src={loc.mapSrc}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title={`${loc.name} Location`}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">{loc.address}</p>
        </div>
      ))}
    </div>
  );
}
