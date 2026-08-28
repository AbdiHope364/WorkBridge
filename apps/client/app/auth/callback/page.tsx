"use client";

import { useEffect, useState } from "react";
import { setAuthToken, setSessionCookie } from "@/lib/api";

export default function AuthCallbackPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (error) {
      setErrorMsg(decodeURIComponent(error));
      setTimeout(() => {
        window.location.href = `/login?error=${encodeURIComponent(error)}`;
      }, 2000);
      return;
    }

    if (!token) {
      setErrorMsg("No authorization token received. Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login?error=no_token";
      }, 1500);
      return;
    }

    setAuthToken(token);
    setSessionCookie();

    const role = params.get("role");
    const next = sessionStorage.getItem("google_auth_next");
    sessionStorage.removeItem("google_auth_next");

    const defaultRedirect =
      role === "employer" ? "/dashboard/employer" : "/dashboard/jobseeker";

    window.location.href = next || defaultRedirect;
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
      {errorMsg ? (
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="h-10 w-10 text-rose-600">⚠️</div>
          <p className="text-sm font-bold text-rose-700">{errorMsg}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
          <p className="text-sm font-bold text-slate-800">Completing Google authentication...</p>
          <p className="text-xs text-slate-400">Redirecting to your dashboard...</p>
        </div>
      )}
    </div>
  );
}
