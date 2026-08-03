"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  CheckCircle2,
  Clock,
  Building2,
  DollarSign,
  GraduationCap,
  Users,
  Check,
  X,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";

export default function JobDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  // TODO: Fetch real job data by id
  const job = {
    id,
    title: "Senior React Developer",
    employer: "TechCorp Solutions",
    type: "Full-Time",
    category: "Software Development",
    location: "Addis Ababa, Ethiopia (Hybrid)",
    salary: "$2,500 - $4,000 / month",
    postedDate: "June 18, 2025",
    status: "Pending",
    experience: "5+ Years",
    education: "Bachelor's Degree in CS",
    description:
      "We are looking for a Senior React Developer to join our core engineering team. You will be responsible for building high-quality, performant web applications and mentoring junior developers.",
    requirements: [
      "Expert knowledge of React, Next.js, and TypeScript",
      "Strong understanding of State Management (Redux/Zustand)",
      "Experience with CSS-in-JS or Tailwind CSS",
      "Experience with API integration and RESTful services",
      "Excellent communication and teamwork skills",
    ],
  };

  const handleApprove = () => {
    // TODO: Integrate with backend to approve job
    console.log("Job approved:", id);
    router.push("/jobs");
  };

  const handleReject = (reason: string) => {
    // TODO: Integrate with backend to reject job with reason
    console.log("Job rejected:", id, "Reason:", reason);
    setRejectModalOpen(false);
    router.push("/jobs");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ActionModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Reject Job Posting"
        description="Please provide a reason for rejecting this job posting. The employer will be notified."
        confirmText="Confirm Rejection"
        confirmVariant="danger"
      />

      <header className="px-10 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/jobs"
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Post Verification
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Job ID: {id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {job.status === "Pending" && (
              <>
                <button
                  onClick={() => setRejectModalOpen(true)}
                  className="flex items-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-black transition-all active:scale-95"
                >
                  <X className="w-4 h-4" />
                  Reject Posting
                </button>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-200 transition-all active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  Approve & Publish
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 p-10 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Job Overview */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                <Building2 className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2">
                {job.title}
              </h2>
              <p className="text-emerald-600 font-black text-sm uppercase tracking-wider mb-6">
                {job.employer}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold">{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs font-bold">{job.type}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-xs font-bold">{job.salary}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold">
                    Posted: {job.postedDate}
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-50">
                <div
                  className={cn(
                    "flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-black uppercase tracking-widest",
                    job.status === "Pending"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-emerald-50 text-emerald-600",
                  )}
                >
                  {job.status === "Pending" ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  Status: {job.status}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                Candidate Requirements
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Experience
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {job.experience}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Education
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {job.education}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-50">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Job Description
                </h3>
              </div>
              <p className="text-slate-600 font-bold leading-relaxed">
                {job.description}
              </p>
            </section>

            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Key Requirements
                </h3>
              </div>
              <ul className="space-y-4">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-slate-700 leading-tight">
                      {req}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {job.status === "Pending" && (
              <section className="bg-[#0F172A] rounded-[2rem] p-10 shadow-2xl text-white">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-white/60">
                  Admin Action Required
                </h3>
                <p className="text-white/80 font-medium mb-8">
                  Review the job posting details carefully before approval. Once
                  approved, the job will be visible to all jobseekers on the
                  platform.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleApprove}
                    className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                  >
                    Approve Posting
                  </button>
                  <button
                    onClick={() => setRejectModalOpen(true)}
                    className="flex-1 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-black text-sm transition-all active:scale-95"
                  >
                    Reject Posting
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
