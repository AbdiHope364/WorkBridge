import { AuthShell } from "@/features/auth/components/auth-shell";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <AuthShell
      title="Reset Password"
      subtitle="Set a strong, new password for your account."
      sideHeading="Account Security"
      sideText="Create a new password that is at least 6 characters long and easy for you to remember."
      footerText="Remembered your password?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}

