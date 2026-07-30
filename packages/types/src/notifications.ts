export type NotificationCategory =
  | "APPLICATION"
  | "JOB"
  | "ACCOUNT"
  | "VERIFICATION"
  | "SECURITY"
  | "REVIEW"
  | "SYSTEM";

export type NotificationType =
  | "APPLICATION_SUBMITTED"
  | "APPLICATION_VIEWED"
  | "APPLICATION_SHORTLISTED"
  | "APPLICATION_ACCEPTED"
  | "APPLICATION_REJECTED"
  | "APPLICATION_WITHDRAWN"
  | "JOB_APPROVED"
  | "JOB_POSTED"
  | "JOB_UPDATED"
  | "JOB_STATUS_UPDATED"
  | "JOB_REJECTED"
  | "JOB_FEATURED"
  | "JOB_UNFEATURED"
  | "JOB_DELETED"
  | "JOB_EXPIRED"
  | "JOB_CLOSED"
  | "PROFILE_VIEWED"
  | "PROFILE_CREATED"
  | "PROFILE_UPDATED"
  | "PROFILE_DELETED"
  | "WELCOME_NOTIFICATION"
  | "PASSWORD_CHANGED"
  | "ACCOUNT_VERIFIED"
  | "ACCOUNT_SUSPENDED"
  | "ACCOUNT_DEACTIVATED"
  | "VERIFICATION_SUBMITTED"
  | "VERIFICATION_APPROVED"
  | "VERIFICATION_REJECTED"
  | "NEW_COMPANY_REVIEW"
  | "REVIEW_RESPONSE"
  | "SYSTEM_ANNOUNCEMENT"
  | "MAINTENANCE_NOTICE"
  | "FEATURE_UPDATE";

export type NotificationPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface Notification {
  _id: string;
  category: NotificationCategory;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  body: string;
  isSeen: boolean;
  seenAt: string | null;
  isRead: boolean;
  readAt: string | null;
  expiresAt: string | null;
  metadata: Record<string, unknown>;
  createdAt: string;
}

export interface NotificationFeedQuery {
  category?: NotificationCategory;
  type?: NotificationType;
  priority?: NotificationPriority;
  isRead?: boolean;
  isSeen?: boolean;
  page?: number;
  limit?: number;
}

export interface NotificationFeedResponse {
  data: Notification[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface NotificationBadgeCounts {
  data: { totalUnseen: number; totalUnread: number };
}
