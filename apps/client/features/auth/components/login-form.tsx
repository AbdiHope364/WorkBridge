"use client";

import { useMemo, useState, useEffect } from "react";
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
import { api, setSessionCookie, setAuthToken } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";

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

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "no_account") {
      setSubmitError(
        "No account found with this Google email. Please sign up first.",
      );
    } else if (error) {
      setSubmitError("Google authentication failed. Please try again.");
    }
  }, [searchParams]);

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
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const firstError = flat.email?.[0] || flat.password?.[0] || "Please enter your email and password.";
      setSubmitError(firstError);
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await api.auth.login(form);
      if (!result?.token) {
        throw new Error("No access token returned from backend");
      }

      setAuthToken(result.token);
      setSessionCookie();
      await refreshUser();

      const defaultRedirect =
        result.user?.role === "employer"
          ? "/dashboard/employer"
          : "/dashboard/jobseeker";
      const redirectTo = searchParams.get("next") ?? defaultRedirect;
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
    const next = searchParams.get("next") || "/dashboard";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("google_auth_next", next);
    }
    window.location.href = "/api/auth/google?role=jobseeker";
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
        <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 font-bold">
          Continue to login
        </Button>
        <Button onClick={handleGoogleLogin} variant="outline" type="button" className="flex items-center justify-center font-bold">
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
  );
}
