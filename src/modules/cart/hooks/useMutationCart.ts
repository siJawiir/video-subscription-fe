import { MutationResponse } from "@/@types/api";
import {
  handleMutationError,
  handleMutationSuccess,
} from "@/lib/handlers/mutation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CartFormType } from "cart-types";
import { addToCart, removeCart, updateCart } from "../utils/services";

export const useMutationCart = ({ videoID }: { videoID: number }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<MutationResponse, Error, CartFormType>({
    mutationFn: (data: CartFormType) => {
      const payload = { ...data, video_id: videoID };
      return data.cart_item_id ? updateCart(payload) : addToCart(payload);
    },
    onSuccess: (response, variables) => {
      handleMutationSuccess(response, variables, {
        queryClient,
        invalidateQueryKey: ["cart-list"],
        isUpdate: !!variables.cart_item_id,
        resetForm: () => {},
      });
    },
    onError: (error) => handleMutationError(error),
  });

  const onSubmit = (formData: CartFormType) => {
    mutation.mutate(formData);
  };

  const mDelete = useMutation<
    MutationResponse,
    Error,
    { cart_item_id: number }
  >({
    mutationFn: (data: { cart_item_id: number }) => {
      const payload = { ...data };
      return removeCart(payload);
    },
    onSuccess: (response, variables) => {
      handleMutationSuccess(response, variables, {
        queryClient,
        invalidateQueryKey: ["cart-list"],
        isUpdate: !!variables.cart_item_id,
        resetForm: () => {},
      });
    },
    onError: (error) => handleMutationError(error),
  });

  const onDelete = (formData: { cart_item_id: number }) => {
    mDelete.mutate(formData);
  };

  return { ...mutation, onSubmit, onDelete, mDelete };
};
