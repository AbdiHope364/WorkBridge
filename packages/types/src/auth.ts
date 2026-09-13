export type UserRole = "jobseeker" | "employer" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  fullName: string;
  phoneNumber?: string;
  avatarUrl?: string;
  status: "active" | "inactive" | "suspended";
  subscriptionTier?: "free" | "pro_monthly" | "pro_annual";
  applicationsUsedThisMonth?: number;
  jobPostsUsed?: number;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

export interface AuthSession {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName?: string;
  phoneNumber?: string;
  role: Exclude<UserRole, "admin">;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface VerifyEmailRequest {
  code: string;
}

export interface ResendVerificationRequest {
  email?: string;
}
