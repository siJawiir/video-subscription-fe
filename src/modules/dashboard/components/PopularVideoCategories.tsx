"use client";
import { Show, ZSkeleton } from "@/components";
import Link from "next/link";
import { usePopularVideoCategories } from "../hooks/usePopularVideoCategories";

export default function LatestVideos() {
  const query = usePopularVideoCategories({ enabled: true });
  const categories = query.data ?? [];

  return (
    <>
      <Show.When condition={query.isPending}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          <ZSkeleton variant="list" orientation="horizontal" rows={6} />
        </div>
      </Show.When>

      <Show.When condition={!query.isPending && categories.length === 0}>
        <p className="text-zinc-400 text-sm text-center">
          No categories found.
        </p>
      </Show.When>

      <Show.When condition={!query.isPending && categories.length > 0}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          {categories.map((category) => (
            <Link
              key={category.video_category_id}
              href={`/categories/${category.video_category_id}`}
              className="group relative bg-zinc-900 rounded-full overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 w-fit px-3"
            >
              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Show.When>
    </>
  );
}
