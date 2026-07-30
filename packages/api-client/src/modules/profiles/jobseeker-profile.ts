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
  _id: string;
  authId: string;

  firstName: string;
  lastName: string;

  phone?: string;
  gender?: Gender;
  dateOfBirth?: string;

  bio?: string;

  avatar?: Avatar;

  currentPosition?: string;
  experienceYears: number;
  experienceLevel?: ExperienceLevel;

  isOpenToWork: boolean;

  location?: Location;

  socialLinks: SocialLink[];
  skills: Skill[];
  educations: Education[];
  experiences: Experience[];

  profileCompletionScore: number;

  accountStatus: "ACTIVE" | "INACTIVE";
  verificationStatus: "UNVERIFIED" | "PENDING" | "VERIFIED" | "REJECTED";

  visibility: "PUBLIC" | "PRIVATE";

  isDeleted: boolean;
  deletedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface UpdateJobseekerProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;

  location?: Location;

  isOpenToWork?: boolean;
  visibility?: "PUBLIC" | "PRIVATE";

  socialLinks?: SocialLink[];
  skills?: Skill[];
  educations?: Education[];
  experiences?: Experience[];
}
