"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WorkBridgeLogo } from "@repo/ui";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Find Jobs" },
  { href: "/find-workers", label: "Find Workers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact-us", label: "Help" },
];

function LogoMark() {
  return <WorkBridgeLogo className="h-10 sm:h-12 w-auto max-w-[210px]" />;
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

        <div className="hidden items-center gap-1 md:flex shrink-0">
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
      </nav>
    </header>
  );
}
