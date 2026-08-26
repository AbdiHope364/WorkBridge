"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/auth-context";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login?next=/dashboard");
      return;
    }

    if (user?.role === "jobseeker") {
      router.replace("/dashboard/jobseeker");
    } else if (user?.role === "employer") {
      router.replace("/dashboard/employer");
    } else {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">Loading...</main>
    );
  }

  return null;
}
