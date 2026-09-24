"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Check,
  KeyRound,
} from "lucide-react";

import { loginSchema, type LoginFormValues } from "../lib/auth-schemas";
import { api, setSessionCookie, clearSessionCookie } from "@/lib/api";
import { useAuth } from "@/context/auth-context";
import { env } from "@/lib/env";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { refreshUser } = useAuth();

  const [form, setForm] = useState<LoginFormValues>({
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockActive, setCapsLockActive] = useState(false);
  const [demoFilled, setDemoFilled] = useState(false);

  const [dirty, setDirty] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });

  const [touched, setTouched] = useState<Record<keyof LoginFormValues, boolean>>({
    email: false,
    password: false,
  });

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Monitor CapsLock state
  const handleKeyActivity = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (typeof e.getModifierState === "function") {
      setCapsLockActive(e.getModifierState("CapsLock"));
    }
  };

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
    return touched[field] && !fieldErrors[field] && form[field].length > 0;
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

  const handleAutoFillDemo = () => {
    setForm({
      email: "admin@example.com",
      password: "Password123!",
    });
    setTouched({
      email: true,
      password: true,
    });
    setDirty({
      email: true,
      password: true,
    });
    setSubmitError(null);
    setDemoFilled(true);
    setTimeout(() => setDemoFilled(false), 3000);
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

        throw new Error("Access Denied: This account is not authorized as an administrator.");
      }

      const redirectTo = searchParams.get("next") ?? "/";
      router.replace(redirectTo);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in. Please verify your credentials.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    const next = searchParams.get("next") || "/";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("google_auth_next", next);
    }
    window.location.href = `${env.apiBaseUrl}/auth/google`;
  };

  return (
    <div className="w-full">
      {/* Card Header */}
      <div className="mb-5 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Admin Access
          </span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Sign In to Console
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Enter admin credentials to manage WorkBridge operations.
        </p>
      </div>

      {/* Quick Demo Autofill Bar */}
      <div className="mb-5 rounded-2xl bg-slate-800/90 p-3.5 border border-slate-700/80 shadow-inner">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-200">Demo Credentials</span>
              <p className="text-[11px] text-slate-400">admin@example.com</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAutoFillDemo}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 shadow-md"
          >
            {demoFilled ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Auto-Filled!</span>
              </>
            ) : (
              <>
                <KeyRound className="w-3.5 h-3.5" />
                <span>Fill Admin Demo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        {/* Email Input */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="h-4 w-4" />
            </div>
            <input
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              placeholder="admin@example.com"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-slate-950 text-white ${
                visibleError("email")
                  ? "border-rose-500 text-rose-300 focus:ring-2 focus:ring-rose-500/50"
                  : isFieldValid("email")
                    ? "border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/50"
                    : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              }`}
            />
          </div>
          {visibleError("email") && (
            <p className="text-xs font-semibold text-rose-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {visibleError("email")}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="h-4 w-4" />
            </div>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onBlur={() => handleBlur("password")}
              onKeyDown={handleKeyActivity}
              onKeyUp={handleKeyActivity}
              placeholder="••••••••••••"
              className={`w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm font-medium transition-all outline-none bg-slate-950 text-white ${
                visibleError("password")
                  ? "border-rose-500 text-rose-300 focus:ring-2 focus:ring-rose-500/50"
                  : isFieldValid("password")
                    ? "border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/50"
                    : "border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              }`}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* CapsLock Alert */}
          {capsLockActive && (
            <div className="mt-1.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Caps Lock is ON</span>
            </div>
          )}

          {visibleError("password") && (
            <p className="text-xs font-semibold text-rose-400 mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {visibleError("password")}
            </p>
          )}
        </div>

        {/* Remember Session */}
        <div className="flex items-center justify-between pt-1">
          <label className="inline-flex cursor-pointer items-center gap-2 select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500/50 accent-emerald-500 cursor-pointer"
            />
            <span className="text-xs font-medium text-slate-300">
              Keep session active
            </span>
          </label>
        </div>

        {/* Submit Error Box */}
        {submitError && (
          <div className="rounded-xl border border-rose-800/80 bg-rose-950/80 p-3.5 text-xs font-semibold text-rose-200 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-200">Authentication Error</p>
              <p className="mt-0.5 text-rose-300">{submitError}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2 space-y-2.5">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Authenticating...
              </span>
            ) : (
              <>
                <span>Sign In to Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}