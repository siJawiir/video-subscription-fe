"use client";

import { ZButton } from "@/components/buttons";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Plus } from "lucide-react";
import { ReactNode } from "react";
import CardHeader from "../layout/CardHeader";
import { cn } from "@/lib/utils";

interface MasterFormTemplateProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  addLabel?: string;
  children: ReactNode;
}

export default function MasterFormTemplate({
  title = "Master Data",
  subtitle,
  isOpen,
  onToggle,
  addLabel = "Add",
  children,
}: MasterFormTemplateProps) {
  return (
    <div className="space-y-4">
      <Collapsible open={isOpen}>
        <div
          className={cn(
            "flex justify-between items-center bg-linear-to-r from-black via-red-900 to-black p-4  shadow-2xl border border-red-800",
            isOpen ? "rounded-t-xl" : "rounded-xl"
          )}
        >
          <CardHeader title={title} subtitle={subtitle} />

          <CollapsibleTrigger asChild>
            <ZButton
              onClick={onToggle}
              className="flex items-center gap-2 text-lg"
            >
              {isOpen ? "Close" : addLabel}
              <Plus
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </ZButton>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="p-6 rounded-b-xl shadow-inner border border-red-800 text-gray-100 transition-all duration-300">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
