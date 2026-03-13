import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  CalendarCheck,
  Scissors,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  UserCheck,
  CheckCircle,
  XCircle,
  Clock,
  User as UserIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useAuth } from "../contexts/AuthContext";
import { auth, googleProvider, signInWithPopup, signOut, db, collection, query, orderBy, onSnapshot, doc, updateDoc, limit } from "../firebase";
import { AdminChat } from "../components/AdminChat";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "chat", label: "Live Chat", icon: MessageSquare },
];

export function Admin() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    newClients: 0
  });

  useEffect(() => {
    if (!isAdmin) return;

    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBookings(data);
      
      // Simple stats calculation
      setStats({
        totalRevenue: data.length * 25000, // Mock calculation
        totalBookings: data.length,
        newClients: Math.floor(data.length * 0.3)
      });
    });

    return () => unsubscribe();
  }, [isAdmin]);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "bookings", id), { status });
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (loading) return <div className="min-h-screen bg-paper-bg flex items-center justify-center">Loading...</div>;

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-paper-bg flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-light-gray/20 text-center">
          <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-4">
            HE
          </div>
          <h1 className="text-2xl font-serif font-bold text-heading-brown mb-2">
            Admin Access
          </h1>
          <p className="text-body-brown/70 mb-8">Please sign in with an authorized admin account.</p>
          
          <button
            onClick={handleLogin}
            className="w-full bg-heading-brown text-white px-8 py-4 rounded-xl font-medium hover:bg-heading-brown/90 transition-all hover:shadow-lg flex items-center justify-center gap-3"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            Sign In with Google
          </button>
          
          {user && !isAdmin && (
            <p className="mt-4 text-red-500 text-sm">
              Account {user.email} is not authorized as an admin.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-heading-brown text-white hidden md:flex flex-col fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-primary-gold rounded-full flex items-center justify-center font-serif font-bold text-xl">
            HE
          </div>
          <span className="font-serif font-bold text-xl tracking-tight">
            Admin
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium",
                activeTab === tab.id
                  ? "bg-primary-gold text-white shadow-md"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-400"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-gold rounded-full flex items-center justify-center text-white font-serif font-bold">
              HE
            </div>
            <span className="font-serif font-bold text-heading-brown">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-body-brown"
          >
            <LogOut size={20} />
          </button>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                Dashboard Overview
              </h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-body-brown/70 mb-1">
                        Est. Revenue
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        ₦{stats.totalRevenue.toLocaleString()}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <DollarSign size={20} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-body-brown/70 mb-1">
                        Total Bookings
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        {stats.totalBookings}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <CalendarCheck size={20} />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-body-brown/70 mb-1">
                        Est. New Clients
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        {stats.newClients}
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <UserCheck size={20} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-gray/20 overflow-hidden">
                <div className="p-6 border-b border-light-gray/20 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-heading-brown">
                    Recent Bookings
                  </h3>
                  <button onClick={() => setActiveTab("bookings")} className="text-sm font-medium text-primary-gold hover:underline">
                    View All
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-paper-bg/50 text-body-brown/70 font-medium">
                      <tr>
                        <th className="px-6 py-4">Client</th>
                        <th className="px-6 py-4">Service</th>
                        <th className="px-6 py-4">Date & Time</th>
                        <th className="px-6 py-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light-gray/20">
                      {bookings.slice(0, 5).map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-paper-bg/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-heading-brown">
                            {row.userName}
                          </td>
                          <td className="px-6 py-4 text-body-brown">
                            {row.serviceName}
                          </td>
                          <td className="px-6 py-4 text-body-brown">
                            {row.date} {row.time}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                row.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-red-100 text-red-700",
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {bookings.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-6 py-10 text-center text-body-brown/50">
                            No bookings yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                All Bookings
              </h2>
              <div className="grid gap-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white p-6 rounded-2xl border border-light-gray/20 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-peach-accent/30 p-3 rounded-xl text-primary-gold">
                        <UserIcon size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-heading-brown text-lg">{booking.userName}</h3>
                        <p className="text-sm text-body-brown">{booking.userEmail}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-body-brown">
                          <span className="flex items-center gap-1">
                            <CalendarCheck size={14} /> {booking.date}
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
                  </div>
                ))}
                {bookings.length === 0 && (
                  <div className="text-center py-20 bg-white rounded-2xl border border-light-gray/20">
                    <p className="text-body-brown">No bookings found.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "chat" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-6">
                Live Customer Chat
              </h2>
              <AdminChat />
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
