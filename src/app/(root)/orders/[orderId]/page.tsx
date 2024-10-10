"use client";

import { getOrder } from "@/shared/api/generated/order/order";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbPage,
  BreadcrumbLink,
} from "@/shared/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order } = useQuery({
    queryKey: ["order"],
    queryFn: () => getOrder().getOrderOrderOrderIdGet(Number(orderId)),
  });
  const { data: orderResponses } = useQuery({
    queryKey: ["orderResponses"],
    queryFn: () =>
      getOrder().getOrderResponsesOrderOrderIdResponsesGet(Number(orderId)),
  });
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
            {order?.price.toLocaleString("en-US")} sums
          </CardContent>
        </Card>
        <Card className="col-span-3 md:col-span-2">
          <CardHeader>
            <CardTitle>Deadline</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6">
            {order?.deadline} days
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
                <div key={item.id} className="px-4 py-2 md:py-1 md:text-sm bg-primary-foreground rounded-full">
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-6">
          <CardHeader>
            <CardTitle>Responses</CardTitle>
          </CardHeader>
          <CardContent className="pt-1 pb-6 px-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Firstname</TableHead>
                    <TableHead>Lastname</TableHead>
                    <TableHead>Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderResponses !== undefined &&
                  orderResponses?.length > 0 ? (
                    orderResponses.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="p-3.5">
                          {employee.firstName}
                        </TableCell>
                        <TableCell className="p-3.5">
                          {employee.lastName}
                        </TableCell>
                        <TableCell className="p-3.5">
                          {employee.level}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="h-24 text-center">
                        No results
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
