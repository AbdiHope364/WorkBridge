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
      'Your application for High-Voltage Electrical Rewiring is moved to "In Review" by Almaz Tefera.',
    timeLabel: "2 hours ago",
    category: "applications",
    isUnread: true,
    icon: "application",
    href: "/dashboard/applications",
  },
  {
    id: "new-application-google",
    title: "Direct Trade Message from Usmael Taju (Google)",
    description:
      "Hi Abdi, we reviewed your portfolio and would like to schedule a technical sync next week for the Substation upgrade.",
    timeLabel: "YESTERDAY",
    category: "messages",
    isUnread: true,
    icon: "message",
    href: "/dashboard/messages/usmael-google",
  },
  {
    id: "application-updated-three-days",
    title: "Trade Milestone Released",
    description:
      "Robel Haile has released ETB 25,000 for the completed HVAC ventilation ducting installation into direct escrow.",
    timeLabel: "3 days ago",
    category: "applications",
    isUnread: true,
    icon: "application",
    href: "/dashboard/applications",
  },
  {
    id: "application-updated-april",
    title: "Commercial Solar Lead Offer",
    description:
      "Sarah Jenkins from Apex Renewable Energy invited you to quote on the 30kW rooftop solar array.",
    timeLabel: "April 10",
    category: "jobs",
    isUnread: true,
    icon: "application",
    href: "/dashboard/jobs/job_trade_1",
  },
];
