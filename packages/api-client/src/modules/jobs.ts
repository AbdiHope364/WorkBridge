import type { ApiClient } from '../http';

export function createJobsService(api: ApiClient) {
  return {
    getJobs(params?: Record<string, string | number | boolean | undefined>) {
      return api.request('/jobs', { query: params });
    },
    getJob(id: string | number) {
      return api.request(`/jobs/${id}`);
    },
    updateJob(id: string | number, payload: Record<string, unknown>) {
      return api.request(`/jobs/${id}`, { method: 'PUT', body: payload });
    },
  };
}

/** @deprecated Use createJobsService. */
export const createJobsApi = createJobsService;
