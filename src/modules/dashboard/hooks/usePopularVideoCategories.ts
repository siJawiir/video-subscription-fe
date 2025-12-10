import { useQuery } from "@tanstack/react-query";
import { getPopularVideoCategories } from "../utils/services";
import { PopularVideoCategoryType } from "dashboard-type";

export function usePopularVideoCategories({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: PopularVideoCategoryType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["popular-video-categories"],
    queryFn: async () => {
      const res = await getPopularVideoCategories();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
  });
}
