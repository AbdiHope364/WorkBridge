"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ReactNode, SVGProps } from "react";
import {
  BellIcon,
  SearchJobIcon,
} from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import { api } from "@/lib/api";

type IconProps = SVGProps<SVGSVGElement>;

const statusStyles: Record<string, string> = {
  OPEN: "bg-teal-50 text-teal-700 border-teal-100",
  DRAFT: "bg-slate-100 text-slate-600 border-slate-200",
  CLOSED: "bg-red-50 text-red-600 border-red-100",
};

function PlusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function BackIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function UsersIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  );
}

function EyeIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function JobMetric({
  label,
  value,
  icon,
  muted,
}: {
  label: string;
  value: string | number;
  icon?: ReactNode;
  muted?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-2 border-r border-slate-100 last:border-r-0 flex-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </span>
      <span
        className={`flex items-center gap-1.5 text-sm font-bold ${muted ? "text-slate-300" : "text-slate-800"}`}
      >
        {icon && <span className="text-teal-500">{icon}</span>}
        {value}
      </span>
    </div>
  );
}

function JobCard({ job }: { job: any }) {
  const statusDisplay = job.status || "OPEN";
  const jobId = job._id; // Using _id as seen in your console screenshot

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-teal-200">
      <div className="flex items-start justify-between mb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors capitalize">
            {job.title}
          </h2>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
              {job.category?.replace(/_/g, " ")}
            </span>
          </div>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${statusStyles[statusDisplay] || statusStyles.OPEN}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {statusDisplay}
        </span>
      </div>

      <div className="mt-auto">
        <div className="flex rounded-xl bg-slate-50 border border-slate-100 mb-5">
          <JobMetric
            label="Applicants"
            value={job.applicationsCount || 0}
            icon={<UsersIcon className="h-3.5 w-3.5" />}
          />
          <JobMetric
            label="Views"
            value={job.views || 0}
            icon={<EyeIcon className="h-3.5 w-3.5" />}
          />
          <JobMetric
            label="Deadline"
            value={
              job.deadline ? new Date(job.deadline).toLocaleDateString() : "N/A"
            }
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <Link
            href={`/dashboard/employer/jobs/${jobId}/edit`}
            className="text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors"
          >
            Edit Posting
          </Link>

          <Link
            href={`/dashboard/employer/applications?jobId=${jobId}`}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-bold text-white transition-all hover:bg-slate-800 shadow-sm"
          >
            View Applicants
          </Link>
        </div>
      </div>
    </article>
  );
}

export function EmployerMyJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = (await api.jobs.getEmployerJobs()) as any;

        if (response?.data?.jobs) {
          setJobs(response.data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || job.status === filter.toUpperCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 md:px-10">
            <h2 className="text-sm font-semibold text-slate-500">
              Dashboard / My Jobs
            </h2>
            <div className="flex items-center gap-6">
              <Link
                href="/dashboard/notifications"
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              >
                <BellIcon className="h-5 w-5" />
              </Link>
            </div>
          </header>

          <div className="w-full px-6 py-8 md:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                  My Job Listings
                </h1>
                <p className="mt-1 text-slate-500 text-sm">
                  Manage your active postings and track applicants.
                </p>
              </div>
              <Link
                href="/dashboard/employer/create"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white hover:bg-teal-700 shadow-lg shadow-teal-600/20 transition-all"
              >
                <PlusIcon className="h-5 w-5" />
                Post New Job
              </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-8">
              <div className="flex h-11 p-1 bg-slate-200/50 rounded-xl w-full lg:w-auto">
                {["All", "Open", "Draft", "Closed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`flex-1 lg:flex-none px-6 rounded-lg text-xs font-bold transition-all ${
                      filter === f
                        ? "bg-white text-slate-900 shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="relative w-full lg:w-96 group">
                <SearchJobIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 transition-colors group-focus-within:text-teal-500" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search job title..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white text-sm focus:border-teal-500 outline-none transition-all focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            {/* Job Grid */}
            {loading ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-48 bg-slate-200 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500 font-medium">
                  No jobs found matching your criteria.
                </p>
                <Link
                  href="/dashboard/employer/create"
                  className="text-teal-600 font-bold mt-2 inline-block hover:underline"
                >
                  Post your first job now
                </Link>
              </div>
            )}

            {/* Footer Navigation */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <Link
                href="/dashboard/employer"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                <BackIcon className="h-4 w-4" /> Back to Dashboard
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
