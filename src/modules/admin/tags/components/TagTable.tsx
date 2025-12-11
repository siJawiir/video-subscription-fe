"use client";

import { WarningAlert } from "@/components/alert";
import { ZDataTable } from "@/components/tables";
import { useDatatable } from "@/hooks/useDatatable";
import { useDialog } from "@/hooks/useDialog";
import { usePaginatedQuery } from "@/hooks/usePaginatedQuery";
import { scrollToTop } from "@/utils/scroll";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VideoTagFormType, VideoTagParamsType } from "admin-tag-type";
import { VideoTagResponseType } from "admin-tag-type";
import React from "react";
import { useFormContext } from "react-hook-form";
import { initialTagFilter } from "../utils/constants";
import { columns } from "../utils/data-table";
import { deleteTag, getTag } from "../utils/services";

export default function TagTable() {
  const datatable = useDatatable({
    initialPage: initialTagFilter.current_page,
    initialPageSize: initialTagFilter.per_page,
    initialFilters: initialTagFilter,
  });

  const fTag = useFormContext<VideoTagFormType>();
  const queryClient = useQueryClient();

  const { open: openDialog, handleOpen, handleClose } = useDialog();

  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null);

  const { data, isLoading, refetch } = usePaginatedQuery<
    VideoTagResponseType,
    VideoTagParamsType
  >({
    queryKey: [
      "video-tag-list",
      datatable.filters,
      datatable.page,
      datatable.sorting,
    ],
    fetchFn: getTag,
    params: {
      ...datatable.filters,
      current_page: datatable.page,
      per_page: datatable.pageSize,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (video_tag_id: number) => {
      return deleteTag({ video_tag_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["video-tag-list"] });
      scrollToTop();
      fTag.reset();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const handleDeleteClick = (video_tag_id: number) => {
    setItemToDelete(video_tag_id);
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
      <ZDataTable<VideoTagResponseType>
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
          fTag.reset(row);
        }}
        onDelete={(row) => {
          handleDeleteClick(row.video_tag_id!);
        }}
      />

      <WarningAlert
        open={openDialog}
        onOpenChange={handleOpen}
        title="Delete this tag?"
        subtitle="You won't be able to revert this."
        onCancel={handleConfirmCancel}
        onAgree={handleConfirmAgree}
        cancelLabel="Cancel"
        agreeLabel="Confirm"
      />
    </>
  );
}
