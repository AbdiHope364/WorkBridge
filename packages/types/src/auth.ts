export type UserRole = "jobseeker" | "employer" | "admin";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  fullName: "";
  status: "active" | "inactive" | "suspended";
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
  role: Exclude<UserRole, "admin">;
}

export interface VerifyEmailRequest {
  code: string;
}

export interface ResendVerificationRequest {
  email?: string;
}
