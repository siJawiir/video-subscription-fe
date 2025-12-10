import { apiPostService, apiPutService } from "@/lib/axios";
import { CartFormType, CartItemResponseType } from "cart-types";

export async function addToCart(payload: CartFormType) {
  return await apiPostService<CartItemResponseType, CartFormType>({
    url: "/cart/add",
    payload,
  });
}

export async function updateCart(payload: CartFormType) {
  return await apiPutService<CartItemResponseType, CartFormType>({
    url: `/cart/update`,
    payload,
  });
}

export async function removeCart(payload: CartFormType) {
  return await apiPostService<CartItemResponseType, CartFormType>({
    url: `/cart/remove`,
    payload,
  });
}

export async function checkoutCart(payload: CartFormType) {
  return await apiPostService<CartItemResponseType, CartFormType>({
    url: `/cart/checkout`,
    payload,
  });
}
