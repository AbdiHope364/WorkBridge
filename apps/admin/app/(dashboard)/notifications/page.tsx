"use client";

import React from "react";
import {
  Bell,
  ShieldCheck,
  Briefcase,
  Users,
  AlertTriangle,
  Info,
  CheckCircle2,
  Trash2,
  Circle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "verification" | "job" | "user" | "system" | "alert";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "verification",
    title: "New Verification Request",
    message: "Abdisa Leta has submitted identity documents for verification.",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "job",
    title: "Job Post Pending Approval",
    message:
      'TechCorp Solutions posted a new job: "Senior React Developer" awaiting review.',
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "alert",
    title: "Suspicious Activity Detected",
    message:
      "Multiple failed login attempts from IP 192.168.1.45 for account mark@example.com.",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "4",
    type: "user",
    title: "New Employer Registered",
    message:
      "Green Energy Ltd has registered and is pending profile completion.",
    time: "3 hr ago",
    read: true,
  },
  {
    id: "5",
    type: "system",
    title: "System Update Successful",
    message: "Platform upgraded to v2.4.1. All services are running normally.",
    time: "5 hr ago",
    read: true,
  },
  {
    id: "6",
    type: "verification",
    title: "Verification Approved",
    message: "Sara Ahmed's identity has been verified successfully.",
    time: "Yesterday",
    read: true,
  },
  {
    id: "7",
    type: "job",
    title: "Job Post Rejected",
    message:
      '"Construction Manager" posted by Abdisa Leta was rejected for incomplete details.',
    time: "Yesterday",
    read: true,
  },
  {
    id: "8",
    type: "alert",
    title: "High Application Volume",
    message:
      '"Backend Engineer" at Green Energy Ltd received 200+ applications in 24 hours.',
    time: "2 days ago",
    read: true,
  },
  {
    id: "9",
    type: "user",
    title: "User Suspended",
    message:
      "Admin action: Mark Smith's account has been suspended for ToS violations.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "10",
    type: "system",
    title: "Scheduled Maintenance",
    message:
      "Platform maintenance is scheduled for June 28, 2025 at 02:00 AM UTC.",
    time: "3 days ago",
    read: true,
  },
];

