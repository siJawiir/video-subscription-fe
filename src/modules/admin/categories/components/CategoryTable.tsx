"use client";

import React from "react";
import { ZDataTable } from "@/components/tables";
import { useDatatable } from "@/hooks/useDatatable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";
import { initialCategoryFilter } from "../utils/constants";
import { columns } from "../utils/data-table";
import { getCategory, deleteCategory } from "../utils/services";
import { scrollToTop } from "@/utils/scroll";
import { useDialog } from "@/hooks/useDialog";
import { WarningAlert } from "@/components/alert";
import { VideoCategoryFormType } from "admin-category-type";
import { VideoCategoryResponseType } from "category-type";

export default function CategoryTable() {
  const datatable = useDatatable({
    initialPage: initialCategoryFilter.page,
    initialPageSize: initialCategoryFilter.pageSize,
    initialFilters: initialCategoryFilter,
  });

  const fCategory = useFormContext<VideoCategoryFormType>();
  const queryClient = useQueryClient();

  const { open: openDialog, handleOpen, handleClose } = useDialog();

  const [itemToDelete, setItemToDelete] = React.useState<number | null>(null);

  const { data, isLoading, refetch } = useQuery<{
    data: VideoCategoryResponseType[];
    total: number;
  }>({
    queryKey: [
      "video-category-list",
      datatable.filters,
      datatable.page,
      datatable.sorting,
    ],
    queryFn: async () => {
      const res = await getCategory({
        ...datatable.filters,
        page: datatable.page,
        pageSize: datatable.pageSize,
        sortBy: datatable.sorting[0]?.id,
        sortOrder: datatable.sorting[0]?.desc ? "desc" : "asc",
      });
      if (!res.success || !res.data) {
        return { data: [], total: 0 };
      }
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (video_category_id: number) => {
      return deleteCategory({ video_category_id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category-list"] });
      scrollToTop();
      fCategory.reset();
    },
    onError: (error) => {
      console.error("Delete failed:", error);
    },
  });

  const handleDeleteClick = (video_category_id: number) => {
    setItemToDelete(video_category_id);
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
      <ZDataTable<VideoCategoryResponseType>
        columns={columns}
        data={data?.data || []}
        total={data?.total || 0}
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
          datatable.setFilters({ ...datatable.filters, name: value });
          datatable.setPage(1);
          refetch();
        }}
        loading={isLoading}
        onEdit={(row) => {
          scrollToTop();
          fCategory.reset(row);
        }}
        onDelete={(row) => {
          handleDeleteClick(row.video_category_id!);
        }}
      />

      <WarningAlert
        open={openDialog}
        onOpenChange={handleOpen}
        title="Hapus Tingkatan Kelas?"
        subtitle="Data ini akan dihapus secara permanen dan tidak dapat dikembalikan."
        onCancel={handleConfirmCancel}
        onAgree={handleConfirmAgree}
        cancelLabel="Batal"
        agreeLabel="Hapus"
      />
    </>
  );
}
