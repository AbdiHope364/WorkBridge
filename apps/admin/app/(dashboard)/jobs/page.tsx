"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { JobsStats } from "@/features/jobs/components/jobs-stats";
import { JobsTable } from "@/features/jobs/components/jobs-table";

export default function JobsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Job Management"
        description="Verify, approve, and manage job postings from all employers"
      />

      <main className="flex-1">
        <JobsStats />
        <JobsTable />
      </main>
    </div>
  );
}
