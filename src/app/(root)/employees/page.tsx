"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/widgets/data-table";
import { ColumnDef } from "@tanstack/table-core";
import { EmployeeOutput } from "@/shared/api/model";
import { getEmployee } from "@/shared/api/generated/employee/employee";
import { DataCard } from "@/widgets/data-card";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown, BarChart, Globe } from "lucide-react";
import { languages, levels } from "@/shared/lib/data";
import { useRouter } from "next/navigation";

export default function Employees() {
  const router = useRouter();
  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployee().getEmployeesEmployeeGet(),
  });
  const data = employees || [];
  const columns: ColumnDef<EmployeeOutput>[] = [
    {
      accessorKey: "firstName",
      header: "Firstname",
    },
    {
      accessorKey: "lastName",
      header: "Lastname",
    },
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
          {row.row.original.phoneNumber !== null && (
            <a
              className="text-blue-500"
              href={`tel://${row.row.original.phoneNumber}`}
            >
              {row.row.original.phoneNumber}
            </a>
          )}
        </p>
      ),
    },
    {
      accessorKey: "level",
      header: "Level",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "language",
      header: "Language",
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "portfolio",
      header: "Portfolio",
      cell: (row) => (
        <p>
          {row.row.original.portfolio !== null && (
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
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onRowClick={() => console.log(true)}
        // onRowClick={() => setOpen(true)}
        // onRowClick={() => {
        //   router.push()
        // }}
        setData={(data) => {
          router.push(`/employees/${data.id}`);
          // setOrder(data);
        }}
        filterFields={[
          { name: "Firstname", key: "firstName" },
          { name: "Lastname", key: "lastName" },
          { name: "Phone number", key: "phoneNumber" },
          { name: "Telegram ID", key: "telegramId" },
        ]}
        facetedFilters={[
          {
            icon: BarChart,
            columnName: "level",
            title: "Level",
            options: levels,
          },
          {
            icon: Globe,
            columnName: "language",
            title: "Language",
            options: languages,
          },
        ]}
      />
    </DataCard>
  );
}
