"use client";

import Link from "next/link";
import { WorkBridgeLogo } from "@repo/ui";
import { Mail, Phone, MapPin } from "lucide-react";

const footerColumns = [
  {
    title: "For Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Find Workers", href: "/find-workers" },
      { label: "Pricing & Plans", href: "/pricing" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { label: "Post a Job", href: "/dashboard/employer" },
      { label: "Employer Dashboard", href: "/dashboard/employer" },
      { label: "Candidate Search", href: "/find-workers" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "Help Center / FAQ", href: "/contact-us" },
      { label: "Support Desk", href: "/contact-us" },
      { label: "Privacy Policy", href: "/about-us" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer id="help" className="bg-[#101b3b] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* 2 in a row on mobile, 4 on tablet, 5 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8 sm:gap-8 lg:gap-10">
          {/* Brand & Contacts - Full width on mobile/tablet, 1 col on desktop */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4 pb-4 sm:pb-0 border-b border-slate-800/80 sm:border-none">
            <Link href="/" className="inline-block">
              <WorkBridgeLogo theme="dark" className="h-10 sm:h-11 w-auto max-w-[200px]" />
            </Link>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
              Connecting skilled trade workers with clients and employers across Ethiopia with 0% wage commission.
            </p>

            <div className="space-y-2 pt-1 text-xs sm:text-sm text-slate-300">
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>support@workbridge.et</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>+251 909 911 111</span>
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Addis Ababa, Ethiopia</span>
              </p>
            </div>
          </div>

          {/* Links Columns - 2 in a row on mobile */}
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-3">
              <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-400">
                {column.title}
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm font-medium text-slate-300">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="transition hover:text-white hover:underline block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} WorkBridge Ethiopia. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about-us" className="hover:text-slate-200 transition">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/about-us" className="hover:text-slate-200 transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
