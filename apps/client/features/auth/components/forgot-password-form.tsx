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
      await new Promise((resolve) => window.setTimeout(resolve, 400));
      router.push("/verify-email");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send reset link.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardHeader>
        <CardTitle>Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we’ll send you a secure reset code to regain
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
          error={fieldErrors.email}
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
        <Button variant="outline" type="button" disabled>
          Sign in with Google
        </Button>
      </div>
    </form>
  );
}
