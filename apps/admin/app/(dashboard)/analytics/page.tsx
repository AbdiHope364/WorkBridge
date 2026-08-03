// app/analytics/page.tsx
"use client";
import React, { useState } from "react";
import { ManagementHeader } from "@/components/management-header";
import { AnalyticsOverview } from "@/features/analytics/components/analytics-overview";
import { AnalyticsCharts } from "@/features/analytics/components/analytics-charts";
import { JobStatusChart } from "@/features/analytics/components/job-status-chart";

export default function AnalyticsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
    console.log("Active filters:", filters);
  };

  const filterOptions = [
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last 30 Days", value: "last30days" },
    { label: "Last 90 Days", value: "last90days" },
    { label: "This Year", value: "thisyear" },
    { label: "Show Active Only", value: "active" },
    { label: "Show Inactive", value: "inactive" },
  ];
  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <ManagementHeader
        title="Analytics"
        description="Track platform performance and key metrics"
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />
      <main className="flex-1">
        <AnalyticsOverview />
        <AnalyticsCharts />
        <JobStatusChart />
      </main>
    </div>
  );
}
