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
  addLabel = "Tambah",
  children,
}: MasterFormTemplateProps) {
  return (
    <div className="space-y-4">
      <Collapsible open={isOpen}>
        {/* Header + Trigger */}
        <div className="flex justify-between items-center">
          <CardHeader title={title} subtitle={subtitle} />

          <CollapsibleTrigger asChild>
            <ZButton
              onClick={onToggle}
              className={`
                flex items-center gap-2 text-white shadow-md rounded-lg transition-all duration-300
                ${
                  isOpen
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-sky-600 hover:bg-sky-700"
                }
              `}
            >
              {isOpen ? "Tutup" : addLabel}
              <Plus
                className={`w-4 h-4 transition-transform duration-300 ${
                  isOpen ? "rotate-45" : "rotate-0"
                }`}
              />
            </ZButton>
          </CollapsibleTrigger>
        </div>

        {/* Collapsible Content */}
        <CollapsibleContent className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300">
          {children}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
