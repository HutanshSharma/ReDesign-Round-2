import { useState } from 'react';
import { motion } from 'motion/react';
import { Trash2, AlertTriangle, Check, Clock, DollarSign } from 'lucide-react';

export default function CancelETicket() {
  const [pnr, setPnr] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const ticketDetails = {
    pnr: '5628341024',
    trainNumber: '12004',
    trainName: 'NDLS LKO SHATABDI',
    date: '24-Oct-2026',
    passengers: ['AMIT KUMAR', 'PRIYA SHARMA'],
    totalFare: 2300,
    cancellationCharge: 410,
    refundAmount: 1890,
    status: 'CONFIRMED',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-3 uppercase tracking-tight">Cancel E-Ticket</h1>
          <p className="text-red-100">Manage your bookings easily</p>
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
            Enter PNR to Cancel
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., 5628341024"
              value={pnr}
              onChange={(e) => setPnr(e.target.value)}
              maxLength={10}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-lg focus:border-red-600 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDetails(true)}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold px-8 py-3 rounded-xl transition-all"
            >
              Search
            </motion.button>
          </div>
        </motion.div>

        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Warning */}
            <div className="bg-orange-50 border-l-4 border-orange-600 rounded-xl p-6 flex gap-4">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <p className="font-bold text-slate-900 mb-1">Cancellation Policy</p>
                <p className="text-sm text-slate-700">Cancellation charges apply based on when you cancel before departure. Refund will be credited to your original payment method.</p>
              </div>
            </div>

            {/* Ticket Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Booking Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Train</p>
                  <p className="text-lg font-black text-slate-900">{ticketDetails.trainNumber}</p>
                  <p className="text-xs text-slate-600">{ticketDetails.trainName}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Journey Date</p>
                  <p className="text-lg font-black text-slate-900">{ticketDetails.date}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Status</p>
                  <span className="inline-block bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    {ticketDetails.status}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Passengers */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Passengers</h3>
              <div className="space-y-2">
                {ticketDetails.passengers.map((passenger, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
                      {idx + 1}
                    </div>
                    <span className="font-bold text-slate-900">{passenger}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Fare Breakdown */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-6 uppercase">Fare Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="font-bold text-slate-700">Total Fare</span>
                  <span className="text-xl font-black text-slate-900">₹{ticketDetails.totalFare}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                  <span className="font-bold text-slate-700">Cancellation Charges</span>
                  <span className="text-xl font-black text-red-600">-₹{ticketDetails.cancellationCharge}</span>
                </div>
                <div className="flex justify-between items-center pt-2 bg-emerald-50 p-4 rounded-lg">
                  <span className="font-bold text-slate-900">Refund Amount</span>
                  <span className="text-2xl font-black text-emerald-600">₹{ticketDetails.refundAmount}</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-4 font-bold">Refund will be processed within 7-10 business days to your original payment method.</p>
            </motion.div>

            {/* Cancellation Charges Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-4 uppercase">Cancellation Charges</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">More than 48 hours before departure</p>
                    <p className="text-xs text-slate-600">₹100-500</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-orange-900">12 to 48 hours before departure</p>
                    <p className="text-xs text-orange-700">25% of fare + ₹100</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
                  <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-red-900">Less than 12 hours before departure</p>
                    <p className="text-xs text-red-700">50% of fare + ₹100</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold py-4 rounded-xl uppercase tracking-widest transition-all"
              >
                Cancel Request
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetails(false)}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all flex items-center justify-center gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Proceed to Cancel
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
