export interface MessageConversation {
  id: string;
  senderName: string;
  company: string;
  preview: string;
  timeLabel: string;
  unread: boolean;
  href: string;
}

export const messageConversations: MessageConversation[] = [];
