'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { JobDetailPage } from '@/features/jobs/job-detail-page';

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadJob() {
      if (!id) return;

      try {
        setLoading(true);
        const response = await api.jobs.getJob(id);
        const jobData = response?.data || response;

        if (!jobData || !jobData.title) {
          setError(true);
        } else {
          setJob(jobData);
        }
      } catch (err) {
        console.error('Failed to fetch job:', err);
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
          Loading Job Details
        </p>
      </div>
    );
  }
  if (error || !job) {
    return notFound();
  }

  return <JobDetailPage job={job} />;
}
