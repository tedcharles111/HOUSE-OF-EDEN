import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

const IMAGES = [
  {
    id: 1,
    src: "https://picsum.photos/seed/spa1/800/800",
    alt: "Spa Interior",
    tags: ["Interior"],
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/spa2/800/1200",
    alt: "Facial Treatment",
    tags: ["Treatments"],
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/spa3/1200/800",
    alt: "Relaxation Area",
    tags: ["Interior"],
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/spa4/800/800",
    alt: "Massage Therapy",
    tags: ["Treatments"],
  },
  {
    id: 5,
    src: "https://picsum.photos/seed/spa5/800/1000",
    alt: "Products",
    tags: ["Products"],
  },
  {
    id: 6,
    src: "https://picsum.photos/seed/spa6/1000/800",
    alt: "Manicure Station",
    tags: ["Interior", "Treatments"],
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-6"
          >
            Our Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-body-brown/80 max-w-2xl mx-auto"
          >
            Take a visual tour of our luxurious facilities and the serene
            environment we've created for your relaxation.
          </motion.p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all"
              onClick={() => setSelectedImage(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-heading-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-medium tracking-wider uppercase text-sm border border-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  View
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-heading-brown/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-black/20 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
