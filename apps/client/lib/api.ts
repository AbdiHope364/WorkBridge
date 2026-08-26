"use client";

import {
  createApiClient,
  createApplicationsService,
  createAuthService,
  createChatService,
  createEmployerProfileService,
  createJobseekerProfileService,
  createJobsService,
  createNotificationsService,
  createPaymentsService,
} from "./api-client-wrapper";
import { env } from "./env";

// Helper functions for session management
export function setSessionCookie() {
  // Implementation - this would typically set a cookie with the session token
}

export function getSessionCookie() {
  // Implementation - this would typically get the session token from cookies
  return undefined;
}

export function clearSessionCookie() {
  // Session persistence is not implemented yet.
}

// Create the API client instance
const apiClient = createApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  getAccessToken: () => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem("workbridge_token") ?? undefined;
  },
  onUnauthorized: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("workbridge_token");
      window.location.href = "/login";
    }
  },
});

// Create individual services
const authService = createAuthService(apiClient);
const jobsService = createJobsService(apiClient);
const applicationsService = createApplicationsService(apiClient);
const chatService = createChatService(apiClient);
const notificationsService = createNotificationsService(apiClient);
const paymentsService = createPaymentsService(apiClient);
const employerProfileService = createEmployerProfileService(apiClient);
const jobseekerProfileService = createJobseekerProfileService(apiClient);

// Export individual services
export {
  authService,
  jobsService,
  applicationsService,
  chatService,
  notificationsService,
  paymentsService,
  employerProfileService,
  jobseekerProfileService,
  apiClient,
};

// Create a unified api object for backward compatibility
export const api = {
  client: apiClient,
  auth: authService,
  jobs: jobsService,
  applications: applicationsService,
  chat: chatService,
  notifications: notificationsService,
  payments: paymentsService,
  employer: employerProfileService,
  jobseeker: jobseekerProfileService,
  profiles: {
    employer: employerProfileService,
    jobseeker: jobseekerProfileService,
  },
};

// Also export the service creators for flexibility
export {
  createApiClient,
  createAuthService,
  createJobsService,
  createApplicationsService,
  createChatService,
  createNotificationsService,
  createPaymentsService,
  createEmployerProfileService,
  createJobseekerProfileService,
};
