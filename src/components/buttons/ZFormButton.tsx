"use client";

import * as React from "react";
import ZButton from "@/components/buttons/ZButton";
import { Check, RotateCcw, Loader2 } from "lucide-react";

interface ZFormButtonProps {
  isPending?: boolean;
  submitLabel?: string;
  resetLabel?: string;
  onReset?: () => void;
  className?: string;
  isEditing?: boolean;
}

export const ZFormButton: React.FC<ZFormButtonProps> = ({
  isPending = false,
  submitLabel,
  resetLabel = "Reset",
  onReset,
  className = "",
  isEditing = false,
}) => {
  const finalSubmitLabel =
    submitLabel ?? (isEditing ? "Simpan Perubahan" : "Simpan");

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      {/* Tombol Reset */}
      <ZButton
        type="button"
        variant="ghost"
        className="flex-1 w-full flex items-center justify-center gap-2
                   text-rose-300 hover:text-white hover:shadow-[0_0_10px_#ff3c78]"
        onClick={onReset}
        disabled={isPending}
      >
        <RotateCcw className="w-4 h-4" />
        {resetLabel}
      </ZButton>

      {/* Tombol Submit */}
      <ZButton
        type="submit"
        className={`flex-1 w-full flex items-center justify-center gap-2 ${
          isEditing
            ? "bg-linear-to-r from-amber-700 to-amber-900 text-black shadow-[0_0_10px_#ffdd55] hover:shadow-[0_0_16px_#ffdd55]"
            : "bg-linear-to-r from-rose-800 to-rose-950 text-white shadow-[0_0_8px_#ff3c78] hover:shadow-[0_0_16px_#ff3c78]"
        }`}
        isPending={isPending}
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-white" />
            Menyimpan...
          </>
        ) : (
          <>
            <Check className="w-4 h-4" />
            {finalSubmitLabel}
          </>
        )}
      </ZButton>
    </div>
  );
};
