"use client";

import { Show, WarningAlert, ZButton, ZSkeleton } from "@/components";
import { useDatatable } from "@/hooks/useDatatable";
import { useDialog } from "@/hooks/useDialog";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { cn } from "@/lib/utils";
import {
  INITIAL_ORDER_PARAMS,
  ORDER_STATUSES,
} from "@/modules/orders/utils/constans";
import { dateFormat } from "@/utils";
import { formatNumber } from "@/utils/number";
import { OrderFormType } from "admin-order-types";
import { BadgeDollarSign, Ticket } from "lucide-react";
import { OrderParamsType, OrdersResponseType } from "order-types";
import { useFormContext, useWatch } from "react-hook-form";
import { useMutationOrder } from "../hooks/useMutationOrder";
import { getOrders } from "../utils/services";
import OrdersItemCard from "./OrdertemCard";

export default function OrdersList() {
  const datatable = useDatatable({
    initialPage: INITIAL_ORDER_PARAMS.current_page,
    initialPageSize: INITIAL_ORDER_PARAMS.per_page,
    initialFilters: INITIAL_ORDER_PARAMS,
  });

  const { handleOpen, handleClose, open } = useDialog();

  const { control, setValue, getValues } = useFormContext<OrderFormType>();

  const type = useWatch({
    control,
    name: "type",
  });

  const { onSubmit, isPending: isMutationPending } = useMutationOrder();

  const { data, isPending } = usePaginatedQuery<
    OrdersResponseType,
    OrderParamsType
  >({
    queryKey: [
      "order-list",
      datatable.filters,
      datatable.page,
      datatable.sorting,
    ],
    fetchFn: getOrders,
    params: {
      ...datatable.filters,
      current_page: datatable.page,
      per_page: datatable.pageSize,
    },
  });

  const orders = data?.data?.data || [];

  const getStatusStyle = (status: number) =>
    cn(
      "px-3 py-1 rounded-full text-xs font-semibold tracking-wide",
      "border backdrop-blur-sm shadow-md",
      status === ORDER_STATUSES.PENDING &&
        "bg-yellow-500/20 border-yellow-400/40 text-yellow-200",
      status === ORDER_STATUSES.APPROVED &&
        "bg-green-500/20 border-green-400/40 text-green-200",
      status === ORDER_STATUSES.REJECTED &&
        "bg-red-500/20 border-red-400/40 text-red-200"
    );

  const getStatusLabel = (status: number) => {
    switch (status) {
      case ORDER_STATUSES.PENDING:
        return "Pending";
      case ORDER_STATUSES.APPROVED:
        return "Approved";
      case ORDER_STATUSES.REJECTED:
      default:
        return "Rejected";
    }
  };

  return (
    <>
      <Show.When condition={isPending}>
        <ZSkeleton variant="card" orientation="vertical" rows={3} />
      </Show.When>

      <Show.When condition={!isPending && !orders}>
        <div className="w-full">
          <p className="text-sm text-muted-foreground text-center">
            No Orders Found
          </p>
        </div>
      </Show.When>

      <Show.When condition={!isPending && !!orders}>
        <div className="flex flex-col gap-6 p-4">
          {(orders ?? []).map((order) => (
            <div
              key={order.order_id}
              className={cn(
                "rounded-xl border border-zinc-800",
                "bg-linear-to-br from-zinc-900 to-black",
                "shadow-xl p-5"
              )}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-indigo-400" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Order #{order.order_id}
                    </h3>
                    <div className="text-xs flex items-center gap-2 text-muted-foreground">
                      <span>
                        {dateFormat(order.created_at as string, "dddd")},{" "}
                        {dateFormat(order.created_at as string, "DD MMMM YYYY")}
                      </span>
                    </div>
                  </div>
                </div>

                <span className={getStatusStyle(order.status)}>
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="flex items-center justify-between my-2">
                <div className="text-sm text-zinc-300 space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <BadgeDollarSign className="w-5 h-5 text-green-300" />
                    <span className="text-zinc-300">Total Amount:</span>
                    <span className="text-indigo-300 font-semibold">
                      IDR {formatNumber(order.total_amount ?? 0)}
                    </span>
                  </div>
                </div>
                <Show.When condition={order.status === ORDER_STATUSES.PENDING}>
                  <div className="flex space-x-4">
                    <ZButton
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setValue("order_id", order.order_id);
                        setValue("type", "rejected");
                        handleOpen();
                      }}
                      disabled={isMutationPending}
                      isPending={isMutationPending && type === "rejected"}
                    >
                      Reject
                    </ZButton>
                    <ZButton
                      type="button"
                      onClick={() => {
                        setValue("order_id", order.order_id);
                        setValue("type", "approved");
                        handleOpen();
                      }}
                      disabled={isMutationPending}
                      isPending={isMutationPending && type === "approved"}
                    >
                      Approve
                    </ZButton>
                  </div>
                </Show.When>
              </div>

              <div className="w-full h-px bg-zinc-800 mb-4" />
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <OrdersItemCard key={item.order_item_id} order={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Show.When>
      <WarningAlert
        open={open}
        title={`${type === "approved" ? "Approve" : "Reject"} Order`}
        agreeLabel={`${type === "approved" ? "Approve" : "Reject"}`}
        cancelLabel="Cancel"
        subtitle={`Are you sure you want to ${
          type === "approved" ? "approve" : "reject"
        } this order?`}
        onAgree={() => {
          onSubmit(getValues());
          handleClose();
        }}
        onCancel={handleClose}
      />
    </>
  );
}
