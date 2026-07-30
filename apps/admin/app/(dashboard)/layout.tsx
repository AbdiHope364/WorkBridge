"use client";
// @ts-ignore: side-effect CSS import handled by Next.js
import "../globals.css";
import { Sidebar } from "@/components/sidebar";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated, isLoading } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace("/login?next=/");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <LoaderCircle className="h-12 w-12 animate-spin text-emerald-600" />
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderCircle className="h-12 w-12 animate-spin text-emerald-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
            <span className="text-3xl">🔒</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Sign in Required
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            You need to sign in to access the dashboard. Please log in to
            continue.
          </p>

          <button
            onClick={() => router.push("/login?next=/")}
            className="mt-6 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Go to Login
          </button>
        </div>
      </main>
    );
  }

  if (user?.role !== "admin") {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 px-6">
        <div className="max-w-md rounded-xl border bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-3xl">🚫</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Access Restricted
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            This dashboard is reserved for administrators. Your account does not
            have permission to access this area.
          </p>

          <button
            onClick={() => router.push("/")}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Return to Home
          </button>
        </div>
      </main>
    );
  }
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 min-h-screen">{children}</main>
    </div>
  );
}
