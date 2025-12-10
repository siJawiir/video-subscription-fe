import { useQuery } from "@tanstack/react-query";
import { VideoAccessResponseType } from "video-access-type";
import { getVideoAccessDetail } from "../utils/services";

export function useVideoDetail({
  enabled = true,
  video_access_id,
  onSuccess,
}: {
  enabled?: boolean;
  video_access_id: number;
  onSuccess?: (data: VideoAccessResponseType | null) => void;
}) {
  return useQuery({
    queryKey: ["video-access-detail", video_access_id],
    queryFn: async () => {
      const res = await getVideoAccessDetail({ video_access_id });

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
