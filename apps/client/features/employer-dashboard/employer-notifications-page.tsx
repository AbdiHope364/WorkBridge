"use client";

import Link from "next/link";
import type { JSX, SVGProps } from "react";
import { BellIcon } from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import { useNotifications } from "@/contexts/notification-context";
import { useProfile } from "@/contexts/profile-context";
import { type Notification, type NotificationCategory } from "@repo/types";
import Image from "next/image";

import type {
  CompanyProfile,
  IndividualEmployerProfile,
} from "@repo/api-client";
import { cloudinaryUrl } from "./employer-profile-page";

type IconProps = SVGProps<SVGSVGElement>;

function BackIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M15 6 9 12l6 6M9.5 12H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BriefcaseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M8 8V6.5A1.5 1.5 0 0 1 9.5 5h5A1.5 1.5 0 0 1 16 6.5V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M5 9h14v10H5V9Zm0 4h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 3l7 3v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="m12 3 2.1 2.1 3-.3.7 2.9 2.4 1.8-1.5 2.5 1.5 2.5-2.4 1.8-.7 2.9-3-.3L12 21l-2.1-2.1-3 .3-.7-2.9-2.4-1.8L5.3 12 3.8 9.5l2.4-1.8.7-2.9 3 .3L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m9 12 2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BellOutlineIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NotificationGlyph({ category }: { category: NotificationCategory }) {
  const map: Record<
    NotificationCategory,
    { icon: JSX.Element; bg: string; color: string }
  > = {
    APPLICATION: {
      icon: <BriefcaseIcon className="h-5 w-5" />,
      bg: "bg-[#dff4ef]",
      color: "text-[#00aaa8]",
    },
    JOB: {
      icon: <BriefcaseIcon className="h-5 w-5" />,
      bg: "bg-[#e8f0fe]",
      color: "text-[#2563eb]",
    },
    ACCOUNT: {
      icon: <VerifiedIcon className="h-5 w-5" />,
      bg: "bg-[#f0fdf4]",
      color: "text-[#16a34a]",
    },
    VERIFICATION: {
      icon: <ShieldIcon className="h-5 w-5" />,
      bg: "bg-[#fef9c3]",
      color: "text-[#ca8a04]",
    },
    SECURITY: {
      icon: <ShieldIcon className="h-5 w-5" />,
      bg: "bg-[#fef2f2]",
      color: "text-[#dc2626]",
    },
    REVIEW: {
      icon: <StarIcon className="h-5 w-5" />,
      bg: "bg-[#fdf4ff]",
      color: "text-[#9333ea]",
    },
    SYSTEM: {
      icon: <BellOutlineIcon className="h-5 w-5" />,
      bg: "bg-[#f1f5f9]",
      color: "text-[#64748b]",
    },
  };

  const { icon, bg, color } = map[category] ?? map.SYSTEM;

  return (
    <span
      className={`grid h-10 w-10 shrink-0 place-items-center rounded ${bg} ${color}`}
    >
      {icon}
    </span>
  );
}

// ─── Priority badge ───────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: Notification["priority"] }) {
  if (priority === "LOW" || priority === "NORMAL") return null;

  const map = {
    HIGH: { label: "High", cls: "bg-amber-100 text-amber-700" },
    URGENT: { label: "Urgent", cls: "bg-red-100 text-red-700" },
  } as const;

  const { label, cls } = map[priority];

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

// ─── Relative time ────────────────────────────────────────────────────────────

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "Just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return new Date(iso).toLocaleDateString();
}

// ─── Group notifications by date label ───────────────────────────────────────

function groupByDate(
  notifications: Notification[],
): Array<{ label: string; items: Notification[] }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const buckets = new Map<string, Notification[]>();

  for (const n of notifications ?? []) {
    const d = new Date(n.createdAt);
    d.setHours(0, 0, 0, 0);
    let label: string;
    if (d.getTime() === today.getTime()) label = "TODAY";
    else if (d.getTime() === yesterday.getTime()) label = "YESTERDAY";
    else
      label = d
        .toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase();

    if (!buckets.has(label)) buckets.set(label, []);
    buckets.get(label)!.push(n);
  }

  return Array.from(buckets.entries()).map(([label, items]) => ({
    label,
    items,
  }));
}

// ─── Resolve action link from metadata ───────────────────────────────────────

function resolveActionHref(n: Notification): string | null {
  const meta = n.metadata;
  if (n.category === "APPLICATION" && meta.applicationId) {
    return `/dashboard/employer/applications/${meta.applicationId}`;
  }
  if (n.category === "JOB" && meta.jobId) {
    return `/dashboard/employer/jobs/${meta.jobId}`;
  }
  if (n.category === "VERIFICATION") {
    return `/dashboard/employer/profile`;
  }
  return null;
}

// ─── Single notification card ─────────────────────────────────────────────────

