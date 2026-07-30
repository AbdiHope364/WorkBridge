import { type HTMLAttributes } from "react";
import { cn } from "../lib/cn";

type BadgeVariant =
  | "brand"
  | "danger"
  | "info"
  | "neutral"
  | "success"
  | "warning";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  brand: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  danger: "bg-rose-50 text-rose-700 ring-rose-100",
  info: "bg-sky-50 text-sky-700 ring-sky-100",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  success: "bg-green-50 text-green-700 ring-green-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
};

export function Badge({
  children,
  className,
  variant = "brand",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
