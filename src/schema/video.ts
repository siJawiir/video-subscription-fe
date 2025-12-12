import { z } from "zod";

export const ResourceTypeSchema = z.object({
  value: z.union([z.string(), z.number()]),
  label: z.string(),
  description: z.string().optional(),
});

export const VideoFormSchema = z.object({
  video_id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  video_url: z.url("Video URL must be a valid URL"),
  price: z.number().min(0, "Price must be at least 0"),
  categories: z.array(ResourceTypeSchema).nullable().optional(),
  tags: z.array(ResourceTypeSchema).nullable().optional(),
  is_active: z.boolean(),
});
