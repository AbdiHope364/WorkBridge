"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";
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

function SaveButton() {
  return (
    <button
      type="button"
      className="group inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 transition hover:border-slate-300 hover:text-slate-700"
    >
      <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4">
        <path
          d="M4.5 2.5h7A1.5 1.5 0 0 1 13 4v9.5L8 10.8l-5 2.7V4a1.5 1.5 0 0 1 1.5-1.5Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}

function JobCard({ job }: { job: any }) {
  const formattedSalary = new Intl.NumberFormat().format(job.salary);

  // Get relative time (e.g. "2 days ago")
  const postedAt = job.createdAt
    ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
    : "Recently";

  const initial =
    job.employerSnapshot?.displayName?.charAt(0) || job.title.charAt(0);

  return (
    <article className="group relative flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-slate-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 text-[17px] font-black uppercase">
            {initial}
          </div>
          <div>
            <h3 className="text-[15px] font-bold leading-snug text-slate-950 group-hover:text-emerald-700 transition-colors">
              {job.title}
            </h3>
            <p className="mt-0.5 text-[13px] text-slate-500">
              {job.employerSnapshot?.displayName || "Private Employer"}
            </p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[15px] font-black text-slate-950">
            {formattedSalary}
            <span className="text-xs font-medium text-slate-400"> ETB</span>
          </p>
          <p className="text-[11px] text-slate-400 uppercase tracking-tighter">
            /{job.budget?.toLowerCase() || "month"}
          </p>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-slate-500 line-clamp-2">
        {job.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[12px] text-slate-500 capitalize">
            <svg
              className="h-3.5 w-3.5 text-slate-400"
              viewBox="0 0 16 16"
              fill="none"
            >
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
            {job.location?.city?.toLowerCase() || "Addis Ababa"}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${workplacePill[job.workplaceType] ?? "bg-slate-100 text-slate-600"}`}
          >
            {job.workplaceType?.replace("_", " ")}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typePill[job.jobType] ?? "bg-slate-100 text-slate-600"}`}
          >
            {job.jobType?.replace("_", " ")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">{postedAt}</span>
          <SaveButton />
          <Link
            href={`/jobs/${job._id || job.id}`}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-950 px-4 text-[13px] font-semibold text-white transition hover:bg-emerald-600"
          >
            See Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function RecentJobsSection() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentJobs() {
      try {
        setLoading(true);
        const response = await api.jobs.getJobs({ limit: 8 });
        const allJobs = Array.isArray(response)
          ? response
          : response.data?.jobs || response.jobs || [];
        // Filter for open jobs if the backend uses `status` field
        const openJobs = allJobs.filter(
          (j: any) => j.status === "OPEN" || j.jobStatus === "OPEN",
        );
        setJobs(openJobs.slice(0, 4));
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentJobs();
  }, []);

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-[1300px] px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
              Latest Openings
            </p>
            <h2 className="mt-1.5 text-[28px] font-black tracking-tight text-slate-950 sm:text-[34px]">
              Recent Jobs
            </h2>
            <p className="mt-1.5 text-[14px] text-slate-500">
              Freshly posted roles — be among the first to apply.
            </p>
          </div>
          <Link
            href="/jobs"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-5 text-[13px] font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
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

        {loading ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-48 w-full animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job._id || job.id} job={job} />
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="mt-12 text-center py-10">
            <p className="text-slate-500">No recent jobs found.</p>
          </div>
        )}

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/jobs"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-950 px-6 text-[14px] font-semibold text-white"
          >
            View all jobs
          </Link>
        </div>
      </div>
    </section>
  );
}
