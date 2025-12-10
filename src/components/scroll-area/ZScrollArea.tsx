"use client";

import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ZScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  height?: string | number; // tambahkan props height
}

export default function ZScrollArea({
  className,
  children,
  height,
}: ZScrollAreaProps) {
  return (
    <ScrollArea
      className={cn(
        "w-full",
        height ? undefined : "h-full",
        className
      )}
      style={height ? { height } : undefined}
    >
      <div className="space-y-2">
        {children ?? (
          <div className="text-muted-foreground text-sm">No content</div>
        )}
      </div>
    </ScrollArea>
  );
}
