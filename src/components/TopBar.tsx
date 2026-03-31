import { useState, useEffect } from 'react';
import { Globe, Clock, ChevronDown, Type } from 'lucide-react';

export default function TopBar() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#002b70]/95 backdrop-blur-md text-white/90 text-[10px] md:text-[11px] py-2 px-6 md:px-12 flex justify-between items-center z-[110] font-medium tracking-tight border-b border-white/10 shadow-sm">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]"></div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-green-400/80">Live</span>
          <span className="w-px h-3 bg-white/10 mx-1"></span>
          <Clock className="w-3 h-3 text-orange-400" />
          <span className="font-mono tabular-nums">
            {dateTime.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            <span className="mx-2 opacity-30">|</span>
            {dateTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-4 text-white/60">
          <span className="hover:text-white cursor-help transition-colors">Help & Support</span>
          <span className="w-1 h-1 rounded-full bg-white/20"></span>
          <span className="hover:text-white cursor-pointer transition-colors">Contact Us</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <div className="hidden sm:flex items-center gap-3 px-3 py-1 rounded-full bg-white/5 border border-white/5">
          <Type className="w-3 h-3 text-blue-300" />
          <div className="flex items-center gap-3 font-bold">
            <button className="hover:text-orange-400 transition-colors text-[9px]">A-</button>
            <button className="text-orange-400 transition-colors">A</button>
            <button className="hover:text-orange-400 transition-colors text-[13px]">A+</button>
          </div>
        </div>

        <div className="relative group">
          <div className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-all cursor-pointer border border-white/10 group-hover:border-white/30">
            <Globe className="w-3.5 h-3.5 text-blue-300" />
            <span className="font-bold uppercase tracking-wider">English</span>
            <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform" />
          </div>
          
          {/* Custom Dropdown Simulation (Visual only for now) */}
          <div className="absolute top-full right-0 mt-2 w-32 bg-[#001a4d] border border-white/10 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right scale-95 group-hover:scale-100 overflow-hidden z-[120]">
            {['English', 'हिन्दी', 'मराठी', 'தமிழ்'].map((lang) => (
              <button key={lang} className="w-full text-left px-4 py-2 hover:bg-white/10 transition-colors text-[11px] first:text-orange-400 font-bold">
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
