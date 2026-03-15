import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ChevronDown,
  ChevronUp,
  Car,
} from "lucide-react";
import { cn } from "../lib/utils";

const FAQS = [
  {
    question: "Do I need to book in advance?",
    answer:
      "Yes, we highly recommend booking your appointment in advance to secure your preferred time and therapist. While we do accept walk-ins, availability is not guaranteed.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We require a minimum of 24 hours notice for cancellations or rescheduling. Appointments canceled with less than 24 hours notice will incur a 50% cancellation fee.",
  },
  {
    question: "What should I wear to my appointment?",
    answer:
      "Wear whatever makes you comfortable. Upon arrival, we will provide you with a luxurious robe and slippers. During treatments, you will be draped appropriately to ensure your privacy at all times.",
  },
  {
    question: "Do you offer couples massages?",
    answer:
      "Yes, we have a beautifully appointed couples suite where you and a partner or friend can enjoy treatments simultaneously. Please specify this request when booking.",
  },
  {
    question: "Are your products safe for sensitive skin?",
    answer:
      "Absolutely. We use premium, organic, and hypoallergenic products. Before any treatment, your therapist will conduct a brief consultation to understand your skin type and any sensitivities.",
  },
];

export function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            Connect With Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-heading-brown mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-body-brown/80 font-light leading-relaxed"
          >
            We're here to answer any questions you may have about our services,
            pricing, or your upcoming appointment. Our concierge team is ready
            to assist you.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-3xl font-serif font-bold text-heading-brown mb-8">
                Contact Information
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20 group-hover:bg-primary-gold group-hover:text-white transition-colors duration-300">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown text-xl mb-2">
                      Visit Us
                    </h4>
                    <p className="text-body-brown/80 leading-relaxed text-lg">
                      16 Oyekan Road, off Ogunlana Drive
                      <br />
                      Surulere, Lagos
                      <br />
                      Nigeria 101283
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20 group-hover:bg-primary-gold group-hover:text-white transition-colors duration-300">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown text-xl mb-2">
                      Call Us
                    </h4>
                    <p className="text-body-brown/80 text-lg">
                      +234 800 123 4567
                    </p>
                    <p className="text-body-brown/60 text-sm mt-1">
                      Available during operating hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20 group-hover:bg-primary-gold group-hover:text-white transition-colors duration-300">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown text-xl mb-2">
                      Email Us
                    </h4>
                    <p className="text-body-brown/80 text-lg">
                      hello@houseofeden.com
                    </p>
                    <p className="text-body-brown/60 text-sm mt-1">
                      We aim to reply within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-light-gray/20">
                <h2 className="text-xl font-serif font-bold text-heading-brown mb-6 flex items-center gap-2">
                  <Clock className="text-primary-gold" size={24} /> Opening
                  Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-body-brown/80">
                    <span>Mon - Fri</span>
                    <span className="font-medium text-heading-brown">
                      9:00 AM - 8:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-body-brown/80 border-t border-light-gray/20 pt-4">
                    <span>Saturday</span>
                    <span className="font-medium text-heading-brown">
                      10:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-body-brown/80 border-t border-light-gray/20 pt-4">
                    <span>Sunday</span>
                    <span className="font-medium text-heading-brown">
                      Closed
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-light-gray/20">
                <h2 className="text-xl font-serif font-bold text-heading-brown mb-6 flex items-center gap-2">
                  <Car className="text-primary-gold" size={24} /> Arrival &
                  Parking
                </h2>
                <p className="text-body-brown/80 leading-relaxed text-sm">
                  Complimentary valet parking is available for all guests.
                  Please pull up to the main entrance and our attendant will
                  assist you. We recommend arriving 15 minutes prior to your
                  appointment.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-heading-brown/5 border border-light-gray/20 space-y-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-peach-accent/30 rounded-full blur-3xl" />

              <div>
                <h2 className="text-3xl font-serif font-bold text-heading-brown mb-2">
                  Send a Message
                </h2>
                <p className="text-body-brown/70">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border-2 border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-xl border-2 border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2 uppercase tracking-wider">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-5 py-4 rounded-xl border-2 border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    className="w-full px-5 py-4 rounded-xl border-2 border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all h-32 resize-none shadow-sm"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary-gold text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-primary-gold/90 transition-all hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-3 mt-4"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-heading-brown mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body-brown/80">
              Everything you need to know before your visit.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-light-gray/20 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-heading-brown text-lg">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp
                      className="text-primary-gold shrink-0"
                      size={24}
                    />
                  ) : (
                    <ChevronDown
                      className="text-light-gray shrink-0"
                      size={24}
                    />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-body-brown/80 leading-relaxed border-t border-light-gray/10 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
