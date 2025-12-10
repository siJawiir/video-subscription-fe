declare module "category-type" {
  import { AuditType } from "@/@types/api";
  export interface VideoCategoryResponseType extends AuditType {
    video_category_id: number;
    name: string;
    slug: string;
    description: string;
  }
}
