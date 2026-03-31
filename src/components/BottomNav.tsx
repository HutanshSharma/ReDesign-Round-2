import { Home, Briefcase, FileText, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function BottomNav() {
  const NavItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button className={`relative flex flex-col items-center gap-1 flex-1 py-3 transition-all ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
      {active && (
        <motion.div 
          layoutId="active-pill"
          className="absolute inset-x-2 inset-y-1 bg-blue-50 rounded-2xl -z-10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <Icon className={`w-6 h-6 transition-transform ${active ? 'scale-110' : ''}`} />
      <span className="text-[9px] font-black uppercase tracking-[0.15em]">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[110] md:hidden">
      <nav className="bg-white/80 backdrop-blur-2xl border border-white/50 rounded-[2rem] px-4 py-1 flex items-center justify-around shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)]">
        <NavItem icon={Home} label="Home" active />
        <NavItem icon={Briefcase} label="Bookings" />
        <NavItem icon={FileText} label="PNR" />
        <NavItem icon={User} label="Account" />
      </nav>
    </div>
  );
}
