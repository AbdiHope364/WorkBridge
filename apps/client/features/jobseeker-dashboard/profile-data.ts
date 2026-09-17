import type { Skill } from "@repo/api-client";

export interface ProfileChecklistItem {
  id: string;
  label: string;
  isComplete: boolean;
}

export interface ProfileExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ProfileEducation {
  id: string;
  program: string;
  school: string;
  period: string;
  description: string;
}

export interface ProfileSocialLink {
  platform: string;
  url: string;
}

export const profileChecklist: ProfileChecklistItem[] = [
  { id: "basic-info", label: "Basic Info", isComplete: false },
  { id: "fayda-kyc", label: "Fayda National ID (KYC)", isComplete: false },
  { id: "skills", label: "Skills", isComplete: false },
  { id: "experience", label: "Experience", isComplete: false },
  { id: "education", label: "Education", isComplete: false },
  { id: "resume", label: "Resumes", isComplete: false },
];

export const profileSkills: Skill[] = [];

export const profileExperience: ProfileExperience = {
  id: "",
  role: "",
  company: "",
  period: "",
  description: "",
};

export const profileEducation: ProfileEducation = {
  id: "",
  program: "",
  school: "",
  period: "",
  description: "",
};

export const profileSocialLinks: ProfileSocialLink[] = [];
