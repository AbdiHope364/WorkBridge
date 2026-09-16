"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, Spinner } from "@repo/ui";
import { MessageIcon, SmallCheckIcon } from "./components/dashboard-icons";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import {
  jobseekerNotifications,
  type JobseekerNotification,
  type NotificationCategory,
} from "./notifications-data";
import { useAuth } from "@/contexts/auth-context";

type NotificationTab = "all" | "unread" | NotificationCategory;

const notificationTabs: Array<{ label: string; value: NotificationTab }> = [
  { label: "All", value: "all" },
  { label: "Unread", value: "unread" },
  { label: "Applications", value: "applications" },
  { label: "Jobs", value: "jobs" },
  { label: "Messages", value: "messages" },
];

function NotificationIcon({ icon }: { icon: JobseekerNotification["icon"] }) {
  return (
    <span className="grid h-8 w-8 place-items-center rounded-md bg-emerald-600 text-white">
      {icon === "message" ? (
        <MessageIcon className="h-4 w-4" />
      ) : (
        <SmallCheckIcon className="h-5 w-5" />
      )}
    </span>
  );
}

function NotificationAvatar() {
  return (
    <div className="relative h-12 w-12 shrink-0 rounded-full border-4 border-emerald-950 bg-slate-900">
      <div className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-amber-200" />
      <div className="absolute left-1/2 top-5 h-5 w-7 -translate-x-1/2 rounded-t-full bg-emerald-700" />
      <div className="absolute left-2 top-3 h-7 w-7 rounded-full border border-amber-400/50" />
    </div>
  );
}

function NotificationCard({
  notification,
}: {
  notification: JobseekerNotification;
}) {
  return (
    <article className="relative flex flex-col sm:grid sm:grid-cols-[36px_1fr_auto] items-start gap-3 sm:gap-4 rounded-xl border border-slate-200/80 bg-white p-4 sm:px-6 sm:py-4 shadow-sm">
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-teal-500" />
      <div className="flex items-center gap-3 sm:block">
        {notification.icon === "message" ? (
          <NotificationAvatar />
        ) : (
          <NotificationIcon icon={notification.icon} />
        )}
        <div className="flex flex-1 items-center justify-between sm:hidden">
          <span className="text-[10px] font-medium text-neutral-500">
            {notification.timeLabel}
          </span>
          {notification.isUnread ? (
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          ) : null}
        </div>
      </div>

      <div className="min-w-0 sm:border-l sm:border-slate-200 sm:pl-4">
        <h2 className="text-sm font-bold leading-tight text-slate-950">
          {notification.title}
        </h2>
        <p className="mt-1 max-w-[760px] text-xs leading-5 text-neutral-600">
          {notification.description}
        </p>
        <Link
          href={notification.href}
          className="mt-2 inline-flex text-xs font-semibold text-teal-600 hover:text-teal-700"
        >
          View Detail →
        </Link>
      </div>

      <div className="hidden sm:flex h-full min-w-20 flex-col items-end justify-between gap-5">
        <span className="text-[10px] font-medium text-neutral-500">
          {notification.timeLabel}
        </span>
        {notification.isUnread ? (
          <span className="h-3.5 w-3.5 rounded-full bg-blue-600" />
        ) : null}
      </div>
    </article>
  );
}

export function NotificationsPage() {
  const { isLoading, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState<NotificationTab>("all");
  const [notifications, setNotifications] = useState(jobseekerNotifications);

  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") {
      return notifications;
    }

    if (activeTab === "unread") {
      return notifications.filter((notification) => notification.isUnread);
    }

    return notifications.filter(
      (notification) => notification.category === activeTab,
    );
  }, [activeTab, notifications]);

  const markAllAsRead = () => {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isUnread: false,
      })),
    );
  };

  if (isLoading) {
    <Spinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex min-h-screen flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-9 pt-16 pb-20 md:pt-8 md:pb-8">
          <div className="max-w-[1040px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight tracking-tight text-slate-950">
                  Notification Center
                </h1>
                <p className="mt-1 text-xs sm:text-sm text-neutral-500">
                  Track and manage your job application updates and messages.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-9 self-start rounded-xl border-slate-200 px-4 text-xs font-semibold text-neutral-700 shadow-sm hover:bg-slate-50 sm:self-auto"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
              {notificationTabs.map((tab) => {
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    className={
                      `shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ` +
                      (isActive
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-50")
                    }
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-3 sm:space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={notification}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 bg-white px-8 py-14 text-center">
                  <h2 className="text-lg font-black text-slate-950">
                    No notifications found
                  </h2>
                  <p className="mt-2 text-sm text-neutral-500">
                    Notifications in this category will appear here.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                className="h-9 min-w-72 border-teal-500 text-teal-600 hover:border-teal-600 hover:bg-teal-50"
              >
                View All Notifications
              </Button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
