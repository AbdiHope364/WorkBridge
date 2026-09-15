"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Modal, Button } from "@repo/ui";
import { setAuthToken, setSessionCookie } from "@/lib/api";
import { useAuth } from "@/contexts/auth-context";
import { UserCheck, Building2, UserPlus, ArrowRight } from "lucide-react";

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRole?: "jobseeker" | "employer";
}

export function GoogleAuthModal({
  isOpen,
  onClose,
  defaultRole = "jobseeker",
}: GoogleAuthModalProps) {
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customMode, setCustomMode] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<"jobseeker" | "employer">(defaultRole);

  const handleAuthenticate = async (account: {
    name: string;
    email: string;
    picture: string;
    role: "jobseeker" | "employer";
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/google/credential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: account.role,
          name: account.name,
          email: account.email,
          picture: account.picture,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.token) {
        throw new Error(data.error || "Google authentication failed.");
      }

      setAuthToken(data.token);
      setSessionCookie();
      await refreshUser();

      const defaultRedirect =
        account.role === "employer"
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

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customName) {
      setError("Please provide your name and email address.");
      return;
    }
    handleAuthenticate({
      name: customName.trim(),
      email: customEmail.trim().toLowerCase(),
      picture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      role: selectedRole,
    });
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
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-slate-200 shadow-sm mx-auto mb-2">
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
          <h2 className="text-xl font-bold text-slate-900">Sign in with Google</h2>
          <p className="text-xs text-slate-500">Choose an account to continue to WorkBridge Ethiopia</p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
            {error}
          </div>
        )}

        {!customMode ? (
          <div className="space-y-3">
            {/* Account Option 1: Tradesman Worker */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                handleAuthenticate({
                  name: "Abebe Bikila (Google)",
                  email: "abebe.google@workbridge.et",
                  picture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
                  role: "jobseeker",
                })
              }
              className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between group shadow-sm bg-white"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
                  alt="Abebe Bikila"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                    Abebe Bikila
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-md">Worker</span>
                  </div>
                  <div className="text-xs text-slate-500">abebe.google@workbridge.et</div>
                </div>
              </div>
              <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
            </button>

            {/* Account Option 2: Client Employer */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() =>
                handleAuthenticate({
                  name: "Sara Haile (Google)",
                  email: "sara.google@workbridge.et",
                  picture: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
                  role: "employer",
                })
              }
              className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 transition-all flex items-center justify-between group shadow-sm bg-white"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150"
                  alt="Sara Haile"
                  className="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div>
                  <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-900 flex items-center gap-1.5">
                    Sara Haile
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.5 rounded-md">Client</span>
                  </div>
                  <div className="text-xs text-slate-500">sara.google@workbridge.et</div>
                </div>
              </div>
              <Building2 className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
            </button>

            {/* Use Another Account Button */}
            <button
              type="button"
              onClick={() => setCustomMode(true)}
              className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 border border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition"
            >
              <UserPlus className="w-3.5 h-3.5" /> Use another Google account
            </button>

            {/* Real Google Cloud OAuth Redirect Option */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  window.location.href = `/api/auth/google?role=${defaultRole}`;
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>🌐</span> Continue via Official Google Accounts Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCustomSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Dawit Tesfaye"
                className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Google Email
              </label>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="e.g. dawit@gmail.com"
                className="w-full h-10 px-3 rounded-xl border border-slate-300 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                WorkBridge Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("jobseeker")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition ${
                    selectedRole === "jobseeker"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  👷 Worker / Tradesman
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("employer")}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border text-center transition ${
                    selectedRole === "employer"
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  🏢 Client / Employer
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCustomMode(false)}
                className="w-1/3 text-xs"
              >
                Back
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Sign In Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </form>
        )}

        <div className="border-t border-slate-100 pt-3 text-center">
          <p className="text-[11px] text-slate-400">
            To continue, Google will share your name, email address, and profile picture with WorkBridge.
          </p>
        </div>
      </div>
    </Modal>
  );
}
