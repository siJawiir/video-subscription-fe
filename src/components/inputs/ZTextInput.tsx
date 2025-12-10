"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";

interface ZTextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | FieldError;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  required?: boolean;
}

export const ZTextInput = React.forwardRef<HTMLInputElement, ZTextInputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = "left",
      className,
      required,
      ...props
    },
    ref
  ) => {
    const hasIcon = !!icon;

    const errorMessage = typeof error === "string" ? error : error?.message;

    return (
      <div className="flex flex-col w-full">
        {/* Label */}
        {label && (
          <label
            className={cn(
              "mb-1 text-xs font-semibold tracking-widest uppercase flex items-center gap-1",
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

        {/* Input Container */}
        <div className="relative w-full">
          {icon && iconPosition === "left" && (
            <span
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none",
                errorMessage ? "text-red-500" : "text-red-400/60"
              )}
            >
              {icon}
            </span>
          )}

          <Input
            ref={ref}
            {...props}
            className={cn(
              "w-full bg-black/60 border border-red-900/40 text-red-200 placeholder-red-300/40",
              "transition-colors duration-200",
              "focus-visible:border-red-600 focus-visible:ring-red-600 focus-visible:ring-2",
              "hover:border-red-600/70",

              hasIcon && iconPosition === "left" && "pl-10",
              hasIcon && iconPosition === "right" && "pr-10",

              errorMessage &&
                "border-red-600 text-red-400 placeholder-red-500 focus-visible:ring-red-700",

              "rounded-xl shadow-[inset_0_0_8px_rgba(255,0,0,0.4)]",

              className
            )}
          />

          {icon && iconPosition === "right" && (
            <span
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
                errorMessage ? "text-red-500" : "text-red-400/60"
              )}
            >
              {icon}
            </span>
          )}
        </div>

        {/* Error */}
        {errorMessage && (
          <p className="mt-1 text-xs tracking-wide text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

ZTextInput.displayName = "ZTextInput";
