import { apiGetListService, apiPostService } from "@/lib/axios";
import { OrderFormType } from "admin-order-types";
import { OrderParamsType, OrdersResponseType } from "order-types";

export async function getOrders(params: OrderParamsType) {
  return await apiGetListService<OrdersResponseType, OrderParamsType>({
    url: "orders",
    params,
  });
}

export async function approveOrder(payload: OrderFormType) {
  return await apiPostService<OrdersResponseType, OrderFormType>({
    url: `/orders/${payload.order_id}/approve`,
    payload,
  });
}

export async function rejectOrder(payload: OrderFormType) {
  return await apiPostService<OrdersResponseType, OrderFormType>({
    url: `/orders/${payload.order_id}/reject`,
    payload,
  });
}
