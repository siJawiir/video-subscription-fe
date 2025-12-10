declare module "dashboard-type" {
  import { VideoCategoryResponseType } from "category-type";
  import { VideoResponseType } from "video-type";

  export interface PopularVideoType extends VideoResponseType {
    order_count: number;
  }

  export interface PopularVideoCategoryType extends VideoCategoryResponseType {
    order_count: number;
  }
}
