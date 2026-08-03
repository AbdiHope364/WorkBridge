"use client";

import React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  X,
  FileText,
  Download,
  Eye,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";

export default function VerificationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);

  // TODO: Fetch real verification application data by id
  const request = {
    id,
    applicantName: "Abdisa Leta",
    userType: "Jobseeker",
    email: "abdisaleta@gmail.com",
    submittedDate: "June 20, 2025",
    status: "Pending",
    documents: [
      { name: "National ID Front", type: "Image", size: "1.2 MB", url: "#" },
      { name: "National ID Back", type: "Image", size: "1.1 MB", url: "#" },
      { name: "Academic Certificate", type: "PDF", size: "3.4 MB", url: "#" },
    ],
  };

  const handleVerify = () => {
    // TODO: Integrate with backend to verify user
    console.log("User verified:", id);
    router.push("/verification");
  };

  const handleReject = (reason: string) => {
    // TODO: Integrate with backend to reject verification with reason
    console.log("Verification rejected:", id, "Reason:", reason);
    setRejectModalOpen(false);
    router.push("/verification");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ActionModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Reject Verification"
        description="Please provide a reason for rejecting this verification request. This will be sent to the user."
        confirmText="Confirm Rejection"
        confirmVariant="danger"
      />

      <header className="px-10 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/verification"
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Review Application
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Request ID: {id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRejectModalOpen(true)}
              className="flex items-center gap-2 px-6 py-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-black transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
            <button
              onClick={handleVerify}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-lg shadow-emerald-200 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              Verify User
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-10 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Applicant Overview */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center border-4 font-black text-2xl",
                    request.userType === "Jobseeker"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-emerald-50 text-emerald-600 border-emerald-100",
                  )}
                >
                  {request.applicantName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tight">
                    {request.applicantName}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {request.userType}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Status
                    </p>
                    <div className="flex items-center gap-1.5 text-amber-600 font-black text-xs uppercase tracking-tighter">
                      <Clock className="w-3.5 h-3.5" />
                      {request.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                      Submitted
                    </p>
                    <p className="text-xs font-black text-slate-800">
                      {request.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {request.email}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-[#0F172A] rounded-[2rem] p-10 shadow-2xl text-white">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-4 text-white/50">
                Verification Guidelines
              </h3>
              <ul className="space-y-4">
                {[
                  "Confirm image clarity and readability",
                  "Verify document expiry date",
                  "Check if name matches profile",
                  "Verify business registration number",
                ].map((guide, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs font-bold text-white/80"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    {guide}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Documents Viewer */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Submitted Documents
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
                {request.documents.map((doc, idx) => (
                  <div key={idx} className="group relative">
                    <div className="aspect-[4/3] bg-slate-50 rounded-[1.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-6 transition-all group-hover:border-emerald-300 group-hover:bg-emerald-50/30">
                      <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 text-slate-400 group-hover:text-emerald-500 transition-colors">
                        <FileText className="w-8 h-8" />
                      </div>
                      <p className="text-sm font-black text-slate-800">
                        {doc.name}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        {doc.type} • {doc.size}
                      </p>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/10 backdrop-blur-[2px] rounded-[1.5rem]">
                      <button className="p-3 bg-white text-slate-900 rounded-xl shadow-xl hover:scale-110 transition-transform active:scale-95">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-3 bg-emerald-500 text-white rounded-xl shadow-xl hover:scale-110 transition-transform active:scale-95">
                        <Download className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between gap-6">
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-900 mb-2">
                    Are the documents valid?
                  </h4>
                  <p className="text-xs font-bold text-slate-400">
                    By verifying this user, you confirm that their identity or
                    business documents are legitimate and up to date.
                  </p>
                </div>
                <button
                  onClick={handleVerify}
                  className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-emerald-200 transition-all active:scale-95"
                >
                  Approve Verification
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
