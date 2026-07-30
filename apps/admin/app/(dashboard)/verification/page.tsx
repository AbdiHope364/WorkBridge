"use client";

import React from "react";
import { ManagementHeader } from "@/components/management-header";
import { VerificationStats } from "@/features/verification/components/verification-stats";
import { VerificationTable } from "@/features/verification/components/verification-table";

export default function VerificationCenterPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader 
        title="Verification Center" 
        description="Review and verify identities and business documents for all users" 
      />
      
      <main className="flex-1">
        <VerificationStats />
        <VerificationTable />
      </main>
    </div>
  );
}
