import { useQuery } from "@tanstack/react-query";
import { VideoResponseType } from "video-type";
import { getLatestVideos } from "../utils/services";

export function useLatestVideos({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: VideoResponseType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["latest-videos"],
    queryFn: async () => {
      const res = await getLatestVideos();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
  });
}
