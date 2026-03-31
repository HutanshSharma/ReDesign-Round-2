import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, AlertCircle, Check, Clock, MapPin, Users, Calendar } from 'lucide-react';

export default function PNREnquiry() {
  const [pnr, setPnr] = useState('');
  const [searched, setSearched] = useState(false);

  const mockPNRData = {
    pnr: '5628341024',
    trainNumber: '12004',
    trainName: 'NDLS LKO SHATABDI',
    date: '24-Oct-2026',
    status: 'CONFIRMED',
    passengers: [
      { name: 'AMIT KUMAR', age: 35, class: 'CC', seatNumber: '42', status: 'CONFIRMED' },
      { name: 'PRIYA SHARMA', age: 32, class: 'CC', seatNumber: '43', status: 'CONFIRMED' },
    ],
    journey: {
      from: 'New Delhi (NDLS)',
      to: 'Lucknow (LKO)',
      departure: '06:10',
      arrival: '12:40',
    },
    totalFare: '2300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-3 uppercase tracking-tight">PNR Status Enquiry</h1>
          <p className="text-blue-100">Track your booking status and passenger details in real-time</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8"
        >
          <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
            Enter 10-digit PNR Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., 5628341024"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              maxLength={10}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-lg focus:border-blue-600 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearched(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 transition-all"
            >
              <Search className="w-5 h-5" />
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Banner */}
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-l-4 border-emerald-600 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <Check className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-black text-emerald-900">CONFIRMED</h2>
              </div>
              <p className="text-sm text-emerald-700 font-bold">Your booking is confirmed and ticket is ready to download</p>
            </div>

            {/* Train Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Train Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Train Number</p>
                  <p className="text-2xl font-black text-slate-900">{mockPNRData.trainNumber}</p>
                  <p className="text-sm text-slate-600 font-bold">{mockPNRData.trainName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Journey Date</p>
                  <p className="text-2xl font-black text-slate-900">{mockPNRData.date}</p>
                </div>
              </div>
            </motion.div>

            {/* Journey Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Journey Details</h3>
              <div className="flex items-center gap-8 mb-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">From</p>
                  <p className="text-lg font-black text-slate-900">{mockPNRData.journey.from}</p>
                </div>
                <div className="flex-1 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400" />
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">To</p>
                  <p className="text-lg font-black text-slate-900">{mockPNRData.journey.to}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Departure</p>
                  <p className="text-2xl font-black text-blue-600">{mockPNRData.journey.departure}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Arrival</p>
                  <p className="text-2xl font-black text-blue-600">{mockPNRData.journey.arrival}</p>
                </div>
              </div>
            </motion.div>

            {/* Passengers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase flex items-center gap-2">
                <Users className="w-5 h-5" />
                Passengers
              </h3>
              <div className="space-y-3">
                {mockPNRData.passengers.map((passenger, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Name</p>
                        <p className="font-bold text-slate-900">{passenger.name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Age</p>
                        <p className="font-bold text-slate-900">{passenger.age}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Class</p>
                        <p className="font-bold text-slate-900">{passenger.class}</p>
                      </div>
                      <div className="flex items-end">
                        <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">✓ {passenger.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fare Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 p-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-lg font-black text-slate-900 uppercase">Total Fare</span>
                <span className="text-3xl font-black text-blue-600">₹{mockPNRData.totalFare}</span>
              </div>
            </motion.div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg"
            >
              Download Ticket
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
