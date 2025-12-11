import { apiGetListService, apiGetService } from "@/lib/axios";
import { VideoParamsType, VideoResponseType } from "video-type";

export async function getVideos(params: VideoParamsType) {
  return await apiGetListService<VideoResponseType, VideoParamsType>({
    url: "/videos",
    params,
  });
}

export async function getVideoDetail(params: { video_id: number }) {
  return await apiGetService<VideoResponseType, { video_id: number }>({
    url: `/videos/${params.video_id}`,
    params,
  });
}
