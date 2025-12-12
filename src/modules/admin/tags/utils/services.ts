import {
  apiDeleteService,
  apiGetListService,
  apiPostService,
  apiPutService,
} from "@/lib/axios";
import {
  VideoTagFormType,
  VideoTagParamsType,
  VideoTagUpdateFormType,
  VideoTagResponseType,
} from "admin-tag-type";

export async function getTag(params: VideoTagParamsType) {
  return await apiGetListService<VideoTagResponseType, VideoTagParamsType>({
    url: "video-tags",
    params,
  });
}

export async function createTag(payload: VideoTagFormType) {
  return await apiPostService<VideoTagResponseType, VideoTagFormType>({
    url: "video-tags",
    payload,
  });
}

export async function updateTag(payload: VideoTagUpdateFormType) {
  return await apiPutService<VideoTagResponseType, VideoTagUpdateFormType>({
    url: `video-tags/${payload.video_tag_id}`,
    payload,
  });
}

export async function deleteTag(payload: { video_tag_id: number }) {
  return await apiDeleteService<VideoTagResponseType, { video_tag_id: number }>(
    {
      url: `video-tags/${payload.video_tag_id}`,
      payload,
    }
  );
}
