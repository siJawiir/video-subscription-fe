import { apiGetListService, apiGetService, apiPostService } from "@/lib/axios";
import {
  VideoAccessParamsType,
  VideoAccessResponseType,
  WatchSessionResponseType,
} from "video-access-type";



export async function getVideoAccess(params: VideoAccessParamsType) {
  return await apiGetListService<VideoAccessResponseType, VideoAccessParamsType>({
    url:  "/video-access",
    params,
  });
}


export async function getVideoAccessDetail(params: {
  video_access_id: number;
}) {
  return await apiGetService<VideoAccessResponseType>({
    url: `/video-access/${params.video_access_id}`,
    params: {},
  });
}

export async function playVideo(payload: { video_access_id: number }) {
  return await apiPostService<
    WatchSessionResponseType,
    {
      video_access_id: number;
    }
  >({
    url: `/watch/start`,
    payload,
  });
}

export async function pingVideo(payload: { video_access_id: number }) {
  return await apiPostService<
    WatchSessionResponseType,
    {
      video_access_id: number;
    }
  >({
    url: `/watch/ping`,
    payload,
  });
}

export async function stopVideo(payload: { video_access_id: number }) {
  return await apiPostService<
    WatchSessionResponseType,
    {
      video_access_id: number;
    }
  >({
    url: `/watch/end`,
    payload,
  });
}
