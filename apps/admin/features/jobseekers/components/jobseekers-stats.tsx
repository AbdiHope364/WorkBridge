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
import { api } from "@/lib/api";

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
  const [counts, setCounts] = React.useState({
    total: 0,
    active: 0,
    verified: 0,
    pending: 0,
  });

  React.useEffect(() => {
    let mounted = true;
    void api.admin.listUsers()
      .then((users) => {
        if (!mounted) return;
        const workers = users.filter((u) => u.role === "worker" || !u.role || u.role === ("jobseeker" as string));
        const verified = workers.filter((u) => u.verified).length;
        setCounts({
          total: workers.length,
          active: workers.length,
          verified,
          pending: workers.length - verified,
        });
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const stats = [
    {
      label: "Total Jobseekers",
      value: counts.total.toLocaleString(),
      trend: "Live",
      trendType: "up" as const,
      icon: Users,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]",
    },
    {
      label: "Active Jobseekers",
      value: counts.active.toLocaleString(),
      trend: "Live",
      trendType: "up" as const,
      icon: ShieldCheck,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]",
    },
    {
      label: "Verified Jobseekers",
      value: counts.verified.toLocaleString(),
      trend: "Live",
      trendType: "up" as const,
      icon: CheckCircle2,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]",
    },
    {
      label: "Pending Verification",
      value: counts.pending.toLocaleString(),
      trend: "Live",
      trendType: "up" as const,
      icon: AlertCircle,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-10 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
