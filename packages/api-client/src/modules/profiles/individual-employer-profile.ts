import { Avatar, Gender, Location, SocialLink } from "./common";

export interface IndividualEmployerProfile {
  _id: string;
  authId: string;
  employerType: "INDIVIDUAL_EMPLOYER";
  fullName: string;
  socialLink: SocialLink;
  profilePictureUrl?: Avatar;
  phoneNumber?: string;
  gender?: Gender;
  dateOfBirth?: string;
  occupation?: string;
  bio?: string;
  location?: Location;
  socialLinks: SocialLink[];
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  verifiedAt?: string | null;
  nationalIdNumber?: string;
  nationalIdDocumentUrl?: Avatar;
  businessLicenseNumber?: string;
  businessLicenseDocumentUrl?: Avatar;
  address?: string;
  verificationRejectedReason?: string;
  verificationReviewedAt?: string | null;
  emergencyContactNumber?: string;

  canPostJobs: boolean;

  trustScore: number;

  isProfileCompleted: boolean;
  profileCompletionPercentage: number;

  accountStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED";

  lastActiveAt?: string | null;

  totalJobsPosted: number;
  totalHires: number;
  totalApplicantsReceived: number;

  averageRating: number;
  totalReviews: number;

  deletedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateIndividualEmployerProfileRequest {
  fullName?: string;
  profilePictureUrl?: Avatar;
  phoneNumber?: string;
  gender?: Gender;
  dateOfBirth?: string;
  occupation?: string;
  bio?: string;
  location?: Location;
  socialLinks?: SocialLink[];
  emergencyContactNumber?: string;
  nationalIdNumber?: string;
  nationalIdDocumentUrl?: Avatar;
  businessLicenseNumber?: string;
  businessLicenseDocumentUrl?: Avatar;
  address?: string;
}
