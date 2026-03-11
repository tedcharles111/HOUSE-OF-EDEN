import { useState } from "react";
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

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "bookings", label: "Bookings", icon: CalendarCheck },
  { id: "services", label: "Services", icon: Scissors },
  { id: "staff", label: "Staff", icon: Users },
  { id: "chat", label: "Live Chat", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

const REVENUE_DATA = [
  { name: "Mon", value: 400000 },
  { name: "Tue", value: 300000 },
  { name: "Wed", value: 550000 },
  { name: "Thu", value: 450000 },
  { name: "Fri", value: 700000 },
  { name: "Sat", value: 900000 },
  { name: "Sun", value: 850000 },
];

const BOOKINGS_DATA = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 8 },
  { name: "Wed", value: 15 },
  { name: "Thu", value: 10 },
  { name: "Fri", value: 22 },
  { name: "Sat", value: 30 },
  { name: "Sun", value: 28 },
];

export function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-paper-bg flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-light-gray/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-4">
              HE
            </div>
            <h1 className="text-2xl font-serif font-bold text-heading-brown">
              Admin Login
            </h1>
            <p className="text-body-brown/70">House Of Eden Dashboard</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthenticated(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-body-brown mb-1">
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@houseofeden.com"
                className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-body-brown mb-1">
                Password
              </label>
              <input
                type="password"
                defaultValue="password"
                className="w-full px-4 py-3 rounded-xl border border-light-gray/30 bg-paper-bg/50 focus:outline-none focus:border-primary-gold focus:ring-1 focus:ring-primary-gold transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-heading-brown text-white px-8 py-4 rounded-xl font-medium hover:bg-heading-brown/90 transition-all hover:shadow-lg mt-6"
            >
              Sign In
            </button>
          </form>
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
            onClick={() => setIsAuthenticated(false)}
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
            onClick={() => setIsAuthenticated(false)}
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
                        Total Revenue (This Week)
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        NGN 4.15M
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                    <TrendingUp size={14} /> +12.5% from last week
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-body-brown/70 mb-1">
                        Total Bookings (This Week)
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        125
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <CalendarCheck size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                    <TrendingUp size={14} /> +8.2% from last week
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm font-medium text-body-brown/70 mb-1">
                        New Clients
                      </p>
                      <h3 className="text-2xl font-bold text-heading-brown">
                        42
                      </h3>
                    </div>
                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                      <UserCheck size={20} />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 flex items-center gap-1 font-medium">
                    <TrendingUp size={14} /> +15.3% from last week
                  </p>
                </div>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <h3 className="text-lg font-bold text-heading-brown mb-6">
                    Revenue Trend
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={REVENUE_DATA}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#EED2C4"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#8A6B54", fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#8A6B54", fontSize: 12 }}
                          tickFormatter={(val) => `₦${val / 1000}k`}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                          formatter={(value: number) => [
                            `NGN ${value.toLocaleString()}`,
                            "Revenue",
                          ]}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#CFA64A"
                          strokeWidth={3}
                          dot={{
                            r: 4,
                            fill: "#CFA64A",
                            strokeWidth: 2,
                            stroke: "#fff",
                          }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-light-gray/20">
                  <h3 className="text-lg font-bold text-heading-brown mb-6">
                    Bookings Overview
                  </h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={BOOKINGS_DATA}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          vertical={false}
                          stroke="#EED2C4"
                        />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#8A6B54", fontSize: 12 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#8A6B54", fontSize: 12 }}
                        />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                          }}
                          cursor={{ fill: "#F5F1ED" }}
                        />
                        <Bar
                          dataKey="value"
                          fill="#3A2A22"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Recent Bookings Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-light-gray/20 overflow-hidden">
                <div className="p-6 border-b border-light-gray/20 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-heading-brown">
                    Recent Bookings
                  </h3>
                  <button className="text-sm font-medium text-primary-gold hover:underline">
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
                        <th className="px-6 py-4">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light-gray/20">
                      {[
                        {
                          client: "Jane Doe",
                          service: "Hydra Facial",
                          date: "Today, 2:00 PM",
                          status: "Confirmed",
                          amount: "NGN 35,000",
                        },
                        {
                          client: "Michael Smith",
                          service: "Full Body Lipo",
                          date: "Today, 4:30 PM",
                          status: "Pending",
                          amount: "NGN 145,000",
                        },
                        {
                          client: "Sarah Johnson",
                          service: "Teeth Whitening",
                          date: "Tomorrow, 10:00 AM",
                          status: "Confirmed",
                          amount: "NGN 70,000",
                        },
                        {
                          client: "Emily Davis",
                          service: "Fruit Pedicure",
                          date: "Tomorrow, 1:00 PM",
                          status: "Completed",
                          amount: "NGN 13,000",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="hover:bg-paper-bg/30 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-heading-brown">
                            {row.client}
                          </td>
                          <td className="px-6 py-4 text-body-brown">
                            {row.service}
                          </td>
                          <td className="px-6 py-4 text-body-brown">
                            {row.date}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                row.status === "Confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700",
                              )}
                            >
                              {row.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 font-medium text-heading-brown">
                            {row.amount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab !== "dashboard" && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-light-gray/20 flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="w-20 h-20 bg-paper-bg rounded-full flex items-center justify-center text-primary-gold mb-6">
                {TABS.find((t) => t.id === activeTab)?.icon({ size: 40 })}
              </div>
              <h2 className="text-2xl font-serif font-bold text-heading-brown mb-2">
                {TABS.find((t) => t.id === activeTab)?.label} Management
              </h2>
              <p className="text-body-brown/70 max-w-md">
                This module is currently under development. In a full
                implementation, this would connect to the headless CMS and
                database to manage {activeTab}.
              </p>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
