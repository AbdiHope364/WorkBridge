import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  label?: string;
  isValid?: boolean;
  validMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      error,
      helperText,
      id,
      label,
      isValid,
      validMessage,
      ...props
    },
    ref,
  ) => {
    const inputId = id ?? props.name;
    const validationClass = error
      ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100"
      : isValid
        ? "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-100"
        : "";

    return (
      <label className="block">
        {label ? (
          <span className="mb-1.5 block text-sm font-bold text-slate-900">
            {label}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-10 w-full rounded-lg border border-slate-300 bg-white px-5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            validationClass,
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
        {error ? (
          <span className="mt-1.5 block text-xs font-medium text-rose-600">
            {error}
          </span>
        ) : validMessage ? (
          <span className="mt-1.5 block text-xs font-medium text-emerald-600">
            {validMessage}
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

Input.displayName = "Input";
