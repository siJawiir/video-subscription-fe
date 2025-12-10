"use client";

import { FormProvider, useForm } from "react-hook-form";
import VideoList from "./components/VideoList";
import { INITIAL_VIDEO_PARAMS } from "./utils/constans";
import VideoCategoryList from "./components/VideoCategoryList";

export default function Videos() {
  const methods = useForm({
    defaultValues: INITIAL_VIDEO_PARAMS,
  });

  return (
    <>
      <FormProvider {...methods}>
        <div className="p-3 space-y-2">
          <VideoCategoryList />
          <VideoList />
        </div>
      </FormProvider>
    </>
  );
}
