"use client";

import { Smile, Meh, Frown, Laugh } from "lucide-react";
import { cn } from "@/lib/utils";

type GradeOption = {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
};

const options: GradeOption[] = [
  {
    label: "Kurang",
    value: 1,
    icon: <Frown size={24} />,
    color: "text-rose-500 bg-rose-100 border-rose-300",
    activeColor: "bg-rose-500 border-rose-500",
  },
  {
    label: "Cukup",
    value: 2,
    icon: <Meh size={24} />,
    color: "text-amber-500 bg-amber-100 border-amber-300",
    activeColor: "bg-amber-500 border-amber-500",
  },
  {
    label: "Baik",
    value: 3,
    icon: <Smile size={24} />,
    color: "text-emerald-500 bg-emerald-100 border-emerald-300",
    activeColor: "bg-emerald-500 border-emerald-500",
  },
  {
    label: "Sangat Baik",
    value: 4,
    icon: <Laugh size={24} />,
    color: "text-rose-500 bg-rose-100 border-rose-300",
    activeColor: "bg-rose-500 border-rose-500",
  },
];

interface ZGradeScoreProps {
  value?: number;
  onChange?: (value: number) => void;
}

export default function ZGradeScore({ value, onChange }: ZGradeScoreProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {options.map((opt) => {
        const isActive = value === opt.value;

        return (
          <button
            key={opt.value}
            onClick={() => onChange?.(opt.value)}
            className={cn(
              "flex flex-col lg:flex-row items-center gap-1 lg:gap-2 p-1 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none shadow-sm",
              opt.color,
              isActive &&
                `shadow-lg ring-2 ring-offset-2 ring-slate-500 ${opt.activeColor}`
            )}
          >
            <div
              className={cn(
                "transition-colors duration-200",
                isActive && "text-white"
              )}
            >
              {opt.icon}
            </div>
            <p
              className={cn("text-sm font-semibold", isActive && "text-white")}
            >
              {opt.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
