"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { JobseekerDashboardPage } from "@/features/jobseeker-dashboard/jobseeker-dashboard-page";
import { EmployerDashboardPage } from "@/features/employer-dashboard/employer-dashboard-page";
import { useProfile } from "@/contexts/profile-context";
import { EmployerOnboardingPage } from "@/features/employer-dashboard/employer-onboarding";
import OnboardingPage from "../onboarding/page";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const {
    employerProfile,
    jobseekerProfile,
    isLoading: profileLoading,
  } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (isLoading || profileLoading) return;

    if (!isAuthenticated) {
      router.replace("/login?next=/dashboard");
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

  if (user?.role === "jobseeker" && !jobseekerProfile) {
    return <OnboardingPage />;
  }

  if (user?.role === "employer" && !employerProfile) {
    return <EmployerOnboardingPage />;
  }

  switch (user?.role) {
    case "jobseeker":
      return <JobseekerDashboardPage />;

    case "employer":
      return <EmployerDashboardPage />;

    default:
      return (
        <main className="grid min-h-screen place-items-center">
          Invalid user role.
        </main>
      );
  }
}
