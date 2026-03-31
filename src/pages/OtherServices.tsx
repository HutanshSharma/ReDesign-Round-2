import { motion } from 'motion/react';
import { Plane, Hotel, Bus, Train, Mountain, Dumbbell, ShoppingCart, Shield, Heart, Briefcase, Camera, Star, Edit2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  href?: string;
}

interface ServiceSection {
  title: string;
  description?: string;
  services: ServiceCard[];
}

export default function OtherServices() {
  const sections: ServiceSection[] = [
    {
      title: "Travel Services",
      description: "Explore a wide range of travel and tourism options",
      services: [
        {
          icon: <Plane className="w-6 h-6" />,
          title: "Flights",
          description: "Book domestic & international flights",
          color: "from-blue-100 to-blue-50"
        },
        {
          icon: <Hotel className="w-6 h-6" />,
          title: "Hotels",
          description: "Affordable & luxury hotel stays",
          color: "from-indigo-100 to-indigo-50"
        },
        {
          icon: <Bus className="w-6 h-6" />,
          title: "Bus",
          description: "Intercity bus ticket bookings",
          color: "from-pink-100 to-pink-50"
        },
        {
          icon: <Train className="w-6 h-6" />,
          title: "Charter Train",
          description: "Book full trains or coaches",
          color: "from-purple-100 to-purple-50"
        },
        {
          icon: <Mountain className="w-6 h-6" />,
          title: "Hill Railways",
          description: "Heritage toy train experiences",
          color: "from-emerald-100 to-emerald-50"
        }
      ]
    },
    {
      title: "Rail Services & Facilities",
      services: [
        {
          icon: <Edit2 className="w-6 h-6" />,
          title: "Rail Drishti",
          description: "Indian Railways performance dashboard",
          color: "from-slate-100 to-slate-50"
        },
        {
          icon: <Hotel className="w-6 h-6" />,
          title: "Retiring Rooms",
          description: "Book rooms at railway stations",
          color: "from-yellow-100 to-yellow-50"
        },
        {
          icon: <Briefcase className="w-6 h-6" />,
          title: "Cloak Room",
          description: "Safe luggage storage facilities",
          color: "from-cyan-100 to-cyan-50"
        }
      ]
    },
    {
      title: "Concessions & Special",
      services: [
        {
          icon: <Heart className="w-6 h-6" />,
          title: "Person with Disability",
          description: "Special concession booking",
          color: "from-teal-100 to-teal-50"
        },
        {
          icon: <Briefcase className="w-6 h-6" />,
          title: "Defence Quota",
          description: "For armed forces personnel",
          color: "from-slate-200 to-slate-100"
        }
      ]
    },
    {
      title: "Tourism",
      services: [
        {
          icon: <Camera className="w-6 h-6" />,
          title: "Holiday Packages",
          description: "Curated tours across India",
          color: "from-orange-100 to-orange-50"
        },
        {
          icon: <Train className="w-6 h-6" />,
          title: "Tourist Train",
          description: "Special tourism train routes",
          color: "from-pink-100 to-pink-50"
        },
        {
          icon: <Star className="w-6 h-6" />,
          title: "Bharat Gaurav Train",
          description: "Theme based tourist circuits",
          color: "from-yellow-100 to-yellow-50"
        },
        {
          icon: <Mountain className="w-6 h-6" />,
          title: "Buddhist Circuit",
          description: "Retrace the steps of Lord Buddha",
          color: "from-amber-100 to-amber-50"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 pt-28 pb-16 md:pb-12 px-4">

      {/* Service Sections */}
      <div className="max-w-6xl mx-auto space-y-12 mt-10">
        {sections.map((section, sectionIdx) => (
          <motion.div
            key={sectionIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIdx * 0.1 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">
                {section.title}
              </h2>
              {section.description && (
                <p className="text-slate-600">{section.description}</p>
              )}
            </div>

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {section.services.map((service, cardIdx) => (
                <motion.div
                  key={cardIdx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: sectionIdx * 0.1 + cardIdx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group cursor-pointer"
                >
                  <Link to="#" className="block h-full">
                    <div
                      className={`h-full bg-gradient-to-br ${service.color} border border-slate-200/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:border-slate-300 flex flex-col`}
                    >
                      {/* Icon */}
                      <div className="mb-3 text-slate-700 group-hover:text-blue-600 transition-colors">
                        {service.icon}
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-slate-900 text-sm md:text-base mb-1">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 text-xs md:text-sm flex-grow">
                        {service.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="max-w-6xl mx-auto mt-16"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Get Started Today</h2>
            <p className="text-blue-100 mb-6">
              Explore all our services and book your perfect travel experience with IRCTC.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-orange-500/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
    </div>
  );
}
