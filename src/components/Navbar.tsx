import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram, Facebook, Youtube } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "Services & Prices", path: "/services" },
  { name: "Book", path: "/book" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-paper-bg/90 backdrop-blur-md shadow-sm py-1"
          : "bg-transparent py-2",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="https://freepressnews.com.ng/wp-content/uploads/2026/03/ChatGPT_Image_Mar_10__2026__03_58_07_PM-removebg-preview.png"
              alt="House Of Eden Logo"
              className="w-48 h-48 object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-gold relative group",
                  location.pathname === link.path
                    ? "text-primary-gold"
                    : "text-heading-brown",
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 bg-primary-gold transform origin-left transition-transform duration-300",
                    location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            ))}
            <Link
              to="/book"
              className="bg-primary-gold text-white px-6 py-2.5 rounded-full font-medium hover:bg-primary-gold/90 transition-all hover:scale-105 hover:shadow-md"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-heading-brown p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper-bg shadow-lg border-t border-light-gray/20 md:hidden"
          >
            <div className="flex flex-col px-4 py-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-lg font-medium p-2 rounded-lg transition-colors",
                    location.pathname === link.path
                      ? "bg-peach-accent text-heading-brown"
                      : "text-body-brown hover:bg-light-gray/10",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-light-gray/30 my-2" />
              <div className="flex justify-center gap-6 py-4 text-leaf-brown">
                <a
                  href="#"
                  className="hover:text-primary-gold transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="hover:text-primary-gold transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="#"
                  className="hover:text-primary-gold transition-colors"
                >
                  <Youtube size={24} />
                </a>
              </div>
              <Link
                to="/book"
                className="bg-primary-gold text-white text-center py-3 rounded-xl font-medium mt-2"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
