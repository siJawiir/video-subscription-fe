import { VideoAccessParamsType } from "video-access-type";

export const INITIAL_VIDEO_PARAMS: VideoAccessParamsType = {
  current_page: 1,
  per_page: 10,
  order_by: "desc",
  sort_by: "created_at",
  category_id: null,
  search: "",
  tag_id: null,
};
