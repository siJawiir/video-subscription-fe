import { ColumnDef } from "@tanstack/react-table";
import { VideoResponseType } from "video-type";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<VideoResponseType>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Categories",
    accessorKey: "categories",
    cell: (info) => {
      const categories = info.row.original.categories || [];
      const displayCategories = categories.slice(0, 3);
      const remainingCategories = categories.slice(3);

      return (
        <div className="flex flex-wrap gap-1">
          {displayCategories.map((category) => (
            <div
              key={category.video_category_id}
              className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5"
            >
              {category.name}
            </div>
          ))}

          {remainingCategories.length > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <div className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5 cursor-pointer">
                  +{remainingCategories.length} more
                </div>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1 p-2">
                {remainingCategories.map((category) => (
                  <div
                    key={category.video_category_id}
                    className="text-zinc-400 text-xs font-semibold"
                  >
                    {category.name}
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    header: "Tags",
    accessorKey: "tags",
    cell: (info) => {
      const tags = info.row.original.tags || [];
      const displayTags = tags.slice(0, 3);
      const remainingTags = tags.slice(3);

      return (
        <div className="flex flex-wrap gap-1">
          {displayTags.map((tag) => (
            <div
              key={tag.video_tag_id}
              className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5"
            >
              {tag.name}
            </div>
          ))}

          {remainingTags.length > 0 && (
            <Tooltip>
              <TooltipTrigger>
                <div className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5 cursor-pointer">
                  +{remainingTags.length} more
                </div>
              </TooltipTrigger>
              <TooltipContent className="flex flex-col gap-1 p-2">
                {remainingTags.map((tag) => (
                  <div
                    key={tag.video_tag_id}
                    className="text-zinc-400 text-xs font-semibold"
                  >
                    {tag.name}
                  </div>
                ))}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
  {
    header: "Description",
    accessorKey: "description",
  },
];
