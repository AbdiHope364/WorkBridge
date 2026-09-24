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
  QrCode,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionModal } from "@/components/action-modal";
import { api } from "@/lib/api";

export default function VerificationDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const [activeDocPreview, setActiveDocPreview] = React.useState<string | null>(null);

  // Application data with Ethiopian Fayda KYC details
  const request = {
    id: id || "1",
    applicantName: id === "2" ? "TechCorp Solutions (Solomon T.)" : "Abdi Abiot",
    userType: id === "2" ? "Employer" : "Jobseeker",
    email: id === "2" ? "contact@techcorp.et" : "abdihope24@gmail.com",
    phone: "+251 91 123 4567",
    submittedDate: "June 20, 2025",
    status: "Pending",
    faydaFin: id === "2" ? "FIN-8812-4439-0192" : "FIN-9042-8821-3419",
    dateOfBirth: "May 14, 2001",
    gender: "Male",
    location: "Addis Ababa / Dire Dawa, Ethiopia",
    matchScore: 98,
    documents: [
      {
        name: "Fayda National ID (Front)",
        type: "National Digital ID",
        size: "1.4 MB",
        preview: "Fayda Front Scan with FIN & Security Hologram",
      },
      {
        name: "Fayda National ID (Back)",
        type: "National Digital ID",
        size: "1.2 MB",
        preview: "Fayda Back Scan with Encrypted QR & Barcode",
      },
      {
        name: "Trade Qualification Certificate",
        type: "Professional License",
        size: "2.8 MB",
        preview: "Master Electrician & Electrical Systems Certification",
      },
    ],
  };

  const handleVerify = async () => {
    try {
      if (typeof id === "string") {
        await api.admin.approveVerification(id);
      }
      alert(`Fayda KYC Application for ${request.applicantName} (FIN: ${request.faydaFin}) has been approved!`);
      router.push("/verification");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to approve verification.");
    }
  };

  const handleReject = (reason: string) => {
    console.log("Verification rejected:", id, "Reason:", reason);
    setRejectModalOpen(false);
    alert(`Fayda KYC Application rejected. Reason sent to user: "${reason}"`);
    router.push("/verification");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ActionModal
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleReject}
        title="Reject Fayda Verification"
        description="Please specify why the submitted Fayda National ID or credentials were unsatisfactory. The applicant will be notified to correct and resubmit."
        confirmText="Confirm Rejection"
        confirmVariant="danger"
      />

      {/* Header */}
      <header className="px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/verification"
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-slate-900 tracking-tight">
                  Review Fayda KYC Dossier
                </h1>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Fayda NID System
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-400 mt-0.5">
                Verification Request #{id} • FIN: {request.faydaFin}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setRejectModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl text-xs font-black transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
              Reject Request
            </button>
            <button
              onClick={handleVerify}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-200 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" />
              Approve Fayda KYC
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-8 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Applicant Overview & Fayda Summary */}
          <div className="lg:col-span-1 space-y-6">
            <section className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 space-y-5">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center border-2 font-black text-xl shrink-0 shadow-sm",
                    request.userType === "Jobseeker"
                      ? "bg-blue-50 text-blue-600 border-blue-100"
                      : "bg-emerald-50 text-emerald-600 border-emerald-100",
                  )}
                >
                  {request.applicantName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg font-black text-slate-900 tracking-tight truncate">
                    {request.applicantName}
                  </h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {request.userType}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.2 rounded-full border border-emerald-200">
                      <BadgeCheck className="w-3 h-3" /> NIDP Match
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                      Verification Status
                    </p>
                    <div className="flex items-center gap-1 text-amber-600 font-black text-xs uppercase tracking-tight">
                      <Clock className="w-3.5 h-3.5" />
                      {request.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                      Submitted Date
                    </p>
                    <p className="text-xs font-bold text-slate-800">
                      {request.submittedDate}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                      Fayda Identification Number (FIN)
                    </p>
                    <p className="font-mono text-sm font-black text-emerald-700">
                      {request.faydaFin}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">
                      Email &amp; Phone
                    </p>
                    <p className="text-xs font-bold text-slate-700">
                      {request.email}
                    </p>
                    <p className="text-xs text-slate-500 font-mono">
                      {request.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Fayda National ID Card Preview Card */}
            <section className="bg-gradient-to-br from-[#0c2c1c] via-[#10442a] to-[#0c2417] rounded-[2rem] p-6 text-white shadow-xl border border-emerald-700/40 space-y-4 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center">
                    ET
                  </div>
                  <div>
                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-300">
                      FDRE National ID Program
                    </div>
                    <div className="text-xs font-extrabold text-white">
                      Fayda Digital Credential
                    </div>
                  </div>
                </div>
                <QrCode className="w-6 h-6 text-emerald-300" />
              </div>

              <div className="flex items-center gap-4">
                <div className="w-20 h-24 rounded-xl bg-slate-800 border-2 border-emerald-400/40 overflow-hidden flex flex-col items-center justify-center relative shadow-inner shrink-0">
                  <User className="w-10 h-10 text-emerald-200" />
                  <span className="text-[8px] font-bold bg-emerald-600 text-white w-full text-center py-0.5 absolute bottom-0">
                    NID MATCHED
                  </span>
                </div>

                <div className="space-y-1.5 text-xs min-w-0">
                  <div>
                    <span className="text-[9px] uppercase text-emerald-300/80 font-bold block">Applicant Legal Name</span>
                    <span className="font-bold text-white text-xs truncate block">{request.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-emerald-300/80 font-bold block">FIN Number</span>
                    <span className="font-mono font-bold text-amber-300 text-xs tracking-wider">{request.faydaFin}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <div>
                      <span className="text-[8px] uppercase text-emerald-300/70 font-bold block">DOB</span>
                      <span className="font-semibold text-white">{request.dateOfBirth}</span>
                    </div>
                    <div>
                      <span className="text-[8px] uppercase text-emerald-300/70 font-bold block">Gender</span>
                      <span className="font-semibold text-white">{request.gender}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-600/30 flex items-center justify-between text-[11px]">
                <span className="text-emerald-200">Biometric Match Confidence:</span>
                <span className="font-black text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {request.matchScore}% Verified
                </span>
              </div>
            </section>

            {/* Verification Checklist */}
            <section className="bg-[#0F172A] rounded-[2rem] p-6 shadow-xl text-white">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-3 text-white/50">
                Admin Verification Checklist
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Fayda FIN exists in National ID registry",
                  "Photo match confidence exceeds 95%",
                  "Name matches bank & account details",
                  "Scanned front and back barcodes readable",
                ].map((guide, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 text-xs font-semibold text-white/80"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {guide}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column: Submitted Documents & Direct Inspection */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                      Submitted National ID &amp; Credentials
                    </h3>
                    <p className="text-xs text-slate-400">
                      Click any document to inspect high-resolution front/back scans
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500">
                  {request.documents.length} files attached
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-center">
                {request.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveDocPreview(doc.name)}
                    className={cn(
                      "group relative cursor-pointer rounded-2xl border-2 p-5 transition-all",
                      activeDocPreview === doc.name
                        ? "border-emerald-500 bg-emerald-50/40 shadow-sm"
                        : "border-dashed border-slate-200 bg-slate-50 hover:border-emerald-300 hover:bg-emerald-50/20",
                    )}
                  >
                    <div className="p-3 bg-white rounded-xl shadow-xs mx-auto w-fit mb-3 text-slate-500 group-hover:text-emerald-600 transition-colors">
                      <FileText className="w-7 h-7" />
                    </div>
                    <p className="text-xs font-black text-slate-900">
                      {doc.name}
                    </p>
                    <p className="text-[10px] font-mono text-emerald-700 mt-0.5">
                      {doc.type} • {doc.size}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-2 italic">
                      &quot;{doc.preview}&quot;
                    </p>

                    <div className="mt-4 flex items-center justify-center gap-2">
                      <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> Inspect
                      </button>
                      <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700 transition flex items-center gap-1">
                        <Download className="w-3.5 h-3.5" /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Document Inspection Canvas */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900">
                  Active Document Inspection Preview
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {activeDocPreview || "Fayda National ID (Front)"}
                </span>
              </div>

              <div className="h-64 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center border-2 border-slate-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
                <ShieldCheck className="w-12 h-12 text-emerald-400 mb-2 relative z-10" />
                <p className="text-sm font-bold text-white relative z-10">
                  {activeDocPreview || "Fayda National ID (Front)"} Scan Verified
                </p>
                <p className="text-xs font-mono text-emerald-300 mt-1 relative z-10">
                  Fayda FIN: {request.faydaFin} • Hologram Valid • Digital Signatures Intact
                </p>
                <span className="mt-3 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/30 relative z-10">
                  Verified with FDRE National ID Program
                </span>
              </div>
            </section>

            {/* Decision Bar */}
            <section className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-black text-slate-900">
                  Approve or Reject this Fayda Application?
                </h4>
                <p className="text-xs text-slate-500 max-w-md">
                  Approving assigns the official verified badge and grants full platform access with 0% commission.
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setRejectModalOpen(true)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs border border-rose-200 transition"
                >
                  Reject
                </button>
                <button
                  onClick={handleVerify}
                  className="flex-1 sm:flex-none px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs shadow-lg shadow-emerald-200 transition active:scale-95 flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Approve Fayda KYC
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
