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
  AlertCircle,
  Briefcase,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";

interface Job {
  id: string;
  title: string;
  employer: string;
  category: string;
  postedDate: string;
  status: "Pending" | "Approved" | "Rejected";
  type: "Full-Time" | "Part-Time" | "Contract";
}

export function JobsTable() {
  const [filterStatus, setFilterStatus] = React.useState<
    "All" | "Pending" | "Approved" | "Rejected"
  >("All");
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    void api.admin.listJobs()
      .then((items) => {
        if (!mounted) return;
        setJobs(items.map((job) => ({
          id: String(job.id), title: job.title, employer: job.company,
          category: job.category,
          postedDate: new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(job.createdAt)),
          status: job.isActive ? "Approved" : "Rejected",
          type: job.type as Job["type"],
        })));
      })
      .catch((requestError: unknown) => {
        if (mounted) setError(requestError instanceof Error ? requestError.message : "Unable to load jobs.");
      })
      .finally(() => { if (mounted) setIsLoading(false); });
    return () => { mounted = false; };
  }, []);

  const filteredJobs = jobs.filter(
    (job) => filterStatus === "All" || job.status === filterStatus,
  );

  return (
    <div className="px-10 pb-10">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-white p-1 rounded-xl border border-slate-100 shadow-sm">
          {(["All", "Pending", "Approved", "Rejected"] as const).map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-xs font-black transition-all",
                  filterStatus === status
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-200"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50",
                )}
              >
                {status === "All" ? "All Jobs" : status}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-50">
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Job Information
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase whitespace-nowrap">
                Employer
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Category
              </th>
              <th className="px-5 py-3 text-[11px] font-black text-slate-800 tracking-tight uppercase">
                Posted Date
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
            {isLoading && <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">Loading jobs…</td></tr>}
            {error && !isLoading && <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-rose-600">{error}</td></tr>}
            {!isLoading && !error && filteredJobs.length === 0 && <tr><td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">No jobs found.</td></tr>}
            {filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="group hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-5 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-black text-slate-800 text-xs tracking-tight block truncate max-w-[150px]">
                        {job.title}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-bold text-slate-700 whitespace-nowrap">
                  {job.employer}
                </td>
                <td className="px-5 py-2.5">
                  <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100">
                    {job.category}
                  </span>
                </td>
                <td className="px-5 py-2.5 text-[11px] font-medium text-slate-500">
                  {job.postedDate}
                </td>
                <td className="px-5 py-2.5">
                  <div
                    className={cn(
                      "flex items-center gap-1 px-2 py-0.5 rounded-full w-fit text-[9px] font-black uppercase tracking-tighter",
                      job.status === "Approved"
                        ? "bg-emerald-50 text-emerald-600"
                        : job.status === "Pending"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-rose-50 text-rose-600",
                    )}
                  >
                    {job.status === "Approved" ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : job.status === "Pending" ? (
                      <Clock className="w-2.5 h-2.5" />
                    ) : (
                      <AlertCircle className="w-2.5 h-2.5" />
                    )}
                    {job.status}
                  </div>
                </td>
                <td className="px-5 py-2.5">
                  <div className="flex items-center justify-center">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/80 hover:bg-slate-900 hover:text-white text-slate-700 rounded-lg transition-all active:scale-95 text-[10px] font-black uppercase"
                    >
                      <Eye className="w-3 h-3" />
                      View Details
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
            <span className="text-slate-800">{filteredJobs.length === 0 ? 0 : 1} to {filteredJobs.length}</span>{" "}
            of <span className="text-slate-800">{jobs.length}</span>
          </p>

          <div className="flex items-center gap-1.5">
            <button className="p-1.5 rounded-lg border border-slate-100 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, "...", 380].map((page, i) => (
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
