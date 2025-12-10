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
}

export default function ZIconButton({
  icon,
  variant = "default",
  size = "md",
  tooltip,
  className,
  children,
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

  // Jika tidak ada tooltip → langsung return button
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
