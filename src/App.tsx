import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TrainScene from './components/TrainScene';
import Marquee from './components/Marquee';
import SearchCard from './components/SearchCard';
import BottomNav from './components/BottomNav';
import CardNav from './components/CardNav';
import TopBar from './components/TopBar';
import QuickServices from './components/QuickServices';
import Holidays from './components/Holidays';
import CardSwap, { Card } from './components/CardSwap';
import Footer from './components/Footer';
import TrainServicePage from './pages/TrainServicePage';
import LoginRegister from './pages/LoginRegister';
import OtherServices from './pages/OtherServices';
import Alerts from './pages/Alerts';
import ContactUs from './pages/ContactUs';
import EWallet from './pages/EWallet';
import EPantry from './pages/EPantry';
import TrainSearchResults from './pages/TrainSearchResults';
import PNREnquiry from './pages/PNREnquiry';
import TrackYourTrain from './pages/TrackYourTrain';
import CancelETicket from './pages/CancelETicket';
import TrainSchedule from './pages/TrainSchedule';
import { TrainFront, Zap, Shield, Utensils } from 'lucide-react';

export default function App() {
  const navItems = [
    {
      label: "Travel",
      bgColor: "#0052D4",
      textColor: "#fff",
      links: [
        { 
          label: "Trains", 
          ariaLabel: "Book Trains",
          subLinks: [
            { label: "Book Ticket", href: "/train-search-results" },
            { label: "Foreign Tourist Booking", href: "/train-service/foreign-tourist-booking" },
            { label: "Connecting Journey Booking", href: "/train-service/connecting-journey-booking" },
            { label: "Cancel E-Ticket", href: "/cancel-ticket" },
            { label: "PNR Enquiry", href: "/pnr-enquiry" },
            { label: "Train Schedule", href: "/train-schedule" },
            { label: "Track Your Train", href: "/track-train" },
            { label: "FTR Coach/Train Booking", href: "/train-service/ftr-coach-train-booking" },
            { label: "Dogs/Cats Booking", href: "/train-service/dogs-cats-booking" },
            { label: "Link Your Aadhaar", href: "/train-service/link-your-aadhaar" },
            { label: "Counter Ticket Cancellation", href: "/train-service/counter-ticket-cancellation" },
            { label: "IRCTC Official Mobile Apps", href: "/train-service/irctc-official-mobile-apps" }
          ]
        },
        { 
          label: "Meals", 
          ariaLabel: "Order Meals",
          subLinks: [
            { label: "Book Food - E-Pantry", href: "/meals/e-pantry" }
          ]
        },
        { 
          label: "E-Wallet", 
          ariaLabel: "IRCTC E-Wallet",
          href: "/e-wallet"
        }
      ]
    },
    {
      label: "Services", 
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        { label: "Alerts", ariaLabel: "Travel Alerts", href: "/alerts" },
        { label: "Other services", ariaLabel: "Other Services", href: "/other-services" },
        { label: "Contact us", ariaLabel: "Contact Support", href: "/contact-us" }
      ]
    },
    {
      label: "Account",
      bgColor: "#F27D26", 
      textColor: "#fff",
      links: [
        { label: "Login", ariaLabel: "User Login", href: "/auth" },
        { label: "Register", ariaLabel: "Create Account", href: "/auth" }
      ]
    }
  ];

  const Logo = () => (
    <div className="flex items-center gap-2">
      <img 
        src="https://www.irctc.co.in/nget/assets/images/logo.png" 
        alt="IRCTC Logo" 
        className="h-10 w-auto"
        referrerPolicy="no-referrer"
      />
      <span className="text-2xl font-black tracking-tighter text-blue-900 uppercase tracking-tight">Indian Railways</span>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 pb-24 md:pb-0 font-sans text-slate-900">
        {/* Top Utility Bar */}
        <TopBar />

        {/* Modern Card Navigation */}
        <CardNav
          logo={<Logo />}
          items={navItems}
          baseColor="#ffffff"
          menuColor="#0052D4"
          buttonBgColor="#0052D4"
          buttonTextColor="#ffffff"
        />

        <Routes>
          <Route path="/" element={
            <main className="pt-32 md:pt-40">
              {/* 3D Hero Section */}
              <TrainScene />

              {/* Search Card */}
              <SearchCard />

              {/* GSAP Marquee */}
              <div className="mt-12">
                <Marquee />
              </div>

              {/* Quick Services Section */}
              <QuickServices />

              {/* Features Section */}
              <section className="py-24 bg-white text-slate-900 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative z-10">
                    <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase italic">
                      The Future of <span className="text-blue-500">Travel</span>
                    </h2>
                    <p className="text-slate-600 text-lg mb-8 max-w-md">
                      Experience seamless journeys with our state-of-the-art digital infrastructure designed for the modern traveler.
                    </p>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center shrink-0">
                          <Zap className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Instant Booking</h3>
                          <p className="text-slate-600">Our optimized engine ensures your tickets are booked in milliseconds.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center shrink-0">
                          <Shield className="text-orange-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-1">Secure Payments</h3>
                          <p className="text-slate-600">Multi-layer encryption for every transaction you make.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative h-[600px] flex items-center justify-center lg:justify-end">
                    <div className="relative w-full max-w-[450px] h-[500px]">
                      <CardSwap
                        width={360}
                        height={480}
                        cardDistance={40}
                        verticalDistance={50}
                        delay={2500}
                        pauseOnHover={false}
                      >
                        <Card className="p-8 flex flex-col justify-between border-blue-500/20">
                          <div>
                            <Zap size={48} className="text-blue-500 mb-6" />
                            <h3 className="text-3xl font-black uppercase italic mb-4">Speed</h3>
                            <p className="text-slate-600 leading-relaxed">
                              Redefining efficiency with 10x faster server response times for peak hour bookings.
                            </p>
                          </div>
                          <div className="text-xs font-mono text-blue-500 tracking-widest uppercase">Feature 01</div>
                        </Card>
                        <Card className="p-8 flex flex-col justify-between border-orange-500/20">
                          <div>
                            <Shield size={48} className="text-orange-500 mb-6" />
                            <h3 className="text-3xl font-black uppercase italic mb-4">Safety</h3>
                            <p className="text-slate-600 leading-relaxed">
                              End-to-end encrypted data protection and secure payment gateways for peace of mind.
                            </p>
                          </div>
                          <div className="text-xs font-mono text-orange-500 tracking-widest uppercase">Feature 02</div>
                        </Card>
                        <Card className="p-8 flex flex-col justify-between border-green-500/20">
                          <div>
                            <Utensils size={48} className="text-green-500 mb-6" />
                            <h3 className="text-3xl font-black uppercase italic mb-4">Comfort</h3>
                            <p className="text-slate-600 leading-relaxed">
                              Pre-book premium meals and enjoy personalized services throughout your journey.
                            </p>
                          </div>
                          <div className="text-xs font-mono text-green-500 tracking-widest uppercase">Feature 03</div>
                        </Card>
                      </CardSwap>
                    </div>
                  </div>
                </div>
                
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
              </section>

              {/* Holidays Section */}
              <Holidays />

              {/* Promotional Banner */}
              <section className="max-w-4xl mx-auto px-6 pb-12">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                  <div className="relative z-10 max-w-md">
                    <h2 className="text-3xl font-bold mb-2">Travel with Trust</h2>
                    <p className="text-blue-100 mb-6">Experience the new age of Indian Railways with enhanced safety and comfort.</p>
                    <button className="bg-white text-blue-800 px-6 py-3 rounded-2xl font-bold hover:bg-blue-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                  <div className="absolute right-[-10%] top-[-20%] opacity-10">
                    <TrainFront size={300} />
                  </div>
                </div>
              </section>
            </main>
          } />
          <Route path="/train-service/:serviceId" element={<TrainServicePage />} />
          <Route path="/train-search-results" element={<TrainSearchResults />} />
          <Route path="/pnr-enquiry" element={<PNREnquiry />} />
          <Route path="/track-train" element={<TrackYourTrain />} />
          <Route path="/cancel-ticket" element={<CancelETicket />} />
          <Route path="/train-schedule" element={<TrainSchedule />} />
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/other-services" element={<OtherServices />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/e-wallet" element={<EWallet />} />
          <Route path="/meals/e-pantry" element={<EPantry />} />
        </Routes>

        {/* Mobile Bottom Nav */}
        <BottomNav />

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}


