import type { ApiClient } from '../http.js';

export function createJobsService(api: ApiClient) {
  return {
    getJobs(params?: Record<string, string | number | boolean | undefined>) {
      return api.request('/jobs', { query: params });
    },
    getJob(id: string | number) {
      return api.request(`/jobs/${id}`);
    },
    createJob(payload: Record<string, unknown>) {
      return api.request('/jobs', { method: 'POST', body: payload });
    },
    updateJob(id: string | number, payload: Record<string, unknown>) {
      return api.request(`/jobs/${id}`, { method: 'PUT', body: payload });
    },
    deleteJob(id: string | number) {
      return api.request(`/jobs/${id}`, { method: 'DELETE' });
    },
    getEmployerJobs(params?: Record<string, string | number | boolean | undefined>) {
      return api.request('/jobs/employer', { query: params });
    },
    getEmployerDashboard() {
      return api.request('/jobs/employer/dashboard');
    },
    getJobseekerDashboard() {
      return api.request('/jobs/jobseeker/dashboard');
    },
    getSavedJobs() {
      return api.request('/jobs/saved');
    },
    saveJob(id: string | number) {
      return api.request(`/jobs/${id}/save`, { method: 'POST' });
    },
    removeSavedJob(id: string | number) {
      return api.request(`/jobs/${id}/save`, { method: 'DELETE' });
    },
    applyJob(id: string | number, payload?: Record<string, unknown>) {
      return api.request(`/jobs/${id}/apply`, { method: 'POST', body: payload });
    },
    shortlistCandidate(id: string | number, payload?: Record<string, unknown>) {
      return api.request(`/jobs/${id}/shortlist`, { method: 'POST', body: payload });
    },
  };
}

/** @deprecated Use createJobsService. */
export const createJobsApi = createJobsService;

