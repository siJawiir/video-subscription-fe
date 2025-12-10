import { RowSelectionState, SortingState } from "@tanstack/react-table";
import { useEffect, useState } from "react";

export interface UseDatatableOptions<TFilter = Record<string, unknown>> {
  initialPage?: number;
  initialPageSize?: number;
  initialSort?: SortingState;
  initialFilters?: TFilter;
  onChange?: (state: {
    page: number;
    pageSize: number;
    sorting: SortingState;
    filters: TFilter;
    rowSelection: RowSelectionState;
  }) => void;
}

export function useDatatable<
  TFilter extends Record<string, unknown> = Record<string, unknown>
>(options?: UseDatatableOptions<TFilter>) {
  const [page, setPage] = useState(options?.initialPage || 1);
  const [pageSize] = useState(options?.initialPageSize || 10);
  const [sorting, setSorting] = useState<SortingState>([
    { desc: true, id: "" },
  ]);
  const [filters, setFilters] = useState<TFilter>(
    options?.initialFilters || ({} as TFilter)
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    options?.onChange?.({ page, pageSize, sorting, filters, rowSelection });
  }, [page, pageSize, sorting, filters, rowSelection, options]);

  const resetPage = () => setPage(1);

  return {
    page,
    pageSize,
    sorting,
    filters,
    rowSelection,
    setPage,
    setSorting,
    setFilters,
    setRowSelection,
    resetPage,
  };
}
