import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Ticket, Zap, TrainFront, TrendingUp } from 'lucide-react';

export default function Marquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const content = marquee.querySelector('.marquee-inner');
    if (!content) return;

    // The duration should be based on the width to keep speed consistent
    const duration = 60; 

    tweenRef.current = gsap.to(content, {
      xPercent: -50,
      repeat: -1,
      duration: duration,
      ease: 'none',
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const MarqueeItem = () => (
    <div className="flex items-center gap-12 px-6 py-10 whitespace-nowrap will-change-transform">
      <div className="flex items-center gap-4">
        <span className="text-5xl md:text-8xl font-black text-slate-300 tracking-tighter uppercase italic">Book Now</span>
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-orange-50 flex items-center justify-center border border-orange-100">
          <Ticket className="w-6 h-6 md:w-10 md:h-10 text-orange-500" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-5xl md:text-8xl font-black text-slate-300 tracking-tighter uppercase italic">Book Now</span>
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
          <Zap className="w-6 h-6 md:w-10 md:h-10 text-blue-600" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-5xl md:text-8xl font-black text-slate-300 tracking-tighter uppercase italic">Book Now</span>
        <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
          <TrainFront className="w-6 h-6 md:w-10 md:h-10 text-blue-900" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full bg-white border-y border-slate-100 overflow-hidden group">
      {/* Gradient Masks */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

      <div 
        ref={marqueeRef} 
        className="flex cursor-default overflow-hidden"
        aria-hidden="true"
      >
        <div className="marquee-inner flex items-center will-change-transform">
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
          <MarqueeItem />
        </div>
      </div>
    </div>
  );
}
