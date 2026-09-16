"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { SVGProps } from "react";
import { useAuth } from "@/contexts/auth-context";
import { WorkBridgeLogo } from "@repo/ui";

type IconProps = SVGProps<SVGSVGElement>;

/** --- Icons Component --- */
const Icons = {
  Home: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Jobs: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <line x1="3" x2="21" y1="6" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  ),
  Users: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Chat: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  ),
  Bell: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Profile: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  ),
  Logout: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Menu: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  XClose: (p: IconProps) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...p}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const navigationItems = [
  { label: "Overview", href: "/dashboard/employer", icon: Icons.Home },
  { label: "My Jobs", href: "/dashboard/employer/my-jobs", icon: Icons.Jobs },
  {
    label: "Applications",
    href: "/dashboard/employer/applications",
    icon: Icons.Users,
  },
  { label: "Messages", href: "/dashboard/employer/messages", icon: Icons.Chat },
  {
    label: "Notifications",
    href: "/dashboard/employer/notifications",
    icon: Icons.Bell,
  },
  {
    label: "Profile",
    href: "/dashboard/employer/profile",
    icon: Icons.Profile,
  },
  {
    label: "Find Workers",
    href: "/dashboard/employer/find-workers",
    icon: Icons.Users,
  },
];

const mobileBottomNavItems = [
  { label: "Overview", href: "/dashboard/employer", icon: Icons.Home },
  { label: "My Jobs", href: "/dashboard/employer/my-jobs", icon: Icons.Jobs },
  { label: "Applicants", href: "/dashboard/employer/applications", icon: Icons.Users },
  { label: "Messages", href: "/dashboard/employer/messages", icon: Icons.Chat },
  { label: "Profile", href: "/dashboard/employer/profile", icon: Icons.Profile },
];

export function EmployerSidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* --- Mobile Top Nav (Sticky on phones, hidden on desktop) --- */}
      <div className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 md:hidden shadow-xs">
        <Link href="/dashboard/employer" className="flex items-center">
          <WorkBridgeLogo className="h-8 w-auto max-w-[170px]" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-xl p-2 text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <Icons.XClose className="h-6 w-6" />
          ) : (
            <Icons.Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* --- Mobile Backdrop Overlay --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- Mobile Sliding Off-Canvas Drawer --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#172653] text-white shadow-2xl transition-transform duration-300 ease-out md:sticky md:top-0 md:h-screen md:w-64 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-20 shrink-0 items-center justify-between px-6 border-b border-white/10">
          <Link href="/dashboard/employer" className="flex items-center">
            <WorkBridgeLogo theme="dark" className="h-9 w-auto max-w-[190px]" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <Icons.XClose className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/dashboard/employer"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="mt-auto border-t border-white/10 p-4 shrink-0">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-300 transition-all hover:bg-red-500/20 hover:text-red-400 disabled:opacity-50"
          >
            <Icons.Logout className="h-5 w-5" />
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* --- Mobile Bottom Navigation Bar --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-1 md:hidden shadow-lg safe-area-bottom">
        {mobileBottomNavItems.map((tab) => {
          const isItemActive =
            tab.href === "/dashboard/employer"
              ? pathname === tab.href
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all ${
                isItemActive
                  ? "text-teal-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <Icon className={`w-5 h-5 ${isItemActive ? "text-teal-600" : "text-slate-400"}`} />
              <span className="mt-0.5 truncate">{tab.label}</span>
              {isItemActive && (
                <span className="w-4 h-0.5 rounded-full bg-teal-600 mt-0.5" />
              )}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
