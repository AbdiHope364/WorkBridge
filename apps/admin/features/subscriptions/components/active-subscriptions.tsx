"use client";

import React from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Calendar,
  CreditCard,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveSubscription {
  id: string;
  company: string;
  plan: string;
  status: "active" | "pending" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  amount: number;
  currency: string;
  members: number;
}

const mockSubscriptions: ActiveSubscription[] = [
  {
    id: "1",
    company: "TechCorp Solutions",
    plan: "Business",
    status: "active",
    startDate: "Jan 1, 2025",
    endDate: "Dec 31, 2025",
    amount: 99,
    currency: "USD",
    members: 25,
  },
  {
    id: "2",
    company: "Green Energy Ltd",
    plan: "Pro",
    status: "active",
    startDate: "Mar 15, 2025",
    endDate: "Mar 15, 2026",
    amount: 49,
    currency: "USD",
    members: 12,
  },
  {
    id: "3",
    company: "Global Logistics",
    plan: "Free",
    status: "pending",
    startDate: "Pending",
    endDate: "Pending",
    amount: 0,
    currency: "USD",
    members: 3,
  },
  {
    id: "4",
    company: "Future Health",
    plan: "Pro",
    status: "expired",
    startDate: "Feb 1, 2025",
    endDate: "May 1, 2025",
    amount: 49,
    currency: "USD",
    members: 8,
  },
];

const statusConfig = {
  active: {
    color: "bg-emerald-50 text-emerald-600",
    icon: CheckCircle2,
    label: "Active",
  },
  pending: {
    color: "bg-amber-50 text-amber-600",
    icon: Clock,
    label: "Pending",
  },
  expired: {
    color: "bg-rose-50 text-rose-600",
    icon: AlertCircle,
    label: "Expired",
  },
  cancelled: {
    color: "bg-slate-50 text-slate-600",
    icon: AlertCircle,
    label: "Cancelled",
  },
};

const planColors = {
  Free: "bg-slate-100 text-slate-600",
  Pro: "bg-purple-100 text-purple-600",
  Business: "bg-amber-100 text-amber-600",
};

export function ActiveSubscriptions() {
  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Active Subscriptions
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              Currently subscribed companies
            </p>
          </div>
          <button className="text-[9px] font-black text-[#4100F2] hover:text-[#2B00A1] transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-50 max-h-120 overflow-y-auto">
        {mockSubscriptions.map((sub) => {
          const StatusIcon = statusConfig[sub.status].icon;
          const planColor =
            planColors[sub.plan as keyof typeof planColors] ||
            "bg-slate-100 text-slate-600";

          return (
            <div
              key={sub.id}
              className="p-4 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 truncate">
                        {sub.company}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[8px] font-black uppercase",
                            planColor,
                          )}
                        >
                          {sub.plan}
                        </span>
                        <span className="text-[8px] font-medium text-slate-400">
                          {sub.members} members
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-2 text-[9px]">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Calendar className="w-3 h-3" />
                      <span>{sub.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <CreditCard className="w-3 h-3" />
                      <span>
                        ${sub.amount}/{sub.currency}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full text-[8px] font-black uppercase",
                      statusConfig[sub.status].color,
                    )}
                  >
                    <StatusIcon className="w-2.5 h-2.5" />
                    {statusConfig[sub.status].label}
                  </div>
                  <button className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 border-t border-slate-50 bg-slate-50/50">
        <button className="w-full py-2 bg-[#4100F2] hover:bg-[#2B00A1] text-white rounded-lg text-[10px] font-bold transition-colors">
          Manage All Subscriptions
        </button>
      </div>
    </div>
  );
}
