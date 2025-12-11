"use client";

import { ZFormButton } from "@/components/buttons";
import { ZTextareaInput, ZTextInput } from "@/components/inputs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoTagFormType, VideoTagUpdateFormType } from "admin-admin-tag-type";
import { SubmitHandler, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { initialTag } from "../utils/constants";
import { createTag, updateTag } from "../utils/services";
import { ApiResponse } from "@/@types/api";
import { isEmpty } from "@/utils/data";

export default function TagForm() {
  const queryClient = useQueryClient();

  const { register, formState, reset, handleSubmit, setValue, control } =
    useFormContext<VideoTagFormType>();

  const ID = useWatch({
    control,
    name: "video_tag_id",
  });

  type MutationResponse = ApiResponse<VideoTagFormType>;

  const mutation = useMutation<MutationResponse, Error, VideoTagFormType>({
    mutationFn: (data) =>
      data.video_tag_id
        ? updateTag(data as VideoTagUpdateFormType)
        : createTag(data),
    onSuccess: (response, variables) => {
      const action = variables.video_tag_id ? "updated" : "created";

      if (response.success) {
        toast.success(`Video Tag successfully ${action}`, {
          description: response.message ?? "Data successfully saved.",
        });
        queryClient.invalidateQueries({
          queryKey: ["video-tag-list"],
        });

        if (!variables.video_tag_id) {
          reset(initialTag);
        }
      } else {
        toast.error("Failed to send data", {
          description:
            response.error ?? "Something went wrong, please try again later.",
        });
      }
    },
    onError: (error) => {
      toast.error("Failed to send data", {
        description: error.message ?? "Server error, please try again later.",
      });
    },
  });

  const onSubmit: SubmitHandler<VideoTagFormType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <ZTextInput
          label="Name"
          placeholder="input tag name"
          {...register("name")}
          required
          error={formState.errors.name?.message}
        />

        <ZTextInput
          label="Slug"
          placeholder="input tag slug"
          {...register("slug")}
          required
          error={formState.errors.slug?.message}
          onChange={(e) => {
            const value = e.target.value.replace(/\s+/g, "-");
            e.target.value = value;
            setValue("slug", value, { shouldValidate: true });
          }}
        />

        <ZTextareaInput
          label="Description"
          placeholder="input tag description (opsional)"
          {...register("description")}
          error={formState.errors.description?.message}
        />
      </div>

      <ZFormButton
        isPending={mutation.isPending}
        onReset={() => {
          reset(initialTag);
        }}
        submitLabel={isEmpty(ID) ? "Save" : "Save Changes"}
      />
    </form>
  );
}
