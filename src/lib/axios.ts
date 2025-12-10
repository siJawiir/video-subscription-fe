import { isEmpty } from "@/utils/data";
import axios, { AxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";
import { ApiResponse, handleError, handleSuccess } from "./handlers/handlers";

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

    if (
      response.data &&
      typeof response.data === "object" &&
      "success" in response.data
    ) {
      return response.data;
    }

    return handleSuccess<TResponse>(response.data as TResponse);
  } catch (error) {
    return handleError<TResponse>("Gagal memproses permintaan.", error);
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
