"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Download,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function JobseekerDetailPage() {
  const { id } = useParams();

  // TODO: Fetch real jobseeker data by id
  const jobseeker = {
    id,
    name: "Mark Smith",
    email: "marksmith@example.com",
    phone: "+251 900 000 004",
    location: "Addis Ababa, Ethiopia",
    joinedOn: "September 10, 2025",
    status: "Inactive",
    verification: "Unverified",
    bio: "Experienced Full Stack Developer with over 5 years of expertise in building scalable web applications. Passionate about clean code and modern architectures.",
    skills: [
      "C#",
      ".NET Core",
      "Oracle",
      "React",
      "TypeScript",
      "Microservices",
    ],
    experience: [
      {
        role: "Senior Developer",
        company: "Tech solutions",
        period: "2021 - Present",
      },
      {
        role: "Backend Developer",
        company: "DataFlow inc",
        period: "2018 - 2021",
      },
    ],
    education: [
      {
        degree: "B.Sc. in Computer Science",
        school: "Addis Ababa University",
        year: "2018",
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-10 py-6 border-b border-slate-100 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/jobseekers"
              className="p-2 hover:bg-slate-50 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tight">
                Jobseeker Details
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                User ID: {id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black shadow-lg shadow-slate-200 transition-all active:scale-95">
              <Download className="w-4 h-4" />
              Download Resume
            </button>
            <div
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-tighter",
                jobseeker.status === "Active"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-rose-50 text-rose-500",
              )}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              {jobseeker.status}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-10 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column: Basic Info */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 text-center">
              <div className="w-32 h-32 rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl font-black text-emerald-600 uppercase">
                  {jobseeker.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {jobseeker.name}
              </h2>
              <p className="text-slate-500 font-medium mb-6">
                Full Stack Developer
              </p>

              <div className="flex items-center justify-center gap-3">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                    jobseeker.verification === "Verified"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600",
                  )}
                >
                  {jobseeker.verification === "Verified" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {jobseeker.verification}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Email Address
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {jobseeker.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {jobseeker.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Location
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {jobseeker.location}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Experience, Skills, etc. */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
                Professional Overview
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {jobseeker.bio}
              </p>

              <div className="mt-8">
                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-4">
                  Core Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {jobseeker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-xs font-black border border-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Work Experience
                </h3>
              </div>
              <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-50">
                {jobseeker.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute left-0 top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white bg-emerald-500" />
                    <div>
                      <h4 className="text-base font-black text-slate-800">
                        {exp.role}
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-sm font-bold text-slate-500">
                          {exp.company}
                        </span>
                        <span className="text-xs font-black text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded-md">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <GraduationCap className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Education
                </h3>
              </div>
              <div className="space-y-6">
                {jobseeker.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-black text-slate-800">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-bold text-slate-500 mt-1">
                        {edu.school}
                      </p>
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase bg-slate-50 px-2 py-0.5 rounded-md">
                      {edu.year}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Platform Activity
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Joined Date
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    {jobseeker.joinedOn}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Last Logged In
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Today, 10:45 AM
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
