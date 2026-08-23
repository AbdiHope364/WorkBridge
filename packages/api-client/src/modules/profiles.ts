import type { ApiClient } from '../http.js';

import type {
  JobseekerProfile,
  UpdateJobseekerProfileRequest,
} from './profiles/jobseeker-profile.js';

import type {
  CompanyProfile,
  UpdateCompanyProfileRequest,
} from './profiles/company-profile.js';

import type {
  IndividualEmployerProfile,
  UpdateIndividualEmployerProfileRequest,
} from './profiles/individual-employer-profile.js';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination: unknown;
}

export type EmployerProfile =
  | (CompanyProfile & { employerType: 'COMPANY_EMPLOYER' })
  | (IndividualEmployerProfile & { employerType: 'INDIVIDUAL_EMPLOYER' });

export function createJobseekerProfileService(api: ApiClient) {
  return {
    async getMyProfile() {
      const response = await api.request<ApiResponse<JobseekerProfile>>(
        '/accounts/jobseekers/me',
      );

      return response.data;
    },

    async createProfile(payload: UpdateJobseekerProfileRequest) {
      const response = await api.request<ApiResponse<JobseekerProfile>>(
        '/accounts/jobseekers',
        {
          method: 'POST',
          body: payload,
        },
      );
      return response.data;
    },

    async updateMyProfile(payload: UpdateJobseekerProfileRequest) {
      const response = await api.request<ApiResponse<JobseekerProfile>>(
        '/accounts/jobseekers/me',
        {
          method: 'PATCH',
          body: payload,
        },
      );

      return response.data;
    },

    async uploadAvatar(file: File) {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.request<ApiResponse<JobseekerProfile>>(
        '/accounts/jobseekers/upload-avatar',
        {
          method: 'POST',
          body: formData,
        },
      );

      return response.data;
    },
  };
}

export function createEmployerProfileService(api: ApiClient) {
  return {
    async getMyProfile() {
      const response = await api.request<ApiResponse<EmployerProfile>>(
        '/accounts/employer/me',
      );

      return response.data;
    },

    async createCompanyProfile(payload: UpdateCompanyProfileRequest) {
      const response = await api.request<ApiResponse<CompanyProfile>>(
        '/accounts/employer/companies',
        {
          method: 'POST',
          body: payload,
        },
      );

      return response.data;
    },

    async updateCompanyProfile(payload: UpdateCompanyProfileRequest) {
      const response = await api.request<ApiResponse<CompanyProfile>>(
        '/accounts/employer/companies/me',
        {
          method: 'PATCH',
          body: payload,
        },
      );

      return response.data;
    },

    async uploadLogo(file: File) {
      const formData = new FormData();
      formData.append('logo', file);

      const response = await api.request<ApiResponse<CompanyProfile>>(
        '/accounts/employer/companies/upload-logo',
        {
          method: 'POST',
          body: formData,
        },
      );

      return response.data;
    },

    async uploadBanner(file: File) {
      const formData = new FormData();
      formData.append('banner', file);

      const response = await api.request<ApiResponse<CompanyProfile>>(
        '/accounts/employer/companies/upload-banner',
        {
          method: 'POST',
          body: formData,
        },
      );

      return response.data;
    },

    async createMyIndividualProfile(
      payload: UpdateIndividualEmployerProfileRequest,
    ) {
      const response = await api.request<
        ApiResponse<IndividualEmployerProfile>
      >('/accounts/employer/individuals', {
        method: 'POST',
        body: payload,
      });

      return response.data;
    },

    async updateMyIndividualProfile(
      payload: UpdateIndividualEmployerProfileRequest,
    ) {
      const response = await api.request<
        ApiResponse<IndividualEmployerProfile>
      >('/accounts/employer/individuals/me', {
        method: 'PATCH',
        body: payload,
      });

      return response.data;
    },

    async uploadAvatar(file: File) {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await api.request<
        ApiResponse<IndividualEmployerProfile>
      >('/accounts/employer/individuals/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      return response.data;
    },
  };
}
