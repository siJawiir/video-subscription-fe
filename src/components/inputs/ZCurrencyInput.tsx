"use client";

import * as React from "react";
import { ZTextInput } from "./ZTextInput";

interface ZCurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: number;
  onValueChange?: (value: number) => void;
  locale?: string;
  currency?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  required?: boolean;
  label?: string;
}

export const ZCurrencyInput = React.forwardRef<
  HTMLInputElement,
  ZCurrencyInputProps
>(
  (
    {
      value = 0,
      onValueChange,
      locale = "en-US",
      currency = "IDR",
      error,
      icon,
      iconPosition = "left",
      label,
      required,
      ...props
    },
    ref
  ) => {
    const [mounted, setMounted] = React.useState(false);
    const [raw, setRaw] = React.useState<string>(String(value ?? 0));

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      setRaw(String(value ?? 0));
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      const cleaned = input.replace(/[^\d.,]/g, "");
      setRaw(cleaned);

      const numberValue = Number(cleaned.replace(/,/g, ""));
      if (!isNaN(numberValue) && onValueChange) {
        onValueChange(numberValue);
      }
    };

    const displayValue = mounted
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(Number(raw.replace(/,/g, "")) || 0)
      : String(value);

    return (
      <div className="flex flex-col w-full">
        <ZTextInput
          {...props}
          ref={ref}
          value={displayValue}
          onChange={handleChange}
          inputMode="numeric"
          icon={icon}
          iconPosition={iconPosition}
          label={label}
          required={required}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

ZCurrencyInput.displayName = "ZCurrencyInput";
