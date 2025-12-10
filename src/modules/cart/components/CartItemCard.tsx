"use client";

import {
  WarningAlert,
  ZDurationInput,
  ZIconButton,
  ZImage,
} from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { CartFormType, CartItemResponseType } from "cart-types";
import Link from "next/link";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useMutationCart } from "../hooks/useMutationCart";
import { Trash2 } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";

interface CartItemCardProps {
  cart: CartItemResponseType;
  isSelected: boolean;
  handleSelect: (data: CartItemResponseType) => void;
}

export default function CartItemCard({
  cart,
  isSelected,
  handleSelect,
}: CartItemCardProps) {
  const methods = useForm<CartFormType>({
    defaultValues: {
      cart_item_id: cart.cart_item_id,
      video_id: cart.video_id,
      duration_seconds: cart.duration_seconds,
    },
  });

  const { control, reset } = methods;
  const videoID = useWatch({ control, name: "video_id" });
  const durationSeconds = useWatch({ control, name: "duration_seconds" });

  const dDelete = useDialog();

  const { onSubmit, onDelete, mDelete } = useMutationCart({ videoID });

  const handleUpdate = (data?: number) => {
    reset();
    onSubmit({
      cart_item_id: cart.cart_item_id,
      duration_seconds: data || durationSeconds,
      video_id: videoID,
    });
  };

  return (
    <div
      className={cn(
        "relative flex flex-col md:flex-row rounded-2xl overflow-hidden transition-shadow duration-300 w-full",
        isSelected
          ? "bg-indigo-900 shadow-xl border-2 border-indigo-500"
          : "bg-zinc-900 shadow-lg hover:shadow-xl border border-zinc-800"
      )}
    >
      <div className="absolute top-2 left-2 z-20 bg-black/40 p-1 rounded-full h-8 w-8">
        <Checkbox
          checked={isSelected}
          onCheckedChange={() => handleSelect(cart)}
          className="w-full h-full"
        />
      </div>

      <div className="absolute bottom-2 right-2 z-20 bg-black/40 p-1 rounded-full">
        <ZIconButton
          tooltip="Delete Movie"
          icon={<Trash2 />}
          onClick={dDelete.handleOpen}
          isPending={mDelete.isPending}
        />
      </div>

      <Link
        href={`/videos/${cart.video?.video_id}`}
        className="relative md:w-48 w-full h-60 md:h-auto shrink-0"
      >
        <ZImage
          src={cart.video?.thumbnail_url}
          alt={cart.video?.title || ""}
          width={400}
          height={250}
          className="w-full h-full object-cover"
        />

        <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-lg">
          {Math.floor(durationSeconds / 60)}m
        </span>
      </Link>

      <div className="flex flex-col justify-between p-4 md:p-6 flex-1">
        <div className="mb-3">
          <Link href={`/videos/${cart.video?.video_id}`}>
            <h3
              className={cn(
                "text-lg font-bold truncate transition-colors",
                isSelected ? "text-indigo-400" : "text-white"
              )}
            >
              {cart.video?.title}
            </h3>
          </Link>
          <p className="text-zinc-400 text-sm mt-1 line-clamp-2">
            {cart.video?.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {cart.video?.categories?.map((cat) => (
            <span
              key={cat.video_category_id}
              className="bg-zinc-700 text-zinc-200 text-xs px-2 py-1 rounded-full"
            >
              {cat.name}
            </span>
          ))}

          {cart.video?.tags?.map((tag) => (
            <span
              key={tag.video_tag_id}
              className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Controller
            name="duration_seconds"
            control={control}
            render={({ field }) => (
              <ZDurationInput
                value={field.value}
                onChange={field.onChange}
                onBlur={handleUpdate}
                onPresetSelect={(data) => handleUpdate(data)}
              />
            )}
          />
        </div>
      </div>
      <WarningAlert
        open={dDelete.open}
        title="Delete"
        agreeLabel="Delete"
        cancelLabel="Cancel"
        subtitle="Are you sure you want to delete this movie from your cart?"
        onAgree={() => {
          onDelete({ cart_item_id: cart.cart_item_id });
          dDelete.handleClose();
        }}
        onCancel={dDelete.handleClose}
      />
    </div>
  );
}
