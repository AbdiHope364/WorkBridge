import { VerifyEmailForm } from "@/features/auth/components/verify-email-form";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <VerifyEmailForm />
      </div>
    </div>
  );
}
