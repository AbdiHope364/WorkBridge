'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { api } from '@/lib/api';
import { JobseekerSidebar } from './components/jobseeker-sidebar';

const Icons = {
  Location: () => (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
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
  X: ({ className }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

function SavedJobCard({
  savedItem,
  onRemove,
}: {
  savedItem: any;
  onRemove: (id: string) => void;
}) {
  const job = savedItem?.jobId || savedItem?.job;
  if (!job) return null;

  return (
    <article className="group relative rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:shadow-md hover:border-[#079F67]/30 flex flex-col h-full">
      <div className="flex items-start justify-between gap-4 min-w-0">
        <div className="flex gap-4 min-w-0">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 border border-slate-100 text-[#0F132E]/20 font-black text-xl uppercase">
            {job.title?.charAt(0)}
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-lg font-bold text-[#0F132E] group-hover:text-[#079F67] transition-colors capitalize">
              {job.title}
            </h2>
            <div className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-slate-500">
              <span className="truncate">
                {job.employerSnapshot?.displayName || 'Employer'}
              </span>
              <Icons.Verified />
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-[#079F67] font-bold">
              <Icons.Location />
              <span className="truncate">{job.location?.city}</span>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0">
          <p className="text-sm font-black text-[#0F132E]">
            {job.salary?.toLocaleString()}
          </p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {job.budget || 'ETB'}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-500 line-clamp-2 break-words flex-1">
        {job.description}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-50 pt-5 gap-4">
        <div className="flex flex-wrap gap-2">
          {job.skills?.slice(0, 2).map((skill: any, i: number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] font-bold border border-slate-100 uppercase tracking-tighter"
            >
              {typeof skill === 'string' ? skill : skill?.name}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onRemove(job._id || job.id)}
            className="p-2.5 rounded-xl border border-rose-100 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm flex-1 sm:flex-none flex justify-center"
            title="Remove"
          >
            <Icons.X className="h-4 w-4" />
          </button>
          <Link
            href={`/jobs/${job._id || job.id}`}
            className="flex-1 sm:flex-none h-11 px-8 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#079F67] to-[#0F132E] text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-[#0F132E]/10 hover:opacity-90 active:scale-95 transition-all"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </article>
  );
}

export function SavedJobsPage() {
  const { isLoading: isAuthLoading, isAuthenticated } = useAuth();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const response = await api.jobs.getSavedJobs();
        setItems(response?.data || []);
      } catch (err) {
        console.error('Failed to load saved jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchSavedJobs();
  }, [isAuthenticated]);

  const handleRemove = async (jobId: string) => {
    try {
      await api.jobs.removeSavedJob(jobId);
      setItems((prev) =>
        prev.filter(
          (item) =>
            (item.jobId?._id || item.job?._id || item.jobId || item.job) !==
            jobId,
        ),
      );
    } catch (err) {
      alert('Failed to remove.');
    }
  };

  if (isAuthLoading || loading)
    return (
      <main className="h-screen grid place-items-center bg-white">
        <div className="w-10 h-10 border-4 border-[#079F67] border-t-transparent rounded-full animate-spin" />
      </main>
    );

  return (
    <main className="h-screen flex overflow-hidden bg-[#F8FAFC]">
      <div className="hidden md:block w-64 h-full shrink-0 border-r border-slate-200">
        <JobseekerSidebar />
      </div>

      <div className="md:hidden">
        <JobseekerSidebar />
      </div>
      <section className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-8 md:p-12 min-w-0 w-full">
        <div className="max-w-5xl mx-auto w-full">
          <header className="mb-10 pt-16 md:pt-0">
            <h1 className="text-4xl md:text-5xl font-light text-[#0F132E] tracking-tight">
              Saved Jobs
            </h1>
            <p className="text-slate-500 text-sm md:text-lg mt-2 font-medium">
              You have {items.length} positions saved for your review.
            </p>
          </header>

          {items.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 pb-24 w-full">
              {items.map((item) => (
                <div key={item._id} className="min-w-0 w-full">
                  <SavedJobCard savedItem={item} onRemove={handleRemove} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
              <h2 className="text-xl font-bold text-[#0F132E]">Empty list</h2>
              <Link
                href="/jobs"
                className="mt-6 inline-flex px-8 py-3 bg-[#0F132E] text-white font-black text-xs uppercase tracking-widest rounded-xl"
              >
                Browse Jobs
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}