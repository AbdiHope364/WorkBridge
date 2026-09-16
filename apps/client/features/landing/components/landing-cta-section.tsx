"use client";

import Link from "next/link";
import { Container } from "@repo/ui/container";

export function LandingCtaSection() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <Container size="sm" className="max-w-4xl mx-auto">
        <div className="rounded-3xl bg-slate-900 px-6 py-10 sm:px-12 sm:py-14 text-center text-white relative overflow-hidden shadow-xl">
          {/* Subtle gradient decorations */}
          <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Ready to take the next step?
            </h3>

            <p className="mx-auto mt-3 sm:mt-4 max-w-xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-300">
              Whether you&apos;re looking for a job or searching for verified trade talent, you can get started in just a few steps. Connect with the right people faster.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                href="/jobs"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-700 px-7 py-3.5 text-sm sm:text-base font-bold text-white transition shadow-md active:scale-95"
              >
                Find Jobs
              </Link>

              <Link
                href="/dashboard/employer"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-white hover:bg-slate-100 px-7 py-3.5 text-sm sm:text-base font-bold text-slate-950 transition shadow-md active:scale-95"
              >
                Hire Talent
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
