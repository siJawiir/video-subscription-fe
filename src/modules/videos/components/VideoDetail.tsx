"use client";

import {
  Show,
  ZButton,
  ZDurationInput,
  ZIconButton,
  ZSkeleton,
} from "@/components";
import { useDialog } from "@/hooks/useDialog";
import { useMutationCart } from "@/modules/cart/hooks/useMutationCart";
import { INITIAL_CART_FORM } from "@/modules/cart/utils/constans";
import { isEmpty } from "@/utils/data";
import { formatNumber } from "@/utils/number";
import {
  ChevronLeft,
  ChevronLeftIcon,
  Folder,
  Play,
  ShoppingCart,
  Tag,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useVideoDetail } from "../hooks/useVideoDetail";
import PopularVideos from "@/modules/dashboard/components/PopularVideos";
import Link from "next/link";

export default function VideoDetail() {
  const { status } = useSession();
  const { control } = useForm({ defaultValues: INITIAL_CART_FORM });

  const { push } = useRouter();

  const videoID = usePathname().split("/")[2];
  const durationSeconds = useWatch({
    control,
    name: "duration_seconds",
  });

  const { data, isPending } = useVideoDetail({
    enabled: !isEmpty(videoID),
    video_id: Number(videoID),
  });

  const dWatchNow = useDialog();

  const { onSubmit, isPending: isPendingCart } = useMutationCart({
    videoID: Number(videoID),
  });

  const handleCart = () => {
    onSubmit({
      duration_seconds: durationSeconds,
      video_id: Number(videoID),
    });
  };

  return (
    <>
      <form>
        <Show.When condition={isPending}>
          <div className="p-6">
            <ZSkeleton variant="table" rows={4} orientation="vertical" />
          </div>
        </Show.When>
        <Show.When condition={!isPending}>
          <div className="max-w-6xl mx-auto p-6 relative">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="absolute top-6 -left-12">
                <Link href="/videos">
                  <ZIconButton icon={<ChevronLeftIcon />} />
                </Link>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden shadow-2xl border border-zinc-800">
                <Show.When condition={!!data?.video_url}>
                  <iframe
                    className="w-full h-64 md:h-full"
                    src={data?.video_url.replace("watch?v=", "embed/")}
                    title={data?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <Show.Else>
                    <div className="w-full h-64 md:h-full bg-zinc-900 flex items-center justify-center">
                      <p className="text-gray-400">Video not found</p>
                    </div>
                  </Show.Else>
                </Show.When>
              </div>

              <div className="flex-1 flex flex-col gap-5">
                <div className="flex items-center ">
                  <h1 className="text-3xl font-bold">{data?.title}</h1>
                </div>

                <p className="text-gray-300 text-lg">{data?.description}</p>

                <div className="flex items-end space-x-2">
                  <div className="text-3xl font-semibold mt-2">
                    IDR {formatNumber(Number(data?.price) * 3600)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">per hour</p>
                  </div>
                </div>

                <Controller
                  name="duration_seconds"
                  control={control}
                  render={({ field }) => (
                    <ZDurationInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <div className="flex items-center gap-4 mt-4">
                  <ZButton
                    type="button"
                    className="flex items-center gap-2 "
                    onClick={() => {
                      if (status === "authenticated") {
                        dWatchNow.handleOpen();
                      } else {
                        push("/login");
                      }
                    }}
                  >
                    <Play size={18} /> Watch Now
                  </ZButton>

                  <ZButton
                    variant="outline"
                    type="button"
                    className="flex items-center gap-2"
                    onClick={() => {
                      if (status === "authenticated") {
                        handleCart();
                      } else {
                        push("/login");
                      }
                    }}
                    isPending={isPendingCart}
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </ZButton>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Folder size={16} /> Categories:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(data?.categories || []).slice(0, 3).map((cat) => (
                      <span
                        key={cat.video_category_id}
                        className="px-3 py-1 bg-zinc-900 text-gray-100 rounded-full text-sm flex items-center gap-1 hover:bg-zinc-700 transition cursor-pointer"
                      >
                        <Folder size={14} /> {cat.name}
                      </span>
                    ))}
                    <Show.When condition={(data?.categories || []).length > 3}>
                      <span className="px-3 py-1 bg-zinc-900 text-gray-100 rounded-full text-sm flex items-center gap-1 hover:bg-zinc-700 transition cursor-pointer">
                        <Folder size={14} /> More
                      </span>
                    </Show.When>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Tag size={16} /> Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {(data?.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag.video_tag_id}
                        className="px-3 py-1 bg-zinc-900 text-white rounded-full text-sm flex items-center gap-1 hover:bg-zinc-700 transition cursor-pointer"
                      >
                        <Tag size={14} /> {tag.name}
                      </span>
                    ))}
                    <Show.When condition={(data?.tags || []).length > 3}>
                      <span className="px-3 py-1 bg-zinc-900 text-white rounded-full text-sm flex items-center gap-1 hover:bg-zinc-700 transition cursor-pointer">
                        <Tag size={14} /> More
                      </span>
                    </Show.When>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 p-6">
            <p className="font-semibold mb-2">You might also like</p>
            <PopularVideos />
          </div>
        </Show.When>
      </form>
    </>
  );
}
