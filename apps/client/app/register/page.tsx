import Link from "next/link";
import { Card, CardTitle, CardDescription } from "@repo/ui";

const options = [
  {
    title: "Register as a client",
    description:
      "Find the right talent, post jobs, and manage your team hiring.",
    href: "/register/client",
    button: "Continue as employer",
  },
  {
    title: "Register as a jobseeker",
    description:
      "Create your profile, apply to jobs, and get discovered by employers.",
    href: "/register/jobseeker",
    button: "Continue as candidate",
  },
];

export default function RegisterChoicePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:py-16">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
              Choose your account type
            </p>
            <h1 className="text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Let's get you signed up.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600">
              Start with the user experience tailored to your role. Pick either
              a client or jobseeker flow to continue.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {options.map((option) => (
            <Card key={option.title} className="overflow-hidden shadow-xl">
              <div className="p-8">
                <CardTitle className="text-2xl">{option.title}</CardTitle>
                <CardDescription className="mt-3 text-slate-600">
                  {option.description}
                </CardDescription>
                <div className="mt-8">
                  <Link
                    href={option.href}
                    className="inline-flex w-full justify-center rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-emerald-800"
                  >
                    {option.button}
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex align-middle justify-between gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-3xl border border-slate-200 bg-slate-950/5 p-8 text-slate-700">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-900">
                Choose how you want to get started
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Select the account that best matches your goals. Whether you're
                hiring top talent or searching for your next opportunity, we'll
                tailor your experience from the very beginning.
              </p>
            </div>
            <Link
              href="/login"
              className="text-sm font-semibold text-emerald-700 hover:text-emerald-900"
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
