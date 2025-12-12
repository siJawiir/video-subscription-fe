"use client";

import { MasterFormTemplate } from "@/components/templates";
import { isEmpty } from "@/utils/data";
import { VideoFormType } from "admin-video-type";
import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import VideoForm from "./components/VideoForm";
import VideoTable from "./components/VideoTable";
import { initialVideo } from "./utils/constants";

export default function Videos() {
  const methods = useForm<VideoFormType>({
    defaultValues: initialVideo,
  });

  const [open, setOpen] = React.useState<boolean>(false);

  const ID = useWatch({
    control: methods.control,
    name: "video_id",
  });

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!isEmpty(ID)) {
      setOpen(false);
      methods.reset(initialVideo);
    }
  };

  const isFormOpen = !isEmpty(ID) || open;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <FormProvider {...methods}>
        <MasterFormTemplate
          title="Video List"
          subtitle="This is a list of videos."
          isOpen={isFormOpen}
          onToggle={handleToggle}
          addLabel="Add Video"
        >
          <VideoForm />
        </MasterFormTemplate>

        <VideoTable />
      </FormProvider>
    </div>
  );
}
