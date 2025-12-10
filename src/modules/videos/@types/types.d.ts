declare module "video-type" {
  import { PaginationParams } from "@/@types/table";
  import { AuditType } from "@/@types/api";
  import { VideoCategoryResponseType } from "category-type";
  import { TagResponseType } from "tag-type";

  export interface VideoResponseType extends AuditType {
    video_id: number;
    title: string;
    description: string;
    video_url: string;
    thumbnail_url: string;
    price: number;
    categories: VideoCategoryResponseType[] | null;
    tags: TagResponseType[] | null;
  }

  export type VideoParamsType = PaginationParams<{
    search?: string;
    category_id?: number | null;
    tag_id?: number | null;
  }>;
}
