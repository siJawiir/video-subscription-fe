import { useQuery } from "@tanstack/react-query";
import { DashboardStatsType } from "dashboard-type";
import { getDashboardStats } from "../utils/service";

export function useDashboardStats({
  enabled = true,
  onSuccess,
}: {
  enabled?: boolean;
  onSuccess?: (data: DashboardStatsType| null) => void;
}) {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const res = await getDashboardStats();

      const data = res.data;
      if (!res.success || !data) return null;

      onSuccess?.(data);
      return data;
    },
    enabled,
    refetchOnWindowFocus: false,
  });
}
