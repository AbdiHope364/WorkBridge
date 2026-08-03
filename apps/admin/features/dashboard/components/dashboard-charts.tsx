"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";

// Mock data for the line chart
const overviewData = [
  { name: "January", jobseeker: 45, employer: 32, jobs: 60, applications: 25 },
  { name: "February", jobseeker: 65, employer: 45, jobs: 70, applications: 35 },
  { name: "March", jobseeker: 40, employer: 30, jobs: 55, applications: 20 },
  { name: "April", jobseeker: 55, employer: 40, jobs: 65, applications: 30 },
  { name: "May", jobseeker: 85, employer: 48, jobs: 80, applications: 45 },
  { name: "June", jobseeker: 60, employer: 35, jobs: 65, applications: 30 },
  { name: "July", jobseeker: 70, employer: 50, jobs: 75, applications: 38 },
  { name: "August", jobseeker: 75, employer: 55, jobs: 85, applications: 42 },
  {
    name: "September",
    jobseeker: 80,
    employer: 60,
    jobs: 90,
    applications: 48,
  },
];

const jobStatusData = [
  { name: "Active Jobs", value: 4200, color: "#4100F2" },
  { name: "Pending Jobs", value: 800, color: "#FFA000" },
  { name: "Rejected Jobs", value: 300, color: "#C41AF7" },
  { name: "Expired Jobs", value: 150, color: "#00D47E" },
  { name: "Removed Jobs", value: 50, color: "#64748b" },
];

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-10 mb-8">
      {/* Overview Line Chart */}
      <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-slate-800">Overview</h3>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
            <span className="text-xs font-semibold text-slate-600">
              This Year
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </div>
        </div>

        <div className="h-[280px] w-full">
          {/* TODO: Integrate with real backend to fetch overview trend data */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={overviewData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "0.75rem",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend
                verticalAlign="top"
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingBottom: "10px", fontSize: "11px" }}
              />
              <Line
                type="monotone"
                dataKey="jobseeker"
                stroke="#C41AF7"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="employer"
                stroke="#FFA000"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="jobs"
                stroke="#00D47E"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#4100F2"
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 1, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Job Status Donut Chart */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 self-start mb-6">
          Job status
        </h3>

        <div className="h-[220px] w-full relative">
          {/* TODO: Integrate with real backend to fetch job status counts */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={jobStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {jobStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-black text-slate-800 leading-none">
              5500
            </p>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">
              Total Jobs
            </p>
          </div>
        </div>

        <div className="w-full mt-4 space-y-2">
          {jobStatusData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-semibold text-slate-600">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-black text-slate-800">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
