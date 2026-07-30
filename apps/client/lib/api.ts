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
} from "@repo/api-client";
import { env } from "./env";

export function setSessionCookie() {
  document.cookie = "workbridge_session=1; path=/; max-age=86400; SameSite=Lax";
}

export function clearSessionCookie() {
  document.cookie = "workbridge_session=; path=/; max-age=0; SameSite=Lax";
}

export const apiClient = createApiClient({
  baseUrl: `${env.apiBaseUrl}/api/v1`,

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

export const api = {
  applications: createApplicationsService(apiClient),
  auth: createAuthService(apiClient),
  jobs: createJobsService(apiClient),
  chat: createChatService(apiClient),
  notifications: createNotificationsService(apiClient),
  payments: createPaymentsService(apiClient),
  profiles: {
    jobseeker: createJobseekerProfileService(apiClient),
    employer: createEmployerProfileService(apiClient),
  },
};
