import { useQuery } from "@tanstack/react-query";
import { OrdersResponseType } from "order-types";
import { getOrders } from "../utils/services";

export function useOrders({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: OrdersResponseType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["order-list"],
    queryFn: async () => {
      const res = await getOrders();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
