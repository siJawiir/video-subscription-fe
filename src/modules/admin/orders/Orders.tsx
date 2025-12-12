"use client";

import { FormProvider, useForm } from "react-hook-form";
import OrdersList from "./components/OrderList";
import { INITIAL_ORDER } from "./utils/constans";

export default function Orders() {
  const methods = useForm({
    defaultValues: INITIAL_ORDER,
  });
  return (
    <>
      <FormProvider {...methods}>
        <div className="p-6">
          <OrdersList />
        </div>
      </FormProvider>
    </>
  );
}
