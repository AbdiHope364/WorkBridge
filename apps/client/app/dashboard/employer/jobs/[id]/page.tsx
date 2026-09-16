"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { EmployerSidebar } from "@/features/employer-dashboard/components/employer-sidebar";
import { Button } from "@repo/ui/button";
import { Badge } from "@repo/ui/badge";

export default function EmployerJobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadJob() {
      if (!id) return;

      try {
        setLoading(true);
        setError(false);
        const response: any = await api.jobs.getJob(id);
        const jobData = response?.data?.job || response?.data || response?.job || response;

        if (!jobData || (!jobData.title && !jobData.id)) {
          setError(true);
        } else {
          setJob(jobData);
        }
      } catch (err) {
        console.error("Failed to fetch employer job:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <EmployerSidebar />
        <section className="flex-1 flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Loading Job Listing
          </p>
        </section>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <EmployerSidebar />
        <section className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4 border border-rose-100 shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Job Listing Not Found</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
            This job posting could not be found or has been removed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="rounded-xl font-bold px-6 h-11"
            >
              Go Back
            </Button>
            <Link
              href="/dashboard/employer/my-jobs"
              className="inline-flex items-center justify-center px-6 h-11 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-600/20"
            >
              My Job Listings
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const status = job.status || "OPEN";
  const salaryDisplay =
    typeof job.salary === "number"
      ? `${job.salary.toLocaleString()} ETB`
      : job.salary || "Negotiable";
  const locationCity =
    typeof job.location === "object" ? job.location?.city : job.location || "Addis Ababa";
  const skillsList =
    Array.isArray(job.skills) && job.skills.length > 0
      ? job.skills
      : Array.isArray(job.requirements) && job.requirements.length > 0
      ? job.requirements.map((r: any) => (typeof r === "string" ? { name: r } : r))
      : [];

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row text-slate-900">
      <EmployerSidebar />

      <section className="flex-1 min-w-0 p-4 sm:p-6 md:p-10 pt-16 pb-20 md:pt-10 md:pb-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                  Employer Dashboard / Job Details
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                {job.title}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/employer/jobs/${job.id || job._id}/edit`}
                className="px-5 h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all inline-flex items-center justify-center shadow-xs"
              >
                Edit Posting
              </Link>
              <Link
                href={`/dashboard/employer/applications?jobId=${job.id || job._id}`}
                className="px-6 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all inline-flex items-center justify-center shadow-md"
              >
                View Candidates ({job.applicants?.length || job.applicationsCount || 0})
              </Link>
            </div>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
              <p className="text-sm font-black text-emerald-600 mt-1 uppercase">{status}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rate / Budget</p>
              <p className="text-sm font-black text-slate-900 mt-1">{salaryDisplay}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Location</p>
              <p className="text-sm font-bold text-slate-900 mt-1 capitalize">{locationCity}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Type</p>
              <p className="text-sm font-bold text-slate-900 mt-1 capitalize">{job.jobType || job.type || "Contract"}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-lg font-black text-slate-900">Job Description</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {job.description || "No description provided."}
            </p>
          </div>

          {/* Requirements / Skills */}
          {skillsList.length > 0 && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-lg font-black text-slate-900">Required Trade Skills & Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {skillsList.map((s: any, i: number) => (
                  <Badge
                    key={i}
                    className="bg-slate-100 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border-none"
                  >
                    {typeof s === "string" ? s : s?.name || s?.title}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="pt-4">
            <Link
              href="/dashboard/employer/my-jobs"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
            >
              ← Back to My Jobs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

