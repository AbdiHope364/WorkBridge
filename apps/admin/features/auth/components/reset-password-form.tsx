"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";

import { resetPasswordSchema, type ResetPasswordFormValues } from "../lib/auth-schemas";
import { api } from "@/lib/api";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ResetPasswordFormValues>({
    token,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const parsed = useMemo(
    () => resetPasswordSchema.safeParse(form),
    [form]
  );

  const fieldErrors = useMemo(() => {
    if (parsed.success) {
      return { password: "", confirmPassword: "", token: "" };
    }

    const flattened = parsed.error.flatten().fieldErrors;
    return {
      token: flattened.token?.[0] ?? "",
      password: flattened.password?.[0] ?? "",
      confirmPassword: flattened.confirmPassword?.[0] ?? "",
    };
  }, [parsed]);

  const handleBlur = (field: keyof ResetPasswordFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getValidMessage = (field: keyof ResetPasswordFormValues) => {
    return touched[field] && !fieldErrors[field] ? "Looks good." : undefined;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    setSubmitError(null);

    if (!parsed.success) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.auth.resetPassword({
        token: form.token,
        password: form.password,
      });

      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to reset password.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <CardHeader>
          <CardTitle>Password reset successful</CardTitle>
          <CardDescription>
            Your password has been updated. You can now sign in with your new
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            onClick={() => router.replace("/login")}
            className="w-full"
          >
            Sign in
          </Button>
        </CardContent>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          Enter a new password for your admin account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Input
            label="New password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            onBlur={() => handleBlur("password")}
            error={touched.password ? fieldErrors.password : undefined}
            isValid={Boolean(touched.password && !fieldErrors.password)}
            validMessage={getValidMessage("password")}
            placeholder="Enter new password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-8.5 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        <div className="relative">
          <Input
            label="Confirm new password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            onBlur={() => handleBlur("confirmPassword")}
            error={touched.confirmPassword ? fieldErrors.confirmPassword : undefined}
            isValid={Boolean(touched.confirmPassword && !fieldErrors.confirmPassword)}
            validMessage={getValidMessage("confirmPassword")}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-8.5 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>

        {submitError ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}
      </CardContent>
      <div className="grid gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Reset password
        </Button>
      </div>
    </form>
  );
}
