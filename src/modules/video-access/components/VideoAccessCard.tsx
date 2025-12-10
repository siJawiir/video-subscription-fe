import { Show, ZImage } from "@/components";
import Link from "next/link";
import { VideoAccessResponseType } from "video-access-type";

interface Props {
  video_access: VideoAccessResponseType;
}
export default function VideoAccessCard({ video_access }: Props) {
  const categories = video_access.video.categories || [];
  return (
    <>
      <Link
        key={video_access.video_access_id}
        href={`/video-access/${video_access.video_access_id}`}
        className="group relative bg-zinc-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105"
      >
        <ZImage
          src={video_access.video.thumbnail_url}
          alt={video_access.video.title}
          width={300}
          height={200}
          className="w-full h-54 object-cover"
        />

        <h3 className="text-white text-sm font-semibold truncate group-hover:text-indigo-400 transition my-2">
          {video_access.video.title}
        </h3>

        <Show.When condition={categories !== null && categories.length > 0}>
          <div className="flex gap-0.5 flex-wrap">
            {categories.slice(0, 2).map((category, i) => (
              <div
                key={i}
                className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5"
              >
                {category.name}
              </div>
            ))}
            <Show.When condition={categories !== null && categories.length > 2}>
              <div className="text-zinc-400 text-xs font-semibold truncate bg-indigo-950 rounded-full px-2 py-0.5">
                +{(categories?.length ?? 0) - 2}
              </div>
            </Show.When>
          </div>
        </Show.When>
      </Link>
    </>
  );
}
