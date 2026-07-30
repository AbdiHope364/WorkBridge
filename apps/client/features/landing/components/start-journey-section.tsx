import { ArrowRight, Briefcase, Building2, CheckCircle2 } from "lucide-react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Container } from "@repo/ui/container";
import { SectionHeader } from "@repo/ui/section-header";

const seekerSteps = [
  "Create your professional profile in minutes.",
  "Browse thousands of verified job opportunities.",
  "Apply instantly with your saved resume.",
  "Track applications and chat with employers.",
];

const employerSteps = [
  "Create and verify your company profile.",
  "Post jobs and define your hiring requirements.",
  "Review applicants with smart filtering.",
  "Hire and manage candidates with confidence.",
];

function JourneyCard({
  badge,
  badgeColor,
  title,
  description,
  steps,
  cta,
  icon,
}: {
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  steps: string[];
  cta: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Background Decoration */}
      <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-100/40 blur-3xl transition-all duration-500 group-hover:scale-125" />

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${badgeColor}`}
          >
            {badge}
          </span>

          <div className="rounded-xl bg-slate-100 p-3 text-emerald-600">
            {icon}
          </div>
        </div>

        <h3 className="mt-5 text-2xl font-black tracking-tight text-slate-950">
          {title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>

        <ol className="mt-8 space-y-5">
          {steps.map((step, index) => (
            <li key={step} className="relative flex gap-4">
              {index !== steps.length - 1 && (
                <span className="absolute left-[17px] top-10 h-full w-px border-l border-dashed border-slate-300" />
              )}

              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-black text-emerald-600">
                {index + 1}
              </div>

              <div className="pt-1">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-600" />
                  <p className="text-sm leading-6 text-slate-700">{step}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <Button className="mt-8 gap-2">
          {cta}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  );
}

export function StartJourneySection() {
  return (
    <section
      id="find-workers"
      className="relative overflow-hidden bg-slate-50 py-20 mx-auto"
      style={{
        padding: 40,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      {/* Background */}
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-100/30 blur-3xl" />

      <Container size="xl" className="relative max-w-6xl">
        <SectionHeader
          title="Start Your Journey with WorkBridge"
          description="Whether you're searching for your next opportunity or hiring exceptional talent, WorkBridge helps you achieve your goals with a fast, secure, and reliable hiring experience."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <JourneyCard
            badge="For Job Seekers"
            badgeColor="bg-emerald-50 text-emerald-700"
            icon={<Briefcase className="h-6 w-6" />}
            title="Find Your Next Opportunity"
            description="Connect with verified employers, discover exciting opportunities, and manage your entire job search from one powerful platform."
            steps={seekerSteps}
            cta="Explore Jobs"
          />

          <JourneyCard
            badge="For Employers"
            badgeColor="bg-blue-50 text-blue-700"
            icon={<Building2 className="h-6 w-6 text-blue-600" />}
            title="Hire Top Talent Faster"
            description="Reach qualified candidates, simplify recruitment, and build high-performing teams through an efficient hiring workflow."
            steps={employerSteps}
            cta="Post a Job"
          />
        </div>
      </Container>
    </section>
  );
}
