import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  helperText?: string;
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, id, label, ...props }, ref) => {
    const textareaId = id ?? props.name;

    return (
      <label className="block">
        {label ? (
          <span className="mb-1.5 block text-sm font-bold text-slate-900">
            {label}
          </span>
        ) : null}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-28 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500",
            error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-100" : "",
            className,
          )}
          aria-invalid={error ? true : undefined}
          {...props}
        />
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

Textarea.displayName = "Textarea";
