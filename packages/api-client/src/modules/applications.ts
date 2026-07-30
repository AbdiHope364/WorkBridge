import type { ApiClient } from '../http';

export function createApplicationsService(api: ApiClient) {
  return {
    /**
     * Submit a new application
     * @param formData Should contain 'coverLetter' and 'attachments' (files)
     */
    submitApplication(formData: FormData) {
      return api.request<any>('/jobs/applications', {
        method: 'POST',
        body: formData,
        headers: {},
      });
    },

    getApplications(query?: {
      page?: number;
      limit?: number;
      status?: string;
    }) {
      return api.request<any>('/jobs/applications', { query });
    },

    getApplication(id: string) {
      return api.request<any>(`/jobs/applications/${id}`);
    },

    getJobApplications(jobId: string) {
      return api.request<any>(`/jobs/applications/job/${jobId}`);
    },

    updateStatus(id: string, status: string) {
      return api.request<any>(`/jobs/applications/${id}/status`, {
        method: 'PATCH',
        body: { status },
      });
    },

    withdrawApplication(id: string) {
      return api.request<any>(`/jobs/applications/${id}/withdraw`, {
        method: 'PATCH',
      });
    },
  };
}
