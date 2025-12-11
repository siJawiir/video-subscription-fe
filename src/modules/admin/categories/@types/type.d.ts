declare module "admin-category-type" {
  export interface VideoCategoryUpdateFormType {
    video_category_id: number;
    name: string;
    slug: string;
    description: string;
  }

  export type VideoCategoryFormType = Omit<
    VideoCategoryUpdateFormType,
    "video_category_id"
  > & {
    video_category_id?: number;
  };

  export type VideoCategoryParamsType = PaginationParams<{
    name?: string;
    slug?: string;
  }>;
}
