import { useState } from "react";
import type { FormEvent } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! Welcome to House of Eden 🌿 How can we help you today?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), text: input, isBot: false };
    setMessages([...messages, newMsg]);
    setInput("");

    // Simulate bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks for your message! Our team will get back to you shortly. Would you like to book an appointment?",
          isBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 w-14 h-14 bg-primary-gold rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform z-40",
          isOpen && "hidden",
        )}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-paper-bg rounded-full"></span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[350px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-light-gray/20"
          >
            {/* Header */}
            <div className="bg-heading-brown text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center font-serif font-bold">
                  HE
                </div>
                <div>
                  <h3 className="font-medium">House Of Eden</h3>
                  <p className="text-xs text-white/70 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-paper-bg/30 flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                    msg.isBot
                      ? "bg-white border border-light-gray/20 text-body-brown self-start rounded-tl-sm"
                      : "bg-primary-gold text-white self-end rounded-tr-sm",
                  )}
                >
                  {msg.text}
                </div>
              ))}
              {/* Quick Replies */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Book Appointment", "Price List", "Working Hours"].map(
                    (reply) => (
                      <button
                        key={reply}
                        onClick={() => setInput(reply)}
                        className="text-xs border border-primary-gold text-primary-gold px-3 py-1.5 rounded-full hover:bg-primary-gold hover:text-white transition-colors"
                      >
                        {reply}
                      </button>
                    ),
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSend}
              className="p-3 bg-white border-t border-light-gray/20 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-paper-bg/50 border border-light-gray/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-gold"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-10 h-10 bg-primary-gold text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-gold/90 transition-colors shrink-0"
              >
                <Send size={18} className="ml-0.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
