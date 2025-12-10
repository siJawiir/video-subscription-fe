import { apiGetService, apiPostService, apiPutService } from "@/lib/axios";
import {
  CartFormType,
  CartItemResponseType,
  CartResponseType,
  CheckOutFormType,
} from "cart-types";
export async function getCart() {
  return await apiGetService<CartResponseType>({
    url: "/cart",
    params: {},
  });
}
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

export async function removeCart(payload: { cart_item_id: number }) {
  return await apiPostService<CartItemResponseType, { cart_item_id: number }>({
    url: `/cart/remove`,
    payload,
  });
}

export async function checkoutCart(payload: CheckOutFormType) {
  return await apiPostService<CartItemResponseType, CheckOutFormType>({
    url: `/cart/checkout`,
    payload,
  });
}
