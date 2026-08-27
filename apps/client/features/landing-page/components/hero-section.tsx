"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@repo/ui/container";

const stats = [
  { value: "10K+", label: "Completed Service Bookings" },
  { value: "3K+", label: "Verified Trades & Employers" },
  { value: "5K+", label: "Active Trade Technicians" },
  { value: "99.4%", label: "Verified Work Satisfaction" },
];

const quickTradeFilters = [
  { label: "⚡ Electricians", query: "Electricians" },
  { label: "🔧 Plumbers", query: "Plumbing" },
  { label: "🪚 Carpenters", query: "Carpentry" },
  { label: "❄️ HVAC & AC", query: "HVAC & Cooling" },
  { label: "🎨 Painters", query: "Painting" },
  { label: "💻 Tech Specialists", query: "Developers" },
];

export function HeroSection() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/find-workers?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/find-workers");
    }
  };

  return (
    <section id="find-jobs" className="bg-gradient-to-b from-slate-50 to-white pb-0 pt-12 sm:pt-16">
      <Container size="xl" className="w-full">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-bold text-emerald-800 shadow-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Ethiopia's Leading Skilled Trade & Talent Network
            </div>

            <h1 className="max-w-160 text-[36px] font-black leading-[1.14] tracking-[-0.03em] text-slate-950 sm:text-[44px] lg:text-[48px]">
              Book verified <span className="text-emerald-600">electricians, plumbers & skilled workers</span> on demand.
            </h1>
            <p className="mt-4 max-w-140 text-[16px] leading-[1.4] text-slate-700">
              Directly hire certified trade technicians for on-site repairs, installations, and construction, or discover full-time jobs across Ethiopia with secure escrow protection.
            </p>

            {/* Quick search input */}
            <form onSubmit={handleSearch} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-lg rounded-2xl bg-white p-2 border border-slate-200 shadow-md">
              <div className="flex flex-1 items-center px-3 gap-2 text-slate-400">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Need an electrician, plumber, carpenter...?"
                  className="w-full text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700 shadow-sm shrink-0"
              >
                Search Workers
              </button>
            </form>

            {/* Quick filter pills */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-500 mr-1">Trending:</span>
              {quickTradeFilters.map((t) => (
                <Link
                  key={t.label}
                  href={`/find-workers?category=${encodeURIComponent(t.query)}`}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                >
                  {t.label}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/find-workers"
                className="inline-flex items-center justify-center min-w-36 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-800 shadow-md"
              >
                Book a Worker
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center justify-center min-w-36 rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 shadow-md"
              >
                Explore Jobs
              </Link>
              <Link
                href="/register/jobseeker"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-slate-50"
              >
                Join as Worker / Tradesman
              </Link>
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-152.5 items-center justify-center bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100 shadow-inner">
            <Image
              src="/hero-image.png"
              alt="WorkBridge skilled trade workers and professionals"
              width={600}
              height={330}
              priority
              className="h-auto w-full object-contain drop-shadow-md"
            />
          </div>
        </div>

        {/* Stats bar */}
        <div className="mt-12">
          <div
            style={{ background: "#04865a" }}
            className="grid w-full gap-6 rounded-t-[3rem] sm:rounded-t-[4rem] bg-[#04865a] px-8 py-8 text-center text-white sm:grid-cols-2 lg:grid-cols-4 shadow-xl"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[28px] sm:text-[32px] font-black leading-none tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-semibold text-white/90">
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
