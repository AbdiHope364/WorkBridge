"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Home, Briefcase, Users, HelpCircle, Mail, LogIn, UserPlus, Sparkles, ArrowRight } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },
  { href: "/jobs", label: "Find Jobs", icon: <Briefcase className="h-4 w-4" /> },
  { href: "/find-workers", label: "Find Workers", icon: <Users className="h-4 w-4" /> },
  { href: "/#how-it-works", label: "How it works", icon: <HelpCircle className="h-4 w-4" /> },
  { href: "/contact-us", label: "Help", icon: <Mail className="h-4 w-4" /> },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 text-[#1b2855]">
      <svg
        aria-hidden="true"
        className="h-8 w-7 sm:h-10 sm:w-9 md:h-12 md:w-10 lg:h-14 lg:w-12 transition-all duration-300"
        viewBox="0 0 48 64"
        fill="none"
      >
        <path
          d="M24 6v52M24 12 8 58M24 12l16 46"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="4"
        />
        <circle
          cx="24"
          cy="20"
          r="6"
          fill="white"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          d="M15 58h18M20 50h8"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-base sm:text-lg md:text-xl lg:text-[22px] font-black tracking-tight text-slate-950">
          Work<span className="text-emerald-600">bridge</span>
        </span>
        <span className="hidden sm:block text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Job Platform
        </span>
      </div>
    </div>
  );
}

function SignInIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6 15 12 9 18M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SignUpIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <rect
        x="4"
        y="3"
        width="16"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 11v6M16 14h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
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
            <Link href="/" aria-label="Workbridge home" className="shrink-0 transition-transform hover:scale-105 active:scale-95">
              <LogoMark />
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-13 text-sm xl:text-[17px] font-bold text-slate-950">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative whitespace-nowrap transition-colors duration-200 group flex items-center gap-1 ${
                      active
                        ? "text-emerald-600"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    <span className="transition-transform group-hover:scale-110">
                      {link.icon}
                    </span>
                    {link.label}
                    {/* Underline only on hover - never on active */}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Desktop Auth Buttons & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Sign In - Desktop only */}
              <Link
                href="/login"
                className="hidden lg:flex items-center gap-1.5 h-9 md:h-10 px-4 md:px-5 lg:px-6 rounded-xl border border-slate-200 text-sm md:text-[14px] lg:text-[17px] font-semibold text-slate-700 transition-all hover:border-slate-950 hover:bg-slate-950 hover:text-white hover:scale-105 active:scale-95"
              >
                <SignInIcon />
                Sign In
              </Link>

              {/* Sign Up - Desktop only */}
              <Link
                href="/register"
                className="hidden lg:flex items-center gap-1.5 h-9 md:h-10 px-4 md:px-5 lg:px-6 rounded-xl bg-slate-950 text-sm md:text-[14px] lg:text-[17px] font-semibold text-white transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <SignUpIcon />
                Sign Up
              </Link>

              {/* Mobile Menu Toggle - Only button on mobile */}
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className={`lg:hidden flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg transition-all hover:bg-slate-100 active:scale-90 ${
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
                <Link href="/" onClick={closeMenu} className="transition-transform hover:scale-105">
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
                        className={`relative flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all group ${
                          active
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`transition-transform group-hover:scale-110 ${active ? "text-emerald-600" : ""}`}>
                          {link.icon}
                        </span>
                        {link.label}
                        {active && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        )}
                        {!active && (
                          <ChevronDown className="ml-auto h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                        )}
                        {/* Underline only on hover for mobile */}
                        <span className="absolute bottom-1 left-4 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Auth Buttons */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Account
                  </p>
                  
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="flex items-center justify-between w-full rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:scale-[1.02] active:scale-95 group"
                  >
                    <span className="flex items-center gap-3">
                      <LogIn className="h-4 w-4 text-emerald-600" />
                      Sign In
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href="/register"
                    onClick={closeMenu}
                    className="flex items-center justify-between w-full rounded-xl bg-linear-to-r from-slate-950 to-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30 group"
                  >
                    <span className="flex items-center gap-3">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/70 transition-transform group-hover:translate-x-1" />
                  </Link>
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