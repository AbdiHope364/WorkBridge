"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/contact-us", label: "Help" },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-2 sm:gap-2.5 text-[#1b2855]">
      <svg
        aria-hidden="true"
        className="h-8 w-7 sm:h-10 sm:w-9 md:h-12 md:w-10 lg:h-14 lg:w-12"
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
    <svg aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="none">
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
    <svg aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" viewBox="0 0 24 24" fill="none">
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

function MenuIcon() {
  return <Menu className="h-5 w-5 sm:h-6 sm:w-6" />;
}

function CloseIcon() {
  return <X className="h-5 w-5 sm:h-6 sm:w-6" />;
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

  const isActive = (href: string) => {
    const linkPath = href.split("#")[0] ?? "";
    if (href === "/") return pathname === "/";
    if (linkPath !== "" && pathname.startsWith(linkPath)) return true;
    return false;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        }`}
      >
        <nav className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
          <div className="flex h-16 sm:h-[72px] md:h-[82px] lg:h-[92px] items-center justify-between max-w-full">
            {/* Logo - Left */}
            <Link href="/" aria-label="Workbridge home" className="shrink-0">
              <LogoMark />
            </Link>

            {/* Desktop Navigation - Center with Underline Only on Hover */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-[52px] text-sm xl:text-[17px] font-bold text-slate-950">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative whitespace-nowrap transition-colors duration-200 group ${
                      active
                        ? "text-emerald-600"
                        : "text-slate-600 hover:text-slate-950"
                    }`}
                  >
                    {link.label}
                    {/* Underline only on hover - never shows for active */}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>

            {/* Right Side - Auth Buttons & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              {/* Sign In - Green Button */}
              <Link
                href="/login"
                className="flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 md:h-10 px-2 sm:px-4 md:px-5 lg:px-6 rounded-xl bg-emerald-600 text-xs sm:text-sm md:text-[14px] lg:text-[17px] font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <SignInIcon />
                <span className="hidden sm:inline">Sign In</span>
              </Link>

              {/* Sign Up - Green Button */}
              <Link
                href="/register"
                className="flex items-center gap-1 sm:gap-1.5 h-8 sm:h-9 md:h-10 px-2 sm:px-4 md:px-5 lg:px-6 rounded-xl bg-emerald-600 text-xs sm:text-sm md:text-[14px] lg:text-[17px] font-semibold text-white transition-all hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                <SignUpIcon />
                <span className="hidden sm:inline">Sign Up</span>
              </Link>

              {/* Mobile Menu Toggle - Only shows on lg and below */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
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
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <LogoMark />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
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
                        onClick={() => setIsMenuOpen(false)}
                        className={`relative flex items-center px-4 py-3 rounded-lg text-base font-medium transition-colors group ${
                          active
                            ? "bg-emerald-50 text-emerald-600"
                            : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                        {active && (
                          <span className="ml-auto h-2 w-2 rounded-full bg-emerald-500" />
                        )}
                        {/* Underline only on hover for mobile */}
                        <span className="absolute bottom-1 left-4 h-0.5 w-0 rounded-full bg-emerald-500 transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Auth Buttons - Green */}
                <div className="mt-6 space-y-3 border-t border-slate-100 pt-6">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    <SignInIcon />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    <SignUpIcon />
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}