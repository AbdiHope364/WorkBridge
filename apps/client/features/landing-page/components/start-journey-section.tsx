import { Button } from "@repo/ui/button";

const seekerSteps = [
  {
    label: "Browse",
    detail: "Thousands of verified listings across every industry",
  },
  { label: "Apply", detail: "One-click applications with your saved profile" },
  { label: "Track", detail: "Monitor every application in a single dashboard" },
  { label: "Get hired", detail: "Instant alerts when employers respond" },
];

const employerSteps = [
  { label: "Post", detail: "Go live in minutes with a structured job listing" },
  {
    label: "Filter",
    detail: "Smart screening surfaces the strongest candidates",
  },
  {
    label: "Connect",
    detail: "Message and schedule interviews without leaving the platform",
  },
  {
    label: "Hire",
    detail: "Build a verified company profile that attracts top talent",
  },
];

function StepList({
  steps,
  accent,
}: {
  steps: { label: string; detail: string }[];
  accent: "emerald" | "white";
}) {
  const numberColor =
    accent === "emerald" ? "text-emerald-500" : "text-emerald-400";
  const labelColor = accent === "emerald" ? "text-slate-950" : "text-white";
  const detailColor =
    accent === "emerald" ? "text-slate-500" : "text-slate-400";
  const dividerColor =
    accent === "emerald" ? "border-slate-200" : "border-slate-700";

  return (
    <ol className="mt-8 space-y-0">
      {steps.map((step, i) => (
        <li
          key={step.label}
          className={`flex items-start gap-5 py-4 ${
            i !== steps.length - 1 ? `border-b ${dividerColor}` : ""
          }`}
        >
          <span
            className={`w-6 shrink-0 text-right text-[11px] font-black tabular-nums ${numberColor} pt-0.5`}
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <p className={`text-[15px] font-bold ${labelColor}`}>
              {step.label}
            </p>
            <p className={`mt-0.5 text-[13px] leading-snug ${detailColor}`}>
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StartJourneySection() {
  return (
    <section id="how-it-works" className="w-full">
      <div className="mx-auto max-w-[1400px]">
        {/* Section label */}
        <div className="px-6 pb-10 pt-16 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Start your journey with us
          </p>
          <h2 className="mt-2 text-[32px] font-black leading-tight tracking-tight text-slate-950 sm:text-[40px]">
            One platform. Two journeys.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500">
            Whether you're searching for your next role or scaling a team,
            Workbridge is built for both sides of the table.
          </p>
        </div>

        {/* Split panels */}
        <div className="grid lg:grid-cols-2">
          {/* Left — Job Seeker (dark) */}
          <div className="bg-slate-950 px-10 py-14 sm:px-16">
            <div className="mx-auto max-w-[480px]">
              <span className="inline-block rounded-full bg-slate-800 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                For job seekers
              </span>
              <h3 className="mt-4 text-[26px] font-black leading-snug text-white">
                Find your next opportunity
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-400">
                Discover verified roles, apply in seconds, and manage every
                application — all in one place.
              </p>
              <StepList steps={seekerSteps} accent="white" />
              <Button className="mt-10 h-11 w-full rounded-xl bg-emerald-500 text-[14px] font-bold text-white hover:bg-emerald-400 sm:w-auto sm:px-8">
                Browse Jobs
              </Button>
            </div>
          </div>

          {/* Right — Employer (light) */}
          <div className="bg-slate-50 px-10 py-14 sm:px-16">
            <div className="mx-auto max-w-[480px]">
              <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">
                For employers
              </span>
              <h3 className="mt-4 text-[26px] font-black leading-snug text-slate-950">
                Hire top talent faster
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-slate-500">
                Post a role in minutes, screen smarter, and connect with
                candidates who are ready to move.
              </p>
              <StepList steps={employerSteps} accent="emerald" />
              <Button className="mt-10 h-11 w-full rounded-xl bg-slate-950 text-[14px] font-bold text-white hover:bg-slate-800 sm:w-auto sm:px-8">
                Post a Job
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
