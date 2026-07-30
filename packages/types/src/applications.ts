export type ApplicationStatus =
  | "submitted"
  | "reviewing"
  | "shortlisted"
  | "rejected"
  | "hired";

export interface JobApplication {
  id: string;
  jobId: string;
  applicantId: string;
  coverLetter?: string;
  resumeUrl?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationRequest {
  jobId: string;
  coverLetter?: string;
  resumeUrl?: string;
}
