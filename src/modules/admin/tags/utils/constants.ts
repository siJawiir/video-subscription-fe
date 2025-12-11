import { VideoTagFormType, VideoTagParamsType } from "admin-tag-type";

export const initialTag: VideoTagFormType = {
  description: "",
  name: "",
  slug: "",
};

export const initialTagFilter: VideoTagParamsType = {
  current_page: 1,
  per_page: 10,
  sort_by: "created_at",
  order_by: "desc",
};
