import Image from "next/image";
import Link from "next/link";
import { Container } from "@repo/ui/container";

const stats = [
  { value: "10K+", label: "Jobs Posted" },
  { value: "3K+", label: "Companies Hiring" },
  { value: "5K+", label: "Active Job Seekers" },
  { value: "95%", label: "Successful Matches" },
];

export function HeroSection() {
  return (
    <section id="find-jobs" className="bg-white pb-0 pt-16 sm:pt-20">
      <Container size="xl" className="w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[0.92fr_1fr]">
          <div>
            <h1 className="max-w-[560px] text-[38px] font-black leading-[1.12] tracking-[-0.04em] text-slate-950 sm:text-[44px] lg:text-[46px]">
              Hire top talent or find your{" "}
              <span className="text-emerald-600">dream job</span> in Ethiopia.
            </h1>
            <p className="mt-5 max-w-[500px] text-[17px] leading-[1.28] text-slate-800">
              WorkBridge connects skilled workers and employers across Ethiopia.
              Find trusted professionals or discover new job opportunities
              quickly and securely.
            </p>
            <div className="mt-7 flex flex-wrap gap-8">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center min-w-36 rounded-xl bg-emerald-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-emerald-700"
              >
                Find Jobs
              </Link>
              <Link
                href="/dashboard/employer"
                className="inline-flex items-center justify-center min-w-36 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Hire Workers
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-[610px] items-center justify-center bg-slate-50 px-8 py-5">
            <Image
              src="/hero-image.png"
              alt="Professionals looking for jobs and talent"
              width={600}
              height={330}
              priority
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-10  flex justify-end lg:justify-end">
          <div
            style={{ background: "#04865a" }}
            className="grid w-full  gap-6 rounded-t-[5rem] bg-[#04865a]  px-10 py-8 text-center text-white sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[29px] font-black leading-none">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] font-medium text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