function NotificationCard({
  item,
  onMarkRead,
  onDelete,
}: {
  item: Notification;
  onMarkRead: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const actionHref = resolveActionHref(item);

  return (
    <article
      className={`relative grid gap-4 rounded-[20px] border bg-white px-5 py-5 transition-colors md:grid-cols-[40px_1fr_auto] ${
        item.isRead ? "border-[#e5e7eb]" : "border-[#00aaa8]/40 bg-[#f9fffe]"
      }`}
    >
      {/* Unread dot */}
      {!item.isRead && (
        <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-[#00aaa8]" />
      )}

      <NotificationGlyph category={item.category} />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-base font-medium text-black">{item.title}</h2>
          <PriorityBadge priority={item.priority} />
        </div>

        <p className="mt-2 text-sm leading-snug text-[#666]">{item.body}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          {actionHref && (
            <Link
              href={actionHref}
              onClick={() => !item.isRead && onMarkRead(item._id)}
              className="inline-flex items-center gap-1 text-sm font-medium text-[#00aaa8]"
            >
              View details
              <ArrowRightIcon className="h-3.5 w-3.5" />
            </Link>
          )}

          {!item.isRead && (
            <button
              type="button"
              onClick={() => onMarkRead(item._id)}
              className="text-sm text-[#888] hover:text-black"
            >
              Mark as read
            </button>
          )}

          <button
            type="button"
            onClick={() => onDelete(item._id)}
            className="text-sm text-[#888] hover:text-red-500"
          >
            Dismiss
          </button>
        </div>
      </div>

      <time className="whitespace-nowrap text-sm text-[#888]">
        {relativeTime(item.createdAt)}
      </time>
    </article>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  const { unreadCount } = useNotifications();
  const { employerProfile } = useProfile();

  if (!employerProfile) {
    return;
  }

  const isCompany = employerProfile?.employerType === "COMPANY_EMPLOYER";
  const imageId = isCompany
    ? (employerProfile as CompanyProfile).companyLogoUrl?.publicId
    : (employerProfile as IndividualEmployerProfile).profilePictureUrl
        ?.publicId;
  const initials = isCompany
    ? ((employerProfile as CompanyProfile).companyName?.charAt(0) ?? "E")
    : ((employerProfile as IndividualEmployerProfile).fullName?.charAt(0) ??
      "E");
  const avatarSrc = cloudinaryUrl(imageId);

  const unread = unreadCount;

  return (
    <header className="flex h-[62px] items-center justify-between border-b border-[#d9d9df] bg-white px-6 shadow-[0_2px_5px_rgba(15,23,42,0.14)] md:px-10">
      <Link
        href="/"
        aria-label="WorkBridge home"
        className="hidden h-full w-[82px] items-center justify-center text-[#172653] md:flex"
      >
        <span className="relative h-12 w-8">
          <span className="absolute left-1/2 top-0 h-12 w-1 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-current" />
          <span className="absolute bottom-2 left-1 h-1 w-7 rotate-[60deg] rounded-full bg-current" />
          <span className="absolute bottom-2 right-1 h-1 w-7 -rotate-[60deg] rounded-full bg-current" />
        </span>
      </Link>

      <div className="ml-auto flex items-center gap-8">
        <Link
          href="/dashboard/employer/notifications"
          aria-label="Notifications"
          className="relative inline-flex items-center justify-center"
        >
          <BellIcon className="h-6 w-6 text-black" />

          {unread > 0 && (
            <span className="absolute top-2 right-3 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#00aaa8] px-1 text-[10px] font-bold leading-none text-white shadow-sm">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </Link>

        <Link href="/dashboard/employer/profile" aria-label="Profile">
          {avatarSrc ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={avatarSrc}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-[#273158] bg-[#111827] text-sm font-semibold text-[#f4b28a]">
              {initials}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <BellOutlineIcon className="h-10 w-10 text-[#ccc]" />
      <p className="text-base font-medium text-[#555]">No notifications yet</p>
      <p className="text-sm text-[#999]">
        When you receive notifications they will appear here.
      </p>
    </div>
  );
}

export function EmployerNotificationsPage() {
  const {
    isLoading,
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();

  const groups = groupByDate(notifications);
  const unread = unreadCount;

  return (
    <main className="min-h-screen bg-[#f7f7fb] text-black">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          <Header />

          <div className="w-full px-2 pb-6 pt-6 md:px-9">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-medium leading-none">
                    Notifications
                  </h1>
                  {unread > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#00aaa8] px-1 text-[11px] font-bold text-white">
                      {unread > 99 ? "99+" : unread}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base text-[#4f4f4f]">
                  Stay updated with your latest activities and candidate
                  activities.
                </p>
              </div>

              <div className="flex gap-2">
                {unread > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="h-[30px] cursor-pointer rounded-lg border border-[#00aaa8] bg-white px-4 text-sm font-medium text-[#00aaa8] hover:bg-[#f0fffe]"
                  >
                    Mark All As Read
                  </button>
                )}
                {notifications.length > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="h-[30px] cursor-pointer rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#888] hover:text-red-500"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* ── Content ── */}
            {isLoading ? (
              <div className="mt-12 flex justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#00aaa8] border-t-transparent" />
              </div>
            ) : notifications.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="mt-8 space-y-6">
                {groups.map((group) => (
                  <section key={group.label}>
                    <h2 className="mb-2 text-sm font-semibold tracking-wide text-[#888]">
                      {group.label}
                    </h2>

                    <div className="space-y-2">
                      {group.items.map((item) => (
                        <NotificationCard
                          key={item._id}
                          item={item}
                          onMarkRead={markAsRead}
                          onDelete={deleteNotification}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            <Link
              href="/dashboard/employer"
              className="mt-8 inline-flex items-center gap-2 text-xl font-normal text-black"
            >
              <BackIcon className="h-5 w-5" />
              Back
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
