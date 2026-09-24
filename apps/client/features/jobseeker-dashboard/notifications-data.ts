export type NotificationCategory = "applications" | "jobs" | "messages";

export interface JobseekerNotification {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  category: NotificationCategory;
  isUnread: boolean;
  icon: "application" | "message";
  href: string;
}

export const jobseekerNotifications: JobseekerNotification[] = [];
