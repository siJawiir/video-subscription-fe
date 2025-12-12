"use client";

import { WarningAlert } from "@/components/alert";
import { ZDataTable } from "@/components/tables";
import { useDatatable } from "@/hooks/useDatatable";
import { useDialog } from "@/hooks/useDialog";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { scrollToTop } from "@/utils/scroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoFormType, VideoParamsType } from "admin-video-type";
import { VideoResponseType } from "video-type";
import React from "react";
import { useFormContext } from "react-hook-form";
import { initialVideoFilter } from "../utils/constants";
import { columns } from "../utils/data-table";
import { deleteVideo, getVideo } from "../utils/services";

export default function VideoTable() {
  const datatable = useDatatable({
    initialPage: initialVideoFilter.current_page,
    initialPageSize: initialVideoFilter.per_page,
    initialFilters: initialVideoFilter,
  });

  const fVideo = useFormContext<VideoFormType>();
  const queryClient = useQueryClient();

  const { open: openDialog, handleOpen, handleClose } = useDialog();

  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null);

  const { data, isLoading, refetch } = usePaginatedQuery<
    VideoResponseType,
    VideoParamsType
  >({
    queryKey: [
      "video-video-list",
      datatable.filters,
      datatable.page,
      datatable.sorting,
    ],
    fetchFn: getVideo,
    params: {
      ...datatable.filters,
      current_page: datatable.page,
      per_page: datatable.pageSize,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (video_id: number) => {
      return deleteVideo({ video_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-video-list"] });
      scrollToTop();
      fVideo.reset();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const handleDeleteClick = (video_id: number) => {
    setItemToDelete(video_id);
    handleOpen();
  };

  const handleConfirmAgree = () => {
    if (itemToDelete) {
      deleteMutation.mutate(itemToDelete);
    }
    handleClose();
    setItemToDelete(null);
  };

  const handleConfirmCancel = () => {
    handleClose();
    setItemToDelete(null);
  };

  return (
    <>
      <ZDataTable<VideoResponseType>
        columns={columns}
        data={data?.data?.data || []}
        total={data?.data?.meta.total || 0}
        page={datatable.page}
        pageSize={datatable.pageSize}
        sorting={datatable.sorting}
        rowSelection={datatable.rowSelection}
        onPageChange={(page) => {
          datatable.setPage(page);
          refetch();
        }}
        onSortChange={(col, desc) => {
          datatable.setSorting([{ id: col, desc }]);
          refetch();
        }}
        onFilterChange={(value) => {
          datatable.setFilters({ ...datatable.filters, search: value });
          datatable.setPage(1);
          refetch();
        }}
        loading={isLoading}
        onEdit={(row) => {
          scrollToTop();
          fVideo.reset({
            ...row,
            categories: row.categories?.map((cat) => ({
              value: cat.video_category_id,
              label: cat.name,
            })),
            tags: row.tags?.map((tag) => ({
              value: tag.video_tag_id,
              label: tag.name,
            })),
          });
        }}
        onDelete={(row) => {
          handleDeleteClick(row.video_id!);
        }}
      />

      <WarningAlert
        open={openDialog}
        onOpenChange={handleOpen}
        title="Delete this video?"
        subtitle="You won't be able to revert this."
        onCancel={handleConfirmCancel}
        onAgree={handleConfirmAgree}
        cancelLabel="Cancel"
        agreeLabel="Confirm"
      />
    </>
  );
}
