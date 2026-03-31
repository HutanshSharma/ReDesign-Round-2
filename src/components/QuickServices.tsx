import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  Plane, 
  Hotel, 
  LineChart, 
  Utensils, 
  Bus, 
  Umbrella, 
  TrainFront, 
  Mountain, 
  Train, 
  Image as ImageIcon 
} from 'lucide-react';

const services = [
  { title: 'Flights', icon: Plane, link: "https://www.air.irctc.co.in/" },
  { title: 'Hotels', icon: Hotel, link: "https://www.hotels.irctc.co.in/" },
  { title: 'Rail Drishti', icon: LineChart, link: "https://raildrishti.indianrailways.gov.in/raildrishti/raildrishtiv3/" },
  { title: 'E-Catering', icon: Utensils, link: "https://www.ecatering.irctc.co.in/" },
  { title: 'Bus', icon: Bus, link: "https://www.bus.irctc.co.in/home" },
  { title: 'Holiday Packages', icon: Umbrella, link: "https://www.irctctourism.com/tourpacakage_search?searchKey=&tagType=&travelType=&category=" },
  { title: 'Tourist Train', icon: TrainFront, link: "https://www.irctctourism.com/bharatgaurav" },
  { title: 'Hill Railways', icon: Mountain, link: "https://www.irctctourism.com/gallery/" },
  { title: 'Charter Train', icon: Train, link: "https://www.ftr.irctc.co.in/ftr/" },
  { title: 'Gallery', icon: ImageIcon, link: "https://www.irctctourism.com/gallery/" },
];

export default function QuickServices() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const radius = isMobile ? 120 : 220;

  return (
    <section className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center overflow-hidden py-10">
      {/* Decorative Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-[240px] h-[240px] md:w-[440px] md:h-[440px] border border-slate-100 rounded-full absolute"
        />
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="w-[180px] h-[180px] md:w-[320px] md:h-[320px] border border-slate-50 rounded-full absolute"
        />
      </div>

      {/* Center Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="z-10 text-center max-w-[140px] md:max-w-[200px] px-4"
      >
        <h2 className="text-base md:text-2xl font-black text-slate-900 leading-tight mb-1">
          Find your service
        </h2>
        <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          Suitable for you
        </p>
      </motion.div>

      {/* Radial Items */}
      <div className="absolute inset-0 flex items-center justify-center">
        {services.map((service, i) => {
          // Calculate position on the circle
          const angle = (i / services.length) * (Math.PI * 2) - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.a
              key={i}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 0, y: 0 }}
              whileInView={{ 
                opacity: 1, 
                x, 
                y,
                transition: { 
                  delay: i * 0.05, 
                  type: 'spring', 
                  stiffness: 60, 
                  damping: 12 
                }
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
              className="absolute flex flex-col items-center group cursor-pointer"
            >
              <div className="relative">
                <motion.div 
                  whileHover={{ rotate: 10 }}
                  className="w-12 h-12 md:w-20 md:h-20 rounded-full border-2 border-white flex items-center justify-center transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-50 group-hover:shadow-[0_15px_30px_-8px_rgba(0,82,212,0.15)] bg-white shadow-[0_6px_12px_-3px_rgba(0,0,0,0.05)]"
                >
                  <service.icon className="w-5 h-5 md:w-8 md:h-8 text-slate-600 group-hover:text-blue-600 transition-colors" />
                </motion.div>
                
                {/* Tooltip-style Label */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  <span className="bg-slate-900 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                    {service.title}
                  </span>
                </div>

                {/* Static Label (Visible on Desktop) */}
                <div className="hidden md:block absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-100 group-hover:opacity-0 transition-opacity whitespace-nowrap">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {service.title}
                  </span>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
