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
  getSortedRowModel,
  getPaginationRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ReactNode, useMemo, useState } from "react";
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

interface ZDataTableClientProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];

  defaultPageSize?: number;
  renderNoData?: ReactNode;
  enableRowSelection?: boolean;
  showRowNumber?: boolean;

  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
  showRowActions?: boolean;
}

export function ZDataTableClient<TData>({
  columns,
  data,
  defaultPageSize = 10,
  renderNoData,
  enableRowSelection = false,
  showRowNumber = true,
  onEdit,
  onDelete,
  showRowActions = true,
}: ZDataTableClientProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [pageIndex, setPageIndex] = useState(0);

  const filteredData = useMemo(() => {
    if (!globalFilter) return data;

    return data.filter((row) => {
      const values = Object.values(row ?? {});
      return values.some((val) =>
        String(val).toLowerCase().includes(globalFilter.toLowerCase())
      );
    });
  }, [data, globalFilter]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      rowSelection,
      globalFilter,
      pagination: { pageIndex, pageSize },
    },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: (updater) => {
      const model =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(model.pageIndex);
      setPageSize(model.pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // optional
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const total = filteredData.length;
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
              setGlobalFilter(e.target.value);
              setPageIndex(0);
            }}
            className="pr-10"
          />
          <LucideSearch
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
        </div>

        {/* <select
          className="border rounded p-2 text-sm"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
        >
          {[5, 10, 20, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </select> */}
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
                  onClick={() => header.column.toggleSorting()}
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
                  {pageIndex * pageSize + rowIndex + 1}
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
                        className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
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

          {filteredData.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length + 3}
                className="text-center py-6 text-gray-400"
              >
                {renderNoData || <ZEmptyCard />}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      {total > pageSize && (
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-600 text-sm">
            Page {pageIndex + 1} of {totalPages} ({total} items)
          </div>

          <div className="flex space-x-2">
            <ZButton
              variant="outline"
              size="sm"
              disabled={pageIndex <= 0}
              onClick={() => table.previousPage()}
            >
              Previous
            </ZButton>

            <ZButton
              variant="outline"
              size="sm"
              disabled={pageIndex >= totalPages - 1}
              onClick={() => table.nextPage()}
            >
              Next
            </ZButton>
          </div>
        </div>
      )}
    </div>
  );
}
