import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, AlertCircle, TrendingUp } from 'lucide-react';

export default function TrackYourTrain() {
  const [trainNumber, setTrainNumber] = useState('12004');
  const [searched, setSearched] = useState(false);

  const stations = [
    { name: 'New Delhi (NDLS)', time: '06:10', distance: 0, status: 'DEPARTED', delay: 0 },
    { name: 'Ghaziabad', time: '06:50', distance: 58, status: 'COMPLETED', delay: 0 },
    { name: 'Kanpur Central', time: '09:30', distance: 235, status: 'CURRENT', delay: 2 },
    { name: 'Lucknow (LKO)', time: '12:40', distance: 420, status: 'PENDING', delay: 2 },
  ];

  const totalDistance = 420;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-12 px-4 mb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-black mb-3 uppercase tracking-tight">Track Your Train</h1>
          <p className="text-purple-100">Real-time train location and status updates</p>
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
            Enter Train Number
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="e.g., 12004"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl font-bold text-lg focus:border-purple-600 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearched(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl transition-all"
            >
              Track
            </motion.button>
          </div>
        </motion.div>

        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Train Info */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Train Number</p>
                  <p className="text-2xl font-black text-slate-900">12004</p>
                  <p className="text-sm text-slate-600 font-bold">NDLS LKO SHATABDI</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase">Current Status</p>
                  <p className="text-xl font-black text-purple-600">IN TRANSIT</p>
                  <p className="text-xs text-orange-600 font-bold">+2 min delay</p>
                </div>
              </div>
            </div>

            {/* Current Location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 rounded-xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-purple-700 uppercase">Currently at</p>
                  <p className="text-2xl font-black text-purple-900">Kanpur Central Station</p>
                  <p className="text-sm text-slate-600 font-bold">235 km from New Delhi</p>
                </div>
              </div>
            </motion.div>

            {/* Journey Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg border border-slate-200 p-6"
            >
              <h3 className="text-lg font-black text-slate-900 mb-6 uppercase">Journey Progress</h3>
              
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-2">
                  <span>0 km</span>
                  <span className="text-center flex-1">{235} km</span>
                  <span className="text-right">{totalDistance} km</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '56%' }}
                    transition={{ duration: 1 }}
                    className="bg-gradient-to-r from-purple-600 to-purple-400 h-full rounded-full"
                  />
                </div>
              </div>

              {/* Stations */}
              <div className="space-y-4">
                {stations.map((station, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className={`flex gap-4 p-4 rounded-lg ${
                      station.status === 'CURRENT'
                        ? 'bg-purple-50 border-2 border-purple-600'
                        : station.status === 'COMPLETED'
                        ? 'bg-emerald-50 border border-emerald-200'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full ${
                          station.status === 'COMPLETED'
                            ? 'bg-emerald-600'
                            : station.status === 'CURRENT'
                            ? 'bg-purple-600'
                            : 'bg-slate-400'
                        }`}
                      />
                      {idx < stations.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            station.status === 'COMPLETED' ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-900">{station.name}</p>
                      <p className="text-xs text-slate-600">{station.distance} km</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${station.status === 'COMPLETED' ? 'text-emerald-700' : station.status === 'CURRENT' ? 'text-purple-700' : 'text-slate-600'}`}>
                        {station.time}
                      </p>
                      {station.delay > 0 && (
                        <p className="text-xs text-orange-600 font-bold">+{station.delay} min</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Live Updates */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 border border-blue-200 rounded-xl p-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-slate-900">Live Updates Available</p>
                  <p className="text-sm text-slate-600">Receive real-time notifications on train delays and station arrivals. Enable notifications in your browser.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
