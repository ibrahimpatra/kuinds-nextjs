// components/About.js
import { CheckCircle, MapPin, Clock, Award, Car, Users } from 'lucide-react';

const features = [
  { icon: Award, text: '15-30+ years experienced instructors', color: 'text-green-600' },
  { icon: Car, text: 'Manual & automatic training', color: 'text-red-600' },
  { icon: MapPin, text: 'All Kuwait areas covered', color: 'text-green-600' },
  { icon: Clock, text: 'Flexible timing - 7 days/week', color: 'text-red-600' },
  { icon: Users, text: '1000+ successful students', color: 'text-green-600' },
  { icon: CheckCircle, text: '95% first-attempt pass rate', color: 'text-red-600' },
];

export default function About() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border-2 border-green-600">
            About Us
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Kuwait's Most Trusted <span className="text-green-600">Indian Driving School</span>
          </h2>
          <p className="text-lg text-gray-600">
            With over 15-30 years of experience teaching in Kuwait, our certified instructors have helped
            thousands of expats and locals get their driving licenses with confidence.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://customer-assets.emergentagent.com/job_learn-drive-kuwait/artifacts/nnqz70pt_Gemini_Generated_Image_qaslysqaslysqasl.png"
              alt="Kuwait India Driving School instructor teaching a student"
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map(({ icon: Icon, text, color }) => (
              <div key={text} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <Icon className={`w-6 h-6 ${color} flex-shrink-0 mt-0.5`} />
                <span className="font-medium text-gray-800 text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4 font-medium uppercase tracking-wide">Teaching Languages</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['English', 'Arabic', 'Hindi', 'Malayalam', 'Telugu', 'Tamil'].map((lang) => (
              <span key={lang} className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
