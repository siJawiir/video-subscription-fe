declare module "video-access-type" {
  import { AuditType } from "@/@types/api";
  import { PaginationParams } from "@/@types/table";
  import { VideoResponseType } from "video-type";

  export interface VideoAccessResponseType extends AuditType {
    video_access_id: number;
    user_id: number;
    video_id: number;
    order_item_id: number;
    purchased_time_seconds: number;
    used_time_seconds: number;
    remaining_time_seconds: number;
    status: number;
    activated_at: string;
    video: VideoResponseType;
  }

  export type VideoAccessParamsType = PaginationParams<{
    search?: string;
    category_id?: number | null;
    tag_id?: number | null;
  }>;

  export type WatchSessionResponseType = {
    success: boolean;
    message: string;
    data: unknown;
  };
}
