export interface MessageConversation {
  id: string;
  senderName: string;
  company: string;
  preview: string;
  timeLabel: string;
  unread: boolean;
  href: string;
}

export const messageConversations: MessageConversation[] = [
  {
    id: "usmael-google-1",
    senderName: "Usmael Taju",
    company: "google company",
    preview:
      "Hi Robera, we have reviewed your portfolio and we would like to schedule google meeting next week... check your gmail for the timeline.",
    timeLabel: "10:45 AM",
    unread: true,
    href: "/dashboard/messages/usmael-google-1",
  },
  {
    id: "usmael-google-2",
    senderName: "Usmael Taju",
    company: "google company",
    preview:
      "Hi Robera, we have reviewed your portfolio and we would like to schedule google meeting next week... check your gmail for the timeline.",
    timeLabel: "04:49 PM",
    unread: true,
    href: "/dashboard/messages/usmael-google-2",
  },
  {
    id: "usmael-google-3",
    senderName: "Usmael Taju",
    company: "google company",
    preview:
      "Hi Robera, we have reviewed your portfolio and we would like to schedule google meeting next week... check your gmail for the timeline.",
    timeLabel: "TODAY",
    unread: true,
    href: "/dashboard/messages/usmael-google-3",
  },
  {
    id: "usmael-google-4",
    senderName: "Usmael Taju",
    company: "google company",
    preview:
      "Hi Robera, we have reviewed your portfolio and we would like to schedule google meeting next week... check your gmail for the timeline.",
    timeLabel: "YESTERDAY",
    unread: true,
    href: "/dashboard/messages/usmael-google-4",
  },
];
