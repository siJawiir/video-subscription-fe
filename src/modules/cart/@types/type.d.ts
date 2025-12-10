declare module "cart-types" {
  import { VideoResponseType } from "video-type";
  import { AuditType } from "@/@types/api";
  export interface CartFormType {
    cart_item_id?: number;
    video_id: number;
    duration_seconds: number;
  }

  export interface CheckOutFormType {
    cart_item_ids: number[];
  }

  export interface CartResponseType extends AuditType {
    cart_id: number;
    user_id: number;
    items: CartItemResponseType[];
  }

  export interface CartItemResponseType {
    cart_item_id: number;
    video_id: number;
    duration_seconds: number;
    price: number;
    video?: VideoResponseType;
  }
}
