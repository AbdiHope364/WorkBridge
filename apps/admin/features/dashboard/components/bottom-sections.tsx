"use client";

import React from "react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from "recharts";
import { Monitor, Palette, Megaphone, HeartPulse, MoreHorizontal } from "lucide-react";

const categories = [
  { name: "IT & Software", count: 2453, percentage: 85, icon: Monitor, color: "#00D47E" },
  { name: "Design & Creative", count: 1734, percentage: 65, icon: Palette, color: "#4100F2" },
  { name: "Marketing", count: 1120, percentage: 45, icon: Megaphone, color: "#C41AF7" },
  { name: "Healthy", count: 912, percentage: 35, icon: HeartPulse, color: "#FFA000" },
  { name: "Other", count: 801, percentage: 25, icon: MoreHorizontal, color: "#64748b" },
];

const verificationData = [
  { name: "Pending", value: 850, color: "#4100F2" },
  { name: "Under review", value: 650, color: "#FFA000" },
  { name: "Approved", value: 750, color: "#00D47E" },
  { name: "Rejected", value: 150, color: "#ef4444" },
  { name: "Suspended", value: 150, color: "#64748b" },
];

export function BottomSections() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-10 pb-8">
      {/* Top Job Categories */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Top Job Categories</h3>
        
        <div className="space-y-4">
          {/* TODO: Integrate with real backend to fetch top categories */}
          {categories.map((cat) => (
            <div key={cat.name} className="flex items-center gap-4">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <cat.icon className="w-4 h-4 text-slate-600" />
              </div>
              <div className="flex-1 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-700">{cat.name}</span>
                  <span className="text-xs font-black text-slate-900">{cat.count.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Overview */}
      <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 flex flex-col items-center">
        <h3 className="text-lg font-bold text-slate-800 self-start mb-6">Verification Overview</h3>
        
        <div className="h-[220px] w-full relative">
          {/* TODO: Integrate with real backend to fetch verification status counts */}
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={verificationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                dataKey="value"
              >
                {verificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-2xl font-black text-slate-800 leading-none">2550</p>
            <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">Total Requests</p>
          </div>
        </div>

        <div className="w-full mt-4 grid grid-cols-3 gap-2">
          {verificationData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
