"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { JobDetailPage } from "@/features/jobs/job-detail-page";
import { JobseekerSidebar } from "@/features/jobseeker-dashboard/components/jobseeker-sidebar";
import { Button } from "@repo/ui/button";

export default function DashboardJobDetailPage() {
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
        console.error("Failed to fetch job:", err);
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
        <JobseekerSidebar />
        <section className="flex-1 flex flex-col items-center justify-center min-h-screen gap-4">
          <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Loading Job Details
          </p>
        </section>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <JobseekerSidebar />
        <section className="flex-1 flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 border border-emerald-100 shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Job Not Found</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
            The requested position could not be found or may have been filled.
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
              href="/dashboard/jobs"
              className="inline-flex items-center justify-center px-6 h-11 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-600/20"
            >
              Browse Trade Jobs
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <JobseekerSidebar />
      <section className="flex-1 min-w-0 pt-16 pb-20 md:pt-0 md:pb-0 overflow-y-auto">
        <JobDetailPage job={job} />
      </section>
    </main>
  );
}
