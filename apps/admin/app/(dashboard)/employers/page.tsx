"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { EmployersStats } from "@/features/employers/components/employers-stats";
import { EmployersTable } from "@/features/employers/components/employers-table";

export default function EmployersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Employer Management"
        description="Monitor and manage registered companies and their hiring activities"
      />

      <main className="flex-1">
        <EmployersStats />
        <EmployersTable />
      </main>
    </div>
  );
}
