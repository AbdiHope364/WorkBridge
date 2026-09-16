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

export function ProfileAvatar({
  size = "lg",
  initials = "W",
  src,
}: {
  size?: "sm" | "md" | "lg";
  initials?: string;
  src?: string | null;
}) {
  const sizeClass =
    size === "sm"
      ? "h-12 w-12 text-sm rounded-xl"
      : size === "md"
        ? "h-16 w-16 text-base rounded-2xl"
        : "h-20 w-20 text-xl rounded-2xl";

  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-slate-900 border border-slate-200 shadow-xs flex items-center justify-center font-black select-none ${sizeClass}`}
    >
      {src ? (
        <Image
          src={src}
          alt="Avatar"
          fill
          unoptimized
          className="object-cover"
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-emerald-800 to-slate-950 text-amber-200 flex items-center justify-center tracking-wider">
          {initials}
        </div>
      )}
    </div>
  );
}

export function ProfileTopHeader({
  initials,
  url,
  condition,
}: {
  initials: string;
  url?: string;
  condition?: boolean;
}) {
  const showInitials = condition ?? (!url || url.includes("undefined"));

  return (
    <header className="hidden md:flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
      <LogoMark />
      <div className="flex items-center gap-5">
        <Link href="/dashboard/saved-jobs" aria-label="Saved jobs">
          <BookmarkIcon className="h-5 w-5 text-slate-400 hover:text-emerald-600 transition" />
        </Link>
        <Link href="/dashboard/notifications" aria-label="Notifications">
          <BellIcon className="h-5 w-5 text-slate-400 hover:text-emerald-600 transition" />
        </Link>
        <Link
          href="/dashboard/profile"
          aria-label="Profile"
          className="relative h-11 w-11 rounded-xl overflow-hidden border-2 border-emerald-800 bg-slate-900 text-sm font-black text-amber-200 flex items-center justify-center shadow-xs transition hover:opacity-90"
        >
          {!showInitials && url ? (
            <Image
              src={url}
              fill
              unoptimized
              className="object-cover"
              alt="Profile"
            />
          ) : (
            <span>{initials || "W"}</span>
          )}
        </Link>
      </div>
    </header>
  );
}
