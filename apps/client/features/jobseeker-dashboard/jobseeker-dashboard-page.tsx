"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Link from "next/link";
import {
  BellIcon,
  BookmarkIcon,
  EyeIcon,
  SmallCheckIcon,
} from "./components/dashboard-icons";
import { JobseekerSidebar } from "./components/jobseeker-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";

// Mapping icons to colors
const metricIconClasses: Record<string, string> = {
  applied: "bg-emerald-50 text-emerald-600",
  review: "bg-blue-50 text-blue-600",
  accepted: "bg-emerald-50 text-emerald-600",
  rejected: "bg-rose-50 text-rose-600",
};

export function JobseekerDashboardPage() {
  const { isLoading: authLoading, isAuthenticated, user } = useAuth();
  const { isLoading: profileLoading, jobseekerProfile } = useProfile();
  
  const [analytics, setAnalytics] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoadingAnalytics(true);
        const res = await api.jobs.getJobseekerDashboard() as any;
      
        const actualData = res.data?.data || res.data || res;
        setAnalytics(actualData);
        
      } catch (err) {
        console.error('Failed to load analytics:', err);
      } finally {
        setLoadingAnalytics(false);
      }
    };

    if (isAuthenticated && user?.role === 'jobseeker') {
      loadDashboardData();
    }
  }, [isAuthenticated, user]);

  if (authLoading || profileLoading || loadingAnalytics) {
    return (
      <main className="min-h-screen grid place-items-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-teal-500 border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Syncing Feed</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated || user?.role !== "jobseeker") return null;

  const metrics = [
    { label: "Applied", value: analytics?.cards?.applied || 0, icon: "applied" },
    { label: "In Review", value: analytics?.cards?.inReview || 0, icon: "review" },
    { label: "Accepted", value: analytics?.cards?.accepted || 0, icon: "accepted" },
    { label: "Rejected", value: analytics?.cards?.rejected || 0, icon: "rejected" },
  ];

  return (
    <main className="h-screen bg-[#f8f8fa] text-slate-950">
      <div className="flex h-full flex-col md:flex-row">
        <JobseekerSidebar />

        <section className="min-w-0 flex-1 overflow-y-auto">
          {/* Header */}
          <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 md:px-10">
            <h2 className="text-xl font-black text-[#14214a] tracking-tight">WorkBridge</h2>
            <div className="flex items-center gap-5">
              <Link href="/dashboard/saved-jobs"><BookmarkIcon className="w-5 h-5 text-slate-400 hover:text-teal-600" /></Link>
              <Link href="/dashboard/notifications"><BellIcon className="w-5 h-5 text-slate-400 hover:text-teal-600" /></Link>
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {jobseekerProfile?.firstName?.charAt(0) || user?.displayName?.charAt(0) || 'U'}
              </div>
            </div>
          </header>

          <div className="w-full max-w-[1100px] px-6 py-10 md:px-10">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hello, {jobseekerProfile?.firstName || 'Jobseeker'}</h1>
              <p className="text-slate-500 mt-2 font-medium">Checkout what is updated on your career journey today.</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, idx) => (
                <article key={idx} className="relative p-6 rounded-[1.5rem] border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
                  <div className="absolute left-0 top-6 h-10 w-1 bg-teal-500 rounded-r-full" />
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${metricIconClasses[metric.icon]}`}>
                       {/* Simplified Metric Glyphs */}
                       {metric.icon === 'applied' && <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 14 4-4 3 3 5-6" /><path d="M5 19h14" /></svg>}
                       {metric.icon === 'review' && <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>}
                       {metric.icon === 'accepted' && <SmallCheckIcon className="w-5 h-5" />}
                       {metric.icon === 'rejected' && <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="m8 8 8 8M16 8l-8 8" /></svg>}
                    </div>
                    <strong className="text-4xl font-black text-slate-900 tracking-tighter">{metric.value}</strong>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{metric.label}</span>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {/* Profile Visibility */}
              <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-10">
                  <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><EyeIcon className="w-5 h-5" /></div>
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Profile Visibility</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-2 text-sm font-bold uppercase tracking-wider">
                      <span className="text-slate-400">Profile Views</span>
                      <span className="text-emerald-600">{analytics?.profileViews || 0}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: analytics?.profileViews ? '80%' : '0%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2 text-sm font-bold uppercase tracking-wider">
                      <span className="text-slate-400">Resume Downloads</span>
                      <span className="text-blue-600">{analytics?.resumeDownloads || 0}</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: analytics?.resumeDownloads ? '40%' : '0%' }} />
                    </div>
                  </div>
                </div>
              </section>

              {/* Recent Activity */}
              <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BellIcon className="w-5 h-5" /></div>
                  <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Recent Activity</h2>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <p className="text-slate-400 text-sm font-medium italic">No recent updates to show.</p>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                  <Link href="/dashboard/activities" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest">Full History →</Link>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}