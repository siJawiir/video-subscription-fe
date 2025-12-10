"use client";
import { Show, ZImage, ZSkeleton } from "@/components";
import Link from "next/link";
import { useLatestVideos } from "../hooks/useLatestVideos";

export default function LatestVideos() {
  const query = useLatestVideos({ enabled: true });
  const videos = query.data ?? [];

  return (
    <>
      <Show.When condition={query.isPending}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          <ZSkeleton variant="card" orientation="horizontal" rows={6} />
        </div>
      </Show.When>

      <Show.When condition={!query.isPending && videos.length === 0}>
        <p className="text-zinc-400 text-sm text-center">No videos found.</p>
      </Show.When>

      <Show.When condition={!query.isPending && videos.length > 0}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          {videos.map((video) => (
            <Link
              key={video.video_id}
              href={`/videos/${video.video_id}`}
              className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 min-w-[220px]"
            >
              <ZImage
                src={video.thumbnail_url}
                alt={video.title}
                width={300}
                height={200}
                className="w-full h-54 object-cover"
              />

              <div className="p-3">
                <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition">
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </Show.When>
    </>
  );
}
