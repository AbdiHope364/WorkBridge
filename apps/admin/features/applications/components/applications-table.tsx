"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Briefcase,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  applicantName: string;
  jobTitle: string;
  employer: string;
  appliedDate: string;
  status: "Under Review" | "Accepted" | "Rejected";
}

const mockApplications: Application[] = [
  {
    id: "1",
    applicantName: "Abdisa Leta",
    jobTitle: "Senior React Developer",
    employer: "TechCorp Solutions",
    appliedDate: "June 20, 2025",
    status: "Under Review",
  },
  {
    id: "2",
    applicantName: "Sara Ahmed",
    jobTitle: "UI/UX Designer",
    employer: "Creative Minds",
    appliedDate: "June 19, 2025",
    status: "Accepted",
  },
  {
    id: "3",
    applicantName: "Mark Smith",
    jobTitle: "Backend Engineer",
    employer: "Green Energy Ltd",
    appliedDate: "June 18, 2025",
    status: "Rejected",
  },
  {
    id: "4",
    applicantName: "Linda Torres",
    jobTitle: "Project Manager",
    employer: "Global Logistics",
    appliedDate: "June 17, 2025",
    status: "Accepted",
  },
  {
    id: "5",
    applicantName: "John Doe",
    jobTitle: "Data Analyst",
    employer: "Future Health",
    appliedDate: "June 16, 2025",
    status: "Under Review",
  },
];

const statusConfig = {
  "Under Review": { color: "bg-amber-50 text-amber-600", icon: Clock },
  Accepted: { color: "bg-emerald-50 text-emerald-600", icon: CheckCircle2 },
  Rejected: { color: "bg-rose-50 text-rose-600", icon: XCircle },
};

export function ApplicationsTable() {
  const [filterStatus, setFilterStatus] = React.useState<
    "All" | "Under Review" | "Accepted" | "Rejected"
  >("All");

  const filtered = mockApplications.filter(
    (a) => filterStatus === "All" || a.status === filterStatus,
  );

  return (
    <div className="px-10 pb-10">
      {/* Filter Tabs */}
      <div className="flex items-center mb-4">
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {(["All", "Under Review", "Accepted", "Rejected"] as const).map(
            (s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                  filterStatus === s
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
                )}
              >
                {s === "All" ? "All Applications" : s}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Applicant
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Job Position
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Employer
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase whitespace-nowrap">
                Applied Date
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Status
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight text-center uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map((app) => {
              const cfg = statusConfig[app.status];
              const StatusIcon = cfg.icon;
              return (
                <tr
                  key={app.id}
                  className="group hover:bg-slate-50/50 transition-colors"
                >
                  {/* Applicant */}
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center font-black text-xs">
                        {app.applicantName.charAt(0)}
                      </div>
                      <span className="font-black text-slate-800 text-xs truncate max-w-32.5">
                        {app.applicantName}
                      </span>
                    </div>
                  </td>
                  {/* Job */}
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px] font-bold text-slate-700 truncate max-w-40">
                        {app.jobTitle}
                      </span>
                    </div>
                  </td>
                  {/* Employer */}
                  <td className="px-5 py-2.5">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="text-[11px] font-medium text-slate-500 truncate max-w-32.5">
                        {app.employer}
                      </span>
                    </div>
                  </td>
                  {/* Date */}
                  <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500 whitespace-nowrap">
                    {app.appliedDate}
                  </td>
                  {/* Status */}
                  <td className="px-5 py-2.5">
                    <div
                      className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                        cfg.color,
                      )}
                    >
                      <StatusIcon className="w-2.5 h-2.5" />
                      {app.status}
                    </div>
                  </td>
                  {/* Actions */}
                  <td className="px-5 py-2.5">
                    <div className="flex justify-center">
                      <Link
                        href={`/applications/${app.id}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-900 hover:text-white text-slate-700 rounded-lg transition-all active:scale-95 text-[10px] font-black uppercase"
                      >
                        <Eye className="w-3 h-3" />
                        View
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-white">
          <p className="text-[11px] font-bold text-slate-500 italic">
            Showing{" "}
            <span className="text-slate-800">1 to {filtered.length}</span> of{" "}
            <span className="text-slate-800">18,450</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, "...", 1230].map((page, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-black transition-all",
                    page === 1
                      ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                      : "text-slate-500 hover:bg-slate-50",
                  )}
                >
                  {page}
                </button>
              ))}
            </div>
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
