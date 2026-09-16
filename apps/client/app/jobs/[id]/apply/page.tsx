"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { ApplyForPositionModal } from "@/features/jobs/components/apply-for-position-modal";
import { LandingHeader } from "@/features/landing/components/landing-header";
import { LandingFooter } from "@/features/landing/components/landing-footer";
import { Button } from "@repo/ui/button";

export default function ApplyJobStandalonePage() {
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
        <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
          Loading Position
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8FAFC] px-4 text-center">
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
            href="/jobs"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm hover:bg-teal-700 shadow-lg shadow-teal-600/20"
          >
            Browse All Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      <LandingHeader />

      <div className="py-8 px-4 sm:px-6 flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl mb-4">
          <Link
            href={`/jobs/${job.id || job._id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-wider"
          >
            ← Back to Job Details
          </Link>
        </div>

        <div className="w-full max-w-2xl">
          <ApplyForPositionModal job={job} isStandalonePage={true} />
        </div>
      </div>

      <LandingFooter />
    </main>
  );
}

