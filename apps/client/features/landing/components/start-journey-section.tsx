"use client";

import { ArrowRight, Wrench, Home, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";
import { SectionHeader } from "@repo/ui/section-header";

const seekerSteps = [
  "Build your verified trade artisan profile & showcase skills.",
  "Receive instant proximity alerts for nearby household repairs.",
  "Submit transparent price quotes directly to homeowners.",
  "Complete house calls, build 5-star ratings & get paid via mobile money.",
];

const employerSteps = [
  "Select a trade category or tap a 1-click repair preset.",
  "Describe your repair issue & location in under 30 seconds.",
  "Review quotes from verified nearby artisans with ratings.",
  "Hire with confidence, inspect work, and pay with 0% commission.",
];

function JourneyCard({
  badge,
  badgeColor,
  title,
  description,
  steps,
  cta,
  ctaLink,
  icon,
}: {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  steps: string[];
  cta: string;
  ctaLink: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 md:p-8 shadow-sm transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      {/* Background Decoration */}
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100/40 blur-3xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${badgeColor}`}
          >
            {badge}
          </span>

          <div className="rounded-xl bg-slate-100 p-2.5 sm:p-3 text-emerald-600">
            {icon}
          </div>
        </div>

        <h3 className="mt-4 sm:mt-5 text-xl sm:text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h3>

        <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
          {description}
        </p>

        <ol className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
          {steps.map((step, index) => (
            <li key={step} className="relative flex gap-3 sm:gap-4">
              {index !== steps.length - 1 && (
                <span className="absolute left-4 top-8 h-full w-px border-l border-dashed border-slate-300" />
              )}

              <div className="relative z-10 flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs sm:text-sm font-black text-emerald-600">
                {index + 1}
              </div>

              <div className="pt-0.5">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600 shrink-0" />
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {step}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative z-10 mt-6 sm:mt-8 pt-4 border-t border-slate-100">
        <Link
          href={ctaLink}
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700 gap-2 shadow-xs active:scale-95"
        >
          <span>{cta}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Card>
  );
}

export function StartJourneySection() {
  return (
    <section
      id="find-workers"
      className="relative overflow-hidden bg-slate-50 py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Blurs */}
      <div className="absolute left-0 top-0 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-64 sm:h-80 w-64 sm:w-80 rounded-full bg-blue-100/30 blur-3xl pointer-events-none" />

      <Container size="xl" className="relative max-w-6xl mx-auto">
        <SectionHeader
          title="How WorkBridge Works for Homeowners & Artisans"
          description="Connecting Ethiopian homeowners with vetted trade professionals in 4 transparent, hassle-free steps."
        />

        <div className="mt-6 sm:mt-8 grid gap-6 sm:gap-8 lg:grid-cols-2">
          <JourneyCard
            badge="For Homeowners"
            badgeColor="bg-emerald-50 text-emerald-700"
            icon={<Home className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-600" />}
            title="Post a Repair & Hire Artisans"
            description="Need a plumber, electrician, or handyman? Post your repair request in 30 seconds and connect directly with top-rated local experts."
            steps={employerSteps}
            cta="🏡 Post Household Request"
            ctaLink="/dashboard/employer/create"
          />

          <JourneyCard
            badge="For Trade Artisans"
            badgeColor="bg-blue-50 text-blue-700"
            icon={<Wrench className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />}
            title="Get Hired & Build Your Reputation"
            description="Showcase your trade skills, receive proximity job alerts in your neighborhood, build verified reviews, and earn steady income."
            steps={seekerSteps}
            cta="🛠️ Browse Artisan Opportunities"
            ctaLink="/find-workers"
          />
        </div>
      </Container>
    </section>
  );
}
