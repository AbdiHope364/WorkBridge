"use client";

import React from "react";
import {
  Flag,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ElementType;
  gradient: string;
}

function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  gradient,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const TrendColor = trend === "up" ? "text-emerald-500" : "text-rose-500";

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
        <div
          className={cn(
            "flex items-center gap-1 text-[9px] font-black bg-white/20 w-fit px-1.5 py-0.5 rounded-full backdrop-blur-sm",
            TrendColor,
          )}
        >
          <TrendIcon className="w-2.5 h-2.5" />
          <span>{change}</span>
        </div>
      </div>
      <div className="relative z-10 bg-white/20 p-2.5 rounded-[0.8rem] backdrop-blur-md border border-white/10">
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
}

export function ModerationStats() {
  // TODO: Integrate with real backend to fetch moderation stats
  const stats = [
    {
      label: "Total Reports",
      value: "1,284",
      change: "+18.5%",
      trend: "up" as const,
      icon: Flag,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]",
    },
    {
      label: "Pending Review",
      value: "342",
      change: "+12.3%",
      trend: "up" as const,
      icon: Clock,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]",
    },
    {
      label: "Resolved",
      value: "892",
      change: "+22.7%",
      trend: "up" as const,
      icon: CheckCircle2,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]",
    },
    {
      label: "Action Required",
      value: "50",
      change: "-5.2%",
      trend: "down" as const,
      icon: AlertTriangle,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-10 py-6">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
