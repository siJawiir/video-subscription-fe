import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface MutationOptions<TResponse, TVariables> {
  queryClient?: QueryClient;
  invalidateQueryKey?: readonly unknown[];
  successMessage?: string;
  errorMessage?: string;
  resetForm?: () => void;
  handleCallback?: (data: TResponse | TVariables) => void;
  isUpdate?: boolean;
  getResponseMessage?: (data: TVariables) => string | undefined;
}

export type MutationResponse<T> = {
  success: boolean;
  message?: string;
  error?: string;
  data?: T;
};

export function handleMutationSuccess<TResponse, TVariables>(
  response: MutationResponse<TResponse>,
  variables: TVariables,
  options?: MutationOptions<TResponse, TVariables>
) {
  const {
    queryClient,
    invalidateQueryKey,
    successMessage,
    errorMessage,
    resetForm,
    isUpdate,
    getResponseMessage,
    handleCallback,
  } = options ?? {};

  const action = isUpdate ? "updated" : "created";

  if (response.success) {
    toast.success(successMessage ?? `Data successfully ${action}`, {
      description: getResponseMessage?.(variables) ?? response.message ?? "",
    });

    if (queryClient && invalidateQueryKey) {
      queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
    }

    resetForm?.();
    handleCallback?.(response.data ?? variables);
  } else {
    toast.error(errorMessage ?? "Failed to send data", {
      description:
        response.error ?? "Something went wrong, please try again later.",
    });
  }
}

export function handleMutationError(error: Error) {
  toast.error("Failed to send data", {
    description: error.message ?? "Server error, please try again later.",
  });
}
