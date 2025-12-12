declare module "order-types" {
  import { VideoResponseType } from "video-type";
  import { AuditType } from "@/@types/api";

  export interface OrdersResponseType extends AuditType {
    order_id: number;
    user_id: number;
    status: number;
    total_amount: number;
    items: OrdersItemResponseType[];
  }

  export interface OrdersItemResponseType {
    order_item_id: number;
    video_id: number;
    duration_seconds: number;
    price: number;
    video?: VideoResponseType;
  }

  export type OrderParamsType = PaginationParams<{
    search?: string;
  }>;
}
