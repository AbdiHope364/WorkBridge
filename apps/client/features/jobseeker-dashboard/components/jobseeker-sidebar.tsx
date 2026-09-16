"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import {
  HomeIcon,
  BriefcaseIcon,
  ChatBubbleLeftIcon,
  CreditCardIcon,
  UserIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { WorkBridgeLogo } from "@repo/ui";

export function JobseekerSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      if (logout) await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    {
      href: "/dashboard/jobseeker",
      label: "Dashboard",
      icon: HomeIcon,
      isActive: (p: string) => p === "/dashboard" || p === "/dashboard/jobseeker",
    },
    {
      href: "/dashboard/jobs",
      label: "Find Jobs",
      icon: BriefcaseIcon,
      isActive: (p: string) =>
        p === "/dashboard/jobs" ||
        p.startsWith("/dashboard/jobs/") ||
        p === "/dashboard/find-jobs" ||
        p.startsWith("/dashboard/find-jobs/"),
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: ChatBubbleLeftIcon,
      hasBadge: true,
      isActive: (p: string) =>
        p === "/dashboard/messages" ||
        p.startsWith("/dashboard/messages/") ||
        p === "/dashboard/chat" ||
        p.startsWith("/dashboard/chat/"),
    },
    {
      href: "/dashboard/payments",
      label: "Payments",
      icon: CreditCardIcon,
      isActive: (p: string) =>
        p === "/dashboard/payments" || p.startsWith("/dashboard/payments/"),
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: UserIcon,
      isActive: (p: string) =>
        p === "/dashboard/profile" || p.startsWith("/dashboard/profile/"),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Cog6ToothIcon,
      isActive: (p: string) =>
        p === "/dashboard/settings" || p.startsWith("/dashboard/settings/"),
    },
  ];

  // Mobile Bottom Nav items (top 5 most critical)
  const bottomNavLinks = [
    {
      href: "/dashboard/jobseeker",
      label: "Home",
      icon: HomeIcon,
      isActive: (p: string) => p === "/dashboard" || p === "/dashboard/jobseeker",
    },
    {
      href: "/dashboard/jobs",
      label: "Jobs",
      icon: BriefcaseIcon,
      isActive: (p: string) =>
        p === "/dashboard/jobs" ||
        p.startsWith("/dashboard/jobs/") ||
        p === "/dashboard/find-jobs" ||
        p.startsWith("/dashboard/find-jobs/"),
    },
    {
      href: "/dashboard/messages",
      label: "Messages",
      icon: ChatBubbleLeftIcon,
      hasBadge: true,
      isActive: (p: string) =>
        p === "/dashboard/messages" ||
        p.startsWith("/dashboard/messages/") ||
        p === "/dashboard/chat" ||
        p.startsWith("/dashboard/chat/"),
    },
    {
      href: "/dashboard/payments",
      label: "Payments",
      icon: CreditCardIcon,
      isActive: (p: string) =>
        p === "/dashboard/payments" || p.startsWith("/dashboard/payments/"),
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Cog6ToothIcon,
      isActive: (p: string) =>
        p === "/dashboard/settings" || p.startsWith("/dashboard/settings/"),
    },
  ];

  return (
    <>
      {/* ========================================================= */}
      {/* 1. Mobile Top Bar (Sticky on phones, hidden on desktop)   */}
      {/* ========================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 md:hidden shadow-xs">
        <Link
          href="/dashboard/jobseeker"
          className="flex items-center gap-2"
        >
          <WorkBridgeLogo className="h-8 w-auto max-w-[170px]" />
        </Link>

        <div className="flex items-center gap-2">
          {/* Direct link to messages */}
          <Link
            href="/dashboard/messages"
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
            aria-label="Messages"
          >
            <ChatBubbleLeftIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </Link>

          {/* Drawer Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
          >
            {isDrawerOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. Mobile Backdrop Overlay & Sliding Navigation Drawer    */}
      {/* ========================================================= */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs md:hidden animate-fade-in"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Brand Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/60 to-white">
          <Link
            href="/dashboard/jobseeker"
            onClick={() => setIsDrawerOpen(false)}
            className="flex items-center"
          >
            <WorkBridgeLogo className="h-9 w-auto max-w-[190px]" />
          </Link>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-700 text-amber-200 font-black text-sm flex items-center justify-center shadow-xs">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-black text-slate-900 truncate">
                {user?.fullName || "Trades Professional"}
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                <SparklesIcon className="w-3 h-3" />
                <span>0% Commission Account</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navLinks.map((link) => {
            const isItemActive = link.isActive(pathname);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isItemActive
                    ? "bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${isItemActive ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span>{link.label}</span>
                </div>
                {link.hasBadge && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-100 transition-colors disabled:opacity-50"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 3. Mobile Bottom Navigation Bar (Sticky on phones)        */}
      {/* ========================================================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around bg-white/95 backdrop-blur-md border-t border-slate-200 py-1 px-1 md:hidden shadow-lg safe-area-bottom">
        {bottomNavLinks.map((tab) => {
          const isItemActive = tab.isActive(pathname);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-xl text-[10px] font-bold transition-all relative ${
                isItemActive
                  ? "text-emerald-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isItemActive ? "text-emerald-600" : "text-slate-400"}`} />
                {tab.hasBadge && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-1 ring-white" />
                )}
              </div>
              <span className="mt-0.5 truncate">{tab.label}</span>
              {isItemActive && (
                <span className="w-4 h-0.5 rounded-full bg-emerald-600 mt-0.5" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ========================================================= */}
      {/* 4. Desktop Sidebar (Sticky on laptop / desktop viewports) */}
      {/* ========================================================= */}
      <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 h-screen sticky top-0 flex-col shrink-0 z-20">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link
            href="/dashboard/jobseeker"
            className="flex items-center"
          >
            <WorkBridgeLogo className="h-9 w-auto max-w-[200px]" />
          </Link>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navLinks.map((link) => {
            const isItemActive = link.isActive(pathname);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isItemActive
                    ? "bg-emerald-50 text-emerald-700 shadow-xs border border-emerald-100"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${isItemActive ? "text-emerald-600" : "text-slate-400"}`}
                  />
                  <span>{link.label}</span>
                </div>
                {link.hasBadge && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-amber-200 font-black text-xs flex items-center justify-center shrink-0">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user?.fullName || "Trades Professional"}
              </p>
              <p className="text-[10px] text-emerald-600 font-semibold truncate">
                0% Fee Direct Trade
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}
