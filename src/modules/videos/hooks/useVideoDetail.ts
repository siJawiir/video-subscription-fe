import { useQuery } from "@tanstack/react-query";
import { VideoResponseType } from "video-type";
import { getVideoDetail } from "../utils/services";

export function useVdieoDetail({
  enabled = true,
  video_id,
  onSuccess,
}: {
  enabled?: boolean;
  video_id: number;
  onSuccess?: (data: VideoResponseType | null) => void;
}) {
  return useQuery({
    queryKey: ["video-detail", video_id],
    queryFn: async () => {
      const res = await getVideoDetail({ video_id });

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
