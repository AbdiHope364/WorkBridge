import { Suspense } from "react";
import { RegisterForm } from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterJobseekerPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <div
          style={{ display: "flex", alignItems: "center" }}
          className="grid gap-10 lg:grid-cols-[0.95fr_0.9fr]"
        >
          <section className="hidden rounded-[32px] border border-slate-200 bg-slate-950/5 p-10 text-white shadow-lg lg:block">
            <div className="space-y-8">
              <div className="rounded-3xl bg-emerald-700 p-8 shadow-inner shadow-slate-900/5">
                <p className="text-sm uppercase tracking-[0.24em] text-emerald-500">
                  Jobseeker onboarding
                </p>
                <h1 className="mt-4 text-3xl font-black tracking-[-0.04em] text-white">
                  Get noticed by employers.
                </h1>
                <p className="mt-4 text-sm leading-7 text-slate-200">
                  Sign up quickly and secure your profile with email
                  verification before applying to roles.
                </p>
              </div>
              <ul className="space-y-4 text-sm text-slate-300">
                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Discover your next opportunity
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Create your account in minutes and start exploring jobs that
                    match your skills and career goals.
                  </span>
                </li>

                <li className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-5">
                  <strong className="block text-slate-100">
                    Build your professional profile
                  </strong>
                  <span className="mt-2 block text-slate-400">
                    Complete your profile once and apply to multiple jobs with
                    confidence using a trusted account.
                  </span>
                </li>
              </ul>
            </div>
          </section>
          <section>
            <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">Loading...</div>}>
              <RegisterForm
                role="jobseeker"
                title="Create your candidate account"
                subtitle="Use your email to register and verify your account before applying to jobs."
                buttonLabel="Create candidate account"
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
