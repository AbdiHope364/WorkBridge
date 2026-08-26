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
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-500">
                  Employer onboarding
                </p>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                  Hire the right talent, faster.
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Build your employer profile and unlock better candidate
                  matches with a single account.
                </p>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Find the right talent faster
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Create your company profile, publish job openings, and
                    connect with qualified candidates—all from one place.
                  </span>
                </li>

                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Trusted employer verification
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Verify your email to secure your account and build trust
                    with job seekers on the platform.
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <Suspense fallback={<div className="flex items-center justify-center min-h-50">Loading...</div>}>
              <RegisterForm
                role="employer"
                title="Create your employer account"
                subtitle="Use your work email to set up a client account and verify your team access."
                buttonLabel="Create employer account"
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
