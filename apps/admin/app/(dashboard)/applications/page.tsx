"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { ApplicationsStats } from "@/features/applications/components/applications-stats";
import { ApplicationsTable } from "@/features/applications/components/applications-table";

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Applications"
        description="Monitor all job applications across the platform"
      />
      <main className="flex-1">
        <ApplicationsStats />
        <ApplicationsTable />
      </main>
    </div>
  );
}
