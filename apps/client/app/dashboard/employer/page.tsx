"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";
import { EmployerDashboardPage } from "@/features/employer-dashboard/employer-dashboard-page";

export default function EmployerDashboardRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const { isLoading: profileLoading } = useProfile();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !profileLoading) {
      if (!isAuthenticated) {
        router.replace("/login?next=/dashboard/employer");
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

  return <EmployerDashboardPage />;
}
