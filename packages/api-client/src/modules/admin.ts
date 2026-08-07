import type { VerificationRequest } from "@repo/types/admin";
import type { ApiClient } from "../http";

export interface BackendAdminUser {
  id: string;
  name: string;
  email: string;
  role: "worker" | "employer" | "admin";
  verified: boolean;
  profile?: Record<string, unknown>;
}

export interface BackendJob {
  id: number;
  title: string;
  company: string;
  category: string;
  type: string;
  createdAt: string;
  isActive: boolean;
  applicants: string[];
}

export function createAdminService(api: ApiClient) {
  return {
    async listUsers() {
      const response = await api.request<{ users: BackendAdminUser[] }>("/admin/users");
      return response.users;
    },
    async listJobs() {
      const response = await api.request<{ jobs: BackendJob[] }>("/admin/jobs");
      return response.jobs;
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
