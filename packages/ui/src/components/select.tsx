import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  helperText?: string;
  label?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, className, error, helperText, id, label, ...props }, ref) => {
    const selectId = id ?? props.name;

    return (
      <label className="block">
        {label ? (
          <span className="mb-1.5 block text-sm font-bold text-slate-900">
            {label}
          </span>
        ) : null}
        <select
          ref={ref}
          id={selectId}
          className={cn(
            "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error
              ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
              : "",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        >
          {children}
        </select>
        {error ? (
          <span className="mt-1.5 block text-xs font-medium text-rose-600">
            {error}
          </span>
        ) : helperText ? (
          <span className="mt-1.5 block text-xs text-slate-500">
            {helperText}
          </span>
        ) : null}
      </label>
    );
  },
);

Select.displayName = "Select";
