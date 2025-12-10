import { useQuery } from "@tanstack/react-query";
import { ResourceType } from "resource-types";
import { getVideoCategoryResources } from "../utils/services";

export function useVideoCategoryResources({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: ResourceType[] | null) => void;
}) {
  return useQuery({
    queryKey: ["video-category-resources"],
    queryFn: async () => {
      const res = await getVideoCategoryResources();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
