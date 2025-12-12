import {
  apiDeleteService,
  apiGetListService,
  apiPostService,
  apiPutService,
} from "@/lib/axios";
import {
  VideoFormType,
  VideoParamsType,
  VideoUpdateFormType,
} from "admin-video-type";
import { VideoResponseType } from "video-type";

export async function getVideo(params: VideoParamsType) {
  return await apiGetListService<VideoResponseType, VideoParamsType>({
    url: "videos",
    params,
  });
}

export async function createVideo(payload: VideoFormType) {
  return await apiPostService<VideoResponseType, VideoFormType>({
    url: "videos",
    payload,
  });
}

export async function updateVideo(payload: VideoUpdateFormType) {
  return await apiPutService<VideoResponseType, VideoUpdateFormType>({
    url: `videos/${payload.video_id}`,
    payload,
  });
}

export async function deleteVideo(payload: { video_id: number }) {
  return await apiDeleteService<VideoResponseType, { video_id: number }>({
    url: `videos/${payload.video_id}`,
    payload,
  });
}
