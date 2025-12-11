import { ColumnDef } from "@tanstack/react-table";
import { VideoCategoryResponseType } from "category-type";

export const columns: ColumnDef<VideoCategoryResponseType>[] = [
  {
    header: "Nama",
    accessorKey: "name",
  },
  {
    header: "Slug",
    accessorKey: "slug",
  },
  {
    header: "Deskripsi",
    accessorKey: "description",
  },
];
