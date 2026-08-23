"use client";

import { 
  createApiClient as createApiClientBase,
  type ApiClient,
} from "@repo/api-client/src/http";
import { createAuthService } from "@repo/api-client/src/modules/auth";
import { createApplicationsService } from "@repo/api-client/src/modules/applications";
import { createChatService } from "@repo/api-client/src/modules/chat";
import { createNotificationsService } from "@repo/api-client/src/modules/notifications";
import { createPaymentsService } from "@repo/api-client/src/modules/payments";

// Create the API client with proper options
export function createApiClient(options: {
  baseUrl: string;
  getAccessToken?: () => string | undefined | Promise<string | undefined>;
  onUnauthorized?: () => void | Promise<void>;
}) {
  return createApiClientBase({
    baseUrl: options.baseUrl,
    getAccessToken: options.getAccessToken || (() => undefined),
    onUnauthorized: options.onUnauthorized || (() => {}),
  });
}

// Create Jobs Service
export function createJobsService(api: ApiClient) {
  return {
    getAll: async (params?: any) => {
      const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
      return api.request(`/jobs${queryString}`);
    },
    getRecent: async (limit: number = 5) => {
      return api.request(`/jobs?_limit=${limit}&_sort=createdAt&_order=desc`);
    },
    getById: async (id: string) => {
      return api.request(`/jobs/${id}`);
    },
    getFeatured: async () => {
      return api.request(`/jobs?featured=true`);
    },
    create: async (data: any) => {
      return api.request("/jobs", {
        method: "POST",
        body: data,
      });
    },
    update: async (id: string, data: any) => {
      return api.request(`/jobs/${id}`, {
        method: "PUT",
        body: data,
      });
    },
    delete: async (id: string) => {
      return api.request(`/jobs/${id}`, {
        method: "DELETE",
      });
    },
    search: async (query: string) => {
      return api.request(`/jobs?q=${encodeURIComponent(query)}`);
    },
    getJobseekerDashboard: async () => {
      return api.request(`/dashboard/jobseeker`);
    },
  };
}

// Re-export existing services directly
export { 
  createAuthService,
  createApplicationsService,
  createChatService,
  createNotificationsService,
  createPaymentsService,
};

// Create Employer Profile Service
export function createEmployerProfileService(api: ApiClient) {
  return {
    getByUser: async (userId: string) => {
      return api.request(`/employer-profiles?userId=${userId}`);
    },
    update: async (data: any) => {
      return api.request("/employer-profiles", {
        method: "PUT",
        body: data,
      });
    },
    create: async (data: any) => {
      return api.request("/employer-profiles", {
        method: "POST",
        body: data,
      });
    },
    getCompany: async (companyId: string) => {
      return api.request(`/employer-profiles/${companyId}`);
    },
  };
}

// Create Jobseeker Profile Service
export function createJobseekerProfileService(api: ApiClient) {
  return {
    getByUser: async (userId: string) => {
      return api.request(`/jobseeker-profiles?userId=${userId}`);
    },
    update: async (data: any) => {
      return api.request("/jobseeker-profiles", {
        method: "PUT",
        body: data,
      });
    },
    create: async (data: any) => {
      return api.request("/jobseeker-profiles", {
        method: "POST",
        body: data,
      });
    },
    getResume: async (userId: string) => {
      return api.request(`/jobseeker-profiles/${userId}/resume`);
    },
  };
}
