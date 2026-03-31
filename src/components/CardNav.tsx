import { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowUpRight, Bell, ChevronRight, LayoutGrid, X, MinusSquare, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface NavLink {
  label: string;
  ariaLabel?: string;
  href?: string;
  subLinks?: NavLink[];
}

interface NavItem {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavLink[];
}

interface CardNavProps {
  logo: React.ReactNode;
  logoAlt?: string;
  items: NavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const CardNav = ({
  logo,
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}: CardNavProps) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [submenuPos, setSubmenuPos] = useState({ top: 0, left: 0 });
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = 'visible';
        contentEl.style.pointerEvents = 'auto';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        // Force reflow
        contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 320; // Default height for desktop expansion
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
      onStart: () => {
        gsap.set(navEl, { overflow: 'hidden' });
      },
      onComplete: () => {
        const isCurrentlyExpanded = tl.reversed() === false;
        if (isCurrentlyExpanded) {
          gsap.set(navEl, { overflow: 'visible' });
        }
      },
      onReverseStart: () => {
        gsap.set(navEl, { overflow: 'hidden' });
      }
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;
    setIsHamburgerOpen(false);
    tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
    tl.reverse();
  };

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <>
      <div
        className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[95%] max-w-[900px] z-[100] top-[2.5em] md:top-[3.2em] transition-all duration-500 ${
          isNavbarHidden ? '-translate-y-[150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        } ${className}`}
      >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open' : ''} block h-[60px] p-0 rounded-2xl shadow-xl relative will-change-[height]`}
        style={{ backgroundColor: baseColor, overflow: isExpanded ? 'visible' : 'hidden' }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 pl-[1.1rem] z-[2]">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full flex flex-col items-center justify-center cursor-pointer gap-[6px] order-2 md:order-none px-2`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? 'translate-y-[4px] rotate-45' : ''
              } group-hover:opacity-75`}
            />
            <div
              className={`hamburger-line w-[24px] h-[2px] bg-current transition-[transform,opacity,margin] duration-300 ease-linear [transform-origin:50%_50%] ${
                isHamburgerOpen ? '-translate-y-[4px] -rotate-45' : ''
              } group-hover:opacity-75`}
            />
          </div>

          <Link
            to="/"
            onClick={closeMenu}
            className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none hover:opacity-80 transition-opacity"
          >
            {logo}
          </Link>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsNavbarHidden(true)}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95 group"
              title="Minimize Navbar"
            >
              <MinusSquare className="w-5 h-5" />
            </button>

            <button 
              onClick={() => setIsQuickMenuOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95 relative group"
              title="Quick Menu"
            >
              <LayoutGrid className="w-6 h-6" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Quick Menu
              </span>
            </button>

            <button className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-all active:scale-95 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white" />
            </button>

            <button
              type="button"
              onClick={() => {
                const searchCard = document.getElementById('search-card');
                if (searchCard) {
                  searchCard.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="card-nav-cta-button hidden md:inline-flex border-0 rounded-xl px-6 items-center h-[44px] font-bold cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-100"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              Book Now
            </button>
          </div>
        </div>

        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-3 flex flex-col items-stretch gap-3 justify-start z-[1] ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          } md:flex-row md:items-stretch md:gap-[12px]`}
          style={{ overflow: 'visible' }}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-3 p-[20px_24px] rounded-xl min-w-0 flex-[1_1_auto] h-auto min-h-[80px] md:h-full md:min-h-0 md:flex-[1_1_0%] shadow-sm"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor, overflow: 'visible' }}
            >
              <div className="nav-card-label font-black tracking-tighter text-[22px] md:text-[26px] uppercase">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-[6px]">
                {item.links?.map((lnk, i) => (
                  <div 
                    key={`${lnk.label}-${i}`} 
                    className="relative group/link"
                    onMouseEnter={(e) => {
                      if (lnk.subLinks) {
                        const rect = (e.currentTarget.querySelector('.nav-card-link') as HTMLElement)?.getBoundingClientRect();
                        if (rect) {
                          setActiveSubmenu(`${lnk.label}-${i}`);
                          setSubmenuPos({
                            top: rect.bottom + 8,
                            left: rect.left
                          });
                        }
                      }
                    }}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    {lnk.subLinks ? (
                      <div className="nav-card-link inline-flex items-center gap-[8px] no-underline cursor-pointer transition-all duration-300 hover:translate-x-1 hover:opacity-80 text-[16px] md:text-[18px] font-medium">
                        <ArrowUpRight className="nav-card-link-icon shrink-0 w-4 h-4" aria-hidden="true" />
                        {lnk.label}
                        <ChevronRight className="w-4 h-4 opacity-50 group-hover/link:rotate-90 transition-transform" />
                      </div>
                    ) : (
                      <Link
                        className="nav-card-link inline-flex items-center gap-[8px] no-underline cursor-pointer transition-all duration-300 hover:translate-x-1 hover:opacity-80 text-[16px] md:text-[18px] font-medium"
                        to={lnk.href || '#'}
                        onClick={closeMenu}
                        aria-label={lnk.ariaLabel}
                      >
                        <ArrowUpRight className="nav-card-link-icon shrink-0 w-4 h-4" aria-hidden="true" />
                        {lnk.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>

    {/* Fixed Position Submenu */}
    <AnimatePresence>
      {activeSubmenu && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed w-[320px] md:w-[480px] bg-white rounded-2xl shadow-2xl border border-slate-100 z-[9999] p-3 grid grid-cols-2 gap-1 pointer-events-auto"
          style={{
            top: `${submenuPos.top}px`,
            left: `${submenuPos.left}px`
          }}
          onMouseEnter={() => setActiveSubmenu(activeSubmenu)}
          onMouseLeave={() => setActiveSubmenu(null)}
        >
          {items.flatMap(item => 
            item.links
              .filter(lnk => lnk.subLinks)
              .find(lnk => activeSubmenu.includes(lnk.label))?.subLinks || []
          ).map((sub, j) => (
            <Link
              key={`${sub.label}-${j}`}
              to={sub.href || '#'}
              onClick={() => {
                closeMenu();
                setActiveSubmenu(null);
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 font-bold text-[13px] transition-colors"
            >
              <span className="truncate">{sub.label}</span>
              <ArrowUpRight className="w-3 h-3 opacity-0 hover:opacity-100 transition-opacity shrink-0" />
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>

    {/* Floating Toggle Button (Visible when navbar is hidden) */}
    <AnimatePresence>
      {isNavbarHidden && (
        <motion.div
          initial={{ y: -100, x: '-50%', opacity: 0 }}
          animate={{ y: 0, x: '-50%', opacity: 1 }}
          exit={{ y: -100, x: '-50%', opacity: 0 }}
          className="fixed top-4 left-1/2 z-[150] flex items-center gap-2"
        >
          <button
            onClick={() => setIsNavbarHidden(false)}
            className="bg-white text-blue-600 p-3 rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-2 font-black uppercase italic text-xs tracking-tighter hover:scale-105 active:scale-95 transition-all"
          >
            <Maximize2 size={18} />
            Restore Nav
          </button>
          <button
            onClick={() => setIsQuickMenuOpen(true)}
            className="bg-blue-600 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2 font-black uppercase italic text-xs tracking-tighter hover:scale-105 active:scale-95 transition-all"
          >
            <LayoutGrid size={18} />
            Quick Menu
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    
    {/* Quick Menu Overlay */}
    <AnimatePresence>
      {isQuickMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
          onClick={() => setIsQuickMenuOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                  <LayoutGrid size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">Train Services</h3>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Quick Access Menu</p>
                </div>
              </div>
              <button 
                onClick={() => setIsQuickMenuOpen(false)}
                className="w-10 h-10 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-3">
              {items.find(it => it.label === "Travel")?.links.find(l => l.label === "Trains")?.subLinks?.map((sub, i) => (
                <Link
                  key={sub.label}
                  to={sub.href || '#'}
                  onClick={() => setIsQuickMenuOpen(false)}
                  className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest opacity-50">0{i + 1}</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <span className="text-sm font-bold text-slate-700 leading-tight">{sub.label}</span>
                </Link>
              ))}
            </div>
            
            <div className="p-4 bg-slate-50 text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Indian Railways Digital Portal</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default CardNav;
