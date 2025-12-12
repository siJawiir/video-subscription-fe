import { apiGetService } from "@/lib/axios";
import { DashboardStatsType } from "dashboard-type";

export async function getDashboardStats() {
  return await apiGetService<DashboardStatsType>({
    url: "/dashboard-stats",
    params: {},
  });
}
