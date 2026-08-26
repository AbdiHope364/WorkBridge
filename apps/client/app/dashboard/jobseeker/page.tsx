"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";
import { JobseekerDashboardPage } from "@/features/jobseeker-dashboard/jobseeker-dashboard-page";
import OnboardingPage from "../../onboarding/page";

export default function JobseekerDashboardRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const { jobseekerProfile, isLoading: profileLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !profileLoading) {
      if (!isAuthenticated) {
        router.replace("/login?next=/dashboard/jobseeker");
      }
    }
  }, [isLoading, profileLoading, isAuthenticated, router]);

  if (isLoading || profileLoading) {
    return (
      <main className="grid min-h-screen place-items-center">Loading...</main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!jobseekerProfile) {
    return <OnboardingPage />;
  }

  return <JobseekerDashboardPage />;
}
