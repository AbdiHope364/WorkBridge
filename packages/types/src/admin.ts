import type { User } from "./auth";

export interface AdminUserListItem extends User {
  isSuspended: boolean;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  documentUrl: string;
  submittedAt: string;
}
