"use client";

import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";
import { WorkBridgeLogo } from "@repo/ui";
import { ShieldCheck, Lock } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md flex flex-col items-center relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <WorkBridgeLogo theme="dark" className="h-10 w-auto max-w-[220px]" />
          <div className="flex items-center gap-2 pt-1">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/60">
              Admin Console
            </span>
          </div>
        </div>

        {/* Clean Login Card */}
        <div className="w-full rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl text-slate-100">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-400">
                  Loading authentication...
                </p>
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>

        {/* Simple Footer */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>WorkBridge Security Terminal • 256-bit Encrypted</span>
        </div>
      </div>
    </main>
  );
}
