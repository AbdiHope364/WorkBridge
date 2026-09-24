"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Modal, Button } from "@repo/ui";
import { setAuthToken, setSessionCookie } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { env } from "@/lib/env";
import { ArrowRight } from "lucide-react";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "jobseeker" | "employer" | "worker" | "client";
}

export function GoogleAuthModal({
  isOpen,
  onClose,
  defaultRole,
}: GoogleAuthModalProps) {
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [googleEmail, setGoogleEmail] = useState("");

  const handleAuthenticate = async (emailToAuth: string) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const cleanEmail = emailToAuth.trim().toLowerCase();
      const derivedName = cleanEmail.split("@")[0].replace(/[._-]/g, " ");

      const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/google/credential`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: cleanEmail,
          name: derivedName,
          picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
          role: defaultRole || "jobseeker",
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.token) {
        throw new Error(data.error || "Google authentication failed.");
      }

      setAuthToken(data.token);
      setSessionCookie();
      await refreshUser();

      // Automatically route user to their database identified dashboard
      const userRole = data.user?.role;
      const defaultRedirect =
        userRole === "employer"
          ? "/dashboard/employer"
          : "/dashboard/jobseeker";
      const next = searchParams.get("next") ?? defaultRedirect;

      onClose();
      window.location.href = next;
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleEmail.trim()) {
      setError("Please enter your Google email address.");
      return;
    }
    handleAuthenticate(googleEmail);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title=""
      size="md"
    >
      <div className="py-2 space-y-5">
        {/* Google Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-xs mx-auto mb-2">
            <svg className="h-6 w-6" viewBox="0 0 24 24">
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
          </div>
          <h2 className="text-xl font-black text-slate-900">Sign in with Google</h2>
          <p className="text-xs text-slate-500">Your role will be automatically identified from the database</p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {/* Simple Google Sign-In Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Enter Google Email *
            </label>
            <input
              type="email"
              value={googleEmail}
              onChange={(e) => setGoogleEmail(e.target.value)}
              placeholder="e.g. user@gmail.com"
              className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium"
              required
            />
          </div>

          <div className="pt-2 space-y-2">
            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs"
            >
              Sign In with Google <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>

            <button
              type="button"
              onClick={() => {
                window.location.href = `${env.NEXT_PUBLIC_API_URL}/auth/google`;
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer"
            >
              <span>🌐</span> Continue via Official Google OAuth Window
            </button>
          </div>
        </form>

        <div className="border-t border-slate-100 pt-3 text-center">
          <p className="text-[11px] text-slate-400">
            WorkBridge automatically verifies your user role (Trade Worker or Homeowner) directly from the database.
          </p>
        </div>
      </div>
    </Modal>
  );
}

