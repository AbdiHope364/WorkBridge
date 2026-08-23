"use client";

import { io, Socket } from 'socket.io-client';
import { api } from './api';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: string;
}

class ChatService {
  private socket: Socket | null = null;
  private messageHandlers: ((message: Message) => void)[] = [];

  connect(token: string) {
    if (this.socket?.connected) return;

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001', {
      auth: { token },
      transports: ['websocket'],
    });

    this.socket.on('message', (message: Message) => {
      this.messageHandlers.forEach(handler => handler(message));
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onMessage(handler: (message: Message) => void) {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  async sendMessage(conversationId: string, content: string) {
    return api.chat.sendMessage({ conversationId, content });
  }

  async getConversations() {
    return api.chat.listConversations();
  }

  async getMessages(conversationId: string) {
    return api.chat.listMessages(conversationId);
  }

  async createConversation(participantId: string) {
    return api.chat.createConversation({ participantId });
  }
}

export const chatService = new ChatService();
