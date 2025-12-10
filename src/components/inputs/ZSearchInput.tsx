"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import * as React from "react";
import { ResourceType } from "resource-types";
import { useDebouncedCallback } from "use-debounce";

interface ZSearchInputProps {
  placeholder?: string;
  searchKey?: string;
  basePath?: string;
  onSearch?: (value: string) => Promise<ResourceType[]>;
  className?: string;
}

export function ZSearchInput({
  placeholder = "Search...",
  searchKey = "search",
  basePath = "/",
  onSearch,
  className,
}: ZSearchInputProps) {
  const router = useRouter();
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState<ResourceType[]>(
    []
  );

  const debouncedSearch = useDebouncedCallback(async (val: string) => {
    if (onSearch && val.trim().length > 0) {
      const results = await onSearch(val.trim());
      setItems(results);
    } else {
      setItems([]);
    }
  }, 300);

  const handleChange = (val: string) => {
    setValue(val);
    debouncedSearch(val);
  };

  const handleSelect = (item: ResourceType) => {
    router.push(`${basePath}?${searchKey}=${encodeURIComponent(item.label)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      router.push(`${basePath}?${searchKey}=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className={`relative ${className}`}>

      <Command>
        <CommandInput
          asChild
          value={value}
          onValueChange={handleChange}
          onKeyDown={handleKeyDown}
        >
          <Input
            placeholder={placeholder}
            className="w-full"
          />
        </CommandInput>

        <CommandList>
          {items.length === 0 && value ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            items.map((item) => (
              <CommandItem key={item.value} onSelect={() => handleSelect(item)}>
                {item.label}
              </CommandItem>
            ))
          )}
        </CommandList>
      </Command>
    </div>
  );
}
