import { ApiResponse, PaginatedResponse } from "@/@types/api";
import { isEmpty } from "@/utils/data";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { handleError } from "./handlers/handlers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Method = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions<TPayload = undefined, TParams = undefined> {
  url: string;
  payload?: TPayload;
  params?: TParams;
  headers?: Record<string, string>;
  withCredentials?: boolean;
}
export async function apiRequest<
  TResponse,
  TPayload = undefined,
  TParams = undefined
>(
  method: Method,
  options: FetchOptions<TPayload, TParams>
): Promise<ApiResponse<TResponse>> {
  try {
    const isFormData = options.payload instanceof FormData;

    let token: string | undefined;
    if (!["/register", "/login"].includes(options.url)) {
      const session = await getSession();
      token = session?.user?.token ?? undefined;
    }

    const config: AxiosRequestConfig = {
      method,
      url: `${BASE_URL}${
        options.url.startsWith("/") ? options.url : `/${options.url}`
      }`,
      params: options.params,
      data: options.payload,
      headers: {
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
        ...(!isEmpty(token) ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
      withCredentials: options.withCredentials ?? false,
    };

    const response = await axios<ApiResponse<TResponse>>(config);

    return response.data;
  } catch (error) {
    return handleError<TResponse>("Failed to send data", error);
  }
}

/**
 * Helper GET
 */
export const apiGetService = <
  TResponse,
  TParams extends Record<string, unknown> | undefined = Record<string, unknown>
>(
  options: FetchOptions<undefined, TParams>
) => apiRequest<TResponse, undefined, TParams>("GET", options);

/**
 * Helper GET LIST
 */
interface ApiGetListOptions<TParams> {
  url: string;
  params: TParams;
}

export async function apiGetListService<
  TData,
  TParams extends { current_page?: number; per_page?: number }
>({
  url,
  params,
}: ApiGetListOptions<TParams>): Promise<ApiResponse<PaginatedResponse<TData>>> {
  // TResponse = PaginatedResponse<TData>
  const res = await apiRequest<PaginatedResponse<TData>, undefined, TParams>(
    "GET",
    { url, params }
  );

  // Jika gagal → fallback empty paginated
  if (!res.success || !res.data) {
    return {
      success: false,
      message: res.message ?? "No data",
      data: {
        data: [],
        meta: {
          current_page: params.current_page ?? 1,
          per_page: params.per_page ?? 10,
          total: 0,
          last_page: 0,
        },
      },
    };
  }

  // Data valid → langsung return response dari BE
  return res;
}

/**
 * Helper POST
 */
export const apiPostService = <TResponse, TPayload>(
  options: FetchOptions<TPayload, undefined>
) => apiRequest<TResponse, TPayload>("POST", options);

/**
 * Helper PUT
 */
export const apiPutService = <TResponse, TPayload>(
  options: FetchOptions<TPayload, undefined>
) => apiRequest<TResponse, TPayload>("PUT", options);

/**
 * Helper DELETE
 */
export const apiDeleteService = <TResponse, TPayload = undefined>(
  options: FetchOptions<TPayload, undefined>
) => apiRequest<TResponse, TPayload>("DELETE", options);
