import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../utils/services";
import { VideoParamsType, VideoResponseType } from "video-type";

export function useVideos({
  enabled = true,
  params,
  onSuccess,
}: {
  enabled?: boolean;
  params: VideoParamsType;
  onSuccess?: (data: VideoResponseType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["all-videos", params.category_id],
    queryFn: async () => {
      const res = await getVideos(params);

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
