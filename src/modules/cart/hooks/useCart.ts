import { useQuery } from "@tanstack/react-query";
import { CartResponseType } from "cart-types";
import { getCart } from "../utils/services";

export function useCart({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: CartResponseType | null) => void;
}) {
  return useQuery({
    queryKey: ["cart-list"],
    queryFn: async () => {
      const res = await getCart();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
