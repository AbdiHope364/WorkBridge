"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, CardHeader, CardTitle, CardDescription } from "@repo/ui";
import { api } from "../../../lib/api";
import { verifyCodeSchema } from "../lib/auth-schemas";

export function VerifyEmailForm() {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [touched, setTouched] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = window.setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [seconds]);

  const code = digits.join("");
  const parsed = useMemo(() => verifyCodeSchema.safeParse(code), [code]);
  const codeError =
    touched && !parsed.success ? parsed.error.issues[0]?.message : "";
  const isValid = touched && parsed.success;

  const focusInput = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateDigit = (index: number, value: string) => {
    const next = [...digits];
    next[index] = value;
    setDigits(next);
  };

  const handleChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "").slice(0, 1);
    updateDigit(index, value);

    if (value && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");
    if (!pasted.length) {
      return;
    }

    const next = Array(6).fill("");
    pasted.forEach((char, index) => {
      if (index < 6) {
        next[index] = char;
      }
    });
    setDigits(next);
    setTouched(true);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    event.preventDefault();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    setSubmitError(null);

    if (!parsed.success) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.auth.verifyEmail({ code });
      router.push("/dashboard");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to verify your email.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (seconds > 0) {
      return;
    }

    setSubmitError(null);
    try {
      await api.auth.resendVerification();
      setSeconds(60);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to resend verification code.";
      setSubmitError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit confirmation code we sent to your inbox.
        </CardDescription>
      </CardHeader>

      <div className="grid gap-4">
        <div className="grid grid-cols-6 gap-3">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={handlePaste}
              className={`h-14 w-full rounded-2xl border text-center text-xl font-semibold outline-none transition ${
                codeError
                  ? "border-rose-500 ring-rose-100 focus:border-rose-500 focus:ring-2"
                  : isValid
                    ? "border-emerald-500 ring-emerald-100 focus:border-emerald-500 focus:ring-2"
                    : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
              }`}
            />
          ))}
        </div>
        <p
          className={`text-sm ${codeError ? "text-rose-600" : isValid ? "text-emerald-600" : "text-slate-500"}`}
        >
          {codeError ||
            (isValid ? "Code looks good." : "One-time verification code")}
        </p>

        {submitError ? (
          <div className="rounded-2xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700">
            {submitError}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <Button type="submit" isLoading={isSubmitting}>
          Confirm and continue
        </Button>
        <button
          type="button"
          onClick={handleResend}
          disabled={seconds > 0}
          className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {seconds > 0
            ? `Resend code in ${seconds}s`
            : "Resend verification code"}
        </button>
      </div>
    </form>
  );
}
