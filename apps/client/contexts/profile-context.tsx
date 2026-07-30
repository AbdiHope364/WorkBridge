'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import { api } from '@/lib/api';
import { useAuth } from './auth-context';
import type { EmployerProfile, JobseekerProfile } from '@repo/api-client';

interface ProfileContextValue {
  isLoading: boolean;
  employerProfile: EmployerProfile | null;
  jobseekerProfile: JobseekerProfile | null;
  refreshProfile: () => Promise<void>;
  setEmployerProfile: React.Dispatch<
    React.SetStateAction<EmployerProfile | null>
  >;
  setJobseekerProfile: React.Dispatch<
    React.SetStateAction<JobseekerProfile | null>
  >;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined,
);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  const [jobseekerProfile, setJobseekerProfile] =
    useState<JobseekerProfile | null>(null);

  const [employerProfile, setEmployerProfile] =
    useState<EmployerProfile | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const clearProfiles = () => {
    setJobseekerProfile(null);
    setEmployerProfile(null);
  };

  const refreshProfile = useCallback(async () => {
    if (!user) {
      clearProfiles();
      return;
    }

    try {
      if (user.role === 'jobseeker') {
        const profile = await api.profiles.jobseeker.getMyProfile();

        setJobseekerProfile(profile);
        setEmployerProfile(null);
      }

      if (user.role === 'employer') {
        const profile = await api.profiles.employer.getMyProfile();

        setEmployerProfile(profile);
        setJobseekerProfile(null);
      }
    } catch (error: any) {
      if (error.status === 404 || error.message?.includes('not found')) {
        console.log('No profile exists yet for this user.');
        setJobseekerProfile(null);
      } else {
        console.error('Failed to load profile:', error);
      }
    }
  }, [user]);

  useEffect(() => {
    async function initialize() {
      if (!isAuthenticated || !user) {
        clearProfiles();
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      await refreshProfile();
      setIsLoading(false);
    }

    initialize();
  }, [isAuthenticated, user, refreshProfile]);


  return (
    <ProfileContext.Provider
      value={{
        isLoading,
        employerProfile,
        jobseekerProfile,
        refreshProfile,
        setEmployerProfile,
        setJobseekerProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);

  if (!context) {
    throw new Error('useProfile must be used inside ProfileProvider');
  }

  return context;
}
