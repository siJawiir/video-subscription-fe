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
              "mb-1 text-xs font-semibold tracking-widest flex items-center gap-1",
              errorMessage ? "text-red-600" : "text-gray-300"
            )}
          >
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {icon && iconPosition === "left" && (
            <span
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400",
                errorMessage && "text-red-600"
              )}
            >
              {icon}
            </span>
          )}

          <Input
            ref={ref}
            {...props}
            className={cn(
              "w-full bg-black/10 border border-gray-600 rounded-lg transition-colors focus:border-rose-600 focus:ring-rose-600",
              hasIcon && iconPosition === "left" && "pl-10",
              hasIcon && iconPosition === "right" && "pr-10",
              errorMessage && "border-red-600 text-red-700 placeholder-red-400",
              className
            )}
          />

          {icon && iconPosition === "right" && (
            <span
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400",
                errorMessage && "text-red-600"
              )}
            >
              {icon}
            </span>
          )}
        </div>

        {/* Error */}
        {errorMessage && (
          <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
        )}
      </div>
    );
  }
);

ZTextInput.displayName = "ZTextInput";
