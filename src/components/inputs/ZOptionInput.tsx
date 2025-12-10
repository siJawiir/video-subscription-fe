"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiGetService } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { ResourceType } from "resource-types";
import { MASTER_RESOURCES } from "@/utils";

export interface ZOptionInputProps<TExtra extends object = object> {
  label?: string;
  error?: string;
  options?: ResourceType[];
  placeholder?: string;
  disabled?: boolean;
  value?: string | number | null;
  onValueChange?: (value: string) => void;
  className?: string;
  required?: boolean;
  async?: boolean;
  resource?: keyof typeof MASTER_RESOURCES;
  extraFilters?: TExtra;
  filter?: string;
  enableFetch?: boolean;
}

export const ZOptionInput = React.forwardRef(
  <TExtra extends object = object>(
    {
      label,
      error,
      options = [],
      placeholder = "Select option...",
      className = "",
      value,
      onValueChange,
      disabled,
      required,
      async: isAsync = false,
      resource,
      filter,
      extraFilters,
      enableFetch = true,
    }: ZOptionInputProps<TExtra>,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState("");

    const {
      data: fetchedOptions = [],
      isLoading,
      isError,
    } = useQuery<ResourceType[]>({
      queryKey: [
        `resource-${resource}`,
        resource,
        filter,
        search,
        extraFilters,
      ],
      queryFn: async () => {
        if (!resource) return [];
        const res = await apiGetService<{
          success: boolean;
          data: { data: ResourceType[] };
        }>({
          url: `/resources/${resource}`,
          params: {
            ...(search ? { search } : {}),
            ...(filter ? { filter } : {}),
            ...(extraFilters ?? {}),
          },
        });
        if (!res.success || !Array.isArray(res.data?.data)) return [];
        return res.data.data;
      },
      enabled: isAsync && !!resource && enableFetch,
    });

    const renderedOptions = React.useMemo(() => {
      if (isAsync) return fetchedOptions;
      if (search.trim().length > 0) {
        const lower = search.toLowerCase();
        return options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(lower) ||
            opt.description?.toLowerCase().includes(lower)
        );
      }
      return options;
    }, [isAsync, fetchedOptions, options, search]);

    const selectedOption = renderedOptions.find(
      (opt) => opt.value?.toString() === value?.toString()
    );

    return (
      <div className="flex flex-col w-full">
        {/* Label */}
        {label && (
          <label
            className={cn(
              "mb-1 text-xs font-semibold tracking-widest uppercase flex items-center gap-1",
              error
                ? "text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]"
                : "text-red-300/80"
            )}
          >
            {label}
            {required && (
              <span className="text-red-500 drop-shadow-[0_0_4px_rgba(255,0,0,0.8)]">
                *
              </span>
            )}
          </label>
        )}

        {/* Trigger */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              disabled={disabled}
              aria-expanded={open}
              className={cn(
                "w-full justify-between text-red-200",
                "bg-black/60 border border-red-900/40 rounded-xl",
                "shadow-[0_0_10px_rgba(255,0,0,0.4)]",
                "hover:border-red-600 hover:shadow-[0_0_12px_rgba(255,0,0,0.6)]",
                "transition-all duration-200",

                error &&
                  "border-red-600 shadow-[0_0_12px_rgba(255,0,0,0.8)]",

                className
              )}
              onClick={() => setOpen(!open)}
            >
              {selectedOption ? (
                <span className="font-medium">{selectedOption.label}</span>
              ) : isLoading ? (
                "Memuat data..."
              ) : isError ? (
                "Gagal memuat data"
              ) : (
                <span className="text-red-300/50">{placeholder}</span>
              )}

              <ChevronsUpDown className="opacity-70 h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>

          {/* Popover Content */}
          <PopoverContent
            align="start"
            className="p-0 w-full bg-black/95 border border-red-900/60 rounded-xl shadow-[0_0_20px_rgba(255,0,0,0.4)]"
          >
            <Command
              shouldFilter={false}
              className="bg-transparent text-red-200"
            >
              {/* Search Input */}
              <CommandInput
                placeholder="Cari..."
                value={search}
                onValueChange={setSearch}
                className="h-9 text-red-200 placeholder-red-300/40 bg-black/60 border-red-900/40 focus:border-red-600 focus:ring-red-600"
              />

              {/* List */}
              <CommandList>
                {isLoading ? (
                  <CommandEmpty className="text-red-300/60">
                    Memuat...
                  </CommandEmpty>
                ) : isError ? (
                  <CommandEmpty className="text-red-300/60">
                    Gagal memuat
                  </CommandEmpty>
                ) : renderedOptions.length === 0 ? (
                  <CommandEmpty className="text-red-300/60">
                    Tidak ada data
                  </CommandEmpty>
                ) : (
                  <CommandGroup className="bg-black/10">
                    {renderedOptions.map((opt) => (
                      <CommandItem
                        key={opt.value?.toString()}
                        value={opt.value?.toString()}
                        onSelect={(currValue) => {
                          onValueChange?.(currValue);
                          setOpen(false);
                        }}
                        className={cn(
                          "cursor-pointer text-red-200",
                          "hover:bg-red-600/20 hover:text-red-100",
                          "transition-colors"
                        )}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value?.toString() === opt.value?.toString()
                              ? "opacity-100 text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.8)]"
                              : "opacity-0"
                          )}
                        />
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {opt.label}
                          </span>
                          {opt.description && (
                            <span className="text-xs text-red-300/50">
                              {opt.description}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Error */}
        {error && (
          <p className="mt-1 text-xs tracking-wide text-red-500 drop-shadow-[0_0_6px_rgba(255,0,0,0.5)]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

ZOptionInput.displayName = "ZOptionInput";
