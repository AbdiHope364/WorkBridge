"use client";

import { useEffect, useState, useCallback } from "react";
import { Container } from "@repo/ui/container";
import { Input } from "@repo/ui/input";
import { JobCard } from "@repo/ui/job-card";
import { LandingHeader } from "../landing-page/components/landing-header";

import { JOB_CATEGORIES, JOB_TYPES } from "@repo/types/jobs";
import { api } from "@/lib/api";

const PAGE_SIZE = 6;

/** HELPER: Converts "SOFTWARE_DEVELOPMENT" -> "Software Development" */
const formatEnumLabel = (str: string) =>
  str
    ? str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "";
const ChevronIcon = () => (
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
);

export function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [activeTag, setActiveTag] = useState("All");
  const [page, setPage] = useState(1);

  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);

      const params: any = {
        page,
        limit: PAGE_SIZE,
        status: "OPEN",
        keyword: query.trim() || undefined,
        location: location || undefined,
        category: category || undefined,
        salary: salary ? Number(salary) : undefined,
      };

      // Map Quick Filter Tags
      if (activeTag !== "All" && activeTag !== "Urgent") {
        params.jobType = activeTag;
      }
      if (activeTag === "Urgent") {
        params.isUrgent = true;
      }

      const response = (await api.jobs.getJobs(params)) as any;

      const result = response?.data || response;

      setJobs(result.jobs || []);
      setTotalJobs(result.totalJobs || 0);
    } catch (error) {
      console.error("Fetch Error:", error);
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  }, [page, query, category, location, salary, activeTag]);

  // Debounced search to prevent spamming the database
  useEffect(() => {
    const handler = setTimeout(() => fetchJobs(), 400);
    return () => clearTimeout(handler);
  }, [fetchJobs]);

  // Handle filter changes and reset to page 1
  const onFilterChange = (setter: (val: any) => void, val: any) => {
    setter(val);
    setPage(1);
  };

  const totalPages = Math.ceil(totalJobs / PAGE_SIZE) || 1;

  return (
    <main className="min-h-screen max-w-full bg-slate-50 text-slate-900">
      <LandingHeader />

      <section className="bg-slate-50 py-10">
        <Container size="xl" className="max-w-6xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
              <Input
                label="Search"
                placeholder="Job title or skill..."
                value={query}
                onChange={(e) => onFilterChange(setQuery, e.target.value)}
              />

              {/* Location Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Location
                </label>
                <div className="relative">
                  <select
                    value={location}
                    onChange={(e) =>
                      onFilterChange(setLocation, e.target.value)
                    }
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm appearance-none outline-none focus:border-teal-500 transition-all"
                  >
                    <option value="">Any Location</option>
                    <option value="addis ababa">Addis Ababa</option>
                    <option value="remote">Remote</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronIcon />
                  </div>
                </div>
              </div>

              {/* Category Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Category
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) =>
                      onFilterChange(setCategory, e.target.value)
                    }
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm appearance-none outline-none focus:border-teal-500 transition-all"
                  >
                    <option value="">All Categories</option>
                    {JOB_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {formatEnumLabel(c)}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronIcon />
                  </div>
                </div>
              </div>

              {/* Salary Select */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Min Salary
                </label>
                <div className="relative">
                  <select
                    value={salary}
                    onChange={(e) => onFilterChange(setSalary, e.target.value)}
                    className="w-full h-11 px-4 pr-10 rounded-xl border border-slate-200 bg-white text-sm appearance-none outline-none focus:border-teal-500 transition-all"
                  >
                    <option value="">Any Salary</option>
                    <option value="20000">20,000 ETB+</option>
                    <option value="40000">40,000 ETB+</option>
                    <option value="60000">60,000 ETB+</option>
                    <option value="80000">80,000 ETB+</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronIcon />
                  </div>
                </div>
              </div>
            </div>

            {/* --- QUICK TAG BAR --- */}
            <div className="mt-8 flex flex-wrap items-center gap-2 pt-6 border-t border-slate-50">
              <span className="text-[10px] font-black uppercase text-slate-400 mr-2">
                Quick Filter:
              </span>
              <button
                type="button"
                onClick={() => onFilterChange(setActiveTag, "All")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                  activeTag === "All"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                All
              </button>
              {JOB_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onFilterChange(setActiveTag, type)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                    activeTag === type
                      ? "bg-teal-600 border-teal-600 text-white shadow-md"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {formatEnumLabel(type)}
                </button>
              ))}
            </div>
          </div>

          {/* --- RESULTS INFO --- */}
          <div className="mt-10 border-y border-slate-200 bg-white px-8 py-5 flex justify-between items-center rounded-xl">
            <p className="text-sm font-bold text-slate-900 tracking-tight">
              {isLoading
                ? "Searching database..."
                : `Found ${totalJobs} matching positions`}
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Page {page} of {totalPages}
            </p>
          </div>

          {/* --- JOB LISTING GRID --- */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2 w-full max-w-full overflow-hidden">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-full bg-slate-200 animate-pulse rounded-[2rem]"
                />
              ))
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
                <div key={job.id || job._id} className="min-w-0 w-full">
                  <JobCard
                    key={job.id || job._id}
                    title={job.title}
                    company={job.employerSnapshot?.displayName || "Employer"}
                    location={job.location?.city}
                    type={formatEnumLabel(job.jobType)}
                    salary={`${job.salary?.toLocaleString()} ETB`}
                    description={job.description}
                    tags={
                      job.skills
                        ?.slice(0, 3)
                        .map((s: any) =>
                          typeof s === "string" ? s : s.name,
                        ) || []
                    }
                    href={`/jobs/${job.id || job._id}`}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                  No matching jobs found
                </h2>
                <p className="text-sm text-slate-400 mt-2 font-medium">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>

          {/* --- PAGINATION SECTION --- */}
          {!isLoading && totalJobs > PAGE_SIZE && (
            <div className="mt-16 flex items-center justify-center gap-3">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-4 py-2 text-sm font-bold text-slate-500 disabled:opacity-20 transition-all hover:text-teal-600"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pNum) => (
                    <button
                      key={pNum}
                      onClick={() => setPage(pNum)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        page === pNum
                          ? "bg-teal-600 text-white shadow-xl scale-110"
                          : "bg-white border border-slate-200 text-slate-500 hover:border-teal-500 shadow-sm"
                      }`}
                    >
                      {pNum}
                    </button>
                  ),
                )}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-4 py-2 text-sm font-bold text-slate-500 disabled:opacity-20 transition-all hover:text-teal-600"
              >
                Next
              </button>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}
