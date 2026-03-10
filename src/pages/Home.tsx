import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  CreditCard,
  ArrowRight,
  Droplets,
  User,
  Smile,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SIGNATURE_SERVICES = [
  {
    title: "Hydra Facials",
    excerpt: "Deep hydration & glow",
    icon: Droplets,
    link: "/services?category=Facial",
  },
  {
    title: "Lipo Cavitation",
    excerpt: "Non-invasive body sculpting",
    icon: User,
    link: "/services?category=Lipo",
  },
  {
    title: "Teeth Whitening",
    excerpt: "Bright, confident smile",
    icon: Smile,
    link: "/services?category=Teeth",
  },
];

const PRICE_PREVIEW = [
  { label: "Hydra facials", price: "NGN35,000" },
  { label: "Micro needling", price: "NGN50,000" },
  { label: "Teeth whitening", price: "NGN70,000" },
  { label: "Full body lipo", price: "NGN145,000" },
];

const TESTIMONIALS = [
  {
    name: "Sarah O.",
    text: "The most relaxing experience I have had in Lagos. The Hydra Facial left my skin glowing for weeks!",
    rating: 5,
  },
  {
    name: "Aisha M.",
    text: "Professional staff and a beautifully calming environment. Highly recommend the Lipo Cavitation.",
    rating: 5,
  },
  {
    name: "Chika N.",
    text: "My teeth have never been whiter. The process was painless and the results are amazing.",
    rating: 5,
  },
];

export function Home() {
  return (
    <div className="pt-24 md:pt-32">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="max-w-2xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-heading-brown leading-[1.1] mb-6"
            >
              Luxurious Spa &<br />
              <span className="text-primary-gold">Aesthetic Treatments</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg md:text-xl text-body-brown/80 font-light mb-10"
            >
              Relax. Rejuvenate. Radiate. Experience world-class treatments in a
              sanctuary designed for your ultimate well-being.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/book"
                className="bg-primary-gold text-white px-8 py-4 rounded-full font-medium hover:bg-primary-gold/90 transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                Book Now <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="border-2 border-primary-gold text-primary-gold px-8 py-4 rounded-full font-medium hover:bg-primary-gold/5 transition-all"
              >
                View Price List
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex flex-wrap gap-6 text-sm text-body-brown/70 font-medium"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-primary-gold" size={20} />
                Certified Therapists
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary-gold" size={20} />
                Hygiene Guarantee
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="text-primary-gold" size={20} />
                Secure Payments
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Placeholder for Lottie/Hero Image */}
            <div className="absolute inset-0 bg-peach-accent/30 mix-blend-multiply z-10" />
            <img
              src="https://picsum.photos/seed/spa-treatment/800/1000"
              alt="Spa Treatment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-gold/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-peach-accent/40 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Signature Services */}
      <section className="bg-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              Signature Services
            </h2>
            <p className="text-body-brown/80">
              Discover our most loved treatments, designed to bring out your
              natural radiance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SIGNATURE_SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-paper-bg rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300 border border-light-gray/20"
              >
                <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <service.icon className="text-primary-gold" size={32} />
                </div>
                <h3 className="text-xl font-serif font-bold text-heading-brown mb-3">
                  {service.title}
                </h3>
                <p className="text-body-brown/70 mb-6">{service.excerpt}</p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-primary-gold font-medium hover:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Preview */}
      <section className="py-20 md:py-32 bg-paper-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-peach-accent/20 rounded-l-full blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-light-gray/30">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
                Price List Preview
              </h2>
              <p className="text-body-brown/80">
                A snapshot of our most popular treatments
              </p>
            </div>

            <div className="space-y-6 mb-10">
              {PRICE_PREVIEW.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between group"
                >
                  <span className="text-lg font-medium text-heading-brown">
                    {item.label}
                  </span>
                  <div className="flex-1 border-b-2 border-dotted border-light-gray/50 mx-4 group-hover:border-primary-gold/50 transition-colors" />
                  <span className="text-lg font-bold text-primary-gold">
                    {item.price}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-heading-brown font-medium hover:text-primary-gold transition-colors border-b border-heading-brown hover:border-primary-gold pb-1"
              >
                View full price list <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              What Clients Say
            </h2>
            <div className="w-24 h-1 bg-primary-gold mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-paper-bg p-8 rounded-2xl border border-light-gray/20"
              >
                <div className="flex gap-1 text-primary-gold mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Sparkles key={j} size={16} className="fill-current" />
                  ))}
                </div>
                <p className="text-body-brown/80 italic mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-serif font-bold text-heading-brown">
                  {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-peach-accent py-24 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-heading-brown mb-8">
            Ready to book your spa experience?
          </h2>
          <Link
            to="/book"
            className="inline-block bg-heading-brown text-white px-10 py-4 rounded-full font-medium hover:bg-heading-brown/90 transition-all hover:scale-105 hover:shadow-xl"
          >
            Book Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
