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
  { id: "basic-info", label: "Basic Info", isComplete: true },
  { id: "fayda-kyc", label: "Fayda National ID (KYC)", isComplete: true },
  { id: "skills", label: "Skills", isComplete: true },
  { id: "experience", label: "Experience", isComplete: true },
  { id: "education", label: "Education", isComplete: true },
  { id: "resume", label: "Resumes", isComplete: false },
];

export const profileSkills: Skill[] = [
  { _id: "1", name: "Figma design" },
  { _id: "2", name: "Node.js" },
  { _id: "3", name: "Express.js" },
  { _id: "4", name: "MongoDB" },
  { _id: "5", name: "Web services" },
  { _id: "6", name: "Photoshop" },
];

export const profileExperience: ProfileExperience = {
  id: "full-stack-developer",
  role: "Full Stack developer Intern",
  company: "Eaglelion systems technology",
  period: "07/06/2026 - 28/06/2026",
  description: "Description part here",
};

export const profileEducation: ProfileEducation = {
  id: "software-engineering",
  program: "Software Engineering",
  school: "Bachelors Degree",
  period: "Dire Dawa University",
  description: "Department of Software Engineering, Dire Dawa Institute of Technology (DDU-IoT)",
};

export const profileSocialLinks: ProfileSocialLink[] = [
  { platform: "resume", url: "abdi_abiot_resume_2026.pdf" },
  { platform: "linkedin", url: "https://linkedin.com/in/abdiabiot" },
  { platform: "github", url: "https://github.com/abdiabiot" },
  { platform: "portfolio", url: "https://abdiabiot.dev" },
];
