"use client";

import { ZOptionInput } from "@/components/inputs";
import { STATUS_OPTIONS } from "@/constants/options";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface StatusOptionProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const StatusOption = <T extends FieldValues>({
  control,
  name,
  label = "Status",
  placeholder = "Pilih status",
  disabled = false,
}: StatusOptionProps<T>) => {


  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <ZOptionInput
          label={label}
          required
          placeholder={placeholder}
          options={STATUS_OPTIONS}
          value={field.value?.toString()}
          onValueChange={(val) => field.onChange(Number(val))}
          disabled={disabled}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};
