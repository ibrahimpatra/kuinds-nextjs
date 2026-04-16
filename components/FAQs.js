// components/FAQs.js
// Simple accordion built inline — no shadcn/ui needed
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../data/mockData';

function AccordionItem({ faq, isOpen, onToggle }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
          {faq.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQs() {
  const [openId, setOpenId] = useState(null);

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-yellow-50 via-white to-red-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            FAQ
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-red-600">Questions</span>
          </h2>
          <p className="text-lg text-gray-600">Got questions? We've got answers!</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              isOpen={openId === faq.id}
              onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center bg-white border border-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Still have questions?</h3>
          <p className="text-gray-600 mb-6">We're here to help you get started!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+96555998579" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Call Us: +965 55998579
            </a>
            <a href="https://wa.me/96555998579" target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
