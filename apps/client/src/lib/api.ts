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
import { env } from "../../lib/env";

// Helper functions for session management
export function setSessionCookie() {
  if (typeof window === "undefined") return;
  document.cookie = "session=true; path=/; max-age=604800";
}

export function getSessionCookie() {
  if (typeof window === "undefined") return undefined;
  return document.cookie.includes("session=true");
}

export function clearSessionCookie() {
  if (typeof window === "undefined") return;
  document.cookie = "session=; path=/; max-age=0";
}

// Token management functions
export function setAuthToken(token: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("workbridge_token", token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("workbridge_token");
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("workbridge_token");
  return token && token !== "undefined" && token !== "null" ? token : null;
}

// Create the API client instance
const apiClient = createApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  getAccessToken: () => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const token = localStorage.getItem("workbridge_token");
    return token && token !== "undefined" && token !== "null"
      ? token
      : undefined;
  },
  onUnauthorized: () => {
    localStorage.removeItem("workbridge_token");
    clearSessionCookie();
    window.location.assign("/login");
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
