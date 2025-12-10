import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";

type Variant = "table" | "card" | "list";
type Orientation = "vertical" | "horizontal";

export interface ZSkeletonProps {
  variant?: Variant;
  rows?: number;
  cols?: number;
  showHeader?: boolean;
  avatar?: boolean;
  animate?: boolean;
  className?: string;
  orientation?: Orientation;
}

export function ZSkeleton({
  variant = "list",
  rows = 3,
  cols = 3,
  showHeader = true,
  avatar = false,
  animate = true,
  className,
  orientation = "vertical",
}: ZSkeletonProps) {
  const skeletonBase = cn(
    "bg-muted",
    animate ? "animate-pulse" : "animate-none"
  );

  if (variant === "table") {
    return (
      <div className={cn("w-full", className)}>
        {showHeader && (
          <div
            className={cn(
              "grid gap-3 mb-2",
              orientation === "horizontal"
                ? "grid-flow-col auto-cols-min"
                : `grid-cols-${cols}`
            )}
          >
            {[...Array(cols)].map((_, i) => (
              <Skeleton
                key={i}
                className={cn(
                  "h-5",
                  orientation === "horizontal" ? "w-32" : "w-full",
                  skeletonBase
                )}
              />
            ))}
          </div>
        )}

        {[...Array(rows)].map((_, rowIndex) => (
          <div
            key={rowIndex}
            className={cn(
              "grid gap-3",
              orientation === "horizontal"
                ? "grid-flow-col auto-cols-min"
                : `grid-cols-${cols}`
            )}
          >
            {[...Array(cols)].map((_, colIndex) => (
              <Skeleton
                key={colIndex}
                className={cn(
                  "h-5",
                  orientation === "horizontal" ? "w-32" : "w-full",
                  skeletonBase
                )}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div
        className={cn(
          orientation === "horizontal" ? "flex space-x-4" : "space-y-4",
          className
        )}
      >
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3",
              orientation === "horizontal"
                ? "flex-col items-start w-40"
                : "flex-row"
            )}
          >
            {avatar && (
              <Skeleton
                className={cn(
                  orientation === "horizontal"
                    ? "h-16 w-16 rounded-full"
                    : "h-10 w-10 rounded-full",
                  skeletonBase
                )}
              />
            )}
            <div
              className={cn(
                "space-y-2",
                orientation === "horizontal" ? "space-y-1" : ""
              )}
            >
              <Skeleton
                className={cn(
                  "h-4",
                  orientation === "horizontal" ? "w-32" : "w-3/4",
                  skeletonBase
                )}
              />
              <Skeleton
                className={cn(
                  "h-4",
                  orientation === "horizontal" ? "w-24" : "w-1/2",
                  skeletonBase
                )}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={cn(
          orientation === "horizontal" ? "flex space-x-4" : "space-y-4",
          className
        )}
      >
        {[...Array(rows)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border p-4 space-y-3",
              orientation === "horizontal"
                ? "flex flex-col md:flex-row md:space-x-4 items-start md:items-center w-72"
                : ""
            )}
          >
            {avatar && (
              <Skeleton
                className={cn("h-16 w-16 rounded-full", skeletonBase)}
              />
            )}
            <div className="space-y-2 flex-1">
              <Skeleton
                className={cn(
                  "h-5",
                  orientation === "horizontal" ? "w-32" : "w-3/4",
                  skeletonBase
                )}
              />
              <Skeleton
                className={cn(
                  "h-4",
                  orientation === "horizontal" ? "w-48" : "w-full",
                  skeletonBase
                )}
              />
              <Skeleton
                className={cn(
                  "h-4",
                  orientation === "horizontal" ? "w-40" : "w-4/5",
                  skeletonBase
                )}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
