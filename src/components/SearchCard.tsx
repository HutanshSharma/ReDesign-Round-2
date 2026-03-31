import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { MapPin, ArrowUpDown, Calendar, Users, Search, History } from 'lucide-react';

export default function SearchCard() {
  const [from, setFrom] = useState('New Delhi (NDLS)');
  const [to, setTo] = useState('Mumbai Central (MMCT)');
  const swapBtnRef = useRef<HTMLButtonElement>(null);

  const handleSwap = () => {
    gsap.to(swapBtnRef.current, {
      rotate: '+=180',
      duration: 0.5,
      ease: 'back.out(2)',
    });
    
    // Animate inputs swapping visually
    const fromInput = document.getElementById('from-input-container');
    const toInput = document.getElementById('to-input-container');
    
    if (fromInput && toInput) {
      gsap.fromTo(fromInput, { x: -10, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.3 });
      gsap.fromTo(toInput, { x: 10, opacity: 0.5 }, { x: 0, opacity: 1, duration: 0.3 });
    }

    setFrom(to);
    setTo(from);
  };

  const handleButtonPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 0.98,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4 relative z-10">
      <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] p-4 md:p-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] border border-white/60">
        <div className="space-y-4">
          {/* Destination Selection */}
          <div className="relative flex flex-col gap-2">
            <div id="from-input-container" className="relative group">
              <label className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em] ml-5 mb-1 block">From Station</label>
              <div className="flex items-center bg-slate-50/50 rounded-2xl border-2 border-transparent group-focus-within:border-blue-500/30 group-focus-within:bg-white transition-all p-3.5 shadow-inner">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center mr-3 shrink-0">
                  <MapPin className="text-blue-600 w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full text-lg font-bold outline-none bg-transparent text-slate-800 placeholder:text-slate-300"
                  placeholder="Starting Point"
                />
              </div>
            </div>

            <button 
              ref={swapBtnRef}
              onClick={handleSwap}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white text-blue-600 p-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-110 active:scale-90 transition-all border border-slate-100"
              aria-label="Swap Stations"
            >
              <ArrowUpDown className="w-4 h-4" />
            </button>

            <div id="to-input-container" className="relative group">
              <label className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em] ml-5 mb-1 block">To Destination</label>
              <div className="flex items-center bg-slate-50/50 rounded-2xl border-2 border-transparent group-focus-within:border-orange-500/30 group-focus-within:bg-white transition-all p-3.5 shadow-inner">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center mr-3 shrink-0">
                  <MapPin className="text-orange-500 w-4 h-4" />
                </div>
                <input 
                  type="text" 
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full text-lg font-bold outline-none bg-transparent text-slate-800 placeholder:text-slate-300"
                  placeholder="Where to?"
                />
              </div>
            </div>
          </div>

          {/* Date and Class */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em] ml-5 mb-1 block">Departure Date</label>
              <div className="flex items-center bg-slate-50/50 rounded-2xl border-2 border-transparent group-focus-within:border-blue-500/30 group-focus-within:bg-white transition-all p-3.5 shadow-inner">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center mr-3 shrink-0">
                  <Calendar className="text-blue-600 w-4 h-4" />
                </div>
                <input 
                  type="date" 
                  defaultValue="2026-04-01"
                  className="w-full text-base font-bold outline-none bg-transparent text-slate-800"
                />
              </div>
            </div>
            <div className="group">
              <label className="text-[9px] font-black text-blue-900/40 uppercase tracking-[0.2em] ml-5 mb-1 block">Travel Class</label>
              <div className="flex items-center bg-slate-50/50 rounded-2xl border-2 border-transparent group-focus-within:border-blue-500/30 group-focus-within:bg-white transition-all p-3.5 shadow-inner">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center mr-3 shrink-0">
                  <Users className="text-blue-600 w-4 h-4" />
                </div>
                <select className="w-full text-base font-bold outline-none bg-transparent appearance-none text-slate-800 cursor-pointer">
                  <option>All Classes</option>
                  <option>Sleeper (SL)</option>
                  <option>AC 3 Tier (3A)</option>
                  <option>AC 2 Tier (2A)</option>
                  <option>AC First Class (1A)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="pt-1">
            <button 
              onMouseDown={handleButtonPress}
              className="w-full bg-gradient-to-r from-[#F27D26] to-[#ff9d52] hover:from-[#e06d1b] hover:to-[#f27d26] text-white py-4 rounded-2xl text-lg font-black uppercase tracking-widest shadow-[0_12px_24px_-8px_rgba(242,125,38,0.4)] transition-all flex items-center justify-center gap-3 group"
            >
              <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Search Trains
            </button>
          </div>

          {/* Recent Searches */}
          <div className="flex items-center gap-3 pt-1 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              <History className="w-2.5 h-2.5" />
              Recent:
            </div>
            {['NDLS → MMCT', 'SBC → MAS'].map((route) => (
              <button key={route} className="px-3 py-1.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors shrink-0">
                {route}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
