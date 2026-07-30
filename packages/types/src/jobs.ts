// ================================
// CONSTANTS
// ================================

export const JOB_STATUSES = [
  'OPEN',
  'CLOSED',
  'DRAFT',
  'EXPIRED',
  'PAUSED',
  'REMOVED',
] as const;

export const JOB_TYPES = [
  'ONE_TIME',
  'FULL_TIME',
  'PART_TIME',
  'CONTRACT',
  'FREELANCE',
  'INTERNSHIP',
  'TEMPORARY',
] as const;

export const WORKPLACE_TYPES = ['REMOTE', 'ONSITE', 'HYBRID'] as const;

export const WORKER_TYPES = ['DIGITAL', 'PHYSICAL'] as const;

export const EXPERIENCE_LEVELS = [
  'ENTRY',
  'JUNIOR',
  'INTERMEDIATE',
  'SENIOR',
  'EXPERT',
] as const;

export const BUDGET_TYPES = [
  'FIXED',
  'HOURLY',
  'DAILY',
  'MONTHLY',
  'MILESTONE',
] as const;

export const JOB_APPROVAL_STATUSES = [
  'PENDING',
  'APPROVED',
  'REJECTED',
] as const;

export const JOB_CATEGORIES = [
  'SOFTWARE_DEVELOPMENT',
  'DESIGN_AND_CREATIVE',
  'MARKETING_AND_SALES',
  'WRITING_AND_TRANSLATION',
  'FINANCE_AND_ACCOUNTING',
  'CUSTOMER_SUPPORT',
  'LOGISTICS_AND_DRIVING',
  'CONSTRUCTION_AND_TRADES',
  'HOSPITALITY_AND_CATERING',
  'RETAIL_AND_SALES_FLOOR',
  'HEALTHCARE_AND_WELLNESS',
  'CLEANING_AND_MAINTENANCE',
  'EVENT_GIGS_AND_PROMOTIONS',
  'QUICK_TASK_AND_ERRANDS',
  'DATA_ENTRY_AND_TRANSCRIPTION',
  'OTHER',
] as const;

// ================================
// TYPES (derived from constants)
// ================================

export type JobStatus = (typeof JOB_STATUSES)[number];

export type JobType = (typeof JOB_TYPES)[number];

export type WorkplaceType = (typeof WORKPLACE_TYPES)[number];

export type WorkerType = (typeof WORKER_TYPES)[number];

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export type BudgetType = (typeof BUDGET_TYPES)[number];

export type JobApprovalStatus = (typeof JOB_APPROVAL_STATUSES)[number];

export type JobCategory = (typeof JOB_CATEGORIES)[number];

// ================================
// SHARED TYPES
// ================================

export interface JobSkill {
  name: string;
}

export interface JobLocation {
  country: string;
  region?: string;
  city: string;
}

export interface EmployerSnapshot {
  authId: string;

  type?: string;

  displayName: string;

  profilePicture?: string;

  logo?: string;

  banner?: string;

  phoneNumber?: string;

  bio?: string;

  description?: string;

  industry?: string;

  companySize?: string;

  officialWebsite?: string;

  displayLocation?: string;

  location?: Record<string, unknown>;

  socialLinks?: unknown[];

  verified: boolean;
}

// ================================
// DOMAIN TYPES
// ================================

export interface Job {
  id: string;

  title: string;

  slug: string;

  description: string;

  employerId: string;

  category: JobCategory;

  skills: JobSkill[];

  jobType: JobType;

  workplaceType: WorkplaceType;

  workerType: WorkerType;

  experienceLevel: ExperienceLevel;

  salary: number;

  budget: BudgetType;

  location: JobLocation;

  status: JobStatus;

  deadline: string;

  isUrgent: boolean;

  vacancies: number;

  featured: boolean;

  approvalStatus: JobApprovalStatus;

  approvalReason?: string | null;

  approvedBy?: string | null;

  approvedAt?: string | null;

  employerSnapshot: EmployerSnapshot;

  applicationsCount: number;

  shortlistedCount: number;

  interviewCount: number;

  hiredCount: number;

  rejectedCount: number;

  viewsCount: number;

  publishedAt?: string | null;

  closedAt?: string | null;

  createdAt: string;

  updatedAt: string;
}

// ================================
// REQUESTS
// ================================

export interface CreateJobRequest {
  title: string;

  description: string;

  category: JobCategory;

  skills: JobSkill[];

  jobType: JobType;

  workplaceType: WorkplaceType;

  workerType: WorkerType;

  experienceLevel: ExperienceLevel;

  salary: number;

  budget: BudgetType;

  deadline: string;

  vacancies?: number;

  isUrgent?: boolean;

  location: JobLocation;
}

export interface UpdateJobRequest extends Partial<CreateJobRequest> {}

export interface UpdateJobStatusRequest {
  status: JobStatus;
}

// ================================
// SEARCH
// ================================

export interface JobSearchParams {
  query?: string;

  category?: JobCategory;

  jobType?: JobType;

  workplaceType?: WorkplaceType;

  workerType?: WorkerType;

  experienceLevel?: ExperienceLevel;

  city?: string;

  page?: number;

  limit?: number;

  sortBy?: 'createdAt' | 'salary' | 'deadline';

  sortOrder?: 'asc' | 'desc';
}

// ================================
// RESPONSES
// ================================

export interface JobListResponse {
  jobs: Job[];

  total: number;

  page: number;

  limit: number;

  totalPages: number;
}

export interface JobAnalytics {
  applicationsCount: number;

  shortlistedCount: number;

  interviewCount: number;

  hiredCount: number;

  rejectedCount: number;

  viewsCount: number;
}

// ================================
// SERVICE CONTRACT
// ================================

export interface JobService {
  getJobs(params?: JobSearchParams): Promise<JobListResponse>;

  getJob(id: string): Promise<Job>;

  getJobBySlug(slug: string): Promise<Job>;

  createJob(payload: CreateJobRequest): Promise<Job>;

  updateJob(id: string, payload: UpdateJobRequest): Promise<Job>;

  updateStatus(id: string, payload: UpdateJobStatusRequest): Promise<Job>;

  deleteJob(id: string): Promise<void>;
}

export type JobseekerAnalytics = {
  totalApplications: number;
  shortlisted: number;
  interviews: number;
  hired: number;
  rejected: number;
  profileViews: number;
  recentActivities: {
    id: string;
    title: string;
    description: string;
    time: string;
  }[];
};

export type EmployerAnalytics = {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  hired: number;
  rejected: number;
  views: number;
};

export type AdminAnalytics = {
  totalUsers: number;
  totalJobs: number;
  totalApplications: number;
  activeJobs: number;
  systemHealth: number;
};