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
  // Implementation
}

export function getSessionCookie() {
  // Implementation
  return undefined;
}

// Create the API client instance
const apiClient = createApiClient({
  baseUrl: env.NEXT_PUBLIC_API_URL,
  getAccessToken: () => {
    return undefined;
  },
  onUnauthorized: () => {
    console.warn("Unauthorized access detected");
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
