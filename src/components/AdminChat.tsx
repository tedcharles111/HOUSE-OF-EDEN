import React, { useState, useEffect, useRef } from "react";
import { db, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, updateDoc } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Send, User, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminChat() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [activeSession, setActiveSession] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("lastTimestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSessions(data);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!activeSession) return;

    const q = query(
      collection(db, "chats", activeSession.id, "messages"),
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
  }, [activeSession]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeSession || !user) return;

    const messageData = {
      senderId: user.uid,
      senderName: "Admin",
      text: newMessage,
      timestamp: serverTimestamp(),
      chatId: activeSession.id,
    };

    try {
      await addDoc(collection(db, "chats", activeSession.id, "messages"), messageData);
      await updateDoc(doc(db, "chats", activeSession.id), {
        lastMessage: newMessage,
        lastTimestamp: serverTimestamp(),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-light-gray/20 shadow-sm overflow-hidden flex h-[600px]">
      {/* Sessions List */}
      <div className="w-1/3 border-r border-light-gray/20 overflow-y-auto">
        <div className="p-4 border-bottom border-light-gray/20 bg-paper-bg/50">
          <h2 className="font-medium text-heading-brown flex items-center gap-2">
            <MessageCircle size={18} />
            Active Chats
          </h2>
        </div>
        {sessions.length === 0 ? (
          <div className="p-8 text-center text-sm text-body-brown">No active chats.</div>
        ) : (
          sessions.map((session) => (
            <button
              key={session.id}
              onClick={() => setActiveSession(session)}
              className={`w-full p-4 text-left hover:bg-peach-accent/10 transition-colors border-b border-light-gray/10 ${
                activeSession?.id === session.id ? "bg-peach-accent/20" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary-gold/10 p-2 rounded-full text-primary-gold">
                  <User size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-heading-brown truncate">{session.userName}</span>
                  </div>
                  <p className="text-xs text-body-brown truncate">{session.lastMessage || "No messages yet"}</p>
                </div>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-paper-bg/30">
        {activeSession ? (
          <>
            <div className="p-4 border-b border-light-gray/20 bg-white flex items-center gap-3">
              <div className="bg-primary-gold/10 p-2 rounded-full text-primary-gold">
                <User size={18} />
              </div>
              <span className="font-medium text-heading-brown">{activeSession.userName}</span>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`flex ${msg.senderId === user?.uid ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm ${
                        msg.senderId === user?.uid
                          ? "bg-primary-gold text-white rounded-tr-none"
                          : "bg-white text-body-brown border border-light-gray/20 rounded-tl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <form onSubmit={sendMessage} className="p-4 bg-white border-t border-light-gray/20 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-paper-bg border border-light-gray/20 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-gold/20"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-primary-gold text-white p-2 rounded-xl hover:bg-primary-gold/90 transition-colors disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-body-brown opacity-50">
            <MessageCircle size={48} className="mb-2" />
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}
