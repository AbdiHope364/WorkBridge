"use client";

const seekerSteps = [
  {
    step: "01",
    heading: "Create Your Profile",
    body: "Add your experience, skills, and trade certifications in minutes.",
  },
  {
    step: "02",
    heading: "Discover Jobs",
    body: "Browse verified listings by category, location, or skill set.",
  },
  {
    step: "03",
    heading: "Apply Instantly",
    body: "View job details and apply directly with your saved credentials.",
  },
  {
    step: "04",
    heading: "Get Hired & Paid",
    body: "Track applications, chat with employers, and receive guaranteed pay.",
  },
];

const employerSteps = [
  {
    step: "01",
    heading: "Create a Profile",
    body: "Set up as an Individual Client or Company and get verified.",
  },
  {
    step: "02",
    heading: "Post Your Requirement",
    body: "Define the job, required skills, and clear wage in ETB.",
  },
  {
    step: "03",
    heading: "Review Candidates",
    body: "Filter applicants by verified ratings, experience, and proximity.",
  },
  {
    step: "04",
    heading: "Hire with Confidence",
    body: "Message, hire, and approve completed work with 0% platform commission.",
  },
];

const benefits = [
  {
    label: "Smart Trade Matching",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7 10l2 2 4-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Real-Time Messaging",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 4h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6l-4 3V5a1 1 0 0 1 1-1Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Verified Identity & TIN",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 2l1.8 5.5H17l-4.6 3.3 1.8 5.5L10 13l-4.2 3.3 1.8-5.5L3 7.5h5.2L10 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "0% Commission Direct Pay",
    icon: (
      <svg
        viewBox="0 0 20 20"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 2l6 2.5v5c0 3.5-2.5 6-6 7.5C7.5 15.5 4 13 4 9.5v-5L10 2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 10l2 2 3-3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function StepList({
  steps,
  dark,
}: {
  steps: typeof seekerSteps;
  dark?: boolean;
}) {
  const numberColor = dark ? "text-emerald-400" : "text-emerald-600";
  const headingColor = dark ? "text-white" : "text-slate-950";
  const bodyColor = dark ? "text-slate-400" : "text-slate-500";
  const connectorColor = dark ? "border-slate-800" : "border-slate-200";

  return (
    <ol className="relative mt-6 sm:mt-8 space-y-0">
      {steps.map((s, i) => (
        <li key={s.step} className="relative flex gap-4 sm:gap-5 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span
              className={`absolute left-4.5 top-8 h-full w-px border-l border-dashed ${connectorColor}`}
            />
          )}
          {/* Number bubble */}
          <span
            className={`relative z-10 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full ${
              dark ? "bg-slate-900 border border-slate-800" : "bg-slate-100"
            } text-xs sm:text-[13px] font-black tabular-nums ${numberColor}`}
          >
            {s.step}
          </span>
          <div className="pt-1">
            <h4 className={`text-sm sm:text-base font-bold ${headingColor}`}>
              {s.heading}
            </h4>
            <p className={`mt-0.5 text-xs sm:text-[13px] leading-relaxed ${bodyColor}`}>
              {s.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section label + heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            How it works
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950">
            Up and running in four steps
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-500">
            Whether you&apos;re hiring or job hunting, getting started takes only minutes.
          </p>
        </div>

        {/* Two-panel steps */}
        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-2">
          {/* Seeker panel — light */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-xs">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              For Job Seekers
            </span>
            <p className="mt-2 text-lg sm:text-xl font-black text-slate-950">
              Find work that fits your expertise
            </p>
            <StepList steps={seekerSteps} />
          </div>

          {/* Employer panel — dark */}
          <div className="rounded-2xl sm:rounded-3xl bg-slate-950 p-5 sm:p-7 md:p-8 border border-slate-900 shadow-xs">
            <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-teal-400">
              For Employers
            </span>
            <p className="mt-2 text-lg sm:text-xl font-black text-white">
              Hire verified professionals faster
            </p>
            <StepList steps={employerSteps} dark />
          </div>
        </div>

        {/* Why choose us — full-width banner */}
        <div className="mt-6 sm:mt-8 flex flex-col gap-6 sm:gap-8 rounded-2xl sm:rounded-3xl bg-[#1b2855] p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="shrink-0 max-w-sm">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-400">
              Why WorkBridge
            </p>
            <h3 className="mt-1.5 text-xl sm:text-2xl font-black leading-snug text-white">
              Built for trust, designed for speed in Ethiopia.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {benefits.map((b) => (
              <div key={b.label} className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                  {b.icon}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
