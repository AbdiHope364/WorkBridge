"use client";

import React from "react";
import {
  Users,
  Building2,
  Briefcase,
  FileCheck,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  gradient: string;
  subtitle?: string;
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  gradient,
  subtitle,
}: MetricCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const TrendColor = trend === "up" ? "text-emerald-500" : "text-rose-500";

  return (
    <div className="bg-white rounded-[1.2rem] p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-[10px] font-medium text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-[0.8rem]", gradient)}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
        <div
          className={cn(
            "flex items-center gap-0.5 text-[10px] font-black",
            TrendColor,
          )}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          <span>{change}</span>
        </div>
        <span className="text-[10px] font-medium text-slate-400">
          vs last month
        </span>
      </div>
    </div>
  );
}

export function AnalyticsOverview() {
  // TODO: Integrate with real backend to fetch analytics data
  const metrics = [
    {
      title: "Total Jobseekers",
      value: "12,845",
      change: "+12.5%",
      trend: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]",
      subtitle: "admin@workbridge.com",
    },
    {
      title: "Total Employers",
      value: "1,200",
      change: "+8.3%",
      trend: "up" as const,
      icon: Building2,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]",
    },
    {
      title: "Active Jobs",
      value: "4,200",
      change: "+15.7%",
      trend: "up" as const,
      icon: Briefcase,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]",
    },
    {
      title: "Applications",
      value: "802",
      change: "-3.1%",
      trend: "down" as const,
      icon: FileCheck,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]",
    },
  ];

  return (
    <div className="px-10 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>
    </div>
  );
}
