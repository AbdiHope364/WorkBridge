import { Avatar, Gender, Location, SocialLink } from "./common";

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export interface Experience {
  _id: string;
  companyName: string;
  position: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
}

export interface Skill {
  _id: string;
  name: string;
  level?: SkillLevel;
  yearsOfExperience?: number;
}

export interface Education {
  _id: string;
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export type ExperienceLevel = "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "LEAD";

export interface JobseekerProfile {
  _id?: string;
  id?: string;
  authId?: string;
  userId?: string;

  firstName?: string;
  lastName?: string;
  fullName?: string;

  phone?: string;
  gender?: Gender | string;
  dateOfBirth?: string;

  bio?: string;

  avatar?: Avatar;

  headline?: string;
  currentPosition?: string;
  experienceYears?: number;
  experienceLevel?: ExperienceLevel;
  hourlyRate?: number;

  isOpenToWork?: boolean;

  location?: Location | any;

  socialLinks?: SocialLink[];
  skills?: (Skill | string)[];
  educations?: Education[];
  experiences?: Experience[];

  profileCompletionScore?: number;

  accountStatus?: "ACTIVE" | "INACTIVE";
  verificationStatus?: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  faydaFin?: string;
  faydaStatus?: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  nationalIdNumber?: string;
  frontDocName?: string;
  backDocName?: string;

  visibility?: "PUBLIC" | "PRIVATE";

  isDeleted?: boolean;
  deletedAt?: string | null;

  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateJobseekerProfileRequest {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  phone?: string;
  gender?: Gender | string;
  dateOfBirth?: string;
  bio?: string;
  headline?: string;
  currentPosition?: string;
  experienceYears?: number;
  hourlyRate?: number;

  location?: Location | any;

  isOpenToWork?: boolean;
  visibility?: "PUBLIC" | "PRIVATE";

  socialLinks?: SocialLink[];
  skills?: (Skill | string)[];
  educations?: Education[];
  experiences?: Experience[];
  faydaFin?: string;
  faydaStatus?: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";
  nationalIdNumber?: string;
  frontDocName?: string;
  backDocName?: string;
}
