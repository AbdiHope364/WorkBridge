"use client";

import React from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  CreditCard,
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
  subtitle?: string;
}

function StatCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
  gradient,
  subtitle,
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
        {subtitle && (
          <p className="text-[8px] font-medium text-white/70 mb-1">
            {subtitle}
          </p>
        )}
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

export function SubscriptionStats() {
  // TODO: Integrate with real backend to fetch subscription stats
  const stats = [
    {
      label: "Total Subscriptions",
      value: "1,847",
      change: "+18.5%",
      trend: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]",
    },
    {
      label: "Active Subscriptions",
      value: "1,523",
      change: "+12.3%",
      trend: "up" as const,
      icon: CreditCard,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]",
    },
    {
      label: "Monthly Revenue",
      value: "$24,850",
      change: "+22.7%",
      trend: "up" as const,
      icon: DollarSign,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]",
    },
    {
      label: "Churn Rate",
      value: "2.4%",
      change: "-0.8%",
      trend: "down" as const,
      icon: TrendingUp,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]",
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
                                                             