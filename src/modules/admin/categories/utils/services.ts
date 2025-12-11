import {
  apiDeleteService,
  apiGetListService,
  apiPostService,
  apiPutService
} from "@/lib/axios";
import {
  VideoCategoryFormType,
  VideoCategoryParamsType,
  VideoCategoryUpdateFormType,
} from "admin-category-type";
import { VideoCategoryResponseType } from "category-type";

export async function getCategory(params: VideoCategoryParamsType) {
  return await  apiGetListService<VideoCategoryResponseType, VideoCategoryParamsType>({
    url: "video-categories",
    params,
  });
}

export async function createCategory(payload: VideoCategoryFormType) {
  return await apiPostService<VideoCategoryResponseType, VideoCategoryFormType>(
    {
      url: "video-categories",
      payload,
    }
  );
}

export async function updateCategory(payload: VideoCategoryUpdateFormType) {
  return await apiPutService<
    VideoCategoryResponseType,
    VideoCategoryUpdateFormType
  >({
    url: `video-categories/${payload.video_category_id}`,
    payload,
  });
}

export async function deleteCategory(payload: { video_category_id: number }) {
  return await apiDeleteService<
    VideoCategoryResponseType,
    { video_category_id: number }
  >({
    url: `video-categories/${payload.video_category_id}`,
    payload,
  });
}
