"use client";

import * as React from "react";
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
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { apiGetService } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ResourceType } from "resource-types";
import { MASTER_RESOURCES } from "@/utils";

export interface ZMultiOptionInputProps<TExtra extends object = object> {
  label?: string;
  error?: string;
  options?: ResourceType[];
  placeholder?: string;
  disabled?: boolean;
  value?: ResourceType[] | null;
  onValueChange?: (value: ResourceType[]) => void;
  className?: string;
  required?: boolean;
  async?: boolean;
  resource?: keyof typeof MASTER_RESOURCES;
  extraFilters?: TExtra;
  filter?: string;
  enableFetch?: boolean;
}

export const ZMultiOptionInput = React.forwardRef(
  <TExtra extends object = object>(
    {
      label,
      error,
      options = [],
      placeholder = "Select options...",
      className = "",
      value = [],
      onValueChange,
      disabled,
      required,
      async: isAsync = false,
      resource,
      filter,
      extraFilters,
      enableFetch = true,
    }: ZMultiOptionInputProps<TExtra>,
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
        `${resource}-resources`,
        resource,
        filter,
        search,
        extraFilters,
      ],
      queryFn: async () => {
        if (!resource) return [];
        const res = await apiGetService<{
          success: boolean;
          data: ResourceType[];
        }>({
          url: `/${resource}-resources`,
          params: {
            ...(search ? { search } : {}),
            ...(filter ? { filter } : {}),
            ...(extraFilters ?? {}),
          },
        });
        if (!res.success || !Array.isArray(res.data)) return [];
        return res.data;
      },
      enabled: isAsync && !!resource && enableFetch,
    });

    const renderedOptions = React.useMemo(() => {
      if (isAsync) return fetchedOptions;
      if (search.trim()) {
        const lower = search.toLowerCase();
        return options.filter(
          (opt) =>
            opt.label.toLowerCase().includes(lower) ||
            opt.description?.toLowerCase().includes(lower)
        );
      }
      return options;
    }, [isAsync, fetchedOptions, options, search]);

    const toggleValue = (item: ResourceType) => {
      let newValues: ResourceType[];
      const currentValue = value || [];
      if (currentValue.some((v) => v.value === item.value)) {
        newValues = currentValue.filter((v) => v.value !== item.value);
      } else {
        newValues = [...currentValue, item];
      }
      onValueChange?.(newValues);
    };

    return (
      <div className="flex flex-col w-full">
        {label && (
          <label
            className={cn(
              "mb-1 text-xs font-semibold tracking-widest flex items-center gap-1",
              error ? "text-red-600" : "text-gray-300"
            )}
          >
            {label}
            {required && <span className="text-red-600">*</span>}
          </label>
        )}

        <div className="flex flex-wrap gap-1">
          {(value || []).map((item) => (
            <span
              key={item.value.toString()}
              className="flex items-center gap-1 px-2 py-0.5 bg-gray-700 rounded text-gray-200 text-xs"
            >
              {item.label}
              <X
                className="w-3 h-3 cursor-pointer"
                onClick={() => toggleValue(item)}
              />
            </span>
          ))}
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              role="combobox"
              disabled={disabled}
              aria-expanded={open}
              className={cn(
                "w-full justify-between text-gray-200 border border-gray-600 rounded-lg mt-1",
                error && "border-red-600",
                className
              )}
              onClick={() => setOpen(!open)}
            >
              <span>{placeholder}</span>
              <ChevronsUpDown className="opacity-70 h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            className="p-0 min-w-(--radix-popover-trigger-width) bg-black/95 border border-gray-600 rounded-lg shadow-sm"
          >
            <Command
              shouldFilter={false}
              className="bg-transparent text-gray-200"
            >
              <CommandInput
                placeholder="Search..."
                value={search}
                onValueChange={setSearch}
                className="h-9 text-gray-200 placeholder-gray-400 bg-black/5"
              />
              <CommandList>
                {isLoading ? (
                  <CommandEmpty className="text-center p-2 text-gray-400">
                    Loading...
                  </CommandEmpty>
                ) : isError ? (
                  <CommandEmpty className="text-center p-2 text-gray-400">
                    Failed to load
                  </CommandEmpty>
                ) : renderedOptions.length === 0 ? (
                  <CommandEmpty className="text-center p-2 text-gray-400">
                    No data
                  </CommandEmpty>
                ) : (
                  <CommandGroup>
                    {renderedOptions.map((opt) => (
                      <CommandItem
                        key={opt.value?.toString()}
                        value={opt.value?.toString()}
                        onSelect={() => toggleValue(opt)}
                        className="cursor-pointer text-gray-200 hover:bg-gray-700 flex justify-between"
                      >
                        <span>{opt.label}</span>
                        <Check
                          className={cn(
                            "h-4 w-4",
                            (value ?? []).some((v) => v.value === opt.value)
                              ? "opacity-100 text-gray-300"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

ZMultiOptionInput.displayName = "ZMultiOptionInput";
