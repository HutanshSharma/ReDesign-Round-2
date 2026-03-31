import { useState } from 'react';
import { motion } from 'motion/react';
import { Bell, Clock, AlertTriangle, Trash2, Mail, Phone, Train } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Subscription {
  id: number;
  trainNumber: string;
  trainName: string;
  status: 'ACTIVE' | 'PAUSED';
  message: string;
  statusColor: string;
}

export default function Alerts() {
  const [formData, setFormData] = useState({
    trainNumber: '',
    phoneNumber: '+91',
    email: ''
  });

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 1,
      trainNumber: '12301',
      trainName: 'HOWRAH RAJDHANI',
      status: 'ACTIVE',
      message: 'Running late by 15 min',
      statusColor: 'text-orange-500'
    },
    {
      id: 2,
      trainNumber: '12259',
      trainName: 'SEALDAH DURONTO',
      status: 'ACTIVE',
      message: 'On time',
      statusColor: 'text-green-500'
    },
    {
      id: 3,
      trainNumber: '22811',
      trainName: 'BHUBANESWAR RAJDHANI',
      status: 'PAUSED',
      message: 'Journey completed',
      statusColor: 'text-slate-500'
    }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Subscribe:', formData);
    // Add subscription logic here
  };

  const removeSubscription = (id: number) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-28 pb-16 md:pb-12 px-4">
      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Subscribe Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Subscribe for New Alerts
                </h2>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-5">
                {/* Train Number */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                    Train Number
                  </label>
                  <div className="relative">
                    <Train className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                      type="text"
                      name="trainNumber"
                      value={formData.trainNumber}
                      onChange={handleInputChange}
                      placeholder="e.g. 12004"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 font-medium text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Mobile and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      Mobile Number (SMS)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="+91"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 font-medium text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Optional"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 font-medium text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Subscribe Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-black uppercase tracking-widest py-3 rounded-xl transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </motion.div>

          {/* Active Subscriptions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 sticky top-28">
              <div className="flex items-center justify-between gap-3 mb-6">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 uppercase tracking-tight">
                  Active Subscriptions
                </h3>
                <span className="bg-blue-600 text-white font-bold text-sm rounded-full w-8 h-8 flex items-center justify-center">
                  {subscriptions.length}
                </span>
              </div>

              <div className="space-y-3">
                {subscriptions.map((sub, idx) => (
                  <motion.div
                    key={sub.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-200 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-grow">
                        <p className="font-black text-slate-900 text-sm">
                          {sub.trainNumber} {sub.trainName}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`text-xs font-bold uppercase tracking-widest ${sub.statusColor}`}
                          >
                            {sub.status}
                          </span>
                          <span className="text-xs text-slate-600">
                            {sub.message}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeSubscription(sub.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {subscriptions.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm font-medium">
                    No active subscriptions
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Alert Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Delay Alerts */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  Delay Alerts
                </h3>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Notified if train is delayed by &gt;30 mins.
            </p>
          </div>

          {/* Cancellations */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8 hover:shadow-xl transition-all">
            <div className="flex items-start gap-4 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                  Cancellations
                </h3>
              </div>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Instant alert if train is cancelled or diverted.
            </p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
            <div className="max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Never Miss an Update</h2>
              <p className="text-blue-100 mb-6">
                Stay informed about your train's status with our comprehensive alert system. Subscribe now and get real-time notifications.
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
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}
