"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react"; // or use any icon library

import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@repo/ui";

import { loginSchema, type LoginFormValues } from "../lib/auth-schemas";
import { api, setSessionCookie, clearSessionCookie } from "@/lib/api";
import { useAuth } from "@/context/auth-context";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refreshUser } = useAuth();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // ✅ New state for password visibility

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

  const fieldErrors = useMemo<Record<keyof LoginFormValues, string>>(() => {
    const parsed = loginSchema.safeParse(form);

    if (parsed.success) {
      return {
        email: "",
        password: "",
      };
    }

    const flat = parsed.error.flatten().fieldErrors;

    return {
      email: flat.email?.[0] ?? "",
      password: flat.password?.[0] ?? "",
    };
  }, [form]);

  const visibleError = (field: keyof LoginFormValues) => {
    if (!touched[field]) return "";
    return fieldErrors[field];
  };

  const isFieldValid = (field: keyof LoginFormValues) => {
    return touched[field] && !fieldErrors[field];
  };

  const handleChange = (field: keyof LoginFormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setDirty((prev) => ({
      ...prev,
      [field]: true,
    }));

    if (submitError) {
      setSubmitError(null);
    }
  };

  const handleBlur = (field: keyof LoginFormValues) => {
    if (dirty[field] || form[field] !== "") {
      setTouched((prev) => ({
        ...prev,
        [field]: true,
      }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    setSubmitError(null);

    const parsed = loginSchema.safeParse(form);

    if (!parsed.success) return;

    setIsSubmitting(true);

    try {
      const result = await api.auth.login(form);

      if (!result?.token) {
        throw new Error("No access token returned.");
      }

      localStorage.setItem("workbridge_token", result.token);
      setSessionCookie();

      await refreshUser();

      const currentUser = await api.auth.me();

      if (currentUser.role !== "admin") {
        localStorage.removeItem("workbridge_token");
        clearSessionCookie();

        throw new Error("This account is not an administrator.");
      }

      const redirectTo = searchParams.get("next") ?? "/";

      router.replace(redirectTo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <CardHeader>
        <CardTitle>Admin Sign In</CardTitle>
        <CardDescription>
          Sign in using your administrator account.
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
          placeholder="admin@example.com"
        />

        <div className="relative">
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            onBlur={() => handleBlur("password")}
            error={visibleError("password")}
            isValid={isFieldValid("password")}
            placeholder="Enter your password"
          />
          
          {/* Password toggle button */}
          <button
            type="button"
            onClick={togglePasswordVisibility}
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

        <div className="flex items-center justify-between text-sm text-slate-600">
          <label className="inline-flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300"
            />
            Remember me
          </label>

          <Link
            href="/forgot-password-form"
            className="font-semibold text-slate-950 hover:text-slate-700"
          >
            Forgot password?
          </Link>
        </div>
      </CardContent>

      {submitError && (
        <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
          {submitError}
        </div>
      )}

      <div className="grid gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Sign In
        </Button>
      </div>
    </form>
  );
}