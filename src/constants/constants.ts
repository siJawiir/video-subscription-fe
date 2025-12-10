import { PaginationParams } from "@/@types/table";

export const initialPagination: PaginationParams = {
  current_page: 1,
  per_page: 10,
  sort_by: "id",
  order_by: "desc",
};

export const USER_ROLES = {
  ADMIN: 0,
  CUSTOMER: 1,
};