import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, ArrowRight, Filter, SortAsc, Heart, Share2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Seat {
  type: string;
  price: number;
  available: number;
  waitlist?: number;
}

interface Train {
  id: number;
  number: string;
  name: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fromStation: string;
  toStation: string;
  fromCode: string;
  toCode: string;
  seats: Seat[];
  days: string;
  isHit?: boolean;
}

export default function TrainSearchResults() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('departure');

  const trains: Train[] = [
    {
      id: 1,
      number: '12004',
      name: 'NDLS LKO SHATABDI',
      type: 'Shatabdi',
      departureTime: '06:10',
      arrivalTime: '12:40',
      duration: '06h 30m',
      fromStation: 'New Delhi (NDLS)',
      toStation: 'Lucknow (LKO)',
      fromCode: 'NDLS',
      toCode: 'LKO',
      days: 'M T W T F S S',
      seats: [
        { type: 'CC', price: 1150, available: 45 },
        { type: 'EC', price: 2310, available: 0, waitlist: 12 }
      ]
    },
    {
      id: 2,
      number: '22436',
      name: 'VANDE BHARAT EX',
      type: 'Vande Bharat',
      departureTime: '06:00',
      arrivalTime: '14:00',
      duration: '08h 00m',
      fromStation: 'New Delhi (NDLS)',
      toStation: 'Varanasi (BSB)',
      fromCode: 'NDLS',
      toCode: 'BSB',
      days: 'M T W T F S S',
      seats: [
        { type: 'CC', price: 1750, available: 102 },
        { type: 'EC', price: 3305, available: 15 }
      ],
      isHit: true
    },
    {
      id: 3,
      number: '12229',
      name: 'LUCKNOW MAIL',
      type: 'Superfast',
      departureTime: '22:00',
      arrivalTime: '06:50',
      duration: '08h 50m',
      fromStation: 'New Delhi (NDLS)',
      toStation: 'Lucknow (LKO)',
      fromCode: 'NDLS',
      toCode: 'LKO',
      days: 'M T W T F S S',
      seats: [
        { type: 'SL', price: 450, available: 85 },
        { type: 'CC', price: 980, available: 35 },
        { type: 'EC', price: 2150, available: 8 }
      ]
    },
    {
      id: 4,
      number: '14256',
      name: 'BRAHMAPUTRA MAIL',
      type: 'Express',
      departureTime: '16:30',
      arrivalTime: '08:15',
      duration: '15h 45m',
      fromStation: 'New Delhi (NDLS)',
      toStation: 'Guwahati (GUWAHATI)',
      fromCode: 'NDLS',
      toCode: 'GHY',
      days: 'M T W T F S',
      seats: [
        { type: 'SL', price: 850, available: 120 },
        { type: '2A', price: 1650, available: 45 },
        { type: '3A', price: 1150, available: 65 }
      ]
    }
  ];

  const fromStation = 'New Delhi (NDLS)';
  const toStation = 'Lucknow (LKO)';
  const date = 'Tomorrow, 24 Oct';
  const quota = 'General Quota';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 pb-16 md:pb-12">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 text-white pt-34 mt-10 pb-8 px-4 shadow-lg"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight">
                {fromStation}
              </span>
              <ArrowRight className="w-6 h-6 text-orange-500" />
              <span className="text-xl md:text-2xl font-black uppercase tracking-tight">
                {toStation}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-700/50 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">
                {date}
              </div>
              <div className="bg-blue-500/30 backdrop-blur px-4 py-2 rounded-full text-sm font-bold">
                {quota}
              </div>
              <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Modify Search
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-semibold text-slate-300"
          >
            {trains.length} Trains Found
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 overflow-y-auto pr-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Filters</h3>
              </div>

              {/* Train Type Filter */}
              <div className="mb-8">
                <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Train Type</h4>
                <div className="space-y-3">
                  {['Vande Bharat', 'Rajdhani', 'Shatabdi', 'Express', 'Superfast'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="radio"
                        name="trainType"
                        value={type}
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        className="w-4 h-4 accent-blue-600"
                      />
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Class Filter */}
              <div>
                <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider">Class</h4>
                <div className="space-y-3">
                  {['1A (First AC)', '2A (Second AC)', '3A (Third AC)', 'SL (Sleeper)', 'CC (Chair Car)', 'EC (Exec Chair)'].map((cls) => (
                    <label key={cls} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-600 rounded"
                      />
                      <span className="text-slate-700 group-hover:text-slate-900 transition-colors text-sm">
                        {cls}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3 overflow-y-auto pl-2"
          >
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                {['departure', 'duration', 'price'].map((sort) => (
                  <button
                    key={sort}
                    onClick={() => setSortBy(sort)}
                    className={`px-4 py-2 rounded-lg font-bold uppercase text-xs tracking-widest transition-all ${
                      sortBy === sort
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    {sort === 'departure' ? 'Departure - Early First' : sort === 'duration' ? 'Shortest Duration' : 'Price - Low to High'}
                  </button>
                ))}
              </div>
            </div>

            {/* Train Cards */}
            <div className="space-y-4">
              {trains.map((train, idx) => (
                <motion.div
                  key={train.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all"
                >
                  {/* Hit Badge */}
                  {train.isHit && (
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 text-sm font-bold">
                      🔥 Popular Choice
                    </div>
                  )}

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {/* Train Info */}
                      <div>
                        <div className="flex items-baseline gap-2 mb-3">
                          <h3 className="text-2xl font-black text-slate-900">
                            {train.number}
                          </h3>
                          <span className="text-xs font-bold bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                            {train.type}
                          </span>
                        </div>
                        <p className="text-slate-600 font-bold mb-4">{train.name}</p>

                        {/* Journey Time */}
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-3xl font-black text-slate-900">
                              {train.departureTime}
                            </p>
                            <p className="text-sm text-slate-600 font-bold">
                              {train.fromCode}
                            </p>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-slate-600 text-center font-bold mb-1">
                              {train.duration}
                            </p>
                            <div className="h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" />
                            <p className="text-xs text-slate-600 text-center font-bold mt-1">Direct</p>
                          </div>
                          <div>
                            <p className="text-3xl font-black text-slate-900">
                              {train.arrivalTime}
                            </p>
                            <p className="text-sm text-slate-600 font-bold">
                              {train.toCode}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Days */}
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                          Available Daily
                        </p>
                        <div className="flex gap-2">
                          {train.days.split(' ').map((day) => (
                            <span
                              key={day}
                              className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-bold text-xs"
                            >
                              {day}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Seats */}
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                          Available Seats
                        </p>
                        <div className="space-y-2">
                          {train.seats.map((seat) => (
                            <div
                              key={seat.type}
                              className={`p-3 rounded-xl border-2 ${
                                seat.available > 0
                                  ? 'bg-emerald-50 border-emerald-200'
                                  : 'bg-red-50 border-red-200'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-900">{seat.type}</span>
                                <span className="text-sm font-bold text-slate-900">₹{seat.price}</span>
                              </div>
                              <p
                                className={`text-xs font-bold uppercase tracking-widest ${
                                  seat.available > 0 ? 'text-emerald-600' : 'text-red-600'
                                }`}
                              >
                                {seat.available > 0
                                  ? `AVAILABLE - ${seat.available}`
                                  : `WL${seat.waitlist ?? 0}`}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                      <button className="flex-1 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95">
                        Book Now
                      </button>
                      <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center text-slate-700 hover:text-slate-900">
                        <Heart className="w-5 h-5" />
                      </button>
                      <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all flex items-center justify-center text-slate-700 hover:text-slate-900">
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Alert */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 bg-blue-50 border-l-4 border-blue-600 rounded-lg p-4 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-900">Tip:</p>
                <p className="text-sm text-slate-700">
                  Prices may vary based on the class and booking time. Book early to get better prices. Check availability before confirming your booking.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}
