"use client";

import { cn } from "@/lib/utils";
import { ImagePlay } from "lucide-react";
import Image, { ImageProps } from "next/image";

interface ZImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

export default function ZImage({
  src,
  alt,
  className,
  fallback,
  ...rest
}: ZImageProps) {
  if (!src) {
    return (
      fallback ?? (
        <div
          className={cn(
            "bg-linear-to-br from-zinc-800 to-zinc-700 flex flex-col items-center justify-center text-white text-sm rounded-xl",
            className
          )}
        >
          <ImagePlay className="w-10 h-10 mb-2 text-zinc-400" />
          No Image
        </div>
      )
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("rounded-xl object-cover", className)}
      {...rest}
      unoptimized
    />
  );
}
