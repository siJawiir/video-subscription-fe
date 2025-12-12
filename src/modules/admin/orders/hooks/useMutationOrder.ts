import { MutationResponse } from "@/@types/api";
import {
  handleMutationError,
  handleMutationSuccess,
} from "@/lib/handlers/mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderFormType } from "admin-order-types";
import { approveOrder, rejectOrder } from "../utils/services";

export const useMutationOrder = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<MutationResponse, Error, OrderFormType>({
    mutationFn: (data: OrderFormType) => {
      const payload = { order_id: data.order_id };
      return data.type === "approved"
        ? approveOrder(payload)
        : rejectOrder(payload);
    },
    onSuccess: (response, variables) => {
      handleMutationSuccess(response, variables, {
        queryClient,
        invalidateQueryKey: ["order-list"],
        isUpdate: false,
        successMessage: `Order successfully ${variables.type}`,
        resetForm: () => {},
      });
    },
    onError: (error) => handleMutationError(error),
  });

  const onSubmit = (formData: OrderFormType) => {
    mutation.mutate(formData);
  };

  return { ...mutation, onSubmit };
};
