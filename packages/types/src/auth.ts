export type UserRole = "jobseeker" | "employer" | "admin";

export type FaydaKycStatus = "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";

export interface FaydaKycDetails {
  faydaNumber: string; // e.g. FIN-9042-8821-3419 or 12/16-digit FIN
  fullNameOnFayda: string;
  dateOfBirth?: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
  idFrontUrl?: string;
  idBackUrl?: string;
  photoUrl?: string;
  status: FaydaKycStatus;
  rejectionReason?: string;
  submittedAt?: string;
  verifiedAt?: string;
}

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
  faydaKyc?: FaydaKycDetails;
  faydaFin?: string;
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

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface ResetPasswordRequest {
  email?: string;
  otp?: string;
  token?: string;
  newPassword: string;
  password?: string;
}

export interface VerifyEmailRequest {
  code: string;
}

export interface ResendVerificationRequest {
  email?: string;
}
