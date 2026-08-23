import { Suspense } from "react";
import { LoginForm } from "@/features/auth/components/login-form";
import { AuthShell } from "@/features/auth/components/auth-shell";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Continue your journey with workbridge"
      sideHeading="Find the right job, faster"
      sideText="Discover opportunities that match your skills and start building your career today."
      footerText="Don't have an account?"
      footerLinkText="Sign up here"
      footerLinkHref="/register"
    >
      <Suspense fallback={<div className="flex items-center justify-center min-h-[200px]">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
