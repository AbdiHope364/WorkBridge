"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
} from "@repo/ui";
import { CheckCircle2, KeyRound, Mail, ShieldCheck, ArrowLeft, RefreshCw, Zap } from "lucide-react";

type FlowStep = "REQUEST" | "VERIFY_OTP" | "SET_NEW_PASSWORD" | "SUCCESS";

export function ForgotPasswordForm() {
  const router = useRouter();

  const [step, setStep] = useState<FlowStep>("REQUEST");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [demoOtp, setDemoOtp] = useState<string | null>(null);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Resend countdown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Step 1: Request 6-digit OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      if (data.otp) {
        setDemoOtp(data.otp);
      }
      if (data.resetToken) {
        setResetToken(data.resetToken);
      }

      setResendCooldown(60);
      setStep("VERIFY_OTP");
    } catch (err: any) {
      setError(err.message || "Failed to send reset code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify 6-digit OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanOtp = otp.trim();
    if (cleanOtp.length !== 6 || !/^\d{6}$/.test(cleanOtp)) {
      setError("Please enter the full 6-digit numeric verification code.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), otp: cleanOtp }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid or expired verification code.");
      }

      if (data.resetToken) {
        setResetToken(data.resetToken);
      }

      setStep("SET_NEW_PASSWORD");
    } catch (err: any) {
      setError(err.message || "Failed to verify code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          otp: otp.trim(),
          token: resetToken,
          newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setStep("SUCCESS");
      setTimeout(() => {
        router.push("/login?message=Password reset successfully. Please sign in.");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (data.otp) setDemoOtp(data.otp);
      if (data.resetToken) setResetToken(data.resetToken);
      setResendCooldown(60);
    } catch (err: any) {
      setError(err.message || "Failed to resend code.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Step Indicator Header */}
      {step !== "SUCCESS" && (
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs font-semibold text-slate-500">
          <span className={`flex items-center gap-1.5 ${step === "REQUEST" ? "text-emerald-700 font-bold" : ""}`}>
            1. Email
          </span>
          <span>→</span>
          <span className={`flex items-center gap-1.5 ${step === "VERIFY_OTP" ? "text-emerald-700 font-bold" : ""}`}>
            2. 6-Digit OTP
          </span>
          <span>→</span>
          <span className={`flex items-center gap-1.5 ${step === "SET_NEW_PASSWORD" ? "text-emerald-700 font-bold" : ""}`}>
            3. New Password
          </span>
        </div>
      )}

      {/* STEP 1: REQUEST EMAIL */}
      {step === "REQUEST" && (
        <form onSubmit={handleRequestOtp} className="space-y-5">
          <CardHeader>
            <CardTitle>Forgot password?</CardTitle>
            <CardDescription>
              Enter your registered email address to receive a secure 6-digit verification code.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            <Input
              label="Account Email Address"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dawit@example.com"
              required
            />
          </CardContent>

          <div className="grid gap-3 pt-2">
            <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 font-bold">
              Send 6-Digit Code <Mail className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/login")}
              className="font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Sign In
            </Button>
          </div>
        </form>
      )}

      {/* STEP 2: ENTER & VERIFY 6-DIGIT OTP */}
      {step === "VERIFY_OTP" && (
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <CardHeader>
            <CardTitle>Enter Verification Code</CardTitle>
            <CardDescription>
              We sent a 6-digit numeric OTP code to <strong className="text-slate-900">{email}</strong>.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            {/* Simulated Demo OTP Helper Badge */}
            {demoOtp && (
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs text-amber-950 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Simulated Email Code: <strong className="text-base tracking-widest text-slate-950 font-black">{demoOtp}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOtp(demoOtp)}
                  className="bg-amber-200/80 hover:bg-amber-300 text-amber-900 px-2.5 py-1 rounded-lg text-xs font-bold transition"
                >
                  Auto-Fill
                </button>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                6-Digit Security Code *
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="w-full h-14 text-center text-2xl tracking-[0.4em] font-mono font-bold rounded-2xl border border-slate-300 bg-white shadow-sm focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none text-slate-900"
                required
                autoFocus
              />
              <p className="mt-1.5 text-xs text-slate-500">Enter the 6 numbers sent to your email.</p>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
              <span>Didn't receive the code?</span>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendCooldown > 0 || isSubmitting}
                className={`font-bold flex items-center gap-1 ${
                  resendCooldown > 0
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-emerald-700 hover:text-emerald-800"
                }`}
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSubmitting ? "animate-spin" : ""}`} />
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend Code"}
              </button>
            </div>
          </CardContent>

          <div className="grid gap-3 pt-2">
            <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 font-bold">
              Verify Code <ShieldCheck className="w-4 h-4 ml-1.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("REQUEST")}
              className="font-medium"
            >
              Change Email Address
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: SET NEW PASSWORD */}
      {step === "SET_NEW_PASSWORD" && (
        <form onSubmit={handleResetPassword} className="space-y-5">
          <CardHeader>
            <CardTitle>Create New Password</CardTitle>
            <CardDescription>
              Your identity has been verified. Choose a strong new password for your account.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700">
                {error}
              </div>
            )}

            <Input
              label="New Password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Min. 8 characters"
              required
              autoFocus
            />

            <Input
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
            />
          </CardContent>

          <div className="grid gap-3 pt-2">
            <Button type="submit" isLoading={isSubmitting} className="bg-emerald-600 hover:bg-emerald-700 font-bold">
              Update Password & Sign In <KeyRound className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </form>
      )}

      {/* STEP 4: SUCCESS */}
      {step === "SUCCESS" && (
        <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Password Reset Complete!</h3>
          <p className="text-sm text-slate-600 max-w-sm">
            Your password has been updated securely. Redirecting you to the sign-in page...
          </p>
          <Button
            type="button"
            onClick={() => router.push("/login")}
            className="bg-emerald-600 hover:bg-emerald-700 font-bold"
          >
            Go to Sign In Now
          </Button>
        </div>
      )}
    </div>
  );
}
