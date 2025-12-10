"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useState } from "react";
import { Edit, LucideSearch, MoreHorizontal, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ZButton } from "../buttons";
import { ZEmptyCard } from "../cards";
import { Show } from "../utils";

interface ZDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  total?: number;
  page?: number;
  pageSize?: number;
  loading?: boolean;
  onPageChange?: (page: number) => void;
  onSortChange?: (columnId: string, desc: boolean) => void;
  onFilterChange?: (globalFilter: string) => void;
  renderNoData?: ReactNode;
  enableRowSelection?: boolean;
  showRowNumber?: boolean;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  sorting?: SortingState;
  rowSelection?: RowSelectionState;
  showRowActions?: boolean;
}

export function ZDataTable<TData>({
  columns,
  data,
  total = 0,
  page = 1,
  pageSize = 10,
  loading,
  onPageChange,
  onSortChange,
  onFilterChange,
  renderNoData,
  enableRowSelection = false,
  showRowNumber = true,
  onEdit,
  onDelete,
  sorting: externalSorting,
  rowSelection: externalRowSelection,
  showRowActions = true,
}: ZDataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>(externalSorting || []);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    externalRowSelection || {}
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter, rowSelection },
    enableRowSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount: Math.ceil(total / pageSize),
  });

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="w-full overflow-x-auto border rounded-lg shadow-sm bg-white p-4">
      {/* Global Search */}
      <div className="flex justify-end mb-3">
        <div className="relative w-64">
          <Input
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => {
              const value = e.target.value;
              setGlobalFilter(value);
              onFilterChange?.(value);
              onPageChange?.(1);
            }}
            className="pr-10"
          />
          <LucideSearch
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>
      </div>

      {/* Table */}
      <Table className="min-w-full border-collapse relative">
        <TableHeader className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {showRowNumber && <TableHead className="w-12">#</TableHead>}
              {enableRowSelection && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    onCheckedChange={(value) =>
                      table.toggleAllRowsSelected(!!value)
                    }
                  />
                </TableHead>
              )}
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={() => {
                    if (onSortChange && header.column.getCanSort()) {
                      const isDesc = header.column.getIsSorted() === "asc";
                      onSortChange(header.column.id, isDesc);
                    }
                  }}
                  className={`cursor-pointer select-none ${
                    header.column.getIsSorted()
                      ? "text-blue-600 font-semibold"
                      : "text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-1">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "asc"
                        ? " 🔼"
                        : " 🔽"
                      : null}
                  </div>
                </TableHead>
              ))}
              {/* Actions column sticky */}
              <Show.When condition={showRowActions}>
                <TableHead className="text-right sticky right-0 bg-gray-50 z-20">
                  Actions
                </TableHead>
              </Show.When>
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <TableRow
              key={row.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {showRowNumber && (
                <TableCell className="py-2 px-3">
                  {(page - 1) * pageSize + rowIndex + 1}
                </TableCell>
              )}
              {enableRowSelection && (
                <TableCell className="w-12">
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                  />
                </TableCell>
              )}
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className="py-2 px-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              <Show.When condition={showRowActions}>
                <TableCell className="text-right py-2 px-3 sticky right-0 bg-white z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => onEdit?.(row.original)}
                        className="flex items-center space-x-2"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete?.(row.original)}
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700! hover:bg-red-50!"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </Show.When>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={
                  columns.length +
                  (enableRowSelection ? 1 : 0) +
                  (showRowNumber ? 1 : 0) +
                  1 // actions
                }
                className="text-center py-6 text-gray-400"
              >
                {loading ? "Loading..." : renderNoData || <ZEmptyCard />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {total > pageSize && onPageChange && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600 text-sm">
            Page {page} of {totalPages} ({total} items)
          </div>
          <div className="flex space-x-2">
            <ZButton
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </ZButton>
            <ZButton
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </ZButton>
          </div>
        </div>
      )}
    </div>
  );
}
