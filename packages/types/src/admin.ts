import type { FaydaKycDetails, User } from "./auth";

export interface AdminUserListItem extends User {
  isSuspended: boolean;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  applicantName?: string;
  applicantType?: "Jobseeker" | "Employer";
  documentType?: "Fayda National ID" | "Trade License" | "Passport" | "Business License";
  faydaFin?: string;
  faydaKyc?: FaydaKycDetails;
  status: "pending" | "approved" | "rejected";
  documentUrl: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  rejectionReason?: string;
}
