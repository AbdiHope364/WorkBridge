"use client";

import React from "react";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  User,
  Briefcase,
  MessageSquare,
  Flag,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QueueItem {
  id: string;
  type: "Job" | "User" | "Message" | "Company";
  title: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  reporter: string;
}

const mockQueueItems: QueueItem[] = [
  {
    id: "1",
    type: "Job",
    title: "Inappropriate job posting",
    time: "5 min ago",
    priority: "High",
    reporter: "Sarah Johnson",
  },
  {
    id: "2",
    type: "User",
    title: "Suspicious account activity",
    time: "12 min ago",
    priority: "High",
    reporter: "Mike Peters",
  },
  {
    id: "3",
    type: "Message",
    title: "Spam messages detected",
    time: "28 min ago",
    priority: "Medium",
    reporter: "Emily Chen",
  },
  {
    id: "4",
    type: "Company",
    title: "Fake company listing",
    time: "1 hour ago",
    priority: "Medium",
    reporter: "David Wilson",
  },
  {
    id: "5",
    type: "Job",
    title: "Misleading requirements",
    time: "2 hours ago",
    priority: "Low",
    reporter: "Lisa Park",
  },
];

const typeIcons = {
  Job: Briefcase,
  User: User,
  Message: MessageSquare,
  Company: Flag,
};

const typeColors = {
  Job: "bg-blue-50 text-blue-600",
  User: "bg-purple-50 text-purple-600",
  Message: "bg-orange-50 text-orange-600",
  Company: "bg-cyan-50 text-cyan-600",
};

const priorityColors = {
  High: "bg-rose-500 border-rose-500",
  Medium: "bg-amber-500 border-amber-500",
  Low: "bg-emerald-500 border-emerald-500",
};

export function ModerationQueue() {
  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Moderation Queue
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              {mockQueueItems.length} items pending review
            </p>
          </div>
          <button className="text-[9px] font-black text-[#4100F2] hover:text-[#2B00A1] transition-colors">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y divide-slate-50 max-h-[520px] overflow-y-auto">
        {mockQueueItems.map((item) => {
          const Icon = typeIcons[item.type];
          const priorityColor = priorityColors[item.priority];

          return (
            <div
              key={item.id}
              className="p-4 hover:bg-slate-50/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                {/* Priority Indicator */}
                <div
                  className={cn(
                    "w-1.5 h-12 rounded-full flex-shrink-0",
                    priorityColor,
                  )}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "p-1 rounded-md",
                            typeColors[item.type],
                          )}
                        >
                          <Icon className="w-3 h-3" />
                        </div>
                        <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                          {item.type}
                        </span>
                        <span
                          className={cn(
                            "px-1.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-wider",
                            item.priority === "High"
                              ? "bg-rose-50 text-rose-600"
                              : item.priority === "Medium"
                                ? "bg-amber-50 text-amber-600"
                                : "bg-emerald-50 text-emerald-600",
                          )}
                        >
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-slate-700 truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-medium text-slate-400">
                          Reported by {item.reporter}
                        </span>
                        <span className="w-0.5 h-0.5 rounded-full bg-slate-300" />
                        <span className="text-[8px] font-medium text-slate-400">
                          {item.time}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors flex-shrink-0 mt-1" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-slate-50 bg-slate-50/50">
        <div className="grid grid-cols-3 gap-2">
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all text-[8px] font-black uppercase">
            <CheckCircle2 className="w-3 h-3" />
            Approve
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-all text-[8px] font-black uppercase">
            <XCircle className="w-3 h-3" />
            Reject
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-all text-[8px] font-black uppercase">
            <Clock className="w-3 h-3" />
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
}
