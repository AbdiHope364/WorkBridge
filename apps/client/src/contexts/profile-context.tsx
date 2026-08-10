"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { employerProfileService, jobseekerProfileService } from '@/lib/api';

interface Profile {
  id: string;
  userId: string;
  company?: string;
  title?: string;
  skills?: string[];
  experience?: any[];
  education?: any[];
  firstName?: string;
  lastName?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  jobseekerProfile: Profile | null;
  employerProfile: Profile | null;
  isLoading: boolean;
  isEmployer: boolean;
  updateProfile: (data: any) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [jobseekerProfile, setJobseekerProfile] = useState<Profile | null>(null);
  const [employerProfile, setEmployerProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Try to load employer profile first
        const employer = await employerProfileService.getByUser('current');
        if (employer) {
          setEmployerProfile(employer);
          setProfile(employer);
          setIsEmployer(true);
        } else {
          // Try jobseeker profile
          const jobseeker = await jobseekerProfileService.getByUser('current');
          if (jobseeker) {
            setJobseekerProfile(jobseeker);
            setProfile(jobseeker);
            setIsEmployer(false);
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const updateProfile = async (data: any) => {
    setIsLoading(true);
    try {
      let updatedProfile;
      if (isEmployer) {
        updatedProfile = await employerProfileService.update(data);
        setEmployerProfile(updatedProfile);
      } else {
        updatedProfile = await jobseekerProfileService.update(data);
        setJobseekerProfile(updatedProfile);
      }
      setProfile(updatedProfile);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{
      profile,
      jobseekerProfile,
      employerProfile,
      isLoading,
      isEmployer,
      updateProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}
