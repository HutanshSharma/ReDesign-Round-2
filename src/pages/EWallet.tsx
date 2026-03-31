import { useState } from 'react';
import { motion } from 'motion/react';
import { Wallet, Plus, Send, TrendingDown, TrendingUp, Shield, Landmark, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Transaction {
  id: number;
  type: 'add' | 'deduct' | 'refund';
  description: string;
  reference: string;
  date: string;
  amount: number;
}

export default function EWallet() {
  const [showBalance, setShowBalance] = useState(true);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [addMoneyAmount, setAddMoneyAmount] = useState('');

  const balance = 1850.00;

  const transactions: Transaction[] = [
    {
      id: 1,
      type: 'add',
      description: 'Added from HDFC Bank',
      reference: 'WLT98234',
      date: '23 Oct 2023',
      amount: 2000
    },
    {
      id: 2,
      type: 'deduct',
      description: 'Ticket PNR: 8472910283',
      reference: 'WLT98112',
      date: '20 Oct 2023',
      amount: -1450
    },
    {
      id: 3,
      type: 'deduct',
      description: 'e-Catering Order',
      reference: 'WLT97984',
      date: '15 Oct 2023',
      amount: -350
    },
    {
      id: 4,
      type: 'add',
      description: 'Refund PNR: 2938471029',
      reference: 'WLT97655',
      date: '10 Oct 2023',
      amount: 1650
    },
    {
      id: 5,
      type: 'deduct',
      description: 'Ticket PNR: 1682934175',
      reference: 'WLT96420',
      date: '05 Oct 2023',
      amount: -2100
    }
  ];

  const handleAddMoney = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add money:', addMoneyAmount);
    setShowAddMoneyModal(false);
    setAddMoneyAmount('');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-28 pb-16 md:pb-12 px-4">
      

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Wallet Card and Limits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Active Wallet Card */}
            <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl p-8 text-white overflow-hidden relative">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between gap-3 mb-8">
                  <div className="flex items-center gap-2 bg-blue-500/30 rounded-full px-4 py-2 backdrop-blur-sm">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase tracking-widest">Active Wallet</span>
                  </div>
                  <div className="w-8 h-8 bg-emerald-400/20 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-300" />
                  </div>
                </div>

                {/* Balance Section */}
                <div className="mb-8">
                  <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">
                    Available Balance
                  </p>
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-4xl md:text-5xl font-black">
                      ₹{showBalance ? balance.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '••••'}
                    </p>
                    <button
                      onClick={() => setShowBalance(!showBalance)}
                      className="text-blue-100 hover:text-white transition-colors"
                    >
                      {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowAddMoneyModal(true)}
                    className="bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Money
                  </button>
                  <button className="bg-blue-800/50 hover:bg-blue-800 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm border border-blue-700">
                    <Send className="w-5 h-5" />
                    Withdraw
                  </button>
                </div>
              </div>
            </div>

            {/* Limits */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 bg-linear-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <Landmark className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Daily Limit
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ₹10,000
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all"
              >
                <div className="w-10 h-10 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-3">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  Monthly Limit
                </p>
                <p className="text-2xl font-black text-slate-900">
                  ₹1,00,000
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight">
                  Recent Wallet Activity
                </h2>
                <Link to="#" className="text-blue-600 hover:text-blue-700 font-bold text-sm transition-colors">
                  View All
                </Link>
              </div>

              {/* Transactions List */}
              <div className="space-y-4">
                {transactions.map((txn, idx) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors border border-slate-200 hover:border-blue-200"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                        txn.type === 'add' || txn.type === 'refund'
                          ? 'bg-emerald-100'
                          : 'bg-red-100'
                      }`}>
                        {txn.type === 'add' || txn.type === 'refund' ? (
                          <ArrowDownLeft className={`w-6 h-6 ${txn.type === 'add' || txn.type === 'refund' ? 'text-emerald-600' : 'text-red-600'}`} />
                        ) : (
                          <ArrowUpRight className="w-6 h-6 text-red-600" />
                        )}
                      </div>

                      {/* Description */}
                      <div className="grow min-w-0">
                        <p className="font-bold text-slate-900 text-sm md:text-base truncate">
                          {txn.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            {txn.reference}
                          </span>
                          <span className="text-xs text-slate-600">
                            {txn.date}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Amount */}
                    <p className={`font-black text-sm md:text-base flex-shrink-0 whitespace-nowrap ${
                      txn.amount > 0
                        ? 'text-emerald-600'
                        : 'text-red-600'
                    }`}>
                      {txn.amount > 0 ? '+' : ''} ₹{Math.abs(txn.amount).toLocaleString('en-IN')}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-6xl mx-auto mt-12"
      >
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase tracking-tight">
          Why Choose IRCTC e-Wallet?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-4">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Secure</h3>
            <p className="text-slate-600 text-sm">
              Your money is protected with advanced encryption and security protocols.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Convenient</h3>
            <p className="text-slate-600 text-sm">
              Quick and easy transactions for all your railway bookings and services.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 hover:shadow-xl transition-all">
            <div className="w-12 h-12 bg-linear-to-br from-emerald-100 to-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-4">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="font-black text-slate-900 mb-2 uppercase tracking-tight">Rewarding</h3>
            <p className="text-slate-600 text-sm">
              Earn cashback and special rewards on every transaction you make.
            </p>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto mt-12"
      >
        <div className="bg-linear-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-6">
              Add funds to your e-Wallet now and enjoy seamless bookings with enhanced security and convenience.
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

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 px-4 pt-28"
          onClick={() => setShowAddMoneyModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tight">
              Add Money to Wallet
            </h3>

            <form onSubmit={handleAddMoney} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-bold">₹</span>
                  <input
                    type="number"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 font-medium text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                    min="100"
                    max="10000"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">Minimum: ₹100 | Daily Limit: ₹10,000</p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddMoneyModal(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 font-bold uppercase tracking-widest py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95"
                >
                  Add Money
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}
