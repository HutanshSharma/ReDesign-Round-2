import { 
  Facebook, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Send, 
  Twitter, 
  ChevronDown,
  ExternalLink,
  MessageSquare,
  HelpCircle,
  Smartphone,
  ShieldCheck,
  Info
} from 'lucide-react';
import { motion } from 'motion/react';

const footerLinks = [
  {
    title: "IRCTC Trains",
    links: ["General Information", "Important Information", "Agents", "Enquiries"]
  },
  {
    title: "How To",
    links: ["IRCTC Official App", "Advertise with us", "Refund Rules", "Person With Disability Facilities"]
  },
  {
    title: "E-Wallet",
    links: ["IRCTC Co-branded Card Benefits", "IRCTC-iPAY Payment Gateway", "IRCTC Zone", "DMRC Ticket Booking at IRCTC"]
  },
  {
    title: "For Agents",
    links: ["Newly Migrated Agents", "Mobile Zone", "Policies", "Ask Disha ChatBot", "About us"]
  },
  {
    title: "Support",
    links: ["Help & Support", "E-Pantry"]
  }
];

const socialIcons = [
  { icon: Facebook, color: "bg-[#3b5998]" },
  { icon: Youtube, color: "bg-[#ff0000]" },
  { icon: Instagram, color: "bg-[#e1306c]" },
  { icon: Linkedin, color: "bg-[#0077b5]" },
  { icon: Send, color: "bg-[#0088cc]" }, // Telegram
  { icon: Twitter, color: "bg-[#1da1f2]" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white">
      {/* Social Bar - More Compact */}
      <div className="bg-slate-950/50 border-b border-slate-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Connect with us
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {socialIcons.map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ y: -2, scale: 1.05, backgroundColor: "#2563eb" }}
                className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center transition-colors group"
              >
                <social.icon className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
            <motion.div 
              whileHover={{ y: -2, scale: 1.05, backgroundColor: "#facd00" }}
              className="bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center transition-colors group"
            >
              <span className="text-[8px] font-black text-white opacity-70 group-hover:opacity-100 group-hover:text-slate-900 transition-all">KOO</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Links Grid - More Compact */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {footerLinks.map((section, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-[11px] font-black uppercase tracking-widest text-blue-500">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href="#" 
                      className="text-[12px] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-slate-800 rounded-full group-hover:bg-blue-500 transition-colors" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Partner Bar - Integrated & Compact */}
      <div className="bg-slate-950 py-8 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {/* Security & Partner Logos in a light container for visibility */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 px-6 flex flex-wrap justify-center items-center gap-8 md:gap-12 shadow-inner">
              <img 
                src="https://www.irctc.co.in/nget/assets/images/security.png" 
                alt="Security Partners" 
                className="h-6 md:h-8 object-contain"
                referrerPolicy="no-referrer"
              />
              
              <div className="w-px h-6 bg-slate-200" />
              
              <img 
                src="https://www.irctc.co.in/nget/assets/images/secondry-logo.png" 
                alt="IRCTC Secondary Logo" 
                className="h-6 md:h-8 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            
          </div>

          <div className="pt-6 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] font-medium text-slate-500 text-center md:text-left">
              © 2026 IRCTC Modern Redesign. All Rights Reserved.
              <span className="ml-2 text-slate-600">Hosted by CRIS</span>
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Browsers</a>
              <div className="w-1 h-1 bg-slate-800 rounded-full" />
              <a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Privacy</a>
              <div className="w-1 h-1 bg-slate-800 rounded-full" />
              <a href="#" className="text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-500 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
