import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, TrainFront, Globe, Link2, XCircle, Search, Clock, MapPin, Package, Dog, Fingerprint, Trash2, Smartphone } from 'lucide-react';

const serviceDetails: Record<string, { title: string; icon: any; description: string; details: string[] }> = {
  'book-ticket': {
    title: 'Book Ticket',
    icon: TrainFront,
    description: 'Book your train tickets seamlessly across the Indian Railways network.',
    details: [
      'Search for trains between any two stations.',
      'Check seat availability and fares.',
      'Book tickets for various classes (1A, 2A, 3A, SL, etc.).',
      'Manage your bookings and view transaction history.'
    ]
  },
  'foreign-tourist-booking': {
    title: 'Foreign Tourist Booking',
    icon: Globe,
    description: 'Special booking facility for foreign tourists and NRIs.',
    details: [
      'Dedicated quota for foreign tourists.',
      'Booking available up to 365 days in advance.',
      'Payment through international credit/debit cards.',
      'Valid passport and visa required for travel.'
    ]
  },
  'connecting-journey-booking': {
    title: 'Connecting Journey Booking',
    icon: Link2,
    description: 'Book connecting trains with ease and ensure a smooth transfer.',
    details: [
      'Link two separate PNRs for a connecting journey.',
      'Protection against delays in the first train.',
      'Refund benefits if the first train is delayed.',
      'Easy management of multi-leg journeys.'
    ]
  },
  'cancel-e-ticket': {
    title: 'Cancel E-Ticket',
    icon: XCircle,
    description: 'Cancel your online tickets and get refunds as per IRCTC rules.',
    details: [
      'Instant cancellation of e-tickets.',
      'Refund status tracking.',
      'Partial cancellation for multiple passengers.',
      'Applicable cancellation charges as per railway rules.'
    ]
  },
  'pnr-enquiry': {
    title: 'PNR Enquiry',
    icon: Search,
    description: 'Check the current status of your train ticket booking.',
    details: [
      'Real-time PNR status updates.',
      'Check coach and seat numbers.',
      'View chart preparation status.',
      'Get SMS alerts for status changes.'
    ]
  },
  'train-schedule': {
    title: 'Train Schedule',
    icon: Clock,
    description: 'View the complete timetable and route of any train.',
    details: [
      'Detailed station-wise arrival and departure times.',
      'Distance and duration between stations.',
      'Days of operation for each train.',
      'Platform information where available.'
    ]
  },
  'track-your-train': {
    title: 'Track Your Train',
    icon: MapPin,
    description: 'Live tracking of your train status and current location.',
    details: [
      'Real-time GPS tracking of trains.',
      'Current station and expected arrival at next station.',
      'Delay status and reason for delay.',
      'Share live location with family and friends.'
    ]
  },
  'ftr-coach-train-booking': {
    title: 'FTR Coach/Train Booking',
    icon: Package,
    description: 'Full Train Registration for special occasions or group travel.',
    details: [
      'Book an entire coach or a full train.',
      'Ideal for weddings, religious tours, or corporate events.',
      'Customizable routes and schedules.',
      'Dedicated support for special bookings.'
    ]
  },
  'dogs-cats-booking': {
    title: 'Dogs/Cats Booking',
    icon: Dog,
    description: 'Travel with your furry friends in designated coaches.',
    details: [
      'Booking facility for pets in AC First Class and First Class.',
      'Guidelines for safe travel with pets.',
      'Required vaccinations and certificates.',
      'Special amenities for pets on select trains.'
    ]
  },
  'link-your-aadhaar': {
    title: 'Link Your Aadhaar',
    icon: Fingerprint,
    description: 'Link your Aadhaar card to your IRCTC account for enhanced benefits.',
    details: [
      'Increased monthly booking limit (up to 24 tickets).',
      'Faster verification and secure transactions.',
      'Access to special schemes and discounts.',
      'Mandatory for certain types of concessions.'
    ]
  },
  'counter-ticket-cancellation': {
    title: 'Counter Ticket Cancellation',
    icon: Trash2,
    description: 'Cancel tickets purchased from PRS counters online.',
    details: [
      'Online cancellation of counter tickets.',
      'OTP-based verification for security.',
      'Refund collection from any PRS counter.',
      'Time limits for online cancellation.'
    ]
  },
  'irctc-official-mobile-apps': {
    title: 'IRCTC Official Mobile Apps',
    icon: Smartphone,
    description: 'Download the official IRCTC Rail Connect app for on-the-go bookings.',
    details: [
      'Available for Android and iOS.',
      'Fast and secure booking experience.',
      'Integrated e-wallet and payment options.',
      'Manage bookings and check PNR status anywhere.'
    ]
  }
};

const TrainServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-black text-slate-900 mb-4">Service Not Found</h1>
          <Link to="/" className="text-blue-600 font-bold hover:underline">Go back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-slate-50 pt-40 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-blue-600 font-bold mb-8 hover:translate-x-[-4px] transition-transform">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-24 h-24 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-200">
              <Icon size={48} />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic mb-2">
                {service.title}
              </h1>
              <p className="text-xl text-slate-500 font-medium">
                {service.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.details.map((detail, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-white hover:shadow-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 font-bold">
                  {index + 1}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">
                  {detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 pt-12 border-t border-slate-100">
            <button className="w-full md:w-auto bg-blue-600 text-white px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-100">
              Proceed to {service.title}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrainServicePage;
