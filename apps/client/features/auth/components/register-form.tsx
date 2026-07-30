"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
} from "@repo/ui";
import { api } from "../../../lib/api";
import { registerSchema, type RegisterFormValues } from "../lib/auth-schemas";
import type { RegisterRequest } from "@repo/types/auth";
import { env } from "@/lib/env";

interface RegisterFormProps {
  role: "jobseeker" | "employer";
  title: string;
  subtitle: string;
  buttonLabel: string;
}

type FormField = "email" | "password" | "confirmPassword";

export function RegisterForm({
  role,
  title,
  subtitle,
  buttonLabel,
}: RegisterFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<RegisterFormValues>({
    email: "",
    password: "",
    confirmPassword: "",
    role,
  });

  const [dirty, setDirty] = useState<Record<FormField, boolean>>({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldErrors = useMemo<Record<FormField, string>>(() => {
    const parsed = registerSchema.safeParse(form);
    if (parsed.success) return { email: "", password: "", confirmPassword: "" };
    const flat = parsed.error.flatten().fieldErrors;
    return {
      email: flat.email?.[0] ?? "",
      password: flat.password?.[0] ?? "",
      confirmPassword: flat.confirmPassword?.[0] ?? "",
    };
  }, [form]);

  const visibleError = (field: FormField): string => {
    if (!touched[field]) return "";
    if (field === "confirmPassword" && fieldErrors.password) return "";
    return fieldErrors[field];
  };

  const isFieldValid = (field: FormField): boolean => {
    if (field === "confirmPassword") {
      return (
        touched.password &&
        touched.confirmPassword &&
        !fieldErrors.password &&
        !fieldErrors.confirmPassword
      );
    }
    return touched[field] && !fieldErrors[field];
  };

  const handleChange = (field: FormField, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty((prev) => ({ ...prev, [field]: true }));
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (field: FormField) => {
    if (dirty[field] || form[field] !== "") {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setTouched({ email: true, password: true, confirmPassword: true });

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) return;

    setIsSubmitting(true);

    const payload: RegisterRequest = {
      email: form.email,
      password: form.password,
      role,
    };

    try {
      await api.auth.register(payload);
      router.push("/login");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to complete registration.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = () => {
    const next = searchParams.get("next");
    const params = new URLSearchParams({ role });
    if (next) params.set("next", next);
    window.location.href = `${env.apiBaseUrl}/auth/google?${params.toString()}`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="space-y-4">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          <Input
            label="Work email"
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={visibleError("email")}
            isValid={isFieldValid("email")}
            placeholder="name@company.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={visibleError("password")}
            isValid={isFieldValid("password")}
            placeholder="Create a password"
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            onBlur={() => handleBlur("confirmPassword")}
            error={visibleError("confirmPassword")}
            isValid={isFieldValid("confirmPassword")}
            placeholder="Re-enter your password"
          />
        </CardContent>
      </div>

      {submitError ? (
        <div
          role="alert"
          className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700"
        >
          {submitError}
        </div>
      ) : null}

      <div className="grid gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
        {role === "jobseeker" && (
          <Button onClick={handleGoogleSignUp} variant="outline" type="button">
            Continue with Google
          </Button>
        )}
      </div>
    </form>
  );
}
