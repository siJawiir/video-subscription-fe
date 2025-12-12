
declare module "admin-video-type" {
  import { ResourceType } from "resource-types";
  import { PaginationParams } from "@/@types/table";
  export interface VideoUpdateFormType {
    video_id: number;
    title: string;
    description: string;
    video_url: string;
    price: number;
    thumbnail_url?: string;
    categories?: ResourceType[] | null;
    tags?: ResourceType[] | null;
  }

  export type VideoFormType = Omit<VideoUpdateFormType, "video_id"> & {
    video_id?: number;
  };

  export type VideoParamsType = PaginationParams<{
    search?: string;
  }>;
}
