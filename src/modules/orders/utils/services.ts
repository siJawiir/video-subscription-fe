import { apiGetListService } from "@/lib/axios";
import { OrderParamsType, OrdersResponseType } from "order-types";

export async function getOrders(params: OrderParamsType) {
  return await apiGetListService<OrdersResponseType, OrderParamsType>({
    url: "my-orders",
    params,
  });
}
