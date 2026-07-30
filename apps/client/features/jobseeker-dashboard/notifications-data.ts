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

export const jobseekerNotifications: JobseekerNotification[] = [
  {
    id: "application-status-review",
    title: "Application Status Updated",
    description:
      'Your application in Graphics Design role is moved to "review", by Egillion system.',
    timeLabel: "2 hours ago",
    category: "applications",
    isUnread: true,
    icon: "application",
    href: "/dashboard/applications/graphics-designer-review",
  },
  {
    id: "new-application-google",
    title: "New Application from Google",
    description:
      "Hi Robera, we have reviewed your portfolio and we would like to schedule google meeting next week... check your gmail for the timeline.",
    timeLabel: "YESTERDAY",
    category: "messages",
    isUnread: true,
    icon: "message",
    href: "/dashboard/messages/usmael-google-1",
  },
  {
    id: "application-updated-three-days",
    title: "Application Updated",
    description:
      'Your application in Graphics Design role is moved to "review", by Egillion system.',
    timeLabel: "3 days ago",
    category: "applications",
    isUnread: true,
    icon: "application",
    href: "/dashboard/applications/graphics-designer-review-2",
  },
  {
    id: "application-updated-april",
    title: "Application Updated",
    description:
      'Your application in Graphics Design role is moved to "review", by Egillion system.',
    timeLabel: "april 10",
    category: "applications",
    isUnread: true,
    icon: "application",
    href: "/dashboard/applications/graphics-designer-review",
  },
];
