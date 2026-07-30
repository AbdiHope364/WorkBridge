"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/contact-us", label: "Help" },
];

function LogoMark() {
  return (
    <div className="flex flex-col items-center text-[#1b2855]">
      <svg
        aria-hidden="true"
        className="h-14 w-12"
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
      <span className="-mt-1 text-[6px] font-black uppercase tracking-[0.14em]">
        Workbridge
      </span>
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
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3 19c0-3.3 3.1-6 7-6s7 2.7 7 6"
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
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-[92px] max-w-[1160px] items-center justify-between px-5">
        <Link href="/" aria-label="Workbridge home" className="shrink-0">
          <LogoMark />
        </Link>

        <div className="hidden items-center gap-[52px] text-[17px] font-bold text-slate-950 md:flex">
          {navLinks.map((link) => {
            const linkPath = link.href.split("#")[0] ?? "";
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : linkPath !== "" && pathname.startsWith(linkPath);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-emerald-600"
                    : "transition hover:text-emerald-600"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex align-center justify-center h-10  items-center gap-2 rounded-2xl border border-slate-950 px-6 text-[17px] font-bold text-slate-950 transition hover:bg-slate-950 hover:text-white sm:inline-flex"
          >
            <SignInIcon />
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center gap-2 rounded-2xl bg-gradient-to-r from-slate-950 to-emerald-600 px-5 text-[17px] font-bold text-white transition hover:from-slate-900 hover:to-emerald-700"
          >
            <SignUpIcon />
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
