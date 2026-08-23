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
import { api } from "@/lib/api";

const JOB_STATUS_COLORS: Record<string, string> = {
  OPEN: "#4100F2",
  CLOSED: "#FFA000",
  DRAFT: "#C41AF7",
  EXPIRED: "#00D47E",
  PAUSED: "#FFA000",
  REMOVED: "#64748b",
  Active: "#4100F2",
  Inactive: "#00D47E",
};

const DEFAULT_COLORS = ["#4100F2", "#FFA000", "#C41AF7", "#00D47E", "#64748b", "#ef4444"];

export function DashboardCharts() {
  const [overviewData, setOverviewData] = React.useState<{ name: string; jobseeker: number; employer: number; jobs: number; applications: number }[]>([]);
  const [jobStatusData, setJobStatusData] = React.useState<{ name: string; value: number; color: string }[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    void Promise.all([
      api.admin.getDashboardOverview(),
      api.admin.getDashboardJobStatus(),
    ])
      .then(([overview, jobStatus]) => {
        if (!mounted) return;
        setOverviewData(overview);
        const colored = jobStatus.map((item, index) => ({
          ...item,
          color: JOB_STATUS_COLORS[item.name] || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
        }));
        setJobStatusData(colored);
      })
      .catch((requestError: unknown) => {
        if (mounted) setError(requestError instanceof Error ? requestError.message : "Unable to load charts.");
      })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-10 mb-8">
        <div className="lg:col-span-2 bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 h-[350px] animate-pulse" />
        <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 h-[350px] animate-pulse" />
      </div>
    );
  }

  if (error) {
    return <div className="px-10 mb-8 text-sm text-rose-600">{error}</div>;
  }

  const totalJobs = jobStatusData.reduce((sum, item) => sum + item.value, 0);

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
          {overviewData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>
          ) : (
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
          )}
        </div>
      </div>

      {/* Job Status Donut Chart */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 self-start mb-6">
          Job status
        </h3>

        <div className="h-[220px] w-full relative">
          {jobStatusData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-slate-400">No data available</div>
          ) : (
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
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-black text-slate-800 leading-none">
              {totalJobs}
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
