"use client";
import { Show, ZImage, ZNoVideoFound, ZSkeleton } from "@/components";
import Link from "next/link";
import { usePopularVideos } from "../hooks/usePopularVideos";

export default function PopularVideos() {
  const query = usePopularVideos({ enabled: true });
  const videos = query.data ?? [];

  return (
    <>
      <Show.When condition={query.isPending}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          <ZSkeleton variant="card" orientation="horizontal" rows={6} />
        </div>
      </Show.When>

      <Show.When condition={!query.isPending && videos.length === 0}>
        <ZNoVideoFound />
      </Show.When>

      <Show.When condition={!query.isPending && videos.length > 0}>
        <div className="flex gap-4 overflow-x-auto py-2 flex-nowrap">
          {videos.map((video, index) => (
            <Link
              key={video.video_id}
              href={`/videos/${video.video_id}`}
              className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105 w-60"
            >
              <ZImage
                src={video.thumbnail_url}
                alt={video.title}
                width={300}
                height={200}
                className="w-full h-40 object-cover m-6"
              />

              <div className="p-3">
                <h3 className="text-white text-sm md:text-base font-semibold truncate line-clamp-2 group-hover:text-indigo-300 transition-colors leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Watched by {video.order_count} people
                </p>
              </div>

              <div className="absolute top-2 left-2">
                <span
                  className="text-[5rem] font-bold text-black"
                  style={{ WebkitTextStroke: "2px white" }}
                >
                  {index + 1}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Show.When>
    </>
  );
}
