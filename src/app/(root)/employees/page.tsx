"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/widgets/data-table";
import { ColumnDef } from "@tanstack/table-core";
import { EmployeeOutput } from "@/shared/api/model";
import { getEmployee } from "@/shared/api/generated/employee/employee";
import { DataCard } from "@/widgets/data-card";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Employees() {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployee().getEmployeesEmployeeAllGet(),
  });
  const data = employees || [];
  const columns: ColumnDef<EmployeeOutput>[] = [
    {
      accessorKey: "telegramId",
      header: "Telegram ID",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Firstname
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: "Lastname",
    },
    {
      accessorKey: "balance",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Balance
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: "Phone number",
      cell: (row) => (
        <p>
          {row.row.original.phoneNumber === null ? (
            "Phone not added"
          ) : (
            <a
              className="text-blue-500"
              href={`tel://+${row.row.original.phoneNumber}`}
            >
              +{row.row.original.phoneNumber}
            </a>
          )}
        </p>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
    },
    {
      accessorKey: "language",
      header: "Language",
    },
    {
      accessorKey: "portfolio",
      header: "Portfolio",
      cell: (row) => (
        <p>
          {row.row.original.portfolio === null ? (
            "Portfolio not added"
          ) : (
            <a className="text-blue-500" href={`${row.row.original.portfolio}`}>
              Portfolio
            </a>
          )}
        </p>
      ),
    },
    {
      accessorKey: "rating",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Rating
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];
  return (
    <DataCard title="Employees">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </DataCard>
  );
}
