import { ApiResponse } from "@/@types/api";

/**
 * Return response sukses
 */
export function handleSuccess<T>(
  data: T,
  message = "Berhasil memproses permintaan."
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

/**
 * Return response gagal
 */
export function handleError<T>(
  message = "Gagal memproses permintaan.",
  error?: unknown
): ApiResponse<T> {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Terjadi kesalahan tidak diketahui.";

  return {
    success: false,
    message,
    error: errorMessage,
  };
}
