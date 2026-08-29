"use client";

import { useState } from "react";

const clientBookingSteps = [
  {
    step: "01",
    heading: "Find a Verified Specialist",
    body: "Browse certified electricians, plumbers, carpenters, and technical trades by location & rating.",
  },
  {
    step: "02",
    heading: "Book with Service Details",
    body: "Specify your site address, scheduled time, budget offer, and urgency (Emergency / Same-day).",
  },
  {
    step: "03",
    heading: "Worker Accepts & Arrives",
    body: "The technician receives an instant notification, confirms your request, and arrives on-site.",
  },
  {
    step: "04",
    heading: "Inspect & Release Payment",
    body: "Review the completed job and release payment securely via Chapa with 100% escrow protection.",
  },
];

const workerSteps = [
  {
    step: "01",
    heading: "Create Your Trade Profile",
    body: "Highlight your trade certifications, tools, experience, hourly rate, and service areas.",
  },
  {
    step: "02",
    heading: "Receive Direct Booking Alerts",
    body: "Get instant push notifications and client requests whenever clients in your area need your trade.",
  },
  {
    step: "03",
    heading: "Accept Jobs & Start Work",
    body: "Review client details, accept bookings with one tap, and coordinate directly on-site.",
  },
  {
    step: "04",
    heading: "Guaranteed Prompt Payouts",
    body: "Receive secure escrow payouts directly to your Telebirr, CBE, or bank account upon completion.",
  },
];

const employerSteps = [
  {
    step: "01",
    heading: "Post Project or Permanent Role",
    body: "Define the job description, required technical certifications, and compensation package.",
  },
  {
    step: "02",
    heading: "Review Qualified Applicants",
    body: "Filter verified talent with background checks, past client reviews, and verified portfolios.",
  },
  {
    step: "03",
    heading: "Interview & Hire Fast",
    body: "Message candidates directly, issue job offers, and onboard your team seamlessly.",
  },
  {
    step: "04",
    heading: "Manage Staffing & Contracts",
    body: "Track timesheets, project milestones, and contract disbursements all in one dashboard.",
  },
];

const trustPillars = [
  {
    title: "100% Escrow Protection",
    desc: "Funds are securely held in escrow and only released once you inspect and approve the job.",
    icon: "🛡️",
  },
  {
    title: "Verified Trade Licenses",
    desc: "Technicians and trade specialists undergo credential, identity, and background checks.",
    icon: "📜",
  },
  {
    title: "Instant Live Notifications",
    desc: "Workers and clients receive automated alerts for booking requests, acceptances, and status updates.",
    icon: "⚡",
  },
  {
    title: "Fast Emergency Callouts",
    desc: "Urgent power outages, burst pipes, and critical breakdowns can be booked for immediate dispatch.",
    icon: "🚨",
  },
];

export function HowItWorksSection() {
  const [activeTab, setActiveTab] = useState<"client" | "worker" | "employer">("client");

  const currentSteps =
    activeTab === "client"
      ? clientBookingSteps
      : activeTab === "worker"
        ? workerSteps
        : employerSteps;

  return (
    <section id="how-it-works" className="bg-slate-50 py-20 border-t border-slate-100">
      <div className="mx-auto max-w-325 px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-600">
            Simple & Transparent Process
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
            How WorkBridge Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Whether you need emergency home repairs, want to grow your trade business, or hire top company talent.
          </p>
        </div>

        {/* Audience Selector Tabs */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-2xl bg-white p-1.5 border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveTab("client")}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === "client"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🛠️ Book a Trade Service (Client)
            </button>
            <button
              onClick={() => setActiveTab("worker")}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === "worker"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              👷 Join as Worker / Specialist
            </button>
            <button
              onClick={() => setActiveTab("employer")}
              className={`rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition ${
                activeTab === "employer"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🏢 Corporate Hiring (Employer)
            </button>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {currentSteps.map((s) => (
            <div
              key={s.step}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:border-emerald-200 hover:shadow-md transition group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-sm font-black text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                    {s.step}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Step {s.step}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-black text-slate-950 group-hover:text-emerald-700 transition">
                  {s.heading}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Guarantee Banner */}
        <div className="mt-16 rounded-3xl bg-slate-950 p-8 sm:p-12 text-white shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-800">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
                WorkBridge Guarantee
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-white">
                Built for Safety, Reliability & Trust
              </h3>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-400">
              Every direct booking and contract on WorkBridge is backed by verified credentials and payment dispute resolution.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustPillars.map((p) => (
              <div key={p.title} className="flex flex-col rounded-2xl bg-slate-900/80 p-5 border border-slate-800">
                <span className="text-2xl mb-3">{p.icon}</span>
                <h4 className="text-sm font-bold text-white">{p.title}</h4>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
