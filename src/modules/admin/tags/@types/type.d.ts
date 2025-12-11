declare module "admin-tag-type" {
  import { PaginationParams } from "@/@types/table";
  export interface VideoTagUpdateFormType {
    video_tag_id: number;
    name: string;
    slug: string;
    description: string;
  }

  export interface VideoTagResponseType extends AuditType {
    video_tag_id: number;
    name: string;
    slug: string;
    description: string;
  }

  export type VideoTagFormType = Omit<
    VideoTagUpdateFormType,
    "video_tag_id"
  > & {
    video_tag_id?: number;
  };

  export type VideoTagParamsType = PaginationParams<{
    search?: string;
  }>;
}
