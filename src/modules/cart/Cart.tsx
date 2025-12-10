"use client";

import { FormProvider, useForm } from "react-hook-form";
import { INITIAL_CART_FORM } from "./utils/constans";
import CartList from "./components/CartList";
import { CartProvider } from "./context/CartContext";
import CartSummary from "./components/CartSummary";

export default function Cart() {
  const methods = useForm({
    defaultValues: INITIAL_CART_FORM,
  });
  return (
    <>
      <CartProvider>
        <FormProvider {...methods}>
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 p-6 gap-4">
            <div className="col-span-1 md:col-span-4 lg:col-span-8">
              <CartList />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <CartSummary />
            </div>
          </div>
        </FormProvider>
      </CartProvider>
    </>
  );
}
