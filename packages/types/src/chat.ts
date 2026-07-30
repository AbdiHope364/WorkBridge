export interface Conversation {
  id: string;
  participantIds: string[];
  lastMessageAt?: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  readAt?: string;
  createdAt: string;
}
