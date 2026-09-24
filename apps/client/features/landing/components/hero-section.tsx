"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@repo/ui/container";

const stats = [
  { value: "10K+", label: "Households Served" },
  { value: "3K+", label: "Vetted Artisans" },
  { value: "15-Min", label: "Proximity Dispatch" },
  { value: "98%", label: "Satisfied House Calls" },
];

export function HeroSection() {
  return (
    <section id="find-jobs" className="bg-white pt-4 sm:pt-8 md:pt-12 overflow-hidden">
      <Container size="xl" className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="grid items-center gap-6 lg:gap-10 lg:grid-cols-2">
          {/* Left - Text Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
              <span>🏡</span> Ethiopia’s #1 Homeowner & Trade Artisan Marketplace
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black leading-[1.15] tracking-tight text-slate-950 max-w-xl">
              Hire verified <span className="text-emerald-600">Home Artisans</span> & trade experts in Ethiopia.
            </h1>

            <p className="mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed text-slate-700 max-w-lg">
              WorkBridge connects Ethiopian homeowners directly with vetted plumbers, electricians, painters, carpenters, and appliance repairers. Fast house calls, transparent rates & 0% homeowner fee.
            </p>

            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/dashboard/employer/create"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95 gap-2"
              >
                <span>🏡 Hire Home Artisan</span>
              </Link>
              <Link
                href="/find-workers"
                className="inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-slate-950 hover:bg-slate-800 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-all shadow-md active:scale-95 gap-2"
              >
                <span>🛠️ Browse Vetted Tradesmen</span>
              </Link>
            </div>
          </div>

          {/* Right - Image */}
          <div className="order-1 lg:order-2 flex justify-center w-full">
            <div className="relative flex w-full max-w-md lg:max-w-xl items-center justify-center bg-slate-50 p-3 sm:p-5 rounded-2xl border border-slate-100 shadow-xs">
              <div className="relative w-full aspect-video sm:aspect-4/3 max-h-[300px]">
                <Image
                  src="/hero-image.png"
                  alt="Ethiopian Homeowner hiring skilled trade artisan"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-6 sm:mt-10 flex justify-center w-full">
          <div className="grid w-full max-w-5xl grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 rounded-t-2xl sm:rounded-t-3xl bg-emerald-700 px-4 sm:px-6 py-5 sm:py-6 md:py-8 text-center text-white shadow-sm">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center justify-center ${
                  index % 2 === 0
                    ? "border-r border-white/20 sm:border-r-0"
                    : ""
                } ${
                  index < 3
                    ? "sm:border-r sm:border-white/20"
                    : ""
                }`}
              >
                <p className="text-xl sm:text-2xl md:text-3xl font-black leading-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs sm:text-sm font-medium text-white/80">
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