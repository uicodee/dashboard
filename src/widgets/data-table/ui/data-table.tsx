"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  VisibilityState,
} from "@tanstack/table-core";
import {
  flexRender,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { ChevronLeft, ChevronRight, Filter, Trash } from "lucide-react";
import { Fragment, useState } from "react";
import { Input } from "@/shared/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Skeleton } from "@/shared/ui/skeleton";
import * as React from "react";
import { DataTableFacetedFilter } from "@/widgets/data-table";
import { cn } from "@/shared/ui/utils";

interface FilterField {
  name: string;
  key: string;
}

interface DataTableProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  onDelete?: (data: TData[]) => void;
  onRowClick?: () => void;
  setData?: (data: TData) => void;
  filterFields?: FilterField[];
  facetedFilters?: {
    icon?: React.ComponentType<{ className?: string }>;
    columnName: string;
    title: string;
    options: {
      label: string;
      value: string;
      icon?: React.ComponentType<{ className?: string }>;
    }[];
  }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  onDelete,
  onRowClick,
  setData,
  filterFields,
  facetedFilters,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
      sorting,
    },
  });
  const [filterColumn, setFilterColumn] = useState<string>();
  return (
    <div className={cn("max-w-full h-full", className)}>
      {filterFields !== undefined && (
        <div className="flex flex-col gap-2 items-center py-4 md:flex-row">
          <Input
            placeholder="Search"
            value={
              filterColumn !== undefined
                ? (table.getColumn(filterColumn)?.getFilterValue() as string) ??
                  ""
                : ""
            }
            onChange={(event) =>
              filterColumn !== undefined
                ? table
                    .getColumn(filterColumn)
                    ?.setFilterValue(event.target.value)
                : ""
            }
            className="h-8 w-full md:w-[250px]"
          />
          <div className="flex justify-between w-full gap-x-2 md:justify-start md:w-fit">
            <div className="flex w-full">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-dashed w-full md:w-fit"
                  >
                    <Filter strokeWidth={1.75} className="w-3.5 h-3.5 mr-2" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {filterFields.map((filterField, index) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={index}
                        checked={filterField.key === filterColumn}
                        onCheckedChange={() => setFilterColumn(filterField.key)}
                      >
                        {filterField.name}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {facetedFilters !== undefined && (
              <div className="flex w-full gap-x-2 md:w-fit">
                {facetedFilters.map((facetedFilter) => (
                  <Fragment key={facetedFilter.columnName}>
                    <DataTableFacetedFilter
                      icon={facetedFilter.icon}
                      column={table.getColumn(facetedFilter.columnName)}
                      title={facetedFilter.title}
                      options={facetedFilter.options}
                    />
                  </Fragment>
                ))}
              </div>
            )}
            {table.getFilteredSelectedRowModel().rows.length !== 0 && (
              <Button
                size="sm"
                onClick={() =>
                  onDelete !== undefined &&
                  onDelete(
                    table
                      .getFilteredSelectedRowModel()
                      .rows.map((item) => item.original)
                  )
                }
              >
                <Trash className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
      <div className="border rounded-md">
        {isLoading ? (
          <div className="space-y-1">
            <Skeleton className="rounded-tl-md rounded-tr-md w-full h-14" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="w-full h-12" />
            <Skeleton className="rounded-bl-md rounded-br-md w-full h-12" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:cursor-pointer"
                    onClick={() => {
                      if (onRowClick && setData) {
                        onRowClick();
                        setData(row.original);
                      }
                    }}
                    // onClick={() => {
                    //     onRowClick()
                    //     setCar(row.original)
                    // }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-3.5">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
        </Button>
      </div>
    </div>
  );
}
