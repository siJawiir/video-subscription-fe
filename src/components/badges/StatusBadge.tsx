// components/StatusBadge.tsx
"use client";

import React from "react";
import { LucideCheck, LucideX } from "lucide-react";

interface StatusOption {
  label: string;
  color: ColorName;
  icon?: React.ReactNode;
}

type ColorName =
  | "green"
  | "emerald"
  | "rose"
  | "red"
  | "gray"
  | "stone"
  | "amber"
  | "violet"
  | "pink";

interface StatusBadgeProps {
  status: number;
  data?: StatusOption[];
}

const colorMap: Record<ColorName, string> = {
  green: "text-green-800 bg-green-100",
  emerald: "text-emerald-800 bg-emerald-100",
  rose: "text-rose-800 bg-rose-100",
  red: "text-red-800 bg-red-100",
  gray: "text-gray-800 bg-gray-100",
  stone: "text-stone-800 bg-stone-100",
  amber: "text-amber-800 bg-amber-100",
  violet: "text-violet-800 bg-violet-100",
  pink: "text-pink-800 bg-pink-100",
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, data }) => {
  const defaultData: StatusOption[] = [
    {
      label: "Tidak Aktif",
      color: "red",
      icon: <LucideX size={16} />,
    },
    {
      label: "Aktif",
      color: "green",
      icon: <LucideCheck size={16} />,
    },
  ];

  const source = data ?? defaultData;
  const selected = source[status] ?? {
    label: "Status Tidak Dikenal",
    color: "gray" as ColorName,
  };

  const colorClass = colorMap[selected.color] ?? colorMap.gray;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full font-semibold text-sm ${colorClass}`}
    >
      {selected.icon}
      {selected.label}
    </span>
  );
};
