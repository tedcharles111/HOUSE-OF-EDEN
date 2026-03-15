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
  Leaf,
  Instagram,
  Mail,
  Star,
} from "lucide-react";
import { cn } from "../lib/utils";

const SIGNATURE_SERVICES = [
  {
    title: "Hydra Facials",
    excerpt: "Deep hydration & glow for a flawless complexion.",
    icon: Droplets,
    link: "/services?category=Facial",
  },
  {
    title: "Lipo Cavitation",
    excerpt: "Non-invasive body sculpting and contouring.",
    icon: User,
    link: "/services?category=Lipo",
  },
  {
    title: "Teeth Whitening",
    excerpt: "Professional laser treatment for a bright, confident smile.",
    icon: Smile,
    link: "/services?category=Teeth",
  },
];

const PRICE_PREVIEW = [
  { label: "Signature Hydra Facial", price: "NGN 35,000" },
  { label: "Advanced Micro Needling", price: "NGN 50,000" },
  { label: "Laser Teeth Whitening", price: "NGN 70,000" },
  { label: "Full Body Lipo Cavitation", price: "NGN 145,000" },
  { label: "Aromatherapy Massage (60m)", price: "NGN 40,000" },
  { label: "Cleopatra Milk Pedicure", price: "NGN 25,000" },
];

const TESTIMONIALS = [
  {
    name: "Sarah O.",
    role: "Regular Client",
    text: "The most relaxing experience I have had in Lagos. The Hydra Facial left my skin glowing for weeks! The ambiance is simply unmatched.",
    rating: 5,
  },
  {
    name: "Aisha M.",
    role: "First-time Visitor",
    text: "Professional staff and a beautifully calming environment. Highly recommend the Lipo Cavitation. I saw results after just two sessions.",
    rating: 5,
  },
  {
    name: "Chika N.",
    role: "Bride-to-be",
    text: "My teeth have never been whiter. The process was painless, the staff made me feel like royalty, and the results are amazing.",
    rating: 5,
  },
];

