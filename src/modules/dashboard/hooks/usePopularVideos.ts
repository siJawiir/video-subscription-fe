import { useQuery } from "@tanstack/react-query";
import { PopularVideoType } from "dashboard-type";
import { getPopularVideos } from "../utils/services";

export function usePopularVideos({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: PopularVideoType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["popular-videos"],
    queryFn: async () => {
      const res = await getPopularVideos();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
  });
}
