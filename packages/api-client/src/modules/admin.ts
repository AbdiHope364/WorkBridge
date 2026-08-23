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

export interface DashboardStats {
  totalJobseekers: number;
  totalEmployers: number;
  activeJobs: number;
  totalApplications: number;
}

export interface OverviewPoint {
  name: string;
  jobseeker: number;
  employer: number;
  jobs: number;
  applications: number;
}

export interface JobStatusPoint {
  name: string;
  value: number;
}

export interface CategoryPoint {
  name: string;
  count: number;
}

export interface VerificationPoint {
  name: string;
  value: number;
  color: string;
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
    async getDashboardStats() {
      const response = await api.request<DashboardStats>("/admin/dashboard/stats");
      return response;
    },
    async getDashboardOverview() {
      const response = await api.request<{ overviewData: OverviewPoint[] }>("/admin/dashboard/overview");
      return response.overviewData;
    },
    async getDashboardJobStatus() {
      const response = await api.request<{ jobStatusData: JobStatusPoint[] }>("/admin/dashboard/job-status");
      return response.jobStatusData;
    },
    async getDashboardCategories() {
      const response = await api.request<{ categories: CategoryPoint[] }>("/admin/dashboard/categories");
      return response.categories;
    },
    async getDashboardVerifications() {
      const response = await api.request<{ verificationData: VerificationPoint[] }>("/admin/dashboard/verifications");
      return response.verificationData;
    },
  };
}
