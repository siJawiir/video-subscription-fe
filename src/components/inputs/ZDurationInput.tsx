"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { ZTextInput } from "./ZTextInput";
import { cn } from "@/lib/utils";

interface ZDurationInputProps {
  value?: number;
  onChange?: (valueInSeconds: number) => void;
  onBlur?: () => void;
}

const presetOptions = [
  { label: "30 minutes", value: 0.5 * 3600 },
  { label: "1 hour", value: 1 * 3600 },
  { label: "2 hours", value: 2 * 3600 },
];
interface ZDurationInputProps {
  value?: number;
  onChange?: (valueInSeconds: number) => void;
  onBlur?: () => void;
  onPresetSelect?: (valueInSeconds: number) => void;
}

export const ZDurationInput: React.FC<ZDurationInputProps> = ({
  value,
  onChange,
  onBlur,
  onPresetSelect,
}) => {
  const [currentValueSeconds, setCurrentValueSeconds] = React.useState<number>(
    value || 0.5 * 3600
  );
  const [manualInputHours, setManualInputHours] = React.useState<string>(
    (currentValueSeconds / 3600).toString()
  );
  const [isEditingManually, setIsEditingManually] = React.useState(false);

  React.useEffect(() => {
    setCurrentValueSeconds(value || 0.5 * 3600);
    setManualInputHours(((value || 0.5 * 3600) / 3600).toString());
  }, [value]);

  const handlePresetClick = (seconds: number) => {
    setCurrentValueSeconds(seconds);
    setManualInputHours((seconds / 3600).toString());
    setIsEditingManually(false);
    onChange?.(seconds);
    onPresetSelect?.(seconds); // langsung trigger submit khusus preset
  };

  const handleManualChange = (valStr: string) => {
    setManualInputHours(valStr);
    setIsEditingManually(true);

    const valNum = Number(valStr);
    if (!isNaN(valNum) && valNum >= 0) {
      const seconds = valNum * 3600;
      setCurrentValueSeconds(seconds);
      onChange?.(seconds); // update value tapi submit hanya onBlur
    }
  };

  const handleManualBlur = () => {
    if (isEditingManually) {
      onBlur?.();
      setIsEditingManually(false);
    }
  };

  const matchedPreset = presetOptions.find(
    (opt) => opt.value === currentValueSeconds
  );

  return (
    <div className="flex flex-col w-full space-y-2">
      <div className="flex flex-wrap gap-2">
        {presetOptions.map((opt) => {
          const isSelected = matchedPreset?.value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handlePresetClick(opt.value)}
              className={cn(
                "flex items-center gap-1 px-4 py-1 rounded-lg border font-medium transition-all duration-200",
                isSelected
                  ? "bg-indigo-800 text-white border-indigo-800 shadow-md"
                  : "bg-zinc-900 text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500"
              )}
            >
              {opt.label}
              {isSelected && <Check className="w-4 h-4" />}
            </button>
          );
        })}

        <div
          className={cn(
            "flex items-center gap-1 px-3 py-0.5 rounded-lg border transition-all duration-200",
            !matchedPreset
              ? "bg-indigo-800 border-indigo-800 shadow-md"
              : "bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500"
          )}
        >
          <ZTextInput
            type="number"
            value={manualInputHours}
            onChange={(e) => handleManualChange(e.target.value)}
            onBlur={handleManualBlur}
            className="w-24 bg-transparent border-none px-0 py-0 text-white placeholder-zinc-400 focus:ring-0"
          />
          <span className={!matchedPreset ? "text-white" : "text-zinc-300"}>
            hours
          </span>
          {!matchedPreset && <Check className="w-4 h-4 text-white" />}
        </div>
      </div>
    </div>
  );
};
