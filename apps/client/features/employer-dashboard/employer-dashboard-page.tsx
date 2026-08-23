"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BellIcon,
  SearchJobIcon,
} from "../jobseeker-dashboard/components/dashboard-icons";
import { EmployerSidebar } from "./components/employer-sidebar";
import { useAuth } from "@/contexts/auth-context";
import { useProfile } from "@/contexts/profile-context";
import { api } from "@/lib/api";
import Image from "next/image";

/** --- Icons & Glyphs --- */
const Icons = {
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-5 h-5"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  FileText: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className="w-4 h-4"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
};

/** --- Sub-Components --- */
function StatCard({ label, value, icon: Icon, colorClass }: any) {
  return (
    <article className="relative p-6 rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${colorClass}`}
      >
        <Icon />
      </div>
      <strong className="text-3xl font-black text-slate-900 tracking-tight">
        {value}
      </strong>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
        {label}
      </p>
    </article>
  );
}

export function EmployerDashboardPage() {
  const { isAuthenticated, user } = useAuth();
  const { isLoading: profileLoading, employerProfile } = useProfile();

  const [analytics, setAnalytics] = useState<any>(null);
  const [activeJobs, setActiveJobs] = useState<any[]>([]);
  const [recentApps, setRecentApps] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!isAuthenticated || user?.role !== "employer") return;
      try {
        setLoadingData(true);
        const [analyticsRes, jobsRes, appsRes] = await Promise.all([
          api.jobs.getEmployerDashboard(),
          api.jobs.getEmployerJobs({ limit: 4, status: "OPEN" }),
          api.applications.getApplications({ limit: 5 }),
        ]);

        setAnalytics(analyticsRes.data);
        setActiveJobs(jobsRes.data?.jobs || jobsRes.data || []);
        setRecentApps(appsRes.data?.applications || appsRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user]);

  if (profileLoading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Syncing Data
          </p>
        </div>
      </div>
    );
  }

  const initials = (() => {
    if (!employerProfile) return "E";
    if (employerProfile.employerType === "COMPANY_EMPLOYER") {
      return employerProfile.companyName?.charAt(0) ?? "E";
    }
    return employerProfile.fullName?.charAt(0) ?? "E";
  })();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />

        <section className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-10 sticky top-0 z-20">
            <h2 className="text-xl font-black text-slate-800 tracking-tight italic">
              WorkBridge
            </h2>
            <div className="flex items-center gap-6">
              <BellIcon className="h-5 w-5 text-slate-400 cursor-pointer" />
              <Link href="/dashboard/employer/profile">
                <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-sm shadow-lg overflow-hidden border-2 border-slate-900">
                  {employerProfile?.employerType === "COMPANY_EMPLOYER" && employerProfile.companyLogoUrl?.url ? (
                    <Image
                      src={employerProfile.companyLogoUrl.url}
                      alt="Logo"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
              </Link>
            </div>
          </header>

          <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
            <header className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                Hiring Overview
              </h1>
              <p className="text-slate-500 font-medium mt-1">
                Real-time summary of your current recruitment pipeline.
              </p>
            </header>

            {/* Metrics */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Live Jobs"
                value={analytics?.dashboardCards?.activePostings || 0}
                icon={Icons.Briefcase}
                colorClass="bg-teal-50 text-teal-600"
              />
              <StatCard
                label="Drafts"
                value={analytics?.dashboardCards?.draftJobs || 0}
                icon={Icons.FileText}
                colorClass="bg-blue-50 text-blue-600"
              />
              <StatCard
                label="Total Applications"
                value={analytics?.dashboardCards?.totalApplications || 0}
                icon={Icons.Users}
                colorClass="bg-purple-50 text-purple-600"
              />
              <StatCard
                label="Hires"
                value={analytics?.dashboardCards?.hiredWorkers || 0}
                icon={Icons.Users}
                colorClass="bg-emerald-50 text-emerald-600"
              />
            </div>

            <div className="mt-12 grid gap-10 lg:grid-cols-3">
              {/* Active Jobs List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest text-[13px]">
                    Recent Postings
                  </h2>
                  <Link
                    href="/dashboard/employer/my-jobs"
                    className="text-sm font-bold text-teal-600 flex items-center gap-1 hover:underline"
                  >
                    View All <Icons.ArrowRight />
                  </Link>
                </div>

                <div className="space-y-4">
                  {activeJobs.map((job) => (
                    <article
                      key={job._id}
                      className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm flex items-center justify-between group hover:border-teal-500 transition-all"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-900 truncate group-hover:text-teal-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-[10px] font-black uppercase text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                            {job.status}
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {job.applicationsCount || 0} Applicants
                          </span>
                          <span className="text-xs font-medium text-slate-400">
                            {job.viewsCount || 0} Views
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/dashboard/employer/jobs/${job._id}/edit`}
                        className="h-9 px-4 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold flex items-center hover:bg-slate-200"
                      >
                        Edit
                      </Link>
                    </article>
                  ))}
                </div>
              </div>

              {/* Recent Applicants */}
              <aside className="space-y-6">
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest text-[13px] px-2">
                  Latest Talent
                </h2>
                <div className="bg-white border border-slate-200 rounded-3xl shadow-sm divide-y divide-slate-50 overflow-hidden">
                  {recentApps.map((app) => (
                    <article
                      key={app._id}
                      className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 text-xs shrink-0">
                        {app.applicantSnapshot?.firstName?.[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {app.applicantSnapshot?.firstName}{" "}
                          {app.applicantSnapshot?.lastName}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {app.applicantSnapshot?.currentPosition}
                        </p>
                      </div>
                    </article>
                  ))}
                  <Link
                    href="/dashboard/employer/applications"
                    className="flex items-center justify-center h-14 bg-slate-50/50 text-sm font-bold text-teal-600 hover:bg-teal-50 transition-all"
                  >
                    Pipeline Manager <Icons.ArrowRight />
                  </Link>
                </div>
              </aside>
            </div>

            {/* Quick Actions */}
            <section className="mt-12">
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-widest text-[13px] px-2 mb-6">
                Workflow Shortcuts
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/dashboard/employer/create"
                  className="h-24 rounded-3xl bg-slate-900 flex flex-col items-center justify-center gap-2 text-white hover:bg-teal-600 transition-all group shadow-xl shadow-slate-900/10"
                >
                  <Icons.Plus />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Post New Job
                  </span>
                </Link>
                <Link
                  href="/dashboard/employer/find-workers"
                  className="h-24 rounded-3xl bg-white border border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-600 hover:border-teal-500 transition-all shadow-sm"
                >
                  <SearchJobIcon className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">
                    Browse Workers
                  </span>
                </Link>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
