import { MutationResponse } from "@/@types/api";
import {
  handleMutationError,
  handleMutationSuccess,
} from "@/lib/handlers/mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckOutFormType } from "cart-types";
import { checkoutCart } from "../utils/services";

export const useMutationCheckOut = ({
  handleReset,
}: {
  handleReset: () => void;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<MutationResponse, Error, CheckOutFormType>({
    mutationFn: (data: CheckOutFormType) => {
      const payload = { ...data };
      return checkoutCart(payload);
    },
    onSuccess: (response, variables) => {
      handleMutationSuccess(response, variables, {
        queryClient,
        invalidateQueryKey: ["cart-list"],
        isUpdate: false,
        resetForm: () => {
          handleReset()
        },
      });
    },
    onError: (error) => handleMutationError(error),
  });

  const onSubmit = (formData: CheckOutFormType) => {
    mutation.mutate(formData);
  };

  return { ...mutation, onSubmit };
};
