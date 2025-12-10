"use client";

import * as React from "react";
import { ZDatepicker } from "./ZDatepicker";

export interface ZDatepickerRangeValue {
  start?: Date | undefined;
  end?: Date | undefined;
}

interface ZDatepickerRangeProps {
  label?: string;
  error?: string;
  value?: ZDatepickerRangeValue;
  onChange?: (value: ZDatepickerRangeValue) => void;
  placeholderStart?: string;
  placeholderEnd?: string;
  disabled?: boolean;
  className?: string;
  mode?: "date" | "month" | "year"; // ✅ mode baru
}

export const ZDatepickerRange: React.FC<ZDatepickerRangeProps> = ({
  label,
  error,
  value = { start: undefined, end: undefined },
  onChange,
  placeholderStart = "Pilih tanggal mulai",
  placeholderEnd = "Pilih tanggal akhir",
  disabled = false,
  className,
  mode = "date",
}) => {
  const handleStartChange = (date: Date | undefined) => {
    if (value.end && date && date > value.end) {
      onChange?.({ start: date, end: date });
    } else {
      onChange?.({ ...value, start: date });
    }
  };

  const handleEndChange = (date: Date | undefined) => {
    if (value.start && date && date < value.start) {
      onChange?.({ start: date, end: date });
    } else {
      onChange?.({ ...value, end: date });
    }
  };

  return (
    <div className={`flex flex-col w-full ${className || ""}`}>
      {label && (
        <label className="mb-1 text-sm font-medium select-none">{label}</label>
      )}

      <div className="flex flex-col sm:flex-row gap-2">
        <ZDatepicker
          value={value.start}
          onChange={handleStartChange}
          placeholder={placeholderStart}
          disabled={disabled}
          mode={mode} 
        />
        <ZDatepicker
          value={value.end}
          onChange={handleEndChange}
          placeholder={placeholderEnd}
          disabled={disabled}
          mode={mode} 
        />
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

ZDatepickerRange.displayName = "ZDatepickerRange";
