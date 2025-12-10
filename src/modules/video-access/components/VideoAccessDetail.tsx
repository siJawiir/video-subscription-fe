"use client";

import { Show, ZSkeleton } from "@/components";
import { isEmpty } from "@/utils/data";
import { Film, Folder, Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { useVideoDetail } from "../hooks/useVideoAccessDetail";
import VideoAccessPlayer from "./VideoAccessPlayer";

export default function VideoAccessDetail() {
  const videoAccessID = usePathname().split("/")[2];

  const { data, isPending } = useVideoDetail({
    enabled: !isEmpty(videoAccessID),
    video_access_id: Number(videoAccessID),
  });

  return (
    <>
      <form>
        <Show.When condition={isPending}>
          <div className="p-6">
            <ZSkeleton variant="table" rows={4} orientation="vertical" />
          </div>
        </Show.When>

        <Show.When condition={!isPending}>
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col gap-10">
              <div
                className="
                rounded-2xl overflow-hidden shadow-2xl border border-zinc-800
                bg-black relative
              "
              >
                <div className="w-full h-6 bg-black"></div>

                <Show.When
                  condition={
                    !!data?.video.video_url &&
                    Number(data.remaining_time_seconds || 0) > 0
                  }
                >
                  <VideoAccessPlayer
                    url={data?.video.video_url as string}
                    video_access_id={Number(videoAccessID)}
                  />
                  <Show.Else>
                    <div className="w-full h-[400px] bg-zinc-900 flex items-center justify-center">
                      <p className="text-gray-400">
                        You don&apos;t have access
                      </p>
                    </div>
                  </Show.Else>
                </Show.When>

                <div className="w-full h-6 bg-black"></div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Film size={28} className="text-indigo-400" />
                  <h1 className="text-4xl font-extrabold tracking-tight text-white">
                    {data?.video.title}
                  </h1>
                </div>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {data?.video.description}
                </p>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-indigo-300">
                    <Folder size={18} /> Categories
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {(data?.video.categories || []).slice(0, 3).map((cat) => (
                      <span
                        key={cat.video_category_id}
                        className="
                          px-3 py-1 bg-zinc-900 border border-zinc-800 
                          text-gray-100 rounded-full text-sm
                        "
                      >
                        {cat.name}
                      </span>
                    ))}

                    <Show.When
                      condition={(data?.video.categories || []).length > 3}
                    >
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-100 rounded-full text-sm">
                        More…
                      </span>
                    </Show.When>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-indigo-300">
                    <Tag size={18} /> Tags
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {(data?.video.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag.video_tag_id}
                        className="
                          px-3 py-1 bg-zinc-900 border border-zinc-800 
                          text-gray-100 rounded-full text-sm
                        "
                      >
                        {tag.name}
                      </span>
                    ))}

                    <Show.When condition={(data?.video.tags || []).length > 3}>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-100 rounded-full text-sm">
                        More…
                      </span>
                    </Show.When>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Show.When>
      </form>
    </>
  );
}
