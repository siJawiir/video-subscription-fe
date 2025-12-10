import React from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface ZSpinnerProps extends React.ComponentProps<typeof Spinner> {
  fullPage?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "default" | "rose" | "emerald" | "rose";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  message?: string;
}

export function ZSpinner({
  fullPage = false,
  size = "md",
  color = "default",
  className = "",
  message,
  ...props
}: ZSpinnerProps) {
  const sizeClassMap: Record<string, string> = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const colorClassMap: Record<string, string> = {
    default: "text-current",
    rose: "text-rose-500",
    emerald: "text-emerald-500",
    rose: "text-rose-500",
  };

  const spinnerSizeClass = sizeClassMap[size] || sizeClassMap.md;
  const spinnerColorClass = colorClassMap[color] || colorClassMap.default;

  if (fullPage) {
    return (
      <div
        className={cn(
          "fixed inset-0 flex items-center justify-center z-50 w-screen h-screen",
          className
        )}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <div className="flex flex-col items-center gap-4 bg-gray-300 dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <Spinner
            className={cn(spinnerSizeClass, spinnerColorClass)}
            {...props}
          />
          {message && (
            <div className="text-base text-gray-800 dark:text-gray-100">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center", className)}>
      <Spinner className={cn(spinnerSizeClass, spinnerColorClass)} {...props} />
      {message && <span className="ml-2 text-sm text-gray-600">{message}</span>}
    </div>
  );
}
