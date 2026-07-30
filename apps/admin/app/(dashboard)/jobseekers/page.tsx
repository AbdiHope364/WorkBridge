import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { JobseekersStats } from "@/features/jobseekers/components/jobseekers-stats";
import { JobseekersTable } from "@/features/jobseekers/components/jobseekers-table";

export default function JobseekersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ManagementHeader 
        title="Job Seekers" 
        description="Manage and monitor all registered jobseekers" 
      />
      
      <main className="flex-1">
        <JobseekersStats />
        <JobseekersTable />
      </main>
    </div>
  );
}
