import { initialPagination } from "@/constants/constants";
import {
  VideoCategoryParamsType,
  VideoCategoryFormType,
} from "admin-category-type";

export const initialCategory: VideoCategoryFormType = {
  description: "",
  name: "",
  slug: "",
};

export const initialCategoryFilter: VideoCategoryParamsType = {
  ...initialPagination,
  name: "",
  status: 1,
};
