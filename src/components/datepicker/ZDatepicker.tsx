"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export interface ZDatepickerProps {
  label?: string;
  error?: string;
  value?: Date | undefined;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  mode?: "date" | "month" | "year";
}

export const ZDatepicker = React.forwardRef<HTMLInputElement, ZDatepickerProps>(
  (
    {
      label,
      error,
      value,
      onChange,
      placeholder = "DD-MM-YYYY",
      disabled = false,
      className,
      mode = "date",
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const [localError, setLocalError] = React.useState<string | null>(null);

    // Separate state for month view
    const [monthView, setMonthView] = React.useState<Date | undefined>(
      value ?? new Date()
    );

    /**
     * Sync month view with external value
     */
    React.useEffect(() => {
      if (value) {
        setMonthView(value);
      }
    }, [value]);

    /**
     * Sync input display with value
     */
    React.useEffect(() => {
      if (!value) {
        setText("");
        return;
      }

      if (mode === "year") {
        setText(dayjs(value).format("YYYY"));
      } else if (mode === "month") {
        setText(dayjs(value).format("MM-YYYY"));
      } else {
        setText(dayjs(value).format("DD-MM-YYYY"));
      }

      setLocalError(null);
    }, [value, mode]);

    /**
     * Parse typed string input
     */
    const parseInput = (raw: string) => {
      const clean = raw.trim();

      const formats =
        mode === "year"
          ? ["YYYY"]
          : mode === "month"
          ? ["MM-YYYY", "M-YYYY"]
          : ["DD-MM-YYYY", "D-M-YYYY", "DD/MM/YYYY", "D/M/YYYY"];

      const parsed = dayjs(clean, formats, true);
      return parsed.isValid() ? parsed : null;
    };

    /**
     * Handle blur on input field
     */
    const handleBlur = () => {
      if (!text) {
        setLocalError(null);
        onChange?.(undefined);
        return;
      }

      const parsed = parseInput(text);

      if (!parsed) {
        setLocalError("Tanggal tidak valid");
        return;
      }

      const date = parsed.toDate();

      if (mode === "month") {
        date.setDate(1);
      } else if (mode === "year") {
        date.setMonth(0);
        date.setDate(1);
      }

      onChange?.(date);

      setText(
        mode === "year"
          ? parsed.format("YYYY")
          : mode === "month"
          ? parsed.format("MM-YYYY")
          : parsed.format("DD-MM-YYYY")
      );

      setLocalError(null);
    };

    /**
     * Handle calendar selection
     */
    const handleSelect = (date: Date | undefined) => {
      if (!date) return;

      if (mode === "month") {
        date = new Date(date.getFullYear(), date.getMonth(), 1);
      } else if (mode === "year") {
        date = new Date(date.getFullYear(), 0, 1);
      }

      onChange?.(date);

      // Close only when choosing date
      if (mode === "date") {
        setOpen(false);
      }

      setLocalError(null);
    };

    return (
      <div className="flex flex-col w-full gap-1">
        {label && (
          <label className="text-sm font-medium text-foreground select-none">
            {label}
          </label>
        )}

        <div className="relative flex w-full">
          <Input
            ref={ref}
            value={text}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(e) => {
              setText(e.target.value);
              setLocalError(null);
            }}
            onBlur={handleBlur}
            className={cn(
              "pr-10",
              localError && "border-red-500 focus-visible:ring-red-500",
              className
            )}
          />

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                disabled={disabled}
                className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              >
                <CalendarIcon className="size-3.5" />
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-0"
              align="start"
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={value}
                onSelect={handleSelect}
                // Controlled month view
                month={monthView}
                onMonthChange={setMonthView}
                captionLayout="dropdown"
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        {(error || localError) && (
          <p className="text-xs text-red-500">{localError ?? error}</p>
        )}
      </div>
    );
  }
);

ZDatepicker.displayName = "ZDatepicker";
