"use client";

import { useEffect, useState, useCallback } from "react";
import { Container } from "@repo/ui/container";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { JobCard } from "@repo/ui/job-card";

import { JOB_CATEGORIES, JOB_TYPES, WORKPLACE_TYPES } from "@repo/types/jobs";
import { api } from "@/lib/api";

const PAGE_SIZE = 6;

// HELPER: Converts "SOFTWARE_DEVELOPMENT" -> "Software Development"
const formatEnumLabel = (str: string) =>
  str
    ? str
        .replace(/_/g, " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase())
    : "";

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
        salary: salary || undefined,
      };

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

  useEffect(() => {
    const handler = setTimeout(() => fetchJobs(), 400);
    return () => clearTimeout(handler);
  }, [fetchJobs]);

  const onFilterChange = (setter: (val: any) => void, val: any) => {
    setter(val);
    setPage(1);
  };

  const totalPages = Math.ceil(totalJobs / PAGE_SIZE) || 1;

  return (
    <main className="min-h-screen max-w-full bg-slate-50 text-slate-900">
      <section className="bg-slate-50 py-10">
        <Container size="xl" className="max-w-6xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-end">
              <Input
                label="Search"
                placeholder="Job title or keywords..."
                value={query}
                onChange={(e) => onFilterChange(setQuery, e.target.value)}
              />

              <Select
                label="Location"
                value={location}
                onChange={(e) => onFilterChange(setLocation, e.target.value)}
              >
                <option value="">Any Location</option>
                <option value="addis ababa">Addis Ababa</option>
                {WORKPLACE_TYPES.map((w) => (
                  <option key={w} value={w}>
                    {formatEnumLabel(w)}
                  </option>
                ))}
              </Select>

              <Select
                label="Category"
                value={category}
                onChange={(e) => onFilterChange(setCategory, e.target.value)}
              >
                <option value="">All Categories</option>
                {JOB_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {formatEnumLabel(c)}
                  </option>
                ))}
              </Select>

              <Select
                label="Min Salary"
                value={salary}
                onChange={(e) => onFilterChange(setSalary, e.target.value)}
              >
                <option value="">Any Salary</option>
                <option value="20000">20,000 ETB+</option>
                <option value="40000">40,000 ETB+</option>
                <option value="60000">60,000 ETB+</option>
                <option value="80000">80,000 ETB+</option>
              </Select>
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
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
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

          <div className="mt-10 border-y border-slate-200 bg-white px-8 py-5 flex justify-between items-center rounded-xl">
            <p className="text-sm font-bold text-slate-900 tracking-tight">
              {isLoading
                ? "Loading information..."
                : `Found ${totalJobs} matching positions`}
            </p>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              Page {page} of {totalPages}
            </p>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {isLoading ? (
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 w-full bg-slate-200 animate-pulse rounded-[2rem]"
                />
              ))
            ) : jobs.length > 0 ? (
              jobs.map((job) => (
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
                      .map((s: any) => (typeof s === "string" ? s : s.name)) ||
                    []
                  }
                  href={`/jobs/${job.id || job._id}`}
                />
              ))
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                <h2 className="text-xl font-bold text-slate-400 uppercase tracking-widest">
                  No matching jobs found
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>

          {/* --- PAGINATION SECTION --- */}
          {!isLoading && totalPages > 1 && (
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
                          ? "bg-teal-600 text-white shadow-lg"
                          : "bg-white border border-slate-200 text-slate-500 hover:border-teal-500"
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
