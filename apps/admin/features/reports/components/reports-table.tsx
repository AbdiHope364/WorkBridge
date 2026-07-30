"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Flag,
  User,
  Briefcase,
  MessageSquare,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define types
interface Report {
  id: string;
  reportedBy: string;
  reportedUser: string;
  content: string;
  type: "Job" | "User" | "Message" | "Company";
  date: string;
  status: "Pending" | "Resolved" | "Dismissed" | "Action Required";
  priority: "High" | "Medium" | "Low";
}

// Mock data
const mockReports: Report[] = [
  {
    id: "1",
    reportedBy: "Sarah Johnson",
    reportedUser: "TechCorp Solutions",
    content: "Inappropriate job posting content",
    type: "Job",
    date: "June 24, 2025",
    status: "Pending",
    priority: "High",
  },
  {
    id: "2",
    reportedBy: "Mike Peters",
    reportedUser: "John Doe",
    content: "Suspicious user behavior",
    type: "User",
    date: "June 23, 2025",
    status: "Action Required",
    priority: "Medium",
  },
  {
    id: "3",
    reportedBy: "Emily Chen",
    reportedUser: "Global Logistics",
    content: "Spam messages being sent",
    type: "Message",
    date: "June 23, 2025",
    status: "Pending",
    priority: "High",
  },
  {
    id: "4",
    reportedBy: "David Wilson",
    reportedUser: "Green Energy Ltd",
    content: "Fake company listing",
    type: "Company",
    date: "June 22, 2025",
    status: "Resolved",
    priority: "Low",
  },
  {
    id: "5",
    reportedBy: "Lisa Park",
    reportedUser: "Future Health",
    content: "Misleading job requirements",
    type: "Job",
    date: "June 22, 2025",
    status: "Dismissed",
    priority: "Medium",
  },
];

// Define configurations
const typeConfig: Record<
  Report["type"],
  { color: string; icon: React.ElementType }
> = {
  Job: { color: "bg-blue-50 text-blue-600", icon: Briefcase },
  User: { color: "bg-purple-50 text-purple-600", icon: User },
  Message: { color: "bg-orange-50 text-orange-600", icon: MessageSquare },
  Company: { color: "bg-cyan-50 text-cyan-600", icon: Flag },
};

const statusConfig: Record<
  Report["status"],
  { color: string; icon: React.ElementType }
> = {
  Pending: { color: "bg-amber-50 text-amber-600", icon: Clock },
  Resolved: { color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  Dismissed: { color: "bg-slate-50 text-slate-600", icon: XCircle },
  "Action Required": { color: "bg-rose-50 text-rose-600", icon: AlertTriangle },
};

const priorityConfig: Record<Report["priority"], string> = {
  High: "bg-rose-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

// AlertTriangle component
function AlertTriangle({ className }: { className?: string }) {
  return <span className={className}>⚠</span>;
}

export function ReportsTable() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = React.useState<
    "All" | "Pending" | "Resolved" | "Dismissed" | "Action Required"
  >("All");
  const [filterPriority, setFilterPriority] = React.useState<
    "All" | "High" | "Medium" | "Low"
  >("All");

  const filtered = mockReports.filter((r) => {
    const statusMatch = filterStatus === "All" || r.status === filterStatus;
    const priorityMatch =
      filterPriority === "All" || r.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const handleViewReport = (reportId: string) => {
    router.push(`/reports-moderation/${reportId}`);
  };

  const handleMoreOptions = (reportId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("More options for report:", reportId);
  };

  return (
    <div className="bg-white rounded-[1.2rem] shadow-sm border border-slate-100 overflow-hidden">
      {/* Header with Filters */}
      <div className="p-4 border-b border-slate-50">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-[11px] font-black text-slate-800 uppercase tracking-wider">
              Recent Reports
            </h4>
            <p className="text-[9px] font-medium text-slate-400 mt-0.5">
              Review and manage reported content
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center bg-slate-50 p-1 rounded-lg">
              {(
                [
                  "All",
                  "Pending",
                  "Action Required",
                  "Resolved",
                  "Dismissed",
                ] as const
              ).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={cn(
                    "px-3 py-1 rounded-md text-[9px] font-black transition-all whitespace-nowrap",
                    filterStatus === s
                      ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {s === "All" ? "All" : s}
                </button>
              ))}
            </div>

            {/* Priority Filter */}
            <div className="flex items-center bg-slate-50 p-1 rounded-lg">
              {(["All", "High", "Medium", "Low"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={cn(
                    "px-3 py-1 rounded-md text-[9px] font-black transition-all",
                    filterPriority === p
                      ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Reported By
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Reported User
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Content
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-2.5 text-[10px] font-black text-slate-600 uppercase tracking-wider text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((report) => {
              const TypeIcon = typeConfig[report.type].icon;
              const StatusIcon = statusConfig[report.status].icon;
              const priorityColor = priorityConfig[report.priority];

              return (
                <tr
                  key={report.id}
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onClick={() => handleViewReport(report.id)}
                >
                  {/* Reported By */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-[10px]">
                        {report.reportedBy.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-700 text-[10px] truncate max-w-[120px]">
                        {report.reportedBy}
                      </span>
                    </div>
                  </td>

                  {/* Reported User */}
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium text-slate-600 truncate max-w-[120px] block">
                      {report.reportedUser}
                    </span>
                  </td>

                  {/* Content */}
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-medium text-slate-500 truncate max-w-[180px] block">
                      {report.content}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3">
                    <div
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-0.5 rounded-full w-fit text-[8px] font-black uppercase tracking-tighter",
                        typeConfig[report.type].color,
                      )}
                    >
                      <TypeIcon className="w-2.5 h-2.5" />
                      {report.type}
                    </div>
                  </td>

                  {/* Priority */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          priorityColor,
                        )}
                      />
                      <span className="text-[9px] font-bold text-slate-600">
                        {report.priority}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[8px] font-black uppercase tracking-tighter",
                        statusConfig[report.status].color,
                      )}
                    >
                      <StatusIcon className="w-2.5 h-2.5" />
                      {report.status === "Action Required"
                        ? "Action Req."
                        : report.status}
                    </div>
                  </td>

                  {/* Actions */}
                  <td
                    className="px-4 py-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={() => handleViewReport(report.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
                        title="View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleMoreOptions(report.id, e)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-all"
                        title="More Options"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-50 bg-white">
        <p className="text-[10px] font-bold text-slate-500">
          Showing <span className="text-slate-800">1 to {filtered.length}</span>{" "}
          of <span className="text-slate-800">1,284</span> reports
        </p>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 transition-all">
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, "...", 43].map((page, i) => (
              <button
                key={i}
                className={cn(
                  "w-7 h-7 flex items-center justify-center rounded-lg text-[10px] font-black transition-all",
                  page === 1
                    ? "bg-[#4100F2] text-white shadow-md shadow-purple-200"
                    : "text-slate-500 hover:bg-slate-50",
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 transition-all">
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
