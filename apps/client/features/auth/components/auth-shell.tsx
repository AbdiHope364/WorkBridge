import type { ReactNode } from "react";
import Link from "next/link";
import { Card } from "@repo/ui";

interface AuthShellProps {
  title: string;
  subtitle: string;
  sideHeading: string;
  sideText: string;
  children: ReactNode;
  footerText?: string;
  footerLinkText?: string;
  footerLinkHref?: string;
}

export function AuthShell({
  title,
  subtitle,
  sideHeading,
  sideText,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4 sm:py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.15fr_0.9fr]">
        <section className="hidden overflow-hidden rounded-4xl border border-slate-200 bg-slate-950/5 p-10 text-white shadow-lg lg:block">
          <div className="space-y-8">
            <div className="rounded-3xl bg-emerald-700 p-8 shadow-inner shadow-slate-900/5">
              <p className="text-sm uppercase tracking-[0.24em] text-emerald-500">
                Welcome to Workbridge
              </p>
              <h1 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-white">
                {sideHeading}
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200">
                {sideText}
              </p>
            </div>
            <dl className="space-y-4 text-sm text-slate-200">
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6">
                <dt className="font-semibold text-slate-100">
                  Apply once, hear back fast
                </dt>
                <dd className="mt-2 text-slate-400">
                  Employers on WorkBridge respond within 72 hours or your
                  application is automatically escalated.
                </dd>
              </div>
              <div className="rounded-3xl border border-slate-800/80 bg-slate-950/80 p-6">
                <dt className="font-semibold text-slate-100">
                  Local Talent. Real Opportunities
                </dt>
                <dd className="mt-2 text-slate-400">
                  Discover jobs and connect with trusted employers and skilled
                  professionals across your growing workforce.
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="flex items-center justify-center">
          <Card className="w-full max-w-xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">
                  {title}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-slate-950">
                  {subtitle}
                </h2>
              </div>
              <div>{children}</div>
              {footerText && footerLinkText && footerLinkHref ? (
                <p className="text-sm text-slate-500">
                  {footerText}{" "}
                  <Link
                    href={footerLinkHref}
                    className="font-semibold text-slate-950 hover:text-slate-700"
                  >
                    {footerLinkText}
                  </Link>
                </p>
              ) : null}
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
}
