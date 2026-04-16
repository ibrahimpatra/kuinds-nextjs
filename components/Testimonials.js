// components/Testimonials.js
import { Star, ExternalLink } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border-2 border-green-600">
            Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-green-600">Students Say</span>
          </h2>
          <p className="text-lg text-gray-600">Real reviews from satisfied students who passed their driving tests!</p>
        </div>

        {/* Google Rating Card */}
        <div className="max-w-2xl mx-auto mb-12 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-600 rounded-2xl p-8 text-center shadow-xl">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-8 h-8" />
            <span className="text-2xl font-bold text-gray-900">Google Reviews</span>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-8 h-8 fill-green-600 text-green-600" />
              ))}
            </div>
            <span className="text-3xl font-bold text-gray-900">5.0</span>
          </div>
          <p className="text-gray-600 mb-6">Based on 100+ verified reviews</p>
          <a
            href="https://g.page/r/kuwait-india-driving-school/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <span>See All Google Reviews</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Elfsight Google Reviews Widget */}
        <div className="max-w-6xl mx-auto">
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div className="elfsight-app-3719eb44-e750-4257-912d-bd9864beab99" data-elfsight-app-lazy></div>
        </div>
      </div>
    </section>
  );
}
