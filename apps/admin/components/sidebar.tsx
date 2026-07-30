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
  HeadphonesIcon,
  ChevronRight,
  Compass,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

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
  const { logout } = useAuth();
  const pathname = usePathname();

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (!confirmed) return;

    await logout();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-[#00D47E] to-[#049B74] text-white flex flex-col overflow-y-auto">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white/20 p-2 rounded-xl">
          <Compass className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight">WorkBridge</span>
      </div>

      {/* User Profile */}
      <div className="px-6 mb-6 text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center mb-2 mx-auto overflow-hidden bg-white/10">
            <Users className="w-8 h-8 text-white/80" />
          </div>
          <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-400 border-2 border-[#00D47E] rounded-full" />
        </div>
        <h3 className="text-lg font-semibold leading-tight">Admin</h3>
        <p className="text-xs text-white/70">admin@workbridge.com</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all duration-200 group",
                isActive ? "bg-white/20 shadow-sm" : "hover:bg-white/10",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive
                    ? "text-white"
                    : "text-white/70 group-hover:text-white",
                )}
              />
              <span
                className={cn(
                  "text-sm font-medium",
                  isActive
                    ? "text-white"
                    : "text-white/70 group-hover:text-white",
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      {/* Logout Card */}
      <div className="p-3 mt-4">
        <button
          onClick={handleLogout}
          className="w-full bg-[#038363] rounded-xl p-4 relative overflow-hidden group border border-white/10 hover:bg-green-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <LogOut className="w-5 h-5 text-white" />
            </div>

            <div className="text-left">
              <h4 className="text-sm font-bold text-white leading-tight">
                Logout
              </h4>

              <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold mt-0.5">
                End Current Session
              </p>
            </div>
          </div>

          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </button>
      </div>
      {/* Help Card
      <div className="p-3 mt-0">
        <div className="bg-[#038363] rounded-xl p-4 relative overflow-hidden group cursor-pointer border border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <HeadphonesIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white leading-tight">
                Need Help?
              </h4>
              <p className="text-[10px] text-white/70 uppercase tracking-wider font-bold mt-0.5">
                Contact Support
              </p>
            </div>
          </div>
          <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
        </div>
      </div> */}
    </aside>
  );
}
