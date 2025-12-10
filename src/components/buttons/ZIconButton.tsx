"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import ZButton from "./ZButton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ZIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: Components.ButtonVariant;
  size?: Components.ButtonSize;
  tooltip?: string;

  isPending?: boolean;
}

export default function ZIconButton({
  icon,
  variant = "default",
  size = "md",
  tooltip,
  className,
  children,
  isPending = false,
  disabled,
  ...props
}: ZIconButtonProps) {
  const sizeClasses: Record<Components.ButtonSize, string> = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const button = (
    <ZButton
      {...props}
      variant={variant}
      size={size}
      disabled={disabled || isPending}
      isPending={isPending}
      className={cn(
        "p-0 rounded-full flex items-center justify-center",
        sizeClasses[size],
        className
      )}
    >
      {icon}
      {children}
    </ZButton>
  );

  if (!tooltip) return button;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
