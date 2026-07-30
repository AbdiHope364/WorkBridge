"use client";

import { Header } from "@/components/header";
import { DashboardStats } from "@/features/dashboard/components/dashboard-stats";
import { DashboardCharts } from "@/features/dashboard/components/dashboard-charts";
import { BottomSections } from "@/features/dashboard/components/bottom-sections";

export default function DashboardPage() {

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <DashboardStats />
        <DashboardCharts />
        <BottomSections />
      </main>
    </div>
  );
}
