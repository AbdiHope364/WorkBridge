"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Briefcase, Users, Sparkles } from "lucide-react";
import { WorkBridgeLogo } from "@repo/ui";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/contact-us", label: "Help" },
];

function LogoMark() {
  return (
    <WorkBridgeLogo className="h-10 sm:h-11 md:h-12 w-auto max-w-[190px] sm:max-w-[220px]" />
  );
}

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Track scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const isActive = (href: string) => {
    const linkPath = href.split("#")[0] ?? "";
    if (href === "/") return pathname === "/";
    if (linkPath !== "" && pathname.startsWith(linkPath)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all duration-200 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <nav className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex h-16 sm:h-20 items-center justify-between w-full">
            {/* Logo - Left */}
            <Link
              href="/"
              aria-label="Workbridge home"
              className="shrink-0 transition-transform hover:scale-105 active:scale-95 flex items-center"
            >
              <LogoMark />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 xl:gap-10 text-sm xl:text-[16px] font-bold text-slate-950">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative whitespace-nowrap transition-colors duration-200 group py-1 ${
                      active
                        ? "text-emerald-600"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {link.label}
                    {/* Underline on hover or active */}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-emerald-500 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Menu Toggle Button - Always visible on the far right */}
            <div className="flex items-center justify-end shrink-0">
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center justify-center h-8.5 w-8.5 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl border border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-950 active:scale-95 transition-all cursor-pointer shrink-0 shadow-2xs"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                ) : (
                  <Menu className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Drawer Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sliding Menu Drawer */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-72 sm:w-84 flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header with Logo and Close Button on far right */}
          <div className="flex items-center justify-between border-b border-slate-100 px-3.5 py-3 sm:p-4 bg-gradient-to-r from-emerald-50/60 to-white">
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="shrink-0 transition-transform hover:scale-105 flex items-center"
            >
              <WorkBridgeLogo className="h-7 sm:h-9 w-auto max-w-[140px] sm:max-w-[170px]" />
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className="shrink-0 p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-slate-600 hover:text-slate-950 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all active:scale-90 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          {/* Drawer Navigation Links */}
          <nav className="flex-1 overflow-y-auto px-3.5 py-3 sm:p-4 space-y-3 sm:space-y-4">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`relative flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all group ${
                      active
                        ? "bg-emerald-50 text-emerald-600 font-semibold"
                        : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                    }`}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse" />
                    )}
                    {!active && (
                      <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2 border-t border-slate-100 pt-3 sm:pt-4">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                Quick Actions
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/jobs"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 sm:px-4 sm:py-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95"
                >
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  Browse Jobs
                </Link>
                <Link
                  href="/find-workers"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex flex-col items-center gap-1 sm:gap-1.5 rounded-lg sm:rounded-xl bg-slate-50 border border-slate-100 px-3 py-2.5 sm:px-4 sm:py-3 text-xs font-semibold text-slate-700 transition-all hover:bg-slate-100 hover:scale-[1.02] active:scale-95"
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600" />
                  Find Workers
                </Link>
              </div>
            </div>

            {/* Special Offer Banner */}
            <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-3 sm:p-4 text-white shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse shrink-0" />
                <p className="text-[11px] sm:text-xs font-bold">
                  🎉 New jobs & trade tasks added daily!
                </p>
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}