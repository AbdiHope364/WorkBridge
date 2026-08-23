"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { EmployerSidebar } from "./components/employer-sidebar";
import { SearchJobIcon } from "../jobseeker-dashboard/components/dashboard-icons";

const STATUS = {
  APPLIED: "APPLIED",
  REVIEWING: "REVIEWING",
  SHORTLISTED: "SHORTLISTED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

const Icons = {
  Back: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  Chevron: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
  Briefcase: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

export function EmployerApplicationsPage() {
  const { user: _user } = useAuth();
  const searchParams = useSearchParams();

  const jobId = searchParams.get("jobId");

  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = jobId
        ? await api.applications.getJobApplications(jobId)
        : await api.applications.getApplications();

      const data = res?.data || res;
      const list = data?.applications || (Array.isArray(data) ? data : []);
      setApplications(list);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleUpdateStatus = async (
    applicationId: string,
    newStatus: string,
  ) => {
    try {
      await api.applications.updateStatus(applicationId, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (err: any) {
      alert(err.message || "Failed to update status.");
    }
  };

  const filteredList = useMemo(() => {
    return applications.filter((app) => {
      const matchesStatus =
        statusFilter === "ALL" || app.status === statusFilter;
      const fullName =
        `${app.applicantSnapshot?.firstName} ${app.applicantSnapshot?.lastName}`.toLowerCase();
      return matchesStatus && fullName.includes(searchTerm.toLowerCase());
    });
  }, [applications, statusFilter, searchTerm]);

  // Derived Title for the Page
  const pageTitle =
    jobId && applications.length > 0
      ? `Applicants for ${applications[0].jobId?.title || "Position"}`
      : "Candidate Pipeline";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen flex-col md:flex-row">
        <EmployerSidebar />
        <section className="flex-1 flex flex-col min-w-0">
          <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
            <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  {jobId && (
                    <Link
                      href="/dashboard/employer/my-jobs"
                      className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                    >
                      <Icons.Back />
                    </Link>
                  )}
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 truncate">
                    {pageTitle}
                  </h1>
                </div>
                <p className="text-slate-500 font-medium ml-1">
                  {jobId
                    ? "Showing candidates for this specific listing"
                    : "Review all incoming applications across your postings."}
                </p>
              </div>
              <div className="relative w-full lg:w-96">
                <SearchJobIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search by candidate name..."
                  className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 outline-none focus:border-teal-500 transition-all bg-white shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </header>

            {/* Filter Tabs */}
            <div className="flex p-1 bg-slate-200/50 rounded-xl w-fit mb-8 overflow-x-auto max-w-full">
              {[
                "ALL",
                STATUS.APPLIED,
                STATUS.REVIEWING,
                STATUS.SHORTLISTED,
                STATUS.REJECTED,
                STATUS.ACCEPTED,
              ].map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-6 py-2.5 rounded-lg text-xs font-black uppercase transition-all whitespace-nowrap ${
                    statusFilter === f
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {f === STATUS.ACCEPTED ? "HIRED" : f}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="py-20 text-center animate-pulse font-bold text-slate-400 uppercase tracking-widest">
                  Loading Pipeline...
                </div>
              ) : filteredList.length > 0 ? (
                filteredList.map((app) => (
                  <article
                    key={app._id}
                    className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
                  >
                    <div className="flex gap-5 flex-1 min-w-0">
                      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl font-bold text-slate-300 border border-slate-100 shrink-0">
                        {app.applicantSnapshot?.firstName?.[0]}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-xl font-bold text-slate-900 truncate">
                          {app.applicantSnapshot?.firstName}{" "}
                          {app.applicantSnapshot?.lastName}
                        </h2>

                        {/* JOB CONTEXT INFO */}
                        <div className="flex items-center gap-2 text-sm font-semibold text-teal-600 mt-1">
                          <Icons.Briefcase />
                          <span className="truncate">
                            Applied for:{" "}
                            {app.jobId?.title || "Unknown Position"}
                          </span>
                        </div>

                        <p className="text-sm font-medium text-slate-400 mt-1">
                          Current:{" "}
                          {app.applicantSnapshot?.currentPosition ||
                            "Applicant"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex flex-col md:flex-row items-center gap-3">
                        <Link
                          href={`/dashboard/employer/applications/${app._id}`}
                          className="h-10 px-5 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                        >
                          <Icons.User /> View Profile
                        </Link>
                        <div className="relative">
                          <select
                            aria-label="Update application status"
                            value={app.status}
                            onChange={(e) =>
                              handleUpdateStatus(app._id, e.target.value)
                            }
                            className="h-10 pl-4 pr-10 rounded-xl border-2 border-slate-900 bg-white text-xs font-bold appearance-none cursor-pointer outline-none focus:ring-4 focus:ring-teal-500/10 transition-all"
                          >
                            <option value={STATUS.APPLIED}>Applied</option>
                            <option value={STATUS.REVIEWING}>Reviewing</option>
                            <option value={STATUS.SHORTLISTED}>
                              Shortlisted
                            </option>
                            <option value={STATUS.ACCEPTED}>
                              Hire (Accept)
                            </option>
                            <option value={STATUS.REJECTED}>Reject</option>
                          </select>
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-900">
                            <Icons.Chevron />
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold uppercase tracking-widest italic">
                    No matching applications found
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
