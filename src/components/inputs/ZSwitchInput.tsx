"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { FieldError } from "react-hook-form";

interface ZSwitchInputProps
  extends React.ComponentPropsWithoutRef<typeof Switch> {
  label?: string;
  error?: string | FieldError;
  description?: string;
  required?: boolean;
}

export const ZSwitchInput = React.forwardRef<
  HTMLButtonElement,
  ZSwitchInputProps
>(({ label, error, description, required, className, ...props }, ref) => {
  const errorMessage = typeof error === "string" ? error : error?.message;

  return (
    <div className="flex flex-col w-full gap-2">
      {/* Label */}
      {label && (
        <label
          className={cn(
            "text-xs font-semibold tracking-widest uppercase flex items-center gap-1",
            errorMessage
              ? "text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]"
              : "text-red-300/80"
          )}
        >
          {label}
          {required && (
            <span className="text-red-500 drop-shadow-[0_0_4px_rgba(255,0,0,0.8)]">
              *
            </span>
          )}
        </label>
      )}

      {/* Switch + description */}
      <div className="flex items-center gap-3">
        <Switch
          ref={ref}
          {...props}
          className={cn(
            // Base
            "cursor-pointer border border-red-900/40 shadow-[0_0_10px_rgba(255,0,0,0.4)]",
            "data-[state=checked]:bg-red-600",
            "data-[state=checked]:border-red-600",
            "data-[state=checked]:shadow-[0_0_15px_rgba(255,0,0,0.7)]",
            "data-[state=unchecked]:bg-black/60",

            // Error
            errorMessage &&
              "border-red-600 shadow-[0_0_12px_rgba(255,0,0,0.8)] ring-2 ring-red-600",

            className
          )}
        />

        {description && (
          <p className="text-xs text-red-400/60 tracking-wide">
            {description}
          </p>
        )}
      </div>

      {/* Error */}
      {errorMessage && (
        <p className="text-xs tracking-wide text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]">
          {errorMessage}
        </p>
      )}
    </div>
  );
});

ZSwitchInput.displayName = "ZSwitchInput";
