import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export function StatCard({
  className,
  icon,
  label,
  tone = "light",
  value,
}: {
  className?: string;
  icon?: ReactNode;
  label: ReactNode;
  tone?: "brand" | "dark" | "light";
  value: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 flex justify-center items-center",
        tone === "brand" && "bg-emerald-500 text-white",
        tone === "dark" && "bg-slate-950 text-white",
        tone === "light" && "border border-slate-200 bg-white text-slate-950 shadow-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black tracking-[-0.04em]">{value}</p>
          <p
            className={cn(
              "mt-1 text-sm font-medium",
              tone === "light" ? "text-slate-500" : "text-white/80",
            )}
          >
            {label}
          </p>
        </div>
        {icon ? <div className="shrink-0">{icon}</div> : null}
      </div>
    </div>
  );
}
