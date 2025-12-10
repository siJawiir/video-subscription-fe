"use client";

import { FlipHorizontal } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ZFlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  frontIcon?: React.ReactNode;
  backIcon?: React.ReactNode;
  frontTooltip?: string;
  backTooltip?: string;
}

export function ZFlipCard({
  front,
  back,
  frontIcon = <FlipHorizontal size={18} />,
  backIcon = <FlipHorizontal size={18} />,
  frontTooltip = "Flip to back",
  backTooltip = "Flip to front",
}: ZFlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const buttonClass =
    "absolute -bottom-11 right-3 border text-rose-600 border-rose-600 hover:bg-rose-50 hover:text-rose-700 p-2 rounded-full shadow-md transition cursor-pointer";

  return (
    <TooltipProvider>
      <div className="relative w-full h-full select-none">
        <div
          className={`
            transition-transform duration-700 transform-style-preserve-3d 
            w-full h-full relative
            ${flipped ? "rotate-y-180" : ""}
          `}
        >
          {/* FRONT */}
          <div className="absolute inset-0 backface-hidden">
            {front}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={buttonClass}
                  onClick={() => setFlipped(true)}
                >
                  {frontIcon}
                </button>
              </TooltipTrigger>
              <TooltipContent>{frontTooltip}</TooltipContent>
            </Tooltip>
          </div>

          {/* BACK */}
          <div className="absolute inset-0 rotate-y-180 backface-hidden">
            {back}

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className={buttonClass}
                  onClick={() => setFlipped(false)}
                >
                  {backIcon}
                </button>
              </TooltipTrigger>
              <TooltipContent>{backTooltip}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
