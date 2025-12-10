"use client";
import { Show, ZDataList, ZNoVideoFound, ZSkeleton } from "@/components";
import { useFormContext, useWatch } from "react-hook-form";
import {
  VideoAccessParamsType,
  VideoAccessResponseType,
} from "video-access-type";
import { INITIAL_VIDEO_PARAMS } from "../utils/constans";
import VideoAccessCard from "./VideoAccessCard";
import { useVideoAccess } from "../hooks/useVideoAccess";

export default function VideoAccessList() {
  const { control } = useFormContext<VideoAccessParamsType>();

  const categoryID = useWatch({
    control,
    name: "category_id",
  });

  const { data, isPending } = useVideoAccess({
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
          <ZDataList<VideoAccessResponseType>
            data={videos}
            getId={(item) => item.video_id!}
            renderItem={(item) => <VideoAccessCard video_access={item} />}
            isDraggable={false}
            clasName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3"
          />
        </div>
      </Show.When>
    </>
  );
}
