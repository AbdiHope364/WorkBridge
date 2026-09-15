import type {
  AuthSession,
  LoginRequest,
  RegisterRequest,
  User,
} from "@repo/types/auth";
import type { ApiClient } from "../http";

export function createAuthService(api: ApiClient) {
  return {
    login(payload: LoginRequest) {
      return api.request<AuthSession>("/auth/login", {
        method: "POST",
        body: payload,
      });
    },
    register(payload: RegisterRequest) {
      return api.request<AuthSession>("/auth/register", {
        method: "POST",
        body: payload,
      });
    },
    googleLogin() {
      return api.request("/auth/google");
    },
    async me() {
      const response = await api.request<{ user: User }>("/auth/me");
      return response.user;
    },
    logout() {
      return api.request<void>("/auth/logout", { method: "POST" });
    },
    forgotPassword(payload: { email: string }) {
      return api.request<{ message: string; email?: string; otp?: string; resetToken?: string; resetUrl?: string }>("/auth/forgot-password", {
        method: "POST",
        body: payload,
      });
    },
    verifyOtp(payload: { email: string; otp: string }) {
      return api.request<{ success: boolean; message: string; resetToken?: string }>("/auth/verify-otp", {
        method: "POST",
        body: payload,
      });
    },
    resetPassword(payload: { token?: string; email?: string; otp?: string; newPassword?: string; password?: string }) {
      return api.request<{ message: string }>("/auth/reset-password", {
        method: "POST",
        body: payload,
      });
    },
    verifyEmail(payload: { code: string }) {
      return api.request<void>("/auth/verify-email", {
        method: "POST",
        body: payload,
      });
    },
    resendVerification(payload?: { email?: string }) {
      return api.request<void>("/auth/resend-verification", {
        method: "POST",
        body: payload,
      });
    },
  };
}
