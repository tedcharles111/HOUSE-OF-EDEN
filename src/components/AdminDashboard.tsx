import { useState, useEffect } from "react";
import { db, collection, query, orderBy, onSnapshot, doc, updateDoc } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { Calendar, MessageSquare, CheckCircle, XCircle, Clock, User } from "lucide-react";
import { AdminChat } from "./AdminChat";
import { motion } from "motion/react";

export function AdminDashboard() {
  const { isAdmin, loading } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "chat">("bookings");

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (!isAdmin) return <div className="pt-32 text-center">Access Denied</div>;

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-heading-brown">Admin Dashboard</h1>
        <div className="flex bg-paper-bg rounded-lg p-1 border border-light-gray/20">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "bookings" ? "bg-primary-gold text-white" : "text-body-brown hover:bg-light-gray/10"
            }`}
          >
            <Calendar size={18} />
            Bookings
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
              activeTab === "chat" ? "bg-primary-gold text-white" : "text-body-brown hover:bg-light-gray/10"
            }`}
          >
            <MessageSquare size={18} />
            Live Chat
          </button>
        </div>
      </div>

      {activeTab === "bookings" ? (
        <div className="grid gap-6">
          {bookings.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-light-gray/20">
              <p className="text-body-brown">No bookings found.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl border border-light-gray/20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-peach-accent/30 p-3 rounded-xl text-primary-gold">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-heading-brown text-lg">{booking.userName}</h3>
                    <p className="text-sm text-body-brown">{booking.userEmail}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-body-brown">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {booking.time}
                      </span>
                      <span className="font-medium text-primary-gold">{booking.serviceName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                    booking.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {booking.status}
                  </div>
                  <div className="flex gap-2 ml-auto md:ml-0">
                    {booking.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Confirm"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel"
                        >
                          <XCircle size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      ) : (
        <AdminChat />
      )}
    </div>
  );
}
