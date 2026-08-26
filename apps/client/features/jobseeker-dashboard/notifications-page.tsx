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
    <article className="relative grid min-h-24 grid-cols-[36px_1fr_auto] items-start gap-4 rounded-md bg-slate-200/80 px-6 py-4">
      <div className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-teal-500" />
      {notification.icon === "message" ? (
        <NotificationAvatar />
      ) : (
        <NotificationIcon icon={notification.icon} />
      )}

      <div className="min-w-0 border-l border-slate-300 pl-4">
        <h2 className="text-sm font-black leading-tight text-slate-950">
          {notification.title}
        </h2>
        <p className="mt-1 max-w-[760px] text-xs leading-5 text-neutral-600">
          {notification.description}
        </p>
        <Link
          href={notification.href}
          className="mt-3 inline-flex text-xs font-semibold text-teal-600 hover:text-teal-700"
        >
          View Detail
        </Link>
      </div>

      <div className="flex h-full min-w-20 flex-col items-end justify-between gap-5">
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

  // const user = {
  //   fullName: "Mock User",
  // };

  // const isLoading = false;
  // const isAuthenticated = true;
  const [activeTab, setActiveTab] = useState<NotificationTab>("all");
  const [notifications, setNotifications] = useState(jobseekerNotifications);

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.replace("/login?next=/dashboard/notifications");
  //   }
  // }, [isAuthenticated, isLoading, router]);

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

        <section className="min-w-0 flex-1 px-6 py-5 md:px-9">
          <div className="max-w-[1040px]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-4xl font-normal leading-tight tracking-normal text-black">
                  Notification Center
                </h1>
                <p className="text-base text-neutral-500">
                  Track and manage your job application.
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-8 self-start border-slate-200 px-5 text-sm font-medium text-neutral-600 shadow-sm hover:bg-slate-50 sm:self-auto"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            </div>

            <div className="mt-6 inline-grid grid-cols-5 rounded-md border border-slate-200 bg-white p-0.5">
              {notificationTabs.map((tab) => {
                const isActive = activeTab === tab.value;

                return (
                  <button
                    key={tab.value}
                    type="button"
                    className={
                      `h-7 min-w-24 rounded px-3 text-sm transition ` +
                      (isActive
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-neutral-500 hover:text-slate-950")
                    }
                    onClick={() => setActiveTab(tab.value)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-6">
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
