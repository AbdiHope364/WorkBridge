"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/contact-us", label: "Help" },
];

function LogoMark() {
  return (
    <div className="flex items-center gap-2.5 text-[#1b2855]">
      <svg
        aria-hidden="true"
        className="h-10 w-9 shrink-0"
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
        <span className="text-[18px] font-black tracking-tight text-slate-950">
          Work<span className="text-emerald-600">bridge</span>
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
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
  const pathname = usePathname();

  function isActive(href: string): boolean {
    if (href.includes("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex h-[72px] max-w-[1300px] items-center justify-between px-6">
        <Link href="/" aria-label="Workbridge home" className="shrink-0">
          <LogoMark />
        </Link>

        <div className="hidden items-center gap-1 md:flex  shrink-0">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const cls = [
              "relative px-4 py-2 text-[14px] font-semibold rounded-lg transition-all duration-150",
              active
                ? "text-emerald-600"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50",
            ].join(" ");

            return (
              <Link key={link.href} href={link.href} className={cls}>
                {link.label}
                {active && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 w-5 rounded-full bg-emerald-500" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden h-10 items-center gap-1.5 rounded-xl border border-slate-200 px-5 text-[14px] font-semibold text-slate-700 transition-all hover:border-slate-950 hover:bg-slate-950 hover:text-white sm:inline-flex"
          >
            <SignInIcon />
            Sign In
          </Link>
          <Link
            href="/register"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-slate-950 px-5 text-[14px] font-semibold text-white transition-all hover:bg-emerald-600"
          >
            <SignUpIcon />
            Sign Up
          </Link>
        </div>
      </nav>
    </header>
  );
}
