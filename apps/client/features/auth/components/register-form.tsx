"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
} from "@repo/ui";
import { api, setSessionCookie, setAuthToken } from "@/lib/api";
import { registerSchema, type RegisterFormValues } from "../lib/auth-schemas";
import type { RegisterRequest } from "@repo/types/auth";
import { useAuth } from "@/contexts/auth-context";
import { GoogleAuthModal } from "./google-auth-modal";

interface RegisterFormProps {
  role: "jobseeker" | "employer";
  title: string;
  subtitle: string;
  buttonLabel: string;
}

type FormField = "fullName" | "email" | "password" | "confirmPassword";

export function RegisterForm({
  role,
  title,
  subtitle,
  buttonLabel,
}: RegisterFormProps) {
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [form, setForm] = useState<RegisterFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role,
  });

  const [dirty, setDirty] = useState<Record<FormField, boolean>>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    fullName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldErrors = useMemo<Record<FormField, string>>(() => {
    const parsed = registerSchema.safeParse(form);
    if (parsed.success) return { fullName: "", email: "", password: "", confirmPassword: "" };
    const flat = parsed.error.flatten().fieldErrors;
    return {
      fullName: flat.fullName?.[0] ?? "",
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
    setTouched({ fullName: true, email: true, password: true, confirmPassword: true });

    const parsed = registerSchema.safeParse(form);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const firstError =
        flat.fullName?.[0] ||
        flat.email?.[0] ||
        flat.password?.[0] ||
        flat.confirmPassword?.[0] ||
        "Please fill in all required fields.";
      setSubmitError(firstError);
      return;
    }

    setIsSubmitting(true);

    const payload: RegisterRequest = {
      fullName: form.fullName?.trim() || undefined,
      email: form.email,
      password: form.password,
      role,
    };

    try {
      const result = await api.auth.register(payload);
      if (!result?.token) {
        throw new Error("No access token returned from backend");
      }

      setAuthToken(result.token);
      setSessionCookie();
      await refreshUser();

      const defaultRedirect =
        role === "jobseeker" ? "/dashboard/jobseeker" : "/dashboard/employer";
      const redirectTo = searchParams.get("next") ?? defaultRedirect;
      window.location.href = redirectTo;
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

  const handleGoogleSignUp = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsGoogleModalOpen(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="space-y-4">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subtitle}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input
              label={role === "jobseeker" ? "Your Full Name / Trade Name" : "Your Full Name / Company Contact"}
              name="fullName"
              type="text"
              autoComplete="name"
              value={form.fullName ?? ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              error={visibleError("fullName")}
              isValid={isFieldValid("fullName")}
              placeholder={role === "jobseeker" ? "e.g. Dawit Bekele (Electrician)" : "e.g. Sara Haile"}
            />
            <Input
              label="Email address"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              error={visibleError("email")}
              isValid={isFieldValid("email")}
              placeholder="name@example.com"
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
              placeholder="Create a password (min. 8 characters)"
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
          <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 font-bold">
            {buttonLabel}
          </Button>
          <Button onClick={handleGoogleSignUp} variant="outline" type="button" className="flex items-center justify-center font-bold">
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </Button>
        </div>
      </form>

      <GoogleAuthModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        defaultRole={role}
      />
    </>
  );
}
