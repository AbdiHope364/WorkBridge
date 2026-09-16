"use client";

import { useState, useEffect, useRef } from "react";
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
    <WorkBridgeLogo className="h-10 sm:h-11 md:h-12 w-auto max-w-[200px] sm:max-w-[230px]" />
  );
}

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (href: string) => {
    const linkPath = href.split("#")[0] ?? "";
    if (href === "/") return pathname === "/";
    if (linkPath !== "" && pathname.startsWith(linkPath)) return true;
    return false;
  };

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex h-16 sm:h-18 md:h-20.5 lg:h-23 items-center justify-between max-w-full">
            {/* Logo - Left */}
            <Link
              href="/"
              aria-label="Workbridge home"
              className="shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <LogoMark />
            </Link>

            {/* Desktop Navigation - Center / Right */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-10 text-sm xl:text-[17px] font-bold text-slate-950">
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

            {/* Mobile Menu Toggle */}
            <div className="flex lg:hidden items-center">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className={`flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg transition-all hover:bg-slate-100 active:scale-90 ${
                  isMenuOpen ? "bg-slate-100" : ""
                }`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6 transition-transform rotate-90" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeMenu}
          />

          {/* Menu Panel */}
          <div
            ref={menuRef}
            className="absolute right-0 top-0 h-full w-70 sm:w-80 bg-white shadow-2xl animate-slide-in"
          >
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-4 bg-linear-to-r from-emerald-50/50 to-white">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="transition-transform hover:scale-105"
                >
                  <LogoMark />
                </Link>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-all hover:rotate-90 active:scale-90"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className={`relative flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all group ${
                          active
                            ? "bg-emerald-50 text-emerald-600 font-semibold"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span>{link.label}</span>
                        {active && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {!active && (
                          <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 space-y-2 border-t border-slate-100 pt-6">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Quick Actions
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/jobs"
                      onClick={closeMenu}
                      className="flex flex-col items-center gap-1.5 rounded-lg bg-slate-50 px-4 py-3 text-xs font-medium text-slate-700 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
                    >
                      <Briefcase className="h-5 w-5 text-emerald-600" />
                      Browse Jobs
                    </Link>
                    <Link
                      href="/find-workers"
                      onClick={closeMenu}
                      className="flex flex-col items-center gap-1.5 rounded-lg bg-slate-50 px-4 py-3 text-xs font-medium text-slate-700 transition-all hover:bg-slate-100 hover:scale-105 active:scale-95"
                    >
                      <Users className="h-5 w-5 text-emerald-600" />
                      Find Workers
                    </Link>
                  </div>
                </div>

                {/* Special Offer Banner */}
                <div className="mt-6 rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 p-4 text-white">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    <p className="text-xs font-medium">
                      🎉 New jobs added daily!
                    </p>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}