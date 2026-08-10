"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { chatService } from '@/lib/chat-service';
import { ChatSidebar } from './components/chat-sidebar';
import { ChatWindow } from './components/chat-window';

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Get token and connect
      const token = localStorage.getItem('token') || '';
      chatService.connect(token);
    }

    return () => {
      chatService.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar
        onSelectConversation={setSelectedConversation}
        selectedId={selectedConversation}
      />
      <ChatWindow conversationId={selectedConversation} />
    </div>
  );
}
