"use client";

import { useEffect } from "react";

export default function AuthCallbackPage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      window.location.href = "/login?error=no_token";
      return;
    }

    localStorage.setItem("workbridge_token", token);

    const role = params.get("role");
    const next = sessionStorage.getItem("google_auth_next");

    sessionStorage.removeItem("google_auth_next");

    const defaultRedirect =
      role === "employer" ? "/dashboard/employer" : "/dashboard/jobseeker";

    window.location.href = next || defaultRedirect;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-slate-500">Completing sign in...</p>
    </div>
  );
}
