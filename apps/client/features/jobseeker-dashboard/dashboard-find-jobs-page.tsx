'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { JobsPage } from '../jobseeker-dashboard/components/findJobsComponent';
import { useCurrentUser } from '../../hooks/use-current-user';
import { JobseekerSidebar } from './components/jobseeker-sidebar';

export function DashboardFindJobsPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useCurrentUser();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login?next=/dashboard/find-jobs');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
            Initializing Feed
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      <JobseekerSidebar />
      <section className="flex-1 min-w-0 w-full pt-16 md:pt-0">
        <div className="w-full max-w-full overflow-x-hidden">
          <JobsPage />
        </div>
      </section>
    </main>
  );
}
