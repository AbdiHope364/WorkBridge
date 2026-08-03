"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  CheckCircle2,
  XCircle,
  User,
  Building2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface VerificationRequest {
  id: string;
  applicantName: string;
  userType: "Jobseeker" | "Employer";
  documentType: string;
  submittedDate: string;
  status: "Pending" | "Verified" | "Rejected";
}

const mockRequests: VerificationRequest[] = [
  {
    id: "1",
    applicantName: "Abdisa Leta",
    userType: "Jobseeker",
    documentType: "National ID",
    submittedDate: "June 20, 2025",
    status: "Pending",
  },
  {
    id: "2",
    applicantName: "TechCorp Solutions",
    userType: "Employer",
    documentType: "Business License",
    submittedDate: "June 19, 2025",
    status: "Verified",
  },
  {
    id: "3",
    applicantName: "Sara Ahmed",
    userType: "Jobseeker",
    documentType: "Passport",
    submittedDate: "June 18, 2025",
    status: "Pending",
  },
  {
    id: "4",
    applicantName: "Green Energy Ltd",
    userType: "Employer",
    documentType: "Tax Certificate",
    submittedDate: "June 17, 2025",
    status: "Rejected",
  },
  {
    id: "5",
    applicantName: "Mark Smith",
    userType: "Jobseeker",
    documentType: "National ID",
    submittedDate: "June 16, 2025",
    status: "Verified",
  },
];

export function VerificationTable() {
  const [filterType, setFilterType] = React.useState<
    "All" | "Jobseeker" | "Employer"
  >("All");

  const filteredRequests = mockRequests.filter(
    (req) => filterType === "All" || req.userType === filterType,
  );

  return (
    <div className="px-10 pb-10">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {(["All", "Jobseeker", "Employer"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                filterType === type
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
              )}
            >
              {type === "All"
                ? "All Requests"
                : type === "Jobseeker"
                  ? "Jobseekers"
                  : "Employers"}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Applicant
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                User Type
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase whitespace-nowrap">
                Document Type
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Submitted Date
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
            {filteredRequests.map((req) => (
              <tr
                key={req.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border font-bold text-xs",
                        req.userType === "Jobseeker"
                          ? "bg-blue-50 text-blue-600 border-blue-100"
                          : "bg-emerald-50 text-emerald-600 border-emerald-100",
                      )}
                    >
                      {req.applicantName.charAt(0)}
                    </div>
                    <span className="font-black text-slate-800 text-xs tracking-tight truncate max-w-[150px]">
                      {req.applicantName}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div
                    className={cn(
                      "flex items-center gap-1.5 text-[10px] font-black uppercase tracking-tighter",
                      req.userType === "Jobseeker"
                        ? "text-blue-600"
                        : "text-emerald-600",
                    )}
                  >
                    {req.userType === "Jobseeker" ? (
                      <User className="w-3 h-3" />
                    ) : (
                      <Building2 className="w-3 h-3" />
                    )}
                    {req.userType}
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2 px-2 py-1 bg-slate-50 border border-slate-100 rounded-lg w-fit">
                    <FileText className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-700">
                      {req.documentType}
                    </span>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500">
                  {req.submittedDate}
                </td>
                <td className="px-5 py-2.5">
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                      req.status === "Verified"
                        ? "bg-emerald-50 text-emerald-600"
                        : req.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600",
                    )}
                  >
                    {req.status === "Verified" ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : req.status === "Pending" ? (
                      <Clock className="w-2.5 h-2.5" />
                    ) : (
                      <XCircle className="w-2.5 h-2.5" />
                    )}
                    {req.status}
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center justify-center">
                    <Link
                      href={`/verification/${req.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-900 hover:text-white text-slate-700 rounded-lg transition-all active:scale-95 text-[10px] font-black uppercase"
                    >
                      <Eye className="w-3 h-3" />
                      Review Docs
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Section */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-50 bg-white">
          <p className="text-[11px] font-bold text-slate-500 italic">
            Showing{" "}
            <span className="text-slate-800">
              1 to {filteredRequests.length}
            </span>{" "}
            of <span className="text-slate-800">84</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, "...", 12].map((page, i) => (
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
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
