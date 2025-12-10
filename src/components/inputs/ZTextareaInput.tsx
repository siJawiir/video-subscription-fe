"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ZTextareaInputProps
  extends React.ComponentPropsWithoutRef<typeof Textarea> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  required?: boolean;
}

export const ZTextareaInput = React.forwardRef<
  HTMLTextAreaElement,
  ZTextareaInputProps
>(
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

    return (
      <div className="flex flex-col w-full">
        {/* Label */}
        {label && (
          <label
            className={cn(
              "mb-1 text-xs font-semibold tracking-widest uppercase flex items-center gap-1",
              error
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

        {/* Container */}
        <div className="relative w-full">

          {/* Icon Left */}
          {icon && iconPosition === "left" && (
            <span
              className={cn(
                "absolute left-3 top-3 pointer-events-none",
                error ? "text-red-500" : "text-red-400/60"
              )}
            >
              {icon}
            </span>
          )}

          {/* Textarea */}
          <Textarea
            ref={ref}
            {...props}
            className={cn(
              "w-full bg-black/60 text-red-200 placeholder-red-300/40",
              "border border-red-900/40 rounded-xl shadow-[inset_0_0_8px_rgba(255,0,0,0.4)]",
              "transition-all duration-200",
              "focus-visible:border-red-600 focus-visible:ring-red-600 focus-visible:ring-2",
              "hover:border-red-600/70",

              hasIcon && iconPosition === "left" && "pl-10",
              hasIcon && iconPosition === "right" && "pr-10",

              error &&
                "border-red-600 text-red-400 placeholder-red-500 focus-visible:ring-red-700",

              className
            )}
          />

          {/* Icon Right */}
          {icon && iconPosition === "right" && (
            <span
              className={cn(
                "absolute right-3 top-3 pointer-events-none",
                error ? "text-red-500" : "text-red-400/60"
              )}
            >
              {icon}
            </span>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="mt-1 text-xs tracking-wide text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ZTextareaInput.displayName = "ZTextareaInput";
