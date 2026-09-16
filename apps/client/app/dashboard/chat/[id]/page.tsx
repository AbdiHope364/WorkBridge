import { ChatInterface } from "@/features/chat/chat-interface";

export default async function DashboardChatIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ChatInterface initialConversationId={id} />;
}

