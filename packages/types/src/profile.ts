import type { FaydaKycDetails } from "./auth";

export interface WorkerKycProfile {
  id: string;
  userId: string;
  fullName: string;
  tradeTitle?: string;
  faydaKyc: FaydaKycDetails;
  isVerified: boolean;
  city?: string;
  hourlyRate?: number;
}

export interface EmployerKycProfile {
  id: string;
  userId: string;
  employerType: "INDIVIDUAL" | "COMPANY";
  companyName?: string;
  contactPersonName?: string;
  faydaKyc: FaydaKycDetails;
  tradeLicenseNumber?: string;
  tinNumber?: string;
  isVerified: boolean;
}
