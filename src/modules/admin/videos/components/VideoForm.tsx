"use client";

import { MutationResponse } from "@/@types/api";
import { ZFormButton } from "@/components/buttons";
import {
  ZCurrencyInput,
  ZMultiOptionInput,
  ZSwitchInput,
  ZTextareaInput,
  ZTextInput,
} from "@/components/inputs";
import { isEmpty } from "@/utils/data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoFormType, VideoUpdateFormType } from "admin-video-type";
import {
  Controller,
  SubmitHandler,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { toast } from "sonner";
import { initialVideo } from "../utils/constants";
import { createVideo, updateVideo } from "../utils/services";
import { ResourceType } from "resource-types";

export default function VideoForm() {
  const queryClient = useQueryClient();

  const { register, formState, reset, handleSubmit, control, getValues } =
    useFormContext<VideoFormType>();
  console.log("🚀 ~ VideoForm ~ getValues:", getValues());

  const ID = useWatch({
    control,
    name: "video_id",
  });

  const mutation = useMutation<MutationResponse, Error, VideoFormType>({
    mutationFn: (data) =>
      data.video_id
        ? updateVideo(data as VideoUpdateFormType)
        : createVideo(data),
    onSuccess: (response, variables) => {
      const action = variables.video_id ? "updated" : "created";

      if (response.success) {
        toast.success(`Video successfully ${action}`, {
          description: response.message ?? "Data successfully saved.",
        });
        queryClient.invalidateQueries({
          queryKey: ["video-video-list"],
        });

        if (!variables.video_id) {
          reset(initialVideo);
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

  const onSubmit: SubmitHandler<VideoFormType> = (data) => {
    const payload = {
      ...data,
      categories:
        data.categories?.map((category: ResourceType) => category.value) || [],
      tags: data.tags?.map((tag: ResourceType) => tag.value) || [],
    };
    console.log("🚀 ~ onSubmit ~ data:", data);
    console.log("🚀 ~ onSubmit ~ payload:", payload);
    mutation.mutate(payload as unknown as VideoFormType);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <ZTextInput
          label="Title"
          placeholder="type video title"
          {...register("title")}
          required
          error={formState.errors.title?.message}
        />

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <ZTextInput
              label="URL"
              placeholder="type video url"
              {...register("video_url")}
              required
              error={formState.errors.video_url?.message}
            />
          </div>
          <Controller
            control={control}
            name="price"
            render={({ field }) => (
              <ZCurrencyInput
                label="Price"
                value={field.value}
                onValueChange={field.onChange}
                placeholder="type video price /seconds"
                required
                error={formState.errors.price?.message}
                icon={
                  <>
                    <div className="flex flex-col items-end bg-rose-900 px-1 py-0.5 rounded-md">
                      <p className="text-sm text-white">/seconds</p>
                    </div>
                  </>
                }
                iconPosition="right"
              />
            )}
          />
        </div>

        <Controller
          control={control}
          name="categories"
          render={({ field }) => (
            <ZMultiOptionInput
              label="Categories"
              placeholder="Select categories..."
              value={field.value}
              onValueChange={field.onChange}
              async
              resource={"video-category"}
            />
          )}
        />

        <Controller
          control={control}
          name="tags"
          render={({ field }) => (
            <ZMultiOptionInput
              label="Tags"
              placeholder="Select tags..."
              value={field.value}
              onValueChange={field.onChange}
              async
              resource={"video-tag"}
            />
          )}
        />

        <Controller
          name="is_active"
          control={control}
          render={({ field }) => (
            <ZSwitchInput
              label="is Video Active?"
              description="If checked, video will be active and visible to users"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />

        <ZTextareaInput
          label="Description"
          placeholder="type video description (opsional)"
          {...register("description")}
          error={formState.errors.description?.message}
        />
      </div>

      <ZFormButton
        isPending={mutation.isPending}
        onReset={() => {
          reset(initialVideo);
        }}
        submitLabel={isEmpty(ID) ? "Save" : "Save Changes"}
      />
    </form>
  );
}
