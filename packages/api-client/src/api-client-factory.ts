// API Client Factory
import * as authModule from "./modules/auth";
import * as jobsModule from "./modules/jobs";
import * as notificationsModule from "./modules/notifications";
import * as applicationsModule from "./modules/applications";
import * as chatModule from "./modules/chat";
import * as paymentsModule from "./modules/payments";
import * as profilesModule from "./modules/profiles";
import * as adminModule from "./modules/admin";

export interface ApiClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface ApiClient {
  auth: typeof authModule;
  jobs: typeof jobsModule;
  notifications: typeof notificationsModule;
  applications: typeof applicationsModule;
  chat: typeof chatModule;
  payments: typeof paymentsModule;
  profiles: typeof profilesModule;
  admin: typeof adminModule;
  setAuthToken: (token: string | null) => void;
  clearAuthToken: () => void;
  getAuthToken: () => string | null;
}

export function createApiClient(): ApiClient {
  let authToken: string | null = null;

  const setAuthToken = (token: string | null) => {
    authToken = token;
    if (token) {
      localStorage.setItem('workbridge_token', token);
    } else {
      localStorage.removeItem('workbridge_token');
    }
  };

  const clearAuthToken = () => {
    authToken = null;
    localStorage.removeItem('workbridge_token');
  };

  const getAuthToken = () => authToken;

  // Wrap all modules to include auth token
  const wrapWithAuth = <T extends Record<string, unknown>>(module: T): T => {
    const wrapped: Record<string, unknown> = {};
    for (const key in module) {
      const fn = module[key];
      if (typeof fn === 'function') {
        wrapped[key] = async (...args: unknown[]) => {
          // Check if token exists for authenticated endpoints
          if (!authToken) {
            // For auth endpoints, allow without token
            if (key === 'login' || key === 'forgotPassword' || key === 'resetPassword') {
              return fn(...args);
            }
            throw new Error('Authorization token missing. Please log in.');
          }
          return fn(...args);
        };
      } else {
        wrapped[key] = fn;
      }
    }
    return wrapped as T;
  };

  return {
    auth: authModule,
    jobs: wrapWithAuth(jobsModule),
    notifications: wrapWithAuth(notificationsModule),
    applications: wrapWithAuth(applicationsModule),
    chat: wrapWithAuth(chatModule),
    payments: wrapWithAuth(paymentsModule),
    profiles: wrapWithAuth(profilesModule),
    admin: wrapWithAuth(adminModule),
    setAuthToken,
    clearAuthToken,
    getAuthToken,
  };
}