const typeConfig = {
  verification: {
    icon: ShieldCheck,
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    label: "Verification",
  },
  job: {
    icon: Briefcase,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    label: "Jobs",
  },
  user: {
    icon: Users,
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    label: "Users",
  },
  alert: {
    icon: AlertTriangle,
    bg: "bg-rose-50",
    iconColor: "text-rose-600",
    label: "Alerts",
  },
  system: {
    icon: Info,
    bg: "bg-slate-50",
    iconColor: "text-slate-500",
    label: "System",
  },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const [activeFilter, setActiveFilter] = React.useState<
    "All" | "Unread" | "verification" | "job" | "user" | "alert" | "system"
  >("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.read;
    return n.type === activeFilter;
  });

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  const deleteNotif = (id: string) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Page Header */}
      <header className="flex-shrink-0 px-10 py-6 bg-[#F8FAFC] flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
            Notifications
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-0.5">
            Stay updated on platform activity
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-rose-600 uppercase tracking-wider">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Mark All as Read
          </button>
        )}
      </header>

      <main className="flex-1 min-h-0 px-10 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Left: Filters sidebar */}
          <div className="lg:col-span-1 space-y-4 sticky top-0 self-start max-h-[calc(100vh-120px)] overflow-y-auto pb-4">
            {/* Quick Filters */}
            <div className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-100">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">
                Filter By
              </p>
              <div className="space-y-0.5">
                {(
                  [
                    { key: "All", label: "All Notifications", icon: Bell },
                    { key: "Unread", label: "Unread", icon: Circle },
                  ] as const
                ).map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left",
                      activeFilter === key
                        ? "bg-emerald-500 text-white"
                        : "text-slate-500 hover:bg-slate-50",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                    {key === "Unread" && unreadCount > 0 && (
                      <span
                        className={cn(
                          "ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-black",
                          activeFilter === key
                            ? "bg-white/30 text-white"
                            : "bg-rose-100 text-rose-600",
                        )}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="border-t border-slate-50 mt-4 pt-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-2">
                  By Type
                </p>
                <div className="space-y-0.5">
                  {(
                    Object.entries(typeConfig) as [
                      Notification["type"],
                      (typeof typeConfig)[keyof typeof typeConfig],
                    ][]
                  ).map(([key, cfg]) => {
                    const count = notifications.filter(
                      (n) => n.type === key && !n.read,
                    ).length;
                    return (
                      <button
                        key={key}
                        onClick={() => setActiveFilter(key)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-black transition-all text-left",
                          activeFilter === key
                            ? "bg-emerald-500 text-white"
                            : "text-slate-500 hover:bg-slate-50",
                        )}
                      >
                        <div
                          className={cn(
                            "p-1.5 rounded-lg",
                            activeFilter === key ? "bg-white/20" : cfg.bg,
                          )}
                        >
                          <cfg.icon
                            className={cn(
                              "w-3.5 h-3.5",
                              activeFilter === key
                                ? "text-white"
                                : cfg.iconColor,
                            )}
                          />
                        </div>
                        {cfg.label}
                        {count > 0 && (
                          <span
                            className={cn(
                              "ml-auto text-[9px] px-1.5 py-0.5 rounded-full font-black",
                              activeFilter === key
                                ? "bg-white/30 text-white"
                                : "bg-rose-100 text-rose-600",
                            )}
                          >
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-gradient-to-br from-[#00D47E] to-[#049B74] rounded-[1.5rem] p-6 text-white">
              <Bell className="w-8 h-8 text-white/70 mb-4" />
              <h4 className="text-lg font-black leading-tight">
                All Caught Up!
              </h4>
              <p className="text-white/70 text-xs font-bold mt-2 leading-relaxed">
                {unreadCount === 0
                  ? "No unread notifications. You're up to date."
                  : `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""} requiring attention.`}
              </p>
            </div>
          </div>

          {/* Right: Notification List */}
          <div className="lg:col-span-3 overflow-y-auto max-h-[calc(100vh-120px)] pb-4">
            <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-300">
                  <Bell className="w-16 h-16 mb-4" />
                  <p className="text-sm font-black uppercase tracking-widest">
                    No notifications here
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-slate-50">
                  {filtered.map((notif) => {
                    const cfg = typeConfig[notif.type];
                    return (
                      <li
                        key={notif.id}
                        onClick={() => markRead(notif.id)}
                        className={cn(
                          "flex items-start gap-4 px-6 py-5 cursor-pointer transition-colors hover:bg-slate-50/50",
                          !notif.read && "bg-emerald-50/30",
                        )}
                      >
                        {/* Icon */}
                        <div
                          className={cn(
                            "p-3 rounded-2xl flex-shrink-0 mt-0.5",
                            cfg.bg,
                          )}
                        >
                          <cfg.icon className={cn("w-5 h-5", cfg.iconColor)} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p
                              className={cn(
                                "text-sm tracking-tight",
                                notif.read
                                  ? "font-bold text-slate-700"
                                  : "font-black text-slate-900",
                              )}
                            >
                              {notif.title}
                            </p>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                                {notif.time}
                              </span>
                              {!notif.read && (
                                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                          <div className="flex items-center gap-2 mt-3">
                            <span
                              className={cn(
                                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md",
                                cfg.bg,
                                cfg.iconColor,
                              )}
                            >
                              {cfg.label}
                            </span>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotif(notif.id);
                          }}
                          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all flex-shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50">
                  <p className="text-[11px] font-bold text-slate-500 italic">
                    Showing{" "}
                    <span className="text-slate-800">
                      1 to {filtered.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-slate-800">
                      {notifications.length}
                    </span>
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {[1, 2, 3].map((p) => (
                      <button
                        key={p}
                        className={cn(
                          "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all",
                          p === 1
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                            : "text-slate-500 hover:bg-slate-50",
                        )}
                      >
                        {p}
                      </button>
                    ))}
                    <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
