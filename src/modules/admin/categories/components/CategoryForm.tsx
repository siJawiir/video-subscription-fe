"use client";

import { ZFormButton } from "@/components/buttons";
import { ZTextareaInput, ZTextInput } from "@/components/inputs";
import { ApiResponse } from "@/lib/handlers/handlers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  VideoCategoryFormType,
  VideoCategoryUpdateFormType,
} from "admin-category-type";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { initialCategory } from "../utils/constants";
import { createCategory, updateCategory } from "../utils/services";

export default function CategoryForm() {
  const queryClient = useQueryClient();

  const { register, formState, reset, handleSubmit } =
    useFormContext<VideoCategoryFormType>();

  type MutationResponse = ApiResponse<VideoCategoryFormType>;

  const mutation = useMutation<MutationResponse, Error, VideoCategoryFormType>({
    mutationFn: (data) =>
      data.video_category_id
        ? updateCategory(data as VideoCategoryUpdateFormType)
        : createCategory(data),
    onSuccess: (response, variables) => {
      const action = variables.video_category_id ? "diupdate" : "dibuat";

      if (response.success) {
        toast.success(`Tingkatan Kelas berhasil ${action}`, {
          description: response.message ?? "Data tersimpan dengan baik.",
        });
        queryClient.invalidateQueries({
          queryKey: ["category-list"],
        });

        if (!variables.video_category_id) {
          reset(initialCategory);
        }
      } else {
        toast.error("Gagal menyimpan jabatan", {
          description:
            response.error ?? "Terjadi kesalahan yang tidak diketahui.",
        });
      }
    },
    onError: (error) => {
      toast.error("Gagal mengirim data", {
        description: error.message ?? "Terjadi kesalahan server.",
      });
    },
  });

  const onSubmit: SubmitHandler<VideoCategoryFormType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <ZTextInput
            label="Nama Kategori"
            placeholder="Masukkan nama kategori"
            {...register("name")}
            required
            error={formState.errors.name?.message}
          />

          <ZTextInput
            label="Slug"
            placeholder="Masukkan slug kategori"
            {...register("slug")}
            required
            error={formState.errors.slug?.message}
          />

          <ZTextareaInput
            label="Deskripsi"
            placeholder="Deskripsi (opsional)"
            {...register("description")}
            error={formState.errors.description?.message}
          />
        </div>
      </div>

      <ZFormButton
        isPending={mutation.isPending}
        onReset={() => {
          reset(initialCategory);
        }}
      />
    </form>
  );
}
