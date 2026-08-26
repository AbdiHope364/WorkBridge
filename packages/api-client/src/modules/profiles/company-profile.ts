import { Avatar, Coordinates, SocialLink } from "./common";

export type CompanySize =
  | "1-10"
  | "11-50"
  | "51-200"
  | "201-500"
  | "501-1000"
  | "1001-5000"
  | "5000+";

export type VerificationStatus =
  | "UNVERIFIED"
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";

export interface Headquarters {
  country: string;
  region: string;
  city: string;
  addressLine: string;
  coordinates?: Coordinates;
}

export interface CompanyProfile {
  _id: string;
  authId: string;
  employerType: "COMPANY_EMPLOYER";
  companyName: string;
  companyLogoUrl?: Avatar;
  companyBannerUrl?: Avatar;
  companyDescription?: string;
  tagline?: string;
  industry?: string;
  companySize?: CompanySize;
  foundedYear?: number;
  officialWebsite?: string;
  phoneNumber?: string;
  address?: string;
  headquarters?: Headquarters;
  socialLinks: SocialLink[];
  benefits: string[];
  companyCulture: string[];
  businessLicenseNumber?: string;
  businessLicenseDocumentUrl?: Avatar;
  nationalIdOrPassportNumber?: string;
  nationalIdOrPassportDocumentUrl?: Avatar;
  verificationStatus: VerificationStatus;
  verifiedAt?: string | null;
  totalJobsPosted: number;
  totalApplicantsReceived: number;
  totalEmployeesHired: number;
  averageRating: number;
  totalReviews: number;
  isProfileCompleted: boolean;
  canPostJobs: boolean;
  isPublicProfileVisible: boolean;
  profileCompletionPercentage: number;
  lastActiveAt?: string | null;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyProfileRequest {
  companyName?: string;
  companyLogoUrl?: Avatar;
  companyBannerUrl?: Avatar;
  companyDescription?: string;
  tagline?: string;
  industry?: string;
  companySize?: CompanySize;
  foundedYear?: number;
  officialWebsite?: string;
  phoneNumber?: string;
  address?: string;
  headquarters?: Headquarters;
  socialLinks?: SocialLink[];
  benefits?: string[];
  companyCulture?: string[];
  businessLicenseNumber?: string;
  businessLicenseDocumentUrl?: Avatar;
  nationalIdOrPassportNumber?: string;
  nationalIdOrPassportDocumentUrl?: Avatar;
  isPublicProfileVisible?: boolean;
}
