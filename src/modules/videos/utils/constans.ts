import { VideoParamsType } from "video-type";

export const INITIAL_VIDEO_PARAMS: VideoParamsType = {
  current_page: 1,
  per_page: 10,
  order_by: "desc",
  sort_by: "video_id",
  category_id: null,
  search: "",
  tag_id: null,
};
