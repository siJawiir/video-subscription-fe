"use client";

import { WarningAlert, ZButton } from "@/components";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useDialog } from "@/hooks/useDialog";
import { formatNumber } from "@/utils/number";
import { FilmIcon } from "lucide-react";
import { useCartContext } from "../context/useCartContext";
import { useCart } from "../hooks/useCart";
import { useMutationCheckOut } from "../hooks/useMutationCheckOut";

export default function CartSummary() {
  const { selectedItems, setSelectedItems } = useCartContext();
  const dCheckOut = useDialog();

  const { data: cart } = useCart({ enabled: true });
  const items = (cart?.items ?? []).filter((item) =>
    (selectedItems ?? []).includes(item.cart_item_id)
  );

  const total = items.reduce((sum, item) => sum + Number(item.price || 0), 0);

  const { isPending, onSubmit } = useMutationCheckOut({
    handleReset: () => {
      setSelectedItems(null);
    },
  });

  return (
    <>
      <Card className="p-4 space-y-4">
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {items.length === 0 && (
            <>
              <div className="flex justify-center items-center space-x-2">
                <FilmIcon className="w-6 h-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  No item selected
                </p>
              </div>
            </>
          )}

          {items.map((item) => (
            <div
              key={item.cart_item_id}
              className="flex justify-between text-sm"
            >
              <span>{item.video?.title ?? `Video #${item.video_id}`}</span>
              <span>IDR {formatNumber(item.price)}</span>
            </div>
          ))}

          <Separator />

          <div className="flex justify-between font-semibold text-base">
            <span>Total</span>
            <span>IDR {formatNumber(total)}</span>
          </div>

          <ZButton
            type="button"
            className="w-full mt-2"
            disabled={items.length === 0}
            isPending={isPending}
            onClick={() => {
              dCheckOut.handleOpen();
            }}
          >
            Checkout
          </ZButton>
        </CardContent>
      </Card>
      <WarningAlert
        open={dCheckOut.open}
        title="Checkout"
        agreeLabel="Checkout"
        cancelLabel="Cancel"
        subtitle="Are you sure you want to checkout now?"
        onAgree={() => {
          onSubmit({ cart_item_ids: selectedItems ?? [] });
          dCheckOut.handleClose();
        }}
        onCancel={dCheckOut.handleClose}
      />
    </>
  );
}
