"use client";

import React from "react";
import {
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  icon: React.ElementType;
  gradient: string;
}

function StatCard({
  label,
  value,
  trend,
  trendType,
  icon: Icon,
  gradient,
}: StatCardProps) {
  const TrendIcon = trendType === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.2rem] p-5 text-white flex items-center justify-between shadow-md",
        gradient,
      )}
    >
      <div className="relative z-10">
        <p className="text-white/80 font-bold mb-0.5 text-[9px] tracking-wider uppercase">
          {label}
        </p>
        <h3 className="text-2xl font-black mb-1.5 tracking-tight">{value}</h3>
        <div className="flex items-center gap-1 text-[9px] font-black bg-white/20 w-fit px-1.5 py-0.5 rounded-full backdrop-blur-sm">
          <TrendIcon className="w-2.5 h-2.5" />
          <span>{trend}</span>
        </div>
      </div>
      <div className="relative z-10 bg-white/20 p-2.5 rounded-[0.8rem] backdrop-blur-md border border-white/10">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}

export function JobseekersStats() {
  // TODO: Integrate with real backend to fetch jobseeker stats
  const stats = [
    {
      label: "Total Jobseekers",
      value: "12,845",
      trend: "12.5%",
      trendType: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]",
    },
    {
      label: "Active Jobseekers",
      value: "1,200",
      trend: "12.5%",
      trendType: "up" as const,
      icon: ShieldCheck,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]",
    },
    {
      label: "Verified Jobseekers",
      value: "4,200",
      trend: "12.5%",
      trendType: "up" as const,
      icon: CheckCircle2,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]",
    },
    {
      label: "Suspended Jobseekers",
      value: "200",
      trend: "12.5%",
      trendType: "down" as const,
      icon: AlertCircle,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
