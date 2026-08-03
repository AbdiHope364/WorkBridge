// components/jobseeker-sidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  BookmarkIcon,
  BriefcaseIcon,
  HomeIcon,
  MessageIcon,
  SearchJobIcon,
} from "./dashboard-icons";
import { useAuth } from "@/contexts/auth-context";

export function JobseekerSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-between bg-[#022c22] px-6 text-white shadow-lg">
        <Link href="/" className="font-bold text-xl tracking-tighter">
          WorkBridge
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-white/10"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 transform bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#0d9488] text-white transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:h-screen md:translate-x-0 md:w-64 md:shrink-0 flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center border-b border-white/10 px-8 shrink-0">
          <Link href="/" className="flex items-center gap-3 font-black text-xl">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#064e3b]">
              W
            </div>
            WorkBridge
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {[
              {
                label: "Find Jobs",
                href: "/dashboard/find-jobs",
                icon: SearchJobIcon,
              },
              {
                label: "Applications",
                href: "/dashboard/applications",
                icon: BriefcaseIcon,
              },
              {
                label: "Saved Jobs",
                href: "/dashboard/saved-jobs",
                icon: BookmarkIcon,
              },
              { label: "Overview", href: "/dashboard", icon: HomeIcon },
              {
                label: "Messages",
                href: "/dashboard/messages",
                icon: MessageIcon,
              },
              {
                label: "Notifications",
                href: "/dashboard/notifications",
                icon: BellIcon,
              },
            ].map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex h-12 items-center gap-3 rounded-xl px-4 text-sm font-bold transition-all ${
                      isActive
                        ? "bg-white text-[#022c22] shadow-lg"
                        : "text-emerald-50/70 hover:bg-white/10"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${isActive ? "text-[#022c22]" : "text-emerald-200/50"}`}
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-white/10 shrink-0">
          <button
            onClick={() => logout()}
            className="w-full h-11 rounded-xl border border-white/20 bg-transparent text-white text-xs font-black tracking-widest hover:bg-red-500/20 transition-all uppercase"
          >
            LOG OUT
          </button>
        </div>
      </aside>
    </>
  );
}
