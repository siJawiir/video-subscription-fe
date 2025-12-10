"use client";

import { FormProvider, useForm } from "react-hook-form";
import VideoAccessList from "./components/VideoAccessList";
import VideoCategoryList from "./components/VideoCategoryList";
import { INITIAL_VIDEO_PARAMS } from "./utils/constans";

export default function VideoAccess() {
  const methods = useForm({
    defaultValues: INITIAL_VIDEO_PARAMS,
  });

  return (
    <>
      <FormProvider {...methods}>
        <div className="p-3 space-y-2">
          <VideoCategoryList />
          <VideoAccessList />
        </div>
      </FormProvider>
    </>
  );
}
