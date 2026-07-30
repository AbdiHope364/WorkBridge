"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { ModerationStats } from "@/features/reports/components/moderation-stats";
import { ReportsTable } from "@/features/reports/components/reports-table";
import { ModerationQueue } from "@/features/reports/components/moderation-queue";

export default function ReportsModerationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Reports & Moderation"
        description="Review flagged content and manage platform moderation"
      />
      <main className="flex-1">
        <ModerationStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-10 pb-6">
          <div className="lg:col-span-2">
            <ReportsTable />
          </div>
          <div className="lg:col-span-1">
            <ModerationQueue />
          </div>
        </div>
      </main>
    </div>
  );
}
