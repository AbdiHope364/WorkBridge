"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@repo/ui/badge";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";

import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

const Icons = {
  MapPin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
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
      className="w-4 h-4"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  Wallet: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
      <path d="M16 12h5" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  Users: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
    </svg>
  ),
  Bookmark: ({ filled }: { filled?: boolean }) => (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
};

const formatEnum = (str: string) =>
  str
    ?.replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "N/A";

const InfoBox = ({ icon: Icon, label, value }: any) => (
  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
    <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
      <Icon />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-700">{value}</p>
    </div>
  </div>
);

export function JobDetailPage({ job }: { job: any }) {
  // const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      if (isAuthLoading || !isAuthenticated || user?.role !== "jobseeker")
        return;
      try {
        const res = (await api.jobs.getSavedJobs()) as any;
        const savedList = res?.data || res || [];
        if (Array.isArray(savedList)) {
          setIsSaved(
            savedList.some(
              (item: any) => (item.job?._id || item.job) === job.id,
            ),
          );
        }
      } catch (err) {
        console.warn("Unauthorized saved status check.");
      }
    };
    checkStatus();
  }, [isAuthLoading, isAuthenticated, job.id, user?.role]);

  const handleSaveToggle = async () => {
    if (!isAuthenticated) return router.push(`/login?next=/jobs/${job.id}`);
    if (user?.role !== "jobseeker")
      return alert("Only jobseekers can save jobs.");

    try {
      setIsSaving(true);
      if (isSaved) {
        await api.jobs.removeSavedJob(job.id || job._id);
        setIsSaved(false);
      } else {
        await api.jobs.saveJob(job.id || job._id);
        setIsSaved(true);
      }
    } catch (err) {
      alert("Action failed.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsApplying(true);

    try {
      const formData = new FormData();

      formData.append("jobId", job.id || job._id);

      if (coverLetter.trim()) {
        formData.append("coverLetter", coverLetter.trim());
      }

      if (resume) {
        formData.append("attachments", resume);
      }
      await api.applications.submitApplication(formData);

      alert("Application submitted!");
      setShowApplyModal(false);

      setCoverLetter("");
      setResume(null);
    } catch (err: any) {
      alert(err?.message || "Submission failed.");
    } finally {
      setIsApplying(false);
    }
  };

  const company = job.employerSnapshot;
  const postedDate = job.createdAt
    ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })
    : "Recently";

  return (
    <main className="min-h-screen bg-[#F8FAFC] pb-20">
      <div className="bg-white border-b border-slate-200 pt-10 pb-8">
        <Container size="lg" className="max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex gap-6">
              <div className="w-20 h-20 rounded-3xl bg-slate-900 flex items-center justify-center text-white text-3xl font-black shadow-xl">
                {company?.displayName?.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                  {job.title}
                </h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-slate-500 font-medium text-sm">
                  <span className="font-bold text-slate-900">
                    {company?.displayName}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icons.MapPin /> {job.location?.city}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icons.Clock /> Posted {postedDate}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={isSaved ? "primary" : "outline"}
                disabled={isSaving}
                onClick={handleSaveToggle}
                className={`h-12 px-6 rounded-xl font-bold flex items-center gap-2 ${isSaved ? "bg-teal-600 border-teal-600 text-white" : "text-slate-600"}`}
              >
                <Icons.Bookmark filled={isSaved} />
                {isSaved ? "Saved" : "Save Job"}
              </Button>
              <Button
                onClick={() =>
                  isAuthenticated
                    ? setShowApplyModal(true)
                    : router.push("/login")
                }
                className="h-12 px-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black shadow-lg shadow-teal-600/20"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Container size="lg" className="max-w-6xl mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <InfoBox
                icon={Icons.Wallet}
                label="Salary"
                value={`${job.salary?.toLocaleString()} ETB`}
              />
              <InfoBox
                icon={Icons.Briefcase}
                label="Job Type"
                value={formatEnum(job.jobType)}
              />
              <InfoBox
                icon={Icons.Briefcase}
                label="Level"
                value={formatEnum(job.experienceLevel)}
              />
              <InfoBox
                icon={Icons.Users}
                label="Vacancies"
                value={`${job.vacancies || 1} Positions`}
              />
              <InfoBox
                icon={Icons.Briefcase}
                label="Category"
                value={formatEnum(job.category)}
              />
              <InfoBox
                icon={Icons.Briefcase}
                label="Environment"
                value={formatEnum(job.workerType)}
              />
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">
                Description
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {job.description}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">
                Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills?.map((skill: any) => (
                  <Badge
                    key={skill.name}
                    className="bg-slate-100 text-slate-700 px-5 py-2 rounded-xl text-sm font-bold border-none"
                  >
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="rounded-[2rem] border-slate-200 p-8 shadow-sm bg-white overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-24 bg-slate-900" />
              <div className="relative pt-6 text-center">
                <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center text-slate-900 text-2xl font-black mx-auto">
                  {company?.displayName?.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-lg font-black text-slate-900 mt-4">
                  {company?.displayName}
                </h3>
                <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-1">
                  {company?.industry || "Enterprise"}
                </p>
                <div className="mt-8 space-y-4 text-xs text-left border-t border-slate-50 pt-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location</span>
                    <span className="text-slate-800 font-bold">
                      {company?.displayLocation || job.location?.city}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Website</span>
                    <span className="text-teal-600 font-bold hover:underline cursor-pointer">
                      Visit Site
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>

      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
          <Card className="w-full max-w-xl bg-white rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-2xl font-black text-slate-900">
                Apply for Position
              </h2>
              <button
                onClick={() => setShowApplyModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <Icons.X />
              </button>
            </div>
            <form onSubmit={handleApply} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Cover Letter
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="w-full min-h-[140px] p-4 rounded-xl border border-slate-200 focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 outline-none transition-all resize-none text-sm"
                  placeholder="Share why you're a good fit..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Resume / CV (Optional)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setResume(e.target.files?.[0] || null)}
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplyModal(false)}
                  className="flex-1 h-12 rounded-xl font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isApplying}
                  className="flex-1 h-12 rounded-xl bg-teal-600 text-white font-bold shadow-lg shadow-teal-600/20"
                >
                  {isApplying ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </main>
  );
}
