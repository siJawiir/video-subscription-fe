type NoFilter = Record<never, never>;

export type PaginationParams<
  TFilter extends Record<string, string | number | boolean> | NoFilter = NoFilter
> = {
  current_page: number;
  per_page: number;
  sort_by?: string;
  order_by?: "asc" | "desc";
} & TFilter;
