import { ColumnDef } from "@tanstack/react-table";
import { VideoTagResponseType } from "admin-tag-type";

export const columns: ColumnDef<VideoTagResponseType>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Slug",
    accessorKey: "slug",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
];
