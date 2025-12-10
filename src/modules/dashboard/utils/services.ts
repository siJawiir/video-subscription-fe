import { apiGetService } from "@/lib/axios";
import { PopularVideoCategoryType, PopularVideoType } from "dashboard-type";
import { VideoResponseType } from "video-type";

export async function getLatestVideos() {
  return await apiGetService<VideoResponseType[]>({
    url: "/latest-videos",
    params: {},
  });
}

export async function getPopularVideos() {
  return await apiGetService<PopularVideoType[]>({
    url: "/popular-videos",
    params: {},
  });
}


export async function getPopularVideoCategories() {
  return await apiGetService<PopularVideoCategoryType[]>({
    url: "/popular-video-categories",
    params: {},
  });
}
