import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Clock, Users, MapPin } from 'lucide-react';

export default function TrainSchedule() {
  const [from, setFrom] = useState('New Delhi');
  const [to, setTo] = useState('Lucknow');
  const [searched, setSearched] = useState(false);

  const scheduleData = [
    { number: '12004', name: 'NDLS LKO SHATABDI', type: 'Shatabdi', departure: '06:10', arrival: '12:40', duration: '6h 30m', classes: ['CC', 'EC'] },
    { number: '12229', name: 'LUCKNOW MAIL', type: 'Superfast', departure: '22:00', arrival: '06:50+1', duration: '8h 50m', classes: ['SL', 'CC', 'EC'] },
    { number: '14154', name: 'SATABDI EXP', type: 'Express', departure: '14:30', arrival: '22:15', duration: '7h 45m', classes: ['1A', '2A', 'CC'] },
    { number: '12003', name: 'NDLS LKO EXP', type: 'Passenger', departure: '08:00', arrival: '15:30', duration: '7h 30m', classes: ['2A', '3A'] },
  ];

  const classColors: { [key: string]: string } = {
    '1A': 'bg-purple-100 text-purple-700',
    '2A': 'bg-blue-100 text-blue-700',
    '3A': 'bg-cyan-100 text-cyan-700',
    'CC': 'bg-green-100 text-green-700',
    'EC': 'bg-orange-100 text-orange-700',
    'SL': 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pt-32 pb-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12 px-4 mb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-black mb-3 uppercase tracking-tight">Train Schedule</h1>
          <p className="text-green-100">View all trains between any two stations with complete schedules</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">From</label>
              <input
                type="text"
                placeholder="Departure Station"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold focus:border-green-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">To</label>
              <input
                type="text"
                placeholder="Arrival Station"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl font-bold focus:border-green-600 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearched(true)}
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
              >
                <Search className="w-5 h-5" />
                Search
              </motion.button>
            </div>
          </div>
        </motion.div>

        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-sm font-bold text-slate-600 mb-4">
              Showing {scheduleData.length} trains from {from} to {to}
            </div>

            {scheduleData.map((train, idx) => (
              <motion.div
                key={train.number}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {/* Train Info */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Train</p>
                      <p className="text-lg font-black text-slate-900">{train.number}</p>
                      <p className="text-xs text-slate-600 font-bold">{train.name}</p>
                      <span className="inline-block mt-2 text-xs font-bold bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {train.type}
                      </span>
                    </div>

                    {/* Departure */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Departure</p>
                      <p className="text-3xl font-black text-slate-900">{train.departure}</p>
                      <p className="text-xs text-slate-600 font-bold">{from}</p>
                    </div>

                    {/* Duration */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-0.5 bg-gradient-to-r from-green-600 to-green-400 rounded-full" />
                      </div>
                      <p className="text-xs font-bold text-slate-600 text-center">{train.duration}</p>
                      <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-600 mt-2">
                        <Clock className="w-3 h-3" />
                        Direct
                      </div>
                    </div>

                    {/* Arrival */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-1">Arrival</p>
                      <p className="text-3xl font-black text-slate-900">{train.arrival}</p>
                      <p className="text-xs text-slate-600 font-bold">{to}</p>
                    </div>

                    {/* Classes Available */}
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase mb-2">Classes</p>
                      <div className="flex flex-wrap gap-1">
                        {train.classes.map((cls) => (
                          <span
                            key={cls}
                            className={`text-xs font-bold px-2 py-1 rounded-full ${classColors[cls]}`}
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                      <button className="mt-3 w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-bold py-2 rounded-lg text-sm transition-all">
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <p className="text-sm font-bold text-slate-900 mb-2">💡 Tip:</p>
              <p className="text-sm text-slate-700">Book online to get the best fares. Shatabdi and Rajdhani trains are premium services with dining facilities. Sleeper classes are most economical for long journeys.</p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
