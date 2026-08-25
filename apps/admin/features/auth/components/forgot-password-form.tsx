"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "@repo/ui";
import { api } from "@/lib/api";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "../lib/auth-schemas";

export function ForgotPasswordForm() {
  const router = useRouter();
  const [form, setForm] = useState<ForgotPasswordFormValues>({ email: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const parsed = useMemo(() => forgotPasswordSchema.safeParse(form), [form]);
  const fieldErrors = useMemo(() => {
    if (parsed.success) {
      return { email: "" };
    }

    const flattened = parsed.error.flatten().fieldErrors;
    return {
      email: flattened.email?.[0] ?? "",
    };
  }, [parsed]);

  const handleBlur = (field: keyof ForgotPasswordFormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const getValidMessage = (field: keyof ForgotPasswordFormValues) => {
    return touched[field] && !fieldErrors[field] ? "Looks good." : undefined;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched({ email: true });
    setSubmitError(null);

    if (!parsed.success) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.auth.forgotPassword({ email: form.email });
      setIsSuccess(true);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send reset link.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="space-y-6">
        <CardHeader>
          <CardTitle>Check your email</CardTitle>
          <CardDescription>
            We sent a password reset link to{" "}
            <span className="font-semibold">{form.email}</span>. Follow the
            instructions in the email to regain access to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            onClick={() => router.replace("/login")}
            className="w-full"
          >
            Back to login
          </Button>
        </CardContent>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we’ll send you a secure reset link to regain
          access.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          label="Work email"
          name="email"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          onBlur={() => handleBlur("email")}
          error={touched.email ? fieldErrors.email : undefined}
          isValid={Boolean(touched.email && !fieldErrors.email)}
          validMessage={getValidMessage("email")}
          placeholder="name@company.com"
        />
        {submitError ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}
      </CardContent>
      <div className="grid gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Send reset link
        </Button>
      </div>
    </form>
  );
}
