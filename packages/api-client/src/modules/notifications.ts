import type {
  Notification,
  NotificationBadgeCounts,
  NotificationFeedQuery,
  NotificationFeedResponse,
} from "@repo/types/notifications";
import type { ApiClient } from "../http";

export function createNotificationsService(api: ApiClient) {
  return {
    getFeed(query?: NotificationFeedQuery) {
      const params = new URLSearchParams();

      if (query?.category) {
        params.set("category", query.category);
      }

      if (query?.type) {
        params.set("type", query.type);
      }

      if (query?.priority) {
        params.set("priority", query.priority);
      }

      if (query?.isRead !== undefined) {
        params.set("isRead", String(query.isRead));
      }

      if (query?.isSeen !== undefined) {
        params.set("isSeen", String(query.isSeen));
      }

      if (query?.page !== undefined) {
        params.set("page", String(query.page));
      }

      if (query?.limit !== undefined) {
        params.set("limit", String(query.limit));
      }

      return api.request<NotificationFeedResponse>(
        `/notifications${params.toString() ? `?${params}` : ""}`,
      );
    },

    getById(notificationId: string) {
      return api.request<Notification>(`/notifications/${notificationId}`);
    },

    getBadgeCounts() {
      return api.request<NotificationBadgeCounts>("/notifications/meta/badges");
    },

    markDropdownSeen() {
      return api.request<void>("/notifications/mark-seen", {
        method: "PATCH",
      });
    },

    markAllRead() {
      return api.request<void>("/notifications/mark-all-read", {
        method: "PATCH",
      });
    },

    markRead(notificationId: string) {
      return api.request<void>(`/notifications/${notificationId}/read`, {
        method: "PATCH",
      });
    },

    delete(notificationId: string) {
      return api.request<void>(`/notifications/${notificationId}`, {
        method: "PATCH",
      });
    },

    clearAll() {
      return api.request<void>("/notifications/all", {
        method: "PATCH",
      });
    },
  };
}
