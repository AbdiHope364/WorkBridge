import { cn } from "../lib/cn";

type SpinnerSize = "sm" | "md" | "lg";

const sizeClasses: Record<SpinnerSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function Spinner({
  className,
  size = "md",
}: {
  className?: string;
  size?: SpinnerSize;
}) {
  return (
    <span
      aria-label="Loading"
      className={cn(
        "inline-block animate-spin rounded-full border-2 border-current border-r-transparent",
        sizeClasses[size],
        className,
      )}
      role="status"
    />
  );
}
