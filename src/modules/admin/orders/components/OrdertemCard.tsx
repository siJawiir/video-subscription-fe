"use client";

import { cn } from "@/lib/utils";
import { formatNumber } from "@/utils/number";
import { BadgeDollarSign, Clock, Film } from "lucide-react";
import { OrdersItemResponseType } from "order-types";

interface OrdersItemCardProps {
  order: OrdersItemResponseType;
}

export default function OrdersItemCard({ order }: OrdersItemCardProps) {
  const hours = Number(order.duration_seconds || 0) / 3600;

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border",
        "border-zinc-800 bg-linear-to-br from-zinc-900 to-black",
        "shadow-md p-4"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Film className="w-5 h-5 text-indigo-400" />
        <h3 className="text-white font-semibold text-base truncate">
          {order.video?.title}
        </h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400">Duration:</span>
          <span className="text-white font-medium">{hours} hours</span>
        </div>

        <div className="flex items-center gap-2">
          <BadgeDollarSign className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-400">Price:</span>
          <span className="text-white font-medium">
            IDR {formatNumber(order.price)}
          </span>
        </div>
      </div>
    </div>
  );
}
