import type {
  Job,
  JobStatus,
  JobListResponse,
  JobSearchParams,
  CreateJobRequest,
  UpdateJobRequest,
  UpdateJobStatusRequest,
  JobseekerAnalytics,
  EmployerAnalytics,
  AdminAnalytics,
} from '@repo/types/jobs';

import type { ApiClient } from '../http';

export function createJobsService(api: ApiClient) {
  return {
    getJobs(query?: JobSearchParams) {
      return api.request<JobListResponse>('/jobs', {
        query: query as Record<string, string | number | boolean | undefined>,
      });
    },

    getJob(id: string) {
      return api.request<Job>(`/jobs/${id}`);
    },

    getJobBySlug(slug: string) {
      return api.request<Job>(`/jobs/slug/${slug}`);
    },

    createJob(payload: CreateJobRequest) {
      return api.request<Job>('/jobs', {
        method: 'POST',
        body: payload,
      });
    },

    saveDraft(payload: CreateJobRequest) {
      return api.request<Job>('/jobs/draft', {
        method: 'POST',
        body: payload,
      });
    },

    publishDraft(id: string) {
      return api.request<Job>(`/jobs/${id}/publish`, {
        method: 'PATCH',
      });
    },

    updateJob(id: string, payload: UpdateJobRequest) {
      return api.request<Job>(`/jobs/${id}`, {
        method: 'PATCH',
        body: payload,
      });
    },

    updateStatus(id: string, payload: UpdateJobStatusRequest) {
      return api.request<Job>(`/jobs/${id}/status`, {
        method: 'PATCH',
        body: payload,
      });
    },

    deleteJob(id: string) {
      return api.request<void>(`/jobs/${id}`, {
        method: 'DELETE',
      });
    },

    getEmployerJobs(query?: {
      page?: number;
      limit?: number;
      status?: JobStatus;
    }) {
      return api.request<JobListResponse>('/jobs/my-jobs', {
        query,
      });
    },

    getDraftJobs() {
      return api.request<JobListResponse>('/jobs/drafts');
    },

    getSavedJobs() {
      return api.request<any>('/jobs/saved-job');
    },

    saveJob(jobId: string) {
      return api.request<any>('/jobs/saved-job', {
        method: 'POST',
        body: { jobId },
      });
    },

    removeSavedJob(jobId: string) {
      return api.request<void>(`/jobs/saved-job/${jobId}`, {
        method: 'DELETE',
      });
    },

    getJobseekerDashboard() {
      return api.request<JobseekerAnalytics>('/jobs/analytics/seeker');
    },

    getEmployerDashboard() {
      return api.request<EmployerAnalytics>('/jobs/analytics/employer');
    },

    getAdminDashboard() {
      return api.request<AdminAnalytics>('/jobs/analytics/admin');
    },
  };
}
