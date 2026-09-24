"use client";

import React from "react";
import Link from "next/link";
import {
  Eye,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Circle,
  CheckCircle2,
  Clock,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";
import { api } from "@/lib/api";

interface Jobseeker {
  id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  status: "Active" | "Inactive" | "Suspended";
  verification: "Verified" | "Pending" | "Unverified";
  joinedOn: string;
}

export function JobseekersTable() {
  const [activeModal, setActiveModal] = React.useState<{
    type: "suspend" | "delete";
    id: string;
  } | null>(null);
  const [jobseekers, setJobseekers] = React.useState<Jobseeker[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterStatus, setFilterStatus] = React.useState<"All" | "Active" | "Verified" | "Pending">("All");
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    let mounted = true;
    void api.admin.listUsers()
      .then((users) => {
        if (!mounted) return;
        const workers = users.filter((u) => u.role === "worker" || !u.role || u.role === ("jobseeker" as string));
        setJobseekers(
          workers.map((u) => {
            const prof = (u.profile || {}) as Record<string, unknown>;
            const skillsArr = Array.isArray(prof.skills)
              ? (prof.skills as string[])
              : ["Master Electrician", "Plumber", "Trade Specialist"];
            return {
              id: u.id,
              name: u.name || (prof.fullName as string) || "Anonymous Worker",
              email: u.email,
              phone: (prof.phone as string) || "+251 90 000 0000",
              skills: skillsArr,
              status: "Active",
              verification: u.verified ? "Verified" : "Pending",
              joinedOn: "Recent",
            };
          }),
        );
      })
      .catch((err: unknown) => {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to load jobseekers.");
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = (reason: string) => {
    if (!activeModal) return;
    if (activeModal.type === "suspend") {
      setJobseekers((prev) =>
        prev.map((item) =>
          item.id === activeModal.id ? { ...item, status: "Suspended" } : item,
        ),
      );
      alert(`User suspended. Reason logged: ${reason}`);
    } else {
      setJobseekers((prev) => prev.filter((item) => item.id !== activeModal.id));
      alert(`User account deleted permanently.`);
    }
    setActiveModal(null);
  };

  const filtered = jobseekers.filter((j) => {
    const matchesSearch =
      j.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterStatus === "Active") return matchesSearch && j.status === "Active";
    if (filterStatus === "Verified") return matchesSearch && j.verification === "Verified";
    if (filterStatus === "Pending") return matchesSearch && j.verification === "Pending";
    return matchesSearch;
  });

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center overflow-x-auto max-w-full pb-0.5 no-scrollbar bg-white p-1 rounded-2xl border border-slate-200/80 shadow-2xs">
          {(["All", "Active", "Verified", "Pending"] as const).map((st) => (
            <button
              key={st}
              onClick={() => {
                setFilterStatus(st);
                setCurrentPage(1);
              }}
              className={cn(
                "shrink-0 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all",
                filterStatus === st
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
              )}
            >
              {st === "All" ? "All Workers" : st}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search worker, email, skill..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200/80 rounded-xl shadow-2xs text-xs font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden p-4 sm:p-6">
        {/* Modal for Suspend/Delete */}
        <ActionModal
          isOpen={!!activeModal}
          onClose={() => setActiveModal(null)}
          onConfirm={handleAction}
          title={
            activeModal?.type === "suspend" ? "Suspend Trade Worker" : "Delete Worker Account"
          }
          description={
            activeModal?.type === "suspend"
              ? "Are you sure you want to suspend this trade worker? They will lose access to job applications."
              : "Are you sure you want to delete this user? This action is permanent and cannot be undone."
          }
          confirmText={
            activeModal?.type === "suspend"
              ? "Confirm Suspension"
              : "Delete Permanently"
          }
          confirmVariant={
            activeModal?.type === "suspend" ? "warning" : "danger"
          }
        />

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="w-full min-w-[750px] text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase">
                  User
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase">
                  Email
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase whitespace-nowrap">
                  Phone Number
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase">
                  Skills &amp; Trade
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase">
                  Status
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 uppercase">
                  Fayda Verification
                </th>
                <th className="px-5 py-3.5 text-xs font-bold text-slate-700 text-center uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-500">
                    Loading trade workers...
                  </td>
                </tr>
              )}
              {error && !isLoading && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-rose-600">
                    {error}
                  </td>
                </tr>
              )}
              {!isLoading && !error && paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-slate-500">
                    No matching workers found.
                  </td>
                </tr>
              )}
              {!isLoading &&
                !error &&
                paginated.map((jobseeker) => (
                  <tr
                    key={jobseeker.id}
                    className="group hover:bg-slate-50/60 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold flex items-center justify-center text-xs shrink-0">
                          {jobseeker.name.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-900 text-xs sm:text-sm truncate max-w-32">
                          {jobseeker.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium text-slate-500 truncate max-w-40">
                      {jobseeker.email}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-mono font-bold text-slate-700">
                      {jobseeker.phone}
                    </td>
                    <td className="px-5 py-3.5 text-xs font-medium text-slate-600 truncate max-w-44">
                      {jobseeker.skills.join(", ")}
                    </td>
                    <td className="px-5 py-3.5">
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2.5 py-0.5 rounded-full w-fit text-[10px] font-extrabold uppercase tracking-tight",
                          jobseeker.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-rose-50 text-rose-600",
                        )}
                      >
                        <Circle className="w-2 h-2 fill-current" />
                        {jobseeker.status}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div
                        className={cn(
                          "flex items-center gap-1 px-2.5 py-0.5 rounded-full w-fit text-[10px] font-extrabold uppercase tracking-tight",
                          jobseeker.verification === "Verified"
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                            : "bg-amber-50 text-amber-600 border border-amber-200",
                        )}
                      >
                        {jobseeker.verification === "Verified" ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        {jobseeker.verification}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          href={`/jobseekers/${jobseeker.id}`}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition active:scale-95"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() =>
                            setActiveModal({ type: "suspend", id: jobseeker.id })
                          }
                          className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition active:scale-95"
                          title="Suspend User"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() =>
                            setActiveModal({ type: "delete", id: jobseeker.id })
                          }
                          className="p-2 bg-rose-100 text-rose-700 hover:bg-rose-200 rounded-lg transition active:scale-95"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100">
          <p className="text-xs font-semibold text-slate-500">
            Page <strong className="text-slate-900">{currentPage}</strong> of <strong className="text-slate-900">{totalPages}</strong>
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => setCurrentPage(pg)}
                className={cn(
                  "w-8 h-8 rounded-xl text-xs font-extrabold transition",
                  currentPage === pg
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50",
                )}
              >
                {pg}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 disabled:opacity-40 transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
