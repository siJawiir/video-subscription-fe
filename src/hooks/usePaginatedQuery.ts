import { ApiResponse, PaginatedResponse } from "@/@types/api";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface UsePaginatedQueryOptions<
  TData,
  TParams extends { current_page: number; per_page: number }
> {
  queryKey: readonly unknown[];
  fetchFn: (params: TParams) => Promise<ApiResponse<PaginatedResponse<TData>>>;
  params: TParams;
}

export function usePaginatedQuery<
  TData,
  TParams extends { current_page: number; per_page: number }
>({
  queryKey,
  fetchFn,
  params,
}: UsePaginatedQueryOptions<TData, TParams>): UseQueryResult<
  ApiResponse<PaginatedResponse<TData>>
> {
  return useQuery<ApiResponse<PaginatedResponse<TData>>>({
    queryKey,
    queryFn: async () => {
      try {
        const res = await fetchFn(params);

        // Jika gagal atau struktur rusak → fallback empty
        if (!res.success || !res.data) {
          return {
            success: false,
            message: res.message ?? "No data",
            data: {
              data: [],
              meta: {
                current_page: params.current_page,
                per_page: params.per_page,
                total: 0,
                last_page: 0,
              },
            },
          };
        }

        // Return data dari BE
        return res;
      } catch {
        // Error fallback
        return {
          success: false,
          message: "Failed to fetch data",
          data: {
            data: [],
            meta: {
              current_page: params.current_page,
              per_page: params.per_page,
              total: 0,
              last_page: 0,
            },
          },
        };
      }
    },
  });
}
