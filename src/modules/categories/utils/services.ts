import { apiGetService } from "@/lib/axios";
import { ResourceType } from "resource-types";

export async function getVideoCategoryResources() {
  return await apiGetService<ResourceType[]>({
    url: "/video-category-resources",
    params: {},
  });
}
