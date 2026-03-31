import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MessageCircle, Search, ChevronDown, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function ContactUs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'How can I cancel my confirmed ticket?',
      answer: 'You can cancel your confirmed ticket through the IRCTC website or mobile app. Go to "My Bookings", select the ticket you want to cancel, and follow the cancellation process. Refunds are processed based on the cancellation policy and train schedule.'
    },
    {
      id: 2,
      question: 'What is the Tatkal booking time?',
      answer: 'Tatkal booking opens at 11:00 AM for AC coaches and 11:00 AM for Non-AC coaches. Bookings are available until 2:00 PM on the day before the journey. Tatkal tickets have a limited quota and are subject to availability.'
    },
    {
      id: 3,
      question: 'How do I check my PNR status?',
      answer: 'You can check your PNR status by visiting the IRCTC website or using the mobile app. Enter your 10-digit PNR number and date of journey. You can also SMS "PNR <your PNR number>" to get real-time status updates.'
    },
    {
      id: 4,
      question: 'My money was deducted but ticket wasn\'t booked. What should I do?',
      answer: 'If your payment was deducted but the ticket wasn\'t booked, the amount will be automatically refunded to your account within 3-5 business days. You can also contact our customer care team for immediate assistance.'
    },
    {
      id: 5,
      question: 'Can I travel with a waitlisted e-ticket?',
      answer: 'No, you cannot travel with a waitlisted ticket. Wait-listed passengers are not permitted to board the train. However, you can cancel the ticket or use the automatic upgrade feature if available for your booking.'
    },
    {
      id: 6,
      question: 'How do I reset my IRCTC account password?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address or username. You\'ll receive a password reset link via email. Follow the link to create a new password.'
    },
    {
      id: 7,
      question: 'What are the cancellation charges for a confirmed ticket?',
      answer: 'Cancellation charges vary based on how close to the journey date you cancel. Generally, cancellation up to 48 hours before departure has lower charges. Check the detailed cancellation policy on our website for exact charges.'
    },
    {
      id: 8,
      question: 'Is it mandatory to carry original ID proof?',
      answer: 'Yes, it is mandatory to carry a valid photo ID proof during train travel. Acceptable IDs include Aadhar, Passport, Driving License, Pan Card, or similar government-issued documents.'
    }
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pb-16 md:pb-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-linear-to-br from-slate-900 to-slate-800 mt-10 text-white pt-38 pb-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight"
          >
            We're Here to Help
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            Have questions about your booking, account, or our services? Our dedicated support team is available 24/7.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSearch}
          className="max-w-2xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search help topics (e.g. Cancel ticket, PNR status)..."
                className="w-full bg-white text-slate-900 rounded-full pl-12 pr-4 py-4 font-medium placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all active:scale-95 whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </motion.form>
      </motion.div>

      {/* Contact Methods */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Customer Care */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              Customer Care
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              24x7 support for general enquiries and ticket related issues.
            </p>
            <p className="text-2xl font-black text-slate-900">139</p>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              Email Support
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Send us an email for detailed queries and document attachments.
            </p>
            <p className="text-lg font-bold text-blue-600 break-all">care@irctc.co.in</p>
          </div>

          {/* WhatsApp Support */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 hover:shadow-2xl transition-all">
            <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-4">
              <MessageCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">
              WhatsApp Support
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Get instant automated replies for PNR status and train running info.
            </p>
            <p className="text-lg font-bold text-slate-900">+91 98765 43210</p>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">
              Frequently Asked Questions
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className="bg-white rounded-xl border border-slate-200 hover:border-blue-200 transition-colors"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-left font-bold text-slate-900 text-sm md:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-600 flex-shrink-0 transition-transform duration-300 ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {expandedFAQ === faq.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-4 border-t border-slate-200 bg-slate-50"
                    >
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Corporate Office */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 sticky top-28">
              <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
                Corporate Office
              </h3>

              {/* Office Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-slate-100 rounded-lg flex items-center justify-center text-slate-700 flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Registered Office</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        Indian Railway Catering and Tourism Corporation Ltd., B-148, 11th Floor, Statesman House, Barakhamba Road, New Delhi 110001
                      </p>
                    </div>
                  </div>
                </div>

                {/* CIN */}
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Corporate Identity Number (CIN)
                  </p>
                  <p className="font-bold text-slate-900 text-sm">
                    L74899DL1999GO1101707
                  </p>
                </div>

                {/* Office Hours */}
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Office Hours</h4>
                      <p className="text-slate-600 text-sm">
                        Mon-Fri: 10:00 AM - 6:00 PM
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        Saturdays, Sundays & Public Holidays: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Get Directions Button */}
                <button className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-black uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95 mt-4">
                  Get Directions
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  For immediate assistance, please call our customer care at <span className="font-bold text-slate-700">139</span> or use our WhatsApp support service available 24/7.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 mt-16"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Still need help?</h2>
            <p className="text-blue-100 mb-6">
              Our support team is always ready to assist you. Don't hesitate to reach out through any of our available channels.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}
