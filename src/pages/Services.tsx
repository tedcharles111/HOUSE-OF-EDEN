import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "All",
  "Facial",
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
    title: "Hydra facials",
    category: "Facial",
    desc: "Deep cleansing, exfoliation, and hydration.",
    price: "NGN35,000",
    duration: "60 min",
  },
  {
    id: 2,
    title: "Micro needling",
    category: "Facial",
    desc: "Collagen induction therapy for smoother skin.",
    price: "NGN50,000",
    duration: "90 min",
  },
  {
    id: 3,
    title: "PRP Treatment",
    category: "Facial",
    desc: "Platelet-rich plasma for skin rejuvenation.",
    price: "NGN60,000",
    duration: "90 min",
  },
  {
    id: 4,
    title: "Fruit pedicure",
    category: "Pedicure",
    desc: "Relaxing foot soak with fresh fruit extracts.",
    price: "NGN13,000",
    duration: "45 min",
  },
  {
    id: 5,
    title: "Cleopatra pedicure",
    category: "Pedicure",
    desc: "Luxurious milk and honey foot treatment.",
    price: "NGN25,000",
    duration: "60 min",
  },
  {
    id: 6,
    title: "Full body lipo",
    category: "Lipo Cavitation",
    desc: "Non-invasive fat reduction and body contouring.",
    price: "NGN145,000",
    duration: "120 min",
  },
  {
    id: 7,
    title: "Teeth whitening",
    category: "Teeth",
    desc: "Professional laser teeth whitening session.",
    price: "NGN70,000",
    duration: "60 min",
  },
  {
    id: 8,
    title: "Coffee Body Scrub",
    category: "Body Scrubs",
    desc: "Exfoliating and firming full body scrub.",
    price: "NGN20,000",
    duration: "45 min",
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-6"
          >
            Services & Prices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-body-brown/80 max-w-2xl mx-auto"
          >
            Explore our comprehensive range of luxury treatments tailored to
            your unique needs.
          </motion.p>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-light-gray/20 mb-12 sticky top-24 z-30">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
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
              <Filter className="text-primary-gold shrink-0 mr-2" size={20} />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                    activeCategory === cat
                      ? "bg-primary-gold text-white border-primary-gold"
                      : "bg-transparent text-body-brown border-light-gray/50 hover:border-primary-gold/50",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Service List */}
        <div className="space-y-16">
          {Object.entries(groupedServices).map(([category, items], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1 }}
            >
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-8 border-b border-light-gray/30 pb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-primary-gold rounded-full inline-block"></span>
                {category}
              </h2>

              <div className="grid gap-6">
                {items.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/10 hover:shadow-md transition-shadow group flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold text-heading-brown">
                          {service.title}
                        </h3>
                        <span className="md:hidden font-bold text-primary-gold text-lg">
                          {service.price}
                        </span>
                      </div>
                      <p className="text-body-brown/70 mb-3">{service.desc}</p>
                      <div className="flex items-center gap-4 text-sm text-leaf-brown font-medium">
                        <span className="bg-peach-accent/30 px-3 py-1 rounded-full">
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-3 min-w-[140px]">
                      <span className="font-bold text-primary-gold text-2xl">
                        {service.price}
                      </span>
                      <Link
                        to={`/book?service=${service.id}`}
                        className="text-sm font-medium text-heading-brown border border-heading-brown px-4 py-2 rounded-full hover:bg-heading-brown hover:text-white transition-colors flex items-center gap-2"
                      >
                        Book <ArrowRight size={14} />
                      </Link>
                    </div>

                    <div className="md:hidden mt-4 pt-4 border-t border-light-gray/20">
                      <Link
                        to={`/book?service=${service.id}`}
                        className="w-full text-center font-medium text-heading-brown border border-heading-brown px-4 py-3 rounded-xl hover:bg-heading-brown hover:text-white transition-colors flex items-center justify-center gap-2"
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
            <div className="text-center py-20">
              <p className="text-xl text-body-brown/60 font-serif">
                No treatments found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-4 text-primary-gold font-medium hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
