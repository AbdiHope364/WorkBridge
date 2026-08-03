"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";

type ApplicationTab =
  | "all"
  | "APPLIED"
  | "REVIEWING"
  | "SHORTLISTED"
  | "INTERVIEWED"
  | "HIRED"
  | "REJECTED";

const tabs: Array<{ label: string; value: ApplicationTab }> = [
  { label: "All", value: "all" },
  { label: "Applied", value: "APPLIED" },
  { label: "Reviewing", value: "REVIEWING" },
  { label: "Shortlisted", value: "SHORTLISTED" },
  { label: "Interviewed", value: "INTERVIEWED" },
  { label: "Accepted", value: "HIRED" },
  { label: "Rejected", value: "REJECTED" },
];

const Icons = {
  Location: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Calendar: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Verified: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-[#079F67]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
};

function StatusBadge({ status }: { status: string }) {
  const labelMap: Record<string, string> = {
    APPLIED: "Applied",
    REVIEWING: "In Review",
    SHORTLISTED: "Shortlisted",
    INTERVIEWED: "Interviewed",
    HIRED: "Accepted",
    REJECTED: "Rejected",
  };

  // Color logic for the new statuses
  const isRed = status === "REJECTED";
  const isPurple = status === "SHORTLISTED";
  const isBlue = status === "INTERVIEWED";

  let colorClasses = "text-[#079F67] border-[#079F67]/20 bg-[#079F67]/5";
  let dotColor = "bg-[#079F67]";

  if (isRed) {
    colorClasses = "text-rose-600 border-rose-100 bg-rose-50";
    dotColor = "bg-rose-500";
  } else if (isPurple) {
    colorClasses = "text-purple-600 border-purple-100 bg-purple-50";
    dotColor = "bg-purple-500";
  } else if (isBlue) {
    colorClasses = "text-blue-600 border-blue-100 bg-blue-50";
    dotColor = "bg-blue-500";
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colorClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {labelMap[status] || status}
    </span>
  );
}

function ApplicationCard({ app }: { app: any }) {
  const job = app.jobId;
  if (!job) return null;
  const actualJobId = typeof job === "object" ? job._id || job.id : job;
  const title = typeof job === "object" ? job.title : "Position";

  return (
    <div className="group bg-white border border-slate-200 rounded-2xl p-5 transition-all hover:shadow-md hover:border-[#079F67]/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex gap-4 min-w-0">
          <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#0F132E]/30 font-black text-xl shrink-0 uppercase group-hover:bg-[#079F67]/5">
            {title.charAt(0)}
          </div>
          <div className="space-y-1 min-w-0">
            <h2 className="text-lg font-bold text-[#0F132E] truncate leading-none capitalize group-hover:text-[#079F67] transition-colors">
              {title}
            </h2>
            <div className="flex items-center gap-1 text-sm font-semibold text-slate-500">
              {job?.employerSnapshot?.displayName || "Employer"}{" "}
              <Icons.Verified />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-slate-400 font-medium text-xs">
              <div className="flex items-center gap-1.5 capitalize">
                <Icons.Location /> {job?.location?.city || "Remote"}
              </div>
              <div className="flex items-center gap-1.5 text-[#079F67]">
                <span className="w-1.5 h-1.5 rounded-full bg-current" />{" "}
                {job?.jobType?.toLowerCase().replace("_", "-") || "Full-time"}
              </div>
              <div className="flex items-center gap-1.5">
                <Icons.Calendar /> Applied{" "}
                {new Date(app.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-center border-t md:border-none pt-4 md:pt-0">
          <StatusBadge status={app.status} />
          <Link
            href={`/jobs/${actualJobId}`}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#079F67] to-[#0F132E] text-white text-sm font-bold hover:opacity-90 transition-all text-center shadow-lg active:scale-95"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export function JobseekerApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<ApplicationTab>("all");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await api.applications.getApplications();
        setApplications(Array.isArray(res?.data) ? res.data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    if (activeTab === "all") return applications;
    return applications.filter((a) => a.status === activeTab);
  }, [applications, activeTab]);

  if (loading)
    return (
      <div className="min-h-screen bg-white flex">
        <div className="hidden md:block sticky top-0 h-screen shrink-0">
          <JobseekerSidebar />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#079F67] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );

  return (
    <main className="h-screen flex overflow-hidden bg-[#F8FAFC]">
      {/* FIXED SIDEBAR */}
      <div className="hidden md:block w-64 h-full shrink-0 border-r border-slate-200">
        <JobseekerSidebar />
      </div>

      <div className="md:hidden">
        <JobseekerSidebar />
      </div>

      <section className="flex-1 h-full overflow-y-auto p-4 sm:p-8 md:p-12 min-w-0 scroll-smooth">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 pt-16 md:pt-0">
            <h1 className="text-4xl font-light text-[#0F132E] tracking-tight">
              My Applications
            </h1>
            <p className="text-slate-500 text-base mt-2 font-medium">
              Manage and track your active job journey.
            </p>
          </header>

          <div className="w-full mb-8">
            <div className="bg-white border border-slate-200 p-1 rounded-2xl flex gap-1 overflow-x-auto no-scrollbar shadow-sm">
              {tabs.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setActiveTab(t.value)}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === t.value
                      ? "bg-[#0F132E] text-white shadow-md"
                      : "text-slate-400 hover:text-[#0F132E]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-white py-24 text-center rounded-3xl border-2 border-dashed border-slate-200 shadow-inner text-slate-400 font-medium">
                No applications found for this filter.
              </div>
            ) : (
              filtered.map((app) => <ApplicationCard key={app._id} app={app} />)
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
