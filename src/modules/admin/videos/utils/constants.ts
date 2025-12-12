import { VideoFormType, VideoParamsType } from "admin-video-type";

export const initialVideo: VideoFormType = {
  description: "",
  price: 0,
  title: "",
  video_url: "",
  categories: [],
  tags: [],
};

export const initialVideoFilter: VideoParamsType = {
  current_page: 1,
  per_page: 10,
  sort_by: "created_at",
  order_by: "desc",
};
