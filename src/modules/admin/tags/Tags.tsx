"use client";

import { MasterFormTemplate } from "@/components/templates";
import { isEmpty } from "@/utils/data";
import { VideoTagFormType } from "admin-tag-type";
import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import TagForm from "./components/TagForm";
import TagTable from "./components/TagTable";
import { initialTag } from "./utils/constants";

export default function Tags() {
  const methods = useForm<VideoTagFormType>({
    defaultValues: initialTag,
  });

  const [open, setOpen] = React.useState<boolean>(false);

  const ID = useWatch({
    control: methods.control,
    name: "video_tag_id",
  });

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!isEmpty(ID)) {
      setOpen(false);
      methods.reset(initialTag);
    }
  };

  const isFormOpen = !isEmpty(ID) || open;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <FormProvider {...methods}>
        <MasterFormTemplate
          title="Video Tag List"
          subtitle="This is a list of video tags."
          isOpen={isFormOpen}
          onToggle={handleToggle}
          addLabel="Add Video Tag"
        >
          <TagForm />
        </MasterFormTemplate>

        <TagTable />
      </FormProvider>
    </div>
  );
}
