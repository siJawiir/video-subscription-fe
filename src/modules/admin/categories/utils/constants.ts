import {
  VideoCategoryFormType,
  VideoCategoryParamsType,
} from "admin-category-type";

export const initialCategory: VideoCategoryFormType = {
  description: "",
  name: "",
  slug: "",
};

export const initialCategoryFilter: VideoCategoryParamsType = {
  current_page: 1,
  per_page: 10,
  sort_by: "created_at",
  order_by: "desc",
};
