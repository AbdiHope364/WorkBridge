"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { api } from "@/lib/api";
import { useAuth } from "./auth-context";
import type { Notification } from "@repo/types";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    if (!isAuthenticated) {
      setNotifications([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await api.notifications.getFeed();
      setNotifications(response?.data ?? []);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      setError("Failed to load notifications");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    if (!isAuthenticated) return;
    try {
      await api.notifications.markRead(id);
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!isAuthenticated) return;
    try {
      await api.notifications.markAllRead();
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark all notifications as read:", error);
    }
  };

  const deleteNotification = async (id: string) => {
    if (!isAuthenticated) return;
    try {
      await api.notifications.delete(id);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const clearAll = async () => {
    if (!isAuthenticated) return;
    try {
      await api.notifications.clearAll();
      setNotifications([]);
    } catch (error) {
      console.error("Failed to clear all notifications:", error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    fetchNotifications();
  }, [isAuthenticated]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        isLoading,
        error,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        fetchNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return context;
}
