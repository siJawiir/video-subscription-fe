"use client";
import { Show, ZSkeleton } from "@/components";
import { cn } from "@/lib/utils";
import { useVideoCategoryResources } from "@/modules/categories/hooks/useVideoCategoryResources";
import { useFormContext, useWatch } from "react-hook-form";
import { VideoParamsType } from "video-type";

export default function VideoCategoryList() {
  const { setValue, control } = useFormContext<VideoParamsType>();

  const categoryID = useWatch({
    control,
    name: "category_id",
  });

  const query = useVideoCategoryResources({ enabled: true });

  const categories = query.data ?? [];

  return (
    <>
      <Show.When condition={query.isPending}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          <ZSkeleton variant="list" orientation="horizontal" rows={4} />
        </div>
      </Show.When>

      <Show.When condition={!query.isPending && categories.length === 0}>
        <p className="text-zinc-400 text-sm text-center">
          No categories found.
        </p>
      </Show.When>

      <Show.When condition={!query.isPending && categories.length > 0}>
        <div className="flex gap-2 overflow-x-auto py-2 flex-nowrap">
          <div
            onClick={() => setValue("category_id", null)}
            className={cn(
              categoryID === null ? "bg-indigo-900" : "bg-zinc-900",
              "group relative rounded-full overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 w-fit px-3 cursor-pointer"
            )}
          >
            <div className="py-1.5">
              <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition">
                All Categories
              </h3>
            </div>
          </div>
          {categories.map((category) => (
            <div
              key={category.value}
              onClick={() =>
                setValue(
                  "category_id",
                  categoryID === category.value ? null : Number(category.value),
                  {
                    shouldValidate: true,
                  }
                )
              }
              className={cn(
                categoryID == category.value ? "bg-indigo-900" : "bg-zinc-900",
                "group relative rounded-full overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 w-fit px-3 cursor-pointer"
              )}
            >
              <div className="py-1.5">
                <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition">
                  {category.label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Show.When>
    </>
  );
}
