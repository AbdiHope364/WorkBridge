import type { ChatMessage, Conversation } from "@repo/types/chat";
import type { ApiClient } from "../http";

export function createChatService(api: ApiClient) {
  return {
    listConversations() {
      return api.request<Conversation[]>("/chat/conversations");
    },
    listMessages(conversationId: string) {
      return api.request<ChatMessage[]>(
        `/chat/conversations/${conversationId}/messages`,
      );
    },
  };
}
