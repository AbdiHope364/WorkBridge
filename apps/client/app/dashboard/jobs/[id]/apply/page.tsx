"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApplyForPositionModal } from "@/features/jobs/components/apply-for-position-modal";
import { JobseekerSidebar } from "@/features/jobseeker-dashboard/components/jobseeker-sidebar";
import { Button } from "@repo/ui/button";

export default function DashboardApplyJobPage() {
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
            Loading Position
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
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mb-4 border border-rose-100 shadow-sm">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Job Not Found</h1>
          <p className="text-slate-500 text-sm mt-2 max-w-md font-medium">
            The requested position could not be found or may have been filled.
          </p>
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={() => router.back()} className="rounded-xl font-bold px-6">
              Go Back
            </Button>
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-600/20"
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
      <section className="flex-1 min-w-0 pt-16 pb-20 md:pt-8 md:pb-8 p-4 sm:p-6 md:p-10 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-4">
          <Link
            href={`/dashboard/jobs/${job.id || job._id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            ← Back to Job Details
          </Link>

          <ApplyForPositionModal job={job} isStandalonePage={true} />
        </div>
      </section>
    </main>
  );
}

