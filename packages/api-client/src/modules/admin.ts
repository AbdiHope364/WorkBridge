import type { AdminUserListItem, VerificationRequest } from "@repo/types/admin";
import type { ApiClient } from "../http";

export function createAdminService(api: ApiClient) {
  return {
    listUsers() {
      return api.request<AdminUserListItem[]>("/admin/users");
    },
    listVerificationRequests() {
      return api.request<VerificationRequest[]>("/admin/verifications");
    },
    approveVerification(id: string) {
      return api.request<void>(`/admin/verifications/${id}/approve`, {
        method: "POST",
      });
    },
  };
}
