import Image from "next/image";
import { Button } from "@repo/ui/button";
import { Container } from "@repo/ui/container";

const stats = [
  { value: "10K+", label: "Jobs Posted" },
  { value: "3K+", label: "Companies Hiring" },
  { value: "5K+", label: "Active Job Seekers" },
  { value: "95%", label: "Successful Matches" },
];

const features = [
  ["Browse Verified Jobs", "Explore thousands of trusted listings."],
  ["Apply in One Click", "Quick and simple application process."],
  ["Track Your Progress", "Manage applications in one place."],
];

function FeatureIcon() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
      <svg viewBox="0 0 20 20" aria-hidden="true" className="h-5 w-5">
        <path
          d="M8.5 14.5a6 6 0 1 1 4.2-1.7l3.3 3.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

export function AboutHeroSection() {
  return (
    <section>
      <div className="bg-emerald-600 py-16 text-center text-white">
        <Container size="md">
          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
            About WorkBridge
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/90">
            We help job seekers find meaningful work and employers hire faster,
            smarter, and with trust.
          </p>
        </Container>
      </div>

      <Container size="xl" className="max-w-[1120px] py-16">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">
          <div className="relative">
            <div className="absolute -bottom-8 -left-10 h-72 w-72 rounded-full bg-emerald-50" />
            <Image
              src="/aboutheroimage.png"
              alt="Team collaborating in an office"
              width={560}
              height={420}
              className="relative h-[390px] w-full rounded-[2rem] object-cover"
              priority
            />
          </div>

          <div>
            <h2 className="max-w-sm text-[34px] font-black leading-tight tracking-[-0.03em] text-slate-950">
              A faster way to connect talent with opportunity
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              WorkBridge helps job seekers discover the right opportunities and
              employers find the right talent faster, smarter, and easier.
            </p>
            <div className="mt-6 space-y-4">
              {features.map(([title, description]) => (
                <div key={title} className="flex gap-4">
                  <FeatureIcon />
                  <div>
                    <h3 className="text-sm font-black text-slate-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button size="sm" variant="secondary" className="mt-7 bg-[#02081d]">
              Find Jobs Now
            </Button>
          </div>
        </div>
      </Container>

      <div className="bg-emerald-600 py-8 text-white">
        <Container size="xl" className="max-w-[1040px]">
          <div className="grid gap-6 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-black leading-none">{stat.value}</p>
                <p className="mt-2 text-xs text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
