import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export function Contact() {
  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-6"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-body-brown/80 max-w-2xl mx-auto"
          >
            We're here to answer any questions you may have about our services,
            pricing, or your upcoming appointment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown mb-1">
                      Visit Us
                    </h4>
                    <p className="text-body-brown/80 leading-relaxed">
                      123 Luxury Avenue
                      <br />
                      Victoria Island
                      <br />
                      Lagos, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown mb-1">
                      Call Us
                    </h4>
                    <p className="text-body-brown/80">+234 800 123 4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-gold shrink-0 shadow-sm border border-light-gray/20">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-heading-brown mb-1">
                      Email Us
                    </h4>
                    <p className="text-body-brown/80">hello@houseofeden.com</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                Opening Hours
              </h2>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20 space-y-3">
                <div className="flex justify-between items-center text-body-brown/80">
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-gold" /> Monday -
                    Friday
                  </span>
                  <span className="font-medium text-heading-brown">
                    9:00 AM - 8:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center text-body-brown/80 border-t border-light-gray/20 pt-3">
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-gold" /> Saturday
                  </span>
                  <span className="font-medium text-heading-brown">
                    10:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center text-body-brown/80 border-t border-light-gray/20 pt-3">
                  <span className="flex items-center gap-2">
                    <Clock size={16} className="text-primary-gold" /> Sunday
                  </span>
                  <span className="font-medium text-heading-brown">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <form className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-heading-brown/5 border border-light-gray/20 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                Send a Message
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="+234 800 000 0000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all h-32 resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-primary-gold text-white px-8 py-4 rounded-xl font-medium hover:bg-primary-gold/90 transition-all hover:shadow-lg flex items-center justify-center gap-2 mt-4"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