const INSTAGRAM_POSTS = [
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/27/81/9c/traditional-kaya-massage.jpg?w=1000&h=-1&s=1",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/be/09/7d/foot-reflexology.jpg?w=700&h=400&s=1",
  "https://blog.withsplice.com/wp-content/uploads/2024/06/pexels-sora-shimazaki-5938595-1024x682.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/81/ee/da/soothing-and-relaxing.jpg?w=1000&h=-1&s=1",
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
            className="max-w-2xl z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-peach-accent/30 text-leaf-brown font-medium text-sm mb-6 border border-peach-accent"
            >
              <Sparkles size={16} /> Award-Winning Spa in Lagos
            </motion.div>
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
              className="text-lg md:text-xl text-body-brown/80 font-light mb-10 leading-relaxed"
            >
              Relax. Rejuvenate. Radiate. Experience world-class treatments in a
              sanctuary designed for your ultimate well-being and tranquility.
              Escape the ordinary.
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
                Book Your Escape <ArrowRight size={18} />
              </Link>
              <Link
                to="/services"
                className="border-2 border-primary-gold text-primary-gold px-8 py-4 rounded-full font-medium hover:bg-primary-gold/5 transition-all"
              >
                Explore Treatments
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
                <Leaf className="text-primary-gold" size={20} />
                Organic Products
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
            className="relative h-[400px] md:h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-peach-accent/20 mix-blend-multiply z-10" />
            <img
              src="https://freepressnews.com.ng/wp-content/uploads/2026/03/ChatGPT-Image-Mar-14-2026-07_52_26-PM-1024x683.png"
              alt="Woman receiving spa treatment"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary-gold/20 rounded-full blur-3xl" />
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-peach-accent/40 rounded-full blur-3xl" />

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg z-20 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                <img
                  src="https://picsum.photos/seed/face1/100/100"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="Client"
                />
                <img
                  src="https://picsum.photos/seed/face2/100/100"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="Client"
                />
                <img
                  src="https://picsum.photos/seed/face3/100/100"
                  className="w-10 h-10 rounded-full border-2 border-white"
                  alt="Client"
                />
              </div>
              <div>
                <div className="flex text-primary-gold text-sm">
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                  <Star size={14} className="fill-current" />
                </div>
                <p className="text-xs font-bold text-heading-brown mt-0.5">
                  5.0 from 500+ reviews
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-square rounded-full overflow-hidden border-8 border-paper-bg shadow-xl relative z-10 max-w-md mx-auto lg:mx-0">
                <img
                  src="https://blog.withsplice.com/wp-content/uploads/2024/06/person-enjoying-scalp-massage-spa-1-1536x1025.jpg"
                  alt="Spa ambiance"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-12 w-64 h-64 bg-peach-accent rounded-full -z-0 blur-2xl opacity-60" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-6">
                A Sanctuary for the Senses
              </h2>
              <div className="w-16 h-1 bg-primary-gold mb-8 rounded-full" />
              <p className="text-lg text-body-brown/80 font-light leading-relaxed mb-6">
                At House of Eden, we believe that true beauty radiates from
                within. Our philosophy is rooted in the harmonious balance of
                mind, body, and spirit.
              </p>
              <p className="text-lg text-body-brown/80 font-light leading-relaxed mb-8">
                Every treatment is a bespoke journey, meticulously crafted using
                organic ingredients and advanced aesthetic techniques to restore
                your natural vitality and glow. Step into our world and leave
                the noise behind.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-gold font-medium hover:gap-3 transition-all border-b border-primary-gold pb-1"
              >
                Discover Our Story <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Services */}
      <section className="bg-paper-bg py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-2 block">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-heading-brown mb-6">
              Signature Services
            </h2>
            <p className="text-body-brown/80 text-lg">
              Discover our most loved treatments, designed to bring out your
              natural radiance and provide profound relaxation.
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
                className="bg-white rounded-3xl p-8 text-center group hover:shadow-xl transition-all duration-300 border border-light-gray/20 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-primary-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <div className="w-20 h-20 mx-auto bg-paper-bg rounded-full flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 group-hover:bg-peach-accent/30 transition-all duration-300">
                  <service.icon className="text-primary-gold" size={36} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-heading-brown mb-4">
                  {service.title}
                </h3>
                <p className="text-body-brown/70 mb-8 leading-relaxed">
                  {service.excerpt}
                </p>
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-heading-brown font-medium group-hover:text-primary-gold transition-colors"
                >
                  Learn more{" "}
                  <ArrowRight
                    size={16}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-heading-brown text-heading-brown rounded-full font-medium hover:bg-heading-brown hover:text-white transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Price Preview & Retail Teaser */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-peach-accent/10 rounded-l-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-paper-bg rounded-3xl p-8 md:p-12 shadow-lg border border-light-gray/30 relative"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary-gold rounded-full opacity-10 blur-xl" />
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
                  Price List Preview
                </h2>
                <p className="text-body-brown/80">
                  Transparent pricing for our premium treatments.
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
                    <span className="text-base md:text-lg font-medium text-heading-brown">
                      {item.label}
                    </span>
                    <div className="flex-1 border-b-2 border-dotted border-light-gray/50 mx-4 group-hover:border-primary-gold/50 transition-colors" />
                    <span className="text-base md:text-lg font-bold text-primary-gold whitespace-nowrap">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-heading-brown font-medium hover:text-primary-gold transition-colors border-b border-heading-brown hover:border-primary-gold pb-1"
                >
                  Download Full Price List <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-2 block">
                Take Eden Home
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-6">
                Exclusive Spa Products
              </h2>
              <p className="text-lg text-body-brown/80 font-light leading-relaxed mb-8">
                Extend your spa experience with our curated selection of premium
                skincare and wellness products. Formulated with potent botanical
                extracts to nourish and protect your skin daily.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {[
                  { src: "https://freepressnews.com.ng/wp-content/uploads/2026/03/costimatics10.jpg", name: "Alpha Arbutln" },
                  { src: "https://freepressnews.com.ng/wp-content/uploads/2026/03/costimatics9.jpg", name: "Pink Blossom" },
                  { src: "https://freepressnews.com.ng/wp-content/uploads/2026/03/costimatics8.jpg", name: "Collagen" },
                  { src: "https://freepressnews.com.ng/wp-content/uploads/2026/03/costimatics3.jpg", name: "SOOTHE + GLOW" },
                ].map((product, i) => (
                  <div key={i} className="group cursor-pointer">
                    <div className="aspect-square rounded-2xl overflow-hidden mb-4 bg-paper-bg">
                      <img
                        src={product.src}
                        alt={product.name}
                        className="w-full h-full object-cover mix-blend-multiply transform group-hover:scale-110 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <h4 className="font-bold text-heading-brown text-sm">
                      {product.name}
                    </h4>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="text-primary-gold font-medium hover:underline flex items-center gap-2"
              >
                Inquire about products <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-heading-brown text-paper-bg relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary-gold font-medium tracking-wider uppercase text-sm mb-2 block">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              What Our Clients Say
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
                className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-1 text-primary-gold mb-6">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={18} className="fill-current" />
                  ))}
                </div>
                <p className="text-paper-bg/90 italic mb-8 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary-gold/20 rounded-full flex items-center justify-center text-primary-gold font-serif font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-lg">
                      {testimonial.name}
                    </p>
                    <p className="text-primary-gold text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-serif font-bold text-heading-brown mb-2">
                Follow Our Journey
              </h2>
              <p className="text-body-brown/80">
                Join our community on Instagram @HouseOfEdenSpa
              </p>
            </div>
            <a
              href="https://www.instagram.com/houseofedenspa?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-paper-bg px-6 py-3 rounded-full text-heading-brown font-medium hover:bg-peach-accent transition-colors"
            >
              <Instagram size={20} /> Follow Us
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {INSTAGRAM_POSTS.map((src, idx) => (
              <motion.a
                href="#"
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-square rounded-2xl overflow-hidden block"
              >
                <img
                  src={src}
                  alt="Instagram post"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-heading-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram size={32} className="text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & Footer CTA */}
      <section className="bg-peach-accent py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-overlay pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Leaf
            className="mx-auto text-heading-brown mb-6 opacity-50"
            size={48}
          />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-6">
            Ready to book your spa experience?
          </h2>
          <p className="text-lg text-heading-brown/80 mb-10 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, wellness tips, and
            priority booking access.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto mb-12">
            <div className="relative flex-1">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-body-brown/50"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 rounded-full border-none focus:ring-2 focus:ring-primary-gold shadow-sm"
              />
            </div>
            <button
              type="button"
              className="bg-heading-brown text-white px-8 py-4 rounded-full font-medium hover:bg-heading-brown/90 transition-all shadow-md whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>

          <div className="pt-12 border-t border-heading-brown/10">
            <p className="text-heading-brown font-serif text-xl mb-6">
              Or secure your spot today
            </p>
            <Link
              to="/book"
              className="inline-block bg-primary-gold text-white px-12 py-5 rounded-full font-medium hover:bg-primary-gold/90 transition-all hover:scale-105 hover:shadow-xl text-lg"
            >
              Book Appointment Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
