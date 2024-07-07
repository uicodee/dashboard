"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/widgets/data-table";
import { ColumnDef } from "@tanstack/table-core";
import { DeleteOrder, OrderOutput } from "@/shared/api/model";
import { getOrder } from "@/shared/api/generated/order/order";
import { DataCard } from "@/widgets/data-card";
import { CreateOrderButton, CreateOrderModal } from "@/features/create-order";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui/button";
import { ArrowUpDown } from "lucide-react";
import { EditOrderModal, useEditOrder } from "@/features/edit-order";

export default function Orders() {
  const setOpen = useEditOrder((state) => state.setOpen);
  const setOrder = useEditOrder((state) => state.setOrder);
  const queryClient = useQueryClient();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrder().allOrdersOrderAllGet(),
  });
  const mutation = useMutation({
    mutationFn: (data: DeleteOrder) =>
      getOrder().deleteOrdersOrderDeleteDelete(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["orders"] }),
  });

  const data = orders || [];
  const columns: ColumnDef<OrderOutput>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          aria-label="Select row"
        />
      ),
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
      accessorKey: "category",
      header: "Category",
      cell: (row) => {
        return <img src={row.row.original.category.icon} className="size-9" />;
      },
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "author",
      header: "Author",
    },
    {
      accessorKey: "deadline",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Deadline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "technicalTask",
      header: "Task",
      cell: (row) => (
        <a
          className="text-blue-500 hover:underline underline-offset-4"
          href={row.row.original.technicalTask}
          target="_blank"
        >
          Task
        </a>
      ),
    },
  ];
  return (
    <DataCard title="Orders" button={<CreateOrderButton />}>
      <CreateOrderModal />
      <EditOrderModal />
      <DataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        onDelete={(data: OrderOutput[]) =>
          mutation.mutate({ ordersIds: data.map((item) => item.id) })
        }
        onRowClick={() => setOpen(true)}
        setData={(data) => setOrder(data)}
      />
    </DataCard>
  );
}
