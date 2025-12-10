import { apiGetService } from "@/lib/axios";
import { OrdersResponseType } from "order-types";
export async function getOrders() {
  return await apiGetService<OrdersResponseType[]>({
    url: "/my-orders",
    params: {},
  });
}
