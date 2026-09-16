"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { api, NetworkError } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

// Type definitions
interface Job {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  salary: number;
  budget?: string;
  workplaceType?: string;
  jobType?: string;
  location?: {
    city?: string;
    country?: string;
  };
  employerSnapshot?: {
    displayName?: string;
    companyLogo?: string;
  };
  isActive?: boolean;
  status?: string;
  jobStatus?: string;
  createdAt?: string;
}

// Pill styles
const workplacePill: Record<string, string> = {
  ON_SITE: "bg-slate-100 text-slate-600",
  REMOTE: "bg-emerald-50 text-emerald-700",
  HYBRID: "bg-sky-50 text-sky-700",
};

const typePill: Record<string, string> = {
  FULL_TIME: "bg-slate-100 text-slate-600",
  PART_TIME: "bg-amber-50 text-amber-700",
  FREELANCE: "bg-violet-50 text-violet-700",
  CONTRACT: "bg-rose-50 text-rose-700",
};

// Save Button Component
function SaveButton({ jobId }: { jobId?: string }) {
  const [saved, setSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!jobId) return;

    setIsLoading(true);
    try {
      setSaved(!saved);
    } catch (error) {
      console.error("Failed to save job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      disabled={isLoading}
      className={`group inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition cursor-pointer ${
        saved
          ? "border-emerald-200 bg-emerald-50 text-emerald-600"
          : "border-slate-200 bg-white text-slate-400 hover:border-slate-300 hover:text-slate-700"
      } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      aria-label={saved ? "Remove from saved" : "Save job"}
    >
      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
        <path
          d="M4.5 2.5h7A1.5 1.5 0 0 1 13 4v9.5L8 10.8l-5 2.7V4a1.5 1.5 0 0 1 1.5-1.5Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
          fill={saved ? "currentColor" : "none"}
        />
      </svg>
    </button>
  );
}

// Job Card Component
function JobCard({ job, index }: { job: Job; index: number }) {
  const formattedSalary = job.salary ? new Intl.NumberFormat().format(job.salary) : "N/A";

  const postedAt = job.createdAt
    ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
    : "Recently";

  const initial =
    job.employerSnapshot?.displayName?.charAt(0) || job.title?.charAt(0) || "?";

  const jobId = job._id || job.id;

  return (
    <article
      className="group relative flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs transition hover:border-slate-300 hover:shadow-md"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 text-base sm:text-[17px] font-black uppercase">
              {initial}
            </div>
            <div>
              <h3 className="text-sm sm:text-[15px] font-bold leading-snug text-slate-950 group-hover:text-emerald-700 transition-colors">
                {job.title || "Untitled Position"}
              </h3>
              <p className="mt-0.5 text-xs sm:text-[13px] text-slate-500">
                {job.employerSnapshot?.displayName || "Private Employer"}
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right shrink-0 pl-14 sm:pl-0">
            <p className="text-sm sm:text-[15px] font-black text-slate-950">
              {formattedSalary}
              <span className="text-xs font-semibold text-emerald-600"> ETB</span>
            </p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-wider">
              /{job.budget?.toLowerCase() || "month"}
            </p>
          </div>
        </div>

        <p className="mt-3 text-xs sm:text-[13px] leading-relaxed text-slate-600 line-clamp-2">
          {job.description || "No description provided."}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] sm:text-[12px] text-slate-500 capitalize">
            <svg className="h-3.5 w-3.5 text-slate-400" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
              <circle
                cx="8"
                cy="6"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            {job.location?.city || "Addis Ababa"}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              workplacePill[job.workplaceType || ""] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {job.workplaceType?.replace("_", " ") || "On Site"}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              typePill[job.jobType || ""] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {job.jobType?.replace("_", " ") || "Full Time"}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
          <span className="text-[11px] text-slate-400">{postedAt}</span>
          <div className="flex items-center gap-2">
            <SaveButton jobId={jobId} />
            <Link
              href={`/jobs/${jobId || "unknown"}`}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-950 px-3.5 sm:px-4 text-xs sm:text-[13px] font-semibold text-white transition hover:bg-emerald-600 active:scale-95 shadow-xs"
            >
              See Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="h-44 w-full animate-pulse rounded-2xl bg-slate-200"
        />
      ))}
    </div>
  );
}

// Error State Component
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="mt-8 text-center py-10">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 text-rose-500 mb-3">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <p className="text-sm text-slate-500 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50"
      >
        Try Again
      </button>
    </div>
  );
}

// Empty State Component
function EmptyState() {
  return (
    <div className="mt-8 text-center py-10">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-100 text-slate-400 mb-3">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-700">No recent jobs found at the moment.</p>
      <p className="text-xs text-slate-400 mt-1">Check back later for new opportunities.</p>
    </div>
  );
}

// Main Component
export function RecentJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentJobs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.jobs.getJobs({ limit: 8 });
      
      let allJobs: Job[] = [];
      if (Array.isArray(response)) {
        allJobs = response;
      } else if (response?.data?.jobs) {
        allJobs = response.data.jobs;
      } else if (response?.jobs) {
        allJobs = response.jobs;
      } else if (response?.data && Array.isArray(response.data)) {
        allJobs = response.data;
      }

      const openJobs = allJobs.filter((job) => job.isActive !== false);
      setJobs(openJobs.slice(0, 4));
    } catch (err) {
      console.error("Error fetching jobs:", err);
      if (err instanceof Error) {
        if (err instanceof NetworkError) {
          setError("Network error. Please check your internet connection.");
        } else {
          setError(err.message || "Failed to load jobs. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentJobs();
  }, [fetchRecentJobs]);

  return (
    <section className="bg-slate-50 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Latest Openings
            </p>
            <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
              Recent Jobs
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Freshly posted roles — be among the first to apply.
            </p>
          </div>

          <Link
            href="/jobs"
            className="inline-flex h-10 w-full sm:w-auto shrink-0 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-xs sm:text-sm font-semibold text-slate-700 shadow-xs transition hover:border-slate-300 hover:bg-slate-50 active:scale-95"
          >
            View all jobs
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchRecentJobs} />
        ) : jobs.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {jobs.map((job, index) => (
              <JobCard key={job._id || job.id || index} job={job} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}