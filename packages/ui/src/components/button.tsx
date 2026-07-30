import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";
import { Spinner } from "./spinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  appName?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-emerald-700 text-white shadow-sm hover:bg-emerald-800",
  secondary: "bg-slate-950 text-white shadow-sm hover:bg-slate-800",
  outline:
    "border border-slate-300 bg-white text-slate-950 shadow-sm hover:border-slate-400 hover:bg-slate-50",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
  danger: "bg-rose-600 text-white shadow-sm hover:bg-rose-700",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 rounded-md px-3 text-xs",
  md: "h-10 rounded-lg px-4 text-sm",
  lg: "h-12 rounded-xl px-6 text-base",
  icon: "h-10 w-10 rounded-lg p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      appName,
      isLoading = false,
      leftIcon,
      rightIcon,
      size = "md",
      type = "button",
      variant = "primary",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;
    void appName;

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(
          "flex shrink-0 cursor-pointer items-center justify-center gap-2 p-4 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {isLoading ? <Spinner size="sm" /> : leftIcon}
        {size !== "icon" ? (
          children
        ) : (
          <span className="sr-only">{children}</span>
        )}
        {!isLoading ? rightIcon : null}
      </button>
    );
  },
);

Button.displayName = "Button";
