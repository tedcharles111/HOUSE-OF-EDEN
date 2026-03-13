import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  Info,
} from "lucide-react";
import { cn } from "../lib/utils";
import { format, addDays, startOfToday } from "date-fns";
import { useLocation } from "react-router-dom";
import { db, collection, addDoc, serverTimestamp } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const STEPS = ["Service", "Date & Time", "Details", "Payment", "Confirm"];

const SERVICES = [
  {
    id: 1,
    title: "Signature Hydra Facial",
    price: "NGN 35,000",
    duration: "60 min",
    category: "Facial",
  },
  {
    id: 2,
    title: "Advanced Micro Needling",
    price: "NGN 50,000",
    duration: "90 min",
    category: "Facial",
  },
  {
    id: 3,
    title: "Full Body Lipo Cavitation",
    price: "NGN 145,000",
    duration: "120 min",
    category: "Body",
  },
  {
    id: 4,
    title: "Aromatherapy Massage",
    price: "NGN 40,000",
    duration: "60 min",
    category: "Massage",
  },
  {
    id: 5,
    title: "Cleopatra Milk Pedicure",
    price: "NGN 25,000",
    duration: "60 min",
    category: "Nails",
  },
];

const TIME_SLOTS = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

export function Book() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(startOfToday());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"card" | "spa">("card");

  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get("service");
    if (serviceId) {
      const id = parseInt(serviceId, 10);
      if (SERVICES.find((s) => s.id === id)) {
        setSelectedService(id);
        setCurrentStep(1); // Skip to date selection if service is pre-selected
      }
    }
  }, [location]);

  const handleNext = async () => {
    if (currentStep === STEPS.length - 2) {
      // Final confirmation step
      setIsSubmitting(true);
      try {
        const service = SERVICES.find((s) => s.id === selectedService);
        await addDoc(collection(db, "bookings"), {
          userId: user?.uid || "anonymous",
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone,
          serviceName: service?.title || "Unknown Service",
          serviceId: selectedService,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
          notes: formData.notes,
          paymentMethod,
          status: "pending",
          createdAt: serverTimestamp(),
        });
        setCurrentStep((prev) => prev + 1);
      } catch (error) {
        console.error("Error saving booking:", error);
        alert("Failed to save booking. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    } else if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedService !== null;
      case 1:
        return selectedDate !== null && selectedTime !== null;
      case 2:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== ""
        );
      case 3:
        return paymentMethod !== null;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-heading-brown mb-2">
                Select a Service
              </h3>
              <p className="text-body-brown/70">
                Choose the treatment you'd like to book today.
              </p>
            </div>

            <div className="grid gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "w-full text-left p-5 rounded-2xl border-2 transition-all flex justify-between items-center group shadow-sm",
                    selectedService === service.id
                      ? "border-primary-gold bg-primary-gold/5 shadow-md"
                      : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                  )}
                >
                  <div className="flex-1">
                    <span className="text-xs font-bold text-primary-gold uppercase tracking-wider mb-1 block">
                      {service.category}
                    </span>
                    <h4 className="font-bold text-heading-brown text-lg mb-2">
                      {service.title}
                    </h4>
                    <p className="text-body-brown/70 text-sm flex items-center gap-2 font-medium">
                      <Clock size={14} className="text-primary-gold" />{" "}
                      {service.duration}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-3">
                    <span className="font-bold text-heading-brown text-xl block">
                      {service.price}
                    </span>
                    <div
                      className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                        selectedService === service.id
                          ? "border-primary-gold bg-primary-gold"
                          : "border-light-gray",
                      )}
                    >
                      {selectedService === service.id && (
                        <CheckCircle2 size={16} className="text-white" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-heading-brown mb-2">
                Choose Date & Time
              </h3>
              <p className="text-body-brown/70">
                Select your preferred slot. All times are local.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-heading-brown mb-4 flex items-center gap-2 uppercase tracking-wider">
                <CalendarIcon size={18} className="text-primary-gold" /> Select
                Date
              </label>
              <div className="flex gap-3 overflow-x-auto pb-4 hide-scrollbar">
                {[...Array(14)].map((_, i) => {
                  const date = addDays(startOfToday(), i);
                  const isSelected =
                    selectedDate.toDateString() === date.toDateString();
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedDate(date)}
                      className={cn(
                        "min-w-[85px] p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all shrink-0 shadow-sm",
                        isSelected
                          ? "border-primary-gold bg-primary-gold text-white shadow-md transform scale-105"
                          : "border-light-gray/30 bg-white text-heading-brown hover:border-primary-gold/50",
                      )}
                    >
                      <span className="text-xs uppercase font-medium mb-1 opacity-80">
                        {format(date, "EEE")}
                      </span>
                      <span className="text-2xl font-bold font-serif">
                        {format(date, "d")}
                      </span>
                      <span className="text-xs opacity-80 mt-1 font-medium">
                        {format(date, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-light-gray/20">
              <label className="block text-sm font-bold text-heading-brown mb-4 flex items-center gap-2 uppercase tracking-wider">
                <Clock size={18} className="text-primary-gold" /> Available
                Times
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-sm font-bold transition-all shadow-sm",
                      selectedTime === time
                        ? "border-primary-gold bg-primary-gold/10 text-primary-gold shadow-md"
                        : "border-light-gray/30 bg-white text-heading-brown hover:border-primary-gold/50",
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-heading-brown mb-2">
                Your Details
              </h3>
              <p className="text-body-brown/70">
                We need a few details to confirm your booking.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-heading-brown mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-light-gray"
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm text-heading-brown font-medium"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-4 rounded-xl border-2 border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm text-heading-brown font-medium"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-heading-brown mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-4 rounded-xl border-2 border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all shadow-sm text-heading-brown font-medium"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-heading-brown mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-4 rounded-xl border-2 border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all h-32 resize-none shadow-sm text-heading-brown font-medium"
                  placeholder="Any allergies, specific concerns, or therapist preferences?"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-heading-brown mb-2">
                Payment Method
              </h3>
              <p className="text-body-brown/70">
                Secure your appointment. No hidden fees.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 shadow-sm",
                  paymentMethod === "card"
                    ? "border-primary-gold bg-primary-gold/5 shadow-md"
                    : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    paymentMethod === "card"
                      ? "bg-primary-gold text-white"
                      : "bg-paper-bg text-body-brown",
                  )}
                >
                  <CreditCard size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-heading-brown text-lg mb-1">
                    Pay Online Now
                  </h4>
                  <p className="text-body-brown/70 text-sm">
                    Secure payment via Paystack/Stripe. Recommended for faster
                    check-in.
                  </p>
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    paymentMethod === "card"
                      ? "border-primary-gold bg-primary-gold"
                      : "border-light-gray",
                  )}
                >
                  {paymentMethod === "card" && (
                    <CheckCircle2 size={16} className="text-white" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setPaymentMethod("spa")}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-6 shadow-sm",
                  paymentMethod === "spa"
                    ? "border-primary-gold bg-primary-gold/5 shadow-md"
                    : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-colors",
                    paymentMethod === "spa"
                      ? "bg-primary-gold text-white"
                      : "bg-paper-bg text-body-brown",
                  )}
                >
                  <User size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-heading-brown text-lg mb-1">
                    Pay at Spa
                  </h4>
                  <p className="text-body-brown/70 text-sm">
                    Pay via POS or cash after your treatment. Card details may
                    be required to hold the booking.
                  </p>
                </div>
                <div
                  className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors",
                    paymentMethod === "spa"
                      ? "border-primary-gold bg-primary-gold"
                      : "border-light-gray",
                  )}
                >
                  {paymentMethod === "spa" && (
                    <CheckCircle2 size={16} className="text-white" />
                  )}
                </div>
              </button>
            </div>

            {/* Booking Summary */}
            <div className="mt-10 bg-paper-bg p-8 rounded-3xl border border-light-gray/20 shadow-inner">
              <h4 className="font-serif font-bold text-heading-brown text-xl mb-6 flex items-center gap-2">
                <Info size={20} className="text-primary-gold" /> Booking Summary
              </h4>
              <div className="space-y-4 text-base text-body-brown/80">
                <div className="flex justify-between items-center pb-4 border-b border-light-gray/30">
                  <span className="font-medium">Service:</span>
                  <span className="font-bold text-heading-brown text-right max-w-[60%]">
                    {SERVICES.find((s) => s.id === selectedService)?.title}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-light-gray/30">
                  <span className="font-medium">Date & Time:</span>
                  <span className="font-bold text-heading-brown">
                    {format(selectedDate, "MMM d, yyyy")} at {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-light-gray/30">
                  <span className="font-medium">Client:</span>
                  <span className="font-bold text-heading-brown">
                    {formData.name}
                  </span>
                </div>
                <div className="pt-4 flex justify-between items-center font-bold text-2xl text-primary-gold">
                  <span>Total Due:</span>
                  <span>
                    {SERVICES.find((s) => s.id === selectedService)?.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="text-center py-16 space-y-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              className="w-32 h-32 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-100/50 border-4 border-white"
            >
              <CheckCircle2 size={64} />
            </motion.div>
            <h3 className="text-4xl font-serif font-bold text-heading-brown">
              Booking Confirmed!
            </h3>
            <p className="text-body-brown/80 max-w-lg mx-auto text-lg leading-relaxed">
              Thank you,{" "}
              <span className="font-bold text-heading-brown">
                {formData.name.split(" ")[0]}
              </span>
              . Your appointment for{" "}
              <span className="font-bold text-heading-brown">
                {SERVICES.find((s) => s.id === selectedService)?.title}
              </span>{" "}
              is confirmed for{" "}
              <span className="font-bold text-primary-gold">
                {format(selectedDate, "MMM d")} at {selectedTime}
              </span>
              .
            </p>
            <div className="bg-peach-accent/20 p-6 rounded-2xl max-w-md mx-auto border border-peach-accent/50 mt-8">
              <p className="text-sm text-heading-brown font-medium flex items-center justify-center gap-2">
                <AlertCircle size={16} className="text-primary-gold" />
                We've sent a confirmation email to {formData.email}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-heading-brown mb-6">
            Book Appointment
          </h1>
          <p className="text-lg md:text-xl text-body-brown/80 max-w-2xl mx-auto">
            Reserve your time for relaxation and rejuvenation in just a few
            simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Booking Form */}
          <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl shadow-heading-brown/5 border border-light-gray/20 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-heading-brown/5 px-6 md:px-10 py-6 border-b border-light-gray/20 flex justify-between items-center overflow-x-auto hide-scrollbar">
              {STEPS.map((step, idx) => (
                <div key={step} className="flex items-center shrink-0">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-all duration-300",
                      currentStep > idx
                        ? "bg-primary-gold text-white shadow-md"
                        : currentStep === idx
                          ? "bg-heading-brown text-white ring-4 ring-heading-brown/20 scale-110"
                          : "bg-white text-light-gray border-2 border-light-gray/30",
                    )}
                  >
                    {currentStep > idx ? <CheckCircle2 size={20} /> : idx + 1}
                  </div>
                  <span
                    className={cn(
                      "ml-3 text-sm font-bold hidden md:block uppercase tracking-wider",
                      currentStep >= idx
                        ? "text-heading-brown"
                        : "text-light-gray",
                    )}
                  >
                    {step}
                  </span>
                  {idx < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "w-8 md:w-12 h-0.5 mx-3 md:mx-6 transition-colors duration-300",
                        currentStep > idx
                          ? "bg-primary-gold"
                          : "bg-light-gray/30",
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-10 min-h-[500px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer Actions */}
            {currentStep < STEPS.length - 1 && (
              <div className="p-6 md:p-10 border-t border-light-gray/20 bg-paper-bg/30 flex justify-between items-center">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className={cn(
                    "flex items-center gap-2 px-6 py-4 rounded-full font-bold transition-all",
                    currentStep === 0
                      ? "opacity-0 pointer-events-none"
                      : "text-heading-brown hover:bg-white border-2 border-light-gray/50 hover:border-heading-brown",
                  )}
                >
                  <ChevronLeft size={20} /> Back
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className={cn(
                    "flex items-center gap-2 px-8 py-4 rounded-full font-bold transition-all text-lg",
                    canProceed() && !isSubmitting
                      ? "bg-primary-gold text-white hover:bg-primary-gold/90 hover:scale-105 shadow-xl shadow-primary-gold/20"
                      : "bg-light-gray/50 text-white cursor-not-allowed",
                  )}
                >
                  {isSubmitting ? (
                    "Processing..."
                  ) : currentStep === STEPS.length - 2 ? (
                    "Confirm Booking"
                  ) : (
                    "Continue"
                  )}
                  {!isSubmitting && <ChevronRight size={20} />}
                </button>
              </div>
            )}
          </div>

          {/* Sidebar / Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-heading-brown text-paper-bg rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-gold/20 rounded-full blur-2xl" />
              <h3 className="font-serif text-2xl font-bold text-primary-gold mb-6">
                Your Journey Begins Here
              </h3>

              <div className="space-y-6 font-light text-paper-bg/80">
                <div>
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Clock size={16} className="text-primary-gold" /> Arrival
                    Time
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Please arrive 15 minutes prior to your appointment to
                    complete any necessary forms and begin your relaxation
                    process.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <AlertCircle size={16} className="text-primary-gold" />{" "}
                    Cancellation Policy
                  </h4>
                  <p className="text-sm leading-relaxed">
                    We require 24 hours notice for cancellations. Late
                    cancellations or no-shows may incur a fee of 50% of the
                    service cost.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Info size={16} className="text-primary-gold" /> Preparation
                  </h4>
                  <p className="text-sm leading-relaxed">
                    Avoid heavy meals before massages. For facials, please
                    arrive without makeup if possible. Robes and slippers are
                    provided.
                  </p>
                </div>
              </div>
            </div>

            {/* Need Help Card */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-light-gray/20 text-center">
              <h4 className="font-serif font-bold text-heading-brown text-xl mb-3">
                Need Assistance?
              </h4>
              <p className="text-body-brown/70 text-sm mb-6">
                Our concierge team is available to help you choose the perfect
                treatment.
              </p>
              <a
                href="tel:+2348001234567"
                className="inline-block w-full py-3 rounded-full border-2 border-primary-gold text-primary-gold font-bold hover:bg-primary-gold hover:text-white transition-colors"
              >
                Call +234 800 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
