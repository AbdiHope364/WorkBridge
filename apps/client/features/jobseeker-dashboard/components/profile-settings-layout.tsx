"use client";

import Link from "next/link";
import { BellIcon, BookmarkIcon } from "./dashboard-icons";
import Image from "next/image";

function LogoMark() {
  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2 font-black text-[#14214a]"
    >
      <span className="relative h-8 w-6 text-[#14214a]">
        <span className="absolute left-1/2 top-0 h-8 w-0.5 -translate-x-1/2 bg-current" />
        <span className="absolute left-1/2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-current" />
        <span className="absolute left-1 top-4 h-0.5 w-5 rotate-45 bg-current" />
        <span className="absolute left-1 top-4 h-0.5 w-5 -rotate-45 bg-current" />
      </span>
      WorkBridge
    </Link>
  );
}

export function getProfileInitials(fullName?: string) {
  const names = fullName?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (names.length === 0) {
    return "JS";
  }

  return names
    .slice(0, 2)
    .map((name) => name[0]?.toUpperCase())
    .join("");
}

export function ProfileAvatar({ size = "lg" }: { size?: "sm" | "lg" }) {
  const sizeClass = size === "sm" ? "h-16 w-16" : "h-20 w-20";
  const headClass = size === "sm" ? "top-3 h-4 w-4" : "top-4 h-5 w-5";
  const bodyClass = size === "sm" ? "bottom-2 h-7 w-9" : "bottom-3 h-8 w-11";
  const ringClass =
    size === "sm" ? "left-3 top-3 h-9 w-9" : "left-4 top-4 h-10 w-10";

  return (
    <div className={`relative shrink-0 rounded-lg bg-slate-900 ${sizeClass}`}>
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-amber-200 ${headClass}`}
      />
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-t-full bg-emerald-700 ${bodyClass}`}
      />
      <div
        className={`absolute rounded-full border border-amber-400/50 ${ringClass}`}
      />
    </div>
  );
}

export function ProfileTopHeader({
  initials,
  url,
  condition,
}: {
  initials: string;
  url: string;
  condition: boolean | undefined;
}) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <LogoMark />
      <div className="flex items-center gap-5">
        <Link href="/dashboard/saved-jobs" aria-label="Saved jobs">
          <BookmarkIcon className="h-5 w-5" />
        </Link>
        <Link href="/dashboard/notifications" aria-label="Notifications">
          <BellIcon className="h-5 w-5" />
        </Link>
        <Link
          href="/dashboard/profile"
          aria-label="Profile"
          className="grid h-12 w-12 place-items-center rounded-full border-4 border-emerald-950 bg-slate-900 text-sm font-black text-emerald-100 shadow-sm"
        >
          {condition ? (
            initials
          ) : (
            <Image
              src={url}
              width={70}
              height={70}
              style={{ width: "48", height: "48", borderRadius: "50%" }}
              alt="Profile"
            />
          )}
        </Link>
      </div>
    </header>
  );
}
