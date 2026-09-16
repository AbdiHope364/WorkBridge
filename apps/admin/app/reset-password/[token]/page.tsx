import { Suspense } from "react";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";
import { WorkBridgeLogo } from "@repo/ui";

interface ResetPasswordPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const { token } = await params;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-6 text-center flex flex-col items-center">
          <WorkBridgeLogo className="h-12 w-auto max-w-[260px] mb-2" />
          <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-widest">
            Set New Password
          </p>
        </div>

        <Suspense
          fallback={
            <div className="text-sm text-slate-500">Loading form…</div>
          }
        >
          <ResetPasswordForm token={token} />
        </Suspense>
      </div>
    </main>
  );
}
