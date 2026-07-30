import { type ReactNode } from "react";
import { cn } from "../lib/cn";

export function SectionHeader({
  action,
  align = "center",
  className,
  description,
  eyebrow,
  title,
}: {
  action?: ReactNode;
  align?: "center";
  className?: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex gap-4",
        align === "center"
          ? "mx-auto max-w-2xl flex-col items-center text-center"
          : "flex-col items-start justify-between sm:flex-row sm:items-end",
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-black tracking-[-0.03em] text-slate-950 sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
