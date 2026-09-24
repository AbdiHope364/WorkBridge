"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  FileText,
  CheckCircle2,
  Flag,
  CreditCard,
  Bell,
  BarChart3,
  Settings,
  ChevronRight,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { useSidebar } from "@/context/sidebar-context";
import { WorkBridgeLogo } from "@repo/ui";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Jobseeker Management", href: "/jobseekers" },
  { icon: Building2, label: "Employer Management", href: "/employers" },
  { icon: Briefcase, label: "Job Management", href: "/jobs" },
  { icon: FileText, label: "Applications", href: "/applications" },
  { icon: CheckCircle2, label: "Verification Center", href: "/verification" },
  { icon: Flag, label: "Reports & Moderation", href: "/reports-moderation" },
  {
    icon: CreditCard,
    label: "Subscription & Payments",
    href: "/subscription-payments",
  },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    close();
    await logout();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={close}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs transition-opacity lg:hidden animate-in fade-in"
          aria-hidden="true"
        />
      )}

      {/* Main Responsive Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#0B132B] via-[#0E1A38] to-[#060B18] text-white flex flex-col overflow-y-auto z-50 transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none border-r border-slate-800/60",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo Section with Mobile Close Button */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
          <Link href="/" onClick={close} className="flex items-center">
            <WorkBridgeLogo theme="dark" className="h-9 w-auto max-w-[180px]" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/60 text-white transition-colors lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-6 py-4 text-center border-b border-slate-800/80">
          <div className="relative inline-block">
            <div className="w-14 h-14 rounded-full border-2 border-blue-500/40 flex items-center justify-center mb-1.5 mx-auto overflow-hidden bg-blue-950/50 shadow-inner">
              <Users className="w-7 h-7 text-blue-200" />
            </div>
            <div className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#0B132B] rounded-full" />
          </div>
          <h3 className="text-base font-bold leading-tight truncate">
            {user?.name || "System Admin"}
          </h3>
          <p className="text-[11px] text-slate-400 truncate mt-0.5">
            {user?.email || "admin@example.com"}
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={close}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium",
                  isActive
                    ? "bg-blue-600/30 text-white font-bold border-l-4 border-blue-400 pl-2.5 shadow-sm"
                    : "hover:bg-slate-800/60 text-slate-300 hover:text-white",
                )}
              >
                <item.icon
                  className={cn(
                    "w-4 h-4 shrink-0",
                    isActive
                      ? "text-blue-400"
                      : "text-slate-400 group-hover:text-white",
                  )}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Card */}
        <div className="p-3 mt-auto border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full bg-[#131F3F] hover:bg-[#1C2C58] rounded-xl p-3.5 relative overflow-hidden group border border-blue-900/40 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="bg-blue-500/20 p-2 rounded-lg shrink-0">
                <LogOut className="w-4 h-4 text-blue-300" />
              </div>

              <div className="text-left overflow-hidden">
                <h4 className="text-xs font-bold text-white leading-tight">
                  Logout
                </h4>
                <p className="text-[9px] text-slate-400 uppercase tracking-wider font-bold mt-0.5 truncate">
                  End Current Session
                </p>
              </div>
            </div>

            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
}
