import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  CreditCard,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfToday } from "date-fns";

const STEPS = ["Service", "Date & Time", "Details", "Payment", "Confirm"];

const SERVICES = [
  { id: 1, title: "Hydra facials", price: "NGN35,000", duration: "60 min" },
  { id: 2, title: "Micro needling", price: "NGN50,000", duration: "90 min" },
  { id: 3, title: "Full body lipo", price: "NGN145,000", duration: "120 min" },
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

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((prev) => prev + 1);
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
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-heading-brown mb-6">
              Select a Service
            </h3>
            {SERVICES.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all flex justify-between items-center group",
                  selectedService === service.id
                    ? "border-primary-gold bg-primary-gold/5"
                    : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                )}
              >
                <div>
                  <h4 className="font-bold text-heading-brown text-lg mb-1">
                    {service.title}
                  </h4>
                  <p className="text-body-brown/70 text-sm flex items-center gap-2">
                    <Clock size={14} /> {service.duration}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-primary-gold text-xl block">
                    {service.price}
                  </span>
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border-2 mt-2 ml-auto flex items-center justify-center transition-colors",
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
        );
      case 1:
        return (
          <div className="space-y-8">
            <h3 className="text-2xl font-serif font-bold text-heading-brown mb-6">
              Choose Date & Time
            </h3>

            <div>
              <label className="block text-sm font-medium text-body-brown mb-3 flex items-center gap-2">
                <CalendarIcon size={16} className="text-primary-gold" /> Select
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
                        "min-w-[80px] p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all shrink-0",
                        isSelected
                          ? "border-primary-gold bg-primary-gold text-white"
                          : "border-light-gray/30 bg-white text-heading-brown hover:border-primary-gold/50",
                      )}
                    >
                      <span className="text-xs uppercase font-medium mb-1 opacity-80">
                        {format(date, "EEE")}
                      </span>
                      <span className="text-2xl font-bold font-serif">
                        {format(date, "d")}
                      </span>
                      <span className="text-xs opacity-80 mt-1">
                        {format(date, "MMM")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-body-brown mb-3 flex items-center gap-2">
                <Clock size={16} className="text-primary-gold" /> Available
                Times
              </label>
              <div className="grid grid-cols-3 gap-3">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "p-3 rounded-xl border-2 text-sm font-medium transition-all",
                      selectedTime === time
                        ? "border-primary-gold bg-primary-gold/10 text-primary-gold"
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
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-heading-brown mb-6">
              Your Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-body-brown mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-light-gray"
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="jane@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-body-brown mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
                    placeholder="+234 800 000 0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-body-brown mb-1">
                  Special Requests (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-white focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all h-24 resize-none"
                  placeholder="Any allergies or specific concerns?"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-heading-brown mb-6">
              Payment Method
            </h3>

            <div className="space-y-4">
              <button
                onClick={() => setPaymentMethod("card")}
                className={cn(
                  "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4",
                  paymentMethod === "card"
                    ? "border-primary-gold bg-primary-gold/5"
                    : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    paymentMethod === "card"
                      ? "bg-primary-gold text-white"
                      : "bg-paper-bg text-body-brown",
                  )}
                >
                  <CreditCard size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-heading-brown text-lg">
                    Pay Online Now
                  </h4>
                  <p className="text-body-brown/70 text-sm">
                    Secure payment via Paystack/Stripe
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
                  "w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4",
                  paymentMethod === "spa"
                    ? "border-primary-gold bg-primary-gold/5"
                    : "border-light-gray/30 hover:border-primary-gold/50 bg-white",
                )}
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                    paymentMethod === "spa"
                      ? "bg-primary-gold text-white"
                      : "bg-paper-bg text-body-brown",
                  )}
                >
                  <User size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-heading-brown text-lg">
                    Pay at Spa
                  </h4>
                  <p className="text-body-brown/70 text-sm">
                    Pay via POS or cash after your treatment
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
            <div className="mt-8 bg-paper-bg p-6 rounded-2xl border border-light-gray/20">
              <h4 className="font-serif font-bold text-heading-brown mb-4">
                Booking Summary
              </h4>
              <div className="space-y-2 text-sm text-body-brown/80">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium text-heading-brown">
                    {SERVICES.find((s) => s.id === selectedService)?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Date & Time:</span>
                  <span className="font-medium text-heading-brown">
                    {format(selectedDate, "MMM d, yyyy")} at {selectedTime}
                  </span>
                </div>
                <div className="border-t border-light-gray/30 pt-2 mt-2 flex justify-between font-bold text-lg text-primary-gold">
                  <span>Total:</span>
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
          <div className="text-center py-12 space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h3 className="text-3xl font-serif font-bold text-heading-brown">
              Booking Confirmed!
            </h3>
            <p className="text-body-brown/80 max-w-md mx-auto text-lg">
              Thank you, {formData.name.split(" ")[0]}. Your appointment for{" "}
              <span className="font-bold">
                {SERVICES.find((s) => s.id === selectedService)?.title}
              </span>{" "}
              is confirmed for{" "}
              <span className="font-bold">
                {format(selectedDate, "MMM d")} at {selectedTime}
              </span>
              .
            </p>
            <p className="text-sm text-leaf-brown bg-peach-accent/30 p-4 rounded-xl inline-block mt-4">
              We've sent a confirmation email to {formData.email} with details.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="pt-24 md:pt-32 pb-20 bg-paper-bg min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-heading-brown mb-4">
            Book Appointment
          </h1>
          <p className="text-lg text-body-brown/80">
            Reserve your time for relaxation and rejuvenation.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-heading-brown/5 border border-light-gray/20 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-heading-brown/5 px-6 py-4 border-b border-light-gray/20 flex justify-between items-center overflow-x-auto hide-scrollbar">
            {STEPS.map((step, idx) => (
              <div key={step} className="flex items-center shrink-0">
                <div
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors",
                    currentStep > idx
                      ? "bg-primary-gold text-white"
                      : currentStep === idx
                        ? "bg-heading-brown text-white ring-4 ring-heading-brown/20"
                        : "bg-white text-light-gray border-2 border-light-gray/30",
                  )}
                >
                  {currentStep > idx ? <CheckCircle2 size={16} /> : idx + 1}
                </div>
                <span
                  className={cn(
                    "ml-3 text-sm font-medium hidden md:block",
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
                      "w-8 md:w-16 h-0.5 mx-2 md:mx-4 transition-colors",
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
          <div className="p-6 md:p-12 min-h-[400px]">
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
            <div className="p-6 md:p-8 border-t border-light-gray/20 bg-paper-bg/50 flex justify-between items-center">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  currentStep === 0
                    ? "opacity-0 pointer-events-none"
                    : "text-heading-brown hover:bg-white border border-light-gray/50",
                )}
              >
                <ChevronLeft size={18} /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className={cn(
                  "flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all",
                  canProceed()
                    ? "bg-primary-gold text-white hover:bg-primary-gold/90 hover:scale-105 shadow-md"
                    : "bg-light-gray/50 text-white cursor-not-allowed",
                )}
              >
                {currentStep === STEPS.length - 2
                  ? "Confirm Booking"
                  : "Continue"}{" "}
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
