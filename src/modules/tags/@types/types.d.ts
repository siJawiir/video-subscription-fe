declare module "tag-type" {
  import { AuditType } from "@/@types/api";
  export interface TagResponseType extends AuditType {
    video_tag_id: number;
    name: string;
    slug: string;
    description: string;
  }
}
