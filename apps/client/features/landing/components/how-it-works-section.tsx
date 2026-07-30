import Link from "next/link";

const seekerSteps = [
  {
    step: "01",
    heading: "Create Your Profile",
    body: "Add your experience, skills, and resume in minutes",
  },
  {
    step: "02",
    heading: "Discover Jobs",
    body: "Browse verified listings by category, location, or skill set",
  },
  {
    step: "03",
    heading: "Apply Instantly",
    body: "View job details and apply with your saved profile",
  },
  {
    step: "04",
    heading: "Get Hired",
    body: "Track applications and chat directly with employers",
  },
];

const employerSteps = [
  {
    step: "01",
    heading: "Create a Company Profile",
    body: "Add your company info and get verified on the platform",
  },
  {
    step: "02",
    heading: "Post a Job",
    body: "Define the role, salary range, and requirements",
  },
  {
    step: "03",
    heading: "Review Applicants",
    body: "Filter candidates by skills, experience, and fit",
  },
  {
    step: "04",
    heading: "Hire & Manage",
    body: "Message, hire, and track your new team members",
  },
];

const benefits = [
  {
    label: "Smart Job Matching",
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
    label: "Verified Companies",
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
    label: "Secure Hiring Process",
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
  const connectorColor = dark ? "border-slate-700" : "border-slate-200";

  return (
    <ol className="relative mt-8 space-y-0">
      {steps.map((s, i) => (
        <li key={s.step} className="relative flex gap-5 pb-7 last:pb-0">
          {i < steps.length - 1 && (
            <span
              className={`absolute left-[19px] top-8 h-full w-px border-l border-dashed ${connectorColor}`}
            />
          )}
          {/* Number bubble */}
          <span
            className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              dark ? "bg-white" : "bg-slate-100"
            } text-[12px] font-black tabular-nums ${numberColor}`}
          >
            {s.step}
          </span>
          <div className="pt-1.5">
            <h4 className={`text-[14px] font-bold ${headingColor}`}>
              {s.heading}
            </h4>
            <p className={`mt-0.5 text-[13px] leading-snug ${bodyColor}`}>
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
    <section id="how-it-works" className="bg-slate-50 py-16 px-10 gap-4">
      <div className="mx-auto max-w-[1300px] px-6">
        {/* Section label + heading */}
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            How it works
          </p>
          <h2 className="mt-2 text-[28px] font-black tracking-tight text-slate-950 sm:text-[34px]">
            Up and running in four steps
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-[14px] text-slate-500">
            Whether you're hiring or job hunting, getting started takes minutes.
          </p>
        </div>

        {/* Two-panel steps */}
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          {/* Seeker panel — light */}
          <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
            <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
              For Job Seekers
            </span>
            <p className="mt-2 text-[20px] font-black text-slate-950">
              Find work that fits your life
            </p>
            <StepList steps={seekerSteps} />
          </div>

          {/* Employer panel — dark */}
          <div className="rounded-2xl bg-slate-950 p-8">
            <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              For Employers
            </span>
            <p className="mt-2 text-[20px] font-black text-white">
              Hire the right person, faster
            </p>
            <StepList steps={employerSteps} dark />
          </div>
        </div>

        {/* Why choose us — full-width banner */}
        <div className="mt-6 flex flex-col gap-8 rounded-2xl bg-[#1b2855] px-8 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-14">
          <div className="shrink-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Why Workbridge
            </p>
            <h3 className="mt-1.5 text-[22px] font-black leading-snug text-white sm:text-[26px]">
              Built for trust,
              <br />
              designed for speed.
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 items-center justify-center ">
            {benefits.map((b) => (
              <div key={b.label} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-400">
                  {b.icon}
                </span>
                <span className="pt-1.5 text-[13px] font-semibold leading-snug text-white">
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
