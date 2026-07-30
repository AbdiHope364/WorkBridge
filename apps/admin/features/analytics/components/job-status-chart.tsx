"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";

interface PieData {
  name: string;
  value: number;
  color: string;
  percentage: string;
}

const pieData: PieData[] = [
  { name: "Active Jobs", value: 4200, color: "#00D47E", percentage: "76%" },
  { name: "Pending Jobs", value: 800, color: "#FFA000", percentage: "15%" },
  { name: "Rejected Jobs", value: 300, color: "#C41AF7", percentage: "5%" },
  { name: "Expired Jobs", value: 150, color: "#FF6B6B", percentage: "3%" },
  { name: "Removed Jobs", value: 50, color: "#94A3B8", percentage: "1%" },
];

const CustomPieLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[9px] font-black"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-100">
        <p className="text-[10px] font-black text-slate-600">{data.name}</p>
        <p className="text-[13px] font-black" style={{ color: data.color }}>
          {data.value.toLocaleString()}
        </p>
        <p className="text-[9px] font-medium text-slate-400">
          {data.percentage} of total
        </p>
      </div>
    );
  }
  return null;
};

export function JobStatusChart() {
  return (
    <div className="px-10 pb-10">
      <div className="bg-white rounded-[1.2rem] p-6 shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
                  Job Distribution
                </h4>
                <p className="text-[9px] font-medium text-slate-400">
                  Total jobs: 5,500
                </p>
              </div>
              <div className="text-right">
                <p className="text-[20px] font-black text-slate-800">5,500</p>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                  Total Jobs
                </p>
              </div>
            </div>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomPieLabel}
                    outerRadius={130}
                    innerRadius={70}
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#fff"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-col justify-center pl-4">
            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-4">
              Legend
            </h5>
            <div className="space-y-3">
              {pieData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[11px] font-bold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-800">
                      {item.value.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 w-[40px] text-right">
                      {item.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-[#F8FAFC] rounded-[1rem] border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-4 h-4 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800">
                    Need Help?
                  </p>
                  <p className="text-[9px] font-medium text-slate-400">
                    Contact support for assistance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
