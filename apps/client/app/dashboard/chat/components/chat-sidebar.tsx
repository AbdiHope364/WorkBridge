"use client";

import { useEffect, useState } from 'react';
import { chatService } from '@/lib/chat-service';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: {
    content: string;
    createdAt: string;
  };
}

export function ChatSidebar({
  onSelectConversation,
  selectedId,
}: {
  onSelectConversation: (id: string) => void;
  selectedId: string | null;
}) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const data = await chatService.getConversations();
        setConversations(data);
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  if (loading) {
    return (
      <div className="w-80 border-r border-gray-200 p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Messages</h2>
        <Link
          href="/dashboard/chat/new"
          className="mt-2 inline-block bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
        >
          New Message
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No conversations yet
          </div>
        ) : (
          conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full p-4 text-left border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                selectedId === conv.id ? 'bg-gray-50' : ''
              }`}
            >
              <div className="font-medium">
                {conv.participants.filter(p => p !== user?.id).join(', ')}
              </div>
              {conv.lastMessage && (
                <div className="text-sm text-gray-500 truncate">
                  {conv.lastMessage.content}
                </div>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
