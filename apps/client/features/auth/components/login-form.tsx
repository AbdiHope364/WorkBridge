"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "@repo/ui";

import { loginSchema, type LoginFormValues } from "../lib/auth-schemas";
import { api, setSessionCookie } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { env } from "../../../lib/env";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const [dirty, setDirty] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });
  const [touched, setTouched] = useState<
    Record<keyof LoginFormValues, boolean>
  >({
    email: false,
    password: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { refreshUser } = useAuth();

  const fieldErrors = useMemo<Record<keyof LoginFormValues, string>>(() => {
    const parsed = loginSchema.safeParse(form);
    if (parsed.success) return { email: "", password: "" };
    const flat = parsed.error.flatten().fieldErrors;
    return {
      email: flat.email?.[0] ?? "",
      password: flat.password?.[0] ?? "",
    };
  }, [form]);

  const visibleError = (field: keyof LoginFormValues): string => {
    if (!touched[field]) return "";
    return fieldErrors[field];
  };

  const isFieldValid = (field: keyof LoginFormValues): boolean => {
    return touched[field] && !fieldErrors[field];
  };

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setDirty((prev) => ({ ...prev, [field]: true }));
    if (submitError) setSubmitError(null);
  };

  const handleBlur = (field: keyof LoginFormValues) => {
    if (dirty[field] || form[field] !== "") {
      setTouched((prev) => ({ ...prev, [field]: true }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);

    setTouched({ email: true, password: true });

    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) return;

    setIsSubmitting(true);
    try {
      const result = await api.auth.login(form);
      if (!result?.token) {
        throw new Error("No access token returned from backend");
      }

      localStorage.setItem("workbridge_token", result.token);
      setSessionCookie();
      await refreshUser();

      const redirectTo = searchParams.get("next") ?? "/dashboard";
      router.replace(redirectTo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const next = searchParams.get("next");
    const params = new URLSearchParams({ role: "jobseeker" });
    if (next) params.set("next", next);
    window.location.href = `${env.NEXT_PUBLIC_API_URL}/auth/google?${params.toString()}`;
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <CardHeader>
        <CardTitle>Sign in to your account</CardTitle>
        <CardDescription>
          Use your work email and password to continue.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input
          label="Email"
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
          autoComplete="current-password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          onBlur={() => handleBlur("password")}
          error={visibleError("password")}
          isValid={isFieldValid("password")}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between gap-4 text-sm text-slate-600">
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            className="font-semibold text-slate-950 hover:text-slate-700"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>

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
          Continue to login
        </Button>
        <Button onClick={handleGoogleLogin} variant="outline" type="button">
          Continue with Google
        </Button>
      </div>
    </form>
  );
}
