import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, PlayCircle, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Interior", "Treatments", "Products"];

const IMAGES = [
  {
    id: 1,
    src: "https://picsum.photos/seed/spa1/800/800",
    alt: "Spa Interior Lobby",
    category: "Interior",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/spa2/800/1200",
    alt: "Hydra Facial Treatment",
    category: "Treatments",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/spa3/1200/800",
    alt: "Relaxation Area",
    category: "Interior",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/spa4/800/800",
    alt: "Hot Stone Massage",
    category: "Treatments",
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/spa5/800/1000",
    alt: "Organic Skincare Products",
    category: "Products",
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/spa6/1000/800",
    alt: "Manicure Station",
    category: "Interior",
  },
  {
    id: 7,
    src: "https://picsum.photos/seed/spa7/800/1200",
    alt: "Treatment Room",
    category: "Interior",
  },
  {
    id: 8,
    src: "https://picsum.photos/seed/spa8/1200/800",
    alt: "Lipo Cavitation Session",
    category: "Treatments",
  },
  {
    id: 9,
    src: "https://picsum.photos/seed/spa9/800/800",
    alt: "Essential Oils",
    category: "Products",
  },
  {
    id: 10,
    src: "https://picsum.photos/seed/spa10/800/1000",
    alt: "Sauna Room",
    category: "Interior",
  },
  {
    id: 11,
    src: "https://picsum.photos/seed/spa11/1000/800",
    alt: "Teeth Whitening Room",
    category: "Interior",
  },
  {
    id: 12,
    src: "https://picsum.photos/seed/spa12/800/800",
    alt: "Aromatherapy Setup",
    category: "Products",
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? IMAGES
      : IMAGES.filter((img) => img.category === activeCategory);

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-4 block"
          >
            Visual Journey
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-heading-brown mb-6"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-body-brown/80 font-light leading-relaxed"
          >
            Take a visual tour of our luxurious facilities and the serene
            environment we've meticulously created for your ultimate relaxation
            and rejuvenation.
          </motion.p>
        </div>
      </section>

      {/* Virtual Tour Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl group cursor-pointer"
        >
          <img
            src="https://picsum.photos/seed/virtual-tour/1200/600"
            alt="Virtual Tour Preview"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-heading-brown/40 flex flex-col items-center justify-center text-white transition-colors group-hover:bg-heading-brown/50">
            <PlayCircle
              size={64}
              className="mb-4 text-primary-gold group-hover:scale-110 transition-transform duration-300"
            />
            <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
              Take a Virtual Tour
            </h3>
            <p className="text-white/80 font-medium">
              Experience Eden from anywhere.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <Filter
            className="text-primary-gold mr-2 hidden md:block"
            size={20}
          />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold transition-all border-2",
                activeCategory === cat
                  ? "bg-heading-brown text-white border-heading-brown shadow-md"
                  : "bg-white text-body-brown border-light-gray/30 hover:border-primary-gold hover:text-primary-gold",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredImages.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-light-gray/20"
                onClick={() => setSelectedImage(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-heading-brown/90 via-heading-brown/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-primary-gold font-bold text-xs uppercase tracking-wider mb-1">
                    {img.category}
                  </span>
                  <h4 className="text-white font-serif text-xl font-bold">
                    {img.alt}
                  </h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredImages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-body-brown/60 font-serif">
              No images found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-heading-brown/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-3 rounded-full hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
