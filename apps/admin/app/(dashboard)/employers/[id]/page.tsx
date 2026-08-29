"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Building2,
  Globe,
  Briefcase,
  CheckCircle2,
  Clock,
  ExternalLink,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function EmployerDetailPage() {
  const { id } = useParams();

  // TODO: Fetch real employer data by id
  const employer = {
    id,
    companyName: "TechCorp Solutions",
    industry: "Software Development",
    contactPerson: "John Smith",
    email: "contact@techcorp.com",
    phone: "+251 91 234 5678",
    website: "https://techcorp.com",
    location: "Addis Ababa, Ethiopia",
    size: "50-100 employees",
    openJobs: 12,
    totalHires: 45,
    verification: "Verified",
    description:
      "TechCorp Solutions is a leading software development company based in Addis Ababa, specializing in enterprise solutions, cloud infrastructure, and mobile applications.",
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-10 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/employers"
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Employer Details
              </h1>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                Manage and view complete company profile
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-sm hover:bg-rose-50 transition-colors">
              Suspend Account
            </button>
            <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors">
              Edit Details
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm">
              Send Message
            </button>
          </div>
        </div>

        {/* Quick info bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl text-emerald-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Industry
              </p>
              <p className="text-sm font-bold text-slate-700">
                {employer.industry}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm font-bold text-slate-700">
                {employer.location}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 rounded-xl text-purple-600">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Website
              </p>
              <a
                href={employer.website}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                Visit <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                Status
              </p>
              <p className="text-sm font-bold text-slate-700">
                {employer.verification}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-10 bg-[#F8FAFC]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100 text-center">
              <div className="w-32 h-32 rounded-3xl bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {employer.companyName}
              </h2>
              <p className="text-slate-500 font-medium mb-6">
                {employer.industry}
              </p>

              <div className="flex items-center justify-center gap-3">
                <div
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider",
                    employer.verification === "Verified"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600",
                  )}
                >
                  {employer.verification === "Verified" ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Clock className="w-4 h-4" />
                  )}
                  {employer.verification}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-4xl p-8 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                Company Contact
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Contact Person
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {employer.contactPerson}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Business Email
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {employer.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-slate-700">
                      {employer.phone}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-4xl p-10 shadow-sm border border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-50 pb-4">
                About the Company
              </h3>
              <p className="text-slate-600 leading-relaxed font-bold">
                {employer.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Company Size
                  </p>
                  <p className="text-sm font-black text-slate-800">
                    {employer.size}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Website
                  </p>
                  <p className="text-sm font-black text-emerald-600 truncate">
                    {employer.website}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Open positions
                  </p>
                  <p className="text-sm font-black text-slate-800">
                    {employer.openJobs}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                    Total Hires
                  </p>
                  <p className="text-sm font-black text-slate-800">
                    {employer.totalHires}
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-4xl p-10 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8 border-b border-slate-50 pb-4">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-500" />
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                    Active Job Postings
                  </h3>
                </div>
                <button className="text-xs font-black text-emerald-600 hover:underline flex items-center gap-1">
                  View All <ExternalLink className="w-3 h-3" />
                </button>
              </div>
              <div className="space-y-4">
                {/* TODO: Map real company jobs */}
                {[
                  {
                    title: "Senior React Developer",
                    type: "Full Time",
                    applicants: 45,
                  },
                  { title: "UI/UX Designer", type: "Contract", applicants: 12 },
                  {
                    title: "Product Manager",
                    type: "Full Time",
                    applicants: 28,
                  },
                ].map((job, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100"
                  >
                    <div>
                      <h4 className="text-sm font-black text-slate-800">
                        {job.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-400 uppercase mt-1">
                        {job.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-800">
                        {job.applicants}
                      </p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">
                        Applicants
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-4xl p-10 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-8 border-b border-slate-50 pb-4">
                <MapPin className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">
                  Offices & Locations
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <h4 className="text-sm font-black text-slate-800">
                      Headquarters
                    </h4>
                    <p className="text-xs font-bold text-slate-500 mt-1">
                      {employer.location}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
