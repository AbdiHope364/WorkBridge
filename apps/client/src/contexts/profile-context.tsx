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
}

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  updateProfile: (data: any) => Promise<void>;
  isEmployer: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmployer, setIsEmployer] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // Try to load employer profile first
        const employerProfile = await employerProfileService.getByUser('current');
        if (employerProfile) {
          setProfile(employerProfile);
          setIsEmployer(true);
        } else {
          // Try jobseeker profile
          const jobseekerProfile = await jobseekerProfileService.getByUser('current');
          if (jobseekerProfile) {
            setProfile(jobseekerProfile);
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
      } else {
        updatedProfile = await jobseekerProfileService.update(data);
      }
      setProfile(updatedProfile);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfile, isEmployer }}>
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
