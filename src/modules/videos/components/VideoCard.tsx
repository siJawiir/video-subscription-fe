import { Show, ZImage } from "@/components";
import Link from "next/link";
import { VideoResponseType } from "video-type";

interface Props {
  video: VideoResponseType;
}
export default function VideoCard({ video }: Props) {
  return (
    <>
      <Link
        key={video.video_id}
        href={`/videos/${video.video_id}`}
        className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
      >
        <ZImage
          src={video.thumbnail_url}
          alt={video.title}
          width={300}
          height={200}
          className="w-full h-54 object-cover"
        />

        <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition my-2">
          {video.title}
        </h3>

        <Show.When
          condition={video.categories !== null && video.categories.length > 0}
        >
          <div className="flex gap-0.5 flex-wrap">
            {(video.categories || []).slice(0, 2).map((category, i) => (
              <div
                key={i}
                className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5"
              >
                {category.name}
              </div>
            ))}
            <Show.When
              condition={
                video.categories !== null && video.categories.length > 2
              }
            >
              <div className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5">
                +{(video.categories?.length ?? 0) - 2}
              </div>
            </Show.When>
          </div>
        </Show.When>
      </Link>
    </>
  );
}
