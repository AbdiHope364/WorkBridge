import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterClientPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr] align-middle justify-center"
        >
          <section className="hidden rounded-4xl border border-slate-200 bg-slate-950/5 p-10 text-white shadow-lg lg:block">
            <div className="space-y-8">
              <div className="rounded-3xl bg-emerald-700 p-8 shadow-inner shadow-slate-900/5">
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-200 font-bold">
                  Homeowner Account
                </p>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                  Hire verified tradesmen for your home or project.
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Connect directly with Fayda-verified electricians, plumbers, painters, and technicians with 0% platform commission.
                </p>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Direct hiring &amp; 0% commission
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Post household jobs, negotiate transparent pricing, and pay workers directly with zero intermediary fee.
                  </span>
                </li>

                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Fayda National ID Trust &amp; Safety
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Link your Ethiopian Fayda National ID (FIN) to earn the Verified Homeowner badge and get priority worker responses.
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <Suspense fallback={<div className="flex items-center justify-center min-h-50">Loading...</div>}>
              <RegisterForm
                role="employer"
                title="Create your Homeowner Account"
                subtitle="Set up your account in seconds to hire verified skilled workers in your neighborhood."
                buttonLabel="Create Homeowner Account"
              />
            </Suspense>
            <p className="text-sm text-slate-500 p-4">
              Already have an account?
              <Link
                href="/login"
                className="font-semibold text-slate-950 hover:text-slate-700 mx-2"
              >
                Login here
              </Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
