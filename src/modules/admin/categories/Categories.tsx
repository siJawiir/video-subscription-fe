"use client";

import { MasterFormTemplate } from "@/components/templates";
import { isEmpty } from "@/utils/data";
import { VideoCategoryFormType } from "admin-category-type";
import React from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";
import { initialCategory } from "./utils/constants";

export default function Categories() {
  const methods = useForm<VideoCategoryFormType>({
    defaultValues: initialCategory,
  });

  const [open, setOpen] = React.useState<boolean>(false);

  const ID = useWatch({
    control: methods.control,
    name: "video_category_id",
  });

  const handleToggle = () => {
    setOpen((prev) => !prev);
    if (!isEmpty(ID)) {
      setOpen(false);
      methods.reset(initialCategory);
    }
  };

  const isFormOpen = !isEmpty(ID) || open;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <FormProvider {...methods}>
        <MasterFormTemplate
          title="Video Category List"
          subtitle="This is a list of video categories."
          isOpen={isFormOpen}
          onToggle={handleToggle}
          addLabel="Add Video Category"
        >
          <CategoryForm />
        </MasterFormTemplate>

        <CategoryTable />
      </FormProvider>
    </div>
  );
}
