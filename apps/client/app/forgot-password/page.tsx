import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      subtitle="Reset your password in a few quick steps."
      sideHeading="Need help signing in?"
      sideText="Enter your email address and we’ll send you a secure code to reset your password and get back into your account."
      footerText="Remember your password?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
