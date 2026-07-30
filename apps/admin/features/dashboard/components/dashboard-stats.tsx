"use client";

import React from "react";
import { Users, Building2, Briefcase, FileText, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string;
  trend: string;
  icon: React.ElementType;
  gradient: string;
  className?: string;
}

function StatCard({ label, value, trend, icon: Icon, gradient, className }: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-[1.5rem] p-6 text-white flex items-center justify-between shadow-lg transition-transform hover:scale-[1.02] duration-300",
      gradient,
      className
    )}>
      <div className="relative z-10">
        <p className="text-white/80 font-semibold mb-1 text-[10px] tracking-widest uppercase">{label}</p>
        <h3 className="text-2xl font-black mb-2 tracking-tighter">{value}</h3>
        <div className="flex items-center gap-1 text-[10px] font-bold bg-white/20 w-fit px-2 py-0.5 rounded-full backdrop-blur-sm">
          <ArrowUpRight className="w-3 h-3" />
          <span>{trend}</span>
          <span className="font-normal opacity-70 ml-1">last month</span>
        </div>
      </div>
      <div className="relative z-10 bg-white/20 p-4 rounded-[1.2rem] backdrop-blur-md">
        <Icon className="w-8 h-8 text-white" />
      </div>
      
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-2xl -ml-12 -mb-12" />
    </div>
  );
}

export function DashboardStats() {
  // TODO: Integrate with real backend to fetch actual dashboard stats
  const stats = [
    {
      label: "Total Jobseekers",
      value: "12,845",
      trend: "12.5%",
      icon: Users,
      gradient: "bg-gradient-to-br from-[#00D47E] to-[#01B972]"
    },
    {
      label: "Total Employer",
      value: "1,200",
      trend: "12.5%",
      icon: Building2,
      gradient: "bg-gradient-to-br from-[#4100F2] to-[#2B00A1]"
    },
    {
      label: "Active Jobs",
      value: "4,200",
      trend: "12.5%",
      icon: Briefcase,
      gradient: "bg-gradient-to-br from-[#C41AF7] to-[#8E10B3]"
    },
    {
      label: "Applications",
      value: "802",
      trend: "12.5%",
      icon: FileText,
      gradient: "bg-gradient-to-br from-[#FFA000] to-[#E67E00]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 mb-10">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
