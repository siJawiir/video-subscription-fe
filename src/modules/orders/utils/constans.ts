import { OrderParamsType } from "order-types";

export const ORDER_STATUSES = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
};

export const INITIAL_ORDER_PARAMS: OrderParamsType = {
  current_page: 1,
  per_page: 10,
  sort_by: "created_at",
  order_by: "desc",
};
