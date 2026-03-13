import React, { useState, useEffect, useRef } from "react";
import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, updateDoc, getDoc } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { MessageCircle, X, Send, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function ChatWidget() {
  const { user, profile, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || isAdmin) return;

    const initChat = async () => {
      const id = user.uid;
      setChatId(id);
      
      const chatDoc = await getDoc(doc(db, "chats", id));
      if (!chatDoc.exists()) {
        await setDoc(doc(db, "chats", id), {
          userId: user.uid,
          userName: profile?.displayName || user.displayName || "User",
          lastMessage: "",
          lastTimestamp: serverTimestamp(),
          unreadCount: 0,
        });
      }
    };

    initChat();
  }, [user, profile, isAdmin]);

  useEffect(() => {
    if (!chatId || !isOpen) return;

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(data);
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    });
    return () => unsubscribe();
  }, [chatId, isOpen]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !user) return;

    const messageData = {
      senderId: user.uid,
      senderName: profile?.displayName || user.displayName || "User",
      text: newMessage,
      timestamp: serverTimestamp(),
      chatId: chatId,
    };

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), messageData);
      await updateDoc(doc(db, "chats", chatId), {
        lastMessage: newMessage,
        lastTimestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (isAdmin) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-light-gray/20 overflow-hidden flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-primary-gold p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="font-medium">Live Support</h3>
                  <p className="text-xs opacity-80">We're online to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-paper-bg/30">
              {messages.length === 0 && (
                <div className="text-center py-10 text-body-brown opacity-60 text-sm">
                  <p>Hello! How can we help you today?</p>
                </div>
              )}
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.senderId === user?.uid ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.senderId === user?.uid
                        ? "bg-primary-gold text-white rounded-tr-none"
                        : "bg-white text-body-brown border border-light-gray/20 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-light-gray/20 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-paper-bg border border-light-gray/20 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-gold/20"
              />
              <button
                type="submit"
                disabled={!newMessage.trim() || !user}
                className="bg-primary-gold text-white p-2 rounded-xl hover:bg-primary-gold/90 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-gold text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all hover:shadow-xl active:scale-95 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
