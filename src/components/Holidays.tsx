import { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const holidayPackages = [
  {
    title: "Maharajas' Express",
    description: "Redefining Royalty, Luxury and Comfort, Maharajas' express takes you on a sojourn to the era of bygone stately splendour of princely states. Sylvan furnishings, elegant ambience and modern amenities are amalgamated for an \"Experience Unsurpassed\".",
    image: "https://www.irctc.co.in/nget/assets/images/exterior.jpg",
    link: "https://www.the-maharajas.com/"
  },
  {
    title: "International Packages",
    description: "Best deals in International Holiday packages, handpicked by IRCTC, for Thailand, Dubai, Sri Lanka, Hong Kong, China, Macau, Bhutan, Nepal, U.K., Europe, USA, Australia etc. The packages are inclusive of sightseeing, meals, visa charges and overseas medical insurance.",
    image: "https://www.irctc.co.in/nget/assets/images/Thailand.jpg",
    link: "https://www.irctctourism.com/"
  },
  {
    title: "Domestic Air Packages",
    description: "Be it the spiritual devotee seeking blessings of Tirupati, Shirdi or Mata Vaishno Devi or the leisure traveller wanting to relish the Blue mountains of North East, Sand-dunes of Rajasthan, Hamlets of Ladakh, Wonders of Himalayas, Serene lakes or Picturesque Islands, IRCTC has it all.",
    image: "https://www.irctc.co.in/nget/assets/images/Kashmir.jpg",
    link: "https://www.irctctourism.com/"
  },
  {
    title: "Bharat Gaurav Tourist Train",
    description: "IRCTC operates Bharat Gaurav Tourist Train having AC III-Tier accommodation on train specially designed to promote domestic tourism in India. This train runs on various theme based circuits covering pilgrimage and heritage destinations.",
    image: "https://www.irctc.co.in/nget/assets/images/Bharat_Gaurav.jpg",
    link: "https://www.irctctourism.com/bharatgaurav"
  },
  {
    title: "Rail Tour Packages",
    description: "IRCTC offers Exclusive Rail tour packages with confirmed train tickets, sight-seeing and meals for enchanting Nilgiri Mountains, Darjeeling, Kullu Manali, Kashmir, Gangtok or divine tours of Mata Vaishno Devi, Rameswaram, Madurai, Shirdi, Tirupati etc.",
    image: "https://www.irctc.co.in/nget/assets/images/Manali.jpg",
    link: "https://www.irctctourism.com/"
  }
];

export default function Holidays() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".holiday-card-wrapper", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-6 py-24 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
          Holidays
        </h2>
        <div className="w-24 h-1.5 bg-orange-500 mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-10">
        {holidayPackages.map((pkg, i) => (
          <div 
            key={i} 
            className={`holiday-card-wrapper ${
              i < 2 
                ? "md:col-span-3" // First two items take half width each
                : "md:col-span-2" // Next three items take one-third width each
            }`}
          >
            <HolidayCard 
              pkg={pkg} 
              onHover={(title) => setHoveredTitle(title)}
              onLeave={() => setHoveredTitle(null)}
              isLarge={i < 2}
            />
          </div>
        ))}
      </div>

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 bg-blue-600/90 backdrop-blur-md rounded-full pointer-events-none z-[100] flex items-center justify-center px-6 py-3 text-center shadow-2xl border border-white/20"
        animate={{
          scale: hoveredTitle ? 1 : 0.5,
          opacity: hoveredTitle ? 1 : 0,
        }}
        transition={{
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1] // Custom ease for "eventual" growth
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <span className="text-white text-[12px] font-black uppercase tracking-widest leading-tight whitespace-nowrap">
          {hoveredTitle}
        </span>
      </motion.div>
    </section>
  );
}

function HolidayCard({ pkg, onHover, onLeave, isLarge }: { pkg: any, onHover: (t: string) => void, onLeave: () => void, isLarge?: boolean }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(x, { stiffness: 100, damping: 30 });

  function handleMouseMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Increased intensity from 20 to 35
    const xPct = (mouseX / width - 0.5) * 35;
    const yPct = (mouseY / height - 0.5) * -35;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    onLeave();
  }

  return (
    <motion.a
      ref={cardRef}
      href={pkg.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover(pkg.title)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 group cursor-none h-full flex flex-col block`}
    >
      <div className={`relative ${isLarge ? 'h-80' : 'h-64'} overflow-hidden`}>
        <motion.img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{
            transformStyle: "preserve-3d",
            translateZ: "60px" // Increased depth
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 space-y-4 flex-grow flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
        <div style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors mb-3">
            {pkg.title}
          </h3>
          <p className={`text-sm text-slate-500 leading-relaxed font-medium ${isLarge ? 'line-clamp-6' : 'line-clamp-4'}`}>
            {pkg.description}
          </p>
        </div>
        <button 
          className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 group-hover:text-orange-500 transition-colors pt-6"
          style={{ transform: "translateZ(30px)" }}
        >
          Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.a>
  );
}
