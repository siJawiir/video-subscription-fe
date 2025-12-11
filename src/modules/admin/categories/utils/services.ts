import {
  apiDeleteService,
  apiGetService,
  apiPostService,
  apiPutService,
} from "@/lib/axios";
import {
  CategoryUpdateFormType,
  VideoCategoryFormType,
  VideoCategoryParamsType,
} from "admin-category-type";
import { VideoCategoryResponseType } from "category-type";

export async function getCategory(params: VideoCategoryParamsType) {
  return await apiGetService<
    { data: VideoCategoryResponseType[]; total: number },
    VideoCategoryParamsType
  >({
    url: "categories",
    params,
  });
}

export async function createCategory(payload: VideoCategoryFormType) {
  return await apiPostService<VideoCategoryResponseType, VideoCategoryFormType>(
    {
      url: "categories",
      payload,
    }
  );
}

export async function updateCategory(payload: CategoryUpdateFormType) {
  return await apiPutService<VideoCategoryResponseType, CategoryUpdateFormType>(
    {
      url: `categories/${payload.video_category_id}`,
      payload,
    }
  );
}

export async function deleteCategory(payload: { video_category_id: number }) {
  return await apiDeleteService<
    VideoCategoryResponseType,
    { video_category_id: number }
  >({
    url: `categories/${payload.video_category_id}`,
    payload,
  });
}
