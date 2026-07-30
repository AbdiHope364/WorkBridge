"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  MapPin,
  User,
  XCircle,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: Fetch real application data by id
const mockApplications = [
  {
    id: "1",
    applicantName: "Abdisa Leta",
    applicantEmail: "abdisaleta@gmail.com",
    applicantPhone: "+251 900 000 000",
    jobTitle: "Senior React Developer",
    employer: "TechCorp Solutions",
    location: "Addis Ababa, Ethiopia (Hybrid)",
    appliedDate: "June 20, 2025",
    status: "Under Review",
    coverLetter: "I am excited to apply for the Senior React Developer role at TechCorp Solutions. With 5+ years of experience building scalable applications with React, TypeScript, and Next.js, I am confident I would be a great fit for your engineering team. I have led front-end efforts in projects serving thousands of users and am eager to bring that expertise to your team.",
    skills: ["React.js", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    resumeFile: "abdisa_leta_resume.pdf",
  },
  {
    id: "2",
    applicantName: "Sara Ahmed",
    applicantEmail: "sara@email.com",
    applicantPhone: "+251 900 000 001",
    jobTitle: "UI/UX Designer",
    employer: "Creative Minds",
    location: "Cairo, Egypt (On-site)",
    appliedDate: "June 19, 2025",
    status: "Accepted",
    coverLetter: "I have 3 years of UX design experience and am passionate about building intuitive user experiences.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    resumeFile: "sara_ahmed_resume.pdf",
  },
];

export default function ApplicationDetailPage() {
  const { id } = useParams();
  const app = mockApplications.find((a) => a.id === id) ?? mockApplications[0];

  const statusConfig = {
    "Under Review": { color: "bg-amber-50 text-amber-600 border-amber-100", icon: Clock },
    "Accepted": { color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: CheckCircle2 },
    "Rejected": { color: "bg-rose-50 text-rose-600 border-rose-100", icon: XCircle },
  } as const;

  const cfg = statusConfig[app.status as keyof typeof statusConfig];
  const StatusIcon = cfg.icon;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-10 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/applications"
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">Application Detail</h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Application ID: {id}
              </p>
            </div>
          </div>

          <div className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider",
            cfg.color
          )}>
            <StatusIcon className="w-4 h-4" />
            {app.status}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 p-10 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left: Applicant Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-4 border-blue-100 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-black text-blue-600">{app.applicantName.charAt(0)}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">{app.applicantName}</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">Jobseeker</p>

              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold truncate">{app.applicantEmail}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">{app.applicantPhone}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-bold">Applied: {app.appliedDate}</span>
                </div>
              </div>
            </section>

            {/* Applied Job */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Applied Position</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Job Title</p>
                    <p className="text-sm font-black text-slate-800">{app.jobTitle}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400 mt-0.5">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Employer</p>
                    <p className="text-sm font-black text-slate-800">{app.employer}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-xl text-slate-400 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Location</p>
                    <p className="text-sm font-black text-slate-800">{app.location}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Skills */}
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5">Applicant Skills</h3>
              <div className="flex flex-wrap gap-2">
                {app.skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-xl text-[10px] font-black border border-slate-100 uppercase tracking-wider">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Application Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Letter */}
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-50">
                <FileText className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Cover Letter</h3>
              </div>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">{app.coverLetter}</p>
            </section>

            {/* Resume */}
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-50">
                <User className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Attached Resume</h3>
              </div>

              <div className="group flex items-center justify-between p-5 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl hover:border-emerald-300 hover:bg-emerald-50/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-emerald-500 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">{app.resumeFile}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">PDF • Click to preview</p>
                  </div>
                </div>
                {/* TODO: Add actual file download/preview link from backend */}
                <button className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-black shadow-md shadow-emerald-200 active:scale-95 transition-all">
                  Download
                </button>
              </div>
            </section>

            {/* Activity Timeline */}
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-slate-50">
                <Clock className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Application Timeline</h3>
              </div>
              <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {[
                  { label: "Application Submitted", date: app.appliedDate, color: "bg-emerald-500" },
                  { label: "Under Admin Review", date: "June 21, 2025", color: "bg-amber-400" },
                  { label: "Forwarded to Employer", date: "Pending", color: "bg-slate-200" },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4 relative pl-10">
                    <div className={cn("absolute left-0 top-1 w-[18px] h-[18px] rounded-full border-[3px] border-white shadow-sm flex-shrink-0", step.color)} />
                    <div>
                      <p className="text-sm font-black text-slate-800">{step.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
