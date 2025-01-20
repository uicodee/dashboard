"use client";

import { getOrder } from "@/shared/api/generated/order/order";
import { EmployeeOutput } from "@/shared/api/model";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from "@/shared/ui/breadcrumb";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { DataCard } from "@/widgets/data-card";
import { DataTable } from "@/widgets/data-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Dices } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrder().getOrderOrderOrderIdGet(Number(orderId)),
  });
  const { data: orderResponses, isLoading } = useQuery({
    queryKey: ["orderResponses"],
    queryFn: () =>
      getOrder().getOrderResponsesOrderOrderIdResponsesGet(Number(orderId)),
  });
  const selectRandom = useMutation({
    mutationFn: () =>
      getOrder().selectRandomEmployeeOrderOrderIdSelectRandomPost(
        Number(orderId)
      ),
  });
  const data = orderResponses || [];
  const columns: ColumnDef<EmployeeOutput>[] = [
    {
      accessorKey: "firstName",
      header: "Firstname",
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
  ];
  return (
    <>
      <Breadcrumb className="ml-2 mt-2 text-base">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/orders">Orders</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{order?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid grid-cols-6 gap-2 md:gap-4">
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Name</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{order?.title}</CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Price</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            {order?.price.toLocaleString("en-US")} {order?.currency}
          </CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Deadline</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            {order?.deadline} {order?.deadlineType}
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            <div className="flex items-center gap-x-3">
              <img src={order?.category.icon} alt="" className="w-7 h-7" />
              {order?.category.name}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Created At</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">{order?.createdAt}</CardContent>
        </Card>
        <Card className="col-span-6 md:col-span-2">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            <div className="flex flex-wrap gap-2">
              {order?.skills.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 md:py-1 md:text-sm bg-primary-foreground rounded-full"
                >
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <DataCard
          title="Responses"
          className="col-span-6"
          button={
            <Button
              onClick={() => {
                selectRandom.mutate();
              }}
              disabled={
                order?.isExecutorSelected || orderResponses?.length === 0
              }
            >
              <Dices className="w-4 h-4 mr-2" />
              Select random
            </Button>
          }
        >
          {/* <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            className="mt-4"
          /> */}
          <DataTable
            columns={columns}
            data={data}
            isLoading={isLoading}
            onRowClick={() => console.log(true)}
            className="mt-4"
            setData={(data) => {
              router.push(`/employees/${data.id}`);
            }}
          />
        </DataCard>
      </div>
    </>
  );
}
