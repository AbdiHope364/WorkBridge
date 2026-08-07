"use client";

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
    <section id="find-jobs" className="bg-white pb-0 pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-28">
      <Container size="xl" className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid items-center gap-5 md:gap-5 lg:gap-5 xl:gap-5 lg:grid-cols-2">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-[38px] lg:text-[42px] xl:text-[46px] 2xl:text-[52px] font-black leading-[1.12] tracking-[-0.04em] text-slate-950 max-w-full lg:max-w-140 mx-auto lg:mx-0">
              Hire top talent or find your{" "}
              <span className="text-emerald-600">dream job</span> in Ethiopia.
            </h1>
            
            <p className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-[17px] lg:text-[18px] xl:text-[19px] leading-[1.28] text-slate-800 max-w-full lg:max-w-125 mx-auto lg:mx-0">
              WorkBridge connects skilled workers and employers across Ethiopia.
              Find trusted professionals or discover new job opportunities
              quickly and securely.
            </p>
            
            <div className="mt-5 sm:mt-6 md:mt-7 lg:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center lg:justify-start">
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-35 rounded-xl bg-emerald-700 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:bg-emerald-800 hover:shadow-lg hover:shadow-emerald-500/30"
              >
                Find Jobs
              </Link>
              <Link
                href="/dashboard/employer"
                className="inline-flex items-center justify-center w-full sm:w-auto min-w-35 rounded-xl bg-slate-950 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-3.5 text-sm sm:text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-500/30"
              >
                Hire Workers
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative flex w-full max-w-full md:max-w-125 lg:max-w-137.5 xl:max-w-152.5 items-center justify-center bg-slate-50 px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 rounded-xl">
              <div className="relative w-full aspect-video">
                <Image
                  src="/hero-image.png"
                  alt="Professionals looking for jobs and talent"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Centered */}
        <div className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 xl:mt-16 flex justify-center">
          <div
            style={{ background: "#04865a" }}
            className="grid w-full max-w-full md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%] grid-cols-2 gap-3 sm:gap-4 md:gap-5 rounded-t-2xl sm:rounded-t-3xl md:rounded-t-4xl lg:rounded-t-[5rem] bg-[#04865a] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-6 sm:py-7 md:py-8 lg:py-10 xl:py-12 text-center text-white"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`
                  ${index === 0 || index === 2 ? 'border-r border-white/20 sm:border-r-0' : ''}
                  ${index === 0 ? 'border-b border-white/20 sm:border-b-0' : ''}
                  ${index === 1 ? 'border-b border-white/20 sm:border-b-0' : ''}
                  ${index === 2 ? 'sm:border-b-0' : ''}
                  ${index < 2 ? 'pb-3 sm:pb-0' : 'pt-3 sm:pt-0'}
                  ${index % 2 === 1 ? 'sm:border-r-0' : ''}
                `}
              >
                <p className="text-xl sm:text-2xl md:text-[26px] lg:text-[29px] xl:text-[32px] 2xl:text-[36px] font-black leading-none">
                  {stat.value}
                </p>
                <p className="mt-1 sm:mt-1.5 md:mt-2 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs font-medium text-white/80">
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