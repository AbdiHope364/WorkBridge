import { Suspense } from "react";
import { EmployerApplicationsPage } from "@/features/employer-dashboard/employer-applications-page";

export default function EmployerApplicationsRoute() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <EmployerApplicationsPage />
    </Suspense>
  );
}
