import { LoginForm } from "@/features/auth/components/login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="mb-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            WorkBridge
          </h1>

          <p className="mt-2 text-lg font-semibold text-slate-800">
            Admin Dashboard
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}