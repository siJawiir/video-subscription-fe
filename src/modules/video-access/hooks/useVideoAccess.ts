import { useQuery } from "@tanstack/react-query";
import {
  VideoAccessResponseType,
  VideoAccessParamsType,
} from "video-access-type";
import { getVideoAccess } from "../utils/services";

export function useVideoAccess({
  enabled = true,
  params,
  onSuccess,
}: {
  enabled?: boolean;
  params: VideoAccessParamsType;
  onSuccess?: (data: VideoAccessResponseType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["all-video-access", params.category_id],
    queryFn: async () => {
      const res = await getVideoAccess(params);

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data.data);
      return data.data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
