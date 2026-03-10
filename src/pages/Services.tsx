import { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  ArrowRight,
  Info,
  CheckCircle2,
  Star,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Facial",
  "Massage",
  "Pedicure",
  "Manicure",
  "Body Scrubs",
  "Teeth",
  "Waxing",
  "Lipo Cavitation",
];

const SERVICES = [
  {
    id: 1,
    title: "Signature Hydra Facial",
    category: "Facial",
    desc: "Deep cleansing, exfoliation, extraction, and hydration using super serums filled with antioxidants.",
    price: "NGN 35,000",
    duration: "60 min",
    popular: true,
  },
  {
    id: 2,
    title: "Advanced Micro Needling",
    category: "Facial",
    desc: "Collagen induction therapy for smoother, firmer, and more toned skin.",
    price: "NGN 50,000",
    duration: "90 min",
    popular: false,
  },
  {
    id: 3,
    title: "PRP Skin Rejuvenation",
    category: "Facial",
    desc: "Platelet-rich plasma therapy to accelerate healing and promote youthful skin.",
    price: "NGN 60,000",
    duration: "90 min",
    popular: false,
  },

  {
    id: 4,
    title: "Aromatherapy Massage",
    category: "Massage",
    desc: "Gentle, flowing massage using custom essential oil blends to relieve stress.",
    price: "NGN 40,000",
    duration: "60 min",
    popular: true,
  },
  {
    id: 5,
    title: "Deep Tissue Massage",
    category: "Massage",
    desc: "Intense pressure to relieve chronic muscle tension and knots.",
    price: "NGN 45,000",
    duration: "60 min",
    popular: false,
  },
  {
    id: 6,
    title: "Hot Stone Therapy",
    category: "Massage",
    desc: "Smooth, heated stones placed on key points to melt away tension.",
    price: "NGN 55,000",
    duration: "90 min",
    popular: false,
  },

  {
    id: 7,
    title: "Fruit Extract Pedicure",
    category: "Pedicure",
    desc: "Relaxing foot soak with fresh fruit extracts and gentle exfoliation.",
    price: "NGN 13,000",
    duration: "45 min",
    popular: false,
  },
  {
    id: 8,
    title: "Cleopatra Milk Pedicure",
    category: "Pedicure",
    desc: "Luxurious milk and honey foot treatment for ultimate softness.",
    price: "NGN 25,000",
    duration: "60 min",
    popular: true,
  },

  {
    id: 9,
    title: "Full Body Lipo Cavitation",
    category: "Lipo Cavitation",
    desc: "Non-invasive fat reduction and body contouring using ultrasound technology.",
    price: "NGN 145,000",
    duration: "120 min",
    popular: true,
  },
  {
    id: 10,
    title: "Targeted Lipo (Stomach)",
    category: "Lipo Cavitation",
    desc: "Focused fat reduction for the abdominal area.",
    price: "NGN 60,000",
    duration: "60 min",
    popular: false,
  },

  {
    id: 11,
    title: "Laser Teeth Whitening",
    category: "Teeth",
    desc: "Professional laser teeth whitening session for a brighter smile.",
    price: "NGN 70,000",
    duration: "60 min",
    popular: true,
  },

  {
    id: 12,
    title: "Coffee & Sugar Body Scrub",
    category: "Body Scrubs",
    desc: "Exfoliating and firming full body scrub to remove dead skin cells.",
    price: "NGN 20,000",
    duration: "45 min",
    popular: false,
  },

  {
    id: 13,
    title: "Brazilian Wax",
    category: "Waxing",
    desc: "Complete hair removal using premium hard wax for sensitive skin.",
    price: "NGN 15,000",
    duration: "30 min",
    popular: false,
  },
  {
    id: 14,
    title: "Full Leg Wax",
    category: "Waxing",
    desc: "Smooth, hair-free legs lasting up to 4 weeks.",
    price: "NGN 12,000",
    duration: "45 min",
    popular: false,
  },
];

const MEMBERSHIPS = [
  {
    name: "Silver Glow",
    price: "NGN 100,000/mo",
    benefits: [
      "2 Basic Facials per month",
      "1 Classic Massage",
      "10% off retail products",
      "Priority booking",
    ],
  },
  {
    name: "Gold Radiance",
    price: "NGN 250,000/mo",
    benefits: [
      "2 Advanced Facials per month",
      "2 Massages of choice",
      "1 Pedicure & Manicure",
      "20% off retail products",
      "Free birthday treatment",
    ],
  },
];

