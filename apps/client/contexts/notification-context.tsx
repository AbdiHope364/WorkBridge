"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { api } from "@/lib/api";
import {
  Notification,
  NotificationBadgeCounts,
  NotificationFeedQuery,
  NotificationFeedResponse,
} from "@repo/types";
import { useAuth } from "./auth-context";

interface NotificationContextValue {
  isLoading: boolean;
  notifications: Notification[];
  badgeCounts: NotificationBadgeCounts | null;

  refreshNotifications: (query?: NotificationFeedQuery) => Promise<void>;
  refreshBadgeCounts: () => Promise<void>;

  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  markDropdownSeen: () => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [badgeCounts, setBadgeCounts] =
    useState<NotificationBadgeCounts | null>(null);

  const { isAuthenticated } = useAuth();

  const refreshNotifications = useCallback(
    async (query?: NotificationFeedQuery) => {
      try {
        const response: NotificationFeedResponse =
          await api.notifications.getFeed(query);
        setNotifications(response?.data ?? []);
      } catch (err) {
        setNotifications([]);
      }
    },
    [],
  );

  const refreshBadgeCounts = useCallback(async () => {
    try {
      const counts = await api.notifications.getBadgeCounts();
      setBadgeCounts(counts ?? null);
    } catch {
      setBadgeCounts(null);
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) return;

    setIsLoading(true);

    try {
      await Promise.all([refreshNotifications(), refreshBadgeCounts()]);
    } finally {
      setIsLoading(false);
    }
  }, [refreshNotifications, refreshBadgeCounts, isAuthenticated]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      await api.notifications.markRead(notificationId);
      await refresh();
    },
    [refresh],
  );

  const markAllAsRead = useCallback(async () => {
    await api.notifications.markAllRead();
    await refresh();
  }, [refresh]);

  const markDropdownSeen = useCallback(async () => {
    await api.notifications.markDropdownSeen();
    await refreshBadgeCounts();
  }, [refreshBadgeCounts]);

  const deleteNotification = useCallback(
    async (notificationId: string) => {
      await api.notifications.delete(notificationId);
      await refresh();
    },
    [refresh],
  );

  const clearAll = useCallback(async () => {
    await api.notifications.clearAll();
    await refresh();
  }, [refresh]);

  return (
    <NotificationContext.Provider
      value={{
        isLoading,
        notifications,
        badgeCounts,

        refreshNotifications,
        refreshBadgeCounts,

        markAsRead,
        markAllAsRead,
        markDropdownSeen,
        deleteNotification,
        clearAll,
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
