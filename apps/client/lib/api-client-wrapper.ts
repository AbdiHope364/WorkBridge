"use client";

import {
  createApiClient as createApiClientBase,
  type ApiClient,
  createAuthService,
  createApplicationsService,
  createChatService,
  createNotificationsService,
  createPaymentsService,
  createJobsApi,
} from "@repo/api-client";

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

// Create Jobs Service wrapper (adapting jobsApi to the expected format)
export function createJobsService(api: ApiClient) {
  const jobsApi = createJobsApi(api);

  return {
    getAll: async (params?: any) => {
      return jobsApi.getJobs(params);
    },
    getById: async (id: string) => {
      return api.request(`/jobs/${id}`);
    },
    getJobs: async (params?: Record<string, string | number | boolean | undefined>) => {
      return jobsApi.getJobs(params);
    },
    getJob: async (id: string) => {
      return api.request(`/jobs/${id}`);
    },
    create: async (data: any) => {
      return api.request("/jobs", {
        method: "POST",
        body: data,
      });
    },
    createJob: async (data: any) => {
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
    updateJob: async (id: string, data: any) => {
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
    getEmployerDashboard: async () => api.request("/jobs/employer/dashboard"),
    getEmployerJobs: async (params?: Record<string, string | number | boolean | undefined>) =>
      api.request("/jobs/employer", { query: params }),
    getJobseekerDashboard: async () => api.request("/jobs/jobseeker/dashboard"),
    getSavedJobs: async () => api.request("/jobs/saved"),
    saveJob: async (id: string) =>
      api.request(`/jobs/${id}/save`, { method: "POST" }),
    removeSavedJob: async (id: string) =>
      api.request(`/jobs/saved/${id}`, { method: "DELETE" }),
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
    getMyProfile: () => api.request<any>("/profiles/employer/me"),
    getByUser: async (userId: string) => {
      return api.request<any>(`/employer-profiles?userId=${userId}`);
    },
    update: async (data: any) => {
      return api.request<any>("/employer-profiles", {
        method: "PUT",
        body: data,
      });
    },
    create: async (data: any) => {
      return api.request<any>("/employer-profiles", {
        method: "POST",
        body: data,
      });
    },
    createCompanyProfile: (data: any) =>
      api.request<any>("/profiles/employer/company", { method: "POST", body: data }),
    createMyIndividualProfile: (data: any) =>
      api.request<any>("/profiles/employer/individual", { method: "POST", body: data }),
    updateCompanyProfile: (data: any) =>
      api.request<any>("/profiles/employer/company", { method: "PUT", body: data }),
    updateMyIndividualProfile: (data: any) =>
      api.request<any>("/profiles/employer/individual", { method: "PUT", body: data }),
    uploadAvatar: (file: File) =>
      api.request<any>("/profiles/employer/avatar", { method: "POST", body: file }),
    uploadLogo: (file: File) =>
      api.request<any>("/profiles/employer/logo", { method: "POST", body: file }),
    uploadBanner: (file: File) =>
      api.request<any>("/profiles/employer/banner", { method: "POST", body: file }),
  };
}

// Create Jobseeker Profile Service
export function createJobseekerProfileService(api: ApiClient) {
  return {
    getMyProfile: () => api.request<any>("/profiles/jobseeker/me"),
    getByUser: async (userId: string) => {
      return api.request<any>(`/jobseeker-profiles?userId=${userId}`);
    },
    update: async (data: any) => {
      return api.request<any>("/jobseeker-profiles", {
        method: "PUT",
        body: data,
      });
    },
    create: async (data: any) => {
      return api.request<any>("/jobseeker-profiles", {
        method: "POST",
        body: data,
      });
    },
    createProfile: (data: any) =>
      api.request<any>("/profiles/jobseeker", { method: "POST", body: data }),
    updateMyProfile: (data: any) =>
      api.request<any>("/profiles/jobseeker/me", { method: "PUT", body: data }),
    uploadAvatar: (file: File) =>
      api.request<any>("/profiles/jobseeker/avatar", { method: "POST", body: file }),
  };
}
