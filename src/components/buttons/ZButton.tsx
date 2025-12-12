"use client";

import { Button } from "@/components/ui/button"; // shadcn Button
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ZButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?:
    | Components.ButtonVariant
    | "destructive"
    | "success"
    | "warning"
    | "info";
  size?: Components.ButtonSize;
  isPending?: boolean;
  loadingText?: string;
}

export default function ZButton({
  children,
  className,
  variant = "default",
  size = "md",
  isPending = false,
  loadingText = "Loading...",
  disabled,
  ...props
}: ZButtonProps) {
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses: Record<NonNullable<ZButtonProps["variant"]>, string> = {
    default:
      "bg-gradient-to-r from-rose-800 to-rose-950 text-white font-bold shadow-[0_0_8px_#ff3c78] hover:shadow-[0_0_16px_#ff3c78] hover:brightness-110",
    outline:
      "bg-black/80 border hover:border-rose-700 text-rose-200 hover:text-white hover:shadow-[0_0_10px_#ff3c78]",
    ghost:
      "text-rose-200 hover:text-white hover:shadow-[0_0_6px_#ff3c78]",
    destructive:
      "bg-red-700 text-white shadow-[0_0_8px_#ff3c78] hover:shadow-[0_0_16px_#ff3c78]",
    success:
      "bg-green-700 text-white shadow-[0_0_6px_#22ff99] hover:shadow-[0_0_12px_#22ff99]",
    warning:
      "bg-amber-500 text-black shadow-[0_0_6px_#ffdd55] hover:shadow-[0_0_12px_#ffdd55]",
    info: "bg-rose-600 text-white shadow-[0_0_8px_#ff3c78] hover:shadow-[0_0_14px_#ff3c78]",
  };

  return (
    <Button
      {...props}
      disabled={isPending || disabled}
      className={cn(
        "cursor-pointer rounded-md font-bold transition-all flex items-center justify-center",
        variant !== "ghost" &&
          variant !== "outline" &&
          "drop-shadow-[0_0_2px_#ff3c78]",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {isPending && (
        <Loader2 className="animate-spin mr-2 h-4 w-4 text-white" />
      )}
      {isPending ? loadingText : children}
    </Button>
  );
}
