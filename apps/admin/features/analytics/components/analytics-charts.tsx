"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

// Mock data for the area chart (Overview section)
const overviewData = [
  { month: "Jan", applications: 65, employer: 45, jobs: 30, jobseeker: 20 },
  { month: "Feb", applications: 78, employer: 52, jobs: 38, jobseeker: 28 },
  { month: "Mar", applications: 90, employer: 60, jobs: 45, jobseeker: 35 },
  { month: "Apr", applications: 85, employer: 58, jobs: 42, jobseeker: 30 },
  { month: "May", applications: 95, employer: 68, jobs: 50, jobseeker: 40 },
  { month: "Jun", applications: 100, employer: 75, jobs: 50, jobseeker: 25 },
];

// Mock data for the bar chart (Job Status)
const jobStatusData = [
  { month: "Jan", applications: 42, employer: 55, jobs: 85, jobseeker: 75 },
  { month: "Feb", applications: 48, employer: 58, jobs: 90, jobseeker: 80 },
  { month: "Mar", applications: 52, employer: 62, jobs: 95, jobseeker: 85 },
  { month: "Apr", applications: 45, employer: 50, jobs: 78, jobseeker: 70 },
  { month: "May", applications: 55, employer: 65, jobs: 100, jobseeker: 90 },
  { month: "Jun", applications: 58, employer: 70, jobs: 105, jobseeker: 95 },
  { month: "Jul", applications: 60, employer: 72, jobs: 110, jobseeker: 98 },
  { month: "Aug", applications: 42, employer: 55, jobs: 85, jobseeker: 75 },
];

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
        <p className="text-[10px] font-black text-slate-600 mb-1">{label}</p>
        {payload.map((p: any, index: number) => (
          <p
            key={index}
            className="text-[11px] font-bold"
            style={{ color: p.color }}
          >
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function AnalyticsCharts() {
  return (
    <div className="px-10 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview Chart - Area Chart */}
        <div className="bg-white rounded-[1.2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Overview
              </h4>
              <p className="text-[9px] font-medium text-slate-400">
                Platform growth over time
              </p>
            </div>
            <div className="flex items-center gap-3">
              {["Applications", "Employer", "Jobs", "Jobseeker"].map(
                (item, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        backgroundColor:
                          i === 0
                            ? "#4100F2"
                            : i === 1
                              ? "#FFA000"
                              : i === 2
                                ? "#00D47E"
                                : "#C41AF7",
                      }}
                    />
                    <span className="text-[8px] font-black text-slate-500 uppercase">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={overviewData}>
                <defs>
                  <linearGradient
                    id="colorApplications"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4100F2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4100F2" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorEmployer"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#FFA000" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#FFA000" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorJobs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D47E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D47E" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorJobseeker"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#C41AF7" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C41AF7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fontWeight: 700, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fontWeight: 700, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="applications"
                  stroke="#4100F2"
                  fill="url(#colorApplications)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="employer"
                  stroke="#FFA000"
                  fill="url(#colorEmployer)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stroke="#00D47E"
                  fill="url(#colorJobs)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="jobseeker"
                  stroke="#C41AF7"
                  fill="url(#colorJobseeker)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Job Status - Bar Chart */}
        <div className="bg-white rounded-[1.2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                Job Status
              </h4>
              <p className="text-[9px] font-medium text-slate-400">
                Monthly distribution by status
              </p>
            </div>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jobStatusData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#F1F5F9"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 9, fontWeight: 700, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fontWeight: 700, fill: "#94A3B8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="applications"
                  fill="#4100F2"
                  radius={[4, 4, 0, 0]}
                />
                <Bar dataKey="employer" fill="#FFA000" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jobs" fill="#00D47E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="jobseeker" fill="#C41AF7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