export function Services() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = SERVICES.filter((service) => {
    const matchesCategory =
      activeCategory === "All" || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by category for display
  const groupedServices = filteredServices.reduce(
    (acc, service) => {
      if (!acc[service.category]) acc[service.category] = [];
      acc[service.category].push(service);
      return acc;
    },
    {} as Record<string, typeof SERVICES>,
  );

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-heading-brown rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-gold rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-peach-accent rounded-full blur-3xl opacity-20" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
            >
              Services & Prices
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl text-paper-bg/90 font-light leading-relaxed"
            >
              Explore our comprehensive range of luxury treatments tailored to
              your unique needs. From rejuvenating facials to deep tissue
              massages, find your perfect escape.
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters & Search */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-light-gray/20 mb-12 sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-light-gray"
                size={20}
              />
              <input
                type="text"
                placeholder="Search treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 hide-scrollbar">
              <Filter
                className="text-primary-gold shrink-0 mr-2 hidden md:block"
                size={20}
              />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                    activeCategory === cat
                      ? "bg-primary-gold text-white border-primary-gold shadow-sm"
                      : "bg-transparent text-body-brown border-light-gray/50 hover:border-primary-gold/50 hover:bg-white",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Service List */}
        <div className="space-y-16 mb-24">
          {Object.entries(groupedServices).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-heading-brown mb-8 border-b border-light-gray/30 pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary-gold rounded-full inline-block"></span>
                {category} Treatments
              </h2>

              <div className="grid gap-6">
                {items.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-light-gray/10 hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
                  >
                    {service.popular && (
                      <div className="absolute top-4 right-4 bg-peach-accent/50 text-leaf-brown text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={12} className="fill-current" /> Popular
                      </div>
                    )}

                    <div className="flex-1 pr-8">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-heading-brown">
                          {service.title}
                        </h3>
                        <span className="md:hidden font-bold text-primary-gold text-lg">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-body-brown/70 mb-4 leading-relaxed">
                        {service.desc}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-leaf-brown font-medium">
                        <span className="bg-paper-bg px-4 py-1.5 rounded-full border border-light-gray/20 flex items-center gap-2">
                          <Clock size={14} /> {service.duration}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-3 min-w-[160px]">
                      <span className="font-bold text-primary-gold text-2xl">
                        {service.price}
                      </span>
                      <Link
                        to={`/book?service=${service.id}`}
                        className="text-sm font-medium text-heading-brown border-2 border-heading-brown px-6 py-2.5 rounded-full hover:bg-heading-brown hover:text-white transition-all flex items-center gap-2"
                      >
                        Book Now <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className="md:hidden mt-2 pt-4 border-t border-light-gray/20">
                      <Link
                        to={`/book?service=${service.id}`}
                        className="w-full text-center font-medium text-white bg-heading-brown px-4 py-3 rounded-xl hover:bg-heading-brown/90 transition-colors flex items-center justify-center gap-2 shadow-sm"
                      >
                        Book Appointment <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {Object.keys(groupedServices).length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-light-gray/20">
              <Info className="mx-auto text-light-gray mb-4" size={48} />
              <p className="text-xl text-body-brown/80 font-serif mb-4">
                No treatments found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="text-primary-gold font-medium hover:underline px-6 py-2 border border-primary-gold rounded-full"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Memberships Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              Spa Memberships
            </h2>
            <p className="text-body-brown/80 max-w-2xl mx-auto">
              Commit to your wellness journey with our exclusive monthly
              membership tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MEMBERSHIPS.map((tier, idx) => (
              <div
                key={idx}
                className={cn(
                  "rounded-3xl p-8 border-2 relative overflow-hidden",
                  idx === 1
                    ? "bg-heading-brown text-white border-heading-brown shadow-xl"
                    : "bg-white border-primary-gold/30 shadow-md",
                )}
              >
                {idx === 1 && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-gold/20 rounded-full blur-2xl" />
                )}
                <h3
                  className={cn(
                    "text-2xl font-serif font-bold mb-2",
                    idx === 1 ? "text-primary-gold" : "text-heading-brown",
                  )}
                >
                  {tier.name}
                </h3>
                <p className="text-3xl font-bold mb-8">{tier.price}</p>
                <ul className="space-y-4 mb-8">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2
                        className={
                          idx === 1 ? "text-primary-gold" : "text-primary-gold"
                        }
                        size={20}
                      />
                      <span
                        className={
                          idx === 1 ? "text-white/90" : "text-body-brown/80"
                        }
                      >
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  className={cn(
                    "w-full py-4 rounded-xl font-medium transition-all",
                    idx === 1
                      ? "bg-primary-gold text-white hover:bg-primary-gold/90"
                      : "bg-heading-brown text-white hover:bg-heading-brown/90",
                  )}
                >
                  Join {tier.name}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Spa Etiquette */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-light-gray/20">
          <h2 className="text-2xl font-serif font-bold text-heading-brown mb-8 text-center">
            Spa Etiquette & Policies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-body-brown/80 text-sm leading-relaxed">
            <div>
              <h4 className="font-bold text-heading-brown text-base mb-2">
                Arrival Time
              </h4>
              <p className="mb-6">
                Please arrive at least 15 minutes prior to your scheduled
                appointment to allow time for check-in, changing, and a brief
                consultation. Late arrivals may result in a shortened treatment
                time to accommodate other guests.
              </p>

              <h4 className="font-bold text-heading-brown text-base mb-2">
                Cancellations
              </h4>
              <p>
                We require a minimum of 24 hours notice for cancellations or
                rescheduling. Appointments canceled with less than 24 hours
                notice will incur a 50% cancellation fee.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-heading-brown text-base mb-2">
                Health Conditions
              </h4>
              <p className="mb-6">
                Please advise us of any health conditions, allergies, or
                injuries when booking your treatment. This ensures we can
                customize your experience safely.
              </p>

              <h4 className="font-bold text-heading-brown text-base mb-2">
                Quiet Environment
              </h4>
              <p>
                To maintain our peaceful sanctuary, we kindly ask that mobile
                phones be silenced upon entry and conversations be kept at a low
                volume.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
