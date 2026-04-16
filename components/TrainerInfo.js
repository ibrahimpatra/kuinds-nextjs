// components/TrainerInfo.js
import { Phone, MapPin } from 'lucide-react';

export default function TrainerInfo() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-600 rounded-2xl p-6 shadow-lg">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Meet Your Trainer</h3>
        <p className="text-3xl font-black text-green-600 mb-1">J. Mohamed</p>
        <p className="text-2xl font-bold text-gray-700 mb-4">J. முகம்மது</p>
        <div className="space-y-3">
          <a
            href="tel:+96555998579"
            className="flex items-center justify-center space-x-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span>+965 55998579</span>
          </a>
          <div className="flex items-center justify-center space-x-2 text-gray-700">
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="font-semibold">All Over Kuwait</span>
          </div>
        </div>
      </div>
    </div>
  );
}
