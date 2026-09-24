import type { FaydaKycDetails, User } from "./auth";

export interface AdminUserListItem extends User {
  isSuspended: boolean;
}

export interface VerificationRequest {
  id: string;
  userId: string;
  applicantName?: string;
  name?: string;
  userType?: "Jobseeker" | "Employer" | string;
  applicantType?: "Jobseeker" | "Employer" | string;
  documentType?: string;
  faydaFin?: string;
  faydaKyc?: FaydaKycDetails;
  status: "Pending" | "Verified" | "Rejected" | "pending" | "approved" | "rejected" | string;
  documentUrl?: string;
  submittedAt?: string;
  submittedDate?: string;
  reviewedAt?: string;
  reviewerId?: string;
  rejectionReason?: string;
}
