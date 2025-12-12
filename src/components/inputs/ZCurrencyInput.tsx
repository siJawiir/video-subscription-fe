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
    { value = 0, onValueChange, locale = "en-US", currency = "IDR", ...props },
    ref
  ) => {
    const [raw, setRaw] = React.useState<string>("");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const digitsToCents = (str: string) => {
      const onlyDigits = str.replace(/\D/g, "");
      if (!onlyDigits) return 0;
      return parseInt(onlyDigits, 10);
    };

    React.useEffect(() => {
      setRaw(String(value));
    }, [value]);

    const displayValue = mounted
      ? new Intl.NumberFormat(locale, {
          style: "currency",
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format((Number(raw) || 0) / 100)
      : String(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const digits = e.target.value.replace(/\D/g, "");
      setRaw(digits);

      if (onValueChange) {
        onValueChange(digitsToCents(digits));
      }
    };

    return (
      <ZTextInput
        {...props}
        ref={ref}
        value={displayValue}
        onChange={handleChange}
        inputMode="numeric"
      />
    );
  }
);

ZCurrencyInput.displayName = "ZCurrencyInput";
