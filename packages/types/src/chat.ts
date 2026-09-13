export interface ParticipantInfo {
  id: string;
  fullName: string;
  avatarUrl?: string;
  role: "jobseeker" | "employer" | "admin";
  tradeTitle?: string;
  isOnline?: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[];
  participants?: ParticipantInfo[];
  otherParticipant?: ParticipantInfo;
  lastMessage?: string | { content: string; createdAt?: string };
  lastMessageAt?: string;
  lastSenderId?: string;
  unreadCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId?: string;
  senderName?: string;
  body: string;
  message?: string; // alias for body
  readAt?: string;
  isRead?: boolean;
  createdAt: string;
}

export interface SendMessageRequest {
  conversationId?: string;
  recipientId?: string;
  receiverId?: string;
  body: string;
  message?: string;
}
