import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-heading-brown text-paper-bg pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img
                src="https://freepressnews.com.ng/wp-content/uploads/2026/03/ChatGPT_Image_Mar_10__2026__03_58_07_PM-removebg-preview-1.png"
                alt="House Of Eden Logo"
                className="w-24 h-24 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif font-bold text-2xl text-primary-gold tracking-tight">
                House Of Eden
              </span>
            </Link>
            <p className="text-paper-bg/80 mb-6 font-light leading-relaxed">
              Luxurious Spa & Aesthetic Treatments. Relax. Rejuvenate. Radiate.
            </p>
            <div className="flex gap-4 text-primary-gold">
              <a href="#" className="hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-primary-gold">
              Quick Links
            </h4>
            <ul className="space-y-3 font-light text-paper-bg/80">
              <li>
                <Link
                  to="/services"
                  className="hover:text-primary-gold transition-colors"
                >
                  Services & Prices
                </Link>
              </li>
              <li>
                <Link
                  to="/book"
                  className="hover:text-primary-gold transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="hover:text-primary-gold transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-primary-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-primary-gold">
              Services
            </h4>
            <ul className="space-y-3 font-light text-paper-bg/80">
              <li>
                <Link
                  to="/services?category=Facial"
                  className="hover:text-primary-gold transition-colors"
                >
                  Hydra Facials
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Lipo"
                  className="hover:text-primary-gold transition-colors"
                >
                  Lipo Cavitation
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Teeth"
                  className="hover:text-primary-gold transition-colors"
                >
                  Teeth Whitening
                </Link>
              </li>
              <li>
                <Link
                  to="/services?category=Body"
                  className="hover:text-primary-gold transition-colors"
                >
                  Body Scrubs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg font-bold mb-6 text-primary-gold">
              Contact
            </h4>
            <ul className="space-y-4 font-light text-paper-bg/80">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-gold shrink-0 mt-1" />
                <span>16 Oyekan Road, off Ogunlana Drive, Surulere, Lagos, Nigeria 101283</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary-gold shrink-0" />
                <span>+234 800 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-primary-gold shrink-0" />
                <span>hello@houseofeden.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-paper-bg/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-paper-bg/60 font-light">
          <p>
            &copy; {new Date().getFullYear()} House Of Eden. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="hover:text-primary-gold transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-primary-gold transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/admin"
              className="hover:text-primary-gold transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
