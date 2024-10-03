"use client";

import {
  CreateCategoryButton,
  CreateCategoryModal,
} from "@/features/create-category";
import { getCategory } from "@/shared/api/generated/category/category";
import { OrderCategory } from "@/shared/api/model";
import { Button } from "@/shared/ui/button";
import { DataCard } from "@/widgets/data-card";
import { DataTable } from "@/widgets/data-table";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export default function Page() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategory().allOrderCategoriesCategoryGet(),
  });
  const data = categories || [];
  const columns: ColumnDef<OrderCategory>[] = [
    {
      accessorKey: "icon",
      header: "Icon",
      cell: (row) => {
        return <img src={row.row.original.icon} className="size-9" />;
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
      accessorKey: "name",
      header: "Name",
    },
  ];
  return (
    <DataCard title="Categories" button={<CreateCategoryButton />}>
      <CreateCategoryModal />
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </DataCard>
  );
}
