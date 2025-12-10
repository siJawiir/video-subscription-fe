"use client";
import { Show, ZDataList, ZNoVideoFound, ZSkeleton } from "@/components";
import { VideoParamsType, VideoResponseType } from "video-type";
import { useVideos } from "../hooks/useVideos";
import { INITIAL_VIDEO_PARAMS } from "../utils/constans";
import VideoCard from "./VideoCard";
import { useFormContext, useWatch } from "react-hook-form";

export default function VideoList() {
  const { control } = useFormContext<VideoParamsType>();

  const categoryID = useWatch({
    control,
    name: "category_id",
  });

  const { data, isPending } = useVideos({
    enabled: true,
    params: {
      ...INITIAL_VIDEO_PARAMS,
      category_id: categoryID,
    },
  });

  const videos = data || [];

  return (
    <>
      <Show.When condition={isPending}>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
          <ZSkeleton variant="card" orientation="horizontal" rows={2} />
        </div>
      </Show.When>

      <Show.When condition={!isPending && videos.length === 0}>
        <ZNoVideoFound />
      </Show.When>

      <Show.When condition={!isPending && videos.length > 0}>
        <div>
          <ZDataList<VideoResponseType>
            data={videos}
            getId={(item) => item.video_id!}
            renderItem={(item) => <VideoCard video={item} />}
            isDraggable={false}
            clasName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
          />
        </div>
      </Show.When>
    </>
  );
}
